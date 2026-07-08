import type { BtpMcq, BtpQuestion } from "@/lib/btp-content";

/** Section 15 — DevOps. Interview questions, full format. */
export const devopsQuestions: BtpQuestion[] = [
  {
    id: "devops-q1",
    topic: "Git",
    prompt: "Why is a clean commit history important for a BTP project's CI/CD pipeline, beyond just good practice?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["git", "ci-cd"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A clean, logically-scoped commit history makes it possible to bisect (identify exactly which change introduced a regression), review changes meaningfully in pull requests, and safely revert a specific problematic change without undoing unrelated work — all of which directly affect how quickly a CI/CD pipeline issue can be diagnosed and fixed.",
    detailedAnswer:
      "When a CI/CD pipeline suddenly starts failing or a production issue appears after a deploy, the ability to look at recent commits and understand exactly what changed (not a giant, unfocused commit mixing five unrelated changes) is what makes root-causing fast. Tools like `git bisect` rely on being able to test individual commits in isolation to narrow down exactly which change introduced a bug — impossible if commits bundle unrelated changes together. A clean history also makes code review meaningful (reviewers can actually reason about one focused change) and makes reverting just the problematic piece possible without losing unrelated, good changes bundled in the same commit.",
    hindiExplanation:
      "Jab ek CI/CD pipeline achanak fail hona shuru kare ya deploy ke baad ek production issue aaye, recent commits dekh kar exactly samajhna ki kya change hua (ek giant, unfocused commit nahi jisme paanch unrelated changes mixed hon), yahi root-cause karna fast banata hai. `git bisect` jaise tools individual commits ko isolation mein test karne pe depend karte hain exactly ye narrow down karne ke liye ki konsa change bug introduce kiya — agar commits unrelated changes ko bundle karte hain toh ye impossible hai. Ek clean history code review ko bhi meaningful banati hai aur sirf problematic piece ko revert karna possible banati hai baaki good changes lose kiye bina.",
    interviewExplanation:
      "I'd connect it to concrete diagnostic speed: 'A clean commit history lets git bisect narrow down exactly which change caused a regression, since each commit can be tested in isolation. It makes code review meaningful — reviewers reason about one focused change, not five bundled together. And it lets you revert just the problematic piece without losing unrelated good work in the same commit.'",
    diagramNote:
      "Messy commit: 'One giant commit, 5 unrelated changes → hard to bisect/revert selectively'. Clean commit history: 'Focused commits → git bisect narrows down the bad one → revert just that commit'.",
    diagramMermaid: `flowchart LR
    A["Messy: 1 giant commit,<br/>5 unrelated changes"] --> B["Hard to bisect/revert selectively"]
    C["Clean: focused commits"] --> D["git bisect narrows down bad commit"] --> E["Revert just that one"]`,
    realProjectExample:
      "A production regression was traced to one specific commit within minutes using `git bisect` across a well-scoped commit history — with the team's earlier habit of giant, unfocused commits, the same investigation had previously taken hours of manual code reading.",
    interviewTip:
      "If asked 'why does commit hygiene matter for DevOps specifically', tie it directly to bisect-ability and safe, selective reverts — not just abstract 'good practice' language.",
    followupQuestions: [
      "What does `git bisect` actually do?",
      "How would you structure commits for a large feature to keep them reviewable?",
      "What's the risk of squashing all commits in a PR into one before merging?",
    ],
    commonMistakes: [
      "Treating commit hygiene as purely stylistic rather than a real operational/diagnostic capability.",
      "Not knowing `git bisect` specifically depends on individually testable, isolated commits.",
    ],
    importantPoints: [
      "Clean commits enable git bisect to pinpoint exactly which change caused a regression.",
      "Makes code review and selective reverts meaningful and possible.",
      "Directly affects how fast a CI/CD or production issue can be diagnosed.",
    ],
    revisionNotes: "Clean commit history enables git bisect (pinpoint bad commit), meaningful review, and selective revert — directly speeds up incident diagnosis.",
  },
  {
    id: "devops-q2",
    topic: "GitHub Actions",
    prompt: "How would you structure a GitHub Actions workflow to build, test, and deploy a CAP application to BTP?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["github-actions", "ci-cd"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A typical workflow triggers on push/PR, runs a job installing dependencies and running automated tests (via `cds.test`), then — usually gated to specific branches like `main` — a separate job builds the MTA and deploys it via `cf deploy`, using repository secrets for BTP credentials rather than hard-coded values.",
    detailedAnswer:
      "The workflow YAML defines triggers (`on: push`, `on: pull_request`), and typically a `build-and-test` job that checks out code, sets up Node.js, installs dependencies, and runs the test suite — this job should run on every PR to catch issues before merge. A separate `deploy` job, often restricted to only run on pushes to `main` (via an `if` condition or branch filter), builds the MTA artifact (`mbt build`) and runs `cf deploy`, authenticating using BTP credentials stored as encrypted GitHub Actions secrets (never hard-coded in the workflow file itself). Structuring it this way means every change gets tested automatically, but only vetted, merged changes to the main branch trigger an actual production deployment.",
    hindiExplanation:
      "Workflow YAML triggers define karta hai (`on: push`, `on: pull_request`), aur typically ek `build-and-test` job hoti hai jo code checkout karti hai, Node.js setup karti hai, dependencies install karti hai, aur test suite chalati hai — ye job har PR pe chalni chahiye merge se pehle issues catch karne ke liye. Ek alag `deploy` job, often sirf `main` pe pushes pe restricted (ek `if` condition ya branch filter se), MTA artifact build karti hai (`mbt build`) aur `cf deploy` chalati hai, BTP credentials use karke jo encrypted GitHub Actions secrets ki tarah stored hain (workflow file mein kabhi hard-coded nahi).",
    interviewExplanation:
      "I'd describe the two-job structure: 'A build-and-test job runs on every PR — install dependencies, run tests via cds.test, catching issues before merge. A separate deploy job, gated to only run on pushes to main, builds the MTA and runs cf deploy, using BTP credentials from encrypted GitHub secrets, never hard-coded. This means every change is tested, but only vetted main-branch changes actually deploy.'",
    diagramNote:
      "'PR/push' → 'build-and-test job (every PR: deps, tests)' → gate: 'push to main only' → 'deploy job (mbt build, cf deploy, using GitHub secrets for credentials)'.",
    diagramMermaid: `flowchart LR
    A["PR/push"] --> B["build-and-test job<br/>every PR: deps, tests"]
    B --> C{"Push to main?"}
    C -- Yes --> D["deploy job<br/>mbt build, cf deploy"]
    D --> E["Uses GitHub secrets<br/>for BTP credentials"]`,
    realProjectExample:
      "Our GitHub Actions workflow ran the full cds.test suite on every pull request, and only merges to main triggered the deploy job, which authenticated to Cloud Foundry using a service account's credentials stored as an encrypted repository secret, never appearing in any workflow file or log.",
    interviewTip:
      "Mentioning that credentials go into GitHub Actions secrets (not hard-coded in the YAML) is a specific, important security detail interviewers listen for.",
    followupQuestions: [
      "How would you store BTP deployment credentials securely in GitHub Actions?",
      "What would you do if the test job fails on a PR?",
      "How would you add a separate staging deployment step before production?",
    ],
    commonMistakes: [
      "Hard-coding credentials directly in the workflow YAML file instead of using secrets.",
      "Deploying on every push/PR rather than gating deployment to vetted, merged changes.",
    ],
    importantPoints: [
      "Test job runs on every PR/push, catching issues before merge.",
      "Deploy job is gated (e.g. only on push to main).",
      "Credentials come from encrypted GitHub Actions secrets, never hard-coded.",
    ],
    revisionNotes: "GitHub Actions CAP pipeline: test job (every PR) + gated deploy job (main only, mbt build + cf deploy, credentials from secrets).",
  },
  {
    id: "devops-q3",
    topic: "Jenkins",
    prompt: "How does a Jenkins pipeline differ architecturally from GitHub Actions, and when might an organization still choose Jenkins?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["jenkins", "ci-cd"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Jenkins is a self-hosted automation server you install and manage yourself (giving full control over the execution environment and plugin ecosystem), whereas GitHub Actions is a managed, hosted CI/CD service tightly integrated with GitHub; organizations choose Jenkins when they need on-premise execution, existing heavy Jenkins investment/expertise, or specific plugins/integrations GitHub Actions doesn't support.",
    detailedAnswer:
      "GitHub Actions runs on GitHub's managed infrastructure (or self-hosted runners if configured), tightly coupled to GitHub as the source control platform, with a large but somewhat more curated ecosystem of actions. Jenkins is software you install and operate yourself (on your own servers, VMs, or containers), giving complete control over the execution environment, network access (useful for reaching on-premise systems directly without any tunnel), and an enormous, mature plugin ecosystem accumulated over many years. Organizations with existing on-premise systems Jenkins can reach directly, deep existing Jenkins pipeline investment, or specific legacy integrations only available as Jenkins plugins often continue with Jenkins rather than migrating, even for newer BTP-based projects.",
    hindiExplanation:
      "GitHub Actions GitHub ke managed infrastructure pe chalta hai (ya self-hosted runners agar configure kiya ho), GitHub se tightly coupled hai source control platform ki tarah. Jenkins software hai jo tum khud install aur operate karte ho (apne servers, VMs, ya containers pe), execution environment pe complete control deta hai, network access (on-premise systems tak directly pahunchne ke liye useful bina kisi tunnel ke), aur ek enormous, mature plugin ecosystem jo saalon mein accumulate hua hai. Organizations jinke paas existing on-premise systems hain jo Jenkins directly reach kar sakta hai, deep existing Jenkins pipeline investment, ya specific legacy integrations sirf Jenkins plugins ki tarah available hain, aksar Jenkins ke saath continue karte hain.",
    interviewExplanation:
      "I'd contrast the hosting model and give a concrete reason to stick with Jenkins: 'GitHub Actions is a managed service tightly coupled to GitHub. Jenkins is self-hosted, giving full control over the execution environment and network access — useful for reaching on-prem systems directly. An organization with deep existing Jenkins investment, or needing on-prem network access Jenkins already has, would reasonably keep it rather than migrate for a new BTP project.'",
    diagramNote:
      "'GitHub Actions: managed, hosted, GitHub-integrated' vs 'Jenkins: self-hosted, full control, direct network access, mature plugin ecosystem'.",
    diagramMermaid: `flowchart LR
    A["GitHub Actions"] --> B["Managed, hosted,<br/>GitHub-integrated"]
    C["Jenkins"] --> D["Self-hosted, full control,<br/>direct network access, mature plugins"]`,
    realProjectExample:
      "An organization with an existing Jenkins server already positioned inside their corporate network (with direct reachability to on-prem systems) kept using it for their new BTP project's pipeline, rather than setting up self-hosted GitHub Actions runners to replicate that same network access.",
    interviewTip:
      "If asked 'should every new project just default to GitHub Actions', the balanced answer acknowledges Jenkins remains a reasonable choice under specific, real organizational constraints, not an outdated tool to always avoid.",
    followupQuestions: [
      "What is a Jenkinsfile and how does it define a pipeline?",
      "How would Jenkins reach an on-premise system that GitHub Actions' hosted runners couldn't?",
      "What's a downside of self-hosting Jenkins compared to a managed CI/CD service?",
    ],
    commonMistakes: [
      "Assuming GitHub Actions is strictly superior in every scenario without acknowledging Jenkins' legitimate use cases.",
      "Not knowing Jenkins' self-hosted nature is what gives it direct network access advantages.",
    ],
    importantPoints: [
      "GitHub Actions = managed, hosted, tightly GitHub-integrated.",
      "Jenkins = self-hosted, full control over execution environment and network access.",
      "Jenkins remains reasonable for existing investment, on-prem reachability, or legacy plugin needs.",
    ],
    revisionNotes: "GitHub Actions = managed/hosted. Jenkins = self-hosted, full control/network access. Jenkins still reasonable for on-prem reach or existing investment.",
  },
  {
    id: "devops-q4",
    topic: "CI/CD",
    prompt: "What's the difference between continuous integration and continuous deployment, and why might a team do CI without full CD?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["ci-cd", "concepts"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Continuous Integration means automatically building and testing every code change frequently, catching integration issues early; Continuous Deployment means automatically deploying every change that passes CI all the way to production without manual approval — many teams do CI plus 'continuous delivery' (automated up to a manual approval gate) rather than full automatic CD, for risk control on production changes.",
    detailedAnswer:
      "CI is about the build/test loop — every commit or PR automatically triggers a build and test run, catching integration problems (code that works alone but breaks when combined) quickly rather than discovering them much later. Full CD extends this all the way to production — every change that passes automated checks deploys itself with zero human involvement. Many organizations deliberately stop short of full CD, implementing 'continuous delivery' instead — everything is automated and deployment-ready up to a final manual approval gate before production — because for some systems, a human sanity-check before affecting real users/data is a deliberate risk-control decision, not a sign of an immature pipeline.",
    hindiExplanation:
      "CI build/test loop ke baare mein hai — har commit ya PR automatically ek build aur test run trigger karta hai, integration problems ko jaldi catch karta hai (code jo alone kaam karta hai lekin combine hone pe break hota hai) baad mein discover karne ki jagah. Poora CD isse production tak extend karta hai — har change jo automated checks pass karta hai khud deploy ho jaata hai zero human involvement ke saath. Kai organizations deliberately poore CD se pehle rukte hain, 'continuous delivery' implement karte hue instead — sab kuch automated aur deployment-ready hota hai ek final manual approval gate tak production se pehle — kyunki kuch systems ke liye, real users/data affect hone se pehle ek human sanity-check ek deliberate risk-control decision hai, immature pipeline ka sign nahi.",
    interviewExplanation:
      "I'd give the clean distinction and a reason for stopping short: 'CI is the automated build/test loop on every change, catching integration issues early. Full CD extends this to automatic production deployment with zero human gate. Many teams deliberately do continuous delivery instead — automated up to a manual approval before production — as a deliberate risk-control decision for changes affecting real users, not because their pipeline is immature.'",
    diagramNote:
      "'CI: every commit → build + test (catches integration issues)' → 'Continuous Delivery: automated up to manual approval gate' → 'Full CD: automatic deploy, zero human gate'.",
    diagramMermaid: `flowchart LR
    A["CI: every commit<br/>→ build + test"] --> B["Continuous Delivery:<br/>automated up to manual approval"]
    B --> C["Full CD:<br/>automatic deploy, no human gate"]`,
    realProjectExample:
      "Our team ran full CI on every commit (build, test, MTA build), but deliberately kept a manual approval step before the final production deploy — a conscious choice given the business impact of a bad production release, not a limitation of the pipeline's automation.",
    interviewTip:
      "If asked 'why doesn't your pipeline do full CD', the strong answer frames the manual gate as a deliberate risk decision, not an embarrassing gap — this is a very common, legitimate real-world setup.",
    followupQuestions: [
      "What's the difference between 'continuous delivery' and 'continuous deployment' specifically?",
      "What kinds of changes might justify skipping the manual gate for faster full CD?",
      "How would you structure a pipeline to support both CI and an optional manual deploy gate?",
    ],
    commonMistakes: [
      "Treating a manual deploy approval gate as evidence of an immature or incomplete pipeline.",
      "Confusing continuous delivery (automated to a gate) with continuous deployment (fully automatic).",
    ],
    importantPoints: [
      "CI = automated build/test on every change, catching integration issues early.",
      "Full CD = automatic deployment to production, no human gate.",
      "Continuous delivery (CI + manual gate) is a deliberate, legitimate risk-control choice.",
    ],
    revisionNotes: "CI = automated build/test loop. CD = automatic production deploy. Continuous delivery (CI + manual gate) is a deliberate risk choice, not an immature pipeline.",
  },
  {
    id: "devops-q5",
    topic: "MTA",
    prompt: "How does an MTA descriptor's module dependency declaration affect deployment order?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["mta", "deployment-order"],
    estimatedMinutes: 3,
    expectedAnswer:
      "MTA modules can declare `requires` dependencies on other modules or resources (like needing a service binding before starting); the deployment tooling uses this to compute a correct deployment order, ensuring resources are provisioned and modules that depend on them are deployed only after their dependencies are ready.",
    detailedAnswer:
      "Without explicit dependency declaration, deploying a CAP service module before its required HANA database resource exists would fail — the app would have nothing to bind to. An `mta.yaml` module declares its `requires` (other modules or resources it depends on, like a HANA schema or an XSUAA instance), and the MTA deployment tooling builds a dependency graph from these declarations, computing a topologically valid deployment order — provisioning the HANA resource first, then deploying the CAP module that binds to it, for example. This is exactly what makes `cf deploy` a single, reliable command for a complex multi-module application instead of requiring someone to manually figure out and execute the correct sequence of individual deployment steps.",
    hindiExplanation:
      "Explicit dependency declaration ke bina, ek CAP service module ko uske required HANA database resource se pehle deploy karna fail ho jaayega — app ke paas bind karne ke liye kuch nahi hoga. Ek `mta.yaml` module apni `requires` declare karta hai (doosre modules ya resources jinpe wo depend karta hai, jaise ek HANA schema ya XSUAA instance), aur MTA deployment tooling in declarations se ek dependency graph banata hai, ek topologically valid deployment order compute karta hai — pehle HANA resource provision karna, fir us CAP module ko deploy karna jo usse bind hota hai, for example.",
    interviewExplanation:
      "I'd explain the dependency-graph mechanism: 'Each mta.yaml module declares its requires — other modules or resources it depends on, like a HANA schema. The deployment tooling builds a dependency graph from these and computes a valid order — provisioning HANA first, then deploying the CAP module that binds to it. That's exactly what makes cf deploy one reliable command instead of manually figuring out the right sequence yourself.'",
    diagramNote:
      "'CAP module requires: HANA resource, XSUAA resource' → 'Deployment tooling builds dependency graph' → 'Order: HANA + XSUAA provisioned first → CAP module deployed after'.",
    diagramMermaid: `flowchart LR
    A["CAP module requires:<br/>HANA + XSUAA resources"] --> B["Deployment tooling builds<br/>dependency graph"]
    B --> C["HANA + XSUAA provisioned first"]
    C --> D["CAP module deployed after"]`,
    realProjectExample:
      "Adding a new module that required an existing HANA resource automatically deployed in the correct order without any manual sequencing on our part — the mta.yaml's requires declaration was all that was needed for the tooling to figure out the right order.",
    interviewTip:
      "If asked 'what happens if you don't declare a required dependency correctly', the honest answer is deployment can fail unpredictably or race, since the tooling has no way to know the correct order without an explicit declaration.",
    followupQuestions: [
      "What's the difference between a module requiring another module versus requiring a resource?",
      "What happens if there's a circular dependency between modules?",
      "How would you troubleshoot a deployment that failed due to a missing dependency?",
    ],
    commonMistakes: [
      "Assuming MTA deployment order is automatic without any explicit dependency declarations needed.",
      "Not knowing `requires` is the specific mechanism driving deployment order computation.",
    ],
    importantPoints: [
      "MTA modules declare `requires` on other modules/resources.",
      "Deployment tooling computes a valid order from this dependency graph.",
      "This is what makes `cf deploy` a single reliable command for complex, multi-module apps.",
    ],
    revisionNotes: "MTA `requires` declarations → deployment tooling builds a dependency graph → computes correct deployment order (resources before dependent modules).",
  },
  {
    id: "devops-q6",
    topic: "Transport",
    prompt: "How would you set up a CI/CD pipeline to promote a change through Dev, QA, and Prod BTP subaccounts?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["transport", "landscape"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Build the deployable artifact (the .mtar) exactly once, then deploy that same, unmodified artifact to each subaccount in sequence (Dev, then QA after tests pass, then Prod after approval), rather than rebuilding separately for each environment — ensuring what's tested in QA is bit-for-bit identical to what reaches Prod.",
    detailedAnswer:
      "A common mistake is rebuilding the application separately for each target environment, which risks subtle differences (a dependency version resolving slightly differently, a build-time environment variable affecting output) between what was actually tested and what eventually deploys to production — undermining the whole point of testing. The correct pattern is 'build once, deploy many times': build the .mtar artifact a single time, then use environment-specific variables files (`--vars-file`) to supply only the environment-specific configuration values (URLs, credentials) at deploy time to each subaccount's `cf deploy` — Dev first, then the identical artifact to QA once Dev/initial tests pass, then the same identical artifact to Prod once QA sign-off and any manual approval gate clears. This guarantees the artifact promoted to Prod is exactly what was validated in QA, not a fresh, potentially-different rebuild.",
    hindiExplanation:
      "Ek common mistake hai application ko har target environment ke liye alag se rebuild karna, jo subtle differences ka risk rakhta hai (ek dependency version thoda alag resolve ho jaana, ek build-time environment variable output ko affect karna) jo actually test hua uske aur eventually production tak pahunchne wale ke beech — testing ka poora point undermine ho jaata hai. Sahi pattern hai 'build once, deploy many times': `.mtar` artifact ek hi baar build karo, fir environment-specific variables files (`--vars-file`) use karo sirf environment-specific configuration values (URLs, credentials) supply karne ke liye deploy time pe har subaccount ke `cf deploy` ko — pehle Dev, fir wahi identical artifact QA ko jab Dev/initial tests pass ho jaayein, fir wahi identical artifact Prod ko jab QA sign-off aur koi manual approval gate clear ho jaaye.",
    interviewExplanation:
      "I'd emphasize the 'build once, deploy many times' principle: 'A common mistake is rebuilding separately per environment, risking subtle differences between what was tested and what deploys. The correct pattern builds the .mtar once, then uses environment-specific vars files to supply only config values — URL, credentials — at deploy time to each subaccount in sequence: Dev, then QA once tests pass, then Prod once approved. This guarantees Prod gets exactly what QA validated.'",
    diagramNote:
      "'Build .mtar once' → 'Deploy to Dev (--vars-file dev.yaml)' → tests pass → 'Deploy SAME artifact to QA (--vars-file qa.yaml)' → sign-off → 'Deploy SAME artifact to Prod (--vars-file prod.yaml)'.",
    diagramMermaid: `flowchart LR
    A["Build .mtar once"] --> B["Deploy to Dev<br/>--vars-file dev.yaml"]
    B --> C["Tests pass"] --> D["Deploy SAME artifact to QA<br/>--vars-file qa.yaml"]
    D --> E["Sign-off"] --> F["Deploy SAME artifact to Prod<br/>--vars-file prod.yaml"]`,
    realProjectExample:
      "Our pipeline built the .mtar exactly once per pipeline run, storing it as a build artifact, then reused that identical file for Dev, QA, and Prod deployments with only different vars files — eliminating an earlier issue where separately-rebuilt QA and Prod artifacts had subtly different dependency versions.",
    interviewTip:
      "The phrase 'build once, deploy many times' is a memorable, precise way to state the correct pattern — explicitly contrasting it with the common rebuild-per-environment mistake shows real DevOps maturity.",
    followupQuestions: [
      "What goes into an environment-specific vars file versus what stays fixed in the artifact?",
      "What risk does rebuilding separately per environment actually introduce?",
      "How would you store the built artifact between pipeline stages?",
    ],
    commonMistakes: [
      "Rebuilding the application separately for each environment instead of reusing one artifact.",
      "Not knowing --vars-file is the mechanism for supplying environment-specific config at deploy time.",
    ],
    importantPoints: [
      "Build once, deploy the same artifact to Dev, QA, then Prod in sequence.",
      "Use environment-specific vars files for config values, not separate rebuilds.",
      "Guarantees what's validated in QA is exactly what reaches Prod.",
    ],
    revisionNotes: "Build once, deploy the same .mtar to Dev→QA→Prod using --vars-file for env-specific config — never rebuild separately per environment.",
  },
  {
    id: "devops-q7",
    topic: "Versioning",
    prompt: "What versioning strategy would you use for an MTA application, and why does it matter for rollback?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["versioning", "rollback"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Use semantic versioning (major.minor.patch) tied to the mta.yaml's version field, incrementing it with each build/release, so each deployed version is uniquely identifiable — this matters for rollback because you need to know precisely which prior version to redeploy if a new release causes problems.",
    detailedAnswer:
      "Semantic versioning gives meaning to version number changes: a patch increment signals a small fix, a minor increment signals a backward-compatible new feature, a major increment signals a breaking change — useful communication even beyond deployment tooling. Practically, tying each build to a specific version number (often automated via CI, incrementing on each merge to main or tagged release) means every deployed artifact is unambiguously identifiable, which is essential for rollback: if version 2.3.1 causes a production issue, you need to know exactly that 2.3.0 was the last known-good version and be able to retrieve and redeploy that exact artifact, not guess or rebuild from a git commit that might not perfectly reproduce the original build.",
    hindiExplanation:
      "Semantic versioning version number changes ko meaning deta hai: ek patch increment ek chhoti fix signal karta hai, ek minor increment ek backward-compatible naya feature signal karta hai, ek major increment ek breaking change signal karta hai. Practically, har build ko ek specific version number se tie karna (aksar CI ke through automated, main pe merge ya tagged release pe increment hota hai) matlab har deployed artifact unambiguously identifiable hai, jo rollback ke liye essential hai: agar version 2.3.1 ek production issue cause kare, tumhe exactly pata hona chahiye ki 2.3.0 last known-good version thi aur exact wahi artifact retrieve/redeploy kar sako, git commit se guess ya rebuild karne ki jagah jo original build ko perfectly reproduce na kare.",
    interviewExplanation:
      "I'd explain both the communication and the rollback value: 'Semantic versioning gives meaning to changes — patch for fixes, minor for backward-compatible features, major for breaking changes. Practically, tying each build to a specific version, automated via CI, means every deployed artifact is unambiguously identifiable. That matters for rollback — if 2.3.1 causes an issue, I need to know exactly that 2.3.0 was last known-good and retrieve that exact artifact, not rebuild and hope it matches.'",
    diagramNote:
      "'Version 2.3.0 (known good)' → 'Version 2.3.1 (causes issue)' → 'Rollback: retrieve and redeploy exact 2.3.0 artifact' (not a fresh rebuild from git history).",
    diagramMermaid: `flowchart LR
    A["Version 2.3.0<br/>known good"] --> B["Version 2.3.1<br/>causes issue"]
    B --> C["Rollback: retrieve and<br/>redeploy exact 2.3.0 artifact"]`,
    realProjectExample:
      "When version 2.4.0 introduced a regression, we retrieved the exact stored 2.3.5 artifact from our build system's artifact repository and redeployed it directly, avoiding any risk of a fresh rebuild from git history producing a subtly different result.",
    interviewTip:
      "If asked 'how would you roll back a bad deploy', emphasizing 'retrieve and redeploy the exact previous artifact' (not rebuild from source) is the precise, correct answer — rebuilding risks not perfectly reproducing the original.",
    followupQuestions: [
      "What does each part of semantic versioning (major.minor.patch) signal?",
      "Where would you store built artifacts so they can be retrieved later for rollback?",
      "How would versioning be automated in a CI pipeline?",
    ],
    commonMistakes: [
      "Rolling back by rebuilding from a git commit instead of redeploying the exact previously-built artifact.",
      "Not having a clear versioning scheme, making it hard to identify which version is currently in production.",
    ],
    importantPoints: [
      "Semantic versioning (major.minor.patch) gives meaning to version changes.",
      "Each build should be uniquely, unambiguously versioned.",
      "Rollback should retrieve and redeploy the exact prior artifact, not rebuild from source.",
    ],
    revisionNotes: "Semantic versioning (major.minor.patch) + storing built artifacts by version enables precise rollback — redeploy the exact prior artifact, don't rebuild from git.",
  },
  {
    id: "devops-q8",
    topic: "Blue Green Deployment",
    prompt: "How would you implement a blue-green deployment for a CAP application as part of a CI/CD pipeline?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["blue-green-deployment", "ci-cd"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Deploy the new version as a separate app (green) alongside the currently live one (blue) without a public route, run automated smoke tests against green directly, then map the production route to green and unmap it from blue — scriptable as pipeline steps using `cf map-route`/`cf unmap-route`, with blue kept briefly as an instant rollback option.",
    detailedAnswer:
      "This builds on the Cloud Foundry blue-green concept covered earlier, now specifically as pipeline automation. A pipeline stage deploys the new version under a distinct app name (or with a temporary route) without touching the production route yet. A subsequent automated smoke-test stage hits the new version directly via its temporary route, verifying basic health before any real traffic touches it. If smoke tests pass, a scripted stage runs `cf map-route` to add the production route to the new version, then `cf unmap-route` to remove it from the old version — a near-instantaneous cutover. The old (blue) version is deliberately not deleted immediately, kept running for a defined window as an instant rollback option (just re-running the map/unmap in reverse) if problems surface shortly after cutover.",
    hindiExplanation:
      "Ye pehle cover kiye gaye Cloud Foundry blue-green concept pe build karta hai, ab specifically pipeline automation ki tarah. Ek pipeline stage naya version ek distinct app name ke saath (ya temporary route ke saath) deploy karta hai bina production route ko touch kiye abhi. Ek subsequent automated smoke-test stage naye version ko directly uske temporary route se hit karta hai, basic health verify karte hue kisi real traffic ke touch karne se pehle. Agar smoke tests pass hon, ek scripted stage `cf map-route` chalata hai production route ko naye version mein add karne ke liye, fir `cf unmap-route` purane version se remove karne ke liye — ek near-instantaneous cutover. Purana (blue) version deliberately turant delete nahi hota, ek defined window ke liye chalta rehta hai instant rollback option ki tarah.",
    interviewExplanation:
      "I'd walk through the pipeline stages: 'Deploy the new version as green, without touching the production route. Run automated smoke tests against it directly via a temporary route. If they pass, script cf map-route to add the production route to green, then cf unmap-route to remove it from blue — a near-instant cutover. Keep blue running for a window as an instant rollback option before finally tearing it down.'",
    diagramNote:
      "Pipeline stages: 'Deploy green (no production route)' → 'Automated smoke tests against green' → 'cf map-route (add prod route to green)' → 'cf unmap-route (remove from blue)' → 'Keep blue as rollback window, then tear down'.",
    diagramMermaid: `flowchart TD
    A["Deploy green<br/>no production route"] --> B["Automated smoke tests<br/>against green"]
    B --> C["cf map-route<br/>add prod route to green"]
    C --> D["cf unmap-route<br/>remove from blue"]
    D --> E["Keep blue as rollback window,<br/>then tear down"]`,
    realProjectExample:
      "Our pipeline automated exactly this sequence — deploy green, run smoke tests, map/unmap routes for cutover, and kept blue alive for one hour post-cutover as an automatic rollback safety net before a final cleanup stage removed it.",
    interviewTip:
      "Being able to name the exact CLI commands (`cf map-route`, `cf unmap-route`) as pipeline steps, not just describing the concept abstractly, demonstrates real hands-on pipeline automation experience.",
    followupQuestions: [
      "What would an automated smoke test typically check before cutover?",
      "How long would you keep the old (blue) version running before deleting it?",
      "How would you automate rollback if an issue is discovered shortly after cutover?",
    ],
    commonMistakes: [
      "Cutting over to the new version without any automated smoke testing first.",
      "Deleting the old (blue) version immediately instead of keeping it briefly as a rollback option.",
    ],
    importantPoints: [
      "Deploy green without touching the production route, smoke-test it directly first.",
      "Scripted cf map-route/unmap-route perform the actual near-instant cutover.",
      "Keep blue running briefly post-cutover as an instant rollback safety net.",
    ],
    revisionNotes: "Blue-green pipeline: deploy green (no prod route) → smoke test → cf map-route/unmap-route cutover → keep blue briefly as rollback before teardown.",
  },
  {
    id: "devops-q9",
    topic: "Git",
    prompt: "What branching strategy would you recommend for a small team deploying a CAP application frequently, and why avoid overly complex branching models?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["git", "branching-strategy"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A simple trunk-based approach — short-lived feature branches merged frequently into main via reviewed PRs, with main always deployable — works well for a small, frequently-deploying team; an elaborate multi-branch model (separate long-lived develop/release/hotfix branches) adds coordination overhead disproportionate to what a small team actually needs and increases merge-conflict risk from long-lived divergent branches.",
    detailedAnswer:
      "Complex branching models (like Gitflow, with separate long-lived develop, release, and hotfix branches) were designed for scenarios with infrequent, carefully scheduled releases and larger teams needing more formal coordination — for a small team deploying frequently, this overhead (merging between multiple long-lived branches, deciding which branch a fix targets) is disproportionate and can actually slow things down. A simpler trunk-based approach — short-lived feature branches that merge into main quickly via a reviewed PR, with main kept always deployable and CI running on every PR — reduces merge-conflict risk (since branches don't live long enough to diverge significantly) and matches the team's actual deployment cadence far better than an elaborate model built for a different scale of coordination need.",
    hindiExplanation:
      "Complex branching models (jaise Gitflow, separate long-lived develop, release, aur hotfix branches ke saath) infrequent, carefully scheduled releases aur bade teams ke liye design ki gayi thi jinhe zyada formal coordination chahiye — ek chhote team ke liye jo frequently deploy karta hai, ye overhead (multiple long-lived branches ke beech merge karna, decide karna ki ek fix kaunsi branch target kare) disproportionate hai aur actually cheezein slow kar sakta hai. Ek simpler trunk-based approach — short-lived feature branches jo quickly main mein merge hoti hain ek reviewed PR se, main hamesha deployable rakhte hue — merge-conflict risk kam karta hai.",
    interviewExplanation:
      "I'd recommend simplicity matched to scale: 'Complex models like Gitflow were designed for infrequent, carefully scheduled releases with larger teams needing formal coordination. For a small, frequently-deploying team, that overhead is disproportionate. A trunk-based approach — short-lived feature branches merging into an always-deployable main via reviewed PRs, with CI on every PR — reduces merge conflicts and matches the team's actual cadence far better.'",
    diagramNote:
      "'Complex model (Gitflow: develop/release/hotfix branches)' → designed for infrequent releases, larger teams, more coordination overhead vs 'Trunk-based (short-lived branches → main, always deployable)' → matches small, frequently-deploying team's actual needs.",
    diagramMermaid: `flowchart LR
    A["Complex model (Gitflow)"] --> B["Designed for infrequent<br/>releases, larger teams"]
    C["Trunk-based:<br/>short-lived branches → main"] --> D["Matches small, frequently-<br/>deploying team's needs"]`,
    realProjectExample:
      "A small team that had adopted a full Gitflow model found themselves spending real time each week just reconciling develop and release branches; switching to trunk-based development with short-lived feature branches directly into an always-deployable main eliminated that coordination overhead entirely.",
    interviewTip:
      "If asked to recommend a branching strategy, matching the recommendation to the team's actual size and deployment frequency (rather than defaulting to the most well-known model) shows practical, context-aware judgment.",
    followupQuestions: [
      "What would justify a more complex branching model for a different team?",
      "How would you handle an urgent production hotfix in a trunk-based model?",
      "What CI checks would you require before merging a feature branch into main?",
    ],
    commonMistakes: [
      "Defaulting to a complex branching model (like full Gitflow) regardless of the team's actual size and release cadence.",
      "Not considering that long-lived branches increase merge-conflict risk as they diverge over time.",
    ],
    importantPoints: [
      "Complex branching models suit infrequent releases and larger teams needing formal coordination.",
      "Trunk-based development (short-lived branches, always-deployable main) suits small, frequently-deploying teams.",
      "Match the branching strategy's complexity to the team's actual scale and cadence, not a default assumption.",
    ],
    revisionNotes: "Trunk-based (short-lived branches → always-deployable main) suits small, frequently-deploying teams — complex models like Gitflow add disproportionate overhead for that scale.",
  },
  {
    id: "devops-q10",
    topic: "Git",
    prompt: "How would you handle an urgent production hotfix when your main branch already has unreleased, in-progress changes merged into it?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["git", "hotfix"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Branch the hotfix from the currently-deployed production tag/commit (not the latest main, which includes unreleased changes), fix and deploy it from that isolated branch, then merge the hotfix back into main afterward — ensuring the hotfix ships without accidentally including unrelated, untested in-progress work.",
    detailedAnswer:
      "If main has moved ahead with unreleased changes since the last production deployment, branching a hotfix from main's current tip would bundle those unreleased, potentially untested changes into the emergency fix — exactly the risk you want to avoid when deploying urgently under pressure. Instead, branch the hotfix from the specific commit/tag that's actually currently running in production, make the minimal necessary fix there, test and deploy that isolated branch directly to production, and only afterward merge the hotfix branch back into main (so main also gets the fix, without main's other unreleased changes ever having been part of the emergency deployment).",
    hindiExplanation:
      "Agar main last production deployment ke baad se unreleased changes ke saath aage badh chuka hai, hotfix ko main ke current tip se branch karna un unreleased, potentially untested changes ko emergency fix mein bundle kar dega — exactly wo risk jo tum avoid karna chahte ho jab urgently deploy kar rahe ho pressure mein. Iske bajaye, hotfix ko us specific commit/tag se branch karo jo actually currently production mein chal raha hai, wahan minimal necessary fix karo, us isolated branch ko test/deploy karo directly production tak, aur sirf uske baad hotfix branch ko wapas main mein merge karo.",
    interviewExplanation:
      "I'd describe branching from the deployed tag, not main's tip: 'If main has unreleased changes ahead of what's in production, branching the hotfix from main's tip would bundle those untested changes into the emergency fix. Instead, I'd branch from the specific commit/tag currently running in production, make the minimal fix there, test and deploy that isolated branch directly, and only afterward merge it back into main — so main gets the fix too, without ever including its other unreleased changes in the emergency deployment.'",
    diagramNote:
      "'Main (has unreleased changes ahead of production)' vs 'Production tag (currently deployed commit)' → 'Branch hotfix from production tag' → 'Fix, test, deploy hotfix branch directly' → 'Merge hotfix back into main afterward'.",
    diagramMermaid: `flowchart TD
    A["Production tag<br/>currently deployed commit"] --> B["Branch hotfix from here,<br/>NOT main's tip"]
    B --> C["Fix, test, deploy<br/>hotfix branch directly"]
    C --> D["Merge hotfix back<br/>into main afterward"]`,
    realProjectExample:
      "An urgent security fix was branched from the exact production tag rather than main's tip (which had several weeks of unreleased feature work merged in), deployed directly from that isolated hotfix branch within the hour, and only merged back into main afterward — avoiding accidentally shipping untested in-progress features during the emergency fix.",
    interviewTip:
      "If asked how you'd handle a hotfix when main has diverged from production, explicitly naming 'branch from the production tag, not main' is the precise, correct answer that shows real incident-response git discipline.",
    followupQuestions: [
      "How would you tag or track exactly what commit is currently deployed to production?",
      "What if the hotfix and main's unreleased changes touch the same file, causing a merge conflict when merging back?",
      "Would this process differ if you used trunk-based development versus a more complex branching model?",
    ],
    commonMistakes: [
      "Branching a hotfix from main's current tip, accidentally bundling unreleased, untested changes into an emergency deployment.",
      "Forgetting to merge the hotfix back into main afterward, causing the fix to be lost in the next regular release.",
    ],
    importantPoints: [
      "Branch a hotfix from the currently-deployed production commit/tag, not main's potentially-ahead tip.",
      "Deploy the isolated hotfix branch directly, without unreleased in-progress changes.",
      "Merge the hotfix back into main afterward so the fix isn't lost in the next regular release.",
    ],
    revisionNotes: "Branch a hotfix from the production tag/commit (not main's tip, which may have unreleased changes) — deploy the isolated fix directly, merge back into main afterward.",
  },
  {
    id: "devops-q11",
    topic: "GitHub Actions",
    prompt: "How would you cache dependencies in a GitHub Actions workflow to speed up repeated builds?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["github-actions", "caching"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Use the `actions/cache` action keyed on a hash of the dependency lock file (like package-lock.json), so unchanged dependencies are restored from cache instead of being freshly downloaded/installed on every single run, meaningfully cutting build time for the common case where dependencies haven't changed since the last run.",
    detailedAnswer:
      "Without caching, every workflow run reinstalls every dependency from scratch, which for a project with many dependencies can take a meaningful chunk of total pipeline time on every single run, even when nothing dependency-related has actually changed. The `actions/cache` action lets you cache a directory (like `node_modules` or npm's own cache directory) keyed by a hash of the lock file's contents — if the lock file hasn't changed since a previous run, the cache key matches and dependencies restore instantly from cache instead of a fresh install; if the lock file has changed (a new/updated dependency), the cache key changes too, correctly triggering a fresh install rather than serving a stale, incorrect cache.",
    hindiExplanation:
      "Caching ke bina, har workflow run har dependency ko scratch se reinstall karta hai, jo bahut saari dependencies wale project ke liye total pipeline time ka meaningful chunk le sakta hai har single run pe, chahe dependency-related kuch actually change na hua ho. `actions/cache` action tumhe ek directory (jaise `node_modules`) cache karne deta hai lock file ke contents ke ek hash se keyed — agar lock file pichle run se change nahi hua, cache key match karta hai aur dependencies instantly cache se restore hoti hain fresh install ki jagah.",
    interviewExplanation:
      "I'd describe the lock-file-hash keying mechanism: 'The actions/cache action caches a directory like node_modules, keyed by a hash of the lock file's contents. If the lock file hasn't changed since a previous run, the cache key matches and dependencies restore instantly instead of a fresh install. If the lock file changed — a new dependency — the key changes too, correctly triggering a fresh install rather than serving a stale cache.'",
    diagramNote:
      "'Lock file hash unchanged since last run' → 'Cache key matches → restore from cache instantly' vs 'Lock file changed (new/updated dependency)' → 'Cache key changes → fresh install (correctly, not stale)'.",
    diagramMermaid: `flowchart LR
    A["Lock file hash<br/>unchanged"] --> B["Cache key matches →<br/>restore instantly"]
    C["Lock file changed"] --> D["Cache key changes →<br/>fresh install (correct)"]`,
    realProjectExample:
      "Adding dependency caching keyed on the package-lock.json hash cut a Node.js-based workflow's typical install step from over a minute down to a few seconds for the common case where the lock file hadn't changed since the previous run.",
    interviewTip:
      "If asked how you'd speed up a slow CI pipeline, naming dependency caching keyed on the lock file hash specifically (not just 'cache things') shows precise, hands-on GitHub Actions optimization knowledge.",
    followupQuestions: [
      "What would happen if you keyed the cache on something that doesn't actually reflect dependency changes, like the current date?",
      "What other parts of a CI pipeline, beyond dependencies, might benefit from caching?",
      "How would you invalidate a cache that's somehow become corrupted or stale incorrectly?",
    ],
    commonMistakes: [
      "Not caching dependencies at all, reinstalling from scratch on every single workflow run.",
      "Keying a cache on something that doesn't correctly reflect whether dependencies actually changed.",
    ],
    importantPoints: [
      "actions/cache caches a directory keyed by a hash of the lock file's contents.",
      "Unchanged lock file → cache hit, instant restore instead of fresh install.",
      "Changed lock file → cache key changes, correctly triggering a fresh install.",
    ],
    revisionNotes: "Cache dependencies via actions/cache, keyed on a hash of the lock file — unchanged lock file = instant cache restore; changed lock file = correct fresh install, not a stale cache hit.",
  },
  {
    id: "devops-q12",
    topic: "GitHub Actions",
    prompt: "How would you run a matrix of tests across multiple Node.js versions in GitHub Actions, and why would you want to?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["github-actions", "matrix-builds"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Use a `strategy.matrix` configuration listing the Node.js versions to test against, which GitHub Actions automatically expands into parallel jobs, one per version — useful for verifying your app genuinely works across every Node.js version you claim to support, rather than assuming compatibility based on only testing against whatever version happens to be on a developer's laptop.",
    detailedAnswer:
      "Declaring `strategy: matrix: node-version: [18, 20, 22]` in a workflow tells GitHub Actions to automatically run the entire job — checkout, install, test — once per listed version, in parallel, without hand-writing three near-duplicate job definitions. This matters because a subtle compatibility issue (a Node.js API behaving slightly differently between major versions) might only surface on a version nobody happens to be actively developing on — if your app claims to support multiple Node.js versions (perhaps because of infrastructure constraints or diverse team environments), actually testing against all of them in CI is what genuinely validates that claim, rather than an unverified assumption based on one developer's local environment.",
    hindiExplanation:
      "`strategy: matrix: node-version: [18, 20, 22]` declare karna ek workflow mein GitHub Actions ko batata hai poori job (checkout, install, test) ko ek baar per listed version chalana, parallel mein, teen near-duplicate job definitions hand-likhe bina. Ye matter karta hai kyunki ek subtle compatibility issue (ek Node.js API thoda different behave karta hai major versions ke beech) sirf ek version pe surface ho sakta hai jispe koi actively develop nahi kar raha — agar tumhari app multiple Node.js versions support karne ka claim karti hai, actually un sab ke against CI mein test karna hi hai jo genuinely us claim ko validate karta hai.",
    interviewExplanation:
      "I'd describe the syntax and the reason: 'A strategy.matrix listing Node.js versions like 18, 20, 22 tells GitHub Actions to automatically run the whole job once per version, in parallel, without hand-writing duplicate job definitions. This matters because a subtle compatibility issue might only surface on a version nobody's actively developing on — if you claim to support multiple versions, actually testing all of them in CI validates that claim rather than assuming it based on one developer's local setup.'",
    diagramNote:
      "'strategy.matrix: node-version: [18, 20, 22]' → GitHub Actions automatically expands into → 'Parallel job: Node 18' + 'Parallel job: Node 20' + 'Parallel job: Node 22' — validates actual multi-version compatibility.",
    diagramMermaid: `flowchart LR
    A["strategy.matrix:<br/>node-version [18,20,22]"] --> B["Parallel job: Node 18"]
    A --> C["Parallel job: Node 20"]
    A --> D["Parallel job: Node 22"]`,
    realProjectExample:
      "A matrix build across three Node.js versions caught a subtle compatibility issue that only manifested on the oldest supported version, which no developer on the team happened to be running locally — without the matrix configuration, this would have shipped undetected until a customer running that older version hit it in production.",
    interviewTip:
      "If asked why you'd test against multiple runtime versions in CI rather than trusting local development, the concrete answer is that local dev environments are an unverified sample of one, while a matrix build actually validates every claimed-supported version.",
    followupQuestions: [
      "Would you use a matrix for testing across multiple operating systems too, not just Node.js versions?",
      "What happens if one specific matrix combination fails — does the whole workflow fail?",
      "How would you exclude a specific, known-incompatible combination from the matrix?",
    ],
    commonMistakes: [
      "Only testing against whatever Node.js version happens to be installed on developers' machines, without CI verification across all claimed-supported versions.",
      "Hand-writing near-duplicate job definitions for each version instead of using a matrix configuration.",
    ],
    importantPoints: [
      "strategy.matrix automatically expands a job into parallel runs across listed versions/configurations.",
      "Validates actual compatibility across every claimed-supported version, not an assumption from local dev.",
      "Avoids hand-writing near-duplicate job definitions for each version combination.",
    ],
    revisionNotes: "strategy.matrix (e.g. node-version: [18,20,22]) runs the job in parallel across each listed version — validates actual multi-version compatibility rather than assuming it from local dev.",
  },
  {
    id: "devops-q13",
    topic: "Jenkins",
    prompt: "What is a Jenkinsfile, and why would you keep it in source control alongside the application code?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["jenkins", "jenkinsfile"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A Jenkinsfile defines the pipeline as code (stages, steps) in a text file, typically committed alongside the application source rather than configured only through Jenkins' own UI; keeping it in source control means pipeline changes are versioned, reviewable via pull request, and stay consistent with whatever version of the app they're building, rather than being an unversioned, UI-only configuration disconnected from the codebase.",
    detailedAnswer:
      "Older Jenkins usage patterns configured pipelines entirely through the Jenkins web UI — a genuine problem, since that configuration lived only in Jenkins' own database, wasn't versioned alongside the code it built, couldn't be code-reviewed via a pull request, and had no clear history of who changed what and why. A Jenkinsfile (Jenkins' pipeline-as-code format, typically Groovy-based declarative or scripted syntax) moves this definition into a text file committed to the same repository as the application — pipeline changes go through the same PR review process as code changes, are versioned identically (so an old branch's Jenkinsfile reflects what that branch's pipeline actually looked like at that point), and the pipeline's evolution has full git history just like the application code itself.",
    hindiExplanation:
      "Older Jenkins usage patterns pipelines ko entirely Jenkins web UI ke through configure karte the — ek genuine problem, kyunki wo configuration sirf Jenkins ke apne database mein rehta tha, code ke saath versioned nahi tha jise wo build karta tha, ek pull request se code-reviewed nahi ho sakta tha, aur koi clear history nahi thi ki kisne kya aur kyun change kiya. Ek Jenkinsfile (Jenkins ka pipeline-as-code format) is definition ko ek text file mein move karta hai jo same repository mein commit hoti hai application ke saath — pipeline changes usi PR review process se guzarte hain jaise code changes.",
    interviewExplanation:
      "I'd contrast UI-configured versus Jenkinsfile-as-code: 'Older patterns configured pipelines entirely through Jenkins' UI — unversioned, not code-reviewable, disconnected from the app's own history. A Jenkinsfile moves the pipeline definition into a text file committed to the same repo — pipeline changes go through the same PR review as code, are versioned identically, so an old branch's Jenkinsfile reflects exactly what its pipeline looked like at that point, with full git history.'",
    diagramNote:
      "'UI-configured pipeline: lives only in Jenkins DB, unversioned, no PR review' vs 'Jenkinsfile in source control: versioned with the code, PR-reviewable, full git history'.",
    diagramMermaid: `flowchart LR
    A["UI-configured pipeline"] --> B["Lives in Jenkins DB only,<br/>unversioned, no PR review"]
    C["Jenkinsfile in source control"] --> D["Versioned with code,<br/>PR-reviewable, full git history"]`,
    realProjectExample:
      "Migrating pipeline configuration from Jenkins' UI into a committed Jenkinsfile meant a proposed pipeline change (adding a new test stage) went through the exact same pull request review as any code change, with the team able to see exactly when and why the pipeline had evolved by looking at git history.",
    interviewTip:
      "If asked how you'd ensure pipeline changes get the same scrutiny as code changes, moving pipeline definitions from a UI into a committed Jenkinsfile is the precise, correct answer.",
    followupQuestions: [
      "What's the difference between declarative and scripted Jenkinsfile syntax?",
      "How would an old feature branch's Jenkinsfile differ from main's current one?",
      "Could a Jenkinsfile reference shared pipeline logic used across multiple repositories?",
    ],
    commonMistakes: [
      "Configuring Jenkins pipelines entirely through its web UI instead of a version-controlled Jenkinsfile.",
      "Not recognizing pipeline-as-code enables the same review/versioning discipline as application code.",
    ],
    importantPoints: [
      "A Jenkinsfile defines the pipeline as code, typically committed alongside the application source.",
      "Enables pipeline changes to be PR-reviewed and versioned identically to application code.",
      "Avoids the problems of UI-only pipeline configuration disconnected from the codebase's own history.",
    ],
    revisionNotes: "Jenkinsfile = pipeline-as-code committed alongside the app source — enables PR review and versioning of pipeline changes, unlike disconnected, unversioned UI-only configuration.",
  },
  {
    id: "devops-q14",
    topic: "CI/CD",
    prompt: "How would you design a CI pipeline to fail fast, and why does that matter for developer productivity?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["ci-cd", "fail-fast"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Order pipeline stages from fastest/cheapest to slowest/most-expensive (linting and type-checking before slower integration tests, for instance), and configure the pipeline to stop immediately on the first failure rather than running every stage regardless — so a developer gets feedback on an obvious, cheap-to-catch mistake within seconds, not after waiting for a lengthy full pipeline run to complete.",
    detailedAnswer:
      "If a pipeline runs a slow, expensive integration test suite before a fast linting/type-check step, a developer with a trivial typo has to wait for the entire expensive suite to complete before even learning about their simple mistake — wasted time and compute. Ordering stages by increasing cost (lint/type-check first, since they're fast and catch a whole class of simple mistakes immediately; unit tests next; slower integration/E2E tests last) and configuring the pipeline to halt on the very first failure means a developer gets feedback on cheap, common mistakes almost instantly, only waiting for the full expensive suite when the cheaper checks have already passed. This directly improves developer productivity and iteration speed, especially for the common case of small, simple mistakes that don't need an expensive full test run to catch.",
    hindiExplanation:
      "Agar ek pipeline ek slow, expensive integration test suite chalata hai ek fast linting/type-check step se pehle, ek developer jiske paas ek trivial typo hai use poori expensive suite complete hone ka wait karna padta hai apni simple mistake ke baare mein jaanne se pehle — wasted time aur compute. Stages ko increasing cost se order karna (lint/type-check pehle, kyunki wo fast hain aur simple mistakes ki poori class turant catch karte hain; unit tests agla; slower integration/E2E tests last) aur pipeline ko bahut pehle failure pe halt karne ke liye configure karna matlab ek developer ko cheap, common mistakes pe feedback almost instantly milta hai.",
    interviewExplanation:
      "I'd give the ordering principle and the productivity payoff: 'Order stages by increasing cost — fast lint/type-check first, since they catch a whole class of simple mistakes immediately, then unit tests, then slower integration/E2E tests last. Configure the pipeline to halt on the first failure, so a developer with a typo gets feedback in seconds rather than waiting for an expensive full suite to finish. This directly improves iteration speed for the common case of small, simple mistakes.'",
    diagramNote:
      "'Stage order: Lint/type-check (fast) → Unit tests → Integration/E2E tests (slow)' + 'Halt on first failure' → developer gets feedback on cheap mistakes in seconds, not after a full expensive run.",
    diagramMermaid: `flowchart LR
    A["Lint/type-check<br/>fast"] --> B["Unit tests"] --> C["Integration/E2E tests<br/>slow"]
    D["Halt on first failure"] -.-> A`,
    realProjectExample:
      "Reordering a pipeline to run linting and type-checking before the much slower integration test suite, with fail-fast enabled, cut the average feedback time for a typo-level mistake from over ten minutes down to under thirty seconds, meaningfully improving the team's iteration speed on common small errors.",
    interviewTip:
      "If asked how you'd optimize a slow CI pipeline for developer experience, describing fail-fast stage ordering (cheap checks first, halt on first failure) is a specific, concrete technique beyond a vague 'make it faster'.",
    followupQuestions: [
      "Would you ever want to run all stages regardless of earlier failures, and when?",
      "How would you decide which checks are 'cheap' versus 'expensive' for ordering purposes?",
      "Could you parallelize independent cheap checks to further reduce feedback time?",
    ],
    commonMistakes: [
      "Ordering pipeline stages arbitrarily rather than from cheapest/fastest to most expensive/slowest.",
      "Running every stage regardless of an early failure, wasting time and compute on inevitable overall failure.",
    ],
    importantPoints: [
      "Order pipeline stages from cheapest/fastest to most expensive/slowest.",
      "Configure the pipeline to halt on the first failure rather than always running every stage.",
      "This gets developers feedback on common, cheap-to-catch mistakes almost instantly.",
    ],
    revisionNotes: "Fail-fast CI: order stages cheap/fast → expensive/slow (lint/type-check → unit → integration/E2E), halt on first failure — gets developers feedback on common mistakes in seconds, not after a full expensive run.",
  },
  {
    id: "devops-q15",
    topic: "CI/CD",
    prompt: "How would you handle a flaky test that intermittently fails in CI without a clear pattern?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["ci-cd", "flaky-tests"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Investigate the actual root cause (a common one being a test relying on timing/ordering assumptions that aren't guaranteed, like an unmocked async operation or shared test state) rather than simply retrying it until it passes or ignoring it, since a flaky test masking a real intermittent bug — or simply undermining trust in the whole test suite — is worse than the short-term inconvenience of investigating it properly.",
    detailedAnswer:
      "The tempting quick fixes — adding automatic retries until the test passes, or just deleting/skipping the flaky test — both avoid actually understanding why it's flaky, which risks two bad outcomes: either the flakiness reflects a genuine intermittent bug in the actual application code (which retrying would hide, not fix), or the test suite's overall trustworthiness erodes as more flaky tests accumulate and get silently retried/ignored, until nobody trusts a red CI run to mean anything real. Common root causes worth investigating specifically include: an async operation the test doesn't properly wait for or mock, shared mutable state between tests causing order-dependent behavior, or a genuine race condition in the actual application code being tested. Treating a flaky test as a bug to diagnose (not an annoyance to suppress) is the disciplined, correct response, even though it takes more upfront time than a quick retry-until-green workaround.",
    hindiExplanation:
      "Tempting quick fixes — automatic retries add karna jab tak test pass na ho, ya bas flaky test delete/skip karna — dono actually samajhna avoid karte hain ki wo flaky kyun hai, jo do bad outcomes ka risk rakhta hai: ya toh flakiness ek genuine intermittent bug reflect karti hai actual application code mein (jise retry karna hide karega, fix nahi), ya test suite ki overall trustworthiness erode hoti hai jaise-jaise zyada flaky tests accumulate hote hain. Common root causes jo investigate karne layak hain: ek async operation jiska test properly wait/mock nahi karta, shared mutable state tests ke beech.",
    interviewExplanation:
      "I'd reject the quick fixes and describe proper investigation: 'Adding retries or just skipping the flaky test both avoid understanding why it's flaky, risking two bad outcomes — either it reflects a genuine intermittent bug the retry would hide, or the test suite's overall trustworthiness erodes as flaky tests accumulate. Common root causes worth investigating: an unmocked async operation, shared mutable state causing order-dependent behavior, or an actual race condition in the code under test. Diagnosing it properly, even though it takes more upfront time, is the disciplined response.'",
    diagramNote:
      "'Flaky test appears' → tempting shortcuts: 'auto-retry until green' / 'skip/delete the test' — both risky vs 'Investigate root cause: unmocked async, shared test state, real race condition' — the disciplined response.",
    diagramMermaid: `flowchart TD
    A["Flaky test appears"] --> B["Tempting: auto-retry<br/>or skip/delete"]
    B -.->|"risky — masks real issues"| C
    A --> D["Investigate root cause:<br/>async, shared state, real race condition"]
    D --> E["Disciplined, correct response"]`,
    realProjectExample:
      "A test that intermittently failed roughly one in twenty runs was initially just given an automatic retry, until someone investigated and discovered it reflected a genuine race condition in the actual application code — the retry had been silently masking a real production bug rather than working around a test artifact.",
    interviewTip:
      "If asked how you'd handle a flaky test, explicitly rejecting the retry-until-green shortcut and describing root-cause investigation (with specific common causes) shows disciplined engineering judgment over a quick, tempting workaround.",
    followupQuestions: [
      "How would you reproduce an intermittent, hard-to-catch flaky failure locally?",
      "What tooling could help identify which tests are flaky over time across many CI runs?",
      "Is there ever a legitimate case for a temporary retry while root-causing is still in progress?",
    ],
    commonMistakes: [
      "Adding automatic retries or skipping a flaky test instead of investigating its actual root cause.",
      "Not considering that flakiness might reflect a genuine intermittent bug in the application code itself.",
    ],
    importantPoints: [
      "Flaky tests should be investigated for root cause, not retried-until-green or silently skipped.",
      "Common causes: unmocked async operations, shared mutable test state, genuine race conditions in the code.",
      "Suppressing flakiness risks masking a real bug and eroding overall trust in the test suite.",
    ],
    revisionNotes: "Diagnose flaky tests' actual root cause (unmocked async, shared test state, real race conditions) rather than retrying-until-green or skipping — suppressing flakiness risks masking a real bug and eroding test-suite trust.",
  },
  {
    id: "devops-q16",
    topic: "MTA",
    prompt: "What's the difference between a module and a resource in an MTA descriptor?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["mta", "modules-resources"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A module is a deployable piece of application code (like a CAP service or a UI5 app), while a resource represents a service instance the modules depend on (like a HANA database, an XSUAA instance, or a destination) — modules declare `requires` on resources to get them provisioned and bound automatically as part of the coordinated deployment.",
    detailedAnswer:
      "Modules are the actual pieces of code being deployed — a Node.js CAP service, a Java application, a UI5 static content module — each with its own build/deployment artifact. Resources represent BTP services the modules need to function — a HANA schema, an XSUAA security instance, a Destination service instance — that themselves aren't application code but rather managed service instances the platform provisions on your behalf. A module's `requires` section can reference a resource, telling the deployment tooling to provision that resource (if it doesn't already exist) and bind it to the module automatically, injecting the necessary connection details as environment variables the module's code can read at runtime — this is exactly the mechanism underlying the deployment-order dependency graph discussed earlier.",
    hindiExplanation:
      "Modules actual pieces of code hain jo deploy ho rahe hain — ek Node.js CAP service, ek Java application, ek UI5 static content module — har ek ka apna build/deployment artifact. Resources represent karte hain BTP services jo modules ko function karne ke liye chahiye — ek HANA schema, ek XSUAA security instance, ek Destination service instance — jo khud application code nahi hain balki managed service instances hain jo platform tumhari taraf se provision karta hai. Ek module ka `requires` section ek resource reference kar sakta hai, deployment tooling ko batate hue us resource ko provision karna (agar wo pehle se exist nahi karta) aur use module se automatically bind karna.",
    interviewExplanation:
      "I'd draw the code-versus-service distinction: 'A module is actual deployable application code — a CAP service, a Java app, a UI5 static content module. A resource is a BTP service instance the modules need — a HANA schema, XSUAA, a Destination service — not application code, but a managed service the platform provisions. A module's requires section can reference a resource, and the deployment tooling provisions it (if needed) and binds it automatically, injecting connection details as environment variables.'",
    diagramNote:
      "'Module: deployable app code (CAP service, UI5 app)' vs 'Resource: managed BTP service instance (HANA, XSUAA, Destination)' — module's `requires` references a resource, tooling provisions/binds it automatically.",
    diagramMermaid: `flowchart LR
    A["Module: deployable app code<br/>CAP service, UI5 app"]
    B["Resource: managed BTP service<br/>HANA, XSUAA, Destination"]
    A -- "requires" --> B
    B --> C["Tooling provisions/binds<br/>automatically"]`,
    realProjectExample:
      "An mta.yaml declared a CAP service module requiring both a HANA resource and an XSUAA resource, and the deployment tooling automatically provisioned both service instances and bound them to the module, injecting the necessary connection environment variables without any manual `cf create-service`/`cf bind-service` steps.",
    interviewTip:
      "If asked to define these two mta.yaml concepts precisely, giving concrete examples of each (module: CAP service/UI5 app; resource: HANA/XSUAA/Destination) demonstrates real, hands-on MTA authoring experience.",
    followupQuestions: [
      "Can one resource be shared/required by multiple different modules?",
      "What happens if a required resource already exists — does the tooling create a duplicate?",
      "How does a module actually read the connection details injected from a bound resource?",
    ],
    commonMistakes: [
      "Confusing a resource (a managed service instance) with a module (deployable application code).",
      "Not knowing modules declare requires on resources to trigger automatic provisioning/binding.",
    ],
    importantPoints: [
      "Module = deployable application code (CAP service, UI5 app, etc.).",
      "Resource = managed BTP service instance the modules depend on (HANA, XSUAA, Destination, etc.).",
      "Modules requires resources, which get automatically provisioned and bound during deployment.",
    ],
    revisionNotes: "Module = deployable app code (CAP service/UI5 app). Resource = managed BTP service instance (HANA/XSUAA/Destination). Modules `requires` resources — auto-provisioned/bound during deployment.",
  },
  {
    id: "devops-q17",
    topic: "Transport",
    prompt: "How would you handle a database schema migration as part of promoting a change through Dev, QA, and Prod?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["transport", "schema-migration"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The same 'build once' artifact includes the CDS-derived schema migration logic, applied automatically by the HDI deployer as part of `cf deploy` in each environment — so schema changes promote through Dev, QA, and Prod using the exact same deployment mechanism as the application code, not a separately-run, manually-executed migration script per environment.",
    detailedAnswer:
      "Since HDI's deployer (as covered in the CAP/HANA sections) applies schema changes automatically as part of a CAP app's deployment, the schema migration isn't a separate artifact or process needing its own promotion path — it's baked into the same built .mtar artifact that contains the application code, and applying it happens automatically as part of the same `cf deploy` command that deploys everything else, in each environment in sequence. This means the schema migration that ran in Dev, then QA, is the exact same migration logic applied to Prod — no risk of a manually-run migration script differing between environments, or someone forgetting to run it in one environment while remembering in another.",
    hindiExplanation:
      "Kyunki HDI ka deployer schema changes ko automatically apply karta hai ek CAP app ke deployment ke hisse ki tarah, schema migration ek separate artifact ya process nahi hai jise apna promotion path chahiye — ye usi built `.mtar` artifact mein baked hai jisme application code hai, aur use apply karna automatically usi `cf deploy` command ke hisse ki tarah hota hai jo baaki sab kuch deploy karta hai, har environment mein sequence mein. Iska matlab hai wo schema migration jo Dev mein chali, fir QA mein, exactly wahi migration logic hai jo Prod pe apply hoti hai.",
    interviewExplanation:
      "I'd connect it to the HDI deployer mechanism: 'HDI's deployer applies schema changes automatically as part of a CAP app's deployment — the migration isn't a separate artifact needing its own promotion path, it's baked into the same .mtar built once, applied via the same cf deploy command as everything else, in each environment in sequence. That means the exact same migration logic runs in Dev, then QA, then Prod — no risk of a manually-run script differing between environments or being forgotten somewhere.'",
    diagramNote:
      "'Same .mtar (built once, includes CDS schema logic)' → 'cf deploy to Dev (HDI deployer applies schema automatically)' → 'cf deploy SAME artifact to QA' → 'cf deploy SAME artifact to Prod' — identical migration logic every time.",
    diagramMermaid: `flowchart LR
    A["Same .mtar<br/>built once, incl. schema logic"] --> B["cf deploy to Dev<br/>HDI applies schema"]
    B --> C["cf deploy SAME<br/>artifact to QA"]
    C --> D["cf deploy SAME<br/>artifact to Prod"]`,
    realProjectExample:
      "A schema change adding a new column was tested via the standard cf deploy process in Dev, then the identical .mtar artifact was deployed to QA and later Prod, with the HDI deployer applying the exact same schema migration automatically in each environment — no separate migration script was ever manually run.",
    interviewTip:
      "If asked how schema migrations fit into a 'build once, deploy many times' pipeline, explaining that HDI bakes migration into the standard deployment artifact (not a separate process) shows you connect the CAP/HANA deployment mechanics to the broader DevOps promotion pattern.",
    followupQuestions: [
      "What happens if a schema change is genuinely incompatible with existing data in one environment but not another?",
      "Would you ever want to test a schema migration in an environment before Dev, like a local sandbox?",
      "How does this relate to the earlier discussion of safe versus unsafe schema changes in HDI deployment?",
    ],
    commonMistakes: [
      "Treating schema migrations as a separate, manually-run process outside the standard build-once-deploy-many pipeline.",
      "Not knowing HDI's deployer bakes schema migration into the same artifact as the application code.",
    ],
    importantPoints: [
      "Schema migration logic is baked into the same .mtar artifact as the application code.",
      "Applied automatically by the HDI deployer as part of the standard cf deploy in each environment.",
      "Ensures the exact same migration logic runs in Dev, QA, and Prod — no separate manual script per environment.",
    ],
    revisionNotes: "Schema migrations are baked into the same 'build once' .mtar artifact, applied automatically by the HDI deployer via cf deploy in each environment — no separate manual migration script needed per environment.",
  },
  {
    id: "devops-q18",
    topic: "Versioning",
    prompt: "How would you handle versioning for a CAP OData service's API itself, separate from the application's overall semantic version?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["versioning", "api-versioning"],
    estimatedMinutes: 2,
    expectedAnswer:
      "These are genuinely separate concerns — the application's semantic version tracks the overall codebase/release, while the API's own versioning (following the same principle covered for API Management and event schemas) tracks the contract external consumers depend on; a breaking API change needs its own explicit versioning (like a new OData service path) independent of whatever the application's internal semantic version happens to be at that point.",
    detailedAnswer:
      "It's easy to conflate these, but they answer different questions: the application's semantic version (2.3.1, say) tracks the overall codebase's release history for internal deployment/rollback purposes. The API's own contract versioning is about external consumer compatibility — if a breaking API change ships, external consumers need an explicit new API version (a new service path, following the same versioning principle covered for API Management proxies and event schemas) regardless of what the application's internal semantic version happens to be at that release. An application could bump its internal semantic version many times (patches, minor features) without ever touching the API's external contract version, and conversely, a single internal release might need to introduce a new API version if it happens to include a breaking API change.",
    hindiExplanation:
      "Ye do concepts conflate karna aasan hai, lekin ye different questions answer karte hain: application ka semantic version (jaise 2.3.1) poore codebase ki release history track karta hai internal deployment/rollback purposes ke liye. API ka apna contract versioning external consumer compatibility ke baare mein hai — agar ek breaking API change ship hoti hai, external consumers ko ek explicit naya API version chahiye (ek naya service path, API Management proxies aur event schemas ke liye cover kiye gaye same versioning principle ko follow karte hue) chahe application ka internal semantic version us release pe kuch bhi ho.",
    interviewExplanation:
      "I'd distinguish the two concerns explicitly: 'These answer different questions. The application's semantic version tracks the overall codebase's release history for internal deployment/rollback. The API's own contract versioning is about external consumer compatibility — a breaking API change needs an explicit new API version, like a new service path, regardless of the internal semantic version at that point. An app could bump its internal version many times without ever touching the API's external contract version, and vice versa.'",
    diagramNote:
      "'Application semantic version (2.3.1) — internal codebase/deployment tracking' vs 'API contract version (v1/v2 service path) — external consumer compatibility' — genuinely independent concerns.",
    diagramMermaid: `flowchart LR
    A["Application semantic version<br/>internal codebase tracking"]
    B["API contract version<br/>v1/v2 service path"]
    A -.->|"independent concerns"| B`,
    realProjectExample:
      "An application's internal semantic version advanced from 2.3.0 to 2.9.0 over many small releases with zero changes to its external OData API contract, until one release finally introduced a genuinely breaking API restructuring, requiring a new /v2/ service path published alongside the still-supported /v1/ — completely independent of what the application's own internal version number happened to be at that point.",
    interviewTip:
      "If asked how internal versioning relates to API versioning, explicitly stating they're independent concerns (rather than assuming one derives from the other) shows precise understanding, and connecting it back to the API Management/event versioning principle shows you see the pattern repeating across the platform.",
    followupQuestions: [
      "Would you ever want the application's semantic version and API version to stay in sync deliberately?",
      "How would you communicate an API version deprecation timeline to external consumers, distinct from internal release notes?",
      "Could two different API versions be served simultaneously by the same deployed application instance?",
    ],
    commonMistakes: [
      "Assuming the application's internal semantic version and its external API contract version must always move together.",
      "Not applying the same explicit-versioning principle (from API Management/event schemas) to CAP OData service versioning.",
    ],
    importantPoints: [
      "Application semantic versioning and API contract versioning are genuinely independent concerns.",
      "A breaking API change needs explicit new versioning (e.g. a new service path) regardless of internal version.",
      "This mirrors the same explicit-versioning principle covered for API Management and event schemas.",
    ],
    revisionNotes: "App semantic version (internal codebase tracking) and API contract version (external consumer compatibility, e.g. v1/v2 service path) are independent — a breaking API change needs its own explicit versioning regardless of the internal version number.",
  },
  {
    id: "devops-q19",
    topic: "Blue Green Deployment",
    prompt: "What database/schema consideration complicates a blue-green deployment for a CAP application with a shared HANA database?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["blue-green-deployment", "shared-database"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Unlike stateless app instances that can run side by side independently, blue and green typically share the same underlying database schema, so a schema change accompanying the new (green) version must remain backward-compatible with the still-running old (blue) version during the cutover window — a genuinely breaking schema change can't simply be blue-greened the same way stateless app code can.",
    detailedAnswer:
      "Blue-green deployment works cleanly for stateless application code because both versions can run completely independently, side by side, with no shared mutable state between them. A database, however, is typically a single shared resource both blue and green connect to — you can't have 'two databases' the same way you have two app instances. This means if the new version's deployment includes a schema change, that schema change must remain compatible with the still-running old version throughout the cutover window (since blue is still live and querying the same schema until traffic fully cuts over and blue is torn down) — a genuinely breaking schema change (removing a column blue still reads, for instance) can't simply be blue-greened the same way as stateless code; it needs its own careful, backward-compatible migration approach (like the additive-then-cleanup pattern), independent of the app-level blue-green mechanism.",
    hindiExplanation:
      "Blue-green deployment stateless application code ke liye cleanly kaam karta hai kyunki dono versions completely independently, side by side chal sakte hain, koi shared mutable state ke bina unke beech. Ek database, though, typically ek single shared resource hai jisse blue aur green dono connect karte hain — tumhare paas 'do databases' nahi ho sakte jaise tumhare paas do app instances hote hain. Iska matlab hai agar naye version ke deployment mein ek schema change shamil hai, wo schema change still-running old version ke saath compatible rehni chahiye poore cutover window ke dauraan — ek genuinely breaking schema change simply blue-green nahi ho sakti stateless code ki tarah.",
    interviewExplanation:
      "I'd point out the shared-resource asymmetry: 'Blue-green works cleanly for stateless app code since both versions run fully independently. A database is typically one shared resource both connect to — you can't have two databases the way you have two app instances. So if the new version needs a schema change, it must remain compatible with the still-running old version throughout the cutover window. A genuinely breaking schema change can't simply be blue-greened; it needs its own backward-compatible migration approach, independent of the app-level mechanism.'",
    diagramNote:
      "'Blue (old) + Green (new)' → both connect to → 'SAME shared HANA schema' → schema change during green's deployment MUST stay backward-compatible with blue (still live and querying) throughout the cutover window.",
    diagramMermaid: `flowchart TD
    A["Blue (old version)"] --> C["SAME shared HANA schema"]
    B["Green (new version)"] --> C
    C -.->|"schema change must stay<br/>backward-compatible with blue"| A`,
    realProjectExample:
      "A blue-green deployment initially planned to drop a deprecated column as part of the green release, until the team realized blue would still be querying that column throughout the cutover window — the schema change was redesigned as an additive-then-cleanup pattern (add the new structure first, remove the old column only after blue was fully retired), decoupling it from the app-level blue-green cutover timing.",
    interviewTip:
      "If asked what's genuinely harder about blue-green for a database-backed app versus a purely stateless service, the shared-schema-compatibility constraint is the precise, correct technical answer — not a vague 'databases are more complex'.",
    followupQuestions: [
      "What's the additive-then-cleanup pattern for schema changes, and how does it solve this problem?",
      "Would using separate databases for blue and green avoid this issue, and what would that cost?",
      "How would you handle a schema change that's genuinely impossible to make backward-compatible?",
    ],
    commonMistakes: [
      "Assuming blue-green deployment works identically for stateful (database-backed) and stateless application components.",
      "Planning a breaking schema change as part of a green release without considering blue's continued compatibility needs during cutover.",
    ],
    importantPoints: [
      "Blue and green typically share the same underlying database, unlike independent app instances.",
      "A schema change must remain backward-compatible with the still-running old version during cutover.",
      "Genuinely breaking schema changes need their own careful migration approach, not a simple blue-green swap.",
    ],
    revisionNotes: "Blue-green for a database-backed app: blue+green share the SAME schema, so schema changes must stay backward-compatible with the still-live old version during cutover — breaking changes need their own migration approach (e.g. additive-then-cleanup), not a simple swap.",
  },
  {
    id: "devops-q20",
    topic: "Blue Green Deployment",
    prompt: "How would you decide the appropriate duration to keep the old (blue) version running before finally tearing it down?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["blue-green-deployment", "teardown-timing"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Base it on how quickly issues from the new version would realistically surface — long enough to catch problems that only appear under real production traffic patterns or after a meaningful usage period (not just the first few minutes), but not so long that it becomes an ongoing cost/complexity burden running two full versions indefinitely; a common middle ground is a few hours to a day, informed by the specific app's actual traffic and usage patterns.",
    detailedAnswer:
      "Too short a window (tearing down blue within minutes of cutover) risks losing the rollback safety net before an issue that only surfaces under specific, less-common usage patterns or after a meaningful volume of real traffic has had a chance to appear — the whole point of keeping blue around is having an instant fallback if green has a problem, and that only works if blue is still there when the problem is actually noticed. Too long a window means paying the ongoing resource cost and complexity of running two full versions indefinitely, for diminishing safety benefit as time passes and green proves itself stable. A reasonable approach considers the specific app's traffic patterns — a low-traffic app might need a full day to see meaningful usage across its various features, while a high-traffic app might accumulate that same confidence within a couple of hours — and ties teardown to that confidence-building window rather than an arbitrary fixed default applied to every app regardless of its actual usage characteristics.",
    hindiExplanation:
      "Bahut short window (blue ko cutover ke minutes ke andar tear down karna) rollback safety net ko lose karne ka risk rakhta hai ek issue ke discover hone se pehle jo sirf specific, less-common usage patterns mein surface hota hai ya real traffic ki ek meaningful volume ke baad appear hone ka chance milta hai. Bahut lamba window matlab ongoing resource cost aur complexity pay karna do poore versions ko indefinitely chalane ka, diminishing safety benefit ke liye jaise time guzarta hai aur green stable prove hota hai. Ek reasonable approach specific app ke traffic patterns consider karta hai.",
    interviewExplanation:
      "I'd frame it around confidence-building versus ongoing cost: 'Too short a window risks losing the rollback safety net before an issue under specific usage patterns has a chance to surface — the whole point of blue is being there if green has a problem, which only works if blue's still around when it's noticed. Too long means paying ongoing cost/complexity for diminishing benefit. I'd base the actual duration on the app's specific traffic patterns — a low-traffic app might need a full day to see meaningful usage, a high-traffic app might build that same confidence in a couple hours.'",
    diagramNote:
      "'Too short: teardown before issues surface → lose rollback safety net' vs 'Too long: ongoing cost/complexity, diminishing benefit' → 'Right window: based on app's actual traffic pattern, enough time to build real confidence'.",
    diagramMermaid: `flowchart LR
    A["Too short teardown"] --> B["Lose rollback safety net<br/>before issues surface"]
    C["Too long teardown"] --> D["Ongoing cost/complexity,<br/>diminishing benefit"]
    E["Right window: based on<br/>app's actual traffic pattern"]`,
    realProjectExample:
      "A low-traffic internal reporting app kept its blue version alive for a full 24 hours post-cutover, since its usage was sparse enough that a full day was needed to genuinely exercise most of its features, while a high-traffic customer-facing app tore down blue after just two hours, having already accumulated far more real traffic and confidence in that shorter window.",
    interviewTip:
      "If asked for a specific teardown duration, the strong answer ties it to the app's actual traffic characteristics rather than citing a single fixed universal number, showing you understand the underlying tradeoff rather than reciting a memorized default.",
    followupQuestions: [
      "How would you monitor blue during this window to know if a rollback is actually needed?",
      "Would you automate the teardown decision, or always require a manual go/no-go?",
      "What resource cost does keeping blue running actually incur during this window?",
    ],
    commonMistakes: [
      "Applying one arbitrary fixed teardown duration to every app regardless of its actual traffic/usage patterns.",
      "Tearing down blue too quickly, losing the rollback safety net before realistic issues have a chance to surface.",
    ],
    importantPoints: [
      "Teardown timing balances rollback safety (long enough to catch real issues) against ongoing cost (not indefinitely).",
      "Base the actual duration on the specific app's traffic/usage patterns, not a fixed universal default.",
      "Low-traffic apps may need longer windows; high-traffic apps can build confidence faster.",
    ],
    revisionNotes: "Blue teardown timing balances rollback safety against ongoing cost — base the actual duration on the app's real traffic patterns (low-traffic apps need longer, high-traffic apps build confidence faster), not a fixed universal default.",
  },
];

