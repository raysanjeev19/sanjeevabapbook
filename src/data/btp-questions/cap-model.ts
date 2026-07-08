import type { BtpMcq, BtpQuestion } from "@/lib/btp-content";

/** Section 5 — CAP Model. Interview questions, full format. */
export const capModelQuestions: BtpQuestion[] = [
  {
    id: "cap-q1",
    topic: "Node.js CAP",
    prompt: "What is CAP (Cloud Application Programming Model), and why does SAP push it over hand-rolled REST APIs?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["cap", "overview"],
    estimatedMinutes: 3,
    expectedAnswer:
      "CAP is SAP's opinionated framework (Node.js or Java) for building business services from a CDS data model — it auto-generates OData/REST APIs, database schemas, and common cross-cutting concerns (auth, validation, multitenancy) from a declarative model, instead of you hand-writing boilerplate for each.",
    detailedAnswer:
      "Hand-rolling a REST API means manually writing routing, input validation, database queries, pagination, filtering, and auth checks for every endpoint — a lot of repetitive, error-prone boilerplate. CAP instead has you declare your data model and service exposure in CDS, and the framework generates a fully working OData service (with filtering, sorting, expand, CRUD) automatically, wires up a database schema from the same model, and provides built-in hooks for adding custom business logic only where it's actually needed. This lets a developer focus on business logic instead of REST plumbing, and keeps the service consistent with BTP's other CDS-based tooling (like ABAP Environment's RAP).",
    hindiExplanation:
      "Hand-rolled REST API banane ka matlab hai har endpoint ke liye manually routing, input validation, database queries, pagination, filtering, aur auth checks likhna — bahut sara repetitive, error-prone boilerplate. CAP mein tum apna data model aur service exposure CDS mein declare karte ho, aur framework automatically ek poori working OData service generate kar deta hai (filtering, sorting, expand, CRUD ke saath), usi model se database schema bhi wire kar deta hai, aur custom business logic add karne ke liye built-in hooks deta hai sirf wahan jaha genuinely zaroorat ho. Isse developer REST plumbing ki jagah business logic pe focus kar sakta hai.",
    interviewExplanation:
      "I'd say: 'CAP lets you declare a data model and service exposure in CDS, and it auto-generates a working OData service — filtering, sorting, CRUD, expand — plus the database schema, instead of hand-writing all that boilerplate. You only add custom code for the actual business logic, via well-defined hooks, keeping things consistent with BTP's broader CDS-based approach.'",
    diagramNote:
      "Two paths: 'Hand-rolled REST: manually write routing, validation, queries, auth for each endpoint' vs 'CAP: declare CDS model → framework auto-generates OData service + DB schema, add custom logic via hooks'.",
    diagramMermaid: `flowchart LR
    A["Hand-rolled REST"] --> B["Manually write routing,<br/>validation, queries, auth"]
    C["CAP"] --> D["Declare CDS model"]
    D --> E["Auto-generated OData service<br/>+ DB schema"]
    E --> F["Add custom logic via hooks"]`,
    realProjectExample:
      "A simple product-catalog service with full filtering, sorting, and pagination was working within an hour of writing the CDS model alone — no custom code at all until we needed a specific stock-check business rule, which we added as a single event handler.",
    interviewTip:
      "If asked to justify CAP over plain Express.js, the concrete answer is the auto-generated OData layer and DB schema from one model — not just 'it's SAP's framework so we use it'.",
    followupQuestions: [
      "What languages does CAP support?",
      "What does 'the framework auto-generates the service' actually mean technically?",
      "When would you still write custom code in a CAP project?",
    ],
    commonMistakes: [
      "Describing CAP as 'just a REST framework' without mentioning the CDS-driven auto-generation.",
      "Not knowing CAP generates both the service layer AND the database schema from one model.",
    ],
    importantPoints: [
      "CAP = CDS model → auto-generated OData/REST service + DB schema.",
      "Reduces boilerplate (routing, validation, CRUD, filtering) developers would otherwise hand-write.",
      "Custom business logic added via well-defined hooks, not by replacing the generated layer.",
    ],
    revisionNotes: "CAP = declare CDS model → auto-generated OData service + DB schema. Add custom logic via hooks, skip REST boilerplate.",
  },
  {
    id: "cap-q2",
    topic: "Node.js CAP",
    prompt: "What does `cds watch` do during CAP development?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["cap", "nodejs", "cli"],
    estimatedMinutes: 2,
    expectedAnswer:
      "`cds watch` starts the CAP service locally with live reload — it watches your CDS models and JavaScript handlers for changes and automatically restarts/recompiles, giving instant feedback while developing.",
    detailedAnswer:
      "During local development, running `cds watch` in a CAP Node.js project starts an in-memory (typically SQLite-backed) instance of your service, serving the generated OData endpoints immediately. Any change to a `.cds` model file or a custom handler `.js` file is detected automatically, triggering a reload without you manually stopping and restarting the server — a fast inner development loop, especially useful when iterating on data models where you want to immediately see the generated service's shape change.",
    hindiExplanation:
      "Local development ke dauraan, `cds watch` chalane se ek CAP Node.js project apne service ko locally start kar deta hai live reload ke saath — in-memory (typically SQLite-backed) instance mein, generated OData endpoints turant serve karte hue. Kisi bhi `.cds` model file ya custom handler `.js` file mein change automatically detect ho jaata hai, aur reload trigger ho jaata hai bina manually server stop/restart kiye — ek fast inner development loop, khaaskar useful jab data models pe iterate kar rahe ho aur turant dekhna ho ki generated service ka shape kaise change hua.",
    interviewExplanation:
      "I'd describe it as the dev inner loop: 'cds watch starts my service locally, typically with an in-memory SQLite database, and automatically reloads whenever I change a CDS model or a handler file — I never have to manually restart while iterating.'",
    diagramNote:
      "Loop: 'Edit .cds or .js file' → 'cds watch detects change' → 'Auto-reload' → 'See updated service immediately' → back to editing.",
    diagramMermaid: `flowchart LR
    A["Edit .cds or .js file"] --> B["cds watch detects change"]
    B --> C["Auto-reload"]
    C --> D["See updated service immediately"]
    D --> A`,
    realProjectExample:
      "While iterating on a new entity's fields, `cds watch` reflected each change in the auto-generated OData metadata within seconds, letting us test in the built-in service preview UI without any manual restart.",
    interviewTip:
      "Mentioning the in-memory SQLite default (vs a real HANA connection) shows you understand CAP's local dev experience is deliberately lightweight, separate from production persistence.",
    followupQuestions: [
      "What database does `cds watch` use by default if none is configured?",
      "How would you point `cds watch` at a real HANA instance instead?",
      "What's the difference between `cds watch` and `cds run` for production?",
    ],
    commonMistakes: [
      "Thinking `cds watch` is meant for production use (it's a dev-time convenience tool).",
      "Not knowing it defaults to an in-memory database unless configured otherwise.",
    ],
    importantPoints: [
      "`cds watch` = local dev server with live reload.",
      "Defaults to an in-memory (SQLite) database unless configured.",
      "Watches both CDS models and JS handler files for changes.",
    ],
    revisionNotes: "`cds watch` = local dev server, auto-reloads on CDS/JS changes, defaults to in-memory SQLite for fast iteration.",
  },
  {
    id: "cap-q3",
    topic: "Java CAP",
    prompt: "How does the Java flavor of CAP differ from the Node.js flavor, and when would you choose it?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["cap", "java"],
    estimatedMinutes: 3,
    expectedAnswer:
      "CAP Java is built on Spring Boot, following the same CDS-driven model but with Java-idiomatic event handlers and configuration; teams choose it when they have existing Java/Spring expertise, need to integrate with Java-only libraries, or are extending an existing Java-based system.",
    detailedAnswer:
      "Both flavors share the exact same core concept: model your data and services in CDS, get an auto-generated OData service, and add custom logic via event handlers. CAP Java implements this on top of Spring Boot, so handlers are Java classes/methods annotated appropriately, configuration follows Spring conventions (`application.yaml`), and you get access to the entire Java/Spring ecosystem (libraries, Spring Data, existing enterprise Java patterns). Teams with deep Java expertise, existing Java codebases to integrate with, or specific Java-only dependencies typically choose CAP Java, while teams starting fresh or with JavaScript/TypeScript backgrounds often default to CAP Node.js for its faster iteration cycle and simpler tooling.",
    hindiExplanation:
      "Dono flavors same core concept share karte hain: apna data aur services CDS mein model karo, auto-generated OData service pao, aur custom logic event handlers ke through add karo. CAP Java isse Spring Boot ke upar implement karta hai, isliye handlers Java classes/methods hote hain properly annotated, configuration Spring conventions follow karti hai (`application.yaml`), aur tumhe poora Java/Spring ecosystem milta hai. Deep Java expertise wali teams, existing Java codebases se integrate karni ho, ya specific Java-only dependencies chahiye ho — typically CAP Java choose karti hain, jabki fresh start karne wali ya JavaScript/TypeScript background wali teams aksar CAP Node.js default choose karti hain uski faster iteration cycle ke liye.",
    interviewExplanation:
      "I'd give the decision criteria directly: 'Both share the same CDS-driven model. CAP Java runs on Spring Boot with Java-idiomatic handlers and Spring configuration, giving access to the whole Java ecosystem. Teams with deep Java/Spring expertise or existing Java systems to integrate with typically choose it; teams starting fresh often prefer CAP Node.js for its lighter, faster iteration.'",
    diagramNote:
      "Both flavors branching from 'CDS Model' at the top: 'CAP Node.js (Express-based, JS handlers)' and 'CAP Java (Spring Boot-based, Java handlers)', converging back to 'Auto-generated OData service'.",
    diagramMermaid: `flowchart TD
    CDS["CDS Model"] --> NODE["CAP Node.js<br/>Express-based, JS handlers"]
    CDS --> JAVA["CAP Java<br/>Spring Boot-based, Java handlers"]
    NODE --> ODATA["Auto-generated OData service"]
    JAVA --> ODATA`,
    realProjectExample:
      "A team extending an existing large Spring Boot enterprise system chose CAP Java specifically to integrate cleanly with their existing Spring-based authentication and logging infrastructure, rather than introducing a separate Node.js runtime.",
    interviewTip:
      "If asked 'which one is better', the correct answer is neither is universally better — it depends on team expertise and existing system integration needs, not a technical superiority of one over the other.",
    followupQuestions: [
      "What Java framework does CAP Java build on?",
      "Can you migrate a CAP project from Node.js to Java later?",
      "Do both flavors generate the exact same OData service from the same CDS model?",
    ],
    commonMistakes: [
      "Claiming one flavor is objectively better rather than a fit-for-team-context decision.",
      "Not knowing CAP Java is built on Spring Boot specifically.",
    ],
    importantPoints: [
      "Both flavors share the same CDS-driven model and generated OData service.",
      "CAP Java is Spring Boot-based; CAP Node.js is Express-based.",
      "Choice depends on team expertise and existing system integration, not technical superiority.",
    ],
    revisionNotes: "CAP Java = Spring Boot-based, same CDS model as Node.js. Choose based on team expertise/existing Java systems, not 'which is better'.",
  },
  {
    id: "cap-q4",
    topic: "CDS",
    prompt: "In a CAP project, what's the difference between the CDS model in `db/` versus the service definitions in `srv/`?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["cds", "project-structure"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The `db/` folder holds the persistence data model (entities that map to database tables); the `srv/` folder holds service definitions that expose (and often project/reshape) that data model as actual OData/REST services — separating 'what's stored' from 'what's exposed'.",
    detailedAnswer:
      "This separation mirrors good architectural practice: your underlying data model shouldn't necessarily be exposed as-is to every consumer. In `db/`, you define entities as they'll be persisted (fields, keys, associations). In `srv/`, you define one or more services that project entities from `db/` — potentially renaming fields, hiding sensitive ones, adding calculated fields, or combining multiple entities differently — tailored to what a specific consumer (a UI, an external partner, another microservice) should actually see. This means the same underlying data can back multiple, differently-shaped services without duplicating storage.",
    hindiExplanation:
      "Ye separation achhe architectural practice ko mirror karta hai: tumhara underlying data model har consumer ko as-is expose hona zaroori nahi hai. `db/` mein tum entities define karte ho jaise wo persist hongi (fields, keys, associations). `srv/` mein tum ek ya zyada services define karte ho jo `db/` se entities project karti hain — potentially fields rename karke, sensitive ones hide karke, calculated fields add karke, ya multiple entities ko alag tarike se combine karke — jo bhi specific consumer (UI, external partner, doosri microservice) ko actually dekhna chahiye uske hisaab se. Isse wahi underlying data multiple, differently-shaped services ko back kar sakta hai bina storage duplicate kiye.",
    interviewExplanation:
      "I'd explain the architectural intent: 'db/ defines the persistence model — how data is actually stored. srv/ defines services that project that model for specific consumers — potentially reshaping, renaming, or hiding fields. That separation lets the same stored data back multiple, differently-shaped services without duplicating storage.'",
    diagramNote:
      "`db/` (persistence entities) at the base, with two different `srv/` services projecting from it differently: 'Admin Service (full fields)' and 'Public Service (limited, renamed fields)'.",
    diagramMermaid: `flowchart TD
    DB["db/ — persistence entities"] --> S1["srv/ — Admin Service<br/>full fields"]
    DB --> S2["srv/ — Public Service<br/>limited, renamed fields"]`,
    realProjectExample:
      "Our `db/` model stored full customer records including internal risk scores, while `srv/` exposed an external-facing service that projected only name and contact fields, and a separate internal service exposing everything — both from the same underlying persistence model.",
    interviewTip:
      "If asked 'should you just expose your db/ entities directly', the correct nuanced answer is you can for simple cases, but srv/ projections give you deliberate control over what's actually exposed — a stronger, security-aware answer.",
    followupQuestions: [
      "How would you hide a sensitive field in a srv/ projection?",
      "Can one srv/ service combine fields from multiple db/ entities?",
      "What happens if you expose a db/ entity directly without any projection?",
    ],
    commonMistakes: [
      "Assuming db/ and srv/ definitions must always be identical.",
      "Not knowing srv/ projections can rename, hide, or recombine fields from db/.",
    ],
    importantPoints: [
      "db/ = persistence data model (how data is stored).",
      "srv/ = service definitions projecting that model for consumers.",
      "Same stored data can back multiple, differently-shaped services.",
    ],
    revisionNotes: "db/ = storage model. srv/ = exposed service(s) projecting/reshaping that model per consumer — same data, multiple shapes.",
  },
  {
    id: "cap-q5",
    topic: "Entities",
    prompt: "What is a CDS entity, and what's the significance of the `key` keyword on a field?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["entities", "cds"],
    estimatedMinutes: 2,
    expectedAnswer:
      "An entity is CDS's term for a structured data type with fields, roughly equivalent to a database table or a domain object; the `key` keyword marks which field(s) uniquely identify each record, which CAP uses to generate the correct database primary key and OData entity-key semantics.",
    detailedAnswer:
      "An entity declaration lists fields with types (`String`, `Integer`, `UUID`, associations to other entities, etc.), and one or more fields marked `key` — these become the primary key in the generated database table and determine how a specific record is addressed in the generated OData service (e.g. `/Orders(1)` uses the key value in the URL path). Without a key, CAP can't generate proper single-record read/update/delete operations, since there'd be no unique way to address one instance. Most CAP projects use a generated `UUID` key by convention (via a reusable aspect) rather than a natural business key, to avoid key-value collisions and keep keys stable even if business data changes.",
    hindiExplanation:
      "Entity declaration fields list karti hai types ke saath (`String`, `Integer`, `UUID`, associations), aur ek ya zyada fields `key` marked hote hain — ye generated database table mein primary key ban jaate hain, aur decide karte hain ki generated OData service mein ek specific record kaise address hota hai (jaise `/Orders(1)` URL path mein key value use karta hai). Key ke bina, CAP proper single-record read/update/delete operations generate nahi kar sakta, kyunki ek instance ko address karne ka koi unique tarika hi nahi hoga. Zyada tar CAP projects convention se ek generated `UUID` key use karte hain (ek reusable aspect ke through) natural business key ki jagah, taaki key-value collisions avoid ho aur keys stable rahein.",
    interviewExplanation:
      "I'd define both parts: 'An entity is CDS's structured data type, roughly like a table or domain object. The key keyword marks which field uniquely identifies a record — CAP uses that to generate the DB primary key and determine how a single record is addressed in OData, like /Orders(1). Most projects use a generated UUID key rather than a natural business key, for stability.'",
    diagramNote:
      "Entity 'Orders' with fields: 'ID (key): UUID', 'OrderDate: Date', 'Total: Decimal' — with an arrow showing '/Orders(<ID value>)' as the generated OData single-record URL.",
    diagramMermaid: `flowchart LR
    E["entity Orders {<br/>key ID: UUID;<br/>OrderDate: Date;<br/>Total: Decimal;<br/>}"] --> URL["/Orders(&lt;ID value&gt;)<br/>generated OData URL"]`,
    realProjectExample:
      "Switching an entity's key from a natural business field (order number) to a generated UUID avoided a real collision bug when two disconnected systems occasionally generated the same order number independently.",
    interviewTip:
      "If asked why UUID keys are preferred over natural keys, mention collision-avoidance and stability — a natural key like 'order number' might need to change or could collide across systems, a generated UUID never does.",
    followupQuestions: [
      "Can an entity have a composite key (multiple key fields)?",
      "What's the reusable 'cuid' aspect in CAP and what does it provide?",
      "What happens in the generated OData service if an entity has no key?",
    ],
    commonMistakes: [
      "Forgetting to mark a field as `key`, leaving CAP unable to generate proper single-record operations.",
      "Defaulting to a natural business key without considering collision/stability risks.",
    ],
    importantPoints: [
      "Entity = structured data type (fields, types, associations).",
      "`key` marks the field(s) uniquely identifying a record.",
      "Most CAP projects use a generated UUID key (via a reusable aspect) over a natural key.",
    ],
    revisionNotes: "Entity = CDS structured type. `key` = unique identifier field, drives DB primary key + OData addressing. UUID keys preferred over natural keys.",
  },
  {
    id: "cap-q6",
    topic: "Associations",
    prompt: "How do you model a one-to-many relationship in CAP CDS?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["associations", "cds"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Declare an association with `[0..*]` cardinality on the 'many' side entity, pointing back to the 'one' side, typically with an `on` condition matching a foreign-key-like field — the same lazy-association concept used throughout CDS (ABAP Environment or CAP).",
    detailedAnswer:
      "For an Order having many LineItems, you'd declare on the LineItems entity an association like `order: Association to Orders;` (many-to-one, implicit `[1]` or `[0..1]` cardinality by default), and optionally the reverse on Orders: `items: Association to many LineItems on items.order = $self;` for convenient navigation from the 'one' side. Like all CDS associations, this is metadata describing the relationship — the actual join only executes when a consumer follows the association path, such as an OData `$expand=items` request.",
    hindiExplanation:
      "Order ke kai LineItems hone ke liye, tum LineItems entity pe ek association declare karoge jaise `order: Association to Orders;` (many-to-one, default `[1]` ya `[0..1]` cardinality), aur optionally Orders pe reverse bhi: `items: Association to many LineItems on items.order = $self;` taaki 'one' side se convenient navigation ho sake. Baaki sab CDS associations ki tarah, ye bhi metadata hai relationship describe karta — actual join tabhi execute hota hai jab koi consumer us association path ko follow kare, jaise OData `$expand=items` request.",
    interviewExplanation:
      "I'd give the concrete syntax: 'On the many side — LineItems — I'd declare order: Association to Orders. Optionally, on Orders, the reverse: items: Association to many LineItems on items.order = $self, for easy navigation from the one side. Same as any CDS association, it's lazy metadata until a consumer follows it, like via $expand=items.'",
    diagramNote:
      "Orders entity with 'items: Association to many LineItems' pointing to LineItems entity, which has 'order: Association to Orders' pointing back — bidirectional navigation, both lazy until followed.",
    diagramMermaid: `flowchart LR
    O["Orders"] -- "items: Association to many" --> L["LineItems"]
    L -- "order: Association to" --> O`,
    realProjectExample:
      "Modeling Orders-to-LineItems this way let the Fiori list report expand line items inline via a single $expand call, without any custom backend code — the association declaration alone was enough.",
    interviewTip:
      "Mentioning the `$self` keyword for the reverse-navigation association shows precise syntax knowledge beyond a vague 'you just declare a relationship'.",
    followupQuestions: [
      "How would you model a many-to-many relationship in CDS?",
      "What does the `on` condition in an association actually specify?",
      "Is a bidirectional association (both sides declared) mandatory?",
    ],
    commonMistakes: [
      "Only declaring the association on one side when bidirectional navigation is actually needed.",
      "Not knowing the join is lazy — assuming declaring the association alone executes a join.",
    ],
    importantPoints: [
      "Many side: `Association to <One entity>`.",
      "One side (optional, for convenience): `Association to many <Many entity> on ... = $self`.",
      "Still lazy metadata — join executes only when followed (e.g. via $expand).",
    ],
    revisionNotes: "One-to-many: many side declares `Association to <one entity>`; one side optionally declares `Association to many ... on ... = $self` for reverse navigation.",
  },
  {
    id: "cap-q7",
    topic: "Compositions",
    prompt: "What's the difference between a CDS 'composition' and an 'association'?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["compositions", "associations"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A composition expresses ownership — the child entity's lifecycle is tied to the parent's (deleting the parent deletes its composed children); an association is a plain reference relationship with no implied ownership or lifecycle dependency.",
    detailedAnswer:
      "When Orders 'has' LineItems in a true ownership sense — line items don't exist independently and should be deleted if the order is deleted — you model that as a composition (`composition of many LineItems as items`), not a plain association. CAP's runtime understands this semantic: deep inserts/updates/deletes through a composition automatically cascade to the composed children (creating/updating/deleting them as part of the parent operation), and a composed child typically doesn't make sense to expose or query independently outside its parent's context. A plain association, by contrast, is just a reference — like an Order referencing a Customer — where deleting the Order absolutely should not delete the Customer.",
    hindiExplanation:
      "Jab Orders 'has' LineItems ek true ownership sense mein — line items independently exist nahi karte aur order delete hone pe delete ho jaane chahiye — tum use composition ki tarah model karte ho (`composition of many LineItems as items`), plain association nahi. CAP ka runtime is semantic ko samajhta hai — composition ke through deep inserts/updates/deletes automatically composed children tak cascade ho jaate hain (create/update/delete parent operation ke hisse ki tarah). Plain association iske ulta sirf ek reference hai — jaise Order ka Customer ko reference karna — jaha Order delete hone se Customer delete nahi hona chahiye.",
    interviewExplanation:
      "I'd give the ownership test directly: 'Composition means true ownership — the child's lifecycle is tied to the parent, so deleting the parent cascades to delete the children, and CAP's deep insert/update/delete handles that automatically. Association is just a reference with no lifecycle dependency — like Order referencing Customer, where deleting the Order should never delete the Customer.'",
    diagramNote:
      "Composition: 'Orders --composition--> LineItems' with a note 'delete Order → cascades delete to LineItems'. Association: 'Orders --association--> Customer' with a note 'delete Order → Customer unaffected'.",
    diagramMermaid: `flowchart LR
    O1["Orders"] -- "composition" --> L["LineItems"]
    O1 -.-> N1["delete Order → cascades to LineItems"]
    O2["Orders"] -- "association" --> C["Customer"]
    O2 -.-> N2["delete Order → Customer unaffected"]`,
    realProjectExample:
      "Modeling LineItems as a composition of Orders meant a single deep-insert API call could create an order and all its line items atomically in one request — versus Customer, correctly modeled as an association, which was never touched by order create/delete operations.",
    interviewTip:
      "The 'ownership/lifecycle' framing is the exact technical distinction interviewers want — saying 'they're both just relationships' misses the entire point of the question.",
    followupQuestions: [
      "What is a 'deep insert' and how does composition enable it?",
      "Can a composed entity be queried independently of its parent?",
      "What happens if you delete a parent entity that has composed children?",
    ],
    commonMistakes: [
      "Using an association where a composition is semantically correct (or vice versa).",
      "Not knowing composition enables automatic cascading deep insert/update/delete.",
    ],
    importantPoints: [
      "Composition = ownership, lifecycle tied to parent, cascading deep operations.",
      "Association = plain reference, no lifecycle dependency.",
      "Choosing correctly affects whether deep insert/delete cascades automatically.",
    ],
    revisionNotes: "Composition = ownership (lifecycle tied, cascades on delete, enables deep insert). Association = plain reference, no lifecycle tie.",
  },
  {
    id: "cap-q8",
    topic: "Actions",
    prompt: "How do you define a custom action in a CAP service, and how does it differ from a function?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["actions", "functions"],
    estimatedMinutes: 2,
    expectedAnswer:
      "An action is a service operation that can have side effects (changes data), declared with `action`; a function is read-only and side-effect-free, declared with `function` — both take typed parameters and can return a typed result, but OData maps them to POST vs GET respectively.",
    detailedAnswer:
      "You'd declare `action submitOrder(orderID: UUID) returns Orders;` for an operation that actually changes state (like transitioning an order to submitted status), and `function calculateShippingCost(orderID: UUID) returns Decimal;` for a pure calculation with no side effects. This distinction matters beyond semantics: OData exposes actions via HTTP POST (since they can mutate data, caching/idempotency assumptions don't apply) and functions via HTTP GET (safe to cache, safe to call repeatedly with no side effects) — following the same REST/HTTP semantic conventions the rest of CAP's generated API follows.",
    hindiExplanation:
      "Tum `action submitOrder(orderID: UUID) returns Orders;` declare karoge ek aisi operation ke liye jo actually state change karti hai (jaise order ko submitted status mein transition karna), aur `function calculateShippingCost(orderID: UUID) returns Decimal;` ek pure calculation ke liye jisme koi side effects nahi hote. Ye distinction semantics se aage bhi matter karti hai — OData actions ko HTTP POST se expose karta hai (kyunki wo data mutate kar sakte hain), aur functions ko HTTP GET se (safe hai cache karna, baar-baar call karna kyunki koi side effect nahi) — CAP ke generated API ke baaki REST/HTTP semantic conventions ko follow karte hue.",
    interviewExplanation:
      "I'd give both the syntax and the HTTP mapping: 'An action, declared with the action keyword, can have side effects — like submitting an order — and OData exposes it via POST. A function, declared with function, is read-only and side-effect-free — like calculating shipping cost — and gets exposed via GET, since it's safe to cache or call repeatedly.'",
    diagramNote:
      "Two declarations: 'action submitOrder(...) returns Orders → HTTP POST (has side effects)' vs 'function calculateShippingCost(...) returns Decimal → HTTP GET (read-only, no side effects)'.",
    diagramMermaid: `flowchart LR
    A["action submitOrder(...)"] --> B["HTTP POST<br/>has side effects"]
    C["function calculateShippingCost(...)"] --> D["HTTP GET<br/>read-only, no side effects"]`,
    realProjectExample:
      "A 'submitOrder' action transitioned state and triggered downstream notifications, while a separate 'previewShippingCost' function let the UI safely re-call it repeatedly as the user adjusted quantities, with zero risk of unintended side effects.",
    interviewTip:
      "If asked to model a 'preview' or 'calculate' operation, always reach for `function`, not `action` — the read-only, side-effect-free semantics matter for correct API design, not just naming convention.",
    followupQuestions: [
      "Can an action or function be bound to a specific entity instance rather than the whole service?",
      "What HTTP verb does OData use for a function versus an action?",
      "Can a function have side effects if you're careful?",
    ],
    commonMistakes: [
      "Using `action` for a pure calculation that should be a side-effect-free `function`.",
      "Not knowing the OData HTTP verb mapping (POST for actions, GET for functions).",
    ],
    importantPoints: [
      "Action = can have side effects, exposed via HTTP POST.",
      "Function = read-only, no side effects, exposed via HTTP GET.",
      "Choice affects caching/idempotency semantics in the generated API.",
    ],
    revisionNotes: "Action = side effects, POST. Function = read-only, no side effects, GET. Choose based on whether the operation mutates data.",
  },
  {
    id: "cap-q9",
    topic: "Authentication",
    prompt: "How does a CAP service authenticate incoming requests on BTP?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["authentication", "xsuaa"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A CAP service binds to an XSUAA service instance, which validates the OAuth 2.0 JWT bearer token on every incoming request (checking signature, expiry, and issuer) before the request even reaches your handler code — authentication is handled by the platform/framework, not custom code.",
    detailedAnswer:
      "Once you bind an XSUAA instance to your CAP app (declared as a `resource` in `mta.yaml` or bound via `cf bind-service`), CAP's built-in authentication middleware automatically validates the `Authorization: Bearer <token>` header on incoming requests against XSUAA's configuration — checking the JWT signature, expiry, and that scopes/roles match what's required. If the token is missing or invalid, the request is rejected before your business logic runs at all; if valid, the authenticated user's identity and scopes become available in the request context (`req.user` in Node.js) for use in authorization checks or business logic.",
    hindiExplanation:
      "Ek baar XSUAA instance ko apne CAP app se bind karne ke baad (`mta.yaml` mein `resource` ki tarah declare kiya ya `cf bind-service` se bind kiya), CAP ka built-in authentication middleware automatically incoming requests ke `Authorization: Bearer <token>` header ko XSUAA ke configuration ke against validate karta hai — JWT signature, expiry, aur scopes/roles match check karta hai. Agar token missing ya invalid hai, request reject ho jaati hai tumhari business logic chalne se pehle hi; agar valid hai, authenticated user ki identity aur scopes request context mein available ho jaate hain (`req.user` Node.js mein) authorization checks ya business logic ke liye use karne ke liye.",
    interviewExplanation:
      "I'd explain the flow: 'Once XSUAA is bound to the CAP app, its built-in middleware validates the bearer token automatically — signature, expiry, scopes — before any of my handler code runs. If invalid, the request is rejected upfront; if valid, I get the authenticated user's identity and scopes in req.user to use for authorization or business logic.'",
    diagramNote:
      "Flow: 'Incoming request with Bearer token' → 'CAP auth middleware validates against XSUAA (signature, expiry, scopes)' → branches: 'Invalid → 401 rejected' or 'Valid → req.user populated → handler runs'.",
    diagramMermaid: `flowchart TD
    A["Incoming request<br/>Bearer token"] --> B["CAP auth middleware<br/>validates against XSUAA"]
    B -- Invalid --> C["401 rejected"]
    B -- Valid --> D["req.user populated<br/>handler runs"]`,
    realProjectExample:
      "Binding an XSUAA instance and adding a scope requirement annotation on our service was all it took to reject unauthenticated requests automatically — we never wrote a single line of token validation code ourselves.",
    interviewTip:
      "If asked 'how do you validate JWT tokens in CAP', the correct answer is you generally don't write that code yourself — CAP's framework and the bound XSUAA service handle it automatically once configured.",
    followupQuestions: [
      "What does req.user contain after successful authentication?",
      "How would you configure required scopes for a CAP service?",
      "What happens if the XSUAA service isn't bound at all?",
    ],
    commonMistakes: [
      "Thinking you need to manually write JWT validation logic in CAP.",
      "Not knowing authentication happens before handler code runs, via middleware.",
    ],
    importantPoints: [
      "XSUAA binding + CAP's built-in middleware handles bearer token validation automatically.",
      "Invalid/missing tokens are rejected before handler code runs.",
      "Authenticated user identity/scopes available via req.user for further use.",
    ],
    revisionNotes: "CAP auth = XSUAA-bound, framework validates JWT automatically (signature/expiry/scopes) before handlers run — you don't write this yourself.",
  },
  {
    id: "cap-q10",
    topic: "Authorization",
    prompt: "How would you restrict a CAP entity so only users with a specific role can update it?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["authorization", "restrict"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Use CDS's `@restrict` annotation (or the simpler `@requires`) on the entity or service, declaring which operations require which role — CAP's framework enforces this automatically for every request, based on the roles present in the validated XSUAA token.",
    detailedAnswer:
      "Where authentication answers 'who is this user', authorization answers 'what are they allowed to do' — and in CAP, this is declared, not hand-coded. An annotation like `@restrict: [{ grant: 'UPDATE', to: 'Admin' }]` on an entity means only requests from users whose token includes the 'Admin' role (as defined via an XSUAA role template and assigned through a role collection) can perform update operations; other operations (read, create) can have separate rules or remain unrestricted. The role names referenced here map back to role templates defined in the app's XSUAA security descriptor (`xs-security.json`), which are then assigned to actual users via BTP role collections.",
    hindiExplanation:
      "Authentication ka jawab hai 'ye user kaun hai', authorization ka jawab hai 'ye kya karne ki permission rakhte hain' — aur CAP mein, ye declare kiya jaata hai, hand-coded nahi. `@restrict: [{ grant: 'UPDATE', to: 'Admin' }]` jaisi annotation ek entity pe ye matlab rakhti hai ki sirf un users ki requests jinke token mein 'Admin' role hai (XSUAA role template se define hua aur role collection ke through assign hua), wo update operations kar sakte hain. Yahan reference kiye gaye role names app ke XSUAA security descriptor (`xs-security.json`) mein defined role templates se map hote hain, jo fir BTP role collections ke through actual users ko assign kiye jaate hain.",
    interviewExplanation:
      "I'd give the annotation directly with its meaning: 'I'd add @restrict: [{ grant: \"UPDATE\", to: \"Admin\" }] on the entity — CAP's framework enforces that automatically based on roles in the validated token. That role name maps back to a role template in xs-security.json, ultimately assigned to real users via a BTP role collection.'",
    diagramNote:
      "Flow: 'xs-security.json declares role template' → 'BTP role collection assigns it to a user' → 'User's token includes the role' → '@restrict annotation on entity checks for that role' → 'Allow or deny UPDATE'.",
    diagramMermaid: `flowchart LR
    A["xs-security.json<br/>declares role template"] --> B["BTP role collection<br/>assigns to user"]
    B --> C["User's token includes role"]
    C --> D["@restrict annotation checks role"]
    D --> E["Allow / deny UPDATE"]`,
    realProjectExample:
      "Adding `@restrict: [{ grant: ['CREATE','UPDATE','DELETE'], to: 'Admin' }, { grant: 'READ', to: 'any' }]` on our Orders entity let any authenticated user read orders while restricting all mutations to Admin-role users, with zero custom authorization code.",
    interviewTip:
      "Mentioning the full chain — xs-security.json role template → role collection → token → @restrict check — shows you understand the entire authorization pipeline, not just the annotation syntax in isolation.",
    followupQuestions: [
      "What's the difference between `@restrict` and the simpler `@requires` annotation?",
      "Where are role templates actually defined for a CAP app?",
      "Can authorization rules differ per CRUD operation on the same entity?",
    ],
    commonMistakes: [
      "Writing manual role-checking code instead of using declarative @restrict annotations.",
      "Not knowing role names in @restrict map back to xs-security.json role templates.",
    ],
    importantPoints: [
      "`@restrict` (or `@requires`) declares role-based access control per operation.",
      "Enforced automatically by CAP's framework, not hand-coded.",
      "Role names map to xs-security.json templates, assigned via BTP role collections.",
    ],
    revisionNotes: "CAP authorization = `@restrict`/`@requires` annotations (declarative), enforced automatically. Roles map to xs-security.json → role collections.",
  },
  {
    id: "cap-q11",
    topic: "Draft",
    prompt: "What is CAP's 'draft' capability, and what problem does it solve for Fiori apps?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["draft", "fiori"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Draft handling lets a user create or edit an entity incrementally without affecting the 'active' committed version until they explicitly save — CAP auto-generates a shadow draft table and the OData draft protocol operations (new/edit/save/discard) for any entity annotated `@odata.draft.enabled`.",
    detailedAnswer:
      "Without draft support, every field change in a Fiori edit form would need to be saved immediately (or held only in the browser, lost on refresh) — neither is a great UX for multi-step or multi-session editing. Draft handling solves this: annotating an entity with `@odata.draft.enabled` makes CAP generate a parallel 'draft' version of that entity's table, and implements the OData draft protocol's standard actions (`draftEdit`, `draftActivate`, `draftDiscard`) automatically — a user can start editing, have their in-progress changes persisted server-side as a draft (recoverable even after closing the browser), and only when they explicitly 'save' does the draft get merged into the real, active record. Fiori Elements UIs are built to consume this protocol natively, so enabling draft on the backend is often the only change needed to get a full draft-editing UX in the UI.",
    hindiExplanation:
      "Draft support ke bina, Fiori edit form mein har field change turant save karna padta (ya sirf browser mein hold hota, refresh pe lost ho jaata) — dono hi multi-step ya multi-session editing ke liye achha UX nahi hai. Draft handling ye solve karta hai: ek entity ko `@odata.draft.enabled` se annotate karne se CAP us entity ke table ka ek parallel 'draft' version generate kar deta hai, aur OData draft protocol ke standard actions (`draftEdit`, `draftActivate`, `draftDiscard`) automatically implement kar deta hai — user editing start kar sakta hai, unke in-progress changes server-side draft ki tarah persist ho jaate hain (browser band karne ke baad bhi recoverable), aur sirf jab wo explicitly 'save' karte hain tabhi draft real, active record mein merge hota hai. Fiori Elements UIs is protocol ko natively consume karne ke liye bani hoti hain.",
    interviewExplanation:
      "I'd explain the UX problem and the solution: 'Without draft support, edits either save immediately or are only held client-side and lost on refresh. Annotating an entity @odata.draft.enabled makes CAP generate a parallel draft table and implement the standard OData draft actions — edit, activate (save), discard — automatically. In-progress changes persist server-side as a recoverable draft, and only merge into the real record on explicit save. Fiori Elements consumes this protocol natively, so it's often the only backend change needed.'",
    diagramNote:
      "Flow: 'User starts editing' → 'Draft table (in-progress, separate from active record)' → user either 'draftActivate (save) → merges into active record' or 'draftDiscard → draft deleted, active record untouched'.",
    diagramMermaid: `flowchart TD
    A["User starts editing"] --> B["Draft table<br/>in-progress, separate from active"]
    B --> C["draftActivate (save)<br/>merges into active record"]
    B --> D["draftDiscard<br/>draft deleted, active untouched"]`,
    realProjectExample:
      "Enabling `@odata.draft.enabled` on our order-entry entity gave us a full draft-save-resume editing experience in the Fiori Elements app for free — no custom frontend or backend code beyond the single annotation.",
    interviewTip:
      "If asked 'how would you implement save-as-you-go editing', naming CAP's built-in draft capability (rather than proposing to hand-build it) shows awareness of a major framework feature most custom implementations would badly reinvent.",
    followupQuestions: [
      "What are the standard draft actions CAP generates?",
      "What happens to a draft if the user never activates or discards it?",
      "Does draft handling work the same way for both CAP Node.js and Java?",
    ],
    commonMistakes: [
      "Proposing to hand-build save-as-you-go editing instead of using CAP's built-in draft support.",
      "Not knowing draft changes live in a separate shadow table until explicitly activated.",
    ],
    importantPoints: [
      "`@odata.draft.enabled` auto-generates a draft table + standard draft protocol actions.",
      "In-progress edits are recoverable server-side, separate from the active record.",
      "Fiori Elements consumes this protocol natively — minimal extra work needed.",
    ],
    revisionNotes: "Draft = `@odata.draft.enabled` auto-generates shadow draft table + edit/activate/discard actions — recoverable in-progress edits, native Fiori Elements support.",
  },
  {
    id: "cap-q12",
    topic: "Multitenancy",
    prompt: "How does a CAP application support multitenancy, and what happens when a new tenant subscribes?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["multitenancy", "saas"],
    estimatedMinutes: 3,
    expectedAnswer:
      "CAP's multitenancy support (via the `@sap/cds-mtxs` package) gives each subscribed tenant an isolated HDI container for their data while sharing one deployed application instance; when a tenant subscribes (through SaaS Provisioning), CAP's provisioning handler automatically creates and initializes that tenant's dedicated database container.",
    detailedAnswer:
      "Building a real SaaS product on CAP means one application deployment serving many customers (tenants), each needing their data fully isolated from others while sharing the exact same application code. CAP's multitenancy library hooks into BTP's SaaS Provisioning service — when a new subscriber signs up, a provisioning callback fires, and CAP automatically creates a dedicated HDI container for that tenant, deploys the current database schema into it, and from then on, every incoming request is automatically routed to the correct tenant's container based on the tenant identifier in their authenticated token — all without the application's business logic code needing any tenant-awareness itself.",
    hindiExplanation:
      "Real SaaS product CAP pe banane ka matlab hai ek application deployment jo kai customers (tenants) ko serve kare, har ek ka data doosron se fully isolated rahe jabki exact same application code share ho. CAP ki multitenancy library BTP ke SaaS Provisioning service se hook hoti hai — jab koi naya subscriber sign up karta hai, ek provisioning callback fire hota hai, aur CAP automatically us tenant ke liye ek dedicated HDI container create karta hai, current database schema wahan deploy karta hai, aur usi waqt se, har incoming request automatically sahi tenant ke container tak route ho jaati hai unke authenticated token mein tenant identifier ke aadhar pe — application ki business logic code ko khud tenant-aware hone ki zaroorat nahi.",
    interviewExplanation:
      "I'd explain the mechanism: 'CAP's multitenancy library hooks into BTP's SaaS Provisioning service. When a tenant subscribes, a provisioning callback automatically creates and initializes a dedicated HDI container for them. From then on, every request is routed to the right tenant's container based on the tenant ID in their token — the application's own business logic never has to be tenant-aware itself.'",
    diagramNote:
      "Flow: 'New tenant subscribes (SaaS Provisioning)' → 'Provisioning callback fires' → 'CAP creates + initializes dedicated HDI container' → 'Requests auto-routed to correct tenant container by token'.",
    diagramMermaid: `flowchart TD
    A["New tenant subscribes<br/>SaaS Provisioning"] --> B["Provisioning callback fires"]
    B --> C["CAP creates + initializes<br/>dedicated HDI container"]
    C --> D["Requests auto-routed to<br/>correct tenant container by token"]`,
    realProjectExample:
      "Onboarding a new customer to our SaaS product was fully automated — subscribing through the BTP subscription flow triggered CAP's provisioning handler, which had their isolated database ready within seconds, with zero manual database setup.",
    interviewTip:
      "Mentioning the specific package name (`@sap/cds-mtxs`) and the SaaS Provisioning service integration point shows real hands-on multitenancy implementation experience, not just conceptual awareness.",
    followupQuestions: [
      "What is an HDI container and why is one created per tenant?",
      "What happens to a tenant's data if they unsubscribe?",
      "Does every tenant run the exact same application code, or can it differ?",
    ],
    commonMistakes: [
      "Thinking multitenancy requires manually provisioning a separate database per customer.",
      "Not knowing the SaaS Provisioning service is the integration point that triggers tenant onboarding.",
    ],
    importantPoints: [
      "CAP multitenancy (`@sap/cds-mtxs`) gives each tenant an isolated HDI container.",
      "One shared application instance serves all tenants.",
      "SaaS Provisioning triggers automatic tenant container creation on subscription.",
    ],
    revisionNotes: "CAP multitenancy: one app instance, isolated HDI container per tenant, auto-provisioned via SaaS Provisioning on subscribe.",
  },
  {
    id: "cap-q13",
    topic: "Events",
    prompt: "What's the difference between a CAP 'before', 'on', and 'after' event handler?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["events", "handlers"],
    estimatedMinutes: 3,
    expectedAnswer:
      "'before' handlers run prior to the default processing (good for validation), 'on' handlers replace the default processing entirely (good for fully custom logic), and 'after' handlers run once processing is complete (good for enriching the response or triggering side effects).",
    detailedAnswer:
      "CAP's event-handler registration (`srv.before/on/after('CREATE', 'Orders', handler)`) gives you three distinct hook points for the same operation. A `before` handler runs before CAP's generated default logic executes — ideal for validating input and throwing an error to reject the request before anything happens. An `on` handler intercepts and replaces the default generated logic entirely — you're now responsible for the actual implementation (useful for complex custom operations, or actions/functions which have no default implementation at all). An `after` handler runs once the operation (default or custom) has completed successfully — good for enriching the returned data, sending notifications, or logging, without interfering with the core operation's own logic.",
    hindiExplanation:
      "CAP ka event-handler registration (`srv.before/on/after('CREATE', 'Orders', handler)`) ek hi operation ke liye teen alag hook points deta hai. `before` handler CAP ke generated default logic se pehle chalta hai — input validate karne ke liye ideal hai, aur agar kuch galat ho toh error throw karke request ko kuch bhi hone se pehle reject kar sakta hai. `on` handler default generated logic ko poori tarah intercept/replace kar deta hai — ab actual implementation ki responsibility tumhari hai (complex custom operations ke liye useful, ya actions/functions jinka koi default implementation hota hi nahi). `after` handler operation complete hone ke baad chalta hai — returned data enrich karne, notifications bhejne, ya logging ke liye achha hai, core operation ki apni logic ko disturb kiye bina.",
    interviewExplanation:
      "I'd give each handler its purpose: 'before runs prior to default processing — I use it for validation, rejecting the request early with an error. on replaces the default logic entirely — I'm fully responsible for the implementation, needed for custom actions with no default behavior. after runs once processing succeeds — I use it to enrich the response or trigger side effects like notifications, without touching the core logic.'",
    diagramNote:
      "Timeline for a CREATE operation: 'before handler (validate, can reject)' → 'on handler (default OR custom logic)' → 'after handler (enrich response, side effects)'.",
    diagramMermaid: `flowchart LR
    A["before handler<br/>validate, can reject"] --> B["on handler<br/>default OR custom logic"]
    B --> C["after handler<br/>enrich response, side effects"]`,
    realProjectExample:
      "A 'before' handler rejected orders with negative quantities immediately, the default 'on' CREATE logic handled normal persistence untouched, and an 'after' handler sent a confirmation event to another service — three distinct, cleanly separated concerns on the same CREATE operation.",
    interviewTip:
      "If asked to implement a fully custom action with no default behavior (like a calculation function), the correct handler type is `on`, not `before` or `after` — get this exactly right since it's a common precise-knowledge check.",
    followupQuestions: [
      "Which handler type would you use to implement a custom action from scratch?",
      "Can multiple 'before' handlers be registered for the same event?",
      "What happens if a 'before' handler throws an error?",
    ],
    commonMistakes: [
      "Using 'before' when 'on' is needed for genuinely custom logic with no default behavior.",
      "Not knowing 'on' fully replaces rather than supplements the default processing.",
    ],
    importantPoints: [
      "before = runs pre-default, good for validation/rejection.",
      "on = replaces default entirely, needed for custom actions/functions.",
      "after = runs post-success, good for enrichment/side effects.",
    ],
    revisionNotes: "before = pre-default validation (can reject). on = replaces default logic (needed for custom actions). after = post-success enrichment/side effects.",
  },
  {
    id: "cap-q14",
    topic: "Deployments",
    prompt: "How is a CAP application typically deployed to BTP, and what does the MTA descriptor contain for it?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["deployments", "mta"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A CAP project is typically packaged as an MTA with modules for the CAP service itself (and often a separate HTML5/Fiori module) plus resources for its required services (HANA Cloud, XSUAA, Destination), deployed together via `mbt build` + `cf deploy` as one coordinated unit.",
    detailedAnswer:
      "Running `cds add mta` in a CAP project scaffolds an `mta.yaml` declaring: a module for the CAP service itself (built as a Node.js or Java app deployable to Cloud Foundry), potentially a separate module for a Fiori/UI5 frontend deployed to the HTML5 Application Repository, a resource for the HANA Cloud database (with the deployer module handling schema deployment), a resource for XSUAA (with the app's `xs-security.json` defining roles/scopes), and often a Destination resource if the app calls external systems. Building this with `mbt build` produces an `.mtar` archive, and `cf deploy` deploys the entire application — backend, frontend, and all required service bindings — as one atomic, dependency-ordered operation.",
    hindiExplanation:
      "CAP project mein `cds add mta` chalane se ek `mta.yaml` scaffold hota hai jisme hota hai: CAP service ka apna module (Node.js ya Java app ki tarah, Cloud Foundry pe deployable), shayad ek alag Fiori/UI5 frontend module (HTML5 Application Repository mein deploy hone wala), HANA Cloud database ka resource (deployer module schema deployment handle karta hai), XSUAA ka resource (app ki `xs-security.json` roles/scopes define karti hai), aur aksar ek Destination resource agar app external systems ko call karta hai. Isse `mbt build` se build karne se ek `.mtar` archive banta hai, aur `cf deploy` poori application — backend, frontend, aur saare zaroori service bindings — ko ek atomic, dependency-ordered operation ki tarah deploy kar deta hai.",
    interviewExplanation:
      "I'd walk through the mta.yaml contents: 'It declares a module for the CAP service itself, possibly a separate Fiori frontend module for the HTML5 repository, a HANA Cloud resource with a deployer for schema deployment, an XSUAA resource driven by xs-security.json, and often a Destination resource. mbt build produces the .mtar, and cf deploy deploys the whole thing as one coordinated, dependency-ordered unit.'",
    diagramNote:
      "mta.yaml declaring: 'CAP service module', 'Fiori frontend module', 'HANA Cloud resource + deployer', 'XSUAA resource (xs-security.json)', 'Destination resource' — all built into one .mtar and deployed via cf deploy.",
    diagramMermaid: `flowchart TD
    MTA["mta.yaml"] --> M1["CAP service module"]
    MTA --> M2["Fiori frontend module"]
    MTA --> R1["HANA Cloud resource + deployer"]
    MTA --> R2["XSUAA resource (xs-security.json)"]
    MTA --> R3["Destination resource"]
    M1 & M2 & R1 & R2 & R3 --> BUILD["mbt build → .mtar"] --> DEPLOY["cf deploy"]`,
    realProjectExample:
      "Our CAP project's mta.yaml, scaffolded via `cds add mta` and then customized, deployed the Node.js service, a UI5 approval app, HANA Cloud, and XSUAA together in a single `cf deploy` step in our CI/CD pipeline.",
    interviewTip:
      "Mentioning `cds add mta` as the scaffolding starting point (rather than writing mta.yaml entirely from scratch) shows familiarity with CAP's actual tooling workflow.",
    followupQuestions: [
      "What does the HANA deployer module actually do during deployment?",
      "How does xs-security.json relate to the XSUAA resource in mta.yaml?",
      "What's the command to build an MTA project into a deployable archive?",
    ],
    commonMistakes: [
      "Not knowing `cds add mta` scaffolds the initial deployment descriptor automatically.",
      "Forgetting the database schema deployment is handled by a dedicated deployer module, not the app module itself.",
    ],
    importantPoints: [
      "CAP MTA = service module + (often) UI module + HANA/XSUAA/Destination resources.",
      "`cds add mta` scaffolds the initial mta.yaml.",
      "`mbt build` + `cf deploy` builds and deploys the whole app as one coordinated unit.",
    ],
    revisionNotes: "CAP deployment = MTA (service module + UI module + HANA/XSUAA/Destination resources), scaffolded via `cds add mta`, built/deployed via `mbt build` + `cf deploy`.",
  },
  {
    id: "cap-q15",
    topic: "Testing",
    prompt: "How would you write an automated test for a CAP service's business logic?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["testing", "cds-test"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Use `@sap/cds/lib/test` (the `cds.test` utility) to bootstrap the service in-memory (with a test SQLite database) and make actual OData requests against it in your test code, asserting on responses — testing the real generated service and your handlers together, not just isolated functions.",
    detailedAnswer:
      "Because so much of a CAP service's behavior comes from the generated layer (not just your custom handler code), effective tests exercise the actual running service rather than just unit-testing a handler function in isolation. `cds.test` spins up your service in-memory using a lightweight test database, and gives you an HTTP-client-like interface to make real GET/POST/PATCH/DELETE requests against your OData endpoints exactly as a real client would, letting you assert on status codes, response bodies, and side effects (like an order actually being created). This integration-style approach catches issues in the interaction between your custom handlers and CAP's generated CRUD/validation layer that a pure unit test of an isolated function would miss entirely.",
    hindiExplanation:
      "Kyunki CAP service ka bahut sara behavior generated layer se aata hai (sirf tumhare custom handler code se nahi), effective tests actual running service ko exercise karte hain, na ki sirf ek handler function ko isolation mein unit-test karna. `cds.test` tumhari service ko in-memory spin up karta hai ek lightweight test database use karke, aur ek HTTP-client-jaisa interface deta hai real GET/POST/PATCH/DELETE requests OData endpoints pe bhejne ke liye, bilkul jaise ek real client bhejta — status codes, response bodies, aur side effects (jaise order actually create hua) pe assert karne ke liye. Ye integration-style approach un issues ko pakadta hai jo custom handlers aur CAP ke generated CRUD/validation layer ke beech interaction mein hote hain, jo pure unit test miss kar deta.",
    interviewExplanation:
      "I'd describe the approach: 'I'd use cds.test to bootstrap my service in-memory with a test database and make real HTTP requests against the actual OData endpoints — not just unit-test an isolated handler function. That way I'm testing my custom logic together with CAP's generated CRUD and validation layer, catching integration issues a pure unit test would miss.'",
    diagramNote:
      "Flow: 'cds.test bootstraps service in-memory (test DB)' → 'Make real GET/POST/PATCH requests against OData endpoints' → 'Assert on status codes, response bodies, side effects'.",
    diagramMermaid: `flowchart LR
    A["cds.test bootstraps service<br/>in-memory (test DB)"] --> B["Real GET/POST/PATCH requests<br/>against OData endpoints"]
    B --> C["Assert on status codes,<br/>response bodies, side effects"]`,
    realProjectExample:
      "A test using `cds.test` sent a real POST request to create an order with an invalid quantity and asserted the service correctly returned a 400 error from our validation handler, exercising the exact same path a real Fiori app request would take.",
    interviewTip:
      "If asked 'how do you test CAP business logic', the strong answer emphasizes testing through the actual service/OData layer via cds.test, not just isolated unit tests of handler functions.",
    followupQuestions: [
      "What database does cds.test typically use?",
      "How would you test a custom action specifically, not just CRUD operations?",
      "Would you also write pure unit tests for complex logic extracted into plain functions?",
    ],
    commonMistakes: [
      "Only unit-testing isolated handler functions, missing integration issues with the generated CRUD layer.",
      "Not knowing cds.test provides a real HTTP-request-style testing interface.",
    ],
    importantPoints: [
      "`cds.test` bootstraps the actual service in-memory for integration-style testing.",
      "Tests make real OData requests, asserting on status/response/side effects.",
      "Catches issues in custom-handler-plus-generated-layer interaction, unlike isolated unit tests.",
    ],
    revisionNotes: "CAP testing: `cds.test` bootstraps service in-memory, make real OData requests, assert on responses — integration-style, not just isolated unit tests.",
  },
  {
    id: "cap-q16",
    topic: "Node.js CAP",
    prompt: "What is `cds.connect.to()` used for in a CAP Node.js handler?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["nodejs-cap", "connect"],
    estimatedMinutes: 2,
    expectedAnswer:
      "`cds.connect.to()` obtains a client connection to another CAP service or a remote/external service (like another microservice, or S/4HANA via a configured destination), abstracting away whether the target is local or remote so handler code calls it the same way either way.",
    detailedAnswer:
      "Rather than hand-writing different logic depending on whether a dependency is another local CAP service or a remote system reached via a destination, `await cds.connect.to('ServiceName')` returns a uniform client — calling its entities/actions works the same way regardless of whether 'ServiceName' resolves to an in-process service or a remote HTTP/OData endpoint configured in `package.json`'s `cds.requires` section. This lets you develop against a mocked or local version of a dependency early, then simply reconfigure the connection details later to point at the real remote system, without changing any handler code that calls it.",
    hindiExplanation:
      "Ek dependency chahe doosri local CAP service ho ya ek remote system jo destination ke through reach hoti ho, uske liye alag-alag logic hand-likhne ki jagah, `await cds.connect.to('ServiceName')` ek uniform client return karta hai — uski entities/actions call karna same tarike se kaam karta hai chahe 'ServiceName' ek in-process service resolve ho ya ek remote HTTP/OData endpoint jo `package.json` ke `cds.requires` section mein configured ho.",
    interviewExplanation:
      "I'd explain the abstraction: 'cds.connect.to gives you a uniform client to another service, whether it's local or remote — configured via cds.requires in package.json. I can develop against a mocked local version early, then just change the connection config later to point at the real remote system, without touching handler code.'",
    diagramNote:
      "'Handler code: await cds.connect.to(\"RemoteService\")' → resolves via cds.requires config → either 'Local in-process service' or 'Remote HTTP/OData endpoint' — same calling code either way.",
    diagramMermaid: `flowchart LR
    A["Handler: cds.connect.to('RemoteService')"] --> B["Resolves via cds.requires config"]
    B --> C["Local in-process service"]
    B --> D["Remote HTTP/OData endpoint"]`,
    realProjectExample:
      "We developed against a mocked local version of an external pricing service using cds.connect.to during early development, then simply updated the cds.requires configuration to point at the real remote destination for production, with zero handler code changes.",
    interviewTip:
      "Mentioning the mock-then-swap-to-real workflow shows you understand the practical development benefit, not just the syntax.",
    followupQuestions: [
      "Where is a remote service's connection configured?",
      "Can cds.connect.to be used to call an OData V2 remote system?",
      "What happens if the remote service is unreachable at runtime?",
    ],
    commonMistakes: [
      "Hard-coding different logic for local versus remote service calls instead of using the uniform client.",
      "Not knowing cds.requires in package.json is where the actual connection details live.",
    ],
    importantPoints: [
      "cds.connect.to gives a uniform client regardless of local or remote target.",
      "Configured via cds.requires in package.json.",
      "Enables developing against a mock, then swapping to the real remote system later.",
    ],
    revisionNotes: "cds.connect.to() = uniform client to a local or remote service, configured via cds.requires — mock early, swap to real remote later with no handler changes.",
  },
  {
    id: "cap-q17",
    topic: "Node.js CAP",
    prompt: "What is the purpose of the `srv/` folder's separation from `db/`, revisited: how would you expose only a filtered subset of an entity?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["nodejs-cap", "projections"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Define a CDS projection in the service definition using `as select from` with a `where` clause (or column exclusion), so only the intended subset of rows or fields from the underlying db/ entity are ever exposed, without touching the underlying persistence model.",
    detailedAnswer:
      "For example, `entity ActiveOrders as select from db.Orders where status = 'ACTIVE'` exposes only active orders through this service, while the full Orders table in db/ still contains all statuses — the filter is applied declaratively at the projection level, not by every consumer having to remember to add a status filter themselves. Similarly, `entity PublicCustomers as select from db.Customers { ID, name }` excludes sensitive fields like internal risk scores from ever appearing in this particular service's exposed shape. This is exactly the srv/-projects-db/ pattern in action — deliberately curating what's exposed without needing separate storage or duplicated data.",
    hindiExplanation:
      "For example, `entity ActiveOrders as select from db.Orders where status = 'ACTIVE'` sirf active orders ko is service ke through expose karta hai, jabki db/ mein poora Orders table saare statuses ke saath rehta hai — filter declaratively projection level pe apply hota hai, har consumer ko khud status filter yaad rakhne ki zaroorat nahi. Similarly, `entity PublicCustomers as select from db.Customers { ID, name }` sensitive fields (jaise internal risk scores) ko is particular service ke exposed shape mein kabhi aane hi nahi deta.",
    interviewExplanation:
      "I'd give the concrete CDS syntax: 'I'd define a projection like entity ActiveOrders as select from db.Orders where status = \\'ACTIVE\\' — the filter is applied declaratively, so consumers never need to remember it themselves. For hiding fields, entity PublicCustomers as select from db.Customers { ID, name } excludes sensitive fields entirely from that service's shape.'",
    diagramNote:
      "'db.Orders (all statuses)' → 'srv projection: ActiveOrders as select from db.Orders where status=ACTIVE' → 'Only active orders exposed, filter applied declaratively'.",
    diagramMermaid: `flowchart LR
    A["db.Orders<br/>all statuses"] --> B["srv projection:<br/>where status='ACTIVE'"]
    B --> C["Only active orders exposed"]`,
    realProjectExample:
      "A public-facing service projected only non-sensitive customer fields via a column-limited projection, while an internal admin service projected the full entity — both from the same underlying db.Customers table, with zero data duplication.",
    interviewTip:
      "Being able to write the actual CDS projection syntax (`as select from ... where ...`) rather than describing it abstractly demonstrates real hands-on CAP modeling experience.",
    followupQuestions: [
      "Can a projection also rename fields, not just filter/exclude them?",
      "Does a filtered projection support write operations, or just reads?",
      "How would you add a calculated field to a projection?",
    ],
    commonMistakes: [
      "Exposing the raw db/ entity directly instead of a deliberately curated projection.",
      "Relying on every consumer to apply their own filter instead of declaring it once in the projection.",
    ],
    importantPoints: [
      "CDS projections use `as select from ... where ...` to filter rows.",
      "Column lists in the projection body exclude specific fields.",
      "Filtering/hiding happens once, declaratively, not per-consumer.",
    ],
    revisionNotes: "CDS projection: `entity X as select from db.Y where ...` filters rows; `{ field1, field2 }` limits columns — declarative, reusable curation of db/ entities.",
  },
  {
    id: "cap-q18",
    topic: "Java CAP",
    prompt: "In CAP Java, where would you implement a custom event handler, and what annotation identifies it?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["java-cap", "event-handlers"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A custom event handler in CAP Java is a Spring-managed class annotated `@Component` implementing `EventHandler`, with methods annotated `@On`, `@Before`, or `@After` (mirroring Node.js CAP's before/on/after concept) and `@ServiceName`/`@Rest`-style annotations targeting a specific service and entity.",
    detailedAnswer:
      "Because CAP Java runs on Spring Boot, a handler class is registered as a Spring bean (`@Component`) and implements the `EventHandler` marker interface so CAP's runtime discovers it. Individual handler methods use annotations like `@Before(event = CqnService.EVENT_CREATE, entity = Orders_.CDS_NAME)` to declare exactly which service, entity, and lifecycle phase (before/on/after) they hook into — directly mirroring the same before/on/after semantics from CAP Node.js, just expressed through Java annotations and Spring conventions instead of a `srv.before(...)` function call.",
    hindiExplanation:
      "Kyunki CAP Java Spring Boot pe chalta hai, ek handler class ek Spring bean ki tarah register hoti hai (`@Component`) aur `EventHandler` marker interface implement karti hai taaki CAP ka runtime use discover kar sake. Individual handler methods annotations use karte hain jaise `@Before(event = CqnService.EVENT_CREATE, entity = Orders_.CDS_NAME)` exactly declare karne ke liye ki kaunsi service, entity, aur lifecycle phase (before/on/after) mein hook karna hai — bilkul same before/on/after semantics ko mirror karte hue jo CAP Node.js mein hai, bas Java annotations aur Spring conventions ke through express hote hue.",
    interviewExplanation:
      "I'd give the Spring-specific mechanics: 'A CAP Java handler is a Spring @Component implementing EventHandler. Methods use annotations like @Before(event = CqnService.EVENT_CREATE, entity = Orders_.CDS_NAME) to declare the service, entity, and phase — the exact same before/on/after concept as Node.js CAP, just expressed via Java annotations and Spring conventions.'",
    diagramNote:
      "'@Component class implements EventHandler' → method annotated '@Before(event=CREATE, entity=Orders_.CDS_NAME)' → 'Same before/on/after semantics as Node.js CAP, Spring-style'.",
    diagramMermaid: `flowchart LR
    A["@Component class<br/>implements EventHandler"] --> B["@Before(event=CREATE,<br/>entity=Orders_.CDS_NAME)"]
    B --> C["Same before/on/after semantics<br/>as Node.js CAP"]`,
    realProjectExample:
      "A validation handler in a CAP Java project was implemented as a @Component with a @Before-annotated method checking order quantities, directly analogous to the equivalent srv.before('CREATE', 'Orders', ...) handler in a parallel Node.js CAP project on the same team.",
    interviewTip:
      "Drawing the direct parallel to Node.js CAP's before/on/after (rather than treating Java CAP as an unrelated framework) shows you understand both flavors share the same conceptual model.",
    followupQuestions: [
      "What does the generated `Orders_` class represent in CAP Java?",
      "How would you register a handler for a custom action in Java?",
      "What Spring Boot conventions does CAP Java rely on for configuration?",
    ],
    commonMistakes: [
      "Not recognizing CAP Java's handler annotations as directly analogous to Node.js CAP's before/on/after.",
      "Forgetting the @Component annotation, which is what registers the handler as a discoverable Spring bean.",
    ],
    importantPoints: [
      "CAP Java handlers = Spring @Component implementing EventHandler.",
      "Methods use @Before/@On/@After annotations targeting a specific service/entity/phase.",
      "Directly mirrors Node.js CAP's before/on/after concept via Java/Spring conventions.",
    ],
    revisionNotes: "CAP Java handler = @Component implementing EventHandler, methods annotated @Before/@On/@After(event, entity) — same concept as Node.js srv.before/on/after.",
  },
  {
    id: "cap-q19",
    topic: "Java CAP",
    prompt: "What build tool does a typical CAP Java project use, and what does it produce for deployment?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["java-cap", "build"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A CAP Java project typically uses Maven, producing an executable Spring Boot JAR that bundles the application and its dependencies, deployable to Cloud Foundry as a Java buildpack-based app module within an MTA, just like any other Spring Boot application.",
    detailedAnswer:
      "Running `mvn clean package` (or the project's configured Maven goal) compiles the Java code, processes the CDS models into generated Java classes, and packages everything into a single executable JAR via Spring Boot's packaging plugin — this JAR is what actually gets deployed. In an MTA-based deployment, this JAR becomes the artifact for a Java buildpack module, declared in mta.yaml alongside the usual HANA/XSUAA resources, and deployed via the same `cf deploy` process used for any other CAP (or non-CAP) MTA application — the language/runtime differs from Node.js CAP, but the overall BTP deployment story stays consistent.",
    hindiExplanation:
      "`mvn clean package` (ya project ka configured Maven goal) chalane se Java code compile hota hai, CDS models ko generated Java classes mein process kiya jaata hai, aur sab kuch ek single executable JAR mein package hota hai Spring Boot ke packaging plugin se — yahi JAR actually deploy hota hai. MTA-based deployment mein, ye JAR ek Java buildpack module ka artifact ban jaata hai, mta.yaml mein declare hota hai HANA/XSUAA resources ke saath, aur usi `cf deploy` process se deploy hota hai jo kisi bhi doosre CAP (ya non-CAP) MTA application ke liye use hota hai.",
    interviewExplanation:
      "I'd describe the build-to-deploy chain: 'Maven builds and packages the CAP Java app into an executable Spring Boot JAR. In an MTA, that JAR becomes a Java buildpack module, declared alongside HANA and XSUAA resources, and deployed via the same cf deploy process as any other MTA app — the language differs from Node.js CAP, but the overall BTP deployment approach is consistent.'",
    diagramNote:
      "'mvn clean package' → 'Executable Spring Boot JAR' → 'MTA Java buildpack module (mta.yaml)' → 'cf deploy — same process as Node.js CAP MTAs'.",
    diagramMermaid: `flowchart LR
    A["mvn clean package"] --> B["Executable Spring Boot JAR"]
    B --> C["MTA Java buildpack module"]
    C --> D["cf deploy<br/>same process as Node.js CAP"]`,
    realProjectExample:
      "A CAP Java service's Maven build produced a Spring Boot JAR declared as a Java buildpack module in the project's mta.yaml, deployed via the identical cf deploy pipeline used for the organization's other Node.js CAP projects.",
    interviewTip:
      "Emphasizing that the overall MTA/cf deploy story is consistent across CAP Node.js and Java (only the module type/build tool differs) shows you understand BTP's deployment model isn't language-specific.",
    followupQuestions: [
      "What generated artifacts does the CDS-to-Java compilation step produce?",
      "How would a Java buildpack module differ from a Node.js buildpack module in mta.yaml?",
      "What's the equivalent of `cds watch` for local CAP Java development?",
    ],
    commonMistakes: [
      "Assuming CAP Java requires a fundamentally different deployment approach from CAP Node.js.",
      "Not knowing Maven is the standard build tool for CAP Java projects.",
    ],
    importantPoints: [
      "Maven builds and packages CAP Java into an executable Spring Boot JAR.",
      "That JAR becomes a Java buildpack module in the MTA descriptor.",
      "Deployed via the same cf deploy process used for any MTA application.",
    ],
    revisionNotes: "CAP Java build: Maven → executable Spring Boot JAR → Java buildpack MTA module → cf deploy (same process as Node.js CAP MTAs).",
  },
  {
    id: "cap-q20",
    topic: "CDS",
    prompt: "What is a CDS 'aspect', and how does the built-in `cuid` aspect actually work?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["cds", "aspects"],
    estimatedMinutes: 2,
    expectedAnswer:
      "An aspect is a reusable, named set of fields/annotations that can be mixed into an entity definition; `cuid` is a built-in aspect adding a generated UUID `key ID` field, so any entity extending it (`entity Books : cuid { ... }`) automatically gets a properly-keyed identifier without redeclaring it manually every time.",
    detailedAnswer:
      "Rather than manually writing `key ID: UUID;` in every single entity, CDS lets you define (or use built-in) aspects — reusable field/annotation bundles — and mix them into an entity via the `:` syntax. `cuid` is exactly this: a built-in aspect providing `key ID: UUID` with a default value generator, so `entity Books : cuid { title: String; }` automatically gets a correctly-keyed UUID identifier. Other built-in aspects like `managed` similarly add `createdAt`, `createdBy`, `modifiedAt`, `modifiedBy` fields with automatic population — aspects are CAP's mechanism for DRY, consistent cross-cutting field patterns without copy-pasting the same field declarations into every entity.",
    hindiExplanation:
      "Har single entity mein manually `key ID: UUID;` likhne ki jagah, CDS tumhe aspects define (ya built-in use) karne deta hai — reusable field/annotation bundles — aur unhe ek entity mein `:` syntax se mix karo. `cuid` exactly yahi hai: ek built-in aspect jo `key ID: UUID` deta hai ek default value generator ke saath, isliye `entity Books : cuid { title: String; }` automatically ek correctly-keyed UUID identifier pa jaati hai. Doosre built-in aspects jaise `managed` similarly `createdAt`, `createdBy`, `modifiedAt`, `modifiedBy` fields add karte hain automatic population ke saath.",
    interviewExplanation:
      "I'd explain the DRY mechanism: 'An aspect is a reusable, named bundle of fields you mix into an entity via the colon syntax. cuid is a built-in aspect giving a generated UUID key field, so entity Books : cuid automatically gets a properly-keyed identifier without redeclaring it. managed similarly adds createdAt/createdBy/modifiedAt/modifiedBy with automatic population.'",
    diagramNote:
      "'entity Books : cuid, managed { title: String; }' → mixes in → 'cuid: key ID: UUID' + 'managed: createdAt, createdBy, modifiedAt, modifiedBy' — all auto-populated.",
    diagramMermaid: `flowchart LR
    A["entity Books : cuid, managed"] --> B["cuid: key ID: UUID"]
    A --> C["managed: createdAt, createdBy,<br/>modifiedAt, modifiedBy"]`,
    realProjectExample:
      "Every entity in our CAP project extended both `cuid` and `managed`, giving consistent UUID keys and automatic audit fields (who created/modified what, and when) across the entire data model with zero repeated boilerplate field declarations.",
    interviewTip:
      "Naming both `cuid` and `managed` as concrete built-in aspects (not just describing the concept abstractly) shows real hands-on CAP modeling experience.",
    followupQuestions: [
      "Can you define your own custom aspect, beyond the built-in ones?",
      "What does the `managed` aspect populate createdBy/modifiedBy with — how does it know the current user?",
      "Can an entity mix in more than one aspect at a time?",
    ],
    commonMistakes: [
      "Manually redeclaring key/audit fields in every entity instead of using aspects.",
      "Not knowing `managed` is another common built-in aspect alongside `cuid`.",
    ],
    importantPoints: [
      "Aspect = reusable, named bundle of fields/annotations, mixed in via `:`.",
      "`cuid` = built-in aspect giving a generated UUID key field.",
      "`managed` = built-in aspect adding automatic audit fields (createdAt/By, modifiedAt/By).",
    ],
    revisionNotes: "CDS aspect = reusable field bundle mixed in via `:`. `cuid` = UUID key. `managed` = auto audit fields (createdAt/By, modifiedAt/By).",
  },
  {
    id: "cap-q21",
    topic: "Entities",
    prompt: "What's the difference between a CDS entity and a CDS 'view' in terms of how they're persisted?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["entities", "views"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A plain entity (defined directly with fields) gets its own physical database table when deployed; a CDS entity defined `as select from` another entity is a view — it doesn't get its own storage, and reading it dynamically queries/joins the underlying entities it's built from.",
    detailedAnswer:
      "When you declare `entity Books { key ID: UUID; title: String; }` directly, the deployment process creates an actual physical table for it in the database. When you instead declare `entity BookSummary as select from Books { ID, title }` (or something involving a join/aggregation), this is a view — no separate table is created; every read against BookSummary dynamically executes the underlying SELECT against the real Books table (and whatever else it references) at query time. This matters for understanding both performance (views recompute on every read, so complex ones can be more expensive than a materialized table) and behavior (a view generally can't be written to directly the same way a plain entity/table can, without additional handling).",
    hindiExplanation:
      "Jab tum `entity Books { key ID: UUID; title: String; }` directly declare karte ho, deployment process database mein iske liye ek actual physical table banata hai. Jab tum iske bajaye `entity BookSummary as select from Books { ID, title }` declare karte ho (ya kuch join/aggregation involve karta hua), ye ek view hai — koi alag table create nahi hoti; BookSummary ke against har read dynamically underlying SELECT execute karti hai real Books table (aur jo bhi wo reference karta hai) ke against query time pe. Ye performance ke liye matter karta hai (views har read pe recompute hoti hain) aur behavior ke liye bhi (view generally directly write nahi ho sakti plain entity/table ki tarah bina additional handling ke).",
    interviewExplanation:
      "I'd draw the persistence distinction: 'A plain entity with direct fields gets its own physical table on deployment. A CDS view — entity BookSummary as select from Books — gets no separate storage; it dynamically re-executes the underlying query on every read. This matters for performance, since complex views recompute every time, and for writability, since views generally can't be written to directly without extra handling.'",
    diagramNote:
      "'Plain entity (direct fields) → physical table created' vs 'CDS view (as select from ...) → no separate storage, dynamically queries underlying entity on every read'.",
    diagramMermaid: `flowchart LR
    A["Plain entity<br/>direct fields"] --> B["Physical table created"]
    C["CDS view<br/>as select from ..."] --> D["No storage, dynamically<br/>queries underlying entity"]`,
    realProjectExample:
      "A reporting view aggregating order totals per customer recomputed on every request against the live Orders table, which was fine for moderate data volumes but would need reconsideration (perhaps a materialized approach) if the underlying data grew large enough to make that live aggregation slow.",
    interviewTip:
      "If asked 'is a view always slower', clarify it depends on complexity and data volume — a simple view might have negligible overhead, while a complex aggregation view over large tables could genuinely need a different approach.",
    followupQuestions: [
      "Can you write data through a CDS view back into the underlying entity?",
      "What's a 'materialized view' and does CAP support one directly?",
      "How would you decide between a view and a stored/computed table for a reporting requirement?",
    ],
    commonMistakes: [
      "Assuming a CDS view gets its own physical storage the same way a plain entity does.",
      "Not considering the performance implications of a complex view recomputing on every read.",
    ],
    importantPoints: [
      "Plain entity = own physical table on deployment.",
      "CDS view (`as select from`) = no separate storage, dynamically re-queried on every read.",
      "Views have performance and writability implications compared to plain entities.",
    ],
    revisionNotes: "Plain entity = physical table. CDS view (as select from) = no storage, dynamically re-queries underlying entity on every read — performance/writability tradeoffs.",
  },
  {
    id: "cap-q22",
    topic: "Entities",
    prompt: "How would you model a 'soft delete' (marking a record inactive instead of physically removing it) in CAP?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["entities", "soft-delete"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Add a boolean or status field (like `isDeleted` or a status enum) to the entity, override the DELETE event handler to set that field instead of performing an actual database delete, and filter it out of default read queries — since CAP doesn't provide soft-delete as an automatic, built-in feature.",
    detailedAnswer:
      "CAP's generated DELETE behavior performs a real database DELETE by default — soft delete requires deliberate implementation. The pattern: add a field like `isDeleted: Boolean default false` (or a status code), implement an `on('DELETE', ...)` handler that instead performs an UPDATE setting that field to true (and returns success without actually removing the row), and add a `where isDeleted = false` condition to default read queries (often via a CDS view/projection that only exposes non-deleted rows, or a query modifier applied consistently). This isn't automatic — you're deliberately overriding the default delete behavior and consistently filtering reads, since forgetting the read-side filter would defeat the whole purpose by showing 'deleted' records anyway.",
    hindiExplanation:
      "CAP ka generated DELETE behavior default mein ek real database DELETE perform karta hai — soft delete ke liye deliberate implementation chahiye. Pattern: ek field add karo jaise `isDeleted: Boolean default false`, ek `on('DELETE', ...)` handler implement karo jo iske bajaye ek UPDATE perform kare us field ko true set karte hue (aur success return kare bina actually row remove kiye), aur default read queries mein `where isDeleted = false` condition add karo (aksar ek CDS view/projection ke through jo sirf non-deleted rows expose kare). Ye automatic nahi hai — tum deliberately default delete behavior ko override kar rahe ho aur consistently reads filter kar rahe ho.",
    interviewExplanation:
      "I'd explain it's not automatic: 'CAP's default DELETE really deletes the row — soft delete needs deliberate implementation. I'd add an isDeleted field, override the DELETE event with an on handler that does an UPDATE instead, and make sure default read queries filter out isDeleted rows, often via a dedicated view. Forgetting that read-side filter would defeat the whole point.'",
    diagramNote:
      "'DELETE request' → 'on(\"DELETE\") handler intercepts' → 'UPDATE: set isDeleted=true' (no real row removal) → 'Read queries filter where isDeleted=false'.",
    diagramMermaid: `flowchart TD
    A["DELETE request"] --> B["on('DELETE') handler intercepts"]
    B --> C["UPDATE: set isDeleted=true<br/>no real row removal"]
    D["Read queries"] --> E["Filter: where isDeleted=false"]`,
    realProjectExample:
      "A compliance requirement to retain deleted order records for audit purposes was implemented via soft delete — an isDeleted flag set by an overridden DELETE handler, with all standard list/read services built as views filtering to isDeleted=false, keeping the raw data intact underneath for audit access when genuinely needed.",
    interviewTip:
      "If asked 'does CAP support soft delete out of the box', the accurate answer is no — it's a deliberate pattern you implement yourself, not a built-in annotation or feature.",
    followupQuestions: [
      "How would an admin-only service still access soft-deleted records for audit purposes?",
      "What are the tradeoffs of soft delete versus a real delete plus a separate audit log?",
      "How would you handle unique constraints with soft-deleted records (e.g. reusing a 'deleted' email address)?",
    ],
    commonMistakes: [
      "Assuming CAP provides soft delete as an automatic, built-in feature.",
      "Forgetting to filter soft-deleted records out of default read views, defeating the purpose.",
    ],
    importantPoints: [
      "Soft delete is not automatic in CAP — it's a deliberate pattern you implement.",
      "Override the DELETE event to UPDATE a flag instead of removing the row.",
      "Consistently filter default reads to exclude soft-deleted records.",
    ],
    revisionNotes: "Soft delete in CAP = manual pattern: isDeleted field + overridden DELETE handler (UPDATE instead) + read queries filtering isDeleted=false. Not automatic.",
  },
  {
    id: "cap-q23",
    topic: "Associations",
    prompt: "What does the `@cascade` or explicit cascade behavior mean when deleting an entity with associated child records?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["associations", "cascade"],
    estimatedMinutes: 2,
    expectedAnswer:
      "For a plain association (not a composition), deleting the parent by default does NOT automatically delete associated records — you'd need to explicitly handle cascading deletes yourself (or rely on database-level foreign key constraints) if that behavior is actually required, since only compositions have automatic cascade semantics built into CAP.",
    detailedAnswer:
      "This is a common point of confusion: compositions cascade automatically (deleting a parent Order deletes its composed LineItems, since composition implies ownership), but plain associations do not — deleting a Customer referenced by an Order via a plain association does not (and should not) delete the Order, since the relationship isn't ownership. If a genuine business requirement needs cascading behavior for an association-modeled relationship, you'd implement it explicitly (a custom DELETE handler that also deletes related records, or a database-level `ON DELETE CASCADE` foreign key constraint), rather than expecting CAP to do it automatically — because automatically cascading deletes through plain associations would be a dangerous default that could delete far more than intended.",
    hindiExplanation:
      "Ye ek common confusion point hai: compositions automatically cascade karte hain (parent Order delete karna uski composed LineItems bhi delete kar deta hai, kyunki composition ownership imply karta hai), lekin plain associations nahi karte — ek Customer delete karna jo ek Order dwara plain association se reference hota hai, us Order ko delete nahi karta (aur nahi karna chahiye), kyunki relationship ownership nahi hai. Agar genuinely ek business requirement ko association-modeled relationship ke liye cascading behavior chahiye, tum use explicitly implement karoge (ek custom DELETE handler jo related records bhi delete kare, ya ek database-level `ON DELETE CASCADE` foreign key constraint), CAP se automatically expect karne ki jagah.",
    interviewExplanation:
      "I'd clarify the composition-vs-association distinction directly: 'Compositions cascade automatically on delete — that's the whole point of ownership semantics. Plain associations do NOT cascade by default — deleting a Customer doesn't delete their Orders. If a real requirement needs cascading for an association, you'd implement it explicitly, since automatic cascading through plain associations would be a dangerously unexpected default.'",
    diagramNote:
      "'Composition: delete parent → automatically cascades to composed children' vs 'Association: delete referenced entity → NOT automatic, related records unaffected unless explicitly handled'.",
    diagramMermaid: `flowchart LR
    A["Composition: delete parent"] --> B["Automatically cascades<br/>to composed children"]
    C["Association: delete<br/>referenced entity"] --> D["NOT automatic —<br/>unaffected unless explicit"]`,
    realProjectExample:
      "A developer initially assumed deleting a Customer would cascade to delete their associated Orders (it's just an association), and was surprised when the Orders remained — correctly so, since that relationship was intentionally modeled without ownership semantics.",
    interviewTip:
      "If asked 'what happens if you delete a Customer referenced by many Orders', the correct answer is nothing automatically happens to the Orders — this is precisely the composition-vs-association distinction being tested.",
    followupQuestions: [
      "How would you implement an intentional cascading delete for an association relationship?",
      "What happens to an Order's Customer association if the referenced Customer is deleted — does it become invalid?",
      "Would a database-level foreign key constraint block the delete instead of cascading?",
    ],
    commonMistakes: [
      "Assuming any relationship (association or composition) cascades on delete automatically.",
      "Not knowing only compositions have built-in cascade semantics in CAP.",
    ],
    importantPoints: [
      "Compositions cascade automatically on delete — that's their defining ownership semantic.",
      "Plain associations do NOT cascade automatically.",
      "Explicit cascading for associations requires custom implementation, deliberately.",
    ],
    revisionNotes: "Only compositions cascade on delete automatically. Plain associations do NOT — explicit custom handling needed if cascading is genuinely required there.",
  },
  {
    id: "cap-q24",
    topic: "Associations",
    prompt: "What's a 'managed' versus 'unmanaged' association in CDS?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["associations", "managed-unmanaged"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A managed association lets CAP auto-generate and manage the underlying foreign key field for you; an unmanaged association is defined with an explicit `on` condition against fields you declare and maintain yourself, giving more control when the join condition is more complex than a simple foreign key match.",
    detailedAnswer:
      "A simple `customer: Association to Customers;` is managed — CAP automatically creates and maintains a hidden foreign key field behind the scenes, handling the join without you declaring it explicitly. An unmanaged association, like `customer: Association to Customers on customer.ID = customerID;`, requires you to explicitly declare the join condition and the underlying field(s) it depends on yourself — useful when the relationship isn't a simple single-foreign-key match (e.g. a composite key match, or a condition involving more than direct key equality). Managed associations are simpler and sufficient for the vast majority of relationships; unmanaged associations are reached for specifically when the join logic needs to be more explicit or complex than CAP's automatic foreign key handling supports.",
    hindiExplanation:
      "Ek simple `customer: Association to Customers;` managed hai — CAP automatically ek hidden foreign key field create/maintain karta hai peeche, join handle karta hai bina tumhe use explicitly declare kiye. Ek unmanaged association, jaise `customer: Association to Customers on customer.ID = customerID;`, tumhe explicitly join condition aur underlying field(s) declare karne ki maang karta hai jinpe wo depend karta hai — useful jab relationship simple single-foreign-key match nahi hai. Managed associations simpler hain aur zyada tar relationships ke liye sufficient hain; unmanaged associations tab use hoti hain jab join logic explicit ya complex ho.",
    interviewExplanation:
      "I'd give the concrete syntax contrast: 'A managed association, like customer: Association to Customers, has CAP auto-generate and maintain the foreign key for you. An unmanaged one, with an explicit on condition, requires you to declare the join yourself — useful for more complex join logic beyond a simple foreign key match. Managed is the default choice for most relationships; unmanaged is for when you need that extra explicit control.'",
    diagramNote:
      "'Managed association: CAP auto-generates/maintains foreign key' vs 'Unmanaged association: explicit `on` condition, you declare and maintain the join fields yourself'.",
    diagramMermaid: `flowchart LR
    A["Managed association"] --> B["CAP auto-generates/<br/>maintains foreign key"]
    C["Unmanaged association"] --> D["Explicit 'on' condition,<br/>you declare join fields"]`,
    realProjectExample:
      "Most relationships in our data model used simple managed associations, but one relationship requiring a match against a composite business key (not the entity's primary UUID key) was modeled as an unmanaged association with an explicit on condition referencing those specific fields.",
    interviewTip:
      "If asked when you'd reach for unmanaged over managed, the concrete answer is 'when the join condition is more complex than a simple foreign key match' — not a vague 'when you need more control'.",
    followupQuestions: [
      "What does the auto-generated foreign key field for a managed association actually look like in the database?",
      "Can an unmanaged association reference multiple fields in its `on` condition?",
      "Would you ever mix managed and unmanaged associations within the same entity?",
    ],
    commonMistakes: [
      "Defaulting to unmanaged associations unnecessarily when a simple managed one would suffice.",
      "Not knowing managed associations auto-generate a hidden foreign key field.",
    ],
    importantPoints: [
      "Managed association = CAP auto-generates/maintains the foreign key.",
      "Unmanaged association = explicit `on` condition, you declare the join yourself.",
      "Reach for unmanaged specifically when the join logic is more complex than a simple FK match.",
    ],
    revisionNotes: "Managed association = CAP auto-generates FK. Unmanaged = explicit `on` condition you define — use unmanaged only for complex join logic beyond a simple FK match.",
  },
  {
    id: "cap-q25",
    topic: "Compositions",
    prompt: "Can a composed child entity be queried or accessed directly, outside the context of its parent?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["compositions", "querying"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Technically yes — if the composed entity is also exposed as its own service entity, it can be queried directly — but this is usually a design smell, since composition implies the child's existence is meaningless outside its parent's context; most designs deliberately don't expose composed entities as independent, directly-queryable root resources.",
    detailedAnswer:
      "Nothing technically prevents exposing a composed entity (like LineItems) as its own root-level entity in a Service Definition, letting API consumers query it directly without going through its parent Order. But doing so somewhat contradicts the semantic meaning of composition — if LineItems genuinely don't make sense to exist or be manipulated independently of their Order, exposing them as an independently queryable resource invites misuse (creating an orphaned line item with no parent, or manipulating it in ways that bypass the parent's business logic/validations). The common, deliberate design choice is to only expose composed entities via navigation through their parent (`/Orders(1)/items`), not as an independent top-level resource — reinforcing the ownership semantic at the API level too, not just the data model level.",
    hindiExplanation:
      "Technically kuch bhi ek composed entity (jaise LineItems) ko apna root-level entity ki tarah expose karne se rokta nahi hai ek Service Definition mein, jisse API consumers directly query kar sakein bina uske parent Order se guzre. Lekin aisa karna somewhat composition ke semantic meaning se contradict karta hai — agar LineItems genuinely apne Order se independently exist ya manipulate hone ka koi sense nahi rakhte, unhe independently queryable resource ki tarah expose karna misuse invite karta hai. Common, deliberate design choice hai composed entities ko sirf parent ke through navigation se expose karna (`/Orders(1)/items`), independent top-level resource ki tarah nahi.",
    interviewExplanation:
      "I'd give the nuanced answer: 'Technically yes, if you expose it as its own service entity — but that's usually a design smell. Composition implies the child doesn't make sense outside its parent's context, so exposing it as an independently queryable resource invites misuse, like creating an orphaned line item. The deliberate common choice is only exposing it via navigation through the parent, like /Orders(1)/items, reinforcing ownership at the API level too.'",
    diagramNote:
      "'Composed entity exposed only via parent navigation: /Orders(1)/items (recommended)' vs 'Composed entity exposed as independent root: /LineItems (design smell — invites orphaned records)'.",
    diagramMermaid: `flowchart LR
    A["/Orders(1)/items<br/>via parent navigation"] --> B["Recommended — reinforces ownership"]
    C["/LineItems<br/>as independent root"] --> D["Design smell —<br/>invites orphaned records"]`,
    realProjectExample:
      "A code review flagged a composed LineItems entity that had accidentally been exposed as an independent root entity in the Service Definition, allowing creation of orphaned line items with no parent order — removing the independent exposure and requiring navigation through the parent fixed the design gap.",
    interviewTip:
      "If asked 'should you expose a composed entity independently', the strong, opinionated answer is generally no — explain the ownership-semantic reasoning rather than just saying 'it depends' with no clear stance.",
    followupQuestions: [
      "How would you navigate to a composed entity's records via its parent?",
      "What business logic risk does independently exposing a composed entity create?",
      "Is there ever a legitimate reason to expose a composed entity independently?",
    ],
    commonMistakes: [
      "Exposing composed entities as independent root resources without considering the ownership-semantic implications.",
      "Not recognizing this as a design smell when reviewing a Service Definition.",
    ],
    importantPoints: [
      "Technically possible to expose a composed entity independently, but usually a design smell.",
      "Composition implies the child's existence is meaningless outside its parent.",
      "Common deliberate choice: expose only via navigation through the parent, not as an independent root.",
    ],
    revisionNotes: "Composed entities CAN technically be exposed independently, but shouldn't be — reinforces ownership semantics by only exposing via parent navigation (e.g. /Orders(1)/items).",
  },
  {
    id: "cap-q26",
    topic: "Actions",
    prompt: "Can a custom action be bound to a specific entity instance, and how does that differ from an unbound action?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["actions", "bound-unbound"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — a bound action is declared inside an entity and operates on a specific instance (like `Orders.submitOrder()` on order 123), receiving that instance's context automatically; an unbound action is declared at the service level, independent of any specific entity instance, more like a general-purpose service operation.",
    detailedAnswer:
      "A bound action, declared within an entity's definition (`entity Orders { ... actions { action submit() returns Orders; } }`), is called against a specific instance — `POST /Orders(123)/submit` — and CAP's runtime automatically provides that specific order's context to the handler, without you needing to manually look it up by ID yourself. An unbound action, declared directly in the service definition rather than inside an entity, isn't tied to any particular record — it's a general operation like a global calculation or a batch process trigger that doesn't inherently belong to one specific instance. The choice mirrors the actual semantics of what you're modeling: an operation on one specific thing (bound) versus a general service-level capability (unbound).",
    hindiExplanation:
      "Ek bound action, entity ki definition ke andar declare hoti hai, ek specific instance ke against call hoti hai — `POST /Orders(123)/submit` — aur CAP ka runtime automatically us specific order ka context handler ko provide karta hai, tumhe manually ID se lookup karne ki zaroorat nahi. Ek unbound action, directly service definition mein declare hoti hai entity ke andar nahi, kisi particular record se tied nahi hoti — ye ek general operation hai jaise ek global calculation ya batch process trigger jo inherently ek specific instance ka nahi hai.",
    interviewExplanation:
      "I'd give the concrete distinction: 'A bound action, declared inside an entity, operates on a specific instance — like POST /Orders(123)/submit — and CAP automatically provides that instance's context. An unbound action, declared at the service level, isn't tied to any record — more like a general operation, such as a batch trigger. The choice mirrors whether you're modeling an operation on one specific thing or a general service capability.'",
    diagramNote:
      "'Bound action: entity Orders { action submit(); } → POST /Orders(123)/submit, instance context provided automatically' vs 'Unbound action: service-level, no instance tie, e.g. a batch trigger'.",
    diagramMermaid: `flowchart LR
    A["Bound action<br/>inside entity"] --> B["POST /Orders(123)/submit<br/>instance context auto-provided"]
    C["Unbound action<br/>service level"] --> D["No instance tie<br/>e.g. batch trigger"]`,
    realProjectExample:
      "A bound 'approve' action operated on a specific order instance, while a separate unbound 'recalculateAllPricing' action was a service-level operation triggering a batch recalculation across many orders at once, with no single-instance context.",
    interviewTip:
      "If asked 'would you model a batch operation as a bound action', the correct answer is no — bound actions are for per-instance operations; a batch/global operation belongs as an unbound action.",
    followupQuestions: [
      "How is a bound action's instance context accessed in the handler code?",
      "Can a bound action still take additional parameters beyond the instance itself?",
      "Would draft-enabled entities affect how a bound action behaves?",
    ],
    commonMistakes: [
      "Modeling a genuinely instance-specific operation as an unbound action, losing the automatic instance context.",
      "Not knowing bound actions are declared inside the entity definition, not the service definition directly.",
    ],
    importantPoints: [
      "Bound action = declared inside an entity, operates on a specific instance, auto-provided context.",
      "Unbound action = declared at service level, no instance tie, general operation.",
      "Choice mirrors whether the operation is per-instance or a general service capability.",
    ],
    revisionNotes: "Bound action = inside entity, per-instance (e.g. Orders(123)/submit), auto context. Unbound action = service-level, no instance tie (e.g. batch operations).",
  },
  {
    id: "cap-q27",
    topic: "Functions",
    prompt: "Why would using a function instead of an action for a 'search' or 'lookup' operation matter for caching?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["functions", "caching"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Since functions map to HTTP GET and are read-only/side-effect-free by contract, HTTP caching layers (browsers, CDNs, API gateways) can safely cache their responses; actions map to POST, which is never cached by default, since POST implies a potential side effect that shouldn't be silently skipped by serving a stale cached response.",
    detailedAnswer:
      "HTTP caching semantics are built around the idea that GET requests are safe to cache and replay, since they're not supposed to change server state — exactly the contract a CDS `function` declares. A search/lookup operation modeled as a function benefits from this: a CDN, browser cache, or API gateway can legitimately cache identical repeated calls, reducing backend load for a common, repeatable read operation. If the same operation were incorrectly modeled as an action (mapped to POST), caching infrastructure would correctly refuse to cache it by default, since POST requests are assumed to potentially have side effects that must always actually execute — missing out on a real performance optimization opportunity for a genuinely read-only, cacheable operation.",
    hindiExplanation:
      "HTTP caching semantics is idea ke around built hain ki GET requests cache/replay karne ke liye safe hain, kyunki wo server state change karne wali nahi hoti — exactly wahi contract jo ek CDS `function` declare karta hai. Ek search/lookup operation function ki tarah modeled hone se ye fayda uthata hai: ek CDN, browser cache, ya API gateway legitimately identical repeated calls cache kar sakte hain, backend load kam karte hue. Agar wahi operation galti se ek action ki tarah modeled ho (POST se mapped), caching infrastructure correctly use cache karne se refuse karega default mein, kyunki POST requests ko potentially side effects rakhne wala assume kiya jaata hai.",
    interviewExplanation:
      "I'd connect it to HTTP caching semantics: 'Functions map to GET, which caching infrastructure — CDNs, browsers, gateways — can safely cache, since GET is supposed to be side-effect-free. If a read-only search were incorrectly modeled as an action instead, mapped to POST, caching layers would correctly refuse to cache it by default, missing a real performance win for what's actually a repeatable, cacheable read.'",
    diagramNote:
      "'Search modeled as function → GET → cacheable by CDN/browser/gateway' vs 'Search incorrectly modeled as action → POST → not cached by default, missed optimization'.",
    diagramMermaid: `flowchart LR
    A["Search as function"] --> B["GET → cacheable"]
    C["Search as action<br/>(incorrect)"] --> D["POST → not cached,<br/>missed optimization"]`,
    realProjectExample:
      "A frequently-called product search initially modeled as an action was recognized during a performance review as genuinely read-only; remodeling it as a function let a CDN cache repeated identical searches, meaningfully reducing backend load for a high-traffic operation.",
    interviewTip:
      "If asked to justify the action-vs-function distinction beyond 'semantics', the concrete HTTP-caching performance implication is a strong, specific technical justification interviewers respond well to.",
    followupQuestions: [
      "What other HTTP semantics does GET carry beyond cacheability?",
      "Would a function with parameters still be cacheable the same way?",
      "How would you identify if an existing action should actually be a function?",
    ],
    commonMistakes: [
      "Modeling read-only operations as actions out of habit, missing the caching benefit of functions.",
      "Not connecting the action/function distinction to concrete HTTP semantics like caching.",
    ],
    importantPoints: [
      "Functions map to GET — safe to cache by CDNs, browsers, gateways.",
      "Actions map to POST — not cached by default, since side effects are assumed possible.",
      "Modeling a genuinely read-only operation as a function unlocks real caching performance benefits.",
    ],
    revisionNotes: "Function → GET → cacheable (CDN/browser/gateway). Action → POST → not cached by default. Model genuinely read-only ops as functions for caching benefits.",
  },
  {
    id: "cap-q28",
    topic: "Authentication",
    prompt: "How would a CAP service authenticate a request coming from another internal microservice, versus an end user?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["authentication", "service-to-service"],
    estimatedMinutes: 2,
    expectedAnswer:
      "An end-user request carries a JWT obtained via the Authorization Code flow, representing that specific person; a service-to-service call typically uses a JWT obtained via the Client Credentials flow, representing the calling service itself rather than any individual user — CAP's authentication middleware validates both the same way, but `req.user` reflects a technical/service identity in the latter case.",
    detailedAnswer:
      "From the receiving CAP service's perspective, both kinds of requests arrive as a bearer JWT validated the same way against XSUAA — the middleware doesn't fundamentally care how the token was obtained. The meaningful difference is in the token's origin and content: an end-user token comes from the Authorization Code flow and represents a real person with their specific roles/scopes, while a service-to-service token comes from the Client Credentials flow and represents the calling service's own identity and scopes (not any particular end user) — meaning `req.user` in your handler reflects a technical/service principal in that case, which matters if your authorization logic assumes a real human user's specific attributes are always present.",
    hindiExplanation:
      "Receiving CAP service ke perspective se, dono tarah ki requests ek bearer JWT ki tarah arrive hoti hain XSUAA ke against same tarike se validated — middleware fundamentally care nahi karta token kaise obtain hua. Meaningful difference token ke origin aur content mein hai: end-user token Authorization Code flow se aata hai aur ek real person ko represent karta hai unke specific roles/scopes ke saath, jabki service-to-service token Client Credentials flow se aata hai aur calling service ki khud ki identity/scopes represent karta hai (koi particular end user nahi) — matlab tumhare handler mein `req.user` ek technical/service principal reflect karta hai us case mein.",
    interviewExplanation:
      "I'd explain the shared validation but different origin: 'Both arrive as a bearer JWT validated the same way by CAP's middleware against XSUAA. The difference is origin — an end-user token comes from Authorization Code and represents a real person's roles. A service-to-service token comes from Client Credentials and represents the calling service's own identity, not any user — so req.user reflects a technical principal, which matters if your authorization logic assumes a real user is always present.'",
    diagramNote:
      "'End-user request: JWT from Authorization Code flow → req.user = real person' vs 'Service-to-service request: JWT from Client Credentials flow → req.user = technical/service identity' — both validated the same way by middleware.",
    diagramMermaid: `flowchart LR
    A["End-user request:<br/>Authorization Code JWT"] --> B["req.user = real person"]
    C["Service-to-service request:<br/>Client Credentials JWT"] --> D["req.user = technical/service identity"]`,
    realProjectExample:
      "An authorization check that assumed req.user always had a department attribute broke when called by an internal batch service using Client Credentials, since that technical principal had no department — the fix explicitly handled the technical-principal case separately from the real-user case.",
    interviewTip:
      "If asked to design authorization logic for an endpoint called both by users and other services, explicitly considering the technical-principal case (not just assuming a real user) shows mature, defensive design thinking.",
    followupQuestions: [
      "What scopes would a Client Credentials token typically carry, compared to a user token?",
      "How would you write authorization logic that handles both a real user and a technical service principal gracefully?",
      "Would you ever want to reject service-to-service calls to a particular endpoint entirely?",
    ],
    commonMistakes: [
      "Assuming req.user always represents a real human user with all expected personal attributes present.",
      "Not distinguishing which OAuth grant type a given caller's token actually came from.",
    ],
    importantPoints: [
      "Both request types are validated the same way by CAP's authentication middleware.",
      "End-user tokens come from Authorization Code; service-to-service tokens from Client Credentials.",
      "req.user reflects a technical/service identity for service-to-service calls, not a real user's attributes.",
    ],
    revisionNotes: "Both validated the same by middleware, but origin differs: user JWT (Authorization Code) vs service JWT (Client Credentials) — req.user reflects a technical principal in the latter case.",
  },
  {
    id: "cap-q29",
    topic: "Authorization",
    prompt: "How would you implement a field-level authorization restriction — hiding a specific sensitive field from users without the right role, while still allowing them to read the rest of the entity?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["authorization", "field-level"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Use the `@restrict` annotation at the field level (not just entity/service level) to declare that reading that specific field requires an additional role, so users without it still get the entity but with that field omitted or redacted from the response.",
    detailedAnswer:
      "While `@restrict` is often shown at the entity level (controlling entire CRUD operations), CDS also supports restricting access to specific fields — declaring that a sensitive field like a salary or an internal risk score requires a specific role to be included in the response at all. Users lacking that role still successfully read the entity (assuming they have general read access), but the restricted field is simply omitted/redacted rather than the whole request being denied. This is more surgical than entity-level restriction, appropriate when most of an entity's data should be broadly readable but a specific subset of fields needs tighter, role-gated visibility — a common real requirement for HR or financial data mixed with otherwise-general entity information.",
    hindiExplanation:
      "Jabki `@restrict` aksar entity level pe dikhaya jaata hai (poori CRUD operations control karte hue), CDS specific fields tak access restrict karna bhi support karta hai — declare karna ki ek sensitive field jaise salary ya internal risk score ek specific role chahiye response mein include hone ke liye. Jin users ke paas wo role nahi hai wo phir bhi entity read kar lete hain (assuming unke paas general read access hai), lekin restricted field simply omit/redact ho jaata hai poori request deny hone ki jagah. Ye entity-level restriction se zyada surgical hai.",
    interviewExplanation:
      "I'd explain the field-level granularity: 'CDS supports @restrict at the field level, not just entity level — declaring that a specific sensitive field, like salary, requires a role to be included in the response at all. Users without that role still read the entity fine, but that field is simply omitted rather than the whole request being denied — more surgical than entity-level restriction, common for mixing HR/financial fields with otherwise general data.'",
    diagramNote:
      "'Entity read request' → user has general read access → 'Entity returned' but 'sensitive field (@restrict at field level) omitted unless user has the specific role'.",
    diagramMermaid: `flowchart TD
    A["Entity read request"] --> B["User has general read access"]
    B --> C["Entity returned"]
    C --> D["Sensitive field omitted<br/>unless user has specific role"]`,
    realProjectExample:
      "An employee entity exposed general profile fields to all authenticated users, while a salary field was restricted at the field level to only those with an 'HR' role — regular users successfully read employee records but simply never saw the salary field in the response at all.",
    interviewTip:
      "If asked how to handle 'most of this entity is fine to read, but one field is sensitive', field-level @restrict is the precise, correct answer — not denying the entire entity's read access over one sensitive field.",
    followupQuestions: [
      "How would this differ from simply not including the field in a projection at all for certain consumers?",
      "Can field-level restriction be combined with entity-level @restrict rules?",
      "How would you test that a restricted field is genuinely never returned to unauthorized users?",
    ],
    commonMistakes: [
      "Denying read access to an entire entity just because one field within it is sensitive.",
      "Not knowing @restrict can be applied at the field level, not just entity/service level.",
    ],
    importantPoints: [
      "@restrict can be applied at the field level for surgical, granular restrictions.",
      "Users without the required role still read the entity, minus the restricted field.",
      "More appropriate than entity-level restriction when only specific fields are sensitive.",
    ],
    revisionNotes: "Field-level @restrict = surgical restriction, entity still readable, sensitive field simply omitted for users without the required role.",
  },
  {
    id: "cap-q30",
    topic: "Draft",
    prompt: "What happens to a draft if the user closes their browser tab without explicitly saving or discarding it?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["draft", "cleanup"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The draft persists in the draft table indefinitely by default (since it's server-persisted, not tied to the browser session), but CAP's draft handling includes an automatic cleanup mechanism that periodically deletes stale, abandoned drafts past a configurable age, so orphaned drafts don't accumulate forever.",
    detailedAnswer:
      "Since drafts are stored server-side (not just in browser memory), simply closing a tab doesn't delete anything — the draft record remains in the shadow draft table, potentially resumable if the user comes back later via 'Draft: resume editing'. But without any cleanup, abandoned drafts from users who never return would accumulate indefinitely, wasting storage and cluttering draft-related queries. CAP's draft handling includes a built-in, configurable stale-draft cleanup process (often run as a periodic job) that automatically deletes drafts older than a defined threshold (commonly a day or some configurable period), balancing 'let users resume their work later' against 'don't accumulate abandoned drafts forever'.",
    hindiExplanation:
      "Kyunki drafts server-side store hote hain (sirf browser memory mein nahi), sirf tab band karne se kuch delete nahi hota — draft record shadow draft table mein rehta hai, potentially resumable agar user baad mein wapas aaye 'Draft: resume editing' ke through. Lekin bina kisi cleanup ke, abandoned drafts un users se jo kabhi wapas nahi aate indefinitely accumulate ho jaate, storage waste karte hue. CAP ki draft handling mein ek built-in, configurable stale-draft cleanup process hota hai (aksar ek periodic job ki tarah chalta hai) jo automatically drafts ko delete kar deta hai ek defined threshold se purane (commonly ek din ya koi configurable period).",
    interviewExplanation:
      "I'd explain the persistence and the cleanup: 'Since drafts are server-persisted, closing a tab doesn't delete anything — it stays resumable in the draft table. Without cleanup, abandoned drafts would accumulate forever, so CAP includes a built-in, configurable stale-draft cleanup process that automatically deletes drafts past a threshold age, balancing resumability against unbounded accumulation.'",
    diagramNote:
      "'User closes tab, draft not saved/discarded' → 'Draft persists server-side (resumable)' → 'Stale-draft cleanup job (periodic)' → 'Deletes drafts past configurable age threshold'.",
    diagramMermaid: `flowchart TD
    A["User closes tab<br/>draft not saved/discarded"] --> B["Draft persists server-side<br/>resumable"]
    B --> C["Stale-draft cleanup job<br/>periodic"]
    C --> D["Deletes drafts past<br/>configurable age threshold"]`,
    realProjectExample:
      "Monitoring the draft table revealed a steady accumulation of old, abandoned drafts before the stale-draft cleanup job was properly configured with an appropriate age threshold — after configuring it, the table size stabilized as old abandoned drafts were automatically purged.",
    interviewTip:
      "If asked 'do drafts ever get cleaned up automatically', confidently confirming CAP has a built-in stale-draft cleanup mechanism (not something you must build entirely from scratch) shows accurate framework knowledge.",
    followupQuestions: [
      "How would you configure the stale-draft cleanup threshold?",
      "Would a user ever lose in-progress work due to this cleanup running too aggressively?",
      "How would you monitor draft table growth to catch a cleanup misconfiguration?",
    ],
    commonMistakes: [
      "Assuming a draft disappears automatically the moment a user closes their browser tab.",
      "Not knowing CAP includes a built-in stale-draft cleanup mechanism, and assuming you'd need to build one entirely from scratch.",
    ],
    importantPoints: [
      "Drafts are server-persisted — closing a tab doesn't delete them, they remain resumable.",
      "CAP includes a built-in, configurable stale-draft cleanup process.",
      "This balances resumability against unbounded draft accumulation.",
    ],
    revisionNotes: "Closing a tab doesn't delete a draft (server-persisted, resumable). CAP's built-in stale-draft cleanup job purges drafts past a configurable age threshold.",
  },
  {
    id: "cap-q31",
    topic: "Multitenancy",
    prompt: "How would you handle a schema migration (adding a new field) across all tenants in a multitenant CAP application?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["multitenancy", "schema-migration"],
    estimatedMinutes: 3,
    expectedAnswer:
      "CAP's multitenancy tooling (via the SaaS Provisioning/upgrade mechanism) applies schema updates to every tenant's HDI container automatically during an app upgrade — you don't manually migrate each tenant's database individually; the framework orchestrates rolling the new schema out across all subscribed tenants.",
    detailedAnswer:
      "In a multitenant CAP app, each tenant's data lives in its own HDI container, but you don't want to manually run migration scripts against dozens or hundreds of tenant containers individually. CAP's multitenancy library integrates with an upgrade mechanism (triggered via the SaaS Provisioning service's upgrade callback, or the `cds-mtxs` upgrade tooling) that, upon deploying a new app version with schema changes, systematically applies the new schema to every currently-subscribed tenant's HDI container — handling this rollout in a controlled, often batched/sequential manner rather than requiring per-tenant manual scripts, and typically providing status/error reporting per tenant so a failure on one tenant's upgrade doesn't silently corrupt or block the others.",
    hindiExplanation:
      "Ek multitenant CAP app mein, har tenant ka data uske apne HDI container mein rehta hai, lekin tum dozens ya sainkdo tenant containers ke against manually migration scripts nahi chalana chahte individually. CAP ki multitenancy library ek upgrade mechanism ke saath integrate hoti hai (SaaS Provisioning service ke upgrade callback se, ya `cds-mtxs` upgrade tooling se trigger hota hai) jo, ek naya app version deploy hone pe schema changes ke saath, systematically naya schema har currently-subscribed tenant ke HDI container mein apply karta hai — is rollout ko controlled, often batched/sequential manner mein handle karta hai, aur typically per-tenant status/error reporting deta hai.",
    interviewExplanation:
      "I'd explain the automated tooling: 'CAP's multitenancy library integrates with an upgrade mechanism, via SaaS Provisioning callbacks or cds-mtxs tooling, that automatically applies new schema changes to every subscribed tenant's HDI container when you deploy a new app version — you don't manually migrate each tenant. It handles this in a controlled, batched manner with per-tenant status reporting, so one tenant's failure doesn't silently affect the others.'",
    diagramNote:
      "'New app version deployed (schema change)' → 'CAP multitenancy upgrade tooling' → 'Systematically applies new schema to every subscribed tenant's HDI container' → 'Per-tenant status/error reporting'.",
    diagramMermaid: `flowchart TD
    A["New app version deployed<br/>schema change"] --> B["CAP multitenancy<br/>upgrade tooling"]
    B --> C["Applies new schema to<br/>every subscribed tenant's HDI container"]
    C --> D["Per-tenant status/error reporting"]`,
    realProjectExample:
      "Adding a new field to our multitenant SaaS product's data model was deployed once, and the upgrade tooling automatically rolled the schema change out across all 40 subscribed tenants' HDI containers, with the deployment dashboard showing per-tenant success status rather than us manually tracking or scripting each one.",
    interviewTip:
      "If asked 'how would you migrate 100 tenant databases', naming CAP's built-in multitenancy upgrade tooling (rather than describing a custom script you'd write yourself) shows awareness of a real, existing framework capability.",
    followupQuestions: [
      "What happens if the schema upgrade fails for one specific tenant?",
      "Does every tenant get upgraded simultaneously, or in some sequence/batches?",
      "How would you test a schema migration before rolling it out to real tenants?",
    ],
    commonMistakes: [
      "Assuming you'd need to write and run custom per-tenant migration scripts manually.",
      "Not knowing CAP's multitenancy tooling automates schema rollout across all subscribed tenants.",
    ],
    importantPoints: [
      "CAP's multitenancy upgrade tooling automates schema rollout across all tenant HDI containers.",
      "Triggered via SaaS Provisioning upgrade callbacks or cds-mtxs tooling.",
      "Provides per-tenant status/error reporting, isolating failures.",
    ],
    revisionNotes: "Multitenant schema migration = automated via CAP's multitenancy upgrade tooling (SaaS Provisioning/cds-mtxs) — rolls out to every tenant's HDI container, with per-tenant status reporting.",
  },
  {
    id: "cap-q32",
    topic: "Events",
    prompt: "What's the difference between an 'inbound' event handler and an 'outbound' event emission in CAP?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["events", "inbound-outbound"],
    estimatedMinutes: 2,
    expectedAnswer:
      "An inbound handler reacts to an event this service receives (from another service or an external source, via `.on('SomeEvent', ...)`), while outbound emission is this service actively publishing an event for others to react to (via `srv.emit('SomeEvent', payload)`) — the same service can both consume events from others and emit its own.",
    detailedAnswer:
      "These are two sides of the same event-driven coin. Inbound: a service declares `srv.on('OrderCreated', ...)` to react whenever that event arrives, whether it originated from another CAP service, a message broker subscription, or an internal emission elsewhere. Outbound: the same or a different service actively creates and emits an event via `await srv.emit('OrderCreated', { orderId, ... })` when something noteworthy happens, without needing to know who (if anyone) is actually listening. A well-designed event-driven CAP application often has services doing both — emitting events about its own significant occurrences, and reacting to events from others — decoupled from each other exactly as covered in the Event Mesh pub-sub discussion.",
    hindiExplanation:
      "Ye event-driven coin ke do sides hain. Inbound: ek service `srv.on('OrderCreated', ...)` declare karti hai react karne ke liye jab bhi wo event aaye, chahe wo doosri CAP service se aaya ho, ek message broker subscription se, ya internally kahin emit hua ho. Outbound: wahi ya koi doosri service actively ek event create/emit karti hai `await srv.emit('OrderCreated', { orderId, ... })` se jab kuch noteworthy hota hai, ye jaane bina ki kaun (agar koi hai) actually sun raha hai. Ek achhi tarah design ki gayi event-driven CAP application mein aksar services dono karti hain.",
    interviewExplanation:
      "I'd give the syntax and the relationship: 'Inbound is srv.on(\\'OrderCreated\\', ...), reacting to an event this service receives, from anywhere. Outbound is srv.emit(\\'OrderCreated\\', payload), this service actively publishing an event without knowing who's listening. A well-designed event-driven app often does both — emitting its own significant events, and reacting to others' — decoupled exactly like the pub-sub pattern.'",
    diagramNote:
      "'Inbound: srv.on(\"OrderCreated\", ...) — reacts to events received' vs 'Outbound: srv.emit(\"OrderCreated\", payload) — actively publishes, doesn't know who's listening'.",
    diagramMermaid: `flowchart LR
    A["Inbound: srv.on('OrderCreated', ...)"] --> B["Reacts to events received"]
    C["Outbound: srv.emit('OrderCreated', payload)"] --> D["Actively publishes,<br/>doesn't know who's listening"]`,
    realProjectExample:
      "Our order service emitted an 'OrderCreated' event outbound whenever a new order was placed, while a separate notification service had an inbound handler reacting to that same event to send a confirmation email — completely decoupled, the order service never knew the notification service existed.",
    interviewTip:
      "If asked to design an event-driven feature, being explicit about which parts are inbound handlers versus outbound emissions in your explanation demonstrates precise, structured thinking rather than a vague 'events happen' description.",
    followupQuestions: [
      "How would srv.emit relate to Event Mesh if the event needs to reach an external subscriber?",
      "Can a single handler both react to an inbound event and emit a new outbound one?",
      "What happens if srv.emit is called but nothing is currently subscribed to that event?",
    ],
    commonMistakes: [
      "Confusing inbound event handling with outbound event emission as the same concept.",
      "Not knowing the same service can both emit and handle events, playing both roles.",
    ],
    importantPoints: [
      "Inbound = srv.on(...), reacting to events this service receives.",
      "Outbound = srv.emit(...), this service actively publishing events for others.",
      "The same service can both emit its own events and react to others' — fully decoupled.",
    ],
    revisionNotes: "Inbound = srv.on(...) reacts to received events. Outbound = srv.emit(...) publishes events, decoupled from who's listening. Same service can do both.",
  },
  {
    id: "cap-q33",
    topic: "Deployments",
    prompt: "What is `cds build` used for, and how does it relate to `cds watch` and `cf deploy`?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["deployments", "cds-build"],
    estimatedMinutes: 2,
    expectedAnswer:
      "`cds build` compiles and prepares your CAP project's deployable artifacts (a `gen/` folder with production-ready configuration and compiled models) for actual deployment — distinct from `cds watch`, which is for local dev with live reload, and separate from `mbt build`/`cf deploy`, which package and deploy the MTA including this build output.",
    detailedAnswer:
      "`cds watch` is purely a local development convenience — live reload, in-memory database, fast iteration, never meant for production. `cds build` is the step that actually prepares your project for deployment: it compiles CDS models, resolves configuration for the target profile (like production database settings instead of local SQLite), and outputs the result into a `gen/` folder structured for actual deployment. `mbt build` (for MTA-based deployment) typically invokes `cds build` as part of packaging the whole application (potentially alongside a UI module) into the final `.mtar` artifact, which `cf deploy` then actually deploys. So the pipeline is: `cds watch` (dev-time only) → `cds build` (production artifact prep) → `mbt build` (full MTA packaging) → `cf deploy` (actual deployment).",
    hindiExplanation:
      "`cds watch` purely ek local development convenience hai — live reload, in-memory database, fast iteration, kabhi production ke liye meant nahi. `cds build` wo step hai jo actually tumhare project ko deployment ke liye prepare karta hai: CDS models compile karta hai, target profile ke liye configuration resolve karta hai (jaise production database settings, local SQLite ki jagah), aur result ko ek `gen/` folder mein output karta hai. `mbt build` (MTA-based deployment ke liye) typically `cds build` ko invoke karta hai poori application ko package karne ke hisse ki tarah, jo `cf deploy` fir actually deploy karta hai.",
    interviewExplanation:
      "I'd walk through the full pipeline: 'cds watch is purely dev-time — live reload, in-memory DB. cds build actually prepares production artifacts — compiling CDS models and resolving production config into a gen/ folder. mbt build invokes cds build as part of packaging the whole app into an .mtar, and cf deploy actually deploys that. So it's: cds watch for dev, cds build for artifact prep, mbt build for MTA packaging, cf deploy for actual deployment.'",
    diagramNote:
      "'cds watch (dev-time, live reload, in-memory DB)' → separate from → 'cds build (production artifact prep, gen/ folder)' → 'mbt build (MTA packaging, invokes cds build)' → 'cf deploy (actual deployment)'.",
    diagramMermaid: `flowchart LR
    A["cds watch<br/>dev-time only"]
    B["cds build<br/>production artifact prep"] --> C["mbt build<br/>MTA packaging"] --> D["cf deploy<br/>actual deployment"]`,
    realProjectExample:
      "Our CI/CD pipeline never ran cds watch at all (that was purely for local developer iteration) — it ran mbt build, which internally invoked cds build to prepare production configuration, producing the .mtar that cf deploy then shipped to each environment.",
    interviewTip:
      "If asked 'is cds watch used in your CI/CD pipeline', the correct answer is no — it's strictly a local dev convenience; the pipeline uses cds build (via mbt build) instead.",
    followupQuestions: [
      "What does the gen/ folder produced by cds build actually contain?",
      "How would you configure different database settings for local dev versus the production build?",
      "Would you ever run cds build manually outside of an mbt build invocation?",
    ],
    commonMistakes: [
      "Confusing cds watch (dev-time) with cds build (production artifact preparation).",
      "Not knowing mbt build invokes cds build internally as part of MTA packaging.",
    ],
    importantPoints: [
      "cds watch = local dev only, live reload, in-memory DB.",
      "cds build = prepares production artifacts (compiled models, resolved config) into gen/.",
      "Pipeline: cds watch (dev) → cds build (artifact prep) → mbt build (MTA packaging) → cf deploy.",
    ],
    revisionNotes: "cds watch = dev-time only. cds build = production artifact prep (gen/ folder). mbt build invokes cds build, packages MTA. cf deploy actually deploys.",
  },
  {
    id: "cap-q34",
    topic: "Testing",
    prompt: "How would you test a CAP action that requires specific authorization scopes, without a real XSUAA-issued token?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["testing", "mocked-auth"],
    estimatedMinutes: 2,
    expectedAnswer:
      "`cds.test` supports mocking the authenticated user's identity and roles/scopes directly in the test (via a mock auth configuration or a helper like specifying a user context), letting you simulate 'a request from a user with the Admin role' without needing a real XSUAA token exchange in the test environment.",
    detailedAnswer:
      "Requiring a real XSUAA OAuth flow in every automated test would be slow, fragile, and dependent on external infrastructure being available — not something you want in a fast CI test suite. CAP's testing utilities support mocked authentication, letting you specify (often via test configuration or a helper on the test's request object) that a given test request should be treated as coming from a user with specific roles, without any real token exchange happening — the test framework short-circuits the JWT validation and directly sets up the equivalent of `req.user` with the mocked identity/scopes you specified, letting you test authorization-dependent logic (including negative tests — 'a user WITHOUT the Admin role should get a 403') entirely offline and fast.",
    hindiExplanation:
      "Har automated test mein ek real XSUAA OAuth flow require karna slow, fragile, aur external infrastructure available hone pe dependent hoga — ye kuch nahi jo tum fast CI test suite mein chahte ho. CAP ki testing utilities mocked authentication support karti hain, tumhe specify karne dete hain (aksar test configuration ya test ke request object pe ek helper ke through) ki ek given test request ko specific roles wale user se aaya hua treat kiya jaaye, bina kisi real token exchange ke — test framework JWT validation ko short-circuit kar deta hai aur directly `req.user` ka equivalent set kar deta hai mocked identity/scopes ke saath.",
    interviewExplanation:
      "I'd explain the practical necessity and mechanism: 'Requiring real XSUAA tokens in every test would be slow and fragile. CAP's testing utilities support mocked authentication — specifying that a test request comes from a user with specific roles, without any real token exchange. The test framework short-circuits validation and sets up req.user directly, letting me test both positive cases and negative ones — like a user without the right role correctly getting a 403 — entirely offline and fast.'",
    diagramNote:
      "'Real XSUAA flow (slow, needs external infra)' vs 'Mocked auth in cds.test (specify roles directly, no token exchange, fast/offline)' — both let you test authorization logic, mocked is preferred for CI.",
    diagramMermaid: `flowchart LR
    A["Real XSUAA flow"] --> B["Slow, needs external infra"]
    C["Mocked auth in cds.test"] --> D["Specify roles directly,<br/>fast/offline — preferred for CI"]`,
    realProjectExample:
      "Our test suite used cds.test's mocked authentication to run both a positive test (an Admin-role user successfully calling a restricted action) and a negative test (a user without that role correctly receiving a 403), entirely in CI with no real XSUAA dependency at all.",
    interviewTip:
      "If asked 'how would you test a 403 scenario', the mocked-auth approach in cds.test is the precise, correct answer — attempting to actually obtain a real invalid/insufficient token in a test would be needlessly complex and slow.",
    followupQuestions: [
      "How would you configure a mocked user's specific roles/scopes in a cds.test setup?",
      "Would you ever also want an integration test against a real XSUAA instance, and when?",
      "How does mocked auth interact with instance-based authorization checks in tests?",
    ],
    commonMistakes: [
      "Attempting to set up real XSUAA token exchange in every automated test, making the suite slow and fragile.",
      "Not testing negative authorization cases (insufficient role) at all, only positive ones.",
    ],
    importantPoints: [
      "cds.test supports mocked authentication — specify a test user's roles/scopes directly.",
      "No real token exchange needed, keeping tests fast and offline.",
      "Enables testing both positive and negative (403) authorization scenarios.",
    ],
    revisionNotes: "Test CAP authorization via cds.test's mocked auth — specify roles directly, no real XSUAA token needed, test both positive and negative (403) cases fast and offline.",
  },
  {
    id: "cap-q35",
    topic: "Testing",
    prompt: "Beyond cds.test, would you write unit tests for complex business logic extracted into plain functions?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["testing", "unit-testing"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — complex, non-trivial calculation or business rule logic is often worth extracting into plain, framework-independent functions specifically so they can be unit-tested in isolation quickly, complementing (not replacing) the broader integration-style tests via cds.test that exercise the full service.",
    detailedAnswer:
      "cds.test-based integration tests are valuable for verifying the whole request/handler/generated-CRUD pipeline works together correctly, but they're relatively heavier-weight (bootstrapping the service) and less suited to exhaustively testing every edge case of a complex calculation (many different input combinations, boundary conditions). A common, complementary pattern is extracting genuinely complex business logic (a pricing calculation, a validation rule with many conditions) into a plain, framework-independent function that a handler simply calls — this function can then be unit-tested directly and exhaustively with a standard test runner, covering many edge cases quickly without any service bootstrap overhead, while cds.test-based tests still verify the overall integration (that the handler correctly wires this logic into the actual request/response flow).",
    hindiExplanation:
      "cds.test-based integration tests valuable hain poore request/handler/generated-CRUD pipeline ko verify karne ke liye ki wo saath mein sahi se kaam karta hai, lekin ye relatively heavier-weight hote hain (service bootstrap karna) aur ek complex calculation ke har edge case ko exhaustively test karne ke liye utne suited nahi. Ek common, complementary pattern hai genuinely complex business logic (jaise ek pricing calculation) ko ek plain, framework-independent function mein extract karna jise handler simply call kare — ye function fir directly aur exhaustively unit-test ho sakta hai bina kisi service bootstrap overhead ke.",
    interviewExplanation:
      "I'd frame it as complementary, not either/or: 'cds.test integration tests verify the whole pipeline works together, but are heavier and less suited to exhaustively covering every edge case of a complex calculation. I'd extract genuinely complex logic into a plain function a handler calls, unit-test that function directly and exhaustively with a standard test runner, and still keep integration tests to verify the handler wires it into the actual request flow correctly.'",
    diagramNote:
      "'Complex business logic extracted into a plain function' → 'Unit-tested directly, exhaustively, fast (no service bootstrap)' + 'cds.test integration test verifies handler wires it into the real request flow'.",
    diagramMermaid: `flowchart LR
    A["Complex logic extracted<br/>into plain function"] --> B["Unit-tested directly,<br/>exhaustively, fast"]
    A --> C["Still wired into handler,<br/>verified by cds.test integration test"]`,
    realProjectExample:
      "A complex shipping-cost calculation with many conditional rules was extracted into a standalone function, unit-tested against a dozen edge-case scenarios in milliseconds, while a separate, smaller cds.test integration test simply verified the handler correctly called that function and returned its result through the actual API.",
    interviewTip:
      "If asked 'do you only use cds.test or also plain unit tests', the strong answer explains the complementary use of both, rather than picking one exclusively — this shows a nuanced testing strategy.",
    followupQuestions: [
      "What kind of business logic is worth extracting into a testable plain function versus keeping inline in a handler?",
      "How would you structure a project to make this extraction pattern consistent across the team?",
      "Would you use a different test runner for the plain unit tests versus the cds.test integration tests?",
    ],
    commonMistakes: [
      "Relying only on integration tests via cds.test, missing exhaustive edge-case coverage for complex logic.",
      "Embedding complex, hard-to-test business logic directly inline in handlers instead of extracting it.",
    ],
    importantPoints: [
      "Extract complex business logic into plain, framework-independent functions.",
      "Unit-test those functions directly and exhaustively, without service bootstrap overhead.",
      "Keep cds.test integration tests to verify the overall wiring, complementing unit tests.",
    ],
    revisionNotes: "Extract complex logic into plain functions for fast, exhaustive unit testing — complements (doesn't replace) cds.test integration tests verifying overall wiring.",
  },
  {
    id: "cap-q36",
    topic: "Node.js CAP",
    prompt: "What does the generated `srv/cat-service.js` handler file get automatically wired to, without any manual routing code?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["nodejs-cap", "wiring"],
    estimatedMinutes: 2,
    expectedAnswer:
      "CAP auto-wires a JS implementation file to its corresponding CDS service definition purely by matching file name/location convention (e.g. `srv/cat-service.js` implements `srv/cat-service.cds`) — no manual route registration, Express router setup, or explicit binding code is needed.",
    detailedAnswer:
      "This is core to CAP's 'convention over configuration' philosophy: a service defined in `srv/cat-service.cds` automatically gets its implementation resolved from `srv/cat-service.js` in the same folder with the same base name, and CAP's runtime wires up all the OData routes, CRUD operations, and any exported/registered handler functions from that JS file automatically at startup — you never write `app.get('/Books', ...)` style Express routes yourself for a standard CAP service.",
    hindiExplanation:
      "Ye CAP ki 'convention over configuration' philosophy ka core hai: `srv/cat-service.cds` mein defined ek service automatically apni implementation `srv/cat-service.js` se resolve kar leti hai same folder mein same base name ke saath, aur CAP ka runtime saare OData routes, CRUD operations, aur us JS file se koi bhi exported/registered handler functions automatically startup pe wire kar deta hai — tum kabhi `app.get('/Books', ...)` jaisa Express routes khud nahi likhte ek standard CAP service ke liye.",
    interviewExplanation:
      "I'd emphasize the convention-based wiring: 'CAP auto-wires a service's implementation purely by file naming convention — cat-service.cds pairs automatically with cat-service.js in the same folder. All OData routes and CRUD operations get wired at startup without me writing any Express routes myself.'",
    diagramNote:
      "'srv/cat-service.cds (service definition)' + 'srv/cat-service.js (same name, same folder)' → auto-paired by CAP at startup → 'All routes/CRUD wired automatically, no manual Express code'.",
    diagramMermaid: `flowchart LR
    A["srv/cat-service.cds"] --> C["Auto-paired by CAP<br/>naming convention"]
    B["srv/cat-service.js"] --> C
    C --> D["Routes/CRUD wired<br/>automatically at startup"]`,
    realProjectExample:
      "Renaming a service definition file without renaming its paired JS implementation broke the auto-wiring entirely — a clear demonstration of how strictly file-naming-convention-based this mechanism is.",
    interviewTip:
      "If asked 'where do you register your Express routes for a CAP service', the correct answer is you generally don't — that's precisely what CAP's convention-based auto-wiring eliminates.",
    followupQuestions: [
      "What happens if no JS implementation file exists for a CDS service definition?",
      "Can a service's implementation be split across multiple JS files?",
      "How would you override or extend this default wiring behavior?",
    ],
    commonMistakes: [
      "Writing manual Express routes for a standard CAP service instead of relying on convention-based wiring.",
      "Renaming a service definition file without renaming its paired implementation file to match.",
    ],
    importantPoints: [
      "CAP auto-wires implementation via file naming/location convention.",
      "srv/cat-service.cds pairs with srv/cat-service.js automatically.",
      "No manual Express route registration needed for standard CAP services.",
    ],
    revisionNotes: "CAP auto-wires srv/X.cds to srv/X.js by naming convention — all routes/CRUD wired automatically at startup, no manual Express routing needed.",
  },
  {
    id: "cap-q37",
    topic: "Java CAP",
    prompt: "How does CAP Java's generated `_` suffixed classes (like `Orders_`) help with type-safe query building?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["java-cap", "type-safety"],
    estimatedMinutes: 2,
    expectedAnswer:
      "CAP Java generates strongly-typed interface classes (conventionally suffixed with an underscore, like `Orders_`) from the CDS model, letting you build queries and reference fields with compile-time type checking and IDE autocomplete, instead of writing error-prone raw strings for entity/field names.",
    detailedAnswer:
      "Rather than referencing an entity or field by a raw string (`'Orders'`, `'status'`) which the compiler can't validate and typos in which only surface at runtime, CAP Java's build process generates typed interfaces from your CDS model — `Orders_.CDS_NAME` for the entity name, and typed field accessors — that a Java compiler checks at compile time and an IDE can autocomplete. This catches a whole category of typo/rename-related bugs before the code ever runs, and keeps queries in sync automatically if you rename a field in the CDS model (the generated class regenerates, and any code still referencing the old name fails to compile immediately, rather than failing silently at runtime).",
    hindiExplanation:
      "Ek entity ya field ko raw string se reference karne ki jagah (`'Orders'`, `'status'`) jise compiler validate nahi kar sakta, CAP Java ka build process CDS model se typed interfaces generate karta hai — `Orders_.CDS_NAME` entity name ke liye, aur typed field accessors — jo ek Java compiler compile time pe check karta hai aur ek IDE autocomplete kar sakta hai. Ye typo/rename-related bugs ki poori category ko code run hone se pehle hi pakad leta hai.",
    interviewExplanation:
      "I'd explain the compile-time safety benefit: 'CAP Java generates typed interfaces like Orders_ from the CDS model, so referencing entities and fields gets compile-time checking and IDE autocomplete instead of raw error-prone strings. If I rename a field in CDS, the generated class regenerates and any code still using the old name fails to compile immediately, rather than failing silently at runtime.'",
    diagramNote:
      "'CDS model (entity Orders)' → 'CAP Java build generates Orders_ typed class' → 'Compile-time checked queries/field references, IDE autocomplete, rename-safety'.",
    diagramMermaid: `flowchart LR
    A["CDS model: entity Orders"] --> B["CAP Java build generates<br/>Orders_ typed class"]
    B --> C["Compile-time checked queries,<br/>IDE autocomplete, rename-safety"]`,
    realProjectExample:
      "Renaming a field in the CDS model caused several Java files referencing the old field name via the generated typed class to immediately fail compilation, surfacing every affected location clearly at build time rather than as scattered runtime failures discovered later.",
    interviewTip:
      "If asked why CAP Java bothers generating these typed classes at all, the concrete answer is catching typo/rename bugs at compile time instead of runtime — a real, practical benefit, not just boilerplate.",
    followupQuestions: [
      "When are these generated typed classes actually produced — at build time or on the fly?",
      "Does CAP Node.js have an equivalent typed-class mechanism, or does it rely on plain strings?",
      "How would a query look using the generated typed class versus a raw string reference?",
    ],
    commonMistakes: [
      "Using raw string entity/field references in Java when the generated typed class is available and safer.",
      "Not regenerating typed classes after a CDS model change, leading to stale generated code.",
    ],
    importantPoints: [
      "CAP Java generates typed interface classes (e.g. Orders_) from the CDS model.",
      "Enables compile-time checking and IDE autocomplete for entity/field references.",
      "Catches typo/rename bugs at compile time instead of at runtime.",
    ],
    revisionNotes: "CAP Java generates typed classes (e.g. Orders_) from CDS models — compile-time checked queries/fields, catching typo/rename bugs before runtime.",
  },
  {
    id: "cap-q38",
    topic: "CDS",
    prompt: "What is the purpose of CDS's `@readonly` and `@insertonly` annotations on a field or entity?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["cds", "annotations"],
    estimatedMinutes: 2,
    expectedAnswer:
      "`@readonly` marks a field or entity as never writable via the generated CRUD API (useful for computed or system-managed fields), while `@insertonly` allows a field/entity to be set only at creation, never updated afterward (useful for append-only or audit-log-style data).",
    detailedAnswer:
      "These annotations let you express intent declaratively rather than hand-writing custom validation handlers for simple write-restriction rules. `@readonly` on a field (like a calculated total) or an entire entity (like a reporting view) tells CAP's generated CRUD layer to simply reject any create/update attempt targeting it, without you writing an explicit check. `@insertonly` is more specific — it allows the initial creation to set a value, but rejects any subsequent update, appropriate for append-only patterns like an audit log entry or an immutable event record where changing history after the fact should never be allowed.",
    hindiExplanation:
      "Ye annotations tumhe intent declaratively express karne dete hain, simple write-restriction rules ke liye custom validation handlers hand-likhne ki jagah. `@readonly` ek field pe (jaise ek calculated total) ya poori entity pe (jaise ek reporting view) CAP ke generated CRUD layer ko batata hai ki koi bhi create/update attempt use target karta hua simply reject kar do, bina tumhe explicit check likhe. `@insertonly` zyada specific hai — ye initial creation ko value set karne deta hai, lekin koi bhi subsequent update reject karta hai.",
    interviewExplanation:
      "I'd give the distinction with examples: '@readonly on a field or entity tells the generated CRUD layer to reject any write attempt, useful for calculated fields or reporting views. @insertonly allows the value to be set at creation but rejects any later update — appropriate for append-only data like audit log entries where history should never be rewritten.'",
    diagramNote:
      "'@readonly: reject all create/update attempts' vs '@insertonly: allow set at creation, reject all later updates' — both declarative, no custom handler code needed.",
    diagramMermaid: `flowchart LR
    A["@readonly"] --> B["Rejects all create/update attempts"]
    C["@insertonly"] --> D["Allows set at creation,<br/>rejects later updates"]`,
    realProjectExample:
      "An audit log entity used @insertonly to ensure log entries could be created but never modified afterward, while a calculated 'totalPrice' field used @readonly to prevent clients from directly overwriting a value that should only ever be server-computed.",
    interviewTip:
      "If asked how you'd prevent an audit log from being tampered with after creation, naming @insertonly specifically (rather than describing a custom handler you'd write) shows precise framework knowledge.",
    followupQuestions: [
      "Would @readonly on a field also prevent it from being included in a create payload entirely, or just silently ignore it?",
      "How would @insertonly interact with draft mode editing?",
      "Could you achieve the same effect as @readonly with a custom handler instead?",
    ],
    commonMistakes: [
      "Writing custom validation handlers for simple write-restriction rules that @readonly/@insertonly already declaratively handle.",
      "Confusing @readonly (never writable) with @insertonly (writable only at creation).",
    ],
    importantPoints: [
      "@readonly = field/entity never writable via generated CRUD API.",
      "@insertonly = writable only at creation, never updated afterward.",
      "Both are declarative alternatives to hand-written write-restriction validation handlers.",
    ],
    revisionNotes: "@readonly = never writable. @insertonly = writable only at creation, never updated after — both declarative, avoid custom write-restriction handlers.",
  },
  {
    id: "cap-q39",
    topic: "Entities",
    prompt: "What's the effect of declaring a field with a `virtual` keyword in a CDS entity?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["entities", "virtual-fields"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A `virtual` field exists only in the exposed API shape, not in the database — it's never persisted, and must be populated at runtime by a custom handler (e.g. computed from other fields, or fetched from an external source), useful for exposing derived or dynamically-sourced data alongside real persisted fields.",
    detailedAnswer:
      "Declaring `virtual displayName: String;` on an entity adds that field to the entity's exposed shape (visible in the OData metadata, included in responses) but creates no corresponding database column — deployment/schema generation skips virtual fields entirely. Because nothing populates it automatically, you're responsible for filling it in via a custom handler (often an `after('READ', ...)` handler that computes or fetches the value and sets it on each result row) before the response is sent. This is useful for exposing computed values (like a formatted display name combining first/last name) or values sourced from an external system at read time, without needing a real, persisted column for them.",
    hindiExplanation:
      "`virtual displayName: String;` declare karne se ye field entity ke exposed shape mein add ho jaata hai (OData metadata mein visible, responses mein included) lekin koi corresponding database column create nahi hota — deployment/schema generation virtual fields ko entirely skip kar deta hai. Kyunki kuch bhi use automatically populate nahi karta, tum khud responsible ho use fill karne ke liye ek custom handler ke through (aksar ek `after('READ', ...)` handler jo value compute/fetch karta hai aur har result row pe set karta hai) response bhejne se pehle.",
    interviewExplanation:
      "I'd explain the no-persistence-plus-manual-population aspect: 'A virtual field appears in the exposed API shape and OData metadata, but has no database column at all — schema generation skips it. I'm responsible for populating it myself, typically via an after(READ) handler that computes or fetches the value. Useful for exposing computed or externally-sourced data without needing a real persisted column.'",
    diagramNote:
      "'virtual displayName: String' → exposed in API/OData metadata, no database column → 'after(READ) handler computes/fetches and sets the value on each result row before response'.",
    diagramMermaid: `flowchart TD
    A["virtual field declared"] --> B["Exposed in API/OData metadata,<br/>NO database column"]
    B --> C["after('READ') handler computes/<br/>fetches value at runtime"]`,
    realProjectExample:
      "A virtual 'riskScore' field was populated at read time by an after(READ) handler calling an external scoring service, appearing in API responses as if it were a normal field, without ever being stored in the database.",
    interviewTip:
      "If asked what happens if you forget to populate a virtual field in a handler, the honest answer is it simply returns as null/undefined in the response — nothing populates it automatically, unlike a real persisted column.",
    followupQuestions: [
      "Can a virtual field be written to, or is it strictly read-only in practice?",
      "How would a virtual field interact with filtering/sorting in an OData query?",
      "What's the performance implication of populating a virtual field from an external source on every read?",
    ],
    commonMistakes: [
      "Expecting a virtual field to be automatically populated without writing a handler for it.",
      "Not realizing virtual fields are entirely absent from the generated database schema.",
    ],
    importantPoints: [
      "virtual fields exist only in the exposed API shape, never in the database.",
      "Must be populated manually via a custom handler, typically after(READ).",
      "Useful for computed or externally-sourced values without needing persisted storage.",
    ],
    revisionNotes: "virtual field = in API shape/OData metadata only, no DB column, no auto-population — must be filled via a custom handler like after(READ).",
  },
  {
    id: "cap-q40",
    topic: "Associations",
    prompt: "What does `$expand` do in an OData request against a CAP service, and how does it relate to associations?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["associations", "expand"],
    estimatedMinutes: 2,
    expectedAnswer:
      "`$expand` requests that an associated/composed entity's data be included inline in the same response (e.g. `/Orders?$expand=items`), letting a client fetch a parent and its related data in a single round trip instead of one request per relationship.",
    detailedAnswer:
      "Without `$expand`, requesting `/Orders(1)` returns just the Order's own fields — associated data like its line items would require a separate follow-up request (`/Orders(1)/items`). Adding `?$expand=items` to the original request tells CAP's OData layer to also resolve and inline the associated/composed `items` data directly into the response for that Order, in one round trip. This works because the association/composition is already declared in the CDS model — `$expand` is simply the client's way of asking for that relationship to be resolved eagerly for this particular request, and it can even be nested (`$expand=items($expand=product)`) to pull multiple levels of related data at once.",
    hindiExplanation:
      "`$expand` ke bina, `/Orders(1)` request karna sirf Order ke apne fields return karta hai — associated data jaise uske line items ke liye ek separate follow-up request chahiye hoga. Original request mein `?$expand=items` add karna CAP ke OData layer ko batata hai ki associated/composed `items` data bhi directly is Order ke response mein resolve/inline kar do, ek round trip mein. Ye kaam karta hai kyunki association/composition already CDS model mein declared hai — `$expand` bas client ka tarika hai ye relationship eagerly resolve karne ke liye is particular request ke liye.",
    interviewExplanation:
      "I'd explain the round-trip savings: '$expand tells the OData layer to inline an associated or composed entity's data directly into the response for a single request, instead of requiring a separate follow-up call. Since the relationship is already declared in the CDS model, $expand is just the client asking for it to be resolved eagerly — it can even nest, like items($expand=product), to pull multiple levels in one shot.'",
    diagramNote:
      "'GET /Orders(1) — just Order fields' vs 'GET /Orders(1)?$expand=items — Order + inlined items data, single round trip' — relationship already declared in CDS model.",
    diagramMermaid: `flowchart LR
    A["GET /Orders(1)"] --> B["Just Order's own fields"]
    C["GET /Orders(1)?$expand=items"] --> D["Order + inlined items,<br/>single round trip"]`,
    realProjectExample:
      "A UI screen showing an order with its line items used $expand=items in a single request instead of making a separate request per order to fetch items, meaningfully reducing the number of round trips for a list of many orders.",
    interviewTip:
      "If asked how you'd optimize a UI making N+1 requests (one per order's items), mentioning $expand as the fix demonstrates practical OData performance knowledge.",
    followupQuestions: [
      "Can $expand be combined with $filter to only expand a subset of related records?",
      "What's the performance risk of deeply nested $expand chains?",
      "Does $expand work the same way for both associations and compositions?",
    ],
    commonMistakes: [
      "Making separate follow-up requests for related data instead of using $expand to fetch it in one round trip.",
      "Not realizing $expand can be nested to pull multiple levels of related data at once.",
    ],
    importantPoints: [
      "$expand inlines associated/composed entity data into a single response.",
      "Avoids a separate follow-up request per relationship, reducing round trips.",
      "Can be nested to resolve multiple levels of relationships in one request.",
    ],
    revisionNotes: "$expand inlines associated/composed data into one response (e.g. /Orders(1)?$expand=items) — avoids separate follow-up requests, can nest for multiple levels.",
  },
  {
    id: "cap-q41",
    topic: "Compositions",
    prompt: "If an Order entity has a composed LineItems entity, and you update just the Order's status via PATCH, does the LineItems data get affected?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["compositions", "partial-update"],
    estimatedMinutes: 2,
    expectedAnswer:
      "No — a PATCH targeting only the Order's fields (like status) doesn't touch the composed LineItems at all unless the request payload explicitly includes changes to them; composition governs ownership/cascade-on-delete semantics, not that every update to the parent must also touch every child.",
    detailedAnswer:
      "Composition establishes an ownership and cascade-delete relationship, but doesn't mean every parent update implicitly affects the children. A `PATCH /Orders(1)` with just `{ status: 'SHIPPED' }` in the payload updates only the Order's own status field — since the request didn't include any LineItems data, CAP's generated deep-update handling has nothing to do regarding LineItems; they remain completely unchanged. If a client wants to also modify LineItems in the same request, they'd need to include that data in the payload (CAP's deep update support then handles inserting/updating/removing the relevant composed children based on what's present/absent in the payload) — but a partial update targeting only parent fields has zero effect on the children.",
    hindiExplanation:
      "Composition ek ownership aur cascade-delete relationship establish karta hai, lekin iska matlab nahi ki har parent update implicitly children ko affect kare. Ek `PATCH /Orders(1)` sirf `{ status: 'SHIPPED' }` payload ke saath sirf Order ke apne status field ko update karta hai — kyunki request mein koi LineItems data include nahi tha, CAP ke generated deep-update handling ko LineItems ke regarding kuch karne ki zaroorat nahi; wo completely unchanged rehte hain.",
    interviewExplanation:
      "I'd clarify the scope of a partial update: 'No — composition governs ownership and cascade-on-delete, not that every parent update touches children. A PATCH with just {status: SHIPPED} in the payload only updates that field — since LineItems data wasn't included, CAP's deep-update handling has nothing to do there, and they remain completely unchanged. Children are only affected if the request payload explicitly includes changes to them.'",
    diagramNote:
      "'PATCH /Orders(1) { status: SHIPPED } — payload has no LineItems data' → 'Only Order.status updated, LineItems completely unchanged' — composition ≠ every update cascades.",
    diagramMermaid: `flowchart TD
    A["PATCH /Orders(1)<br/>{ status: 'SHIPPED' }"] --> B["Only Order.status updated"]
    B --> C["LineItems: completely unchanged<br/>(not in payload)"]`,
    realProjectExample:
      "A status-update endpoint was implemented to send only the changed status field, correctly leaving all existing line items untouched, since the composition relationship's cascade behavior applies to deletes, not to unrelated partial field updates.",
    interviewTip:
      "If asked 'does composition mean every parent write touches the child', the correct, precise answer is no — composition specifically governs ownership/cascade-on-delete, and deep updates only touch what's actually present in the request payload.",
    followupQuestions: [
      "How would you send a request that both updates the Order's status and modifies a specific LineItem?",
      "What happens to a LineItem if it's omitted from a deep-update payload that does include other LineItems?",
      "Does the same partial-update behavior apply to a plain association, not just a composition?",
    ],
    commonMistakes: [
      "Assuming any write to a parent entity automatically cascades some effect to its composed children.",
      "Not understanding that CAP's deep-update behavior only acts on data actually present in the request payload.",
    ],
    importantPoints: [
      "Composition governs ownership and cascade-on-delete, not automatic cascade-on-update.",
      "A partial update (PATCH) only affects fields/children actually present in the payload.",
      "Composed children remain fully unchanged if omitted from an update's payload.",
    ],
    revisionNotes: "Composition = ownership + cascade-on-delete, NOT cascade-on-every-update. A PATCH only affects what's in the payload — omitted children remain unchanged.",
  },
  {
    id: "cap-q42",
    topic: "Actions",
    prompt: "Can a bound action return something other than the entity it's bound to — for example, a custom result structure?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["actions", "return-types"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — a bound action's `returns` clause can specify any type, including a custom-defined structured type (not just the bound entity itself), letting the action return something entirely different, like a validation result object or a computed summary, rather than being forced to always return the entity it operates on.",
    detailedAnswer:
      "While it's common for a bound action to return the entity it modified (`returns Orders`), this isn't a requirement — you can define a custom type (`type ValidationResult { valid: Boolean; messages: array of String; }`) and declare `action validate() returns ValidationResult;` instead. This is useful when the action's real purpose is producing a result that isn't naturally shaped like the entity itself — a validation check, a calculated report, or a status object — and forcing it to awkwardly return the entity (perhaps with extra fields bolted on) would be a worse fit than simply declaring the return type that actually matches what the operation conceptually produces.",
    hindiExplanation:
      "Jabki ye common hai ek bound action ke liye jo entity modify ki wahi return karna (`returns Orders`), ye ek requirement nahi hai — tum ek custom type define kar sakte ho (`type ValidationResult { valid: Boolean; messages: array of String; }`) aur `action validate() returns ValidationResult;` declare kar sakte ho iske bajaye. Ye useful hai jab action ka real purpose ek aisa result produce karna hai jo naturally entity ki tarah shaped nahi hai — ek validation check, ek calculated report, ya ek status object.",
    interviewExplanation:
      "I'd give the concrete alternative: 'It's common for a bound action to return the entity it modified, but that's not required — I could define a custom type, like ValidationResult with valid and messages fields, and declare the action to return that instead. This fits better when the action's real purpose produces something that isn't naturally shaped like the entity — a validation result or a computed summary, for example.'",
    diagramNote:
      "'action validate() returns Orders (awkward fit)' vs 'action validate() returns ValidationResult { valid, messages } — custom type matching what the operation conceptually produces'.",
    diagramMermaid: `flowchart LR
    A["action returns Orders"] --> B["Awkward fit for<br/>non-entity-shaped results"]
    C["action returns ValidationResult"] --> D["Custom type matching<br/>what the operation produces"]`,
    realProjectExample:
      "A bound 'validateBeforeSubmit' action returned a custom ValidationResult type containing a boolean flag and a list of specific validation messages, rather than awkwardly bolting those fields onto the Order entity's own return shape.",
    interviewTip:
      "If asked to design an action whose purpose is validation or reporting rather than data mutation, proposing a custom return type instead of forcing the entity's shape shows good modeling judgment.",
    followupQuestions: [
      "How would you define a custom structured type for an action's return value in CDS?",
      "Can an action return an array of a custom type, not just a single instance?",
      "Would you ever have an action return nothing at all?",
    ],
    commonMistakes: [
      "Forcing every bound action to return its entity, even when a custom result type would fit much better.",
      "Not knowing CDS supports defining and returning entirely custom structured types from actions.",
    ],
    importantPoints: [
      "A bound action's returns clause isn't limited to the entity it's bound to.",
      "Custom structured types can be defined and returned when they better match the operation's purpose.",
      "Useful for validation results, computed summaries, or status objects.",
    ],
    revisionNotes: "Bound actions aren't limited to returning their entity — define a custom type (e.g. ValidationResult) when the operation's real result doesn't fit the entity's shape.",
  },
  {
    id: "cap-q43",
    topic: "Functions",
    prompt: "Would you model a paginated 'recent activity feed' lookup as a function, and how would parameters work?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["functions", "pagination"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — it's a read-only lookup, so a function fits, declared with parameters like `function recentActivity(limit: Integer, offset: Integer) returns array of ActivityItem;`, with the parameters passed as part of the GET request (typically as URL segment/query parameters in the OData function call syntax).",
    detailedAnswer:
      "Since fetching a recent activity feed doesn't modify any data, it's correctly modeled as a function (mapping to GET, cacheable, safe to retry). Its parameters — like a page size/limit and an offset for pagination — are declared in the function's signature and passed by the client as part of the GET call using OData function-call syntax, e.g. `/recentActivity(limit=20,offset=0)`. The function's handler implementation then reads those parameter values from the request context and returns the appropriately paginated slice of activity items — same overall pattern as any other function, just with the addition of input parameters that shape what's computed/returned.",
    hindiExplanation:
      "Kyunki ek recent activity feed fetch karna koi data modify nahi karta, ye correctly ek function ki tarah modeled hai (GET se mapping, cacheable, retry karne ke liye safe). Uske parameters — jaise ek page size/limit aur ek offset pagination ke liye — function ke signature mein declare hote hain aur client dwara GET call ke part ki tarah pass hote hain OData function-call syntax use karke, jaise `/recentActivity(limit=20,offset=0)`. Function ka handler implementation phir un parameter values ko request context se read karta hai aur activity items ka appropriately paginated slice return karta hai.",
    interviewExplanation:
      "I'd confirm function fits and describe the parameter mechanics: 'Yes, it's read-only, so a function is right — mapping to GET, cacheable. Parameters like limit and offset get declared in the function signature and passed via OData function-call syntax, like recentActivity(limit=20,offset=0). The handler reads those values and returns the appropriately paginated slice — same pattern as any function, just with input parameters shaping the result.'",
    diagramNote:
      "'function recentActivity(limit, offset) returns array of ActivityItem' → 'Called as GET /recentActivity(limit=20,offset=0)' → 'Handler reads params, returns paginated slice'.",
    diagramMermaid: `flowchart LR
    A["function recentActivity(limit, offset)"] --> B["GET /recentActivity(limit=20,offset=0)"]
    B --> C["Handler returns<br/>paginated slice"]`,
    realProjectExample:
      "A dashboard's activity feed widget called a recentActivity function with limit/offset parameters to page through results, benefiting from GET-based caching for identical repeated requests (e.g. multiple users viewing the same recent global activity within a short window).",
    interviewTip:
      "If asked to model a parameterized read-only lookup, explicitly naming both the function choice and the OData function-call parameter syntax shows complete, precise CAP knowledge rather than a vague conceptual answer.",
    followupQuestions: [
      "How would you set default values for the limit/offset parameters?",
      "Would the same pagination approach work for a bound function instead of an unbound one?",
      "How would you communicate whether more results are available beyond the current page?",
    ],
    commonMistakes: [
      "Modeling a read-only, parameterized lookup as an action instead of a function.",
      "Not knowing OData's function-call syntax for passing parameters via GET.",
    ],
    importantPoints: [
      "Read-only, parameterized lookups fit as functions, not actions.",
      "Parameters declared in the function signature, passed via OData function-call GET syntax.",
      "Same caching/retry-safety benefits as any other function apply.",
    ],
    revisionNotes: "Parameterized read-only lookups (like paginated feeds) = functions, called via OData function-call syntax e.g. /recentActivity(limit=20,offset=0).",
  },
  {
    id: "cap-q44",
    topic: "Authentication",
    prompt: "What's the difference between `authenticated-user` restriction level and requiring a specific scope/role in CAP?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["authentication", "authorization-levels"],
    estimatedMinutes: 2,
    expectedAnswer:
      "`@requires: 'authenticated-user'` only checks that the request has a valid, logged-in identity at all (any authenticated user, regardless of role) — it's an authentication check, not authorization; requiring a specific role/scope (`@restrict` with a role condition) is a genuine authorization check, gating access to only users with that particular permission.",
    detailedAnswer:
      "These operate at different layers of the security model. `@requires: 'authenticated-user'` (or the shorthand equivalent) simply rejects entirely anonymous/unauthenticated requests — anyone with a valid token, regardless of what roles they hold, passes this check. This is useful as a baseline ('you must at least be logged in to use this service at all') but doesn't distinguish between different authenticated users' permission levels. A `@restrict` rule checking for a specific role (like `'Admin'`) is a genuine authorization check — it still requires authentication implicitly (you need identity to have roles at all), but additionally verifies that identity's specific permissions, rejecting authenticated-but-insufficiently-privileged users, not just anonymous ones.",
    hindiExplanation:
      "Ye security model ke different layers pe operate karte hain. `@requires: 'authenticated-user'` (ya shorthand equivalent) simply entirely anonymous/unauthenticated requests ko reject karta hai — koi bhi valid token wala, chahe unke paas koi bhi roles hon, ye check pass kar jaata hai. Ye ek baseline ki tarah useful hai ('tumhe kam se kam logged in hona chahiye service use karne ke liye at all') lekin different authenticated users ke permission levels mein distinguish nahi karta. Ek `@restrict` rule specific role check karta hua (jaise `'Admin'`) ek genuine authorization check hai.",
    interviewExplanation:
      "I'd distinguish the two layers clearly: '@requires authenticated-user only checks you're logged in at all — any valid identity passes, regardless of role. That's authentication, not authorization. A @restrict rule checking a specific role like Admin is genuine authorization — it rejects authenticated users who lack that specific permission, not just anonymous ones.'",
    diagramNote:
      "'@requires: authenticated-user — any valid logged-in identity passes (authentication only)' vs '@restrict role: Admin — must be logged in AND have that specific role (authorization)'.",
    diagramMermaid: `flowchart LR
    A["@requires: authenticated-user"] --> B["Any valid identity passes<br/>(authentication only)"]
    C["@restrict role: Admin"] --> D["Must be logged in AND<br/>have that role (authorization)"]`,
    realProjectExample:
      "A general read endpoint used @requires authenticated-user (any logged-in employee could view it), while a separate delete action used @restrict requiring the Admin role, correctly rejecting authenticated-but-non-admin employees with a 403 rather than just checking they were logged in.",
    interviewTip:
      "If asked to explain authentication versus authorization concretely in CAP terms, contrasting @requires: 'authenticated-user' against a role-based @restrict rule is a precise, specific way to show you understand the distinction, not just define the terms abstractly.",
    followupQuestions: [
      "What HTTP status code would an unauthenticated user get versus an authenticated-but-unauthorized user?",
      "Can @requires and @restrict be combined on the same entity or action?",
      "Would you ever want an endpoint accessible with no authentication at all?",
    ],
    commonMistakes: [
      "Conflating 'authenticated-user' restriction with genuine role-based authorization.",
      "Assuming any logged-in user automatically has access to role-gated operations.",
    ],
    importantPoints: [
      "@requires: 'authenticated-user' = authentication only, any valid identity passes.",
      "@restrict with a role condition = genuine authorization, gates on specific permissions.",
      "These are distinct security layers, not interchangeable concepts.",
    ],
    revisionNotes: "@requires: authenticated-user = login check only (any valid identity). @restrict with a role = genuine authorization, gates on specific permission.",
  },
  {
    id: "cap-q45",
    topic: "Authorization",
    prompt: "How would `@restrict` behave differently for a `CREATE` event versus a `READ` event on the same entity?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["authorization", "event-specific-restrict"],
    estimatedMinutes: 2,
    expectedAnswer:
      "`@restrict` rules can target specific events independently (e.g. requiring 'Admin' for CREATE but allowing any authenticated user for READ), letting you express asymmetric permissions — broadly readable data that only privileged users can modify — rather than a single all-or-nothing access rule for the whole entity.",
    detailedAnswer:
      "A common real-world pattern is data that should be widely readable but narrowly writable — a product catalog, for instance, where any authenticated user should see products, but only an 'Admin' or 'Catalog Manager' role should be able to create/update/delete them. CAP's `@restrict` supports this directly by specifying different grant conditions per event: `@restrict: [{ grant: 'READ', to: 'authenticated-user' }, { grant: ['CREATE','UPDATE','DELETE'], to: 'Admin' }]` — expressing exactly this asymmetric access pattern declaratively, rather than needing custom handler logic to differentiate READ from write operations' authorization checks.",
    hindiExplanation:
      "Ek common real-world pattern hai data jo widely readable hona chahiye lekin narrowly writable — ek product catalog jaise, jahan koi bhi authenticated user products dekh sake, lekin sirf ek 'Admin' ya 'Catalog Manager' role unhe create/update/delete kar sake. CAP ka `@restrict` isse directly support karta hai per-event different grant conditions specify karke: `@restrict: [{ grant: 'READ', to: 'authenticated-user' }, { grant: ['CREATE','UPDATE','DELETE'], to: 'Admin' }]` — bilkul yahi asymmetric access pattern declaratively express karte hue.",
    interviewExplanation:
      "I'd give the concrete asymmetric pattern: 'A common case is broadly readable, narrowly writable data — like a product catalog anyone authenticated can view, but only Admins can modify. @restrict supports this directly with per-event grant conditions: READ open to authenticated-user, but CREATE/UPDATE/DELETE restricted to Admin — expressed declaratively, without needing custom handler logic to differentiate reads from writes.'",
    diagramNote:
      "'@restrict: [{grant: READ, to: authenticated-user}, {grant: [CREATE,UPDATE,DELETE], to: Admin}]' — any logged-in user reads, only Admin writes, all declarative on one entity.",
    diagramMermaid: `flowchart LR
    A["@restrict per-event rules"] --> B["READ → authenticated-user<br/>any logged-in user"]
    A --> C["CREATE/UPDATE/DELETE → Admin<br/>only privileged role"]`,
    realProjectExample:
      "A product catalog entity used exactly this asymmetric @restrict pattern — any employee could browse products, but only users with the Catalog Manager role could create, edit, or remove entries, all expressed declaratively without any custom authorization handler code.",
    interviewTip:
      "If asked to design authorization for 'anyone can view, only admins can edit' data, naming the specific per-event @restrict array syntax (not just 'you'd add some role checks') shows precise, hands-on CDS authorization knowledge.",
    followupQuestions: [
      "Could you further restrict READ to only specific fields while still allowing broad entity-level read access?",
      "How would you test that a non-Admin user genuinely cannot perform CREATE while still being able to READ?",
      "Would this per-event pattern also work at the service level, not just the entity level?",
    ],
    commonMistakes: [
      "Applying the same restrictive role requirement to both reads and writes when only writes actually need to be gated.",
      "Writing custom handler logic to differentiate READ from write authorization instead of using @restrict's per-event grants.",
    ],
    importantPoints: [
      "@restrict supports different grant conditions per event (READ, CREATE, UPDATE, DELETE).",
      "Enables asymmetric access: broadly readable, narrowly writable data.",
      "Expressed declaratively, avoiding custom authorization handler code.",
    ],
    revisionNotes: "@restrict supports per-event grants — e.g. READ open to authenticated-user, writes restricted to Admin — declaratively expressing asymmetric read/write access.",
  },
  {
    id: "cap-q46",
    topic: "Draft",
    prompt: "How would concurrent editing of the same record by two users be handled in draft mode?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["draft", "concurrency"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Since drafts are per-user (each editing user gets their own separate draft copy tied to their identity), two users editing the 'same' record simultaneously actually each work against their own independent draft — the conflict, if any, only surfaces when the second user tries to activate/save their draft against an already-changed active record.",
    detailedAnswer:
      "Draft mode's per-user isolation means User A and User B editing the same active record don't directly collide while drafting — each gets their own draft row in the shadow draft table, tied to their own identity, so they can each make changes without interfering with each other's in-progress edits. The actual conflict only becomes relevant at the activation/save step: if User A saves first (updating the active record), and User B then tries to activate their draft (which was based on the record's state before User A's change), CAP's underlying optimistic concurrency handling (via ETags/versioning) can detect that the active record has changed since the draft was based on it, and reject User B's save with a conflict error rather than silently overwriting User A's change.",
    hindiExplanation:
      "Draft mode ki per-user isolation ka matlab hai User A aur User B same active record edit karte hue directly collide nahi karte draft karte waqt — har ek ko apna draft row milta hai shadow draft table mein, unki apni identity se tied, taaki wo apne changes kar sakein bina ek doosre ke in-progress edits mein interfere kiye. Actual conflict sirf activation/save step pe relevant hota hai: agar User A pehle save karta hai (active record update karte hue), aur User B fir apna draft activate karne ki koshish karta hai, CAP ka underlying optimistic concurrency handling (ETags/versioning se) detect kar sakta hai ki active record change ho chuka hai aur User B ka save reject kar sakta hai.",
    interviewExplanation:
      "I'd explain the per-user isolation and where conflicts actually surface: 'Drafts are per-user, so two users editing the same record don't collide while drafting — each gets their own independent draft copy. The conflict only surfaces at activation: if User A saves first, and User B then tries to activate a draft based on the old state, CAP's optimistic concurrency handling via ETags can detect the mismatch and reject User B's save with a conflict, rather than silently overwriting User A's change.'",
    diagramNote:
      "'User A draft' + 'User B draft' — both independent, tied to own identity → 'User A activates first (active record updated)' → 'User B tries to activate stale draft → concurrency conflict detected, rejected'.",
    diagramMermaid: `flowchart TD
    A["User A draft"] --> C["User A activates first<br/>active record updated"]
    B["User B draft<br/>independent copy"] --> D["User B tries to activate<br/>stale draft"]
    C --> E["Concurrency conflict detected<br/>User B's save rejected"]
    D --> E`,
    realProjectExample:
      "Two team members editing the same order's draft simultaneously each worked without interference, but when the second one tried to save after the first had already activated their changes, they received a conflict error and had to refresh and reapply their changes against the updated record.",
    interviewTip:
      "If asked 'what happens if two users edit the same record at once with drafts', the precise answer distinguishes the drafting phase (no collision, per-user isolation) from the activation phase (where a real optimistic-concurrency conflict can surface).",
    followupQuestions: [
      "What mechanism specifically detects this conflict — is it based on a version number, timestamp, or ETag?",
      "What would User B's typical recovery flow look like after hitting this conflict?",
      "Would this same conflict detection apply to a non-draft-enabled entity's concurrent updates?",
    ],
    commonMistakes: [
      "Assuming two users editing the same record in draft mode would directly collide or overwrite each other's in-progress edits.",
      "Not realizing the actual conflict only surfaces at the activation/save step, not during drafting.",
    ],
    importantPoints: [
      "Drafts are per-user — concurrent editors get independent draft copies, no drafting-phase collision.",
      "The real conflict surfaces at activation, if the active record changed since the draft was based on it.",
      "CAP uses optimistic concurrency handling (ETags/versioning) to detect and reject stale saves.",
    ],
    revisionNotes: "Concurrent draft editing: each user gets an independent draft (no collision while drafting). Conflict surfaces only at activation via optimistic concurrency (ETag) detection.",
  },
  {
    id: "cap-q47",
    topic: "Multitenancy",
    prompt: "Would a CAP application's business logic code typically need explicit tenant-filtering conditions written into every query?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["multitenancy", "tenant-isolation"],
    estimatedMinutes: 2,
    expectedAnswer:
      "No — tenant isolation in CAP is handled transparently at the infrastructure level (via separate per-tenant HDI containers/schemas and automatic tenant context resolution from the request's JWT), so ordinary handler/query code doesn't need to manually add tenant-ID filter conditions to every query.",
    detailedAnswer:
      "This is one of CAP's most valuable multitenancy conveniences: because each tenant's data lives in a fully separate HDI container/database schema (not commingled rows in shared tables distinguished by a tenant-ID column), there's no possibility of a query accidentally leaking another tenant's data even if a developer forgets a filter — there IS no other tenant's data reachable from within that connection at all. CAP's runtime automatically resolves which tenant's HDI container to connect to based on the tenant identifier embedded in the incoming request's JWT, entirely transparently to handler code — you write queries as if there's only ever one tenant's data, and the framework's connection-routing ensures that's effectively true for any given request.",
    hindiExplanation:
      "Ye CAP ki sabse valuable multitenancy conveniences mein se ek hai: kyunki har tenant ka data ek fully separate HDI container/database schema mein rehta hai (shared tables mein commingled rows nahi jo ek tenant-ID column se distinguish hoti hain), koi possibility nahi hai ek query ke accidentally doosre tenant ka data leak karne ki chahe developer ek filter bhool jaaye — us connection ke andar koi doosra tenant ka data reachable hi nahi hai at all. CAP ka runtime automatically resolve karta hai kaunse tenant ke HDI container se connect karna hai incoming request ke JWT mein embedded tenant identifier ke basis pe, entirely transparently handler code ke liye.",
    interviewExplanation:
      "I'd emphasize this is a deliberate safety feature: 'No — tenant isolation happens at the infrastructure level. Each tenant has a fully separate HDI container, not shared tables with a tenant-ID column, so there's no possibility of a query leaking another tenant's data even if a developer forgets a filter — that data simply isn't reachable from the current connection. CAP resolves which tenant's container to connect to automatically from the request's JWT, completely transparent to my query code.'",
    diagramNote:
      "'Request JWT includes tenant identifier' → 'CAP runtime auto-routes to that tenant's separate HDI container' → 'Query code writes as if single-tenant — no manual tenant-ID filters needed, no cross-tenant leak possible'.",
    diagramMermaid: `flowchart LR
    A["Request JWT<br/>includes tenant ID"] --> B["CAP auto-routes to<br/>tenant's separate HDI container"]
    B --> C["Query code: single-tenant style<br/>no manual filters, no leak possible"]`,
    realProjectExample:
      "A security review specifically checked for missing tenant-filter conditions across the codebase and found none were needed — the separate-HDI-container architecture meant there was structurally no way for a query to access another tenant's data regardless of what the query itself contained.",
    interviewTip:
      "If asked 'what happens if a developer forgets to filter by tenant', the strong answer is that in CAP's architecture this isn't actually a risk — the isolation is structural (separate containers), not filter-based, which is a meaningfully stronger security guarantee than a shared-table-plus-tenant-column approach.",
    followupQuestions: [
      "How does this compare to a shared-schema-with-tenant-column multitenancy approach, in terms of security guarantees?",
      "Where exactly does CAP extract the tenant identifier from in an incoming request?",
      "Are there any scenarios where cross-tenant access might legitimately be needed, and how would that be handled?",
    ],
    commonMistakes: [
      "Assuming CAP multitenancy works like a shared-table-plus-tenant-column model requiring manual filter conditions.",
      "Not recognizing the separate-HDI-container approach as a stronger structural security guarantee.",
    ],
    importantPoints: [
      "CAP tenant isolation is structural — separate HDI containers per tenant, not shared tables with a tenant column.",
      "No manual tenant-ID filtering needed in handler/query code.",
      "Tenant context resolved automatically from the request JWT, transparent to business logic.",
    ],
    revisionNotes: "CAP tenant isolation = separate HDI container per tenant (structural), not shared-table-plus-filter — no manual tenant-ID conditions needed in query code, no cross-tenant leak possible.",
  },
  {
    id: "cap-q48",
    topic: "Events",
    prompt: "How would you ensure an event handler doesn't process the same event message twice (idempotency)?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["events", "idempotency"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Design the handler to be idempotent by checking for and ignoring already-processed events — commonly by tracking a unique event/message ID that's already been handled (in a dedicated table or a check against existing state) before performing the event's side effects, since most messaging systems (including Event Mesh) offer at-least-once delivery, meaning duplicate delivery is a real possibility you must defensively handle.",
    detailedAnswer:
      "At-least-once delivery (the norm for most reliable messaging systems, including SAP Event Mesh) guarantees a message will be delivered, but doesn't guarantee exactly-once — a handler might receive the same event twice due to retries after an ack failure, network issues, or consumer restarts. A robust handler defends against this by making its side effect idempotent: for example, before creating a database record in response to an event, check whether a record with that event's unique ID already exists and skip processing if so; or design the operation itself to be naturally idempotent (like a 'set status to X' operation, which produces the same end state whether run once or five times, versus 'increment counter by 1', which very much isn't idempotent and would need explicit duplicate-detection).",
    hindiExplanation:
      "At-least-once delivery (jo norm hai most reliable messaging systems ke liye, SAP Event Mesh included) guarantee karta hai ki ek message deliver hoga, lekin exactly-once guarantee nahi karta — ek handler same event ko do baar receive kar sakta hai retries ki wajah se ek ack failure ke baad, network issues, ya consumer restarts ki wajah se. Ek robust handler is se defend karta hai apne side effect ko idempotent banate hue: for example, ek database record create karne se pehle ek event ke response mein, check karo ki us event ki unique ID wala record already exist karta hai ya nahi aur agar hai toh processing skip kar do.",
    interviewExplanation:
      "I'd explain the at-least-once reality and the defense: 'Most messaging systems, including Event Mesh, guarantee at-least-once delivery, not exactly-once — a handler can receive the same event twice from retries or consumer restarts. I'd defend against this by making the handler idempotent, like checking whether a record with that event's unique ID already exists before creating it, or designing the operation itself to naturally produce the same end state regardless of how many times it runs — a set-status operation is naturally idempotent, but an increment-counter operation is not and needs explicit duplicate detection.'",
    diagramNote:
      "'Event delivered (at-least-once — duplicates possible)' → 'Handler checks: has this event ID already been processed?' → if yes 'Skip (idempotent)' if no 'Process + record event ID as handled'.",
    diagramMermaid: `flowchart TD
    A["Event delivered<br/>at-least-once, duplicates possible"] --> B{"Event ID already<br/>processed?"}
    B -->|Yes| C["Skip — idempotent"]
    B -->|No| D["Process + record<br/>event ID as handled"]`,
    realProjectExample:
      "A payment-confirmation event handler tracked processed event IDs in a dedicated table before recording a payment, preventing a duplicate delivery (which did occur occasionally due to consumer restarts) from double-recording the same payment.",
    interviewTip:
      "If asked 'does Event Mesh guarantee exactly-once delivery', the accurate answer is no — it's at-least-once, and idempotent handler design is your responsibility, not something the messaging infrastructure solves for you.",
    followupQuestions: [
      "What's a naturally idempotent operation versus one that requires explicit duplicate detection?",
      "Where would you store the record of already-processed event IDs?",
      "How would 'exactly-once' semantics differ from 'at-least-once plus idempotent handling' in practice?",
    ],
    commonMistakes: [
      "Assuming the messaging infrastructure guarantees exactly-once delivery and skipping idempotency handling entirely.",
      "Designing a handler with a non-idempotent side effect (like blindly incrementing a counter) without duplicate protection.",
    ],
    importantPoints: [
      "Most messaging systems, including Event Mesh, guarantee at-least-once delivery, not exactly-once.",
      "Duplicate event delivery is a real, expected possibility to defend against.",
      "Idempotent handler design (checking processed event IDs, or naturally idempotent operations) is the developer's responsibility.",
    ],
    revisionNotes: "At-least-once delivery means duplicates are possible — make handlers idempotent (check processed event IDs, or use naturally idempotent operations) rather than assuming exactly-once.",
  },
  {
    id: "cap-q49",
    topic: "Deployments",
    prompt: "What's the role of `package.json`'s `cds` configuration section in a CAP project's deployment?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["deployments", "configuration"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The `cds` section in `package.json` holds CAP's configuration, including `requires` (declaring dependent services/databases and their per-environment/profile settings, like using SQLite for dev but HANA for production), which `cds build` reads to generate the correct environment-specific deployment artifacts.",
    detailedAnswer:
      "This is where CAP-specific project configuration lives, separate from the general npm package metadata `package.json` also holds. The `cds.requires` sub-section is especially important for deployment — it declares each service/resource dependency (like the database, an XSUAA instance, a destination) and can specify different configurations per profile (`[production]` versus the default/dev settings), so the exact same codebase automatically uses SQLite locally during `cds watch` but HANA Cloud when deployed to production, without any code changes — `cds build` reads this configuration when preparing production artifacts, resolving the production profile's settings into what actually gets deployed.",
    hindiExplanation:
      "Ye wahi jagah hai jahan CAP-specific project configuration rehta hai, general npm package metadata se separate jo `package.json` bhi hold karta hai. `cds.requires` sub-section especially important hai deployment ke liye — ye har service/resource dependency declare karta hai (jaise database, ek XSUAA instance, ek destination) aur har profile ke liye different configurations specify kar sakta hai (`[production]` versus default/dev settings), taaki exact same codebase automatically SQLite use kare locally `cds watch` ke dauran lekin HANA Cloud jab production mein deploy ho, bina kisi code changes ke.",
    interviewExplanation:
      "I'd explain the profile-based configuration mechanism: 'The cds section in package.json holds CAP's own config, especially cds.requires, which declares dependencies like the database and can specify different settings per profile — so the same code uses SQLite locally during cds watch but HANA Cloud in production, with zero code changes. cds build reads this configuration when preparing production artifacts, resolving the production profile's settings.'",
    diagramNote:
      "'package.json → cds.requires' with profile-specific settings → 'cds watch (dev profile): SQLite' vs 'cds build/deployed (production profile): HANA Cloud' — same code, different resolved config.",
    diagramMermaid: `flowchart TD
    A["package.json: cds.requires<br/>profile-specific settings"] --> B["cds watch (dev profile):<br/>SQLite"]
    A --> C["cds build/deployed<br/>(production profile): HANA Cloud"]`,
    realProjectExample:
      "Our package.json's cds.requires section configured SQLite for the default profile and HANA for the production profile, letting every developer run cds watch locally against a zero-setup in-memory database while production deployments automatically used the real HANA Cloud instance, with the exact same application code.",
    interviewTip:
      "If asked how the same CAP codebase uses different databases in dev versus production without code changes, pointing to package.json's cds.requires profile-based configuration is the precise, correct mechanism to name.",
    followupQuestions: [
      "How would you define a custom deployment profile beyond just 'production'?",
      "What other resources besides the database get configured in cds.requires?",
      "How does cds build know which profile to resolve configuration for?",
    ],
    commonMistakes: [
      "Hard-coding database connection details in application code instead of using profile-based cds.requires configuration.",
      "Not knowing package.json's cds section is where CAP-specific configuration (separate from npm metadata) lives.",
    ],
    importantPoints: [
      "package.json's cds section holds CAP-specific configuration, including cds.requires.",
      "cds.requires supports per-profile settings (e.g. SQLite for dev, HANA for production).",
      "cds build resolves the production profile's configuration into deployment artifacts, with zero code changes needed.",
    ],
    revisionNotes: "package.json → cds.requires holds per-profile config (e.g. SQLite dev vs HANA production) — cds build resolves the right profile automatically, no code changes needed.",
  },
  {
    id: "cap-q50",
    topic: "Testing",
    prompt: "How would you approach testing a CAP service's behavior when a required external/remote service dependency is unavailable?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["testing", "resilience"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Mock the remote dependency's connection (via cds.requires test configuration pointing to a mock/stub implementation, or intercepting the cds.connect.to call in the test) to simulate it being unavailable/erroring, then verify your handler degrades gracefully (proper error handling, meaningful error message, no unhandled crash) rather than only ever testing the happy path where the dependency responds successfully.",
    detailedAnswer:
      "Testing only the happy path (remote dependency always available and responding correctly) misses a whole category of real production failure modes — networks partition, remote services have outages, timeouts occur. A thorough test suite deliberately configures a mock/stub version of the remote dependency (often via test-specific cds.requires configuration, or by directly mocking what cds.connect.to returns in the test) that simulates failure — throwing an error, timing out, or returning an unexpected response — and then asserts that your handler code catches this appropriately, returns a sensible error to the original caller (not an unhandled exception/500), and doesn't leave the system in an inconsistent state. This kind of resilience testing is what separates code that merely works in the demo from code that's genuinely production-ready.",
    hindiExplanation:
      "Sirf happy path test karna (remote dependency hamesha available aur correctly responding) real production failure modes ki poori category miss kar deta hai — networks partition hote hain, remote services outages face karte hain, timeouts hote hain. Ek thorough test suite deliberately ek mock/stub version configure karta hai remote dependency ka (aksar test-specific cds.requires configuration se, ya directly cds.connect.to jo return karta hai use mock karke test mein) jo failure simulate karta hai — error throw karna, timeout hona, ya unexpected response return karna — aur fir assert karta hai ki tumhara handler code ise appropriately catch karta hai.",
    interviewExplanation:
      "I'd explain why happy-path-only testing isn't enough: 'Testing only the happy path misses real production failure modes — network partitions, outages, timeouts. I'd deliberately mock the remote dependency, often via test-specific cds.requires config or mocking what cds.connect.to returns, to simulate an error or timeout, then assert my handler catches it gracefully — returning a sensible error rather than an unhandled 500, and not leaving the system in an inconsistent state. That's the difference between code that works in a demo and code that's genuinely production-ready.'",
    diagramNote:
      "'Test: mock remote dependency to simulate failure (error/timeout)' → 'Call the handler' → 'Assert: graceful error handling, sensible response, no unhandled crash, no inconsistent state'.",
    diagramMermaid: `flowchart TD
    A["Mock remote dependency<br/>to simulate failure"] --> B["Call the handler"]
    B --> C["Assert: graceful error handling,<br/>no unhandled crash, no inconsistent state"]`,
    realProjectExample:
      "A test deliberately mocked an external pricing service to throw a timeout error, revealing that the order-creation handler was leaving a partially-created order record behind on that failure path — a bug that would never have surfaced with only happy-path tests, fixed by wrapping the operation in a transaction that rolled back cleanly on the dependency's failure.",
    interviewTip:
      "If asked 'how confident are you that your service handles a dependency outage gracefully', the strong answer describes an actual resilience test you wrote for that scenario, not just an assumption that the error handling code 'should' work.",
    followupQuestions: [
      "How would you simulate a timeout specifically, versus an outright connection error?",
      "What does 'the system left in an inconsistent state' concretely look like, and how would a test catch it?",
      "Would you test retry behavior if your handler implements automatic retries for a flaky dependency?",
    ],
    commonMistakes: [
      "Only testing the happy path where all dependencies respond successfully, missing real failure-mode bugs.",
      "Assuming error-handling code works correctly without an actual test forcing that failure path to execute.",
    ],
    importantPoints: [
      "Mock the remote dependency to simulate failure (error, timeout, unexpected response).",
      "Assert the handler degrades gracefully — sensible error, no unhandled crash, no inconsistent state.",
      "Resilience testing of failure paths is what distinguishes demo-quality code from production-ready code.",
    ],
    revisionNotes: "Test dependency failure paths by mocking the remote service to error/timeout, then assert graceful handling — not just happy-path testing. Reveals bugs like partial-state left behind on failure.",
  },
];

