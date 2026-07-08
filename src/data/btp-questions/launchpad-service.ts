import type { BtpMcq, BtpQuestion } from "@/lib/btp-content";

/** Section 12 — Launchpad Service. Interview questions, full format. */
export const launchpadServiceQuestions: BtpQuestion[] = [
  {
    id: "lp-q1",
    topic: "Tiles",
    prompt: "What is a tile in the Launchpad, and what are the common tile types?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["tiles", "basics"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A tile is a clickable visual entry point on the Launchpad home page representing one app or action; common types include static tiles (just a link, no live data), dynamic tiles (show live data like a count or KPI, refreshed periodically), and custom tiles (fully custom visuals/behavior).",
    detailedAnswer:
      "A static tile simply shows a title, icon, and subtitle and navigates to an app when clicked — no runtime data involved. A dynamic tile additionally calls a service (an OData request, typically) to display a live number or short piece of information — like an 'Open Orders: 12' count that updates periodically — giving at-a-glance status before even opening the app. Custom tiles let developers build entirely bespoke visuals and behavior beyond what the standard tile types support, useful for specialized dashboards or KPI displays that don't fit the standard static/dynamic pattern.",
    hindiExplanation:
      "Static tile bas ek title, icon, aur subtitle dikhata hai aur click hone pe ek app navigate karta hai — koi runtime data involved nahi. Dynamic tile additionally ek service call karti hai (typically OData request) live number ya short information dikhane ke liye — jaise 'Open Orders: 12' count jo periodically update hota hai — app khole bina hi at-a-glance status deta hai. Custom tiles developers ko poori tarah bespoke visuals/behavior banane dete hain standard tile types se aage, specialized dashboards ke liye useful.",
    interviewExplanation:
      "I'd name all three types: 'A tile is a clickable entry point on the home page. Static tiles just link to an app with no live data. Dynamic tiles call a service, typically OData, to show live data like a count, refreshed periodically. Custom tiles let developers build entirely bespoke visuals for cases the standard types don't cover.'",
    diagramNote:
      "Three tile types side by side: 'Static (title/icon/subtitle, no data)', 'Dynamic (live count, e.g. Open Orders: 12)', 'Custom (bespoke visuals)'.",
    diagramMermaid: `flowchart LR
    A["Static tile<br/>title/icon, no data"]
    B["Dynamic tile<br/>live count (Open Orders: 12)"]
    C["Custom tile<br/>bespoke visuals"]`,
    realProjectExample:
      "Our finance dashboard used a dynamic tile showing a live 'Pending Approvals: 7' count, updated every few minutes via an OData call, giving managers visibility into workload before even opening the approval app.",
    interviewTip:
      "If asked to design a Launchpad experience for a manager needing quick status visibility, recommending dynamic tiles specifically (not just static ones) shows practical UX awareness.",
    followupQuestions: [
      "How often does a dynamic tile's data typically refresh?",
      "What service does a dynamic tile usually call for its data?",
      "When would you build a custom tile instead of using a dynamic one?",
    ],
    commonMistakes: [
      "Not knowing dynamic tiles exist as a distinct type showing live data.",
      "Confusing a tile with the app it launches — a tile is just the entry point, not the app itself.",
    ],
    importantPoints: [
      "Static tile = simple link, no live data.",
      "Dynamic tile = shows live data (e.g. a count) via a service call, refreshed periodically.",
      "Custom tile = fully bespoke visuals/behavior for specialized needs.",
    ],
    revisionNotes: "Tile types: static (link only), dynamic (live data via service call), custom (bespoke visuals) — all clickable entry points to apps.",
  },
  {
    id: "lp-q2",
    topic: "Catalog",
    prompt: "What is a Catalog in the Launchpad configuration, and how does it relate to what a user sees?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["catalog", "configuration"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A Catalog is the definition of available tiles/apps and their target mappings — essentially the full inventory of what exists; a user only sees tiles from catalogs that are assigned to them (typically via a role), not the entire catalog inventory automatically.",
    detailedAnswer:
      "A Catalog contains tile definitions (which app, which intent, display properties) — think of it as the master list of everything potentially available in an area of the business. But simply existing in a catalog doesn't mean a specific user sees it; catalogs are assigned to roles, and only users with a role that includes a given catalog actually get access to those tiles (and only if they're also added to a Group they can see, which we'll cover separately). This two-level design — catalog defines what exists, role/group assignment determines who actually sees what — is what enables fine-grained, role-based Launchpad personalization at scale.",
    hindiExplanation:
      "Catalog tile definitions contain karta hai (kaunsa app, kaunsa intent, display properties) — ise business ke ek area mein potentially available sab kuch ki master list samjho. Lekin sirf catalog mein exist karne ka matlab ye nahi ki koi specific user use dekhega — catalogs roles ko assign hote hain, aur sirf un users ko jinke paas ek role hai jisme ek given catalog include hai, un tiles tak access milta hai. Ye two-level design — catalog batata hai kya exist karta hai, role/group assignment decide karta hai kaun kya actually dekhta hai — fine-grained, role-based Launchpad personalization enable karta hai scale pe.",
    interviewExplanation:
      "I'd explain the two-level model: 'A Catalog is the master inventory of tile definitions — which app, which intent. But existing in a catalog doesn't mean a user sees it automatically. Catalogs get assigned to roles, and only users with that role — and who can see the relevant Group — actually get access to those tiles. Catalog defines what exists; role assignment decides who sees it.'",
    diagramNote:
      "'Catalog (master tile inventory)' → assigned to → 'Role' → assigned to → 'User' → 'User sees only catalog tiles their role grants access to'.",
    diagramMermaid: `flowchart LR
    A["Catalog<br/>master tile inventory"] --> B["Role"]
    B --> C["User"]
    C --> D["Sees only tiles<br/>their role grants"]`,
    realProjectExample:
      "A 'Finance Apps' catalog contained dozens of tile definitions, but individual users only saw the specific subset relevant to their actual job function, based on which of several finance-related roles they'd been assigned.",
    interviewTip:
      "If asked 'if a tile is in a catalog, will every user see it', the correct answer is no — role assignment (and group visibility) is what actually determines a specific user's view.",
    followupQuestions: [
      "How is a catalog different from a group?",
      "Can one catalog be assigned to multiple different roles?",
      "What happens if a tile's catalog isn't assigned to any role a user has?",
    ],
    commonMistakes: [
      "Assuming every tile in a catalog is automatically visible to every user.",
      "Confusing catalogs (inventory) with groups (a user's personalized home page layout).",
    ],
    importantPoints: [
      "Catalog = master inventory of tile/app definitions.",
      "Assigned to roles; only users with that role get access.",
      "Existing in a catalog doesn't mean automatic visibility — role assignment does.",
    ],
    revisionNotes: "Catalog = master tile inventory, assigned to roles. Only users with the assigned role actually get access — not automatic visibility.",
  },
  {
    id: "lp-q3",
    topic: "Groups",
    prompt: "What is a Group in Launchpad configuration, and how does it differ from a Catalog?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["groups", "catalog"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A Group defines the actual visual layout of tiles on a user's home page (which tiles, in what order/section), while a Catalog is just the underlying inventory of what tiles are available — a tile must exist in an assigned catalog before it can be added to a group, but the group is what a user actually sees arranged on their home page.",
    detailedAnswer:
      "Think of the Catalog as the warehouse of available products, and the Group as the specific display shelf a particular user sees, arranged with only the items relevant to them, in a specific order. You can't add a tile to a group unless its underlying catalog is assigned to that user's role — but conversely, having catalog access doesn't automatically populate a group; someone (an admin, or the user via self-service 'app finder' if enabled) explicitly adds specific tiles from accessible catalogs into a group, arranging the actual home page layout. This separation lets the same catalog of available apps be arranged differently into different groups for different user populations, or even personalized per individual.",
    hindiExplanation:
      "Catalog ko available products ka warehouse samjho, aur Group ko wo specific display shelf jo ek particular user dekhta hai, sirf unke relevant items ke saath arranged, ek specific order mein. Tum ek tile ko group mein add nahi kar sakte jab tak uska underlying catalog us user ke role ko assign na ho — lekin ulta, catalog access hone se group automatically populate nahi hota; koi (admin, ya user khud self-service 'app finder' se agar enabled ho) explicitly accessible catalogs se specific tiles group mein add karta hai, actual home page layout arrange karte hue.",
    interviewExplanation:
      "I'd use the warehouse-vs-shelf analogy: 'Catalog is the warehouse of available apps. Group is the actual shelf layout a specific user sees on their home page. A tile needs its catalog assigned to the user's role before it can be added to a group, but catalog access alone doesn't populate a group — someone explicitly adds specific tiles into the group, arranging the actual layout.'",
    diagramNote:
      "'Catalog (available tiles, role-assigned)' --tiles selected from--> 'Group (actual home page layout, arranged)' --seen by--> 'User'.",
    diagramMermaid: `flowchart LR
    A["Catalog<br/>available tiles, role-assigned"] -- "tiles selected from" --> B["Group<br/>actual home page layout"]
    B --> C["User sees this"]`,
    realProjectExample:
      "Two different user populations had access to the same 'Finance Apps' catalog, but were assigned to different Groups — one arranged for approval-focused daily tasks, another for month-end reporting tasks — giving each a tailored home page from the same underlying catalog.",
    interviewTip:
      "The warehouse/shelf analogy is a memorable way to explain this distinction clearly in an interview without getting lost in configuration terminology.",
    followupQuestions: [
      "Can a user be assigned to multiple groups?",
      "What is 'app finder' and how does it relate to groups?",
      "Does removing a tile from a catalog automatically remove it from groups referencing it?",
    ],
    commonMistakes: [
      "Confusing a Catalog (inventory) with a Group (actual home page layout).",
      "Assuming catalog role access automatically populates a user's home page groups.",
    ],
    importantPoints: [
      "Group = actual home page tile layout a user sees.",
      "Catalog = underlying inventory of available tiles (role-gated).",
      "Tiles must come from an accessible catalog, but groups are separately, explicitly arranged.",
    ],
    revisionNotes: "Group = actual home page layout (like a shelf). Catalog = available tile inventory (like a warehouse) — tiles come from catalogs into groups, arranged separately.",
  },
  {
    id: "lp-q4",
    topic: "Roles",
    prompt: "How do BTP role collections tie into what a user sees on their Launchpad?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["roles", "role-collections"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A role collection bundles role templates that include catalog assignments (among other permissions); when a user is assigned a role collection that includes a catalog, they gain access to that catalog's tiles, which can then appear in groups they're assigned to.",
    detailedAnswer:
      "This connects the earlier BTP security concepts (role templates, role collections) directly to the Launchpad: a role template can grant access to a specific catalog (among possibly other, non-Launchpad permissions like API scopes). An admin assigns a Role Collection containing that template to a user, which grants them access to that catalog's tiles. Whether those tiles actually show up on the user's home page then further depends on group assignment — so the full chain to 'a user sees a specific tile' is: role template grants catalog access → role collection (bundling that template) assigned to the user → tile from that catalog added to a group the user is also assigned to.",
    hindiExplanation:
      "Ye pehle wale BTP security concepts (role templates, role collections) ko directly Launchpad se connect karta hai: ek role template ek specific catalog tak access grant kar sakta hai (shayad doosre, non-Launchpad permissions ke saath bhi jaise API scopes). Admin ek Role Collection jisme wo template ho, user ko assign karta hai, jo unhe us catalog ke tiles tak access deta hai. Wo tiles actually user ke home page pe dikhenge ya nahi, ye further group assignment pe depend karta hai — toh poori chain 'ek user ek specific tile dekhta hai' tak hai: role template catalog access grant karta hai → role collection (us template ko bundle karke) user ko assign hota hai → us catalog se tile ek group mein add hota hai jise user bhi assigned hai.",
    interviewExplanation:
      "I'd give the full chain, connecting back to security concepts: 'A role template can grant access to a specific catalog. An admin assigns a role collection bundling that template to a user, granting catalog access. Whether the tile actually appears then depends on group assignment too — so the full chain is role template → role collection assignment → catalog access → tile in an assigned group → visible on the user's home page.'",
    diagramNote:
      "Full chain: 'Role template (grants catalog access)' → 'Role collection (bundles template)' → 'Assigned to user' → 'Catalog access granted' → 'Tile in an assigned Group' → 'Visible on home page'.",
    diagramMermaid: `flowchart LR
    A["Role template<br/>grants catalog access"] --> B["Role collection<br/>bundles template"]
    B --> C["Assigned to user"]
    C --> D["Catalog access granted"]
    D --> E["Tile in assigned Group"]
    E --> F["Visible on home page"]`,
    realProjectExample:
      "Troubleshooting why a user couldn't see an expected tile traced back through this exact chain — their role collection was missing the specific role template granting that tile's catalog, even though they were correctly assigned to the relevant group.",
    interviewTip:
      "If asked to debug 'a user can't see a tile they should have', walking the full chain (role template → role collection → catalog → group) systematically is the strong, structured answer.",
    followupQuestions: [
      "What's the fastest way to check why a specific user can't see an expected tile?",
      "Can a single role collection grant access to multiple different catalogs?",
      "Does removing a role collection from a user immediately hide their tiles?",
    ],
    commonMistakes: [
      "Only checking group assignment when debugging a missing tile, skipping the role/catalog chain.",
      "Not connecting Launchpad tile visibility back to the broader BTP role collection/role template model.",
    ],
    importantPoints: [
      "Role template can grant catalog access (among other permissions).",
      "Role collection bundles templates, assigned to users.",
      "Full visibility chain: role template → role collection → catalog access → group assignment → visible tile.",
    ],
    revisionNotes: "Tile visibility chain: role template (grants catalog) → role collection (bundles it, assigned to user) → catalog access → tile in an assigned group → visible.",
  },
  {
    id: "lp-q5",
    topic: "Navigation",
    prompt: "What does 'intent-based navigation' mean, and why is it preferred over direct URL links between apps?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["navigation", "intent-based"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Intent-based navigation means one app navigates to another by expressing a semantic action (like `#SalesOrder-display`) rather than a hard-coded URL; the Launchpad's target mapping resolves that intent to whatever app is currently registered to handle it, so the calling app never breaks even if the target app's actual location changes.",
    detailedAnswer:
      "If App A hard-codes a link to App B's specific URL, any change to App B's deployment (a new version, a different hosting location, even a full replacement by a different app) breaks App A's navigation. Intent-based navigation avoids this entirely — App A simply expresses what it wants to happen semantically (`#SalesOrder-display` — 'display a sales order'), and the Launchpad's target mapping configuration resolves, at runtime, which currently-registered app actually handles that intent. If the target app changes, only the target mapping needs updating — every other app that navigates via that intent keeps working unchanged, since none of them ever hard-coded a specific URL.",
    hindiExplanation:
      "Agar App A App B ke specific URL ko hard-code karta hai, toh App B ke deployment mein koi bhi change (naya version, alag hosting location, ya poori tarah kisi doosre app se replace hona) App A ki navigation ko break kar deta hai. Intent-based navigation isse poori tarah avoid karta hai — App A bas semantically express karta hai ki kya hona chahiye (`#SalesOrder-display` — 'ek sales order display karo'), aur Launchpad ki target mapping configuration runtime pe resolve karti hai ki abhi kaunsa registered app us intent ko handle karta hai. Agar target app change ho, sirf target mapping update karni padti hai — har doosra app jo us intent se navigate karta hai bina change ke kaam karta rehta hai.",
    interviewExplanation:
      "I'd explain the fragility it solves: 'Hard-coding App B's URL in App A breaks navigation the moment App B's deployment changes. Intent-based navigation instead has App A express a semantic intent, like #SalesOrder-display, which the Launchpad's target mapping resolves at runtime to whatever app is currently registered for it. If the target app changes, only the mapping needs updating — every caller keeps working unchanged.'",
    diagramNote:
      "'Direct URL link: App A → hard-coded URL → App B (breaks if B's location changes)' vs 'Intent-based: App A → intent (#SalesOrder-display) → target mapping resolves → currently registered app (survives target changes)'.",
    diagramMermaid: `flowchart LR
    A["Direct URL: App A<br/>hard-coded URL"] --> B["App B<br/>breaks if location changes"]
    C["Intent-based: App A<br/>#SalesOrder-display"] --> D["Target mapping resolves"] --> E["Currently registered app<br/>survives target changes"]`,
    realProjectExample:
      "Replacing an old sales-order app with a completely rebuilt version required only updating the intent's target mapping — every other app in the landscape that navigated to '#SalesOrder-display' kept working without any changes to their own code.",
    interviewTip:
      "If asked 'why not just use normal hyperlinks between Fiori apps', the fragility-to-deployment-changes argument is the concrete, specific justification for intent-based navigation.",
    followupQuestions: [
      "What does an intent actually look like syntactically?",
      "What happens if no app is registered for a given intent?",
      "Can an app pass parameters along with an intent-based navigation?",
    ],
    commonMistakes: [
      "Hard-coding direct URLs between Fiori apps instead of using intent-based navigation.",
      "Not knowing target mapping is the specific mechanism resolving intents to actual apps.",
    ],
    importantPoints: [
      "Intent = semantic action expressed by the calling app, not a hard-coded URL.",
      "Target mapping resolves the intent to the currently registered app at runtime.",
      "Changing the target app only requires updating the mapping, not every caller.",
    ],
    revisionNotes: "Intent-based navigation = semantic action (#SalesOrder-display), resolved via target mapping at runtime — survives target app changes, unlike hard-coded URLs.",
  },
  {
    id: "lp-q6",
    topic: "Intent",
    prompt: "What are the parts of an intent (semantic object, action) and how do they map to a target app?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["intent", "semantic-object"],
    estimatedMinutes: 2,
    expectedAnswer:
      "An intent has a Semantic Object (a business entity, like 'SalesOrder') and an Action (what to do with it, like 'display' or 'create'), written as `#SemanticObject-Action`; the target mapping configuration maps this combination (optionally with parameters) to a specific app that's registered to handle it.",
    detailedAnswer:
      "The Semantic Object represents 'what kind of thing' — a business entity like SalesOrder, Customer, or Invoice — while the Action represents 'what you want to do with it' — display, create, edit, approve. Together, `#SalesOrder-display` is a complete intent. The Launchpad's target mapping configuration is essentially a lookup table: given a semantic object + action (and optionally additional parameters that can further refine which specific target mapping applies, like routing to a different app based on a document type parameter), it resolves to the specific app configured to handle that combination. This vocabulary (semantic object + action) is meant to be consistent across an organization's whole Fiori landscape, so the same 'display a sales order' intent means the same thing everywhere it's used.",
    hindiExplanation:
      "Semantic Object represent karta hai 'kis tarah ki cheez' — ek business entity jaise SalesOrder, Customer, ya Invoice — jabki Action represent karta hai 'usse kya karna hai' — display, create, edit, approve. Saath mein, `#SalesOrder-display` ek complete intent hai. Launchpad ki target mapping configuration basically ek lookup table hai: ek semantic object + action diya (aur optionally additional parameters, jo further refine kar sakte hain ki kaunsi specific target mapping apply hoti hai), ye us combination ko handle karne ke liye configured specific app tak resolve karta hai.",
    interviewExplanation:
      "I'd define both parts with the syntax: 'A Semantic Object is a business entity, like SalesOrder. An Action is what to do with it, like display or create. Together, #SalesOrder-display is a complete intent. Target mapping is essentially a lookup table resolving that combination, optionally refined by parameters, to the specific registered app.'",
    diagramNote:
      "'#SalesOrder-display' broken into 'Semantic Object: SalesOrder' + 'Action: display' → 'Target mapping lookup' → 'Specific registered app'.",
    diagramMermaid: `flowchart LR
    A["#SalesOrder-display"] --> B["Semantic Object: SalesOrder"]
    A --> C["Action: display"]
    B & C --> D["Target mapping lookup"] --> E["Specific registered app"]`,
    realProjectExample:
      "The organization standardized on consistent semantic objects (SalesOrder, PurchaseOrder, Customer) across all Fiori apps, so any app could reliably navigate to '#Customer-display' and land on the correct customer detail app, regardless of which team built either side.",
    interviewTip:
      "Mentioning that this vocabulary should be consistent org-wide (not just per-app) shows understanding of intent-based navigation as a landscape-wide design discipline, not just a per-app technical feature.",
    followupQuestions: [
      "Can the same semantic object have multiple different actions mapped to different apps?",
      "How do parameters refine which target mapping applies?",
      "What governance is needed to keep semantic object naming consistent across teams?",
    ],
    commonMistakes: [
      "Inventing ad-hoc, inconsistent semantic object names per app instead of following an org-wide vocabulary.",
      "Not knowing the exact two-part structure (semantic object + action) of an intent.",
    ],
    importantPoints: [
      "Intent = Semantic Object (business entity) + Action (what to do), e.g. #SalesOrder-display.",
      "Target mapping resolves this combination (optionally with parameters) to a specific app.",
      "Consistent semantic object naming across the organization is a deliberate governance discipline.",
    ],
    revisionNotes: "Intent = #SemanticObject-Action (e.g. #SalesOrder-display). Target mapping resolves this (+ optional params) to a specific registered app — needs org-wide naming consistency.",
  },
  {
    id: "lp-q7",
    topic: "Tiles",
    prompt: "What's the performance risk of a Launchpad home page with many dynamic tiles, and how would you mitigate it?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["tiles", "performance"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Each dynamic tile triggers its own service call to fetch live data, so a home page with dozens of dynamic tiles can generate a burst of simultaneous backend requests on every page load, potentially slowing initial load time or straining backend services — mitigation includes limiting the number of dynamic tiles per page, caching/throttling refresh frequency, and ensuring the underlying data-fetch endpoints are genuinely lightweight.",
    detailedAnswer:
      "Unlike a static tile (free, no backend call), every dynamic tile independently calls its data source when the home page loads, and again on its refresh interval — a home page with 30 dynamic tiles means 30 simultaneous backend calls firing at once on load, and again periodically thereafter. This can noticeably slow perceived page load time and put real load on the backend services being called, especially if many users load their (dynamic-tile-heavy) home pages around the same time each morning. Mitigations include being deliberate about how many dynamic tiles actually earn their place on a given home page (not defaulting every tile to dynamic just because it's possible), ensuring the specific endpoints dynamic tiles call are lightweight/optimized (not accidentally running an expensive aggregation query per tile), and considering reasonable refresh intervals rather than very frequent polling.",
    hindiExplanation:
      "Static tile (free, koi backend call nahi) ke ulta, har dynamic tile independently apna data source call karta hai jab home page load hota hai, aur phir apne refresh interval pe bhi — ek home page jisme 30 dynamic tiles hon matlab 30 simultaneous backend calls ek saath fire hoti hain load pe, aur phir periodically uske baad. Ye noticeably perceived page load time slow kar sakta hai aur real load daal sakta hai backend services pe. Mitigations mein shamil hai deliberate hona ki kitne dynamic tiles actually apni jagah earn karte hain, un endpoints ko lightweight/optimized rakhna jo dynamic tiles call karti hain, aur reasonable refresh intervals consider karna.",
    interviewExplanation:
      "I'd quantify the risk and give concrete mitigations: 'Every dynamic tile independently calls its data source on load and on refresh — 30 dynamic tiles means 30 simultaneous backend calls firing at once, potentially slowing load and straining backend services, especially at peak times like morning login. I'd mitigate by being deliberate about which tiles actually earn dynamic status rather than defaulting everything to dynamic, ensuring those endpoints are genuinely lightweight, and setting reasonable refresh intervals rather than frequent polling.'",
    diagramNote:
      "'Home page with 30 dynamic tiles' → 'load triggers 30 simultaneous backend calls' → 'slower perceived load + backend strain' — mitigate: fewer dynamic tiles, lightweight endpoints, reasonable refresh intervals.",
    diagramMermaid: `flowchart TD
    A["Home page: 30 dynamic tiles"] --> B["30 simultaneous<br/>backend calls on load"]
    B --> C["Slower load +<br/>backend strain"]
    D["Mitigate: fewer dynamic tiles,<br/>lightweight endpoints, reasonable refresh"] -.-> B`,
    realProjectExample:
      "A home page with 40 dynamic tiles caused a noticeable morning login slowdown as hundreds of users triggered simultaneous backend calls around the same time; reducing to the dozen genuinely high-value dynamic tiles and optimizing their underlying queries resolved the bottleneck.",
    interviewTip:
      "If asked to review a Launchpad design with excessive dynamic tiles, quantifying the simultaneous-request concern (not just 'too many tiles looks cluttered') shows understanding of the actual technical performance implication.",
    followupQuestions: [
      "How would you measure the actual performance impact of dynamic tiles on page load?",
      "Would caching help mitigate this, and how would you design it?",
      "How would you decide which tiles genuinely deserve dynamic status versus staying static?",
    ],
    commonMistakes: [
      "Defaulting every tile to dynamic without considering the cumulative backend load of many simultaneous calls.",
      "Not considering peak-time load (many users logging in around the same time) when designing dynamic tile usage.",
    ],
    importantPoints: [
      "Each dynamic tile independently calls its data source on load and refresh.",
      "Many dynamic tiles on one page cause a burst of simultaneous backend calls, especially at peak login times.",
      "Mitigate by limiting dynamic tile count, optimizing endpoints, and setting reasonable refresh intervals.",
    ],
    revisionNotes: "Dynamic tiles = independent backend call each, on load + refresh. Many dynamic tiles = simultaneous call burst, slower load/backend strain. Mitigate: fewer dynamic tiles, lightweight endpoints, reasonable refresh interval.",
  },
  {
    id: "lp-q8",
    topic: "Tiles",
    prompt: "How would you design a custom tile that needs to show a chart or visualization rather than just a number?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["tiles", "custom-visualization"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Build a custom tile using the Launchpad's custom tile extensibility mechanism (a UI5 component-based tile), which gives full control over rendering (including embedding a chart library) rather than relying on the standard dynamic tile's simple number/text display, since the standard dynamic tile format isn't designed for arbitrary visualizations.",
    detailedAnswer:
      "The standard dynamic tile type is deliberately simple — a number, a short label, maybe a trend indicator — it's not designed to render an arbitrary chart or complex visualization. For that requirement, a custom tile (implemented as its own small UI5 component registered with the Launchpad's custom tile framework) gives full rendering control, letting you embed a proper charting library or UI5's own chart controls within the tile's confined space. This is more implementation effort than configuring a standard dynamic tile (which is largely configuration, not code), so it's reserved for cases where a genuine visualization, not just a number, is actually needed at the tile level.",
    hindiExplanation:
      "Standard dynamic tile type deliberately simple hai — ek number, ek short label, shayad ek trend indicator — ye arbitrary chart ya complex visualization render karne ke liye design nahi hai. Us requirement ke liye, ek custom tile (apne chhote UI5 component ki tarah implement kiya hua, Launchpad ke custom tile framework ke saath registered) poora rendering control deta hai, tumhe ek proper charting library ya UI5 ke apne chart controls tile ke confined space mein embed karne deta hai. Ye standard dynamic tile configure karne se zyada implementation effort hai, isliye ye un cases ke liye reserve hai jaha genuinely ek visualization chahiye, sirf ek number nahi.",
    interviewExplanation:
      "I'd clarify the standard type's limitation and the custom tile solution: 'The standard dynamic tile is deliberately simple — a number, a label — not designed for arbitrary charts. For a real visualization, I'd build a custom tile as its own small UI5 component registered with the Launchpad's custom tile framework, giving full rendering control to embed a chart library. It's more implementation effort than the largely-configuration-based dynamic tile, so I'd reserve it for cases genuinely needing a visualization, not just a number.'",
    diagramNote:
      "'Standard dynamic tile: number/label only (configuration-based)' vs 'Custom tile: own UI5 component, full rendering control, can embed a chart library (more implementation effort)'.",
    diagramMermaid: `flowchart LR
    A["Standard dynamic tile"] --> B["Number/label only<br/>configuration-based"]
    C["Custom tile"] --> D["Own UI5 component,<br/>full rendering — can embed a chart"]`,
    realProjectExample:
      "A KPI dashboard requirement for a small trend-line chart directly on the tile (not just a number) was implemented as a custom tile with an embedded UI5 chart control, since the standard dynamic tile format had no way to render anything beyond simple text/numbers.",
    interviewTip:
      "If asked how to show a chart directly on a Launchpad tile, correctly identifying that the standard dynamic tile can't do this and a custom tile is needed instead shows precise knowledge of the actual capability boundary.",
    followupQuestions: [
      "What's the actual registration mechanism for a custom tile with the Launchpad?",
      "Would a custom tile still support the same click-to-navigate behavior as a standard tile?",
      "What's the tradeoff of building a custom tile versus just directing users into the app for detailed visualizations?",
    ],
    commonMistakes: [
      "Trying to force a chart or complex visualization into the standard dynamic tile format, which isn't designed for it.",
      "Not knowing the custom tile mechanism exists as the appropriate solution for this requirement.",
    ],
    importantPoints: [
      "Standard dynamic tiles are limited to simple numbers/labels, not arbitrary visualizations.",
      "Custom tiles, built as their own UI5 component, give full rendering control for charts.",
      "Reserve custom tiles for genuine visualization needs, given their higher implementation effort.",
    ],
    revisionNotes: "Standard dynamic tiles = number/label only. For actual charts/visualizations, build a custom tile (own UI5 component, full rendering control) — more effort, reserved for genuine visualization needs.",
  },
  {
    id: "lp-q9",
    topic: "Catalog",
    prompt: "Who is typically responsible for maintaining catalogs — developers, admins, or both — and why does that split matter?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["catalog", "responsibility"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Developers typically define the tile/app content within a catalog as part of an app's deployment (since it's tied to the app's own intents/target mappings), while admins handle assigning that catalog to roles and building groups from it — this split matches 'what the app technically offers' (developer concern) versus 'who gets access and how it's organized' (admin/business concern).",
    detailedAnswer:
      "The content of a catalog — its tile definitions, which intents they trigger, their display properties — is closely tied to the app itself and is typically defined/deployed alongside the app by its developers, since it's essentially part of describing what the app offers navigationally. Once that catalog exists, though, deciding who should have access to it (assigning it to specific roles) and how those tiles get organized into a specific user population's home page (building groups) is fundamentally a business/organizational decision, not a technical one — appropriately handled by admins who understand the organization's actual role structure and user needs, not by the developers who built the underlying app. This split keeps technical app-definition concerns separate from organizational access/layout decisions.",
    hindiExplanation:
      "Ek catalog ka content — uske tile definitions, kaunse intents wo trigger karte hain, unki display properties — closely app se hi tied hota hai aur typically app ke developers dwara define/deploy hota hai app ke saath, kyunki ye essentially describe karta hai app kya navigationally offer karta hai. Ek baar wo catalog exist karta hai, though, decide karna ki kisko uska access hona chahiye (specific roles ko assign karna) aur wo tiles kaise organize hote hain ek specific user population ke home page mein (groups banana) fundamentally ek business/organizational decision hai, technical nahi — admins dwara appropriately handle kiya jaata hai.",
    interviewExplanation:
      "I'd explain the natural split: 'A catalog's content — its tile definitions and intents — is closely tied to the app and typically deployed alongside it by developers, since it's part of describing what the app offers. Deciding who gets access, by assigning the catalog to roles, and how those tiles get organized into groups, is fundamentally a business/organizational decision, appropriately handled by admins who understand the org's role structure — not something developers should be deciding.'",
    diagramNote:
      "'Developers: define catalog content (tile definitions, intents) alongside the app deployment' vs 'Admins: assign catalog to roles, build groups from it' — technical app-definition vs organizational access/layout decisions.",
    diagramMermaid: `flowchart LR
    A["Developers: define catalog<br/>content alongside app"] --> C["Catalog exists"]
    C --> B["Admins: assign to roles,<br/>build groups"]`,
    realProjectExample:
      "A new app's catalog with its tile definitions was deployed by the development team as part of the app's MTA package, while the actual decision of which business roles should have access to it, and how it should be organized into different user populations' groups, was made separately by business/IT administrators after the app went live.",
    interviewTip:
      "If asked who should own catalog role assignment, the correct answer distinguishes it from catalog content definition — developers own what the app offers, admins own who gets access and how it's organized.",
    followupQuestions: [
      "Could a catalog's tile definitions ever need updating after the app is deployed, and who would do that?",
      "How would developers and admins coordinate if a new tile needs to be added post-launch?",
      "Would this split differ for a small startup versus a large enterprise?",
    ],
    commonMistakes: [
      "Having developers make role-assignment decisions that are actually organizational/business concerns.",
      "Not recognizing catalog content definition (developer concern) as distinct from role/group assignment (admin concern).",
    ],
    importantPoints: [
      "Catalog content (tile definitions, intents) is typically defined/deployed by developers alongside the app.",
      "Assigning catalogs to roles and building groups is an organizational decision, handled by admins.",
      "This split separates technical app-definition concerns from business access/layout decisions.",
    ],
    revisionNotes: "Developers define catalog content (deployed with the app). Admins assign catalogs to roles and build groups — technical app-definition vs organizational access/layout decisions.",
  },
  {
    id: "lp-q10",
    topic: "Groups",
    prompt: "What is 'App Finder', and how does it relate to Groups?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["groups", "app-finder"],
    estimatedMinutes: 2,
    expectedAnswer:
      "App Finder is a self-service feature letting users browse all apps they have catalog access to (even ones not yet in any of their groups) and add specific tiles to their own personal groups themselves, rather than waiting for an admin to explicitly place every tile into a group on their behalf.",
    detailedAnswer:
      "Without App Finder, a user's only path to seeing a tile is an admin explicitly adding it to a group they're assigned to — even if the user has catalog access (via their role) to many more apps than currently appear on their home page. App Finder gives users a self-service way to browse everything they're actually authorized to access (their full accessible catalog inventory) and personally add specific tiles into their own groups, customizing their home page layout themselves rather than depending entirely on an admin's manual group curation. This is useful for apps that are relevant to some but not all users with a given role, letting individuals opt in to what's actually useful for their specific work rather than an admin trying to guess and pre-populate everything for everyone.",
    hindiExplanation:
      "App Finder ke bina, ek user ka ek tile dekhne ka sirf ek path hai — ek admin explicitly use ek group mein add kare jise wo assigned hai — chahe user ke paas catalog access ho (unke role se) kai aur apps tak jo currently unke home page pe nahi dikhte. App Finder users ko ek self-service tarika deta hai sab kuch browse karne ke liye jo wo actually authorized hain access karne ke liye, aur specific tiles ko apne khud ke groups mein personally add karne ke liye, apna home page layout khud customize karte hue admin ki manual group curation pe poori tarah depend karne ki jagah.",
    interviewExplanation:
      "I'd explain the self-service angle: 'Without App Finder, a user only sees a tile if an admin explicitly placed it in a group they're assigned to — even if their role already grants catalog access to more apps. App Finder lets users self-service browse their full accessible catalog inventory and personally add specific tiles into their own groups, opting into what's genuinely useful for their work rather than depending entirely on manual admin curation.'",
    diagramNote:
      "'Without App Finder: only admin-placed tiles visible, even with broader catalog access' vs 'With App Finder: user self-service browses full accessible inventory, adds tiles to own groups personally'.",
    diagramMermaid: `flowchart LR
    A["Without App Finder"] --> B["Only admin-placed tiles<br/>visible, despite broader access"]
    C["With App Finder"] --> D["User self-service browses<br/>full inventory, adds tiles personally"]`,
    realProjectExample:
      "A user whose role granted access to a specialized reporting catalog only discovered and added that reporting app to their own group via App Finder, since the admin's default group curation hadn't included it for their specific user population by default.",
    interviewTip:
      "If asked how a user could get access to an app they're authorized for but that isn't showing up on their home page, mentioning App Finder specifically (if enabled) is the precise, correct self-service answer.",
    followupQuestions: [
      "Is App Finder enabled by default, or does it need explicit configuration?",
      "Can an admin disable App Finder for certain user populations if self-service isn't desired?",
      "How would App Finder handle an app the user has no catalog access to at all?",
    ],
    commonMistakes: [
      "Assuming every accessible app must be manually placed into a group by an admin, without knowing App Finder exists.",
      "Not understanding App Finder only surfaces apps the user already has catalog access to, not everything in the system.",
    ],
    importantPoints: [
      "App Finder lets users self-service browse and add tiles from their accessible catalogs.",
      "Reduces dependency on admins manually curating every user's group placement.",
      "Only surfaces apps the user is already authorized for via catalog access — not a bypass of authorization.",
    ],
    revisionNotes: "App Finder = self-service browsing of a user's accessible catalog inventory, letting them personally add tiles to their own groups — not a bypass of catalog authorization, just self-service group curation.",
  },
  {
    id: "lp-q11",
    topic: "Groups",
    prompt: "Can a single tile appear in multiple different groups simultaneously, and why might you want that?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["groups", "tile-reuse"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — the same tile (referencing the same underlying catalog entry) can be placed into multiple different groups, useful when an app is relevant to multiple different user populations or organizational contexts, each of which has its own differently-organized group without needing to duplicate the underlying tile/catalog definition.",
    detailedAnswer:
      "Since a group is just an arrangement referencing catalog tiles (not a separate copy of the tile's actual definition), the same tile can be placed into any number of different groups without duplicating anything at the catalog level — group A and group B can both include a reference to the same 'SalesOrder-display' tile, each with it positioned differently alongside different neighboring tiles relevant to that specific group's audience. This is useful when an app is broadly relevant across different teams or contexts (e.g. a company-wide 'submit expense report' app that different departments' groups all want to include, each alongside their own department-specific other tiles).",
    hindiExplanation:
      "Kyunki ek group sirf catalog tiles ko reference karne wali ek arrangement hai (tile ki actual definition ki separate copy nahi), wahi tile kisi bhi number of different groups mein place ho sakta hai catalog level pe kuch bhi duplicate kiye bina — group A aur group B dono ek hi 'SalesOrder-display' tile ka reference include kar sakte hain, har ek mein wo differently positioned ho sakta hai different neighboring tiles ke saath jo us specific group ki audience ke liye relevant hain. Ye useful hai jab ek app broadly relevant ho different teams/contexts mein.",
    interviewExplanation:
      "I'd explain the reference-not-copy mechanism: 'Yes — a group just references catalog tiles rather than duplicating them, so the same tile can appear in any number of different groups without duplicating anything at the catalog level. This is useful when an app is broadly relevant across different teams — a company-wide expense report tile that different departments' groups all want to include, each alongside their own department-specific tiles.'",
    diagramNote:
      "'Same catalog tile (e.g. Expense Report)' referenced in → 'Group A (Sales dept, own tiles)' AND 'Group B (Engineering dept, own tiles)' — no duplication at catalog level, just multiple references.",
    diagramMermaid: `flowchart LR
    A["Catalog tile:<br/>Expense Report"] --> B["Group A: Sales dept<br/>own tiles + this one"]
    A --> C["Group B: Engineering dept<br/>own tiles + this one"]`,
    realProjectExample:
      "A company-wide 'Submit Expense Report' tile was included in every single department's group, each alongside that department's own specific other tiles, all referencing the same underlying catalog tile definition without any duplication.",
    interviewTip:
      "If asked whether adding a tile to a new group risks 'breaking' its appearance elsewhere, the correct answer is no — groups just reference tiles, so adding to a new group doesn't affect its presence in any other existing group.",
    followupQuestions: [
      "Would updating the underlying tile definition affect its appearance in every group referencing it?",
      "How would you organize company-wide tiles versus department-specific ones across many groups efficiently?",
      "Could the same tile appear twice within the same single group?",
    ],
    commonMistakes: [
      "Assuming a tile can only belong to one group at a time.",
      "Not recognizing that groups reference tiles rather than duplicating their underlying definitions.",
    ],
    importantPoints: [
      "A tile can appear in multiple different groups simultaneously, since groups reference rather than copy tiles.",
      "Useful for apps relevant across multiple different user populations or organizational contexts.",
      "Adding a tile to one group doesn't affect or remove it from any other group.",
    ],
    revisionNotes: "A tile can appear in multiple groups simultaneously (groups reference, don't copy, tiles) — useful for apps relevant across multiple teams/contexts, each with their own group.",
  },
  {
    id: "lp-q12",
    topic: "Roles",
    prompt: "What's the fastest way to check why a specific user can't see an expected tile?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["roles", "troubleshooting"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Systematically check each link in the visibility chain in order: does the user have the role collection containing the relevant role template, does that template actually grant the specific catalog, and is the specific tile actually present in a group the user is assigned to — rather than guessing randomly, walk the chain from role assignment down to group placement.",
    detailedAnswer:
      "Given the chain (role template grants catalog → role collection bundles template, assigned to user → catalog access granted → tile placed in an assigned group → visible), a systematic troubleshooting approach checks each link in order rather than guessing: first confirm the user actually has the expected role collection assigned (a simple, quick check); then confirm that role collection genuinely includes the role template granting the relevant catalog (a role collection might be missing an expected template); then confirm the specific tile is actually present in a group the user is assigned to (catalog access alone doesn't guarantee group placement). Working through this chain systematically, rather than jumping straight to reconfiguring things randomly, quickly isolates exactly which link is broken.",
    hindiExplanation:
      "Given ye chain (role template catalog grant karta hai → role collection template bundle karta hai, user ko assign hota hai → catalog access milta hai → tile ek assigned group mein place hota hai → visible hota hai), ek systematic troubleshooting approach har link ko order mein check karta hai guess karne ki jagah: pehle confirm karo ki user ke paas actually expected role collection assigned hai; fir confirm karo ki wo role collection genuinely relevant catalog grant karne wala role template include karta hai; fir confirm karo ki specific tile actually ek assigned group mein present hai.",
    interviewExplanation:
      "I'd walk the chain systematically: 'First, confirm the user actually has the expected role collection assigned — a quick check. Then confirm that role collection genuinely includes the role template granting the relevant catalog — it might be missing it. Then confirm the specific tile is actually present in a group the user is assigned to, since catalog access alone doesn't guarantee group placement. Working through this chain in order, rather than randomly reconfiguring things, quickly isolates exactly which link is broken.'",
    diagramNote:
      "Systematic check order: '1. User has expected role collection?' → '2. Role collection includes the relevant role template/catalog?' → '3. Tile actually present in an assigned group?' — check in order to isolate the broken link.",
    diagramMermaid: `flowchart TD
    A["1. User has expected<br/>role collection?"] --> B["2. Role collection includes<br/>relevant role template/catalog?"]
    B --> C["3. Tile present in<br/>an assigned group?"]
    C --> D["Isolate exactly<br/>which link is broken"]`,
    realProjectExample:
      "A support ticket about a missing tile was resolved in minutes by checking the chain systematically — the user had the correct role collection assigned, but that specific role collection was missing the role template granting the relevant catalog, quickly pinpointing the actual gap.",
    interviewTip:
      "If asked to troubleshoot this exact scenario, describing the systematic, ordered chain-check (rather than 'I'd look into the configuration') demonstrates a real, repeatable diagnostic process.",
    followupQuestions: [
      "What tool or cockpit view would you use to check a user's actual assigned role collections?",
      "How would you verify a role collection's included role templates without trial and error?",
      "Would this same troubleshooting chain apply if the issue were a dynamic tile showing stale data instead of a missing tile?",
    ],
    commonMistakes: [
      "Jumping straight to reconfiguring group assignments without first checking role collection/catalog access.",
      "Not having a systematic, ordered approach and instead guessing randomly at what might be wrong.",
    ],
    importantPoints: [
      "Check the visibility chain systematically, in order: role collection → role template/catalog → group placement.",
      "Each link can independently be the actual point of failure.",
      "A systematic approach isolates the broken link quickly, rather than random reconfiguration.",
    ],
    revisionNotes: "Troubleshoot missing tile systematically: check role collection assignment → role template/catalog grant → group placement, in order — isolates the broken link instead of guessing randomly.",
  },
  {
    id: "lp-q13",
    topic: "Navigation",
    prompt: "Can an intent-based navigation pass parameters, and how would a target app receive them?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["navigation", "parameters"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — an intent can carry parameters (like a specific record ID) appended to the navigation, which the target app's router/controller reads from the navigation context upon arrival to know exactly what to display, rather than the target app needing any hard-coded knowledge of the calling app.",
    detailedAnswer:
      "A navigation like `#SalesOrder-display` alone tells the target app what kind of thing to display in general, but a real navigation usually needs to specify which specific instance — passing a parameter (like an order ID) alongside the intent lets the calling app specify exactly that, without needing any direct knowledge of the target app's internal structure. On arrival, the target app's own routing/controller logic reads these parameters from the navigation context (via the Launchpad's cross-application navigation service) to know what specific data to load and display — the calling app doesn't need to construct a URL or know any details about how the target app internally handles this; it just expresses the intent plus relevant parameters, and the target app is responsible for correctly interpreting them.",
    hindiExplanation:
      "Ek navigation jaise `#SalesOrder-display` akela target app ko batata hai ki generally kis tarah ki cheez display karni hai, lekin ek real navigation ko usually specify karna padta hai kaunsi specific instance — ek parameter pass karna (jaise ek order ID) intent ke saath calling app ko exactly wo specify karne deta hai, target app ki internal structure ka koi direct knowledge chahiye bina. Arrival pe, target app ki apni routing/controller logic in parameters ko navigation context se read karti hai (Launchpad ki cross-application navigation service se) ye jaanne ke liye ki kaunsa specific data load/display karna hai.",
    interviewExplanation:
      "I'd explain the parameter mechanism: 'Yes — a navigation like #SalesOrder-display alone tells the target app what kind of thing generally, but passing a parameter like an order ID alongside it specifies exactly which instance, without the calling app needing any knowledge of the target's internal structure. The target app's own routing/controller logic reads these parameters from the navigation context on arrival to know what specific data to load — the calling app just expresses intent plus parameters, and the target interprets them.'",
    diagramNote:
      "'#SalesOrder-display + parameter (orderId=12345)' → 'Target app's router/controller reads parameter from navigation context on arrival' → 'Loads and displays that specific order' — calling app has no knowledge of target's internals.",
    diagramMermaid: `flowchart LR
    A["#SalesOrder-display<br/>+ orderId=12345"] --> B["Target app's router<br/>reads parameter on arrival"]
    B --> C["Loads/displays<br/>that specific order"]`,
    realProjectExample:
      "Clicking a specific order in a list app triggered a #SalesOrder-display navigation with that order's ID as a parameter, and the target order-detail app's own controller read that ID from the navigation context to load and display exactly that order, with the calling list app having zero knowledge of how the detail app internally worked.",
    interviewTip:
      "If asked how a Fiori app would deep-link to a specific record in another app (not just the app in general), describing parameterized intent navigation is the precise, correct mechanism.",
    followupQuestions: [
      "What specific API does a UI5 controller use to read incoming navigation parameters?",
      "Can multiple parameters be passed together with a single intent navigation?",
      "What happens if the target app doesn't recognize a parameter it receives?",
    ],
    commonMistakes: [
      "Assuming intent-based navigation can only trigger generic app-level navigation without any specific record context.",
      "Not knowing the target app itself is responsible for reading and interpreting the passed parameters.",
    ],
    importantPoints: [
      "Intents can carry parameters (like a record ID) alongside the semantic object/action.",
      "The target app's own routing/controller reads these parameters from the navigation context on arrival.",
      "The calling app needs no knowledge of the target app's internal structure to pass these parameters.",
    ],
    revisionNotes: "Intents can carry parameters (e.g. orderId) — target app's own router/controller reads them from the navigation context on arrival, calling app needs no knowledge of target's internals.",
  },
  {
    id: "lp-q14",
    topic: "Navigation",
    prompt: "What would you check if intent-based navigation fails silently — a tile click does nothing?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["navigation", "troubleshooting"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Check whether a target mapping actually exists and is correctly registered for that specific intent, whether the resolved target app is actually deployed and reachable, and check the browser console/Launchpad's own navigation logs for a specific resolution error, rather than assuming it's a generic 'broken tile'.",
    detailedAnswer:
      "A silent navigation failure has a few likely specific causes worth checking systematically: first, whether a target mapping genuinely exists and is correctly registered for the exact semantic object + action being navigated to (a typo in the semantic object name, or a mapping that was never actually configured, would cause exactly this symptom); second, whether the resolved target app (if a mapping does exist) is actually deployed, reachable, and healthy (a mapping pointing at a now-decommissioned or currently-down app); and third, checking the browser's developer console or the Launchpad's own navigation-related logging for a specific error message, which often reveals precisely which of these is the actual cause rather than guessing. Treating this as 'the tile is broken' generically, without this systematic check, wastes time compared to identifying the specific failure point directly.",
    hindiExplanation:
      "Ek silent navigation failure ke kuch likely specific causes hote hain check karne layak systematically: pehla, kya ek target mapping genuinely exist karti hai aur correctly registered hai exact semantic object + action ke liye jispe navigate ho raha hai; doosra, kya resolved target app (agar ek mapping exist karti hai) actually deployed, reachable, aur healthy hai; aur teesra, browser ke developer console ya Launchpad ki apni navigation-related logging check karna, jo aksar precisely reveal karti hai ki in mein se kaunsa actual cause hai.",
    interviewExplanation:
      "I'd give the systematic checklist: 'First, check whether a target mapping actually exists and is correctly registered for the exact semantic object and action — a typo or missing mapping causes exactly this symptom. Second, check whether the resolved target app, if a mapping does exist, is actually deployed and reachable — it might be down or decommissioned. Third, check the browser console or the Launchpad's own navigation logs for a specific error, which usually reveals precisely which of these is the cause, rather than treating it as a generic broken tile.'",
    diagramNote:
      "'Tile click does nothing' → check: '1. Target mapping exists/correctly registered?' '2. Resolved target app actually deployed/reachable?' '3. Browser console/Launchpad nav logs for specific error?'.",
    diagramMermaid: `flowchart TD
    A["Tile click does nothing"] --> B["1. Target mapping exists<br/>correctly registered?"]
    A --> C["2. Resolved target app<br/>deployed/reachable?"]
    A --> D["3. Console/nav logs<br/>for specific error"]`,
    realProjectExample:
      "A silently failing tile was traced to a typo in the semantic object name in the target mapping configuration (registered as 'SalesOrders' instead of 'SalesOrder'), quickly found by checking the browser console's specific navigation resolution error rather than guessing at the cause.",
    interviewTip:
      "If asked to debug a silently failing tile click, listing this specific ordered checklist (mapping existence, target reachability, console/logs) is far stronger than a vague 'I'd check the configuration'.",
    followupQuestions: [
      "What specific error message would the browser console typically show for a missing target mapping?",
      "How would you verify a target app is actually reachable versus just misconfigured?",
      "Would this troubleshooting approach differ for a mobile Launchpad client versus desktop browser?",
    ],
    commonMistakes: [
      "Treating a silently failing tile as a generic 'broken tile' issue without a systematic diagnostic approach.",
      "Not checking browser console/navigation logs, which often reveal the specific cause directly.",
    ],
    importantPoints: [
      "Check target mapping existence/registration for the exact semantic object and action first.",
      "Verify the resolved target app is actually deployed and reachable.",
      "Check browser console/Launchpad navigation logs for a specific, revealing error message.",
    ],
    revisionNotes: "Silent tile-click failure: check target mapping exists/correct, resolved target app is actually deployed/reachable, and browser console/nav logs for the specific error — don't just call it 'broken'.",
  },
  {
    id: "lp-q15",
    topic: "Intent",
    prompt: "Could the same semantic object have multiple actions mapped to different apps? Give an example.",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["intent", "multiple-actions"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — a semantic object commonly has several different actions, each potentially mapped to a different app: `SalesOrder-display` might go to a read-only detail viewer app, `SalesOrder-create` to a different creation-focused app, and `SalesOrder-approve` to yet another app specifically for the approval workflow — the semantic object stays consistent while each action routes to whatever app is actually responsible for that specific operation.",
    detailedAnswer:
      "This is exactly the intended, common usage pattern — the semantic object represents a consistent business entity across the whole vocabulary, while different actions on that same entity are often genuinely handled by entirely different, purpose-built apps rather than one monolithic app doing everything. `SalesOrder-display` might route to a lightweight, read-optimized viewer app; `SalesOrder-create` to a separate app with a more elaborate creation wizard/form; `SalesOrder-approve` to yet another app specifically designed around the approval workflow with its own specific UI for that purpose. This lets each specific action have a purpose-built, appropriately-scoped app rather than forcing a single app to awkwardly handle every possible action on an entity.",
    hindiExplanation:
      "Ye exactly wo intended, common usage pattern hai — semantic object ek consistent business entity represent karta hai poore vocabulary mein, jabki us same entity pe different actions aksar genuinely entirely different, purpose-built apps se handle hote hain, ek monolithic app sab kuch karne ki jagah. `SalesOrder-display` shayad ek lightweight, read-optimized viewer app tak route ho; `SalesOrder-create` ek alag app tak ek zyada elaborate creation wizard/form ke saath; `SalesOrder-approve` ek aur app tak jo specifically approval workflow ke around design ki gayi hai.",
    interviewExplanation:
      "I'd confirm and give the concrete example: 'Yes — this is the common intended pattern. SalesOrder-display might route to a lightweight, read-optimized viewer app, SalesOrder-create to a separate app with a more elaborate creation form, and SalesOrder-approve to yet another app built specifically for the approval workflow. The semantic object stays consistent, but each action routes to whatever purpose-built app actually handles that specific operation, rather than one app awkwardly doing everything.'",
    diagramNote:
      "'Semantic Object: SalesOrder' → 'Action: display → Viewer app', 'Action: create → Creation-wizard app', 'Action: approve → Approval-workflow app' — same entity, different purpose-built apps per action.",
    diagramMermaid: `flowchart LR
    A["Semantic Object:<br/>SalesOrder"] --> B["Action: display →<br/>Viewer app"]
    A --> C["Action: create →<br/>Creation-wizard app"]
    A --> D["Action: approve →<br/>Approval-workflow app"]`,
    realProjectExample:
      "A single 'SalesOrder' semantic object had display, create, and approve actions each routing to three genuinely different, purpose-built apps maintained by different teams, all navigable through the same consistent semantic vocabulary any calling app could rely on.",
    interviewTip:
      "If asked to design a Fiori landscape's navigation vocabulary, giving this exact pattern — one semantic object, multiple actions, multiple purpose-built target apps — shows practical, real-world intent-based navigation design experience.",
    followupQuestions: [
      "How would a calling app know which specific action to use for a given navigation intent?",
      "Could two different apps both register to handle the same exact semantic object + action combination?",
      "Would you ever consolidate several action-specific apps into one, and what would motivate that?",
    ],
    commonMistakes: [
      "Assuming a semantic object must always map to a single monolithic app handling every possible action.",
      "Not recognizing this multi-action, multi-app pattern as the intended, common design for intent-based navigation.",
    ],
    importantPoints: [
      "A semantic object commonly has multiple different actions, each potentially routed to a different app.",
      "This lets each action have a purpose-built, appropriately-scoped app rather than one monolith.",
      "The semantic object stays a consistent identifier across the whole vocabulary regardless of action count.",
    ],
    revisionNotes: "One semantic object (e.g. SalesOrder) commonly has multiple actions (display/create/approve), each routed to a different purpose-built app — the intended pattern, not a monolithic single-app design.",
  },
];

export const launchpadServiceMcqs: BtpMcq[] = [
  {
    id: "lp-mcq1",
    topic: "Tiles",
    prompt: "What distinguishes a dynamic tile from a static tile?",
    options: [
      "Dynamic tiles are bigger in size",
      "Dynamic tiles call a service to show live data, refreshed periodically",
      "Static tiles can only be used by admins",
      "There's no real difference",
    ],
    correctIndex: 1,
    explanation: "A dynamic tile calls a service (typically OData) to display live data like a count, refreshed periodically; a static tile just links to an app with no live data.",
  },
  {
    id: "lp-mcq2",
    topic: "Catalog",
    prompt: "Does existing in a Catalog automatically make a tile visible to every user?",
    options: [
      "Yes, catalogs are visible to everyone by default",
      "No — catalogs are assigned to roles, and only users with that role gain access",
      "Only on weekends",
      "Only if the tile is dynamic",
    ],
    correctIndex: 1,
    explanation: "A Catalog is just the inventory of available tiles; visibility requires the catalog to be assigned to a role the user actually has.",
  },
  {
    id: "lp-mcq3",
    topic: "Groups",
    prompt: "What is the relationship between a Catalog and a Group?",
    options: [
      "They are the same thing",
      "A Catalog is the available tile inventory; a Group is the actual arranged home page layout a user sees",
      "A Group is the inventory, a Catalog is the layout",
      "Groups replace the need for Catalogs entirely",
    ],
    correctIndex: 1,
    explanation: "Catalog = warehouse of available tiles (role-gated). Group = the actual, arranged home page layout a specific user sees, built from accessible catalog tiles.",
  },
  {
    id: "lp-mcq4",
    topic: "Roles",
    prompt: "What's the full chain that determines whether a user sees a specific tile?",
    options: [
      "Only group assignment matters",
      "Role template (grants catalog) → role collection (assigned to user) → catalog access → tile in an assigned group",
      "Only catalog existence matters",
      "Tiles are visible to everyone regardless of roles",
    ],
    correctIndex: 1,
    explanation: "Full visibility requires: a role template granting catalog access, bundled in a role collection assigned to the user, AND the tile being placed in a group the user is also assigned to.",
  },
  {
    id: "lp-mcq5",
    topic: "Navigation",
    prompt: "Why is intent-based navigation preferred over hard-coded URL links between Fiori apps?",
    options: [
      "It's faster to load",
      "It survives changes to the target app's deployment, since only the target mapping needs updating",
      "It removes the need for authentication",
      "It only works for static tiles",
    ],
    correctIndex: 1,
    explanation: "Intent-based navigation resolves a semantic intent to the current target app via target mapping — if the target app's deployment changes, only the mapping needs updating, not every calling app.",
  },
  {
    id: "lp-mcq6",
    topic: "Intent",
    prompt: "What are the two parts of an intent like #SalesOrder-display?",
    options: [
      "Username and password",
      "Semantic Object (SalesOrder) and Action (display)",
      "URL and port number",
      "Catalog ID and Group ID",
    ],
    correctIndex: 1,
    explanation: "An intent combines a Semantic Object (a business entity) and an Action (what to do with it), resolved via target mapping to a specific app.",
  },
  {
    id: "lp-mcq7",
    topic: "Tiles",
    prompt: "What's a performance risk of a home page with many dynamic tiles?",
    options: [
      "Dynamic tiles never cause any performance issue",
      "Each dynamic tile triggers its own backend call — many of them cause a burst of simultaneous requests on load",
      "Dynamic tiles only work on mobile devices",
      "They automatically disable themselves after 10 tiles",
    ],
    correctIndex: 1,
    explanation: "Every dynamic tile independently calls its data source on load and refresh — a page with dozens of them causes many simultaneous backend calls, especially at peak login times.",
  },
  {
    id: "lp-mcq8",
    topic: "Groups",
    prompt: "What does App Finder let a user do?",
    options: [
      "Search the entire internet for apps",
      "Self-service browse their accessible catalog inventory and add tiles to their own groups",
      "Bypass catalog/role authorization entirely",
      "Delete tiles from other users' groups",
    ],
    correctIndex: 1,
    explanation: "App Finder lets users browse everything they already have catalog access to and personally add specific tiles into their own groups, without needing an admin to place every tile manually.",
  },
  {
    id: "lp-mcq9",
    topic: "Roles",
    prompt: "What's the recommended approach to troubleshoot why a user can't see an expected tile?",
    options: [
      "Randomly reconfigure settings until it works",
      "Systematically check the chain: role collection assignment → role template/catalog grant → group placement",
      "Only check if the tile is dynamic or static",
      "Restart the Launchpad service",
    ],
    correctIndex: 1,
    explanation: "Walking the visibility chain in order — role collection, then the catalog-granting role template, then group placement — quickly isolates exactly which link is broken.",
  },
  {
    id: "lp-mcq10",
    topic: "Navigation",
    prompt: "Can an intent-based navigation pass a parameter like a specific record ID?",
    options: [
      "No, intents can only trigger generic navigation with no context",
      "Yes — parameters can be passed alongside the intent, read by the target app's own controller on arrival",
      "Only if the target app is written in UI5",
      "Only for the display action, never for create",
    ],
    correctIndex: 1,
    explanation: "Intents can carry parameters (e.g. an order ID), which the target app's routing/controller logic reads from the navigation context to know exactly what specific data to load.",
  },
];
