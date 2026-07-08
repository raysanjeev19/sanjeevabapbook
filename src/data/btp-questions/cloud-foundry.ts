import type { BtpMcq, BtpQuestion } from "@/lib/btp-content";

/** Section 2 — Cloud Foundry. 35 interview questions, full format (mirrors btp-basics). */
export const cloudFoundryQuestions: BtpQuestion[] = [
  {
    id: "cf-q1",
    topic: "Cloud Controller",
    prompt: "What is the Cloud Controller in Cloud Foundry and what role does it play?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["cloud-controller", "architecture"],
    estimatedMinutes: 3,
    expectedAnswer:
      "The Cloud Controller is Cloud Foundry's API and orchestration brain — it stores the desired state of orgs, spaces, apps, and services in its database, exposes the CF REST API that the `cf` CLI talks to, and hands off actual container scheduling to the Diego layer.",
    detailedAnswer:
      "Every action you take with the `cf` CLI or the cockpit's Cloud Foundry view — pushing an app, creating a space, binding a service — goes through the Cloud Controller API first. It records the 'desired state' (what should be running) in its own database, then delegates the 'actual state' (running containers, health) to the Diego scheduler, which places app instances onto Diego cells (worker VMs). The Cloud Controller reconciles desired vs actual state continuously, restarting crashed instances to keep the two in sync.",
    hindiExplanation:
      "Cloud Controller Cloud Foundry ka 'brain' hai — jab bhi tum `cf push` karte ho ya koi service bind karte ho, request pehle Cloud Controller ke API se guzarti hai. Ye apne database mein 'desired state' store karta hai (matlab kya-kya chalna chahiye), aur actual container scheduling ka kaam Diego layer ko de deta hai, jo Diego cells (worker VMs) pe app instances chalata hai. Cloud Controller continuously check karta hai ki desired aur actual state match kare — agar koi instance crash ho jaaye, toh use restart karwata hai.",
    interviewExplanation:
      "I'd say: 'The Cloud Controller is the API layer and source of truth for Cloud Foundry — it stores desired state in its database and exposes the REST API the CF CLI uses. It doesn't run containers itself; it delegates actual scheduling and placement to Diego, and continuously reconciles desired state against what Diego reports is actually running.'",
    diagramNote:
      "Flow: CF CLI → Cloud Controller API (desired state, DB) → Diego Scheduler → Diego Cells (running app instances). Arrow back from Diego to Cloud Controller labeled 'actual state reports'.",
    diagramMermaid: `flowchart LR
    CLI["cf CLI"] --> CC["Cloud Controller API<br/>desired state, DB"]
    CC --> DIEGO["Diego Scheduler"]
    DIEGO --> CELLS["Diego Cells<br/>running app instances"]
    CELLS -. "actual state reports" .-> CC`,
    realProjectExample:
      "When debugging why an app kept restarting, we used `cf events <app>` (which reads from Cloud Controller's record of desired-vs-actual reconciliation) to see a timeline of crash and restart events, rather than guessing from logs alone.",
    interviewTip:
      "Don't say 'Cloud Controller runs the containers' — that's Diego's job. The precise distinction (API/desired-state owner vs scheduler/executor) is what separates a strong answer.",
    followupQuestions: [
      "What is Diego and how does it relate to the Cloud Controller?",
      "What does 'desired state vs actual state' mean in Cloud Foundry?",
      "What happens if the Cloud Controller is briefly unavailable — do running apps go down?",
    ],
    commonMistakes: [
      "Saying the Cloud Controller directly hosts/runs application containers.",
      "Not knowing it exposes the REST API the CF CLI calls.",
    ],
    importantPoints: [
      "Cloud Controller = API + desired-state database.",
      "Diego = actual scheduling/placement of containers onto cells.",
      "Cloud Controller reconciles desired vs actual continuously.",
    ],
    revisionNotes: "Cloud Controller = CF's API/brain (desired state, DB). Diego = scheduler that actually runs containers.",
  },
  {
    id: "cf-q2",
    topic: "Cloud Controller",
    prompt: "How does the Cloud Controller relate to a BTP Subaccount?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["cloud-controller", "subaccount"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Each BTP Subaccount that enables the Cloud Foundry environment gets its own Cloud Foundry Org (1:1 mapping), and that Org's apps/spaces are all managed by the shared Cloud Controller running in that subaccount's region.",
    detailedAnswer:
      "When you enable Cloud Foundry in a BTP subaccount, BTP provisions exactly one CF Org for that subaccount, tied to the region's Cloud Controller (a regional, multi-tenant CF deployment shared across many customers' orgs, isolated logically). All `cf` CLI operations against that subaccount's apps go through that region's Cloud Controller endpoint (the API URL you see when running `cf api`).",
    hindiExplanation:
      "Jab tum BTP subaccount mein Cloud Foundry enable karte ho, BTP us subaccount ke liye ek CF Org bana deta hai (1:1 mapping). Wo Org us region ke shared Cloud Controller se manage hota hai — matlab Cloud Controller ek hi hota hai region ke liye, jisme kai customers ke orgs isolated tarike se rehte hain. `cf api` command se tum wahi Cloud Controller endpoint dekh sakte ho.",
    interviewExplanation:
      "I'd connect the dots: 'Enabling Cloud Foundry on a subaccount provisions one CF Org, 1:1. That Org is managed by the region's Cloud Controller — a multi-tenant deployment shared across customers, with logical isolation between orgs. Running `cf api` shows you exactly which Cloud Controller endpoint your subaccount is talking to.'",
    diagramNote:
      "Subaccount box with an arrow to CF Org (1:1), and the Org sitting inside a larger 'Region's Cloud Controller (shared, multi-tenant)' box alongside other customers' orgs.",
    diagramMermaid: `flowchart LR
    S["BTP Subaccount"] --> ORG["CF Org (1:1)"]
    subgraph CC["Region's Cloud Controller (shared)"]
        ORG
        OtherOrg["Other customer's Org"]
    end`,
    realProjectExample:
      "Running `cf api` on two different subaccounts in the same region showed the same Cloud Controller endpoint URL, confirming they share infrastructure while remaining fully isolated at the org level.",
    interviewTip:
      "Mention 'multi-tenant but isolated' explicitly — it shows you understand the shared-infrastructure-with-logical-isolation model that also applies at the platform level (recall the multitenancy question from Section 1).",
    followupQuestions: [
      "How would you find out which Cloud Controller endpoint your subaccount uses?",
      "Can two subaccounts in different regions share a Cloud Controller?",
      "What does 'cf api' actually return?",
    ],
    commonMistakes: [
      "Thinking each subaccount gets its own dedicated Cloud Controller instance.",
      "Not knowing the subaccount-to-org mapping is exactly 1:1.",
    ],
    importantPoints: [
      "Subaccount → CF Org is 1:1.",
      "Cloud Controller is regional and multi-tenant.",
      "`cf api` shows the Cloud Controller endpoint in use.",
    ],
    revisionNotes: "Subaccount = 1 CF Org, managed by that region's shared, multi-tenant Cloud Controller.",
  },
  {
    id: "cf-q3",
    topic: "Cloud Controller",
    prompt: "What is Diego and how does it differ from the Cloud Controller?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["diego", "cloud-controller", "architecture"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Diego is Cloud Foundry's container scheduler and executor — it decides which Diego Cell (worker VM) each app instance runs on, keeps instances alive, and reports actual state back; the Cloud Controller is the API/state-owner layer above it that Diego takes orders from.",
    detailedAnswer:
      "Think of it as a two-layer system: the Cloud Controller is the 'what should exist' layer (an API, backed by a database, that tracks desired app instance counts, memory, routes). Diego is the 'make it exist' layer — its Brain component schedules containers onto available Diego Cells based on resource availability, its Cell Reps actually start/monitor the containers (via garden/runC), and it continuously reports actual running state back to the Cloud Controller. If a container crashes, Diego notices and restarts it without needing the Cloud Controller to re-issue the request.",
    hindiExplanation:
      "Diego Cloud Foundry ka scheduler aur executor hai. Cloud Controller batata hai 'kya hona chahiye' (desired state — kitne instances, kitni memory), aur Diego ye kaam actually karta hai — Diego Brain decide karta hai konsa container kis Diego Cell (worker VM) pe chalega, Cell Reps actually containers start/monitor karte hain. Agar koi container crash ho jaaye, Diego khud usse restart kar deta hai, Cloud Controller ko dobara request bhejne ki zaroorat nahi padti.",
    interviewExplanation:
      "I'd frame it as two layers: 'Cloud Controller is the desired-state API; Diego is the execution engine. Diego's Brain schedules containers onto Cells based on available resources, Cell Reps actually run and monitor them, and Diego self-heals crashed instances without waiting for the Cloud Controller — it just reports the updated actual state back.'",
    diagramNote:
      "Two-layer box diagram: 'Cloud Controller (desired state API)' on top, arrow down to 'Diego Brain (scheduling)', arrow down to 'Diego Cell Reps (run/monitor containers)', with a feedback arrow back up labeled 'actual state'.",
    diagramMermaid: `flowchart TD
    CC["Cloud Controller<br/>desired state API"] --> BRAIN["Diego Brain<br/>scheduling"]
    BRAIN --> CELLS["Diego Cell Reps<br/>run/monitor containers"]
    CELLS -. "actual state" .-> CC`,
    realProjectExample:
      "When an app instance ran out of memory and crashed, Diego restarted it automatically within seconds — we only found out via `cf events`, since the platform self-healed before we even got a monitoring alert.",
    interviewTip:
      "If asked 'what happens if a container crashes', the correct answer is 'Diego restarts it automatically' — not 'you have to manually cf restart it'.",
    followupQuestions: [
      "What is a Diego Cell?",
      "How does Diego decide which cell to place a container on?",
      "What happens to the Cloud Controller's record when Diego restarts a crashed instance?",
    ],
    commonMistakes: [
      "Saying you must manually restart a crashed app instance.",
      "Confusing Diego's role with the Cloud Controller's.",
    ],
    importantPoints: [
      "Cloud Controller = desired state API.",
      "Diego = scheduling + execution + self-healing.",
      "Diego auto-restarts crashed instances without Cloud Controller re-issuing a request.",
    ],
    revisionNotes: "Diego = scheduler/executor (Brain schedules, Cell Reps run+self-heal). Cloud Controller = desired-state API above it.",
  },
  {
    id: "cf-q4",
    topic: "Org",
    prompt: "What is an Organization (Org) in Cloud Foundry?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["org", "hierarchy"],
    estimatedMinutes: 2,
    expectedAnswer:
      "An Org is the top-level unit of ownership in Cloud Foundry — it groups one or more Spaces, has its own quota plan (memory/instance limits), and maps 1:1 to a BTP subaccount that has Cloud Foundry enabled.",
    detailedAnswer:
      "Orgs exist to give a boundary for resource quota and billing/ownership within Cloud Foundry. An Org contains Spaces (the next level down), and users are assigned Org-level roles (OrgManager, OrgAuditor, BillingManager) that are broader than the Space-level roles used for actual app work. In the BTP context, you rarely create an Org yourself — enabling Cloud Foundry on a subaccount auto-creates exactly one Org for you.",
    hindiExplanation:
      "Org Cloud Foundry ki hierarchy mein sabse upar wala level hai — isme ek ya zyada Spaces hote hain, aur iska apna quota plan hota hai (kitni memory, kitne instances use kar sakte ho). BTP context mein tumhe khud Org banane ki zaroorat nahi padti — jab tum subaccount mein Cloud Foundry enable karte ho, BTP automatically ek Org bana deta hai (1:1 mapping).",
    interviewExplanation:
      "I'd say: 'An Org is the top-level Cloud Foundry container — it holds Spaces and carries a quota. In BTP, you don't create Orgs manually; enabling Cloud Foundry on a subaccount auto-provisions exactly one Org, mapped 1:1.'",
    diagramNote:
      "Org box at top containing 2-3 Space boxes inside it, with a small 'Quota Plan' label attached to the Org.",
    diagramMermaid: `flowchart TD
    ORG["Org<br/>quota plan"] --> S1["Space: dev"]
    ORG --> S2["Space: prod"]`,
    realProjectExample:
      "Running `cf orgs` after enabling Cloud Foundry on a new subaccount showed exactly one Org, auto-named after the subaccount — confirming the 1:1 relationship without us doing anything manually.",
    interviewTip:
      "If asked 'how do you create an Org in BTP', the honest answer is you usually don't — it's auto-created; manual multi-org setups are rare and mostly relevant to self-hosted, non-BTP Cloud Foundry.",
    followupQuestions: [
      "What roles exist at the Org level?",
      "What's the difference between an Org quota and a Space quota?",
      "Can one BTP subaccount have more than one Org?",
    ],
    commonMistakes: [
      "Thinking you routinely create multiple Orgs per subaccount in BTP.",
      "Confusing Org-level roles with Space-level roles.",
    ],
    importantPoints: [
      "Org = top-level CF ownership/quota boundary.",
      "Contains Spaces.",
      "BTP subaccount → exactly one Org, auto-created.",
    ],
    revisionNotes: "Org = top CF level (quota, contains Spaces). BTP: 1 subaccount = 1 Org, auto-created.",
  },
  {
    id: "cf-q5",
    topic: "Org",
    prompt: "What roles can a user be assigned at the Org level, and what can each do?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["org", "roles", "authorization"],
    estimatedMinutes: 2,
    expectedAnswer:
      "OrgManager can manage the org and its spaces/users, OrgAuditor has read-only visibility, and BillingManager can view and manage billing-related settings — none of these roles alone let you push apps, which is controlled by Space-level roles instead.",
    detailedAnswer:
      "Org-level roles are about org administration, not day-to-day app work: OrgManager can invite users, create/manage spaces, and set org-wide settings; OrgAuditor gets read-only access to org info for compliance/reporting; BillingManager can manage billing account info. To actually push, scale, or delete an app, a user additionally needs a Space-level role (SpaceDeveloper) in the specific space where that app lives — Org roles alone are not sufficient.",
    hindiExplanation:
      "Org level pe teen roles hote hain: OrgManager (org aur uske spaces/users manage kar sakta hai), OrgAuditor (sirf read-only access, reporting ke liye), aur BillingManager (billing settings manage kar sakta hai). Inme se koi bhi role akela app push/deploy karne ke liye kaafi nahi hai — uske liye Space level pe SpaceDeveloper role bhi chahiye hota hai.",
    interviewExplanation:
      "I'd list all three and add the key caveat: 'OrgManager, OrgAuditor, and BillingManager are the org-level roles — but none of them let you push or manage apps directly. That requires a Space-level role, SpaceDeveloper, in the specific space.'",
    diagramNote:
      "Org box with three role labels pointing to it (OrgManager, OrgAuditor, BillingManager), and a separate arrow down to Space box labeled 'SpaceDeveloper needed here to actually push apps'.",
    diagramMermaid: `flowchart TD
    ORG["Org"] --- OM["OrgManager"]
    ORG --- OA["OrgAuditor"]
    ORG --- BM["BillingManager"]
    ORG --> SP["Space"]
    SP --- SD["SpaceDeveloper<br/>needed to push apps"]`,
    realProjectExample:
      "A new team member was given OrgManager access expecting to deploy apps immediately, but hit a permissions error until we also assigned them SpaceDeveloper on the specific 'dev' space.",
    interviewTip:
      "This exact confusion ('I have Org access but can't push an app') is a very common real support ticket — mentioning it shows practical awareness.",
    followupQuestions: [
      "What Space-level roles exist besides SpaceDeveloper?",
      "Can a BillingManager see app-level data?",
      "How would you assign these roles — cockpit or CLI?",
    ],
    commonMistakes: [
      "Assuming Org roles are sufficient to manage apps.",
      "Not knowing BillingManager exists as a distinct role.",
    ],
    importantPoints: [
      "Org roles: OrgManager, OrgAuditor, BillingManager.",
      "None of them grant app push/manage rights alone.",
      "SpaceDeveloper (a Space-level role) is required for that.",
    ],
    revisionNotes: "Org roles = OrgManager/OrgAuditor/BillingManager (admin/billing only). App work needs Space role too.",
  },
  {
    id: "cf-q6",
    topic: "Space",
    prompt: "What is a Space in Cloud Foundry and why does an Org need more than one?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["space", "hierarchy"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A Space is where apps, routes, and service instances actually live inside an Org; multiple spaces (e.g. dev, staging) let you isolate environments and access control within the same Org/subaccount without needing separate Orgs.",
    detailedAnswer:
      "While the Org is the quota/ownership boundary, the Space is the actual working directory for apps — every `cf push` targets a specific org AND space. Splitting an Org into multiple spaces (say, 'dev' and 'staging') lets a team isolate environments and assign different Space-level roles per space (junior devs might get SpaceDeveloper on 'dev' but only SpaceAuditor on 'staging'), all while sharing the same Org quota pool unless space-level quotas are set individually.",
    hindiExplanation:
      "Space wo jagah hai jaha apps, routes, aur service instances actually rehte hain — ek Org ke andar. `cf push` karte waqt tum hamesha ek specific org AND space target karte ho. Ek Org ke andar multiple spaces (jaise 'dev', 'staging') banane se environments alag rakh sakte ho aur alag-alag access control de sakte ho (jaise junior developer ko 'dev' mein SpaceDeveloper access ho, but 'staging' mein sirf SpaceAuditor).",
    interviewExplanation:
      "I'd say: 'A Space is the actual deployment target within an Org — every push goes to an org and a space. Splitting into multiple spaces, like dev and staging, gives environment isolation and per-space role assignment without needing separate Orgs.'",
    diagramNote:
      "One Org box branching into two Space boxes ('dev', 'staging'), each containing its own apps/routes/services icons.",
    diagramMermaid: `flowchart TD
    ORG["Org"] --> DEV["Space: dev<br/>apps, routes, services"]
    ORG --> STG["Space: staging<br/>apps, routes, services"]`,
    realProjectExample:
      "We used a single Org (matching our one subaccount) with two spaces, 'dev' and 'qa', so testers had SpaceAuditor visibility into 'qa' without any ability to accidentally modify apps there.",
    interviewTip:
      "Clarify the exact hierarchy if asked: Org → Space → App. A push always needs both an org and a space target, not just an org.",
    followupQuestions: [
      "What roles exist at the Space level?",
      "Can two spaces in the same Org share a route?",
      "How do you switch which space `cf push` targets?",
    ],
    commonMistakes: [
      "Thinking apps live directly under an Org without a Space.",
      "Not knowing space-level roles differ from org-level roles.",
    ],
    importantPoints: [
      "Space = actual deployment target, inside an Org.",
      "Multiple spaces isolate environments/roles within one Org.",
      "`cf push` always targets an org + space.",
    ],
    revisionNotes: "Space = where apps actually live, inside an Org. Multiple spaces = environment/role isolation without new Orgs.",
  },
  {
    id: "cf-q7",
    topic: "Space",
    prompt: "What Space-level roles exist, and what does each let a user do?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["space", "roles"],
    estimatedMinutes: 2,
    expectedAnswer:
      "SpaceDeveloper can push, scale, bind services, and manage apps in the space; SpaceManager can manage space settings and roles but not necessarily push apps; SpaceAuditor has read-only visibility into the space.",
    detailedAnswer:
      "SpaceDeveloper is the role most engineers need day-to-day — it grants push, restart, scale, create/bind/delete service instances, and view logs within that space. SpaceManager is more about space administration — inviting users and managing space-level settings — without necessarily including app deployment rights. SpaceAuditor is strictly read-only, useful for testers, auditors, or stakeholders who need visibility without change rights.",
    hindiExplanation:
      "SpaceDeveloper wo role hai jo zyada tar engineers ko chahiye hota hai — isse push, restart, scale, service bind/create/delete, aur logs dekhne ka access milta hai. SpaceManager space ko administer karta hai — users invite karna, settings manage karna — lekin zaroori nahi ki apps deploy kar sake. SpaceAuditor sirf read-only access deta hai, testers ya auditors ke liye useful hai jinhe sirf dekhna hai, badalna nahi.",
    interviewExplanation:
      "I'd list all three with their practical scope: 'SpaceDeveloper is what most engineers need — push, scale, bind services, view logs. SpaceManager handles space administration like inviting users. SpaceAuditor is read-only, good for QA or stakeholders who just need visibility.'",
    diagramNote:
      "Space box with three role labels: SpaceDeveloper (push/scale/bind), SpaceManager (admin/invite), SpaceAuditor (read-only).",
    diagramMermaid: `flowchart LR
    SP["Space"] --- SD["SpaceDeveloper<br/>push, scale, bind"]
    SP --- SM["SpaceManager<br/>admin, invite users"]
    SP --- SA["SpaceAuditor<br/>read-only"]`,
    realProjectExample:
      "Our QA team was given SpaceAuditor on the 'prod' space so they could check logs and app health during a release without any risk of accidentally scaling or deleting something.",
    interviewTip:
      "If asked which role a 'typical developer' needs, the answer is SpaceDeveloper — say it directly rather than listing all three neutrally.",
    followupQuestions: [
      "Can a SpaceManager also push apps?",
      "How do these compare to Org-level roles?",
      "How would you assign a SpaceDeveloper role via the CLI?",
    ],
    commonMistakes: [
      "Confusing SpaceManager with SpaceDeveloper.",
      "Not knowing SpaceAuditor is strictly read-only.",
    ],
    importantPoints: [
      "SpaceDeveloper = day-to-day app work (push/scale/bind).",
      "SpaceManager = space administration.",
      "SpaceAuditor = read-only visibility.",
    ],
    revisionNotes: "SpaceDeveloper = push/scale/bind. SpaceManager = admin. SpaceAuditor = read-only.",
  },
  {
    id: "cf-q8",
    topic: "Apps",
    prompt: "What is an 'app' in Cloud Foundry terms, and what's the difference between an app and an app instance?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["apps", "instances"],
    estimatedMinutes: 2,
    expectedAnswer:
      "An app is the logical deployable unit (code + configuration you pushed); an app instance is one running container executing that app's code — a single app can have multiple instances running simultaneously for scaling and availability.",
    detailedAnswer:
      "When you run `cf push myapp`, you create one logical 'app' record in Cloud Foundry, with a name, memory/disk settings, buildpack, and routes. That app can be scaled to run N instances (containers), each an identical copy handling a share of incoming traffic. If one instance crashes, Diego restarts just that instance — the app as a whole stays up as long as at least one instance is healthy.",
    hindiExplanation:
      "Jab tum `cf push myapp` karte ho, ek logical 'app' record banta hai — uska naam, memory/disk settings, buildpack, routes sab define hote hain. Wo app ek ya kai 'instances' (containers) mein chal sakta hai — har instance ek identical copy hoti hai jo traffic ka ek hissa handle karti hai. Agar ek instance crash ho jaaye, Diego sirf usi ko restart karta hai — jab tak ek bhi instance healthy hai, app overall up rehta hai.",
    interviewExplanation:
      "I'd draw the distinction clearly: 'An app is the logical unit — one push, one name, one set of settings. An instance is a single running container of that app. You can run multiple instances of the same app for scaling and high availability, and Diego restarts individual crashed instances independently.'",
    diagramNote:
      "One 'App: myapp' box branching into three 'Instance' boxes, each a running container, with a Gorouter box distributing traffic across all three.",
    diagramMermaid: `flowchart TD
    APP["App: myapp"] --> I1["Instance 1"]
    APP --> I2["Instance 2"]
    APP --> I3["Instance 3"]
    ROUTER["Gorouter"] --> I1
    ROUTER --> I2
    ROUTER --> I3`,
    realProjectExample:
      "During a traffic spike, we scaled `myapp` from 2 to 6 instances with `cf scale myapp -i 6` — same app, same code, just more containers sharing the load.",
    interviewTip:
      "If asked 'what happens to the app if one instance crashes', be precise: only that instance restarts, the app (and other instances) stay unaffected.",
    followupQuestions: [
      "How do you check how many instances an app currently has?",
      "What load-balances traffic across instances?",
      "Can different instances of the same app run different code versions?",
    ],
    commonMistakes: [
      "Using 'app' and 'instance' interchangeably.",
      "Assuming one crashed instance takes down the whole app.",
    ],
    importantPoints: [
      "App = logical deployable unit (name, settings, routes).",
      "Instance = one running container of that app.",
      "Multiple instances = scaling + availability.",
    ],
    revisionNotes: "App = logical unit. Instance = one running container of it. Many instances = scale/HA.",
  },
  {
    id: "cf-q9",
    topic: "Apps",
    prompt: "What's the difference between `cf restart`, `cf restage`, and `cf stop`/`cf start`?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["apps", "cli", "lifecycle"],
    estimatedMinutes: 3,
    expectedAnswer:
      "`cf restart` stops and starts the app using the existing droplet (fast); `cf restage` rebuilds the droplet from source using the buildpack again (needed after changing buildpack/env that affects staging) then starts it; `cf stop`/`cf start` are the same lifecycle actions split into two explicit steps.",
    detailedAnswer:
      "A droplet is the compiled/staged artifact produced by the buildpack from your source code. `cf restart` simply stops all instances and starts them again from the same droplet — fast, and appropriate for picking up most environment variable or service binding changes. `cf restage` throws away the current droplet and re-runs the buildpack detection and build process from your source code — necessary when you've changed something that affects staging itself (like a buildpack version) rather than just runtime config. `cf stop` and `cf start` are simply the restart lifecycle split into two commands you can run independently, useful when you want the app down for a while before bringing it back up.",
    hindiExplanation:
      "Droplet wo compiled/staged artifact hota hai jo buildpack tumhare source code se banata hai. `cf restart` sirf app ko stop-start karta hai usi purane droplet se — fast hota hai, aur zyada tar env variable ya service binding changes ke liye kaafi hai. `cf restage` purane droplet ko phenk kar buildpack se dobara build karta hai source code se — ye tab zaroori hai jab tumne kuch aisa change kiya ho jo staging ko hi affect karta hai (jaise buildpack version). `cf stop` aur `cf start` bas restart ko do alag commands mein tod dete hain.",
    interviewExplanation:
      "I'd explain the droplet concept first, then contrast: 'restart reuses the existing droplet — fast, good for config/env changes. restage rebuilds the droplet from source via the buildpack — needed when the staging process itself needs to change, like a buildpack update. stop and start are just restart split into two independent commands.'",
    diagramNote:
      "Comparison: 'cf restart' arrow looping back to same droplet icon; 'cf restage' arrow through buildpack producing a new droplet icon; 'cf stop/start' shown as two separate arrows.",
    diagramMermaid: `flowchart LR
    A["cf restart"] --> B["Same droplet<br/>stop + start"]
    C["cf restage"] --> D["Buildpack rebuilds<br/>new droplet"] --> E["Start"]
    F["cf stop"] --> G["cf start<br/>(independent steps)"]`,
    realProjectExample:
      "After updating an environment variable, `cf restart` was enough; but after upgrading to a newer Node.js buildpack version, we needed `cf restage` so the app actually rebuilt against the new runtime.",
    interviewTip:
      "If the interviewer asks 'why did my env variable change not take effect', check whether they only used `cf set-env` without a subsequent `cf restart` — env changes need at least a restart to apply.",
    followupQuestions: [
      "What is a droplet in Cloud Foundry?",
      "Does `cf set-env` automatically restart the app?",
      "When exactly would restage be required over a simple restart?",
    ],
    commonMistakes: [
      "Using restage when a simple restart would suffice (unnecessarily slow).",
      "Not knowing restart doesn't rebuild the droplet.",
    ],
    importantPoints: [
      "restart = reuse droplet, fast.",
      "restage = rebuild droplet via buildpack, slower.",
      "stop/start = restart split into two explicit commands.",
    ],
    revisionNotes: "restart = same droplet (fast). restage = rebuild via buildpack (for staging-affecting changes). stop+start = split restart.",
  },
  {
    id: "cf-q10",
    topic: "Apps",
    prompt: "What is a 'health check' for a Cloud Foundry app, and what types are available?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["apps", "health-check"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A health check determines whether a newly started app instance is considered healthy before routing traffic to it; Cloud Foundry supports 'port' (default, just checks the port is listening), 'http' (checks a specific endpoint returns 2xx), and 'process' (just checks the process is running, useful for non-HTTP workers).",
    detailedAnswer:
      "By default, Cloud Foundry uses a 'port' health check — it just confirms the app is listening on the expected port before considering the instance up and routing traffic to it. An 'http' health check is stricter and more accurate for web apps — it polls a specific path (commonly `/health`) and only considers the instance healthy once that endpoint returns a 2xx response, catching cases where the port is open but the app itself isn't ready (e.g. still connecting to a database). A 'process' health check is for non-HTTP workers (background job processors) — it just checks the process is alive, since there's no port or HTTP endpoint to poll.",
    hindiExplanation:
      "Health check ye decide karta hai ki naya start hua app instance 'healthy' hai ya nahi, traffic route karne se pehle. Default hai 'port' health check — bas ye check karta hai ki app apne port pe listen kar raha hai. 'http' health check zyada strict hai — ek specific endpoint (jaise `/health`) ko poll karta hai aur sirf tab healthy maanta hai jab wo 2xx response de, isse pata chal jaata hai agar port toh khula hai but app abhi bhi ready nahi hai (jaise database se connect ho raha hai). 'process' health check un workers ke liye hai jinke paas HTTP endpoint hi nahi hota — bas process zinda hai ya nahi, ye check karta hai.",
    interviewExplanation:
      "I'd name all three with a use case each: 'Port is the default — just checks the port is open. HTTP is stricter — it polls an endpoint like /health and needs a 2xx before routing traffic, catching apps that are listening but not actually ready. Process is for background workers with no HTTP endpoint — it just confirms the process is running.'",
    diagramNote:
      "Three health check types as parallel boxes: 'port (default): port open?' → 'http: /health returns 2xx?' → 'process: process alive?' each feeding into 'instance considered healthy → routed traffic'.",
    diagramMermaid: `flowchart LR
    A["port check<br/>port open?"] --> H["Instance healthy<br/>traffic routed"]
    B["http check<br/>/health returns 2xx?"] --> H
    C["process check<br/>process alive?"] --> H`,
    realProjectExample:
      "An app that was slow to connect to its database passed the default port check but failed real requests for a few seconds after startup; switching to an HTTP health check on `/health` (which only returned 200 once the DB connection was ready) fixed the intermittent errors during deploys.",
    interviewTip:
      "If a candidate says 'health check just means the app is running', push for the three specific types — that's the depth interviewers want.",
    followupQuestions: [
      "How do you configure an HTTP health check endpoint?",
      "What happens if a health check keeps failing after staging?",
      "Why would a background worker use a process health check instead of HTTP?",
    ],
    commonMistakes: [
      "Not knowing HTTP health checks exist as a stricter option than the default.",
      "Using an HTTP health check for a non-web background worker.",
    ],
    importantPoints: [
      "Port = default, just checks the port is listening.",
      "HTTP = polls an endpoint, needs 2xx (catches 'listening but not ready').",
      "Process = for non-HTTP workers, just checks the process is alive.",
    ],
    revisionNotes: "Health checks: port (default) / http (endpoint 2xx) / process (worker alive) — before routing traffic to a new instance.",
  },
  {
    id: "cf-q11",
    topic: "Routes",
    prompt: "What is a route in Cloud Foundry, and how does traffic actually reach an app instance?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["routes", "gorouter"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A route is a URL (hostname + domain + optional path) mapped to one or more apps; incoming requests hit the Gorouter, which looks up the route's mapping and load-balances the request across all healthy instances of the mapped app(s).",
    detailedAnswer:
      "A route is created against a domain (e.g. `cfapps.eu10.hana.ondemand.com`) with a hostname and optional path, and then mapped to an app. Multiple apps can share one route (useful for blue-green deploys — momentarily mapping both old and new app versions to the same route), and one app can have multiple routes. All external traffic enters through the Gorouter, a component that maintains a routing table (which route maps to which app instances, updated dynamically as instances start/stop) and load-balances incoming requests across all currently healthy instances behind that route.",
    hindiExplanation:
      "Route ek URL hota hai (hostname + domain + optional path) jo ek ya zyada apps se mapped hota hai. Ek route ko multiple apps se map kiya ja sakta hai (blue-green deployment ke liye useful — thodi der ke liye old aur new dono app versions ko same route pe map karna), aur ek app ke multiple routes bhi ho sakte hain. Saara external traffic Gorouter se guzarta hai — ye component ek routing table maintain karta hai (kaunsa route kis app instances se map hai) aur incoming requests ko sabhi healthy instances mein load-balance karta hai.",
    interviewExplanation:
      "I'd walk the flow: 'A route is hostname+domain+path mapped to an app. Traffic hits the Gorouter first — it looks up its routing table, which is updated dynamically as instances start and stop, and load-balances the request across every healthy instance currently mapped to that route. Multiple apps can share a route, which is exactly how blue-green deployments work.'",
    diagramNote:
      "Flow: 'Incoming request' → 'Gorouter (routing table)' → load-balanced arrows to 'App Instance 1', 'App Instance 2', 'App Instance 3' all mapped to the same route.",
    diagramMermaid: `flowchart LR
    REQ["Incoming request"] --> GR["Gorouter<br/>routing table"]
    GR --> I1["App Instance 1"]
    GR --> I2["App Instance 2"]
    GR --> I3["App Instance 3"]`,
    realProjectExample:
      "For a blue-green release, we mapped the same production route to both the old and new app versions briefly, verified the new version handled real traffic correctly, then unmapped the old version — zero downtime for users.",
    interviewTip:
      "Mentioning that routes update dynamically (not a static config reload) shows you understand Gorouter isn't just a dumb reverse proxy.",
    followupQuestions: [
      "How would you implement a blue-green deployment using routes?",
      "Can one app have multiple routes pointing to it?",
      "What happens to the Gorouter's routing table when you scale an app up?",
    ],
    commonMistakes: [
      "Thinking a route maps 1:1 to exactly one app always.",
      "Not knowing the Gorouter is the component doing the actual load balancing.",
    ],
    importantPoints: [
      "Route = hostname + domain + path, mapped to app(s).",
      "Gorouter load-balances across all healthy mapped instances.",
      "Multiple apps can share a route (enables blue-green deploys).",
    ],
    revisionNotes: "Route = URL mapped to app(s). Gorouter load-balances traffic across healthy instances behind it; supports blue-green via shared routes.",
  },
  {
    id: "cf-q12",
    topic: "Routes",
    prompt: "What's the difference between an HTTP route and a TCP route in Cloud Foundry?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["routes", "tcp"],
    estimatedMinutes: 2,
    expectedAnswer:
      "HTTP routes go through the Gorouter and support hostname/path-based routing over HTTP(S); TCP routes go through a separate TCP router and expose a raw port for non-HTTP protocols, since Gorouter can't route arbitrary TCP traffic by hostname.",
    detailedAnswer:
      "Most apps use HTTP routes — Gorouter reads the `Host` header (and path) to decide which app to send a request to, all sharing the platform's standard ports 80/443. Some workloads (databases, custom binary protocols, or apps needing a persistent raw TCP connection) can't be routed this way, since there's no HTTP host header to inspect. For those, Cloud Foundry offers TCP routes — a separate TCP Router component assigns a specific port from a reserved range, and traffic to that port is forwarded directly to the app, without any HTTP-layer routing logic.",
    hindiExplanation:
      "Zyada tar apps HTTP routes use karte hain — Gorouter `Host` header (aur path) padh kar decide karta hai kis app ko request bhejni hai, sab standard ports 80/443 share karte hain. Kuch workloads (jaise databases, custom binary protocols) HTTP tarike se route nahi ho sakte, kyunki wahan HTTP host header hota hi nahi. Unke liye Cloud Foundry TCP routes deta hai — ek alag TCP Router component ek specific port assign karta hai (reserved range se), aur us port pe aane wala traffic seedha app ko forward ho jaata hai.",
    interviewExplanation:
      "I'd contrast them directly: 'HTTP routes go through Gorouter, using the Host header to route by hostname/path over standard ports. TCP routes are for non-HTTP workloads — a separate TCP Router assigns a dedicated port from a reserved range and forwards raw traffic directly, since there's no HTTP header to route by.'",
    diagramNote:
      "Two parallel flows: 'HTTP traffic → Gorouter (reads Host header) → App' vs 'TCP traffic → TCP Router (dedicated port) → App'.",
    diagramMermaid: `flowchart LR
    subgraph HTTP
        H1["HTTP traffic"] --> H2["Gorouter<br/>reads Host header"] --> H3["App"]
    end
    subgraph TCP
        T1["TCP traffic"] --> T2["TCP Router<br/>dedicated port"] --> T3["App"]
    end`,
    realProjectExample:
      "A custom binary protocol service that couldn't speak HTTP was exposed via a TCP route with a dedicated port, while the rest of our HTTP-based microservices used ordinary HTTP routes on the same subaccount.",
    interviewTip:
      "This is a more advanced/senior question — if you don't know TCP routes exist, it's fine to say 'I've mainly worked with HTTP routes, but I know CF supports TCP routing for non-HTTP workloads via a separate TCP router' — partial, honest knowledge beats guessing.",
    followupQuestions: [
      "Are TCP routes available in every BTP region?",
      "How does port allocation work for TCP routes?",
      "Would a database service typically be exposed via a TCP route?",
    ],
    commonMistakes: [
      "Assuming all Cloud Foundry routing is HTTP-based.",
      "Not knowing TCP routes need a separate reserved port range.",
    ],
    importantPoints: [
      "HTTP routes: Gorouter, Host-header based, standard ports.",
      "TCP routes: separate TCP Router, dedicated port, non-HTTP.",
      "Not every workload can use HTTP routing.",
    ],
    revisionNotes: "HTTP routes → Gorouter (Host header). TCP routes → TCP Router (dedicated port, non-HTTP workloads).",
  },
  {
    id: "cf-q13",
    topic: "Buildpacks",
    prompt: "What is a buildpack and how does Cloud Foundry decide which one to use?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["buildpacks", "staging"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A buildpack detects your app's language/framework from its source files, installs the right runtime and dependencies, and packages the result into a droplet; Cloud Foundry tries each buildpack in order (or in parallel) and uses the first one whose detect script matches your app.",
    detailedAnswer:
      "Every buildpack has a 'detect' script that checks for telltale files (a `package.json` for Node.js, a `pom.xml` for Java/Maven, a `requirements.txt` for Python). During `cf push`, Cloud Foundry runs each configured buildpack's detect script against your app until one matches (or you can explicitly specify one with `-b`). The matching buildpack then compiles/installs dependencies and produces a droplet — the runnable artifact that Diego actually starts. You can also stack multiple buildpacks (a 'multi-buildpack' setup) when an app needs more than one runtime concern handled, like installing a system dependency before the language-specific one runs.",
    hindiExplanation:
      "Buildpack ek script hota hai jo tumhare app ke source files dekh kar uski language/framework detect karta hai (jaise Node.js ke liye `package.json`, Java/Maven ke liye `pom.xml`), fir sahi runtime aur dependencies install karke ek 'droplet' banata hai (jo actually run hone wala artifact hota hai). `cf push` ke time Cloud Foundry har configured buildpack ka detect script chalata hai jab tak koi match na ho jaaye (ya tum `-b` flag se khud specify kar sakte ho). Multiple buildpacks bhi stack kiye ja sakte hain (multi-buildpack), jab app ko ek se zyada runtime concern handle karne hon.",
    interviewExplanation:
      "I'd explain the detect-then-build flow: 'A buildpack has a detect script that looks for telltale files, like package.json for Node. Cloud Foundry tries buildpacks in order until one detects a match, or you can force one with the -b flag. The matched buildpack installs dependencies and produces a droplet, which is what Diego actually runs.'",
    diagramNote:
      "Flow: 'cf push' → 'Try Buildpack 1: detect?' (no) → 'Try Buildpack 2: detect?' (yes) → 'Install dependencies' → 'Produce Droplet' → 'Diego runs it'.",
    diagramMermaid: `flowchart LR
    A["cf push"] --> B{"Buildpack 1<br/>detect match?"}
    B -- No --> C{"Buildpack 2<br/>detect match?"}
    C -- Yes --> D["Install dependencies"]
    D --> E["Produce Droplet"]
    E --> F["Diego runs it"]`,
    realProjectExample:
      "Pushing a Node.js app with a `package.json` automatically matched the nodejs_buildpack without us specifying anything — for a Python worker in the same space, we explicitly passed `-b python_buildpack` since the folder also had a stray package.json from a frontend build step.",
    interviewTip:
      "Mention the `-b` flag explicitly — it shows you know detection can be forced/overridden when auto-detection would pick the wrong one.",
    followupQuestions: [
      "What is a droplet?",
      "What happens if no buildpack's detect script matches your app?",
      "What is a multi-buildpack and when would you use one?",
    ],
    commonMistakes: [
      "Thinking you always have to manually specify a buildpack.",
      "Not knowing the droplet is the actual output that gets run.",
    ],
    importantPoints: [
      "Buildpack detects language/framework via a detect script.",
      "First matching buildpack builds a droplet from your source.",
      "Can force with `-b`, or stack multiple buildpacks.",
    ],
    revisionNotes: "Buildpack: detect → install deps → produce droplet. Auto-detected in order, or forced via `-b`.",
  },
  {
    id: "cf-q14",
    topic: "Buildpacks",
    prompt: "What happens if you push an app and no buildpack matches?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["buildpacks", "troubleshooting"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Staging fails with an error like 'unable to select a buildpack to build your app', and the push aborts — you'd either need to add the missing telltale file for a supported buildpack, explicitly specify a buildpack with `-b`, or push a Docker image instead of relying on buildpack detection.",
    detailedAnswer:
      "This is a common first-push failure for a fresher — usually caused by pushing from the wrong directory (missing the actual manifest/dependency file), a typo in the expected filename, or genuinely using a language/framework with no available buildpack. The fix path is: check `cf push` output for the exact staging error, verify you're in the right directory with the right dependency descriptor file, and if it's a legitimately unsupported stack, either specify a custom/community buildpack explicitly or containerize the app and push it as a Docker image instead.",
    hindiExplanation:
      "Ye ek common galti hai jab koi pehli baar `cf push` karta hai — error milta hai 'unable to select a buildpack to build your app', aur push abort ho jaata hai. Usually iska reason hota hai galat directory se push karna (missing manifest/dependency file), filename mein typo, ya genuinely aisi language/framework use karna jiske liye koi buildpack available hi nahi hai. Fix karne ke liye: `cf push` ka exact staging error dekho, sahi directory mein ho ya nahi confirm karo, aur agar sach mein unsupported stack hai toh custom/community buildpack specify karo ya Docker image bana kar push karo.",
    interviewExplanation:
      "I'd give the diagnosis path: 'You'd see a staging error like \"unable to select a buildpack\". First I'd check I'm pushing from the right directory with the expected dependency file present. If the stack genuinely isn't supported by a standard buildpack, I'd either specify a community buildpack explicitly with -b, or push a Docker image instead.'",
    diagramNote:
      "Flowchart: 'cf push' → 'No buildpack detects a match' → 'Staging fails: error' → branches to 'Fix directory/file' or 'Specify buildpack with -b' or 'Push as Docker image'.",
    diagramMermaid: `flowchart TD
    A["cf push"] --> B["No buildpack detects a match"]
    B --> C["Staging fails: error"]
    C --> D["Fix directory/dependency file"]
    C --> E["Specify buildpack with -b"]
    C --> F["Push as Docker image instead"]`,
    realProjectExample:
      "A fresher on the team pushed from the repo root instead of the actual app subfolder, so the `package.json` wasn't visible to the buildpack — moving into the correct directory before pushing fixed it immediately.",
    interviewTip:
      "This is a great question to answer with a real 'I've hit this before' story — it's one of the most common first-week CF mistakes.",
    followupQuestions: [
      "Can you push a Docker image directly to Cloud Foundry?",
      "What's a community buildpack?",
      "How do you see the exact staging error message?",
    ],
    commonMistakes: [
      "Assuming the app itself is broken rather than checking the push directory/files first.",
      "Not knowing Docker images are a valid alternative to buildpack detection.",
    ],
    importantPoints: [
      "No buildpack match → staging fails with a clear error.",
      "Most common cause: wrong directory or missing dependency file.",
      "Alternatives: specify buildpack explicitly, or push a Docker image.",
    ],
    revisionNotes: "No buildpack match → staging fails. Check directory/files first; else specify `-b` or push as Docker image.",
  },
  {
    id: "cf-q15",
    topic: "Buildpacks",
    prompt: "What is a 'droplet' and how is it different from a Docker image?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["buildpacks", "droplet", "docker"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A droplet is Cloud Foundry's own runnable artifact format — source code plus installed dependencies, produced by a buildpack — while a Docker image is an OCI-standard, self-contained container image; CF's 'Diego' executor can run either, giving you a choice between buildpack-driven droplets and full container images.",
    detailedAnswer:
      "Historically, Cloud Foundry only understood droplets: buildpacks would compile your app and its dependencies into this CF-specific tarball format, which Diego cells then unpacked and ran inside a container using CF's own root filesystem (stack). Later, CF added support for running standard Docker images directly — you can `cf push --docker-image` instead of relying on a buildpack, and Diego runs it via its container runtime just like a droplet, just without the buildpack detection/build step. The tradeoff: droplets are simpler to produce (no Dockerfile needed) and get automatic security patching of the underlying stack by SAP; Docker images give you full control over the OS layer but you own patching it yourself.",
    hindiExplanation:
      "Droplet Cloud Foundry ka apna runnable artifact format hai — source code + installed dependencies, jo ek buildpack banata hai. Docker image ek standard (OCI) container image hai. Cloud Foundry (Diego ke through) dono ko run kar sakta hai — `cf push --docker-image` se tum buildpack ke bina bhi Docker image push kar sakte ho. Farak ye hai: droplets banana aasan hai (Dockerfile nahi chahiye) aur underlying OS ki security patching SAP khud karta hai; Docker images mein tumhe poora control milta hai OS layer pe, lekin patching bhi tumhe khud karni padti hai.",
    interviewExplanation:
      "I'd contrast the two: 'A droplet is CF's own artifact — buildpack-built code plus dependencies, run on CF's managed stack, with automatic OS-level patching. A Docker image is a standard OCI image you build yourself, giving full control but making you responsible for patching the OS layer. CF's Diego executor can run either — droplets via buildpacks, or Docker images pushed directly.'",
    diagramNote:
      "Two paths converging on Diego: 'Source code → Buildpack → Droplet' and 'Dockerfile → Docker build → Docker image', both feeding into 'Diego Cell (runs either)'.",
    diagramMermaid: `flowchart LR
    A["Source code"] --> B["Buildpack"] --> C["Droplet"]
    D["Dockerfile"] --> E["Docker build"] --> F["Docker image"]
    C --> G["Diego Cell<br/>runs either"]
    F --> G`,
    realProjectExample:
      "For a standard Node.js CAP app we relied on buildpack-produced droplets for simplicity, but for a service needing a specific native library version not covered by any buildpack, we built a custom Docker image and pushed it with `cf push --docker-image`.",
    interviewTip:
      "If asked 'which should you use', the honest senior answer is 'droplets by default for simplicity and managed patching, Docker images when you need OS-level control buildpacks can't give you' — not a blanket 'always use Docker'.",
    followupQuestions: [
      "How do you push a Docker image to Cloud Foundry?",
      "Who patches the OS layer for a droplet-based app vs a Docker-based app?",
      "Can a Docker-based app still bind to BTP services normally?",
    ],
    commonMistakes: [
      "Thinking Cloud Foundry can only run droplets, not Docker images.",
      "Not knowing the patching-responsibility tradeoff between the two.",
    ],
    importantPoints: [
      "Droplet = CF-specific artifact from a buildpack, on a managed stack.",
      "Docker image = standard OCI image, pushed directly.",
      "Diego runs either; tradeoff is simplicity/managed-patching vs full OS control.",
    ],
    revisionNotes: "Droplet = buildpack output, CF-managed stack. Docker image = OCI standard, self-managed OS. Diego runs both.",
  },
  {
    id: "cf-q16",
    topic: "Service Marketplace",
    prompt: "How does the Cloud Foundry Service Marketplace relate to the Open Service Broker API?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["service-marketplace", "osb"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Every service in the Marketplace is backed by a Service Broker implementing the Open Service Broker (OSB) API standard, which defines how Cloud Foundry provisions instances, creates bindings, and deprovisions services — meaning the Marketplace is really a catalog of OSB-compliant brokers, not a CF-specific concept.",
    detailedAnswer:
      "The Open Service Broker API is a Cloud Foundry Foundation (and later CNCF) standard that defines a small REST contract: catalog (what services/plans exist), provision (create an instance), bind (create credentials for an app), unbind, and deprovision. SAP HANA Cloud, XSUAA, Destination — every BTP-managed service you see in the Marketplace is fronted by a broker implementing this exact contract. This is why the same Marketplace/instance/binding mental model applies uniformly across very different underlying services — the OSB API abstracts away the implementation details.",
    hindiExplanation:
      "Open Service Broker (OSB) API ek standard hai jo define karta hai ki Cloud Foundry kaise services provision karta hai, bindings banata hai, aur deprovision karta hai — iska ek chhota REST contract hai: catalog, provision, bind, unbind, deprovision. HANA Cloud, XSUAA, Destination — Marketplace mein dikhne wali har service ek broker ke through hoti hai jo isi OSB contract ko implement karta hai. Isi wajah se Marketplace/Instance/Binding ka mental model har alag-alag service pe consistently apply hota hai — OSB API implementation details ko abstract kar deta hai.",
    interviewExplanation:
      "I'd name the standard directly: 'Every service in the Marketplace is backed by a broker implementing the Open Service Broker API — a small REST contract covering catalog, provision, bind, unbind, deprovision. That's why creating an instance and binding it feels the same whether it's HANA Cloud or XSUAA — the OSB API standardizes the interaction, even though the underlying services are completely different.'",
    diagramNote:
      "Marketplace box with arrows to multiple 'Service Broker (OSB API)' boxes, each fronting a different underlying service (HANA Cloud, XSUAA, Destination), all exposing the same catalog/provision/bind/unbind/deprovision contract.",
    diagramMermaid: `flowchart LR
    M["Service Marketplace"] --> B1["Broker: HANA Cloud<br/>OSB API"]
    M --> B2["Broker: XSUAA<br/>OSB API"]
    M --> B3["Broker: Destination<br/>OSB API"]`,
    realProjectExample:
      "When a third-party team wanted to expose their own internal tool as a bindable BTP service, they implemented a minimal Open Service Broker API server, registered it, and it appeared in the Marketplace exactly like any SAP-provided service.",
    interviewTip:
      "This is a strong senior-level answer — mentioning OSB API by name (not just 'brokers') signals you understand the standard underneath the abstraction, not just the cockpit UI.",
    followupQuestions: [
      "What are the five core operations in the OSB API contract?",
      "Can a company register its own custom service broker?",
      "Does every service plan support all five OSB operations?",
    ],
    commonMistakes: [
      "Thinking the Marketplace is a CF-specific, non-standard concept.",
      "Not knowing custom/third-party brokers are possible.",
    ],
    importantPoints: [
      "Marketplace = catalog of OSB-API-compliant service brokers.",
      "OSB defines: catalog, provision, bind, unbind, deprovision.",
      "Custom brokers can be registered, extending the Marketplace.",
    ],
    revisionNotes: "Marketplace services = fronted by brokers implementing the Open Service Broker (OSB) API standard.",
  },
  {
    id: "cf-q17",
    topic: "Service Marketplace",
    prompt: "What's the difference between a 'managed service' and a 'user-provided service' in Cloud Foundry?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["service-marketplace", "user-provided-service"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A managed service is provisioned and lifecycle-managed by a service broker (create/bind/delete all go through the broker); a user-provided service (UPS) is just a set of credentials you manually register with `cf create-user-provided-service`, for connecting to something outside the Marketplace (like an external database).",
    detailedAnswer:
      "Managed services are the normal Marketplace flow — `cf create-service` calls the broker's provision operation, and CF tracks the instance's lifecycle. But sometimes you need to bind an app to something that isn't a registered broker-backed service — an external API, a database hosted outside BTP, or a service in another CF org. For that, `cf create-user-provided-service` lets you manually supply a JSON credentials blob, and CF treats it exactly like a regular service instance for binding purposes (same VCAP_SERVICES injection), even though there's no broker managing its actual lifecycle.",
    hindiExplanation:
      "Managed service normal Marketplace flow hai — `cf create-service` broker ke provision operation ko call karta hai, aur CF uske lifecycle ko track karta hai. Lekin kabhi-kabhi tumhe kisi aisi cheez se app bind karna hota hai jo Marketplace mein registered broker-backed service nahi hai — jaise ek external API, ya BTP ke bahar hosted database. Iske liye `cf create-user-provided-service` use karte ho, jisme tum manually ek JSON credentials blob dete ho, aur CF use bilkul normal service instance ki tarah treat karta hai binding ke liye (same VCAP_SERVICES injection), chahe uska actual lifecycle koi broker manage nahi kar raha ho.",
    interviewExplanation:
      "I'd contrast with a concrete example: 'A managed service goes through create-service and a broker manages its lifecycle. A user-provided service is for connecting to something outside the Marketplace — like an external database — where I manually supply credentials via create-user-provided-service, and the app still gets them through VCAP_SERVICES exactly like a real managed service binding.'",
    diagramNote:
      "Two paths: 'cf create-service → Broker provisions → Managed Service Instance' vs 'cf create-user-provided-service → manual credentials JSON → User-Provided Service Instance', both converging into 'cf bind-service → app gets VCAP_SERVICES'.",
    diagramMermaid: `flowchart LR
    A["cf create-service"] --> B["Broker provisions"] --> C["Managed Service Instance"]
    D["cf create-user-provided-service"] --> E["Manual credentials JSON"] --> F["User-Provided Service Instance"]
    C --> G["cf bind-service<br/>app gets VCAP_SERVICES"]
    F --> G`,
    realProjectExample:
      "We needed to connect a CAP app to a legacy on-prem database not exposed through any BTP service broker — registering it as a user-provided service let the app consume its connection string through the exact same VCAP_SERVICES pattern as any managed service.",
    interviewTip:
      "Mention that UPS bindings still show up in VCAP_SERVICES identically — that consistency is the whole point of the pattern.",
    followupQuestions: [
      "What command creates a user-provided service?",
      "Does a user-provided service appear in the Service Marketplace?",
      "Can you update the credentials of a user-provided service later?",
    ],
    commonMistakes: [
      "Thinking user-provided services must be registered as brokers first.",
      "Not knowing UPS bindings use the same VCAP_SERVICES mechanism as managed services.",
    ],
    importantPoints: [
      "Managed service = broker-provisioned, lifecycle-managed.",
      "User-provided service = manually supplied credentials, no broker.",
      "Both bind identically via VCAP_SERVICES from the app's perspective.",
    ],
    revisionNotes: "Managed service = broker-provisioned. User-provided service = manual credentials (`cf create-user-provided-service`), same binding mechanism.",
  },
  {
    id: "cf-q18",
    topic: "Bindings",
    prompt: "What actually happens when you run `cf bind-service`?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["bindings", "vcap-services"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Cloud Foundry calls the service broker's 'bind' operation, which returns a set of credentials; CF stores this binding and injects those credentials into the app's VCAP_SERVICES environment variable — but the app typically needs a restart/restage to actually pick up the new environment variable.",
    detailedAnswer:
      "`cf bind-service <app> <service-instance>` triggers the Cloud Controller to call the underlying broker's bind endpoint (per the OSB API), which generates instance-specific credentials (URL, username, password, or a client ID/secret for OAuth-based services). Cloud Foundry stores this binding and, on the app's next restart or restage, injects the credentials as a JSON blob inside the VCAP_SERVICES environment variable, keyed by service name. Importantly, binding alone does NOT restart the app — you need to explicitly `cf restart` (or restage, depending on what changed) afterward for the app process to actually see the new environment variable.",
    hindiExplanation:
      "`cf bind-service <app> <service-instance>` chalane pe Cloud Controller broker ke bind endpoint ko call karta hai (OSB API ke through), jo instance-specific credentials generate karta hai (URL, username/password, ya OAuth client ID/secret). Cloud Foundry ye binding store karta hai, aur app ke next restart/restage pe ye credentials VCAP_SERVICES environment variable mein JSON blob ki tarah inject ho jaate hain, service name se keyed. Important baat — sirf bind karne se app restart nahi hota, tumhe explicitly `cf restart` (ya restage) karna padta hai taaki app process ko naya environment variable actually dikhe.",
    interviewExplanation:
      "I'd walk through it step by step and flag the gotcha: 'bind-service calls the broker's bind operation via the OSB API, which returns credentials that CF stores. Those get injected into VCAP_SERVICES — but only on the next restart. A very common mistake is binding a service and expecting the app to immediately see the new credentials without restarting it.'",
    diagramNote:
      "Flow: 'cf bind-service' → 'Cloud Controller calls broker's bind operation' → 'Broker returns credentials' → 'CF stores binding' → 'App restart/restage' → 'VCAP_SERVICES now has credentials'.",
    diagramMermaid: `flowchart TD
    A["cf bind-service"] --> B["Cloud Controller calls broker's bind operation"]
    B --> C["Broker returns credentials"]
    C --> D["CF stores the binding"]
    D --> E["App restart/restage"]
    E --> F["VCAP_SERVICES now has credentials"]`,
    realProjectExample:
      "A developer bound a new HANA Cloud instance to their app but the connection kept failing with 'no credentials found' — the fix was simply running `cf restart` afterward, since binding alone hadn't refreshed the running app's environment.",
    interviewTip:
      "This exact 'I bound it but it's not working' scenario is one of the most common real support tickets — always mention the restart requirement explicitly.",
    followupQuestions: [
      "What does VCAP_SERVICES actually look like as a JSON structure?",
      "What happens when you unbind a service — does the app lose access immediately?",
      "Can multiple apps bind to the same service instance?",
    ],
    commonMistakes: [
      "Forgetting that binding requires a subsequent restart/restage to take effect.",
      "Not knowing the credentials come from the broker's bind operation specifically.",
    ],
    importantPoints: [
      "bind-service calls the broker's OSB bind operation.",
      "Credentials land in VCAP_SERVICES, keyed by service name.",
      "App must be restarted/restaged to actually see the new binding.",
    ],
    revisionNotes: "bind-service → broker returns creds → stored → VCAP_SERVICES updated on next restart (binding alone doesn't restart the app).",
  },
  {
    id: "cf-q19",
    topic: "Bindings",
    prompt: "Can multiple apps bind to the same service instance, and what are the implications?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["bindings", "sharing"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — multiple apps can bind to the same service instance, each getting its own set of credentials from the broker (or shared ones, depending on the service); this is common for sharing one database instance across several microservices to save cost, but it means those apps now share fate on that instance's availability/quota.",
    detailedAnswer:
      "Binding doesn't 'consume' a service instance — it's more like registering another consumer. Each `cf bind-service` call typically produces a distinct credential set from the broker, letting you later revoke one app's access via `cf unbind-service` without affecting others. This is a common cost-saving pattern (several microservices sharing one HANA Cloud instance, for example) but comes with tradeoffs: they share the instance's resource quota and connection limits, and an outage or maintenance on that instance affects every bound app simultaneously.",
    hindiExplanation:
      "Haan, multiple apps ek hi service instance se bind ho sakte hain — har `cf bind-service` call se broker se alag credentials mil sakte hain (service ke hisaab se), taaki baad mein `cf unbind-service` se ek app ka access revoke kiya ja sake bina doosron ko affect kiye. Ye ek common cost-saving pattern hai (jaise kai microservices ek hi HANA Cloud instance share karte hain), lekin iska tradeoff hai — sab apps us instance ka resource quota aur connection limit share karte hain, aur agar us instance mein outage ho, toh sab bound apps affect hote hain.",
    interviewExplanation:
      "I'd answer 'yes' with the tradeoff clearly stated: 'Multiple apps can bind to one instance, each typically getting its own credential set from the broker, so you can revoke one app's access independently. It's a common way to save cost by sharing a database instance across microservices — but they then share that instance's quota and fate, so an outage there impacts every bound app at once.'",
    diagramNote:
      "One 'HANA Cloud Instance' box with three separate binding arrows to 'App A', 'App B', 'App C', each labeled with its own distinct credential set.",
    diagramMermaid: `flowchart LR
    HANA["HANA Cloud Instance"] -- "binding A" --> A["App A"]
    HANA -- "binding B" --> B["App B"]
    HANA -- "binding C" --> C["App C"]`,
    realProjectExample:
      "Three microservices in the same subaccount shared one HANA Cloud instance to control cost during a POC phase, but we planned to split them into dedicated instances before production to avoid one service's heavy query load throttling the others.",
    interviewTip:
      "Mention the shared-fate tradeoff explicitly — a senior answer doesn't just say 'yes you can share', it flags the risk too.",
    followupQuestions: [
      "How would you revoke just one app's access to a shared instance?",
      "Does every service type support multiple simultaneous bindings?",
      "What would you monitor if several apps share one database instance?",
    ],
    commonMistakes: [
      "Not mentioning the shared quota/fate tradeoff.",
      "Assuming binding 'transfers ownership' rather than adding another consumer.",
    ],
    importantPoints: [
      "Multiple apps CAN bind to one service instance.",
      "Each binding usually gets distinct, independently revocable credentials.",
      "Shared instance = shared quota, connection limits, and outage impact.",
    ],
    revisionNotes: "Multiple apps can bind to one instance (cost saving) but then share its quota/fate — outage affects all bound apps.",
  },
  {
    id: "cf-q20",
    topic: "Bindings",
    prompt: "What is 'credential rotation' for a service binding, and why does it matter?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["bindings", "security", "rotation"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Credential rotation means periodically replacing a binding's credentials (e.g. via unbind + rebind, or a broker's native rotation support) so long-lived secrets don't sit unchanged indefinitely — reducing the blast radius if credentials ever leak.",
    detailedAnswer:
      "Some brokers support rotating credentials without downtime — creating a new binding alongside the old one, updating the app to use the new credentials, then removing the old binding once confirmed working. Where native rotation isn't supported, the manual pattern is: create a new service key or binding, update the app's configuration/restart to pick up the new credentials, verify it works, then unbind/delete the old one. This matters because static credentials that never change are a bigger security risk — if they leak (accidentally committed to git, exposed in a log), they remain valid indefinitely unless someone notices and rotates them.",
    hindiExplanation:
      "Credential rotation ka matlab hai — binding ke credentials ko periodically badalte rehna (jaise unbind+rebind se, ya broker ke native rotation support se), taaki long-lived secrets hamesha ke liye same na rahein. Kuch brokers bina downtime ke rotation support karte hain — naya binding purane ke saath banate ho, app ko naye credentials pe update karte ho, verify karne ke baad purana binding hata dete ho. Ye security ke liye important hai — agar static credentials kabhi leak ho jaayein (galti se git mein commit ho jaayein, ya logs mein dikh jaayein), toh wo hamesha ke liye valid rehte hain jab tak koi notice karke rotate na kare.",
    interviewExplanation:
      "I'd explain both the mechanism and the reason: 'Credential rotation means periodically replacing a binding's credentials rather than letting them live forever unchanged. Some brokers support zero-downtime native rotation; otherwise the manual pattern is create-new-binding, switch the app over, verify, then remove the old one. It matters because a leaked long-lived credential stays exploitable forever unless it's rotated.'",
    diagramNote:
      "Timeline: 'Old binding (credentials v1)' running alongside a newly created 'New binding (credentials v2)' → app switches over → 'Old binding removed' once verified.",
    diagramMermaid: `flowchart LR
    A["Old binding<br/>credentials v1"] --> B["New binding created<br/>credentials v2"]
    B --> C["App switches to v2,<br/>verified working"]
    C --> D["Old binding removed"]`,
    realProjectExample:
      "As part of a security audit, we rotated database credentials for a production service by creating a parallel binding, updating the app's environment, confirming successful connections in logs, then removing the old binding — with zero downtime for end users.",
    interviewTip:
      "If asked about security best practices for BTP, credential rotation is a strong, concrete point to raise — it shows you think beyond just 'it works' to 'it's secure long-term'.",
    followupQuestions: [
      "Does every service broker support native credential rotation?",
      "What's the risk of NOT rotating credentials?",
      "How would you rotate credentials with zero downtime?",
    ],
    commonMistakes: [
      "Treating service credentials as 'set once and forget'.",
      "Not knowing the create-new-then-remove-old pattern for zero-downtime rotation.",
    ],
    importantPoints: [
      "Rotation = periodically replacing binding credentials.",
      "Some brokers support native, zero-downtime rotation.",
      "Manual pattern: new binding → switch app → verify → remove old.",
    ],
    revisionNotes: "Credential rotation = replace binding credentials periodically (native or manual create-new/remove-old) to limit leak exposure.",
  },
  {
    id: "cf-q21",
    topic: "Scaling",
    prompt: "What's the difference between horizontal and vertical scaling in Cloud Foundry, and how do you do each?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["scaling"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Horizontal scaling changes the number of app instances (`cf scale myapp -i 5`); vertical scaling changes the memory/disk allocated per instance (`cf scale myapp -m 1G`) — horizontal improves throughput and availability, vertical helps a single instance handle heavier per-request load.",
    detailedAnswer:
      "`cf scale <app> -i <count>` adds or removes running instances — each identical, load-balanced by the Gorouter — improving both throughput (more instances handling requests in parallel) and availability (losing one instance doesn't take the app down). `cf scale <app> -m <amount>` changes how much memory (and similarly `-k` for disk) each individual instance gets, useful when a single request needs more memory to process (e.g. large file processing) rather than needing more parallel capacity. The two can be combined in one command.",
    hindiExplanation:
      "`cf scale <app> -i <count>` instances ki count badhata-ghatata hai — har instance identical hota hai, Gorouter unhe load-balance karta hai — isse throughput (zyada instances parallel mein requests handle karte hain) aur availability (ek instance jaane se app down nahi hota) dono improve hote hain. `cf scale <app> -m <amount>` har individual instance ko milne wali memory badhata hai (similarly `-k` disk ke liye) — ye tab useful hai jab ek single request ko zyada memory chahiye ho (jaise bade file processing) na ki zyada parallel capacity.",
    interviewExplanation:
      "I'd give both commands with their purpose: 'Horizontal scaling is cf scale -i, changing instance count — that's for throughput and availability. Vertical scaling is cf scale -m, changing memory per instance — that's for when a single request needs more resources, not more parallelism. You can combine both in one command.'",
    diagramNote:
      "Two arrows from one app box: 'Horizontal: -i 5 → more instances (throughput + HA)' and 'Vertical: -m 1G → more memory per instance (heavier per-request work)'.",
    diagramMermaid: `flowchart LR
    APP["App"] -- "Horizontal: -i 5" --> H["More instances<br/>throughput + HA"]
    APP -- "Vertical: -m 1G" --> V["More memory/instance<br/>heavier per-request work"]`,
    realProjectExample:
      "For a report-generation service that occasionally needed to process large files, we scaled vertically (more memory per instance) rather than horizontally, since the bottleneck was per-request memory, not request volume.",
    interviewTip:
      "If asked 'which scaling would you use for a traffic spike vs a memory-hungry batch job', answer horizontal for the former, vertical for the latter — that distinction is exactly what's being tested.",
    followupQuestions: [
      "Can you scale both instance count and memory in one command?",
      "What happens if you scale down while requests are in flight?",
      "How does the Application Autoscaler service relate to manual `cf scale`?",
    ],
    commonMistakes: [
      "Using vertical scaling (more memory) to solve a throughput/traffic problem.",
      "Not knowing the exact CLI flags (-i vs -m).",
    ],
    importantPoints: [
      "Horizontal (-i) = more instances, for throughput/availability.",
      "Vertical (-m/-k) = more memory/disk per instance, for heavier per-request work.",
      "Both can be combined in a single `cf scale` command.",
    ],
    revisionNotes: "Horizontal = `-i` (instance count, throughput/HA). Vertical = `-m`/`-k` (memory/disk per instance, heavier requests).",
  },
  {
    id: "cf-q22",
    topic: "Scaling",
    prompt: "How does the Application Autoscaler service work, and what metrics can it react to?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["scaling", "autoscaler"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Application Autoscaler is a bindable BTP service that automatically scales an app's instance count (and optionally memory) between a configured min/max, based on rules tied to metrics like CPU utilization, memory utilization, HTTP throughput/latency, or a schedule.",
    detailedAnswer:
      "You create an instance of the Application Autoscaler service, bind it to your app, then define scaling policies — rules like 'if average CPU > 70% for 2 minutes, add 1 instance' or 'if HTTP latency > 500ms, scale up', bounded by a minimum and maximum instance count you configure so it never scales unboundedly. It can also do scheduled scaling (e.g. scale up before a known daily peak). This replaces manually running `cf scale` reactively — the autoscaler continuously evaluates the bound metrics and adjusts instance count automatically within your configured bounds.",
    hindiExplanation:
      "Application Autoscaler ek bindable BTP service hai jo automatically app ke instance count ko (aur optionally memory ko) configured min/max ke beech scale karta hai, metrics-based rules ke through — jaise 'agar average CPU 2 minute tak 70% se zyada rahe, toh 1 instance add karo', ya HTTP latency/throughput based rules. Iske alawa scheduled scaling bhi ho sakti hai (jaise daily peak se pehle instances badha dena). Ye manually `cf scale` chalane ki jagah automatically ye kaam karta hai, tumhare configured bounds ke andar.",
    interviewExplanation:
      "I'd describe the setup flow: 'You create and bind an Application Autoscaler instance, then define policies tied to metrics like CPU, memory, or HTTP throughput/latency, plus a min/max instance bound so it never runs away. It can also do scheduled scaling ahead of known traffic patterns. It essentially automates what you'd otherwise do manually with cf scale.'",
    diagramNote:
      "Flow: 'Application Autoscaler bound to App' → monitors 'CPU / Memory / HTTP metrics' → if policy threshold crossed → 'Scale instances (within min/max bounds)'.",
    diagramMermaid: `flowchart TD
    AS["Application Autoscaler<br/>bound to App"] --> M["Monitors CPU/Memory/HTTP metrics"]
    M --> P{"Policy threshold crossed?"}
    P -- Yes --> S["Scale instances<br/>within min/max bounds"]`,
    realProjectExample:
      "We configured the Application Autoscaler with a CPU-based policy (scale up above 70%, scale down below 30%) plus a scheduled rule to pre-scale before a known daily 9am traffic spike, avoiding a cold-start lag during the rush.",
    interviewTip:
      "Mention the min/max bound explicitly — interviewers often ask 'what stops it from scaling infinitely', and the configured maximum is the direct answer.",
    followupQuestions: [
      "What happens if the autoscaler's max instance count is reached but load keeps increasing?",
      "Can you combine scheduled scaling with metric-based scaling?",
      "How is the autoscaler different from manually running `cf scale`?",
    ],
    commonMistakes: [
      "Not knowing a min/max bound is required to prevent runaway scaling.",
      "Thinking autoscaling only reacts to CPU, missing memory/HTTP/scheduled options.",
    ],
    importantPoints: [
      "Autoscaler = bindable service, policy-driven scaling.",
      "Metrics: CPU, memory, HTTP throughput/latency, or schedule.",
      "Always bounded by a configured min/max instance count.",
    ],
    revisionNotes: "Application Autoscaler = bound service, policy-based on CPU/memory/HTTP/schedule, always within a min/max bound.",
  },
  {
    id: "cf-q23",
    topic: "Scaling",
    prompt: "What happens to in-flight requests when you scale down an app or restart an instance?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["scaling", "graceful-shutdown"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Cloud Foundry sends a SIGTERM to give the instance a grace period to finish in-flight requests and shut down cleanly before forcibly killing it with SIGKILL if it hasn't stopped in time; the Gorouter also stops routing new traffic to an instance being removed.",
    detailedAnswer:
      "When an instance is being stopped (scale down, restart, or a rolling deploy), Diego first removes it from the Gorouter's routing table so no new requests are sent to it, then sends SIGTERM to the app process, giving it a configurable grace period to finish handling any in-flight requests and shut down cleanly (e.g. closing DB connections). If the process hasn't exited by the end of that grace period, Diego sends SIGKILL to force-terminate it. Well-behaved apps should handle SIGTERM to drain gracefully rather than dropping requests abruptly.",
    hindiExplanation:
      "Jab koi instance stop ho raha hota hai (scale down, restart, ya rolling deploy), Diego pehle usse Gorouter ki routing table se hata deta hai (taaki naya traffic na aaye), fir app process ko SIGTERM signal bhejta hai — ek grace period deta hai jisme app apne in-flight requests complete karke cleanly shutdown ho sake (jaise DB connections close karna). Agar us grace period ke andar process khud nahi rukta, toh Diego SIGKILL bhejkar use force-terminate kar deta hai. Achhe se likhe gaye apps ko SIGTERM handle karna chahiye taaki gracefully drain ho sakein, requests abruptly drop na ho.",
    interviewExplanation:
      "I'd describe the sequence: 'First, the instance is removed from the Gorouter's routing table so no new requests come in. Then Diego sends SIGTERM, giving the app a grace period to finish in-flight work and exit cleanly. If it doesn't exit in time, Diego force-kills it with SIGKILL. A well-written app should handle SIGTERM to drain gracefully rather than just dying mid-request.'",
    diagramNote:
      "Sequence: 'Instance marked for removal' → 'Removed from Gorouter routing table' → 'SIGTERM sent, grace period starts' → 'App finishes in-flight requests' → (if not exited) 'SIGKILL forces termination'.",
    diagramMermaid: `flowchart TD
    A["Instance marked for removal"] --> B["Removed from Gorouter routing table"]
    B --> C["SIGTERM sent, grace period starts"]
    C --> D["App finishes in-flight requests, exits"]
    C --> E["Grace period expires, still running"]
    E --> F["SIGKILL forces termination"]`,
    realProjectExample:
      "An app that didn't handle SIGTERM was dropping a handful of in-flight requests during every deploy; adding a signal handler to finish active requests and close DB connections before exiting eliminated the errors during rolling deploys.",
    interviewTip:
      "This is a strong senior-level answer if you can name both signals (SIGTERM then SIGKILL) and explain why handling SIGTERM in your app code matters for zero-downtime deploys.",
    followupQuestions: [
      "How would you configure the grace period length?",
      "What should application code do when it receives SIGTERM?",
      "Does the Gorouter stop sending traffic before or after SIGTERM is sent?",
    ],
    commonMistakes: [
      "Not knowing the SIGTERM-then-SIGKILL sequence.",
      "Assuming the app is just killed abruptly with no grace period at all.",
    ],
    importantPoints: [
      "Instance removed from Gorouter routing table first (no new traffic).",
      "SIGTERM gives a grace period to finish in-flight work.",
      "SIGKILL force-terminates if the grace period expires.",
    ],
    revisionNotes: "Scale down/restart: removed from router → SIGTERM (grace period to drain) → SIGKILL if still running after grace period.",
  },
  {
    id: "cf-q24",
    topic: "CLI",
    prompt: "Walk through the essential `cf` CLI commands you'd use to go from zero to a running, bound application.",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["cli", "basics"],
    estimatedMinutes: 3,
    expectedAnswer:
      "`cf login`, `cf target -o <org> -s <space>`, `cf push <app>`, `cf create-service`, `cf bind-service`, `cf restart` — login and target the right org/space, push the app, then create and bind any services it needs, restarting to pick up the binding.",
    detailedAnswer:
      "The typical flow: `cf login` authenticates you against a Cloud Controller endpoint; `cf target -o myorg -s myspace` sets which org/space subsequent commands apply to; `cf push myapp` stages and starts your app from the current directory (or a manifest); `cf create-service <service> <plan> <name>` provisions a service instance; `cf bind-service myapp <name>` binds it to your app; and `cf restart myapp` is needed afterward so the app actually picks up the new VCAP_SERVICES entry. Along the way, `cf apps`, `cf logs myapp --recent`, and `cf env myapp` are the go-to commands for checking status and debugging.",
    hindiExplanation:
      "Typical flow ye hai: `cf login` se Cloud Controller endpoint pe authenticate karo; `cf target -o myorg -s myspace` se decide karo ki agle commands kis org/space pe apply honge; `cf push myapp` current directory (ya manifest) se app stage aur start karta hai; `cf create-service <service> <plan> <name>` se ek service instance provision hota hai; `cf bind-service myapp <name>` se wo app se bind hota hai; aur `cf restart myapp` zaroori hai taaki app ko naya VCAP_SERVICES entry mil sake. Beech mein `cf apps`, `cf logs myapp --recent`, aur `cf env myapp` status check aur debugging ke liye kaam aate hain.",
    interviewExplanation:
      "I'd walk through it as a sequence: 'login, then target the right org and space, then push the app, then create-service and bind-service for anything it needs, then restart so it picks up the binding. Along the way I'd use cf apps, cf logs, and cf env to check status.'",
    diagramNote:
      "Sequential flow: cf login → cf target → cf push → cf create-service → cf bind-service → cf restart, with cf apps/cf logs/cf env as side 'checkpoint' commands.",
    diagramMermaid: `flowchart LR
    A["cf login"] --> B["cf target -o -s"] --> C["cf push"] --> D["cf create-service"] --> E["cf bind-service"] --> F["cf restart"]`,
    realProjectExample:
      "Onboarding a new team member, we walked through exactly this sequence on a sample app so they had muscle memory for the full push-to-bound-service flow before touching a real project.",
    interviewTip:
      "If asked this in an interview, actually reciting the commands in the right order (not just describing them abstractly) demonstrates real hands-on CLI familiarity.",
    followupQuestions: [
      "What does `cf target` actually set, under the hood?",
      "How would you push using a manifest file instead of flags?",
      "What's the difference between `cf logs --recent` and plain `cf logs`?",
    ],
    commonMistakes: [
      "Forgetting `cf restart` after binding a service.",
      "Not knowing `cf target` needs both an org and a space.",
    ],
    importantPoints: [
      "login → target (org+space) → push → create-service → bind-service → restart.",
      "`cf apps`, `cf logs`, `cf env` are the core status/debug commands.",
      "Binding always needs a follow-up restart to take effect.",
    ],
    revisionNotes: "Core flow: login → target -o -s → push → create-service → bind-service → restart. Debug with apps/logs/env.",
  },
  {
    id: "cf-q25",
    topic: "CLI",
    prompt: "What's the difference between `cf logs <app>` and `cf logs <app> --recent`?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["cli", "logs"],
    estimatedMinutes: 2,
    expectedAnswer:
      "`cf logs <app>` tails logs live (streaming, blocks the terminal); `cf logs <app> --recent` dumps a recent buffer of already-emitted logs and exits immediately — useful when you just need to see what already happened, like after a crash.",
    detailedAnswer:
      "Plain `cf logs myapp` opens a live streaming connection to the Loggregator system and keeps printing new log lines as they're emitted, until you Ctrl+C — good for watching behavior in real time (like during a deploy). `cf logs myapp --recent` instead fetches the recent buffered log history (a limited window, not the full history) and exits right away — the go-to command right after an app crashes or fails to start, when you want to see what already happened without waiting for new output.",
    hindiExplanation:
      "Plain `cf logs myapp` Loggregator system se live streaming connection kholta hai aur naye log lines print karta rehta hai jab tak Ctrl+C na karo — real-time mein behavior dekhne ke liye achha hai (jaise deploy ke dauraan). `cf logs myapp --recent` ke bajaye recent buffered log history (limited window, poori history nahi) fetch karta hai aur turant exit ho jaata hai — ye command tab use karte hain jab app crash ho jaaye ya start hi na ho, aur tumhe dekhna ho ki pehle kya hua tha, naye output ka wait kiye bina.",
    interviewExplanation:
      "I'd give the practical distinction: 'Plain cf logs streams live and blocks your terminal — good for watching a deploy in real time. cf logs --recent dumps the recent buffer and exits immediately — that's what I reach for right after a crash, to see what already happened without waiting.'",
    diagramNote:
      "Two commands side by side: 'cf logs myapp → live stream (blocks terminal)' vs 'cf logs myapp --recent → recent buffer dump (exits immediately)'.",
    diagramMermaid: `flowchart LR
    A["cf logs myapp"] --> B["Live stream<br/>blocks terminal"]
    C["cf logs myapp --recent"] --> D["Recent buffer dump<br/>exits immediately"]`,
    realProjectExample:
      "After a deploy failed with a crash loop, `cf logs myapp --recent` immediately showed the stack trace from the last crash, without needing to reproduce it live by streaming logs and waiting.",
    interviewTip:
      "If asked 'app just crashed, what's your first command', the strong answer is `cf logs <app> --recent` — it's faster than live-tailing and waiting for a repeat crash.",
    followupQuestions: [
      "How far back does `--recent` actually go?",
      "How would you forward logs to a long-term external log store?",
      "What underlying system does `cf logs` pull from?",
    ],
    commonMistakes: [
      "Using plain `cf logs` and waiting when `--recent` would show the crash immediately.",
      "Not knowing `--recent` is a limited buffer, not the full log history.",
    ],
    importantPoints: [
      "`cf logs` = live stream, blocks terminal.",
      "`cf logs --recent` = recent buffer dump, exits immediately.",
      "`--recent` is the fast first move right after a crash.",
    ],
    revisionNotes: "`cf logs` = live tail. `cf logs --recent` = recent buffer, exits fast — best first command after a crash.",
  },
  {
    id: "cf-q26",
    topic: "CLI",
    prompt: "What does `cf ssh <app>` let you do, and what are its limitations?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["cli", "ssh", "debugging"],
    estimatedMinutes: 2,
    expectedAnswer:
      "`cf ssh <app>` opens an SSH session directly into a running app instance's container, useful for live debugging (checking files, running diagnostic commands); it's ephemeral — any changes you make inside the container are lost on the next restart/restage, so it should never be used for actual configuration changes.",
    detailedAnswer:
      "SSH access into app containers must be enabled (both at the platform and space level, and it can be disabled entirely for security-sensitive environments). Once enabled, `cf ssh myapp` (optionally targeting a specific instance index with `-i`) drops you into a shell inside that container, letting you inspect the filesystem, check running processes, or run diagnostic commands you couldn't get from logs alone. The critical caveat: containers are ephemeral by design — anything you change or create there (installing a tool, editing a file) disappears the moment that instance restarts, is restaged, or gets rescheduled onto a different cell. It's strictly a debugging tool, never a place to make persistent changes.",
    hindiExplanation:
      "SSH access app containers mein enable hona chahiye (platform aur space level dono pe, aur security-sensitive environments mein poori tarah disable bhi kiya ja sakta hai). Enable hone ke baad, `cf ssh myapp` (chaho toh `-i` se specific instance index target karke) tumhe us container ke andar ek shell de deta hai — filesystem inspect karna, running processes check karna, ya aise diagnostic commands chalana jo sirf logs se nahi milte. Sabse important baat — containers ephemeral hote hain, matlab jo bhi tum wahan change/create karoge, wo instance restart, restage, ya kisi doosre cell pe reschedule hote hi gayab ho jaayega. Ye sirf debugging tool hai, permanent changes ke liye nahi.",
    interviewExplanation:
      "I'd explain the use case and immediately flag the caveat: 'cf ssh drops you into a shell inside a running container — great for live debugging when logs alone aren't enough. But containers are ephemeral, so anything you change there is gone on the next restart or restage. It's strictly for inspection and diagnosis, never for making actual persistent changes.'",
    diagramNote:
      "Flow: 'cf ssh myapp' → 'shell inside running container' with a warning label 'ephemeral: changes lost on next restart/restage'.",
    diagramMermaid: `flowchart LR
    A["cf ssh myapp"] --> B["Shell inside running container"]
    B -.-> C["Ephemeral: changes lost<br/>on next restart/restage"]`,
    realProjectExample:
      "When a app was failing with a cryptic error, `cf ssh` into the container let us inspect an actual config file being loaded at runtime, revealing a missing environment variable that wasn't obvious from logs alone.",
    interviewTip:
      "Always mention the ephemeral caveat unprompted — a candidate who suggests using `cf ssh` to 'fix' something by editing files in the container reveals a real misunderstanding of container lifecycle.",
    followupQuestions: [
      "How would you disable SSH access for a security-sensitive space?",
      "How do you target a specific instance index with `cf ssh`?",
      "Why shouldn't you install a tool via `cf ssh` and rely on it staying there?",
    ],
    commonMistakes: [
      "Suggesting `cf ssh` as a way to make lasting configuration changes.",
      "Not knowing SSH access can be disabled at the platform/space level.",
    ],
    importantPoints: [
      "`cf ssh` = live shell into a running app container, for debugging.",
      "Must be enabled at platform/space level; can be disabled for security.",
      "Ephemeral — any changes are lost on restart/restage.",
    ],
    revisionNotes: "`cf ssh` = debugging shell into container. Ephemeral — never make persistent changes there.",
  },
  {
    id: "cf-q27",
    topic: "Deployment",
    prompt: "What is a manifest file (`manifest.yml`) and why use it instead of CLI flags?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["deployment", "manifest"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A manifest.yml declares an app's push configuration (name, memory, instances, routes, buildpack, env vars, service bindings) as version-controlled code, so `cf push` is repeatable and consistent across environments instead of relying on someone remembering the right CLI flags.",
    detailedAnswer:
      "Without a manifest, a correct push might require remembering a long list of flags (`-m`, `-i`, `-b`, `--var`, etc.) every time — easy to get wrong or inconsistent between team members or environments. A manifest.yml captures all of this declaratively, checked into source control alongside the app, so `cf push` alone reproduces the exact same configuration every time. It also supports multiple apps in one manifest (useful for related services), variable substitution (`((var))` placeholders filled in per environment), and is the standard input CI/CD pipelines use for repeatable deploys.",
    hindiExplanation:
      "Manifest ke bina, sahi push karne ke liye har baar lambi list of flags yaad rakhni padti hai (`-m`, `-i`, `-b`, `--var`, etc.) — galti hone ya team members/environments ke beech inconsistent hone ka chance rehta hai. manifest.yml ye sab kuch declaratively capture karta hai, source control mein app ke saath check-in hota hai, taaki akela `cf push` hamesha exact same configuration reproduce kare. Ye multiple apps ek hi manifest mein support karta hai, variable substitution bhi (`((var))` placeholders, environment ke hisaab se fill hote hain), aur CI/CD pipelines ke liye standard input hota hai repeatable deploys ke liye.",
    interviewExplanation:
      "I'd frame it as reproducibility: 'A manifest.yml declares everything cf push needs — memory, instances, routes, buildpack, env vars, service bindings — as version-controlled code. Instead of remembering a long list of CLI flags every time, cf push alone reproduces the exact same config, and it's the standard input CI/CD pipelines use for consistent deploys.'",
    diagramNote:
      "Two paths: 'cf push with many CLI flags (error-prone, inconsistent)' vs 'cf push reading manifest.yml (version-controlled, repeatable)'.",
    diagramMermaid: `flowchart LR
    A["cf push with many CLI flags"] --> B["Error-prone, inconsistent"]
    C["cf push reading manifest.yml"] --> D["Version-controlled, repeatable"]`,
    realProjectExample:
      "Our CI/CD pipeline used a manifest.yml with `((db_host))`-style variable placeholders, filled in differently per environment via `cf push --vars-file`, so the same manifest deployed consistently to dev, QA, and prod with only the variable values changing.",
    interviewTip:
      "Mention variable substitution (`((var))` + `--vars-file`) if asked how the same manifest supports multiple environments — that's the specific mechanism, not just 'you edit it manually'.",
    followupQuestions: [
      "How do you use variable substitution in a manifest?",
      "Can one manifest.yml define multiple apps?",
      "How does a manifest differ from an MTA descriptor?",
    ],
    commonMistakes: [
      "Pushing with ad-hoc CLI flags in production instead of a version-controlled manifest.",
      "Not knowing manifests support variable substitution for multi-environment deploys.",
    ],
    importantPoints: [
      "Manifest = declarative, version-controlled push configuration.",
      "Supports variable substitution for per-environment values.",
      "Standard input for CI/CD pipeline deploys.",
    ],
    revisionNotes: "manifest.yml = declarative, version-controlled `cf push` config — repeatable, supports `((var))` substitution for CI/CD.",
  },
  {
    id: "cf-q28",
    topic: "Deployment",
    prompt: "How does MTA-based deployment (`cf deploy`) differ from a plain `cf push`?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["deployment", "mta"],
    estimatedMinutes: 3,
    expectedAnswer:
      "`cf push` deploys a single application; `cf deploy <mtar>` deploys a Multi-Target Application archive that can bundle several modules and resources (apps, service instances, destinations) together, deploying and wiring them all up as one coordinated unit described by an `mta.yaml`.",
    detailedAnswer:
      "A real BTP project is rarely a single app — it might have a CAP backend module, a Fiori/UI5 frontend module (deployed to the HTML5 repository), and several required services (HANA Cloud, XSUAA, Destination). An MTA descriptor (`mta.yaml`) declares all of these as 'modules' and 'resources' with their dependencies on each other. Building it (`mbt build`) produces an `.mtar` archive, and `cf deploy <mtar>` (via the multiapps CF CLI plugin) deploys every module, provisions/binds every resource, and handles the correct ordering — all as one atomic operation, rather than you manually running many separate `cf push`/`cf create-service`/`cf bind-service` commands.",
    hindiExplanation:
      "Real BTP project shayad hi kabhi sirf ek app hota hai — usme CAP backend module ho sakta hai, Fiori/UI5 frontend module (HTML5 repository mein deploy hota hai), aur kai zaroori services (HANA Cloud, XSUAA, Destination). Ek MTA descriptor (`mta.yaml`) in sabko 'modules' aur 'resources' ki tarah declare karta hai, unki aapas ki dependencies ke saath. Isse build karne se (`mbt build`) ek `.mtar` archive banta hai, aur `cf deploy <mtar>` (multiapps CF CLI plugin ke through) har module deploy karta hai, har resource provision/bind karta hai, aur sahi order maintain karta hai — sab ek hi atomic operation mein, alag-alag `cf push`/`cf create-service`/`cf bind-service` commands manually chalane ki jagah.",
    interviewExplanation:
      "I'd contrast scope: 'cf push deploys one app. cf deploy takes an MTA archive that can bundle multiple modules — like a CAP backend and a Fiori frontend — plus required resources like HANA Cloud and XSUAA, all declared in an mta.yaml, and deploys the whole thing as one coordinated unit, handling ordering and wiring automatically.'",
    diagramNote:
      "Comparison: 'cf push → single app' vs 'cf deploy mtar → CAP module + Fiori module + HANA Cloud resource + XSUAA resource, all deployed/wired together'.",
    diagramMermaid: `flowchart LR
    A["cf push"] --> B["Single app"]
    C["cf deploy mtar"] --> D["CAP module"]
    C --> E["Fiori module"]
    C --> F["HANA Cloud resource"]
    C --> G["XSUAA resource"]`,
    realProjectExample:
      "Our project's `mta.yaml` declared a Node.js CAP module, a UI5 app module, and HANA Cloud/XSUAA/Destination resources; one `cf deploy` command handled the entire coordinated rollout that would otherwise have needed six or seven separate manual commands in the right order.",
    interviewTip:
      "If asked why not just script multiple `cf push` commands instead of MTA, the answer is dependency ordering and atomicity — MTA guarantees resources exist before modules that need them are deployed.",
    followupQuestions: [
      "What does an `mta.yaml` file actually declare?",
      "What command builds an `.mtar` from source?",
      "What happens if one module in an MTA deployment fails — does the whole deployment roll back?",
    ],
    commonMistakes: [
      "Thinking `cf deploy` is just an alias for `cf push`.",
      "Not knowing MTA handles dependency ordering across modules/resources automatically.",
    ],
    importantPoints: [
      "cf push = single app. cf deploy = multi-module MTA archive.",
      "mta.yaml declares modules + resources + their dependencies.",
      "MTA deploy is atomic and dependency-ordered, unlike manual separate commands.",
    ],
    revisionNotes: "cf push = 1 app. cf deploy <mtar> = multi-module app + resources, declared in mta.yaml, deployed as one ordered unit.",
  },
  {
    id: "cf-q29",
    topic: "Deployment",
    prompt: "What is 'blue-green deployment' and how would you implement it on Cloud Foundry?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["deployment", "blue-green"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Blue-green deployment runs the old ('blue') and new ('green') app versions side by side, then switches traffic over (often by mapping the production route to green and unmapping it from blue) once the new version is verified — giving zero-downtime releases and an instant rollback path.",
    detailedAnswer:
      "Deploy the new version as a separate app (e.g. `myapp-green`) alongside the currently running `myapp-blue`, without a public route yet. Test it via its own temporary route or internal access. Once verified, map the production route to `myapp-green` as well (so both serve traffic briefly), then unmap it from `myapp-blue` — traffic shifts to green with no downtime. If something's wrong, you can instantly re-map the route back to blue. Cloud Foundry doesn't automate this natively, but the route-mapping primitives (`cf map-route` / `cf unmap-route`) make it straightforward to script, and dedicated blue-green deployment plugins/pipeline steps exist for CI/CD.",
    hindiExplanation:
      "Blue-green deployment mein purana ('blue') aur naya ('green') app version dono ek saath chalte hain. Naya version ek alag app ki tarah deploy karo (jaise `myapp-green`), abhi public route na do. Usse test karo apne temporary route se. Verify hone ke baad, production route ko `myapp-green` se bhi map kar do (thodi der dono traffic serve karenge), fir `myapp-blue` se unmap kar do — traffic bina downtime ke green pe shift ho jaata hai. Agar kuch galat ho, toh turant route wapas blue pe map kar sakte ho. Cloud Foundry ye khud automate nahi karta, lekin route-mapping commands (`cf map-route`/`cf unmap-route`) se ye script karna aasan hai.",
    interviewExplanation:
      "I'd walk the steps: 'Deploy the new version as a separate app without a public route yet, test it independently. Once verified, map the production route to the new version too — briefly both serve traffic — then unmap it from the old version. That gives zero downtime, and if something's wrong, I can instantly remap back to the old version. CF doesn't automate this natively, but map-route/unmap-route make it easy to script.'",
    diagramNote:
      "Sequence: 'Blue (live) + Green (new, no public route)' → 'Test Green independently' → 'Map production route to Green too (both live briefly)' → 'Unmap route from Blue' → 'Green is now live, Blue kept as instant rollback'.",
    diagramMermaid: `flowchart TD
    A["Blue (live) + Green (new, no route yet)"] --> B["Test Green independently"]
    B --> C["Map production route to Green too<br/>(both live briefly)"]
    C --> D["Unmap route from Blue"]
    D --> E["Green live; Blue kept as instant rollback"]`,
    realProjectExample:
      "We scripted blue-green releases in our CI/CD pipeline using `cf map-route`/`cf unmap-route`, keeping the old app version idle (not deleted) for an hour after each release as an instant rollback option before finally tearing it down.",
    interviewTip:
      "If asked 'does Cloud Foundry do this automatically', be precise: it's not a built-in one-command feature — it's a pattern you implement using route mapping primitives, often via a CI/CD plugin.",
    followupQuestions: [
      "What commands would you use to map and unmap a route?",
      "How would you handle database schema changes during a blue-green deploy?",
      "What's the rollback story if the green version has a bug after full cutover?",
    ],
    commonMistakes: [
      "Thinking Cloud Foundry has a single built-in 'blue-green deploy' command.",
      "Deleting the old (blue) version immediately instead of keeping it as a rollback option.",
    ],
    importantPoints: [
      "Blue-green = old and new versions run side by side.",
      "Route mapped to both briefly, then unmapped from old.",
      "Not natively automated — implemented via map-route/unmap-route, often in CI/CD.",
    ],
    revisionNotes: "Blue-green: deploy new alongside old → test → map route to new too → unmap from old → zero downtime, instant rollback path.",
  },
  {
    id: "cf-q30",
    topic: "Logs",
    prompt: "What is the Loggregator system and how do application logs actually get to `cf logs`?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["logs", "loggregator"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Loggregator is Cloud Foundry's logging and metrics aggregation pipeline — an agent on each Diego cell captures stdout/stderr from every app instance, forwards it through Loggregator's transport, and `cf logs` (or a bound syslog drain) taps into that stream.",
    detailedAnswer:
      "Each Diego cell runs a Loggregator agent that captures every app instance's stdout/stderr as it's written, tags it with metadata (app name, instance index, source type), and forwards it into the Loggregator system's aggregation pipeline. `cf logs` is essentially a client that subscribes to this stream, filtered to your app. Because Loggregator only buffers a limited recent window, production setups typically bind a syslog drain (or the Application Logging service in BTP) to forward logs to a persistent, searchable log store — relying solely on `cf logs --recent` for long-term log retention doesn't work since old logs simply age out of the buffer.",
    hindiExplanation:
      "Loggregator Cloud Foundry ka logging/metrics aggregation pipeline hai. Har Diego cell pe ek Loggregator agent chalta hai jo har app instance ka stdout/stderr capture karta hai, usme metadata tag karta hai (app name, instance index), aur Loggregator system mein forward kar deta hai. `cf logs` basically ek client hai jo isi stream ko subscribe karta hai, tumhare app tak filter karke. Loggregator sirf ek limited recent window buffer karta hai, isliye production setups usually ek syslog drain (ya BTP ki Application Logging service) bind karte hain taaki logs ek persistent, searchable store mein forward ho sakein — sirf `cf logs --recent` pe depend karna long-term retention ke liye kaam nahi karta, kyunki purane logs buffer se age-out ho jaate hain.",
    interviewExplanation:
      "I'd explain the pipeline: 'Each Diego cell runs a Loggregator agent that captures every app instance's stdout/stderr and forwards it into Loggregator's aggregation system. cf logs is a client subscribing to that stream. Since Loggregator only keeps a limited recent buffer, production apps should bind a syslog drain or the Application Logging service to persist logs long-term — relying on cf logs --recent alone means old logs eventually age out.'",
    diagramNote:
      "Flow: 'App instance stdout/stderr' → 'Loggregator agent on Diego cell' → 'Loggregator aggregation pipeline' → branches to 'cf logs (live/recent)' and 'Syslog drain / Application Logging service (persistent store)'.",
    diagramMermaid: `flowchart LR
    A["App instance stdout/stderr"] --> B["Loggregator agent<br/>on Diego cell"]
    B --> C["Loggregator aggregation pipeline"]
    C --> D["cf logs (live/recent)"]
    C --> E["Syslog drain / Application<br/>Logging service (persistent)"]`,
    realProjectExample:
      "After losing access to logs from an incident that happened two days earlier (aged out of Loggregator's buffer), we bound the Application Logging service to forward all logs to a persistent, searchable store going forward.",
    interviewTip:
      "Mentioning that Loggregator's buffer is limited — and that persistent logging requires an explicit drain/service binding — shows production-readiness awareness beyond just knowing the `cf logs` command.",
    followupQuestions: [
      "What is a syslog drain and how do you bind one?",
      "How long does Loggregator typically retain logs before they age out?",
      "What's the difference between app logs and platform/component logs?",
    ],
    commonMistakes: [
      "Assuming `cf logs --recent` is sufficient for long-term log retention.",
      "Not knowing Loggregator is the underlying aggregation system behind `cf logs`.",
    ],
    importantPoints: [
      "Loggregator agents on Diego cells capture app stdout/stderr.",
      "`cf logs` subscribes to Loggregator's stream.",
      "Persistent retention needs a syslog drain / Application Logging service binding.",
    ],
    revisionNotes: "Loggregator = CF's log pipeline (Diego cell agents → aggregation). `cf logs` taps the stream; bind a drain/Application Logging for persistence.",
  },
  {
    id: "cf-q31",
    topic: "Logs",
    prompt: "What's the difference between application logs and platform (component) logs in Cloud Foundry?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["logs", "troubleshooting"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Application logs are your app's own stdout/stderr output (accessible via `cf logs`); platform/component logs come from Cloud Foundry's own infrastructure (Cloud Controller, Diego, Gorouter) and are only accessible to the platform operator, not regular BTP customers.",
    detailedAnswer:
      "As a BTP customer, `cf logs` and any staging/deployment output only ever show you your own application's logs — you have no direct access to the underlying platform's component logs (Cloud Controller's internal logs, Diego's scheduling decisions, Gorouter's routing logs), since those belong to SAP's managed infrastructure layer, shared across many customers. If you suspect a platform-level issue (not your app's fault), the path is raising a support ticket with SAP rather than trying to access those logs yourself.",
    hindiExplanation:
      "BTP customer hone ke naate, `cf logs` aur koi bhi staging/deployment output sirf tumhare apne application ke logs dikhate hain — underlying platform ke component logs (Cloud Controller ke internal logs, Diego ke scheduling decisions, Gorouter ke routing logs) tak tumhara koi direct access nahi hota, kyunki wo SAP ke managed infrastructure layer ka hissa hain, jo kai customers ke beech shared hai. Agar tumhe lage ki problem platform-level hai (tumhari app ki galti nahi), toh sahi raasta hai SAP ko support ticket raise karna, khud wo logs access karne ki koshish karne ki jagah.",
    interviewExplanation:
      "I'd draw the boundary clearly: 'cf logs only ever shows my application's own stdout/stderr. Platform component logs — Cloud Controller, Diego, Gorouter — belong to SAP's managed infrastructure and aren't accessible to customers directly. If I suspect a platform-level issue, the right move is a support ticket to SAP, not trying to dig into those logs myself.'",
    diagramNote:
      "Two separate boxes: 'Application logs (cf logs, customer-accessible)' vs 'Platform/component logs (Cloud Controller, Diego, Gorouter — SAP-managed, not customer-accessible)', with an arrow from the platform box to 'SAP Support Ticket' for suspected platform issues.",
    diagramMermaid: `flowchart LR
    A["Application logs<br/>cf logs (customer-accessible)"]
    B["Platform/component logs<br/>Cloud Controller, Diego, Gorouter<br/>SAP-managed"] --> C["Suspected platform issue?<br/>Raise SAP support ticket"]`,
    realProjectExample:
      "When app performance seemed to degrade platform-wide with no corresponding change in our own app logs, we raised a support ticket with SAP rather than trying to dig into Cloud Controller internals we had no access to — SAP confirmed a regional infrastructure issue on their end.",
    interviewTip:
      "If asked to debug a suspected platform issue, the correct answer always includes 'raise a support ticket with SAP' — trying to claim direct access to platform component logs is a red flag.",
    followupQuestions: [
      "What information would you include in a support ticket about a suspected platform issue?",
      "Can `cf events` give any platform-level insight?",
      "What's the SAP status/incident page used for?",
    ],
    commonMistakes: [
      "Claiming customers can directly access Cloud Controller/Diego/Gorouter logs.",
      "Not knowing to escalate suspected platform issues via SAP support rather than digging further alone.",
    ],
    importantPoints: [
      "Application logs = your app's own output, via `cf logs`.",
      "Platform/component logs = SAP-managed, not customer-accessible.",
      "Suspected platform issues go through SAP support, not direct log access.",
    ],
    revisionNotes: "App logs (yours, via cf logs) vs platform/component logs (SAP-managed, not accessible) — platform issues go through SAP support.",
  },
  {
    id: "cf-q32",
    topic: "Troubleshooting",
    prompt: "An app fails to start after `cf push` and shows a crash loop. Walk through how you'd troubleshoot it.",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["troubleshooting", "scenario"],
    estimatedMinutes: 4,
    expectedAnswer:
      "Check `cf logs <app> --recent` first for the actual crash/error output, then `cf events <app>` for a lifecycle timeline, verify memory isn't exceeded (OOM), confirm the health check type/endpoint matches what the app actually exposes, and check required service bindings/env vars are present.",
    detailedAnswer:
      "First move is always `cf logs myapp --recent` — the actual stack trace or error message is usually right there. Next, `cf events myapp` shows a timeline of what Cloud Foundry itself observed (crashes, out-of-memory kills, health check failures), which tells you what kind of failure it is. Common root causes: the app exceeds its configured memory limit and gets OOM-killed (fix: increase `-m` or fix a memory leak); the health check is misconfigured (e.g. an HTTP health check pointing at a path the app doesn't actually serve, so it never reports healthy even though it's technically running); a required environment variable or service binding is missing (check with `cf env myapp`); or the app's start command itself is wrong (check the manifest/Procfile). Working through logs → events → memory → health check → env/bindings, in that order, covers the vast majority of real crash-loop causes.",
    hindiExplanation:
      "Sabse pehla kaam hamesha `cf logs myapp --recent` hota hai — actual stack trace ya error message wahin milta hai. Fir `cf events myapp` dekho, jo batata hai Cloud Foundry ne khud kya observe kiya (crashes, out-of-memory kills, health check failures) — isse pata chalta hai ki failure kis type ki hai. Common root causes: app apni configured memory limit se zyada use kar raha hai aur OOM-kill ho raha hai (fix: `-m` badhao ya memory leak fix karo); health check galat configured hai (jaise HTTP health check ek aisi path check kar raha hai jo app actually serve hi nahi karta, isliye kabhi healthy report hi nahi hota); koi zaroori environment variable ya service binding missing hai (`cf env myapp` se check karo); ya app ka start command hi galat hai (manifest/Procfile check karo). Is order mein check karna — logs → events → memory → health check → env/bindings — zyada tar real crash-loop causes cover kar leta hai.",
    interviewExplanation:
      "I'd give a structured troubleshooting sequence: 'First, cf logs --recent for the actual error. Then cf events for CF's own observed timeline — crashes, OOM kills, health check failures. Then I'd check if it's an OOM issue (bump memory or fix a leak), a misconfigured health check pointing at the wrong endpoint, a missing env var or service binding via cf env, or simply a wrong start command in the manifest. That order — logs, events, memory, health check, env — covers almost every real crash-loop case I've hit.'",
    diagramNote:
      "Troubleshooting flowchart: 'Crash loop' → 'cf logs --recent (error?)' → 'cf events (OOM? health check fail? crash?)' → branches to 'Fix memory', 'Fix health check', 'Fix env/binding', 'Fix start command'.",
    diagramMermaid: `flowchart TD
    A["Crash loop"] --> B["cf logs --recent<br/>see actual error"]
    B --> C["cf events<br/>OOM? health check fail? crash?"]
    C --> D["Fix memory (-m or leak)"]
    C --> E["Fix health check endpoint/type"]
    C --> F["Fix missing env/binding (cf env)"]
    C --> G["Fix start command (manifest/Procfile)"]`,
    realProjectExample:
      "A crash loop turned out to be an HTTP health check pointing at `/healthz` while the app only exposed `/health` — the app was actually running fine the whole time, just never reported healthy, so CF kept restarting it thinking it had failed.",
    interviewTip:
      "Structuring your answer as an explicit sequence (logs → events → memory → health check → env) scores much higher than a scattered list of 'things that could be wrong' — it shows you have a repeatable process, not just guesses.",
    followupQuestions: [
      "What does an OOM-killed instance look like in `cf events`?",
      "How would you diagnose a misconfigured health check specifically?",
      "What's the very first command you'd run when an app won't start?",
    ],
    commonMistakes: [
      "Jumping straight to re-pushing or restaging without reading logs/events first.",
      "Not checking the health check configuration as a possible cause of an app that's actually running fine.",
    ],
    importantPoints: [
      "Sequence: cf logs --recent → cf events → memory → health check → env/bindings.",
      "OOM kill and misconfigured health checks are both very common causes.",
      "A structured process beats a scattered list of guesses.",
    ],
    revisionNotes: "Crash loop debug order: logs --recent → events → memory (OOM?) → health check config → env/bindings → start command.",
  },
  {
    id: "cf-q33",
    topic: "Troubleshooting",
    prompt: "A `cf push` fails with a quota-exceeded error. How do you diagnose and fix it?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["troubleshooting", "quota"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Check the space/org's memory quota against what's already in use (`cf space` / `cf org` show quota info); either free up memory by scaling down or stopping unused apps, or request a quota increase from a BTP admin if the org/space genuinely needs more.",
    detailedAnswer:
      "The error names either the org quota or space quota being exceeded. First check current usage vs. the configured quota (visible in the cockpit or via `cf space <name>` / a quota-related plugin) to confirm which limit is being hit and by how much. The immediate fix is either operational — scale down or stop apps you don't currently need running, freeing up headroom — or administrative — if the workload genuinely needs more capacity, a BTP admin increases the Application Runtime entitlement/quota for that subaccount (assuming the parent directory/global account has spare capacity to give, echoing the entitlement/quota relationship from Section 1).",
    hindiExplanation:
      "Error batata hai ki org quota ya space quota exceed ho rahi hai. Pehle current usage vs configured quota check karo (cockpit mein ya `cf space <name>` se) taaki confirm ho sake ki kaunsi limit hit ho rahi hai. Immediate fix ya toh operational hai — kisi unused app ko scale down/stop karke memory free karo — ya administrative hai — agar genuinely zyada capacity chahiye, toh BTP admin subaccount ka Application Runtime entitlement/quota badhaye (agar parent ke paas spare capacity ho).",
    interviewExplanation:
      "I'd give the two-path answer: 'First I'd check current usage against the space or org quota to confirm which one's being hit. Then either free up memory by scaling down unused apps, or if we genuinely need more capacity, ask a BTP admin to increase the Application Runtime quota for the subaccount — the same entitlement/quota relationship that governs any BTP service.'",
    diagramNote:
      "Flow: 'cf push fails: quota exceeded' → 'Check current usage vs quota' → branches to 'Free up memory (scale down/stop apps)' or 'Request quota increase from BTP admin'.",
    diagramMermaid: `flowchart TD
    A["cf push fails: quota exceeded"] --> B["Check current usage vs quota"]
    B --> C["Free up memory<br/>scale down/stop unused apps"]
    B --> D["Request quota increase<br/>from BTP admin"]`,
    realProjectExample:
      "A dev-space quota was exhausted by several forgotten, long-stopped-but-not-deleted app shells still reserving memory allocation; deleting them freed enough headroom for the new push without needing to request more quota at all.",
    interviewTip:
      "Mention checking for 'forgotten apps still reserving quota' as a quick win before jumping straight to requesting more quota — it's a common, easy first fix.",
    followupQuestions: [
      "Where do you check current memory usage against quota?",
      "Does a stopped (but not deleted) app still count against quota?",
      "Who has permission to increase a subaccount's Application Runtime quota?",
    ],
    commonMistakes: [
      "Immediately requesting a quota increase without checking for easy wins like unused apps.",
      "Not knowing stopped-but-undeleted apps can still reserve quota.",
    ],
    importantPoints: [
      "Quota-exceeded errors name the org or space limit being hit.",
      "Quick fix: free memory by scaling down/deleting unused apps.",
      "Real fix (if genuinely needed): admin increases the subaccount's quota.",
    ],
    revisionNotes: "Quota exceeded → check usage vs quota → free memory (scale down/delete unused apps) or request quota increase from admin.",
  },
  {
    id: "cf-q34",
    topic: "Troubleshooting",
    prompt: "Two teams report their apps can't reach each other over their internal routes. What would you check?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["troubleshooting", "networking", "scenario"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Check whether the apps are in the same space/org and whether container-to-container networking (or the internal domain route) is actually enabled and the right network policy exists — by default, apps in different spaces can't reach each other over internal routes without an explicit network policy allowing it.",
    detailedAnswer:
      "Cloud Foundry supports container-to-container (C2C) networking using internal routes (typically on the `apps.internal` domain), but this traffic is denied by default between apps unless an explicit network policy is created (`cf add-network-policy`) allowing one app to reach another on a specific port/protocol. If two apps are in different spaces or orgs, you'd also need to confirm the internal route/domain is actually shared and reachable across that boundary, since internal routing is generally scoped per space unless deliberately configured otherwise. The troubleshooting sequence: confirm both apps are pushed with routes on the internal domain, check `cf network-policies` for an existing allow rule between them, and add one if missing.",
    hindiExplanation:
      "Cloud Foundry container-to-container (C2C) networking support karta hai internal routes ke through (usually `apps.internal` domain pe), lekin ye traffic default mein deny hota hai jab tak explicit network policy na banayi jaaye (`cf add-network-policy`) jo ek app ko doosre app tak specific port/protocol pe pahunchne de. Agar do apps alag-alag spaces ya orgs mein hain, toh ye bhi confirm karna padega ki internal route/domain actually shared aur reachable hai us boundary ke aar-paar, kyunki internal routing generally per-space scoped hoti hai jab tak deliberately configure na kiya jaaye. Troubleshooting sequence: dono apps internal domain pe route ke saath pushed hain confirm karo, `cf network-policies` check karo existing allow rule ke liye, aur agar missing ho toh add karo.",
    interviewExplanation:
      "I'd go straight to the likely cause: 'By default, apps can't reach each other over internal container-to-container routes unless an explicit network policy allows it — that's my first suspect. I'd check cf network-policies for an existing allow rule between the two apps, confirm both are actually pushed with internal-domain routes, and add the missing policy with cf add-network-policy if it's not there.'",
    diagramNote:
      "Two apps in different spaces, a red X on a direct arrow between them labeled 'blocked by default', vs a green checkmark arrow labeled 'cf add-network-policy — explicitly allowed'.",
    diagramMermaid: `flowchart LR
    A1["App A<br/>Space 1"] -. "blocked by default" .-> B1["App B<br/>Space 2"]
    A2["App A"] -- "cf add-network-policy<br/>explicitly allowed" --> B2["App B"]`,
    realProjectExample:
      "Two microservices in separate spaces couldn't reach each other over internal routes until we ran `cf add-network-policy serviceA serviceB --port 8080 --protocol tcp`, explicitly allowing that specific traffic — internal networking is deny-by-default for a reason, so this step is easy to forget.",
    interviewTip:
      "The key insight interviewers want here is 'deny by default' — many candidates assume any two apps in the same platform can freely reach each other internally, which is wrong.",
    followupQuestions: [
      "What command adds a network policy between two apps?",
      "What is the `apps.internal` domain used for?",
      "Does a network policy work across different orgs, not just spaces?",
    ],
    commonMistakes: [
      "Assuming internal app-to-app traffic is allowed by default.",
      "Not knowing `cf add-network-policy` is the mechanism to explicitly allow it.",
    ],
    importantPoints: [
      "Container-to-container networking is deny-by-default.",
      "`cf add-network-policy` explicitly allows app-to-app traffic on a port/protocol.",
      "Cross-space/org internal routing needs deliberate configuration.",
    ],
    revisionNotes: "C2C internal networking = deny-by-default. Check/add via `cf add-network-policy` for app-to-app traffic across spaces.",
  },
  {
    id: "cf-q35",
    topic: "Troubleshooting",
    prompt: "An app was working fine yesterday but suddenly can't connect to its bound HANA Cloud service today. What would you check?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["troubleshooting", "bindings", "scenario"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Check whether the service instance itself is healthy (not undergoing maintenance/upgrade), whether the binding's credentials have expired or been rotated, whether a recent app restart lost an env var some other way, and check `cf logs` for the actual connection error to distinguish a network/credential/service-side issue.",
    detailedAnswer:
      "This is a classic 'it worked yesterday' regression, and the fix is to narrow down what changed. First, `cf logs myapp --recent` for the exact connection error (timeout vs authentication failure vs DNS/network error point to different causes). Then check whether the HANA Cloud instance itself had scheduled maintenance, was restarted, or hit a quota/storage limit around that time (visible in the cockpit's service instance details or SAP's status page). Check if credentials were rotated (deliberately by someone on the team, or via an automatic broker-side rotation) without the app being restarted to pick up new ones. Also verify no one recently ran an unbind/rebind or changed the app's environment variables directly, accidentally clobbering the injected VCAP_SERVICES values.",
    hindiExplanation:
      "Ye ek classic 'kal tak thik chal raha tha' regression hai, aur fix karne ka tarika hai ye pata karna ki kya badla. Pehle `cf logs myapp --recent` se exact connection error dekho (timeout vs authentication failure vs network error — sab alag causes point karte hain). Fir check karo ki HANA Cloud instance mein khud koi scheduled maintenance thi, restart hua tha, ya koi quota/storage limit hit hui thi (cockpit ke service instance details mein dikhta hai). Check karo ki kahin credentials rotate toh nahi hue (kisi ne deliberately kiya ho, ya broker ne automatically), aur app ko restart nahi kiya gaya naye credentials pick karne ke liye. Ye bhi verify karo ki kisi ne recently unbind/rebind ya environment variables directly change toh nahi kiye, jisse VCAP_SERVICES ki values accidentally overwrite ho gayi hon.",
    interviewExplanation:
      "I'd narrow it down systematically: 'First, cf logs --recent for the exact error — timeout, auth failure, and network error all point different directions. Then I'd check if the HANA Cloud instance itself had maintenance, a restart, or hit a limit around that time. I'd also check if credentials were rotated without the app being restarted to pick up the new ones, and whether anyone recently touched the binding or environment variables directly.'",
    diagramNote:
      "Troubleshooting tree: 'Sudden connection failure' → 'cf logs --recent: what error type?' → branches to 'Auth failure → check credential rotation', 'Timeout → check service instance health/maintenance', 'Network error → check network policy/connectivity'.",
    diagramMermaid: `flowchart TD
    A["Sudden connection failure"] --> B["cf logs --recent<br/>what error type?"]
    B --> C["Auth failure →<br/>check credential rotation"]
    B --> D["Timeout →<br/>check service instance health/maintenance"]
    B --> E["Network error →<br/>check network policy/connectivity"]`,
    realProjectExample:
      "A sudden authentication failure turned out to be a security team rotating HANA Cloud credentials as part of a scheduled policy, without notifying the app team to restart their app — a quick `cf restart` after coordinating with them resolved it immediately.",
    interviewTip:
      "This question rewards a diagnostic mindset over a guessed single answer — structure your response as 'here's how I'd narrow it down' rather than jumping to one assumed cause.",
    followupQuestions: [
      "How would you check if a service instance had scheduled maintenance?",
      "What log signature would indicate a credential/auth problem specifically?",
      "How would you coordinate with a security team doing credential rotation to avoid this?",
    ],
    commonMistakes: [
      "Assuming the app's own code broke without checking the service/binding side first.",
      "Not distinguishing between different error types (auth vs timeout vs network) to narrow the cause.",
    ],
    importantPoints: [
      "Start with cf logs --recent to identify the error type.",
      "Check service instance health/maintenance, not just the app.",
      "Credential rotation without an app restart is a common, easy-to-miss cause.",
    ],
    revisionNotes: "Sudden binding failure: check logs for error type → service instance health/maintenance → credential rotation → recent binding/env changes.",
  },
];

