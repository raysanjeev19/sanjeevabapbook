import type { BtpMcq, BtpQuestion } from "@/lib/btp-content";

/** Section 11 — HTML5 Apps. Interview questions, full format. */
export const html5AppsQuestions: BtpQuestion[] = [
  {
    id: "html5-q1",
    topic: "App Router",
    prompt: "What is the App Router, and what problem does it solve for a multi-service BTP application?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["app-router", "architecture"],
    estimatedMinutes: 3,
    expectedAnswer:
      "The App Router is a single-entry-point Node.js component that authenticates users, then routes requests to the correct backend service or static resource behind it based on configured URL path rules — giving a multi-service application one unified, secured entry point instead of exposing every microservice individually.",
    detailedAnswer:
      "A typical BTP application isn't one monolith — it might have a UI5 frontend served from the HTML5 repository, a CAP backend service, and maybe another microservice, each technically a separate deployable unit. Without an App Router, a client would need to know and separately authenticate against each of these individually — a poor, fragmented experience. The App Router sits in front of all of them as the single public entry point: it handles authentication (validating the user via XSUAA) once, then forwards each request to the correct backend based on path-matching rules declared in its `xs-app.json` configuration (e.g. `/api/*` goes to the CAP service, everything else serves static UI5 files) — presenting the whole multi-service application as one unified, secured experience to the outside world.",
    hindiExplanation:
      "Typical BTP application ek monolith nahi hota — usme ek UI5 frontend ho sakta hai (HTML5 repository se serve hone wala), ek CAP backend service, aur shayad ek aur microservice, har ek technically ek alag deployable unit. App Router ke bina, ek client ko in sabko alag-alag jaanna aur authenticate karna padta — ek poor, fragmented experience. App Router in sab ke aage single public entry point ki tarah baithta hai: authentication ek baar handle karta hai (XSUAA se user validate karke), fir har request ko sahi backend tak forward karta hai `xs-app.json` configuration mein declared path-matching rules ke aadhar pe (jaise `/api/*` CAP service ko jaaye, baaki sab static UI5 files serve karein).",
    interviewExplanation:
      "I'd explain the unification benefit: 'A real BTP app is usually multiple separate services — a UI5 frontend, a CAP backend, maybe more. Without an App Router, clients would need to authenticate against each separately. The App Router is the single entry point that handles authentication once, then routes each request to the right backend based on path rules in xs-app.json, presenting the whole thing as one unified, secured application.'",
    diagramNote:
      "'Client' → 'App Router (authenticates once)' → routes by path: '/api/* → CAP backend', '/* → HTML5 repo (UI5 static files)'.",
    diagramMermaid: `flowchart LR
    A["Client"] --> B["App Router<br/>authenticates once"]
    B -- "/api/*" --> C["CAP backend"]
    B -- "/*" --> D["HTML5 repo<br/>UI5 static files"]`,
    realProjectExample:
      "Our project's App Router routed `/odata/*` requests to a CAP service, `/reports/*` to a separate reporting microservice, and everything else to static UI5 files in the HTML5 repository — all behind one authenticated entry point the client only ever interacted with directly.",
    interviewTip:
      "Mentioning `xs-app.json` by name as the configuration file driving these routing rules shows specific, hands-on familiarity rather than a vague conceptual description.",
    followupQuestions: [
      "What does xs-app.json actually configure?",
      "Does the App Router itself perform authorization, or just authentication?",
      "Can the App Router route to on-premise systems via a destination?",
    ],
    commonMistakes: [
      "Thinking each microservice handles its own separate authentication instead of a unified App Router.",
      "Not knowing xs-app.json is the specific configuration file for routing rules.",
    ],
    importantPoints: [
      "App Router = single entry point, handles authentication, routes by path.",
      "Configured via xs-app.json declaring path-to-backend routing rules.",
      "Presents a multi-service app as one unified, secured experience.",
    ],
    revisionNotes: "App Router = single entry point (auth once via XSUAA) + path-based routing to backends/static files (configured in xs-app.json).",
  },
  {
    id: "html5-q2",
    topic: "HTML5 Repository",
    prompt: "What is the HTML5 Application Repository, and why deploy static UI files there instead of serving them from your own backend?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["html5-repository", "static-assets"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The HTML5 Application Repository is a managed BTP service specifically for storing and versioning static frontend assets (HTML, JS, CSS); using it decouples the frontend's lifecycle from the backend's, lets multiple backend services share the same UI assets, and offloads static file serving to a service optimized for exactly that.",
    detailedAnswer:
      "You could serve static files directly from your Node.js/Java backend, but that couples frontend deployment to backend deployment (redeploying the UI means redeploying the whole backend service too) and means your backend service is spending resources on static file serving it doesn't need to. The HTML5 Application Repository is purpose-built for this: you deploy versioned static app content there independently, and any App Router (or the Launchpad service) can reference and serve it, decoupling frontend release cycles from backend ones, and letting multiple different backend deployments potentially serve the same UI version without duplicating files.",
    hindiExplanation:
      "Tum static files apne Node.js/Java backend se directly serve kar sakte the, lekin isse frontend deployment backend deployment se couple ho jaata (UI redeploy karne ka matlab poori backend service bhi redeploy karna) aur tumhari backend service static file serving pe resources kharch karti jinki use zaroorat nahi. HTML5 Application Repository isi ke liye purpose-built hai: tum versioned static app content wahan independently deploy karte ho, aur koi bhi App Router (ya Launchpad service) use reference/serve kar sakta hai, frontend release cycles ko backend se decouple karte hue.",
    interviewExplanation:
      "I'd give the decoupling reason: 'You could serve static files from your own backend, but that couples frontend and backend deployment lifecycles together, and wastes backend resources on static serving. The HTML5 Application Repository is purpose-built for versioned static content — deployed independently, referenced by an App Router or the Launchpad, decoupling frontend releases from backend ones.'",
    diagramNote:
      "'Backend serves static files itself' → 'coupled lifecycles, wasted resources' vs 'HTML5 Repository (versioned static content)' → 'App Router/Launchpad reference it, decoupled lifecycles'.",
    diagramMermaid: `flowchart LR
    A["Backend serves<br/>static files itself"] --> B["Coupled lifecycles,<br/>wasted resources"]
    C["HTML5 Repository<br/>versioned static content"] --> D["App Router/Launchpad reference it<br/>decoupled lifecycles"]`,
    realProjectExample:
      "Deploying a UI fix required only redeploying the HTML5 Application Repository content, with zero changes or redeployment needed for the CAP backend it was paired with — the two release cycles were fully independent.",
    interviewTip:
      "If asked 'why not just serve static files from Node.js directly', the decoupling-of-release-cycles answer is the concrete justification, not just 'it's the SAP way'.",
    followupQuestions: [
      "How does an App Router actually reference content in the HTML5 Repository?",
      "Can multiple versions of the same app coexist in the HTML5 Repository?",
      "How does the Launchpad service relate to the HTML5 Repository?",
    ],
    commonMistakes: [
      "Serving static UI files directly from the backend service by default, without considering the HTML5 Repository.",
      "Not knowing the HTML5 Repository specifically enables decoupled frontend/backend release cycles.",
    ],
    importantPoints: [
      "HTML5 Repository = managed service for versioned static frontend assets.",
      "Decouples frontend deployment lifecycle from backend deployment.",
      "Referenced by App Router or Launchpad service to actually serve the content.",
    ],
    revisionNotes: "HTML5 Repository = managed, versioned static asset storage — decouples frontend release cycle from backend, referenced by App Router/Launchpad.",
  },
  {
    id: "html5-q3",
    topic: "Deployment",
    prompt: "How do you deploy a UI5 app's static content to the HTML5 Application Repository?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["deployment", "html5-repository"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Package the built UI app as an MTA module of type `com.sap.application.content` (or use the `html5-apps-repo` deployer), which uploads the built static assets into the HTML5 Application Repository as part of the coordinated `cf deploy` process, alongside the rest of the application's modules.",
    detailedAnswer:
      "Within an `mta.yaml`, the UI5 app's built output (typically from `ui5 build` or a similar build step) is declared as a module of type `com.sap.application.content`, which the HTML5 Application Repository's deployer service knows how to consume — during `cf deploy`, this deployer module uploads the static content as a new version into the repository. This means the UI deployment is part of the same coordinated, dependency-ordered MTA deployment as everything else (the CAP backend, HANA, XSUAA), rather than a separate manual upload step, keeping the whole application's deployment atomic.",
    hindiExplanation:
      "`mta.yaml` ke andar, UI5 app ka built output (typically `ui5 build` ya similar build step se) `com.sap.application.content` type ke module ki tarah declare hota hai, jise HTML5 Application Repository ki deployer service consume karna jaanti hai — `cf deploy` ke dauraan, ye deployer module static content ko ek nayi version ki tarah repository mein upload kar deta hai. Isse UI deployment usi coordinated, dependency-ordered MTA deployment ka hissa ban jaata hai jaisa baaki sab kuch (CAP backend, HANA, XSUAA), ek alag manual upload step ki jagah.",
    interviewExplanation:
      "I'd describe the mechanism: 'In mta.yaml, the built UI5 output is declared as a com.sap.application.content module, which the HTML5 Repository's deployer service knows how to consume. During cf deploy, it uploads the static content as a new version — so the UI deployment is part of the same coordinated MTA deployment as everything else, not a separate manual step.'",
    diagramNote:
      "'UI5 build output' → 'mta.yaml module: com.sap.application.content' → 'cf deploy' → 'HTML5 Repository deployer uploads new version' — all as part of one coordinated MTA deployment.",
    diagramMermaid: `flowchart LR
    A["UI5 build output"] --> B["mta.yaml module:<br/>com.sap.application.content"]
    B --> C["cf deploy"]
    C --> D["HTML5 Repository deployer<br/>uploads new version"]`,
    realProjectExample:
      "Our mta.yaml declared the built UI5 app as a com.sap.application.content module alongside the CAP service and HANA deployer modules, so one `cf deploy` command uploaded the new UI version, deployed the backend, and updated the database schema all together, atomically.",
    interviewTip:
      "Naming the specific module type (`com.sap.application.content`) demonstrates precise, hands-on MTA deployment knowledge beyond a generic 'you deploy it somehow' answer.",
    followupQuestions: [
      "What build step typically produces the static output deployed to the HTML5 Repository?",
      "Can you deploy to the HTML5 Repository outside of an MTA, as a standalone step?",
      "How does the App Router know which version of the content to serve?",
    ],
    commonMistakes: [
      "Assuming UI5 static content deployment is a manual, separate process from the rest of the app.",
      "Not knowing the specific MTA module type used for this content.",
    ],
    importantPoints: [
      "Declared as an `com.sap.application.content` module in mta.yaml.",
      "Deployed via `cf deploy`, uploading a new version into the HTML5 Repository.",
      "Part of the same coordinated, atomic MTA deployment as the rest of the app.",
    ],
    revisionNotes: "UI5 static content deploys via an `com.sap.application.content` MTA module, uploaded to HTML5 Repository as part of one coordinated `cf deploy`.",
  },
  {
    id: "html5-q4",
    topic: "Launchpad",
    prompt: "How does the Launchpad relate to the HTML5 Repository and App Router when launching a Fiori app?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["launchpad", "fiori"],
    estimatedMinutes: 3,
    expectedAnswer:
      "The Launchpad presents a catalog of tiles; clicking one triggers intent-based navigation that resolves to a specific app's target mapping, which points to that app's App Router, which in turn serves the actual UI content from the HTML5 Repository — the Launchpad orchestrates discovery and navigation, while the App Router and HTML5 Repository handle actually delivering the app.",
    detailedAnswer:
      "A user sees a tile on the Launchpad (from a catalog/group configuration), and clicking it doesn't hard-link to a fixed URL — it triggers an 'intent' (a semantic action like `#Action-manage`), which the Launchpad's target mapping resolves to the specific app registered to handle that intent. That resolution ultimately points to the app's actual location — typically its own App Router instance, which authenticates the request and serves the corresponding static UI5 content from the HTML5 Repository. This layered indirection (Launchpad → intent resolution → App Router → HTML5 Repository) is what lets the same tile continue working even if the underlying app's technical deployment details change, since only the target mapping needs updating, not every tile referencing it.",
    hindiExplanation:
      "User Launchpad pe ek tile dekhta hai (catalog/group configuration se), aur usse click karna ek fixed URL ko hard-link nahi karta — ye ek 'intent' trigger karta hai (jaise `#Action-manage`), jise Launchpad ki target mapping specific registered app tak resolve karti hai us intent ko handle karne ke liye. Wo resolution ultimately app ki actual location tak point karta hai — typically uska apna App Router instance, jo request authenticate karta hai aur corresponding static UI5 content HTML5 Repository se serve karta hai. Ye layered indirection (Launchpad → intent resolution → App Router → HTML5 Repository) hi hai jo same tile ko chalte rehne deta hai chahe underlying app ke technical deployment details badal jaayein.",
    interviewExplanation:
      "I'd walk through the full chain: 'Clicking a Launchpad tile triggers an intent, which the Launchpad's target mapping resolves to a specific registered app. That points to the app's own App Router, which authenticates and serves the actual UI content from the HTML5 Repository. This layered indirection means the tile keeps working even if the app's deployment details change — only the target mapping needs updating.'",
    diagramNote:
      "'Launchpad tile click' → 'Intent (e.g. #Action-manage)' → 'Target mapping resolves to registered app' → 'App's App Router (authenticates)' → 'HTML5 Repository (serves UI content)'.",
    diagramMermaid: `flowchart LR
    A["Launchpad tile click"] --> B["Intent<br/>e.g. #Action-manage"]
    B --> C["Target mapping resolves<br/>to registered app"]
    C --> D["App's App Router<br/>authenticates"]
    D --> E["HTML5 Repository<br/>serves UI content"]`,
    realProjectExample:
      "Migrating an app to a new App Router instance during a re-architecture required only updating its target mapping registration — every existing tile across the organization's Launchpads kept working unchanged, since they only ever referenced the intent, not a hard-coded URL.",
    interviewTip:
      "Explaining the full layered chain (not just 'the Launchpad shows tiles') is what distinguishes a senior-level answer on Fiori Launchpad architecture.",
    followupQuestions: [
      "What is intent-based navigation and why is it preferred over hard-coded URLs?",
      "What's the difference between a catalog and a group in Launchpad configuration?",
      "What happens if a tile's intent has no registered target mapping?",
    ],
    commonMistakes: [
      "Describing the Launchpad as directly serving UI content itself, skipping the App Router/HTML5 Repository chain.",
      "Not knowing intent-based navigation is what provides deployment flexibility.",
    ],
    importantPoints: [
      "Launchpad tile → intent → target mapping resolution → app's App Router → HTML5 Repository.",
      "Intent-based navigation decouples tiles from hard-coded app URLs.",
      "Changing an app's deployment only requires updating its target mapping.",
    ],
    revisionNotes: "Launchpad chain: tile click → intent → target mapping → app's App Router → HTML5 Repository serves content. Intent-based nav = deployment flexibility.",
  },
  {
    id: "html5-q5",
    topic: "UI5",
    prompt: "What is the MVC (Model-View-Controller) pattern in UI5, and how does data binding fit into it?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["ui5", "mvc", "data-binding"],
    estimatedMinutes: 3,
    expectedAnswer:
      "In UI5's MVC, the View declares UI structure (often in XML), the Controller handles UI logic and events, and the Model holds application data; data binding connects View properties directly to Model data so the UI automatically reflects data changes without manual DOM manipulation in the controller.",
    detailedAnswer:
      "A UI5 View (commonly XML) declares controls and their properties, binding many of those properties to paths in a Model (like `{/customerName}`) rather than hard-coding static values. The Controller handles event logic (button clicks, navigation) and can read/write the Model's data programmatically, but doesn't typically need to manually update the DOM/UI directly — because of data binding, changing a value in the Model automatically propagates to every bound View property showing it, and two-way bindings (common on input fields) propagate changes the other way too, from user input back into the Model. This significantly reduces manual UI-sync code compared to imperative DOM manipulation, and keeps the View, Controller, and data concerns cleanly separated.",
    hindiExplanation:
      "UI5 View (commonly XML) controls aur unki properties declare karti hai, un properties ko Model ke paths se bind karte hue (jaise `{/customerName}`) static values hard-code karne ki jagah. Controller event logic handle karta hai (button clicks, navigation) aur Model ka data programmatically read/write kar sakta hai, lekin usually manually DOM/UI update karne ki zaroorat nahi hoti — data binding ki wajah se, Model mein ek value change karna automatically har bound View property tak propagate ho jaata hai jo use dikha rahi hai, aur two-way bindings (input fields pe common) doosri taraf bhi propagate karte hain, user input se wapas Model tak.",
    interviewExplanation:
      "I'd explain the roles and the binding benefit: 'The View declares structure, often in XML, binding properties to Model paths rather than hard-coding values. The Controller handles event logic and can read/write the Model, but doesn't need to manually sync the DOM — data binding automatically propagates Model changes to every bound View property, and two-way bindings on inputs propagate the other way too, cutting a lot of manual UI-sync code.'",
    diagramNote:
      "'View (XML, bound to Model paths)' <-- data binding --> 'Model (application data)', with 'Controller (event logic, reads/writes Model)' interacting with both.",
    diagramMermaid: `flowchart LR
    V["View<br/>XML, bound to Model paths"] <-- "data binding" --> M["Model<br/>application data"]
    C["Controller<br/>event logic"] --> M
    C --> V`,
    realProjectExample:
      "Updating a single field in the Model (after a successful save) automatically refreshed every UI element bound to that field across the whole view — a status badge, a summary text, and a detail panel — with zero manual DOM update code in the controller.",
    interviewTip:
      "Mentioning two-way binding specifically for input fields (not just one-way display binding) shows a more complete understanding of UI5's binding capabilities.",
    followupQuestions: [
      "What's the difference between one-way and two-way data binding?",
      "What types of Models does UI5 support (JSON, OData, etc.)?",
      "Why does UI5 favor XML Views over JavaScript-defined views for most apps?",
    ],
    commonMistakes: [
      "Manually manipulating the DOM in the controller instead of relying on data binding.",
      "Not knowing two-way binding exists for propagating user input back into the Model.",
    ],
    importantPoints: [
      "View = UI structure (often XML), bound to Model paths.",
      "Controller = event logic, reads/writes Model, doesn't manually sync UI.",
      "Data binding (one-way and two-way) automatically keeps View and Model in sync.",
    ],
    revisionNotes: "UI5 MVC: View (structure, bound to Model) + Controller (event logic) + Model (data). Data binding auto-syncs View↔Model, reducing manual DOM code.",
  },
  {
    id: "html5-q6",
    topic: "React",
    prompt: "If a team wants to build a custom BTP frontend in React instead of UI5, what BTP-specific pieces still need to be wired up manually?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["react", "custom-frontend"],
    estimatedMinutes: 3,
    expectedAnswer:
      "React doesn't come with UI5's built-in OData/XSUAA integration conventions, so the team needs to manually handle authentication token flow (via the App Router in front), OData/REST data fetching (with a library like a plain fetch wrapper or a data library), and potentially Fiori design guideline compliance if visual consistency with other SAP apps matters.",
    detailedAnswer:
      "UI5 has deep, built-in conventions for OData model binding, and typically the App Router handles authentication transparently for it. A React app is just a general-purpose frontend framework with none of these SAP-specific conventions baked in — the team still needs an App Router in front for authentication (React doesn't replace this need), needs to write or configure its own data-fetching layer against the backend's OData/REST APIs (no automatic model binding the way UI5 provides), and if visual/UX consistency with other Fiori-based enterprise apps matters, needs to deliberately implement Fiori design guidelines and possibly use SAP's UI5 Web Components (framework-agnostic components following Fiori design) rather than getting that consistency for free.",
    hindiExplanation:
      "UI5 ke paas OData model binding ke liye deep, built-in conventions hain, aur typically App Router uske liye authentication transparently handle karta hai. React ek general-purpose frontend framework hai jisme in SAP-specific conventions mein se koi bhi built-in nahi hai — team ko phir bhi authentication ke liye App Router aage chahiye (React ye zaroorat replace nahi karta), backend ke OData/REST APIs ke against apna khud ka data-fetching layer likhna/configure karna padta hai (UI5 jaisi automatic model binding nahi), aur agar doosre Fiori-based enterprise apps ke saath visual/UX consistency matter karti hai, deliberately Fiori design guidelines implement karni padegi ya SAP ke UI5 Web Components use karne padenge.",
    interviewExplanation:
      "I'd list the gaps explicitly: 'React doesn't replace the need for an App Router in front for authentication — that's still needed. It also has no built-in OData model binding like UI5, so the team writes their own data-fetching layer. And if visual consistency with other Fiori apps matters, they'd need to deliberately follow Fiori design guidelines or use UI5 Web Components, since that consistency isn't automatic outside UI5.'",
    diagramNote:
      "Still needed with React: 'App Router (auth, unchanged)' + 'Custom data-fetching layer (no auto OData binding)' + 'Deliberate Fiori design compliance (or UI5 Web Components) for visual consistency'.",
    diagramMermaid: `flowchart TD
    A["React frontend"] --> B["Still needs App Router<br/>for auth (unchanged)"]
    A --> C["Custom data-fetching layer<br/>no auto OData binding"]
    A --> D["Deliberate Fiori design compliance<br/>or UI5 Web Components"]`,
    realProjectExample:
      "A team building a React-based custom dashboard still deployed an App Router in front for authentication exactly as a UI5 app would, but had to hand-write their OData query/fetch logic and deliberately adopted UI5 Web Components for a few key controls to keep visual consistency with the organization's other Fiori apps.",
    interviewTip:
      "If asked 'can you use React on BTP', the correct answer is yes, but immediately clarify what BTP-specific plumbing (auth, data fetching, design consistency) still needs manual attention — a bare 'yes' misses the actual substance of the question.",
    followupQuestions: [
      "What are UI5 Web Components and how do they help a non-UI5 frontend?",
      "Does the App Router work identically regardless of frontend framework?",
      "What library might you use in React for OData consumption?",
    ],
    commonMistakes: [
      "Assuming React eliminates the need for an App Router or BTP-specific auth handling.",
      "Not knowing UI5 Web Components exist as a framework-agnostic option for Fiori design consistency.",
    ],
    importantPoints: [
      "App Router is still needed for authentication, regardless of frontend framework.",
      "React has no built-in OData model binding — a custom data-fetching layer is needed.",
      "Fiori visual consistency requires deliberate effort (design guidelines or UI5 Web Components).",
    ],
    revisionNotes: "React on BTP: still needs App Router (auth), custom data-fetching (no auto OData binding), and deliberate Fiori design effort (or UI5 Web Components) for visual consistency.",
  },
  {
    id: "html5-q7",
    topic: "Angular",
    prompt: "Is there a strong technical reason to prefer UI5 over Angular for a BTP Fiori-style app, or is it mostly a convention/ecosystem choice?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["angular", "framework-choice"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Mostly convention and ecosystem fit — UI5 gives Fiori design compliance, OData binding, and Launchpad integration largely for free, which Angular would require deliberately reimplementing; but Angular is a fully capable framework, so the choice often comes down to team expertise and whether Fiori-exact consistency actually matters for that specific app.",
    detailedAnswer:
      "There's no fundamental technical reason Angular couldn't build a functionally complete BTP application — it's a mature, capable framework. The real difference is how much comes 'for free' with UI5 specifically for the SAP ecosystem: Fiori design guideline compliance, native OData v2/v4 model binding, and out-of-the-box Launchpad tile/intent integration are all UI5 conventions that an Angular app would need to deliberately reimplement or approximate (e.g. using UI5 Web Components for visual consistency, hand-building OData consumption). For a team with deep existing Angular expertise building an internal tool where exact Fiori look-and-feel isn't critical, Angular can be a perfectly reasonable choice; for a customer-facing app that needs to feel consistent with the rest of an organization's standard Fiori Launchpad apps, UI5's built-in conventions save significant deliberate effort.",
    hindiExplanation:
      "Koi fundamental technical reason nahi hai ki Angular ek functionally complete BTP application na bana sake — ye ek mature, capable framework hai. Real difference ye hai ki UI5 ke saath SAP ecosystem ke liye specifically kitna kuch 'for free' milta hai: Fiori design guideline compliance, native OData v2/v4 model binding, aur out-of-the-box Launchpad tile/intent integration — ye sab UI5 conventions hain jinhe Angular app ko deliberately reimplement ya approximate karna padega. Ek team ke liye jinke paas deep existing Angular expertise hai ek internal tool banane ke liye jaha exact Fiori look-and-feel critical nahi hai, Angular ek perfectly reasonable choice ho sakta hai; ek customer-facing app ke liye jise organization ke baaki standard Fiori Launchpad apps ke saath consistent feel karna hai, UI5 ki built-in conventions significant deliberate effort bachati hain.",
    interviewExplanation:
      "I'd give the balanced answer: 'There's no fundamental technical reason Angular couldn't work — it's a capable framework. The real difference is how much comes for free with UI5 for SAP specifically: Fiori design compliance, native OData binding, Launchpad integration. Angular can be a reasonable choice for a team with strong Angular expertise on an internal tool where exact Fiori consistency doesn't matter; for a customer-facing app needing Fiori consistency, UI5 saves real, deliberate effort.'",
    diagramNote:
      "Decision factors: 'Team has strong Angular expertise + Fiori consistency not critical → Angular reasonable' vs 'Fiori Launchpad visual consistency matters → UI5 saves deliberate effort'.",
    diagramMermaid: `flowchart LR
    A["Strong Angular expertise +<br/>Fiori consistency not critical"] --> B["Angular reasonable choice"]
    C["Fiori Launchpad visual<br/>consistency matters"] --> D["UI5 saves deliberate effort"]`,
    realProjectExample:
      "An internal analytics tool built in Angular by a team with deep existing Angular skills worked perfectly well, since it wasn't part of the organization's standard Fiori Launchpad and had no requirement to visually match other SAP apps — a customer-facing app in the same organization used UI5 specifically for Launchpad and Fiori consistency.",
    interviewTip:
      "If asked 'should you always use UI5 for BTP apps', the correct nuanced answer is no — it depends on team expertise and whether Fiori/Launchpad consistency actually matters for that specific app, not a blanket rule.",
    followupQuestions: [
      "What specifically does UI5 give you 'for free' that Angular doesn't?",
      "Could an Angular app still integrate with the Fiori Launchpad?",
      "What are UI5 Web Components and how might they help an Angular app?",
    ],
    commonMistakes: [
      "Claiming UI5 is always technically required or superior for any BTP frontend.",
      "Not identifying the specific conventions (Fiori design, OData binding, Launchpad integration) that actually differ.",
    ],
    importantPoints: [
      "No fundamental technical barrier to using Angular on BTP.",
      "UI5 provides Fiori design compliance, OData binding, and Launchpad integration largely for free.",
      "Choice depends on team expertise and whether Fiori/Launchpad consistency actually matters.",
    ],
    revisionNotes: "UI5 vs Angular = mostly convention/ecosystem fit, not a technical barrier. UI5 gives Fiori design + OData binding + Launchpad integration for free; Angular needs to reimplement these deliberately if needed.",
  },
  {
    id: "html5-q8",
    topic: "App Router",
    prompt: "Can the App Router perform authorization checks, or is it strictly limited to authentication?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["app-router", "authorization"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The App Router can enforce coarse-grained route-level authorization (requiring a specific scope to access a given path pattern, configured in xs-app.json), but fine-grained, business-logic-level authorization (like instance-based, own-records-only restrictions) still belongs in the backend service itself, not the App Router.",
    detailedAnswer:
      "Beyond just authenticating (confirming who the user is), xs-app.json route configuration supports a `scope` property on individual routes, letting the App Router reject requests to a specific path pattern if the user's token lacks the required scope — this is a genuine, if coarse-grained, authorization capability at the routing layer. However, this only operates at the level of 'is this whole route/path pattern accessible to this scope' — it can't express finer business rules like 'this user can only see their own records' or complex conditional authorization logic, which still needs to live in the actual backend service (via CAP's @restrict, for instance). The App Router's authorization role is a coarse first gate, not a replacement for backend-level authorization logic.",
    hindiExplanation:
      "Sirf authenticate karne (user kaun hai confirm karna) se aage, xs-app.json route configuration ek `scope` property support karti hai individual routes pe, App Router ko ek specific path pattern ke requests reject karne deti hai agar user ke token mein required scope nahi hai — ye ek genuine, chahe coarse-grained, authorization capability hai routing layer pe. Lekin, ye sirf 'is whole route/path pattern accessible to this scope' ke level pe operate karta hai — ye finer business rules express nahi kar sakta jaise 'ye user sirf apne records dekh sakta hai', jo abhi bhi actual backend service mein rehna chahiye.",
    interviewExplanation:
      "I'd clarify the App Router's coarse-grained role: 'xs-app.json routes support a scope property, letting the App Router reject requests to a path pattern if the token lacks the required scope — a genuine, coarse authorization capability. But it can't express finer business rules like own-records-only restrictions — that still needs to live in the backend, via something like CAP's @restrict. The App Router is a coarse first gate, not a replacement for backend authorization logic.'",
    diagramNote:
      "'App Router: route-level scope check (coarse, path pattern based)' → passes → 'Backend service: fine-grained/instance-based authorization (e.g. CAP @restrict)' — App Router is a first gate, not a full replacement.",
    diagramMermaid: `flowchart LR
    A["App Router:<br/>route-level scope check"] --> B["Backend service:<br/>fine-grained authorization"]`,
    realProjectExample:
      "The App Router's xs-app.json restricted an entire `/admin/*` path pattern to users with an Admin scope, while the actual row-level restriction of which specific records an Admin could see within that section was enforced by the CAP backend's own authorization logic.",
    interviewTip:
      "If asked 'does the App Router handle all authorization', the correct answer distinguishes its coarse route-level scope checks from the fine-grained backend logic that's still necessary — a common gap in surface-level answers.",
    followupQuestions: [
      "How would you configure a scope requirement on a specific route in xs-app.json?",
      "What HTTP status would a user without the required scope receive from the App Router?",
      "Would you ever rely on the App Router's scope check as your only authorization layer?",
    ],
    commonMistakes: [
      "Assuming the App Router only handles authentication, missing its route-level scope authorization capability.",
      "Relying solely on App Router route restrictions instead of also enforcing fine-grained authorization in the backend.",
    ],
    importantPoints: [
      "The App Router supports coarse-grained, route-level scope authorization via xs-app.json.",
      "Fine-grained, business-logic-level authorization still belongs in the backend service.",
      "The App Router is a first gate, not a complete authorization solution on its own.",
    ],
    revisionNotes: "App Router does coarse route-level scope checks (xs-app.json) — fine-grained/instance-based authorization still belongs in the backend (e.g. CAP @restrict), not the App Router alone.",
  },
  {
    id: "html5-q9",
    topic: "App Router",
    prompt: "How would you configure the App Router to call an on-premise system, and what does it need for that?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["app-router", "destinations"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Configure a route in xs-app.json with a `destination` property referencing a configured BTP destination pointing to the on-prem system (with ProxyType: OnPremise), and bind the Connectivity service to the App Router application so it can actually route through the Cloud Connector tunnel.",
    detailedAnswer:
      "The App Router's routing capability extends beyond just your own backend services — a route in xs-app.json can specify a `destination` property naming a configured destination, and the App Router will proxy matching requests through to whatever that destination points to. For an on-premise target, this destination would be configured with `ProxyType: OnPremise`, and critically, the App Router application itself needs the Connectivity service bound to it (the same requirement as any app needing on-prem reachability), since without that binding, the App Router has no actual tunnel infrastructure to route the request through, regardless of how the destination itself is configured.",
    hindiExplanation:
      "App Router ki routing capability sirf tumhare apne backend services se aage bhi jaati hai — xs-app.json mein ek route ek `destination` property specify kar sakti hai ek configured destination ko naam se, aur App Router matching requests ko us destination ke pointing target tak proxy kar dega. Ek on-premise target ke liye, ye destination `ProxyType: OnPremise` se configure hogi, aur critically, App Router application ko khud Connectivity service bound honi chahiye, kyunki iske bina App Router ke paas request ko route karne ke liye koi actual tunnel infrastructure nahi hai.",
    interviewExplanation:
      "I'd give the two required pieces: 'A route in xs-app.json specifies a destination property naming a configured destination — for on-prem, that destination has ProxyType: OnPremise. But critically, the App Router application itself needs the Connectivity service bound to it, same as any app needing on-prem reachability — without that binding, there's no actual tunnel infrastructure to route through, regardless of the destination config.'",
    diagramNote:
      "'xs-app.json route: destination property → configured destination (ProxyType: OnPremise)' + 'App Router app: Connectivity service bound' → 'Request routes through Cloud Connector tunnel'.",
    diagramMermaid: `flowchart LR
    A["xs-app.json route:<br/>destination property"] --> C["Request routes through<br/>Cloud Connector tunnel"]
    B["App Router: Connectivity<br/>service bound"] --> C`,
    realProjectExample:
      "An App Router route configured to proxy to an on-prem ERP system initially failed silently until the team realized the Connectivity service instance hadn't been bound to the App Router application itself, even though the destination and route configuration were both correct.",
    interviewTip:
      "If asked to debug an App Router route to an on-prem destination that fails, checking the Connectivity service binding on the App Router app itself (not just the destination config) is a precise, specific diagnostic step.",
    followupQuestions: [
      "Would the App Router also need principal propagation configured for this route, and when?",
      "How does this differ from a route pointing to another cloud/internet-based service?",
      "What error would you typically see if the Connectivity service binding is missing?",
    ],
    commonMistakes: [
      "Configuring the destination and route correctly but forgetting to bind the Connectivity service to the App Router app itself.",
      "Not knowing the App Router can route to on-premise systems at all, assuming it only proxies to other cloud services.",
    ],
    importantPoints: [
      "xs-app.json routes can specify a destination property to proxy to a configured destination.",
      "For on-prem targets, that destination uses ProxyType: OnPremise.",
      "The App Router app itself needs the Connectivity service bound for the tunnel to actually work.",
    ],
    revisionNotes: "App Router → on-prem: route's destination property references a ProxyType: OnPremise destination, AND the App Router app itself needs the Connectivity service bound.",
  },
  {
    id: "html5-q10",
    topic: "HTML5 Repository",
    prompt: "Can multiple versions of the same UI5 app coexist in the HTML5 Repository, and why would that matter?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["html5-repository", "versioning"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — each deployment creates a new version, and multiple versions can coexist; this matters because it enables scenarios like a staged rollout (different App Router instances or environments referencing different versions) and provides a straightforward rollback path if a new version has issues.",
    detailedAnswer:
      "Every deployment to the HTML5 Repository creates a distinct version rather than overwriting the only copy, and older versions aren't automatically deleted just because a newer one was deployed. This matters practically in a few ways: different environments (or even different App Router instances within the same landscape) can reference different specific versions if needed, supporting staged rollout patterns; and if a newly deployed version has an unexpected issue in production, rolling back is as straightforward as reconfiguring the App Router (or whatever consumes the content) to point at the previous, still-present version, rather than needing to rebuild and redeploy the old code from scratch.",
    hindiExplanation:
      "HTML5 Repository mein har deployment ek distinct version banata hai, sirf ek copy ko overwrite karne ki jagah, aur purani versions automatically delete nahi hoti sirf isliye ki ek nayi deploy ho gayi. Ye practically kuch tarikon se matter karta hai: different environments (ya same landscape ke andar different App Router instances) different specific versions reference kar sakte hain agar zaroorat pade, staged rollout patterns support karte hue; aur agar ek newly deployed version mein unexpected issue hai production mein, rollback utna hi straightforward hai jitna App Router ko reconfigure karke previous, still-present version pe point karna.",
    interviewExplanation:
      "I'd explain both the mechanism and the practical benefit: 'Yes, every deployment creates a new version rather than overwriting the only copy, and old versions persist. This matters for staged rollout — different App Router instances can reference different versions — and gives a straightforward rollback path if a new version has issues, since you just reconfigure to point at the previous still-present version rather than rebuilding old code from scratch.'",
    diagramNote:
      "'HTML5 Repository holds v1, v2, v3 (all coexisting)' → 'App Router (or environment) can reference any specific version' → 'Rollback = point at previous version, no rebuild needed'.",
    diagramMermaid: `flowchart LR
    A["HTML5 Repository:<br/>v1, v2, v3 coexisting"] --> B["App Router references<br/>a specific version"]
    B --> C["Rollback = point at<br/>previous version, no rebuild"]`,
    realProjectExample:
      "A newly deployed UI version introduced a rendering bug discovered shortly after go-live; rolling back was as simple as reconfiguring the App Router to reference the previous version still present in the HTML5 Repository, restoring service within minutes rather than needing an emergency rebuild.",
    interviewTip:
      "If asked how you'd handle a bad UI deployment, describing this version-coexistence-based rollback (rather than 'redeploy the old code') shows precise, hands-on familiarity with the HTML5 Repository's actual versioning behavior.",
    followupQuestions: [
      "How would old, unused versions eventually get cleaned up, if at all?",
      "How does an App Router know which specific version to reference?",
      "Would you use this versioning capability for a blue-green deployment pattern?",
    ],
    commonMistakes: [
      "Assuming a new deployment overwrites and removes the previous version entirely.",
      "Not knowing version coexistence enables a fast, rebuild-free rollback path.",
    ],
    importantPoints: [
      "Each deployment creates a new version; old versions persist and coexist.",
      "Enables staged rollout — different consumers can reference different versions.",
      "Provides a fast rollback path — reconfigure to a previous version, no rebuild needed.",
    ],
    revisionNotes: "HTML5 Repository keeps multiple coexisting versions per deployment — enables staged rollout and fast rollback (reconfigure to a previous version, no rebuild).",
  },
  {
    id: "html5-q11",
    topic: "HTML5 Repository",
    prompt: "Is the HTML5 Application Repository suitable for storing large binary assets like videos, or dynamically generated content?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["html5-repository", "scope-fit"],
    estimatedMinutes: 2,
    expectedAnswer:
      "No — it's specifically designed for versioned static frontend application content (HTML, JS, CSS, small images/icons), not large binary media or dynamically-generated content; large media should use a dedicated object storage service, and dynamic content inherently needs to be served by an actual backend, not a static repository.",
    detailedAnswer:
      "The HTML5 Application Repository's design center is versioned static app content — the compiled output of a UI5/frontend build, which is inherently small and static by nature. Large binary assets (videos, large image galleries) would bloat the repository and aren't what it's optimized for — a dedicated object storage service (like an Object Store service instance) is the appropriate place for that kind of content instead. Dynamically-generated content (anything computed per-request, personalized, or reflecting live data) fundamentally can't live in a static repository at all, regardless of size, since by definition it needs actual backend logic to generate it fresh for each request — the repository is only ever for pre-built, unchanging-until-redeployed static files.",
    hindiExplanation:
      "HTML5 Application Repository ka design center versioned static app content hai — ek UI5/frontend build ka compiled output, jo inherently small aur static by nature hota hai. Large binary assets (videos, large image galleries) repository ko bloat kar denge aur wo jiske liye ye optimized hai wo nahi hai — ek dedicated object storage service (jaise ek Object Store service instance) us tarah ke content ke liye appropriate jagah hai. Dynamically-generated content (kuch bhi jo per-request compute hota hai, personalized hai, ya live data reflect karta hai) fundamentally ek static repository mein bilkul nahi reh sakta, size ki parwah kiye bina, kyunki definition se use actual backend logic chahiye har request ke liye fresh generate karne ke liye.",
    interviewExplanation:
      "I'd clarify the scope precisely: 'No — it's designed specifically for versioned, small, static app content — compiled UI5/frontend build output. Large binary media would bloat it and isn't what it's optimized for; a dedicated object storage service fits that better. Dynamically-generated content can't live there at all, regardless of size, since by definition it needs actual backend logic to generate fresh per request — the repository is only for pre-built, unchanging static files.'",
    diagramNote:
      "'Small static app content (HTML/JS/CSS)' → 'HTML5 Repository fits' vs 'Large binary media (videos, galleries)' → 'Object storage service fits better' vs 'Dynamic/personalized content' → 'Needs actual backend, can't be static'.",
    diagramMermaid: `flowchart LR
    A["Small static app content"] --> B["HTML5 Repository fits"]
    C["Large binary media"] --> D["Object storage service instead"]
    E["Dynamic/personalized content"] --> F["Needs actual backend —<br/>can't be static"]`,
    realProjectExample:
      "A team initially considered storing large training video files in the HTML5 Repository alongside their app's UI content, before switching to a dedicated object storage service for the videos once they recognized the repository was meant for small, static app assets, not large media files.",
    interviewTip:
      "If asked what belongs (and doesn't belong) in the HTML5 Repository, being specific about small static app content versus large media versus dynamic content shows precise scoping rather than a vague 'it's for UI stuff'.",
    followupQuestions: [
      "What BTP service would you use instead for large binary media storage?",
      "How would you serve dynamically-generated, per-user content in a BTP application?",
      "Would small icons or images used within a UI5 app's own assets be appropriate in the HTML5 Repository?",
    ],
    commonMistakes: [
      "Attempting to store large binary media files in the HTML5 Repository alongside app content.",
      "Not recognizing that dynamically-generated content fundamentally can't live in any static content repository.",
    ],
    importantPoints: [
      "HTML5 Repository is designed for small, versioned, static app content.",
      "Large binary media belongs in a dedicated object storage service instead.",
      "Dynamically-generated content needs actual backend logic, not a static repository, regardless of size.",
    ],
    revisionNotes: "HTML5 Repository = small static app content only. Large binaries → dedicated object storage. Dynamic/personalized content needs a real backend, not a static repository, period.",
  },
  {
    id: "html5-q12",
    topic: "Deployment",
    prompt: "What's the risk of deploying a new UI5 version to the HTML5 Repository without any automated smoke test afterward?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["deployment", "testing"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The deployment itself succeeding (the upload completing without error) says nothing about whether the actual app works correctly once served — a build that uploaded fine could still be broken at runtime (a bad build artifact, a misconfigured manifest.json, a missing dependency), so an automated post-deployment smoke test verifying the app actually loads and functions is important, not just trusting deployment success.",
    detailedAnswer:
      "A successful `cf deploy` confirms the artifacts were correctly uploaded into the HTML5 Repository — it says nothing about whether the deployed content actually renders and functions correctly when a real user loads it. A build could complete and upload successfully while still being broken in ways only visible at runtime: a `manifest.json` misconfiguration causing the app to fail to initialize, a missing or mismatched dependency version, or a build artifact that's technically valid but functionally incomplete. Without an automated post-deployment smoke test (loading the app and verifying a few key interactions work), the team's only signal of a problem would be users reporting it in production, well after deployment 'succeeded' by the CI/CD pipeline's own metric.",
    hindiExplanation:
      "Ek successful `cf deploy` confirm karta hai ki artifacts correctly HTML5 Repository mein upload hue — ye kuch nahi batata ki deployed content actually render/function karta hai jab ek real user use load kare. Ek build complete aur successfully upload ho sakta hai jabki phir bhi aise tarikon se broken ho jo sirf runtime pe visible hon: ek `manifest.json` misconfiguration jo app ko initialize hone se rok de, ek missing ya mismatched dependency version, ya ek build artifact jo technically valid hai lekin functionally incomplete hai. Automated post-deployment smoke test ke bina, team ka sirf signal ek problem ka users production mein report karna hoga.",
    interviewExplanation:
      "I'd separate deployment success from functional correctness: 'A successful deploy confirms artifacts uploaded correctly, but says nothing about whether the app actually renders and functions for a real user. A build could upload successfully while still being broken at runtime — a manifest.json misconfiguration, a mismatched dependency. Without an automated smoke test loading the app and checking key interactions after deployment, the only signal of a problem would be users reporting it in production.'",
    diagramNote:
      "'cf deploy succeeds (upload confirmed)' → does NOT guarantee → 'App actually renders/functions correctly' → without smoke test: 'only signal is users reporting issues in production' — with smoke test: 'catches runtime issues immediately after deployment'.",
    diagramMermaid: `flowchart TD
    A["cf deploy succeeds<br/>upload confirmed"] -.->|"doesn't guarantee"| B["App actually renders/functions"]
    C["No smoke test"] --> D["Only signal: users<br/>report issues in production"]
    E["Automated smoke test"] --> F["Catches runtime issues<br/>immediately after deployment"]`,
    realProjectExample:
      "A deployment that succeeded by the CI/CD pipeline's own metric left the app completely blank in production due to a manifest.json path misconfiguration, undetected for hours until a user complaint — adding an automated post-deployment smoke test that loaded the app and checked for a specific rendered element caught this exact failure mode on every subsequent deployment.",
    interviewTip:
      "If asked 'how confident are you a deployment actually worked', the strong answer describes an automated post-deployment smoke test specifically, not just 'the pipeline said it succeeded'.",
    followupQuestions: [
      "What would a good smoke test for a UI5 app actually check?",
      "How would you automate this smoke test as part of the CI/CD pipeline?",
      "Would you roll back automatically if the smoke test fails, or alert a human first?",
    ],
    commonMistakes: [
      "Trusting deployment pipeline success as proof the app actually works correctly at runtime.",
      "Not implementing any automated verification after deployment, relying on users to report issues instead.",
    ],
    importantPoints: [
      "Deployment success only confirms upload, not that the app actually functions correctly.",
      "Runtime issues (manifest misconfiguration, dependency mismatches) can exist despite a successful deploy.",
      "An automated post-deployment smoke test catches these issues immediately, not via user reports.",
    ],
    revisionNotes: "Deployment success ≠ app actually works — runtime issues (manifest config, dependency mismatches) can slip through. Add an automated post-deployment smoke test to catch them immediately.",
  },
  {
    id: "html5-q13",
    topic: "Deployment",
    prompt: "How would you handle deploying different UI5 app versions to different regions or data centers?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["deployment", "multi-region"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Each region/subaccount has its own HTML5 Repository instance, so deployment is naturally per-region already — you'd run the same MTA deployment pipeline against each region's target subaccount independently, potentially staggering rollout order across regions for a safer, gradual release rather than deploying everywhere simultaneously.",
    detailedAnswer:
      "Since the HTML5 Repository (like most BTP services) is provisioned per subaccount, and subaccounts are region-specific, there's no single 'global' repository to manage — each region genuinely has its own separate deployment target, and the deployment pipeline needs to run against each one (typically via separate CI/CD pipeline stages or parallel jobs targeting each region's subaccount). This natural per-region separation also creates an opportunity for a safer rollout strategy: deploying to one region first, verifying it's healthy, then proceeding to the next region rather than deploying to every region simultaneously — reducing the blast radius if something goes wrong with a particular release.",
    hindiExplanation:
      "Kyunki HTML5 Repository (zyada tar BTP services ki tarah) per subaccount provision hoti hai, aur subaccounts region-specific hote hain, koi single 'global' repository manage karne ke liye nahi hai — har region ke paas genuinely apna separate deployment target hai, aur deployment pipeline ko har ek ke against chalna chahiye. Ye natural per-region separation ek safer rollout strategy ka opportunity bhi banata hai: ek region pe pehle deploy karna, use healthy verify karna, fir agle region pe proceed karna, saare regions pe simultaneously deploy karne ki jagah — blast radius kam karte hue agar kuch galat ho jaaye ek particular release ke saath.",
    interviewExplanation:
      "I'd explain the natural per-region separation and the safer rollout opportunity: 'Since the HTML5 Repository is provisioned per subaccount, and subaccounts are region-specific, there's naturally no global repository — each region is a genuinely separate deployment target, needing its own pipeline run. This also creates an opportunity for staged rollout — deploy to one region, verify it's healthy, then proceed to the next, rather than deploying everywhere simultaneously and risking a wider blast radius.'",
    diagramNote:
      "'Region A subaccount: own HTML5 Repository' + 'Region B subaccount: own HTML5 Repository' — separate deployment targets → 'Deploy Region A first, verify healthy, then Region B' — staged rollout, reduced blast radius.",
    diagramMermaid: `flowchart LR
    A["Region A subaccount<br/>own HTML5 Repository"] --> C["Deploy first, verify healthy"]
    B["Region B subaccount<br/>own HTML5 Repository"] --> D["Deploy next"]
    C --> D`,
    realProjectExample:
      "A global rollout deployed a new UI version to the EU region first, monitored it for two hours confirming stability, then proceeded to deploy the same version to the US and APAC regions — a genuine issue in the EU deployment would have been caught and fixed before impacting the other regions.",
    interviewTip:
      "If asked how you'd safely roll out a change across multiple regions, describing a staged, verify-then-proceed approach (rather than simultaneous global deployment) shows mature release engineering judgment.",
    followupQuestions: [
      "How would you automate this staged, region-by-region rollout in a CI/CD pipeline?",
      "What would you monitor to decide a region is 'healthy' before proceeding to the next?",
      "Would you ever need to keep different regions on genuinely different app versions long-term, not just during rollout?",
    ],
    commonMistakes: [
      "Assuming a single global deployment covers every region simultaneously without considering per-subaccount targets.",
      "Deploying to every region at once without a staged verification approach, risking a wider blast radius.",
    ],
    importantPoints: [
      "HTML5 Repository is provisioned per subaccount, naturally separating deployment by region.",
      "Each region's deployment pipeline run is independent, targeting that region's specific subaccount.",
      "This separation enables a safer, staged rollout strategy across regions.",
    ],
    revisionNotes: "HTML5 Repository is per-subaccount/per-region — deploy each region's pipeline independently, ideally staged (verify one region before the next) for a safer rollout.",
  },
  {
    id: "html5-q14",
    topic: "Launchpad",
    prompt: "What is a 'catalog' versus a 'group' in Launchpad configuration, and how do they relate?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["launchpad", "catalog-group"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A catalog defines the full set of available tiles/apps a role has access to (what CAN be shown, tied to authorization); a group defines a specific, organized arrangement of tiles a user actually sees on their home page (what IS shown, tied to layout/organization) — a user's actual Launchpad view is built from tiles present in both their assigned catalogs and groups.",
    detailedAnswer:
      "These serve genuinely different purposes. A catalog is fundamentally about access control — it's assigned to a Role Collection, and lists every tile/app that role is authorized to potentially see; having access via a catalog doesn't necessarily mean the tile appears on the user's home screen by default. A group is about presentation — it's an organized, curated arrangement (a named section with specific tiles in a specific order) that actually appears on a user's Launchpad home page. A tile genuinely shows up for a user only if it's both accessible via one of their assigned catalogs (authorization) AND included in one of their assigned groups (presentation) — the two concerns, access and layout, are deliberately separated.",
    hindiExplanation:
      "Ye genuinely different purposes serve karte hain. Ek catalog fundamentally access control ke baare mein hai — ye ek Role Collection ko assign hota hai, aur har tile/app list karta hai jo wo role potentially dekhne ke liye authorized hai; ek catalog ke through access hona zaroori nahi ki tile user ke home screen pe by default appear ho. Ek group presentation ke baare mein hai — ek organized, curated arrangement (ek named section specific tiles ke saath specific order mein) jo actually user ke Launchpad home page pe appear hoti hai. Ek tile genuinely user ke liye tabhi show hoti hai jab wo dono unke assigned catalogs (authorization) se accessible ho AUR unke assigned groups (presentation) mein included ho.",
    interviewExplanation:
      "I'd distinguish access from presentation: 'A catalog is about access control — assigned to a Role Collection, listing everything that role is authorized to potentially see. A group is about presentation — a curated, ordered arrangement that actually shows up on a user's home page. A tile only genuinely appears if it's both accessible via an assigned catalog AND included in an assigned group — access and layout are deliberately separate concerns.'",
    diagramNote:
      "'Catalog (assigned to Role Collection): what tiles CAN be shown (authorization)' + 'Group: what tiles ARE shown, organized layout (presentation)' → 'Tile appears only if in BOTH an assigned catalog AND an assigned group'.",
    diagramMermaid: `flowchart LR
    A["Catalog<br/>authorization: what CAN be shown"] --> C["Tile appears only if<br/>in BOTH catalog AND group"]
    B["Group<br/>presentation: what IS shown"] --> C`,
    realProjectExample:
      "A user had access to a reporting tile via their assigned catalog (their role included it), but it never appeared on their home page until an admin also added it to one of their assigned groups — access alone wasn't sufficient for visibility.",
    interviewTip:
      "If asked why a user has 'access' to an app but doesn't see its tile on their home page, the catalog-versus-group distinction is the precise, correct explanation for this common real-world confusion.",
    followupQuestions: [
      "Can the same tile appear in multiple different groups?",
      "How would you troubleshoot a tile that a user should see but doesn't?",
      "Are catalogs and groups both assigned via Role Collections, or differently?",
    ],
    commonMistakes: [
      "Assuming catalog access alone guarantees a tile appears on a user's home page.",
      "Confusing catalogs (authorization) with groups (presentation) as the same concept.",
    ],
    importantPoints: [
      "Catalog = access control, what a role CAN potentially see (tied to Role Collection).",
      "Group = presentation, what actually appears on the home page (organized layout).",
      "A tile shows up only if accessible via a catalog AND included in a group.",
    ],
    revisionNotes: "Catalog = authorization (what CAN be shown). Group = presentation (what IS shown, organized layout). Tile appears only if in BOTH.",
  },
  {
    id: "html5-q15",
    topic: "Launchpad",
    prompt: "What happens if a tile's intent has no registered target mapping?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["launchpad", "target-mapping"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Clicking the tile fails to navigate anywhere meaningful — typically showing an error or a 'no app found for this intent' message — since the Launchpad has no registered app to resolve that specific intent to; this commonly happens after an app is decommissioned or its target mapping registration is accidentally removed without updating/removing the tiles that reference it.",
    detailedAnswer:
      "Intent-based navigation's whole mechanism depends on a target mapping existing that tells the Launchpad which app handles a given intent — if no such mapping is registered (the app was decommissioned, the mapping was removed or misconfigured, or a tile references an intent that was never actually registered), clicking the tile has nothing to resolve to, and the user typically sees a generic navigation error rather than reaching any actual app. This is a common operational gap when decommissioning an old app: removing its target mapping without also cleaning up or redirecting the tiles across various Launchpad groups that still reference its intent leaves users clicking a tile that goes nowhere, which is easy to miss unless someone specifically audits for orphaned tile references after a decommissioning.",
    hindiExplanation:
      "Intent-based navigation ka poora mechanism is baat pe depend karta hai ki ek target mapping exist kare jo Launchpad ko batae kaunsi app ek given intent ko handle karti hai — agar koi aisi mapping registered nahi hai (app decommission ho gaya, mapping remove ya misconfigure ho gaya), tile click karne pe kuch resolve karne ko nahi hota, aur user typically ek generic navigation error dekhta hai actual app tak pahunchne ki jagah. Ye ek common operational gap hai purani app decommission karte waqt: uski target mapping remove karna bina various Launchpad groups ke tiles ko clean up ya redirect kiye jo abhi bhi uske intent ko reference karti hain.",
    interviewExplanation:
      "I'd explain the failure and the common operational cause: 'Clicking the tile fails to navigate anywhere meaningful — typically a generic navigation error — since there's no registered mapping for the Launchpad to resolve the intent to. This commonly happens when decommissioning an old app: removing its target mapping without also cleaning up or redirecting tiles across various groups that still reference its intent, leaving orphaned tiles that go nowhere until someone audits for them.'",
    diagramNote:
      "'Tile click → intent triggered' → 'No registered target mapping found' → 'Generic navigation error — common after decommissioning an app without cleaning up referencing tiles'.",
    diagramMermaid: `flowchart TD
    A["Tile click → intent triggered"] --> B{"Registered target<br/>mapping exists?"}
    B -->|"No"| C["Generic navigation error"]
    B -->|"Yes"| D["Navigates to app"]`,
    realProjectExample:
      "Decommissioning an old reporting app and removing its target mapping left several tiles across different users' Launchpad groups pointing to a now-unresolved intent, causing navigation errors until an audit specifically identified and removed the orphaned tile references.",
    interviewTip:
      "If asked about the operational risk of decommissioning an app, mentioning this orphaned-tile scenario specifically (not just 'update the target mapping') shows awareness of a real, easy-to-miss operational gap.",
    followupQuestions: [
      "How would you audit for orphaned tiles referencing a removed target mapping?",
      "Would you redirect an old intent to a replacement app instead of just removing the mapping entirely?",
      "What would a user actually see on screen when this navigation failure occurs?",
    ],
    commonMistakes: [
      "Removing an app's target mapping during decommissioning without auditing for tiles across groups still referencing its intent.",
      "Not knowing this results in a generic navigation error rather than some more helpful fallback.",
    ],
    importantPoints: [
      "An unregistered intent causes a navigation failure when a tile referencing it is clicked.",
      "Commonly caused by decommissioning an app without cleaning up tiles/groups still referencing its intent.",
      "Requires proactive auditing to catch orphaned tile references after an app is removed.",
    ],
    revisionNotes: "Tile with no registered target mapping → navigation error on click. Common after decommissioning an app without cleaning up orphaned tile references across groups — audit proactively.",
  },
  {
    id: "html5-q16",
    topic: "UI5",
    prompt: "What's the difference between a JSONModel and an ODataModel in UI5, and when would you use each?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["ui5", "models"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A JSONModel holds plain, locally-managed JSON data (good for UI-only state or client-side manipulated data), while an ODataModel connects directly to an OData service, handling requests, batching, and CRUD operations against the backend automatically — use JSONModel for local/UI state, ODataModel for actual backend-persisted business data.",
    detailedAnswer:
      "A JSONModel is essentially an in-memory JSON structure UI5 can bind to — useful for local UI state that doesn't need backend persistence (like the currently selected tab, a temporary form draft before submission, or client-side-only computed values). An ODataModel is fundamentally different — it's a live connection to an actual OData service, automatically handling the mechanics of fetching entity data, batching multiple requests together for efficiency, and translating UI-triggered CRUD operations (create, update, delete) into actual OData requests against the backend, without you manually writing fetch/AJAX calls yourself. The choice is straightforward: JSONModel for local, UI-only, non-persisted data; ODataModel for anything that needs to actually read/write real backend business data.",
    hindiExplanation:
      "Ek JSONModel essentially ek in-memory JSON structure hai jise UI5 bind kar sakta hai — useful hai local UI state ke liye jise backend persistence nahi chahiye (jaise currently selected tab, ek temporary form draft submission se pehle, ya client-side-only computed values). Ek ODataModel fundamentally different hai — ye ek live connection hai ek actual OData service se, automatically entity data fetch karne, multiple requests ko efficiency ke liye batch karne, aur UI-triggered CRUD operations ko actual OData requests mein translate karne ki mechanics handle karta hai.",
    interviewExplanation:
      "I'd give the concrete decision rule: 'A JSONModel is in-memory JSON data UI5 can bind to — good for local, non-persisted UI state, like a selected tab or a draft before submission. An ODataModel is a live connection to an actual OData service, automatically handling data fetching, batching, and translating CRUD operations into real backend requests. Simple rule: JSONModel for local UI-only data, ODataModel for anything reading or writing actual backend business data.'",
    diagramNote:
      "'JSONModel: in-memory, local UI state (no backend persistence)' vs 'ODataModel: live connection to OData service, automatic fetch/batch/CRUD against real backend'.",
    diagramMermaid: `flowchart LR
    A["JSONModel"] --> B["In-memory, local UI state<br/>no backend persistence"]
    C["ODataModel"] --> D["Live OData connection —<br/>fetch/batch/CRUD against backend"]`,
    realProjectExample:
      "A form's draft state before submission was held in a JSONModel for immediate, local UI responsiveness, while the actual order data itself was bound via an ODataModel connected to the backend's CAP OData service, handling the real create/update requests.",
    interviewTip:
      "If asked when you'd use a JSONModel versus an ODataModel, the local-UI-state versus real-backend-data distinction is the precise, correct decision criteria rather than a vague 'they're both models'.",
    followupQuestions: [
      "Can an app use both a JSONModel and an ODataModel simultaneously, and how would they interact?",
      "What does OData batching actually optimize, and why does it matter?",
      "Would you ever convert data from an ODataModel into a JSONModel for local manipulation?",
    ],
    commonMistakes: [
      "Using a JSONModel for actual backend-persisted business data, missing out on ODataModel's automatic CRUD handling.",
      "Not knowing ODataModel automatically batches multiple requests for efficiency.",
    ],
    importantPoints: [
      "JSONModel = in-memory, local UI-only data with no backend persistence.",
      "ODataModel = live connection to an OData service, automatic fetch/batch/CRUD.",
      "Choose based on whether the data is local UI state or real backend business data.",
    ],
    revisionNotes: "JSONModel = local, in-memory UI state, no backend. ODataModel = live OData connection, automatic fetch/batch/CRUD against real backend data.",
  },
  {
    id: "html5-q17",
    topic: "UI5",
    prompt: "What's a Fragment in UI5, and why would you use one instead of putting everything in a single View?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["ui5", "fragments"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A Fragment is a lightweight, reusable piece of UI (like a dialog or a repeated section) defined separately from a View but without its own Controller, so it can be reused across multiple Views/Controllers without duplicating markup, keeping a single View from becoming an unwieldy, sprawling file.",
    detailedAnswer:
      "As a View grows to handle many different pieces of UI — a main list, a details section, an edit dialog, a confirmation popup — cramming everything into one View file becomes unwieldy and hard to maintain. A Fragment extracts a self-contained, reusable piece of UI markup (very commonly a Dialog) into its own file, which can be instantiated and referenced from any Controller that needs it — since a Fragment has no Controller of its own, the same Fragment markup can be reused across genuinely different parent Views/Controllers without duplicating the UI definition each time. This is the standard pattern for things like a shared 'confirm delete' dialog used consistently across many different screens in an app.",
    hindiExplanation:
      "Jaise ek View badhta hai kai different pieces of UI handle karne ke liye — ek main list, ek details section, ek edit dialog, ek confirmation popup — sab kuch ek View file mein cram karna unwieldy aur maintain karna mushkil ho jaata hai. Ek Fragment ek self-contained, reusable piece of UI markup (very commonly ek Dialog) ko apni file mein extract karta hai, jise kisi bhi Controller se instantiate/reference kiya ja sakta hai jise use chahiye — kyunki ek Fragment ke paas apna Controller nahi hota, wahi Fragment markup genuinely different parent Views/Controllers ke aar-paar reuse ho sakta hai UI definition duplicate kiye bina har baar.",
    interviewExplanation:
      "I'd describe both the maintainability and reuse benefit: 'As a View grows to handle many UI pieces — a list, a details section, dialogs — cramming everything into one View becomes unwieldy. A Fragment extracts a self-contained, reusable piece of markup, commonly a Dialog, into its own file with no Controller of its own — so it can be instantiated from any Controller that needs it, reused across different Views without duplicating the UI definition. It's the standard pattern for something like a shared confirm-delete dialog used across many screens.'",
    diagramNote:
      "'Single sprawling View (list + details + dialogs, all in one file)' vs 'Main View (list/details) + separate Fragment (dialog, no own Controller) — reusable across multiple Controllers'.",
    diagramMermaid: `flowchart LR
    A["Single sprawling View<br/>everything in one file"] -.->|"unwieldy"| B["Main View + separate<br/>Fragment (dialog)"]
    B --> C["Fragment reusable across<br/>multiple Controllers"]`,
    realProjectExample:
      "A 'confirm delete' dialog Fragment was defined once and instantiated from a dozen different Controllers across the application, avoiding a dozen copy-pasted dialog definitions and letting a single change to the confirmation wording update it consistently everywhere.",
    interviewTip:
      "If asked to name a concrete UI5 reuse pattern, citing a shared dialog implemented as a Fragment (rather than duplicated across Views) is a specific, correct example showing hands-on UI5 experience.",
    followupQuestions: [
      "How does a Controller actually instantiate and open a Fragment (like a Dialog)?",
      "What's the difference between a Fragment and a custom Control?",
      "Can a Fragment itself contain another Fragment?",
    ],
    commonMistakes: [
      "Duplicating the same dialog/UI markup across multiple Views instead of extracting it into a reusable Fragment.",
      "Not knowing a Fragment has no Controller of its own, relying on the parent Controller for its logic.",
    ],
    importantPoints: [
      "A Fragment is a lightweight, reusable UI piece with no Controller of its own.",
      "Commonly used for dialogs or repeated sections needed across multiple Views.",
      "Avoids duplicating UI markup and keeps individual Views from becoming unwieldy.",
    ],
    revisionNotes: "Fragment = reusable UI piece (e.g. a Dialog) with no own Controller, instantiated from any Controller that needs it — avoids duplicating markup across Views, keeps Views from becoming unwieldy.",
  },
  {
    id: "html5-q18",
    topic: "React",
    prompt: "How would authentication actually work for a React SPA served behind an App Router — does the React app itself need to handle login?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["react", "authentication-flow"],
    estimatedMinutes: 2,
    expectedAnswer:
      "No — the App Router transparently handles the entire authentication flow before the React app's static content is ever served, redirecting unauthenticated users to the identity provider's login page and only serving the app once authenticated; the React app itself doesn't implement any login UI or OAuth flow logic, since the App Router already gates access before its content is reachable.",
    detailedAnswer:
      "Because the App Router sits in front of everything and enforces authentication at the routing layer, an unauthenticated request for the React app's static content never actually reaches it — the App Router intercepts, redirects to the identity provider's login page, handles the OAuth callback, and only then proxies through to serve the actual React static content. This means the React app itself is written with no awareness of the login flow at all — by the time its JavaScript starts executing in the browser, authentication has already happened at the App Router layer, and the app can simply call backend APIs (through the same App Router) which will already carry the necessary session/token context, without the React code itself needing to implement any OAuth redirect handling.",
    hindiExplanation:
      "Kyunki App Router sab kuch ke aage baithta hai aur routing layer pe authentication enforce karta hai, ek unauthenticated request React app ke static content ke liye kabhi actually use reach nahi karti — App Router intercept karta hai, identity provider ke login page pe redirect karta hai, OAuth callback handle karta hai, aur tabhi actual React static content serve karne ke liye proxy karta hai. Iska matlab hai React app khud login flow ke baare mein bilkul aware nahi hai — jab tak uska JavaScript browser mein execute hona shuru hota hai, authentication already App Router layer pe ho chuki hoti hai.",
    interviewExplanation:
      "I'd explain the transparent gating: 'No — the App Router enforces authentication before the React app's content is ever reachable. An unauthenticated request gets intercepted, redirected to the identity provider's login page, and only after the OAuth callback completes does the App Router proxy through to serve the actual React content. By the time the React JavaScript starts running, authentication has already happened — the app has no login UI or OAuth logic of its own, and its API calls through the same App Router already carry the necessary session context.'",
    diagramNote:
      "'Unauthenticated request for React app' → 'App Router intercepts, redirects to login' → 'OAuth flow completes' → 'App Router serves React static content' — React JS starts with auth already done, no login logic needed in the app itself.",
    diagramMermaid: `flowchart TD
    A["Unauthenticated request<br/>for React app"] --> B["App Router intercepts,<br/>redirects to login"]
    B --> C["OAuth flow completes"]
    C --> D["App Router serves<br/>React static content"]
    D --> E["React JS starts —<br/>auth already done, no login logic needed"]`,
    realProjectExample:
      "A React-based dashboard had zero login-related code anywhere in its codebase — every unauthenticated access attempt was transparently redirected and handled by the App Router in front, with the React app only ever executing after the user was already fully authenticated.",
    interviewTip:
      "If asked 'how do you implement OAuth in your React app', the correct, precise answer is that you generally don't — the App Router handles this transparently, and the React app should have zero awareness of the login flow, which is worth stating explicitly.",
    followupQuestions: [
      "How would the React app know if the user's session has expired mid-use?",
      "Does the App Router pass any user identity information to the React app itself, or just gate access?",
      "Would this differ for a React Native mobile app instead of a web SPA?",
    ],
    commonMistakes: [
      "Attempting to implement custom OAuth/login handling directly in the React app, duplicating what the App Router already does.",
      "Not realizing the App Router gates access entirely before the React app's JavaScript ever executes.",
    ],
    importantPoints: [
      "The App Router transparently handles the entire login flow before the app is ever served.",
      "The React app itself needs no login UI or OAuth logic of its own.",
      "By the time the React JavaScript executes, authentication has already completed at the App Router layer.",
    ],
    revisionNotes: "App Router transparently gates auth before React content is ever served — React app needs zero login/OAuth logic of its own; auth is already done by the time its JS runs.",
  },
  {
    id: "html5-q19",
    topic: "React",
    prompt: "Would you use UI5 Web Components in a React app, and what would that actually look like?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["react", "ui5-web-components"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — UI5 Web Components are framework-agnostic custom elements that can be used directly in a React app (via their React wrapper package or as plain custom elements), giving Fiori-consistent look-and-feel for specific controls (buttons, tables, inputs) without needing the full UI5 framework itself.",
    detailedAnswer:
      "UI5 Web Components are built on the standard Web Components specification, meaning they're not tied to UI5's full MVC framework and runtime — they can be used in any modern frontend stack, including React, typically via a dedicated React wrapper package that makes them feel like native React components (accepting props, handling events the React way) while internally rendering the actual Fiori-styled web component. This lets a React app selectively adopt Fiori-consistent visuals for specific controls (a Fiori-styled button, table, or input) without needing to adopt the entire UI5 framework, MVC pattern, or OData binding conventions — a middle ground between 'fully custom React styling' and 'full UI5 framework adoption'.",
    hindiExplanation:
      "UI5 Web Components standard Web Components specification pe built hain, matlab wo UI5 ke full MVC framework/runtime se tied nahi hain — wo kisi bhi modern frontend stack mein use ho sakte hain, React included, typically ek dedicated React wrapper package ke through jo unhe native React components jaisa feel karata hai (props accept karna, React tarike se events handle karna) jabki internally actual Fiori-styled web component render karta hai. Ye ek React app ko selectively Fiori-consistent visuals adopt karne deta hai specific controls ke liye, poore UI5 framework, MVC pattern, ya OData binding conventions adopt kiye bina.",
    interviewExplanation:
      "I'd confirm yes and describe the mechanism: 'Yes — UI5 Web Components are standard Web Components, not tied to UI5's full framework, so they work in any modern stack including React, typically via a dedicated React wrapper package that makes them feel native — accepting props and handling events the React way, while rendering the actual Fiori-styled component underneath. This lets a React app selectively adopt Fiori visuals for specific controls without adopting the entire UI5 framework or its conventions.'",
    diagramNote:
      "'React app' + 'UI5 Web Components (via React wrapper package)' → 'Fiori-styled controls (button/table/input) used as native-feeling React components' — no need to adopt full UI5 framework/MVC/OData binding.",
    diagramMermaid: `flowchart LR
    A["React app"] --> B["UI5 Web Components<br/>via React wrapper package"]
    B --> C["Fiori-styled controls,<br/>used as native React components"]`,
    realProjectExample:
      "A React dashboard adopted UI5 Web Components' React wrapper for its data table and buttons specifically to visually match the organization's other Fiori Launchpad apps, while the rest of the app's layout and logic remained standard React with no other UI5 framework dependency.",
    interviewTip:
      "If asked how a React team could achieve Fiori visual consistency without switching frameworks entirely, naming UI5 Web Components and their React wrapper specifically is the precise, correct middle-ground answer.",
    followupQuestions: [
      "What's the actual package name/mechanism for the React wrapper around UI5 Web Components?",
      "Would you need the App Router or any other BTP-specific plumbing to use UI5 Web Components?",
      "What controls are commonly available as UI5 Web Components?",
    ],
    commonMistakes: [
      "Assuming Fiori visual consistency in React requires fully adopting the entire UI5 framework.",
      "Not knowing UI5 Web Components exist as a framework-agnostic middle-ground option.",
    ],
    importantPoints: [
      "UI5 Web Components are standard Web Components, usable in any modern frontend stack including React.",
      "A dedicated React wrapper package makes them feel like native React components.",
      "Enables selective Fiori visual consistency without adopting the full UI5 framework.",
    ],
    revisionNotes: "UI5 Web Components (via a React wrapper) let a React app selectively adopt Fiori-styled controls without adopting the full UI5 framework/MVC/OData conventions — a middle-ground option.",
  },
  {
    id: "html5-q20",
    topic: "Angular",
    prompt: "If a customer strictly requires their custom app to look and behave identically to standard Fiori apps in the Launchpad, would you still consider Angular?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["angular", "decision-criteria"],
    estimatedMinutes: 2,
    expectedAnswer:
      "It's technically possible via UI5 Web Components, but this specific requirement shifts the balance strongly toward UI5 directly, since achieving exact, ongoing Fiori consistency in Angular means continuously reimplementing/tracking UI5's own design evolution rather than getting it natively — at that point, the deliberate-reimplementation cost likely outweighs whatever Angular-specific benefit motivated the choice in the first place.",
    detailedAnswer:
      "This is precisely the scenario where the earlier 'it depends on requirements' answer resolves toward a specific conclusion: if strict, ongoing visual/behavioral parity with standard Fiori apps is a hard requirement (not just 'roughly similar'), Angular with UI5 Web Components could technically achieve this, but doing so means continuously tracking and reimplementing however UI5's own design language evolves over time, rather than getting that consistency automatically the way a native UI5 app would. Given the specific, strict requirement stated, the practical recommendation shifts toward UI5 directly — the deliberate ongoing effort to maintain exact parity in Angular is a real, ongoing cost that a strict-parity requirement makes hard to justify unless there's an overwhelmingly strong counter-reason (like an irreplaceable existing Angular codebase) to stick with Angular anyway.",
    hindiExplanation:
      "Ye precisely wo scenario hai jaha earlier 'it depends on requirements' answer ek specific conclusion ki taraf resolve hota hai: agar strict, ongoing visual/behavioral parity standard Fiori apps ke saath ek hard requirement hai (sirf 'roughly similar' nahi), Angular UI5 Web Components ke saath technically ye achieve kar sakta hai, lekin aisa karne ka matlab hai continuously track/reimplement karna ki UI5 ki apni design language kaise evolve hoti hai time ke saath, us consistency ko automatically pane ki jagah jaisa ek native UI5 app karega. Given ye specific, strict requirement stated hai, practical recommendation UI5 directly ki taraf shift hoti hai.",
    interviewExplanation:
      "I'd resolve the earlier balanced answer toward a specific conclusion given this stricter requirement: 'Technically possible via UI5 Web Components, but strict, ongoing parity — not just roughly similar — means continuously tracking and reimplementing however UI5's own design evolves, rather than getting it automatically. Given this specific requirement, I'd actually recommend UI5 directly — the ongoing effort to maintain exact parity in Angular is a real cost that's hard to justify here, unless there's an overwhelming counter-reason like an irreplaceable existing Angular codebase.'",
    diagramNote:
      "'Requirement: strict, ongoing exact Fiori parity' → 'Angular + UI5 Web Components: technically possible but ongoing reimplementation cost as UI5 evolves' vs 'UI5 directly: gets parity automatically' — recommendation shifts toward UI5.",
    diagramMermaid: `flowchart LR
    A["Requirement: strict,<br/>ongoing exact Fiori parity"] --> B["Angular + UI5 Web Components:<br/>possible but ongoing reimplementation cost"]
    A --> C["UI5 directly:<br/>gets parity automatically"]
    C --> D["Recommendation shifts<br/>toward UI5 given this requirement"]`,
    realProjectExample:
      "A customer's strict requirement that a new module be visually and behaviorally indistinguishable from their existing Fiori Launchpad apps led the team to recommend UI5 directly over an initially-preferred Angular approach, specifically because of this exact-and-ongoing-parity requirement rather than a general technical limitation of Angular.",
    interviewTip:
      "If asked this scenario directly, showing that your recommendation changes based on how strict the actual requirement is (rather than giving the same generic 'it depends' answer regardless of specifics) demonstrates real decision-making judgment, not just reciting tradeoffs.",
    followupQuestions: [
      "What would change your recommendation if the existing codebase were an irreplaceable, large Angular investment?",
      "How would you communicate this tradeoff to a customer or stakeholder pushing for Angular anyway?",
      "Would a hybrid approach — Angular for most of the app, UI5 for a few Fiori-critical screens — ever make sense?",
    ],
    commonMistakes: [
      "Giving the same generic 'it depends, no technical barrier' answer regardless of how strict the actual requirement is.",
      "Not recognizing that strict, ongoing parity meaningfully changes the cost-benefit calculation versus 'roughly similar'.",
    ],
    importantPoints: [
      "Strict, ongoing Fiori parity is technically achievable in Angular via UI5 Web Components, but at a real ongoing cost.",
      "This specific requirement shifts the practical recommendation toward UI5 directly.",
      "The right answer depends on how strict the actual stated requirement is, not a one-size-fits-all rule.",
    ],
    revisionNotes: "Strict, ongoing exact Fiori parity requirement shifts the recommendation toward UI5 directly — Angular + UI5 Web Components is technically possible but costs ongoing reimplementation effort as UI5 evolves.",
  },
];

