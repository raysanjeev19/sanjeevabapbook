import { NextResponse } from "next/server";
import { chapters, platformStats, searchQuestions } from "@/lib/content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const topic = searchParams.get("topic") ?? "all";
  const level = searchParams.get("level") ?? "all";

  return NextResponse.json({
    chapters,
    stats: platformStats,
    results: searchQuestions(query, topic, level).slice(0, 80),
  });
}