export const cloudFoundryMcqs: BtpMcq[] = [
  {
    id: "cf-mcq1",
    topic: "Cloud Controller",
    prompt: "Which component actually schedules and runs app containers in Cloud Foundry?",
    options: ["Cloud Controller", "Diego", "Gorouter", "UAA"],
    correctIndex: 1,
    explanation: "The Cloud Controller owns desired state via its API; Diego schedules and runs the actual containers on Diego Cells.",
  },
  {
    id: "cf-mcq2",
    topic: "Org",
    prompt: "What is the correct Cloud Foundry hierarchy from top to bottom?",
    options: ["Space > Org > App", "Org > Space > App", "App > Space > Org", "Org > App > Space"],
    correctIndex: 1,
    explanation: "Org is the top-level quota/ownership boundary, containing Spaces, which contain Apps.",
  },
  {
    id: "cf-mcq3",
    topic: "Space",
    prompt: "Which Space-level role grants read-only access with no ability to push or scale apps?",
    options: ["SpaceDeveloper", "SpaceManager", "SpaceAuditor", "OrgManager"],
    correctIndex: 2,
    explanation: "SpaceAuditor is strictly read-only. SpaceDeveloper is the role needed to push/scale/bind.",
  },
  {
    id: "cf-mcq4",
    topic: "Apps",
    prompt: "What's the difference between an app and an app instance?",
    options: [
      "There is no difference, they're the same thing",
      "An app is the logical unit; an instance is one running container of it",
      "An instance is the logical unit; an app is one running container",
      "Apps run on Diego, instances run on the Cloud Controller",
    ],
    correctIndex: 1,
    explanation: "An app is the logical deployable unit; it can run as multiple instances (containers) for scaling and availability.",
  },
  {
    id: "cf-mcq5",
    topic: "Routes",
    prompt: "Which component load-balances incoming HTTP traffic across an app's healthy instances?",
    options: ["Cloud Controller", "Diego Brain", "Gorouter", "Loggregator"],
    correctIndex: 2,
    explanation: "The Gorouter maintains the routing table and load-balances HTTP traffic across all healthy instances mapped to a route.",
  },
  {
    id: "cf-mcq6",
    topic: "Buildpacks",
    prompt: "What does a buildpack's 'detect' script do?",
    options: [
      "Detects security vulnerabilities in the app",
      "Checks for telltale files to determine if it matches the app's language/framework",
      "Monitors the app's CPU usage in production",
      "Detects when a service binding has expired",
    ],
    correctIndex: 1,
    explanation: "The detect script looks for characteristic files (like package.json for Node.js) to decide if that buildpack applies to the pushed app.",
  },
  {
    id: "cf-mcq7",
    topic: "Service Marketplace",
    prompt: "What standard do Cloud Foundry service brokers implement?",
    options: ["OAuth 2.0", "Open Service Broker (OSB) API", "GraphQL", "gRPC"],
    correctIndex: 1,
    explanation: "Every Marketplace service is fronted by a broker implementing the Open Service Broker API (catalog, provision, bind, unbind, deprovision).",
  },
  {
    id: "cf-mcq8",
    topic: "Bindings",
    prompt: "After running `cf bind-service`, what must you typically do for the app to see the new credentials?",
    options: ["Nothing, it's immediate", "Restart or restage the app", "Delete and recreate the app", "Re-run cf login"],
    correctIndex: 1,
    explanation: "Binding updates VCAP_SERVICES, but the running app process only picks this up after a restart (or restage).",
  },
  {
    id: "cf-mcq9",
    topic: "Scaling",
    prompt: "Which command performs horizontal scaling (changing instance count)?",
    options: ["cf scale myapp -m 1G", "cf scale myapp -i 5", "cf restage myapp", "cf push myapp -k 2G"],
    correctIndex: 1,
    explanation: "The -i flag sets instance count (horizontal scaling); -m sets memory per instance (vertical scaling).",
  },
  {
    id: "cf-mcq10",
    topic: "CLI",
    prompt: "Which command shows a recent buffer of logs and exits immediately, ideal right after a crash?",
    options: ["cf logs myapp", "cf logs myapp --recent", "cf events myapp --tail", "cf app myapp --logs"],
    correctIndex: 1,
    explanation: "`cf logs myapp --recent` dumps the buffered recent log history and exits, unlike the plain streaming version.",
  },
  {
    id: "cf-mcq11",
    topic: "Deployment",
    prompt: "What does `cf deploy <mtar>` do that a plain `cf push` does not?",
    options: [
      "Nothing different, they're aliases",
      "Deploys multiple modules and resources declared in an MTA descriptor as one coordinated unit",
      "Only works for Java apps",
      "Automatically enables blue-green deployment",
    ],
    correctIndex: 1,
    explanation: "cf deploy (via the multiapps plugin) deploys a Multi-Target Application — potentially many modules and resources — as one ordered, coordinated operation.",
  },
  {
    id: "cf-mcq12",
    topic: "Troubleshooting",
    prompt: "An app is stuck in a crash loop. What's the recommended first command to run?",
    options: ["cf restage myapp", "cf logs myapp --recent", "cf delete myapp", "cf scale myapp -i 0"],
    correctIndex: 1,
    explanation: "Checking recent logs first reveals the actual error/crash reason before taking any corrective action.",
  },
  {
    id: "cf-mcq13",
    topic: "Logs",
    prompt: "What is Loggregator?",
    options: [
      "A service broker for logging services",
      "Cloud Foundry's log and metrics aggregation pipeline",
      "A buildpack for logging libraries",
      "The CLI plugin for cf logs",
    ],
    correctIndex: 1,
    explanation: "Loggregator is CF's underlying system that captures app stdout/stderr from Diego cells and aggregates it for consumption via cf logs or a bound drain.",
  },
  {
    id: "cf-mcq14",
    topic: "Troubleshooting",
    prompt: "By default, can two apps in different Cloud Foundry spaces reach each other over internal container-to-container routes?",
    options: [
      "Yes, always, with no configuration needed",
      "No — it's deny-by-default until a network policy explicitly allows it",
      "Only if they share the same buildpack",
      "Only if they're bound to the same service instance",
    ],
    correctIndex: 1,
    explanation: "Container-to-container networking is deny-by-default; `cf add-network-policy` is required to explicitly allow traffic between apps.",
  },
];
