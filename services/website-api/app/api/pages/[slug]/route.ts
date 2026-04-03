import { NextResponse } from "next/server";
import { pages } from "@/lib/content";

export const runtime = "nodejs";

type RouteContext = {
  params: {
    slug: string;
  };
};

export async function GET(_request: Request, context: RouteContext) {
  const slug = context.params.slug;
  const page = pages[slug];

  if (!page) {
    return NextResponse.json({ error: "Page not found", slug }, { status: 404 });
  }

  return NextResponse.json(page);
}
