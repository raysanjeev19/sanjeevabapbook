import type { BtpMcq, BtpQuestion } from "@/lib/btp-content";

/** Section 9 — Integration Suite. Interview questions, full format. */
export const integrationSuiteQuestions: BtpQuestion[] = [
  {
    id: "is-q1",
    topic: "Cloud Integration",
    prompt: "What is SAP Cloud Integration, and what is an Integration Flow (iFlow)?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["cloud-integration", "iflow"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Cloud Integration is Integration Suite's runtime for building and executing message-based integration scenarios between systems; an Integration Flow (iFlow) is the graphical, step-by-step definition of one such scenario — receiver, message processing steps (mapping, routing, enrichment), and sender.",
    detailedAnswer:
      "Rather than writing custom point-to-point integration code between every pair of systems, Cloud Integration lets you model an integration scenario visually as an iFlow — a sequence of steps a message flows through: a sender adapter receiving the inbound message, processing steps like content modification, mapping, or routing based on conditions, calling external systems if needed, and a receiver adapter delivering the result. This graphical, declarative approach means integration logic is visible and maintainable without every scenario becoming custom-coded middleware, and Cloud Integration provides a large library of pre-built adapters (HTTP, SOAP, IDoc, OData, and many more) so most connectivity doesn't need custom code either.",
    hindiExplanation:
      "Har pair of systems ke beech custom point-to-point integration code likhne ki jagah, Cloud Integration tumhe ek integration scenario ko visually ek iFlow ki tarah model karne deta hai — steps ki ek sequence jisse ek message guzarta hai: sender adapter inbound message receive karta hai, processing steps (content modification, mapping, routing conditions ke aadhar pe), zaroorat pade toh external systems ko call karna, aur receiver adapter result deliver karta hai. Ye graphical, declarative approach ka matlab hai integration logic visible aur maintainable hai bina har scenario ko custom-coded middleware banaye, aur Cloud Integration adapters ki ek badi library deta hai (HTTP, SOAP, IDoc, OData, aur kai aur) taaki zyada tar connectivity ke liye custom code ki zaroorat na pade.",
    interviewExplanation:
      "I'd describe the value proposition: 'Cloud Integration is Integration Suite's message-based integration runtime. An iFlow is the graphical, step-by-step definition of one scenario — a sender adapter, processing steps like mapping and routing, and a receiver adapter. Modeling this visually with pre-built adapters means most integration logic is declarative and maintainable, not custom-coded middleware.'",
    diagramNote:
      "iFlow diagram: 'Sender Adapter' → 'Content Modifier' → 'Mapping' → 'Router (conditional branches)' → 'Receiver Adapter', a linear graphical pipeline.",
    diagramMermaid: `flowchart LR
    A["Sender Adapter"] --> B["Content Modifier"] --> C["Mapping"] --> D["Router<br/>conditional branches"] --> E["Receiver Adapter"]`,
    realProjectExample:
      "An iFlow received an inbound OData request, mapped it to the target system's expected IDoc format, routed based on a document type field, and delivered it via an IDoc adapter — all configured graphically without a line of custom integration code.",
    interviewTip:
      "If asked to describe a real iFlow you've built, walking through the actual steps (sender → processing → receiver) in order demonstrates hands-on familiarity beyond textbook definitions.",
    followupQuestions: [
      "What is a Content Modifier step used for?",
      "Name a few adapter types Cloud Integration supports.",
      "How would you test an iFlow before deploying it to production?",
    ],
    commonMistakes: [
      "Describing Cloud Integration as just 'a place to write integration code' rather than a graphical, declarative modeling tool.",
      "Not knowing iFlows include both processing logic and the sender/receiver adapter configuration.",
    ],
    importantPoints: [
      "Cloud Integration = message-based integration runtime.",
      "iFlow = graphical, step-by-step definition of one integration scenario.",
      "Large adapter library reduces need for custom connectivity code.",
    ],
    revisionNotes: "Cloud Integration = integration runtime. iFlow = graphical scenario definition (sender adapter → processing steps → receiver adapter).",
  },
  {
    id: "is-q2",
    topic: "Cloud Integration",
    prompt: "What is a Content Modifier step in an iFlow used for?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["cloud-integration", "content-modifier"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A Content Modifier lets you set, read, or transform message headers, properties, and the message body itself at a specific point in the flow — commonly used to enrich a message with extra data, set routing-relevant properties, or reshape the payload without a full mapping step.",
    detailedAnswer:
      "It's one of the most frequently used steps because integration scenarios constantly need small adjustments that don't warrant a full graphical/XSLT mapping — extracting a value from the message body into a header for later routing decisions, setting a static value needed by a downstream system, or combining several pieces of data into the body. Content Modifiers operate on three things: message headers (metadata used within the flow, not sent externally by default), exchange properties (similar, scoped to the flow's processing), and the body itself, giving fine, surgical control at any point without needing a heavier transformation step.",
    hindiExplanation:
      "Ye sabse zyada use hone wale steps mein se ek hai kyunki integration scenarios ko baar-baar chhote adjustments chahiye hote hain jo poori graphical/XSLT mapping ki zaroorat nahi rakhte — message body se ek value nikaal kar header mein daalna baad ki routing decisions ke liye, ek static value set karna jo downstream system ko chahiye, ya kai pieces of data ko body mein combine karna. Content Modifiers teen cheezon pe operate karte hain: message headers (flow ke andar use hone wala metadata, by default externally nahi bhejta), exchange properties (similar, flow ke processing tak scoped), aur body khud, jisse kisi bhi point pe fine, surgical control milta hai.",
    interviewExplanation:
      "I'd describe it as a lightweight, surgical tool: 'A Content Modifier sets, reads, or transforms headers, properties, and the message body at a specific point in the flow — for things like extracting a value into a header for routing, or setting a static value a downstream system needs, without needing a full mapping step for small adjustments.'",
    diagramNote:
      "Content Modifier box operating on three lanes: 'Headers (in-flow metadata)', 'Exchange Properties (flow-scoped)', 'Body (payload)' — small surgical edits at a specific flow point.",
    diagramMermaid: `flowchart TD
    CM["Content Modifier"] --> H["Headers<br/>in-flow metadata"]
    CM --> P["Exchange Properties<br/>flow-scoped"]
    CM --> B["Body<br/>payload"]`,
    realProjectExample:
      "A Content Modifier extracted a document-type field from an inbound message body into a header, which a downstream Router step then used to decide between two different processing branches — no full mapping needed for that decision.",
    interviewTip:
      "Mentioning the header-vs-property-vs-body distinction specifically shows you understand the Content Modifier's actual configuration options, not just 'it changes the message somehow'.",
    followupQuestions: [
      "What's the difference between a header and an exchange property in an iFlow?",
      "When would you use a full mapping step instead of a Content Modifier?",
      "Can a Content Modifier call an external system?",
    ],
    commonMistakes: [
      "Using a full mapping step for a trivial single-field change that a Content Modifier would handle more simply.",
      "Not knowing headers/properties are scoped to the flow's processing, not automatically sent externally.",
    ],
    importantPoints: [
      "Content Modifier = lightweight tool for setting/reading headers, properties, body.",
      "Used for enrichment, routing prep, or small payload adjustments.",
      "Distinct from a full graphical/XSLT mapping step, which is heavier-weight.",
    ],
    revisionNotes: "Content Modifier = set/read headers, properties, body at a specific flow point — for enrichment/routing prep, lighter than a full mapping.",
  },
  {
    id: "is-q3",
    topic: "API Management",
    prompt: "What does API Management add on top of an existing backend API, and why not just expose the backend directly?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["api-management", "api-proxy"],
    estimatedMinutes: 3,
    expectedAnswer:
      "API Management sits in front of a backend as a managed API proxy, adding rate limiting, API key/OAuth enforcement, request/response transformation, analytics, and a developer-facing catalog — capabilities the backend itself typically doesn't provide, without modifying the backend at all.",
    detailedAnswer:
      "Exposing a backend directly means every consumer hits it with unrestricted traffic (no rate limiting to protect it from abuse or accidental overload), no unified API key/OAuth policy layer, no visibility into who's calling what and how often, and no easy way to reshape the request/response format for different consumer needs without changing the backend itself. API Management inserts a proxy layer in front, where you configure policies (rate limits, quota, API key validation, spike arrest, request/response transformation) declaratively, publish the API in a developer portal/catalog for discovery, and get analytics on usage — all without touching the backend's own code, and reversible/adjustable independently of backend deployments.",
    hindiExplanation:
      "Backend ko directly expose karna matlab har consumer usse unrestricted traffic se hit karta hai (koi rate limiting nahi jo abuse ya accidental overload se bachaye), koi unified API key/OAuth policy layer nahi, kaun kya aur kitni baar call kar raha hai iski koi visibility nahi, aur request/response format ko different consumer needs ke liye reshape karne ka koi aasan tarika nahi bina backend khud change kiye. API Management ek proxy layer aage insert karta hai, jaha tum policies (rate limits, quota, API key validation, spike arrest, request/response transformation) declaratively configure karte ho, API ko ek developer portal/catalog mein publish karte ho discovery ke liye, aur usage analytics milti hai — sab kuch backend ke apne code ko touch kiye bina.",
    interviewExplanation:
      "I'd list the concrete capabilities: 'API Management adds a proxy layer in front of the backend — rate limiting, API key/OAuth enforcement, request/response transformation, a developer catalog, and analytics — all configured declaratively, without touching the backend's own code. Exposing the backend directly means none of that protection or visibility exists.'",
    diagramNote:
      "'Consumer' → 'API Management proxy (rate limit, auth, transform, analytics)' → 'Backend API (unchanged)'.",
    diagramMermaid: `flowchart LR
    A["Consumer"] --> B["API Management proxy<br/>rate limit, auth, transform, analytics"]
    B --> C["Backend API (unchanged)"]`,
    realProjectExample:
      "Adding a rate-limiting policy in API Management protected a backend from an integration partner's misconfigured client that was accidentally hammering it with requests, without needing any emergency backend code change.",
    interviewTip:
      "If asked 'why not just add rate limiting in the backend code itself', the API Management answer is centralization and reversibility — policy changes don't require a backend redeploy, and apply consistently across every API the platform fronts.",
    followupQuestions: [
      "What is 'spike arrest' as an API Management policy?",
      "How does a developer portal/catalog help external API consumers?",
      "Can API Management transform a request before it reaches the backend?",
    ],
    commonMistakes: [
      "Thinking API Management is redundant if the backend already has some basic auth.",
      "Not knowing policies are configured declaratively and independently of backend deployments.",
    ],
    importantPoints: [
      "API Management = proxy layer adding rate limiting, auth enforcement, transformation, analytics.",
      "Backend itself is untouched — policies are configured/adjusted independently.",
      "Also provides a developer portal/catalog for API discovery.",
    ],
    revisionNotes: "API Management = proxy in front of backend (rate limit, auth, transform, analytics, catalog) — backend code untouched, policies adjustable independently.",
  },
  {
    id: "is-q4",
    topic: "Open Connectors",
    prompt: "What problem do Open Connectors solve that a custom-built iFlow adapter wouldn't easily solve?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["open-connectors", "saas-integration"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Open Connectors provide a large catalog of pre-built, ready-to-use connectors to popular non-SAP SaaS applications (Salesforce, Workday, many others) with a normalized API interface, so you don't have to hand-build and maintain a custom adapter and authentication flow for every third-party SaaS system individually.",
    detailedAnswer:
      "Every third-party SaaS system has its own API quirks, authentication mechanism (OAuth variants, API keys), pagination style, and rate limits — building and maintaining a custom connector for each one individually across dozens of SaaS integrations is significant, repetitive engineering effort. Open Connectors instead offers a large library (hundreds) of pre-built connectors already handling each target system's specific API and auth details, exposed through a consistent, normalized REST interface — so integration developers work with one predictable pattern rather than relearning each SaaS system's specific API peculiarities, and get vendor API changes absorbed by the connector catalog's maintenance rather than needing to update custom code themselves.",
    hindiExplanation:
      "Har third-party SaaS system ke apne API quirks, authentication mechanism (OAuth variants, API keys), pagination style, aur rate limits hote hain — dozens SaaS integrations ke liye har ek ke liye custom connector individually banana aur maintain karna significant, repetitive engineering effort hai. Open Connectors iske bajaye ek badi library (sainkdo) pre-built connectors deta hai jo har target system ke specific API/auth details already handle karte hain, ek consistent, normalized REST interface ke through expose hote hain — isliye integration developers ek predictable pattern pe kaam karte hain, har SaaS system ke specific API peculiarities dobara seekhne ki jagah.",
    interviewExplanation:
      "I'd focus on the maintenance-avoidance benefit: 'Every SaaS system has its own API quirks, auth mechanism, and pagination style. Building a custom connector for each one is significant, repetitive effort. Open Connectors offers hundreds of pre-built connectors already handling that, exposed through one normalized REST interface — vendor API changes get absorbed by the connector's own maintenance, not something I have to update myself.'",
    diagramNote:
      "'Salesforce API (custom quirks)', 'Workday API (custom quirks)', 'Other SaaS (custom quirks)' all normalized through 'Open Connectors' into one consistent REST interface for the integration developer.",
    diagramMermaid: `flowchart LR
    A["Salesforce API"] --> N["Open Connectors<br/>normalized REST interface"]
    B["Workday API"] --> N
    C["Other SaaS APIs"] --> N
    N --> D["Integration developer<br/>one consistent pattern"]`,
    realProjectExample:
      "Instead of hand-building an OAuth flow and custom pagination handling for a CRM integration, using its pre-built Open Connector gave us a working connection within an hour, with the vendor's own API version upgrades handled transparently by the connector's ongoing maintenance.",
    interviewTip:
      "If asked when you'd still build a custom iFlow adapter instead, the answer is when integrating with an internal or niche system with no pre-built connector available — Open Connectors specifically targets popular, common SaaS systems.",
    followupQuestions: [
      "How does Open Connectors expose its normalized interface to integration flows?",
      "What happens if a target SaaS vendor changes their API — who maintains the connector?",
      "When would you still build a custom adapter instead of using Open Connectors?",
    ],
    commonMistakes: [
      "Not knowing Open Connectors specifically targets common third-party SaaS systems, not internal/custom ones.",
      "Underestimating the maintenance burden of hand-building connectors for many different SaaS APIs.",
    ],
    importantPoints: [
      "Open Connectors = large catalog of pre-built connectors to popular SaaS systems.",
      "Normalizes different vendor APIs into one consistent REST interface.",
      "Vendor API changes are absorbed by connector maintenance, not custom code updates.",
    ],
    revisionNotes: "Open Connectors = pre-built connectors to popular SaaS (Salesforce, Workday, etc.), normalized REST interface — avoids hand-building/maintaining custom adapters per vendor.",
  },
  {
    id: "is-q5",
    topic: "Integration Advisor",
    prompt: "What is Integration Advisor, and how does it help with B2B message mapping specifically?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["integration-advisor", "mapping"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Integration Advisor is a machine-learning-assisted tool for defining and maintaining B2B message mappings (like EDI to a custom XML format) — it suggests mappings based on a large community-shared knowledge base of prior mappings, dramatically speeding up what's traditionally a slow, manual, expert-heavy task.",
    detailedAnswer:
      "B2B message mapping — translating between a standard format like EDI (with its many industry variants) and a company's internal message format — has traditionally required deep format-specific expertise and a lot of manual field-by-field mapping work, especially since B2B message standards can be complex and have many optional/conditional segments. Integration Advisor maintains a Message Implementation Guideline (MIG) describing your specific message structure, and when you map it against a standard type, it suggests likely field mappings drawn from a shared, crowd-sourced knowledge base of similar mappings other users have made — accelerating the mapping process significantly and reducing dependency on scarce format-specific expert knowledge for every single new trading partner relationship.",
    hindiExplanation:
      "B2B message mapping — jaise EDI (jiske kai industry variants hain) aur company ke internal message format ke beech translate karna — traditionally deep format-specific expertise aur bahut sara manual field-by-field mapping work chahta tha, khaaskar kyunki B2B message standards complex ho sakte hain aur unme kai optional/conditional segments hote hain. Integration Advisor ek Message Implementation Guideline (MIG) maintain karta hai jo tumhare specific message structure ko describe karta hai, aur jab tum use ek standard type ke against map karte ho, ye likely field mappings suggest karta hai ek shared, crowd-sourced knowledge base se jo doosre users ne similar mappings banaye hain — mapping process ko significantly speed up karta hai.",
    interviewExplanation:
      "I'd emphasize the speed and knowledge-sharing angle: 'B2B mapping traditionally needs deep format-specific expertise and a lot of manual field-by-field work. Integration Advisor maintains a Message Implementation Guideline for your structure and suggests likely mappings drawn from a shared, crowd-sourced knowledge base of similar mappings others have made — dramatically speeding up what used to be a slow, expert-heavy manual task.'",
    diagramNote:
      "'Your Message Implementation Guideline (MIG)' + 'Standard type (e.g. EDI variant)' → 'Integration Advisor suggests mappings from crowd-sourced knowledge base' → 'Faster, less expert-dependent mapping'.",
    diagramMermaid: `flowchart LR
    A["Your Message<br/>Implementation Guideline (MIG)"] --> C["Integration Advisor"]
    B["Standard type<br/>e.g. EDI variant"] --> C
    C --> D["Suggests mappings from<br/>crowd-sourced knowledge base"]`,
    realProjectExample:
      "Onboarding a new EDI trading partner using Integration Advisor's suggested mappings cut the initial mapping effort dramatically compared to a previous manual mapping project for a similar document type that had no assisted suggestions to draw from.",
    interviewTip:
      "Mentioning the 'crowd-sourced/shared knowledge base' aspect specifically is what distinguishes Integration Advisor from a plain mapping tool — it's the machine-learning-assisted suggestion feature that's the actual differentiator.",
    followupQuestions: [
      "What is a Message Implementation Guideline (MIG)?",
      "Does Integration Advisor replace the need for any manual review of suggested mappings?",
      "How does Integration Advisor relate to Trading Partner Management?",
    ],
    commonMistakes: [
      "Describing Integration Advisor as just a generic mapping tool without mentioning the ML-assisted suggestion feature.",
      "Not knowing it's specifically aimed at B2B/EDI-style mapping scenarios.",
    ],
    importantPoints: [
      "Integration Advisor = ML-assisted B2B message mapping tool.",
      "Suggests mappings from a shared, crowd-sourced knowledge base.",
      "Dramatically speeds up traditionally slow, expert-heavy EDI/B2B mapping work.",
    ],
    revisionNotes: "Integration Advisor = ML-assisted B2B mapping suggestions from a shared knowledge base — speeds up traditionally slow, expert-heavy EDI mapping.",
  },
  {
    id: "is-q6",
    topic: "Trading Partner Management",
    prompt: "What does Trading Partner Management handle in a B2B integration scenario?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["trading-partner-management", "b2b"],
    estimatedMinutes: 2,
    expectedAnswer:
      "It centrally manages the master data about each B2B trading partner — their specific identifiers, communication endpoints, protocol/format preferences, and agreements — so integration flows reference a partner profile rather than hard-coding partner-specific details into every scenario.",
    detailedAnswer:
      "A company might exchange EDI documents with dozens or hundreds of trading partners, each potentially using slightly different identifiers, communication protocols (AS2, SFTP, OFTP2), or message format variants. Trading Partner Management centralizes each partner's profile — their identifiers, connection details, agreed document types and versions — as reusable master data, so an integration flow processing, say, a purchase order doesn't need partner-specific logic hard-coded in; it looks up the relevant partner's configuration dynamically. This makes onboarding a new partner primarily a configuration/master-data task rather than requiring changes to the integration logic itself.",
    hindiExplanation:
      "Ek company dozens ya sainkdo trading partners ke saath EDI documents exchange kar sakti hai, har ek potentially thode alag identifiers, communication protocols (AS2, SFTP, OFTP2), ya message format variants use karte hue. Trading Partner Management har partner ka profile centrally manage karta hai — unke identifiers, connection details, agreed document types aur versions — reusable master data ki tarah, taaki ek integration flow (jaise ek purchase order process karna) mein partner-specific logic hard-coded na ho; wo dynamically relevant partner ki configuration lookup karta hai. Isse naya partner onboard karna mainly ek configuration/master-data task ban jaata hai, integration logic mein changes karne ki jagah.",
    interviewExplanation:
      "I'd frame it as master data centralization: 'Trading Partner Management centralizes each partner's identifiers, connection details, and agreed document types as reusable master data. An integration flow looks up the relevant partner's config dynamically rather than hard-coding partner-specific logic, which means onboarding a new partner is primarily a configuration task, not a change to the integration logic itself.'",
    diagramNote:
      "'Trading Partner Management (master data: Partner A, Partner B, Partner C profiles)' feeding into 'One generic integration flow' that looks up the relevant partner profile dynamically, rather than having partner-specific hard-coded logic.",
    diagramMermaid: `flowchart LR
    TPM["Trading Partner Management<br/>Partner A/B/C profiles"] --> IF["One generic integration flow<br/>looks up partner config dynamically"]`,
    realProjectExample:
      "Onboarding the fiftieth EDI trading partner took just a few hours of master-data configuration in Trading Partner Management — the same generic purchase-order integration flow handled it without any code changes, since it always looked up partner-specific details dynamically.",
    interviewTip:
      "If asked 'how would you onboard a new trading partner', the strong answer centers on configuring their profile in Trading Partner Management, not modifying integration flow logic — that's the whole point of the design.",
    followupQuestions: [
      "What kind of details does a trading partner profile typically include?",
      "How does an integration flow actually look up a partner's configuration at runtime?",
      "How does this relate to Integration Advisor's mapping suggestions?",
    ],
    commonMistakes: [
      "Suggesting integration flow logic itself needs to change to onboard each new partner.",
      "Not knowing trading partner details are managed as centralized master data.",
    ],
    importantPoints: [
      "Centralizes trading partner master data (identifiers, connections, agreed formats).",
      "Integration flows look up partner config dynamically, not hard-coded per partner.",
      "New partner onboarding becomes a configuration task, not an integration logic change.",
    ],
    revisionNotes: "Trading Partner Management = centralized partner master data (identifiers/connections/formats) — new partner onboarding = config, not integration logic change.",
  },
  {
    id: "is-q7",
    topic: "EDI",
    prompt: "What is EDI, and why does it still matter in modern integration scenarios despite newer formats like JSON/REST existing?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["edi", "b2b"],
    estimatedMinutes: 2,
    expectedAnswer:
      "EDI (Electronic Data Interchange) is a family of standardized, structured document formats (like X12, EDIFACT) for exchanging business documents (purchase orders, invoices) between organizations; it remains dominant in many industries (retail, logistics, automotive) because those industries and their trading partner networks have decades of established EDI infrastructure that's costly and slow to replace wholesale.",
    detailedAnswer:
      "EDI predates modern web APIs by decades and defines rigorous, standardized structures for common business documents so any two organizations using the same EDI standard and version can exchange documents predictably. While REST/JSON APIs are more modern and often easier to work with for new integrations, EDI remains deeply entrenched in industries like retail, automotive, and logistics specifically because switching an entire trading partner network (potentially hundreds of partners, each with their own IT constraints and priorities) to a new format is a massive, slow, expensive coordination problem — far bigger than a single company's internal preference. In practice, integration platforms need to speak both fluently, translating between modern internal systems and EDI-based external trading partners.",
    hindiExplanation:
      "EDI modern web APIs se dashकों pehle se hai aur common business documents (purchase orders, invoices) ke liye rigorous, standardized structures define karta hai taaki koi bhi do organizations jo same EDI standard/version use karti hain, predictably documents exchange kar sakein. REST/JSON APIs zyada modern aur aksar naye integrations ke liye kaam karna aasan hote hain, lekin EDI industries jaise retail, automotive, logistics mein deeply entrenched hai specifically kyunki poore trading partner network ko (potentially sainkdo partners, har ek ki apni IT constraints) naye format pe switch karna ek massive, slow, expensive coordination problem hai — ek single company ki internal preference se kahin bada. Practically, integration platforms ko dono fluently bolna padta hai.",
    interviewExplanation:
      "I'd explain the entrenchment reason: 'EDI defines standardized structures for business documents, predating modern APIs. It remains dominant in industries like retail and automotive because switching an entire trading partner network — potentially hundreds of partners with their own IT priorities — to a new format is a massive coordination problem, not just one company's technical choice. In practice, integration platforms need to translate between modern internal systems and EDI-based external partners.'",
    diagramNote:
      "'Modern internal system (JSON/REST)' <--> 'Integration platform (translates)' <--> 'EDI-based trading partner network (X12/EDIFACT)' — showing the translation role integration plays.",
    diagramMermaid: `flowchart LR
    A["Modern internal system<br/>JSON/REST"] <--> B["Integration platform<br/>translates"] <--> C["EDI trading partner network<br/>X12/EDIFACT"]`,
    realProjectExample:
      "A retail client's internal systems were fully modern JSON/REST-based, but every one of their supplier relationships still ran on EDI X12 — Integration Suite's EDI capabilities bridged this gap without requiring the client (or their hundred-plus suppliers) to migrate off EDI at all.",
    interviewTip:
      "If asked 'why not just get everyone to switch to modern APIs', the correct answer acknowledges the real-world coordination cost across an entire trading partner network — it's rarely a purely technical decision.",
    followupQuestions: [
      "Name a common EDI standard and where it's typically used.",
      "How does an integration platform typically translate between EDI and JSON/REST?",
      "What industries still rely heavily on EDI today?",
    ],
    commonMistakes: [
      "Assuming EDI is simply obsolete and should always be replaced with modern APIs.",
      "Not understanding the trading-partner-network coordination cost as the real reason EDI persists.",
    ],
    importantPoints: [
      "EDI = standardized document formats (X12, EDIFACT) for B2B document exchange.",
      "Remains dominant in retail, automotive, logistics due to entrenched partner networks.",
      "Integration platforms bridge EDI and modern formats rather than forcing a wholesale switch.",
    ],
    revisionNotes: "EDI = standardized B2B document formats (X12/EDIFACT), still dominant in retail/automotive/logistics due to trading-partner-network switching costs — integration platforms bridge EDI and modern APIs.",
  },
  {
    id: "is-q8",
    topic: "Mapping",
    prompt: "What's the difference between a graphical message mapping and an XSLT-based mapping in Cloud Integration?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["mapping", "xslt"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A graphical mapping lets you draw field-to-field connections and use built-in functions visually, generating the transformation automatically — faster and more approachable; an XSLT mapping is hand-written transformation code, giving full control for complex logic the graphical tool can't easily express.",
    detailedAnswer:
      "For straightforward field renames, simple concatenations, or basic conditional logic, the graphical mapping editor lets you visually connect source fields to target fields and apply built-in functions (string manipulation, date formatting, lookups) without writing code — fast to build and easy for others to understand at a glance. For genuinely complex transformation logic — deeply nested conditional structures, complex looping/grouping logic, or transformations the graphical tool's function library simply doesn't support — you'd write a custom XSLT (or Java) mapping instead, trading the visual approachability for complete control over the transformation logic. Most real projects use graphical mapping for the majority of straightforward cases and reach for XSLT only where genuinely needed.",
    hindiExplanation:
      "Straightforward field renames, simple concatenations, ya basic conditional logic ke liye, graphical mapping editor tumhe source fields ko target fields se visually connect karne deta hai aur built-in functions (string manipulation, date formatting, lookups) apply karne deta hai bina code likhe — banana fast hai aur doosron ke liye ek nazar mein samajhna aasan. Genuinely complex transformation logic ke liye — deeply nested conditional structures, complex looping/grouping logic, ya aisi transformations jo graphical tool ki function library support hi nahi karti — tum ek custom XSLT (ya Java) mapping likhoge, visual approachability ki jagah transformation logic pe complete control lete hue.",
    interviewExplanation:
      "I'd give the decision criteria: 'Graphical mapping is fast to build and easy to understand at a glance — good for straightforward field renames and basic logic using built-in functions. XSLT mapping is hand-written transformation code, needed for genuinely complex logic — deep nesting, complex grouping — that the graphical tool's function library can't easily express. Most real projects lean graphical by default and reach for XSLT only when actually necessary.'",
    diagramNote:
      "Two paths: 'Simple field mapping/basic logic → graphical mapping (fast, visual)' vs 'Complex nested/grouping logic → XSLT mapping (hand-written, full control)'.",
    diagramMermaid: `flowchart LR
    A["Simple field mapping,<br/>basic logic"] --> B["Graphical mapping<br/>fast, visual"]
    C["Complex nested/<br/>grouping logic"] --> D["XSLT mapping<br/>hand-written, full control"]`,
    realProjectExample:
      "A straightforward field-rename mapping between two similar order formats took minutes graphically, while a complex document requiring conditional grouping of repeating segments based on multiple interacting conditions needed a hand-written XSLT mapping the graphical tool couldn't express cleanly.",
    interviewTip:
      "If asked 'would you always prefer XSLT for full control', the balanced answer is no — graphical mapping's speed and readability make it the right default for the majority of straightforward cases.",
    followupQuestions: [
      "What built-in functions does the graphical mapping editor typically provide?",
      "Can graphical mapping and XSLT be combined within the same iFlow?",
      "What are the maintainability tradeoffs of XSLT versus graphical mapping?",
    ],
    commonMistakes: [
      "Assuming XSLT is always 'better' because it's more powerful, ignoring the readability/speed tradeoff.",
      "Not knowing graphical mapping includes a library of built-in functions for common transformations.",
    ],
    importantPoints: [
      "Graphical mapping: fast, visual, good for straightforward field-level transformations.",
      "XSLT mapping: hand-written, full control, needed for genuinely complex logic.",
      "Most projects default to graphical, reaching for XSLT only when necessary.",
    ],
    revisionNotes: "Graphical mapping = fast/visual, good default. XSLT mapping = hand-written, full control for genuinely complex transformation logic.",
  },
  {
    id: "is-q9",
    topic: "Groovy Scripts",
    prompt: "When would you use a Groovy Script step in an iFlow instead of standard graphical steps?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["groovy-scripts", "custom-logic"],
    estimatedMinutes: 2,
    expectedAnswer:
      "When the required logic is too custom or complex for standard graphical steps to express — custom validation, complex conditional processing, calling a Java library, or manipulating the message in ways no built-in step supports — a Groovy Script step lets you write arbitrary code with full access to the message and its headers/properties.",
    detailedAnswer:
      "Standard iFlow steps (Content Modifier, Router, Mapping) cover the vast majority of common integration patterns declaratively, but sometimes you need something genuinely custom — complex business validation logic, calling out to a Java library for specialized processing, intricate string/data manipulation beyond what built-in functions support, or conditional logic too elaborate for a simple Router. A Groovy Script step gives you a full scripting environment with direct access to the message object (body, headers, properties), letting you write arbitrary logic — but it's a step that should be reached for deliberately, since heavy custom scripting scattered throughout an iFlow can undermine the maintainability benefits of the graphical, declarative approach that makes Cloud Integration valuable in the first place.",
    hindiExplanation:
      "Standard iFlow steps (Content Modifier, Router, Mapping) zyada tar common integration patterns ko declaratively cover kar lete hain, lekin kabhi-kabhi tumhe genuinely kuch custom chahiye hota hai — complex business validation logic, ek Java library ko call karna specialized processing ke liye, intricate string/data manipulation jo built-in functions support nahi karte, ya conditional logic jo ek simple Router ke liye bahut elaborate ho. Groovy Script step tumhe ek poora scripting environment deta hai message object (body, headers, properties) tak direct access ke saath, arbitrary logic likhne ke liye — lekin ye ek aisa step hai jise deliberately use karna chahiye, kyunki poore iFlow mein bikhri hui heavy custom scripting graphical, declarative approach ke maintainability fayde ko undermine kar sakti hai.",
    interviewExplanation:
      "I'd give both the use case and the caveat: 'A Groovy Script step is for genuinely custom logic standard steps can't express — complex validation, calling a Java library, or intricate data manipulation. It gives full access to the message and headers/properties. But I'd use it deliberately, not by default — scattering heavy custom scripts throughout an iFlow undermines the maintainability benefit of the graphical, declarative approach in the first place.'",
    diagramNote:
      "Standard graphical steps handle most patterns; a Groovy Script step is reached for specifically when logic is 'too custom for graphical steps' — with a caution note 'use deliberately, not by default'.",
    diagramMermaid: `flowchart LR
    A["Standard graphical steps<br/>Content Modifier, Router, Mapping"] --> B["Handle most patterns"]
    C["Logic too custom<br/>for graphical steps"] --> D["Groovy Script step<br/>full message/header access"]
    D -.-> E["Use deliberately —<br/>don't undermine maintainability"]`,
    realProjectExample:
      "A complex validation rule involving multiple interdependent fields and external lookup logic was implemented as a single, well-documented Groovy Script step, while the rest of the iFlow remained standard graphical steps for maintainability.",
    interviewTip:
      "If asked 'should you use Groovy scripts everywhere for flexibility', the correct nuanced answer is no — use them deliberately for genuinely custom logic, not as a default replacement for standard graphical steps.",
    followupQuestions: [
      "What does a Groovy Script step have access to within the message processing context?",
      "What are the maintainability risks of overusing custom scripts in an iFlow?",
      "Can a Groovy Script call an external Java library?",
    ],
    commonMistakes: [
      "Overusing Groovy scripts as a default instead of standard graphical steps, undermining maintainability.",
      "Not knowing Groovy scripts have full access to the message body, headers, and properties.",
    ],
    importantPoints: [
      "Groovy Script = full scripting access for genuinely custom logic standard steps can't express.",
      "Has access to message body, headers, and exchange properties.",
      "Should be used deliberately, not as a default replacement for graphical steps.",
    ],
    revisionNotes: "Groovy Script step = full custom code access (body/headers/properties) for logic standard steps can't express — use deliberately, not by default.",
  },
  {
    id: "is-q10",
    topic: "Adapters",
    prompt: "How would you choose between the IDoc adapter, the OData adapter, and the HTTP adapter for a given integration scenario?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["adapters", "protocols"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Use the IDoc adapter when integrating with a classic SAP system exchanging IDoc-format documents; the OData adapter when consuming or exposing an OData service (like a CAP/RAP-based API or S/4HANA OData service); and the HTTP adapter for generic REST/HTTP-based systems that don't fit either specific pattern.",
    detailedAnswer:
      "The choice comes down to what the actual system on the other end natively speaks. A classic ECC or S/4HANA system exchanging documents in IDoc format needs the IDoc adapter, which understands IDoc's specific structure and the underlying RFC-based transport. An OData-exposing system (a CAP/RAP service, or S/4HANA's own OData services) is best consumed via the OData adapter, which understands OData's query semantics, metadata, and CRUD conventions natively rather than treating it as generic HTTP. For anything else — a generic REST API, a webhook, a system with no more specific adapter — the HTTP adapter is the flexible, general-purpose fallback that works with any HTTP-based endpoint, at the cost of not understanding any protocol-specific semantics the way a specialized adapter would.",
    hindiExplanation:
      "Choice is decide hota hai us par ki actual system dusri taraf kya natively bolta hai. Ek classic ECC ya S/4HANA system jo IDoc format mein documents exchange karta hai, use IDoc adapter chahiye, jo IDoc ki specific structure aur underlying RFC-based transport samajhta hai. Ek OData-exposing system (CAP/RAP service, ya S/4HANA ki apni OData services) best OData adapter se consume hoti hai, jo OData ke query semantics, metadata, aur CRUD conventions natively samajhta hai, generic HTTP ki tarah treat karne ki jagah. Baaki kisi bhi cheez ke liye — generic REST API, webhook, koi system jiske liye koi specific adapter na ho — HTTP adapter flexible, general-purpose fallback hai jo kisi bhi HTTP-based endpoint ke saath kaam karta hai.",
    interviewExplanation:
      "I'd give the decision rule by what the other system speaks: 'IDoc adapter for a classic SAP system exchanging IDoc documents. OData adapter for consuming or exposing an OData service — like a CAP app or S/4HANA's OData APIs — since it understands OData semantics natively. HTTP adapter is the general-purpose fallback for anything else that's just plain REST/HTTP with no more specific adapter available.'",
    diagramNote:
      "Decision tree: 'What does the other system speak?' → 'IDoc → IDoc adapter' / 'OData → OData adapter' / 'Generic REST/HTTP → HTTP adapter'.",
    diagramMermaid: `flowchart TD
    A["What does the other<br/>system speak?"] --> B["IDoc → IDoc adapter"]
    A --> C["OData → OData adapter"]
    A --> D["Generic REST/HTTP → HTTP adapter"]`,
    realProjectExample:
      "Integrating with a legacy ECC system used the IDoc adapter for classic document exchange, while a newer CAP-based microservice in the same landscape was integrated via the OData adapter, correctly leveraging its native query capabilities rather than treating it as generic HTTP.",
    interviewTip:
      "If asked 'why not just always use the HTTP adapter for everything', the answer is that specialized adapters understand protocol-specific semantics (IDoc structure, OData query/metadata conventions) that the generic HTTP adapter would miss or require you to hand-implement yourself.",
    followupQuestions: [
      "What protocol-specific benefit does the OData adapter provide over treating an OData service as generic HTTP?",
      "What underlying transport does the IDoc adapter typically use?",
      "Name another specialized adapter Cloud Integration offers besides IDoc, OData, and HTTP.",
    ],
    commonMistakes: [
      "Defaulting to the HTTP adapter for everything regardless of what the other system actually speaks.",
      "Not knowing specialized adapters understand protocol-specific semantics the generic HTTP adapter doesn't.",
    ],
    importantPoints: [
      "IDoc adapter: classic SAP systems exchanging IDoc documents.",
      "OData adapter: OData-based services (CAP/RAP, S/4HANA OData).",
      "HTTP adapter: general-purpose fallback for generic REST/HTTP systems.",
    ],
    revisionNotes: "Adapter choice = what the other system speaks: IDoc adapter (classic SAP/IDoc), OData adapter (OData services), HTTP adapter (generic REST fallback).",
  },
  {
    id: "is-q11",
    topic: "Cloud Integration",
    prompt: "What is a Router step, and how would you decide whether to use it versus multiple separate iFlows?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["cloud-integration", "router"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A Router step branches message processing conditionally within a single iFlow based on message content/headers (like document type), sending the message down different processing paths — you'd use it when the branches share the same overall trigger/entry point and are conceptually one scenario with variations, rather than genuinely separate, independent integration scenarios.",
    detailedAnswer:
      "A Router evaluates a condition (often against a header or property set earlier by a Content Modifier) and directs the message down one of several defined branches within the same iFlow — useful when, say, a single inbound endpoint receives multiple document types that each need different downstream processing, but conceptually represent one integration scenario with variations. If the different cases genuinely represent unrelated integration scenarios (different triggers, different business purposes, maintained by different teams), separate iFlows are usually the better choice for independent deployability and clarity — Router is for branching within one coherent scenario, not for cramming unrelated scenarios into a single sprawling iFlow.",
    hindiExplanation:
      "Ek Router ek condition evaluate karta hai (aksar ek header ya property ke against jo pehle ek Content Modifier ne set kiya) aur message ko kai defined branches mein se ek ki taraf direct karta hai usi iFlow ke andar — useful hai jab, say, ek single inbound endpoint kai document types receive karta hai jinhe har ek ko different downstream processing chahiye, lekin conceptually ek integration scenario represent karte hain variations ke saath. Agar different cases genuinely unrelated integration scenarios represent karte hain, separate iFlows usually better choice hain independent deployability aur clarity ke liye.",
    interviewExplanation:
      "I'd give the decision criteria: 'A Router branches processing within one iFlow based on a condition, like document type — good when the branches are variations of one coherent scenario. If the cases genuinely represent unrelated scenarios with different triggers or business purposes, separate iFlows are the better choice for independent deployability. Router is for branching within one scenario, not cramming unrelated ones together.'",
    diagramNote:
      "'Same scenario, different variations (e.g. document types)' → 'Router step within one iFlow' vs 'Genuinely unrelated scenarios, different triggers/teams' → 'Separate iFlows'.",
    diagramMermaid: `flowchart LR
    A["Same scenario,<br/>different variations"] --> B["Router within one iFlow"]
    C["Unrelated scenarios,<br/>different triggers/teams"] --> D["Separate iFlows"]`,
    realProjectExample:
      "A single inbound order endpoint used a Router to branch between domestic and international order processing (a shared scenario with variation), while a completely unrelated invoice-processing integration was built as its own separate iFlow maintained by a different team.",
    interviewTip:
      "If asked 'would you always use one big iFlow with lots of Router branches to keep things centralized', the correct answer is no — weigh independent deployability and team ownership, not just technical possibility.",
    followupQuestions: [
      "Can a Router step have a default/fallback branch if no condition matches?",
      "How would you test each branch of a Router independently?",
      "What's the maintainability risk of an iFlow with too many Router branches?",
    ],
    commonMistakes: [
      "Cramming unrelated integration scenarios into one iFlow with excessive Router branching.",
      "Splitting closely related variations of the same scenario into unnecessarily separate iFlows.",
    ],
    importantPoints: [
      "Router branches processing conditionally within a single iFlow.",
      "Appropriate for variations of one coherent scenario, not unrelated scenarios.",
      "Genuinely separate scenarios are better as independent iFlows for deployability/clarity.",
    ],
    revisionNotes: "Router = conditional branching within ONE coherent iFlow scenario. Genuinely unrelated scenarios should be separate iFlows, not Router branches.",
  },
  {
    id: "is-q12",
    topic: "Cloud Integration",
    prompt: "How would you handle a scenario where an external system occasionally sends malformed messages that would otherwise crash the iFlow?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["cloud-integration", "error-handling"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Configure an Exception Subprocess (or a global exception handler) in the iFlow to catch processing errors gracefully, route malformed messages to a dedicated error-handling path (like logging the failure and notifying an admin, or storing the message for manual review) instead of letting the whole flow crash uncontrolled.",
    detailedAnswer:
      "Without explicit error handling, an unexpected malformed message can cause the flow to fail in an uncontrolled way — potentially losing the message entirely with no record of what happened, and requiring manual log-digging to even discover it occurred. Cloud Integration supports Exception Subprocesses, which catch errors during processing and let you define a graceful recovery path — persisting the failed message for later inspection, sending an alert notification, or routing to a manual review queue — rather than letting the exception propagate uncontrolled. This turns 'the flow silently or chaotically failed' into 'a specific, deliberate, observable error-handling path executed', which matters a lot for both operational visibility and not losing data.",
    hindiExplanation:
      "Explicit error handling ke bina, ek unexpected malformed message flow ko ek uncontrolled tarike se fail karwa sakta hai — potentially message ko entirely lose karte hue kisi record ke bina ki kya hua. Cloud Integration Exception Subprocesses support karta hai, jo processing ke dauraan errors catch karte hain aur tumhe ek graceful recovery path define karne dete hain — failed message ko baad ke inspection ke liye persist karna, ek alert notification bhejna, ya manual review queue mein route karna — exception ko uncontrolled propagate hone dene ki jagah.",
    interviewExplanation:
      "I'd describe the specific mechanism: 'Cloud Integration supports Exception Subprocesses that catch processing errors and let me define a graceful recovery path — persisting the failed message for inspection, sending an alert, or routing to manual review — instead of letting the flow crash uncontrolled. This turns a silent failure into a specific, observable, deliberate error-handling path.'",
    diagramNote:
      "'Malformed message causes error' → without handling: 'Uncontrolled crash, message potentially lost' vs with Exception Subprocess: 'Graceful catch → persist/alert/manual review queue'.",
    diagramMermaid: `flowchart TD
    A["Malformed message<br/>causes error"] -->|"no handling"| B["Uncontrolled crash,<br/>message lost"]
    A -->|"Exception Subprocess"| C["Graceful catch → persist/<br/>alert/manual review"]`,
    realProjectExample:
      "An Exception Subprocess was configured to persist any malformed inbound message to a dedicated error store and send a Slack alert to the integration team, turning what used to be silent message loss into an actionable, visible operational event.",
    interviewTip:
      "If asked how you'd handle an unreliable external system's occasional bad data, naming Exception Subprocesses specifically (rather than a vague 'add error handling') shows real Cloud Integration platform knowledge.",
    followupQuestions: [
      "What's the difference between a local exception subprocess and a global one?",
      "How would you alert a team member when this exception path is triggered?",
      "Would you ever want to retry a failed message automatically versus routing it to manual review?",
    ],
    commonMistakes: [
      "Not configuring any explicit error handling, leaving malformed messages to crash the flow uncontrolled.",
      "Not knowing Exception Subprocesses are the specific Cloud Integration mechanism for this.",
    ],
    importantPoints: [
      "Exception Subprocesses catch processing errors and define a graceful recovery path.",
      "Prevents uncontrolled crashes and silent message loss.",
      "Common recovery actions: persist for review, send an alert, route to a manual queue.",
    ],
    revisionNotes: "Exception Subprocess catches iFlow errors gracefully — persist/alert/manual-review instead of an uncontrolled crash and silent message loss.",
  },
  {
    id: "is-q13",
    topic: "API Management",
    prompt: "What is a 'spike arrest' policy, and how does it differ from a rate limit/quota policy?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["api-management", "spike-arrest"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Spike arrest smooths out short-term traffic bursts by limiting requests per very short interval (like per second), protecting the backend from sudden spikes regardless of total daily volume; a rate limit/quota policy caps total requests over a longer window (per day/month), controlling overall consumption rather than burst smoothing.",
    detailedAnswer:
      "These solve different problems. Quota/rate limiting answers 'how much total traffic is this consumer allowed over a day/month' — useful for tiered API plans or fair usage enforcement, but a consumer could still send their entire daily quota in one sudden burst of a few seconds, potentially overwhelming the backend momentarily even while staying within their overall quota. Spike arrest specifically smooths traffic at a much finer granularity (requests per second), rejecting or queuing excess requests within that short window regardless of whether the consumer's daily quota has been exceeded — protecting backend stability against sudden, momentary bursts that a daily quota alone wouldn't catch.",
    hindiExplanation:
      "Ye different problems solve karte hain. Quota/rate limiting answer karta hai 'ye consumer kitna total traffic allowed hai ek din/month mein' — useful hai tiered API plans ke liye, lekin ek consumer phir bhi apna poora daily quota ek sudden burst mein bhej sakta hai kuch seconds mein, potentially backend ko momentarily overwhelm karte hue chahe wo apni overall quota ke andar hi rahe. Spike arrest specifically traffic ko much finer granularity pe smooth karta hai (requests per second), excess requests ko reject/queue karta hai us short window ke andar chahe consumer ka daily quota exceed hua ho ya nahi.",
    interviewExplanation:
      "I'd distinguish the two clearly: 'Quota/rate limiting caps total traffic over a longer window, like per day — good for tiered plans or fair usage. But a consumer could still burst their entire quota in a few seconds. Spike arrest smooths traffic at a much finer granularity, requests per second, protecting backend stability against sudden bursts regardless of overall quota status — they solve different problems and are often used together.'",
    diagramNote:
      "'Quota/rate limit: total requests per day/month' vs 'Spike arrest: requests per second, smooths bursts regardless of daily quota status' — often used together.",
    diagramMermaid: `flowchart LR
    A["Quota/rate limit"] --> B["Total requests<br/>per day/month"]
    C["Spike arrest"] --> D["Requests per second<br/>smooths bursts"]`,
    realProjectExample:
      "A partner within their daily quota still triggered a backend slowdown by sending 500 requests in two seconds; adding a spike-arrest policy alongside the existing daily quota prevented this exact burst scenario without changing the partner's overall allowed daily volume.",
    interviewTip:
      "If asked 'wouldn't a daily quota already prevent overload', pointing out that a consumer can burst their entire quota instantly is the precise counter-example justifying why spike arrest is a distinct, additional policy.",
    followupQuestions: [
      "Would you configure both quota and spike arrest together, or just one?",
      "What HTTP status code would a request rejected by spike arrest typically receive?",
      "How would you determine an appropriate spike-arrest threshold for a specific backend?",
    ],
    commonMistakes: [
      "Assuming a daily/monthly quota alone is sufficient to protect a backend from sudden bursts.",
      "Confusing spike arrest with quota/rate limiting as the same policy type.",
    ],
    importantPoints: [
      "Spike arrest limits requests per very short interval (e.g. per second), smoothing bursts.",
      "Quota/rate limit caps total requests over a longer window (day/month).",
      "They solve different problems and are commonly configured together.",
    ],
    revisionNotes: "Spike arrest = per-second burst smoothing. Quota/rate limit = total requests per day/month. Different problems, often used together.",
  },
  {
    id: "is-q14",
    topic: "API Management",
    prompt: "How would you version an API in API Management without breaking existing consumers when you need to make a breaking change?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["api-management", "versioning"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Publish the breaking change as a new API proxy version (commonly via a version segment in the path, like /v2/), keeping the existing /v1/ proxy fully functional and unchanged, so existing consumers keep working against v1 while new consumers adopt v2 — deprecating and eventually retiring v1 only after consumers have had time to migrate.",
    detailedAnswer:
      "Breaking an existing API contract for consumers who haven't opted into the change is a reliability failure, not just a technical inconvenience — API Management supports proxying multiple versions of an API side by side (e.g. exposing both /v1/orders and /v2/orders as distinct proxy configurations), so a breaking change is introduced as an entirely new version, not a modification to the existing one. Existing consumers continue calling /v1/ unaffected, while new consumers (or those ready to migrate) adopt /v2/. Only after providing consumers reasonable advance notice and migration time would you actually deprecate and eventually retire the old version — never simply replacing v1's behavior out from under existing callers without warning.",
    hindiExplanation:
      "Ek existing API contract ko un consumers ke liye break karna jinhone change opt-in nahi kiya, ek reliability failure hai, sirf technical inconvenience nahi — API Management multiple versions ko side by side proxy karna support karta hai (jaise /v1/orders aur /v2/orders dono ko distinct proxy configurations ki tarah expose karna), taaki ek breaking change ek entirely new version ki tarah introduce ho, existing wale mein modification ki tarah nahi. Existing consumers /v1/ ko call karte rehte hain unaffected, jabki naye consumers /v2/ adopt karte hain. Sirf consumers ko reasonable advance notice aur migration time dene ke baad hi tum actually old version ko deprecate/retire karoge.",
    interviewExplanation:
      "I'd describe the side-by-side versioning approach: 'API Management supports proxying multiple versions side by side, like /v1/ and /v2/ as distinct proxy configs. A breaking change goes into a new version, not a modification to the existing one — existing consumers keep calling /v1/ unaffected, while new consumers adopt /v2/. I'd only deprecate and retire v1 after giving consumers reasonable notice and migration time, never breaking it out from under them without warning.'",
    diagramNote:
      "'/v1/orders (existing, unchanged)' + '/v2/orders (new, breaking change)' — both coexist → existing consumers stay on v1, new/migrating consumers move to v2 → v1 deprecated/retired only after migration window.",
    diagramMermaid: `flowchart LR
    A["/v1/orders<br/>existing, unchanged"] --> C["Existing consumers<br/>keep working"]
    B["/v2/orders<br/>new, breaking change"] --> D["New/migrating consumers"]`,
    realProjectExample:
      "A breaking restructure of an order API's response format was published as /v2/orders alongside the untouched /v1/orders, with a 90-day advance deprecation notice given to all known v1 consumers before v1 was eventually retired, avoiding any surprise breakage for partners who hadn't yet migrated.",
    interviewTip:
      "If asked how you'd handle a breaking API change with active consumers, side-by-side versioning with a clear deprecation timeline is the correct, professional answer — never silently changing an existing version's behavior.",
    followupQuestions: [
      "How would you notify existing consumers of an upcoming deprecation?",
      "What would you monitor to know when it's actually safe to retire an old version?",
      "Would you version via the URL path, a header, or another mechanism — what are the tradeoffs?",
    ],
    commonMistakes: [
      "Modifying an existing API version's behavior in place, breaking consumers without warning.",
      "Not planning a deprecation timeline or notice period before retiring an old version.",
    ],
    importantPoints: [
      "Publish breaking changes as a new API version, coexisting with the old one.",
      "Existing consumers keep working against the unchanged old version.",
      "Deprecate and retire the old version only after a reasonable consumer migration window.",
    ],
    revisionNotes: "Version breaking changes as a new API proxy (e.g. /v2/), keeping the old version (/v1/) unchanged and working — deprecate/retire only after a migration notice period.",
  },
  {
    id: "is-q15",
    topic: "API Management",
    prompt: "What's the purpose of a Key-Value Map (KVM) policy in API Management?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["api-management", "kvm"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A KVM lets an API proxy store and retrieve simple key-value configuration or state data (like a feature flag, a mapping table, or a small lookup value) that can be read/updated without redeploying the proxy — useful for values that need to change independently of the proxy's actual logic/code.",
    detailedAnswer:
      "Hard-coding a configuration value (like a specific backend URL variant, a feature toggle, or a small lookup mapping) directly into a proxy's policy logic means changing it requires a redeploy. A Key-Value Map instead provides simple persistent storage accessible from proxy policies, letting you read or update these values independently — useful for things that genuinely need to change at runtime without a full proxy redeployment, like toggling a feature on/off, adjusting a small lookup table, or storing simple operational state. It's not meant for large datasets or complex data structures — for that, you'd reach for a proper backend data store instead; KVM is specifically for small, simple configuration/state values.",
    hindiExplanation:
      "Ek configuration value (jaise ek specific backend URL variant, ek feature toggle, ya ek chhoti lookup mapping) ko directly proxy ki policy logic mein hard-code karna matlab use change karne ke liye redeploy chahiye hoga. Key-Value Map iske bajaye simple persistent storage provide karta hai jo proxy policies se accessible hai, tumhe in values ko independently read/update karne deta hai — useful hai un cheezon ke liye jo genuinely runtime pe change hone ki zaroorat rakhte hain bina poore proxy redeployment ke, jaise ek feature ko on/off toggle karna, ek chhoti lookup table adjust karna, ya simple operational state store karna.",
    interviewExplanation:
      "I'd explain the runtime-configurability benefit: 'A KVM gives an API proxy simple, persistent key-value storage that can be read or updated independently of the proxy's own deployment — useful for a feature flag or small lookup value that needs to change without a redeploy. It's not for large datasets or complex structures — that's a proper backend data store's job. KVM is specifically for small, simple runtime-adjustable configuration.'",
    diagramNote:
      "'Hard-coded value in proxy policy → change requires redeploy' vs 'KVM: read/update value independently → no redeploy needed for small config/state changes'.",
    diagramMermaid: `flowchart LR
    A["Hard-coded value<br/>in proxy policy"] --> B["Change requires redeploy"]
    C["KVM value"] --> D["Read/update independently<br/>no redeploy needed"]`,
    realProjectExample:
      "A feature flag controlling whether a new response format was enabled was stored in a KVM, letting the team toggle it on for testing and off again instantly without any proxy redeployment, which would have been much slower if hard-coded into the policy logic.",
    interviewTip:
      "If asked 'how would you make a small configuration value adjustable without redeploying the API proxy', naming KVM specifically is the precise, correct API Management mechanism.",
    followupQuestions: [
      "What's the size/complexity limit that makes a KVM inappropriate for a given use case?",
      "How would you update a KVM value in production — through the UI, an API, or another mechanism?",
      "Would you use a KVM to store sensitive credentials, or is there a better mechanism for that?",
    ],
    commonMistakes: [
      "Hard-coding values into proxy policy logic that would be better stored in a KVM for runtime adjustability.",
      "Using a KVM for large datasets or complex structures instead of a proper backend data store.",
    ],
    importantPoints: [
      "KVM provides simple, persistent key-value storage accessible from proxy policies.",
      "Values can be read/updated independently of a proxy redeployment.",
      "Meant for small configuration/state values, not large datasets or complex structures.",
    ],
    revisionNotes: "KVM = simple key-value storage in an API proxy, updatable without redeploy — for small config/state (feature flags, lookup values), not large datasets.",
  },
  {
    id: "is-q16",
    topic: "Open Connectors",
    prompt: "How does Open Connectors handle the fact that different SaaS vendors paginate their APIs completely differently?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["open-connectors", "pagination"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Open Connectors normalizes pagination behind its consistent REST interface, so an integration developer interacts with a uniform pagination pattern regardless of whether the underlying vendor uses cursor-based, offset-based, or page-token-based pagination internally.",
    detailedAnswer:
      "Different SaaS vendors implement pagination in genuinely incompatible ways — some use an offset/limit pattern, others a cursor/next-token pattern, others yet another convention entirely — and if you were hand-building connectors, you'd need to learn and implement each vendor's specific approach individually. Open Connectors' normalization layer absorbs this variation, exposing a consistent pagination pattern through its own REST interface regardless of what the underlying vendor does internally — so an integration developer writes pagination-handling logic once, in one consistent way, rather than relearning and re-implementing a different pagination scheme for every single vendor integrated.",
    hindiExplanation:
      "Different SaaS vendors pagination ko genuinely incompatible tariko se implement karte hain — kuch offset/limit pattern use karte hain, doosre ek cursor/next-token pattern, aur doosre kisi aur convention se — aur agar tum hand-building connectors karte, tumhe har vendor ka specific approach individually seekhna/implement karna padta. Open Connectors ki normalization layer is variation ko absorb kar leti hai, apni REST interface ke through ek consistent pagination pattern expose karte hue chahe underlying vendor internally kuch bhi kare — isliye ek integration developer pagination-handling logic ek baar likhta hai, ek consistent tarike se.",
    interviewExplanation:
      "I'd explain the normalization specifically for pagination: 'Different vendors paginate incompatibly — offset-based, cursor-based, token-based, all different. Open Connectors absorbs this variation, exposing one consistent pagination pattern through its own REST interface regardless of the underlying vendor's actual scheme. I write pagination logic once, consistently, instead of relearning a new pagination convention for every vendor.'",
    diagramNote:
      "'Vendor A: offset/limit pagination', 'Vendor B: cursor/token pagination', 'Vendor C: yet another scheme' — all normalized behind 'Open Connectors: one consistent pagination pattern' for the integration developer.",
    diagramMermaid: `flowchart LR
    A["Vendor A: offset/limit"] --> N["Open Connectors:<br/>one consistent pagination pattern"]
    B["Vendor B: cursor/token"] --> N
    C["Vendor C: another scheme"] --> N`,
    realProjectExample:
      "Pulling paginated records from two different SaaS vendors through their respective Open Connectors used the exact same pagination-handling code on the integration side, even though the underlying vendors' native APIs paginated completely differently from each other.",
    interviewTip:
      "If asked what specifically gets normalized by Open Connectors beyond just authentication, pagination is a concrete, specific example beyond a vague 'it makes things consistent'.",
    followupQuestions: [
      "What other API inconsistencies besides pagination does Open Connectors typically normalize?",
      "Would you ever still need vendor-specific handling despite using Open Connectors?",
      "How would you handle a vendor whose data volume requires very large numbers of paginated calls efficiently?",
    ],
    commonMistakes: [
      "Assuming Open Connectors only normalizes authentication, missing pagination and other API inconsistencies.",
      "Hand-implementing vendor-specific pagination logic when Open Connectors already normalizes it.",
    ],
    importantPoints: [
      "Different SaaS vendors paginate in genuinely incompatible ways.",
      "Open Connectors normalizes pagination behind one consistent REST interface pattern.",
      "Integration developers write pagination logic once, not per-vendor.",
    ],
    revisionNotes: "Open Connectors normalizes vendor-specific pagination schemes (offset/cursor/token) behind one consistent pattern — write pagination logic once, not per vendor.",
  },
  {
    id: "is-q17",
    topic: "Open Connectors",
    prompt: "Would you use Open Connectors for integrating with an internal, company-built legacy system?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["open-connectors", "scope-fit"],
    estimatedMinutes: 2,
    expectedAnswer:
      "No — Open Connectors' catalog is built around popular, common third-party SaaS applications; an internal, custom-built legacy system wouldn't have a pre-built connector available, so you'd build a custom iFlow (using the HTTP adapter or another appropriate adapter) instead.",
    detailedAnswer:
      "Open Connectors' entire value proposition comes from the fact that many organizations need to integrate with the same popular SaaS systems (Salesforce, Workday, and similar), making pre-built, shared connectors economically worthwhile to maintain centrally. An internal, custom-built legacy system is by definition unique to your organization — there's no shared catalog entry for it, since no other customer would benefit from a pre-built connector to your specific internal system. For this case, you'd build a custom iFlow using whatever adapter fits (HTTP for a REST-ish internal API, IDoc if it's a classic SAP system, or another appropriate protocol), since that's exactly the scenario custom-built iFlow adapters are meant to address.",
    hindiExplanation:
      "Open Connectors ka poora value proposition is baat se aata hai ki bahut sari organizations ko same popular SaaS systems (Salesforce, Workday, aur similar) ke saath integrate karne ki zaroorat hoti hai, jisse pre-built, shared connectors ko centrally maintain karna economically worthwhile ban jaata hai. Ek internal, custom-built legacy system definition se tumhari organization ke liye unique hai — uske liye koi shared catalog entry nahi hai, kyunki koi doosra customer tumhare specific internal system ke pre-built connector se benefit nahi uthayega. Is case ke liye, tum ek custom iFlow banaoge jo bhi adapter fit ho use karte hue.",
    interviewExplanation:
      "I'd correct the assumption directly: 'No — Open Connectors' value comes from many organizations sharing the same popular SaaS integrations, making a shared connector economically worthwhile. An internal, custom-built legacy system is unique to your organization — there's no shared catalog entry for it, since nobody else would benefit from that connector. I'd build a custom iFlow instead, using whatever adapter actually fits — HTTP, IDoc, or another protocol.'",
    diagramNote:
      "'Popular third-party SaaS (shared across many orgs)' → 'Open Connectors pre-built catalog fits' vs 'Internal custom legacy system (unique to your org)' → 'No shared catalog entry — build a custom iFlow instead'.",
    diagramMermaid: `flowchart LR
    A["Popular SaaS<br/>shared across many orgs"] --> B["Open Connectors fits"]
    C["Internal custom legacy system<br/>unique to your org"] --> D["No catalog entry —<br/>build a custom iFlow"]`,
    realProjectExample:
      "Integrating with a company's decades-old internal inventory system required a custom iFlow using the HTTP adapter against its bespoke API, since no Open Connectors entry existed (or would ever exist) for a system unique to that one organization.",
    interviewTip:
      "If asked to identify when Open Connectors doesn't apply, correctly scoping it to popular, shared third-party SaaS systems (not internal/custom ones) shows precise understanding of its actual target use case.",
    followupQuestions: [
      "What would you check first to determine if a pre-built Open Connectors entry exists for a given target system?",
      "How would you design a custom iFlow for an internal legacy system with an unusual, non-standard API?",
      "Could Open Connectors and a custom iFlow adapter both be used within the same overall integration landscape?",
    ],
    commonMistakes: [
      "Assuming Open Connectors has (or should have) coverage for any and every system, including internal custom ones.",
      "Not knowing custom iFlow adapters (HTTP, IDoc, etc.) are the right tool for genuinely internal/unique systems.",
    ],
    importantPoints: [
      "Open Connectors targets popular, shared third-party SaaS systems specifically.",
      "Internal, custom-built systems don't have pre-built connectors available.",
      "Use a custom iFlow with an appropriate adapter for internal/unique system integration.",
    ],
    revisionNotes: "Open Connectors = for popular, SHARED third-party SaaS systems only. Internal custom legacy systems need a custom iFlow (HTTP/IDoc/etc.), not Open Connectors.",
  },
  {
    id: "is-q18",
    topic: "Integration Advisor",
    prompt: "Does Integration Advisor's ML-suggested mapping eliminate the need for any manual review?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["integration-advisor", "manual-review"],
    estimatedMinutes: 2,
    expectedAnswer:
      "No — suggestions accelerate the mapping process significantly but should still be reviewed by someone with domain/format knowledge, since a suggestion drawn from other users' similar-but-not-identical mappings might not perfectly match your specific business requirements or trading partner agreement nuances.",
    detailedAnswer:
      "Integration Advisor's suggestions come from patterns observed across a shared knowledge base of other users' mappings for similar (not necessarily identical) scenarios — this is genuinely valuable for accelerating the initial mapping effort and reducing blank-page start difficulty, but a suggestion reflects what's common or typical elsewhere, not necessarily what's correct for your specific business rules or a particular trading partner's specific agreement nuances. Treating suggestions as a strong starting point requiring domain-expert review and adjustment (rather than blindly accepting every suggested mapping as final) is the correct usage pattern — the tool accelerates and assists, it doesn't eliminate the need for human judgment on the final, deployed mapping.",
    hindiExplanation:
      "Integration Advisor ke suggestions ek shared knowledge base mein observed patterns se aate hain doosre users ke similar (zaroori nahi identical) scenarios ke mappings ke — ye genuinely valuable hai initial mapping effort ko accelerate karne ke liye, lekin ek suggestion reflect karta hai jo common ya typical hai kahin aur, zaroori nahi ki jo correct hai tumhare specific business rules ya ek particular trading partner ke specific agreement nuances ke liye. Suggestions ko ek strong starting point ki tarah treat karna jise domain-expert review aur adjustment chahiye, correct usage pattern hai.",
    interviewExplanation:
      "I'd clarify this directly: 'No — suggestions come from patterns across similar, not identical, scenarios other users have mapped. They accelerate the initial effort significantly, but reflect what's common elsewhere, not necessarily what's correct for your specific business rules or a particular partner's agreement nuances. The right usage is treating suggestions as a strong starting point requiring domain-expert review, not blindly accepting every one as final.'",
    diagramNote:
      "'Integration Advisor suggests mapping (from similar, not identical, prior scenarios)' → 'Domain expert reviews/adjusts for THIS specific business rules/partner agreement' → 'Final, correct mapping deployed'.",
    diagramMermaid: `flowchart LR
    A["Integration Advisor suggests<br/>from similar prior scenarios"] --> B["Domain expert reviews/adjusts<br/>for specific business rules"]
    B --> C["Final, correct mapping deployed"]`,
    realProjectExample:
      "A suggested field mapping matched the common pattern for similar EDI documents but missed a specific conditional rule unique to one trading partner's actual agreement, which a domain expert's review caught and corrected before deployment.",
    interviewTip:
      "If asked whether Integration Advisor can be fully trusted without review, the disciplined answer is no — describing it as a strong accelerator requiring human validation shows realistic understanding of ML-assisted tooling's actual role.",
    followupQuestions: [
      "What kind of mistake would a blind acceptance of a suggested mapping typically introduce?",
      "How does the shared knowledge base actually get built and improved over time?",
      "Would you trust a suggestion more or less depending on how common the document type is?",
    ],
    commonMistakes: [
      "Blindly accepting every Integration Advisor suggestion as final without domain-expert review.",
      "Assuming ML-based suggestions are inherently correct for your specific business context.",
    ],
    importantPoints: [
      "Suggestions accelerate mapping but come from similar, not identical, prior scenarios.",
      "They reflect common patterns, not necessarily your specific business rules or partner nuances.",
      "Domain-expert review of suggested mappings remains necessary before final deployment.",
    ],
    revisionNotes: "Integration Advisor suggestions accelerate mapping but need domain-expert review — reflect common patterns elsewhere, not necessarily your specific rules/partner nuances.",
  },
  {
    id: "is-q19",
    topic: "Integration Advisor",
    prompt: "What is a Message Implementation Guideline (MIG), and why is it needed before you can start mapping?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["integration-advisor", "mig"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A MIG is a precise definition of your specific message structure — which segments/fields you actually use, their cardinality, and any custom constraints — derived from (but narrower/more specific than) a generic standard message type; it's needed because a generic standard often has far more optional segments/fields than any one implementation actually uses, and mapping needs to work against your actual, specific structure.",
    detailedAnswer:
      "A generic standard message type (like a specific EDI document standard) typically defines a huge superset of possible segments and fields to accommodate every conceivable industry use case, but no single implementation uses all of them — your specific business process only needs a defined subset with specific cardinality and constraints. A MIG captures exactly that: your organization's specific 'implementation' of the broader standard, narrowing down to only the segments/fields you actually use and how. Integration Advisor's mapping process works against this precise MIG rather than the sprawling, generic standard, since mapping suggestions and validation only make sense in the context of what your implementation actually uses, not every theoretical possibility the full standard allows.",
    hindiExplanation:
      "Ek generic standard message type (jaise ek specific EDI document standard) typically ek huge superset of possible segments/fields define karta hai har conceivable industry use case ko accommodate karne ke liye, lekin koi single implementation unme se sab use nahi karta — tumhara specific business process sirf ek defined subset chahta hai specific cardinality/constraints ke saath. Ek MIG exactly yahi capture karta hai: tumhari organization ki specific 'implementation' broader standard ki, sirf un segments/fields tak narrow karte hue jo tum actually use karte ho.",
    interviewExplanation:
      "I'd explain the narrowing purpose: 'A generic standard defines a huge superset of possible segments to cover every conceivable use case, but no implementation uses all of them. A MIG captures your organization's specific implementation — only the segments/fields you actually use, with their real cardinality and constraints. Integration Advisor maps against this precise MIG, since suggestions only make sense for what your implementation actually uses, not every theoretical possibility the full standard allows.'",
    diagramNote:
      "'Generic standard (huge superset of possible segments/fields)' → narrowed to → 'Your MIG (only segments/fields YOU actually use, with real cardinality)' → 'Mapping happens against the MIG, not the generic standard'.",
    diagramMermaid: `flowchart LR
    A["Generic standard<br/>huge superset"] --> B["Your MIG<br/>only segments you use"]
    B --> C["Mapping happens<br/>against the MIG"]`,
    realProjectExample:
      "Defining a MIG for a purchase order document narrowed a generic EDI standard's hundreds of theoretically possible fields down to the roughly 30 fields the organization's actual purchase order process used, making the subsequent mapping exercise far more focused and manageable.",
    interviewTip:
      "If asked why you can't just map directly against the raw generic standard, explaining the superset-versus-actual-usage distinction (via the MIG) shows precise understanding of why this preparatory step exists.",
    followupQuestions: [
      "Who typically defines a MIG — the integration team, business analysts, or both?",
      "Can a MIG be reused across multiple trading partners, or is it partner-specific?",
      "What happens if your MIG is defined too broadly, including segments you don't actually use?",
    ],
    commonMistakes: [
      "Attempting to map directly against a generic standard's full superset instead of first narrowing to a MIG.",
      "Not understanding a MIG is your organization's specific subset/usage of a broader standard.",
    ],
    importantPoints: [
      "A MIG narrows a generic standard's huge superset down to your organization's actual usage.",
      "Captures your specific segments/fields, cardinality, and constraints.",
      "Integration Advisor maps against the precise MIG, not the raw generic standard.",
    ],
    revisionNotes: "MIG = your organization's specific implementation (narrowed subset) of a generic standard's huge superset — mapping happens against the MIG, not the raw standard.",
  },
  {
    id: "is-q20",
    topic: "Trading Partner Management",
    prompt: "How would you handle a scenario where two different trading partners need slightly different mappings for the same logical document type?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["trading-partner-management", "partner-specific-mapping"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Associate partner-specific mapping variations with each trading partner's profile in Trading Partner Management, so the same generic integration flow dynamically applies the correct partner-specific mapping based on which partner it's processing for, rather than hard-coding per-partner conditional logic into the flow itself.",
    detailedAnswer:
      "Trading Partner Management is specifically designed to accommodate exactly this kind of partner-specific variation as configuration/master-data, not integration-flow logic. Each partner's profile can reference or be associated with its own specific mapping variant (perhaps because different partners use slightly different EDI segment usages, custom extensions, or field conventions within the same overall document type standard), so at runtime, the integration flow looks up which specific mapping applies to the partner it's currently processing for, rather than embedding an ever-growing set of if/else partner-specific branches directly into the flow's logic. This keeps the core integration flow generic and partner-agnostic, with all the actual partner-specific variation living as manageable, reviewable configuration.",
    hindiExplanation:
      "Trading Partner Management specifically design kiya gaya hai exactly is tarah ki partner-specific variation ko configuration/master-data ki tarah accommodate karne ke liye, integration-flow logic nahi. Har partner ka profile apni specific mapping variant reference ya associate kar sakta hai, isliye runtime pe, integration flow lookup karta hai ki kaunsi specific mapping apply hoti hai jis partner ke liye wo currently process kar raha hai, flow ki logic mein ek ever-growing set of if/else partner-specific branches embed karne ki jagah. Ye core integration flow ko generic aur partner-agnostic rakhta hai.",
    interviewExplanation:
      "I'd point to configuration over code: 'Trading Partner Management is designed for exactly this — each partner's profile can reference its own specific mapping variant. At runtime, the flow looks up which mapping applies to the partner it's processing for, rather than embedding an ever-growing set of if/else partner-specific branches into the flow's actual logic. This keeps the core flow generic, with the real variation living as manageable, reviewable configuration.'",
    diagramNote:
      "'Partner A profile → mapping variant A' + 'Partner B profile → mapping variant B' → 'One generic integration flow looks up the right mapping per partner at runtime' — not hard-coded if/else logic.",
    diagramMermaid: `flowchart LR
    A["Partner A profile<br/>→ mapping variant A"] --> C["One generic flow<br/>looks up mapping per partner"]
    B["Partner B profile<br/>→ mapping variant B"] --> C`,
    realProjectExample:
      "Two trading partners using slightly different EDI segment conventions for the same purchase order document type each had their own mapping variant associated with their profile in Trading Partner Management, letting one shared integration flow correctly process both without any partner-specific conditional code.",
    interviewTip:
      "If asked how you'd scale to dozens of partners each needing slightly different mapping nuances, describing this configuration-based, per-partner-profile approach (rather than an ever-growing conditional codebase) shows a scalable design instinct.",
    followupQuestions: [
      "How would you test that each partner's specific mapping variant works correctly in isolation?",
      "What happens if a new partner needs a mapping variant that doesn't exist yet?",
      "How does this relate to Integration Advisor's role in creating the actual mapping variants?",
    ],
    commonMistakes: [
      "Hard-coding per-partner conditional logic directly into the integration flow instead of using partner profile configuration.",
      "Not scaling well as more partners are onboarded, due to an ever-growing set of flow-level conditionals.",
    ],
    importantPoints: [
      "Partner-specific mapping variations are associated with each partner's profile in Trading Partner Management.",
      "The integration flow looks up the correct mapping dynamically at runtime, per partner.",
      "Keeps the core flow generic and scalable, with variation living as configuration, not code.",
    ],
    revisionNotes: "Partner-specific mapping variations live in each partner's Trading Partner Management profile — flow looks up the right one at runtime, keeping the core flow generic (not hard-coded if/else per partner).",
  },
  {
    id: "is-q21",
    topic: "Trading Partner Management",
    prompt: "What would you audit periodically to ensure Trading Partner Management data stays accurate as partner relationships change over time?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["trading-partner-management", "data-governance"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Periodically review partner profiles for stale/outdated connection details, expired agreements, or partners no longer actively trading, and reconcile against the actual current business relationships — since Trading Partner Management data can silently drift out of sync with reality if not actively maintained as partner relationships naturally change.",
    detailedAnswer:
      "Trading partner relationships aren't static — partners get onboarded, agreements get renegotiated, connection endpoints change, and some relationships eventually end entirely, but none of this is automatically reflected in Trading Partner Management unless someone actively maintains it. Periodic auditing should check for: partner profiles referencing connection details that may have quietly changed on the partner's side (causing silent failures until noticed), partners whose actual trading relationship has ended but whose profile remains active (a minor governance/cleanup issue, though not typically a security risk the way a stale user account would be), and document-type/mapping configurations that may need updating if a partner's agreement or format usage has evolved. Treating this master data as 'set once and forget' risks it silently drifting out of sync with the real, current business relationships it's supposed to represent.",
    hindiExplanation:
      "Trading partner relationships static nahi hote — partners onboard hote hain, agreements renegotiate hote hain, connection endpoints change hote hain, aur kuch relationships eventually entirely khatam ho jaate hain, lekin isme se kuch bhi automatically Trading Partner Management mein reflect nahi hota jab tak koi actively use maintain na kare. Periodic auditing check karna chahiye: partner profiles jo connection details reference karte hain jo shayad quietly partner ki side pe change ho gaye hon, partners jinki actual trading relationship khatam ho chuki hai lekin profile active hai, aur document-type/mapping configurations jo update chahiye agar partner ka agreement evolve hua ho.",
    interviewExplanation:
      "I'd describe this as ongoing data governance, not a one-time setup: 'Partner relationships aren't static — endpoints change, agreements get renegotiated, some relationships end entirely, but none of this is automatically reflected unless actively maintained. I'd periodically audit for stale connection details causing silent failures, profiles for relationships that have actually ended, and mapping configs that may need updating as agreements evolve — treating this as set-once-and-forget risks it silently drifting out of sync with reality.'",
    diagramNote:
      "'Partner relationships change over time (endpoints, agreements, some end entirely)' — but Trading Partner Management data doesn't auto-update → 'Periodic audit: stale connections, ended relationships, outdated mappings' needed to prevent silent drift.",
    diagramMermaid: `flowchart TD
    A["Partner relationships<br/>change over time"] -.->|"no auto-update"| B["Trading Partner<br/>Management data"]
    C["Periodic audit"] --> D["Stale connections,<br/>ended relationships, outdated mappings"]
    D --> B`,
    realProjectExample:
      "A periodic audit discovered several trading partner profiles still configured as active despite those relationships having ended over a year prior, and one profile's connection endpoint had silently changed on the partner's side months earlier, causing intermittent unexplained failures until the audit caught the mismatch.",
    interviewTip:
      "If asked how you'd maintain data quality for a long-running B2B integration landscape, describing periodic reconciliation audits (not just initial onboarding accuracy) shows awareness that this master data needs ongoing governance, not a one-time setup.",
    followupQuestions: [
      "How would you detect a partner's connection endpoint has silently changed without them notifying you?",
      "What process would you put in place for partners to notify you of relationship or connection changes proactively?",
      "How often would you conduct this kind of audit, and why?",
    ],
    commonMistakes: [
      "Treating Trading Partner Management setup as a one-time task rather than ongoing data governance.",
      "Not proactively auditing for relationships that have ended or connection details that have silently drifted.",
    ],
    importantPoints: [
      "Partner relationships naturally change over time — endpoints, agreements, and active status.",
      "Trading Partner Management data doesn't automatically stay in sync with these real-world changes.",
      "Periodic audits catch stale connections, ended relationships, and outdated mappings before they cause failures.",
    ],
    revisionNotes: "Trading Partner Management needs ongoing audits, not one-time setup — check for stale connection details, ended relationships still marked active, and outdated mappings as partner relationships evolve.",
  },
  {
    id: "is-q22",
    topic: "EDI",
    prompt: "What is an EDI acknowledgment (like an X12 997), and why does it matter for reliability?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["edi", "acknowledgments"],
    estimatedMinutes: 2,
    expectedAnswer:
      "An acknowledgment is a standardized response document confirming a specific EDI message was received and syntactically valid (or flagging that it wasn't); it matters for reliability because EDI exchanges typically happen over asynchronous channels, so without an explicit acknowledgment, the sender has no reliable way to know whether their message actually arrived and was understood.",
    detailedAnswer:
      "Unlike a synchronous request/response API call where a failed call is immediately obvious, EDI documents are often exchanged over asynchronous channels (AS2, SFTP, VANs) where a sender has no inherent visibility into whether their transmission was received or processed correctly. A functional acknowledgment (like X12's 997, or EDIFACT's CONTRL) is a standardized response document the receiver sends back specifically confirming receipt and syntactic validity of a particular message (identified by a control number), or flagging specific syntax errors if it wasn't valid. Without this acknowledgment loop, a sender has no reliable signal that a transmitted business document (like a purchase order) was actually received intact — they'd only find out something went wrong much later, indirectly, when the expected business response (like a shipment) never materialized.",
    hindiExplanation:
      "Ek synchronous request/response API call ke ulta jaha ek failed call turant obvious hoti hai, EDI documents aksar asynchronous channels (AS2, SFTP, VANs) pe exchange hote hain jaha ek sender ke paas koi inherent visibility nahi hoti ki unka transmission receive/process hua ya nahi. Ek functional acknowledgment (jaise X12 ka 997, ya EDIFACT ka CONTRL) ek standardized response document hai jo receiver wapas bhejta hai specifically ek particular message ki receipt aur syntactic validity confirm karte hue (control number se identify), ya specific syntax errors flag karte hue agar wo valid nahi tha.",
    interviewExplanation:
      "I'd explain the asynchronous reliability gap it fills: 'EDI documents are often exchanged over asynchronous channels with no inherent visibility into receipt success, unlike a synchronous API call. A functional acknowledgment, like X12's 997, is a standardized response confirming a specific message — by control number — was received and syntactically valid, or flagging errors if not. Without this loop, a sender wouldn't know something failed until much later, indirectly, when an expected business response never came.'",
    diagramNote:
      "'Sender transmits EDI document (async channel)' → 'Receiver validates syntax' → 'Sends back 997/CONTRL acknowledgment confirming receipt+validity (or flagging errors)' → 'Sender now has reliable confirmation'.",
    diagramMermaid: `flowchart LR
    A["Sender transmits<br/>EDI document (async)"] --> B["Receiver validates syntax"]
    B --> C["Sends 997/CONTRL<br/>acknowledgment"]
    C --> D["Sender has reliable<br/>confirmation of receipt"]`,
    realProjectExample:
      "A missing 997 acknowledgment for a purchase order alerted the sending system's monitoring within minutes that something had gone wrong in transmission, well before the much longer delay it would have taken to notice the expected shipment confirmation simply never arrived.",
    interviewTip:
      "If asked how you'd know an EDI transmission actually succeeded, naming the specific acknowledgment document type (997/CONTRL) rather than a vague 'you'd check somehow' shows precise EDI protocol knowledge.",
    followupQuestions: [
      "What would a missing acknowledgment within an expected timeframe typically indicate?",
      "Does a 997 confirm the business content is correct, or just that the message was syntactically valid?",
      "What's the difference between a functional acknowledgment and a business-level response document?",
    ],
    commonMistakes: [
      "Not knowing acknowledgment documents (997/CONTRL) are the specific mechanism for confirming EDI receipt.",
      "Confusing a functional acknowledgment (syntax validity) with a full business-level response confirming content correctness.",
    ],
    importantPoints: [
      "EDI documents are often exchanged asynchronously, with no inherent delivery confirmation.",
      "Acknowledgments (X12 997, EDIFACT CONTRL) confirm receipt and syntactic validity of a specific message.",
      "Without acknowledgments, senders only discover failures much later, indirectly.",
    ],
    revisionNotes: "EDI acknowledgment (X12 997/EDIFACT CONTRL) confirms a specific message was received + syntactically valid — essential since async EDI channels have no inherent delivery confirmation otherwise.",
  },
  {
    id: "is-q23",
    topic: "EDI",
    prompt: "What's the difference between AS2 and SFTP as EDI transport mechanisms?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["edi", "transport-protocols"],
    estimatedMinutes: 2,
    expectedAnswer:
      "AS2 is a protocol specifically designed for B2B document exchange, providing built-in encryption, digital signatures, and — critically — Message Disposition Notifications (MDNs) confirming receipt at the transport level; SFTP is a general-purpose secure file transfer protocol with no built-in business-document-specific receipt confirmation, requiring that reliability to be handled at the application/EDI layer instead.",
    detailedAnswer:
      "AS2 (Applicability Statement 2) was purpose-built for secure, reliable B2B document exchange over the internet — it natively bundles encryption, digital signing for non-repudiation, and Message Disposition Notifications (MDNs), which confirm at the transport level itself that a message was received (distinct from, and in addition to, the application-level 997/CONTRL functional acknowledgment). SFTP, by contrast, is a general-purpose secure file transfer protocol not specifically designed for B2B document exchange — it provides secure file transfer but no built-in business-document-aware confirmation mechanism; any receipt confirmation has to come entirely from the application/EDI layer (the 997/CONTRL), since SFTP itself has no equivalent to an MDN. Many EDI trading relationships still use SFTP for simplicity when both parties agree, but AS2's built-in transport-level confirmation is a genuine reliability advantage specifically for B2B scenarios.",
    hindiExplanation:
      "AS2 (Applicability Statement 2) specifically secure, reliable B2B document exchange ke liye purpose-built hai internet ke over — ye natively encryption, digital signing (non-repudiation ke liye), aur Message Disposition Notifications (MDNs) bundle karta hai, jo transport level pe hi confirm karte hain ki ek message receive hua (application-level 997/CONTRL functional acknowledgment se alag, aur uske saath additional). SFTP, iske contrast mein, ek general-purpose secure file transfer protocol hai jo specifically B2B document exchange ke liye design nahi kiya gaya — ye secure file transfer provide karta hai lekin koi built-in business-document-aware confirmation mechanism nahi.",
    interviewExplanation:
      "I'd contrast the two purpose-fits: 'AS2 was purpose-built for B2B document exchange — it natively bundles encryption, digital signing, and Message Disposition Notifications confirming receipt at the transport level itself, distinct from the application-level 997. SFTP is general-purpose secure file transfer with no business-document-aware confirmation built in — receipt confirmation has to come entirely from the EDI/application layer instead. AS2's built-in transport-level MDN is a genuine reliability advantage specifically for B2B.'",
    diagramNote:
      "'AS2: purpose-built for B2B — encryption + signing + MDN (transport-level receipt confirmation)' vs 'SFTP: general-purpose file transfer — secure but no business-document-aware confirmation, reliability handled at application/EDI layer'.",
    diagramMermaid: `flowchart LR
    A["AS2"] --> B["Encryption + signing +<br/>MDN (transport-level receipt confirmation)"]
    C["SFTP"] --> D["General-purpose secure transfer,<br/>no built-in confirmation"]`,
    realProjectExample:
      "A trading partner relationship using AS2 got immediate transport-level MDN confirmation of receipt within seconds of transmission, while a different partner relationship using SFTP relied entirely on the slower application-level 997 acknowledgment loop for the same reliability guarantee.",
    interviewTip:
      "If asked why AS2 is often preferred over SFTP specifically for EDI, the MDN-versus-no-built-in-confirmation distinction is the precise, correct technical justification, not just 'AS2 is more standard'.",
    followupQuestions: [
      "What does an MDN specifically confirm that the 997 functional acknowledgment doesn't already?",
      "Why might a trading partner still choose SFTP despite AS2's advantages?",
      "What other EDI transport mechanisms exist besides AS2 and SFTP?",
    ],
    commonMistakes: [
      "Assuming SFTP provides the same business-document-aware receipt confirmation that AS2's MDN provides natively.",
      "Not knowing MDN operates at the transport level, distinct from the application-level 997/CONTRL acknowledgment.",
    ],
    importantPoints: [
      "AS2 natively bundles encryption, signing, and MDN transport-level receipt confirmation.",
      "SFTP is general-purpose secure transfer with no business-document-aware confirmation built in.",
      "AS2's built-in MDN is a genuine reliability advantage specific to B2B document exchange scenarios.",
    ],
    revisionNotes: "AS2 = purpose-built for B2B, bundles encryption/signing/MDN (transport-level receipt confirmation). SFTP = general-purpose transfer, no built-in confirmation — reliability relies on the application/EDI layer (997).",
  },
  {
    id: "is-q24",
    topic: "Mapping",
    prompt: "How would you handle a mapping scenario where the source has a repeating group of items but the target expects them aggregated into a single summary field?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["mapping", "aggregation"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Use an aggregating function in the graphical mapping (like sum, count, or concatenate over the repeating group) to collapse the multiple source instances into the single target field — if the graphical tool's built-in aggregation functions can't express the specific aggregation logic needed, fall back to a custom XSLT/Java mapping instead.",
    detailedAnswer:
      "Many mapping tools' graphical editors include built-in aggregating functions specifically for this pattern — summing a numeric field across all instances of a repeating group, counting how many instances exist, or concatenating a text field from each instance into one combined string — letting you collapse a source's repeating structure into a single target value declaratively, without custom code. If the specific aggregation logic needed is more complex than these built-in functions support (a conditional aggregation, a weighted calculation, or a business-rule-specific combination), you'd drop down to a custom XSLT or Java mapping for that specific piece, since the graphical tool's aggregation functions are helpful for common cases but not infinitely flexible.",
    hindiExplanation:
      "Kai mapping tools ke graphical editors mein built-in aggregating functions hote hain specifically is pattern ke liye — ek numeric field ko sum karna saare instances of a repeating group ke aar-paar, ginna kitne instances exist karte hain, ya ek text field ko har instance se ek combined string mein concatenate karna — tumhe source ki repeating structure ko ek single target value mein collapse karne deta hai declaratively, bina custom code ke. Agar specific aggregation logic in built-in functions se zyada complex hai, tum specific piece ke liye custom XSLT ya Java mapping pe drop down karoge.",
    interviewExplanation:
      "I'd describe the built-in-function-first approach: 'Graphical mapping tools include built-in aggregating functions for exactly this — sum, count, or concatenate over a repeating group, collapsing it into a single target field declaratively. If the specific aggregation logic is more complex than these built-in functions support — a conditional or weighted aggregation — I'd drop to a custom XSLT or Java mapping for that specific piece, since built-in aggregation functions help common cases but aren't infinitely flexible.'",
    diagramNote:
      "'Source: repeating group (item1, item2, item3...)' → 'Graphical mapping aggregate function (sum/count/concat)' → 'Target: single summary field' — or custom XSLT if the logic is too complex.",
    diagramMermaid: `flowchart LR
    A["Source: repeating group<br/>item1, item2, item3..."] --> B["Graphical aggregate function<br/>sum/count/concat"]
    B --> C["Target: single summary field"]`,
    realProjectExample:
      "A mapping summing a repeating group's individual line-item amounts into a single order-total field used a built-in sum aggregation function graphically, while a separate, more complex weighted-average calculation across the same repeating group needed a custom XSLT function the graphical tool couldn't express.",
    interviewTip:
      "If asked how you'd collapse a repeating structure into a single value, naming the specific built-in aggregation function types (sum/count/concatenate) shows concrete, hands-on mapping tool familiarity.",
    followupQuestions: [
      "What happens if the repeating group is empty — how does an aggregation function typically handle that?",
      "Can you filter which instances of a repeating group get included in the aggregation?",
      "Would you ever need to aggregate across multiple different repeating groups simultaneously?",
    ],
    commonMistakes: [
      "Immediately reaching for custom XSLT for aggregation logic that a built-in graphical function could already handle.",
      "Not knowing graphical mapping tools include aggregating functions specifically for repeating-group-to-single-value scenarios.",
    ],
    importantPoints: [
      "Graphical mapping tools include built-in aggregating functions (sum, count, concatenate) for repeating groups.",
      "These collapse multiple source instances into a single target value declaratively.",
      "Fall back to custom XSLT/Java mapping only when the aggregation logic exceeds built-in function capability.",
    ],
    revisionNotes: "Collapse a repeating group into a single target field using built-in graphical aggregation functions (sum/count/concatenate) first — custom XSLT only if the logic exceeds what those support.",
  },
  {
    id: "is-q25",
    topic: "Mapping",
    prompt: "How would you handle a mapping requirement to look up a code value in an external reference table (e.g. converting an internal product code to an industry-standard code)?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["mapping", "lookup-tables"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Use a value-mapping/lookup function within the mapping (backed by a maintainable lookup table, often stored and editable outside the mapping logic itself, like in a Value Mapping artifact), so the code-conversion table can be updated independently of the mapping's structural logic as new codes are added or changed over time.",
    detailedAnswer:
      "Hard-coding a lookup table's specific value pairs directly inside mapping logic (as a long chain of if/else conditions, for example) makes updates painful — adding one new code mapping requires touching and redeploying the mapping itself. Most integration platforms provide a dedicated Value Mapping artifact/mechanism specifically for this: a maintainable table of source-code-to-target-code pairs that the mapping references via a lookup function, kept separate from the mapping's own structural logic. This separation means adding, updating, or removing individual code mappings is a simple table-edit operation, not a mapping-logic change requiring redeployment — exactly the same separation-of-concerns principle as centralizing trading partner data instead of hard-coding it into flow logic.",
    hindiExplanation:
      "Ek lookup table ke specific value pairs ko directly mapping logic ke andar hard-code karna (jaise if/else conditions ki ek lambi chain) updates ko painful bana deta hai — ek naya code mapping add karne ke liye mapping ko khud touch/redeploy karna padta hai. Zyada tar integration platforms ek dedicated Value Mapping artifact/mechanism dete hain specifically isi ke liye: source-code-to-target-code pairs ki ek maintainable table jise mapping ek lookup function ke through reference karta hai, mapping ki apni structural logic se alag rakhte hue.",
    interviewExplanation:
      "I'd describe the separation-of-concerns benefit: 'Hard-coding a lookup table's values directly into mapping logic as if/else chains makes updates painful — every new code needs a redeploy. Integration platforms provide a dedicated Value Mapping artifact — a maintainable source-to-target code table the mapping references via a lookup function, kept separate from the mapping's structural logic. Adding a new code mapping becomes a simple table edit, not a logic change requiring redeployment.'",
    diagramNote:
      "'Hard-coded if/else in mapping logic → new code needs redeploy' vs 'Value Mapping artifact (separate table) + lookup function in mapping → new code = simple table edit, no redeploy'.",
    diagramMermaid: `flowchart LR
    A["Hard-coded if/else<br/>in mapping"] --> B["New code needs redeploy"]
    C["Value Mapping artifact<br/>+ lookup function"] --> D["New code = simple<br/>table edit, no redeploy"]`,
    realProjectExample:
      "An internal-to-industry-standard product code conversion used a Value Mapping artifact maintained as an editable table, letting the business team add newly introduced product codes themselves without needing the integration team to modify and redeploy the mapping each time.",
    interviewTip:
      "If asked how you'd design a code-lookup mapping to be easy to maintain as new codes are introduced over time, naming a dedicated Value Mapping artifact/mechanism (not hard-coded conditionals) demonstrates a maintainability-first design instinct.",
    followupQuestions: [
      "Who would typically be responsible for maintaining a Value Mapping table's entries — developers or business users?",
      "What would happen if a lookup is attempted for a code that doesn't exist in the table yet?",
      "Would you version-control a Value Mapping table's contents the same way as mapping logic itself?",
    ],
    commonMistakes: [
      "Hard-coding lookup values as if/else conditionals directly in mapping logic instead of using a dedicated lookup mechanism.",
      "Not planning for how new code values will be added over time when initially designing the mapping.",
    ],
    importantPoints: [
      "Use a dedicated Value Mapping artifact/lookup function, not hard-coded conditionals, for code conversion.",
      "Keeps the lookup table maintainable and editable separately from the mapping's structural logic.",
      "New code mappings become simple table edits, not logic changes requiring redeployment.",
    ],
    revisionNotes: "Code lookups (e.g. internal→industry-standard) should use a dedicated Value Mapping artifact + lookup function, not hard-coded if/else — new codes become simple table edits, no redeploy.",
  },
  {
    id: "is-q26",
    topic: "Groovy Scripts",
    prompt: "How would you unit test a Groovy Script step's logic in isolation, without deploying the entire iFlow?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["groovy-scripts", "testing"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Extract the core logic into a plain Groovy method/class that can be tested independently with a standard Groovy/Java testing framework, with the actual iFlow script step acting as a thin wrapper that just calls this tested logic — rather than embedding all the complex logic directly inline in the script step where it can only be exercised by running the whole iFlow.",
    detailedAnswer:
      "A Groovy Script step embedded directly in an iFlow is awkward to unit test in isolation, since testing it typically means deploying and running the whole flow. A better pattern is treating the inline script as a thin wrapper — it extracts message data, calls out to a separately-maintained, plain Groovy class/method containing the actual logic, and sets the result back on the message — while that separate class/method can be unit-tested independently and exhaustively with a standard testing framework (Spock, JUnit), completely decoupled from any iFlow deployment. This mirrors exactly the same principle covered in CAP testing: extract complex logic into plain, independently-testable code, keeping the framework-specific integration point as a thin, simple wrapper.",
    hindiExplanation:
      "Ek Groovy Script step jo directly ek iFlow mein embedded hai, isolation mein unit test karna awkward hai, kyunki use test karna typically poori flow deploy/run karna matlab hai. Ek better pattern hai inline script ko ek thin wrapper ki tarah treat karna — ye message data extract karta hai, ek separately-maintained, plain Groovy class/method ko call karta hai jisme actual logic hai, aur result ko message pe wapas set karta hai — jabki wo separate class/method independently aur exhaustively unit-test ho sakta hai ek standard testing framework se, kisi bhi iFlow deployment se completely decoupled.",
    interviewExplanation:
      "I'd describe the thin-wrapper extraction pattern: 'A Groovy Script step directly embedded in an iFlow is awkward to unit test in isolation — testing it usually means deploying the whole flow. I'd treat the inline script as a thin wrapper that calls out to a separately-maintained plain Groovy class containing the actual logic, which I can unit test exhaustively with Spock or JUnit, completely decoupled from any iFlow deployment — the same extract-complex-logic-into-testable-code principle as CAP handler testing.'",
    diagramNote:
      "'Inline Groovy Script step (thin wrapper)' → calls → 'Separate, plain Groovy class/method (actual logic)' → unit-tested independently with Spock/JUnit, decoupled from iFlow deployment.",
    diagramMermaid: `flowchart LR
    A["Inline Groovy Script step<br/>thin wrapper"] --> B["Separate plain Groovy<br/>class/method — actual logic"]
    B --> C["Unit-tested independently<br/>Spock/JUnit, no iFlow deployment needed"]`,
    realProjectExample:
      "A complex validation Groovy script was refactored from inline iFlow logic into a separately-maintained, unit-tested Groovy class with a thin wrapper calling it from the actual script step, letting the team catch validation edge-case bugs via fast unit tests instead of repeatedly redeploying and manually testing the whole iFlow.",
    interviewTip:
      "If asked how you'd make complex custom integration logic testable, drawing the parallel to extracting business logic into plain functions (as covered for CAP handlers) shows you recognize this as a general software engineering principle, not something specific to one framework.",
    followupQuestions: [
      "What testing framework would you use for a standalone Groovy class like this?",
      "How would you package and reference this separate class from the iFlow's script step?",
      "Would this extraction pattern work the same way for a Java-based custom step instead of Groovy?",
    ],
    commonMistakes: [
      "Embedding all complex logic directly inline in the Groovy Script step, making it untestable without deploying the whole iFlow.",
      "Not recognizing this as the same extract-into-testable-code pattern applicable across many frameworks, not just CAP.",
    ],
    importantPoints: [
      "Treat the inline Groovy Script step as a thin wrapper calling separately-maintained logic.",
      "The extracted logic can be unit-tested independently and exhaustively, decoupled from iFlow deployment.",
      "Mirrors the same extract-complex-logic-into-testable-functions principle used elsewhere (e.g. CAP handlers).",
    ],
    revisionNotes: "Make Groovy Script logic testable: extract into a separate plain class/method (thin wrapper in the actual step) — unit-test independently with Spock/JUnit, no iFlow deployment needed.",
  },
  {
    id: "is-q27",
    topic: "Groovy Scripts",
    prompt: "What security risk exists if a Groovy Script step processes untrusted external input without validation?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["groovy-scripts", "security"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Just like any code processing untrusted input, a Groovy script that doesn't validate/sanitize external data before using it in operations like dynamic evaluation, external calls, or constructing queries/commands could be vulnerable to injection-style attacks — validate and treat external input as untrusted, exactly as you would in any other application code.",
    detailedAnswer:
      "A Groovy Script step has full scripting power, including potentially dynamic code evaluation, making external system calls, or constructing strings used in downstream operations — if untrusted external input flows into any of these without validation, it creates the same class of injection risks you'd worry about in any general-purpose application code (constructing a command or query string from unsanitized input, for instance). The mitigation is the same general security principle that applies everywhere: treat all external input as untrusted, validate/sanitize it before using it in any sensitive operation, and avoid dynamic code evaluation of untrusted content entirely if at all possible — the fact that this code lives inside an integration platform rather than a traditional application doesn't exempt it from standard secure coding practices.",
    hindiExplanation:
      "Ek Groovy Script step ke paas poori scripting power hai, including potentially dynamic code evaluation, external system calls karna, ya downstream operations mein use hone wali strings construct karna — agar untrusted external input in mein se kisi mein bhi bina validation ke flow karta hai, ye wahi class of injection risks create karta hai jo tum kisi bhi general-purpose application code mein worry karoge. Mitigation wahi general security principle hai jo har jagah apply hota hai: saare external input ko untrusted treat karo, use kisi bhi sensitive operation mein use karne se pehle validate/sanitize karo.",
    interviewExplanation:
      "I'd apply the same general security principle: 'A Groovy Script has full scripting power — dynamic evaluation, external calls, string construction — and untrusted external input flowing into any of these without validation creates the same class of injection risks as any application code. The mitigation is the same standard practice everywhere: treat external input as untrusted, validate/sanitize before use, and avoid dynamic evaluation of untrusted content. Living inside an integration platform doesn't exempt this code from secure coding basics.'",
    diagramNote:
      "'Untrusted external input' → flows unvalidated into Groovy script's 'dynamic evaluation / external calls / string construction' → 'Injection-style vulnerability, same as any application code' — mitigate via input validation/sanitization.",
    diagramMermaid: `flowchart TD
    A["Untrusted external input"] -->|"unvalidated"| B["Groovy script: dynamic eval/<br/>external calls/string construction"]
    B --> C["Injection-style vulnerability"]
    D["Input validation/sanitization"] -.->|"mitigates"| C`,
    realProjectExample:
      "A code review flagged a Groovy script that constructed a database query string by directly concatenating an unvalidated value from an inbound message, a genuine injection risk fixed by properly validating and parameterizing the input before use.",
    interviewTip:
      "If asked whether integration platform scripting is exempt from typical secure-coding concerns like injection, the correct answer is no — the same standard input-validation discipline applies regardless of what platform the code runs in.",
    followupQuestions: [
      "What specific Groovy/Java features would be riskiest if fed untrusted input directly?",
      "How would you validate or sanitize external input within a Groovy Script step specifically?",
      "Would this same risk apply to graphical mapping steps, or is it specific to custom scripting?",
    ],
    commonMistakes: [
      "Assuming integration platform scripting is somehow exempt from standard injection/security concerns.",
      "Not validating or sanitizing external input before using it in sensitive script operations.",
    ],
    importantPoints: [
      "Groovy scripts processing untrusted input face the same injection-style risks as any application code.",
      "Mitigation follows standard secure coding practice: validate/sanitize external input, avoid dynamic evaluation of untrusted content.",
      "Running inside an integration platform doesn't exempt this code from these standard concerns.",
    ],
    revisionNotes: "Groovy scripts processing unvalidated external input face standard injection-style risks — same secure-coding discipline applies (validate/sanitize input, avoid dynamic eval of untrusted content) regardless of platform.",
  },
  {
    id: "is-q28",
    topic: "Adapters",
    prompt: "What adapter or approach would you use to integrate with a message queue system (like a JMS provider or a cloud message broker)?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["adapters", "messaging"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Use a JMS adapter (for a JMS-compliant broker) or the appropriate cloud-messaging-specific adapter (like one for a cloud pub/sub or event broker service), which understands the specific queueing/messaging protocol's connection, acknowledgment, and delivery semantics natively rather than treating it as generic HTTP.",
    detailedAnswer:
      "Message queue systems have their own connection protocols, acknowledgment semantics (message consumed/acked versus left for redelivery), and sometimes ordering/partitioning concepts that a generic HTTP adapter has no native understanding of. A JMS adapter specifically understands JMS's connection factory model, session/consumer semantics, and message acknowledgment modes; similarly, cloud-specific messaging adapters (for services like a cloud pub/sub system) understand that platform's specific subscription and acknowledgment model. Choosing the protocol-appropriate adapter, exactly like the IDoc/OData/HTTP decision covered earlier, ensures the integration correctly participates in that messaging system's actual delivery guarantees and semantics rather than approximating it awkwardly over generic HTTP.",
    hindiExplanation:
      "Message queue systems ke apne connection protocols, acknowledgment semantics (message consumed/acked versus redelivery ke liye left), aur kabhi-kabhi ordering/partitioning concepts hote hain jinhe ek generic HTTP adapter native taur pe samajhta hi nahi. Ek JMS adapter specifically JMS ke connection factory model, session/consumer semantics, aur message acknowledgment modes ko samajhta hai; similarly, cloud-specific messaging adapters us platform ke specific subscription/acknowledgment model ko samajhte hain. Protocol-appropriate adapter choose karna, exactly jaise IDoc/OData/HTTP decision, ensure karta hai ki integration us messaging system ki actual delivery guarantees mein correctly participate kare.",
    interviewExplanation:
      "I'd apply the same protocol-fit principle: 'Message queue systems have their own connection protocols and acknowledgment semantics — message consumed/acked versus redelivery — that a generic HTTP adapter doesn't natively understand. A JMS adapter understands JMS's connection factory and acknowledgment modes specifically; a cloud-specific messaging adapter understands that platform's subscription model. Choosing the protocol-appropriate adapter, same as the IDoc/OData/HTTP decision, ensures the integration correctly participates in that system's actual delivery guarantees.'",
    diagramNote:
      "'Message queue system (JMS broker or cloud pub/sub)' → needs protocol-specific adapter (JMS adapter or cloud-messaging adapter) → 'correctly participates in native acknowledgment/delivery semantics' — not approximated via generic HTTP.",
    diagramMermaid: `flowchart LR
    A["Message queue system<br/>JMS/cloud pub-sub"] --> B["Protocol-specific adapter<br/>JMS or cloud-messaging"]
    B --> C["Correct native acknowledgment/<br/>delivery semantics"]`,
    realProjectExample:
      "Integrating with a JMS-based enterprise message broker used the JMS adapter, correctly participating in its consumer acknowledgment semantics, rather than attempting an awkward HTTP-based polling workaround that wouldn't have properly respected the broker's actual delivery guarantees.",
    interviewTip:
      "If asked why not just poll a message queue over generic HTTP, the answer centers on acknowledgment/delivery semantics — a protocol-specific adapter correctly participates in guarantees a generic polling approach would miss or approximate poorly.",
    followupQuestions: [
      "What does a JMS acknowledgment mode actually control?",
      "How would message ordering guarantees differ between different messaging systems?",
      "When might a generic HTTP-based webhook approach still be acceptable for a messaging integration?",
    ],
    commonMistakes: [
      "Attempting to integrate with a message queue system via generic HTTP polling instead of a protocol-specific adapter.",
      "Not understanding that messaging systems have their own acknowledgment/delivery semantics a generic adapter would miss.",
    ],
    importantPoints: [
      "Message queue systems have their own connection and acknowledgment semantics.",
      "JMS adapter (or a cloud-messaging-specific adapter) understands these natively.",
      "Choosing the protocol-appropriate adapter ensures correct participation in actual delivery guarantees.",
    ],
    revisionNotes: "Message queue integration = use a JMS adapter (or cloud-messaging-specific adapter), not generic HTTP — correctly participates in the system's native acknowledgment/delivery semantics.",
  },
  {
    id: "is-q29",
    topic: "Adapters",
    prompt: "What is the SFTP adapter typically used for in an iFlow, and what's a common pitfall when configuring it?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["adapters", "sftp"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The SFTP adapter is used to poll a remote directory for files (or write files to one) as a sender/receiver in a file-based integration scenario; a common pitfall is not properly configuring file-locking/archiving behavior, which can cause the same file to be picked up and processed multiple times if the flow doesn't move or rename it after successful processing.",
    detailedAnswer:
      "The SFTP adapter connects to a remote SFTP server and either polls a configured directory for new files (sender side) or writes output files to one (receiver side), commonly used for legacy or batch-oriented integration patterns where the other system communicates via file drops rather than a real-time API. A common configuration pitfall is not properly setting up post-processing behavior — after a file is successfully processed, it needs to be archived, renamed, or moved out of the polled directory; without this, the same file can be picked up again on the next poll cycle, causing duplicate processing. Getting the polling interval, file-locking, and post-processing archival configuration right is essential to avoid both duplicate processing and processing a file that's still being written by the source system.",
    hindiExplanation:
      "SFTP adapter ek remote SFTP server se connect karta hai aur ya toh ek configured directory ko naye files ke liye poll karta hai (sender side) ya ek output file wahan likhta hai (receiver side), commonly legacy ya batch-oriented integration patterns ke liye use hota hai. Ek common configuration pitfall hai post-processing behavior properly set up na karna — ek file successfully process hone ke baad, use archive/rename/move karna chahiye polled directory se bahar; iske bina, wahi file agle poll cycle pe dobara pick ho sakti hai, duplicate processing cause karte hue.",
    interviewExplanation:
      "I'd describe both the use case and the pitfall: 'The SFTP adapter polls a remote directory for files, or writes output files there — common for legacy or batch file-drop patterns. A common pitfall is not configuring post-processing archival — after successful processing, the file needs to be moved or renamed, or it'll get picked up again on the next poll, causing duplicate processing. Getting the polling interval, locking, and archival configuration right matters for both avoiding duplicates and not reading a file still being written.'",
    diagramNote:
      "'SFTP adapter polls remote directory' → processes file → 'MUST archive/rename/move file after success' → without this: 'same file picked up again next poll, duplicate processing'.",
    diagramMermaid: `flowchart TD
    A["SFTP adapter polls<br/>remote directory"] --> B["Processes file"]
    B --> C{"Archived/renamed<br/>after success?"}
    C -->|"No"| D["Picked up again —<br/>duplicate processing"]
    C -->|"Yes"| E["Correctly processed once"]`,
    realProjectExample:
      "A file-based integration initially processed the same invoice file three times before the team realized the post-processing archival step hadn't been configured, causing the SFTP poller to keep finding the same unmoved file on every polling cycle.",
    interviewTip:
      "If asked to debug duplicate processing in a file-based integration, checking the post-processing archival/move configuration first is a precise, specific diagnostic step for this exact scenario.",
    followupQuestions: [
      "How would you configure the polling interval appropriately for a given file-drop scenario?",
      "What would happen if the SFTP adapter tried to read a file still being written by the source system?",
      "How would you handle a scenario where the source system doesn't support renaming/moving files after they're read?",
    ],
    commonMistakes: [
      "Not configuring post-processing file archival, causing duplicate processing of the same file.",
      "Not considering file-locking to avoid reading a partially-written file mid-transfer.",
    ],
    importantPoints: [
      "SFTP adapter polls a directory for files (sender) or writes files to one (receiver).",
      "Common in legacy/batch file-drop integration patterns.",
      "Post-processing archival/renaming is essential to avoid duplicate processing.",
    ],
    revisionNotes: "SFTP adapter = poll/write files for batch/legacy integration. Must configure post-processing archival — otherwise the same file gets reprocessed on the next poll cycle.",
  },
  {
    id: "is-q30",
    topic: "Adapters",
    prompt: "How would you choose between a polling-based adapter (like SFTP) and an event-driven/push-based approach for a given integration scenario?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["adapters", "polling-vs-push"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Use push/event-driven when the source system can actively notify you of new data (lower latency, less wasted polling overhead); use polling when the source system can't push (legacy systems, file drops) or when the integration doesn't need near-real-time freshness and periodic checking is genuinely sufficient — the tradeoff mirrors the batch-versus-CDC replication decision covered for HANA.",
    detailedAnswer:
      "Polling means periodically checking a source for new data whether or not anything actually changed, incurring both a latency gap (up to the polling interval) and some wasted overhead when nothing's new — but it's the only option when the source system genuinely can't push notifications (many legacy or file-based systems). Push/event-driven approaches (a webhook, a message queue subscription) let the source actively notify you the moment something happens, minimizing latency and avoiding wasted checks, but require the source to actually support this kind of active notification. The decision criteria mirror exactly the batch-versus-CDC-replication tradeoff: use push/event-driven when available and when freshness genuinely matters, fall back to polling when the source can't support it or when periodic freshness is genuinely acceptable for the use case.",
    hindiExplanation:
      "Polling ka matlab hai periodically ek source ko check karna naye data ke liye chahe kuch actually change hua ho ya nahi, dono ek latency gap incur karta hai (polling interval tak) aur kuch wasted overhead jab kuch naya na ho — lekin ye sirf option hai jab source system genuinely push notifications nahi kar sakta. Push/event-driven approaches (ek webhook, ek message queue subscription) source ko actively notify karne dete hain jis moment kuch hota hai, latency minimize karte hue aur wasted checks avoid karte hue, lekin source ko actually is tarah ki active notification support karni chahiye.",
    interviewExplanation:
      "I'd draw the parallel to the batch-versus-CDC decision from HANA: 'Polling checks periodically whether or not anything changed, incurring a latency gap and some wasted overhead. Push/event-driven lets the source actively notify you the moment something happens, minimizing latency, but the source needs to actually support that. The decision mirrors exactly the batch-versus-CDC-replication tradeoff — use push when available and freshness matters, fall back to polling when the source can't push or periodic freshness is genuinely fine.'",
    diagramNote:
      "'Polling: periodic check regardless of change — latency gap + wasted overhead' vs 'Push/event-driven: source notifies immediately — low latency, needs source support' — same decision pattern as batch vs CDC replication.",
    diagramMermaid: `flowchart LR
    A["Polling"] --> B["Periodic check, latency gap,<br/>wasted overhead if nothing new"]
    C["Push/event-driven"] --> D["Source notifies immediately,<br/>low latency, needs source support"]`,
    realProjectExample:
      "A legacy file-drop integration had no choice but polling since the source system couldn't push notifications, while a newer microservice-to-microservice integration used an event-driven message queue subscription instead, achieving much lower latency since the source natively supported publishing events.",
    interviewTip:
      "If asked to justify choosing polling over an event-driven approach, explicitly citing the source system's actual push capability (not just personal preference) is the correct, concrete justification — and drawing the parallel to the HANA batch/CDC replication tradeoff shows you connect related concepts across the platform.",
    followupQuestions: [
      "What polling interval would be reasonable for a use case that only needs hourly freshness?",
      "How would you migrate an existing polling-based integration to an event-driven one if the source later adds push support?",
      "What's the resource-cost tradeoff of a very frequent polling interval versus a longer one?",
    ],
    commonMistakes: [
      "Defaulting to polling even when the source system genuinely supports push/event-driven notification.",
      "Not connecting this decision to the equivalent batch-versus-CDC-replication tradeoff covered elsewhere.",
    ],
    importantPoints: [
      "Push/event-driven minimizes latency and wasted overhead, but requires source support.",
      "Polling is the fallback when the source can't push, or when periodic freshness is genuinely sufficient.",
      "This mirrors the same batch-versus-CDC-replication tradeoff pattern seen elsewhere on the platform.",
    ],
    revisionNotes: "Push/event-driven = low latency, needs source support. Polling = fallback for legacy/file-based sources or when periodic freshness is fine — mirrors the batch-vs-CDC replication tradeoff.",
  },
  {
    id: "is-q31",
    topic: "EDI",
    prompt: "How would you handle EDI documents that arrive out of order relative to their intended business sequence (e.g. a shipment notice arriving before its corresponding purchase order)?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["edi", "sequencing"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Design the integration flow to handle out-of-sequence arrival gracefully — typically by persisting an out-of-order document temporarily and re-checking for its prerequisite once that arrives, rather than assuming strict in-order delivery, since EDI transport channels generally don't guarantee business-level sequencing even if the transport itself preserves message order.",
    detailedAnswer:
      "Transport-level ordering (a channel delivering messages in the order sent) doesn't guarantee business-level sequencing, especially when documents originate from different systems, batches, or even different transport channels on the sender's side — a shipment notice genuinely can arrive before its corresponding purchase order reaches you, for entirely legitimate operational reasons on the sender's side. A robust integration flow shouldn't assume strict business sequencing; instead, it should handle an out-of-order arrival by holding the document (in a pending/staging state) until its prerequisite document arrives, then processing both in the correct business order — rather than either failing outright on an unexpected sequence or, worse, silently processing things in a business-incorrect order that could cause downstream data inconsistencies.",
    hindiExplanation:
      "Transport-level ordering (ek channel messages ko sent order mein deliver karna) business-level sequencing guarantee nahi karta, especially jab documents different systems, batches, ya sender ki side pe different transport channels se originate hote hain — ek shipment notice genuinely apni corresponding purchase order se pehle pahunch sakti hai, entirely legitimate operational reasons ki wajah se sender ki side pe. Ek robust integration flow ko strict business sequencing assume nahi karni chahiye; iske bajaye, use ek out-of-order arrival ko handle karna chahiye document ko hold karke (ek pending/staging state mein) jab tak uska prerequisite document na aaye.",
    interviewExplanation:
      "I'd explain why strict sequencing can't be assumed: 'Transport-level ordering doesn't guarantee business-level sequencing — a shipment notice can genuinely arrive before its purchase order for legitimate reasons on the sender's side. A robust flow shouldn't assume strict sequencing; it should hold an out-of-order document in a pending state until its prerequisite arrives, then process both correctly — rather than failing outright or silently processing in the wrong business order, which could cause downstream inconsistencies.'",
    diagramNote:
      "'Shipment notice arrives (out of sequence)' → 'Check: has prerequisite purchase order arrived?' → No: 'Hold in pending/staging state' → Yes (later): 'Process both in correct business order'.",
    diagramMermaid: `flowchart TD
    A["Shipment notice arrives<br/>out of sequence"] --> B{"Prerequisite PO<br/>already arrived?"}
    B -->|"No"| C["Hold in pending/staging state"]
    B -->|"Yes"| D["Process both in<br/>correct business order"]
    C -.->|"PO arrives later"| D`,
    realProjectExample:
      "A shipment notice arriving before its purchase order was held in a pending staging table by the integration flow, automatically processed once the corresponding purchase order arrived minutes later, avoiding both a hard failure and an incorrect processing order that would have confused downstream inventory systems.",
    interviewTip:
      "If asked whether EDI transport ordering guarantees business sequencing, the correct answer is no — this distinction, and designing for graceful out-of-order handling, shows deeper practical B2B integration experience beyond textbook EDI knowledge.",
    followupQuestions: [
      "How long would you wait for a prerequisite document before considering it a genuine error rather than just delayed?",
      "How would you monitor for documents stuck in a pending state for too long?",
      "Would this same out-of-order handling design apply to non-EDI event-driven integrations too?",
    ],
    commonMistakes: [
      "Assuming EDI transport ordering guarantees business-level document sequencing.",
      "Either failing hard on out-of-sequence arrival or silently processing documents in the wrong business order.",
    ],
    importantPoints: [
      "Transport-level ordering doesn't guarantee business-level document sequencing.",
      "Design for graceful out-of-order handling — hold and re-check, rather than assuming strict sequence.",
      "Avoids both hard failures and silent processing in an incorrect business order.",
    ],
    revisionNotes: "EDI transport order ≠ business sequence guarantee. Design flows to hold out-of-sequence documents in a pending state and re-check once prerequisites arrive, rather than assuming strict order.",
  },
  {
    id: "is-q32",
    topic: "Groovy Scripts",
    prompt: "What performance consideration should you keep in mind when a Groovy Script step processes very large message payloads?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["groovy-scripts", "performance"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Avoid loading the entire large payload into memory as a single string/object for processing if streaming/chunked processing is possible instead, since a Groovy script naively holding a very large message fully in memory can cause excessive memory consumption or even out-of-memory failures at scale, especially under concurrent message processing load.",
    detailedAnswer:
      "A Groovy script that reads an entire large message body into a single in-memory string or object (to then manipulate it) works fine for small/moderate payloads, but scales poorly — under concurrent processing (many messages being processed simultaneously), each holding a full large payload in memory multiplies the memory pressure significantly, potentially causing out-of-memory conditions or severe performance degradation under load, even if a single message processed in isolation seemed fine during initial testing. Where the processing logic allows it, preferring streaming or chunked approaches (processing the message incrementally rather than materializing the whole thing in memory at once) avoids this scaling cliff — a consideration that's easy to miss when testing with a single small sample message but becomes a real production problem under realistic concurrent load with larger payloads.",
    hindiExplanation:
      "Ek Groovy script jo poore large message body ko ek single in-memory string/object mein read karta hai (fir use manipulate karne ke liye) chhote/moderate payloads ke liye theek kaam karta hai, lekin poorly scale karta hai — concurrent processing ke under (kai messages simultaneously process ho rahe hon), har ek poora large payload memory mein hold karta hua memory pressure ko significantly multiply karta hai, potentially out-of-memory conditions ya severe performance degradation cause karte hue load ke under, chahe ek single message isolation mein process hone pe theek laga ho initial testing ke dauraan.",
    interviewExplanation:
      "I'd raise the concurrent-load scaling risk specifically: 'Reading an entire large message into a single in-memory string works fine for one message in isolation, but under concurrent processing — many messages at once — each holding a full large payload multiplies memory pressure significantly, potentially causing out-of-memory issues that a single-message test would never reveal. Where possible, I'd prefer streaming or chunked processing instead of materializing the whole payload in memory at once.'",
    diagramNote:
      "'Single message test: full payload in memory — seems fine' vs 'Production concurrent load: many messages × full payload each in memory' → 'Memory pressure multiplies — potential OOM, missed by single-message testing'.",
    diagramMermaid: `flowchart LR
    A["Single message test<br/>full payload in memory"] --> B["Seems fine in isolation"]
    C["Production concurrent load:<br/>many messages × full payload each"] --> D["Memory pressure multiplies —<br/>potential OOM"]`,
    realProjectExample:
      "A Groovy script that worked fine processing one large test payload caused out-of-memory errors in production once realistic concurrent traffic with similarly large payloads hit simultaneously — refactoring to a streaming approach for that specific transformation resolved the scaling issue.",
    interviewTip:
      "If asked how you'd validate a custom script's performance, explicitly testing under realistic concurrent load with representative payload sizes (not just a single small sample) is the precise answer that catches this exact class of production surprise.",
    followupQuestions: [
      "What Groovy/Java APIs would support a streaming approach instead of loading the full payload into memory?",
      "How would you load-test a Groovy Script step to catch this kind of issue before production?",
      "Would this concern apply equally to graphical mapping steps, or is it specific to custom scripts?",
    ],
    commonMistakes: [
      "Testing a Groovy script's performance only with a single small sample message, missing concurrent-load memory pressure.",
      "Loading an entire large payload into memory when a streaming/chunked approach would scale much better.",
    ],
    importantPoints: [
      "Loading a full large payload into memory works fine for one message but scales poorly under concurrent load.",
      "Memory pressure multiplies across concurrently-processing messages, risking out-of-memory conditions.",
      "Prefer streaming/chunked processing where possible for large payloads.",
    ],
    revisionNotes: "Groovy scripts loading entire large payloads into memory scale poorly under concurrent load (memory pressure multiplies) — test with realistic concurrency/payload size, prefer streaming where possible.",
  },
  {
    id: "is-q33",
    topic: "Mapping",
    prompt: "How would you handle a mapping requirement where a target field's format depends on a conditional business rule involving multiple source fields?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["mapping", "conditional-logic"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Use the graphical mapping tool's conditional functions (like an if/else or lookup-based function referencing multiple source fields) if the logic is expressible within its function library; if the conditional logic involves too many interacting conditions or nested rules for the graphical tool to express cleanly, extract it into a well-documented custom function (XSLT/Java/Groovy) specifically for that piece.",
    detailedAnswer:
      "Graphical mapping tools typically support conditional functions referencing multiple source fields for reasonably straightforward business rules (if field A equals X and field B is present, output Y, else Z) — this covers a large share of real conditional mapping needs declaratively. But genuinely complex conditional logic — many interacting conditions, deeply nested rules, or business logic that would require chaining many graphical conditional functions together in a way that becomes hard to read/maintain — is a signal to extract that specific piece into a dedicated, well-documented custom function instead (a small XSLT template, a Groovy/Java function called from the mapping), keeping the rest of the mapping graphical while isolating the genuinely complex piece into something more maintainable as actual, testable code with real documentation rather than an unreadable tangle of nested graphical conditionals.",
    hindiExplanation:
      "Graphical mapping tools typically conditional functions support karte hain multiple source fields reference karte hue reasonably straightforward business rules ke liye — ye real conditional mapping needs ka bada hissa declaratively cover karta hai. Lekin genuinely complex conditional logic — kai interacting conditions, deeply nested rules, ya business logic jo bahut saare graphical conditional functions ko chain karne ki zaroorat rakhti ho ek way mein jo hard-to-read/maintain ho jaaye — ek signal hai us specific piece ko ek dedicated, well-documented custom function mein extract karne ke liye instead.",
    interviewExplanation:
      "I'd give the same graphical-first, extract-when-genuinely-complex pattern: 'Graphical conditional functions handle a large share of real needs declaratively — if field A equals X and B is present, output Y, else Z. But genuinely complex logic — many interacting conditions or deeply nested rules that would require chaining lots of graphical functions into an unreadable tangle — is a signal to extract that piece into a dedicated, well-documented custom function instead, keeping the rest of the mapping graphical.'",
    diagramNote:
      "'Straightforward conditional logic (few conditions)' → 'Graphical conditional function — declarative, readable' vs 'Complex, many-interacting-conditions logic' → 'Extract into dedicated, documented custom function (XSLT/Groovy/Java)'.",
    diagramMermaid: `flowchart LR
    A["Straightforward conditional logic"] --> B["Graphical conditional function"]
    C["Complex, many-interacting-conditions"] --> D["Extract into dedicated<br/>documented custom function"]`,
    realProjectExample:
      "A simple two-condition field-formatting rule was handled with a graphical conditional function directly, while a much more complex pricing-tier determination involving five interacting fields and nested business rules was extracted into a dedicated, documented Groovy function for maintainability.",
    interviewTip:
      "If asked when complexity justifies moving from graphical to custom code for a conditional mapping rule, describing the readability/maintainability threshold (not an arbitrary rule count) shows practical judgment rather than a rigid, memorized cutoff.",
    followupQuestions: [
      "How would you decide the exact threshold at which graphical conditional logic becomes 'too complex'?",
      "How would you document a complex conditional mapping rule for future maintainers?",
      "Would you unit test a custom conditional mapping function the same way as any other custom mapping code?",
    ],
    commonMistakes: [
      "Chaining an excessive number of graphical conditional functions together instead of extracting genuinely complex logic into custom code.",
      "Extracting overly simple conditional logic into custom code unnecessarily, when a graphical function would suffice.",
    ],
    importantPoints: [
      "Graphical conditional functions handle a large share of straightforward multi-field conditional logic.",
      "Genuinely complex, many-interacting-conditions logic should be extracted into a dedicated custom function.",
      "This keeps the mapping mostly graphical while isolating real complexity into maintainable, documented code.",
    ],
    revisionNotes: "Use graphical conditional functions for straightforward multi-field rules; extract genuinely complex, many-interacting-conditions logic into a dedicated, documented custom function instead.",
  },
  {
    id: "is-q34",
    topic: "Open Connectors",
    prompt: "How would Open Connectors handle a scenario where the target SaaS vendor changes their underlying API (e.g. deprecating an old endpoint)?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["open-connectors", "vendor-api-changes"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The connector's own maintenance absorbs the vendor's underlying API change, updating its internal implementation to work with the new endpoint while keeping the normalized interface your integration code uses stable — ideally requiring no changes on your integration's side, though you should still verify this and monitor for any connector version updates that might be needed.",
    detailedAnswer:
      "Part of Open Connectors' value proposition is precisely this insulation: when a vendor deprecates an old endpoint in favor of a new one, or changes some underlying API detail, the connector's own maintainers update its internal implementation to work with the new reality, while ideally keeping the same normalized interface your integration code calls against — meaning your integration logic doesn't need to change even though the vendor's actual API did. That said, this isn't an absolute guarantee — if the vendor's change is significant enough (removing a capability entirely, changing data semantics), the connector itself might need a version update with some interface changes, so it's still worth monitoring connector version release notes and testing after any connector update, rather than assuming complete insulation is guaranteed in every conceivable case.",
    hindiExplanation:
      "Open Connectors ke value proposition ka hissa precisely yahi insulation hai: jab ek vendor ek old endpoint deprecate karta hai naye endpoint ke favor mein, ya kuch underlying API detail change karta hai, connector ke apne maintainers uski internal implementation ko update karte hain naye reality ke saath kaam karne ke liye, jabki ideally same normalized interface rakhte hue jise tumhara integration code call karta hai — matlab tumhara integration logic change nahi hona chahiye chahe vendor ka actual API change ho gaya ho. Phir bhi, ye ek absolute guarantee nahi hai — agar vendor ka change kaafi significant hai, connector khud ko ek version update chahiye ho sakta hai kuch interface changes ke saath.",
    interviewExplanation:
      "I'd describe the insulation and its limits: 'The connector's own maintenance absorbs the vendor's underlying API change — updating its internal implementation while ideally keeping the same normalized interface your code calls, so your integration logic doesn't need to change. But this isn't an absolute guarantee — a big enough vendor change might need a connector version update with some interface changes, so I'd still monitor release notes and test after updates rather than assuming total insulation always.'",
    diagramNote:
      "'Vendor deprecates/changes their API' → 'Connector's own maintenance updates internal implementation' → 'Normalized interface ideally stays stable — your integration code unchanged' — but monitor for connector version updates when vendor changes are significant.",
    diagramMermaid: `flowchart LR
    A["Vendor changes<br/>underlying API"] --> B["Connector maintenance<br/>updates internally"]
    B --> C["Normalized interface stays stable —<br/>your integration code unchanged"]
    B -.->|"significant change"| D["Connector version update,<br/>monitor/test needed"]`,
    realProjectExample:
      "A SaaS vendor's endpoint migration was absorbed entirely by an Open Connectors update with zero changes needed on the integration side, while a separate, more significant vendor overhaul required upgrading to a newer connector version that did involve some minor interface adjustments the team had to test for.",
    interviewTip:
      "If asked whether Open Connectors provides absolute insulation from every vendor API change, the honest, nuanced answer — generally yes, but not an unconditional guarantee for very significant changes — shows realistic understanding rather than overselling the abstraction.",
    followupQuestions: [
      "How would you find out about an upcoming connector version update in advance?",
      "What testing would you do after a connector version update, even if no interface changes were expected?",
      "What would you do if a vendor's API change genuinely breaks connector compatibility with no immediate fix available?",
    ],
    commonMistakes: [
      "Assuming Open Connectors provides absolute, unconditional insulation from every possible vendor API change.",
      "Not monitoring connector version updates or testing after them, assuming total transparency always.",
    ],
    importantPoints: [
      "Connector maintenance generally absorbs vendor API changes, keeping the normalized interface stable.",
      "This isn't an absolute guarantee for very significant vendor changes.",
      "Monitor connector version release notes and test after updates rather than assuming total insulation.",
    ],
    revisionNotes: "Open Connectors generally absorbs vendor API changes via its own maintenance, keeping your integration code unchanged — but not an absolute guarantee for major vendor changes; monitor/test connector version updates.",
  },
  {
    id: "is-q35",
    topic: "Trading Partner Management",
    prompt: "How would Trading Partner Management data relate to monitoring and alerting for a B2B integration landscape?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["trading-partner-management", "monitoring"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Partner profile data (like expected transaction volume/frequency per partner, or agreed SLA windows) can inform monitoring thresholds and alerting rules — flagging when a specific partner's actual traffic deviates meaningfully from their expected pattern (like an unusual drop suggesting a broken connection on their side), rather than using one-size-fits-all thresholds across all partners regardless of their individual normal patterns.",
    detailedAnswer:
      "Different trading partners naturally have very different normal traffic patterns — one might send hundreds of documents daily, another only a handful weekly — so a single, generic monitoring threshold applied uniformly across all partners would either miss genuine anomalies for high-volume partners or generate constant false alerts for naturally low-volume ones. Using partner-specific expected-pattern data (potentially derived from or stored alongside each partner's Trading Partner Management profile) to set per-partner-appropriate monitoring thresholds — like alerting if a normally-daily partner goes 48 hours with no traffic, which would be entirely normal for a partner who only sends weekly — provides much more meaningful, actionable alerting than uniform thresholds ever could, directly connecting the partner master-data concept to operational monitoring design.",
    hindiExplanation:
      "Different trading partners naturally bahut different normal traffic patterns rakhte hain — ek shayad sainkdo documents daily bhejta ho, doosra sirf kuch handful weekly — isliye ek single, generic monitoring threshold saare partners pe uniformly apply karna ya toh high-volume partners ke liye genuine anomalies miss kar dega ya naturally low-volume walon ke liye constant false alerts generate karega. Partner-specific expected-pattern data use karna (potentially har partner ke Trading Partner Management profile se derived ya uske saath stored) per-partner-appropriate monitoring thresholds set karne ke liye — jaise alert karna agar ek normally-daily partner 48 hours tak koi traffic nahi bhejta.",
    interviewExplanation:
      "I'd connect partner master data directly to monitoring design: 'Different partners have very different normal traffic patterns — one might send hundreds daily, another a handful weekly. A single generic threshold across all partners either misses real anomalies for high-volume ones or generates constant false alerts for low-volume ones. Using partner-specific expected patterns, potentially tied to their Trading Partner Management profile, to set per-partner thresholds — like alerting a normally-daily partner after 48 hours of silence, which would be entirely normal for a weekly partner — gives much more meaningful, actionable alerting.'",
    diagramNote:
      "'Partner A: normally daily volume' + 'Partner B: normally weekly volume' → uniform threshold: 'misses anomalies for A, false-alerts for B' vs per-partner threshold (from profile data): 'meaningful alerting for both'.",
    diagramMermaid: `flowchart TD
    A["Partner A: normally daily"] --> C["Uniform threshold:<br/>misses A's real anomalies"]
    B["Partner B: normally weekly"] --> D["Uniform threshold:<br/>false-alerts on B"]
    E["Per-partner threshold<br/>from profile data"] --> F["Meaningful alerting for both"]`,
    realProjectExample:
      "A generic 24-hour-no-traffic alert rule constantly false-alerted for a partner who only transacted weekly, while missing a genuine multi-day outage for a normally-daily partner whose threshold hadn't accounted for their actual expected volume — switching to per-partner expected-pattern thresholds fixed both problems simultaneously.",
    interviewTip:
      "If asked how you'd design monitoring for a B2B landscape with many differently-behaved trading partners, connecting monitoring thresholds to partner-specific expected patterns (rather than uniform generic thresholds) shows systems-level thinking connecting two related concepts.",
    followupQuestions: [
      "How would you establish a partner's 'expected pattern' initially, before you have historical data?",
      "What would you do if a partner's actual traffic pattern gradually changed over time — how would thresholds adapt?",
      "Would you alert the partner directly, or only your own internal team, when their traffic deviates from expected?",
    ],
    commonMistakes: [
      "Using uniform, one-size-fits-all monitoring thresholds across trading partners with very different normal traffic patterns.",
      "Not connecting Trading Partner Management profile data to operational monitoring/alerting design.",
    ],
    importantPoints: [
      "Different trading partners have very different normal traffic patterns.",
      "Uniform monitoring thresholds either miss anomalies or generate false alerts depending on the partner.",
      "Per-partner expected-pattern thresholds, informed by profile data, give more meaningful, actionable alerting.",
    ],
    revisionNotes: "Uniform monitoring thresholds fail across differently-behaved partners — use per-partner expected-pattern thresholds (informed by Trading Partner Management profile data) for meaningful alerting.",
  },
];

