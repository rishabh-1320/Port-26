import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const OPENAI_URL = "https://api.openai.com/v1/responses";

type ChatRequest = {
  messages?: Array<{ role?: string; content?: string }>;
};

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  const [ip] = forwarded.split(",");
  return ip?.trim() || "unknown";
}

function normalizeMessages(input: ChatRequest["messages"]) {
  if (!input || input.length === 0) {
    return null;
  }

  const normalized = input
    .slice(-10)
    .map((item) => ({
      role: item.role === "assistant" ? "assistant" : "user",
      content: typeof item.content === "string" ? item.content.trim() : ""
    }))
    .filter((item) => item.content.length > 0 && item.content.length <= 4_000);

  return normalized.length > 0 ? normalized : null;
}

export async function POST(request: Request) {
  const rateKey = `ip:${getClientIp(request)}`;
  const rate = checkRateLimit(rateKey);

  if (!rate.allowed) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Server missing OPENAI_API_KEY" }, { status: 500 });
  }

  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = normalizeMessages(body.messages);
  if (!messages) {
    return NextResponse.json(
      {
        error: "messages is required and must contain at least one valid message"
      },
      { status: 400 }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        input: messages.map((message) => ({
          role: message.role,
          content: [{ type: "input_text", text: message.content }]
        }))
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: "Upstream AI API error", detail: errorText }, { status: 502 });
    }

    const data = (await response.json()) as {
      output_text?: string;
      usage?: unknown;
    };

    return NextResponse.json({
      reply: data.output_text ?? "",
      usage: data.usage ?? null
    });
  } catch (error) {
    const isAbort = error instanceof Error && error.name === "AbortError";
    return NextResponse.json({ error: isAbort ? "AI request timed out" : "Failed to contact AI API" }, { status: 504 });
  } finally {
    clearTimeout(timeout);
  }
}
