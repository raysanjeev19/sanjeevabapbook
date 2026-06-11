#!/usr/bin/env node
/**
 * Runner: injects new v2 fields and tiers follow-ups for forms-workflow files.
 * Content is loaded from a per-file CONTENT module passed as argument.
 *
 * Usage: node runner.js <fileLetter>
 *   e.g. node runner.js a   -> processes src/data/answers/forms-workflow-a.json
 *
 * Each content file at ./content/<letter>.js must export:
 *   module.exports = { 'forms-workflow-001': { scriptH, scriptE, words, mistakes, qrn, tiers? }, ... }
 *
 * If tiers is omitted, default split is applied (3 easy / 3 medium / 2 advanced for 8 follow-ups).
 */

const fs = require('fs');
const path = require('path');

const ANSWERS_DIR = path.join(__dirname, '..', '..', 'src', 'data', 'answers');

const DEFAULT_TIER_8 = ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'advanced', 'advanced'];

function tierFor(n, override) {
  if (override && override.length === n) return override;
  if (n === 8) return DEFAULT_TIER_8;
  const easy = Math.max(1, Math.round(n * 0.375));
  const adv  = Math.max(1, Math.round(n * 0.25));
  const med  = Math.max(0, n - easy - adv);
  return [
    ...Array(easy).fill('easy'),
    ...Array(med).fill('medium'),
    ...Array(adv).fill('advanced')
  ];
}

function injectQuestion(qid, qData, contentMap) {
  const content = contentMap[qid];
  if (!content) {
    throw new Error(`Missing content entry for ${qid}`);
  }
  // Required fields
  for (const k of ['scriptH', 'scriptE', 'words', 'mistakes', 'qrn']) {
    if (!(k in content)) throw new Error(`Content for ${qid} missing field ${k}`);
  }

  const ordered = {};
  let inserted = false;
  for (const key of Object.keys(qData)) {
    ordered[key] = qData[key];
    if (key === 'codeExamples') {
      ordered.interviewScriptHinglish = content.scriptH;
      ordered.interviewScriptEnglish = content.scriptE;
      ordered.wordByWordSamjho = content.words;
      ordered.commonMistakesSection = content.mistakes;
      ordered.quickRevisionNotes = content.qrn;
      inserted = true;
    }
  }
  if (!inserted) {
    // codeExamples missing - place before followupAnswerBank if present, else at end
    const rebuilt = {};
    for (const key of Object.keys(ordered)) {
      if (key === 'followupAnswerBank') {
        rebuilt.interviewScriptHinglish = content.scriptH;
        rebuilt.interviewScriptEnglish = content.scriptE;
        rebuilt.wordByWordSamjho = content.words;
        rebuilt.commonMistakesSection = content.mistakes;
        rebuilt.quickRevisionNotes = content.qrn;
      }
      rebuilt[key] = ordered[key];
    }
    if (!('interviewScriptHinglish' in rebuilt)) {
      rebuilt.interviewScriptHinglish = content.scriptH;
      rebuilt.interviewScriptEnglish = content.scriptE;
      rebuilt.wordByWordSamjho = content.words;
      rebuilt.commonMistakesSection = content.mistakes;
      rebuilt.quickRevisionNotes = content.qrn;
    }
    // overwrite ordered keys
    for (const k of Object.keys(ordered)) delete ordered[k];
    Object.assign(ordered, rebuilt);
  }

  if (Array.isArray(ordered.followupAnswerBank)) {
    const tiers = tierFor(ordered.followupAnswerBank.length, content.tiers);
    ordered.followupAnswerBank = ordered.followupAnswerBank.map((f, i) => {
      if ('tier' in f) return f;
      return { ...f, tier: tiers[i] };
    });
  }

  return ordered;
}

function processFile(letter) {
  const file = `forms-workflow-${letter}.json`;
  const fullPath = path.join(ANSWERS_DIR, file);
  const contentPath = path.join(__dirname, 'content', `${letter}.js`);
  const contentMap = require(contentPath);
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const result = {};
  for (const [qid, qData] of Object.entries(data)) {
    result[qid] = injectQuestion(qid, qData, contentMap);
  }
  fs.writeFileSync(fullPath, JSON.stringify(result, null, 2) + '\n');
  // validate
  JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  console.log(`ok ${file} (${Object.keys(result).length} questions)`);
}

if (require.main === module) {
  const letters = process.argv.slice(2);
  if (letters.length === 0) {
    console.error('Usage: node runner.js <letter> [<letter>...]');
    process.exit(1);
  }
  letters.forEach(processFile);
}
