import type { BtpMcq, BtpQuestion } from "@/lib/btp-content";

/** Section 13 — SAP Build. Interview questions, full format. */
export const sapBuildQuestions: BtpQuestion[] = [
  {
    id: "build-q1",
    topic: "Build Apps",
    prompt: "What is SAP Build Apps, and who is its target user compared to a full CAP/UI5 developer?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["build-apps", "low-code"],
    estimatedMinutes: 3,
    expectedAnswer:
      "SAP Build Apps is a low-code/no-code visual application builder aimed at citizen developers and business users, letting them build functional apps by configuring pre-built components and logic visually rather than writing CAP/UI5 code — trading some flexibility for dramatically faster, code-light development.",
    detailedAnswer:
      "A full CAP/UI5 build gives complete control — any data model, any business logic, any UI customization — but requires professional development skills and takes real engineering time. SAP Build Apps targets the opposite end: business analysts or 'citizen developers' with limited coding background can drag-and-drop UI components, wire up data connections, and define logic flows visually, producing a working app much faster for common patterns (forms, approval apps, simple data-driven UIs). The tradeoff is less flexibility for deeply custom or highly complex logic, which is where a professional CAP/UI5 build becomes necessary instead.",
    hindiExplanation:
      "Poora CAP/UI5 build complete control deta hai — koi bhi data model, koi bhi business logic, koi bhi UI customization — lekin professional development skills aur real engineering time chahiye. SAP Build Apps opposite end target karta hai: business analysts ya 'citizen developers' jinke paas limited coding background hai, wo UI components ko drag-and-drop kar sakte hain, data connections wire up kar sakte hain, aur logic flows visually define kar sakte hain, common patterns (forms, approval apps, simple data-driven UIs) ke liye ek working app much faster produce karte hue. Tradeoff hai deeply custom ya highly complex logic ke liye kam flexibility.",
    interviewExplanation:
      "I'd contrast the target users: 'A full CAP/UI5 build gives complete control but needs professional developers. SAP Build Apps is a low-code visual builder for citizen developers — drag-and-drop components, visual logic flows, much faster for common patterns like forms and approval apps. The tradeoff is less flexibility for deeply custom logic, where you'd still reach for a professional CAP/UI5 build.'",
    diagramNote:
      "Two paths: 'CAP/UI5 (professional dev, full control, slower)' vs 'SAP Build Apps (citizen dev, visual/low-code, faster for common patterns, less flexible)'.",
    diagramMermaid: `flowchart LR
    A["CAP/UI5"] --> B["Professional dev,<br/>full control, slower"]
    C["SAP Build Apps"] --> D["Citizen dev, visual/low-code,<br/>faster for common patterns"]`,
    realProjectExample:
      "A business team built their own simple expense-approval app in SAP Build Apps within days, without any professional developer involvement, while a more complex customer-facing app with intricate business logic in the same organization was built with full CAP/UI5.",
    interviewTip:
      "If asked 'should low-code replace professional development entirely', the correct nuanced answer is no — it's complementary, suited to a different class of simpler, faster-turnaround apps.",
    followupQuestions: [
      "What kind of apps are a poor fit for SAP Build Apps?",
      "Can SAP Build Apps integrate with existing BTP services and data sources?",
      "Who typically owns and maintains an app built this way — IT or the business team?",
    ],
    commonMistakes: [
      "Assuming low-code tools can fully replace professional development for any complexity of app.",
      "Not identifying the target user (citizen developer/business analyst) correctly.",
    ],
    importantPoints: [
      "SAP Build Apps = low-code/no-code visual app builder.",
      "Targets citizen developers/business users, not professional engineers.",
      "Faster for common patterns, less flexible for deeply custom/complex logic.",
    ],
    revisionNotes: "SAP Build Apps = low-code visual builder for citizen developers — fast for common patterns, less flexible than full CAP/UI5 for complex logic.",
  },
  {
    id: "build-q2",
    topic: "Process Automation",
    prompt: "What is SAP Build Process Automation, and what's the difference between a workflow and an automation within it?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["process-automation", "workflow"],
    estimatedMinutes: 3,
    expectedAnswer:
      "SAP Build Process Automation lets you model business processes visually, combining human-in-the-loop workflows (tasks requiring a person's decision, like an approval) with automations (robotic/system-driven steps needing no human, like extracting data from a document or calling an API) into one end-to-end process.",
    detailedAnswer:
      "A 'workflow' step represents a point where a human needs to make a decision or provide input — approving a request, reviewing a document — and the process pauses until that person acts (often via a task in their inbox/Launchpad). An 'automation' step, by contrast, is fully machine-executed with no human involved — calling an API, extracting structured data from a scanned document via built-in document information extraction, or manipulating data — running immediately without waiting on anyone. Real business processes often interleave both: an automation step might extract invoice data from a scanned PDF, followed by a workflow step where a human approves it if it exceeds a threshold, followed by another automation step posting the approved result back to a backend system.",
    hindiExplanation:
      "Ek 'workflow' step ek point represent karta hai jaha ek human ko decision lena ya input dena hota hai — ek request approve karna, ek document review karna — aur process tab tak pause rehta hai jab tak wo person act na kare (aksar unke inbox/Launchpad mein ek task ke through). Ek 'automation' step iske ulta poori tarah machine-executed hota hai koi human involved nahi — ek API call karna, ek scanned document se structured data extract karna built-in document information extraction se, ya data manipulate karna — kisi ka wait kiye bina turant chalta hai. Real business processes aksar dono interleave karte hain.",
    interviewExplanation:
      "I'd give a concrete combined example: 'A workflow step pauses for a human decision, like an approval, shown as a task in their inbox. An automation step is fully machine-executed with no human — like extracting data from a scanned invoice. Real processes combine both: extract invoice data automatically, pause for human approval if over a threshold, then automatically post the result to a backend.'",
    diagramNote:
      "Process: 'Automation: extract invoice data from PDF' → 'Workflow: human approves if over threshold' → 'Automation: post approved result to backend' — combining both step types in one process.",
    diagramMermaid: `flowchart LR
    A["Automation:<br/>extract invoice data from PDF"] --> B["Workflow:<br/>human approves if over threshold"]
    B --> C["Automation:<br/>post approved result to backend"]`,
    realProjectExample:
      "An invoice-processing solution used an automation step to extract line-item data from scanned PDFs, a workflow step routing anything over a spending threshold to a manager's approval task, and a final automation step posting approved invoices into the ERP system — all in one modeled process.",
    interviewTip:
      "Giving a concrete example that combines both step types (not just defining each in isolation) demonstrates real understanding of how they compose into an actual business process.",
    followupQuestions: [
      "How does document information extraction work as part of an automation step?",
      "Where does a human actually see and act on a workflow task?",
      "Can a process have multiple parallel workflow steps at once?",
    ],
    commonMistakes: [
      "Describing workflow and automation as unrelated features rather than composable steps in one process.",
      "Not knowing document information extraction is a common automation-step capability.",
    ],
    importantPoints: [
      "Workflow step = pauses for human decision/input (task in inbox).",
      "Automation step = fully machine-executed, no human involved.",
      "Real processes typically interleave both step types.",
    ],
    revisionNotes: "Process Automation combines workflow steps (human decision, pauses) + automation steps (machine-executed, e.g. document extraction/API calls) into one end-to-end process.",
  },
  {
    id: "build-q3",
    topic: "Work Zone",
    prompt: "What is SAP Build Work Zone, and how does it relate to the Launchpad service?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["work-zone", "launchpad"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Work Zone is a ready-to-use digital workplace product built on top of the underlying Launchpad service, adding a customizable portal experience (pages, content widgets, news feeds, integration with Microsoft 365/other tools) beyond just a tile-based app launcher.",
    detailedAnswer:
      "The Launchpad service itself provides the underlying tile/catalog/group/intent-navigation mechanics discussed earlier — it's the technical foundation. Work Zone builds a full, business-user-facing digital workplace product on top: customizable pages combining app tiles with other content widgets (documents, news, external links, even integrations with tools like Microsoft 365 or Google Workspace), aimed at being a single home page experience for an employee's whole workday, not just an app launcher. Essentially, if you need 'just launch my Fiori apps', the Launchpad service alone is the building block; if you need a fuller portal/workplace experience combining apps with other content, Work Zone is the ready-made product built on that foundation.",
    hindiExplanation:
      "Launchpad service khud underlying tile/catalog/group/intent-navigation mechanics provide karta hai — ye technical foundation hai. Work Zone iske upar ek poora, business-user-facing digital workplace product banata hai: customizable pages jo app tiles ko doosre content widgets (documents, news, external links, Microsoft 365 ya Google Workspace jaise tools ke saath integrations bhi) ke saath combine karte hain, ek employee ke poore workday ke liye single home page experience banne ke liye, sirf ek app launcher nahi. Basically, agar tumhe sirf 'meri Fiori apps launch karo' chahiye, Launchpad service akela building block hai; agar tumhe apps ke saath doosre content combine karne wala fuller portal/workplace experience chahiye, Work Zone wo ready-made product hai.",
    interviewExplanation:
      "I'd give the layering: 'Launchpad service is the technical foundation — tiles, catalogs, groups, intent navigation. Work Zone builds a full digital workplace product on top — customizable pages combining app tiles with news, documents, and even Microsoft 365 integration, aimed at being a whole workday home page, not just an app launcher.'",
    diagramNote:
      "'Launchpad service (foundation: tiles, catalogs, intent nav)' → 'Work Zone (built on top: customizable pages, widgets, news, MS365 integration) → full digital workplace experience'.",
    diagramMermaid: `flowchart TD
    A["Launchpad service<br/>tiles, catalogs, intent nav"] --> B["Work Zone<br/>customizable pages, widgets, news, MS365"]
    B --> C["Full digital workplace experience"]`,
    realProjectExample:
      "An organization's Work Zone home page combined their standard Fiori app tiles with a company news widget and direct links to Microsoft Teams and SharePoint documents, giving employees one landing page for their entire workday rather than just an app-launching tile grid.",
    interviewTip:
      "If asked 'is Work Zone the same as the Launchpad', clarify the layering — Work Zone is a product built on the Launchpad service's foundation, with a broader digital workplace scope.",
    followupQuestions: [
      "What kind of content widgets can a Work Zone page include beyond app tiles?",
      "Does every BTP customer need Work Zone, or is the plain Launchpad service sometimes sufficient?",
      "How does Work Zone integrate with external tools like Microsoft 365?",
    ],
    commonMistakes: [
      "Treating Work Zone and the Launchpad service as identical, unrelated names for the same thing.",
      "Not knowing Work Zone adds a broader portal/workplace scope beyond app launching.",
    ],
    importantPoints: [
      "Launchpad service = technical foundation (tiles, catalogs, intent navigation).",
      "Work Zone = ready-made digital workplace product built on that foundation.",
      "Work Zone adds customizable pages, content widgets, and external tool integration.",
    ],
    revisionNotes: "Launchpad service = foundation (tiles/catalogs/nav). Work Zone = full digital workplace product built on it (pages, widgets, news, MS365 integration).",
  },
  {
    id: "build-q4",
    topic: "Business Rules",
    prompt: "What is SAP Build's Business Rules service, and why externalize decision logic instead of hard-coding it in application code?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["business-rules", "decision-logic"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Business Rules lets you define decision logic (like discount thresholds or approval limits) declaratively, outside application code, so business users can view and adjust the actual business rules without needing a developer to change and redeploy code every time a threshold or policy changes.",
    detailedAnswer:
      "Hard-coding a business rule like 'orders over $10,000 need manager approval' directly in application code means every time that threshold changes (a common, frequent business policy adjustment), a developer needs to change the code, test it, and redeploy — slow, and requiring engineering involvement for what's fundamentally a business policy decision, not a technical one. Business Rules externalizes this logic into a rules repository with a business-user-friendly editor (often decision tables), so someone in the business (with appropriate access) can adjust the threshold themselves, and applications call the Business Rules service at runtime to evaluate the current rule rather than having the logic baked into their own code — decoupling business policy changes from application deployment cycles entirely.",
    hindiExplanation:
      "Ek business rule ko hard-code karna jaise 'orders over $10,000 ko manager approval chahiye' directly application code mein, matlab har baar jab wo threshold change ho (ek common, frequent business policy adjustment), ek developer ko code change karna, test karna, aur redeploy karna padta hai — slow, aur engineering involvement chahiye ek aisi cheez ke liye jo fundamentally ek business policy decision hai, technical nahi. Business Rules is logic ko ek rules repository mein externalize karta hai ek business-user-friendly editor ke saath (often decision tables), taaki business mein koi (appropriate access ke saath) threshold khud adjust kar sake, aur applications runtime pe Business Rules service ko call karke current rule evaluate karte hain, apne code mein logic bake karne ki jagah.",
    interviewExplanation:
      "I'd explain the decoupling benefit with a concrete example: 'Hard-coding a rule like an approval threshold means every business policy change needs a developer to change code and redeploy. Business Rules externalizes this into a decision-table-based rules repository a business user can adjust directly, while applications call the service at runtime to evaluate the current rule — decoupling business policy changes from application deployment entirely.'",
    diagramNote:
      "Hard-coded: 'Business policy change → developer edits code → test → redeploy (slow)'. Business Rules: 'Business user adjusts rule in repository → app calls Business Rules service at runtime → applies new rule immediately, no redeploy'.",
    diagramMermaid: `flowchart LR
    A["Hard-coded logic"] --> B["Policy change → dev edits code<br/>→ test → redeploy (slow)"]
    C["Business Rules service"] --> D["Business user adjusts rule<br/>in repository directly"]
    D --> E["App calls service at runtime<br/>— no redeploy needed"]`,
    realProjectExample:
      "When a company's approval threshold changed from $10,000 to $15,000 as a policy update, the finance team adjusted the rule directly in Business Rules' decision table within minutes — the application itself never needed a single code change or redeployment.",
    interviewTip:
      "If asked why not just add a configuration value/environment variable for the threshold instead, Business Rules' advantage is supporting genuinely complex decision logic (multiple conditions, decision tables) with a business-friendly editor, not just a single tunable number.",
    followupQuestions: [
      "What is a decision table and how does it represent business logic?",
      "Who typically has permission to change a rule — developers or business users?",
      "How does an application actually call the Business Rules service at runtime?",
    ],
    commonMistakes: [
      "Hard-coding frequently-changing business policy directly into application code.",
      "Not distinguishing Business Rules from a simple config value — it supports genuinely complex decision logic.",
    ],
    importantPoints: [
      "Business Rules externalizes decision logic from application code into a rules repository.",
      "Business users can adjust rules (often via decision tables) without developer involvement.",
      "Decouples business policy changes from application deployment cycles.",
    ],
    revisionNotes: "Business Rules = externalized decision logic (decision tables), adjustable by business users without code changes — app calls the service at runtime instead of hard-coding logic.",
  },
  {
    id: "build-q5",
    topic: "Build Apps",
    prompt: "Can SAP Build Apps integrate with existing backend data sources, like a CAP service or an external REST API?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["build-apps", "integration"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — SAP Build Apps supports connecting to external data sources (REST APIs, OData services including CAP-based ones) through configurable data connectors, letting a visually-built app read/write real backend data rather than being limited to isolated dummy data.",
    detailedAnswer:
      "Rather than being limited to standalone, disconnected apps, SAP Build Apps includes data connector configuration letting a visual app bind its UI components to real external data sources — a REST API, an OData service (including one exposed by a CAP application), or various other pre-built connector integrations. This means a citizen developer can build a functional app that reads and writes real business data from an existing backend without writing custom integration code themselves, configuring the connection largely through the visual builder's own connector setup rather than hand-written API client code.",
    hindiExplanation:
      "Standalone, disconnected apps tak limited hone ki jagah, SAP Build Apps mein data connector configuration hai jo ek visual app ko real external data sources se bind karne deta hai — ek REST API, ek OData service (CAP application se expose hui bhi shamil), ya various pre-built connector integrations. Iska matlab hai ek citizen developer ek functional app bana sakta hai jo real business data read/write karti hai existing backend se, khud custom integration code likhe bina, connection ko largely visual builder ke apne connector setup ke through configure karte hue.",
    interviewExplanation:
      "I'd confirm and describe the mechanism: 'Yes — SAP Build Apps includes data connector configuration, letting a visual app bind to real external sources: a REST API, an OData service including one from a CAP app, or various pre-built connectors. A citizen developer builds a functional app reading/writing real backend data configured largely through the visual builder's connector setup, without hand-writing integration code.'",
    diagramNote:
      "'SAP Build Apps' → 'Data connector configuration' → connects to 'REST API / OData service (incl. CAP) / other pre-built connectors' — real backend data, no hand-written integration code.",
    diagramMermaid: `flowchart LR
    A["SAP Build Apps"] --> B["Data connector<br/>configuration"]
    B --> C["REST API / OData<br/>(incl. CAP) / other connectors"]`,
    realProjectExample:
      "A citizen-developer-built approval app in SAP Build Apps connected directly to an existing CAP service's OData endpoint via a configured data connector, reading and updating real order records without any custom integration code being written.",
    interviewTip:
      "If asked whether low-code apps are limited to dummy/isolated data, correcting that misconception — real backend integration via data connectors is a core capability — shows accurate understanding of the tool's actual scope.",
    followupQuestions: [
      "What authentication would a data connector typically need to configure for a secured backend?",
      "Would a citizen developer need help from IT to set up a connector to an internal system?",
      "Can the same app use multiple different data connectors simultaneously?",
    ],
    commonMistakes: [
      "Assuming SAP Build Apps only works with isolated, dummy, or manually-entered data.",
      "Not knowing it can connect to real backend services including CAP-based OData endpoints.",
    ],
    importantPoints: [
      "SAP Build Apps supports data connectors to real external sources (REST, OData, CAP-based services).",
      "Citizen developers configure connections visually rather than writing integration code.",
      "This lets low-code apps read/write genuine backend business data, not just isolated dummy data.",
    ],
    revisionNotes: "SAP Build Apps connects to real backends (REST/OData/CAP) via configurable data connectors — citizen developers wire this up visually, no hand-written integration code.",
  },
  {
    id: "build-q6",
    topic: "Build Apps",
    prompt: "What governance concerns would you raise about citizen developers building and deploying apps broadly across an organization?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["build-apps", "governance"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Without governance, citizen-developer apps could proliferate uncontrolled data access patterns, inconsistent security practices, and apps with no clear IT ownership for support/maintenance long-term — mitigations include a review/approval process before production deployment, restricting which data connectors citizen developers can configure, and establishing clear ownership/support expectations upfront.",
    detailedAnswer:
      "The same accessibility that makes low-code powerful (business users building apps without deep technical review) is also its governance risk: a citizen developer might inadvertently expose sensitive data through a misconfigured connector, build an app with no clear long-term IT ownership when the original builder moves on, or create redundant apps duplicating existing functionality without IT's awareness. Sensible governance includes requiring some review/approval gate before a citizen-built app reaches production (not necessarily a full code review, but at minimum a data-access and security check), limiting which data sources/connectors citizen developers can configure without IT involvement (especially for sensitive systems), and establishing upfront who's actually responsible for supporting and maintaining the app long-term — rather than discovering these gaps only after an app becomes business-critical with no clear owner.",
    hindiExplanation:
      "Wahi accessibility jo low-code ko powerful banati hai (business users apps bana sakte hain deep technical review ke bina) uska governance risk bhi hai: ek citizen developer inadvertently sensitive data expose kar sakta hai ek misconfigured connector se, ek app bana sakta hai koi clear long-term IT ownership ke bina jab original builder chala jaaye, ya redundant apps create kar sakta hai existing functionality duplicate karte hue bina IT ki awareness ke. Sensible governance mein shamil hai kuch review/approval gate require karna production tak pahunchne se pehle, sensitive data sources/connectors tak access limit karna citizen developers ke liye bina IT involvement ke, aur upfront establish karna ki app ko long-term support/maintain kaun karega.",
    interviewExplanation:
      "I'd raise the concrete risks and mitigations: 'The same accessibility that makes low-code powerful is also the governance risk — a citizen developer could inadvertently expose sensitive data through a misconfigured connector, or build an app with no clear IT ownership once they move on. I'd want a review/approval gate before production, restricted connector access for sensitive systems, and clear upfront ownership/support expectations, so these gaps aren't discovered only after an app becomes business-critical.'",
    diagramNote:
      "Governance risks: 'Uncontrolled data access via misconfigured connectors' + 'No clear IT ownership long-term' + 'Redundant apps duplicating functionality' → mitigations: 'review/approval gate, restricted connectors, upfront ownership clarity'.",
    diagramMermaid: `flowchart TD
    A["Citizen-developer app risks"] --> B["Uncontrolled data access<br/>via misconfigured connectors"]
    A --> C["No clear IT ownership<br/>long-term"]
    A --> D["Redundant apps<br/>duplicating functionality"]
    E["Mitigations: review gate,<br/>restricted connectors, upfront ownership"] -.-> A`,
    realProjectExample:
      "A citizen-built approval app that had inadvertently been configured with overly broad data connector permissions was caught during a review gate before production, and the organization subsequently established a lightweight but mandatory security/ownership review process for all future citizen-built apps.",
    interviewTip:
      "If asked about the risks of low-code adoption at scale, naming specific governance gaps (data exposure, unclear ownership, redundant apps) rather than a vague 'it could be risky' shows concrete, practical risk awareness.",
    followupQuestions: [
      "What would a lightweight review process for citizen-built apps look like in practice?",
      "How would you decide which data connectors are 'sensitive enough' to restrict from citizen developers?",
      "How would you handle an app whose original citizen-developer builder has left the organization?",
    ],
    commonMistakes: [
      "Assuming low-code tools are inherently safe simply because they don't require writing traditional code.",
      "Not establishing clear ownership/support expectations before a citizen-built app becomes business-critical.",
    ],
    importantPoints: [
      "Citizen-developer apps risk uncontrolled data access, unclear ownership, and redundant functionality.",
      "Mitigate with a review/approval gate, restricted sensitive-connector access, and upfront ownership clarity.",
      "These governance gaps are easy to overlook precisely because low-code feels lightweight and informal.",
    ],
    revisionNotes: "Citizen-developer governance risks: uncontrolled data access, unclear long-term ownership, redundant apps — mitigate with review gates, restricted sensitive connectors, upfront ownership clarity.",
  },
  {
    id: "build-q7",
    topic: "Build Apps",
    prompt: "What's a concrete example of an app that's a poor fit for SAP Build Apps, and why?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["build-apps", "scope-fit"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A high-throughput, performance-critical system with complex custom algorithms (like a real-time pricing engine with intricate proprietary logic) is a poor fit — the visual/low-code paradigm isn't designed for deeply custom computational logic or performance-tuned code paths, which need a professional CAP/backend implementation instead.",
    detailedAnswer:
      "SAP Build Apps excels at common, structurally simple patterns — forms, approval flows, basic data-driven CRUD UIs — where the visual builder's component library and logic flows genuinely cover the need. A poor fit is an app whose core value is deeply custom, computationally intensive, or highly performance-sensitive logic that doesn't map cleanly to visual configuration — a real-time pricing engine with intricate proprietary calculation logic, a system needing to process very high transaction volumes with carefully tuned performance, or an app requiring extensive custom algorithmic logic that would be awkward or impossible to express through pre-built visual components. For these, a professional CAP/backend implementation gives the necessary control and performance tuning that a low-code visual tool isn't designed to provide.",
    hindiExplanation:
      "SAP Build Apps common, structurally simple patterns mein excel karta hai — forms, approval flows, basic data-driven CRUD UIs — jaha visual builder ki component library aur logic flows genuinely need cover kar lete hain. Ek poor fit hai ek app jiski core value deeply custom, computationally intensive, ya highly performance-sensitive logic hai jo visual configuration mein cleanly map nahi hoti — ek real-time pricing engine intricate proprietary calculation logic ke saath, ek system jise very high transaction volumes carefully tuned performance ke saath process karni hai, ya ek app jise extensive custom algorithmic logic chahiye.",
    interviewExplanation:
      "I'd give a specific example and the reason: 'SAP Build Apps excels at common, structurally simple patterns — forms, approval flows, basic CRUD UIs. A poor fit is something like a real-time pricing engine with intricate proprietary calculation logic — deeply custom, performance-sensitive computational logic doesn't map cleanly to visual configuration. For that, you'd need a professional CAP/backend implementation for the necessary control and performance tuning.'",
    diagramNote:
      "'Good fit: forms, approval flows, basic CRUD (structurally simple)' vs 'Poor fit: real-time pricing engine, intricate proprietary logic, performance-critical (needs professional CAP/backend)'.",
    diagramMermaid: `flowchart LR
    A["Good fit: forms, approvals,<br/>basic CRUD"] --> B["SAP Build Apps"]
    C["Poor fit: pricing engine,<br/>performance-critical logic"] --> D["Professional CAP/backend needed"]`,
    realProjectExample:
      "An attempt to build a complex real-time inventory-pricing calculation directly in SAP Build Apps proved awkward and underperformed, leading the team to reimplement that specific logic as a proper CAP service the low-code app's UI then simply called, rather than trying to force the complex logic into the visual builder itself.",
    interviewTip:
      "If asked to identify when NOT to recommend low-code, giving a concrete, specific example (like a pricing engine) rather than a vague 'complex apps' shows precise scoping judgment.",
    followupQuestions: [
      "Could you combine SAP Build Apps for the UI with a professional CAP backend for the complex logic?",
      "What performance characteristics would signal an app has outgrown SAP Build Apps?",
      "How would you migrate an app from SAP Build Apps to a professional CAP/UI5 implementation if it outgrows the tool?",
    ],
    commonMistakes: [
      "Attempting to force deeply custom, performance-critical logic into a low-code visual builder instead of a professional backend.",
      "Not recognizing when a citizen-developer app has genuinely outgrown the tool's intended scope.",
    ],
    importantPoints: [
      "SAP Build Apps fits common, structurally simple patterns (forms, approvals, basic CRUD).",
      "A poor fit is deeply custom, computationally intensive, or performance-critical logic.",
      "Such logic needs a professional CAP/backend implementation instead.",
    ],
    revisionNotes: "SAP Build Apps poor fit example: a real-time pricing engine with intricate proprietary/performance-critical logic — needs a professional CAP/backend, not visual low-code.",
  },
  {
    id: "build-q8",
    topic: "Build Apps",
    prompt: "How would a citizen-developer-built app be maintained and supported once it goes into wider use across the organization?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["build-apps", "support-lifecycle"],
    estimatedMinutes: 2,
    expectedAnswer:
      "This needs to be explicitly decided upfront — either the original citizen developer (or their business unit) retains ownership with IT providing lightweight support/escalation, or IT formally adopts the app into its supported portfolio once it reaches a certain criticality/usage threshold — rather than leaving it ambiguous until a support crisis forces the question.",
    detailedAnswer:
      "A common real-world failure mode is an app built casually by a business user becoming genuinely business-critical (widely used, depended on for daily operations) without anyone having deliberately decided who owns its ongoing maintenance, bug fixes, or support when the original builder is unavailable or moves on. The healthy pattern establishes this upfront, potentially with tiered ownership: lightweight, low-criticality apps might stay owned by the originating business unit with informal support, while apps crossing some usage/criticality threshold get formally adopted into IT's supported application portfolio, with clearer SLAs and a defined support process. Leaving this ambiguous until a crisis (the original builder leaves, and nobody knows how to fix a broken app everyone now depends on) is the failure mode this deliberate policy avoids.",
    hindiExplanation:
      "Ek common real-world failure mode hai ek app jo casually ek business user ne banaya tha genuinely business-critical ban jaana (widely used, daily operations ke liye depend kiya jaata hai) bina kisi ne deliberately decide kiye ki uski ongoing maintenance, bug fixes, ya support ka owner kaun hai jab original builder unavailable ho ya chala jaaye. Healthy pattern ise upfront establish karta hai, potentially tiered ownership ke saath: lightweight, low-criticality apps shayad originating business unit ke paas hi owned rahein informal support ke saath, jabki apps jo kisi usage/criticality threshold ko cross karti hain unhe formally IT ke supported application portfolio mein adopt kiya jaaye.",
    interviewExplanation:
      "I'd describe the failure mode and the healthy pattern: 'A common failure is an app built casually becoming business-critical without anyone deciding ownership upfront — then the original builder leaves and nobody can fix it. The healthy pattern establishes tiered ownership deliberately: low-criticality apps stay with the business unit informally, but apps crossing a usage/criticality threshold get formally adopted into IT's supported portfolio with clearer SLAs — decided upfront, not discovered during a crisis.'",
    diagramNote:
      "'Low-criticality app: stays with originating business unit, informal support' vs 'High-criticality app (crosses threshold): formally adopted into IT's supported portfolio, defined SLAs' — decided upfront, not during a crisis.",
    diagramMermaid: `flowchart LR
    A["Low-criticality app"] --> B["Stays with business unit,<br/>informal support"]
    C["High-criticality app<br/>crosses threshold"] --> D["Formally adopted into<br/>IT's supported portfolio"]`,
    realProjectExample:
      "An expense-approval app built casually by a finance team member became used company-wide within months; the organization retroactively formalized its ownership transfer into IT's supported portfolio once its usage crossed a criticality threshold, establishing clear support SLAs that hadn't existed when the app was first built.",
    interviewTip:
      "If asked how you'd scale citizen development safely across an organization, describing this deliberate, tiered ownership-transfer policy (rather than leaving it ambiguous) shows mature, proactive operational thinking.",
    followupQuestions: [
      "What specific usage/criticality metrics would trigger formal IT adoption of an app?",
      "How would you handle the actual technical transfer of ownership/support responsibility?",
      "Would this same ownership-transfer concern apply to professionally-built CAP/UI5 apps too, or is it specific to citizen-developer apps?",
    ],
    commonMistakes: [
      "Leaving app ownership/support ambiguous until a crisis (the original builder leaving) forces the question.",
      "Not establishing tiered criticality thresholds for when informal business-unit ownership should transition to formal IT support.",
    ],
    importantPoints: [
      "App ownership/support responsibility should be decided deliberately, not left ambiguous.",
      "Tiered ownership: low-criticality apps stay informal, high-criticality ones get formally adopted by IT.",
      "This avoids the common failure mode of a crisis forcing the ownership question after the fact.",
    ],
    revisionNotes: "Decide citizen-app ownership/support upfront, tiered by criticality — low-criticality stays informal with the business unit, high-criticality gets formally adopted by IT. Don't leave it ambiguous until a crisis.",
  },
  {
    id: "build-q9",
    topic: "Process Automation",
    prompt: "How does document information extraction work as part of an automation step, and what's its accuracy limitation?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["process-automation", "document-extraction"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Document information extraction uses machine learning to identify and pull structured data (like line items, totals, dates) out of unstructured or semi-structured documents (scanned PDFs, images); it's generally highly accurate for well-formatted, common document types but not perfect, so a well-designed process should include a human verification/confidence-check step rather than blindly trusting every extraction.",
    detailedAnswer:
      "The automation step sends a document (a scanned invoice, a receipt) to a machine-learning-based extraction service, which identifies and returns structured fields (vendor name, line items, total amount, due date) from what started as unstructured visual content. This works remarkably well for common, well-formatted document types the model has been trained on, but it's not perfect — unusual layouts, poor scan quality, or handwriting can produce extraction errors or low-confidence results. A well-designed process shouldn't blindly trust every extraction as ground truth; it should incorporate a confidence-check or human verification step (often exactly the workflow-step pattern discussed earlier) for extractions below some confidence threshold, rather than assuming the automation step is always perfectly accurate.",
    hindiExplanation:
      "Automation step ek document (ek scanned invoice, ek receipt) ko ek machine-learning-based extraction service ko bhejta hai, jo structured fields (vendor name, line items, total amount, due date) identify aur return karta hai jo shuru mein unstructured visual content tha. Ye common, well-formatted document types ke liye remarkably well kaam karta hai jinpe model train hua hai, lekin ye perfect nahi hai — unusual layouts, poor scan quality, ya handwriting extraction errors ya low-confidence results produce kar sakte hain. Ek well-designed process har extraction ko ground truth ki tarah blindly trust nahi karni chahiye.",
    interviewExplanation:
      "I'd explain both the capability and its limit: 'Document extraction uses ML to pull structured fields — vendor, line items, total — from what started as unstructured scanned content, working remarkably well for common, well-formatted documents. But it's not perfect — unusual layouts or poor scans can cause errors. A well-designed process shouldn't blindly trust every extraction; I'd add a confidence-check or human verification step for low-confidence extractions, exactly the workflow-step pattern discussed earlier, rather than assuming perfect accuracy.'",
    diagramNote:
      "'Document (scanned PDF)' → 'ML extraction automation step' → 'Structured fields (vendor, total, date)' → if low confidence: 'Human verification (workflow step)' before proceeding.",
    diagramMermaid: `flowchart TD
    A["Document<br/>scanned PDF"] --> B["ML extraction<br/>automation step"]
    B --> C["Structured fields<br/>vendor, total, date"]
    C --> D{"Confidence<br/>threshold met?"}
    D -->|"No"| E["Human verification<br/>workflow step"]
    D -->|"Yes"| F["Proceed automatically"]`,
    realProjectExample:
      "An invoice extraction automation correctly parsed the vast majority of well-formatted vendor invoices automatically, but a specific vendor's unusually formatted documents consistently produced low-confidence extractions, which were routed to a human verification workflow step rather than being trusted blindly, catching several genuine extraction errors before they reached the ERP system.",
    interviewTip:
      "If asked whether document extraction can be fully trusted end-to-end without human oversight, the correct, honest answer is no for edge cases — designing in a confidence-based human verification fallback is the mature approach.",
    followupQuestions: [
      "How would you determine an appropriate confidence threshold for routing to human verification?",
      "What document characteristics tend to produce lower extraction confidence?",
      "Would you train or fine-tune the extraction model for a specific organization's common document formats?",
    ],
    commonMistakes: [
      "Assuming document information extraction is always perfectly accurate and trusting every result blindly.",
      "Not designing a confidence-based human verification fallback for lower-confidence extractions.",
    ],
    importantPoints: [
      "Document extraction uses ML to pull structured fields from unstructured document content.",
      "Highly accurate for common, well-formatted documents but not perfect for edge cases.",
      "A well-designed process includes a confidence-check/human verification step, not blind trust.",
    ],
    revisionNotes: "Document extraction (ML-based) works well for common formats but isn't perfect — design in a confidence-check/human verification workflow step for low-confidence extractions, don't blindly trust every result.",
  },
  {
    id: "build-q10",
    topic: "Process Automation",
    prompt: "How would you handle a workflow step where the assigned approver is on vacation and doesn't respond in time?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["process-automation", "escalation"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Configure a deadline/timeout on the workflow task with an escalation action — reassigning to a backup approver, escalating to a manager, or sending a reminder notification — rather than letting the process indefinitely stall waiting on someone who may be unavailable.",
    detailedAnswer:
      "A workflow step waiting indefinitely for a specific person's action creates a real business risk if that person is unavailable (vacation, illness, departure) — the whole process silently stalls, potentially for the entire duration of their absence, with nobody aware until someone notices the process never completed. Process Automation supports configuring deadlines on workflow tasks with defined escalation behavior when that deadline passes — options typically include reassigning the task to a designated backup/substitute approver, escalating to the original approver's manager, or at minimum sending an automated reminder notification. Designing this escalation path deliberately, rather than assuming the primary approver will always be available and responsive, is essential for a process that genuinely needs to keep moving reliably.",
    hindiExplanation:
      "Ek workflow step jo indefinitely ek specific person ke action ka wait karta hai ek real business risk create karta hai agar wo person unavailable ho (vacation, illness, departure) — poora process silently stall ho jaata hai, potentially unki poori absence ki duration tak, koi bhi aware nahi jab tak koi notice na kare ki process kabhi complete nahi hua. Process Automation workflow tasks pe deadlines configure karna support karta hai defined escalation behavior ke saath jab wo deadline pass ho jaaye — options typically include task ko designated backup/substitute approver ko reassign karna, original approver ke manager ko escalate karna, ya kam se kam ek automated reminder notification bhejna.",
    interviewExplanation:
      "I'd describe the deadline-plus-escalation design: 'Waiting indefinitely for a specific person creates real business risk if they're unavailable — the process silently stalls with nobody aware. Process Automation supports configuring a deadline on the task with defined escalation — reassigning to a backup approver, escalating to their manager, or at minimum an automated reminder. I'd design this deliberately, rather than assuming the primary approver is always available and responsive.'",
    diagramNote:
      "'Workflow task assigned to approver' → 'Deadline configured' → if not acted on in time: 'Escalation: reassign to backup / escalate to manager / send reminder' — process doesn't silently stall.",
    diagramMermaid: `flowchart TD
    A["Workflow task<br/>assigned to approver"] --> B{"Deadline reached<br/>without action?"}
    B -->|"Yes"| C["Escalation: reassign to backup /<br/>escalate to manager / send reminder"]
    B -->|"No"| D["Approver acts normally"]`,
    realProjectExample:
      "An approval process that initially had no deadline configuration silently stalled for two weeks while the assigned approver was on unplanned leave; adding a 48-hour deadline with automatic reassignment to a designated backup approver prevented this exact scenario from recurring.",
    interviewTip:
      "If asked how you'd design a robust approval workflow, proactively mentioning deadline/escalation configuration (not just the happy-path approval step) shows you're designing for real operational reliability, not just the ideal case.",
    followupQuestions: [
      "How would you configure who the designated backup approver actually is?",
      "Would you want an audit trail showing when an escalation occurred and why?",
      "What's a reasonable deadline duration for a typical business approval task?",
    ],
    commonMistakes: [
      "Designing a workflow step with no deadline or escalation path, risking indefinite silent stalling.",
      "Assuming the assigned approver will always be available and responsive without a fallback plan.",
    ],
    importantPoints: [
      "Workflow tasks should have a configured deadline with a defined escalation action.",
      "Escalation options include reassignment to a backup approver, manager escalation, or reminders.",
      "This prevents a process from silently stalling indefinitely due to an unavailable approver.",
    ],
    revisionNotes: "Configure a deadline + escalation (reassign to backup/escalate to manager/reminder) on workflow tasks — prevents indefinite silent stalling if the assigned approver is unavailable.",
  },
  {
    id: "build-q11",
    topic: "Process Automation",
    prompt: "Can a single process have parallel workflow steps, and when would that be useful?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["process-automation", "parallel-steps"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — a process can branch into parallel workflow steps sent to multiple people simultaneously, useful when a decision genuinely needs multiple independent approvals/inputs at once (like both a finance and a legal reviewer signing off) rather than requiring them sequentially, one after another, which would take longer.",
    detailedAnswer:
      "Modeling a process as strictly sequential steps means if a decision genuinely needs input from two different people or departments (say, both finance and legal need to review a contract), doing this sequentially — finance reviews, then legal reviews only after finance finishes — takes longer than necessary if their reviews don't actually depend on each other. Process Automation supports parallel workflow branches, sending tasks to multiple people/roles simultaneously, with the process only proceeding once all (or some configured subset) of the parallel tasks complete — genuinely faster for cases where multiple independent reviews or approvals are needed but don't have a real dependency ordering between them.",
    hindiExplanation:
      "Ek process ko strictly sequential steps ki tarah model karna matlab agar ek decision ko genuinely do different logon ya departments se input chahiye (jaise, finance aur legal dono ko ek contract review karna hai), ye sequentially karna — finance review karta hai, fir legal review karta hai sirf finance khatam hone ke baad — zyada time leta hai zaroorat se agar unke reviews actually ek doosre pe depend nahi karte. Process Automation parallel workflow branches support karta hai, tasks ko multiple logon/roles ko simultaneously bhejta hai, process tabhi proceed karta hai jab saare (ya kuch configured subset) parallel tasks complete ho jaayein.",
    interviewExplanation:
      "I'd give the concrete finance-plus-legal example: 'Yes — if finance and legal both need to review a contract independently, doing this sequentially takes longer than necessary since their reviews don't actually depend on each other. Process Automation supports parallel workflow branches, sending tasks to both simultaneously, with the process proceeding once all — or a configured subset — complete. Genuinely faster whenever multiple independent reviews don't have a real dependency ordering.'",
    diagramNote:
      "'Sequential (unnecessary): Finance review → THEN Legal review (slower)' vs 'Parallel: Finance review AND Legal review simultaneously → process proceeds once both complete (faster)'.",
    diagramMermaid: `flowchart LR
    A["Sequential: Finance review<br/>→ THEN Legal review"] --> B["Slower — unnecessary ordering"]
    C["Parallel: Finance AND Legal<br/>review simultaneously"] --> D["Faster — proceeds once both complete"]`,
    realProjectExample:
      "A contract-approval process was redesigned from sequential finance-then-legal review into parallel branches sent simultaneously to both reviewers, cutting the typical end-to-end approval time roughly in half since neither reviewer's input actually depended on the other's.",
    interviewTip:
      "If asked how you'd speed up a multi-approver process, identifying whether the approvals genuinely have a dependency order (sequential needed) or not (parallel possible) is the precise analytical step, not just 'add more approvers'.",
    followupQuestions: [
      "What happens if the process requires only some, not all, of the parallel approvers to approve?",
      "Could a parallel branch itself contain a further deadline/escalation configuration?",
      "How would you decide whether two approval steps genuinely have no dependency between them?",
    ],
    commonMistakes: [
      "Modeling independent approvals sequentially by default, unnecessarily slowing down the overall process.",
      "Not knowing Process Automation supports genuinely parallel workflow branches.",
    ],
    importantPoints: [
      "Process Automation supports parallel workflow branches sent to multiple people simultaneously.",
      "Useful when multiple approvals/reviews are genuinely independent, with no real dependency ordering.",
      "The process proceeds once all (or a configured subset) of parallel tasks complete.",
    ],
    revisionNotes: "Parallel workflow branches send tasks to multiple approvers simultaneously — use when reviews are genuinely independent (no dependency ordering), faster than unnecessary sequential steps.",
  },
  {
    id: "build-q12",
    topic: "Process Automation",
    prompt: "How would you monitor and troubleshoot a business process that seems to be stuck partway through?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["process-automation", "monitoring"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Use Process Automation's monitoring/instance view to inspect the specific process instance, identifying exactly which step it's currently stuck at (a pending workflow task, a failed automation step) and why — a pending task waiting on an unavailable approver, or a failed automation step due to a downstream API error — rather than guessing generically.",
    detailedAnswer:
      "Process Automation provides a monitoring interface showing the status of individual process instances, letting you drill into a specific stuck instance to see exactly which step it's currently at and its status — whether it's a workflow step genuinely pending someone's action (checking who it's assigned to, and whether an escalation should have already triggered), or an automation step that actually failed (checking the specific error, like a downstream API call that errored out or timed out). This targeted, instance-level investigation identifies the actual, specific cause — rather than a generic 'the process seems broken' — letting you address the real issue (nudging or reassigning a stalled approver, fixing or retrying a failed automation step) directly.",
    hindiExplanation:
      "Process Automation ek monitoring interface deta hai jo individual process instances ka status dikhata hai, tumhe ek specific stuck instance mein drill karne deta hai ye dekhne ke liye ki wo exactly kaunse step pe hai aur uska status kya hai — chahe wo ek workflow step ho jo genuinely kisi ke action ka pending hai, ya ek automation step jo actually fail hua hai. Ye targeted, instance-level investigation actual, specific cause identify karta hai — ek generic 'process seems broken' ki jagah — tumhe real issue address karne dete hue directly.",
    interviewExplanation:
      "I'd describe the targeted, instance-level approach: 'I'd use the monitoring interface to drill into the specific stuck instance and see exactly which step it's at — a workflow task genuinely pending someone's action, where I'd check who it's assigned to and whether escalation should have triggered, or a failed automation step, where I'd check the specific error like a downstream API failure. This targeted investigation identifies the actual cause, rather than treating it as a generic broken process.'",
    diagramNote:
      "'Process instance seems stuck' → 'Drill into monitoring interface' → identify: 'Pending workflow task (check assignee/escalation)' OR 'Failed automation step (check specific error)' — targeted diagnosis.",
    diagramMermaid: `flowchart TD
    A["Process instance stuck"] --> B["Drill into monitoring interface"]
    B --> C["Pending workflow task —<br/>check assignee/escalation"]
    B --> D["Failed automation step —<br/>check specific error"]`,
    realProjectExample:
      "A stuck invoice process was diagnosed via the monitoring interface as stalled on a workflow task assigned to an employee who'd left the company weeks earlier, with no escalation configured — the immediate fix was manually reassigning the task, and the longer-term fix was adding proper deadline/escalation configuration to the process.",
    interviewTip:
      "If asked how you'd debug a stuck business process, describing this targeted, instance-level monitoring approach (not just 'check the logs generically') shows precise, hands-on Process Automation operational knowledge.",
    followupQuestions: [
      "What specific error information would a failed automation step typically show in the monitoring interface?",
      "How would you proactively monitor for processes that have been stuck for an unusually long time?",
      "Could you manually intervene to unstick a process instance directly from the monitoring interface?",
    ],
    commonMistakes: [
      "Treating a stuck process as generically 'broken' without drilling into the specific instance and step.",
      "Not checking whether an escalation should have already triggered for a stalled workflow task.",
    ],
    importantPoints: [
      "Use the monitoring interface to drill into the specific stuck process instance.",
      "Identify whether it's a genuinely pending workflow task or a failed automation step.",
      "Diagnose the specific, actual cause rather than treating it as a generic failure.",
    ],
    revisionNotes: "Troubleshoot a stuck process via the monitoring interface — drill into the specific instance, identify pending workflow task (check assignee/escalation) vs failed automation step (check specific error).",
  },
  {
    id: "build-q13",
    topic: "Work Zone",
    prompt: "What content widgets, beyond app tiles, can a Work Zone page typically include?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["work-zone", "content-widgets"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Work Zone pages can include widgets like news/announcement feeds, embedded documents, external links, and integrations with third-party productivity tools (like Microsoft 365 or Google Workspace) alongside standard app tiles, creating a broader workday landing page rather than just an app launcher grid.",
    detailedAnswer:
      "Beyond the tile grid inherited from the underlying Launchpad, Work Zone's page-building capability supports a variety of other widget types: a news/announcement feed keeping employees informed of company updates directly on their home page, embedded document viewers or links to shared documents, external links to frequently-needed resources outside the BTP ecosystem entirely, and deeper integrations with common productivity suites (Microsoft 365, Google Workspace) letting employees see or interact with things like their calendar or recent files without leaving the Work Zone page. This combination — apps plus informational/productivity content — is what differentiates Work Zone's 'digital workplace' positioning from a plain app-launching tile grid.",
    hindiExplanation:
      "Underlying Launchpad se inherited tile grid se aage, Work Zone ki page-building capability various doosre widget types support karti hai: ek news/announcement feed jo employees ko company updates ke baare mein directly unke home page pe inform karti hai, embedded document viewers ya shared documents ke links, external links frequently-needed resources ke liye poori tarah BTP ecosystem se bahar, aur deeper integrations common productivity suites (Microsoft 365, Google Workspace) ke saath.",
    interviewExplanation:
      "I'd list the concrete widget types: 'Beyond the standard app tile grid, Work Zone pages support a news/announcement feed for company updates, embedded document viewers or links, external links to resources outside BTP entirely, and deeper integrations with Microsoft 365 or Google Workspace letting employees see their calendar or recent files without leaving the page. That combination of apps plus informational/productivity content is what makes it a digital workplace, not just an app launcher.'",
    diagramNote:
      "'Work Zone page' → widgets: 'App tiles (from Launchpad)' + 'News/announcement feed' + 'Document viewers/links' + 'External links' + 'MS365/Google Workspace integration'.",
    diagramMermaid: `flowchart TD
    A["Work Zone page"] --> B["App tiles<br/>from Launchpad"]
    A --> C["News/announcement feed"]
    A --> D["Document viewers/links"]
    A --> E["MS365/Google Workspace integration"]`,
    realProjectExample:
      "An organization's Work Zone home page combined standard Fiori app tiles with a live company news feed, direct links to frequently-referenced policy documents, and a Microsoft 365 widget showing the employee's upcoming calendar events, all on one landing page.",
    interviewTip:
      "If asked what makes Work Zone more than 'just the Launchpad with a new name', naming these specific additional widget types (news, documents, external integrations) is the precise, correct differentiator.",
    followupQuestions: [
      "How would you decide which widgets belong on a company-wide default page versus a personalized one?",
      "Can a business user customize their own Work Zone page, or is it entirely admin-configured?",
      "What governance would you want around who can post to the company news feed widget?",
    ],
    commonMistakes: [
      "Describing Work Zone as identical to the Launchpad, missing its additional widget/content capabilities.",
      "Not knowing specific widget types like news feeds or external tool integrations exist.",
    ],
    importantPoints: [
      "Work Zone pages support widgets beyond app tiles: news feeds, documents, external links, productivity tool integrations.",
      "This combination of apps plus informational content is the core 'digital workplace' differentiator.",
      "Distinguishes Work Zone meaningfully from a plain Launchpad tile grid.",
    ],
    revisionNotes: "Work Zone widgets beyond app tiles: news/announcement feeds, document viewers/links, external links, MS365/Google Workspace integration — the 'digital workplace' differentiator from a plain tile grid.",
  },
  {
    id: "build-q14",
    topic: "Work Zone",
    prompt: "Does every BTP customer need Work Zone, or is the plain Launchpad service sometimes sufficient?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["work-zone", "scope-fit"],
    estimatedMinutes: 2,
    expectedAnswer:
      "No — if the actual need is simply 'let users launch their Fiori apps from tiles', the plain Launchpad service alone is sufficient and simpler; Work Zone is worth the additional investment specifically when a broader digital workplace experience (news, documents, external tool integration) is actually needed, not as a default upgrade for every scenario.",
    detailedAnswer:
      "Since Work Zone is built on top of the Launchpad service and adds genuine additional capability (and complexity/cost) beyond it, the decision should be need-driven, not default-to-the-fancier-option: an organization whose actual requirement is purely 'employees need to launch their assigned Fiori apps from a tile-based home page' is fully served by the plain Launchpad service, with no compelling reason to adopt Work Zone's broader digital workplace features they wouldn't actually use. Work Zone earns its additional investment specifically when there's a genuine organizational need for that broader portal experience — company-wide news distribution, document/collaboration integration, a genuine 'digital workplace' vision beyond app launching — not simply because it's the more feature-rich option available.",
    hindiExplanation:
      "Kyunki Work Zone Launchpad service ke upar built hai aur genuine additional capability (aur complexity/cost) add karta hai uske aage, decision need-driven honi chahiye, default-to-the-fancier-option nahi: ek organization jiski actual requirement purely 'employees ko unki assigned Fiori apps launch karni hain ek tile-based home page se' hai poori tarah plain Launchpad service se serve hoti hai, koi compelling reason nahi hai Work Zone ke broader digital workplace features adopt karne ke liye jo wo actually use hi nahi karenge.",
    interviewExplanation:
      "I'd give the need-driven decision criteria: 'No — Work Zone adds genuine additional capability and cost beyond the plain Launchpad service, so the decision should be need-driven. If the actual requirement is purely launching Fiori apps from tiles, the plain Launchpad service is fully sufficient with no compelling reason to adopt Work Zone's broader features. Work Zone earns its investment specifically when there's a genuine need for that broader portal experience — company news, document integration, a real digital workplace vision.'",
    diagramNote:
      "'Requirement: just launch Fiori apps from tiles' → 'Plain Launchpad service sufficient' vs 'Requirement: broader digital workplace (news/docs/external integration)' → 'Work Zone justified'.",
    diagramMermaid: `flowchart LR
    A["Requirement: just launch<br/>Fiori apps from tiles"] --> B["Plain Launchpad<br/>service sufficient"]
    C["Requirement: broader digital<br/>workplace (news/docs/integration)"] --> D["Work Zone justified"]`,
    realProjectExample:
      "A mid-sized company with a simple requirement — employees launching a handful of Fiori apps — deliberately stayed on the plain Launchpad service rather than adopting Work Zone, since they had no actual need for the broader portal/news/document features Work Zone would have added at extra cost and complexity.",
    interviewTip:
      "If asked whether you'd always recommend Work Zone as the 'better' option, the correct answer explicitly resists that framing — recommend based on the actual stated need, not defaulting to the more feature-rich product.",
    followupQuestions: [
      "What specific signals would tell you an organization has actually outgrown the plain Launchpad service?",
      "Could an organization start with the plain Launchpad and migrate to Work Zone later if needs grow?",
      "What's the actual cost/licensing difference between the two, and how would that factor into the decision?",
    ],
    commonMistakes: [
      "Defaulting to recommending Work Zone as the 'better' choice regardless of the actual stated requirement.",
      "Not recognizing the plain Launchpad service as fully sufficient for simple, app-launching-only needs.",
    ],
    importantPoints: [
      "The plain Launchpad service is fully sufficient for simple, app-launching-only requirements.",
      "Work Zone's additional investment is justified specifically by a genuine need for its broader features.",
      "Recommendation should be need-driven, not defaulting to the more feature-rich product automatically.",
    ],
    revisionNotes: "Plain Launchpad service is sufficient for simple app-launching needs — Work Zone's added investment is justified only by a genuine need for its broader digital workplace features, not as a default upgrade.",
  },
  {
    id: "build-q15",
    topic: "Business Rules",
    prompt: "What is a decision table, and how does it represent business logic more clearly than nested if/else code?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["business-rules", "decision-tables"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A decision table represents business logic as a grid of condition columns and outcome columns, where each row is one complete rule — this tabular format lets a business user scan and verify all the combinations of conditions and their outcomes at a glance, which is much harder to do by reading deeply nested if/else code, especially as the number of conditions grows.",
    detailedAnswer:
      "Nested if/else logic with several interacting conditions becomes genuinely hard to read and verify as complexity grows — a reviewer has to mentally trace through multiple branching paths to understand what outcome results from a specific combination of inputs, and it's easy to miss an unhandled combination or an inconsistency between similar branches. A decision table instead lays out every condition as a column and every distinct combination of condition values as a row, with the resulting outcome in a final column — making it straightforward to scan down the rows and verify: is every meaningful combination covered, are the outcomes consistent, is anything obviously missing. This tabular format is also far more approachable for a non-technical business user to review and even directly edit than reading source code would ever be.",
    hindiExplanation:
      "Nested if/else logic kai interacting conditions ke saath genuinely padhna aur verify karna mushkil ho jaata hai jaise complexity badhti hai — ek reviewer ko mentally multiple branching paths trace karni padti hain ye samajhne ke liye ki ek specific combination of inputs se kya outcome result hota hai, aur ek unhandled combination ya similar branches ke beech inconsistency miss karna aasan hai. Ek decision table iske bajaye har condition ko ek column ki tarah aur har distinct combination of condition values ko ek row ki tarah layout karta hai, resulting outcome final column mein — rows ko scan karke verify karna straightforward banata hai.",
    interviewExplanation:
      "I'd contrast readability directly: 'Nested if/else with several interacting conditions gets genuinely hard to read and verify — a reviewer has to mentally trace multiple branches, and it's easy to miss an unhandled combination. A decision table lays out every condition as a column and every combination as a row, with the outcome in a final column — scanning down the rows lets you verify coverage and consistency at a glance. It's also far more approachable for a non-technical business user to review or edit directly than source code ever would be.'",
    diagramNote:
      "'Nested if/else: hard to trace all combinations, easy to miss cases' vs 'Decision table: conditions as columns, each row = one combination + outcome — scan to verify coverage/consistency at a glance'.",
    diagramMermaid: `flowchart LR
    A["Nested if/else"] --> B["Hard to trace all combinations,<br/>easy to miss cases"]
    C["Decision table"] --> D["Conditions as columns, rows =<br/>combinations — scannable coverage"]`,
    realProjectExample:
      "A discount-eligibility rule with four interacting conditions (customer tier, order size, region, promotion code) was originally nested nine levels deep in if/else code and genuinely hard to verify for completeness; converting it to a decision table immediately revealed two combinations that had been silently unhandled in the original code.",
    interviewTip:
      "If asked to justify why Business Rules' decision-table format is better than 'just writing the logic in code', citing the concrete completeness/consistency-verification benefit (not just 'it's more user-friendly') shows a technical, not just cosmetic, justification.",
    followupQuestions: [
      "How would a decision table handle a condition with many possible values, like a continuous numeric range?",
      "What tooling helps verify a decision table has no gaps or contradictions?",
      "Would you ever still prefer code over a decision table for some kinds of decision logic?",
    ],
    commonMistakes: [
      "Assuming decision tables are just a cosmetic UI wrapper around the same underlying if/else logic with no real benefit.",
      "Not recognizing the concrete completeness/consistency-verification advantage over deeply nested conditional code.",
    ],
    importantPoints: [
      "A decision table lays out conditions as columns and combinations as rows, with outcomes in a final column.",
      "This makes it easy to scan for coverage completeness and consistency, unlike deeply nested if/else code.",
      "Also far more approachable for non-technical business users to review or directly edit.",
    ],
    revisionNotes: "Decision tables (conditions as columns, combinations as rows) make coverage/consistency easy to verify at a glance, unlike deeply nested if/else — also more approachable for business users to review/edit.",
  },
  {
    id: "build-q16",
    topic: "Business Rules",
    prompt: "How would you version a business rule so a past decision (already made under the old rule) isn't retroactively affected by a later rule change?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["business-rules", "versioning"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Business Rules services typically support versioning rule definitions with an effective date, so historical decisions are evaluated against the rule version that was actually in effect at that time, and applications can either pin to a specific version or reference the current active version depending on whether historical consistency or always-current logic is needed.",
    detailedAnswer:
      "If a rule changes today, any decision genuinely made in the past under the old rule shouldn't retroactively appear to have used the new rule if you ever need to re-verify or audit it — imagine an approval threshold changing, and a compliance audit later needing to confirm a decision from six months ago was correctly evaluated against the threshold that was actually in effect then, not today's threshold. Business Rules services typically support versioned rule definitions, often with effective-dating, so historical evaluations can be reconstructed against the rule version genuinely active at that past point in time. Applications calling the service can either always use the current active version (appropriate for most day-to-day decisions) or reference a specific historical version when reconstructing or auditing a past decision.",
    hindiExplanation:
      "Agar ek rule aaj change hoti hai, koi bhi decision jo genuinely past mein purani rule ke under liya gaya tha use retroactively naye rule se liya hua nahi dikhna chahiye agar tumhe kabhi use re-verify ya audit karna pade — socho ek approval threshold change hoti hai, aur ek compliance audit baad mein confirm karna chahta hai ki chhah mahine pehle ka decision correctly evaluate hua tha us threshold ke against jo tab actually effect mein tha, aaj ke threshold ke against nahi. Business Rules services typically versioned rule definitions support karti hain, aksar effective-dating ke saath.",
    interviewExplanation:
      "I'd explain via the audit scenario: 'If a rule changes today, a decision made months ago under the old rule shouldn't retroactively appear to have used the new one if it's ever audited. Business Rules typically supports versioned rule definitions with effective-dating, so historical decisions can be reconstructed against whatever version was genuinely active at that past point in time. Applications either use the current active version for day-to-day decisions, or reference a specific historical version when auditing or reconstructing a past one.'",
    diagramNote:
      "'Rule v1 (active Jan-June)' + 'Rule v2 (active July onward, current)' → 'Decision made in March: evaluated against v1' + 'Audit in December re-checking that March decision: still references v1, not v2' — historical consistency preserved.",
    diagramMermaid: `flowchart LR
    A["Rule v1<br/>active Jan-June"] --> C["March decision:<br/>evaluated against v1"]
    B["Rule v2<br/>active July onward"] --> D["Current decisions:<br/>evaluated against v2"]
    C -.->|"audited later"| E["Still references v1,<br/>not v2 — historical consistency"]`,
    realProjectExample:
      "A compliance audit needing to re-verify a six-month-old approval decision successfully reconstructed it against the exact rule version that had been active at that time, thanks to the Business Rules service's effective-dated versioning, rather than incorrectly re-evaluating it against the threshold currently in effect.",
    interviewTip:
      "If asked how you'd handle regulatory audit requirements for a decision-logic-driven process, mentioning rule versioning/effective-dating specifically shows awareness of a real compliance concern beyond just 'the rules work correctly today'.",
    followupQuestions: [
      "How would an application decide whether to reference the current version or a specific historical one?",
      "What happens to in-flight processes when a rule they depend on gets updated mid-process?",
      "How would you audit which rule version was actually used for a specific historical decision?",
    ],
    commonMistakes: [
      "Assuming a rule change retroactively and correctly applies to all past decisions without any versioning concern.",
      "Not considering audit/compliance requirements needing historical rule-version consistency.",
    ],
    importantPoints: [
      "Business Rules supports versioned rule definitions, often with effective-dating.",
      "Historical decisions can be reconstructed against the rule version genuinely active at that time.",
      "Applications choose between the current active version and a specific historical version as needed.",
    ],
    revisionNotes: "Business Rules supports versioned/effective-dated rule definitions — historical decisions can be re-evaluated against the version genuinely active then, preserving audit/compliance consistency.",
  },
  {
    id: "build-q17",
    topic: "Business Rules",
    prompt: "How would you test a business rule before publishing a change to it?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["business-rules", "testing"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Use the Business Rules service's built-in simulation/testing capability to run the proposed rule change against sample input scenarios (including known edge cases) before publishing, confirming the outcomes match expectations, rather than only discovering an error once the change is live and affecting real decisions.",
    detailedAnswer:
      "Business Rules services typically include a simulation feature letting you input specific test scenarios (sample condition values) against a draft, unpublished version of the rule and see exactly what outcome it would produce — this lets whoever is editing the rule (a business user, potentially with no coding background) verify the change behaves as intended across representative and edge-case scenarios before it goes live and starts affecting real decisions. This is analogous to testing code before deploying it, just accessible to a non-technical rule editor through the service's own tooling rather than requiring a formal software test suite.",
    hindiExplanation:
      "Business Rules services typically ek simulation feature include karti hain jo tumhe specific test scenarios (sample condition values) input karne deti hai ek draft, unpublished version ke rule ke against aur exactly dekhne deti hai ki wo kya outcome produce karega — ye jo bhi rule edit kar raha hai (ek business user, potentially kisi coding background ke bina) use verify karne deta hai ki change intended tarike se behave karta hai representative aur edge-case scenarios ke aar-paar isse pehle ki wo live ho aur real decisions affect karna shuru kare.",
    interviewExplanation:
      "I'd describe the built-in simulation capability: 'Business Rules typically includes a simulation feature — you input test scenarios against a draft, unpublished version and see exactly what outcome it produces. This lets whoever's editing the rule, even a non-technical business user, verify it behaves as intended across representative and edge cases before it goes live. It's analogous to testing code before deploying, just accessible through the service's own tooling.'",
    diagramNote:
      "'Draft rule change (unpublished)' → 'Simulation: run test scenarios (including edge cases)' → 'Verify outcomes match expectations' → 'Publish live only after simulation confirms correctness'.",
    diagramMermaid: `flowchart TD
    A["Draft rule change<br/>unpublished"] --> B["Simulation: run test scenarios<br/>including edge cases"]
    B --> C["Verify outcomes<br/>match expectations"]
    C --> D["Publish live"]`,
    realProjectExample:
      "Before publishing a change to an approval-threshold rule, the business owner used the simulation feature to test several edge-case order amounts right at the new threshold boundary, catching an off-by-one error in the condition before it ever affected a real order.",
    interviewTip:
      "If asked how a non-technical business user would safely change a rule without a formal test suite, describing the built-in simulation capability shows awareness of the tool's actual safety mechanism.",
    followupQuestions: [
      "What edge cases would be especially important to test for a threshold-based rule?",
      "Would you require sign-off from someone else before publishing a tested rule change?",
      "How would simulation results be documented for audit purposes?",
    ],
    commonMistakes: [
      "Publishing a rule change directly to production without first simulating it against test scenarios.",
      "Not testing edge cases specifically (like values right at a threshold boundary) where errors are most likely.",
    ],
    importantPoints: [
      "Business Rules includes a simulation feature to test draft rule changes before publishing.",
      "Lets non-technical business users verify correctness across representative and edge-case scenarios.",
      "Analogous to testing code before deployment, accessible through the service's own tooling.",
    ],
    revisionNotes: "Business Rules includes a simulation feature — test a draft rule change against sample/edge-case scenarios before publishing, catching errors before they affect real decisions.",
  },
  {
    id: "build-q18",
    topic: "Business Rules",
    prompt: "Could two different applications reference the same Business Rules definition, and why would that matter?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["business-rules", "reuse"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — a single rule definition (like a discount-eligibility rule) can be called by multiple different applications that all need the same decision logic, ensuring consistent application of the business policy everywhere it's used, rather than each application maintaining its own potentially-diverging copy of the same logic.",
    detailedAnswer:
      "Business policy logic is often genuinely needed in more than one place — a discount-eligibility rule might need to be applied both in an online ordering app and in a separate customer-service application handling phone orders. Without a shared Business Rules definition, each application team might implement (and maintain) their own separate copy of the same logic, risking the two copies silently diverging over time as one gets updated without the other. Referencing a single, shared Business Rules definition from both applications ensures the exact same policy is applied consistently everywhere it's needed, and a policy update only needs to happen once, in one place, to take effect everywhere it's referenced.",
    hindiExplanation:
      "Business policy logic aksar genuinely ek se zyada jagah chahiye hoti hai — ek discount-eligibility rule shayad ek online ordering app mein bhi apply honi chahiye aur ek separate customer-service application mein bhi jo phone orders handle karti hai. Ek shared Business Rules definition ke bina, har application team apni khud ki separate copy implement (aur maintain) kar sakti hai, risk uthate hue ki dono copies silently diverge ho jaayein time ke saath jab ek update ho aur doosri na ho. Ek single, shared Business Rules definition ko dono applications se reference karna ensure karta hai ki exact same policy consistently apply hoti hai har jagah jaha chahiye.",
    interviewExplanation:
      "I'd give the concrete cross-app scenario: 'Yes — a discount-eligibility rule might be needed both in an online ordering app and a separate customer-service app for phone orders. Without a shared definition, each team might implement their own copy, risking silent divergence over time. Referencing one shared Business Rules definition from both ensures the exact same policy applies consistently everywhere, and an update only needs to happen once to take effect everywhere it's used.'",
    diagramNote:
      "'Shared Business Rules definition (discount eligibility)' referenced by → 'Online ordering app' AND 'Customer-service phone-order app' — one update propagates to both, no divergence risk.",
    diagramMermaid: `flowchart LR
    A["Shared Business Rules<br/>definition"] --> B["Online ordering app"]
    A --> C["Customer-service<br/>phone-order app"]`,
    realProjectExample:
      "A discount-eligibility rule was referenced by both the customer-facing e-commerce app and the internal customer-service tool handling phone orders; when the discount policy changed, updating the single shared rule definition immediately applied the new policy consistently to both channels without any risk of them silently diverging.",
    interviewTip:
      "If asked how you'd ensure consistent business policy application across multiple channels/apps, naming shared Business Rules reuse (rather than each team maintaining its own copy of the logic) is the precise, correct architectural answer.",
    followupQuestions: [
      "How would you find all the applications currently referencing a specific rule before changing it?",
      "What governance would you want around who can modify a rule shared across multiple applications?",
      "Would you ever want slightly different rule variants for different channels, and how would you model that?",
    ],
    commonMistakes: [
      "Letting each application team implement its own separate copy of the same business logic, risking divergence.",
      "Not considering the impact on other applications before changing a rule that's actually shared/referenced elsewhere.",
    ],
    importantPoints: [
      "A single Business Rules definition can be referenced by multiple different applications.",
      "Ensures consistent policy application across all channels/apps using it.",
      "A single update propagates everywhere the rule is referenced, avoiding divergent duplicate logic.",
    ],
    revisionNotes: "One Business Rules definition can be shared/referenced by multiple apps — ensures consistent policy everywhere, avoids each app maintaining a potentially-diverging copy of the same logic.",
  },
  {
    id: "build-q19",
    topic: "Work Zone",
    prompt: "How would you personalize a Work Zone page differently for different user populations within the same organization?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["work-zone", "personalization"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Configure different page assignments per role/user population — different groups of users can be assigned different Work Zone pages (or page variants) with different combinations of app tiles and content widgets relevant to their specific function, rather than showing every user the exact same generic landing page.",
    detailedAnswer:
      "Just as the underlying Launchpad supports role-based tile visibility, Work Zone extends this personalization to the whole page experience — different user populations (by role, department, or other assignment criteria) can be directed to different page configurations, each with its own relevant combination of app tiles and content widgets. A finance team's Work Zone page might emphasize finance-specific app tiles alongside a finance-department news widget, while an HR team's page emphasizes entirely different tiles and content — both existing within the same overall Work Zone site, but presenting a genuinely tailored experience per population rather than one generic page trying to serve everyone identically.",
    hindiExplanation:
      "Jaise underlying Launchpad role-based tile visibility support karta hai, Work Zone is personalization ko poore page experience tak extend karta hai — different user populations (role, department, ya doosre assignment criteria se) ko different page configurations tak direct kiya ja sakta hai, har ek apni relevant combination of app tiles aur content widgets ke saath. Ek finance team ka Work Zone page shayad finance-specific app tiles emphasize kare ek finance-department news widget ke saath, jabki ek HR team ka page entirely different tiles aur content emphasize kare.",
    interviewExplanation:
      "I'd extend the role-based personalization concept to the whole page: 'Just like the Launchpad supports role-based tile visibility, Work Zone extends this to the whole page — different user populations get directed to different page configurations, each with its own relevant tiles and widgets. A finance team's page might emphasize finance tiles and a finance news widget, while HR's page shows entirely different content — a genuinely tailored experience per population, not one generic page for everyone.'",
    diagramNote:
      "'Finance user population → Finance-tailored Work Zone page (finance tiles + finance news widget)' vs 'HR user population → HR-tailored Work Zone page (different tiles + different content)' — role/population-based page assignment.",
    diagramMermaid: `flowchart LR
    A["Finance user population"] --> B["Finance-tailored page<br/>finance tiles + finance news"]
    C["HR user population"] --> D["HR-tailored page<br/>different tiles + content"]`,
    realProjectExample:
      "A large organization configured three distinct Work Zone page variants — one for finance staff, one for HR, one for general employees — each assigned to the relevant user population and showing genuinely different, function-specific combinations of tiles and content widgets.",
    interviewTip:
      "If asked how you'd avoid a generic, one-size-fits-all Work Zone experience across a diverse organization, describing role/population-based page assignment shows practical personalization design thinking.",
    followupQuestions: [
      "How granular can this page personalization go — down to individual users, or just broad populations?",
      "Would a user ever belong to multiple populations, and how would that be resolved?",
      "How would you maintain multiple page variants without duplicating a lot of shared configuration?",
    ],
    commonMistakes: [
      "Assuming Work Zone must show one identical generic page to every user regardless of role or department.",
      "Not knowing page-level personalization by user population is a genuine, supported capability.",
    ],
    importantPoints: [
      "Work Zone supports different page configurations for different user populations.",
      "Personalization extends beyond individual tile visibility to the whole page's tile/widget combination.",
      "Enables a genuinely tailored experience per department/role rather than one generic page for everyone.",
    ],
    revisionNotes: "Work Zone supports role/population-based page assignment — different user groups get different page configurations (tiles + widgets tailored to their function), not one generic page for everyone.",
  },
  {
    id: "build-q20",
    topic: "Work Zone",
    prompt: "What governance would you want around who can post to a company-wide news feed widget on the Work Zone home page?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["work-zone", "content-governance"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Restrict posting permissions to a designated set of authorized content owners (like corporate communications or HR), rather than leaving it open to any employee, to prevent an unmanaged, potentially inappropriate or noisy news feed that undermines the widget's value as a trusted company-wide information channel.",
    detailedAnswer:
      "A news feed widget visible company-wide on everyone's home page is a meaningful communication channel, and leaving posting permissions open to any employee risks it becoming cluttered with low-value, inconsistent, or even inappropriate content that undermines its usefulness and trustworthiness as an official channel. Sensible governance restricts posting to a designated, limited set of authorized content owners — typically corporate communications, HR, or a similar function responsible for official company-wide announcements — while still allowing regular employees to view but not post. This keeps the widget's signal-to-noise ratio high and preserves its value as a genuinely reliable source of important company information, rather than becoming an unmoderated general bulletin board.",
    hindiExplanation:
      "Ek news feed widget company-wide visible everyone ke home page pe ek meaningful communication channel hai, aur posting permissions ko kisi bhi employee ke liye open chhodna risk uthata hai ki wo cluttered ho jaaye low-value, inconsistent, ya even inappropriate content se jo uski usefulness aur trustworthiness ko undermine kare ek official channel ki tarah. Sensible governance posting ko ek designated, limited set of authorized content owners tak restrict karta hai — typically corporate communications, HR, ya ek similar function jo official company-wide announcements ke liye responsible hai — jabki regular employees ko view karne dena lekin post nahi karne dena.",
    interviewExplanation:
      "I'd recommend restricted posting permissions: 'A company-wide news feed is a meaningful communication channel, and leaving posting open to everyone risks it becoming cluttered with low-value or inconsistent content, undermining its trustworthiness. I'd restrict posting to a designated set of authorized content owners — corporate comms or HR — while regular employees can view but not post, keeping the signal-to-noise ratio high and preserving it as a genuinely reliable official channel.'",
    diagramNote:
      "'Open posting (any employee)' → 'Risk: cluttered, inconsistent, low-trust feed' vs 'Restricted posting (designated content owners like corporate comms/HR)' → 'Employees view only — high signal, trusted official channel'.",
    diagramMermaid: `flowchart LR
    A["Open posting: any employee"] --> B["Risk: cluttered,<br/>low-trust feed"]
    C["Restricted posting:<br/>designated content owners"] --> D["Employees view only —<br/>trusted official channel"]`,
    realProjectExample:
      "An initial open-posting news feed quickly filled with informal, low-value posts from various employees before governance was tightened to restrict posting to corporate communications alone, immediately improving the feed's perceived value and trustworthiness as an official company channel.",
    interviewTip:
      "If asked to identify a governance gap in a Work Zone rollout, naming unrestricted news-feed posting permissions specifically (rather than a vague 'governance is important') shows concrete, practical content-governance awareness.",
    followupQuestions: [
      "Would you allow department-specific news feeds with their own designated posters, in addition to a company-wide one?",
      "How would you handle a request from a non-authorized employee wanting to share something company-wide?",
      "What moderation process would you want for content posted even by authorized owners?",
    ],
    commonMistakes: [
      "Leaving news feed posting permissions open to every employee without any content governance.",
      "Not considering how unrestricted posting undermines the feed's value as a trusted communication channel.",
    ],
    importantPoints: [
      "A company-wide news feed's posting permissions should be restricted to designated content owners.",
      "Open posting to all employees risks cluttering the feed and undermining its trustworthiness.",
      "Regular employees should typically view but not post, preserving signal-to-noise ratio.",
    ],
    revisionNotes: "Restrict company-wide news feed posting to designated content owners (corporate comms/HR) — open posting to all employees undermines trust/signal-to-noise as an official channel.",
  },
];

