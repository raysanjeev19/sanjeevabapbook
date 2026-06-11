const fs = require('fs');
const path = '/Users/sanjayray/boook/src/data/answers/internal-tables-h.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const aug = {
  'internal-tables-031': {
    interviewScriptHinglish: "Sir, internal table mein maximum value find karne ke chaar tareeke hain. LOOP with accumulator classic approach hai jo har row pe compare karta hai aur lv_max update karta hai. ABAP 7.4 plus mein REDUCE expression same kaam ek line mein declarative tarike se karta hai. Agar data abhi database mein hai toh SELECT MAX best hai kyunki HANA column store pe aggregation pushdown hota hai aur sirf ek value network pe aati hai. Sorted table mein descending sort karke first row read shortcut hai lekin O n log n cost hai. Mere project mein context ke hisab se choose karta hoon — in memory ke liye REDUCE, database mein ho toh SELECT MAX with WHERE filter.",
    interviewScriptEnglish: "Finding the maximum value in an internal table can be done in four ways. The classic LOOP with an accumulator variable initialised to zero and updated on each higher value. The ABAP 7.4+ REDUCE expression accomplishes the same in a declarative one liner. SORT descending followed by reading row index 1 is a shortcut for sorted output but costs O(n log n). When data still lives in the database, SELECT MAX( field ) is preferred because HANA pushes the aggregation to the column store and only one value crosses the network. The right method depends on whether data is in memory or in the database.",
    wordByWordSamjho: [
      { keyword: "DATA lv_max_netwr TYPE vbak-netwr VALUE 0", meaning: "Accumulator variable initialised to zero before scanning rows." },
      { keyword: "LOOP AT lt_orders INTO DATA(ls_ord)", meaning: "Iterates the internal table to find the maximum value." },
      { keyword: "IF ls_ord-netwr > lv_max_netwr", meaning: "Comparison that updates the accumulator when a higher value is seen." },
      { keyword: "SORT lt_orders BY netwr DESCENDING", meaning: "Sorts in descending order so the largest value is the first row." },
      { keyword: "lt_orders[ 1 ]-netwr", meaning: "Table expression that reads the first row directly after sorting." },
      { keyword: "REDUCE vbak-netwr( INIT m TYPE ... FOR ls IN ... NEXT m = ... )", meaning: "Functional fold expression returning the maximum in one statement." },
      { keyword: "COND #( WHEN ls-netwr > m THEN ls-netwr ELSE m )", meaning: "Inline conditional that updates the running maximum in REDUCE." },
      { keyword: "SELECT MAX( netwr ) INTO @DATA(lv_db_max) FROM vbak", meaning: "Database aggregation pushed to HANA returning a single value." }
    ],
    commonMistakesSection: [
      { mistake: "Loading the entire table into memory just to find a maximum value.", whyWrong: "Wastes memory and network bandwidth when HANA can compute MAX in a single SQL call.", correctApproach: "Use SELECT MAX( netwr ) FROM vbak WHERE auart = 'OR' to push aggregation to the database." },
      { mistake: "Initialising the accumulator to a hard-coded zero when negative values are possible.", whyWrong: "Negative maximums get masked by the zero starting value and the result is wrong.", correctApproach: "Initialise to the first row's value (or use REDUCE with INIT m = lt[ 1 ]-field) to handle full numeric ranges." },
      { mistake: "Using SORT descending and reading the first row purely to find the max.", whyWrong: "SORT is O(n log n), overkill when a single linear pass O(n) suffices and SORT disturbs the original order.", correctApproach: "Use LOOP with accumulator or REDUCE; sort only if the full sorted order is also needed downstream." },
      { mistake: "Skipping the empty table check before reading lt[ 1 ]-field.", whyWrong: "Reading row 1 of an empty table dumps with CX_SY_ITAB_LINE_NOT_FOUND.", correctApproach: "Guard with IF lt IS NOT INITIAL or wrap the table expression in a TRY/CATCH block." }
    ],
    quickRevisionNotes: "What: Patterns to find the maximum value in an internal table or database table.\n\nUsed for:\n- KPI calculation, max amount, latest date searches\n- Performance critical reports where pushdown matters\n- Modern functional ABAP using REDUCE\n\nKey syntax / tables / Tcodes:\n- LOOP with accumulator IF row > max\n- REDUCE i( INIT m FOR ls IN lt NEXT m = COND #( ... ) )\n- SORT BY field DESCENDING + lt[ 1 ]; SELECT MAX( field ) FROM vbak\n\nInterview keyword: In-memory use REDUCE, in-database use SELECT MAX with WHERE."
  },
  'internal-tables-032': {
    interviewScriptHinglish: "Sir, LOOP aur READ TABLE dono internal table se data access ke tarike hain lekin purpose alag hai. LOOP saari rows iterate karta hai ya WHERE clause se filtered subset, bulk processing ya reporting ke liye. READ TABLE ek specific row dhundta hai key se ya index se, sy subrc check mandatory hai — 0 milne pe, 4 nahi milne pe. Performance angle se LOOP always O n hai. READ TABLE standard pe O n hota hai bina BINARY SEARCH ke, sorted standard pe BINARY SEARCH ke saath O log n, aur hashed pe O 1. Mere project mein frequent single key lookups ke liye HASHED TABLE aur READ TABLE prefer karta hoon.",
    interviewScriptEnglish: "LOOP and READ TABLE serve different access patterns. LOOP iterates over all rows or a WHERE-filtered subset for bulk processing or reporting. READ TABLE searches for a single row by key, index or with BINARY SEARCH on a sorted standard table; sy-subrc must be checked — 0 means found, 4 means not found. LOOP is always O(n). READ TABLE complexity depends on table type: O(n) for plain standard, O(log n) for sorted or standard with BINARY SEARCH, and O(1) for hashed tables. For frequent single-key lookups inside loops, HASHED TABLE plus READ TABLE WITH TABLE KEY is the recommended pattern.",
    wordByWordSamjho: [
      { keyword: "LOOP AT lt_orders ASSIGNING FIELD-SYMBOL(<ord>)", meaning: "Iterates the sales order table with a direct pointer to each row." },
      { keyword: "LOOP AT lt_orders INTO DATA(ls_big) WHERE netwr > 100000", meaning: "Filtered iteration returning only high value orders." },
      { keyword: "HASHED TABLE OF ty_mat WITH UNIQUE KEY matnr", meaning: "O(1) material master cache used for fast READ TABLE." },
      { keyword: "READ TABLE lt_material WITH TABLE KEY matnr = 'MAT001'", meaning: "Optimised hash access returning sy-subrc and the row." },
      { keyword: "ASSIGNING FIELD-SYMBOL(<mat>)", meaning: "Binds the found row to a field-symbol without copying." },
      { keyword: "sy-subrc = 0 / 4", meaning: "Result indicator after READ TABLE; 0 found, 4 not found." },
      { keyword: "MODIFY lt FROM ls INDEX sy-tabix", meaning: "Updates the row at the last successful READ TABLE position." },
      { keyword: "<ord>-netwr = <ord>-netwr * 1.05", meaning: "In place 5% uplift applied via field-symbol inside the LOOP." }
    ],
    commonMistakesSection: [
      { mistake: "Using LOOP AT lt WHERE ... to find a single row.", whyWrong: "Wastes cycles iterating beyond the first match and may scan the entire table.", correctApproach: "Use READ TABLE WITH KEY (or WITH TABLE KEY for sorted/hashed) and check sy-subrc for cleaner single row access." },
      { mistake: "Reading a standard table with READ TABLE WITH KEY on every iteration of an outer loop.", whyWrong: "Each read is O(n), making the outer loop quadratic on large tables like MARA or MAKT.", correctApproach: "Convert the lookup table to HASHED TABLE WITH UNIQUE KEY and use READ TABLE WITH TABLE KEY for O(1) access." },
      { mistake: "Skipping sy-subrc check after READ TABLE.", whyWrong: "When the row is missing, downstream code uses stale or initial work area values silently.", correctApproach: "Always check IF sy-subrc = 0 and CLEAR or default the work area otherwise." },
      { mistake: "Using LOOP WHERE on a standard table for selective access.", whyWrong: "Without sort optimisation, the LOOP still scans every row to check the WHERE condition.", correctApproach: "Use a SORTED TABLE with the WHERE field as key so SAP can binary search the starting position." }
    ],
    quickRevisionNotes: "What: LOOP versus READ TABLE for iterative vs single row access on internal tables.\n\nUsed for:\n- Bulk processing and reporting via LOOP\n- Single row lookups via READ TABLE WITH KEY or TABLE KEY\n- Combined patterns simulating in-memory joins\n\nKey syntax / tables / Tcodes:\n- LOOP AT lt ASSIGNING FIELD-SYMBOL; LOOP AT lt WHERE field = val\n- READ TABLE lt WITH TABLE KEY field = val ASSIGNING FIELD-SYMBOL\n- Tables VBAK, VBAP, MAKT; verify performance with SAT\n\nInterview keyword: LOOP for many rows, READ TABLE for one — choose table type by access pattern."
  },
  'internal-tables-033': {
    interviewScriptHinglish: "Sir, mere recent S/4HANA project mein internal tables ka heavy use BOM explosion report mein hua. Maine STPO aur MAST fields ka custom typed table banaya, ek hashed table UNIQUE KEY MATNR plus STLNR pe rakha already processed components track karne ke liye, aur recursion ke pehle READ TABLE TRANSPORTING NO FIELDS se check karta tha taaki circular BOM infinite loop na bane. Result — 15 level deep BOMs 45 second mein process hote hain. Doosre project mein sales dashboard mein SELECT star 500 hazaar rows load karke 4 minute le raha tha; field list restrict ki, mandatory date filter add ki aur aggregation CDS view pe push ki, runtime 12 second ho gaya — measurable business impact.",
    interviewScriptEnglish: "In my most recent S/4HANA project, I used internal tables extensively for a BOM explosion report. The structure combined STPO and MAST fields, with a hashed lookup table on MATNR + STLNR to track already processed components and prevent infinite recursion on circular BOMs. Before each recursive call I do a READ TABLE TRANSPORTING NO FIELDS guard; if already processed, the branch is skipped. The fix made 15 level explosions complete in 45 seconds. In another project, replacing SELECT * with a field list, mandatory date filter and a CDS view pushdown reduced a 4-minute dashboard load to 12 seconds — concrete business value delivered through correct internal table technique.",
    wordByWordSamjho: [
      { keyword: "TYPES BEGIN OF ty_sales_dashboard ... END OF", meaning: "Custom structure combining sales header, item and material description fields." },
      { keyword: "SELECT ... FROM zv_sales_summary", meaning: "Reads from a CDS view that aggregates and joins on HANA." },
      { keyword: "LOOP AT lt_dashboard INTO DATA(ls) ... COLLECT ls INTO lt_totals", meaning: "Aggregates totals using COLLECT into a separate summary internal table." },
      { keyword: "SORT lt_totals BY netwr DESCENDING", meaning: "Sorts the aggregated table by net revenue for top N output." },
      { keyword: "DELETE lt_totals FROM 11", meaning: "Trims the table to keep only the top 10 rows." },
      { keyword: "HASHED TABLE OF ty_bom_key WITH UNIQUE KEY matnr stlnr", meaning: "Recursion guard table for BOM explosion to prevent infinite loops." },
      { keyword: "READ TABLE lt_processed ... TRANSPORTING NO FIELDS", meaning: "Existence check without copying data; uses sy-subrc only." },
      { keyword: "INSERT VALUE ty_bom_key( ... ) INTO TABLE lt_processed", meaning: "Marks the BOM key as processed so the next recursion skips it." }
    ],
    commonMistakesSection: [
      { mistake: "Recursive BOM explosion without a processed-key guard table.", whyWrong: "Circular BOM definitions trigger infinite recursion and short dumps with stack overflow.", correctApproach: "Maintain a HASHED TABLE WITH UNIQUE KEY MATNR STLNR; READ TABLE TRANSPORTING NO FIELDS before each recursive call." },
      { mistake: "Building dashboards on raw VBAK and VBAP with SELECT *.", whyWrong: "Loads hundreds of unused columns and millions of rows, blowing through memory budgets.", correctApproach: "Use field lists, mandatory date filters and CDS views that aggregate at the database level." },
      { mistake: "Storing aggregated totals back into the same table that holds detail rows.", whyWrong: "Mixed granularity tables confuse downstream code and ALV layouts.", correctApproach: "Keep separate detail and summary internal tables; COLLECT into the summary table only." },
      { mistake: "Trimming top N output with DELETE FROM start position outside the table bounds.", whyWrong: "If the table has fewer rows than the trim threshold, the statement silently does nothing useful.", correctApproach: "Guard with IF lines( lt ) > top_n before DELETE lt FROM (top_n + 1) and add unit tests for small datasets." }
    ],
    quickRevisionNotes: "What: Real S/4HANA project patterns using internal tables for sales dashboards and BOM explosion.\n\nUsed for:\n- Aggregating top revenue lines from VBAK and VBAP\n- Recursive BOM processing with hashed guard tables\n- Demonstrating measured before/after performance gains\n\nKey syntax / tables / Tcodes:\n- HASHED TABLE WITH UNIQUE KEY MATNR STLNR for guard\n- COLLECT, SORT BY netwr DESCENDING, DELETE FROM N for top 10\n- CDS view sources, READ TABLE TRANSPORTING NO FIELDS; profile via SAT\n\nInterview keyword: One simple + one complex story, both with numbers and tools."
  },
  'internal-tables-034': {
    interviewScriptHinglish: "Sir, internal table related production incidents main structured tarike se handle karta hoon — severity assess karta hoon, phir ST22 dumps ke liye, SM50 performance ke liye aur SAT runtime ke liye use karta hoon. Sabse common incident jo maine resolve kiya woh tha FOR ALL ENTRIES bina IS NOT INITIAL check ke — empty driver table ne 5 crore MSEG rows fetch kiye, system slow ho gaya. SM50 mein DB load spike aur ST05 mein filterless SELECT visible tha. Emergency transport mein IS NOT INITIAL guard add kiya, incident 90 minute mein resolve hua. CX_SY_ITAB_LINE_NOT_FOUND dumps ke liye TRY CATCH lagaata hoon, LOOP INTO bug ke liye ASSIGNING FIELD-SYMBOL pe convert karta hoon.",
    interviewScriptEnglish: "I handle internal table production incidents with a structured triage: assess severity, then use ST22 for short dumps, SM50 for performance spikes and SAT for runtime analysis. The most common case I resolved was FOR ALL ENTRIES without an IS NOT INITIAL guard — an empty driver fetched 50 million MSEG rows and degraded the system. SM50 showed a database load spike and ST05 confirmed a filterless SELECT. An emergency transport added the guard and resolved the incident in 90 minutes. For CX_SY_ITAB_LINE_NOT_FOUND dumps I add TRY/CATCH around table expressions, and for LOOP-INTO bugs I convert to ASSIGNING FIELD-SYMBOL with regression tests.",
    wordByWordSamjho: [
      { keyword: "ST22", meaning: "Short dump analysis transaction showing exception class, source line and call stack." },
      { keyword: "SM50 / SM66", meaning: "Work process monitors for memory, CPU and database load per process and across servers." },
      { keyword: "SAT", meaning: "Runtime analysis transaction used to profile ABAP statements and database calls." },
      { keyword: "IF lt_orders IS NOT INITIAL", meaning: "Mandatory FAE guard restored in the emergency transport." },
      { keyword: "HASHED TABLE OF ty_text WITH UNIQUE KEY matnr", meaning: "Description cache built once outside the LOOP for O(1) reads." },
      { keyword: "FOR ALL ENTRIES IN @lt_orders", meaning: "Bulk fetch from MAKT for the relevant materials only." },
      { keyword: "lt_text[ matnr = <o>-matnr ]-maktx", meaning: "Modern table expression replacing the legacy SELECT SINGLE inside LOOP." },
      { keyword: "CATCH cx_sy_itab_line_not_found", meaning: "Exception handler for missing rows in table expression lookups." }
    ],
    commonMistakesSection: [
      { mistake: "Treating CX_SY_ITAB_LINE_NOT_FOUND dumps as data issues instead of code issues.", whyWrong: "Table expression lookups dump on missing keys; ignoring exception handling makes production fragile.", correctApproach: "Wrap lt[ key = val ] in TRY ... CATCH cx_sy_itab_line_not_found or use the VALUE ... DEFAULT operator." },
      { mistake: "Pushing fixes to production without ST05 / SAT evidence.", whyWrong: "Without measurement, the team cannot prove improvement or detect regressions later.", correctApproach: "Run SAT and ST05 before and after the fix, attach screenshots to the incident ticket and the change request." },
      { mistake: "Skipping a regression test after a hot fix on internal table code.", whyWrong: "Re-introduces the same bug during the next refactoring because there is no automated guard.", correctApproach: "Add an ABAP Unit test covering the empty driver case, FAE result and the missing-key path before closing the incident." },
      { mistake: "Communicating only technical jargon to business stakeholders.", whyWrong: "Stakeholders cannot prioritise or sign off on outages they do not understand.", correctApproach: "Use a short business-impact summary: 'Posting blocked for 90 minutes, root cause identified, fix transported, regression test added.'" }
    ],
    quickRevisionNotes: "What: Production incident handling playbook for internal table issues.\n\nUsed for:\n- Triage, root cause analysis and emergency transports\n- Communicating impact and ETA to stakeholders\n- Adding ABAP Unit tests after the fix to prevent regression\n\nKey syntax / tables / Tcodes:\n- ST22, SM50, SM66, SAT, ST05 for triage and validation\n- IF lt IS NOT INITIAL guards; TRY ... CATCH cx_sy_itab_line_not_found\n- HASHED TABLE caches; lt[ key = val ] table expressions\n\nInterview keyword: Triage with ST22/SM50/SAT, hot fix with guard, prevent with tests."
  }
};

const tiers = {
  'internal-tables-031': ['medium', 'medium', 'medium', 'advanced', 'medium', 'advanced', 'easy', 'advanced'],
  'internal-tables-032': ['easy', 'easy', 'medium', 'medium', 'advanced', 'medium', 'advanced', 'medium'],
  'internal-tables-033': ['medium', 'easy', 'advanced', 'medium', 'medium', 'advanced', 'medium', 'easy'],
  'internal-tables-034': ['medium', 'medium', 'advanced', 'advanced', 'medium', 'easy', 'easy', 'medium']
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
