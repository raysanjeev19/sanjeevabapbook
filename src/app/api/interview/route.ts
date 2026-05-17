import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getChapter } from "@/lib/content";

const bodySchema = z.object({
  chapterSlug: z.string(),
  mode: z.enum(["Mock Interview", "Rapid Fire", "Stress Interview"]).default("Mock Interview"),
  answer: z.string().min(1),
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid interview payload" }, { status: 400 });
  }

  const chapter = getChapter(parsed.data.chapterSlug);
  if (!chapter) {
    return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      confidenceScore: 72,
      weakTopics: ["Project scenario depth", "Trace-based performance proof", "S/4HANA migration impact"],
      feedback:
        "Offline evaluator: add one client requirement, one debugging step, one ST05/SAT performance proof, and one S/4HANA impact line.",
      nextQuestion: chapter.questions[Math.floor(Math.random() * chapter.questions.length)].prompt,
    });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a strict but fair senior SAP ABAP and S/4HANA interviewer. Score answers, ask follow-ups, include traps, support scenarios, debugging, performance, and S/4HANA migration impact. Return compact JSON.",
      },
      {
        role: "user",
        content: JSON.stringify({
          chapter: chapter.title,
          mode: parsed.data.mode,
          answer: parsed.data.answer,
          sampleQuestions: chapter.questions.slice(0, 10).map((question) => question.prompt),
        }),
      },
    ],
    response_format: { type: "json_object" },
  });

  return NextResponse.json(JSON.parse(completion.choices[0]?.message.content ?? "{}"));
}