export const capModelMcqs: BtpMcq[] = [
  {
    id: "cap-mcq1",
    topic: "Node.js CAP",
    prompt: "What does CAP primarily auto-generate from a CDS model?",
    options: ["Only unit tests", "An OData/REST service and database schema", "A Docker image", "A Kubernetes cluster"],
    correctIndex: 1,
    explanation: "CAP generates a working OData/REST service (CRUD, filtering, sorting) and the underlying database schema directly from the declared CDS model.",
  },
  {
    id: "cap-mcq2",
    topic: "Java CAP",
    prompt: "What framework is CAP Java built on?",
    options: ["Express.js", "Spring Boot", "Django", "Ruby on Rails"],
    correctIndex: 1,
    explanation: "CAP Java is built on Spring Boot, giving Java-idiomatic handlers and access to the Spring ecosystem.",
  },
  {
    id: "cap-mcq3",
    topic: "Entities",
    prompt: "What does the `key` keyword on a CDS entity field control?",
    options: [
      "Whether the field is required",
      "Which field(s) uniquely identify a record, driving the DB primary key and OData addressing",
      "Whether the field appears in the UI",
      "The field's data type",
    ],
    correctIndex: 1,
    explanation: "`key` marks the unique identifier field(s), which CAP uses for the generated database primary key and how a single record is addressed in OData (e.g. /Orders(1)).",
  },
  {
    id: "cap-mcq4",
    topic: "Compositions",
    prompt: "What is the key difference between a composition and an association in CDS?",
    options: [
      "They're identical, just different keywords",
      "Composition implies ownership/lifecycle dependency; association is a plain reference",
      "Associations can only be one-to-one",
      "Compositions can't be used with deep inserts",
    ],
    correctIndex: 1,
    explanation: "Composition means the child's lifecycle is tied to the parent (cascading delete, deep insert); association is just a reference with no lifecycle dependency.",
  },
  {
    id: "cap-mcq5",
    topic: "Actions",
    prompt: "Which CDS keyword declares a read-only, side-effect-free operation exposed via HTTP GET?",
    options: ["action", "function", "entity", "aspect"],
    correctIndex: 1,
    explanation: "`function` declares a read-only, side-effect-free operation (exposed via GET); `action` is for operations that can have side effects (exposed via POST).",
  },
  {
    id: "cap-mcq6",
    topic: "Authentication",
    prompt: "What validates the bearer token on incoming requests to a CAP service on BTP?",
    options: [
      "Custom code the developer must write",
      "CAP's built-in middleware, using the bound XSUAA service",
      "The database layer",
      "There is no token validation by default",
    ],
    correctIndex: 1,
    explanation: "Once XSUAA is bound, CAP's built-in authentication middleware validates the bearer token automatically before any handler code runs.",
  },
  {
    id: "cap-mcq7",
    topic: "Authorization",
    prompt: "Which annotation restricts CRUD operations on a CDS entity based on user roles?",
    options: ["@readonly", "@restrict", "@cds.persistence", "@odata.draft.enabled"],
    correctIndex: 1,
    explanation: "@restrict (or the simpler @requires) declares role-based access rules per operation, enforced automatically by CAP.",
  },
  {
    id: "cap-mcq8",
    topic: "Draft",
    prompt: "What does annotating an entity with @odata.draft.enabled provide?",
    options: [
      "Automatic database backups",
      "Auto-generated draft table + standard edit/activate/discard operations",
      "Automatic multitenancy",
      "Automatic authentication",
    ],
    correctIndex: 1,
    explanation: "@odata.draft.enabled makes CAP generate a shadow draft table and implement the standard OData draft protocol (edit, activate/save, discard) automatically.",
  },
  {
    id: "cap-mcq9",
    topic: "Multitenancy",
    prompt: "In a multitenant CAP SaaS app, how is tenant data isolated?",
    options: [
      "It isn't — all tenants share one database schema",
      "Each tenant gets its own isolated HDI container while sharing one app instance",
      "Each tenant gets a completely separate deployed application",
      "Tenants must manually configure their own isolation",
    ],
    correctIndex: 1,
    explanation: "CAP's multitenancy support gives each subscribed tenant a dedicated, isolated HDI container, auto-provisioned via SaaS Provisioning, while one app instance serves all tenants.",
  },
  {
    id: "cap-mcq10",
    topic: "Events",
    prompt: "Which CAP event handler type is required to implement a fully custom action with no default behavior?",
    options: ["before", "on", "after", "none — actions can't have custom logic"],
    correctIndex: 1,
    explanation: "'on' handlers replace default processing entirely — necessary for custom actions/functions that have no generated default implementation to begin with.",
  },
  {
    id: "cap-mcq11",
    topic: "Testing",
    prompt: "What does `cds.test` let you do when testing a CAP service?",
    options: [
      "Only test isolated JavaScript functions",
      "Bootstrap the service in-memory and make real OData requests against it",
      "Automatically deploy to production",
      "Generate UI screenshots",
    ],
    correctIndex: 1,
    explanation: "cds.test bootstraps the actual CAP service in-memory with a test database, letting you make real HTTP requests against its OData endpoints for integration-style testing.",
  },
  {
    id: "cap-mcq12",
    topic: "Java CAP",
    prompt: "What annotation registers a class as a CAP Java event handler?",
    options: ["@Service", "@Component implementing EventHandler", "@RestController", "@Entity"],
    correctIndex: 1,
    explanation: "A CAP Java handler class is a Spring @Component implementing the EventHandler marker interface, with methods annotated @Before/@On/@After.",
  },
  {
    id: "cap-mcq13",
    topic: "Entities",
    prompt: "What does a `virtual` field in a CDS entity mean?",
    options: [
      "It's encrypted at rest",
      "It exists in the API shape but has no database column and must be populated by a handler",
      "It's automatically indexed",
      "It's only visible to admins",
    ],
    correctIndex: 1,
    explanation: "Virtual fields appear in the exposed API/OData shape but have no persisted column — they must be populated at runtime, typically via an after(READ) handler.",
  },
  {
    id: "cap-mcq14",
    topic: "Associations",
    prompt: "What's the key difference between a managed and unmanaged association?",
    options: [
      "Managed associations are read-only",
      "Managed associations auto-generate the foreign key; unmanaged ones require an explicit `on` condition",
      "Unmanaged associations can't be queried",
      "There is no difference",
    ],
    correctIndex: 1,
    explanation: "Managed associations let CAP auto-generate and maintain the foreign key. Unmanaged associations require you to declare the join condition explicitly via `on`.",
  },
  {
    id: "cap-mcq15",
    topic: "Compositions",
    prompt: "What happens to composed child records when their parent entity is deleted?",
    options: [
      "Nothing — children remain, orphaned",
      "They automatically cascade-delete along with the parent",
      "They get archived automatically",
      "The delete is blocked",
    ],
    correctIndex: 1,
    explanation: "Composition implies ownership — deleting the parent automatically cascades the delete to its composed children, unlike a plain association.",
  },
  {
    id: "cap-mcq16",
    topic: "Actions",
    prompt: "How is a bound action invoked over HTTP, compared to an unbound action?",
    options: [
      "Bound actions target a specific entity instance (e.g. /Orders(1)/submit); unbound actions are called at the service level",
      "There's no difference in HTTP invocation",
      "Bound actions always use GET",
      "Unbound actions require WebSockets",
    ],
    correctIndex: 0,
    explanation: "A bound action operates on a specific instance, like POST /Orders(1)/submit, with that instance's context auto-provided. An unbound action is called at the service level with no instance tie.",
  },
  {
    id: "cap-mcq17",
    topic: "Functions",
    prompt: "Why are read-only lookups modeled as functions rather than actions?",
    options: [
      "Functions run faster on the CPU",
      "Functions map to GET, making them cacheable and safe to retry, unlike actions which map to POST",
      "Functions can't take parameters",
      "There's no real difference",
    ],
    correctIndex: 1,
    explanation: "Functions map to HTTP GET (cacheable, safe/idempotent by contract), while actions map to POST (assumed to have side effects, not cached by default).",
  },
  {
    id: "cap-mcq18",
    topic: "Authentication",
    prompt: "What does `@requires: 'authenticated-user'` actually check?",
    options: [
      "That the user has the Admin role",
      "Only that the request has any valid, logged-in identity — not any specific role",
      "That the request came from an internal service",
      "That the user's email is verified",
    ],
    correctIndex: 1,
    explanation: "'authenticated-user' is an authentication check, not authorization — any valid logged-in identity passes, regardless of role.",
  },
  {
    id: "cap-mcq19",
    topic: "Authorization",
    prompt: "How would you allow all authenticated users to READ an entity but restrict CREATE/UPDATE/DELETE to Admins only?",
    options: [
      "This isn't possible with @restrict",
      "Use per-event grant conditions in @restrict, e.g. READ for authenticated-user, write events for Admin",
      "Write a single @restrict rule covering the whole entity uniformly",
      "Use a different entity for reads versus writes",
    ],
    correctIndex: 1,
    explanation: "@restrict supports different grant conditions per event, enabling asymmetric access like broadly readable, narrowly writable data — all declared on one entity.",
  },
  {
    id: "cap-mcq20",
    topic: "Multitenancy",
    prompt: "Does CAP business logic code typically need to add explicit tenant-ID filters to queries?",
    options: [
      "Yes, every query must filter by tenant ID manually",
      "No — tenant isolation is structural, handled via separate per-tenant HDI containers resolved automatically from the request JWT",
      "Only for DELETE operations",
      "Only in Java CAP, not Node.js CAP",
    ],
    correctIndex: 1,
    explanation: "CAP's multitenancy uses separate HDI containers per tenant, with the connection resolved automatically from the request's JWT — no manual tenant filtering needed in query code.",
  },
];
