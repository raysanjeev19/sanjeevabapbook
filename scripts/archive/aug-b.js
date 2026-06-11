const fs = require('fs');
const path = '/Users/sanjayray/boook/src/data/answers/internal-tables-b.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const aug = {
  'internal-tables-006': {
    interviewScriptHinglish: "Sir, work area aur field-symbol dono internal table ke saath use hote hain lekin behavior bilkul alag hai. Work area ek copy hai — LOOP AT lt INTO ls karne pe row ki copy ban jaati hai aur original table change karne ke liye MODIFY likhna padta hai. Field-symbol ek pointer hai — LOOP AT lt ASSIGNING FIELD-SYMBOL karne pe direct memory address milta hai, koi copy nahi, change karte hi table update ho jaati hai. Mere project mein 50 hazaar rows wale loops pe maine field-symbol use kiya jisse copy overhead khatam hua aur runtime 25 to 30 percent improve hua. Iska benefit yeh hai ki bulk processing fast ho jaati hai aur code bhi MODIFY statement se bach jaata hai.",
    interviewScriptEnglish: "A work area is a local copy of a row created when we use LOOP AT lt INTO ls — any change stays in the copy until a MODIFY statement writes it back to the table. A field-symbol is a direct pointer to the row created using LOOP AT lt ASSIGNING FIELD-SYMBOL, so any modification immediately updates the underlying internal table. Field-symbols eliminate the copy overhead and improve runtime noticeably on large internal tables, while work areas are useful when we need a safe scratch copy. In production code, ASSIGNING FIELD-SYMBOL is the recommended pattern for bulk processing loops.",
    wordByWordSamjho: [
      { keyword: "LOOP AT ... INTO ls_order", meaning: "Iterates the table by copying each row into the local work area." },
      { keyword: "LOOP AT ... ASSIGNING FIELD-SYMBOL(<order>)", meaning: "Iterates without copying, using a direct pointer to each row." },
      { keyword: "MODIFY lt_orders FROM ls_order", meaning: "Writes the modified work area back into the matching internal table row." },
      { keyword: "FIELD-SYMBOLS", meaning: "Keyword to declare a symbolic pointer that aliases another data object." },
      { keyword: "IS ASSIGNED", meaning: "Runtime check that verifies a field-symbol currently points to a valid object." },
      { keyword: "UNASSIGN", meaning: "Releases the field-symbol so it no longer references any object." },
      { keyword: "TYPE ty_order", meaning: "Declares the work area or field-symbol with the structured type of one table row." }
    ],
    commonMistakesSection: [
      { mistake: "Using LOOP AT ... INTO ls_row to update rows without writing MODIFY.", whyWrong: "Changes happen only on the local copy; the internal table remains unchanged and the bug is silent.", correctApproach: "Either add MODIFY lt FROM ls INDEX sy-tabix immediately after the change or switch to LOOP AT ... ASSIGNING FIELD-SYMBOL." },
      { mistake: "Skipping IS ASSIGNED check before using a field-symbol.", whyWrong: "Accessing an unassigned field-symbol causes FIELD_SYMBOLS_ACCESS_AFTER_FREE dump in ST22 logs.", correctApproach: "Always guard with IF <fs> IS ASSIGNED, and UNASSIGN explicitly when the pointer is no longer needed." },
      { mistake: "Modifying field-symbol rows without realising the table itself is being updated.", whyWrong: "Unexpected data changes propagate to the caller and to downstream MODIFY/UPDATE statements.", correctApproach: "Use a work area copy when you need a scratch value; reserve ASSIGNING for intentional in-place updates." },
      { mistake: "Deleting the current row inside LOOP ... ASSIGNING and continuing to read the field-symbol.", whyWrong: "Field-symbol now points to freed memory and behaviour is undefined across kernel versions.", correctApproach: "Collect indices to delete in a separate table and run DELETE lt FROM TABLE lt_idx after the loop, or use DELETE WHERE." }
    ],
    quickRevisionNotes: "What: Work area is a local row copy; field-symbol is a direct pointer to a table row in memory.\n\nUsed for:\n- INTO work area for safe scratch copies and passing rows to forms/FMs\n- ASSIGNING FIELD-SYMBOL for fast in-place reads and updates inside loops\n- READ TABLE for both single-row lookup styles\n\nKey syntax / tables / Tcodes:\n- LOOP AT lt INTO ls_row vs LOOP AT lt ASSIGNING FIELD-SYMBOL(<fs>)\n- MODIFY lt FROM ls INDEX sy-tabix when using INTO\n- ASSIGN COMPONENT name OF STRUCTURE for dynamic access; debug with ST22 for FIELD_SYMBOLS_ACCESS_AFTER_FREE\n\nInterview keyword: Field-symbol is the pointer; work area is the copy."
  },
  'internal-tables-007': {
    interviewScriptHinglish: "Sir, internal table modify karne ke liye ABAP mein paanch main commands hain — APPEND, INSERT, MODIFY, DELETE aur COLLECT. APPEND standard table ke end mein row add karta hai. INSERT specific index pe ya sorted table mein correct sort position pe insert karta hai. MODIFY existing row ko key se ya INDEX sy-tabix se overwrite karta hai. DELETE WHERE mass delete deta hai aur DELETE ADJACENT DUPLICATES se duplicates remove hote hain sort ke baad. COLLECT GROUP BY style aggregation karta hai — same non-numeric key wali rows ke numeric fields sum kar deta hai. Mere project mein material wise total quantity COLLECT se nikalta hoon jisse extra grouping logic nahi likhni padti.",
    interviewScriptEnglish: "ABAP provides five core statements to manage internal table data: APPEND, INSERT, MODIFY, DELETE and COLLECT. APPEND adds a row to the end of a standard table, INSERT places a row at a specific index or at the correct sort position in a sorted table, MODIFY overwrites an existing row identified by key fields or by INDEX, DELETE removes rows by key, index, or mass WHERE condition, and COLLECT aggregates numeric fields for rows sharing the same non-numeric key. Choosing the right command keeps internal table manipulation efficient, readable, and aligned with the table type in use.",
    wordByWordSamjho: [
      { keyword: "APPEND ls_order TO lt_orders", meaning: "Adds the work area as the last row of a standard internal table." },
      { keyword: "INSERT ... INTO TABLE", meaning: "Inserts a row at the SAP determined sorted position for sorted/hashed tables." },
      { keyword: "INSERT ... INTO lt_orders INDEX n", meaning: "Inserts at the specified index in a standard table, shifting rows down." },
      { keyword: "MODIFY lt_orders FROM ls_order INDEX sy-tabix", meaning: "Updates the current LOOP row directly by its index." },
      { keyword: "MODIFY ... TRANSPORTING", meaning: "Updates only the listed fields, leaving the rest of the row unchanged." },
      { keyword: "DELETE lt_orders WHERE", meaning: "Mass deletes all rows matching the given condition in one statement." },
      { keyword: "DELETE ADJACENT DUPLICATES ... COMPARING", meaning: "Removes consecutive duplicate rows comparing the specified fields." },
      { keyword: "COLLECT ls_order INTO lt_totals", meaning: "Adds numeric fields to an existing row with the same non-numeric key, else inserts." }
    ],
    commonMistakesSection: [
      { mistake: "Using APPEND on a sorted or hashed table.", whyWrong: "Sorted and hashed tables manage their own ordering; APPEND raises a syntax or runtime error.", correctApproach: "Use INSERT ... INTO TABLE so SAP places the row at the correct hash or sort position." },
      { mistake: "Running DELETE ADJACENT DUPLICATES without sorting first.", whyWrong: "Only consecutive duplicates are removed, so genuine duplicates that are not adjacent survive silently.", correctApproach: "Always SORT lt_orders BY <same fields> COMPARING ... before DELETE ADJACENT DUPLICATES." },
      { mistake: "Expecting MODIFY to insert when no key match is found.", whyWrong: "MODIFY sets sy-subrc = 4 and does nothing if no row matches; data update is silently lost.", correctApproach: "After MODIFY, check sy-subrc and APPEND/INSERT on failure to implement an upsert pattern." },
      { mistake: "Using MODIFY inside LOOP without INDEX sy-tabix.", whyWrong: "Without INDEX, MODIFY performs a key search on each iteration, degrading large loops to O(n^2).", correctApproach: "Write MODIFY lt FROM ls INDEX sy-tabix, or use LOOP AT ... ASSIGNING and update the field-symbol directly." }
    ],
    quickRevisionNotes: "What: Standard CRUD style statements for internal tables — APPEND, INSERT, MODIFY, DELETE, COLLECT.\n\nUsed for:\n- Building output lists, applying calculations, removing duplicates, aggregating totals\n- Standard tables for APPEND/COLLECT; sorted/hashed tables for key based INSERT\n- Bulk modifications via DELETE WHERE and APPEND LINES OF\n\nKey syntax / tables / Tcodes:\n- APPEND ls TO lt, INSERT ls INTO TABLE lt, MODIFY lt FROM ls INDEX sy-tabix\n- DELETE lt WHERE field = val, DELETE ADJACENT DUPLICATES ... COMPARING\n- COLLECT ls INTO lt_totals; profile loops via SAT and table writes via ST05\n\nInterview keyword: COLLECT = ABAP GROUP BY SUM, MODIFY needs INDEX inside LOOP."
  },
  'internal-tables-008': {
    interviewScriptHinglish: "Sir, deep structure ka matlab hai ek structure ke andar dusra internal table embedded hai — jaise VBAK header row ke andar uske VBAP items ki poori list rakhna. Yeh hierarchical data, ALV tree display aur JSON ya XML serialization ke liye ideal hai. Practically maine OData service mein header item expand pattern ke liye deep structure use kiya, jisse single response mein parent aur child data dono client ko mil gaya. Lekin bade dataset pe deep structure memory heavy hoti hai aur TSV_TNEW_PAGE_ALLOC_FAILED dump aa sakta hai, isliye 50 hazaar se zyada outer rows pe main flat tables aur join logic prefer karta hoon.",
    interviewScriptEnglish: "A deep structure is an internal table whose row contains another internal table as a component, allowing hierarchical data to be represented in memory. Typical use cases include ALV tree displays, OData header-item expand patterns, and JSON or XML serialisation using /UI2/CL_JSON or CALL TRANSFORMATION. Deep structures simplify parent-child handling but consume significant memory because each nested table carries its own management overhead. For large volumes I prefer flat tables with explicit linking keys, reserving deep structures for genuine hierarchical output requirements.",
    wordByWordSamjho: [
      { keyword: "TYPES BEGIN OF ty_item ... END OF ty_item", meaning: "Defines the structure for one inner row, here a VBAP line item." },
      { keyword: "TYPES ty_items TYPE STANDARD TABLE OF ty_item WITH DEFAULT KEY", meaning: "Internal table type used as the nested component inside the outer structure." },
      { keyword: "items TYPE ty_items", meaning: "Embeds a full internal table as a single field of the outer structure." },
      { keyword: "VALUE ty_order( ... )", meaning: "Inline constructor expression that builds a populated outer structure." },
      { keyword: "VALUE #( FOR item IN ... WHERE ... )", meaning: "Table comprehension that filters rows from a source table into the nested table." },
      { keyword: "/UI2/CL_JSON=>serialize", meaning: "Standard class that serialises ABAP data including deep structures into JSON." },
      { keyword: "FREE <o>-items", meaning: "Releases memory of the nested internal table when no longer needed." }
    ],
    commonMistakesSection: [
      { mistake: "Building a deep structure with SELECT inside a LOOP, one inner table per outer row.", whyWrong: "Creates N database round trips that show up as the top finding in ST05 SQL trace.", correctApproach: "Fetch all items once with FOR ALL ENTRIES into a flat table, then distribute into the nested component using a table comprehension." },
      { mistake: "Using deep structures for tens of thousands of outer rows.", whyWrong: "Each nested table carries per-instance overhead, leading to TSV_TNEW_PAGE_ALLOC_FAILED in ST22.", correctApproach: "Use flat tables joined by a key for large volumes; reserve deep structures for ALV tree or hierarchical output of moderate size." },
      { mistake: "Calling FREE only on the outer table.", whyWrong: "Nested internal table handles may persist depending on kernel version, leaking heap memory in long batch jobs.", correctApproach: "LOOP ASSIGNING <o> and FREE <o>-items before FREE lt_outer to release all nested instances explicitly." },
      { mistake: "Reusing a deep structure work area in a loop with only CLEAR ls_row.", whyWrong: "Older ABAP runtimes do not reset the nested table component, so previous items leak into the new row.", correctApproach: "Explicitly CLEAR ls_row-items or rebuild the row using ls_row = VALUE ty_order( ) before populating." }
    ],
    quickRevisionNotes: "What: Deep structure is an internal table whose row contains another internal table as a field.\n\nUsed for:\n- ALV tree displays with parent/child nodes\n- OData $expand and JSON/XML hierarchical serialisation\n- In-memory representation of header-item relationships like VBAK/VBAP\n\nKey syntax / tables / Tcodes:\n- TYPES BEGIN OF ... items TYPE ty_items ... END OF\n- /UI2/CL_JSON=>serialize / CALL TRANSFORMATION for JSON/XML\n- Volume guards using DESCRIBE TABLE, SAT memory mode, ST22 TSV dumps\n\nInterview keyword: Nested itab inside a structure — powerful for hierarchy, heavy on memory."
  },
  'internal-tables-009': {
    interviewScriptHinglish: "Sir, internal tables ABAP work process ki extended memory mein rehti hain, isliye memory management critical hai warna TSV_TNEW_PAGE_ALLOC_FAILED dump aata hai. Main hamesha SELECT mein sirf needed fields lata hoon, WHERE clause mandatory rakhta hoon, processing ke baad temporary tables pe FREE call karta hoon, aur bade datasets ke liye SELECT PACKAGE SIZE pattern use karta hoon taaki ek time pe sirf chunk memory mein ho. CLEAR header line ke liye hai, REFRESH rows hata kar memory hold karta hai aur FREE memory release karta hai. Mere project mein in patterns se 5 GB ka batch job 50 MB stable memory pe chala.",
    interviewScriptEnglish: "Internal tables live in the ABAP work process extended memory, so disciplined memory management prevents TSV_TNEW_PAGE_ALLOC_FAILED dumps. Best practices include selecting only required fields, mandatory WHERE clauses, processing large data in SELECT ... PACKAGE SIZE chunks, calling FREE on temporary tables once their data is consumed, and writing intermediate results to Z-tables instead of accumulating everything in memory. Understanding the difference between CLEAR, REFRESH and FREE is essential: CLEAR works on the header line, REFRESH wipes rows but retains memory, and FREE releases both rows and allocated memory back to the heap.",
    wordByWordSamjho: [
      { keyword: "FREE lt_orders", meaning: "Deletes all rows and releases allocated memory back to the work process heap." },
      { keyword: "REFRESH lt_orders", meaning: "Deletes all rows but keeps the allocated memory for fast reuse." },
      { keyword: "CLEAR lt_orders", meaning: "Resets the header line; for tables without header line, also clears rows." },
      { keyword: "INITIAL SIZE n", meaning: "Pre-allocates memory hint for approximately n rows to reduce reallocations." },
      { keyword: "SELECT ... PACKAGE SIZE 1000", meaning: "Cursor based fetch returning rows in chunks of 1000 to bound memory usage." },
      { keyword: "DESCRIBE TABLE ... LINES", meaning: "Returns the current row count, useful for diagnosing unexpectedly large tables." },
      { keyword: "COMMIT WORK", meaning: "Closes the SAP LUW, releasing locks and intermediate memory in long jobs." }
    ],
    commonMistakesSection: [
      { mistake: "Using SELECT * FROM bseg or vbak into an internal table.", whyWrong: "Hundreds of unused fields balloon network transfer and ABAP heap consumption, often triggering TSV dumps.", correctApproach: "List only the needed fields like bukrs, belnr, gjahr, dmbtr and filter with WHERE on indexed columns." },
      { mistake: "Forgetting to FREE large temporary tables after processing.", whyWrong: "Memory keeps accumulating across batch iterations until the work process exceeds its quota.", correctApproach: "Issue FREE lt_temp at the end of each processing block, and prefer FREE over REFRESH when the table will not be reused." },
      { mistake: "Loading entire huge tables in one SELECT without PACKAGE SIZE.", whyWrong: "Multi-million row loads instantly consume gigabytes of memory and dump in ST22.", correctApproach: "Use SELECT ... INTO TABLE @lt_chunk PACKAGE SIZE 1000 with ENDSELECT to process bounded chunks and FREE in between." },
      { mistake: "Treating CLEAR and FREE as interchangeable.", whyWrong: "CLEAR does not release memory for tables with header lines, and REFRESH keeps the allocation alive, masking memory leaks.", correctApproach: "Use FREE when memory should be returned to the heap; use REFRESH only when the same table will be repopulated immediately." }
    ],
    quickRevisionNotes: "What: Internal tables consume application server extended memory; poor management leads to ST22 dumps.\n\nUsed for:\n- Tuning batch jobs and high volume reports\n- Avoiding TSV_TNEW_PAGE_ALLOC_FAILED in production\n- Keeping long-running programs at stable memory footprint\n\nKey syntax / tables / Tcodes:\n- SELECT specific fields with WHERE; PACKAGE SIZE for chunking\n- FREE vs REFRESH vs CLEAR; INITIAL SIZE hint\n- Monitor with SM50, profile with SAT, dump analysis in ST22, SQL trace in ST05\n\nInterview keyword: FREE releases heap, REFRESH keeps memory, CLEAR resets header."
  },
  'internal-tables-010': {
    interviewScriptHinglish: "Sir, nested LOOP ABAP ka sabse common performance killer hai — outer rows multiply inner rows quickly millions of iterations bana dete hain. Mere standard solutions hain: pehla, SELECT inside LOOP ko hata kar single FOR ALL ENTRIES ya JOIN use karna; doosra, inner lookup table ko HASHED TABLE WITH UNIQUE KEY banana taaki O(1) lookup ho aur inner LOOP ki zaroorat hi na pade; teesra, dono tables ko same key pe sort karke parallel cursor lagana — total iterations O(n plus m) ho jaate hain. Main har optimization ko ST05 SQL trace aur SAT runtime analysis se measure karta hoon aur before-after numbers business team ko share karta hoon.",
    interviewScriptEnglish: "Nested LOOPs are a common ABAP performance bottleneck because complexity grows as outer rows times inner rows. My standard fixes are: replace SELECT inside LOOP with a single FOR ALL ENTRIES or SQL JOIN, convert the inner lookup table to a hashed table with READ TABLE WITH TABLE KEY for O(1) access, or apply the parallel cursor pattern when two large tables already reside in memory. I always validate the optimisation using ST05 to count database calls and SAT to compare iteration counts and runtime, so the improvement is measured and not just assumed.",
    wordByWordSamjho: [
      { keyword: "FOR ALL ENTRIES IN @lt_orders", meaning: "Fetches related rows for the keys present in the driver internal table." },
      { keyword: "HASHED TABLE WITH UNIQUE KEY", meaning: "Provides O(1) lookup, replacing repeated linear scans inside the outer LOOP." },
      { keyword: "READ TABLE ... WITH TABLE KEY", meaning: "Triggers optimized hash or sorted access using the defined primary key." },
      { keyword: "SORTED TABLE WITH NON-UNIQUE KEY", meaning: "Enables LOOP WHERE binary-search start position and parallel cursor patterns." },
      { keyword: "LOOP AT ... FROM lv_idx", meaning: "Starts the inner loop from a saved index, core to the parallel cursor technique." },
      { keyword: "EXIT", meaning: "Terminates the inner LOOP when the join key changes, keeping cursor work linear." },
      { keyword: "COLLECT ls_agg INTO lt_agg", meaning: "Aggregates numeric fields by key in one pass instead of nested loops." },
      { keyword: "GROUP BY ... SUM( ... )", meaning: "Pushes aggregation to the database, returning already grouped rows." }
    ],
    commonMistakesSection: [
      { mistake: "Putting SELECT inside an outer LOOP to enrich each row.", whyWrong: "Creates N database round trips visible in ST05 and easily dominates runtime.", correctApproach: "Fetch all needed rows once with FOR ALL ENTRIES on tables like VBAP or EKPO, or join in SQL using INNER JOIN." },
      { mistake: "Calling FOR ALL ENTRIES without checking IF lt_driver IS NOT INITIAL.", whyWrong: "If the driver is empty, SAP drops the WHERE clause and selects every row from the target table, dumping with TSV.", correctApproach: "Always wrap FOR ALL ENTRIES SELECT inside IF lt_driver IS NOT INITIAL ... ENDIF." },
      { mistake: "Looking up rows with READ TABLE WITH KEY on a standard inner table inside the outer LOOP.", whyWrong: "Each READ is O(n), so the loop degrades to O(n^2) on tables like MARA or VBAP.", correctApproach: "Build the inner table as HASHED TABLE WITH UNIQUE KEY and use READ TABLE ... WITH TABLE KEY for O(1) access." },
      { mistake: "Starting parallel cursor without sorting both tables on the join key first.", whyWrong: "The saved index walks out of order and rows get matched against the wrong header silently.", correctApproach: "SORT both tables BY vbeln (or use SORTED TABLE) before the outer LOOP and EXIT the inner LOOP on key change." }
    ],
    quickRevisionNotes: "What: Nested LOOP complexity is O(m*n); several patterns bring it down to O(n+m) or O(n).\n\nUsed for:\n- Header-item processing such as VBAK/VBAP, EKKO/EKPO, BKPF/BSEG\n- Replacing SELECT inside LOOP and slow linear lookups\n- Tuning batch jobs and ALV reports\n\nKey syntax / tables / Tcodes:\n- FOR ALL ENTRIES with IS NOT INITIAL guard; INNER JOIN in Open SQL\n- HASHED TABLE WITH UNIQUE KEY + READ TABLE WITH TABLE KEY\n- Parallel cursor with SORT, FROM lv_idx and EXIT; profile with ST05 and SAT\n\nInterview keyword: Recognise O(m*n), replace with FOR ALL ENTRIES, hashed lookup, or parallel cursor."
  }
};

const tiers = {
  'internal-tables-006': ['medium', 'advanced', 'easy', 'medium', 'easy', 'advanced', 'advanced', 'medium'],
  'internal-tables-007': ['easy', 'medium', 'easy', 'easy', 'medium', 'medium', 'advanced', 'easy'],
  'internal-tables-008': ['medium', 'advanced', 'medium', 'advanced', 'easy', 'easy', 'medium', 'medium'],
  'internal-tables-009': ['medium', 'medium', 'advanced', 'easy', 'easy', 'medium', 'easy', 'advanced'],
  'internal-tables-010': ['advanced', 'easy', 'medium', 'medium', 'medium', 'easy', 'easy', 'advanced']
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
