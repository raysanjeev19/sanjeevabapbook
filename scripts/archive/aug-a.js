const fs = require('fs');
const path = '/Users/sanjayray/boook/src/data/answers/internal-tables-a.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const aug = {
  'internal-tables-001': {
    interviewScriptHinglish: "Sir, internal table ek temporary in-memory data container hai jo program ke runtime tak hi exist karta hai aur program end hone pe automatically clear ho jaata hai. Database table jaise persistent nahi hota — yeh sirf application server memory mein rehta hai. Practically, mere project mein main VBAK se sales orders SELECT karke ek internal table mein laata hoon, phir LOOP AT ASSIGNING FIELD-SYMBOL se process karta hoon — total calculate karke ALV grid mein dikhata hoon. Iska benefit yeh hai ki database round trips minimum hote hain aur memory mein processing kaafi fast hoti hai, especially bulk reports mein.",
    interviewScriptEnglish: "An internal table is a temporary data container in ABAP that exists only during program execution and is automatically released when the program ends. It is used to fetch data from database tables into memory, process it through LOOP statements, and display or transfer the results. Compared to database tables, internal tables provide much faster processing since all operations occur in application server memory. In my projects, I typically use internal tables for ALV reports, conversion programs, and any logic requiring multi-row in-memory manipulation, which improves performance and reduces database load.",
    wordByWordSamjho: [
      { keyword: "TYPES BEGIN OF / END OF", meaning: "Custom structure definition with multiple fields grouped together." },
      { keyword: "DATA ... TYPE TABLE OF", meaning: "Declares a standard internal table based on a structure type." },
      { keyword: "SELECT ... INTO TABLE @lt_orders", meaning: "Bulk fetches database rows into the internal table in one round trip." },
      { keyword: "WHERE", meaning: "Filters which rows are read from the database table." },
      { keyword: "LOOP AT ... ASSIGNING FIELD-SYMBOL", meaning: "Iterates rows using a direct pointer instead of copying each row." },
      { keyword: "ENDLOOP", meaning: "Closes the LOOP block." },
      { keyword: "WRITE: /", meaning: "Outputs values to the classic list with a new line." },
      { keyword: "sy-datum", meaning: "System field holding the current application server date." }
    ],
    commonMistakesSection: [
      { mistake: "Using LOOP AT ... INTO work area for large tables without need.", whyWrong: "Each iteration copies the row from internal table into the work area, adding memory and CPU overhead.", correctApproach: "Use LOOP AT ... ASSIGNING FIELD-SYMBOL(<fs>) for read-mostly access; this avoids the copy and improves runtime on large MARA or VBAK result sets." },
      { mistake: "Running SELECT inside a LOOP to enrich each row.", whyWrong: "Generates N+1 database round trips, which ST05 trace will show as the main bottleneck.", correctApproach: "Bulk SELECT once into an internal table, or use FOR ALL ENTRIES / JOIN to fetch all needed data up front." },
      { mistake: "Forgetting that an internal table is local to the program.", whyWrong: "Developers expect data to persist across sessions, but the table is wiped at program end.", correctApproach: "If persistence is needed, INSERT/UPDATE back into the database table or use ABAP Shared Objects for cross-session caches." },
      { mistake: "Never freeing very large internal tables after use.", whyWrong: "Memory keeps growing in long-running background jobs and may hit ABAP memory limits causing ST22 dumps.", correctApproach: "Issue FREE lt_table or CLEAR lt_table once processing is complete, especially before processing the next large block of data." }
    ],
    quickRevisionNotes: "What: Internal table is an in-memory temporary table used to hold and process rows inside an ABAP program.\n\nUsed for:\n- Holding result sets from SELECT statements\n- Passing bulk data between routines and function modules\n- Building output for ALV reports and BAPIs\n\nKey syntax / tables / Tcodes:\n- DATA lt TYPE TABLE OF vbak / SELECT ... INTO TABLE @lt\n- LOOP AT ... ASSIGNING FIELD-SYMBOL(<fs>)\n- Real tables: VBAK, VBAP, MARA, MSEG; Tcode ST05 for SQL trace, SAT for runtime analysis, ST22 for memory dumps\n\nInterview keyword: Runtime memory table — fetch once, process in memory, free at end."
  },
  'internal-tables-002': {
    interviewScriptHinglish: "Sir, ABAP mein internal tables ke teen main types hote hain — standard, sorted aur hashed. Standard table sabse flexible hai, duplicate allow karta hai aur linear search O(n) deta hai, output lists ke liye best hai. Sorted table apne key pe automatically sort rehti hai, binary search se O(log n) deti hai, medium size lookup ke liye useful hai. Hashed table hash function se O(1) constant time access deti hai, unique key mandatory hai aur large lookup tables ke liye perfect hai. Mere project mein MAKT description table ko maine hashed banaaya — 80 hazaar rows pe har lookup instant ho gaya, jisse pura report dramatically fast hua.",
    interviewScriptEnglish: "ABAP supports three internal table types: standard, sorted, and hashed. Standard tables allow duplicates and use linear search of O(n), suitable for output lists. Sorted tables maintain key order automatically and provide binary search of O(log n), ideal for medium sized key-based lookups. Hashed tables use a hash function for O(1) constant-time access and require a unique key, making them best for large lookup tables. Choosing the right type based on access pattern delivers measurable performance gains in batch jobs and reports, especially when reading from large master data tables.",
    wordByWordSamjho: [
      { keyword: "TYPE TABLE OF", meaning: "Declares a standard internal table (default type)." },
      { keyword: "TYPE SORTED TABLE OF", meaning: "Declares a sorted internal table maintained in key order." },
      { keyword: "TYPE HASHED TABLE OF", meaning: "Declares a hashed internal table with O(1) access by unique key." },
      { keyword: "WITH UNIQUE KEY", meaning: "Enforces only one row per key combination; duplicates dump." },
      { keyword: "WITH NON-UNIQUE KEY", meaning: "Allows multiple rows sharing the same key value." },
      { keyword: "READ TABLE ... WITH TABLE KEY", meaning: "Reads using the defined primary key with optimised access." },
      { keyword: "UP TO 1000 ROWS", meaning: "Limits the SELECT result set to the first 1000 rows." },
      { keyword: "ASSIGNING FIELD-SYMBOL(<s1>)", meaning: "Inline field-symbol binding to the found row without copy." }
    ],
    commonMistakesSection: [
      { mistake: "Defaulting to standard table for large key-based lookup tables like MAKT or MARA.", whyWrong: "Each READ TABLE becomes O(n) and inner loops over millions of rows blow up runtime.", correctApproach: "Use HASHED TABLE WITH UNIQUE KEY when reading by full key, or SORTED TABLE WITH NON-UNIQUE KEY for partial key reads." },
      { mistake: "Using HASHED TABLE for a 100 row config table.", whyWrong: "Hash bucket overhead is wasted on tiny tables and there is no measurable performance benefit.", correctApproach: "For small tables (under a few thousand rows) a STANDARD TABLE is simpler and uses less memory." },
      { mistake: "Declaring HASHED TABLE WITH NON-UNIQUE KEY.", whyWrong: "Hashed tables only support UNIQUE KEY; the syntax check rejects non-unique hashed tables.", correctApproach: "Choose SORTED TABLE WITH NON-UNIQUE KEY when duplicates are expected, or deduplicate source data before loading into a hashed table." },
      { mistake: "Reading hashed table with WITH KEY instead of WITH TABLE KEY.", whyWrong: "WITH KEY falls back to linear scan, throwing away the O(1) hash advantage silently.", correctApproach: "Always use READ TABLE ... WITH TABLE KEY field = value to trigger hash access on hashed tables." }
    ],
    quickRevisionNotes: "What: Internal tables come in three types with different access characteristics — standard, sorted, hashed.\n\nUsed for:\n- Standard: output lists, sequential processing, ALV input\n- Sorted: medium size tables read by key with optional duplicates\n- Hashed: large lookup tables read by full unique key inside loops\n\nKey syntax / tables / Tcodes:\n- TYPE TABLE OF / TYPE SORTED TABLE OF / TYPE HASHED TABLE OF\n- WITH UNIQUE KEY vs WITH NON-UNIQUE KEY\n- Examples on MARA, MAKT, T001, TCURR; profile with SAT and ST05\n\nInterview keyword: Standard = flexible, Sorted = log n, Hashed = O(1) by full key."
  },
  'internal-tables-003': {
    interviewScriptHinglish: "Sir, hashed internal table tab use karta hoon jab mujhe ek bade reference dataset pe baar baar single row key se dhundni ho. Hash function full unique key pe O(1) constant time access deta hai, isliye lookup time table size pe depend nahi karta. Practically mere project mein MAKT material description table ko hashed table mein load karta hoon — 80 hazaar rows ek baar load ho jaate hain, phir VBAP items ke loop mein har material ka description READ TABLE WITH TABLE KEY se instantly milta hai. Iska benefit yeh hai ki nested LOOP ki linear scan se bachte hain aur batch report ka runtime dramatically reduce hota hai.",
    interviewScriptEnglish: "A hashed internal table provides O(1) constant-time key-based access using a hash function and a mandatory unique key. It is best suited for large reference tables that are loaded once and read frequently inside loops. In my projects, I load tables like MAKT or TCURR into a hashed table at program start and then perform READ TABLE WITH TABLE KEY for each iteration of the main processing loop. This eliminates linear scans and significantly reduces runtime for large batch reports, especially when the lookup table contains tens of thousands of rows.",
    wordByWordSamjho: [
      { keyword: "HASHED TABLE OF makt", meaning: "Declares a hashed internal table based on table MAKT structure." },
      { keyword: "WITH UNIQUE KEY matnr spras", meaning: "Composite unique key formed by material number and language." },
      { keyword: "SELECT matnr, spras, maktx FROM makt", meaning: "Reads only the required columns from MAKT (no SELECT *)." },
      { keyword: "INTO TABLE @lt_makt", meaning: "Bulk-fills the hashed table from the SELECT result." },
      { keyword: "READ TABLE ... WITH TABLE KEY", meaning: "Triggers O(1) hash access for the given unique key." },
      { keyword: "COND #( WHEN sy-subrc = 0 THEN ... ELSE ... )", meaning: "Inline conditional expression to set a default if row not found." },
      { keyword: "sy-langu", meaning: "System field holding the current logon language." }
    ],
    commonMistakesSection: [
      { mistake: "Using APPEND on a hashed internal table.", whyWrong: "Hashed tables have no defined order, so APPEND is a syntax error at compile time.", correctApproach: "Use INSERT ... INTO TABLE lt_hashed; SAP will hash the key and place the row internally." },
      { mistake: "Reading hashed table with only part of the composite key.", whyWrong: "Hash access requires the full unique key; partial reads raise a runtime error.", correctApproach: "Provide all key fields in READ TABLE WITH TABLE KEY, or use a SORTED TABLE with a partial key instead." },
      { mistake: "Loading a hashed table inside a LOOP from the database.", whyWrong: "Repeated SELECT calls cause N+1 round trips, the most common ST05 finding.", correctApproach: "Load the hashed lookup table once before the main LOOP and only do in-memory READ TABLE inside the loop." },
      { mistake: "Skipping the SY-SUBRC check after READ TABLE.", whyWrong: "If the row is missing the field-symbol holds stale data, leading to silent data errors.", correctApproach: "Always check IF sy-subrc = 0 or use COND with an ELSE fallback before using the read value." }
    ],
    quickRevisionNotes: "What: Hashed internal table provides O(1) constant-time access by full unique key using a hash function.\n\nUsed for:\n- Large lookup tables read frequently inside loops\n- Master data caches like MAKT, MARA, T001, TCURR\n- Replacing slow READ TABLE WITH KEY on standard tables\n\nKey syntax / tables / Tcodes:\n- DATA lt TYPE HASHED TABLE OF makt WITH UNIQUE KEY matnr spras\n- READ TABLE lt WITH TABLE KEY matnr = lv_mat spras = sy-langu\n- INSERT INTO TABLE (no APPEND); profile with SAT and ST05\n\nInterview keyword: O(1) hash lookup with mandatory unique key."
  },
  'internal-tables-004': {
    interviewScriptHinglish: "Sir, binary search ABAP mein READ TABLE ke saath use hota hai aur sorted standard table pe O(log n) lookup deta hai. Pre-condition critical hai — table us key pe sorted honi chahiye, warna binary search galat ya nahi mila result deta hai bina koi dump ke. Mere project mein jab bade internal tables pe READ TABLE karna hota hai toh ya toh main SORT karke BINARY SEARCH lagaata hoon, ya direct SORTED TABLE TYPE declare karta hoon jo SAP automatically sort maintain karta hai. Iska benefit yeh hai ki 100 hazaar rows pe linear ke 50 hazaar comparisons ki jagah sirf 17 comparisons lagti hain — performance dramatically improve hota hai.",
    interviewScriptEnglish: "Binary search in ABAP is invoked through READ TABLE ... BINARY SEARCH and provides O(log n) lookup on a standard internal table that is already sorted by the search key. The table must be sorted by exactly the search fields, otherwise the algorithm silently returns incorrect or missing rows without any runtime error. In production code I prefer SORTED TABLE TYPE since SAP maintains sort order automatically and eliminates the risk of forgetting the SORT statement. This approach dramatically reduces runtime on large internal tables, especially in loops over hundreds of thousands of rows.",
    wordByWordSamjho: [
      { keyword: "SORT lt_orders BY vbeln", meaning: "Sorts the internal table by the given field in ascending order." },
      { keyword: "READ TABLE ... WITH KEY ... BINARY SEARCH", meaning: "Performs O(log n) binary search on a sorted standard table." },
      { keyword: "ASSIGNING FIELD-SYMBOL(<order>)", meaning: "Binds the found row to a field-symbol without copying it." },
      { keyword: "sy-subrc", meaning: "System return code; 0 means success, 4 means not found." },
      { keyword: "SORTED TABLE OF vbak", meaning: "Declares a sorted internal table that maintains key order automatically." },
      { keyword: "WITH UNIQUE KEY vbeln", meaning: "Primary key definition; SAP enforces uniqueness on inserts." },
      { keyword: "WITH TABLE KEY vbeln = lv_vbeln", meaning: "Uses the defined primary key for optimised access in sorted/hashed tables." }
    ],
    commonMistakesSection: [
      { mistake: "Using READ TABLE BINARY SEARCH without sorting the table first.", whyWrong: "Binary search divides search space based on assumed sort order; without sort it silently returns wrong rows or sy-subrc = 4.", correctApproach: "Always SORT lt_table BY <same fields> before BINARY SEARCH, or use a SORTED TABLE TYPE to make sort order intrinsic." },
      { mistake: "Sorting by one set of fields but binary searching by different fields.", whyWrong: "Binary search needs the table sorted by exactly the same key fields in the same order to find the correct row.", correctApproach: "Ensure SORT BY and READ TABLE WITH KEY use the same fields in the same order, ideally captured by a SORTED TABLE TYPE." },
      { mistake: "Using BINARY SEARCH on hashed tables.", whyWrong: "Hashed tables have no order; the BINARY SEARCH addition is meaningless and may be flagged by syntax check.", correctApproach: "On hashed tables use READ TABLE WITH TABLE KEY which already gives O(1) access without BINARY SEARCH." },
      { mistake: "Using BINARY SEARCH when you need multiple matching rows.", whyWrong: "Binary search returns one arbitrary matching row, not all duplicates.", correctApproach: "Use LOOP AT lt_table WHERE field = value, or parallel cursor with FROM sy-tabix, to process every matching row." }
    ],
    quickRevisionNotes: "What: BINARY SEARCH is a READ TABLE addition that provides O(log n) lookup on a sorted standard internal table.\n\nUsed for:\n- Fast key-based reads on large standard tables\n- Foundation of the parallel cursor optimisation pattern\n- Replacement for linear READ TABLE WITH KEY on big result sets\n\nKey syntax / tables / Tcodes:\n- SORT lt BY vbeln; READ TABLE lt WITH KEY vbeln = lv BINARY SEARCH\n- Or use TYPE SORTED TABLE OF vbak WITH UNIQUE KEY vbeln (automatic)\n- Profile gains with SAT and verify behaviour using ST05\n\nInterview keyword: O(log n) on sorted table — sort first or use SORTED TABLE TYPE."
  },
  'internal-tables-005': {
    interviewScriptHinglish: "Sir, parallel cursor ek advanced technique hai jisme do related sorted internal tables ko efficiently process karte hain bina nested full scan ke. Idea yeh hai ki dono tables same join key pe sorted ho, outer loop header pe chale, aur inner table ke liye binary search se starting index dhundh ke LOOP FROM sy-tabix use karte hain, key change hote hi EXIT. Mere project mein VBAK aur VBAP ka header-item processing isi pattern se kiya — 15 hazaar headers aur 1.2 lakh items ka jo report 35 minute leta tha woh 2 minute ke andar khatam ho gaya. Complexity O(n times m) se ghatkar O(n plus m) ho jaati hai jo bade datasets pe massive improvement deti hai.",
    interviewScriptEnglish: "Parallel cursor is an advanced ABAP optimisation that processes two related sorted internal tables together without nested full scans. Both tables are sorted by the same join key; for each header row the algorithm uses binary search with TRANSPORTING NO FIELDS to find the starting index in the item table, then loops FROM that index and EXITs when the key changes. This reduces complexity from O(n*m) to O(n+m). It is the standard pattern for in-memory joins such as VBAK with VBAP or EKKO with EKPO when the data is already resident in internal tables.",
    wordByWordSamjho: [
      { keyword: "SORTED TABLE OF vbak", meaning: "Internal table that automatically maintains key order required for parallel cursor." },
      { keyword: "WITH NON-UNIQUE KEY vbeln posnr", meaning: "Composite key allowing multiple items per header in the item table." },
      { keyword: "FOR ALL ENTRIES IN @lt_vbak", meaning: "Fetches related VBAP items based on header keys already in memory." },
      { keyword: "READ TABLE ... BINARY SEARCH TRANSPORTING NO FIELDS", meaning: "Finds starting index in the item table without copying any fields." },
      { keyword: "sy-tabix", meaning: "System field holding the index of the last successfully read row." },
      { keyword: "LOOP AT ... FROM sy-tabix", meaning: "Begins iteration from the saved index instead of scanning from row 1." },
      { keyword: "EXIT", meaning: "Terminates the current LOOP, used when the inner key no longer matches the header key." },
      { keyword: "IS NOT INITIAL", meaning: "Guard ensuring the driver table is non-empty before FOR ALL ENTRIES." }
    ],
    commonMistakesSection: [
      { mistake: "Not sorting both tables on the same join key before starting parallel cursor.", whyWrong: "Binary search returns wrong starting index, so inner loop processes wrong items or none at all silently.", correctApproach: "Declare both tables as SORTED TABLE on the join key, or SORT both manually using the same field order before the outer loop." },
      { mistake: "Forgetting the EXIT condition inside the inner LOOP.", whyWrong: "Inner loop continues into the next header's items, leading to inflated quantities and silent data corruption.", correctApproach: "Make IF <itm>-vbeln <> <hdr>-vbeln. EXIT. ENDIF. the very first statement inside the inner LOOP." },
      { mistake: "Skipping the IS NOT INITIAL guard before FOR ALL ENTRIES on VBAP.", whyWrong: "If the driver table is empty, FOR ALL ENTRIES selects every row from VBAP, causing memory overflow dumps in ST22.", correctApproach: "Always wrap FOR ALL ENTRIES in IF lt_driver IS NOT INITIAL ... ENDIF." },
      { mistake: "Using parallel cursor when a single SQL JOIN would do.", whyWrong: "In S/4HANA HANA-based JOINs are extremely fast and reduce code complexity.", correctApproach: "Prefer ABAP SQL JOIN or CDS views for straight DB joins; reserve parallel cursor for cases where data was already enriched in memory." }
    ],
    quickRevisionNotes: "What: Parallel cursor processes two sorted internal tables together in O(n+m) using binary search and LOOP FROM index.\n\nUsed for:\n- In-memory header-item joins like VBAK with VBAP, EKKO with EKPO, BKPF with BSEG\n- Replacing nested LOOP AT ... WHERE patterns that scale poorly\n- Performance optimisation of large batch reports\n\nKey syntax / tables / Tcodes:\n- SORTED TABLE WITH NON-UNIQUE KEY for the inner table\n- READ TABLE ... BINARY SEARCH TRANSPORTING NO FIELDS to get sy-tabix\n- LOOP AT ... FROM sy-tabix with IF key <> header_key EXIT as first line\n- Measure improvement with SAT; verify SQL access via ST05\n\nInterview keyword: O(n+m) in-memory join via binary search + FROM sy-tabix + EXIT."
  }
};

// Tier maps for followups - based on question complexity
const tiers = {
  'internal-tables-001': ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'advanced', 'easy'],
  'internal-tables-002': ['easy', 'medium', 'medium', 'easy', 'medium', 'advanced', 'easy', 'medium'],
  'internal-tables-003': ['easy', 'medium', 'easy', 'medium', 'medium', 'advanced', 'advanced'],
  'internal-tables-004': ['medium', 'medium', 'easy', 'medium', 'easy', 'advanced', 'advanced'],
  'internal-tables-005': ['easy', 'medium', 'medium', 'medium', 'advanced', 'easy', 'advanced', 'advanced']
};

for (const id of Object.keys(data)) {
  const q = data[id];
  const a = aug[id];
  if (!a) { console.error('Missing aug for', id); continue; }
  // Build new object preserving order; new fields after codeExamples, before followupAnswerBank
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
