const fs = require('fs');
const path = '/Users/sanjayray/boook/src/data/answers/internal-tables-e.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const aug = {
  'internal-tables-019': {
    interviewScriptHinglish: "Sir, internal tables ke follow up sawaal usually layered hote hain — pehle definition, phir types aur unki time complexity, phir FOR ALL ENTRIES ka empty table danger, phir performance patterns jaise SELECT inside LOOP, BINARY SEARCH, FIELD-SYMBOL vs work area, aur senior level mein S/4HANA aur ABAP 7.4 plus features. Sabse common trap hai FAE with empty driver — answer hai poori target table fetch hoti hai aur IS NOT INITIAL check mandatory hai. Mere project mein main ye sab patterns disciplined hashed lookups, FAE guards aur ASSIGNING FIELD-SYMBOL ke saath consistently apply karta hoon, aur SAT plus ST05 se measurable improvements deliver karta hoon.",
    interviewScriptEnglish: "Follow up questions on internal tables follow a predictable funnel: definition, table types and time complexities, FOR ALL ENTRIES dangers, performance anti-patterns such as SELECT inside LOOP, BINARY SEARCH usage, FIELD-SYMBOL versus work area, and finally S/4HANA and ABAP 7.4+ features. The most common trap is the FAE empty driver case, which silently fetches the entire target table — the answer is always IS NOT INITIAL guard. I apply hashed lookups, FAE guards and ASSIGNING FIELD-SYMBOL consistently and measure improvements with SAT and ST05 so the impact is concrete rather than theoretical.",
    wordByWordSamjho: [
      { keyword: "IF lt_orders IS NOT INITIAL", meaning: "Guard ensuring the driver internal table contains rows." },
      { keyword: "FOR ALL ENTRIES IN @lt_orders", meaning: "Bulk fetch from VBAP driven by keys present in the driver table." },
      { keyword: "LOOP AT ... ASSIGNING FIELD-SYMBOL(<r>)", meaning: "Reference based iteration that avoids row copies." },
      { keyword: "HASHED TABLE OF mara WITH UNIQUE KEY matnr", meaning: "Material master lookup table with O(1) READ access." },
      { keyword: "READ TABLE ... WITH TABLE KEY matnr = 'M001'", meaning: "Optimised hash lookup returning sy-subrc and the row." },
      { keyword: "kwmeng = kwmeng * 1.1", meaning: "In place price or quantity adjustment via field-symbol." },
      { keyword: "SELECT vbeln, matnr, kwmeng", meaning: "Field list select that limits memory and network usage." },
      { keyword: "SAT / ST05", meaning: "Runtime and SQL trace transactions used to validate the optimisation." }
    ],
    commonMistakesSection: [
      { mistake: "Skipping IS NOT INITIAL before FOR ALL ENTRIES.", whyWrong: "Empty driver triggers a full table scan of VBAP or BSEG and dumps with TSV in ST22.", correctApproach: "Always wrap FAE inside IF lt_driver IS NOT INITIAL and document the guard in the comment block." },
      { mistake: "Using LOOP AT ... INTO ls_wa for high volume modification loops.", whyWrong: "Each iteration copies the row, slowing wide structures noticeably and forcing extra MODIFY statements.", correctApproach: "Switch to LOOP AT ... ASSIGNING FIELD-SYMBOL(<r>) and update fields in place." },
      { mistake: "Reading large lookup tables with READ TABLE WITH KEY on a standard table.", whyWrong: "Linear search degrades to O(n^2) inside outer loops on tables like MARA or MAKT.", correctApproach: "Declare HASHED TABLE WITH UNIQUE KEY and use READ TABLE WITH TABLE KEY for O(1) access." },
      { mistake: "Claiming performance wins without ST05 or SAT evidence.", whyWrong: "Senior interviewers and reviewers expect measured numbers, not feelings, to justify optimisation effort.", correctApproach: "Capture before/after numbers using SAT for ABAP and ST05 for SQL, and quote concrete time improvements." }
    ],
    quickRevisionNotes: "What: Curated set of follow up patterns covering internal table types, FAE safety and performance.\n\nUsed for:\n- Structured interview answers from definition to advanced patterns\n- Refactoring checklists for legacy ABAP reports\n- Onboarding training material for ABAP newcomers\n\nKey syntax / tables / Tcodes:\n- IF lt IS NOT INITIAL guard around FOR ALL ENTRIES on VBAP\n- HASHED TABLE OF mara WITH UNIQUE KEY matnr; LOOP AT ... ASSIGNING\n- Profile changes via SAT and ST05; tables MARA, VBAK, VBAP\n\nInterview keyword: Funnel of follow ups — FAE safety + correct table type + measured optimisation."
  },
  'internal-tables-020': {
    interviewScriptHinglish: "Sir, ek simple internal table example mein main pehle TYPES BEGIN OF se ek structure define karta hoon, phir DATA TYPE TABLE OF se table aur ek total variable declare karta hoon. Database se single SELECT INTO TABLE call karta hoon bina LOOP ke andar SELECT lagaye taaki N plus 1 avoid ho. Phir IS INITIAL check karta hoon aur empty case ke liye user message dikhata hoon. Processing LOOP AT ASSIGNING FIELD-SYMBOL ke saath chalata hoon jisme copy overhead nahi hota, aur total accumulate karke output mein dikhata hoon. Iska benefit yeh hai ki professional habits — single SELECT, empty guard, field symbol — ek chhote example mein bhi visible hain.",
    interviewScriptEnglish: "A clean internal table example demonstrates professional habits even at small scale. I start by defining a TYPES BEGIN OF structure, then declaring the internal table and an accumulator variable. Population uses a single SELECT INTO TABLE with a WHERE clause — never SELECT inside a LOOP. I follow with an IS INITIAL check to handle the empty case gracefully. Processing uses LOOP AT ... ASSIGNING FIELD-SYMBOL to avoid row copies, and a total is accumulated and written out. The example deliberately illustrates the patterns interviewers look for: bulk SELECT, IS INITIAL guard, field-symbols and explicit field lists.",
    wordByWordSamjho: [
      { keyword: "REPORT zdemo_int_table_example", meaning: "Declares an executable ABAP report program." },
      { keyword: "TYPES BEGIN OF ty_order ... END OF ty_order", meaning: "Defines the row structure for the internal table." },
      { keyword: "DATA lt_orders TYPE TABLE OF ty_order", meaning: "Declares the standard internal table holding sales orders." },
      { keyword: "SELECT vbeln, erdat, netwr INTO TABLE @lt_orders", meaning: "Single bulk fetch from VBAK with field list and filter." },
      { keyword: "WHERE vkorg = '1000' AND erdat GE @sy-datum - 30", meaning: "Restricts to sales org 1000 and the last 30 days." },
      { keyword: "IF lt_orders IS INITIAL ... RETURN", meaning: "Empty result guard with a user message and early exit." },
      { keyword: "LOOP AT lt_orders ASSIGNING FIELD-SYMBOL(<ls>)", meaning: "Reference based loop avoiding row copy overhead." },
      { keyword: "lv_total = lv_total + <ls>-netwr", meaning: "Accumulates net amount across all rows for the final total." }
    ],
    commonMistakesSection: [
      { mistake: "Using SELECT * INTO TABLE @lt_orders FROM vbak with no field list.", whyWrong: "Brings 50+ columns into memory and over the network even when only three are needed.", correctApproach: "List the specific fields (vbeln, erdat, netwr) and only the needed rows via WHERE on vkorg and erdat." },
      { mistake: "Skipping the IS INITIAL check before processing the result.", whyWrong: "Empty results lead to confusing blank reports or, worse, downstream NULL handling bugs.", correctApproach: "Always issue a message and RETURN early so users get clear feedback when no orders match." },
      { mistake: "Looping with INTO work area and modifying inside without MODIFY.", whyWrong: "Modifications stay in the copy and the internal table never receives them.", correctApproach: "Use LOOP AT ... ASSIGNING FIELD-SYMBOL(<ls>) for in-place updates or add MODIFY ... INDEX sy-tabix." },
      { mistake: "Hard-coding company code or date range with no documentation.", whyWrong: "Future developers cannot tell whether the literal is intentional or accidental, blocking refactoring.", correctApproach: "Use selection screen parameters or constants with clear naming and comment the rationale in the code." }
    ],
    quickRevisionNotes: "What: Canonical end-to-end internal table example demonstrating professional habits.\n\nUsed for:\n- Interview live coding and code walkthroughs\n- Onboarding tutorials for new ABAP developers\n- Reference template for simple reports built on VBAK\n\nKey syntax / tables / Tcodes:\n- TYPES BEGIN OF ty_order ... END OF ty_order; DATA lt TYPE TABLE OF\n- SELECT vbeln, erdat, netwr INTO TABLE @lt_orders FROM vbak\n- IF lt IS INITIAL guard; LOOP AT ... ASSIGNING FIELD-SYMBOL\n- Profile with SAT and ST05; table VBAK\n\nInterview keyword: Bulk SELECT, IS INITIAL guard, field-symbol loop — all visible in five steps."
  },
  'internal-tables-021': {
    interviewScriptHinglish: "Sir, agar interviewer ek hi complete answer maange toh main yeh structure follow karta hoon: definition, teen types aur unki complexity, ek critical best practice jaise FOR ALL ENTRIES with IS NOT INITIAL, aur ek real project example. Internal table runtime memory data container hai, jisme Standard linear O(n) hai, Sorted binary O(log n) hai aur Hashed O(1) hai. Mere project mein maine ek order processing report mein hashed material lookup aur single SELECT before LOOP use kiya, jisse runtime 5 minute se 20 second ho gaya. ASSIGNING FIELD-SYMBOL pattern bhi consistently apply karta hoon. Yeh ek answer mein theory plus discipline plus measurable result — sab cover ho jaata hai.",
    interviewScriptEnglish: "An ideal complete answer covers definition, the three table types with their complexities, one critical best practice and one real project example. An internal table is a temporary in-memory container fetched from database tables, processed in memory and cleared at program end. Standard tables provide O(n) access, sorted tables provide O(log n), and hashed tables provide O(1) lookup. The non negotiable practice is guarding FOR ALL ENTRIES with IS NOT INITIAL. In a recent project I replaced N+1 SELECTs with a single SELECT plus a hashed material lookup, dropping runtime from five minutes to twenty seconds — a measurable improvement that demonstrates the patterns in action.",
    wordByWordSamjho: [
      { keyword: "TYPES BEGIN OF ty_order ... END OF ty_order", meaning: "Custom row structure containing VBELN, ERDAT, NETWR." },
      { keyword: "HASHED TABLE OF mara WITH UNIQUE KEY matnr", meaning: "O(1) material master cache used inside the processing loop." },
      { keyword: "SELECT matnr, maktx INTO TABLE @lt_mat FROM mara", meaning: "Pre-loads the hashed lookup table once from MARA." },
      { keyword: "SELECT vbeln, erdat, netwr ... WHERE vkorg = '1000'", meaning: "Bulk SELECT into the main standard table with field list and filter." },
      { keyword: "IF lt_orders IS INITIAL ... RETURN", meaning: "Mandatory empty guard for the result set." },
      { keyword: "LOOP AT lt_orders ASSIGNING FIELD-SYMBOL(<o>)", meaning: "Loop without row copies, the recommended bulk pattern." },
      { keyword: "WRITE: / <o>-vbeln, <o>-netwr", meaning: "Output sales order number and net value in classic list format." }
    ],
    commonMistakesSection: [
      { mistake: "Giving only the textbook definition without table types or real example.", whyWrong: "Senior interviewers gauge depth from concrete examples; a generic answer reads junior.", correctApproach: "Use a structured four part answer: definition, types with complexity, best practice, real project example with numbers." },
      { mistake: "Citing only standard tables and ignoring sorted and hashed.", whyWrong: "Misses the table type selection question which is almost guaranteed to follow.", correctApproach: "Mention all three with their access complexity and one canonical use case for each." },
      { mistake: "Promising performance wins without ST05 or SAT numbers.", whyWrong: "Without metrics the claim sounds rehearsed and not field tested.", correctApproach: "Quote before/after measurements obtained from SAT and ST05 to anchor the optimisation story." },
      { mistake: "Mixing legacy patterns like LOOP INTO header line with modern code.", whyWrong: "Header line tables are deprecated and signal outdated technique to the interviewer.", correctApproach: "Use modern declarations like DATA(lt) and LOOP AT ... ASSIGNING FIELD-SYMBOL(<o>) throughout the answer." }
    ],
    quickRevisionNotes: "What: Reusable complete answer template for internal tables in interviews.\n\nUsed for:\n- Best-answer scenarios when interviewer asks one big question\n- Closing strong on internal tables segment\n- Demonstrating hands-on credibility with numbers\n\nKey syntax / tables / Tcodes:\n- HASHED TABLE WITH UNIQUE KEY for lookups (MARA, MAKT, T001)\n- Bulk SELECT with WHERE; IF lt IS INITIAL guard\n- LOOP AT ... ASSIGNING FIELD-SYMBOL; ALV via cl_salv_table=>factory\n- Profile with SAT and ST05; verify dumps via ST22\n\nInterview keyword: Definition + three types + FAE guard + measured real project = complete answer."
  },
  'internal-tables-022': {
    interviewScriptHinglish: "Sir, ABAP internal tables ke teen types hain. Standard table array jaisa hai — insertion order maintain karta hai, duplicates allow karta hai aur linear search O(n) deta hai, isliye output lists ke liye best hai. Sorted table apne unique ya non unique key pe automatically sorted rehta hai aur binary search O(log n) deta hai, range queries aur sorted iteration ke liye useful hai. Hashed table hash function se O(1) constant time access deta hai, unique key mandatory hai aur large lookup tables jaise MARA ya MAKT ke liye perfect hai. Mere project mein 80 hazaar materials ka cache hashed table mein rakha jisse har lookup instant ho gaya aur batch report dramatically tez chala.",
    interviewScriptEnglish: "ABAP supports three internal table types. Standard tables behave like arrays — they preserve insertion order, allow duplicates and provide linear search of O(n), making them ideal for output lists and sequential processing. Sorted tables maintain rows in key order and provide automatic binary search of O(log n) with optional uniqueness, ideal for range queries and ordered iteration. Hashed tables use a hash function for O(1) constant time access and require a unique key, perfect for large reference tables like MARA or MAKT loaded once and read frequently. Choosing correctly delivers significant performance benefits in batch reports and ALV outputs.",
    wordByWordSamjho: [
      { keyword: "TYPE TABLE OF mara", meaning: "Default standard internal table declaration based on MARA." },
      { keyword: "TYPE SORTED TABLE OF mara WITH UNIQUE KEY matnr", meaning: "Auto sorted table providing O(log n) binary search by MATNR." },
      { keyword: "TYPE HASHED TABLE OF mara WITH UNIQUE KEY matnr", meaning: "Hash based table providing O(1) READ by full unique key." },
      { keyword: "APPEND VALUE mara( matnr = 'ZTEST' ) TO lt_std", meaning: "Adds a new row at the end of a standard table." },
      { keyword: "INSERT VALUE mara( ... ) INTO TABLE lt_srt", meaning: "Inserts at the correct sort position in a sorted table." },
      { keyword: "READ TABLE lt_srt WITH TABLE KEY matnr", meaning: "Optimised primary key access using the defined table key." },
      { keyword: "READ TABLE lt_hsh WITH TABLE KEY matnr", meaning: "Hash lookup; sy-subrc indicates whether the row was found." },
      { keyword: "UP TO 1000 ROWS", meaning: "Limits the SELECT result to the first 1000 rows." }
    ],
    commonMistakesSection: [
      { mistake: "Using a standard table for high frequency key lookups on large data.", whyWrong: "Linear O(n) scan in an outer loop turns the program quadratic and dominates runtime.", correctApproach: "Switch to HASHED TABLE WITH UNIQUE KEY (for exact match) or SORTED TABLE (for range or ordered access)." },
      { mistake: "Calling APPEND on a sorted or hashed table.", whyWrong: "Both raise a syntax or runtime error because they manage ordering internally.", correctApproach: "Use INSERT ... INTO TABLE so SAP places the row at the correct hash or sort position." },
      { mistake: "Reading a hashed table without supplying the full unique key.", whyWrong: "Hash access requires every key field; partial reads cause runtime errors.", correctApproach: "Provide all key fields in READ TABLE WITH TABLE KEY, or define a sorted secondary key for partial searches." },
      { mistake: "Relying on hashed table iteration order in output reports.", whyWrong: "Hashed tables have undefined order, so display sequence becomes unpredictable.", correctApproach: "Use a standard or sorted table for output, or copy hashed entries into a sorted table before displaying." }
    ],
    quickRevisionNotes: "What: Comparison of standard, sorted and hashed internal table types and their access characteristics.\n\nUsed for:\n- Selecting the correct table type during design\n- Optimising legacy programs that misuse standard tables\n- Building fast in-memory caches over master data\n\nKey syntax / tables / Tcodes:\n- TYPE TABLE OF, TYPE SORTED TABLE OF, TYPE HASHED TABLE OF\n- WITH UNIQUE KEY / WITH NON-UNIQUE KEY; INSERT vs APPEND\n- Examples on MARA, MAKT, VBAK; profile with SAT and ST05\n\nInterview keyword: Standard for lists, Sorted for ranges, Hashed for O(1) lookups."
  }
};

