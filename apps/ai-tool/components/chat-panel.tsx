"use client";

import { FormEvent, useState } from "react";
import { Button, Card } from "@packages/ui";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatPanel() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = input.trim();
    if (!value || loading) {
      return;
    }

    const nextMessages: Message[] = [...messages, { role: "user", content: value }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages })
      });

      const payload = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Request failed");
      }

      setMessages((current) => [...current, { role: "assistant", content: payload.reply || "" }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="space-y-4 bg-white/90">
      <div className="space-y-3">
        {messages.length === 0 ? (
          <p className="text-sm text-[var(--color-muted)]">Ask anything to test your deployed AI tool.</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={message.role === "user" ? "text-right" : "text-left"}
            >
              <p className="inline-block max-w-[90%] rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm">
                {message.content}
              </p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={4}
          className="w-full rounded-xl border border-[var(--color-border)] bg-white p-3 text-sm"
          placeholder="Type your prompt..."
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-muted)]">Rate limiting is enabled server-side.</p>
          <Button type="submit" disabled={loading}>
            {loading ? "Thinking..." : "Send"}
          </Button>
        </div>
      </form>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </Card>
  );
}
