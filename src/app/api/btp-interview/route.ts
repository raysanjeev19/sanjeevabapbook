import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getBtpQuestions, getBtpSection } from "@/lib/btp-content";

const bodySchema = z.object({
  sectionSlug: z.string(),
  mode: z.enum(["Full Section", "Topic Drill", "Rapid Fire", "Stress Interview"]).default("Full Section"),
  questionPrompt: z.string().min(1),
  answer: z.string().min(1),
});

function offlineScore(answer: string) {
  const checks = [
    /definition|means|is used|what is/i,
    /example|project|client|real/i,
    /architecture|diagram|flow|component|service/i,
    /security|xsuaa|auth|role|scope|token/i,
    /error|issue|debug|troubleshoot|fix|log/i,
  ];
  const hits = checks.filter((regex) => regex.test(answer)).length;
  const lengthScore = Math.min(35, Math.floor(answer.trim().length / 10));
  return Math.min(100, Math.max(25, lengthScore + hits * 12));
}

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid interview payload" }, { status: 400 });
  }

  const section = getBtpSection(parsed.data.sectionSlug);
  if (!section) {
    return NextResponse.json({ error: "Section not found" }, { status: 404 });
  }

  const matchingQuestion = getBtpQuestions(section.slug).find((q) => q.prompt === parsed.data.questionPrompt);

  if (!process.env.OPENAI_API_KEY) {
    const score = offlineScore(parsed.data.answer);
    return NextResponse.json({
      confidenceScore: score,
      feedback:
        score >= 75
          ? "Offline evaluator: solid structure. Add one production/scenario detail to make it interview-perfect."
          : "Offline evaluator: add a concrete example, the relevant BTP service name, and one gotcha/troubleshooting line.",
    });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a strict but fair senior SAP BTP interviewer (Cloud Foundry, Kyma, CAP, HANA Cloud, XSUAA, Integration Suite, DevOps). Score the candidate's spoken/typed answer against the reference rubric provided. Return compact JSON: { confidenceScore: 0-100, feedback: string (1-2 sentences, specific, actionable) }.",
      },
      {
        role: "user",
        content: JSON.stringify({
          section: section.title,
          mode: parsed.data.mode,
          question: parsed.data.questionPrompt,
          candidateAnswer: parsed.data.answer,
          referenceRubric: matchingQuestion
            ? {
                expectedAnswer: matchingQuestion.expectedAnswer,
                importantPoints: matchingQuestion.importantPoints,
                commonMistakes: matchingQuestion.commonMistakes,
              }
            : "No exact rubric match — grade on general SAP BTP technical accuracy and depth.",
        }),
      },
    ],
    response_format: { type: "json_object" },
  });

  const parsedResponse = JSON.parse(completion.choices[0]?.message.content ?? "{}");
  return NextResponse.json({
    confidenceScore: typeof parsedResponse.confidenceScore === "number" ? parsedResponse.confidenceScore : offlineScore(parsed.data.answer),
    feedback: typeof parsedResponse.feedback === "string" ? parsedResponse.feedback : "Answer recorded.",
  });
}
