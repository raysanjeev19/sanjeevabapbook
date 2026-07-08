import type { BtpMcq, BtpQuestion } from "@/lib/btp-content";

/** Section 6 — SAP HANA Cloud. Interview questions, full format. */
export const hanaCloudQuestions: BtpQuestion[] = [
  {
    id: "hana-q1",
    topic: "Database",
    prompt: "What makes SAP HANA an 'in-memory' database, and what's the practical benefit?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["database", "in-memory"],
    estimatedMinutes: 2,
    expectedAnswer:
      "HANA keeps the primary copy of data in RAM rather than reading from disk for every query, which eliminates most disk I/O latency — the main bottleneck in traditional databases — making analytical and transactional queries dramatically faster.",
    detailedAnswer:
      "Traditional databases cache some data in memory but treat disk as the source of truth, incurring I/O latency whenever data isn't already cached. HANA inverts this — the working dataset lives in RAM as the primary copy, with disk used for persistence (so data survives a restart) rather than as the read path for normal queries. Combined with columnar storage (which we'll cover separately) and massively parallel processing across CPU cores, this lets HANA run complex analytical queries directly against live transactional data, rather than needing a separate, delayed data warehouse for reporting.",
    hindiExplanation:
      "Traditional databases kuch data memory mein cache karte hain lekin disk ko source of truth maante hain, isliye jab bhi data cache mein nahi hota, I/O latency lagti hai. HANA isse ulta karta hai — working dataset RAM mein primary copy ki tarah rehta hai, disk sirf persistence ke liye use hota hai (taaki restart pe data survive kare), normal queries ke read path ke liye nahi. Columnar storage aur CPU cores ke aar-paar massively parallel processing ke saath combine hoke, HANA complex analytical queries live transactional data pe directly chala sakta hai, alag, delayed data warehouse ki zaroorat ke bina.",
    interviewExplanation:
      "I'd explain the shift in source-of-truth: 'HANA keeps the working dataset in RAM as the primary copy, not just as a cache — disk is used for persistence, not the normal read path. That eliminates most I/O latency, and combined with columnar storage and parallel processing across cores, it lets analytical queries run directly against live transactional data instead of needing a separate delayed data warehouse.'",
    diagramNote:
      "Traditional DB: 'Query → check cache → miss → disk I/O (slow)' vs HANA: 'Query → RAM (primary copy) → fast, disk only for persistence/restart recovery'.",
    diagramMermaid: `flowchart LR
    A["Traditional DB query"] --> B["Check cache"] --> C["Miss → disk I/O (slow)"]
    D["HANA query"] --> E["RAM (primary copy)"] --> F["Fast — disk only for persistence"]`,
    realProjectExample:
      "A reporting query that took minutes against a traditional disk-based warehouse ran in under a second directly against live HANA Cloud data, eliminating the need for a separate nightly ETL job into a reporting store entirely.",
    interviewTip:
      "If asked 'does that mean data is lost on restart', clarify explicitly: disk-based persistence (via savepoints and logs) still guarantees durability — RAM is the primary read path, not the only copy.",
    followupQuestions: [
      "Does in-memory mean data is lost if the system restarts?",
      "What is columnar storage and how does it complement in-memory processing?",
      "Why can HANA run analytics directly on transactional data, unlike traditional setups?",
    ],
    commonMistakes: [
      "Thinking in-memory means data isn't persisted to disk at all.",
      "Not being able to explain the actual performance mechanism (eliminating I/O as the bottleneck).",
    ],
    importantPoints: [
      "RAM is the primary copy/read path, not just a cache.",
      "Disk still provides persistence (savepoints/logs) — data isn't lost on restart.",
      "Combined with columnar storage + parallel processing, enables real-time analytics on live data.",
    ],
    revisionNotes: "In-memory = RAM is the primary read path (not disk), eliminating I/O bottleneck. Disk still persists data for durability.",
  },
  {
    id: "hana-q2",
    topic: "Database",
    prompt: "What is columnar storage, and why does it suit analytical queries better than row storage?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["database", "columnar-storage"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Columnar storage keeps each column's values contiguous in memory rather than each row's fields together; analytical queries typically scan/aggregate a few columns across many rows, so reading only those columns (skipping unrelated ones entirely) is far more efficient than row storage, which forces reading entire rows.",
    detailedAnswer:
      "In row storage, a table's data is laid out row-by-row — to compute an average of one column across a million rows, you'd still touch every other field in every row along the way, wasting memory bandwidth. Columnar storage instead stores all values of one column contiguously, so an aggregation on that column only reads exactly the data it needs, skipping every other column entirely. This also enables much better compression (similar values in one column compress well) and vectorized CPU operations across contiguous data. The tradeoff: single-row lookups/inserts (typical transactional patterns) are relatively less efficient in pure columnar storage, which is why HANA is often described as suited for both OLTP and OLAP, blending techniques to handle both patterns well.",
    hindiExplanation:
      "Row storage mein, table ka data row-by-row layout hota hai — ek column ka average nikaalne ke liye lakhon rows pe, tumhe har row ke har field ko bhi touch karna padta, memory bandwidth waste hota. Columnar storage iske ulta ek column ke saare values ko contiguously store karta hai, isliye us column pe aggregation sirf zaroori data read karta hai, baaki columns skip karte hue. Isse better compression bhi milti hai (ek column mein similar values achhe se compress hoti hain) aur vectorized CPU operations bhi contiguous data pe. Tradeoff hai — single-row lookups/inserts (typical transactional patterns) pure columnar storage mein relatively kam efficient hote hain, isliye HANA OLTP aur OLAP dono ke liye suited kaha jaata hai, techniques ko blend karke.",
    interviewExplanation:
      "I'd explain with the contrast: 'Row storage lays data out row-by-row, so an aggregation on one column still touches every other field along the way. Columnar storage keeps each column contiguous, so an aggregation only reads exactly what it needs, skipping unrelated columns — plus better compression and vectorized CPU operations. The tradeoff is single-row transactional lookups are relatively less efficient in pure columnar storage.'",
    diagramNote:
      "Row storage: 'Row1[colA,colB,colC], Row2[colA,colB,colC]...' vs Columnar: 'ColA[all values], ColB[all values], ColC[all values]' — with an aggregation query only touching ColA in the columnar layout.",
    diagramMermaid: `flowchart LR
    A["Row storage<br/>Row1[A,B,C], Row2[A,B,C]..."] --> B["Aggregation on A touches<br/>every field in every row"]
    C["Columnar storage<br/>ColA[...], ColB[...], ColC[...]"] --> D["Aggregation on A only<br/>reads ColA, skips B and C"]`,
    realProjectExample:
      "Switching a reporting query's underlying table access pattern to leverage columnar storage's strengths (aggregating over a few key columns across millions of rows) cut query time dramatically compared to an equivalent row-oriented approach.",
    interviewTip:
      "Mentioning the OLTP/OLAP tradeoff (columnar favors analytics, less ideal for pure single-row transactional patterns) shows a more complete, nuanced understanding than just 'columnar is faster'.",
    followupQuestions: [
      "Why is compression better in columnar storage?",
      "What does it mean that HANA supports both OLTP and OLAP workloads?",
      "When might row storage actually still be preferred?",
    ],
    commonMistakes: [
      "Saying columnar storage is 'just faster' without explaining why for analytical patterns specifically.",
      "Not knowing there's a tradeoff for single-row transactional access.",
    ],
    importantPoints: [
      "Columnar = each column stored contiguously, ideal for column-scanning aggregations.",
      "Enables better compression and vectorized CPU operations.",
      "Tradeoff: less ideal for pure single-row transactional lookups/inserts.",
    ],
    revisionNotes: "Columnar storage = per-column contiguous layout, ideal for analytics (scan few columns, skip rest) + better compression. Tradeoff vs row storage for single-row OLTP patterns.",
  },
  {
    id: "hana-q3",
    topic: "HDI Containers",
    prompt: "What is an HDI container, and why does every CAP/RAP app need one?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["hdi", "containers"],
    estimatedMinutes: 3,
    expectedAnswer:
      "An HDI (HANA Deployment Infrastructure) container is an isolated schema/design-time deployment unit within a HANA Cloud instance — it gives an application its own private database objects and controlled deployment lifecycle, so multiple apps (or tenants) can share one HANA instance without touching each other's schema.",
    detailedAnswer:
      "Rather than every app connecting to and manually managing objects in one shared, uncontrolled schema, HDI gives each app (or tenant) its own container — a logically isolated design-time unit where the app's CDS-generated database artifacts (tables, views) are deployed via the HDI deployer, versioned, and updated safely on each deployment. This isolation is exactly what makes multitenancy practical (each tenant's HDI container is separate) and what lets several unrelated applications coexist on one shared HANA Cloud instance without any risk of one app's schema changes accidentally affecting another's data.",
    hindiExplanation:
      "Har app ko ek shared, uncontrolled schema mein directly connect karke objects manually manage karne ki jagah, HDI har app (ya tenant) ko apna container deta hai — ek logically isolated design-time unit jaha app ke CDS-generated database artifacts (tables, views) HDI deployer ke through deploy hote hain, versioned hote hain, aur har deployment pe safely update hote hain. Yahi isolation multitenancy ko practical banata hai (har tenant ka HDI container alag hota hai) aur kai unrelated applications ko ek shared HANA Cloud instance pe coexist karne deta hai bina ek app ke schema changes se doosre ke data ko affect kiye.",
    interviewExplanation:
      "I'd explain the isolation purpose: 'An HDI container gives an app its own isolated schema and controlled deployment lifecycle within a shared HANA Cloud instance. It's exactly what makes multitenancy practical — each tenant gets a separate container — and lets multiple unrelated apps coexist on one HANA instance without one app's schema changes ever touching another's data.'",
    diagramNote:
      "One HANA Cloud instance containing three separate HDI containers, each isolated: 'App A container', 'App B container', 'Tenant 1 container' — no cross-container schema visibility.",
    diagramMermaid: `flowchart TD
    HANA["One HANA Cloud instance"] --> C1["HDI Container: App A"]
    HANA --> C2["HDI Container: App B"]
    HANA --> C3["HDI Container: Tenant 1"]`,
    realProjectExample:
      "Three separate microservices shared a single HANA Cloud instance, each with its own HDI container — a schema migration deployed to one service's container had zero risk of affecting the other two, since they were completely isolated.",
    interviewTip:
      "Connecting HDI containers directly to the multitenancy pattern from the CAP section shows you see how these BTP concepts interlock, not just memorized in isolation.",
    followupQuestions: [
      "How does the HDI deployer know what to deploy into a container?",
      "Can two HDI containers reference each other's objects?",
      "What happens to an HDI container's data if you redeploy the app?",
    ],
    commonMistakes: [
      "Thinking an HDI container is just a database connection string, not an isolated schema/deployment unit.",
      "Not connecting HDI containers to how multitenancy actually achieves data isolation.",
    ],
    importantPoints: [
      "HDI container = isolated schema + controlled deployment lifecycle.",
      "Enables safe multi-app/multi-tenant coexistence on one HANA instance.",
      "Deployed/versioned via the HDI deployer, not manual schema management.",
    ],
    revisionNotes: "HDI container = isolated schema + deployment lifecycle per app/tenant, enabling safe coexistence on one shared HANA Cloud instance.",
  },
  {
    id: "hana-q4",
    topic: "Calculation Views",
    prompt: "What is a Calculation View, and how does it differ from a plain SQL view?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["calculation-views", "modeling"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A Calculation View is a graphical, reusable data model built from nodes (joins, unions, aggregations, projections) that compiles down to an optimized execution plan HANA can run in parallel — it's designed for complex analytical modeling, whereas a plain SQL view is just a stored, named query.",
    detailedAnswer:
      "A SQL view is essentially a saved SELECT statement — straightforward, but complex analytical logic (multiple joins, conditional aggregations, currency conversion, hierarchies) can become unwieldy to express and optimize as one long SQL statement. A Calculation View instead lets you build the logic as a graph of composable nodes — a join node, then an aggregation node, then a projection node — each of which HANA can optimize and parallelize as part of a coherent execution plan, and which can be built visually in the HANA modeling tools (Database Explorer's graphical editor or SAP Business Application Studio) rather than hand-written SQL. Calculation Views are also the typical foundation CDS views build on top of when consuming existing HANA-native data models.",
    hindiExplanation:
      "SQL view basically ek saved SELECT statement hai — straightforward, lekin complex analytical logic (multiple joins, conditional aggregations, currency conversion, hierarchies) ko ek lambe SQL statement ki tarah express/optimize karna mushkil ho sakta hai. Calculation View iske bajaye logic ko composable nodes ke graph ki tarah banane deta hai — ek join node, fir aggregation node, fir projection node — jinhe HANA ek coherent execution plan ke hisse ki tarah optimize/parallelize kar sakta hai, aur jo visually HANA modeling tools mein bana sakte ho, hand-written SQL ki jagah. Calculation Views typically wo foundation hoti hain jispe CDS views build hoti hain jab existing HANA-native data models consume karni ho.",
    interviewExplanation:
      "I'd contrast the two: 'A SQL view is just a saved query. A Calculation View is a graph of composable nodes — join, aggregation, projection — that HANA compiles into an optimized, parallelizable execution plan, built visually rather than as one long SQL statement. It's typically what CDS views build on top of when consuming existing HANA-native models.'",
    diagramNote:
      "SQL view: 'One stored SELECT statement'. Calculation View: graph of nodes 'Join → Aggregation → Projection', compiled into an optimized parallel execution plan.",
    diagramMermaid: `flowchart LR
    A["SQL view"] --> B["One stored SELECT statement"]
    C["Calculation View"] --> D["Join node"] --> E["Aggregation node"] --> F["Projection node"]
    F --> G["Optimized, parallel execution plan"]`,
    realProjectExample:
      "A complex sales-reporting requirement involving currency conversion and multi-level aggregation was modeled as a Calculation View with clearly separated join/aggregation nodes, making it far easier to maintain and debug than an equivalent single massive SQL query would have been.",
    interviewTip:
      "If asked when you'd reach for a Calculation View instead of a plain SQL/CDS view, the answer is for complex, multi-step analytical modeling that benefits from HANA's optimized execution planning — not for a trivial single-table query.",
    followupQuestions: [
      "What types of nodes can a Calculation View contain?",
      "How does a Calculation View relate to a CDS view consuming it?",
      "Can Calculation Views be built with SQL script instead of the graphical editor?",
    ],
    commonMistakes: [
      "Thinking a Calculation View is just a fancier name for a SQL view with no real technical distinction.",
      "Not knowing Calculation Views commonly underpin CDS views for HANA-native modeling.",
    ],
    importantPoints: [
      "Calculation View = graph of composable nodes (join/aggregation/projection), optimized/parallelized by HANA.",
      "Built visually, suited for complex analytical modeling.",
      "Often the foundation CDS views build on for HANA-native data.",
    ],
    revisionNotes: "Calculation View = graphical, node-based analytical model (join/aggregate/project), optimized/parallel execution — vs a SQL view being just a saved query.",
  },
  {
    id: "hana-q5",
    topic: "SQL",
    prompt: "What is a window function in HANA SQL, and when would you use one over a GROUP BY?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["sql", "window-functions"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A window function computes an aggregate or ranking across a set of rows related to the current row (a 'window'), without collapsing the result into one row per group like GROUP BY does — useful when you need both the individual row detail AND an aggregate value (like a running total or rank) side by side.",
    detailedAnswer:
      "GROUP BY collapses many rows into one summary row per group, losing individual row detail. A window function like `SUM(amount) OVER (PARTITION BY customer ORDER BY date)` computes a running total per customer while still returning one row per original transaction — you get both the detail and the aggregate context together. Common uses include running totals, ranking (`RANK()`, `ROW_NUMBER()`) within a partition, and moving averages — all cases where collapsing to one row per group (as GROUP BY would) would lose information you actually need to display or reason about.",
    hindiExplanation:
      "GROUP BY kai rows ko ek summary row per group mein collapse kar deta hai, individual row detail lose ho jaati hai. Window function jaise `SUM(amount) OVER (PARTITION BY customer ORDER BY date)` har customer ka running total compute karta hai jabki phir bhi ek row per original transaction return karta hai — tumhe detail aur aggregate context dono saath milte hain. Common uses hain running totals, ranking (`RANK()`, `ROW_NUMBER()`) ek partition ke andar, aur moving averages — sab cases jaha ek row per group collapse karna (jaise GROUP BY karega) important information lose kar deta.",
    interviewExplanation:
      "I'd give the exact use case: 'GROUP BY collapses rows to one per group, losing detail. A window function, like SUM(amount) OVER (PARTITION BY customer ORDER BY date), computes an aggregate like a running total per customer while still returning one row per original transaction — I'd reach for it whenever I need both individual detail and aggregate context together, like running totals or rankings.'",
    diagramNote:
      "GROUP BY: 'Many rows → 1 row per group (detail lost)'. Window function: 'Many rows → same number of rows, each annotated with an aggregate/rank relative to its window'.",
    diagramMermaid: `flowchart LR
    A["GROUP BY"] --> B["Many rows → 1 row per group<br/>detail lost"]
    C["Window function"] --> D["Same row count, each annotated<br/>with aggregate/rank in its window"]`,
    realProjectExample:
      "A dashboard requirement to show each individual transaction alongside its customer's running total to date was solved cleanly with a single window function query, avoiding a much clunkier self-join or application-side calculation.",
    interviewTip:
      "Naming a concrete window function syntax (PARTITION BY / ORDER BY) rather than just saying 'window functions are like GROUP BY but different' demonstrates real SQL fluency.",
    followupQuestions: [
      "What does PARTITION BY do inside a window function?",
      "What's the difference between RANK() and ROW_NUMBER()?",
      "Can you use a window function and a regular GROUP BY in the same query?",
    ],
    commonMistakes: [
      "Not knowing the actual syntax (OVER, PARTITION BY) when explaining window functions.",
      "Assuming window functions collapse rows the same way GROUP BY does.",
    ],
    importantPoints: [
      "Window function = aggregate/rank per row, without collapsing rows like GROUP BY.",
      "Common uses: running totals, rankings, moving averages.",
      "Choose it when you need both individual detail AND aggregate context together.",
    ],
    revisionNotes: "Window function (OVER/PARTITION BY) = aggregate/rank per row without collapsing rows, unlike GROUP BY — for running totals, rankings, etc.",
  },
  {
    id: "hana-q6",
    topic: "Indexes",
    prompt: "Does HANA need traditional B-tree indexes the same way row-based databases do?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["indexes", "performance"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Less so for columnar tables — the columnar storage itself, combined with dictionary compression and in-memory scanning, often makes full-column scans fast enough that traditional B-tree indexes matter less than in row-based databases, though HANA still supports explicit indexes for specific access patterns (like point lookups on row store tables).",
    detailedAnswer:
      "In a traditional row-based database, an index is often essential to avoid a slow full-table scan for selective queries. In HANA's columnar engine, scanning an entire (compressed, in-memory) column is often already fast enough that the same selective query doesn't need a traditional index the way it would elsewhere — the column store's own structure (dictionary-encoded values, contiguous storage) acts somewhat like a built-in optimization. That said, HANA does still support explicit indexes (including for row-store tables, which behave more like traditional databases, and specific index types like inverted indexes for full-text search), so it's not that indexes are irrelevant — just that the default columnar performance profile reduces how often you need to think about them compared to a traditional RDBMS.",
    hindiExplanation:
      "Traditional row-based database mein, index aksar zaroori hota hai slow full-table scan avoid karne ke liye selective queries ke liye. HANA ke columnar engine mein, poore (compressed, in-memory) column ko scan karna aksar already itna fast hota hai ki wahi selective query ko traditional index ki utni zaroorat nahi padti jitni kahin aur padti — column store ka apna structure (dictionary-encoded values, contiguous storage) khud ek built-in optimization ki tarah kaam karta hai. Phir bhi, HANA explicit indexes support karta hai (row-store tables ke liye bhi, jo traditional databases jaisa behave karte hain, aur specific index types jaise full-text search ke liye inverted indexes) — matlab indexes irrelevant nahi hain, bas default columnar performance profile isse kam important bana deta hai traditional RDBMS ke comparison mein.",
    interviewExplanation:
      "I'd give the nuanced answer: 'Less so for columnar tables — scanning a compressed, in-memory column is often fast enough that you don't need a traditional index the way you would in a row-based database. But HANA still supports explicit indexes, especially for row-store tables or specific patterns like full-text search, so it's not that indexes are irrelevant — just less central to performance by default.'",
    diagramNote:
      "Row-based DB: 'Selective query → needs index to avoid full scan'. HANA columnar: 'Selective query → fast compressed column scan often sufficient, index less critical (but still supported)'.",
    diagramMermaid: `flowchart LR
    A["Row-based DB:<br/>selective query"] --> B["Needs index to avoid full scan"]
    C["HANA columnar:<br/>selective query"] --> D["Fast compressed column scan<br/>often sufficient (index less critical)"]`,
    realProjectExample:
      "A query that would have needed a carefully tuned index in a traditional database ran acceptably fast on HANA purely from its columnar scan performance, though we still added an explicit index for one specific high-frequency point-lookup pattern that benefited from it.",
    interviewTip:
      "The nuanced 'less critical by default, but still supported and sometimes still useful' answer is stronger than a flat 'HANA doesn't need indexes' — the latter is an oversimplification that can be caught by a follow-up question.",
    followupQuestions: [
      "What is dictionary encoding and how does it help columnar scan performance?",
      "When would you still explicitly create an index in HANA?",
      "What's the difference between row store and column store tables in HANA?",
    ],
    commonMistakes: [
      "Claiming HANA 'never needs indexes' as an absolute statement.",
      "Not knowing HANA still supports row-store tables and explicit indexes for specific patterns.",
    ],
    importantPoints: [
      "Columnar storage + compression often makes full-column scans fast enough without a traditional index.",
      "HANA still supports explicit indexes, especially for row-store tables or full-text search.",
      "Indexes are less central by default, not irrelevant entirely.",
    ],
    revisionNotes: "HANA columnar scans are often fast enough without traditional indexes, but indexes are still supported (row-store, full-text) — less critical by default, not irrelevant.",
  },
  {
    id: "hana-q7",
    topic: "Performance",
    prompt: "A HANA Cloud query is running slower than expected. What would you check first?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["performance", "troubleshooting", "scenario"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Check the query's execution plan (via EXPLAIN PLAN or the Database Explorer's visual plan viewer) to see where time is actually being spent — a large intermediate result, an unnecessarily wide column selection, or a Calculation View doing more joins/unions than the query actually needs are common culprits.",
    detailedAnswer:
      "Rather than guessing, the first concrete step is generating and reading the execution plan, which shows exactly which operations (joins, scans, aggregations) consumed the most time and rows. Common real causes include: selecting far more columns than needed (defeating columnar storage's advantage of reading only relevant columns), an underlying Calculation View performing unnecessary joins/unions for data the actual query doesn't use, missing filter pushdown (a filter applied too late in the plan instead of at the earliest possible point), or simply querying an unexpectedly large intermediate result set before final aggregation. Once the plan identifies the actual bottleneck operation, you address that specifically rather than tuning blindly.",
    hindiExplanation:
      "Guess karne ki jagah, pehla concrete step hai execution plan generate/read karna, jo exactly dikhata hai kaunse operations (joins, scans, aggregations) sabse zyada time/rows consume kar rahe hain. Common real causes hain: zaroorat se zyada columns select karna (columnar storage ka fayda defeat karta hai), underlying Calculation View unnecessary joins/unions kar rahi ho jo actual query use hi nahi karti, missing filter pushdown (filter plan mein bahut baad mein apply ho raha ho, jaldi possible point pe nahi), ya simply ek unexpectedly bade intermediate result set ko query karna final aggregation se pehle. Plan se actual bottleneck operation identify hone ke baad, use specifically address karo, blindly tune karne ki jagah.",
    interviewExplanation:
      "I'd start with data, not guesses: 'First, I'd generate the execution plan to see exactly where time is spent. Common real causes are selecting more columns than needed, an underlying Calculation View doing unnecessary joins the query doesn't actually use, missing filter pushdown, or a large intermediate result before final aggregation. Once the plan shows the actual bottleneck, I address that specifically.'",
    diagramNote:
      "Flow: 'Query slower than expected' → 'Generate execution plan' → identify bottleneck → branches: 'too many columns selected', 'unnecessary joins in Calculation View', 'missing filter pushdown', 'large intermediate result'.",
    diagramMermaid: `flowchart TD
    A["Query slower than expected"] --> B["Generate execution plan"]
    B --> C["Too many columns selected"]
    B --> D["Unnecessary joins in Calculation View"]
    B --> E["Missing filter pushdown"]
    B --> F["Large intermediate result before aggregation"]`,
    realProjectExample:
      "An execution plan revealed a query was pulling in a full Calculation View's wide join output before filtering, when pushing the filter earlier (querying a narrower projection first) cut the intermediate result size dramatically and fixed the slowdown.",
    interviewTip:
      "Structuring this as 'generate the plan first, then diagnose from evidence' rather than listing generic tips ('add an index', 'reduce data') shows a real, repeatable troubleshooting process.",
    followupQuestions: [
      "How would you generate an execution plan in HANA?",
      "What is filter pushdown and why does its absence hurt performance?",
      "How would you identify if a Calculation View is doing unnecessary work?",
    ],
    commonMistakes: [
      "Jumping to generic fixes (add an index, add more memory) without first checking the execution plan.",
      "Not knowing filter pushdown as a specific, checkable performance concept.",
    ],
    importantPoints: [
      "Start with the execution plan to see where time is actually spent.",
      "Common causes: over-wide column selection, unnecessary Calculation View joins, missing filter pushdown, large intermediate results.",
      "Diagnose from evidence (the plan), not generic guesses.",
    ],
    revisionNotes: "Slow HANA query: check execution plan first → diagnose (wide columns, unnecessary joins, missing filter pushdown, large intermediate results) → fix the specific bottleneck.",
  },
  {
    id: "hana-q8",
    topic: "Replication",
    prompt: "Why would you set up replication into HANA Cloud from an external source system, and what's a common way to do it?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["replication", "integration"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Replication continuously copies data from a source system (like an on-prem database or S/4HANA) into HANA Cloud so you can run analytics or build applications against fresh, near-real-time data without querying the source system directly and impacting its performance; SAP Smart Data Integration (SDI) or the SAP HANA Cloud, data lake integration are common mechanisms.",
    detailedAnswer:
      "Querying a production transactional system directly for heavy analytical workloads risks degrading its performance for the actual business processes it's meant to run. Replication instead continuously streams changes from the source into HANA Cloud (via change data capture or scheduled batch loads), giving you a separate, isolated copy to run reporting or build applications against, kept reasonably fresh without touching the source system's own query load. SAP Smart Data Integration (SDI) is a common tool for this, along with SAP Landscape Transformation Replication Server (SLT) for SAP source systems specifically, replicating table changes in near-real-time.",
    hindiExplanation:
      "Production transactional system ko directly heavy analytical workloads ke liye query karna uski performance degrade kar sakta hai actual business processes ke liye jo wo chalane wala hai. Replication iske bajaye source se changes ko continuously HANA Cloud mein stream karta hai (change data capture ya scheduled batch loads ke through), tumhe ek alag, isolated copy deta hai reporting ya applications banane ke liye, reasonably fresh rakhte hue source system ke apne query load ko touch kiye bina. SAP Smart Data Integration (SDI) iske liye common tool hai, SAP Landscape Transformation Replication Server (SLT) specifically SAP source systems ke liye, table changes ko near-real-time replicate karta hai.",
    interviewExplanation:
      "I'd give the business reason first: 'Querying a production system directly for heavy analytics risks degrading its own performance. Replication continuously streams changes into HANA Cloud instead, giving a separate, fresh copy to report against without touching the source's query load. SAP Smart Data Integration, or SLT specifically for SAP sources, are common tools for this.'",
    diagramNote:
      "Source System (production, isolated from analytics load) --SDI/SLT replication--> HANA Cloud (analytics/reporting copy, near-real-time).",
    diagramMermaid: `flowchart LR
    A["Source System<br/>production, isolated from analytics load"] -- "SDI / SLT replication" --> B["HANA Cloud<br/>analytics/reporting copy"]`,
    realProjectExample:
      "Replicating S/4HANA sales data into HANA Cloud via SLT let the reporting team build dashboards against near-real-time data without ever running a heavy analytical query directly against the production S/4HANA system.",
    interviewTip:
      "Naming SDI and SLT specifically (rather than a vague 'some replication tool') shows real familiarity with SAP's actual integration toolset for this purpose.",
    followupQuestions: [
      "What's the difference between SDI and SLT?",
      "How 'real-time' is typical change data capture replication?",
      "What would you monitor to ensure replication stays healthy?",
    ],
    commonMistakes: [
      "Suggesting analytics should just query the production source system directly for simplicity.",
      "Not knowing specific tool names (SDI, SLT) for SAP-to-HANA replication.",
    ],
    importantPoints: [
      "Replication avoids impacting the source system's own performance for analytics workloads.",
      "Gives a fresh, near-real-time, isolated copy to report/build against.",
      "SDI and SLT (for SAP sources) are common replication mechanisms.",
    ],
    revisionNotes: "Replication = continuous copy from source to HANA Cloud (via SDI/SLT), avoiding analytics load on production, keeping a fresh reporting copy.",
  },
  {
    id: "hana-q9",
    topic: "Backup",
    prompt: "How does backup and recovery work for a HANA Cloud instance, and who is responsible for it?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["backup", "recovery"],
    estimatedMinutes: 2,
    expectedAnswer:
      "SAP automatically manages regular backups (savepoints and log backups) for HANA Cloud instances as part of the managed service, and provides point-in-time recovery within a retention window — customers don't manage backup infrastructure themselves, but should still understand the retention window and recovery process.",
    detailedAnswer:
      "Because HANA Cloud is a managed database service, SAP handles the operational mechanics of backup — periodic full data backups (savepoints) plus continuous transaction log backups, enabling point-in-time recovery to any moment within the configured retention period, not just to the last full backup. Customers don't configure backup schedules or storage themselves the way they might with self-managed infrastructure, but should still know the retention window (how far back recovery is possible), understand that recovery is typically performed via a support process or self-service cockpit action, and factor this into their own disaster-recovery planning rather than assuming zero responsibility at all.",
    hindiExplanation:
      "Kyunki HANA Cloud ek managed database service hai, SAP backup ki operational mechanics khud handle karta hai — periodic full data backups (savepoints) plus continuous transaction log backups, jo point-in-time recovery enable karte hain configured retention period ke andar kisi bhi moment tak, sirf last full backup tak nahi. Customers khud backup schedules ya storage configure nahi karte jaisa self-managed infrastructure mein karte, lekin phir bhi retention window (kitna peeche tak recovery possible hai) jaanna chahiye, samajhna chahiye ki recovery typically ek support process ya self-service cockpit action ke through hoti hai, aur apni disaster-recovery planning mein isse factor karna chahiye.",
    interviewExplanation:
      "I'd clarify the managed-service split: 'SAP handles the operational backup mechanics — savepoints plus continuous log backups, enabling point-in-time recovery within a retention window, not just to the last full backup. I don't configure backup schedules myself, but I still need to understand the retention window and recovery process to factor it into disaster-recovery planning.'",
    diagramNote:
      "'HANA Cloud (managed by SAP)' → 'Savepoints (full backups) + continuous log backups' → 'Point-in-time recovery within retention window' — customer's role is understanding/planning around this, not operating it.",
    diagramMermaid: `flowchart TD
    A["HANA Cloud<br/>managed by SAP"] --> B["Savepoints + continuous log backups"]
    B --> C["Point-in-time recovery<br/>within retention window"]
    C --> D["Customer's role:<br/>understand + plan DR around this"]`,
    realProjectExample:
      "When a bad data-migration script corrupted a subset of records, point-in-time recovery restored the database to a moment just before the script ran, without needing SAP support to manually locate an old full backup file.",
    interviewTip:
      "If asked 'do you need to back up HANA Cloud yourself', clarify that SAP manages the mechanics, but you're still responsible for understanding the retention window and incorporating it into your own DR strategy — not zero responsibility at all.",
    followupQuestions: [
      "What is the typical retention window for point-in-time recovery?",
      "How would you actually initiate a recovery — support ticket or self-service?",
      "Does automatic backup cover application-level logical errors, like bad data migrations?",
    ],
    commonMistakes: [
      "Assuming customers must configure and manage their own backup schedule for HANA Cloud.",
      "Not knowing point-in-time recovery covers any moment in the retention window, not just full-backup checkpoints.",
    ],
    importantPoints: [
      "SAP manages backup mechanics (savepoints + log backups) as part of the managed service.",
      "Point-in-time recovery works within a configured retention window.",
      "Customers still need to understand retention/recovery for their own DR planning.",
    ],
    revisionNotes: "HANA Cloud backup = SAP-managed (savepoints + log backups), point-in-time recovery within retention window — customer still owns DR planning awareness.",
  },
  {
    id: "hana-q10",
    topic: "Database Explorer",
    prompt: "What is Database Explorer used for in a HANA Cloud project?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["database-explorer", "tooling"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Database Explorer is the web-based tool for browsing HANA Cloud database objects, running SQL queries, viewing execution plans, and graphically building/editing Calculation Views — the primary hands-on interface for working directly with a HANA Cloud database.",
    detailedAnswer:
      "Database Explorer gives developers and DBAs a browser-based UI to connect to a HANA Cloud instance and directly inspect its catalog (tables, views, HDI containers), run ad-hoc SQL statements and see results, examine a query's execution plan visually to diagnose performance, and build or edit Calculation Views graphically without writing raw SQL DDL by hand. It's typically the first tool you'd open to verify that a CDS-generated schema deployed correctly, to manually inspect data during debugging, or to prototype a Calculation View before formalizing it in source-controlled artifacts.",
    hindiExplanation:
      "Database Explorer developers aur DBAs ko ek browser-based UI deta hai HANA Cloud instance se connect karke uska catalog (tables, views, HDI containers) directly inspect karne ke liye, ad-hoc SQL statements chalane aur results dekhne ke liye, kisi query ka execution plan visually examine karke performance diagnose karne ke liye, aur Calculation Views ko graphically build/edit karne ke liye bina raw SQL DDL hand se likhe. Ye typically pehla tool hota hai jo tum kholte ho ye verify karne ke liye ki CDS-generated schema sahi se deploy hui ya nahi, debugging ke dauraan data manually inspect karne ke liye, ya ek Calculation View ko prototype karne ke liye source-controlled artifacts mein formalize karne se pehle.",
    interviewExplanation:
      "I'd describe it as the hands-on HANA workspace: 'Database Explorer is the browser-based tool for browsing HANA Cloud's catalog, running ad-hoc SQL, viewing execution plans visually, and graphically building Calculation Views. It's usually the first place I'd check that a CDS-generated schema deployed correctly, or inspect data directly while debugging.'",
    diagramNote:
      "Database Explorer as a central hub with arrows to its capabilities: 'Browse catalog (tables/views/HDI containers)', 'Run SQL queries', 'View execution plans', 'Build/edit Calculation Views graphically'.",
    diagramMermaid: `flowchart TD
    DE["Database Explorer"] --> A["Browse catalog<br/>tables/views/HDI containers"]
    DE --> B["Run SQL queries"]
    DE --> C["View execution plans"]
    DE --> D["Build/edit Calculation Views graphically"]`,
    realProjectExample:
      "After deploying a CAP app's database artifacts, we opened Database Explorer to directly verify the generated tables and run a few ad-hoc SELECT statements confirming seed data loaded correctly, before the app team started testing against it.",
    interviewTip:
      "Mentioning it as the tool you'd check first after a schema deployment (not just 'a SQL editor') shows practical, real workflow familiarity.",
    followupQuestions: [
      "How would you view a query's execution plan in Database Explorer?",
      "Can Database Explorer connect to multiple HANA Cloud instances?",
      "What's the difference between using Database Explorer and connecting via a JDBC/ODBC client?",
    ],
    commonMistakes: [
      "Describing Database Explorer as only a SQL editor, missing the Calculation View and execution plan capabilities.",
      "Not knowing it's typically the first check after a schema deployment.",
    ],
    importantPoints: [
      "Web-based tool for browsing catalog, running SQL, viewing execution plans.",
      "Also supports graphical Calculation View building/editing.",
      "Common first stop for verifying a schema deployment or debugging data.",
    ],
    revisionNotes: "Database Explorer = web-based HANA workspace: browse catalog, run SQL, view execution plans, build Calculation Views graphically.",
  },
  {
    id: "hana-q11",
    topic: "Database",
    prompt: "What is dictionary encoding, and how does it help both compression and query performance in HANA's columnar store?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["database", "compression"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Dictionary encoding replaces repeated actual values in a column with small integer references to a compact 'dictionary' of unique values — this shrinks storage significantly for columns with repetitive values, and lets many operations (filtering, comparisons) run directly against the compact integer codes instead of the original, larger values.",
    detailedAnswer:
      "Instead of storing the actual string/value repeatedly for every row (e.g. storing 'ACTIVE' a million times for a status column), HANA builds a dictionary of unique values (e.g. ACTIVE=0, INACTIVE=1, PENDING=2) and stores just the small integer code per row. This dramatically reduces storage for low-cardinality columns, and critically, many query operations — equality filters, grouping, even some aggregations — can execute directly against the compact integer codes rather than decoding back to the original value first, which is both memory-bandwidth-efficient and CPU-cache-friendly, compounding the performance benefit beyond just the storage savings.",
    hindiExplanation:
      "Actual string/value ko har row ke liye repeatedly store karne ki jagah (jaise 'ACTIVE' ko lakh baar store karna ek status column ke liye), HANA unique values ka ek dictionary banata hai (jaise ACTIVE=0, INACTIVE=1, PENDING=2) aur har row ke liye bas chhota integer code store karta hai. Ye storage ko dramatically reduce karta hai low-cardinality columns ke liye, aur critically, kai query operations — equality filters, grouping, kuch aggregations bhi — directly compact integer codes ke against execute ho sakte hain, original value tak decode kiye bina — jo memory-bandwidth-efficient aur CPU-cache-friendly dono hai.",
    interviewExplanation:
      "I'd explain both the storage and performance angle: 'Dictionary encoding replaces repeated actual values with small integer codes pointing to a compact dictionary of unique values — great compression for low-cardinality columns. But it also helps performance directly, since operations like equality filters and grouping can run against the compact integer codes without decoding back to the original value, which is more memory-bandwidth and CPU-cache efficient.'",
    diagramNote:
      "'Column values: ACTIVE, ACTIVE, INACTIVE, ACTIVE, PENDING...' → 'Dictionary: ACTIVE=0, INACTIVE=1, PENDING=2' → 'Stored per row: 0,0,1,0,2...' — smaller storage + operations run directly on codes.",
    diagramMermaid: `flowchart LR
    A["Column values:<br/>ACTIVE, ACTIVE, INACTIVE..."] --> B["Dictionary: ACTIVE=0,<br/>INACTIVE=1, PENDING=2"]
    B --> C["Stored per row: 0,0,1...<br/>ops run directly on codes"]`,
    realProjectExample:
      "A status column with only 5 distinct values across millions of rows compressed dramatically via dictionary encoding, and filter queries on that column ran noticeably faster since comparisons happened against small integer codes rather than string values.",
    interviewTip:
      "If asked why dictionary encoding helps performance and not just storage, be specific that operations can run against the encoded integers directly — that's the detail that separates a surface-level answer from a deeper one.",
    followupQuestions: [
      "Would dictionary encoding help as much for a high-cardinality column, like a unique ID?",
      "How does dictionary encoding interact with sorting operations?",
      "What happens to the dictionary when new distinct values are inserted?",
    ],
    commonMistakes: [
      "Explaining dictionary encoding only as a compression technique, missing the direct query-performance benefit.",
      "Assuming it helps equally regardless of a column's cardinality (it helps most for low-cardinality columns).",
    ],
    importantPoints: [
      "Dictionary encoding replaces repeated values with compact integer codes referencing a dictionary.",
      "Best compression gains for low-cardinality (few distinct values) columns.",
      "Many operations run directly against the compact codes, boosting performance beyond just storage savings.",
    ],
    revisionNotes: "Dictionary encoding = repeated values → small integer codes + a dictionary. Best for low-cardinality columns. Operations run on codes directly — compression AND performance benefit.",
  },
  {
    id: "hana-q12",
    topic: "Database",
    prompt: "What's the difference between HANA's row store and column store, and when might row store still be the right choice?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["database", "row-store"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Row store lays out each row's fields contiguously (like a traditional RDBMS), favoring fast single-row lookups/inserts, while column store favors analytical scans; row store is still appropriate for tables with heavy single-row transactional access patterns and little analytical/aggregation need, such as certain configuration or lock-management tables.",
    detailedAnswer:
      "HANA supports both storage engines because different access patterns genuinely favor different layouts. Column store excels at analytical queries scanning/aggregating across many rows on a few columns. Row store, storing each row's data contiguously, is better suited to workloads dominated by single-row point lookups, inserts, and updates with little to no analytical scanning — some internal system tables and certain OLTP-heavy application tables with very high insert/update rates and minimal reporting needs are reasonable row-store candidates. The decision isn't 'columnar is always better' — it's matching the storage engine to the actual, dominant access pattern of that specific table.",
    hindiExplanation:
      "HANA dono storage engines support karta hai kyunki different access patterns genuinely different layouts favor karte hain. Column store analytical queries mein excel karta hai jo kai rows ke aar-paar kuch columns pe scan/aggregate karti hain. Row store, har row ka data contiguously store karte hue, un workloads ke liye better suited hai jo single-row point lookups, inserts, aur updates se dominated hon, analytical scanning bahut kam ho. Decision 'columnar hamesha better hai' nahi hai — ye storage engine ko us specific table ke actual, dominant access pattern se match karna hai.",
    interviewExplanation:
      "I'd frame it as matching engine to access pattern: 'Column store excels at analytical scans across many rows on few columns. Row store is better for workloads dominated by single-row lookups, inserts, and updates with little analytical need — some system tables or very high-insert-rate OLTP tables with minimal reporting needs are reasonable row-store candidates. It's not that columnar is always better — it's matching the engine to the table's actual access pattern.'",
    diagramNote:
      "'Column store: best for analytical scans (few columns, many rows)' vs 'Row store: best for single-row lookups/inserts/updates, little analytical need' — choose per table's dominant access pattern.",
    diagramMermaid: `flowchart LR
    A["Column store"] --> B["Best for analytical scans<br/>few columns, many rows"]
    C["Row store"] --> D["Best for single-row<br/>lookups/inserts/updates"]`,
    realProjectExample:
      "A high-frequency session-tracking table with heavy single-row inserts/updates and no reporting requirement was kept as a row-store table, while the analytical reporting tables in the same schema used the default column store.",
    interviewTip:
      "If asked 'is column store always the better default', the nuanced answer — matching engine to access pattern rather than treating one as universally superior — demonstrates deeper database design understanding.",
    followupQuestions: [
      "How would you decide, for a new table, whether it should be row store or column store?",
      "Can a table be converted between row store and column store later?",
      "What's the default storage type for a new HANA table if unspecified?",
    ],
    commonMistakes: [
      "Assuming column store is unconditionally the better choice for every table.",
      "Not recognizing single-row-lookup-heavy, low-analytics tables as legitimate row-store candidates.",
    ],
    importantPoints: [
      "Row store favors single-row lookups/inserts/updates; column store favors analytical scans.",
      "Choice should match the table's dominant, actual access pattern.",
      "Column store isn't universally superior — it depends on the workload.",
    ],
    revisionNotes: "Row store = fast single-row lookups/inserts. Column store = fast analytical scans. Pick per table's actual dominant access pattern, not by default assumption.",
  },
  {
    id: "hana-q13",
    topic: "Database",
    prompt: "How does HANA achieve parallel query execution across multiple CPU cores for a single query?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["database", "parallelism"],
    estimatedMinutes: 2,
    expectedAnswer:
      "HANA's query optimizer splits a single query's work (like scanning a large column, or processing independent partitions of data) into smaller units that can run concurrently across multiple CPU cores, then combines the partial results — this intra-query parallelism is a core part of why HANA can process large analytical workloads quickly.",
    detailedAnswer:
      "Rather than a query running as one single-threaded operation from start to finish, HANA's engine can decompose the work — for example, scanning different partitions or segments of a large column, or evaluating independent branches of a Calculation View's node graph — into units of work that different CPU cores execute simultaneously, then merges the partial results into the final answer. This intra-query parallelism (distinct from simply running multiple different queries concurrently) is what lets a single complex analytical query complete in a fraction of the time it would take running serially on one core, and it's largely automatic — the optimizer decides the parallelization strategy based on the query plan and data distribution, without the developer needing to manually specify it.",
    hindiExplanation:
      "Ek query ko ek single-threaded operation ki tarah shuru se end tak chalane ki jagah, HANA ka engine kaam ko decompose kar sakta hai — for example, ek bade column ke different partitions/segments scan karna, ya ek Calculation View ke node graph ki independent branches evaluate karna — units of work mein jo different CPU cores simultaneously execute karte hain, phir partial results ko merge karke final answer banate hain. Ye intra-query parallelism (alag se multiple queries concurrently chalane se different) hai jo ek single complex analytical query ko fraction of time mein complete hone deta hai — aur ye largely automatic hai.",
    interviewExplanation:
      "I'd distinguish this from simple concurrency: 'HANA's optimizer decomposes a single query's work — scanning different partitions of a column, or evaluating independent branches of a Calculation View — into units that run simultaneously across CPU cores, then merges the partial results. This intra-query parallelism, distinct from just running multiple queries concurrently, is largely automatic — the optimizer decides the strategy based on the query plan and data distribution.'",
    diagramNote:
      "'Single complex query' → 'Optimizer splits into independent units (partition scans / node graph branches)' → 'Executed simultaneously across CPU cores' → 'Partial results merged into final answer'.",
    diagramMermaid: `flowchart TD
    A["Single complex query"] --> B["Optimizer splits into<br/>independent work units"]
    B --> C["Executed simultaneously<br/>across CPU cores"]
    C --> D["Partial results merged<br/>into final answer"]`,
    realProjectExample:
      "A large aggregation query over a wide dataset showed near-linear speedup when the HANA instance had more CPU cores available, confirming the query was genuinely being parallelized internally rather than running as one serial operation.",
    interviewTip:
      "If asked to distinguish intra-query parallelism from just having multiple concurrent users, be explicit that intra-query parallelism speeds up a single query's own execution by splitting its internal work — a distinct concept from overall system concurrency.",
    followupQuestions: [
      "What kind of query patterns parallelize well versus poorly?",
      "Does adding more CPU cores always proportionally speed up every query?",
      "How would you observe whether a specific query is actually being parallelized?",
    ],
    commonMistakes: [
      "Confusing intra-query parallelism (splitting one query's internal work) with general multi-user concurrency.",
      "Assuming parallelization always requires manual configuration rather than being largely automatic.",
    ],
    importantPoints: [
      "HANA's optimizer decomposes a single query's work across multiple CPU cores automatically.",
      "This is intra-query parallelism, distinct from running multiple separate queries concurrently.",
      "A core reason HANA processes large analytical workloads quickly.",
    ],
    revisionNotes: "Intra-query parallelism = HANA's optimizer splits ONE query's work across CPU cores automatically (partition scans, node graph branches), then merges results — distinct from multi-user concurrency.",
  },
  {
    id: "hana-q14",
    topic: "HDI Containers",
    prompt: "Can one HDI container reference database objects (like a table) belonging to a different HDI container, and how?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["hdi", "cross-container-access"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes, but only through an explicit, deliberate mechanism — an HDI container can consume specific objects from another container via a Synonym pointing to it, or via a Shared Schema/Grantor-Grantee pattern where the owning container explicitly grants access — cross-container access is never implicit or automatic.",
    detailedAnswer:
      "HDI's isolation is deliberate, so accessing another container's objects requires an explicit setup, not just referencing them directly by name. Common patterns include: a Synonym, which acts as a named reference/alias to an object in another container, letting your container's views/procedures use it as if it were local; or a Grantor-Grantee (shared schema) pattern, where the owning ('grantor') container explicitly grants specific privileges to the consuming ('grantee') container. Either way, the important point is this always requires deliberate, explicit configuration — no container can silently or accidentally read/write another's objects just by virtue of being deployed to the same HANA instance.",
    hindiExplanation:
      "HDI ki isolation deliberate hai, isliye doosre container ke objects access karne ke liye ek explicit setup chahiye, sirf unhe directly name se reference karne se kaam nahi chalega. Common patterns hain: ek Synonym, jo doosre container mein ek object ka named reference/alias ki tarah kaam karta hai, tumhare container ke views/procedures ko use ko local ki tarah use karne deta hai; ya ek Grantor-Grantee (shared schema) pattern, jaha owning ('grantor') container consuming ('grantee') container ko specific privileges explicitly grant karta hai. Dono tarike se, important point ye hai ki isse hamesha deliberate, explicit configuration chahiye.",
    interviewExplanation:
      "I'd emphasize the deliberateness: 'Yes, but only through explicit mechanisms — a Synonym acting as a named reference to an object in another container, or a Grantor-Grantee shared schema pattern where the owning container explicitly grants privileges to the consumer. It always requires deliberate configuration — no container can silently access another's objects just by being on the same HANA instance.'",
    diagramNote:
      "'Container A (owns Table X)' --grants access via Synonym or Grantor-Grantee-- 'Container B references Table X via alias' — never implicit/automatic.",
    diagramMermaid: `flowchart LR
    A["Container A<br/>owns Table X"] -- "explicit Synonym /<br/>Grantor-Grantee grant" --> B["Container B<br/>references X via alias"]`,
    realProjectExample:
      "A reporting service's HDI container consumed a shared master-data table owned by a different container via an explicitly configured Synonym, with the owning container's deployment descriptor explicitly granting that access — nothing was implicitly shared.",
    interviewTip:
      "If asked 'can containers just see each other's tables since they're on the same instance', the correct answer is no — emphasize that isolation is the default and cross-access requires deliberate setup, which is precisely the point of HDI's design.",
    followupQuestions: [
      "What's the difference between a Synonym and a Grantor-Grantee pattern specifically?",
      "Would you need to redeploy both containers if a shared object's structure changes?",
      "What are the risks of over-using cross-container sharing in a multi-service architecture?",
    ],
    commonMistakes: [
      "Assuming containers on the same HANA instance can implicitly see each other's objects.",
      "Not knowing the specific mechanisms (Synonym, Grantor-Grantee) used for deliberate cross-container access.",
    ],
    importantPoints: [
      "Cross-container access is never implicit — always requires explicit configuration.",
      "Synonyms provide a named reference/alias to another container's object.",
      "Grantor-Grantee patterns let an owning container explicitly grant access to a consumer.",
    ],
    revisionNotes: "Cross-HDI-container access requires explicit setup — Synonym (named reference/alias) or Grantor-Grantee (explicit privilege grant). Never implicit, even on the same HANA instance.",
  },
  {
    id: "hana-q15",
    topic: "HDI Containers",
    prompt: "What happens to an HDI container's existing data when you redeploy a new version of the app with schema changes?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["hdi", "schema-evolution"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The HDI deployer applies the schema delta incrementally where possible (adding new columns, tables), preserving existing data — but a genuinely incompatible change (like a column type change or a NOT NULL addition without a default on existing rows) can require deliberate handling (migration steps, defaults) or may fail the deployment if the deployer can't safely reconcile old data with the new schema.",
    detailedAnswer:
      "HDI's deployer is designed to apply schema changes incrementally and non-destructively wherever it safely can — adding a new column, new table, or new view generally just applies cleanly, preserving all existing data untouched. But some changes are inherently ambiguous or unsafe to apply automatically: changing a column's data type when existing data might not fit the new type, adding a NOT NULL constraint to a column that has existing NULL values, or removing a column that had data in it. For these cases, you either need to provide an explicit migration step (a default value, a data transformation), or the deployment will fail/require manual intervention rather than silently corrupting or losing data — HDI errs on the side of blocking risky changes rather than applying them destructively without confirmation.",
    hindiExplanation:
      "HDI ka deployer schema changes ko incrementally aur non-destructively apply karne ke liye design kiya gaya hai jaha bhi safely ho sake — ek naya column, naya table, ya naya view add karna generally cleanly apply ho jaata hai, saara existing data untouched preserve karte hue. Lekin kuch changes inherently ambiguous ya unsafe hote hain automatically apply karne ke liye: ek column ka data type change karna jab existing data naye type mein fit na ho, ek NOT NULL constraint add karna jis column mein existing NULL values hon, ya ek column remove karna jisme data tha. Aise cases ke liye, tumhe ek explicit migration step provide karna padta hai, ya deployment fail ho jaayegi/manual intervention chahiye hogi, silently data corrupt/lose karne ki jagah.",
    interviewExplanation:
      "I'd explain the safe-by-default, block-on-ambiguity approach: 'The HDI deployer applies incremental, non-destructive changes automatically — a new column or table generally deploys cleanly, preserving existing data. But genuinely unsafe changes, like a column type change that existing data might not fit, or a NOT NULL addition against existing NULLs, either need an explicit migration step or block the deployment entirely — HDI errs on the side of blocking risky changes rather than silently applying them.'",
    diagramNote:
      "'Safe change (new column/table)' → 'Applied automatically, existing data preserved' vs 'Ambiguous/unsafe change (type change, NOT NULL on existing NULLs)' → 'Requires explicit migration or deployment blocks'.",
    diagramMermaid: `flowchart LR
    A["Safe change<br/>new column/table"] --> B["Applied automatically,<br/>data preserved"]
    C["Ambiguous/unsafe change<br/>type change, NOT NULL on NULLs"] --> D["Requires migration step<br/>or deployment blocks"]`,
    realProjectExample:
      "Adding a NOT NULL constraint to an existing column with some NULL rows caused the HDI deployment to fail with a clear error, requiring an explicit migration step (backfilling a default value for existing NULL rows) before the schema change could deploy successfully.",
    interviewTip:
      "If asked 'does redeploying a CAP app wipe existing data', the correct, reassuring but precise answer is no for safe/additive changes, but genuinely ambiguous changes require deliberate migration handling and may block rather than silently corrupt data.",
    followupQuestions: [
      "How would you write an explicit migration step for an incompatible schema change?",
      "What's the difference between a design-time schema change and a runtime data migration?",
      "Would dropping a column that has data in it ever be allowed automatically?",
    ],
    commonMistakes: [
      "Assuming any schema change deploys automatically regardless of compatibility with existing data.",
      "Not anticipating that a NOT NULL addition against existing NULL data needs deliberate migration handling.",
    ],
    importantPoints: [
      "Safe/additive schema changes (new columns/tables) apply automatically, preserving existing data.",
      "Genuinely unsafe/ambiguous changes require an explicit migration step.",
      "HDI blocks risky changes rather than silently applying them destructively.",
    ],
    revisionNotes: "HDI redeploy: safe/additive changes apply automatically, data preserved. Unsafe/ambiguous changes (type change, NOT NULL on existing NULLs) need explicit migration or the deployment blocks.",
  },
  {
    id: "hana-q16",
    topic: "Calculation Views",
    prompt: "What's the difference between a 'Graphical' Calculation View and one built with SQL Script?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["calculation-views", "sql-script"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A Graphical Calculation View is built visually from standard nodes (join, union, aggregation, projection) that HANA can optimize very effectively; a SQL Script-based Calculation View lets you write custom procedural logic directly, offering more flexibility for complex logic the graphical nodes can't easily express, but generally with less automatic optimization potential.",
    detailedAnswer:
      "The graphical approach composes a view from a fixed set of well-understood node types, which HANA's optimizer deeply understands and can aggressively optimize/parallelize — this is the recommended default for most modeling needs. A SQL Script-based view instead lets you embed arbitrary procedural SQL logic (loops, conditional branching, complex custom calculations) that doesn't map cleanly to the standard graphical nodes — offering more expressive power for genuinely complex logic, but at a cost: the optimizer generally can't reason about or optimize custom script logic nearly as effectively as the standard graphical nodes, since it's more of a 'black box' from the optimizer's perspective. The practical guidance is to prefer graphical modeling by default, reaching for SQL Script only when the logic genuinely can't be expressed with standard nodes.",
    hindiExplanation:
      "Graphical approach ek view ko fixed set of well-understood node types se compose karta hai, jinhe HANA ka optimizer deeply samajhta hai aur aggressively optimize/parallelize kar sakta hai — ye recommended default hai zyada tar modeling needs ke liye. SQL Script-based view iske bajaye arbitrary procedural SQL logic embed karne deta hai — jyada expressive power deta hai genuinely complex logic ke liye, lekin ek cost pe: optimizer generally custom script logic ko utna effectively optimize nahi kar sakta jitna standard graphical nodes ko, kyunki ye ek 'black box' ki tarah hai optimizer ke perspective se.",
    interviewExplanation:
      "I'd give the practical guidance: 'Graphical views compose from standard nodes HANA's optimizer deeply understands and can aggressively optimize — that's the recommended default. SQL Script views let you embed arbitrary procedural logic for genuinely complex cases the graphical nodes can't express, but the optimizer treats it more like a black box, so it generally optimizes less effectively. Practical guidance: prefer graphical by default, reach for SQL Script only when truly necessary.'",
    diagramNote:
      "'Graphical Calculation View: standard nodes, deeply optimizable (recommended default)' vs 'SQL Script Calculation View: custom procedural logic, more flexible but less optimizable (black box to optimizer)'.",
    diagramMermaid: `flowchart LR
    A["Graphical Calculation View"] --> B["Standard nodes,<br/>deeply optimizable (default)"]
    C["SQL Script Calculation View"] --> D["Custom procedural logic,<br/>less optimizable (black box)"]`,
    realProjectExample:
      "A complex currency-conversion calculation with multiple conditional branches that didn't map cleanly to standard graphical nodes was implemented with SQL Script, while the majority of simpler join/aggregation logic elsewhere in the project stuck to graphical modeling for better optimizer support.",
    interviewTip:
      "If asked 'would you always use SQL Script for maximum flexibility', the correct, disciplined answer is no — prefer graphical modeling by default and reach for script only when genuinely necessary, since it trades away optimizer visibility.",
    followupQuestions: [
      "What kind of logic genuinely can't be expressed with standard graphical nodes?",
      "Can a single Calculation View mix graphical nodes and a SQL Script node?",
      "How would you verify whether a SQL Script node is hurting a view's overall performance?",
    ],
    commonMistakes: [
      "Defaulting to SQL Script for flexibility without considering the optimizer visibility tradeoff.",
      "Not knowing the practical guidance is to prefer graphical modeling unless genuinely necessary.",
    ],
    importantPoints: [
      "Graphical views use standard, deeply-optimizable nodes — the recommended default.",
      "SQL Script views allow custom procedural logic, but are less transparent to the optimizer.",
      "Prefer graphical modeling; use SQL Script only when genuinely needed.",
    ],
    revisionNotes: "Graphical Calculation Views = standard optimizable nodes (default). SQL Script views = flexible custom logic but less optimizable (black box to optimizer) — use only when necessary.",
  },
  {
    id: "hana-q17",
    topic: "Calculation Views",
    prompt: "What is a 'star join' node in a Calculation View, and when would you use one?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["calculation-views", "star-join"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A star join node is specifically optimized for joining one large fact table against multiple smaller dimension tables (the classic star-schema pattern from data warehousing) — using it instead of generic join nodes lets HANA apply join-specific optimizations tailored to this very common analytical modeling shape.",
    detailedAnswer:
      "Classic dimensional/data-warehouse modeling has a large central fact table (e.g. sales transactions) joined to several smaller dimension tables (customer, product, date, region) providing descriptive attributes for filtering/grouping. While you could chain several generic join nodes to achieve this, a star join node explicitly models this fact-plus-multiple-dimensions pattern, letting HANA apply specialized optimizations for this common shape (like more efficient join ordering and dimension-table filtering pushdown) that a series of generic joins might not achieve as effectively. It's specifically suited to this dimensional-modeling case, not a general-purpose replacement for all join scenarios.",
    hindiExplanation:
      "Classic dimensional/data-warehouse modeling mein ek bada central fact table hota hai (jaise sales transactions) jo kai chhote dimension tables se join hota hai (customer, product, date, region) jo descriptive attributes dete hain filtering/grouping ke liye. Tum kai generic join nodes chain kar sakte ho ye achieve karne ke liye, lekin ek star join node explicitly is fact-plus-multiple-dimensions pattern ko model karta hai, HANA ko specialized optimizations apply karne deta hai is common shape ke liye jo generic joins ki series utni effectively achieve nahi kar sakti.",
    interviewExplanation:
      "I'd describe the specific fit: 'A star join node is purpose-built for the classic fact-table-plus-multiple-dimension-tables pattern from data warehousing. Instead of chaining generic joins, using a star join lets HANA apply specialized optimizations — like better join ordering and dimension-filter pushdown — tailored to this very common analytical shape. It's specifically for dimensional modeling, not a general replacement for every join.'",
    diagramNote:
      "'Fact table (large, central)' with star join node connecting to 'Dimension: Customer', 'Dimension: Product', 'Dimension: Date' — HANA applies specialized optimizations for this shape.",
    diagramMermaid: `flowchart TD
    F["Fact table<br/>large, central"] --> S["Star Join node"]
    S --> D1["Dimension: Customer"]
    S --> D2["Dimension: Product"]
    S --> D3["Dimension: Date"]`,
    realProjectExample:
      "A sales analytics Calculation View joining a large transactions fact table against customer, product, and date dimension tables used a star join node, which performed noticeably better than an earlier version using chained generic joins for the same logical result.",
    interviewTip:
      "If asked to model a classic data-warehouse fact-and-dimensions scenario in a Calculation View, naming the star join node specifically (rather than generic joins) shows recognition of the purpose-built tool for this exact pattern.",
    followupQuestions: [
      "How does a star join node differ from chaining multiple regular join nodes for the same result?",
      "What's a 'snowflake schema' and would a star join node still be appropriate?",
      "Would you use a star join node for a non-dimensional-modeling join scenario?",
    ],
    commonMistakes: [
      "Using generic join nodes for a classic fact-and-dimensions scenario when a star join node is purpose-built and better optimized for it.",
      "Assuming a star join node is a universal replacement for all join types.",
    ],
    importantPoints: [
      "Star join node is purpose-built for one large fact table joined to multiple smaller dimension tables.",
      "Enables specialized HANA optimizations tailored to this common data-warehouse pattern.",
      "Not a general-purpose replacement for all join scenarios.",
    ],
    revisionNotes: "Star join node = purpose-built for fact-table + multiple dimension-tables joins (classic star schema) — enables specialized optimizations beyond chained generic joins.",
  },
  {
    id: "hana-q18",
    topic: "Calculation Views",
    prompt: "What's the purpose of input parameters in a Calculation View?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["calculation-views", "parameters"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Input parameters let a Calculation View accept a value at query time (like a specific date, currency, or threshold) that its internal logic (a filter, a calculation) can reference, making the view reusable and dynamic rather than needing a separate hardcoded view for every possible value.",
    detailedAnswer:
      "Without input parameters, if a Calculation View's logic needs a specific value (say, converting all amounts to a chosen target currency, or filtering to a specific reporting period), that value would have to be hardcoded into the view itself, requiring a separate view — or manual editing — for every different value needed. An input parameter declared on the view lets the calling query supply that value dynamically (e.g. `SALES_VIEW(PLACEHOLDER.\"$$TARGET_CURRENCY$$\" => 'USD')`), which the view's internal calculation logic (a currency-conversion node, a filter condition) then references, making one reusable view serve many different runtime scenarios rather than needing a proliferation of near-duplicate views.",
    hindiExplanation:
      "Input parameters ke bina, agar ek Calculation View ki logic ko ek specific value chahiye (jaise saare amounts ko ek chosen target currency mein convert karna, ya ek specific reporting period pe filter karna), wo value view mein hardcode karni padegi, har different value ke liye ek separate view chahiye hogi. View pe declared ek input parameter calling query ko wo value dynamically supply karne deta hai, jise view ki internal calculation logic (currency-conversion node, filter condition) fir reference karti hai, ek reusable view kai runtime scenarios serve karti hai near-duplicate views ke proliferation ki jagah.",
    interviewExplanation:
      "I'd explain the reusability benefit: 'Without input parameters, a value the view's logic needs — like a target currency or reporting period — would have to be hardcoded, requiring a separate view per value. An input parameter lets the calling query supply that value dynamically at runtime, which the view's internal logic references, so one reusable view serves many scenarios instead of needing a proliferation of near-duplicate views.'",
    diagramNote:
      "'Without input parameters: separate hardcoded view per value needed' vs 'With input parameter: one view, calling query supplies value dynamically (e.g. target currency), reused across scenarios'.",
    diagramMermaid: `flowchart LR
    A["Without input parameters"] --> B["Separate hardcoded view<br/>per value needed"]
    C["With input parameter"] --> D["One reusable view,<br/>value supplied dynamically at query time"]`,
    realProjectExample:
      "A sales reporting Calculation View accepted a target-currency input parameter, letting different regional teams query the same view with their own local currency without needing separate views maintained per currency.",
    interviewTip:
      "If asked how you'd avoid maintaining near-duplicate Calculation Views that differ only by one value, input parameters are the precise, correct mechanism to name.",
    followupQuestions: [
      "How would you provide a default value for an input parameter if the caller doesn't specify one?",
      "Can an input parameter be used inside a filter condition as well as a calculation?",
      "How would input parameters interact with a CDS view consuming this Calculation View?",
    ],
    commonMistakes: [
      "Hardcoding a value into a Calculation View that should genuinely be dynamic, leading to view proliferation.",
      "Not knowing input parameters are the standard mechanism for runtime-supplied values in Calculation Views.",
    ],
    importantPoints: [
      "Input parameters let a Calculation View accept runtime-supplied values.",
      "Avoids hardcoding and the need for near-duplicate views per value.",
      "Referenced by the view's internal filter/calculation logic.",
    ],
    revisionNotes: "Input parameters = runtime-supplied values (e.g. target currency) referenced by a Calculation View's internal logic — one reusable view instead of many hardcoded near-duplicates.",
  },
  {
    id: "hana-q19",
    topic: "SQL",
    prompt: "What's the difference between a HANA table function and a stored procedure?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["sql", "table-functions"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A table function returns a result set that can be directly queried/joined like a regular table within a SELECT statement (`SELECT * FROM my_table_function(...)`), while a stored procedure is called as a standalone statement and can't be directly composed into a larger query the same way — table functions are the better fit when you need reusable, queryable logic.",
    detailedAnswer:
      "A stored procedure (`CALL my_procedure(...)`) executes as its own statement, potentially with output parameters or result sets, but you can't embed a procedure call directly inside a larger SELECT's FROM clause or join it like a table. A table function, by contrast, is specifically designed to return a relational result set that behaves exactly like a table from the calling query's perspective — you can `SELECT` from it, `JOIN` it with other tables, filter it with `WHERE`, all within one larger composed query. This makes table functions the right choice when you want to encapsulate reusable logic (parameterized filtering, calculation) that still needs to compose naturally into other SQL queries, whereas procedures suit more standalone, imperative operations (like a multi-step data-modification workflow).",
    hindiExplanation:
      "Ek stored procedure (`CALL my_procedure(...)`) apna statement ki tarah execute hota hai, potentially output parameters ya result sets ke saath, lekin tum ek procedure call ko directly ek badi SELECT ke FROM clause ke andar embed nahi kar sakte ya use table ki tarah join nahi kar sakte. Ek table function, iske contrast mein, specifically design kiya gaya hai ek relational result set return karne ke liye jo exactly ek table ki tarah behave karta hai calling query ke perspective se — tum ussse `SELECT` kar sakte ho, doosre tables ke saath `JOIN` kar sakte ho, `WHERE` se filter kar sakte ho, sab ek badi composed query ke andar.",
    interviewExplanation:
      "I'd give the composability distinction: 'A stored procedure runs as its own statement — you can't embed a CALL inside a larger SELECT's FROM clause or join it like a table. A table function is designed to return a relational result set you CAN select from, join, and filter within a larger query, just like a regular table. Table functions are the right choice for reusable, composable logic; procedures suit standalone, imperative workflows.'",
    diagramNote:
      "'Stored procedure: CALL my_procedure() — standalone statement, not composable into a larger query' vs 'Table function: SELECT * FROM my_table_function() — composable, joinable, filterable like a table'.",
    diagramMermaid: `flowchart LR
    A["Stored procedure: CALL(...)"] --> B["Standalone statement,<br/>not composable into a query"]
    C["Table function: SELECT FROM func()"] --> D["Composable — join/filter<br/>like a regular table"]`,
    realProjectExample:
      "A parameterized filtering calculation was implemented as a table function so a reporting query could join it directly against other tables in one statement, whereas a separate multi-step batch data-cleanup operation was implemented as a stored procedure since it didn't need to compose into other queries.",
    interviewTip:
      "If asked when you'd choose a table function over a stored procedure, the composability answer (can it be joined/filtered within a larger query) is the precise, correct distinguishing factor.",
    followupQuestions: [
      "Can a table function call a stored procedure internally, or vice versa?",
      "What are the performance implications of using a table function within a large join?",
      "How would you define a table function's return type in HANA SQL?",
    ],
    commonMistakes: [
      "Trying to embed a stored procedure call directly inside a SELECT's FROM clause, which isn't supported the way table functions are.",
      "Not knowing table functions are the composable, query-joinable alternative for reusable logic.",
    ],
    importantPoints: [
      "Table functions return a relational result set, directly queryable/joinable like a table.",
      "Stored procedures run as standalone statements, not composable into a larger query.",
      "Choose table functions for reusable, composable logic; procedures for standalone imperative workflows.",
    ],
    revisionNotes: "Table function = SELECT FROM func() composable/joinable like a table. Stored procedure = standalone CALL statement, not composable into a query.",
  },
  {
    id: "hana-q20",
    topic: "SQL",
    prompt: "How would you write a query to find, per category, the product with the highest price — using a window function rather than a self-join?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["sql", "window-functions"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Use `ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC)` to rank products within each category by price, then filter the outer query to only rows where that rank equals 1 — avoiding the more complex, often less efficient, self-join-based approach.",
    detailedAnswer:
      "A self-join approach (joining the table to itself, matching on category, and filtering to rows where no other row in the same category has a higher price) works but is comparatively awkward and can be less efficient, especially with ties to handle. The window-function approach is cleaner: `SELECT * FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rn FROM products) WHERE rn = 1` assigns rank 1 to the highest-priced product within each category partition, and the outer query simply filters to those top-ranked rows — one pass over the data, clearly expressing the intent (rank within group, take the top), and easily adaptable (change `rn = 1` to `rn <= 3` for a top-3 use case).",
    hindiExplanation:
      "Ek self-join approach (table ko khud ke saath join karna, category pe match karte hue, aur filter karna un rows tak jaha same category mein koi doosri row higher price wali na ho) kaam karta hai lekin comparatively awkward hai aur kam efficient ho sakta hai, especially ties handle karte waqt. Window-function approach cleaner hai: `SELECT * FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rn FROM products) WHERE rn = 1` har category partition ke andar highest-priced product ko rank 1 assign karta hai, aur outer query simply un top-ranked rows tak filter karta hai — ek pass data pe, intent ko clearly express karte hue.",
    interviewExplanation:
      "I'd give the concrete query and contrast with self-join: 'A self-join works but is awkward, especially handling ties. Cleaner: SELECT * FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rn FROM products) WHERE rn = 1 — one pass, ranking within each category partition and filtering to the top. It's also easy to adapt, like changing rn=1 to rn<=3 for a top-3 case.'",
    diagramNote:
      "'products table' → 'ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC)' assigns rank per category → 'Outer query: WHERE rn = 1 — top product per category'.",
    diagramMermaid: `flowchart LR
    A["products table"] --> B["ROW_NUMBER() OVER<br/>(PARTITION BY category<br/>ORDER BY price DESC)"]
    B --> C["Outer query: WHERE rn = 1<br/>top product per category"]`,
    realProjectExample:
      "Replacing an existing self-join-based 'top product per category' query with the ROW_NUMBER() window-function approach both simplified the SQL significantly and measurably improved its execution time.",
    interviewTip:
      "If asked to solve a 'top N per group' problem, immediately reaching for ROW_NUMBER()/RANK() with PARTITION BY (rather than a self-join) is the strong, idiomatic SQL answer interviewers look for.",
    followupQuestions: [
      "What's the difference between ROW_NUMBER() and RANK() if there's a tie for the highest price?",
      "How would you modify this query to get the top 3 products per category instead of just 1?",
      "Would this window-function query be more or less efficient than the self-join for a very large table?",
    ],
    commonMistakes: [
      "Reaching for a self-join as the default solution for a 'top N per group' problem instead of a window function.",
      "Forgetting that window functions can't be filtered directly in the same SELECT's WHERE clause, requiring the subquery wrapper.",
    ],
    importantPoints: [
      "ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...) ranks rows within each group.",
      "Wrap in a subquery and filter on the rank column to get a top-N-per-group result.",
      "Cleaner and often more efficient than an equivalent self-join approach.",
    ],
    revisionNotes: "Top-N-per-group SQL pattern: ROW_NUMBER() OVER (PARTITION BY group ORDER BY value DESC) in a subquery, then WHERE rn <= N in the outer query — cleaner/faster than a self-join.",
  },
  {
    id: "hana-q21",
    topic: "Indexes",
    prompt: "What is an inverted index in HANA, and what's it specifically used for?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["indexes", "full-text-search"],
    estimatedMinutes: 2,
    expectedAnswer:
      "An inverted index maps individual words/tokens to the rows/documents containing them, enabling efficient full-text search — instead of scanning every row's text for a match, HANA can directly look up which rows contain a given search term via the index.",
    detailedAnswer:
      "A normal index typically helps locate rows by an exact or range match on a column's value. An inverted index is specifically built for text search: it tokenizes text content (splitting into individual words), and builds a mapping from each unique word/token back to every row that contains it — so searching for a specific word becomes a direct lookup in this index rather than scanning and text-matching against every row's full content. This is what powers efficient full-text search features (searching for a keyword anywhere within a large text/description field) — without it, such a search would require an expensive scan-and-match across every row's text content.",
    hindiExplanation:
      "Ek normal index typically rows ko locate karne mein help karta hai ek column ki value pe exact ya range match se. Ek inverted index specifically text search ke liye built hai: ye text content ko tokenize karta hai (individual words mein split karke), aur ek mapping banata hai har unique word/token se wapas har row tak jisme wo hai — isliye ek specific word search karna is index mein ek direct lookup ban jaata hai, har row ke poore content ke against scan-aur-text-match karne ki jagah.",
    interviewExplanation:
      "I'd explain the tokenize-and-map mechanism: 'An inverted index tokenizes text into individual words and maps each word back to every row containing it. Searching for a term becomes a direct index lookup, instead of scanning and text-matching every row's content. This is specifically what powers efficient full-text search over large text fields.'",
    diagramNote:
      "'Text content: rows with descriptions' → 'Inverted index: tokenized, word → list of containing rows' → 'Search for a word = direct index lookup, not a full scan'.",
    diagramMermaid: `flowchart LR
    A["Text content<br/>rows with descriptions"] --> B["Inverted index:<br/>word → containing rows"]
    B --> C["Search = direct lookup,<br/>not full scan"]`,
    realProjectExample:
      "A product-description search feature that previously did a slow LIKE '%keyword%' scan across all rows was replaced with a full-text search backed by an inverted index, dramatically improving search response time for large product catalogs.",
    interviewTip:
      "If asked how you'd implement a fast keyword search across a large text field, naming an inverted index specifically (rather than a generic 'add an index') shows precise knowledge of the right tool for text search specifically.",
    followupQuestions: [
      "How does an inverted index handle things like stemming or partial-word matches?",
      "Would an inverted index help a query using LIKE '%keyword%' automatically, or does it need a different search syntax?",
      "What's the tradeoff of maintaining an inverted index on a frequently-updated text column?",
    ],
    commonMistakes: [
      "Assuming a regular column index would speed up a text-content search the same way an inverted index would.",
      "Not knowing inverted indexes are specifically for full-text search, not general column lookups.",
    ],
    importantPoints: [
      "Inverted index tokenizes text and maps words back to containing rows.",
      "Enables efficient full-text search via direct lookup instead of scan-and-match.",
      "Specifically suited to text search, distinct from general-purpose column indexes.",
    ],
    revisionNotes: "Inverted index = tokenizes text, maps word→containing rows — powers efficient full-text search via direct lookup instead of scanning every row's text.",
  },
  {
    id: "hana-q22",
    topic: "Indexes",
    prompt: "Would adding more indexes to a table always improve overall performance? What's the tradeoff?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["indexes", "tradeoffs"],
    estimatedMinutes: 2,
    expectedAnswer:
      "No — every index adds overhead to write operations (inserts/updates/deletes must maintain the index too) and consumes additional memory/storage, so indexes should be added deliberately for genuinely beneficial access patterns, not indiscriminately, since excessive indexing can actually slow down write-heavy workloads.",
    detailedAnswer:
      "An index speeds up specific read patterns, but it's not free — every write to the underlying table also needs to update every index that covers the changed data, meaning heavily-indexed tables incur real overhead on inserts/updates/deletes proportional to how many indexes need maintaining. Combined with the additional memory/storage every index consumes, indiscriminately adding indexes 'just in case' can actually degrade overall system performance for write-heavy workloads, even while marginally helping some specific read queries. The right approach is to add indexes deliberately, based on actual observed query patterns and their real performance impact (verified via execution plans), not preemptively for every column that might theoretically be queried.",
    hindiExplanation:
      "Ek index specific read patterns ko speed up karta hai, lekin ye free nahi hai — underlying table pe har write ko bhi har index ko update karna padta hai jo changed data ko cover karta hai, matlab heavily-indexed tables ko real overhead hota hai inserts/updates/deletes pe, proportional to kitne indexes maintain karne hain. Additional memory/storage jo har index consume karta hai uske saath combine hoke, indiscriminately indexes add karna 'just in case' actually overall system performance ko degrade kar sakta hai write-heavy workloads ke liye, chahe kuch specific read queries ko marginally help kare.",
    interviewExplanation:
      "I'd give the balanced answer: 'No — every index adds write overhead, since inserts/updates/deletes must maintain each covering index, plus additional memory/storage. Indiscriminately adding indexes can actually hurt write-heavy workloads even while marginally helping some reads. The right approach is deliberate indexing based on actual observed query patterns, verified via execution plans — not preemptive indexing of every possibly-queried column.'",
    diagramNote:
      "'More indexes' → 'Faster specific reads' BUT ALSO → 'Slower writes (every index maintained on insert/update/delete)' + 'More memory/storage consumed' — deliberate tradeoff, not free.",
    diagramMermaid: `flowchart TD
    A["More indexes"] --> B["Faster specific reads"]
    A --> C["Slower writes<br/>every index maintained"]
    A --> D["More memory/storage consumed"]`,
    realProjectExample:
      "A table with several rarely-used indexes added preemptively 'just in case' was found during a performance review to be meaningfully slowing down its high-frequency insert workload — removing the unused indexes improved write throughput without measurably hurting any actual read query.",
    interviewTip:
      "If asked 'should you index every column that might be queried', the correct, disciplined answer is no — indexing should be deliberate and evidence-based, not preemptive, given the real write-overhead tradeoff.",
    followupQuestions: [
      "How would you identify an index that's no longer being used and could be removed?",
      "What's the write-overhead difference between indexing a row-store versus column-store table?",
      "How would you decide whether a specific slow query justifies adding a new index?",
    ],
    commonMistakes: [
      "Assuming more indexes are unconditionally better for performance.",
      "Not considering the write-overhead cost when deciding whether to add an index.",
    ],
    importantPoints: [
      "Every index adds write overhead (maintained on insert/update/delete) and consumes memory/storage.",
      "Indiscriminate indexing can degrade write-heavy workload performance.",
      "Add indexes deliberately, based on observed query patterns and execution-plan evidence.",
    ],
    revisionNotes: "Indexes aren't free — each one adds write overhead + storage cost. Add deliberately based on observed query patterns/execution-plan evidence, not preemptively for every column.",
  },
  {
    id: "hana-q23",
    topic: "Indexes",
    prompt: "What is a 'covering index' concept, and does it apply meaningfully in HANA's columnar engine?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["indexes", "covering-index"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A covering index contains all the columns a query needs, letting the query be satisfied entirely from the index without touching the base table — this concept is less central in HANA's columnar engine, since columnar storage already lets a query read only the specific columns it needs directly from the column store, without a separate covering-index structure being as necessary.",
    detailedAnswer:
      "In a traditional row-based database, a query might use an index to locate rows, but if the index doesn't contain every column the query selects, it still has to go back to the full row ('table lookup') to fetch the remaining columns — a covering index avoids this extra step by including every needed column directly in the index itself. In HANA's columnar engine, this specific problem is less relevant by design: since each column is already stored separately and can be read independently, a query naturally only touches the specific columns it needs directly from the column store, without needing a separate covering-index structure to achieve that same 'don't touch unneeded columns' benefit — the columnar layout itself provides much of what a covering index exists to solve in row-based systems.",
    hindiExplanation:
      "Traditional row-based database mein, ek query ek index use kar sakti hai rows locate karne ke liye, lekin agar index mein har column nahi hai jo query select karti hai, use phir bhi poori row tak wapas jaana padta hai ('table lookup') baaki columns fetch karne ke liye — ek covering index is extra step ko avoid karta hai har zaroori column ko directly index mein include karke. HANA ke columnar engine mein, ye specific problem design se kam relevant hai: kyunki har column already alag store hota hai aur independently read ho sakta hai, ek query naturally sirf zaroori columns hi touch karti hai directly column store se, ek separate covering-index structure ki zaroorat ke bina.",
    interviewExplanation:
      "I'd explain why the concept is less central here: 'A covering index avoids an extra table lookup by including every needed column directly in the index, in a row-based system. In HANA's columnar engine, that specific problem is largely solved by design — each column is already stored separately and read independently, so a query naturally only touches the columns it needs, without a separate covering-index structure being as necessary to achieve that.'",
    diagramNote:
      "Row-based DB: 'Index lookup → if not covering, extra table lookup for remaining columns' vs HANA columnar: 'Query naturally reads only needed columns directly from column store — covering-index concept less necessary'.",
    diagramMermaid: `flowchart LR
    A["Row-based DB index lookup"] --> B["If not covering: extra<br/>table lookup for remaining columns"]
    C["HANA columnar query"] --> D["Reads only needed columns<br/>directly — covering index less needed"]`,
    realProjectExample:
      "A developer with a row-based-database background initially assumed they'd need to design covering indexes carefully in HANA, then learned that the columnar engine's natural column-level read behavior already provided most of that benefit without needing an equivalent index design pattern.",
    interviewTip:
      "If asked to design a covering index strategy in HANA the way you might in a traditional RDBMS, the accurate answer is that the concept matters much less here — explaining why (columnar storage's natural per-column reads) shows real architectural understanding rather than blindly porting a row-based-database habit.",
    followupQuestions: [
      "Does the covering-index concept still apply at all for HANA's row-store tables?",
      "What HANA-specific technique would you use instead if you did want a similar benefit for a query pattern?",
      "How would you verify whether a query is only touching the columns it actually needs?",
    ],
    commonMistakes: [
      "Assuming covering-index design principles from row-based databases transfer directly and equally to HANA's columnar engine.",
      "Not recognizing that columnar storage's natural per-column reads already address much of what covering indexes solve elsewhere.",
    ],
    importantPoints: [
      "Covering index = index containing all needed columns, avoiding a separate table lookup.",
      "In HANA's columnar engine, natural per-column reads already provide much of this benefit.",
      "The covering-index concept is less central/necessary in columnar storage than in row-based databases.",
    ],
    revisionNotes: "Covering index avoids extra table lookups in row-based DBs. In HANA's columnar engine, per-column reads already provide this naturally — covering-index concept matters less here.",
  },
  {
    id: "hana-q24",
    topic: "Performance",
    prompt: "What is 'filter pushdown', and how would you recognize its absence in an execution plan?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["performance", "filter-pushdown"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Filter pushdown means applying a WHERE condition as early as possible in the execution plan (ideally right at the initial table/column scan), rather than after expensive operations like joins or aggregations have already processed a much larger set of rows than necessary; its absence shows up in an execution plan as a filter operation appearing late, after large join/aggregation nodes have already processed unfiltered data.",
    detailedAnswer:
      "The earlier a filter is applied, the fewer rows subsequent operations (joins, aggregations) need to process — filter pushdown is the optimizer's job to identify a filter and apply it as close to the data source as possible, ideally as part of the initial scan itself, rather than filtering only at the very end after unnecessary work has already been done on unfiltered data. In an execution plan, you'd recognize its absence by seeing a filter node positioned late in the plan, downstream of expensive join or aggregation nodes that clearly processed a far larger row count than the final filtered result needed — a sign the optimizer (or the query's structure, like a view abstraction obscuring the filter's relationship to underlying tables) failed to push the condition down closer to the source.",
    hindiExplanation:
      "Filter jitna jaldi apply hota hai, subsequent operations (joins, aggregations) ko utne kam rows process karne padte hain — filter pushdown optimizer ka kaam hai ek filter identify karna aur use data source ke jitna kareeb ho sake apply karna, ideally initial scan ke hisse ki tarah, sirf bilkul end mein filter karne ki jagah jab already unnecessary kaam ho chuka ho unfiltered data pe. Ek execution plan mein, tum iski absence recognize karoge ek filter node ko plan mein late position pe dekh kar, expensive join ya aggregation nodes ke downstream jinhone clearly ek bahut bada row count process kiya jitna final filtered result ko zaroorat thi.",
    interviewExplanation:
      "I'd explain both the concept and the plan signature: 'Filter pushdown means applying a WHERE condition as early as possible, ideally right at the initial scan, so downstream joins/aggregations process fewer rows. Its absence shows up in the execution plan as a filter node appearing late, after expensive join or aggregation nodes that clearly processed far more rows than the final result needed — a sign the condition wasn't pushed down closer to the source, sometimes because a view abstraction obscured that relationship.'",
    diagramNote:
      "'With pushdown: Scan (filtered early) → Join (fewer rows) → Aggregation (fast)' vs 'Without pushdown: Scan (unfiltered) → Join (many rows, slow) → Filter (late) → Aggregation'.",
    diagramMermaid: `flowchart LR
    A["With pushdown:<br/>Scan (filtered early)"] --> B["Join (fewer rows)"] --> C["Fast aggregation"]
    D["Without pushdown:<br/>Scan (unfiltered)"] --> E["Join (many rows, slow)"] --> F["Filter (late)"] --> G["Aggregation"]`,
    realProjectExample:
      "An execution plan revealed a filter condition applied after a large join in a Calculation-View-backed query, because the view's structure obscured the filter's relationship to the underlying source table; restructuring the query to filter on the base table before the view's join fixed the pushdown and cut execution time significantly.",
    interviewTip:
      "If asked how you'd spot a filter-pushdown problem specifically in an execution plan (not just generically 'the query is slow'), describing the visual pattern — filter appearing late, after operations processing a suspiciously large row count — shows real hands-on diagnostic experience.",
    followupQuestions: [
      "Why might a view or Calculation View structure sometimes prevent effective filter pushdown?",
      "How would you restructure a query to encourage better filter pushdown?",
      "Does filter pushdown apply to conditions in a HAVING clause the same way as WHERE?",
    ],
    commonMistakes: [
      "Not recognizing the specific execution-plan signature of missing filter pushdown (a late filter after expensive operations).",
      "Assuming the optimizer always pushes filters down optimally regardless of query/view structure.",
    ],
    importantPoints: [
      "Filter pushdown = applying a condition as early as possible, ideally at the initial scan.",
      "Its absence shows as a late filter node in the plan, after expensive joins/aggregations processed unfiltered data.",
      "View/Calculation-View abstractions can sometimes obscure the filter's relationship, hindering pushdown.",
    ],
    revisionNotes: "Filter pushdown = apply WHERE as early as possible (at scan). Absence in a plan = late filter node after joins/aggregations processed unfiltered, unnecessarily large data.",
  },
  {
    id: "hana-q25",
    topic: "Performance",
    prompt: "How would workload management (like statement memory limits or priority) help in a multi-tenant HANA Cloud environment with mixed query loads?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["performance", "workload-management"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Workload management lets you set resource limits (memory, statement priority, concurrency) on specific workload classes, preventing one heavy, poorly-optimized or runaway query from starving resources needed by other, more time-sensitive queries sharing the same HANA instance — important when transactional and analytical workloads (or multiple tenants) genuinely compete for the same underlying resources.",
    detailedAnswer:
      "Without any workload controls, a single expensive analytical query (or a runaway/badly-written statement) can consume enough memory or CPU to noticeably degrade performance for every other concurrent query on the same instance, including time-sensitive transactional operations. Workload management lets you define workload classes with specific resource limits — for example, capping the maximum memory a reporting-workload class can consume, or setting statement priority so critical transactional queries get preferential scheduling over lower-priority batch/reporting queries — providing genuine resource isolation between different kinds of concurrent work sharing the same HANA Cloud instance, which matters especially in multi-tenant or mixed-workload (OLTP + OLAP) scenarios where different query types would otherwise compete unpredictably.",
    hindiExplanation:
      "Kisi bhi workload controls ke bina, ek single expensive analytical query (ya ek runaway/badly-written statement) itna memory/CPU consume kar sakta hai ki har doosri concurrent query ki performance noticeably degrade ho jaaye same instance pe, time-sensitive transactional operations sameit. Workload management tumhe workload classes define karne deta hai specific resource limits ke saath — for example, ek reporting-workload class ki maximum memory cap karna, ya statement priority set karna taaki critical transactional queries ko preferential scheduling mile lower-priority batch/reporting queries se zyada — genuine resource isolation provide karta hai different kinds of concurrent work ke beech.",
    interviewExplanation:
      "I'd explain the resource-isolation purpose: 'Without workload controls, one expensive or runaway query can starve resources needed by other concurrent, time-sensitive queries on the same instance. Workload management lets you define workload classes with resource limits — like capping reporting-workload memory, or giving transactional queries higher scheduling priority than batch/reporting ones — providing genuine resource isolation, which matters especially in multi-tenant or mixed OLTP-plus-OLAP scenarios.'",
    diagramNote:
      "'No workload controls: one heavy query starves others' vs 'Workload management: workload classes with memory/priority limits' → 'Transactional queries protected from being starved by heavy reporting queries'.",
    diagramMermaid: `flowchart LR
    A["No workload controls"] --> B["One heavy query<br/>starves others"]
    C["Workload management"] --> D["Workload classes with<br/>memory/priority limits"]
    D --> E["Transactional queries<br/>protected from starvation"]`,
    realProjectExample:
      "A reporting query left unbounded once consumed enough memory to noticeably slow down concurrent transactional order processing on the same instance; configuring a workload class with a memory cap for reporting-type statements prevented that class of query from impacting time-sensitive transactional performance going forward.",
    interviewTip:
      "If asked how you'd prevent a heavy analytics query from impacting critical transactional performance on a shared instance, naming workload management with concrete resource limits (memory caps, priority) is the specific, correct mechanism rather than a vague 'optimize the query'.",
    followupQuestions: [
      "How would you decide what memory limit to assign to a workload class?",
      "Would workload management help if the underlying issue was actually a badly-designed query rather than resource contention?",
      "How does this relate to multitenancy's structural isolation via separate HDI containers?",
    ],
    commonMistakes: [
      "Assuming resource contention between different workload types can only be solved by scaling up hardware, missing workload management's role.",
      "Not distinguishing workload management's resource-isolation purpose from HDI's structural data-isolation purpose.",
    ],
    importantPoints: [
      "Workload management defines resource limits (memory, priority, concurrency) per workload class.",
      "Prevents one heavy/runaway query from starving resources needed by other concurrent queries.",
      "Especially valuable in multi-tenant or mixed OLTP-plus-OLAP scenarios sharing one instance.",
    ],
    revisionNotes: "Workload management = resource limits (memory/priority) per workload class — prevents one heavy query from starving others sharing the same instance, valuable in multi-tenant/mixed-workload scenarios.",
  },
  {
    id: "hana-q26",
    topic: "Replication",
    prompt: "What's the difference between batch replication and real-time (change data capture) replication into HANA Cloud?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["replication", "cdc"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Batch replication periodically copies a full or incremental snapshot of data on a schedule (e.g. nightly), leaving a gap between the source's actual state and the replicated copy; real-time change data capture (CDC) replication streams individual changes continuously as they happen at the source, keeping the target near-instantaneously up to date.",
    detailedAnswer:
      "Batch replication (running a scheduled extract-and-load job, say nightly or hourly) is simpler to set up and reason about, but means the replicated data in HANA Cloud can be stale by up to the length of that interval — acceptable for many reporting use cases that don't need up-to-the-second freshness. Change data capture instead continuously monitors the source system's transaction log (or similar mechanism) and streams individual row-level changes as they occur, propagating them to HANA Cloud within seconds typically, keeping the replicated copy near-real-time. The choice depends on freshness requirements: a daily sales summary report tolerates batch replication fine, while a near-real-time operational dashboard would need CDC-based replication instead.",
    hindiExplanation:
      "Batch replication (ek scheduled extract-and-load job chalana, jaise nightly ya hourly) setup karna aur reason karna simpler hai, lekin iska matlab hai ki HANA Cloud mein replicated data us interval ki length tak stale ho sakta hai — kai reporting use cases ke liye acceptable hai jinhe up-to-the-second freshness nahi chahiye. Change data capture iske bajaye continuously source system ke transaction log (ya similar mechanism) ko monitor karta hai aur individual row-level changes ko stream karta hai jaise wo hote hain, unhe HANA Cloud tak propagate karta hai typically seconds ke andar, replicated copy ko near-real-time rakhte hue.",
    interviewExplanation:
      "I'd frame it around freshness requirements: 'Batch replication runs a scheduled extract-and-load job, so the replicated data can be stale by the length of that interval — fine for reporting that doesn't need up-to-the-second freshness. Change data capture continuously streams individual row-level changes as they happen, keeping the target near-real-time within seconds. I'd choose based on actual freshness needs — a daily summary report tolerates batch fine, but a near-real-time operational dashboard needs CDC.'",
    diagramNote:
      "'Batch replication: scheduled extract-and-load (e.g. nightly) — data stale by interval length' vs 'CDC replication: continuous streaming of individual changes — near-real-time (seconds)'.",
    diagramMermaid: `flowchart LR
    A["Batch replication"] --> B["Scheduled extract-load<br/>e.g. nightly — stale by interval"]
    C["CDC replication"] --> D["Continuous streaming<br/>near-real-time (seconds)"]`,
    realProjectExample:
      "A daily executive summary dashboard used batch replication running overnight, which was perfectly acceptable given the reporting cadence, while a separate operational monitoring dashboard needing near-current data used CDC-based replication via SLT instead.",
    interviewTip:
      "If asked to choose a replication approach, always anchor the answer in the actual freshness requirement of the specific use case, rather than defaulting to 'always use real-time replication' regardless of whether it's actually needed.",
    followupQuestions: [
      "What mechanism does CDC typically use at the source to detect changes?",
      "What are the resource/complexity tradeoffs of CDC replication compared to batch?",
      "Would you ever combine both batch and CDC replication in the same landscape?",
    ],
    commonMistakes: [
      "Defaulting to real-time CDC replication even when the use case's actual freshness requirement would be fine with simpler batch replication.",
      "Not understanding batch replication's inherent staleness-by-interval-length characteristic.",
    ],
    importantPoints: [
      "Batch replication = scheduled extract-load, data stale by the interval length.",
      "CDC replication = continuous streaming of individual changes, near-real-time.",
      "Choose based on the actual freshness requirement of the specific use case.",
    ],
    revisionNotes: "Batch replication = scheduled, stale by interval length. CDC replication = continuous streaming, near-real-time. Choose based on the use case's actual freshness need.",
  },
  {
    id: "hana-q27",
    topic: "Replication",
    prompt: "What would you monitor to ensure an ongoing replication setup stays healthy?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["replication", "monitoring"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Monitor replication lag (how far behind the target is from the source), error/failure logs from the replication tool, and whether the replication task/job is actually running versus stalled or stopped — proactively alerting on excessive lag or a stopped replication task rather than only discovering staleness when a report looks wrong.",
    detailedAnswer:
      "A silently-stalled or failed replication task is dangerous precisely because the target data still looks superficially normal — queries return results, they're just increasingly stale, and nobody notices until a report's numbers are visibly wrong or a business user flags a discrepancy. Proactive monitoring should track replication lag (the time/change-gap between source and target) with alerting if it exceeds an acceptable threshold, review the replication tool's own error/failure logs for connection issues or transformation errors, and verify the replication job/task is actually actively running rather than silently stopped — catching a stalled replication within minutes via monitoring, rather than discovering it days later when someone questions a report's numbers.",
    hindiExplanation:
      "Ek silently-stalled ya failed replication task dangerous hota hai precisely isliye ki target data superficially normal dikhta hai — queries results return karti hain, wo bas increasingly stale hote hain, aur koi notice nahi karta jab tak ek report ke numbers visibly galat na dikhein ya koi business user discrepancy flag na kare. Proactive monitoring ko replication lag track karna chahiye (source aur target ke beech time/change-gap) alerting ke saath agar wo ek acceptable threshold se zyada ho, replication tool ke apne error/failure logs review karna chahiye connection issues ya transformation errors ke liye, aur verify karna chahiye ki replication job/task actually actively chal raha hai silently stopped hone ki jagah.",
    interviewExplanation:
      "I'd emphasize why silent staleness is dangerous: 'A stalled replication is dangerous because the target still looks superficially normal — queries just return increasingly stale data, and nobody notices until a report looks visibly wrong. I'd monitor replication lag with alerting on an acceptable threshold, review the tool's own error logs for connection/transformation issues, and verify the replication job is actually actively running, not silently stopped — catching problems within minutes instead of discovering them days later.'",
    diagramNote:
      "'Silent replication failure' → data 'looks normal but increasingly stale' — dangerous. Proactive monitoring: 'replication lag + alerting', 'error/failure logs', 'job actually running check' → catches issues within minutes.",
    diagramMermaid: `flowchart TD
    A["Silent replication failure"] --> B["Data looks normal<br/>but increasingly stale"]
    C["Proactive monitoring"] --> D["Replication lag + alerting"]
    C --> E["Error/failure logs"]
    C --> F["Job actively running check"]`,
    realProjectExample:
      "A replication job silently stopped due to an expired credential, and without lag monitoring, this went unnoticed for two days until a business user flagged that a dashboard's numbers hadn't changed — after that incident, lag-based alerting was configured to catch this class of issue within minutes going forward.",
    interviewTip:
      "If asked 'how would you know if replication broke', the strongest answer describes proactive lag-based alerting specifically — not just 'I'd check the logs' as a reactive, manual process.",
    followupQuestions: [
      "What would a reasonable lag alerting threshold look like, and how would you decide it?",
      "What are common causes of a replication task silently stopping?",
      "How would you design an automated recovery process for a stalled replication task?",
    ],
    commonMistakes: [
      "Relying only on manual, reactive log-checking instead of proactive lag-based alerting.",
      "Not recognizing that a stalled replication's danger comes precisely from data looking superficially normal.",
    ],
    importantPoints: [
      "Monitor replication lag with proactive alerting on an acceptable threshold.",
      "Review the replication tool's error/failure logs for connection or transformation issues.",
      "Verify the replication job is actually actively running, not silently stopped.",
    ],
    revisionNotes: "Replication health monitoring = lag + alerting (proactive), error/failure logs, and confirming the job is actively running — catches silent staleness before it's discovered via a wrong report.",
  },
  {
    id: "hana-q28",
    topic: "Backup",
    prompt: "What's the difference between a full backup (savepoint) and a log backup in HANA's backup strategy?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["backup", "savepoints"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A savepoint is a periodic full snapshot of the in-memory data written to disk, providing a recovery baseline; log backups continuously capture the transaction log between savepoints, so recovery can replay logged transactions on top of the last savepoint to restore to any specific point in time, not just to the moment of the last full snapshot.",
    detailedAnswer:
      "A savepoint periodically persists the current in-memory data state to disk as a consistent baseline — this alone would only let you recover to the moment of the last savepoint, losing anything that happened afterward. Log backups fill this gap by continuously capturing every committed transaction in the transaction log between savepoints; during recovery, HANA restores from the most recent savepoint and then replays the log backups' transactions on top of it, reconstructing the database state up to any specific point in time within the log's retention — not just to whenever the last savepoint happened to occur. This combination (periodic full baseline + continuous log capture) is what enables true point-in-time recovery rather than only recovery to fixed snapshot moments.",
    hindiExplanation:
      "Ek savepoint periodically current in-memory data state ko disk pe persist karta hai ek consistent baseline ki tarah — ye akela sirf last savepoint ke moment tak recover karne dega, uske baad jo hua wo lose ho jaayega. Log backups is gap ko fill karte hain continuously har committed transaction ko transaction log mein capture karke savepoints ke beech; recovery ke dauraan, HANA sabse recent savepoint se restore karta hai aur fir log backups ke transactions ko uske upar replay karta hai, database state ko kisi bhi specific point in time tak reconstruct karte hue log ki retention ke andar.",
    interviewExplanation:
      "I'd explain the combination: 'A savepoint periodically persists a full in-memory snapshot as a baseline — alone, it'd only let you recover to that moment. Log backups continuously capture every committed transaction between savepoints, so recovery restores from the latest savepoint then replays the log on top, reconstructing state to any specific point in time within retention — not just the last snapshot moment. That combination is what enables true point-in-time recovery.'",
    diagramNote:
      "'Savepoint (periodic full snapshot)' + 'Log backups (continuous, between savepoints)' → 'Recovery: restore latest savepoint + replay logged transactions' → 'Any point-in-time within retention, not just snapshot moments'.",
    diagramMermaid: `flowchart TD
    A["Savepoint<br/>periodic full snapshot"] --> C["Recovery: restore savepoint"]
    B["Log backups<br/>continuous, between savepoints"] --> D["+ replay logged transactions"]
    C --> E["Any point-in-time<br/>within retention"]
    D --> E`,
    realProjectExample:
      "Recovering to a specific moment just before a bad data-migration script ran (rather than to the last nightly savepoint, which would have lost several hours of legitimate transactions) was possible precisely because log backups let recovery replay transactions up to that exact point in time.",
    interviewTip:
      "If asked why log backups matter when you already have periodic savepoints, the precise answer is that log backups are what enable point-in-time recovery to any moment, not just recovery to the last snapshot — a meaningfully more precise capability.",
    followupQuestions: [
      "How frequently does HANA typically take savepoints?",
      "What happens to recovery precision if log backups are somehow missing or corrupted?",
      "Would recovery ever need to go further back than the oldest available savepoint?",
    ],
    commonMistakes: [
      "Assuming savepoints alone provide point-in-time recovery, without understanding the log backups' role.",
      "Not knowing the recovery process combines a savepoint restore plus log replay.",
    ],
    importantPoints: [
      "Savepoint = periodic full snapshot, a recovery baseline.",
      "Log backups = continuous capture of transactions between savepoints.",
      "Recovery combines restoring the latest savepoint and replaying logs — enabling true point-in-time recovery.",
    ],
    revisionNotes: "Savepoint = periodic full snapshot (baseline). Log backups = continuous transaction capture between savepoints. Recovery = savepoint restore + log replay = point-in-time recovery to any moment.",
  },
  {
    id: "hana-q29",
    topic: "Backup",
    prompt: "If you needed to restore a HANA Cloud instance to a state from three weeks ago, what would determine whether that's possible?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["backup", "retention"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Whether recovery to that point is possible depends entirely on the configured backup retention window — if three weeks falls within the retention period, point-in-time recovery to that moment is possible; if it's older than the retention window, that specific historical state is no longer recoverable via standard backup/recovery.",
    detailedAnswer:
      "SAP-managed backups (savepoints plus log backups) are retained only for a configured retention period, not indefinitely — recovery is only possible to points within that window. If the retention period is, say, 14 days, a request to restore to a state from three weeks ago (21 days) would fall outside that window and standard point-in-time recovery couldn't reach it; if the retention period were 30 days, that same three-week-old state would be recoverable. This is exactly why understanding your specific retention configuration matters for realistic disaster-recovery planning — you need to know in advance whether a given recovery scenario is even possible within your configured window, not discover the limitation only when you actually need it.",
    hindiExplanation:
      "SAP-managed backups (savepoints plus log backups) sirf ek configured retention period ke liye retain hote hain, indefinitely nahi — recovery sirf us window ke andar ke points tak possible hai. Agar retention period, kaho, 14 days hai, ek request teen hafte pehle (21 days) ki state pe restore karne ki us window se bahar padegi aur standard point-in-time recovery use reach nahi kar payegi; agar retention period 30 days hota, wahi teen-hafte-purani state recoverable hoti. Yahi exactly wo reason hai kyun apni specific retention configuration samajhna matter karta hai realistic disaster-recovery planning ke liye.",
    interviewExplanation:
      "I'd point directly to retention: 'It depends entirely on the configured retention window — if three weeks falls within it, point-in-time recovery is possible. If the retention is only, say, 14 days, that three-week-old state falls outside it and standard recovery can't reach it. This is exactly why knowing your specific retention configuration in advance matters for realistic disaster-recovery planning, rather than discovering the limitation only when an actual recovery is needed.'",
    diagramNote:
      "'Requested recovery point: 3 weeks ago' → check against 'Configured retention window' → if within window 'Recovery possible' if outside window 'Not recoverable via standard backup/recovery'.",
    diagramMermaid: `flowchart TD
    A["Requested recovery point:<br/>3 weeks ago"] --> B{"Within configured<br/>retention window?"}
    B -->|Yes| C["Point-in-time recovery possible"]
    B -->|No| D["Not recoverable via<br/>standard backup/recovery"]`,
    realProjectExample:
      "A request to restore data from a state five weeks prior couldn't be fulfilled through standard point-in-time recovery, since the configured retention window was only 30 days — this prompted a review of whether the retention period needed to be extended given the business's actual recovery requirements.",
    interviewTip:
      "If asked to design a DR strategy, explicitly confirming and documenting the actual configured retention window (rather than assuming a generic 'backups are kept forever' expectation) demonstrates realistic, grounded DR planning.",
    followupQuestions: [
      "How would you extend the retention window if the default doesn't meet your DR requirements?",
      "What alternative would you use for recovery needs beyond the standard retention window (e.g. periodic exports)?",
      "How would you communicate this retention limitation to business stakeholders during DR planning?",
    ],
    commonMistakes: [
      "Assuming backups are retained indefinitely rather than within a specific configured window.",
      "Not proactively confirming the retention window during DR planning, only discovering the limitation during an actual incident.",
    ],
    importantPoints: [
      "Point-in-time recovery is only possible within the configured retention window.",
      "A recovery request older than the retention window can't be fulfilled via standard backup/recovery.",
      "Confirm and plan around the actual retention configuration proactively, not reactively.",
    ],
    revisionNotes: "Recovery to a past point depends entirely on the configured retention window — older-than-retention states aren't recoverable via standard backup/recovery. Confirm retention proactively for DR planning.",
  },
  {
    id: "hana-q30",
    topic: "Database Explorer",
    prompt: "How would you use Database Explorer to compare the row counts of a table before and after a data migration script ran?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["database-explorer", "verification"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Run a `SELECT COUNT(*)` query in Database Explorer's SQL console against the target table before and after the migration, comparing the two results directly — a simple, direct way to verify a migration's expected row-count impact without needing external tooling.",
    detailedAnswer:
      "Database Explorer's SQL console lets you run ad-hoc queries directly against the connected HANA Cloud instance and see immediate results, which is exactly the tool for a quick before/after sanity check — running `SELECT COUNT(*) FROM my_table` before the migration, noting the number, running the migration, then running the same count query afterward and comparing against the expected change (an insert-only migration should show an increase matching the number of new records; a migration that shouldn't change row count at all should show identical numbers). This kind of direct, ad-hoc verification is one of Database Explorer's most practical everyday uses beyond its more visual capabilities like Calculation View building or execution plan viewing.",
    hindiExplanation:
      "Database Explorer ka SQL console tumhe ad-hoc queries directly connected HANA Cloud instance ke against chalane deta hai aur immediate results dekhne deta hai, jo exactly wo tool hai ek quick before/after sanity check ke liye — migration se pehle `SELECT COUNT(*) FROM my_table` chalana, number note karna, migration chalana, fir wahi count query baad mein chalana aur expected change ke against compare karna. Ye direct, ad-hoc verification Database Explorer ke sabse practical everyday uses mein se ek hai, uski zyada visual capabilities jaise Calculation View building ya execution plan viewing se alag.",
    interviewExplanation:
      "I'd describe the simple, direct workflow: 'I'd run SELECT COUNT(*) FROM my_table in Database Explorer's SQL console before the migration, note the number, run the migration, then run the same count query again and compare against the expected change — an insert-only migration should show a matching increase; a migration that shouldn't change row count should show identical numbers. It's a simple, direct sanity check using its ad-hoc SQL capability.'",
    diagramNote:
      "'Before migration: SELECT COUNT(*) → note baseline' → 'Run migration script' → 'After migration: SELECT COUNT(*) → compare against expected change'.",
    diagramMermaid: `flowchart LR
    A["Before: SELECT COUNT(*)<br/>note baseline"] --> B["Run migration script"]
    B --> C["After: SELECT COUNT(*)<br/>compare vs expected change"]`,
    realProjectExample:
      "A data-cleanup migration expected to remove exactly 340 duplicate records was verified in Database Explorer by comparing row counts before and after, confirming the actual count decreased by precisely 340 as expected, catching that no unrelated rows had been unintentionally affected.",
    interviewTip:
      "If asked how you'd sanity-check a migration's effect quickly, this simple before/after row-count comparison in Database Explorer is a practical, concrete answer — more convincing than a vague 'I'd check the data looks right'.",
    followupQuestions: [
      "What would you check beyond just row count to more thoroughly verify a migration's correctness?",
      "How would you verify a migration that's supposed to update values rather than change row count?",
      "Would you automate this kind of before/after check for a recurring migration process?",
    ],
    commonMistakes: [
      "Only checking that a migration 'ran without error' without directly verifying its actual data impact.",
      "Not using Database Explorer's straightforward ad-hoc SQL capability for a quick, direct sanity check.",
    ],
    importantPoints: [
      "Run SELECT COUNT(*) before and after a migration to directly verify its row-count impact.",
      "Compare the actual change against the expected change for the specific migration.",
      "A simple, direct, practical use of Database Explorer's ad-hoc SQL capability.",
    ],
    revisionNotes: "Verify migration impact: SELECT COUNT(*) before/after in Database Explorer, compare actual vs expected change — simple, direct, practical sanity check.",
  },
  {
    id: "hana-q31",
    topic: "HDI Containers",
    prompt: "What role does the `.hdiconfig` and `.hdinamespace` file play in an HDI container's deployment?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["hdi", "deployment-config"],
    estimatedMinutes: 2,
    expectedAnswer:
      "`.hdiconfig` marks a folder as the root of an HDI container's design-time artifacts and configures deployment behavior for that container; `.hdinamespace` establishes the namespace prefix for database objects defined in that folder, controlling how object names are qualified when deployed.",
    detailedAnswer:
      "The HDI deployer needs to know which folder structure represents a container's design-time content and how object naming should be organized — `.hdiconfig` at a folder's root declares it as an HDI container root and can configure deployer-specific settings for that scope. `.hdinamespace` files, which can exist at multiple folder levels within the container, establish a namespace prefix that gets applied to database object names based on the folder structure, helping avoid naming collisions and organizing objects logically (e.g. objects in a `db/master-data/` folder might get a `master.data.` namespace prefix). Together these files are what let the HDI deployer correctly interpret a folder structure of CDS/HDBTABLE/HDBVIEW files into a properly namespaced, deployed set of database objects.",
    hindiExplanation:
      "HDI deployer ko jaanna hota hai kaunsi folder structure ek container ke design-time content ko represent karti hai aur object naming kaise organize honi chahiye — `.hdiconfig` ek folder ke root pe use ek HDI container root ki tarah declare karta hai aur deployer-specific settings configure kar sakta hai us scope ke liye. `.hdinamespace` files, jo kai folder levels pe exist kar sakti hain container ke andar, ek namespace prefix establish karti hain jo database object names pe apply hota hai folder structure ke basis pe, naming collisions avoid karne mein help karte hue aur objects ko logically organize karte hue.",
    interviewExplanation:
      "I'd explain both files' distinct roles: '.hdiconfig marks a folder as an HDI container root and configures deployer settings for that scope. .hdinamespace, which can exist at multiple folder levels, establishes a namespace prefix applied to object names based on folder structure — helping avoid naming collisions and organize objects logically. Together they let the HDI deployer interpret a folder of CDS/HDBTABLE/HDBVIEW files into a properly namespaced set of deployed database objects.'",
    diagramNote:
      "'.hdiconfig (folder root) → marks HDI container root, configures deployer settings' + '.hdinamespace (nested folders) → establishes namespace prefix per folder' → 'Deployer produces properly namespaced database objects'.",
    diagramMermaid: `flowchart TD
    A[".hdiconfig at folder root"] --> C["Marks HDI container root,<br/>configures deployer settings"]
    B[".hdinamespace at nested folders"] --> D["Establishes namespace<br/>prefix per folder"]
    C --> E["Deployer produces properly<br/>namespaced database objects"]
    D --> E`,
    realProjectExample:
      "Organizing db/ artifacts into subfolders each with their own .hdinamespace file kept generated database object names cleanly prefixed and collision-free as the project's data model grew across several logical modules.",
    interviewTip:
      "If asked what determines an HDI container's boundary and object naming, naming these two specific files (rather than a vague 'it's configured somewhere') shows real hands-on familiarity with CAP/HDI project structure.",
    followupQuestions: [
      "What happens if a folder is missing an expected .hdinamespace file?",
      "Can a single project contain multiple HDI containers, each with its own .hdiconfig?",
      "How does this file-based configuration interact with the HDI deployer's runtime behavior?",
    ],
    commonMistakes: [
      "Not knowing these specific configuration files exist or what each one controls.",
      "Confusing .hdiconfig (container root marker) with .hdinamespace (naming prefix per folder).",
    ],
    importantPoints: [
      ".hdiconfig marks a folder as an HDI container root and configures deployer settings.",
      ".hdinamespace establishes a namespace prefix for objects based on folder structure.",
      "Together they let the HDI deployer produce a properly namespaced, deployed object set.",
    ],
    revisionNotes: ".hdiconfig = marks HDI container root + deployer config. .hdinamespace = namespace prefix per folder, avoiding naming collisions.",
  },
  {
    id: "hana-q32",
    topic: "Replication",
    prompt: "What's a potential risk of replicating data into HANA Cloud without any transformation, versus applying transformation during replication?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["replication", "data-transformation"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Replicating data as-is without transformation risks carrying over the source system's inconsistencies, outdated structures, or sensitive fields directly into the target, whereas transformation during replication (filtering, masking sensitive fields, restructuring) lets you shape the data appropriately for its actual intended use in HANA Cloud, rather than blindly mirroring the source.",
    detailedAnswer:
      "A naive 1:1 replication copies the source's data exactly as it is, including any data quality issues, legacy structural quirks, or sensitive fields (like unmasked PII) that might not be appropriate to carry over unchanged into an analytics-focused target. Tools supporting transformation during replication (rather than just verbatim copying) let you apply filtering (only replicate relevant subsets), masking (redact or pseudonymize sensitive fields for the target's actual audience and compliance requirements), and restructuring (reshape the source's schema into something better suited for the target's analytical use), meaning the decision of 'transform now during replication versus later downstream' has real compliance and data-quality implications worth deliberately considering rather than defaulting to a verbatim copy.",
    hindiExplanation:
      "Ek naive 1:1 replication source ke data ko exactly as-is copy karta hai, including koi bhi data quality issues, legacy structural quirks, ya sensitive fields (jaise unmasked PII) jo shayad appropriate na ho unchanged target mein le jaana. Transformation during replication support karne wale tools (sirf verbatim copying ki jagah) tumhe filtering apply karne dete hain (sirf relevant subsets replicate karo), masking (sensitive fields redact ya pseudonymize karo target ki actual audience aur compliance requirements ke liye), aur restructuring (source ke schema ko target ke analytical use ke liye better reshape karo).",
    interviewExplanation:
      "I'd highlight the compliance and quality angle: 'A verbatim, untransformed replication carries over the source's data quality issues and any sensitive fields exactly as they are, which might not be appropriate for the target's actual audience. Tools supporting transformation during replication let you filter to relevant subsets, mask sensitive fields for compliance, and restructure the schema for the target's analytical use — it's a deliberate decision, not something to default into blindly copying.'",
    diagramNote:
      "'Verbatim replication: source quality issues/sensitive fields carried over as-is' vs 'Transformation during replication: filter, mask sensitive fields, restructure for target's actual use' — a deliberate compliance/quality decision.",
    diagramMermaid: `flowchart LR
    A["Verbatim replication"] --> B["Source quality issues/<br/>sensitive fields carried over as-is"]
    C["Transformation during replication"] --> D["Filter, mask sensitive fields,<br/>restructure for target's use"]`,
    realProjectExample:
      "A replication pipeline was configured to mask a customer PII field during replication into the analytics-focused HANA Cloud target, since that target's broader audience of report consumers shouldn't have had unmasked access to that sensitive data the way the tightly-controlled source system's users did.",
    interviewTip:
      "If asked about replication design considerations beyond just 'copy the data', raising the compliance/sensitive-data masking angle specifically shows awareness that replication design has real data-governance implications, not just a technical mechanism.",
    followupQuestions: [
      "Where would you typically apply masking — during replication, or after, in the target?",
      "What are the tradeoffs of transforming during replication versus doing it in a downstream CDS view instead?",
      "How would you audit that sensitive fields are actually being masked correctly during replication?",
    ],
    commonMistakes: [
      "Defaulting to verbatim, untransformed replication without considering compliance implications for sensitive fields.",
      "Not considering that replicated data quality issues can propagate directly from the source if left untransformed.",
    ],
    importantPoints: [
      "Verbatim replication carries over source data quality issues and sensitive fields unchanged.",
      "Transformation during replication (filter, mask, restructure) shapes data appropriately for the target's actual use.",
      "This is a deliberate compliance/data-governance decision, not just a technical copying mechanism.",
    ],
    revisionNotes: "Verbatim replication carries over source issues/sensitive fields as-is. Transformation during replication (filter/mask/restructure) is a deliberate compliance/quality decision for the target's actual use.",
  },
  {
    id: "hana-q33",
    topic: "Backup",
    prompt: "Would enabling more frequent log backups reduce your recovery point objective (RPO), and what's the tradeoff?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["backup", "rpo"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — more frequent log backups reduce the maximum amount of committed transaction data that could be lost in a disaster (a smaller RPO), since less uncaptured log data exists between backups at any given moment; the tradeoff is additional overhead (I/O, storage, network for shipping backups) from backing up more frequently, though HANA's managed service abstracts much of this from the customer directly configuring it.",
    detailedAnswer:
      "RPO (Recovery Point Objective) measures how much data loss is acceptable/expected in a worst-case disaster — the gap between the last successfully captured backup and the moment of failure. More frequent log backups shrink that gap, since less committed-but-not-yet-backed-up transaction data can exist at any moment before the next backup captures it. However, backing up more frequently isn't free: each backup operation consumes I/O bandwidth, storage, and (for off-instance backup storage) network transfer — there's a real operational cost tradeoff between minimizing RPO and the overhead of more frequent backup operations, though HANA Cloud's managed service handles much of the frequency/scheduling that a self-managed database administrator would otherwise need to tune directly.",
    hindiExplanation:
      "RPO (Recovery Point Objective) measure karta hai kitna data loss acceptable/expected hai worst-case disaster mein — last successfully captured backup aur failure ke moment ke beech ka gap. Zyada frequent log backups is gap ko shrink karte hain, kyunki kam committed-but-not-yet-backed-up transaction data kisi bhi moment pe exist kar sakta hai next backup use capture karne se pehle. Lekin, zyada frequently backup lena free nahi hai: har backup operation I/O bandwidth, storage, aur (off-instance backup storage ke liye) network transfer consume karta hai.",
    interviewExplanation:
      "I'd confirm the relationship and name the tradeoff: 'Yes — more frequent log backups shrink RPO, since less committed transaction data can exist uncaptured at any given moment. The tradeoff is operational overhead — I/O, storage, and network cost from more frequent backup operations — though HANA Cloud's managed service abstracts much of this scheduling from direct customer tuning compared to a fully self-managed database.'",
    diagramNote:
      "'More frequent log backups' → 'Smaller RPO (less potential data loss)' BUT ALSO → 'More I/O/storage/network overhead from frequent backup operations'.",
    diagramMermaid: `flowchart LR
    A["More frequent log backups"] --> B["Smaller RPO<br/>less potential data loss"]
    A --> C["More I/O/storage/network<br/>overhead"]`,
    realProjectExample:
      "A discussion about acceptable data-loss risk for a financial transactions table led to confirming the platform's log-backup frequency met the business's RPO requirement, understanding this was largely managed by SAP's service configuration rather than something requiring direct manual tuning.",
    interviewTip:
      "If asked to explain RPO in HANA Cloud specifically, connecting it directly to log-backup frequency (rather than defining RPO only in the abstract) shows you can apply the concept concretely to this platform.",
    followupQuestions: [
      "What's the difference between RPO and RTO (Recovery Time Objective)?",
      "How would you determine an appropriate RPO for a given business system?",
      "Does HANA Cloud let customers directly configure log-backup frequency, or is it managed entirely by SAP?",
    ],
    commonMistakes: [
      "Not connecting RPO as a concept directly to log-backup frequency in HANA's specific backup architecture.",
      "Assuming backup frequency has no real operational cost tradeoff.",
    ],
    importantPoints: [
      "More frequent log backups reduce RPO (less potential data loss in a disaster).",
      "Tradeoff: more frequent backups incur more I/O/storage/network overhead.",
      "HANA Cloud's managed service abstracts much of this scheduling from direct customer configuration.",
    ],
    revisionNotes: "More frequent log backups = smaller RPO (less data loss risk) but more I/O/storage/network overhead — HANA Cloud's managed service handles most of this scheduling.",
  },
  {
    id: "hana-q34",
    topic: "Database Explorer",
    prompt: "Beyond ad-hoc queries, how would you use Database Explorer to debug why a CDS-generated view isn't returning expected data?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["database-explorer", "debugging"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Inspect the actual deployed view definition in Database Explorer's catalog browser (to confirm it matches what you expect from the CDS source), query the underlying base tables directly to isolate whether the issue is in the view's logic or the underlying data itself, and use the execution plan viewer if the view returns correct-but-slow or unexpectedly-filtered results.",
    detailedAnswer:
      "A systematic debugging approach starts with confirming what's actually deployed: browse to the view in Database Explorer's catalog and inspect its generated SQL definition, checking it matches your CDS source's actual intent (catching cases where an unexpected deployment or stale artifact caused a mismatch). Next, query the underlying base tables directly with plain SELECTs to determine whether the 'missing' data genuinely doesn't exist at the source, or exists but is being filtered/joined out incorrectly by the view's logic — this isolates whether the bug is in the view's definition or upstream in the actual data. If the view returns data but with unexpected filtering, the execution plan viewer can reveal exactly which join or filter condition is excluding rows you expected to see.",
    hindiExplanation:
      "Ek systematic debugging approach shuru hoti hai ye confirm karke ki actually deployed kya hai: Database Explorer ke catalog browser mein view tak jao aur uski generated SQL definition inspect karo, check karo ki wo tumhare CDS source ke actual intent se match karti hai. Fir, underlying base tables ko plain SELECTs se directly query karo ye determine karne ke liye ki 'missing' data genuinely source pe exist hi nahi karta, ya exist karta hai lekin view ki logic dwara incorrectly filter/join out ho raha hai — ye isolate karta hai ki bug view ki definition mein hai ya upstream actual data mein. Agar view data return karta hai lekin unexpected filtering ke saath, execution plan viewer exactly dikha sakta hai kaunsa join ya filter condition rows exclude kar raha hai.",
    interviewExplanation:
      "I'd walk through the systematic approach: 'First, I'd browse to the view in Database Explorer's catalog and inspect its actual deployed SQL definition, to rule out a stale or unexpected deployment. Then I'd query the underlying base tables directly to determine if the data genuinely doesn't exist at the source or is being filtered/joined out by the view's logic — isolating whether the bug is in the view or upstream in the data. If it's returning unexpectedly filtered results, the execution plan viewer would show exactly which join or filter condition is excluding rows.'",
    diagramNote:
      "'Inspect deployed view SQL in catalog' → 'Query underlying base tables directly' → isolate: data missing at source vs incorrectly filtered by view → 'Execution plan viewer if filtering/join is the suspect'.",
    diagramMermaid: `flowchart TD
    A["Inspect deployed view SQL<br/>in catalog"] --> B["Query underlying base<br/>tables directly"]
    B --> C{"Data missing at source,<br/>or filtered by view?"}
    C --> D["Execution plan viewer<br/>if filtering/join is the suspect"]`,
    realProjectExample:
      "A CDS view unexpectedly returning zero rows was debugged by first confirming its deployed SQL matched the source CDS definition, then querying the base table directly (finding the data did exist), and finally using the execution plan to spot an overly restrictive join condition that was silently excluding all matching rows.",
    interviewTip:
      "If asked to debug a 'my view returns no data' scenario, describing this specific systematic sequence (deployed definition check → base table check → plan check) is far stronger than a vague 'I'd look into it'.",
    followupQuestions: [
      "How would you confirm a view's deployed SQL matches its CDS source definition?",
      "What would indicate the problem is a stale deployment rather than a logic bug?",
      "How would you debug the same issue if the view involved a Calculation View rather than a plain CDS view?",
    ],
    commonMistakes: [
      "Assuming a view's logic is the problem without first confirming the underlying data actually exists as expected.",
      "Not checking whether the deployed view definition genuinely matches the current CDS source (a stale deployment).",
    ],
    importantPoints: [
      "Inspect the deployed view's actual SQL definition in Database Explorer's catalog first.",
      "Query underlying base tables directly to isolate a data issue from a view-logic issue.",
      "Use the execution plan viewer to pinpoint an unexpectedly restrictive join/filter condition.",
    ],
    revisionNotes: "Debug a CDS view returning wrong data: check deployed SQL matches source → query base tables directly to isolate data vs logic issue → execution plan viewer for filter/join issues.",
  },
  {
    id: "hana-q35",
    topic: "Database Explorer",
    prompt: "Can you use Database Explorer to test a query's performance impact before deploying a Calculation View change to production?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["database-explorer", "pre-deployment-testing"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — you can query and view the execution plan for a Calculation View change in a non-production instance/container (dev or test) via Database Explorer before promoting the change to production, comparing the before/after execution plans directly to catch a performance regression prior to it affecting real users.",
    detailedAnswer:
      "Rather than deploying a Calculation View change straight to production and hoping for the best, connect Database Explorer to a dev or test HANA instance/container where the change has been deployed first, run representative queries against both the old and new versions of the view (or compare against a saved baseline plan), and directly compare their execution plans — checking whether the new version's plan shows a meaningfully worse cost (more rows scanned, a less efficient join order, a missing filter pushdown) before promoting to production. This kind of pre-deployment performance verification, using the exact same execution-plan-viewing capability you'd use for production troubleshooting, catches regressions proactively rather than discovering them only after they impact real users.",
    hindiExplanation:
      "Ek Calculation View change ko directly production mein deploy karke best hone ki ummeed karne ki jagah, Database Explorer ko ek dev ya test HANA instance/container se connect karo jaha change pehle deploy hui ho, representative queries chalao dono old aur new version ke view ke against (ya ek saved baseline plan se compare karo), aur unke execution plans ko directly compare karo — check karo ki naye version ka plan meaningfully worse cost dikha raha hai ya nahi (zyada rows scan, less efficient join order, missing filter pushdown) production mein promote karne se pehle.",
    interviewExplanation:
      "I'd describe this as standard pre-deployment verification: 'Yes — I'd connect Database Explorer to a dev or test instance where the change is deployed first, run representative queries against both old and new versions, and directly compare execution plans — checking for a meaningfully worse cost, like more rows scanned or a missing filter pushdown, before promoting to production. It's the same execution-plan capability used for production troubleshooting, just applied proactively before a regression can affect real users.'",
    diagramNote:
      "'Deploy Calculation View change to dev/test first' → 'Run representative queries, compare old vs new execution plans in Database Explorer' → if regression 'catch and fix before production' if OK 'promote to production'.",
    diagramMermaid: `flowchart TD
    A["Deploy change to dev/test first"] --> B["Compare old vs new<br/>execution plans"]
    B -->|Regression found| C["Fix before promoting<br/>to production"]
    B -->|No regression| D["Promote to production"]`,
    realProjectExample:
      "A planned Calculation View restructuring was first deployed to a test HDI container, where comparing execution plans in Database Explorer revealed the new version introduced an unexpectedly expensive join that hadn't existed before — caught and fixed before the change ever reached production.",
    interviewTip:
      "If asked how you'd validate a modeling change won't cause a performance regression, describing this proactive dev/test execution-plan comparison workflow shows disciplined, real-world release practice rather than 'deploy and see what happens'.",
    followupQuestions: [
      "What representative queries would you choose to test against, and why does that choice matter?",
      "How would you save or document a baseline execution plan for future comparison?",
      "Would you automate this kind of before/after plan comparison as part of a CI/CD pipeline?",
    ],
    commonMistakes: [
      "Deploying modeling changes directly to production without first verifying performance impact in a lower environment.",
      "Not using representative, realistic queries when testing a change's performance impact.",
    ],
    importantPoints: [
      "Test Calculation View changes in a dev/test instance before promoting to production.",
      "Compare old versus new execution plans directly using Database Explorer.",
      "Catches performance regressions proactively, before they affect real users.",
    ],
    revisionNotes: "Pre-deployment check: deploy Calculation View change to dev/test, compare old vs new execution plans in Database Explorer, catch regressions before promoting to production.",
  },
];