export const integrationSuiteMcqs: BtpMcq[] = [
  {
    id: "is-mcq1",
    topic: "Cloud Integration",
    prompt: "What is an iFlow?",
    options: [
      "A programming language",
      "The graphical, step-by-step definition of one integration scenario",
      "A type of database",
      "A billing plan for Integration Suite",
    ],
    correctIndex: 1,
    explanation: "An iFlow is the graphical definition of an integration scenario — sender adapter, processing steps, and receiver adapter.",
  },
  {
    id: "is-mcq2",
    topic: "API Management",
    prompt: "What does API Management add in front of a backend API?",
    options: [
      "Nothing, it's redundant with a secured backend",
      "Rate limiting, auth enforcement, transformation, and analytics via a proxy layer",
      "A new database schema",
      "Automatic code generation for the backend",
    ],
    correctIndex: 1,
    explanation: "API Management inserts a proxy layer providing rate limiting, API key/OAuth enforcement, transformation, and analytics, without modifying the backend.",
  },
  {
    id: "is-mcq3",
    topic: "Open Connectors",
    prompt: "What is the main benefit of Open Connectors?",
    options: [
      "They only work with SAP systems",
      "Pre-built, normalized connectors to popular third-party SaaS systems",
      "They replace the need for any authentication",
      "They are used only for on-premise systems",
    ],
    correctIndex: 1,
    explanation: "Open Connectors provide a large catalog of pre-built connectors to popular SaaS systems (Salesforce, Workday, etc.) with a normalized REST interface.",
  },
  {
    id: "is-mcq4",
    topic: "Integration Advisor",
    prompt: "What does Integration Advisor primarily assist with?",
    options: [
      "Database performance tuning",
      "Suggesting B2B message mappings from a shared, crowd-sourced knowledge base",
      "User authentication",
      "Kubernetes cluster management",
    ],
    correctIndex: 1,
    explanation: "Integration Advisor uses machine learning to suggest B2B/EDI message mappings based on a shared knowledge base of prior mappings.",
  },
  {
    id: "is-mcq5",
    topic: "Trading Partner Management",
    prompt: "What does Trading Partner Management centralize?",
    options: [
      "Application source code",
      "Trading partner master data — identifiers, connections, agreed document formats",
      "Database backups",
      "User role assignments",
    ],
    correctIndex: 1,
    explanation: "It centralizes each B2B trading partner's profile as reusable master data, so integration flows look it up dynamically instead of hard-coding partner-specific logic.",
  },
  {
    id: "is-mcq6",
    topic: "EDI",
    prompt: "Why does EDI remain dominant in industries like retail and automotive despite newer formats existing?",
    options: [
      "EDI is technically superior in every way",
      "Switching an entire trading partner network to a new format is a massive coordination problem",
      "JSON/REST doesn't support business documents",
      "EDI is required by international law",
    ],
    correctIndex: 1,
    explanation: "The persistence of EDI is largely a trading-partner-network coordination issue, not a purely technical one — switching hundreds of partners to a new format is slow and costly.",
  },
  {
    id: "is-mcq7",
    topic: "Mapping",
    prompt: "When would you reach for an XSLT mapping instead of graphical mapping?",
    options: [
      "Always, for every mapping regardless of complexity",
      "When the transformation logic is too complex for the graphical tool's function library",
      "Never, XSLT is deprecated",
      "Only for mapping numbers, never text",
    ],
    correctIndex: 1,
    explanation: "Graphical mapping is faster and more readable for straightforward cases; XSLT is reached for when logic is genuinely too complex (deep nesting, complex grouping) for the graphical tool.",
  },
  {
    id: "is-mcq8",
    topic: "Groovy Scripts",
    prompt: "What should guide when to use a Groovy Script step in an iFlow?",
    options: [
      "Use it for everything by default for maximum flexibility",
      "Use it deliberately, only when logic is too custom for standard graphical steps",
      "It can only be used for authentication",
      "It replaces the need for adapters",
    ],
    correctIndex: 1,
    explanation: "Groovy Script steps should be used deliberately for genuinely custom logic — overusing them undermines the maintainability benefit of the graphical, declarative approach.",
  },
  {
    id: "is-mcq9",
    topic: "Adapters",
    prompt: "Which adapter would you use to consume an OData service natively?",
    options: ["IDoc adapter", "HTTP adapter", "OData adapter", "FTP adapter"],
    correctIndex: 2,
    explanation: "The OData adapter understands OData's query semantics, metadata, and CRUD conventions natively, unlike treating it as generic HTTP.",
  },
  {
    id: "is-mcq10",
    topic: "API Management",
    prompt: "What does a spike-arrest policy protect against, distinct from a rate limit/quota policy?",
    options: [
      "Total monthly traffic volume",
      "Sudden short-term traffic bursts, by limiting requests per very short interval (e.g. per second)",
      "SQL injection attacks",
      "Expired API keys",
    ],
    correctIndex: 1,
    explanation: "Spike arrest smooths bursts at a fine granularity (per second), protecting backend stability, distinct from quota/rate limits which cap total traffic over a longer window like a day.",
  },
  {
    id: "is-mcq11",
    topic: "API Management",
    prompt: "How should a breaking API change typically be introduced in API Management?",
    options: [
      "Modify the existing API version in place",
      "Publish it as a new API version (e.g. /v2/), keeping the old version unchanged for existing consumers",
      "Email all consumers and hope they update in time",
      "Breaking changes should never be made",
    ],
    correctIndex: 1,
    explanation: "Side-by-side versioning lets existing consumers keep working against the unchanged old version while new consumers adopt the new one — deprecating the old version only after a migration window.",
  },
  {
    id: "is-mcq12",
    topic: "Open Connectors",
    prompt: "Would Open Connectors typically have a pre-built connector for an internal, company-built legacy system?",
    options: [
      "Yes, it covers every possible system",
      "No — its catalog targets popular, shared third-party SaaS systems, not unique internal systems",
      "Only if the system uses OData",
      "Only for systems built after 2020",
    ],
    correctIndex: 1,
    explanation: "Open Connectors' value comes from many organizations sharing the same popular SaaS integrations — an internal, unique legacy system needs a custom iFlow adapter instead.",
  },
  {
    id: "is-mcq13",
    topic: "Integration Advisor",
    prompt: "What is a Message Implementation Guideline (MIG)?",
    options: [
      "A generic industry-wide EDI standard",
      "Your organization's specific, narrowed-down implementation of a broader standard's segments/fields",
      "A billing document",
      "A type of Groovy script",
    ],
    correctIndex: 1,
    explanation: "A MIG narrows a generic standard's huge superset of possible fields down to the specific subset your organization actually uses — mapping happens against this precise MIG.",
  },
  {
    id: "is-mcq14",
    topic: "Trading Partner Management",
    prompt: "How should partner-specific mapping variations be handled for the same logical document type?",
    options: [
      "Hard-code if/else logic per partner directly in the integration flow",
      "Associate each variation with the partner's profile in Trading Partner Management, looked up dynamically at runtime",
      "Create a completely separate application per partner",
      "Ignore variations and force all partners to use identical formats",
    ],
    correctIndex: 1,
    explanation: "Trading Partner Management is designed to hold partner-specific variations as configuration/master data, looked up dynamically — keeping the core integration flow generic and scalable.",
  },
  {
    id: "is-mcq15",
    topic: "EDI",
    prompt: "What does an EDI functional acknowledgment (like X12's 997) confirm?",
    options: [
      "That the business content is fully correct",
      "That a specific message was received and syntactically valid (or flags errors if not)",
      "That payment has been processed",
      "That the trading partner agreement has been renewed",
    ],
    correctIndex: 1,
    explanation: "A functional acknowledgment confirms receipt and syntactic validity of a specific message, distinct from a full business-level response confirming the actual content is correct.",
  },
  {
    id: "is-mcq16",
    topic: "Mapping",
    prompt: "How would you collapse a repeating group of source items into a single aggregated target field?",
    options: [
      "It's not possible without custom code",
      "Use a built-in aggregating function (sum/count/concatenate) in the graphical mapping tool",
      "Always write a custom XSLT function for any aggregation",
      "Duplicate the target field for each source instance",
    ],
    correctIndex: 1,
    explanation: "Graphical mapping tools include built-in aggregating functions for exactly this pattern; custom XSLT/Java is only needed when the aggregation logic exceeds what built-in functions support.",
  },
  {
    id: "is-mcq17",
    topic: "Groovy Scripts",
    prompt: "What's the best practice for making a Groovy Script step's complex logic unit-testable?",
    options: [
      "Embed all logic directly inline in the script step",
      "Extract the logic into a separate plain Groovy class/method, with the script step as a thin wrapper calling it",
      "Groovy Script steps cannot be tested at all",
      "Only test by manually running the whole iFlow repeatedly",
    ],
    correctIndex: 1,
    explanation: "Extracting logic into a separately-maintained, plain Groovy class lets it be unit-tested independently with a standard framework, decoupled from iFlow deployment — the script step stays a thin wrapper.",
  },
  {
    id: "is-mcq18",
    topic: "Adapters",
    prompt: "What's a common pitfall when configuring the SFTP adapter for a file-polling scenario?",
    options: [
      "Forgetting to enable encryption",
      "Not configuring post-processing file archival/renaming, causing the same file to be reprocessed",
      "Using too small a file size",
      "Not setting a display name",
    ],
    correctIndex: 1,
    explanation: "Without moving, renaming, or archiving a file after successful processing, the SFTP poller can pick up and reprocess the same file on the next polling cycle.",
  },
];