export const sapBuildMcqs: BtpMcq[] = [
  {
    id: "build-mcq1",
    topic: "Build Apps",
    prompt: "Who is the primary target user of SAP Build Apps?",
    options: [
      "Only professional CAP/UI5 developers",
      "Citizen developers/business users building apps visually with low-code tools",
      "Database administrators only",
      "Kubernetes cluster operators",
    ],
    correctIndex: 1,
    explanation: "SAP Build Apps targets citizen developers and business analysts who build functional apps by configuring visual components, trading some flexibility for speed.",
  },
  {
    id: "build-mcq2",
    topic: "Process Automation",
    prompt: "What's the difference between a workflow step and an automation step in Process Automation?",
    options: [
      "They are identical",
      "A workflow step pauses for human decision/input; an automation step is fully machine-executed",
      "Automation steps always come first",
      "Workflow steps can't include approvals",
    ],
    correctIndex: 1,
    explanation: "Workflow steps require a human to act (e.g. approve a task); automation steps run without any human involvement (e.g. calling an API or extracting document data).",
  },
  {
    id: "build-mcq3",
    topic: "Work Zone",
    prompt: "What is SAP Build Work Zone built on top of?",
    options: [
      "A standalone database",
      "The Launchpad service, adding a broader digital workplace experience",
      "SAP Build Process Automation",
      "It's completely independent of any other BTP service",
    ],
    correctIndex: 1,
    explanation: "Work Zone builds a full digital workplace product (customizable pages, widgets, external integrations) on top of the Launchpad service's underlying tile/catalog/intent-navigation foundation.",
  },
  {
    id: "build-mcq4",
    topic: "Business Rules",
    prompt: "What's the main benefit of using Business Rules instead of hard-coding a business decision in application code?",
    options: [
      "It makes the application run faster",
      "Business users can adjust the rule without a developer changing and redeploying code",
      "It removes the need for any testing",
      "It automatically translates the app into other languages",
    ],
    correctIndex: 1,
    explanation: "Business Rules externalizes decision logic into a rules repository business users can adjust directly, decoupling policy changes from application deployment cycles.",
  },
  {
    id: "build-mcq5",
    topic: "Build Apps",
    prompt: "Can SAP Build Apps connect to real backend data sources like a CAP-based OData service?",
    options: [
      "No, it only works with manually-entered dummy data",
      "Yes, via configurable data connectors to REST/OData services including CAP-based ones",
      "Only if the backend is written in Python",
      "Only for read-only data, never for writes",
    ],
    correctIndex: 1,
    explanation: "SAP Build Apps supports data connector configuration letting a visually-built app read/write real backend data, including CAP-exposed OData services, without hand-written integration code.",
  },
  {
    id: "build-mcq6",
    topic: "Process Automation",
    prompt: "What should you configure to prevent a process from silently stalling if an assigned approver is unavailable?",
    options: [
      "Nothing, this cannot happen",
      "A deadline on the workflow task with a defined escalation action (reassign/escalate/remind)",
      "A faster network connection",
      "Removing the workflow step entirely",
    ],
    correctIndex: 1,
    explanation: "Configuring a deadline with escalation behavior (reassignment, manager escalation, or reminders) prevents a process from stalling indefinitely on an unavailable approver.",
  },
  {
    id: "build-mcq7",
    topic: "Work Zone",
    prompt: "Should every BTP customer adopt Work Zone instead of the plain Launchpad service?",
    options: [
      "Yes, always, since it's the more feature-rich option",
      "No — the plain Launchpad service is sufficient if the need is just launching Fiori apps from tiles",
      "No, Work Zone has been deprecated",
      "Yes, but only for customers in Europe",
    ],
    correctIndex: 1,
    explanation: "The decision should be need-driven: the plain Launchpad service is fully sufficient for simple app-launching needs, while Work Zone's added investment is justified by a genuine need for its broader digital workplace features.",
  },
  {
    id: "build-mcq8",
    topic: "Business Rules",
    prompt: "Why is a decision table often clearer than deeply nested if/else code for representing business logic?",
    options: [
      "Decision tables run faster at execution time",
      "Laying conditions as columns and combinations as rows makes coverage/consistency easy to verify at a glance",
      "Decision tables eliminate the need for any testing",
      "There's no real difference, it's just a stylistic preference",
    ],
    correctIndex: 1,
    explanation: "A decision table's tabular format lets a reviewer scan for coverage completeness and consistency across all condition combinations, which is much harder to verify in deeply nested conditional code.",
  },
];
