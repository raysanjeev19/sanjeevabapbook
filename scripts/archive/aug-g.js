const fs = require('fs');
const path = '/Users/sanjayray/boook/src/data/answers/internal-tables-g.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const aug = {
  'internal-tables-027': {
    interviewScriptHinglish: "Sir, ABAP Open SQL mein primarily chaar join types use hote hain — INNER JOIN, LEFT OUTER JOIN, RIGHT OUTER JOIN aur CROSS JOIN. INNER JOIN sirf matching rows return karta hai, jaise VBAK aur VBAP ko VBELN pe join karna. LEFT OUTER JOIN left table ki sab rows aur right ke matching rows deta hai, jab parent records dikhane mandatory hon. RIGHT OUTER kam use hota hai aur CROSS JOIN Cartesian product hai, almost never used. FULL OUTER JOIN classic Open SQL mein direct supported nahi hai, isliye main UNION ya CDS view se simulate karta hoon. Mere project mein INNER aur LEFT OUTER 90 percent cases cover karte hain.",
    interviewScriptEnglish: "ABAP Open SQL supports four main join types: INNER JOIN returns only matching rows and is the most common, LEFT OUTER JOIN returns all left rows with matches on the right or NULLs, RIGHT OUTER JOIN is the rarely used inverse, and CROSS JOIN produces a Cartesian product. Classic Open SQL does not support FULL OUTER JOIN, so it is simulated using UNION or replaced by a CDS view which supports it natively. In practice, INNER and LEFT OUTER joins cover most reporting use cases such as joining VBAK with VBAP or LFA1 with BKPF.",
    wordByWordSamjho: [
      { keyword: "INNER JOIN vbap AS b ON a~vbeln = b~vbeln", meaning: "Returns only sales order headers that have at least one item." },
      { keyword: "LEFT OUTER JOIN bkpf AS b ON a~lifnr = b~lifnr", meaning: "Returns every vendor and any matching accounting headers, NULL for vendors without postings." },
      { keyword: "FROM vbak AS a / FROM lfa1 AS a", meaning: "Aliases for the left side table used in the join." },
      { keyword: "INTO TABLE @DATA(lt_inner)", meaning: "Inline declaration of the result internal table." },
      { keyword: "WHERE a~auart = 'OR' AND a~erdat GE @sy-datum - 30", meaning: "Restricts the joined result to recent standard sales orders." },
      { keyword: "UNION", meaning: "Combines two SELECT results, used to simulate FULL OUTER JOIN." },
      { keyword: "ON a~vbeln = b~awkey", meaning: "Join condition between sales document number and accounting reference." }
    ],
    commonMistakesSection: [
      { mistake: "Using INNER JOIN when LEFT OUTER JOIN is needed.", whyWrong: "Parent rows without children silently disappear, hiding records the business expects to see.", correctApproach: "Use LEFT OUTER JOIN whenever the left table must be fully represented regardless of right side matches." },
      { mistake: "Trying to write FULL OUTER JOIN in classic Open SQL.", whyWrong: "Classic Open SQL does not support FULL OUTER JOIN, the syntax check rejects it.", correctApproach: "Simulate with a UNION of LEFT OUTER and a reverse query, or use a CDS view that supports FULL OUTER JOIN natively." },
      { mistake: "Placing right-side filters in WHERE rather than ON for OUTER JOINs.", whyWrong: "WHERE filters out NULL right-side rows, effectively turning the outer join into an inner join.", correctApproach: "Put right-side restrictions in the ON clause: LEFT OUTER JOIN bkpf AS b ON a~lifnr = b~lifnr AND b~bukrs = '1000'." },
      { mistake: "Building deep five table INNER JOINs in one SELECT.", whyWrong: "Very wide joins create complex HANA execution plans and can return huge intermediate results.", correctApproach: "Split the work using base JOINs plus targeted FOR ALL ENTRIES or use a tailored CDS view to break the work into HANA optimised pieces." }
    ],
    quickRevisionNotes: "What: Catalog of Open SQL join types used to combine database tables in ABAP.\n\nUsed for:\n- Combining sales, finance, procurement and vendor data in reports\n- Replacing nested SELECTs with single optimised SQL\n- Composing CDS view sources\n\nKey syntax / tables / Tcodes:\n- INNER JOIN, LEFT OUTER JOIN, RIGHT OUTER JOIN, CROSS JOIN\n- FROM vbak AS a INNER JOIN vbap AS b ON a~vbeln = b~vbeln\n- FULL OUTER JOIN simulated via UNION or done via CDS views; validate with ST05\n\nInterview keyword: INNER for matches, LEFT OUTER for full left, FULL OUTER via CDS or UNION."
  },
  'internal-tables-028': {
    interviewScriptHinglish: "Sir, internal table ki rows count karne ke do main tareeke hain. Modern preferred approach hai lines function — lv_count is equal to lines lt_table, jo inline use ho sakta hai conditions mein bhi. Classic approach hai DESCRIBE TABLE lt_table LINES lv_count, jo older systems pe bhi chalta hai. Dono O of 1 operations hain kyunki ABAP row count table header mein store karta hai, full scan nahi hota. Empty check ke liye IS INITIAL ya IS NOT INITIAL prefer karta hoon jo cleaner aur faster hai. SY TFILL legacy hai aur avoid karta hoon. Mere project mein lines function ke saath inline conditions code aur readable banate hain.",
    interviewScriptEnglish: "There are two main ways to count rows in an internal table. The modern approach is the lines() function — lv_count = lines( lt_table ) — which is O(1), inline-usable in IF conditions and preferred in ABAP 7.4+. The classic DESCRIBE TABLE lt_table LINES lv_count still works on older systems. Both rely on ABAP's table header row count, so no row scan occurs. For empty checks, IS INITIAL and IS NOT INITIAL are cleanest and fastest. The legacy SY-TFILL field should be avoided as its value depends on the most recent operation and can mislead.",
    wordByWordSamjho: [
      { keyword: "lines( lt_orders )", meaning: "Built-in function returning the number of rows in the internal table." },
      { keyword: "DESCRIBE TABLE lt_orders LINES lv_count", meaning: "Classic statement that fills lv_count with the row count." },
      { keyword: "IF lines( lt_orders ) > 0", meaning: "Inline guard pattern that avoids a separate counter variable." },
      { keyword: "DATA(lv_last_idx) = lines( lt_orders )", meaning: "Captures the last row index for READ TABLE INDEX access." },
      { keyword: "READ TABLE lt_orders INDEX lv_last_idx INTO DATA(ls_last_order)", meaning: "Reads the last row by index, useful for sorted output processing." },
      { keyword: "CHECK lines( lt_orders ) > 0", meaning: "Early exit guard when the internal table is empty." },
      { keyword: "IS INITIAL / IS NOT INITIAL", meaning: "Preferred empty checks for internal tables in modern ABAP." }
    ],
    commonMistakesSection: [
      { mistake: "Using SY-TFILL to determine the size of an internal table.", whyWrong: "SY-TFILL reflects the last LOOP or DESCRIBE operation and can be stale or incorrect.", correctApproach: "Use lines( lt ) or DESCRIBE TABLE lt LINES lv_count to get a reliable row count." },
      { mistake: "Adding a LOOP just to count matching rows in an internal table.", whyWrong: "Wastes cycles on tables that may have thousands of rows and clutters the code.", correctApproach: "Use REDUCE i( INIT c = 0 FOR ls IN lt WHERE ( cond ) NEXT c = c + 1 ) or COUNT in modern SQL when the data still lives in the database." },
      { mistake: "Checking row count with lines( lt ) = 0 instead of IS INITIAL.", whyWrong: "Slightly less idiomatic and a touch slower, though both are O(1).", correctApproach: "Use IF lt IS INITIAL for empty checks and reserve lines() for numeric comparisons or index calculations." },
      { mistake: "Forgetting that lines() ignores WHERE conditions.", whyWrong: "Developers expect lines( lt WHERE ... ) syntax which does not exist; results are total table size.", correctApproach: "Use REDUCE or LOOP AT WHERE to compute conditional counts, or push the count to the database with COUNT( * )." }
    ],
    quickRevisionNotes: "What: Methods to count rows in an internal table efficiently and idiomatically.\n\nUsed for:\n- Diagnostic output and progress logs\n- Guard conditions before processing\n- Index based access using lines() as the last row index\n\nKey syntax / tables / Tcodes:\n- lines( lt_orders ); DESCRIBE TABLE lt_orders LINES lv_count\n- IF lt IS INITIAL / IS NOT INITIAL; CHECK lines( lt ) > 0\n- Avoid SY-TFILL; profile with SAT; database COUNT( * ) via Open SQL\n\nInterview keyword: lines() is O(1) modern, DESCRIBE is classic, SY-TFILL is legacy."
  },
  'internal-tables-029': {
    interviewScriptHinglish: "Sir, internal table declare karne ke teen styles hain. Classic mein pehle TYPES BEGIN OF ... END OF se structure define karta hoon, phir DATA TABLE OF TYPE se table aur work area declare karta hoon. Database table ke structure ke saath direct DATA TABLE OF mara likh sakte hain. Modern ABAP 7.4 plus mein SELECT ke saath inline DATA INTO TABLE @DATA(lt_x) se type automatically inferred ho jaata hai. Naming conventions like lt_ for tables, ls_ for structures aur ty_ for types important hain. Sorted aur hashed declarations primary key ke saath ki jaati hain. Modern style maintenance friendly hai aur code review mein expected hai.",
    interviewScriptEnglish: "Internal tables can be declared in three styles. The classic approach defines a TYPES BEGIN OF ... END OF structure, then declares DATA lt_orders TYPE TABLE OF ty_order plus a matching work area. A direct DATA lt_mara TYPE TABLE OF mara is also valid for DDIC structures. ABAP 7.4+ adds inline declarations such as SELECT ... INTO TABLE @DATA(lt_inline) where the type is inferred automatically. Sorted and hashed tables include explicit key clauses. Consistent naming (lt_, ls_, ty_) plus modern inline declarations are expected in code reviews and S/4HANA development.",
    wordByWordSamjho: [
      { keyword: "TYPES BEGIN OF ty_order ... END OF ty_order", meaning: "Defines a custom row structure for use in internal table types." },
      { keyword: "TYPES ty_orders TYPE TABLE OF ty_order", meaning: "Defines a reusable internal table type based on the row structure." },
      { keyword: "DATA lt_orders TYPE ty_orders", meaning: "Declares an internal table variable of the custom table type." },
      { keyword: "DATA lt_mara TYPE TABLE OF mara", meaning: "Direct declaration based on the DDIC structure of MARA." },
      { keyword: "SELECT ... INTO TABLE @DATA(lt_inline)", meaning: "Inline data declaration where ABAP infers the type from the SELECT." },
      { keyword: "DATA ls_derived LIKE LINE OF lt_orders", meaning: "Declares a work area whose type follows the row type of the table." },
      { keyword: "SORTED TABLE OF ty_order WITH NON-UNIQUE KEY vbeln", meaning: "Auto sorted table with optional duplicates on the key." },
      { keyword: "HASHED TABLE OF ty_order WITH UNIQUE KEY vbeln", meaning: "Hash based table with mandatory unique key for O(1) access." }
    ],
    commonMistakesSection: [
      { mistake: "Declaring tables with OCCURS or WITH HEADER LINE syntax.", whyWrong: "These addons are deprecated and flagged by ATC and Custom Code Migration in S/4HANA.", correctApproach: "Use DATA lt TYPE TABLE OF ty plus a separate work area or LOOP AT ... ASSIGNING FIELD-SYMBOL pattern." },
      { mistake: "Skipping naming conventions for table and work area variables.", whyWrong: "Code becomes hard to scan in large programs; reviewers cannot tell scope or kind of variable.", correctApproach: "Adopt lt_ for local tables, ls_ for local structures, ty_ for types, mt_ / ms_ for class member tables and structures." },
      { mistake: "Using TYPE TABLE OF for sorted or hashed access patterns.", whyWrong: "Standard tables provide O(n) lookup; access patterns that need O(log n) or O(1) suffer silently.", correctApproach: "Choose SORTED TABLE OF ... WITH KEY for range/order access and HASHED TABLE OF ... WITH UNIQUE KEY for direct lookup." },
      { mistake: "Declaring inline DATA inside a SELECT that already has a typed target.", whyWrong: "Mixes styles, complicates code review and may shadow other variables.", correctApproach: "Pick one approach per program section; favour inline declarations for short-lived locals and typed declarations for class attributes." }
    ],
    quickRevisionNotes: "What: Different styles to declare internal tables and work areas in modern ABAP.\n\nUsed for:\n- Defining custom row types and reusable table types\n- Declaring standard, sorted and hashed tables for the right access pattern\n- Concise inline declarations in SELECT and LOOP statements\n\nKey syntax / tables / Tcodes:\n- TYPES BEGIN OF ... END OF; DATA lt TYPE TABLE OF ty\n- DATA lt TYPE SORTED TABLE OF ty WITH NON-UNIQUE KEY field\n- DATA lt TYPE HASHED TABLE OF ty WITH UNIQUE KEY field\n- SELECT ... INTO TABLE @DATA(lt_inline); LIKE LINE OF for work areas\n\nInterview keyword: Three styles — explicit type, direct DDIC, inline DATA — with consistent naming."
  },
  'internal-tables-030': {
    interviewScriptHinglish: "Sir, internal tables ke paanch core operations hain — APPEND, INSERT, MODIFY, READ aur DELETE. APPEND standard table ke end mein O(1) row add karta hai. INSERT INTO TABLE universal hai aur har table type ke liye correct position pe place karta hai. MODIFY existing row update karta hai, LOOP ke andar INDEX sy tabix se direct positional update hota hai. READ TABLE single row dhundta hai key se ya index se, sy subrc check mandatory hai. DELETE WHERE mass delete deta hai aur DELETE ADJACENT DUPLICATES sort ke baad use hota hai. ABAP 7.4 plus mein table expression lt[ key = val ] cleaner alternative hai READ TABLE ka, exception with TRY CATCH handle karta hoon.",
    interviewScriptEnglish: "Internal tables support five core operations: APPEND adds a row at the end of a standard table in O(1); INSERT INTO TABLE is the universal form that places rows correctly for any table type; MODIFY updates an existing row, by index inside LOOP using sy-tabix or by key for sorted/hashed tables; READ TABLE searches for a single row by key, index, or with BINARY SEARCH on sorted standard tables, and sy-subrc must always be checked; DELETE removes rows by key, index, or mass WHERE. In ABAP 7.4+ the table expression lt[ key = val ] offers a cleaner READ TABLE alternative wrapped in a TRY/CATCH for CX_SY_ITAB_LINE_NOT_FOUND.",
    wordByWordSamjho: [
      { keyword: "APPEND ls_order TO lt_orders", meaning: "Adds a row at the end of the standard internal table." },
      { keyword: "INSERT ls_order INTO TABLE lt_orders", meaning: "Universal insert form that works for all table types." },
      { keyword: "INSERT ls_order INTO lt_orders INDEX n", meaning: "Inserts at the specified position in a standard table only." },
      { keyword: "MODIFY lt_orders FROM ls_order INDEX sy-tabix", meaning: "Updates the row at the current LOOP index efficiently." },
      { keyword: "READ TABLE ... WITH KEY ... BINARY SEARCH", meaning: "Sorted standard table lookup that returns sy-subrc and sy-tabix." },
      { keyword: "DELETE lt_orders WHERE netwr < 1000", meaning: "Mass delete that removes all matching rows in a single statement." },
      { keyword: "DELETE lt_orders INDEX 1", meaning: "Removes the row at the given index from a standard table." },
      { keyword: "DELETE ADJACENT DUPLICATES FROM lt_orders COMPARING ...", meaning: "Removes consecutive duplicates after a matching SORT." }
    ],
    commonMistakesSection: [
      { mistake: "Calling APPEND on a sorted or hashed table.", whyWrong: "Both table types manage their own order so APPEND raises a syntax or runtime error.", correctApproach: "Use INSERT ls INTO TABLE lt to let SAP place the row at the correct hash or sort position." },
      { mistake: "Modifying without INDEX sy-tabix inside LOOP.", whyWrong: "Each MODIFY performs a key search, turning bulk modification into O(n^2).", correctApproach: "Use MODIFY lt FROM ls INDEX sy-tabix or switch to LOOP AT ... ASSIGNING FIELD-SYMBOL." },
      { mistake: "Skipping sy-subrc check after READ TABLE.", whyWrong: "If the row is missing, the work area carries stale values that downstream logic uses silently.", correctApproach: "Check IF sy-subrc = 0 and CLEAR or default the work area otherwise." },
      { mistake: "Calling DELETE ADJACENT DUPLICATES without preceding SORT.", whyWrong: "Only consecutive duplicates are removed; scattered duplicates remain in the table.", correctApproach: "SORT lt BY <fields> COMPARING ... before DELETE ADJACENT DUPLICATES FROM lt COMPARING <same fields>." }
    ],
    quickRevisionNotes: "What: The five core internal table operations covering insert, update, read and delete.\n\nUsed for:\n- Building output tables, applying calculations, looking up keys\n- Cleaning data with DELETE WHERE and DELETE ADJACENT DUPLICATES\n- Bulk modifications using APPEND LINES OF and INSERT LINES OF\n\nKey syntax / tables / Tcodes:\n- APPEND, INSERT INTO TABLE / INDEX, MODIFY ... INDEX sy-tabix\n- READ TABLE ... WITH KEY / BINARY SEARCH; check sy-subrc and sy-tabix\n- DELETE WHERE, DELETE ADJACENT DUPLICATES; ABAP 7.4 table expressions with TRY/CATCH\n\nInterview keyword: APPEND for standard end, INSERT universal, MODIFY INDEX, READ + sy-subrc, DELETE WHERE."
  }
};

const tiers = {
  'internal-tables-027': ['easy', 'advanced', 'medium', 'medium', 'easy', 'medium', 'advanced', 'advanced'],
  'internal-tables-028': ['easy', 'easy', 'medium', 'advanced', 'medium', 'easy', 'medium', 'advanced'],
  'internal-tables-029': ['easy', 'easy', 'medium', 'advanced', 'easy', 'medium', 'medium', 'advanced'],
  'internal-tables-030': ['easy', 'easy', 'medium', 'easy', 'medium', 'medium', 'medium', 'advanced']
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
