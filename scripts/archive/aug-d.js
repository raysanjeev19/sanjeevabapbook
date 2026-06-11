const fs = require('fs');
const path = '/Users/sanjayray/boook/src/data/answers/internal-tables-d.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const aug = {
  'internal-tables-015': {
    interviewScriptHinglish: "Sir, internal table ke interview traps mein top hai FOR ALL ENTRIES with empty driving table — agar IS NOT INITIAL check miss kiya toh SAP saari rows fetch karta hai, koi filter nahi lagta, aur production mein TSV dump aata hai. Doosra trap hai BINARY SEARCH on standard table — woh kaam karta hai but pehle SORT karna mandatory hai same key pe, warna result silently wrong aata hai bina kisi error ke. Teesra trap hai LOOP AT INTO work area mein modify karna bina MODIFY ke — woh sirf local copy badalta hai, table unchanged rehti hai. Main hamesha ASSIGNING FIELD-SYMBOL ya SORTED TABLE TYPE prefer karta hoon taaki ye silent bugs aae hi nahi.",
    interviewScriptEnglish: "Three internal table interview traps catch most candidates. First: FOR ALL ENTRIES with an empty driver table — without an IS NOT INITIAL guard, SAP drops the WHERE condition and fetches every row from the target table. Second: BINARY SEARCH on a standard table — it does work, but only if SORT was performed by the same key first; otherwise results are silently wrong with no dump. Third: LOOP AT INTO work area updates without a MODIFY statement only change the local copy, leaving the table unchanged. Knowing these traps and using ASSIGNING FIELD-SYMBOL plus SORTED TABLE TYPE prevents most silent bugs.",
    wordByWordSamjho: [
      { keyword: "FOR ALL ENTRIES IN @lt_orders", meaning: "Bulk fetch driven by keys in the driver internal table." },
      { keyword: "IS NOT INITIAL", meaning: "Mandatory guard before FOR ALL ENTRIES to prevent full table fetch." },
      { keyword: "READ TABLE ... BINARY SEARCH", meaning: "Optimized lookup that requires the table to be sorted on the search key first." },
      { keyword: "SORT lt_std BY vbeln", meaning: "Sorts the standard table by the join key, prerequisite for binary search." },
      { keyword: "LOOP AT ... INTO ls_wa", meaning: "Copy-based iteration; modifications stay in the work area unless MODIFY is used." },
      { keyword: "LOOP AT ... ASSIGNING FIELD-SYMBOL(<itm>)", meaning: "Reference-based iteration that updates the table directly." },
      { keyword: "DELETE ADJACENT DUPLICATES COMPARING", meaning: "Removes only consecutive duplicates; needs SORT first to catch all." },
      { keyword: "sy-subrc / sy-tabix", meaning: "System fields holding READ TABLE return code and found index." }
    ],
    commonMistakesSection: [
      { mistake: "Calling FOR ALL ENTRIES without checking IF lt_driver IS NOT INITIAL.", whyWrong: "An empty driver causes SAP to drop the WHERE clause and pull every row from huge tables like VBAP or BSEG.", correctApproach: "Always wrap the SELECT inside IF lt_driver IS NOT INITIAL ... ENDIF to make the guard explicit." },
      { mistake: "Using READ TABLE WITH KEY ... BINARY SEARCH without sorting the standard table first.", whyWrong: "Binary search divides search space assuming sort order; without sort it returns sy-subrc = 4 or the wrong row silently.", correctApproach: "SORT lt BY <same fields> before the READ, or declare the table as SORTED TABLE so order is intrinsic." },
      { mistake: "Modifying ls_wa in LOOP AT INTO and not issuing MODIFY.", whyWrong: "Only the work area copy changes; the internal table is unchanged and the bug is silent.", correctApproach: "Either MODIFY lt FROM ls INDEX sy-tabix immediately after the change, or use LOOP AT ... ASSIGNING FIELD-SYMBOL." },
      { mistake: "Calling DELETE ADJACENT DUPLICATES without a preceding SORT.", whyWrong: "Only consecutive duplicates are removed; scattered duplicates remain in the table.", correctApproach: "SORT lt BY <same fields> before DELETE ADJACENT DUPLICATES FROM lt COMPARING <same fields>." }
    ],
    quickRevisionNotes: "What: Catalog of high impact internal table interview traps that hide silent bugs.\n\nUsed for:\n- Crisp answers in technical interviews\n- Code review checklists for production code\n- Onboarding junior developers on safe patterns\n\nKey syntax / tables / Tcodes:\n- IF lt IS NOT INITIAL guard around FOR ALL ENTRIES\n- SORT lt BY key + READ TABLE ... BINARY SEARCH (or SORTED TABLE TYPE)\n- LOOP AT ... ASSIGNING FIELD-SYMBOL; MODIFY ... INDEX sy-tabix\n- Verify with ST22 dumps, ST05 SQL trace, SAT runtime analysis\n\nInterview keyword: FAE empty, BINARY SEARCH unsorted, LOOP INTO without MODIFY — three silent killers."
  },
  'internal-tables-016': {
    interviewScriptHinglish: "Sir, internal table ka technical documentation likhna ek senior developer ka habit hai jo future maintenance aur code review ko easy banaata hai. Main har significant table ke declaration ke upar ek comment block likhta hoon jisme purpose, table type aur reason, key fields, source SELECT, consumer LOOP, size estimate, aur sort requirements likhe hote hain. TDD level pe ek inventory table maintain karta hoon jo design reviewer ko bina code padhe overview de. FOR ALL ENTRIES jaisi risky construct ke liye explicitly likhta hoon ki IS NOT INITIAL check mandatory hai. Iska benefit yeh hai ki 6 mahine baad bhi koi developer table refactor kar sake safely.",
    interviewScriptEnglish: "Documenting internal tables in a technical design covers six attributes per significant table: table type with the reasoning, key fields, one line purpose, estimated row count for performance planning, source SELECT or method, and consumer LOOP or READ TABLE. I keep an inventory table in the TDD and a structured comment block above each declaration so design reviews and code reviews can proceed without reading the entire program. Sort requirements and FOR ALL ENTRIES guards are documented explicitly because removing them silently breaks downstream operations. This discipline reduces refactoring risk and onboarding effort for new team members.",
    wordByWordSamjho: [
      { keyword: "DATA lt_orders TYPE TABLE OF ty_order_header", meaning: "Declaration commonly preceded by a documented comment block." },
      { keyword: "TYPE HASHED TABLE OF ... WITH UNIQUE KEY", meaning: "Documented table type used for fast key-based lookups." },
      { keyword: "TYPE SORTED TABLE OF ... WITH NON-UNIQUE KEY", meaning: "Documented sorted table allowing range reads and duplicates." },
      { keyword: "FOR ALL ENTRIES IN @lt_orders", meaning: "Risky construct that must be documented with an IS NOT INITIAL guard." },
      { keyword: "SORT lt BY vbeln", meaning: "Sort statement whose downstream BINARY SEARCH and DEDUPLICATION must be noted." },
      { keyword: "DELETE ADJACENT DUPLICATES COMPARING", meaning: "Depends on prior SORT; relationship must be documented explicitly." },
      { keyword: "\"! @parameter it_orders", meaning: "ABAP Doc tag for method parameter documentation visible in SE80 and ADT." },
      { keyword: "COLLECT ls INTO lt_totals", meaning: "Aggregation pattern whose key and numeric fields need TDD documentation." }
    ],
    commonMistakesSection: [
      { mistake: "Declaring internal tables without any explanatory comment block.", whyWrong: "Future maintainers waste hours reverse engineering table purpose, size and access pattern.", correctApproach: "Add a six line comment block above each significant table covering purpose, type, key, source, consumer, size and sort requirements." },
      { mistake: "Skipping FOR ALL ENTRIES documentation including the IS NOT INITIAL requirement.", whyWrong: "Maintainers may remove the guard thinking it is redundant, opening a production dump risk.", correctApproach: "Comment above every FAE SELECT noting 'driver must be IS NOT INITIAL — see TDD section X' so reviewers always check it." },
      { mistake: "Estimating size only from a development client with little data.", whyWrong: "Production volume can be 100x larger, breaking memory and performance plans built on the dev figure.", correctApproach: "Run SELECT COUNT(*) on production-like data, document minimum, typical and maximum row counts in the TDD." },
      { mistake: "Updating code during refactoring but leaving stale comments behind.", whyWrong: "Outdated documentation actively misleads future developers and is worse than no documentation at all.", correctApproach: "Treat comment updates as part of the refactoring task; add a dated refactoring note explaining the change." }
    ],
    quickRevisionNotes: "What: Standard documentation pattern for internal tables in ABAP technical design.\n\nUsed for:\n- Reviewable technical design documents\n- Code reviews of large programs and INCLUDEs\n- Safe refactoring and onboarding\n\nKey syntax / tables / Tcodes:\n- Comment block: purpose, type, key, source, consumer, size, sort requirements\n- TDD inventory table for all internal tables\n- ABAP Doc \"! tags for class and method parameter docs; SE80 documentation tab\n\nInterview keyword: Six attributes per table, plus explicit FAE and SORT documentation."
  },
  'internal-tables-017': {
    interviewScriptHinglish: "Sir, internal table effort estimation main teen categories mein karta hoon. Simple report jisme do teen tables aur basic LOOP hai, woh half se one din mein hota hai. Complex ALV with multiple FOR ALL ENTRIES, aggregation aur performance requirements — typically 2 to 3 days. Performance optimization jisme existing code profile karke N plus 1 fix karna hai, woh 1 to 2 days hota hai. Estimate dene se pehle main expected data volume, performance SLA aur requirement clarity confirm karta hoon, aur explicit performance buffer 20 to 30 percent ka rakhta hoon. Mere project mein isse manager ko realistic timeline aur change request justification dono milta hai.",
    interviewScriptEnglish: "I estimate internal table work in three categories. Simple — two or three internal tables with basic LOOP — half to one day including unit testing and review. Complex — multiple tables with FOR ALL ENTRIES, aggregation and performance requirements — two to three days with explicit SAT profiling. Performance optimization of existing code typically one to two days depending on codebase complexity. Before finalising any estimate I confirm production data volume, performance SLA, requirement freeze and whether reference code exists. I include an explicit 20-30% performance buffer and document all assumptions so any scope change leads to a formal change request rather than silent overrun.",
    wordByWordSamjho: [
      { keyword: "DATA lt_orders TYPE TABLE OF ty_order", meaning: "Simple internal table declaration representing baseline effort." },
      { keyword: "FOR ALL ENTRIES IN @lt_headers", meaning: "Pattern that adds development and testing effort due to guard and merge logic." },
      { keyword: "HASHED TABLE OF ty_mat WITH UNIQUE KEY matnr", meaning: "Optimised lookup table introducing extra refactoring and testing effort." },
      { keyword: "COLLECT ... INTO lt_summary", meaning: "Aggregation pattern; requires test cases for numeric correctness." },
      { keyword: "SELECT COUNT(*)", meaning: "Pre-estimation query used to validate expected data volume." },
      { keyword: "SAT trace", meaning: "Runtime analysis time bucket included in performance buffer estimates." },
      { keyword: "ABAP Unit METHODS ... FOR TESTING", meaning: "Test method declarations whose authoring time is factored into estimates." },
      { keyword: "IF lt_headers IS NOT INITIAL", meaning: "Mandatory FAE guard that must be coded and tested explicitly." }
    ],
    commonMistakesSection: [
      { mistake: "Estimating without confirmed production data volume.", whyWrong: "Volume drives table type choice, FAE batching behaviour and performance testing effort; surprises blow up the schedule.", correctApproach: "Run SELECT COUNT(*) on production-like tables before quoting and capture minimum, typical and maximum row counts." },
      { mistake: "Hiding performance testing inside development time.", whyWrong: "When SAT finds issues, there is no buffer to absorb optimisation work and the estimate overruns.", correctApproach: "Include an explicit performance testing line (20-30% of dev time) covering SAT profiling, optimisation and re-test." },
      { mistake: "Quoting effort without listing assumptions.", whyWrong: "When requirements drift, the developer has no documented basis to justify a change request.", correctApproach: "Attach an Assumptions section to every estimate covering field list, filter conditions, volume, SLA and data sources." },
      { mistake: "Treating ABAP Unit Tests as optional to meet deadlines.", whyWrong: "Skipping tests pushes defects into UAT where the cost is multiplied two or three times.", correctApproach: "Budget 30-50% extra time for unit tests, including FAE empty case, BINARY SEARCH correctness and COLLECT aggregation." }
    ],
    quickRevisionNotes: "What: Three category framework for estimating internal table work in ABAP.\n\nUsed for:\n- Sprint planning, sizing and change requests\n- Justifying performance buffer and testing time\n- Communicating realistic timelines to managers and clients\n\nKey syntax / tables / Tcodes:\n- Simple (0.5-1 day), Complex (2-3 days), Optimisation (1-2 days)\n- IF lt IS NOT INITIAL guard, HASHED / SORTED TABLE choice, COLLECT\n- Verify with SELECT COUNT(*), SAT, ST05; document with ATC, ABAP Unit\n\nInterview keyword: Volume + SLA + assumptions = honest, defendable estimates."
  },
  'internal-tables-018': {
    interviewScriptHinglish: "Sir, internal tables ke saath jo SAP transactions main daily use karta hoon woh SE38 aur SE80 development ke liye, SAT ya SE30 runtime analysis ke liye, ST05 SQL trace ke liye, aur SM50 ya SM66 memory monitoring ke liye hain. Performance issue aata hai toh main pehle SAT chalata hoon — woh batata hai kaunsa SELECT 5000 baar execute ho raha hai jo SELECT inside LOOP indicate karta hai. Phir ST05 se confirm karta hoon ki FOR ALL ENTRIES batched IN clause generate kar raha hai ya nahi. DB02 se underlying database table indexes verify karta hoon. SM66 se production memory consumption proactively monitor karta hoon taaki user complaint se pehle issues catch ho jaayein.",
    interviewScriptEnglish: "The transactions most connected with internal table work are SE38 or SE80 for development and refactoring with Where-Used, SAT — or SE30 on older systems — for ABAP runtime analysis, ST05 for SQL trace to validate FOR ALL ENTRIES efficiency and database access plans, and SM50 or SM66 for memory monitoring during program execution. DB02 confirms table sizes and indexes, validating internal table size estimates. My standard workflow for a performance issue starts with SAT to locate the ABAP bottleneck, moves to ST05 to verify SQL behaviour, and uses SM66 to monitor memory impact, ensuring optimisations are evidence-driven rather than guesswork.",
    wordByWordSamjho: [
      { keyword: "SE38 / SE80", meaning: "ABAP editor and full workbench used to write and refactor internal table code." },
      { keyword: "SAT (RSSAT00)", meaning: "Runtime analysis transaction that profiles ABAP statements and database calls." },
      { keyword: "SE30", meaning: "Legacy runtime analysis tool equivalent to SAT for older ECC systems." },
      { keyword: "ST05", meaning: "Performance trace transaction that records SQL, RFC, table buffer and HTTP traces." },
      { keyword: "SM50 / SM66", meaning: "Work process monitors showing memory and CPU per process, locally and across servers." },
      { keyword: "DB02", meaning: "Database monitor providing table sizes, index information and statistics freshness." },
      { keyword: "ST22", meaning: "Short dump analysis transaction used for TSV and FAE related crashes." },
      { keyword: "Where-Used List", meaning: "SE80 feature that locates every reference to an internal table variable for safe refactoring." }
    ],
    commonMistakesSection: [
      { mistake: "Trying to diagnose performance issues by reading the source instead of running SAT.", whyWrong: "Manual inspection misses N+1 patterns that SAT instantly highlights via execution counts.", correctApproach: "Always activate SAT for the program, sort by Number of Executions and investigate any SELECT with hundreds or thousands of executions." },
      { mistake: "Optimising ABAP without checking database indexes in DB02.", whyWrong: "Even efficient FAE patterns can fall back to full table scans when supporting indexes are missing.", correctApproach: "Use DB02 to confirm the source table has indexes covering WHERE clause fields; raise an index request to basis if needed." },
      { mistake: "Refactoring large programs without using SE80 Where-Used List.", whyWrong: "Manual search across INCLUDEs and local classes misses references, leading to runtime errors after type changes.", correctApproach: "Right-click the internal table variable in SE80, run Where-Used List, and update every SORT, READ TABLE and LOOP usage." },
      { mistake: "Ignoring SM66 in production until users complain.", whyWrong: "By the time complaints arrive, the work process has already hurt other transactions on the server.", correctApproach: "Schedule periodic SM66 reviews during peak hours, looking for work processes with abnormal extended memory consumption." }
    ],
    quickRevisionNotes: "What: Toolkit of SAP transactions used for developing, profiling and operating internal table code.\n\nUsed for:\n- Development and refactoring (SE38, SE80, Where-Used)\n- Performance analysis (SAT, SE30, ST05, DB02)\n- Production monitoring (SM50, SM66, ST22)\n\nKey syntax / tables / Tcodes:\n- /nSAT runtime trace, /nST05 SQL trace, /nST22 dump analysis\n- /nDB02 table sizes and indexes, /nSM66 cross-server memory\n- Tables VBAK, VBAP, MARA, BSEG; profile with ST05 and SAT\n\nInterview keyword: SAT for ABAP, ST05 for SQL, SM66 for memory, SE80 for refactor."
  }
};

const tiers = {
  'internal-tables-015': ['advanced', 'medium', 'medium', 'advanced', 'medium', 'medium', 'medium', 'easy'],
  'internal-tables-016': ['easy', 'medium', 'medium', 'medium', 'medium', 'easy', 'medium', 'advanced'],
  'internal-tables-017': ['medium', 'medium', 'easy', 'medium', 'medium', 'easy', 'advanced', 'advanced'],
  'internal-tables-018': ['easy', 'medium', 'medium', 'medium', 'easy', 'medium', 'advanced', 'easy']
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
