import type { BtpCodingQuestion } from "@/lib/btp-content";

export const abapEnvironmentTopicNotes: Record<string, string> = {
  ADT:
    "ADT (ABAP Development Tools) Eclipse-based hai aur ABAP Environment ke liye mandatory hai — yahan SAP GUI/SE80 access hi nahi hota. ADT se source editing, debugger, CDS aur RAP editors sab milte hain, backend se HTTP(S) pe connect hoke. ABAP Cloud (restricted language scope) sirf released APIs aur CDS-based data access allow karta hai — direct table SQL ya classic dynpros nahi — yahi 'clean core' philosophy hai ABAP language level pe.",
  Packages:
    "Package development objects (classes, CDS views) ko group karta hai aur visibility control karta hai — package-private (sirf andar use) vs API-released (bahar bhi use ho sakta hai). Software Component isse ek level upar hai — transport/versioning ka outer boundary, jisme multiple packages hote hain.",
  Transport:
    "ABAP Environment mein transport ka concept wahi hai — request banao, release karo, agle system mein import ho (Dev → QA → Prod). Tooling badal gayi hai — SE09/STMS ki jagah ADT ka transport perspective aur typically ek CI/CD pipeline through automated promotion.",
  CDS:
    "CDS (Core Data Services) view ek declarative, semantically rich data model hai — associations (relationships), calculated fields, aur annotations support karta hai. ABAP Cloud mein direct table access disallowed hai, isliye CDS hi primary data modeling tarika hai — RAP Business Objects, Service Definitions, OData services sab CDS pe based hote hain. Association sirf metadata hai (lazy) — actual join tabhi execute hota hai jab koi consumer usse follow kare (jaise OData `$expand`).",
  OData:
    "OData ek REST-based protocol hai standardized querying ke liye (`$filter`, `$orderby`, `$expand`, CRUD verbs). CDS view ko OData banane ka chain hai: CDS View → Service Definition (kaunse entities expose honge) → Service Binding (OData V2/V4 choose karke activate karna). `$expand` wahi cheez hai jo CDS association ka join actually trigger karta hai.",
  "Business Objects":
    "RAP Business Object ek CDS data model + Behavior Definition hai jisme actual business logic hoti hai — Validations (rule check, error raise, data nahi likhti), Determinations (value compute/set karti hain, error nahi deti), Actions (custom operations jaise 'approve'/'cancel'), aur save logic. CDS view akela sirf data shape describe karta hai — Behavior Definition hi ise real business entity banata hai.",
  RAP:
    "RAP (RESTful ABAP Programming Model) mein teen save variants hain: Managed (RAP khud persistence generate karta hai), Unmanaged (tum khud save logic likhte ho), aur Unmanaged + wrapped BAPI (existing legacy BAPI/function module ko save implementation ki tarah reuse karna, bina rewrite kiye). Actions custom named operations hote hain (jaise Approve) apne parameters ke saath, standard CRUD se alag.",
  "Service Definition":
    "Service Definition explicitly declare karta hai ki ek CDS view ke kaunse entities/associations, kis naam se, kisi specific service ke liye expose honge. Ye CDS view se alag isliye hai taaki wahi underlying data model multiple, differently-scoped services (jaise internal admin vs external) mein reuse ho sake, bina duplicate kiye.",
  "Service Binding":
    "Service Binding Service Definition ko actually ek live, callable service banata hai — OData V2 ya V4 protocol choose karke aur activate karke. V4 zyada capable hai, lekin V2 abhi bhi purane consumers ke compatibility ke liye zaroori hai. Ek Service Definition ko multiple Bindings mil sakti hain (V2 aur V4 dono).",
  Authorization:
    "RAP authorization checks Behavior Definition mein declaratively define hote hain (ek authorization object ke against), aur framework inhe consistently har entry point (UI, OData, API) pe enforce karta hai — classic scattered `AUTHORITY-CHECK` statements ki jagah jo kisi code path mein miss ho sakte the. Role/authorization object concept wahi rehta hai (BTP mein role collections ke through), lekin enforcement declarative aur zyada safe ho jaata hai.",
};

export const abapEnvironmentCodingQuestions: BtpCodingQuestion[] = [
  {
    id: "abap-env-cq1",
    topic: "CDS",
    language: "CDS",
    difficulty: "Intermediate",
    prompt: "Write a CDS association definition inside an entity that links to a child entity 'LineItems' by matching a shared 'OrderID' field, exposed as 'to_LineItems'.",
    solution: "association [0..*] to LineItems as _LineItems on $projection.OrderID = _LineItems.OrderID",
    explanation: "The `[0..*]` cardinality declares zero-or-more related line items; the association is purely metadata until a consumer follows the `_LineItems` path (e.g. via OData $expand), at which point the join actually executes.",
  },
  {
    id: "abap-env-cq2",
    topic: "Business Objects",
    language: "CDS",
    difficulty: "Advanced",
    prompt: "In a RAP Behavior Definition, declare a validation named 'validateQuantity' that runs on field 'Quantity' during the 'create' and 'update' operations.",
    solution: "validation validateQuantity on save { create; update; field Quantity; }",
    explanation: "This declares that validateQuantity's implementation class runs whenever Quantity is set during create or update, checking the rule and raising an error if violated — it never writes data itself.",
  },
];
