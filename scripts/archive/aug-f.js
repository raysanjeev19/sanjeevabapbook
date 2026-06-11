const fs = require('fs');
const path = '/Users/sanjayray/boook/src/data/answers/internal-tables-f.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const aug = {
  'internal-tables-023': {
    interviewScriptHinglish: "Sir, work area ek single row variable hai jo internal table ke structure ke hisab se define hota hai aur ek time mein ek row hold karta hai. Main isse SELECT SINGLE INTO, LOOP AT INTO, ya APPEND ke saath use karta hoon — database se ek row laata hoon, process karta hoon, phir MODIFY ya APPEND se internal table mein wapas write karta hoon. Mere project mein jab single record lookup chahiye hota hai ya jab table row by row build karni ho, tab work area pattern use hota hai. Modern ABAP mein DATA(ls_row) inline syntax se same kaam compact ho jaata hai aur readability badh jaati hai.",
    interviewScriptEnglish: "A work area is a single-row variable whose structure matches an internal table, used as an intermediary between database, internal table and processing logic. We use it with SELECT SINGLE INTO @wa, LOOP AT lt INTO wa, and APPEND wa TO lt patterns. Inline data declarations such as DATA(ls_row) provide the same capability with cleaner syntax in modern ABAP. Work areas are appropriate for single row lookups, building tables row by row, or when we deliberately need a separate copy from the original table row to avoid accidental modification.",
    wordByWordSamjho: [
      { keyword: "TYPES BEGIN OF ty_order ... END OF ty_order", meaning: "Defines the structured type used by both internal table and work area." },
      { keyword: "DATA lt_orders TYPE TABLE OF ty_order", meaning: "Standard internal table holding multiple sales order item rows." },
      { keyword: "DATA wa_order TYPE ty_order", meaning: "Single row work area matching the table row structure." },
      { keyword: "SELECT SINGLE ... INTO @wa_order", meaning: "Fetches exactly one row from VBAP into the work area." },
      { keyword: "LOOP AT lt_orders INTO wa_order", meaning: "Copy based iteration; each row is placed into the work area." },
      { keyword: "MODIFY lt_orders FROM wa_order", meaning: "Writes the modified work area back into the corresponding internal table row." },
      { keyword: "APPEND wa_order TO lt_orders", meaning: "Adds the work area as a new row at the end of the standard table." },
      { keyword: "CLEAR wa_order", meaning: "Resets all fields of the work area to their initial values before reuse." }
    ],
    commonMistakesSection: [
      { mistake: "Reusing a work area in a loop without CLEAR.", whyWrong: "Old field values from previous iterations leak into newly built rows, producing wrong APPEND or MODIFY data.", correctApproach: "Issue CLEAR wa_order at the start of each iteration or assign a fresh VALUE structure to reset all fields." },
      { mistake: "Modifying wa_order in LOOP AT ... INTO without MODIFY.", whyWrong: "The internal table never receives the change, which is a silent functional bug.", correctApproach: "Either MODIFY lt FROM wa_order INDEX sy-tabix or switch the loop to LOOP AT ... ASSIGNING FIELD-SYMBOL." },
      { mistake: "Using SELECT SINGLE INTO wa_order without sy-subrc check.", whyWrong: "When no row matches, wa_order contains stale or initial values that downstream logic misuses.", correctApproach: "Always check IF sy-subrc = 0 after SELECT SINGLE before using wa_order fields." },
      { mistake: "Declaring a separate work area type when an inline DATA(ls_row) would suffice.", whyWrong: "Adds verbose code without functional benefit in simple LOOP and APPEND patterns.", correctApproach: "Use modern inline declarations such as LOOP AT lt INTO DATA(ls_row) for short-lived work areas." }
    ],
    quickRevisionNotes: "What: Work area is a single row variable mirroring the internal table structure for row-level processing.\n\nUsed for:\n- SELECT SINGLE results and row-by-row table population\n- LOOP AT INTO copy semantics with explicit MODIFY\n- Passing one row to function modules or subroutines by value\n\nKey syntax / tables / Tcodes:\n- TYPES BEGIN OF ty_order ... END OF ty_order; DATA wa_order TYPE ty_order\n- SELECT SINGLE ... INTO @wa_order; LOOP AT lt INTO wa_order; MODIFY lt FROM wa_order\n- Tables VBAP, VBAK; debug via ABAP debugger, SE80 navigation\n\nInterview keyword: Work area is the single row register page; CLEAR before reuse, MODIFY to persist."
  },
  'internal-tables-024': {
    interviewScriptHinglish: "Sir, work area aur field-symbol dono internal table ki ek row ke saath kaam karte hain lekin tarika alag hai. Work area copy hota hai — LOOP AT INTO se ek separate memory variable banti hai aur table update karne ke liye MODIFY lagana padta hai. Field-symbol pointer hai — LOOP AT ASSIGNING FIELD-SYMBOL se direct table row ka address milta hai, copy nahi hoti aur change automatically table mein reflect ho jaata hai. Large tables aur wide structures pe field-symbol measurable performance benefit deta hai. Main hamesha IS ASSIGNED check karta hoon aur modification loops mein ASSIGNING FIELD-SYMBOL prefer karta hoon, jisse code fast aur clean rehta hai.",
    interviewScriptEnglish: "A work area is a copy of the internal table row in a separate memory location; modifications stay local until MODIFY writes them back. A field-symbol is a pointer that references the actual row memory directly, so changes via the field-symbol immediately update the table without MODIFY. Field-symbols deliver measurable performance gains on large loops with wide structures because they eliminate per-row copy overhead. Best practice is to use LOOP AT ... ASSIGNING FIELD-SYMBOL for modification loops, always check IS ASSIGNED before access, and reserve work areas for cases where a separate, safe copy is required.",
    wordByWordSamjho: [
      { keyword: "DATA wa_order TYPE ty_order", meaning: "Explicit work area variable representing one row copy." },
      { keyword: "LOOP AT lt_orders INTO wa_order", meaning: "Iterates and copies each row into the work area." },
      { keyword: "MODIFY lt_orders FROM wa_order", meaning: "Writes the modified work area back into the internal table." },
      { keyword: "FIELD-SYMBOLS <fs_order> TYPE ty_order", meaning: "Declares a typed pointer that can alias a row of the internal table." },
      { keyword: "LOOP AT lt_orders ASSIGNING <fs_order>", meaning: "Iterates with a direct pointer, no row copy, in-place updates." },
      { keyword: "READ TABLE ... ASSIGNING FIELD-SYMBOL(<fs_single>)", meaning: "Reads a single row by key with the field-symbol bound inline." },
      { keyword: "IS ASSIGNED", meaning: "Runtime check ensuring the field-symbol currently aliases a valid object." },
      { keyword: "<fs_order>-kwmeng = 100", meaning: "Direct assignment that updates the underlying internal table row." }
    ],
    commonMistakesSection: [
      { mistake: "Using work area copies in million row loops for read access.", whyWrong: "Each iteration copies the entire row, slowing wide structures noticeably.", correctApproach: "Use LOOP AT ... ASSIGNING FIELD-SYMBOL(<fs>) which provides a pointer with no copy overhead." },
      { mistake: "Modifying a field-symbol without realising the table is updated immediately.", whyWrong: "Unexpected data changes flow downstream to MODIFY DATABASE or BAPI calls.", correctApproach: "Use a work area when you explicitly want a sandboxed copy, and reserve field-symbols for intentional in-place updates." },
      { mistake: "Skipping IS ASSIGNED before accessing a field-symbol set inside a conditional READ.", whyWrong: "If the READ failed, accessing the field-symbol causes FIELD_SYMBOLS_ACCESS_AFTER_FREE dumps in production.", correctApproach: "Always guard with IF <fs> IS ASSIGNED and UNASSIGN <fs> when the pointer is no longer needed." },
      { mistake: "Deleting the current row inside LOOP ASSIGNING and still reading the field-symbol.", whyWrong: "The pointer references freed memory, producing undefined behaviour across kernel versions.", correctApproach: "Collect indices to delete in a separate index table and run DELETE lt FROM TABLE lt_idx after the loop." }
    ],
    quickRevisionNotes: "What: Work area uses copy semantics; field-symbol uses reference semantics over internal table rows.\n\nUsed for:\n- Bulk read or update loops where field-symbols win on performance\n- Safe scratch processing where work areas isolate changes\n- READ TABLE with ASSIGNING for direct lookup access\n\nKey syntax / tables / Tcodes:\n- LOOP AT lt INTO wa_order; MODIFY lt FROM wa_order\n- LOOP AT lt ASSIGNING FIELD-SYMBOL(<fs>); IF <fs> IS ASSIGNED\n- READ TABLE lt ASSIGNING FIELD-SYMBOL(<fs>) WITH KEY ...\n- Debug FIELD_SYMBOLS_ACCESS_AFTER_FREE in ST22\n\nInterview keyword: Work area is photocopy, field-symbol is direct window."
  },
  'internal-tables-025': {
    interviewScriptHinglish: "Sir, FOR ALL ENTRIES ABAP ka SELECT optimisation hai jo N plus 1 pattern replace karta hai. Driving internal table ki keys ek IN clause ban jaati hain database query mein, aur ek ya do batched calls mein saara related data fetch ho jaata hai. Sabse critical part hai mandatory IS NOT INITIAL check — agar driving table empty hai aur check miss hua toh SAP WHERE drop kar ke poori target table fetch karta hai, jo production mein TSV dump deti hai. Restrictions yaad rakhne wali hain — no GROUP BY, ORDER BY, DISTINCT, HAVING. Driving table internally deduplicate aur sorted hoti hai, result row order guaranteed nahi hota.",
    interviewScriptEnglish: "FOR ALL ENTRIES is the SAP optimization that replaces the N+1 SELECT-inside-LOOP pattern. It converts driver internal table keys into batched IN clauses and fetches related rows in one or a few database calls. The mandatory IS NOT INITIAL guard is non negotiable; without it an empty driver causes SAP to drop the WHERE clause and fetch every row from the target table — a guaranteed production incident. Restrictions to remember: no GROUP BY, ORDER BY, DISTINCT or HAVING; the driver table is implicitly deduplicated and sorted internally, so the result order is not guaranteed.",
    wordByWordSamjho: [
      { keyword: "SELECT vbeln, erdat, kunnr INTO TABLE @lt_orders", meaning: "Loads the driver table with sales order headers from VBAK." },
      { keyword: "WHERE auart = 'OR' AND erdat GE @sy-datum - 30", meaning: "Restricts the driver SELECT to standard orders in the last 30 days." },
      { keyword: "IF lt_orders IS NOT INITIAL", meaning: "Mandatory guard that prevents the dangerous empty driver case." },
      { keyword: "FOR ALL ENTRIES IN @lt_orders", meaning: "ABAP construct that converts driver keys into batched IN clauses for the target SELECT." },
      { keyword: "WHERE vbeln = @lt_orders-vbeln", meaning: "Equality condition between target field and driver key field." },
      { keyword: "LOOP AT lt_items INTO DATA(ls_item) WHERE vbeln = ls_ord-vbeln", meaning: "In memory join used to display headers with their items." },
      { keyword: "SELECT INSIDE LOOP", meaning: "Anti-pattern that FOR ALL ENTRIES replaces by issuing batched database calls." }
    ],
    commonMistakesSection: [
      { mistake: "Calling FOR ALL ENTRIES without IS NOT INITIAL guard.", whyWrong: "Empty driver table makes SAP drop the WHERE clause and fetch every row from huge tables like VBAP.", correctApproach: "Always wrap inside IF lt_driver IS NOT INITIAL ... ENDIF and add a code-level comment so reviewers do not remove it." },
      { mistake: "Using GROUP BY, ORDER BY or DISTINCT alongside FOR ALL ENTRIES.", whyWrong: "These additions are not allowed and the syntax check or runtime rejects the SELECT.", correctApproach: "Perform sorting or de-duplication in ABAP after the SELECT, or restructure the query to use a JOIN." },
      { mistake: "Assuming FOR ALL ENTRIES preserves driver order in the result.", whyWrong: "ABAP deduplicates and reorders the driver internally; result rows can come back in any order.", correctApproach: "SORT the result table by required keys after the SELECT or rely on LOOP AT ... WHERE for stable matching." },
      { mistake: "Using FOR ALL ENTRIES inside a LOOP that already runs per header.", whyWrong: "Reintroduces the N+1 pattern that FOR ALL ENTRIES was meant to eliminate.", correctApproach: "Issue FAE once before the outer loop and join in memory with LOOP AT lt_items WHERE vbeln = ls_ord-vbeln." }
    ],
    quickRevisionNotes: "What: FOR ALL ENTRIES is an optimised SELECT that uses an internal driver table to issue batched IN queries.\n\nUsed for:\n- Replacing SELECT inside LOOP N+1 patterns\n- Fetching VBAP items for a set of VBAK orders, EKPO for EKKO, etc.\n- Bulk joining when the driver was pre-processed in ABAP\n\nKey syntax / tables / Tcodes:\n- IF lt_driver IS NOT INITIAL guard; SELECT ... FOR ALL ENTRIES IN @lt_driver\n- WHERE field = @lt_driver-field; no GROUP BY/ORDER BY/DISTINCT\n- Verify with ST05 and SAT; tables VBAK, VBAP, EKKO, EKPO\n\nInterview keyword: Empty driver = full table fetch; IS NOT INITIAL guard is non negotiable."
  },
  'internal-tables-026': {
    interviewScriptHinglish: "Sir, FOR ALL ENTRIES aur INNER JOIN dono ka kaam tables join karna hai lekin jagah alag hai. INNER JOIN database level pe single roundtrip mein execute hota hai aur SQL optimiser indexes use kar leta hai, simple 2 table joins ke liye yeh fastest hai. FOR ALL ENTRIES pehle driving table memory mein load karta hai, phir ABAP side preprocessing — filter, sort, dedup — kar sakte ho, aur uske baad second SELECT batched IN clause ke saath issue hota hai. Mere project mein simple straight joins ke liye INNER JOIN choose karta hoon, aur jab driver pe complex ABAP filtering pehle ho chuki ho ya 4 plus tables involve hon tab FOR ALL ENTRIES, jisse code aur performance dono balanced rehte hain.",
    interviewScriptEnglish: "FOR ALL ENTRIES and INNER JOIN both perform multi-table joins but execute differently. INNER JOIN runs entirely on the database in one optimised roundtrip and is generally faster for straightforward two-table joins. FOR ALL ENTRIES loads the driver internal table into ABAP memory first, allowing pre-processing such as filtering and sorting, then issues a second SELECT using batched IN clauses. Choose INNER JOIN for simple fresh fetches; choose FOR ALL ENTRIES when the driver has been enriched or restricted in ABAP, or when joining many tables. FOR ALL ENTRIES does not support ORDER BY, GROUP BY or aggregations, which INNER JOIN can.",
    wordByWordSamjho: [
      { keyword: "INNER JOIN vbap AS b ON a~vbeln = b~vbeln", meaning: "Database join between VBAK header and VBAP item using document number." },
      { keyword: "SELECT a~vbeln, a~kunnr, ... FROM vbak AS a", meaning: "Field list and alias declaration for the join source table." },
      { keyword: "INTO TABLE @DATA(lt_join_result)", meaning: "Inline declaration of the joined result internal table." },
      { keyword: "DELETE lt_headers WHERE kunnr = 'BLOCKED_CUST'", meaning: "ABAP side filter applied to the driver table before FAE." },
      { keyword: "SORT lt_headers BY kunnr", meaning: "ABAP side sort that prepares the driver for downstream processing." },
      { keyword: "FOR ALL ENTRIES IN @lt_headers", meaning: "Bulk fetch of VBAP items for the surviving driver keys." },
      { keyword: "WHERE a~auart = 'OR' AND a~erdat GE @sy-datum - 90", meaning: "Restricts the join to standard sales orders from the last 90 days." }
    ],
    commonMistakesSection: [
      { mistake: "Always defaulting to FOR ALL ENTRIES when an INNER JOIN would be simpler.", whyWrong: "Adds two SELECT statements, an empty guard and merge logic where one optimised SQL query would do.", correctApproach: "Use INNER JOIN for straightforward two table joins; reserve FAE for cases where ABAP pre-processing on the driver is needed." },
      { mistake: "Using ORDER BY or GROUP BY with FOR ALL ENTRIES.", whyWrong: "These additions are not allowed; the syntax check rejects the SELECT.", correctApproach: "Either restructure as INNER JOIN or perform sorting and aggregation in ABAP after the FAE result is in memory." },
      { mistake: "Forgetting that LEFT OUTER JOIN is required when child rows may be missing.", whyWrong: "INNER JOIN drops parent rows without children, hiding records that the business expects to see.", correctApproach: "Use LEFT OUTER JOIN ... ON ... when the report must show all parent records regardless of child existence." },
      { mistake: "Building deep 4+ table INNER JOINs that the HANA optimiser struggles with.", whyWrong: "Very wide joins can create complex execution plans and large intermediate result sets.", correctApproach: "Break the work into a base JOIN plus targeted FOR ALL ENTRIES or CDS views that the HANA engine optimises individually." }
    ],
    quickRevisionNotes: "What: INNER JOIN vs FOR ALL ENTRIES comparison covering when each is preferable.\n\nUsed for:\n- Choosing the right join pattern in performance critical reports\n- Migrating legacy FAE-heavy code to HANA friendly JOINs\n- Combining ABAP pre-processing with bulk fetches\n\nKey syntax / tables / Tcodes:\n- SELECT ... INNER JOIN vbap AS b ON a~vbeln = b~vbeln\n- IF lt_headers IS NOT INITIAL. SELECT ... FOR ALL ENTRIES IN @lt_headers ...\n- Tables VBAK, VBAP, BKPF, LFA1; verify with ST05 explain plans and SAT\n\nInterview keyword: JOIN for fresh DB joins, FAE for memory pre-processed drivers."
  }
};

const tiers = {
  'internal-tables-023': ['easy', 'easy', 'easy', 'medium', 'medium', 'easy', 'medium', 'advanced'],
  'internal-tables-024': ['medium', 'easy', 'medium', 'easy', 'medium', 'medium', 'advanced', 'advanced'],
  'internal-tables-025': ['advanced', 'medium', 'medium', 'easy', 'medium', 'medium', 'advanced', 'medium'],
  'internal-tables-026': ['medium', 'medium', 'medium', 'easy', 'advanced', 'advanced', 'advanced', 'medium']
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
