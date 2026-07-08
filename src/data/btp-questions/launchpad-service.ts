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
      "A static tile simply shows a title, icon, and subtitle and navigates to an app when clicked — no runtime data involved. A dynamic tile additionally calls a service (an OData request, typically) to display a live number or short piece of information — like an 'Open Orders: 12' count that updates periodically — giving at-a-glance status before even opening the app. Custom tiles let developers build entirely bespoke visuals and behavior beyond what the standard tile types support, useful for specialized dashboards or KPI displays that don't fit the standard static/dynamic pattern. These three tile types are the same regardless of content model — what differs is where a tile actually lives: in the current, default Spaces & Pages model (configured via the Content Manager), a tile sits inside a Section within a Page; in the legacy Catalog/Group model, it sits inside a Group. The tile itself — static, dynamic, or custom — doesn't change; only its container does.",
    hindiExplanation:
      "Static tile bas ek title, icon, aur subtitle dikhata hai aur click hone pe ek app navigate karta hai — koi runtime data involved nahi. Dynamic tile additionally ek service call karti hai (typically OData request) live number ya short information dikhane ke liye — jaise 'Open Orders: 12' count jo periodically update hota hai — app khole bina hi at-a-glance status deta hai. Custom tiles developers ko poori tarah bespoke visuals/behavior banane dete hain standard tile types se aage, specialized dashboards ke liye useful. Ye teen tile types content model ke hisaab se same rehte hain — jo differ karta hai wo hai tile kaha rehta hai: current, default Spaces & Pages model mein (Content Manager se configure hota hai), tile ek Page ke andar ek Section mein rehta hai; legacy Catalog/Group model mein, wo ek Group mein rehta hai. Tile khud — static, dynamic, ya custom — change nahi hota, sirf uska container change hota hai.",
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
    prompt: "What is a Catalog in the Launchpad configuration, and how does it relate to what a user sees? Is Catalog/Group still how modern BTP Launchpad Service content is modeled?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["catalog", "configuration", "spaces-pages"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A Catalog is the definition of available tiles/apps and their target mappings — the full inventory of what exists; a user only sees tiles from catalogs assigned to them (via a role), not the entire inventory automatically. Important nuance: Catalog + Group is the LEGACY content model. Since the 2021 release, the current, SAP-recommended default for the BTP Launchpad Service / SAP Build Work Zone is Spaces & Pages, configured in the Content Manager, with Role Collections assigning users to Spaces — Catalog/Group is now mainly kept around to federate content from on-premise ABAP Fiori Launchpad systems and for older tenants that haven't migrated.",
    detailedAnswer:
      "A Catalog contains tile definitions (which app, which intent, display properties) — the master list of everything potentially available in an area of the business. Simply existing in a catalog doesn't mean a specific user sees it; catalogs are assigned to roles, and only users with a role that includes a given catalog actually get access to those tiles (and only if they're also added to a Group they can see). That two-level design — catalog defines what exists, role/group assignment determines who sees what — is the mechanism, but it's the OLDER mechanism. Since 2021, SAP's default and recommended content model for the BTP Launchpad Service (and SAP Build Work Zone, standard and advanced editions) is Spaces & Pages: a Space is a container of one or more Pages representing a role/persona-based work area (e.g. 'Finance Manager'), a Page holds Sections, and each Section holds the actual app tiles — all configured through the Content Manager admin tool, with Role Collections doing the assignment (a Role Collection is assigned to a Space, and everyone holding that Role Collection gets that Space, and therefore its Pages/tiles, on their launchpad). Catalog/Group hasn't disappeared — it's still fully supported and is the mechanism used to federate content from an on-premise ABAP Fiori Launchpad (SAP_UI business catalogs exposed via a system alias/destination) into the cloud launchpad, and some tenants that pre-date the 2021 change still run on it — but for anything built new today, Spaces & Pages is what you configure.",
    hindiExplanation:
      "Catalog tile definitions contain karta hai (kaunsa app, kaunsa intent, display properties) — business ke ek area mein potentially available sab kuch ki master list. Sirf catalog mein exist karne ka matlab ye nahi ki koi specific user use dekhega — catalogs roles ko assign hote hain, aur sirf un users ko jinke paas wo role hai, tiles tak access milta hai. Lekin ye poora Catalog+Group mechanism ab LEGACY hai. 2021 se, BTP Launchpad Service / SAP Build Work Zone ka default aur recommended content model Spaces & Pages hai: Space ek container hai ek ya zyada Pages ka, ek role/persona-based work area represent karta hai (jaise 'Finance Manager'), Page ke andar Sections hote hain, aur Section ke andar actual tiles — sab Content Manager admin tool se configure hota hai, Role Collections assignment karti hain (ek Role Collection Space ko assign hoti hai, jiske paas wo Role Collection hai use wo Space, aur uski Pages/tiles, launchpad pe milti hain). Catalog/Group gaya nahi hai — abhi bhi fully supported hai aur on-premise ABAP Fiori Launchpad ka content cloud launchpad mein federate karne ke liye use hota hai, aur kuch purane tenants abhi bhi isi pe chal rahe hain — lekin naya kuch banate waqt Spaces & Pages hi configure karte hain.",
    interviewExplanation:
      "I'd correct the premise first, then explain both models: 'A Catalog is the master inventory of tile definitions, assigned to roles, with Groups being the actual arranged home page — but that's the legacy model. Since 2021, the default and recommended model for BTP Launchpad Service and Work Zone is Spaces and Pages, configured in the Content Manager, with Role Collections assigning users to Spaces. Catalog/Group is still fully supported and is mainly used today to federate content from an on-premise ABAP Fiori Launchpad, or on tenants that haven't migrated — but if I were configuring something new, I'd reach for Spaces and Pages.'",
    diagramNote:
      "Legacy: 'Catalog (master tile inventory)' → assigned to → 'Role' → assigned to → 'User'. Current default: 'Content Manager' → 'Space (container of Pages)' → 'Role Collection assigned to the Space' → 'User with that Role Collection sees the Space's Pages/tiles'. Catalog/Group persists mainly for on-prem ABAP Fiori Launchpad content federation.",
    diagramMermaid: `flowchart TD
    subgraph Legacy["Legacy model (still supported)"]
    A["Catalog<br/>master tile inventory"] --> B["Role"]
    B --> C["User"]
    end
    subgraph Current["Current default (since 2021)"]
    D["Content Manager"] --> E["Space<br/>container of Pages"]
    E --> F["Role Collection<br/>assigned to Space"]
    F --> G["User with that<br/>Role Collection"]
    end
    Legacy -.->|"used to federate<br/>on-prem ABAP Fiori Launchpad content"| Current`,
    realProjectExample:
      "A 'Finance Apps' catalog contained dozens of tile definitions surfaced to individual users based on their assigned roles — that was the original 2019-era setup. When the team migrated to SAP Build Work Zone, they rebuilt the same experience as a 'Finance' Space containing role-specific Pages (Finance Manager, AP Clerk), assigned via Role Collections through the Content Manager, while keeping the old catalog only as a federation source for a handful of on-premise ABAP Fiori apps that hadn't been replatformed yet.",
    interviewTip:
      "If asked 'if a tile is in a catalog, will every user see it', the correct answer is no — role assignment (and group visibility) determines it. But also proactively mention that Catalog/Group is the legacy model and Spaces & Pages (via Content Manager, driven by Role Collections) is the current default — that distinction is exactly what many candidates miss and interviewers probe for.",
    followupQuestions: [
      "How is a catalog different from a group?",
      "What are Spaces and Pages, and how do Role Collections drive Space assignment?",
      "Why would you still use Catalog/Group on a modern BTP subaccount?",
    ],
    commonMistakes: [
      "Assuming every tile in a catalog is automatically visible to every user.",
      "Presenting Catalog/Group as 'the' Launchpad content model without mentioning Spaces & Pages is the current default.",
      "Not knowing Catalog/Group's main remaining purpose is federating on-premise ABAP Fiori Launchpad content.",
    ],
    importantPoints: [
      "Catalog = master inventory of tile/app definitions, assigned to roles — this is the legacy model.",
      "Existing in a catalog doesn't mean automatic visibility — role assignment does.",
      "Since 2021, Spaces & Pages (via Content Manager, driven by Role Collections) is SAP's recommended default content model.",
      "Catalog/Group persists mainly for on-prem ABAP Fiori Launchpad content federation and un-migrated tenants.",
    ],
    revisionNotes: "Catalog = legacy master tile inventory, assigned to roles. Current default since 2021 = Spaces & Pages via Content Manager, with Role Collections assigning Spaces. Catalog/Group survives mainly to federate on-prem ABAP Fiori Launchpad content.",
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
      "A Group defines the actual visual layout of tiles on a user's home page (which tiles, in what order/section), while a Catalog is just the underlying inventory of what tiles are available — a tile must exist in an assigned catalog before it can be added to a group, but the group is what a user actually sees arranged on their home page. Note that Group is the legacy counterpart of a Page in the current Spaces & Pages model — a Page (made of Sections) is what actually holds the tile layout today, while a Group still plays that role only where the older Catalog/Group model is still in use.",
    detailedAnswer:
      "Think of the Catalog as the warehouse of available products, and the Group as the specific display shelf a particular user sees, arranged with only the items relevant to them, in a specific order. You can't add a tile to a group unless its underlying catalog is assigned to that user's role — but conversely, having catalog access doesn't automatically populate a group; someone (an admin, or the user via self-service 'app finder' if enabled) explicitly adds specific tiles from accessible catalogs into a group, arranging the actual home page layout. This separation lets the same catalog of available apps be arranged differently into different groups for different user populations, or even personalized per individual. It's worth being precise in an interview about where this model actually sits today: Catalog/Group is the LEGACY content model. Since the 2021 release, the current default is Spaces & Pages — a Page is the direct conceptual successor to a Group (it's the thing that actually holds the arranged tile layout a user sees), except a Page is built from one or more Sections (each Section is a labelled grouping of tiles, similar in spirit to how a Group grouped tiles, just nested one level deeper inside a Space), and Pages are configured in the Content Manager rather than the classic catalog/group admin UI. Multiple Pages are bundled into a Space, and a Space is what actually gets assigned to users — via a Role Collection, not a role template/catalog chain.",
    hindiExplanation:
      "Catalog ko available products ka warehouse samjho, aur Group ko wo specific display shelf jo ek particular user dekhta hai, sirf unke relevant items ke saath arranged, ek specific order mein. Tum ek tile ko group mein add nahi kar sakte jab tak uska underlying catalog us user ke role ko assign na ho — lekin ulta, catalog access hone se group automatically populate nahi hota; koi (admin, ya user khud self-service 'app finder' se agar enabled ho) explicitly accessible catalogs se specific tiles group mein add karta hai, actual home page layout arrange karte hue. Lekin interview mein precise rehna zaroori hai: Catalog/Group LEGACY content model hai. 2021 se, current default Spaces & Pages hai — Page hi Group ka direct conceptual successor hai (wahi cheez jo actually arranged tile layout hold karti hai jo user dekhta hai), bas Page ek ya zyada Sections se bana hota hai (har Section tiles ka ek labelled grouping hai, kuch Group jaisa hi, bas ek level deeper Space ke andar), aur Pages Content Manager mein configure hoti hain, purane catalog/group admin UI mein nahi. Multiple Pages ek Space mein bundle hoti hain, aur Space hi actually users ko assign hota hai — Role Collection ke through, role template/catalog chain se nahi.",
    interviewExplanation:
      "I'd use the warehouse-vs-shelf analogy, then place it in the current model: 'Catalog is the warehouse of available apps, Group is the actual shelf layout a user sees — but that's the legacy model. Today, the direct equivalent of a Group is a Page, built from Sections that hold the tiles, configured in the Content Manager. Several Pages roll up into a Space, and it's the Space that gets assigned to users, via a Role Collection. Catalog/Group still works and is still used, mainly for on-prem content federation, but if I were describing the current default, I'd talk about Spaces, Pages, and Sections, not Catalogs and Groups.'",
    diagramNote:
      "Legacy: 'Catalog (available tiles, role-assigned)' --tiles selected from--> 'Group (actual home page layout, arranged)' --seen by--> 'User'. Current: 'Space' contains 'Page(s)' contains 'Section(s)' contains 'Tiles' — Space assigned to users via a 'Role Collection'. Page = the modern successor to Group.",
    diagramMermaid: `flowchart TD
    subgraph Legacy["Legacy model"]
    A["Catalog<br/>available tiles, role-assigned"] -- "tiles selected from" --> B["Group<br/>actual home page layout"]
    B --> C["User sees this"]
    end
    subgraph Current["Current model (Spaces & Pages)"]
    D["Space"] --> E["Page(s)<br/>successor to Group"]
    E --> F["Section(s)"]
    F --> G["Tiles"]
    H["Role Collection"] --> D
    end`,
    realProjectExample:
      "Two different user populations had access to the same 'Finance Apps' catalog but were assigned to different Groups — one arranged for approval-focused daily tasks, another for month-end reporting — under the old model. After migrating to SAP Build Work Zone, this became two Pages ('Approvals', 'Month-End Reporting') inside a single 'Finance' Space, each with its own Sections, with the whole Space assigned via a Role Collection instead of maintaining separate role/catalog assignments per group.",
    interviewTip:
      "The warehouse/shelf analogy is a memorable way to explain the legacy Catalog/Group distinction — but immediately follow it up by naming Page as the modern successor to Group, built from Sections inside a Space, since that's the part interviewers are actually listening for in 2024+ hiring.",
    followupQuestions: [
      "Can a user be assigned to multiple groups (or, today, multiple Spaces/Pages)?",
      "What is 'app finder' and how does it relate to groups?",
      "How does a Page's Section structure compare to a Group's tile list?",
    ],
    commonMistakes: [
      "Confusing a Catalog (inventory) with a Group (actual home page layout).",
      "Assuming catalog role access automatically populates a user's home page groups.",
      "Not knowing that Page (inside a Space) is the current, SAP-recommended successor to Group.",
    ],
    importantPoints: [
      "Group = actual home page tile layout a user sees — this is the legacy model.",
      "Catalog = underlying inventory of available tiles (role-gated) — also legacy.",
      "Page (built from Sections, inside a Space) is the current default successor to Group, configured via Content Manager.",
      "Spaces are assigned to users via Role Collections, not the role-template-to-catalog chain.",
    ],
    revisionNotes: "Legacy: Group = actual home page layout (shelf), Catalog = available tile inventory (warehouse). Current default: Page (built from Sections) inside a Space is the successor to Group — Space assigned via Role Collection, configured in Content Manager.",
  },
  {
    id: "lp-q4",
    topic: "Roles",
    prompt: "How do BTP role collections tie into what a user sees on their Launchpad?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["roles", "role-collections", "spaces-pages"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Role Collections are the assignment mechanism in BOTH content models, but the thing they assign to differs. In the current, default Spaces & Pages model, a Role Collection is assigned directly to a Space in the Content Manager — every user holding that Role Collection gets that Space (and therefore its Pages/tiles) on their launchpad. In the legacy Catalog/Group model, a role template (bundled inside a Role Collection) grants access to a Catalog, and the tile only becomes visible once it's also placed in a Group the user is assigned to.",
    detailedAnswer:
      "This connects the earlier BTP security concepts (role collections) directly to the Launchpad, and it's important to know both wirings since interviewers often test whether you know the model changed in 2021. Current default (Spaces & Pages): in the Content Manager, an admin assigns one or more Role Collections directly to a Space. Any user who holds that Role Collection automatically gets that Space — and every Page (and its Sections/tiles) inside it — on their launchpad; no separate catalog or group step is needed, the Role Collection-to-Space assignment IS the access-and-visibility mechanism in one step. Legacy (Catalog/Group): a role template can grant access to a specific catalog (among possibly other, non-Launchpad permissions like API scopes); an admin assigns a Role Collection containing that template to a user, granting them access to that catalog's tiles; whether those tiles actually show up on the home page then further depends on group assignment — so the full legacy chain is role template grants catalog access → role collection (bundling that template) assigned to the user → tile from that catalog added to a group the user is also assigned to. Both models still exist side by side on many tenants (Spaces & Pages for native cloud apps, Catalog/Group federating on-prem ABAP Fiori Launchpad content) — a senior answer names both and says which one is the default today.",
    hindiExplanation:
      "Ye pehle wale BTP security concepts (role collections) ko directly Launchpad se connect karta hai, aur dono wiring jaanna zaroori hai kyunki interviewers often test karte hain ki tumhe pata hai ki model 2021 mein change hua. Current default (Spaces & Pages): Content Manager mein, admin ek ya zyada Role Collections directly ek Space ko assign karta hai. Jis user ke paas wo Role Collection hai use automatically wo Space milta hai — aur uske andar ki har Page (aur uski Sections/tiles) — launchpad pe; koi separate catalog ya group step nahi chahiye, Role Collection-to-Space assignment hi access-aur-visibility mechanism hai ek hi step mein. Legacy (Catalog/Group): ek role template ek specific catalog tak access grant kar sakta hai; admin ek Role Collection jisme wo template ho, user ko assign karta hai, jo unhe us catalog ke tiles tak access deta hai; wo tiles actually dikhenge ya nahi, ye further group assignment pe depend karta hai — toh poori legacy chain hai: role template catalog access grant karta hai → role collection (us template ko bundle karke) user ko assign hota hai → us catalog se tile ek group mein add hota hai jise user bhi assigned hai. Dono models kai tenants pe saath-saath exist karte hain (Spaces & Pages native cloud apps ke liye, Catalog/Group on-prem ABAP Fiori Launchpad content federate karne ke liye) — ek senior answer dono naam leta hai aur batata hai ki aaj kaunsa default hai.",
    interviewExplanation:
      "I'd give both chains and be explicit about which is current: 'In the current default model, Spaces and Pages, a Role Collection is assigned directly to a Space in the Content Manager — anyone holding it gets that Space's Pages and tiles, full stop, one step. In the legacy Catalog/Group model, a role template grants catalog access, a role collection bundling that template is assigned to the user, and the tile only shows up once it's also placed in a group the user is assigned to — so that's a two-step chain. I'd name both because a lot of real tenants still have some on-prem content coming in through the legacy path even while running Spaces and Pages for everything else.'",
    diagramNote:
      "Current default: 'Content Manager' → 'Role Collection assigned to Space' → 'User with that Role Collection gets the Space's Pages/tiles' (one step). Legacy chain: 'Role template (grants catalog access)' → 'Role collection (bundles template)' → 'Assigned to user' → 'Catalog access granted' → 'Tile in an assigned Group' → 'Visible on home page' (two steps).",
    diagramMermaid: `flowchart TD
    subgraph Current["Current default: Spaces & Pages"]
    RC1["Role Collection"] --> SP["assigned to a Space<br/>(in Content Manager)"]
    SP --> U1["User holding that<br/>Role Collection"]
    U1 --> V1["Gets the Space's<br/>Pages/tiles"]
    end
    subgraph Legacy["Legacy: Catalog & Group"]
    A["Role template<br/>grants catalog access"] --> B["Role collection<br/>bundles template"]
    B --> C["Assigned to user"]
    C --> D["Catalog access granted"]
    D --> E["Tile in assigned Group"]
    E --> F["Visible on home page"]
    end`,
    realProjectExample:
      "Troubleshooting why a user couldn't see an expected tile in an older tenant traced back through the legacy chain — their role collection was missing the specific role template granting that tile's catalog, even though they were correctly assigned to the relevant group. On a newer Work Zone tenant, the equivalent issue was simpler to diagnose: the user's Role Collection just hadn't been assigned to the relevant Space in the Content Manager yet.",
    interviewTip:
      "If asked to debug 'a user can't see a tile they should have', ask (or state) which model the tenant uses — for Spaces & Pages, check the Role Collection-to-Space assignment in Content Manager first; for Catalog/Group, walk the full chain (role template → role collection → catalog → group). Naming both paths shows you're not just parroting one memorized flow.",
    followupQuestions: [
      "What's the fastest way to check why a specific user can't see an expected tile?",
      "Can a single Role Collection be assigned to multiple different Spaces?",
      "Does removing a Role Collection from a user immediately hide their Space/tiles?",
    ],
    commonMistakes: [
      "Only describing the legacy role-template → catalog → group chain and not knowing Role Collections assign directly to Spaces today.",
      "Not connecting Launchpad tile visibility back to the broader BTP Role Collection model in either content model.",
    ],
    importantPoints: [
      "Current default: Role Collection is assigned directly to a Space (in Content Manager) — one step to full visibility.",
      "Legacy: role template grants catalog access, bundled in a Role Collection assigned to the user, tile still needs group placement — two steps.",
      "Both models can coexist on one tenant; know which one you're being asked about.",
    ],
    revisionNotes: "Current: Role Collection → assigned to Space (Content Manager) → user gets Space's Pages/tiles (1 step). Legacy: role template (grants catalog) → role collection (bundles it, assigned to user) → catalog access → tile in an assigned group → visible (2 steps).",
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
      "The content of a catalog — its tile definitions, which intents they trigger, their display properties — is closely tied to the app itself and is typically defined/deployed alongside the app by its developers, since it's essentially part of describing what the app offers navigationally. Once that catalog exists, though, deciding who should have access to it (assigning it to specific roles) and how those tiles get organized into a specific user population's home page (building groups) is fundamentally a business/organizational decision, not a technical one — appropriately handled by admins who understand the organization's actual role structure and user needs, not by the developers who built the underlying app. This split keeps technical app-definition concerns separate from organizational access/layout decisions. Note this Q&A describes the legacy Catalog/Group workflow. In the current default Spaces & Pages model, the same split still holds conceptually — developers still define what apps/tiles exist — but admins do the organizational work (building Spaces, Pages, and Sections, and assigning Role Collections to Spaces) inside the Content Manager instead of a separate catalog-and-group admin UI, and there's no separate 'assign catalog to role' step since Role Collections attach directly to the Space.",
    hindiExplanation:
      "Ek catalog ka content — uske tile definitions, kaunse intents wo trigger karte hain, unki display properties — closely app se hi tied hota hai aur typically app ke developers dwara define/deploy hota hai app ke saath, kyunki ye essentially describe karta hai app kya navigationally offer karta hai. Ek baar wo catalog exist karta hai, though, decide karna ki kisko uska access hona chahiye (specific roles ko assign karna) aur wo tiles kaise organize hote hain ek specific user population ke home page mein (groups banana) fundamentally ek business/organizational decision hai, technical nahi — admins dwara appropriately handle kiya jaata hai. Ye Q&A legacy Catalog/Group workflow describe karta hai. Current default Spaces & Pages model mein, yehi split conceptually hold karta hai — developers abhi bhi define karte hain ki apps/tiles kya exist karte hain — lekin admins organizational kaam (Spaces, Pages, Sections banana, aur Role Collections ko Spaces assign karna) Content Manager ke andar karte hain, alag catalog-aur-group admin UI mein nahi, aur koi separate 'catalog ko role assign karo' step nahi hai kyunki Role Collections directly Space se attach hoti hain.",
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
      "Without App Finder, a user's only path to seeing a tile is an admin explicitly adding it to a group they're assigned to — even if the user has catalog access (via their role) to many more apps than currently appear on their home page. App Finder gives users a self-service way to browse everything they're actually authorized to access (their full accessible catalog inventory) and personally add specific tiles into their own groups, customizing their home page layout themselves rather than depending entirely on an admin's manual group curation. This is useful for apps that are relevant to some but not all users with a given role, letting individuals opt in to what's actually useful for their specific work rather than an admin trying to guess and pre-populate everything for everyone. It's worth flagging in an interview that App Finder is specifically a legacy Catalog/Group feature — in the current default Spaces & Pages model, content is curated centrally by admins as Pages/Sections inside a Space in the Content Manager, and a user simply gets whatever Space their Role Collection grants them rather than self-service browsing a catalog inventory.",
    hindiExplanation:
      "App Finder ke bina, ek user ka ek tile dekhne ka sirf ek path hai — ek admin explicitly use ek group mein add kare jise wo assigned hai — chahe user ke paas catalog access ho (unke role se) kai aur apps tak jo currently unke home page pe nahi dikhte. App Finder users ko ek self-service tarika deta hai sab kuch browse karne ke liye jo wo actually authorized hain access karne ke liye, aur specific tiles ko apne khud ke groups mein personally add karne ke liye, apna home page layout khud customize karte hue admin ki manual group curation pe poori tarah depend karne ki jagah. Interview mein flag karna zaroori hai ki App Finder specifically legacy Catalog/Group feature hai — current default Spaces & Pages model mein, content centrally admins curate karte hain Pages/Sections ki tarah ek Space ke andar Content Manager mein, aur user ko bas wo Space mil jaata hai jo unka Role Collection grant karta hai, self-service catalog browsing nahi.",
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
      "Since a group is just an arrangement referencing catalog tiles (not a separate copy of the tile's actual definition), the same tile can be placed into any number of different groups without duplicating anything at the catalog level — group A and group B can both include a reference to the same 'SalesOrder-display' tile, each with it positioned differently alongside different neighboring tiles relevant to that specific group's audience. This is useful when an app is broadly relevant across different teams or contexts (e.g. a company-wide 'submit expense report' app that different departments' groups all want to include, each alongside their own department-specific other tiles). The same reference-not-copy behavior holds in the current Spaces & Pages model too: the same app/tile can be placed into a Section on any number of different Pages, even across different Spaces, without duplicating the underlying app registration — a 'Submit Expense Report' tile could sit in a Section on a Sales Space's Page and equally on an Engineering Space's Page.",
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
    tags: ["roles", "troubleshooting", "spaces-pages"],
    estimatedMinutes: 3,
    expectedAnswer:
      "First confirm which content model the tenant actually uses. On a Spaces & Pages tenant, check whether the user's Role Collection is genuinely assigned to the relevant Space in the Content Manager — that's usually the whole story. On a legacy Catalog/Group tenant, systematically check each link in order: does the user have the role collection containing the relevant role template, does that template actually grant the specific catalog, and is the specific tile actually present in a group the user is assigned to.",
    detailedAnswer:
      "Current default (Spaces & Pages): the check is much shorter — confirm the user actually holds the expected Role Collection, then confirm that Role Collection is genuinely assigned to the Space containing the tile's Page/Section in the Content Manager. If both are true, the tile should appear; if not, one of those two is the gap. Legacy (Catalog/Group): given the chain (role template grants catalog → role collection bundles template, assigned to user → catalog access granted → tile placed in an assigned group → visible), a systematic troubleshooting approach checks each link in order rather than guessing: first confirm the user actually has the expected role collection assigned; then confirm that role collection genuinely includes the role template granting the relevant catalog; then confirm the specific tile is actually present in a group the user is assigned to (catalog access alone doesn't guarantee group placement). Either way, working through the relevant chain systematically, rather than jumping straight to reconfiguring things randomly, quickly isolates exactly which link is broken — and knowing which content model you're on tells you which chain to walk.",
    hindiExplanation:
      "Current default (Spaces & Pages): check bahut chhota hai — confirm karo ki user ke paas actually expected Role Collection hai, fir confirm karo ki wo Role Collection genuinely us Space ko assigned hai jisme tile ki Page/Section hai, Content Manager mein. Dono true hain toh tile dikhni chahiye; nahi toh in dono mein se ek gap hai. Legacy (Catalog/Group): given ye chain (role template catalog grant karta hai → role collection template bundle karta hai, user ko assign hota hai → catalog access milta hai → tile ek assigned group mein place hota hai → visible hota hai), ek systematic troubleshooting approach har link ko order mein check karta hai guess karne ki jagah: pehle confirm karo ki user ke paas actually expected role collection assigned hai; fir confirm karo ki wo role collection genuinely relevant catalog grant karne wala role template include karta hai; fir confirm karo ki specific tile actually ek assigned group mein present hai. Dono cases mein, pehle ye jaanna zaroori hai ki tenant kaunsa content model use kar raha hai, taaki sahi chain check karo.",
    interviewExplanation:
      "I'd first establish which model, then walk the right chain: 'On a modern Spaces and Pages tenant, it's usually a two-check process — does the user hold the expected Role Collection, and is that Role Collection actually assigned to the right Space in the Content Manager. On a legacy Catalog/Group tenant, it's a longer chain — role collection, then the catalog-granting role template, then group placement, checked in order. Either way, I'd figure out the content model first so I'm not walking the wrong checklist.'",
    diagramNote:
      "Current default: '1. User has expected Role Collection?' → '2. Role Collection assigned to the right Space in Content Manager?' → done. Legacy: '1. User has expected role collection?' → '2. Role collection includes the relevant role template/catalog?' → '3. Tile actually present in an assigned group?'.",
    diagramMermaid: `flowchart TD
    Start{"Which content model?"} -->|"Spaces & Pages"| A1["1. User has expected<br/>Role Collection?"]
    A1 --> A2["2. Role Collection assigned<br/>to the right Space?"]
    A2 --> A3["Isolate the gap"]
    Start -->|"Legacy Catalog/Group"| B1["1. User has expected<br/>role collection?"]
    B1 --> B2["2. Role collection includes<br/>relevant role template/catalog?"]
    B2 --> B3["3. Tile present in<br/>an assigned group?"]
    B3 --> A3`,
    realProjectExample:
      "A support ticket about a missing tile on a legacy tenant was resolved in minutes by checking the chain systematically — the user had the correct role collection assigned, but it was missing the role template granting the relevant catalog. On a newer Work Zone tenant, an equivalent ticket was resolved even faster — the user's Role Collection simply hadn't been attached to the right Space in the Content Manager yet.",
    interviewTip:
      "If asked to troubleshoot this exact scenario, first stating which content model you're assuming (and why the checklist differs) before walking the chain shows you know the platform actually has two different wirings today, not just one memorized flow.",
    followupQuestions: [
      "What tool or cockpit view would you use to check a user's actual assigned role collections?",
      "How would you verify a Role Collection's Space assignment without trial and error?",
      "Would this same troubleshooting chain apply if the issue were a dynamic tile showing stale data instead of a missing tile?",
    ],
    commonMistakes: [
      "Jumping straight to reconfiguring group/page assignments without first checking role collection access.",
      "Not having a systematic, ordered approach and instead guessing randomly at what might be wrong.",
      "Applying the longer legacy Catalog/Group checklist on a tenant that's actually running Spaces & Pages, or vice versa.",
    ],
    importantPoints: [
      "First identify which content model the tenant uses — that determines which checklist applies.",
      "Spaces & Pages: check Role Collection assignment, then Role Collection-to-Space assignment in Content Manager.",
      "Legacy Catalog/Group: check role collection → role template/catalog → group placement, in order.",
    ],
    revisionNotes: "Troubleshoot missing tile: first confirm content model. Spaces & Pages = check Role Collection → Space assignment (Content Manager), 2 steps. Legacy Catalog/Group = check role collection → role template/catalog grant → group placement, 3 steps.",
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
  {
    id: "lp-q16",
    topic: "Spaces & Pages",
    prompt: "What are Spaces and Pages in the BTP Launchpad Service, and how do they relate to Role Collections?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["spaces", "pages", "content-manager", "role-collections"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A Space is a container for one or more Pages, representing a role/persona-based work area (e.g. 'Sales Manager'); a Page is made of Sections, and each Section holds the actual app tiles. Both are configured through the Content Manager, and a Space is assigned to users via a Role Collection — anyone holding that Role Collection gets that Space (and every Page/tile inside it) on their launchpad. This is the SAP-recommended default content model since the 2021 release, replacing the older Catalog + Group approach for content built directly in the cloud.",
    detailedAnswer:
      "Spaces & Pages is the current, default content model for the BTP Launchpad Service and SAP Build Work Zone (standard and advanced editions), configured through the Content Manager admin tool rather than the older catalog/group configuration UI. The hierarchy has three levels: a Space is the top-level container, typically modeled around a role or persona (e.g. 'Finance Manager', 'Sales Rep') — it's the thing that actually gets assigned to users. Inside a Space, one or more Pages organize related work (e.g. a 'Finance Manager' Space might have an 'Approvals' Page and a 'Reporting' Page). Each Page is built from one or more Sections, which are labelled groupings of tiles (conceptually similar to what a Group used to do, just nested one level deeper). The assignment mechanism is Role Collections: in the Content Manager, an admin assigns one or more Role Collections directly to a Space; any user who holds that Role Collection automatically gets that Space — and therefore all its Pages, Sections, and tiles — on their launchpad, in one step, with no separate catalog-then-group dance. This is a meaningfully simpler and more direct model than legacy Catalog/Group (role template → role collection → catalog access → tile-in-a-group), and it's why SAP made it the default: fewer moving pieces, and Spaces map naturally onto how organizations already think about roles/personas. Catalog/Group hasn't been removed — it's still how you federate content from an on-premise ABAP Fiori Launchpad system into the cloud launchpad, and some content sources (including certain federated catalogs) can still be surfaced as tiles inside a modern Page — but for anything authored natively today, you're working in Spaces and Pages.",
    hindiExplanation:
      "Spaces & Pages BTP Launchpad Service aur SAP Build Work Zone (standard aur advanced editions) ka current, default content model hai, Content Manager admin tool se configure hota hai, purane catalog/group configuration UI se nahi. Hierarchy teen levels ki hai: Space top-level container hai, typically ek role ya persona ke around modeled (jaise 'Finance Manager', 'Sales Rep') — yahi cheez actually users ko assign hoti hai. Space ke andar, ek ya zyada Pages related work organize karte hain (jaise ek 'Finance Manager' Space mein ek 'Approvals' Page aur ek 'Reporting' Page ho sakta hai). Har Page ek ya zyada Sections se bana hota hai, jo tiles ka labelled grouping hai (conceptually Group jaisa hi, bas ek level deeper nested). Assignment mechanism Role Collections hai: Content Manager mein, admin ek ya zyada Role Collections directly ek Space ko assign karta hai; jis user ke paas wo Role Collection hai use automatically wo Space milta hai — aur isliye uski saari Pages, Sections, aur tiles — launchpad pe, ek hi step mein, koi separate catalog-phir-group dance nahi. Ye legacy Catalog/Group (role template → role collection → catalog access → tile-in-a-group) se meaningfully simpler aur direct model hai, aur isi wajah se SAP ne ise default banaya: kam moving pieces, aur Spaces naturally map hote hain jaise organizations already roles/personas ke baare mein sochte hain. Catalog/Group hataya nahi gaya hai — abhi bhi on-premise ABAP Fiori Launchpad system se content cloud launchpad mein federate karne ke liye use hota hai — lekin naya kuch author karte waqt, tum Spaces aur Pages mein hi kaam kar rahe ho.",
    interviewExplanation:
      "I'd walk the hierarchy top-down and land on the Role Collection mechanism: 'A Space is the top-level container, usually modeled around a role or persona, and it's what actually gets assigned to users. Inside it, one or more Pages organize related work, and each Page is built from Sections holding the actual tiles. Everything's configured in the Content Manager. The assignment is done via Role Collections — an admin assigns a Role Collection directly to a Space, and anyone holding that Role Collection gets the whole Space, Pages and all, in one step. This has been the SAP-recommended default since the 2021 release, replacing the older two-step Catalog-plus-Group model for natively authored content.'",
    diagramNote:
      "'Content Manager' configures → 'Space (container, role/persona-based)' contains → 'Page(s)' contains → 'Section(s)' contains → 'Tiles'. Assignment: 'Role Collection' → assigned to → 'Space' → 'User holding that Role Collection sees the whole Space'.",
    diagramMermaid: `flowchart TD
    CM["Content Manager"] --> SP["Space<br/>role/persona-based container"]
    SP --> PG1["Page: Approvals"]
    SP --> PG2["Page: Reporting"]
    PG1 --> SEC1["Section(s)"]
    SEC1 --> T1["Tiles"]
    RC["Role Collection"] --> SP
    RC --> U["User holding it gets<br/>the whole Space"]`,
    realProjectExample:
      "A 'Finance' Space was built with an 'Approvals' Page and a 'Month-End Reporting' Page, each with its own Sections of tiles, and assigned to end users purely by attaching the 'Finance Manager' Role Collection to that Space in the Content Manager — no catalog definitions or group curation were involved, a noticeably faster setup than the equivalent legacy configuration on an older tenant.",
    interviewTip:
      "If asked to design a new Launchpad content structure for a fresher project, describing Spaces & Pages via the Content Manager (not Catalog/Group) as your default choice — and being able to name the Space→Page→Section→Tile hierarchy plus the Role Collection assignment — is exactly what separates candidates with current knowledge from those repeating outdated tutorials.",
    followupQuestions: [
      "How does a Page's Section structure compare to a legacy Group's tile list?",
      "Can the same Role Collection be assigned to more than one Space?",
      "Why would a modern tenant still need the legacy Catalog/Group model at all?",
    ],
    commonMistakes: [
      "Describing only Catalog/Group as if it's the only or current Launchpad content model.",
      "Mixing up the hierarchy order — Space contains Pages, Pages contain Sections, Sections contain tiles, not the reverse.",
      "Not knowing Role Collections assign directly to a Space, with no separate catalog/group step needed.",
    ],
    importantPoints: [
      "Hierarchy: Space (role/persona container) → Page(s) → Section(s) → Tiles.",
      "Configured via the Content Manager, the current default admin tool for Launchpad content.",
      "Role Collections assign directly to a Space — one step grants a user the whole Space's Pages/tiles.",
      "This has been SAP's recommended default since the 2021 release, alongside the still-supported legacy Catalog/Group model.",
    ],
    revisionNotes: "Spaces & Pages (current default, since 2021): Space (role/persona container) → Page(s) → Section(s) → Tiles, configured via Content Manager. Role Collection assigned directly to a Space grants the whole thing — simpler than legacy Catalog/Group's role template → catalog → group chain.",
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
  {
    id: "lp-mcq11",
    topic: "Spaces & Pages",
    prompt: "What is the SAP-recommended default content model for the BTP Launchpad Service / SAP Build Work Zone since the 2021 release?",
    options: [
      "Catalog and Group",
      "Spaces and Pages, configured via the Content Manager",
      "There is no default — every tenant must pick manually with no guidance",
      "Business Catalogs federated from an on-premise ABAP system",
    ],
    correctIndex: 1,
    explanation: "Since the 2021 release, Spaces & Pages (configured through the Content Manager) is SAP's default and recommended content model; Catalog/Group is the legacy model, kept mainly for on-premise ABAP Fiori Launchpad content federation.",
  },
  {
    id: "lp-mcq12",
    topic: "Spaces & Pages",
    prompt: "What is the correct content hierarchy in the Spaces & Pages model?",
    options: [
      "Group → Catalog → Tile",
      "Space → Page(s) → Section(s) → Tile(s)",
      "Tile → Section → Page → Space",
      "Role Collection → Catalog → Group",
    ],
    correctIndex: 1,
    explanation: "A Space is the top-level container (typically role/persona-based), holding one or more Pages, each built from Sections, each Section holding the actual tiles — Space → Page → Section → Tile.",
  },
  {
    id: "lp-mcq13",
    topic: "Spaces & Pages",
    prompt: "How does a Role Collection grant a user access to a Space in the current default content model?",
    options: [
      "It doesn't — Spaces are visible to every authenticated user automatically",
      "An admin assigns the Role Collection directly to the Space in the Content Manager; anyone holding it gets that Space's Pages/tiles",
      "The Role Collection must first be converted into a Catalog before it can reach a Space",
      "Only the Space owner can manually invite individual users one at a time",
    ],
    correctIndex: 1,
    explanation: "In the Content Manager, Role Collections are assigned directly to a Space — every user holding that Role Collection automatically gets that Space, and every Page/Section/tile inside it, in one step (no separate catalog-then-group chain needed).",
  },
];
