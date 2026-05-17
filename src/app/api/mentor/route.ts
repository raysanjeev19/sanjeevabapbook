import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";

const mentorSchema = z.object({
  mode: z.enum(["mentor", "follow-up-generator", "answer-improver", "simplifier", "hinglish-converter"]),
  question: z.string().min(3),
  answer: z.string().optional().default(""),
});

const modeInstruction = {
  mentor: "Teach like a senior SAP ABAP/S/4HANA mentor in natural Hinglish.",
  "follow-up-generator": "Generate interview follow-up questions with Hinglish explanation, answer, scenario, mistakes, and code hints.",
  "answer-improver": "Improve the candidate answer into polished interview language.",
  simplifier: "Explain from zero level with slow, practical teaching.",
  "hinglish-converter": "Convert the answer into natural confidence-building Hinglish.",
};

export async function POST(request: Request) {
  const parsed = mentorSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid mentor payload" }, { status: 400 });
  }

  const { mode, question, answer } = parsed.data;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      mode,
      response: `${modeInstruction[mode]}\n\nSamjho interview me question hai: "${question}". Aap answer start karo definition se, phir real project example do, phir bolo kaise debug karoge, performance kaise check karoge with ST05/SAT, aur S/4HANA/CDS/OData impact kya hoga. Interview me confident line: "I will validate this with real test data, authorization checks, transport validation, and post-deployment monitoring."`,
    });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a senior SAP ABAP and S/4HANA mentor. Always answer in natural Hinglish with interview-ready structure, project scenarios, debugging, support, performance, and modern SAP connections.",
      },
      {
        role: "user",
        content: JSON.stringify({
          instruction: modeInstruction[mode],
          question,
          candidateAnswer: answer,
        }),
      },
    ],
  });

  return NextResponse.json({
    mode,
    response: completion.choices[0]?.message.content ?? "",
  });
}
