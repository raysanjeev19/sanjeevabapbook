import type { BtpCodingQuestion } from "@/lib/btp-content";

export const capModelTopicNotes: Record<string, string> = {
  "Node.js CAP":
    "CAP (Cloud Application Programming Model) tumhe CDS mein data model aur service exposure declare karne deta hai, aur framework automatically ek working OData service generate kar deta hai (CRUD, filtering, sorting, expand) + database schema — REST boilerplate hand-likhne ki jagah. `cds watch` local dev server hai jo live reload karta hai, default mein in-memory SQLite database use karta hai fast iteration ke liye.",
  "Java CAP":
    "CAP Java Spring Boot ke upar built hai — same CDS-driven model, lekin Java-idiomatic event handlers aur Spring configuration (`application.yaml`) ke saath. Deep Java/Spring expertise ya existing Java systems integrate karne wali teams isse choose karti hain; fresh start karne wali teams aksar Node.js prefer karti hain.",
  CDS:
    "CAP project mein `db/` folder persistence data model hold karta hai (entities jo database tables map karti hain), aur `srv/` folder service definitions hold karta hai jo us model ko expose/project karti hain — 'kya store hua hai' se 'kya expose hua hai' ko separate karta hai. Ye CDS ABAP Environment ke CDS se conceptually related hai (dono ka core idea same hai — Core Data Services), lekin dialect aur toolchain alag hai: CAP ka CDS Node.js/Java `cds` toolchain se compile hoke HDI/SQLite artifacts banata hai, jabki ABAP CDS DDL-based hota hai, ABAP Repository mein embedded hota hai apne ABAP-specific annotations aur alag compiler/runtime ke saath.",
  Entities:
    "Entity CDS ka structured data type hai (fields, types, associations), roughly ek database table ya domain object jaisa. `key` keyword un fields ko mark karta hai jo record ko uniquely identify karte hain — generated DB primary key aur OData addressing (jaise `/Orders(1)`) isi pe based hoti hai. Zyada tar CAP projects generated UUID key use karte hain natural business key ki jagah, collision avoid karne ke liye.",
  Associations:
    "One-to-many relationship model karne ke liye, 'many' side entity pe `Association to <one entity>` declare karo, aur optionally 'one' side pe reverse navigation ke liye `Association to many ... on ... = $self`. Baaki CDS associations ki tarah, ye lazy metadata hai — actual join tabhi execute hota hai jab consumer path follow kare (jaise OData `$expand`).",
  Compositions:
    "Composition ownership express karta hai — child entity ka lifecycle parent se tied hota hai (parent delete → children bhi delete, deep insert/update/delete automatically cascade hota hai). Association sirf ek plain reference hai, koi lifecycle dependency nahi. Orders 'has' LineItems (ownership) → composition. Orders 'references' Customer (no ownership) → association.",
  Actions:
    "Action (`action` keyword) ek operation hai jo side effects kar sakti hai (data change), OData mein HTTP POST se expose hoti hai. Function (`function` keyword) read-only, side-effect-free hoti hai, HTTP GET se expose hoti hai. 'Preview'/'calculate' jaisi cheezon ke liye hamesha function use karo, state-changing operations (jaise 'submit') ke liye action.",
  Authentication:
    "CAP service XSUAA instance se bind hota hai, jo har incoming request ke bearer token ko automatically validate karta hai (signature, expiry, scopes) tumhari handler code chalne se pehle. Agar invalid, request reject ho jaati hai; agar valid, authenticated user ki identity `req.user` (Node.js) mein available ho jaati hai.",
  Authorization:
    "`@restrict` (ya simpler `@requires`) annotation entity/service pe declare karti hai ki kaunse role ko kaunsi operation allow hai — CAP framework ye automatically enforce karta hai. Role names `xs-security.json` mein defined role templates se map hote hain, jo BTP role collections ke through actual users ko assign hote hain.",
  Draft:
    "`@odata.draft.enabled` annotation kisi entity pe lagane se CAP automatically ek parallel draft table generate karta hai aur standard OData draft actions (`draftEdit`, `draftActivate`, `draftDiscard`) implement kar deta hai — in-progress edits server-side recoverable rehte hain, sirf explicit save pe active record mein merge hote hain. Fiori Elements is protocol ko natively consume karta hai.",
  Multitenancy:
    "CAP multitenancy (`@sap/cds-mtxs` package) har subscribed tenant ko apna isolated HDI container deta hai, ek hi shared application instance ke saath. Jab naya tenant subscribe karta hai (SaaS Provisioning ke through), CAP automatically uska HDI container create/initialize kar deta hai — application ki business logic ko khud tenant-aware hone ki zaroorat nahi.",
  Functions:
    "Function ek read-only, side-effect-free operation hai (`function` keyword se declare hoti hai), HTTP GET se expose hoti hai — cache-safe aur repeatedly call karne ke liye safe. Action ke bilkul contrast mein, jo side effects kar sakti hai aur POST se expose hoti hai.",
  Events:
    "CAP event handlers teen types ke hote hain: `before` (default processing se pehle, validation ke liye, reject kar sakta hai), `on` (default logic ko poori tarah replace karta hai, custom actions ke liye zaroori), aur `after` (operation complete hone ke baad, response enrich karne ya side effects ke liye).",
  Deployments:
    "`cds add mta` se ek `mta.yaml` scaffold hota hai jisme CAP service module, shayad ek Fiori frontend module, aur resources (HANA Cloud + deployer, XSUAA + xs-security.json, Destination) hote hain. `mbt build` se `.mtar` banta hai, aur `cf deploy` poori application ko ek coordinated, dependency-ordered operation ki tarah deploy karta hai.",
  Testing:
    "`cds.test` utility CAP service ko in-memory bootstrap karta hai (test SQLite database ke saath) aur real OData requests (GET/POST/PATCH) bhejne deta hai, response assert karne ke liye — ye integration-style testing hai jo custom handlers aur CAP ke generated CRUD/validation layer dono ko saath test karta hai, sirf isolated function unit-test se zyada thorough.",
};

