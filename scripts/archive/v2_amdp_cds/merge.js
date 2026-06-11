#!/usr/bin/env node
// Merges V2 fields into answer files. Preserves all existing fields.
// New fields inserted between codeExamples and followupAnswerBank.
// tier added to each followup at end.
//
// Usage: node merge.js <answers_file> <v2_data_file>
// v2_data_file format: { "<qid>": { interviewScriptHinglish, interviewScriptEnglish, wordByWordSamjho, commonMistakesSection, quickRevisionNotes, followupTiers: ["easy",...] } }

const fs = require('fs');
const path = require('path');

const [answersFile, v2DataFile] = process.argv.slice(2);
if (!answersFile || !v2DataFile) {
  console.error('Usage: node merge.js <answers_file> <v2_data_file>');
  process.exit(1);
}

const answers = JSON.parse(fs.readFileSync(answersFile, 'utf8'));
const v2 = JSON.parse(fs.readFileSync(v2DataFile, 'utf8'));

const out = {};
for (const qid of Object.keys(answers)) {
  const orig = answers[qid];
  const v2Item = v2[qid];
  if (!v2Item) {
    console.error('MISSING V2 for', qid);
    out[qid] = orig;
    continue;
  }
  const tiers = v2Item.followupTiers || [];
  const fb = (orig.followupAnswerBank || []).map((f, i) => {
    // Preserve all existing fields, add tier
    const out = {};
    for (const k of Object.keys(f)) out[k] = f[k];
    out.tier = tiers[i] || 'medium';
    return out;
  });
  // Build merged object with exact ordering
  const merged = {};
  // Existing fields preserved in their original order
  for (const k of Object.keys(orig)) {
    if (k === 'followupAnswerBank') {
      // Insert new fields here first, then followupAnswerBank last
      merged.interviewScriptHinglish = v2Item.interviewScriptHinglish;
      merged.interviewScriptEnglish = v2Item.interviewScriptEnglish;
      merged.wordByWordSamjho = v2Item.wordByWordSamjho;
      merged.commonMistakesSection = v2Item.commonMistakesSection;
      merged.quickRevisionNotes = v2Item.quickRevisionNotes;
      merged.followupAnswerBank = fb;
    } else {
      merged[k] = orig[k];
    }
  }
  out[qid] = merged;
}

fs.writeFileSync(answersFile, JSON.stringify(out, null, 2) + '\n');
console.log('OK', answersFile);
