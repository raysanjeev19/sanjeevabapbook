/**
 * Build-time answer generator.
 *
 * Run:  npm run generate:answers
 *
 * Reads every question from src/lib/content.ts, calls Claude Sonnet once per
 * question, and saves the results incrementally to src/data/generated-answers.json.
 * Re-running skips already-generated questions, so you can interrupt safely.
 *
 * Requires:  ANTHROPIC_API_KEY in .env.local or environment.
 */

import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load .env.local first, then .env
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// ─── import questions from content.ts at runtime via tsx ──────────────────────
import { allQuestions } from "../src/lib/content.js";

const OUTPUT_FILE = path.resolve(process.cwd(), "src/data/generated-answers.json");
const BATCH_SIZE = 5;       // parallel requests per batch
const DELAY_MS   = 1000;    // ms between batches to respect rate limits

// ─── Types ───────────────────────────────────────────────────────────────────

interface GeneratedFollowup {
  question: string;
  hinglishExplanation: string;
  interviewAnswer: string;
  realtimeExplanation: string;
  mistakes: string;
  codeExample: string;
}

interface GeneratedAnswer {
  easyUnderstanding: string;
  hinglishMasterExplanation: string;
  interviewMeKyaBolnaHai: string;
  interviewerKyaSochtaHai: string;
  realtimeProjectExplanation: string;
  twoYearsExperienceQuestions: string;
  codeWalkthrough: string;
  codeExamples: string;
  debuggingSection: string;
  supportProjectSection: string;
  implementationProjectSection: string;
  memoryTricks: string;
  followupAnswerBank: GeneratedFollowup[];
}

type GeneratedAnswersDB = Record<string, GeneratedAnswer>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loadExisting(): GeneratedAnswersDB {
  if (fs.existsSync(OUTPUT_FILE)) {
    return JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf-8")) as GeneratedAnswersDB;
  }
  return {};
}

function save(db: GeneratedAnswersDB) {
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(db, null, 2), "utf-8");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Prompt ──────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a senior SAP ABAP trainer and interview coach who writes detailed,
unique, highly specific interview-preparation content in Hinglish (mix of Hindi and English).

Rules:
- Every section must be SPECIFIC to the exact question asked. Never give generic SAP filler.
- Hinglish sections: write naturally as a desi mentor speaks (Hindi grammar + English tech terms).
- Code must be real, runnable ABAP that directly demonstrates the topic — not a placeholder.
- Follow-up questions must be different from each other and specific to the main question topic.
- Keep each section substantial (150–400 words) — not a one-liner.
- Return ONLY valid JSON. No markdown fences, no extra text.`;

function buildUserPrompt(
  questionPrompt: string,
  chapterTitle: string,
  chapterSlug: string,
  followupQuestions: Array<{ prompt: string; category: string }>,
): string {
  const followupList = followupQuestions.map((f, i) => `${i + 1}. ${f.prompt}`).join("\n");

  return `Question: "${questionPrompt}"
Chapter: ${chapterTitle} (${chapterSlug})

Generate a JSON object with EXACTLY these keys. Every value must be specific to the question above.