export const devopsMcqs: BtpMcq[] = [
  {
    id: "devops-mcq1",
    topic: "Git",
    prompt: "Why does a clean, focused commit history matter operationally, not just stylistically?",
    options: [
      "It doesn't matter operationally at all",
      "It enables git bisect to pinpoint regressions and allows safe, selective reverts",
      "It makes the repository smaller in size",
      "It's required by GitHub's terms of service",
    ],
    correctIndex: 1,
    explanation: "Clean, isolated commits let git bisect test individual changes to find regressions, and let you revert just the problematic change without losing unrelated work.",
  },
  {
    id: "devops-mcq2",
    topic: "GitHub Actions",
    prompt: "Where should BTP deployment credentials be stored in a GitHub Actions workflow?",
    options: [
      "Directly in the workflow YAML file",
      "As encrypted GitHub Actions secrets",
      "In a public comment on the repository",
      "Credentials aren't needed for deployment",
    ],
    correctIndex: 1,
    explanation: "Credentials should be stored as encrypted repository secrets, never hard-coded directly in the workflow file where they'd be visible in source control.",
  },
  {
    id: "devops-mcq3",
    topic: "CI/CD",
    prompt: "What distinguishes continuous delivery from continuous deployment?",
    options: [
      "They are identical",
      "Continuous delivery automates up to a manual approval gate; continuous deployment is fully automatic to production",
      "Continuous delivery only applies to databases",
      "Continuous deployment doesn't include automated testing",
    ],
    correctIndex: 1,
    explanation: "Continuous delivery automates the pipeline up to a deliberate manual approval before production; continuous deployment removes that gate entirely for full automation.",
  },
  {
    id: "devops-mcq4",
    topic: "MTA",
    prompt: "What determines the deployment order of modules and resources in an MTA?",
    options: [
      "Alphabetical order of module names",
      "The `requires` dependency declarations in mta.yaml",
      "Random order chosen by the deployer",
      "The order they appear in the file, always top to bottom",
    ],
    correctIndex: 1,
    explanation: "MTA modules declare `requires` on other modules/resources; the deployment tooling computes a valid order from this dependency graph.",
  },
  {
    id: "devops-mcq5",
    topic: "Transport",
    prompt: "What is the correct pattern for promoting a change through Dev, QA, and Prod?",
    options: [
      "Rebuild the application separately for each environment",
      "Build the artifact once, then deploy that same artifact to each environment in sequence",
      "Deploy directly to Prod first, then backfill Dev and QA",
      "Skip QA entirely for faster releases",
    ],
    correctIndex: 1,
    explanation: "'Build once, deploy many times' ensures what's validated in QA is exactly what reaches Prod, avoiding subtle differences from separate rebuilds.",
  },
  {
    id: "devops-mcq6",
    topic: "Versioning",
    prompt: "What's the correct way to roll back a bad production deployment?",
    options: [
      "Rebuild from the previous git commit and redeploy",
      "Retrieve and redeploy the exact previously-built, versioned artifact",
      "Manually edit files directly on the production server",
      "Wait for the next scheduled release",
    ],
    correctIndex: 1,
    explanation: "Rolling back should redeploy the exact prior artifact (identified by its version), not rebuild from source, which risks subtly different results.",
  },
  {
    id: "devops-mcq7",
    topic: "Blue Green Deployment",
    prompt: "In a scripted blue-green deployment pipeline, what commands perform the actual cutover?",
    options: ["cf push and cf restart", "cf map-route and cf unmap-route", "cf delete and cf create-service", "cf logs and cf events"],
    correctIndex: 1,
    explanation: "cf map-route adds the production route to the new (green) version, and cf unmap-route removes it from the old (blue) version, performing a near-instant cutover.",
  },
  {
    id: "devops-mcq8",
    topic: "Git",
    prompt: "Where should you branch an urgent production hotfix from, if main has unreleased changes ahead of what's in production?",
    options: [
      "From main's current tip, including the unreleased changes",
      "From the specific commit/tag currently deployed to production",
      "It doesn't matter which commit you branch from",
      "From a random older commit",
    ],
    correctIndex: 1,
    explanation: "Branching from main's tip would bundle unreleased, untested changes into the emergency fix — branch from the exact commit/tag currently running in production instead.",
  },
  {
    id: "devops-mcq9",
    topic: "GitHub Actions",
    prompt: "What does strategy.matrix in a GitHub Actions workflow let you do?",
    options: [
      "Encrypt secrets automatically",
      "Automatically run a job in parallel across multiple listed versions/configurations (e.g. Node.js versions)",
      "Cache dependencies",
      "Deploy to multiple cloud providers simultaneously",
    ],
    correctIndex: 1,
    explanation: "A matrix strategy expands a job definition into parallel runs across each listed combination, validating actual compatibility across every claimed-supported version.",
  },
  {
    id: "devops-mcq10",
    topic: "CI/CD",
    prompt: "What's the recommended response to a flaky test that intermittently fails without a clear pattern?",
    options: [
      "Add automatic retries until it passes",
      "Investigate the actual root cause (e.g. unmocked async, shared test state, a real race condition)",
      "Delete the test immediately",
      "Ignore it since flakiness is normal",
    ],
    correctIndex: 1,
    explanation: "Retrying or skipping a flaky test avoids understanding why it's flaky, risking masking a genuine intermittent bug or eroding trust in the test suite — root-cause investigation is the disciplined response.",
  },
  {
    id: "devops-mcq11",
    topic: "Blue Green Deployment",
    prompt: "What complicates blue-green deployment for a CAP app with a shared HANA database, compared to stateless app code?",
    options: [
      "Nothing, it works identically",
      "Blue and green typically share the same schema, so schema changes must stay backward-compatible with the still-running old version during cutover",
      "HANA doesn't support blue-green deployment at all",
      "Databases can't be part of an MTA",
    ],
    correctIndex: 1,
    explanation: "Unlike independent stateless app instances, blue and green usually share one database — a breaking schema change can't simply be blue-greened the same way; it needs its own backward-compatible migration approach.",
  },
];