export const hanaCloudMcqs: BtpMcq[] = [
  {
    id: "hana-mcq1",
    topic: "Database",
    prompt: "What does 'in-memory' mean for HANA's architecture?",
    options: [
      "Data is never written to disk at all",
      "RAM is the primary read path for data, with disk used for persistence",
      "Only metadata is stored, not actual data",
      "It refers to caching in the application layer, not the database",
    ],
    correctIndex: 1,
    explanation: "HANA keeps the working dataset in RAM as the primary copy for fast access; disk still provides durable persistence for restart recovery.",
  },
  {
    id: "hana-mcq2",
    topic: "Database",
    prompt: "Why does columnar storage suit analytical aggregation queries well?",
    options: [
      "It stores data randomly for speed",
      "It stores each column contiguously, so aggregations read only the needed columns",
      "It eliminates the need for a database engine",
      "It only works for text data",
    ],
    correctIndex: 1,
    explanation: "Columnar storage keeps each column's values contiguous, so an aggregation on one column skips reading unrelated columns entirely — unlike row storage.",
  },
  {
    id: "hana-mcq3",
    topic: "HDI Containers",
    prompt: "What does an HDI container provide?",
    options: [
      "A single shared schema for all apps",
      "An isolated schema and deployment lifecycle per app or tenant",
      "A backup mechanism only",
      "A user authentication service",
    ],
    correctIndex: 1,
    explanation: "HDI containers give each app or tenant an isolated schema with a controlled, versioned deployment lifecycle, enabling safe multi-app/multi-tenant coexistence.",
  },
  {
    id: "hana-mcq4",
    topic: "Calculation Views",
    prompt: "What's a key advantage of a Calculation View over a plain SQL view?",
    options: [
      "It can only be written in Python",
      "It's a graph of composable, optimizable nodes suited to complex analytical modeling",
      "It doesn't require a HANA license",
      "It automatically replicates data externally",
    ],
    correctIndex: 1,
    explanation: "A Calculation View is built from composable nodes (join, aggregation, projection) that HANA compiles into an optimized, parallelizable execution plan.",
  },
  {
    id: "hana-mcq5",
    topic: "SQL",
    prompt: "What does a window function let you do that GROUP BY cannot?",
    options: [
      "Nothing, they're identical",
      "Compute an aggregate/rank per row without collapsing rows into one per group",
      "Only work with string data",
      "Skip writing a SELECT clause",
    ],
    correctIndex: 1,
    explanation: "Window functions (e.g. SUM() OVER (PARTITION BY ...)) compute aggregates or rankings while still returning one row per original record, unlike GROUP BY which collapses rows.",
  },
  {
    id: "hana-mcq6",
    topic: "Performance",
    prompt: "What's the recommended first step when diagnosing a slow HANA query?",
    options: [
      "Immediately add more memory to the instance",
      "Generate and review the query's execution plan",
      "Rewrite the query in a different programming language",
      "Restart the database",
    ],
    correctIndex: 1,
    explanation: "The execution plan shows exactly where time and rows are being consumed, letting you diagnose the actual bottleneck instead of guessing.",
  },
  {
    id: "hana-mcq7",
    topic: "Replication",
    prompt: "Why replicate data into HANA Cloud rather than querying the source system directly for analytics?",
    options: [
      "Replication is required by law",
      "To avoid degrading the source system's performance for its own transactional workload",
      "Because HANA Cloud can't run SQL directly",
      "There's no reason, direct querying is always better",
    ],
    correctIndex: 1,
    explanation: "Heavy analytical queries against a production transactional system risk degrading its performance; replication provides a separate, fresh copy for analytics instead.",
  },
  {
    id: "hana-mcq8",
    topic: "Backup",
    prompt: "Who manages the backup infrastructure for a HANA Cloud instance?",
    options: [
      "The customer must configure and manage it entirely themselves",
      "SAP manages it automatically as part of the managed service",
      "No backups are taken at all",
      "A third-party vendor unrelated to SAP",
    ],
    correctIndex: 1,
    explanation: "SAP automatically manages savepoints and log backups for HANA Cloud, providing point-in-time recovery within a retention window as part of the managed service.",
  },
  {
    id: "hana-mcq9",
    topic: "Database",
    prompt: "What does dictionary encoding primarily do for a low-cardinality column?",
    options: [
      "Encrypts the column",
      "Replaces repeated values with compact integer codes referencing a dictionary of unique values",
      "Deletes duplicate rows",
      "Converts the column to a different data type",
    ],
    correctIndex: 1,
    explanation: "Dictionary encoding stores small integer codes per row referencing a dictionary of unique values, dramatically compressing low-cardinality columns and letting operations run directly on the codes.",
  },
  {
    id: "hana-mcq10",
    topic: "HDI Containers",
    prompt: "Can one HDI container access another container's database objects by default?",
    options: [
      "Yes, automatically, since they're on the same HANA instance",
      "No — cross-container access requires an explicit Synonym or Grantor-Grantee grant",
      "Only if both containers use the same schema name",
      "Only for HANA row-store tables",
    ],
    correctIndex: 1,
    explanation: "HDI isolation is deliberate — cross-container access always requires explicit configuration like a Synonym or a Grantor-Grantee privilege grant, never happening automatically.",
  },
  {
    id: "hana-mcq11",
    topic: "Calculation Views",
    prompt: "What is a star join node specifically optimized for?",
    options: [
      "Encrypting sensitive columns",
      "Joining one large fact table against multiple smaller dimension tables",
      "Replicating data to another instance",
      "Full-text search across a column",
    ],
    correctIndex: 1,
    explanation: "A star join node is purpose-built for the classic fact-table-plus-multiple-dimension-tables pattern from data warehousing, enabling specialized join optimizations.",
  },
  {
    id: "hana-mcq12",
    topic: "SQL",
    prompt: "What's the main advantage of a table function over a stored procedure?",
    options: [
      "Table functions run faster in all cases",
      "A table function's result set can be directly queried, joined, and filtered like a regular table",
      "Stored procedures cannot accept parameters",
      "There is no meaningful difference",
    ],
    correctIndex: 1,
    explanation: "A table function returns a relational result set composable into a larger SELECT (joined, filtered), unlike a stored procedure which runs as its own standalone statement.",
  },
  {
    id: "hana-mcq13",
    topic: "Indexes",
    prompt: "What is an inverted index specifically used for in HANA?",
    options: [
      "Speeding up numeric range queries",
      "Enabling efficient full-text search by mapping words to the rows containing them",
      "Encrypting text columns",
      "Replicating data across regions",
    ],
    correctIndex: 1,
    explanation: "An inverted index tokenizes text and maps each word to the rows containing it, enabling direct lookup for full-text search instead of scanning every row's content.",
  },
  {
    id: "hana-mcq14",
    topic: "Performance",
    prompt: "What does 'filter pushdown' mean in the context of an execution plan?",
    options: [
      "Applying a WHERE condition as early as possible, ideally at the initial scan",
      "Moving a filter into a separate microservice",
      "Deleting rows that don't match a filter",
      "Caching filtered results permanently",
    ],
    correctIndex: 0,
    explanation: "Filter pushdown means applying a condition as close to the data source as possible, so downstream joins/aggregations process fewer rows — its absence shows up as a filter appearing late in the plan.",
  },
  {
    id: "hana-mcq15",
    topic: "Replication",
    prompt: "What's the key difference between batch replication and change data capture (CDC) replication?",
    options: [
      "Batch replication is always faster",
      "Batch replication runs on a schedule (data can be stale); CDC streams changes continuously (near-real-time)",
      "CDC only works for row-store tables",
      "There is no real difference",
    ],
    correctIndex: 1,
    explanation: "Batch replication periodically copies data on a schedule, leaving a staleness gap; CDC continuously streams individual changes as they happen, keeping the target near-real-time.",
  },
  {
    id: "hana-mcq16",
    topic: "Backup",
    prompt: "What determines whether you can restore a HANA Cloud instance to a state from several weeks ago?",
    options: [
      "It's always possible regardless of how long ago",
      "Whether that point falls within the configured backup retention window",
      "The size of the database",
      "Whether the instance is in a production or dev environment",
    ],
    correctIndex: 1,
    explanation: "Point-in-time recovery is only possible within the configured retention window — a recovery request older than that window can't be fulfilled via standard backup/recovery.",
  },
];
