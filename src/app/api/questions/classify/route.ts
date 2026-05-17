import { NextResponse } from "next/server";
import { z } from "zod";
import { chapters, detectChapterForQuestion } from "@/lib/content";

const classifySchema = z.object({
  question: z.string().min(3),
});

export async function POST(request: Request) {
  const parsed = classifySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Question is required" }, { status: 400 });
  }

  const chapterSlug = detectChapterForQuestion(parsed.data.question);
  const chapter = chapters.find((item) => item.slug === chapterSlug);

  return NextResponse.json({
    chapterSlug,
    chapterTitle: chapter?.title ?? "Basic ABAP Questions",
    confidence: chapterSlug === "basic-abap" ? 0.62 : 0.86,
    reason: "Keyword-based SAP topic detection for auto chapter insertion. OpenAI can be added later for semantic routing.",
  });
}