{
  "easyUnderstanding": "Zero-level explanation in Hinglish. What is this concept, where is it used, why does it matter in SAP. Use simple analogies. 150-250 words.",

  "hinglishMasterExplanation": "Interview ke hisaab se detailed Hinglish explanation. Definition + practical use case + how to validate/debug in project. Natural desi mentor tone. 200-350 words.",

  "interviewMeKyaBolnaHai": "Exact script jo interview me bolna hai. Short confident definition in English, then a structured answer with real scenario, then a closing line about debugging/performance. 150-250 words.",

  "interviewerKyaSochtaHai": "Interviewer ki mindset: woh kya expect karta hai, kahan candidate reject hota hai, kya points award karta hai for this specific question. 150-250 words.",

  "realtimeProjectExplanation": "Real project me is concept ka use: implementation scenario, support scenario, and one specific production incident type. Be specific to this question's topic. 200-300 words.",

  "twoYearsExperienceQuestions": "5 project-level Q&A pairs specific to this question. Experienced-developer style answers with actual SAP objects/tables/transactions mentioned. 250-400 words.",

  "codeWalkthrough": "Full working ABAP code example specific to this topic. Then line-by-line explanation of what each important line does and why. Include at least 10-15 lines of real ABAP code. 200-350 words.",

  "codeExamples": "The raw ABAP code only (no explanation text) — same code as codeWalkthrough but just the code block. 10-20 lines.",

  "debuggingSection": "How to debug issues specific to this concept: which transactions to use (ST22/ST05/SAT/SM37/SU53 as relevant), what to look for, common errors, and how to trace the exact failure. 200-300 words.",

  "supportProjectSection": "Support project scenario: typical tickets related to this concept, how to reproduce, investigate, fix, and write RCA. Include specific SAP transactions relevant to this concept. 200-300 words.",

  "implementationProjectSection": "Implementation project: FS to TS conversion for this concept, technical design points, coding approach, unit test cases, and deployment checklist specific to this topic. 200-300 words.",

  "memoryTricks": "3-5 clever memory tricks, mnemonics, or short formulas to remember this concept for interview. Include a one-line 'interview shortcut' answer. 100-200 words.",

  "followupAnswerBank": [
${followupList}

    Generate one object per follow-up question above. Return array of objects with keys:
    { "question": "exact question text from list above", "hinglishExplanation": "150+ words", "interviewAnswer": "100+ words professional English", "realtimeExplanation": "100+ words project context", "mistakes": "common wrong answers to avoid", "codeExample": "5-15 lines real ABAP" }
  ]
}`;
}

// ─── API call ─────────────────────────────────────────────────────────────────

async function generateForQuestion(
  client: Anthropic,
  questionId: string,
  questionPrompt: string,
  chapterTitle: string,
  chapterSlug: string,
  followups: Array<{ prompt: string; category: string }>,
): Promise<GeneratedAnswer | null> {
  const userPrompt = buildUserPrompt(questionPrompt, chapterTitle, chapterSlug, followups);

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          // Cache the system prompt — reused across all questions
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: userPrompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
    const parsed = JSON.parse(cleaned) as GeneratedAnswer;
    return parsed;
  } catch (err) {
    console.error(`  ✗ Failed ${questionId}: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ERROR: ANTHROPIC_API_KEY not found. Set it in .env.local or environment.");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });
  const db = loadExisting();

  const todo = allQuestions.filter((q) => !db[q.id]);
  const total = allQuestions.length;
  const done  = total - todo.length;

  console.log(`\n📚 CodeGurukul Answer Generator`);
  console.log(`   Total questions : ${total}`);
  console.log(`   Already done    : ${done}`);
  console.log(`   To generate     : ${todo.length}`);
  console.log(`   Output          : ${OUTPUT_FILE}\n`);

  if (todo.length === 0) {
    console.log("✅ All questions already generated!");
    return;
  }

  let generated = 0;
  let failed = 0;

  // Process in batches
  for (let i = 0; i < todo.length; i += BATCH_SIZE) {
    const batch = todo.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(todo.length / BATCH_SIZE);

    console.log(`\n[Batch ${batchNum}/${totalBatches}] Processing ${batch.length} questions...`);

    const results = await Promise.allSettled(
      batch.map(async (q) => {
        // Determine chapter title from chapterSlug by looking at the question
        const chapterTitle = q.chapterSlug
          .split("-")
          .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

        const followups = q.followups.map((f) => ({
          prompt: f.prompt,
          category: f.category,
        }));

        process.stdout.write(`  → ${q.id}: ${q.prompt.slice(0, 60)}...`);
        const result = await generateForQuestion(client, q.id, q.prompt, chapterTitle, q.chapterSlug, followups);

        if (result) {
          db[q.id] = result;
          save(db);
          generated++;
          console.log(" ✓");
          return result;
        } else {
          failed++;
          console.log(" ✗ (skipped)");
          return null;
        }
      }),
    );

    const successCount = results.filter((r) => r.status === "fulfilled" && r.value !== null).length;
    console.log(`  Batch done: ${successCount}/${batch.length} succeeded`);

    if (i + BATCH_SIZE < todo.length) {
      process.stdout.write(`  Waiting ${DELAY_MS}ms before next batch...`);
      await sleep(DELAY_MS);
      console.log(" done");
    }
  }

  console.log(`\n${"─".repeat(50)}`);
  console.log(`✅ Generation complete!`);
  console.log(`   Generated : ${generated}`);
  console.log(`   Failed    : ${failed}`);
  console.log(`   Total DB  : ${Object.keys(db).length}/${total}`);
  console.log(`   Saved to  : ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
