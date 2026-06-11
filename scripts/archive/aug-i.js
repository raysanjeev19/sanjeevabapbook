const fs = require('fs');
const path = '/Users/sanjayray/boook/src/data/answers/internal-tables-i.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const aug = {
  'internal-tables-035': {
    interviewScriptHinglish: "Sir, ek production ticket maine resolve kiya jisme material movement report 3 month range pe timeout ho jaata tha. SAT profiling se identify kiya ki LOOP ke andar 87 hazaar SELECT SINGLE MAKT call ho rahe the — classic N plus 1 problem. Maine internal table se unique materials nikale, SORT plus DELETE ADJACENT DUPLICATES kiya, phir ek single FOR ALL ENTRIES SELECT pre fetch karke READ TABLE BINARY SEARCH ke saath inside loop lookup kiya. Runtime timeout se 8 second pe aa gaya same data range pe. Maine ek ABAP Unit Test add kiya aur ATC check configure ki taaki regression na ho. Ye disciplined approach ne dramatic improvement diya aur business ko clearly visible benefit mila.",
    interviewScriptEnglish: "I resolved a production ticket where a material movement report timed out beyond a 3-month range. SAT profiling identified 87,000 SELECT SINGLE MAKT calls inside the LOOP — a classic N+1 pattern. I extracted unique materials from the result internal table, applied SORT and DELETE ADJACENT DUPLICATES, pre-fetched all descriptions with a single SELECT FOR ALL ENTRIES, and used READ TABLE WITH KEY BINARY SEARCH inside the loop. Runtime dropped from timeout to 8 seconds. I added an ABAP Unit test and configured ATC checks to prevent regression. The fix delivered a measurable business improvement and a sustainable pattern for similar reports.",
    wordByWordSamjho: [
      { keyword: "SELECT matnr, menge, budat ... FROM mseg", meaning: "Loads material movements from MSEG within a date range." },
      { keyword: "WHERE budat BETWEEN @lv_from AND @lv_to", meaning: "Restricts the SELECT to the posting date window provided." },
      { keyword: "DATA lt_unique_mat LIKE lt_movements", meaning: "Copy used to derive a unique material driver table." },
      { keyword: "SORT lt_unique_mat BY matnr / DELETE ADJACENT DUPLICATES", meaning: "Sort and deduplicate sequence preparing the driver for FAE." },
      { keyword: "FOR ALL ENTRIES IN @lt_unique_mat", meaning: "Bulk fetch of MAKT descriptions for the unique materials only." },
      { keyword: "READ TABLE lt_makt WITH KEY matnr = <mv>-matnr BINARY SEARCH", meaning: "O(log n) lookup inside the main LOOP after sorting lt_makt." },
      { keyword: "ABAP Unit / ATC", meaning: "Test and code inspector tools added to prevent regression." },
      { keyword: "SAT", meaning: "Runtime analysis transaction used to identify and confirm the N+1 pattern." }
    ],
    commonMistakesSection: [
      { mistake: "Investigating slow reports without running SAT first.", whyWrong: "Reading code manually misses N+1 patterns that SAT instantly exposes by execution count.", correctApproach: "Always activate SAT, run with realistic data, sort by Number of Executions and tackle the worst offender first." },
      { mistake: "Closing the ticket with the fix but no regression test.", whyWrong: "The same bug reappears as soon as another developer refactors the loop, with no automated safety net.", correctApproach: "Add an ABAP Unit test that fails on N+1 patterns, and configure ATC checks to flag SELECT inside LOOP going forward." },
      { mistake: "Doing FOR ALL ENTRIES on the full movement table without deduplication.", whyWrong: "Forces ABAP to send duplicate keys to the database, slowing the batched IN clauses unnecessarily.", correctApproach: "Derive a unique key driver via SORT + DELETE ADJACENT DUPLICATES before FAE so only distinct materials are sent." },
      { mistake: "Skipping the IS NOT INITIAL guard on the unique materials FAE.", whyWrong: "If the date range returns no movements, FAE would otherwise fetch all rows from MAKT and dump.", correctApproach: "Always wrap the FAE block in IF lt_unique_mat IS NOT INITIAL ... ENDIF." }
    ],
    quickRevisionNotes: "What: Production ticket resolution converting a SELECT-in-LOOP N+1 into a pre-fetched FAE pattern.\n\nUsed for:\n- Performance tickets on movement, posting and order reports\n- Demonstrating SAT-driven investigation in interviews\n- Establishing regression prevention via ABAP Unit and ATC\n\nKey syntax / tables / Tcodes:\n- SAT trace; ST05 SQL verification\n- SORT + DELETE ADJACENT DUPLICATES COMPARING matnr\n- IF lt IS NOT INITIAL guard before FOR ALL ENTRIES on MAKT\n- READ TABLE WITH KEY ... BINARY SEARCH inside LOOP\n\nInterview keyword: Problem + root cause + fix + measurable result + prevention."
  },
  'internal-tables-036': {
    interviewScriptHinglish: "Sir, internal table issues ko main triage, investigate aur fix plus prevent ke teen phases mein handle karta hoon. Triage mein decide karta hoon dump hai, wrong data hai, ya performance hai — accordingly ST22, SAT, ya ABAP debugger use karta hoon. Wrong data ke liye SELECT ke baad, processing ke baad aur display se pehle breakpoints daalta hoon aur har stage pe internal table content inspect karta hoon. Performance issue ke liye SAT immediately N plus 1 patterns aur large unfiltered loads reveal karta hai, top offender pehle fix hota hai. Table expression dumps ke liye TRY CATCH lagaata hoon. Fix ke baad SAT phir se chala kar validate karta hoon, ABAP Unit test likhta hoon aur root cause document karta hoon.",
    interviewScriptEnglish: "I follow a three-phase debugging approach for internal table issues: triage, investigate, fix and prevent. Triage decides the tool — ST22 for dumps, SAT for performance, ABAP debugger for wrong data. For data issues I set breakpoints after SELECT, after processing, and before display to inspect the internal table at each stage. For performance issues SAT reveals N+1 patterns, unfiltered large loads and expensive sorts. Table expression dumps are wrapped in TRY/CATCH or replaced with the VALUE ... DEFAULT operator. After fixing, I re-run SAT or the debugger to validate, add an ABAP Unit regression test, and document the root cause for the team.",
    wordByWordSamjho: [
      { keyword: "BREAKPOINT 1", meaning: "Debug stop point inserted right after the SELECT to verify lt_items content." },
      { keyword: "Conditional breakpoint", meaning: "Debug stop triggered only when a specific field equals a value, e.g. matnr = 'M001'." },
      { keyword: "BREAKPOINT 2", meaning: "Debug stop after the LOOP to confirm computed fields like netwr are correct." },
      { keyword: "lt_config[ param = 'MAX_QTY' ]", meaning: "Table expression lookup that dumps with CX_SY_ITAB_LINE_NOT_FOUND on miss." },
      { keyword: "VALUE ty_config( lt_config[ ... ] DEFAULT VALUE ty_config( ... ) )", meaning: "Safe table expression that returns a default row if the key is missing." },
      { keyword: "TRY ... CATCH cx_sy_itab_line_not_found", meaning: "Exception handler that replaces the missing row with a sensible default." },
      { keyword: "SAT trace", meaning: "Runtime analysis used to find N+1 and SORT/LOOP hotspots." },
      { keyword: "ABAP Unit test", meaning: "Automated regression test added after the fix to lock in correct behaviour." }
    ],
    commonMistakesSection: [
      { mistake: "Debugging wrong data only at the display layer.", whyWrong: "Most data errors originate in the SELECT or processing logic, not the UI, so hours are wasted in the wrong layer.", correctApproach: "Set breakpoints after SELECT, after processing and before display, inspect the internal table at each stage to isolate the failing step." },
      { mistake: "Using lt[ key = val ] table expressions without exception handling.", whyWrong: "A missing row dumps with CX_SY_ITAB_LINE_NOT_FOUND, crashing the program in production.", correctApproach: "Wrap in TRY/CATCH cx_sy_itab_line_not_found or use VALUE ty( lt[ ... ] DEFAULT VALUE ty( ... ) )." },
      { mistake: "Fixing the top symptom without checking other instances in the program.", whyWrong: "Other related occurrences of the same anti-pattern remain and produce new tickets.", correctApproach: "Use SE80 Where-Used and SAT execution counts to find similar patterns, fix them together, and add ATC checks." },
      { mistake: "Skipping ABAP Unit regression tests after debugging is complete.", whyWrong: "The bug can return silently the next time the area is touched, with no automated safety net.", correctApproach: "Add a unit test covering the failing scenario before closing the ticket, and register it in the CI pipeline." }
    ],
    quickRevisionNotes: "What: Three-phase debugging playbook for internal table dumps, data and performance issues.\n\nUsed for:\n- Resolving complex incident tickets\n- Demonstrating structured production support thinking in interviews\n- Establishing regression coverage via ABAP Unit and ATC\n\nKey syntax / tables / Tcodes:\n- ST22 dumps, ABAP debugger watchpoints and conditional breakpoints\n- SAT runtime analysis; ST05 SQL verification\n- VALUE ... DEFAULT operator, TRY/CATCH cx_sy_itab_line_not_found\n\nInterview keyword: Triage, investigate, fix+prevent — same pattern, different tool per issue."
  },
  'internal-tables-037': {
    interviewScriptHinglish: "Sir, internal tables ke performance problems mein top hai SELECT inside LOOP jo N plus 1 database calls banata hai aur ABAP ka sabse bada killer hai. Doosra hai unfiltered SELECT star jo poori bade tables jaise BSEG ya VBAP memory mein laata hai. Teesra hai READ TABLE standard pe bina BINARY SEARCH ke jo O n sequential scan banata hai. Solution hain — pre fetch with FOR ALL ENTRIES guarded by IS NOT INITIAL, HASHED ya SORTED tables for high frequency reads, aur sirf needed fields aur rows SELECT karna. SAT se measure karta hoon, ST12 aur SM50 se memory dekhta hoon, aur before after traces se fixes validate karta hoon.",
    interviewScriptEnglish: "The most common internal table performance problems are: SELECT inside LOOP causing N+1 database calls — the top killer in ABAP; unfiltered SELECT * on large tables that flood memory; and READ TABLE on standard tables without BINARY SEARCH causing O(n) sequential scans. The fixes are: pre-fetch lookup data with SELECT FOR ALL ENTRIES guarded by IS NOT INITIAL, use SORTED or HASHED table types for high-frequency reads, and SELECT only the needed fields and rows. SAT measures execution counts and runtime, ST12 and SM50 expose memory consumption, and before/after traces validate that each fix is real and not anecdotal.",
    wordByWordSamjho: [
      { keyword: "SELECT SINGLE maktx FROM makt ... INSIDE LOOP", meaning: "Anti-pattern producing one database call per outer row." },
      { keyword: "FOR ALL ENTRIES IN @lt_orders", meaning: "Bulk fetch replacing the N+1 pattern with batched queries." },
      { keyword: "IF lt_orders IS NOT INITIAL", meaning: "Mandatory guard preventing full table scans on empty driver." },
      { keyword: "SORT lt_makt BY matnr", meaning: "Prerequisite for BINARY SEARCH on the standard description table." },
      { keyword: "READ TABLE ... WITH KEY matnr = ... BINARY SEARCH", meaning: "O(log n) lookup used in the main LOOP after pre-fetch." },
      { keyword: "HASHED TABLE WITH UNIQUE KEY matnr", meaning: "O(1) lookup table eliminating linear scans on master data." },
      { keyword: "READ TABLE lt_hash WITH TABLE KEY matnr = ...", meaning: "Optimised hash access on the cached lookup table." },
      { keyword: "SAT / ST12 / SM50", meaning: "Profiling and memory monitoring transactions used to validate fixes." }
    ],
    commonMistakesSection: [
      { mistake: "Calling SELECT SINGLE inside an outer LOOP to enrich rows.", whyWrong: "Generates N database round trips, dominating runtime and showing up as the top finding in ST05 and SAT.", correctApproach: "Pre-fetch with SELECT ... FOR ALL ENTRIES guarded by IS NOT INITIAL and use READ TABLE WITH KEY BINARY SEARCH or hashed access inside the loop." },
      { mistake: "Loading large tables with SELECT * and no WHERE clause.", whyWrong: "Pulls hundreds of columns and millions of rows, exhausting memory and triggering TSV dumps.", correctApproach: "Use specific field lists, mandatory WHERE conditions and PACKAGE SIZE chunking when dealing with very large datasets." },
      { mistake: "Reading standard tables WITH KEY without BINARY SEARCH or hash conversion.", whyWrong: "Linear O(n) per read multiplied by outer loop iterations yields quadratic runtime on big data.", correctApproach: "Convert to HASHED TABLE WITH UNIQUE KEY for exact matches, or SORT + BINARY SEARCH for sorted standard tables." },
      { mistake: "Repeatedly sorting the same internal table inside a loop.", whyWrong: "SORT is O(n log n); doing it per iteration multiplies the cost dramatically.", correctApproach: "Sort once outside the loop and either keep a sorted table type or rely on sy-tabix and parallel cursor patterns inside." }
    ],
    quickRevisionNotes: "What: Catalogue of common internal table performance problems and their fixes.\n\nUsed for:\n- Code reviews and ATC remediation\n- Performance audits of legacy reports and batch jobs\n- Convincing stakeholders with measured before/after numbers\n\nKey syntax / tables / Tcodes:\n- IF lt IS NOT INITIAL + FOR ALL ENTRIES; SORT once + BINARY SEARCH\n- HASHED TABLE WITH UNIQUE KEY; SELECT specific fields with WHERE\n- Profile and validate with SAT, ST05, ST12, SM50\n\nInterview keyword: N+1, unfiltered loads, sequential reads — three patterns, three fixes."
  },
  'internal-tables-038': {
    interviewScriptHinglish: "Sir, authorization issues internal tables ke saath tab aati hain jab data bina proper checks ke load ho jaata hai aur internal table mein woh records bhi aa jaate hain jo user ko nahi dekhne chahiye. Sahi approach hai — AUTHORITY CHECK pehle karo, phir SELECT mein authorization relevant fields jaise BUKRS ya WERKS pe WHERE clause se filter lagao, aur kabhi bhi load first delete later approach mat use karo, kyunki data pehle memory mein aa jaata hai jo security risk hai. Multi company reports ke liye pehle authorised company codes ka driver banata hoon, phir FOR ALL ENTRIES sirf un BUKRS pe karta hoon. Sensitive fields ke liye conditional structure aur ALV hide use karta hoon.",
    interviewScriptEnglish: "Authorization issues with internal tables arise when data is loaded without proper checks and the table contains rows the user should not see, which then leak into ALV outputs or downstream services. The correct approach is to perform AUTHORITY-CHECK before the SELECT, restrict the SELECT using WHERE clauses on authorization-relevant fields like BUKRS or WERKS, and avoid the dangerous load-everything-then-delete-unauthorized pattern. For multi-company reports I build a driver of authorised company codes first and run FOR ALL ENTRIES only over them. Sensitive fields like salary or bank data are loaded conditionally on AUTHORITY-CHECK success and hidden from ALV output when not allowed.",
    wordByWordSamjho: [
      { keyword: "AUTHORITY-CHECK OBJECT 'F_BKPF_BUK'", meaning: "Checks display authorisation for accounting documents at company code level." },
      { keyword: "ID 'BUKRS' FIELD lv_bukrs", meaning: "Restricts the authorisation check to a specific company code." },
      { keyword: "ID 'ACTVT' FIELD '03'", meaning: "Activity 03 represents Display access in standard SAP." },
      { keyword: "SELECT belnr, bukrs, bldat, dmbtr FROM bkpf", meaning: "Loads accounting headers using only the fields needed for the report." },
      { keyword: "WHERE bukrs = @lv_bukrs", meaning: "Restricts the result to the authorisation-checked company code." },
      { keyword: "lt_auth_bukrs", meaning: "Driver table containing only company codes the user is authorised to see." },
      { keyword: "FOR ALL ENTRIES IN @lt_auth_bukrs", meaning: "Bulk SELECT limited to authorised company codes only." },
      { keyword: "MESSAGE 'No authorization for company 1000' TYPE 'E'", meaning: "User feedback when AUTHORITY-CHECK fails before SELECT." }
    ],
    commonMistakesSection: [
      { mistake: "Loading all data and deleting unauthorised rows from the internal table afterwards.", whyWrong: "Sensitive data still passes through memory and can leak via logs, debugger or downstream APIs — a serious compliance risk.", correctApproach: "Always perform AUTHORITY-CHECK first and filter the SELECT with WHERE on authorization-relevant fields so unauthorised rows never enter memory." },
      { mistake: "Reusing one AUTHORITY-CHECK result for many company codes.", whyWrong: "Authorisation may be granted for some company codes only; using one check masks failures for others.", correctApproach: "Loop over relevant company codes, call AUTHORITY-CHECK per BUKRS, build a driver of authorised codes and SELECT via FOR ALL ENTRIES." },
      { mistake: "Skipping AUTHORITY-CHECK in background jobs assuming the system handles it.", whyWrong: "Background jobs inherit RFC user authorisations; missing checks expose sensitive data to unintended users via spool or output files.", correctApproach: "Apply the same AUTHORITY-CHECK plus WHERE filtering in background reports and verify with SUIM trace." },
      { mistake: "Displaying sensitive fields in ALV without column-level authorization.", whyWrong: "Even if rows are filtered, sensitive fields like salary or bank account leak when the user lacks field level access.", correctApproach: "Hide or mask sensitive fields in ALV based on AUTHORITY-CHECK, or load them conditionally and skip them in the field catalogue." }
    ],
    quickRevisionNotes: "What: Authorization patterns for safe internal table data loading and display.\n\nUsed for:\n- Multi company financial and sales reports\n- Background jobs and interfaces that bypass dialog auths\n- Compliance-driven access on sensitive HR or finance data\n\nKey syntax / tables / Tcodes:\n- AUTHORITY-CHECK OBJECT 'F_BKPF_BUK' before SELECT\n- WHERE bukrs IN @lt_auth_bukrs; FOR ALL ENTRIES IN @lt_auth_bukrs\n- Verify via SU53 failed checks; SUIM authorisation trace\n\nInterview keyword: AUTHORITY-CHECK before SELECT, filter in WHERE, never load-then-delete."
  }
};

const tiers = {
  'internal-tables-035': ['medium', 'easy', 'medium', 'easy', 'medium', 'advanced', 'easy', 'medium'],
  'internal-tables-036': ['easy', 'medium', 'medium', 'medium', 'medium', 'easy', 'advanced', 'advanced'],
  'internal-tables-037': ['advanced', 'easy', 'medium', 'medium', 'advanced', 'medium', 'medium', 'easy'],
  'internal-tables-038': ['easy', 'medium', 'advanced', 'advanced', 'medium', 'medium', 'medium', 'easy']
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
