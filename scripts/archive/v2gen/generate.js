// V2 content generator for rap-bopf and support-debugging answer files.
// Adds 5 new fields per question + tier per follow-up. Preserves existing fields.

const fs = require('fs');
const path = require('path');

const FILES = [
  'rap-bopf-a.json', 'rap-bopf-b.json', 'rap-bopf-c.json', 'rap-bopf-d.json',
  'rap-bopf-e.json', 'rap-bopf-f.json', 'rap-bopf-g.json', 'rap-bopf-h.json',
  'support-debugging-a.json', 'support-debugging-b.json', 'support-debugging-c.json',
  'support-debugging-d.json', 'support-debugging-e.json', 'support-debugging-f.json',
  'support-debugging-g.json', 'support-debugging-h.json',
];

const ANS_DIR = '/Users/sanjayray/boook/src/data/answers';

// Per-question topic metadata: title, oneLineDef, usedFor, syntaxBullets, interviewKeyword
// hinglish/english script seeds; common mistakes summary; word-by-word keyword set.
// Keyed by question id. Designed so each question gets distinctive content.
const META = require('./meta.js');

function buildHinglishScript(m) {
  // Pattern: "Sir, <topic> ek <definition> hai jo <purpose>. <2-3 SAP details>. Practically, mere project mein <scenario>. Iska benefit yeh hai ki <value>."
  const parts = [];
  parts.push(`Sir, ${m.topic} ek ${m.shortDef} hai jo ${m.purpose}.`);
  parts.push(m.sapDetails);
  parts.push(`Practically, mere project mein ${m.scenario}.`);
  parts.push(`Iska benefit yeh hai ki ${m.value}.`);
  return parts.join(' ');
}

function buildEnglishScript(m) {
  // Definition -> Usage -> Business Value -> Conclusion
  const parts = [];
  parts.push(`${m.topicEn} is ${m.shortDefEn}.`);
  parts.push(`It is used to ${m.usageEn}.`);
  parts.push(`In business terms, ${m.businessValueEn}.`);
  parts.push(`In short, ${m.conclusionEn}.`);
  return parts.join(' ');
}

function buildQuickRevision(m) {
  const usedForBullets = m.usedFor.map(s => `- ${s}`).join('\n');
  const syntaxBullets = m.syntax.map(s => `- ${s}`).join('\n');
  return `What: ${m.oneLineDef}\n\nUsed for:\n${usedForBullets}\n\nKey syntax / tables / Tcodes:\n${syntaxBullets}\n\nInterview keyword: ${m.interviewKeyword}`;
}

function buildWordByWord(m) {
  return m.wordByWord;
}

function buildCommonMistakes(m) {
  return m.commonMistakes;
}

function pickTier(idx, total) {
  // Default ~3 easy, 3 medium, 2 advanced for 8-followup files.
  // For other counts, pro-rata: 0..2 easy, 3..5 medium, 6..7 advanced.
  // We'll use position-based assignment with optional override in meta.
  if (total >= 8) {
    if (idx < 3) return 'easy';
    if (idx < 6) return 'medium';
    return 'advanced';
  }
  // For unusual sizes, even thirds.
  const e = Math.ceil(total / 3);
  const m = Math.ceil((total - e) / 2);
  if (idx < e) return 'easy';
  if (idx < e + m) return 'medium';
  return 'advanced';
}

function processQuestion(qid, q) {
  const meta = META[qid];
  if (!meta) {
    throw new Error(`Missing META entry for ${qid}`);
  }
  // Build ordered new object preserving existing key order, inserting new
  // fields between codeExamples and followupAnswerBank.
  const out = {};
  for (const [k, v] of Object.entries(q)) {
    if (k === 'followupAnswerBank') {
      // Insert new fields here.
      out.interviewScriptHinglish = buildHinglishScript(meta);
      out.interviewScriptEnglish = buildEnglishScript(meta);
      out.wordByWordSamjho = buildWordByWord(meta);
      out.commonMistakesSection = buildCommonMistakes(meta);
      out.quickRevisionNotes = buildQuickRevision(meta);

      // Tier follow-ups (do not modify other fields).
      const tiers = meta.tiers || null; // optional explicit tiers array
      const fu = v.map((entry, idx) => {
        const newEntry = {};
        // Preserve order of fields; add tier at end.
        for (const [ek, ev] of Object.entries(entry)) {
          newEntry[ek] = ev;
        }
        newEntry.tier = tiers ? tiers[idx] : pickTier(idx, v.length);
        return newEntry;
      });
      out.followupAnswerBank = fu;
    } else {
      out[k] = v;
    }
  }
  // Safety: if followupAnswerBank didn't exist, append new fields at end.
  if (!('followupAnswerBank' in q)) {
    out.interviewScriptHinglish = buildHinglishScript(meta);
    out.interviewScriptEnglish = buildEnglishScript(meta);
    out.wordByWordSamjho = buildWordByWord(meta);
    out.commonMistakesSection = buildCommonMistakes(meta);
    out.quickRevisionNotes = buildQuickRevision(meta);
  }
  return out;
}

function processFile(file) {
  const p = path.join(ANS_DIR, file);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const out = {};
  for (const [qid, q] of Object.entries(data)) {
    out[qid] = processQuestion(qid, q);
  }
  fs.writeFileSync(p, JSON.stringify(out, null, 2) + '\n', 'utf8');
  // Validate.
  JSON.parse(fs.readFileSync(p, 'utf8'));
  console.log('ok  ' + file + '  (' + Object.keys(out).length + ' questions)');
}

const target = process.argv[2];
if (target) {
  processFile(target);
} else {
  for (const f of FILES) processFile(f);
}
