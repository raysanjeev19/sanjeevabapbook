const fs = require('fs');
const path = '/Users/sanjayray/boook/src/data/answers/internal-tables-c.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const aug = {
  'internal-tables-011': {
    interviewScriptHinglish: "Sir, functional consultant ko main internal table ko ek temporary Excel sheet ki tarah explain karta hoon jo SAP ki memory mein program ke chalte time exist karti hai. Database table permanent storage hai jaise VBAK ya MARA, jabki internal table runtime mein data ko process karne ke liye banti hai. Practically mere project mein VBAK aur VBAP se data fetch karke ek combined internal table banaata hoon, sorting aur filtering karta hoon, phir ALV grid mein output dikhata hoon. Iska benefit yeh hai ki functional consultant ko intermediate data ka concept aata hai, requirements clearly milti hain aur testing scope bhi accurate ho jaata hai.",
    interviewScriptEnglish: "An internal table is a temporary, in-memory data container that exists only during program execution, used to hold rows fetched from database tables for processing, filtering, sorting, and display. Functional consultants benefit from understanding internal tables because the data they see in reports passes through this intermediate layer, where filters, joins and aggregations happen. Clear functional requirements about fields, filter criteria, expected volumes and sort order help developers build correct internal table logic on the first attempt, reducing rework and supporting accurate testing in UAT.",
    wordByWordSamjho: [
      { keyword: "TYPES BEGIN OF / END OF", meaning: "Defines a custom structure that becomes the row type of the internal table." },
      { keyword: "TYPE TABLE OF ty_open_order", meaning: "Declares a standard internal table whose rows follow the custom structure." },
      { keyword: "INNER JOIN vbap AS b ON a~vbeln = b~vbeln", meaning: "Joins sales order header (VBAK) and item (VBAP) tables on the document number." },
      { keyword: "WHERE a~auart = 'OR'", meaning: "Restricts the join to standard sales order documents only." },
      { keyword: "SORT lt_open_orders BY erdat DESCENDING", meaning: "Orders the internal table by creation date with newest entries first." },
      { keyword: "DELETE ... WHERE kwmeng = 0", meaning: "Removes rows with zero order quantity from the result set." },
      { keyword: "@sy-datum - 365", meaning: "System date minus 365 days, restricting the data to the last year." }
    ],
    commonMistakesSection: [
      { mistake: "Treating internal table as if it persists to the database.", whyWrong: "Functional users sometimes expect UAT changes to remain visible across sessions, but the data lives only in memory.", correctApproach: "Explain that internal tables vanish at program end; persistence requires INSERT/UPDATE on a transparent table like VBAK or a custom Z-table." },
      { mistake: "Accepting requirements like 'show all data' without scope.", whyWrong: "Loading large transaction tables such as BSEG without filters leads to performance issues and timeouts.", correctApproach: "Negotiate concrete WHERE conditions (date range, company code, document status) before coding the SELECT and internal table." },
      { mistake: "Adding fields mid-development that need new database joins.", whyWrong: "Late additions force structural changes to TYPES, SELECT and processing logic, leading to rework and missed deadlines.", correctApproach: "Finalize the field list with the functional consultant up front and document each field's source table." },
      { mistake: "Debugging the ALV display when the data is actually wrong in the internal table.", whyWrong: "Hours are wasted in the UI layer while the root cause is the SELECT or in-memory transformation.", correctApproach: "Set a breakpoint immediately after the SELECT, validate the internal table contents in the debugger, then move outward." }
    ],
    quickRevisionNotes: "What: Internal table is a runtime, in-memory list of rows used to process database data before display.\n\nUsed for:\n- Bridging database tables and user output such as ALV or BAPI responses\n- Applying filters, sorts, joins and aggregations in memory\n- Sharing intermediate data between functional and technical teams during UAT\n\nKey syntax / tables / Tcodes:\n- TYPES BEGIN OF ... END OF, DATA lt TYPE TABLE OF ty\n- SELECT INNER JOIN on VBAK and VBAP with WHERE on AUART and ERDAT\n- Debug with ABAP debugger, profile with SAT, check SQL via ST05\n\nInterview keyword: In-memory Excel sheet between database and screen output."
  },
  'internal-tables-012': {
    interviewScriptHinglish: "Sir, S/4HANA aane ke baad internal table ke usage mein bada shift aaya hai. HANA column store database itna fast hai ki main aggregation, filtering aur joining sab database par push karta hoon CDS views aur SELECT GROUP BY ke through, internal table mein sirf necessary data laata hoon. ABAP 7.4 plus mein inline DATA, table expressions, secondary keys aur VALUE, FILTER, REDUCE jaise functional constructs available hain jisse code shorter aur declarative ho gaya hai. Mere project mein maine purane COLLECT loops ko SELECT SUM GROUP BY se replace kiya jisse memory bhi kam lagi aur HANA optimizer ne best execution plan diya.",
    interviewScriptEnglish: "S/4HANA shifts internal table usage toward database pushdown: aggregations, joins and filters run on HANA's column store via CDS views or SELECT GROUP BY rather than being computed in ABAP. Modern ABAP 7.4+ offers inline DATA declarations, table expressions, secondary keys, VALUE, FILTER, REDUCE and CORRESPONDING operators that make internal table code shorter and more expressive. Classic patterns still work but the SAP Custom Code Migration tool and ATC checks flag SELECT * and SELECT inside LOOP. Adopting modern constructs ensures both better runtime performance on HANA and cleaner, review-friendly code.",
    wordByWordSamjho: [
      { keyword: "@DATA(lt_orders)", meaning: "Inline data declaration; type is inferred from the SELECT result." },
      { keyword: "SELECT ... GROUP BY matnr", meaning: "Pushes aggregation to the HANA database rather than COLLECT in ABAP." },
      { keyword: "lt_orders[ vbeln = '...' ]", meaning: "Table expression that reads a single row, raising CX_SY_ITAB_LINE_NOT_FOUND if missing." },
      { keyword: "WITH NON-UNIQUE SORTED KEY sk_mat COMPONENTS matnr", meaning: "Defines a secondary sorted key for additional optimized access paths." },
      { keyword: "VALUE ty_orders( FOR ls IN ... WHERE ... )", meaning: "Table comprehension that builds a new table from an existing one in one expression." },
      { keyword: "FILTER #( lt USING KEY sk_mat WHERE ... )", meaning: "Functional filter expression returning a subset using a secondary key." },
      { keyword: "CORRESPONDING ty_tgt( ls_src MAPPING ... )", meaning: "Automatic field mapping between structures, replacing MOVE-CORRESPONDING." },
      { keyword: "REDUCE i( INIT s = 0 FOR ls IN ... NEXT s = ... )", meaning: "Functional fold expression to accumulate a single result over a table." }
    ],
    commonMistakesSection: [
      { mistake: "Loading entire VBAP into an internal table and aggregating with COLLECT.", whyWrong: "Wastes memory and network bandwidth when HANA can group and sum the rows natively.", correctApproach: "Use SELECT matnr, SUM( kwmeng ) FROM vbap ... GROUP BY matnr to push aggregation to HANA." },
      { mistake: "Maintaining duplicate sorted copies of an internal table for different access patterns.", whyWrong: "Doubles memory and creates two tables that can drift out of sync.", correctApproach: "Use one table with a primary key plus WITH NON-UNIQUE SORTED KEY secondary keys and read with USE KEY." },
      { mistake: "Hand-coding JOIN logic in ABAP when an SAP delivered CDS view already provides it.", whyWrong: "Re-implements logic that SAP keeps in sync with master data and authorisation models in the VDM.", correctApproach: "Search for I_ or C_ CDS views like I_SalesOrder, I_Material and consume them via SELECT instead." },
      { mistake: "Ignoring ATC findings on SELECT *, nested SELECTs and OCCURS in S/4HANA migration.", whyWrong: "These checks block transports in strict governance and indicate genuine HANA performance issues.", correctApproach: "Refactor flagged code to use specific field lists, single JOINs and modern table declarations during the S/4HANA Custom Code Migration cycle." }
    ],
    quickRevisionNotes: "What: S/4HANA prefers database pushdown plus modern ABAP 7.4+ constructs for internal table work.\n\nUsed for:\n- Aggregations and joins on HANA via CDS views and Open SQL GROUP BY\n- Cleaner code with inline DATA, table expressions and secondary keys\n- Custom code migration from ECC to S/4HANA\n\nKey syntax / tables / Tcodes:\n- SELECT INTO TABLE @DATA(lt_x), lt[ key = val ] table expressions\n- VALUE, FILTER, REDUCE, CORRESPONDING; secondary SORTED/HASHED keys\n- CDS views like I_SalesOrder, I_Material; tools: ATC, Custom Code Migration, ST05, SAT\n\nInterview keyword: Push computation to HANA and use modern ABAP constructs."
  },
  'internal-tables-013': {
    interviewScriptHinglish: "Sir, internal tables ke saath jo common mistakes maine projects mein dekhi hain unmein top hai SELECT inside LOOP jo N plus 1 problem banata hai aur runtime exponentially badhata hai. Doosri critical mistake hai FOR ALL ENTRIES bina IS NOT INITIAL check ke jo empty driver pe poori table fetch kar leti hai aur TSV dump deti hai. Teesri hai LOOP INTO work area mein change karna bina MODIFY ke jisse update silently lost ho jaata hai. Inhe avoid karne ke liye main bulk SELECT, hashed lookup tables, ASSIGNING FIELD-SYMBOL aur ST05, SAT profiling use karta hoon, jisse mere reports stable aur fast rehte hain.",
    interviewScriptEnglish: "The most damaging internal table mistakes I see in projects are: SELECT inside a LOOP creating N+1 database calls; FOR ALL ENTRIES without an IS NOT INITIAL guard which silently fetches every row when the driver is empty; modifying a work area in LOOP INTO without a MODIFY statement, so updates are lost; using standard tables for high frequency key lookups when hashed or sorted tables would be far faster; and forgetting BINARY SEARCH after SORT, which keeps the read sequential. I prevent these issues with bulk SELECT, correct table type selection, ASSIGNING FIELD-SYMBOL and disciplined ST05 and SAT profiling.",
    wordByWordSamjho: [
      { keyword: "SELECT SINGLE ... INSIDE LOOP", meaning: "Anti-pattern that issues one database call per outer row." },
      { keyword: "FOR ALL ENTRIES IN @lt_orders", meaning: "Bulk fetch driven by a non-empty driver table; needs IS NOT INITIAL guard." },
      { keyword: "IS NOT INITIAL", meaning: "Mandatory check before FOR ALL ENTRIES to prevent full table scans." },
      { keyword: "LOOP AT ... INTO ls / ASSIGNING <fs>", meaning: "Two iteration styles; INTO needs MODIFY for updates, ASSIGNING does not." },
      { keyword: "MODIFY lt FROM ls INDEX sy-tabix", meaning: "Persists work area changes back into the internal table." },
      { keyword: "READ TABLE ... BINARY SEARCH", meaning: "Requires the table to be sorted on the key; otherwise wrong rows are returned silently." },
      { keyword: "COLLECT ls INTO lt_totals", meaning: "Aggregates numeric fields by non-numeric key; cleaner than manual READ/MODIFY logic." },
      { keyword: "ST05 / SAT", meaning: "SQL trace and runtime analysis transactions used to prove and prevent these mistakes." }
    ],
    commonMistakesSection: [
      { mistake: "Calling SELECT SINGLE inside a LOOP over thousands of rows.", whyWrong: "Generates N database round trips that dominate runtime and appear as the top consumers in ST05.", correctApproach: "Pre-fetch with a single SELECT or FOR ALL ENTRIES into a HASHED TABLE WITH UNIQUE KEY and READ TABLE WITH TABLE KEY inside the loop." },
      { mistake: "FOR ALL ENTRIES without an IS NOT INITIAL guard on the driver table.", whyWrong: "An empty driver causes SAP to drop the WHERE clause and fetch every row from huge tables like BSEG.", correctApproach: "Always wrap: IF lt_driver IS NOT INITIAL. SELECT ... FOR ALL ENTRIES IN @lt_driver ... ENDIF." },
      { mistake: "Modifying a work area inside LOOP INTO and forgetting MODIFY.", whyWrong: "Changes apply only to the local copy and are silently discarded when the loop ends.", correctApproach: "Either add MODIFY lt FROM ls INDEX sy-tabix or switch the loop to LOOP AT ... ASSIGNING FIELD-SYMBOL." },
      { mistake: "Using SORT followed by READ TABLE WITHOUT the BINARY SEARCH addition.", whyWrong: "SAP still performs an O(n) linear scan, so the SORT effort gains nothing on the read.", correctApproach: "Add BINARY SEARCH explicitly or, better, declare the table as SORTED TABLE so optimised access is automatic." }
    ],
    quickRevisionNotes: "What: Catalog of high impact internal table mistakes and the patterns that prevent them.\n\nUsed for:\n- Code reviews of custom ABAP programs\n- Performance tuning of reports and batch jobs\n- Onboarding junior developers and ATC remediation\n\nKey syntax / tables / Tcodes:\n- IF lt IS NOT INITIAL before FOR ALL ENTRIES\n- LOOP AT ... ASSIGNING FIELD-SYMBOL(<fs>); MODIFY INDEX sy-tabix\n- SORT + BINARY SEARCH, COLLECT, HASHED TABLE; profile with ST05, SAT, ST22\n\nInterview keyword: Six common itab mistakes, all preventable with discipline and profiling."
  },
  'internal-tables-014': {
    interviewScriptHinglish: "Sir, internal table code ko production mein bhejne se pehle main systematic testing karta hoon jo sirf happy path tak limited nahi hota. Empty table, single row, aur large volume teen baseline scenarios hain. Critical case hai FOR ALL ENTRIES with empty driver — agar IS NOT INITIAL check fail kare toh production dump aata hai isliye ye specifically test case banata hoon. SORT plus BINARY SEARCH correctness, COLLECT accuracy, aur LOOP modifications ka before-after verification bhi karta hoon. SAT runtime analysis aur ABAP Unit Tests ka use karta hoon jisse regression catch ho aur business team ko stable, predictable behaviour mile.",
    interviewScriptEnglish: "I follow a structured testing checklist for internal table code that goes beyond the happy path. I always test empty tables to confirm IS INITIAL handling, single row edge cases, and large volumes profiled with SAT to catch hidden N+1 patterns. The mandatory test is FOR ALL ENTRIES with an empty driver — if the guard is missing, production would dump. I verify SORT and BINARY SEARCH correctness, COLLECT aggregation accuracy, and use ABAP Unit Tests with CL_ABAP_UNIT_ASSERT for regression coverage. This discipline ensures predictable, stable behaviour for the business team and avoids costly fire-fighting in production.",
    wordByWordSamjho: [
      { keyword: "IS INITIAL", meaning: "Checks whether the internal table currently has zero rows." },
      { keyword: "IS NOT INITIAL", meaning: "Guard placed before FOR ALL ENTRIES to ensure the driver table has rows." },
      { keyword: "SAT / SE30", meaning: "Runtime analysis transaction used to profile ABAP statements and database calls." },
      { keyword: "ABAP Unit / CL_ABAP_UNIT_ASSERT", meaning: "Framework and class for writing automated unit tests with assertions." },
      { keyword: "ASSERT condition", meaning: "Inline runtime check that halts execution if the condition is false." },
      { keyword: "DO N TIMES ... APPEND ... ENDDO", meaning: "Generates synthetic test data when production volumes are not available." },
      { keyword: "READ TABLE ... BINARY SEARCH", meaning: "Optimised read used in correctness tests of sorted standard tables." },
      { keyword: "COLLECT ls INTO lt_res", meaning: "Aggregates numeric fields, validated against manually computed expected totals." }
    ],
    commonMistakesSection: [
      { mistake: "Testing only with small development data sets.", whyWrong: "Quadratic patterns like SELECT inside LOOP are invisible at small scale and explode in production.", correctApproach: "Generate synthetic volume with DO N TIMES APPEND and profile with SAT before promoting code." },
      { mistake: "Skipping the empty FOR ALL ENTRIES test.", whyWrong: "Missing IS NOT INITIAL guards are not caught at compile time and dump only when the driver becomes empty.", correctApproach: "Make a dedicated test case that runs the program with an empty driver table and asserts no secondary SELECT executes." },
      { mistake: "Asserting only the happy path of READ TABLE BINARY SEARCH.", whyWrong: "The non-existent key case is where bugs hide; without testing it, defensive code is untested.", correctApproach: "Always assert both sy-subrc = 0 with the correct row, and sy-subrc = 4 for a key that does not exist." },
      { mistake: "Calling ALV display without an empty data check.", whyWrong: "Empty internal tables can cause ALV dumps or confusing blank screens in UAT and production.", correctApproach: "Guard with IF lt_result IS INITIAL, show a meaningful message, and only call cl_salv_table=>factory when data exists." }
    ],
    quickRevisionNotes: "What: Disciplined testing approach covering correctness, performance and edge cases for internal table code.\n\nUsed for:\n- Pre-transport validation of new and refactored ABAP programs\n- Regression protection via ABAP Unit and ATC\n- Performance certification for batch jobs and reports\n\nKey syntax / tables / Tcodes:\n- IS INITIAL / IS NOT INITIAL guards; ASSERT, CL_ABAP_UNIT_ASSERT\n- DO N TIMES APPEND for synthetic volume; SAT for profiling; ST22 for dumps\n- Test ALV with empty result and full data; verify SORT + BINARY SEARCH for first, last, middle and missing keys\n\nInterview keyword: Test empty, single row, large volume and FOR ALL ENTRIES empty case, every time."
  }
};

const tiers = {
  'internal-tables-011': ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'advanced', 'advanced'],
  'internal-tables-012': ['medium', 'medium', 'medium', 'advanced', 'medium', 'advanced', 'advanced', 'easy'],
  'internal-tables-013': ['medium', 'advanced', 'easy', 'medium', 'easy', 'medium', 'advanced', 'advanced'],
  'internal-tables-014': ['medium', 'medium', 'advanced', 'advanced', 'medium', 'easy', 'easy', 'medium']
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
