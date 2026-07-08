import type { BtpCodingQuestion, BtpLab } from "@/lib/btp-content";

export const hanaCloudTopicNotes: Record<string, string> = {
  Database:
    "HANA in-memory database hai — working dataset RAM mein primary copy ki tarah rehta hai (disk sirf persistence/durability ke liye), jisse I/O bottleneck khatam ho jaata hai. Columnar storage har column ko contiguously store karta hai — analytical queries sirf zaroori columns read karti hain, poori row nahi — better compression aur vectorized processing bhi milta hai. Tradeoff: pure single-row transactional lookups thoda kam efficient hote hain columnar mein.",
  "HDI Containers":
    "HDI (HANA Deployment Infrastructure) container ek isolated schema + controlled deployment lifecycle deta hai har app/tenant ko, ek shared HANA Cloud instance ke andar. Isi isolation ki wajah se multitenancy practical hai (har tenant ka apna HDI container) aur kai unrelated apps ek instance share kar sakte hain bina ek doosre ka schema affect kiye.",
  "Calculation Views":
    "Calculation View ek graphical, node-based data model hai (join, aggregation, projection nodes) jo HANA ek optimized, parallel execution plan mein compile karta hai — complex analytical modeling ke liye, plain SQL view (bas ek saved query) se zyada powerful. CDS views aksar Calculation Views ke upar build hote hain jab existing HANA-native models consume karni hon.",
  SQL:
    "Window functions (jaise `SUM(amount) OVER (PARTITION BY customer ORDER BY date)`) aggregate/rank compute karte hain per row, bina rows ko collapse kiye — GROUP BY ke ulta, jo ek row per group mein collapse kar deta hai. Running totals, rankings, moving averages jaise cases mein window functions use karo jaha detail aur aggregate dono chahiye.",
  Indexes:
    "HANA ke columnar tables mein compressed, in-memory column scans aksar itne fast hote hain ki traditional B-tree indexes utne critical nahi hote jitna row-based databases mein. Lekin HANA row-store tables aur specific patterns (jaise full-text search) ke liye explicit indexes bhi support karta hai — indexes irrelevant nahi hain, bas default mein kam central hote hain.",
  Performance:
    "Slow query diagnose karne ka pehla step hai execution plan generate/review karna (Database Explorer mein), guess karne ki jagah. Common causes: zaroorat se zyada columns select karna, Calculation View mein unnecessary joins, missing filter pushdown, ya bada intermediate result set final aggregation se pehle.",
  Replication:
    "Replication (SAP Smart Data Integration ya SLT specifically SAP sources ke liye) production source system se changes ko continuously HANA Cloud mein copy karta hai, taaki analytics/reporting ke liye ek fresh, isolated copy mile bina production system ki performance affect kiye.",
  Backup:
    "SAP HANA Cloud ke backups (savepoints + continuous log backups) automatically manage karta hai as part of managed service, point-in-time recovery deta hai configured retention window ke andar kisi bhi moment tak. Customer khud backup infrastructure manage nahi karta, lekin retention window aur recovery process samajhna zaroori hai apni DR planning ke liye.",
  "Database Explorer":
    "Database Explorer ek web-based tool hai HANA Cloud ke catalog browse karne, ad-hoc SQL chalane, execution plans visually dekhne, aur Calculation Views graphically build/edit karne ke liye — typically pehla tool jo tum kholte ho schema deployment verify karne ya data debug karne ke liye.",
};

export const hanaCloudCodingQuestions: BtpCodingQuestion[] = [
  {
    id: "hana-cq1",
    topic: "SQL",
    language: "SQL",
    difficulty: "Intermediate",
    prompt: "Write a SQL query using a window function to show each order's amount alongside a running total per customer, ordered by order date.",
    solution: "SELECT customer_id, order_date, amount,\n  SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total\nFROM orders;",
    explanation: "PARTITION BY resets the running total per customer, and ORDER BY within the OVER clause makes it cumulative by date — one row per order, each annotated with its running total.",
  },
  {
    id: "hana-cq2",
    topic: "SQL",
    language: "SQL",
    difficulty: "Advanced",
    prompt: "Write a query ranking customers by total order amount, showing only the top 3.",
    solution: "SELECT customer_id, total_amount FROM (\n  SELECT customer_id, SUM(amount) AS total_amount,\n    RANK() OVER (ORDER BY SUM(amount) DESC) AS rnk\n  FROM orders\n  GROUP BY customer_id\n) WHERE rnk <= 3;",
    explanation: "RANK() OVER (ORDER BY ...) assigns a rank to each aggregated customer total; wrapping it in a subquery lets you filter on the computed rank, since window functions can't be filtered directly in the same SELECT's WHERE clause.",
  },
];

export const hanaCloudLabs: BtpLab[] = [
  {
    id: "hana-lab1",
    sectionSlug: "hana-cloud",
    title: "Explore a Schema and Diagnose a Slow Query in Database Explorer",
    objective:
      "Get hands-on with Database Explorer: browse a deployed schema, run SQL, and use the execution plan viewer to diagnose a slow query.",
    architectureNote:
      "Database Explorer connects to your HANA Cloud instance (or a specific HDI container) over HTTPS, giving a browser-based view of the catalog and query tools.",
    steps: [
      { instruction: "Open Database Explorer and connect to your HANA Cloud instance." },
      { instruction: "Browse the catalog and find a deployed table from your CAP/RAP app." },
      { instruction: "Run a simple SELECT to confirm data exists.", command: "SELECT * FROM MY_SCHEMA.BOOKS LIMIT 10;" },
      { instruction: "Run a deliberately inefficient query selecting all columns with a join." },
      { instruction: "Open the execution plan viewer for that query and identify the most expensive operation." },
      { instruction: "Rewrite the query selecting only needed columns and compare the plan." },
    ],
    expectedOutput:
      "The execution plan viewer shows a clear breakdown of time/rows per operation, and the rewritten, narrower query shows a visibly cheaper plan than the original.",
    commonErrors: [
      {
        error: "Cannot see any tables in the catalog for your schema.",
        solution: "Confirm you're connected to the correct HDI container/schema — CAP/RAP deployments create tables inside a specific container, not a generic shared schema.",
      },
      {
        error: "Execution plan viewer shows a flat, hard-to-read plan.",
        solution: "Use the graphical plan view instead of the text view for complex queries — it visually highlights the most expensive nodes.",
      },
    ],
  },
];