const tiers = {
  'internal-tables-019': ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'advanced', 'advanced'],
  'internal-tables-020': ['easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'easy', 'advanced'],
  'internal-tables-021': ['easy', 'medium', 'medium', 'advanced', 'advanced', 'medium', 'easy', 'medium'],
  'internal-tables-022': ['easy', 'easy', 'easy', 'advanced', 'medium', 'medium', 'medium', 'advanced']
};

for (const id of Object.keys(data)) {
  const q = data[id];
  const a = aug[id];
  if (!a) { console.error('Missing aug for', id); continue; }
  const fa = q.followupAnswerBank.map((f, i) => ({ ...f, tier: tiers[id][i] || 'medium' }));
  const newQ = {
    easyUnderstanding: q.easyUnderstanding,
    hinglishMasterExplanation: q.hinglishMasterExplanation,
    interviewMeKyaBolnaHai: q.interviewMeKyaBolnaHai,
    codeExamples: q.codeExamples,
    interviewScriptHinglish: a.interviewScriptHinglish,
    interviewScriptEnglish: a.interviewScriptEnglish,
    wordByWordSamjho: a.wordByWordSamjho,
    commonMistakesSection: a.commonMistakesSection,
    quickRevisionNotes: a.quickRevisionNotes,
    followupAnswerBank: fa
  };
  data[id] = newQ;
}

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Wrote', path);