export const capModelCodingQuestions: BtpCodingQuestion[] = [
  {
    id: "cap-cq1",
    topic: "Entities",
    language: "CDS",
    difficulty: "Beginner",
    prompt: "Define a CAP entity 'Books' with a generated UUID key, a String field 'title', and an Integer field 'stock'.",
    solution: "entity Books : cuid {\n  title : String;\n  stock : Integer;\n}",
    explanation: "`cuid` is CAP's reusable aspect providing a generated UUID `ID` key field automatically, avoiding the need to declare and manage a natural business key.",
  },
  {
    id: "cap-cq2",
    topic: "Authorization",
    language: "CDS",
    difficulty: "Intermediate",
    prompt: "Add an annotation to the 'Books' entity restricting CREATE, UPDATE, and DELETE to the 'Admin' role, while allowing READ for anyone, including unauthenticated (anonymous) users.",
    solution: "@restrict: [\n  { grant: ['CREATE','UPDATE','DELETE'], to: 'Admin' },\n  { grant: 'READ', to: 'any' } // 'any' = public access, no login required\n]\nentity Books : cuid { ... }",
    explanation: "@restrict declares per-operation role requirements; 'any' is the pseudo-role for unrestricted, public access — it does not require authentication at all, so even anonymous requests are allowed. Mutation operations instead require the 'Admin' role from a validated token. (This is different from 'authenticated-user', the pseudo-role meaning any logged-in user regardless of role.)",
  },
  {
    id: "cap-cq3",
    topic: "Actions",
    language: "Node.js",
    difficulty: "Intermediate",
    prompt: "Write a CAP Node.js event handler that implements a custom action 'submitOrder' by fully replacing the default logic.",
    solution: "module.exports = (srv) => {\n  srv.on('submitOrder', async (req) => {\n    // custom logic here\n    return { status: 'submitted' };\n  });\n};",
    explanation: "`srv.on` is required (not `before`/`after`) for a custom action, since actions have no default generated implementation to supplement — `on` provides the entire behavior.",
  },
  {
    id: "cap-cq4",
    topic: "Testing",
    language: "Node.js",
    difficulty: "Intermediate",
    prompt: "Write a test using cds.test that sends a GET request to the Books entity and asserts a 200 status.",
    solution: "const cds = require('@sap/cds/lib/test');\nconst { GET, expect } = cds.test(__dirname + '/..');\n\nit('reads books', async () => {\n  const res = await GET('/odata/v4/catalog/Books');\n  expect(res.status).to.equal(200);\n});",
    explanation: "cds.test bootstraps the actual service in-memory, and GET makes a real HTTP request against the generated OData endpoint, testing the full stack rather than an isolated function.",
  },
];
