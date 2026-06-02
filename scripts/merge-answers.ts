/**
 * Merges all chapter answer files from src/data/answers/ into src/data/generated-answers.json
 * Run: npx tsx scripts/merge-answers.ts
 */
import * as fs from "fs";
import * as path from "path";

const ANSWERS_DIR = path.resolve(process.cwd(), "src/data/answers");
const OUTPUT_FILE = path.resolve(process.cwd(), "src/data/generated-answers.json");

const files = fs.readdirSync(ANSWERS_DIR).filter((f) => f.endsWith(".json"));

let merged: Record<string, unknown> = {};

for (const file of files) {
  const content = JSON.parse(fs.readFileSync(path.join(ANSWERS_DIR, file), "utf-8"));
  merged = { ...merged, ...content };
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(merged, null, 2), "utf-8");
console.log(`Merged ${files.length} files → ${Object.keys(merged).length} questions saved to generated-answers.json`);