export const html5AppsMcqs: BtpMcq[] = [
  {
    id: "html5-mcq1",
    topic: "App Router",
    prompt: "What is the App Router's primary role in a multi-service BTP application?",
    options: [
      "It stores application data",
      "A single entry point that authenticates users and routes requests to the correct backend by path",
      "It compiles UI5 source code",
      "It manages database backups",
    ],
    correctIndex: 1,
    explanation: "The App Router authenticates once and routes requests to the correct backend service or static content based on rules in xs-app.json.",
  },
  {
    id: "html5-mcq2",
    topic: "HTML5 Repository",
    prompt: "Why deploy static UI content to the HTML5 Application Repository instead of serving it from your backend?",
    options: [
      "It's mandatory and has no real benefit",
      "It decouples frontend release cycles from backend deployment",
      "It automatically writes your UI5 code for you",
      "It removes the need for an App Router",
    ],
    correctIndex: 1,
    explanation: "The HTML5 Repository is purpose-built for versioned static content, letting frontend deployments happen independently of backend service redeployments.",
  },
  {
    id: "html5-mcq3",
    topic: "Deployment",
    prompt: "What MTA module type is used to deploy built UI5 content to the HTML5 Repository?",
    options: ["nodejs", "com.sap.application.content", "hdb", "java"],
    correctIndex: 1,
    explanation: "com.sap.application.content is the module type the HTML5 Repository's deployer service consumes during cf deploy.",
  },
  {
    id: "html5-mcq4",
    topic: "Launchpad",
    prompt: "What does clicking a Launchpad tile actually trigger?",
    options: [
      "A hard-coded URL navigation",
      "An intent, resolved via target mapping to the registered app's App Router",
      "A direct database query",
      "Nothing, tiles are purely decorative",
    ],
    correctIndex: 1,
    explanation: "Tiles trigger intent-based navigation, resolved by target mapping to the specific app, decoupling tiles from hard-coded URLs.",
  },
  {
    id: "html5-mcq5",
    topic: "UI5",
    prompt: "In UI5's MVC pattern, what does data binding primarily eliminate the need for?",
    options: [
      "Writing any controller code at all",
      "Manual DOM manipulation to keep the UI in sync with data changes",
      "Using XML for views",
      "Backend services entirely",
    ],
    correctIndex: 1,
    explanation: "Data binding automatically propagates Model changes to bound View properties (and vice versa for two-way bindings), removing the need for manual DOM sync code.",
  },
  {
    id: "html5-mcq6",
    topic: "React",
    prompt: "If building a BTP frontend in React, what BTP-specific piece is still needed for authentication?",
    options: [
      "Nothing, React handles this automatically",
      "An App Router in front, same as with UI5",
      "A special React-only authentication library from SAP",
      "Authentication isn't possible with React on BTP",
    ],
    correctIndex: 1,
    explanation: "The App Router's authentication role is framework-agnostic — a React app still needs one in front, just like a UI5 app would.",
  },
  {
    id: "html5-mcq7",
    topic: "Angular",
    prompt: "Is there a fundamental technical barrier preventing Angular from being used for a BTP frontend?",
    options: [
      "Yes, Angular cannot run on BTP at all",
      "No — it's mostly a convention/ecosystem choice; UI5 provides Fiori/OData/Launchpad conventions for free",
      "Yes, only UI5 apps can be deployed to Cloud Foundry",
      "No, but Angular apps cannot use an App Router",
    ],
    correctIndex: 1,
    explanation: "Angular is a fully capable framework — the real difference is how much UI5 provides 'for free' (Fiori design, OData binding, Launchpad integration) that Angular would need to reimplement deliberately.",
  },
  {
    id: "html5-mcq8",
    topic: "App Router",
    prompt: "Can the App Router enforce any authorization, or only authentication?",
    options: [
      "Only authentication — it has zero authorization capability",
      "Coarse-grained, route-level scope checks via xs-app.json, though fine-grained business logic still needs the backend",
      "Full fine-grained, instance-based authorization for every entity",
      "Authorization only works if principal propagation is enabled",
    ],
    correctIndex: 1,
    explanation: "xs-app.json routes support a scope property for coarse-grained route-level authorization, but finer business rules like own-records-only restrictions still need to live in the backend.",
  },
  {
    id: "html5-mcq9",
    topic: "HTML5 Repository",
    prompt: "What's a practical benefit of the HTML5 Repository keeping multiple app versions?",
    options: [
      "It saves disk space",
      "It enables a fast rollback path — reconfigure to a previous version without rebuilding",
      "It automatically merges different versions together",
      "It removes the need for testing",
    ],
    correctIndex: 1,
    explanation: "Since old versions persist and coexist, rolling back a bad deployment is as simple as reconfiguring to reference the previous version, no rebuild needed.",
  },
  {
    id: "html5-mcq10",
    topic: "Deployment",
    prompt: "Why is an automated post-deployment smoke test important even after a successful cf deploy?",
    options: [
      "It isn't important, deploy success guarantees correctness",
      "Deploy success only confirms upload — it says nothing about whether the app actually renders/functions correctly at runtime",
      "It replaces the need for a build step",
      "It's only needed for backend deployments, not UI",
    ],
    correctIndex: 1,
    explanation: "A build can upload successfully while still being broken at runtime (manifest misconfiguration, dependency mismatch) — only a smoke test catches this, not deployment pipeline success alone.",
  },
  {
    id: "html5-mcq11",
    topic: "Launchpad",
    prompt: "What's the difference between a catalog and a group in Launchpad configuration?",
    options: [
      "They are the same thing with different names",
      "A catalog controls access/authorization (what CAN be shown); a group controls presentation (what IS shown)",
      "A group controls access; a catalog controls presentation",
      "Catalogs are for mobile, groups are for desktop",
    ],
    correctIndex: 1,
    explanation: "A tile appears for a user only if it's accessible via an assigned catalog (authorization) AND included in an assigned group (presentation/layout) — the two concerns are deliberately separate.",
  },
  {
    id: "html5-mcq12",
    topic: "UI5",
    prompt: "When would you use a JSONModel instead of an ODataModel?",
    options: [
      "Never, ODataModel should always be used",
      "For local, non-persisted UI state that doesn't need backend data (e.g. a selected tab or draft)",
      "Only for numbers, never for text",
      "JSONModel and ODataModel are interchangeable in every case",
    ],
    correctIndex: 1,
    explanation: "JSONModel holds in-memory, local UI data with no backend persistence; ODataModel connects live to a backend OData service for actual business data.",
  },
  {
    id: "html5-mcq13",
    topic: "React",
    prompt: "Does a React app served behind an App Router need to implement its own OAuth/login flow?",
    options: [
      "Yes, React always needs its own login implementation",
      "No — the App Router transparently handles the entire login flow before the React content is ever served",
      "Only if using a specific React router library",
      "Only for mobile React Native apps",
    ],
    correctIndex: 1,
    explanation: "The App Router intercepts unauthenticated requests and handles the full OAuth flow before proxying through to the React app — by the time the React JS runs, authentication has already happened.",
  },
];
