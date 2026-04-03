import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/content";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(siteConfig);
}
