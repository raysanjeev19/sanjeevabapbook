import type { BtpMcq, BtpQuestion } from "@/lib/btp-content";

/** Section 16 — Scenario Based. Production-incident and architecture-judgment interview questions. */
export const scenarioBasedQuestions: BtpQuestion[] = [
  {
    id: "scen-q1",
    topic: "Production Issues",
    prompt: "Production is down and users are reporting errors. Walk through your first 10 minutes of response.",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["production-issues", "incident-response"],
    estimatedMinutes: 4,
    expectedAnswer:
      "First confirm the scope and severity (all users or some, which feature), check recent deploys/changes as the most likely cause, check `cf logs --recent` and `cf events` for the actual error, check dependent services' health (HANA, XSUAA, external APIs), and communicate status to stakeholders early rather than going silent while investigating.",
    detailedAnswer:
      "The first 10 minutes are about triage, not root-cause-fixing. Step 1: confirm scope — is this everyone, or a specific feature/tenant/region? Step 2: check what changed recently — a deploy, a config change, a credential rotation are the most common causes of a sudden new outage, so check deployment history first. Step 3: pull `cf logs --recent` and `cf events` for the actual error signature. Step 4: check the health of dependencies the app relies on — is HANA Cloud reachable, is XSUAA issuing tokens, are external APIs responding. Step 5: communicate — post a status update to stakeholders/a status page that you're aware and investigating, even before you have a root cause, since silence during an incident erodes trust faster than the incident itself.",
    hindiExplanation:
      "Pehle 10 minutes triage ke baare mein hain, root-cause-fix karne ke nahi. Step 1: scope confirm karo — sab users affected hain ya kuch specific feature/tenant/region? Step 2: check karo kya recently change hua — ek deploy, config change, ya credential rotation sabse common causes hote hain achanak outage ke, isliye deployment history pehle check karo. Step 3: `cf logs --recent` aur `cf events` nikalo actual error signature ke liye. Step 4: dependencies ki health check karo — HANA Cloud reachable hai, XSUAA tokens issue kar raha hai, external APIs respond kar rahe hain. Step 5: communicate karo — stakeholders ko status update do ki tumhe pata hai aur investigate kar rahe ho, root cause milne se pehle bhi, kyunki incident ke dauraan silence khud incident se zyada trust todta hai.",
    interviewExplanation:
      "I'd structure it as five clear steps: 'First, confirm scope — everyone or specific users/features. Second, check what changed recently — a deploy or config change is the most common cause. Third, pull recent logs and events for the actual error. Fourth, check dependency health — HANA, XSUAA, external APIs. Fifth, communicate status to stakeholders early, even without a root cause yet — silence during an incident is worse than the incident.'",
    diagramNote:
      "Sequence: 'Confirm scope' → 'Check recent changes/deploys' → 'cf logs --recent + cf events' → 'Check dependency health (HANA/XSUAA/external APIs)' → 'Communicate status to stakeholders'.",
    diagramMermaid: `flowchart TD
    A["Confirm scope<br/>everyone or specific?"] --> B["Check recent changes/deploys"]
    B --> C["cf logs --recent + cf events"]
    C --> D["Check dependency health<br/>HANA/XSUAA/external APIs"]
    D --> E["Communicate status<br/>to stakeholders early"]`,
    realProjectExample:
      "During a real outage, checking deployment history first immediately revealed a config change deployed 20 minutes earlier as the likely cause, letting us roll back within minutes rather than spending time investigating unrelated theories first.",
    interviewTip:
      "Interviewers score this heavily on structure — a candidate who says 'I'd check logs' with no further process scores much lower than one who walks a clear, ordered sequence.",
    followupQuestions: [
      "What would you check first if the recent-changes check comes up empty?",
      "How would you communicate status without alarming stakeholders unnecessarily?",
      "What's the difference between triage and root-cause analysis?",
    ],
    commonMistakes: [
      "Diving straight into deep log analysis without first checking recent changes/deploys.",
      "Staying silent to stakeholders until a root cause is fully found.",
    ],
    importantPoints: [
      "Confirm scope first, then check recent changes as the likely cause.",
      "Pull logs/events for the actual error signature.",
      "Communicate status early and often, even before root cause is known.",
    ],
    revisionNotes: "Incident first 10 min: scope → recent changes/deploys → logs/events → dependency health → communicate status early.",
  },
  {
    id: "scen-q2",
    topic: "Authentication Failure",
    prompt: "Users suddenly can't log in — they get an authentication error. How do you diagnose this?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["authentication-failure", "xsuaa", "scenario"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Check if XSUAA itself is reachable/healthy, check if a Trust Configuration or identity provider federation was recently changed, check certificate/key expiry for the token signing, and check if the app's own XSUAA binding or role collection assignment changed — authentication failures are almost always a config/trust/expiry issue, not application code.",
    detailedAnswer:
      "Since authentication is handled by XSUAA and the framework's middleware (not custom app code, as established earlier), a sudden authentication failure across many users points to a platform/config-level cause, not application logic. Check: is XSUAA itself reachable (a platform-level outage)? Was a Trust Configuration or identity provider federation changed or broken recently (someone updated corporate IdP settings)? Has a signing certificate or key expired (these have finite validity and are a common, entirely preventable cause)? Was the app's XSUAA binding accidentally removed or its role collection assignments changed? Working through this list in order (platform health → trust config → cert expiry → binding/role changes) covers the vast majority of real authentication failure incidents.",
    hindiExplanation:
      "Kyunki authentication XSUAA aur framework ke middleware se handle hoti hai (custom app code se nahi), kai users mein achanak authentication failure ek platform/config-level cause point karta hai, application logic nahi. Check karo: kya XSUAA khud reachable hai (platform-level outage)? Kya recently Trust Configuration ya identity provider federation change/break hui (kisi ne corporate IdP settings update ki)? Kya ek signing certificate ya key expire ho gayi (inki finite validity hoti hai, ek common, poori tarah preventable cause)? Kya app ki XSUAA binding galti se remove ho gayi ya role collection assignments change hue?",
    interviewExplanation:
      "I'd give the ordered checklist: 'Since auth is handled by XSUAA and middleware, not app code, a sudden widespread failure points to platform/config, not application bugs. I'd check XSUAA's own health first, then whether a Trust Configuration or IdP federation was recently changed, then certificate/key expiry — a very common, preventable cause — then whether the app's XSUAA binding or role collection assignments changed.'",
    diagramNote:
      "Checklist: 'XSUAA reachable?' → 'Trust Configuration/IdP federation changed?' → 'Signing certificate/key expired?' → 'App's XSUAA binding/role collection changed?'.",
    diagramMermaid: `flowchart TD
    A["Sudden auth failure"] --> B["XSUAA reachable?"]
    B --> C["Trust Config/IdP<br/>federation changed?"]
    C --> D["Signing cert/key expired?"]
    D --> E["App's XSUAA binding/<br/>role collection changed?"]`,
    realProjectExample:
      "A widespread login failure was traced to an expired signing certificate on the identity provider side that nobody had set a renewal reminder for — a classic, entirely preventable cause once we knew to check certificate expiry specifically.",
    interviewTip:
      "Mentioning certificate/key expiry explicitly is a strong, specific detail — it's a genuinely common real-world cause that less experienced candidates often miss entirely.",
    followupQuestions: [
      "How would you set up monitoring to catch a certificate expiry before it causes an outage?",
      "What's the difference between an authentication failure and an authorization failure in this context?",
      "How would you verify XSUAA itself is healthy?",
    ],
    commonMistakes: [
      "Assuming a widespread authentication failure is an application code bug rather than a platform/config issue.",
      "Not considering certificate/key expiry as a common root cause.",
    ],
    importantPoints: [
      "Widespread auth failure is almost always platform/config, not app code.",
      "Check: XSUAA health, Trust Config/IdP changes, certificate expiry, binding/role changes.",
      "Certificate expiry is a common, entirely preventable cause worth proactive monitoring.",
    ],
    revisionNotes: "Widespread auth failure = check XSUAA health → Trust Config/IdP changes → cert/key expiry → binding/role changes. Rarely app code.",
  },
  {
    id: "scen-q3",
    topic: "Token Expired",
    prompt: "A long-running UI session suddenly starts getting 401 errors mid-use. What's happening and how would you fix the user experience?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["token-expired", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The user's JWT access token has a finite expiry and has expired mid-session; the fix is implementing token refresh (silently obtaining a new token before or when the old one expires, typically via a refresh token) so the user isn't abruptly logged out mid-task.",
    detailedAnswer:
      "Access tokens are deliberately short-lived for security (limiting the damage window if one leaks), which means any session longer than that lifetime will hit expiry if nothing refreshes it. Without handling this, a user mid-form-fill suddenly gets 401 errors and loses their work — a poor experience. The fix is implementing silent token refresh: using a longer-lived refresh token (obtained alongside the original access token) to request a new access token automatically before or immediately upon expiry, transparently to the user, so their session continues uninterrupted without them needing to manually re-authenticate mid-task.",
    hindiExplanation:
      "Access tokens deliberately short-lived hote hain security ke liye (agar koi leak ho jaaye toh damage window limit karne ke liye), matlab us lifetime se lambi koi bhi session expiry hit karegi agar kuch refresh na kare. Ise handle kiye bina, ek user mid-form-fill mein achanak 401 errors pane lagta hai aur apna work lose kar deta hai — ek poor experience. Fix hai silent token refresh implement karna: ek longer-lived refresh token use karke (original access token ke saath obtain hua) automatically naya access token request karna expiry se pehle ya turant baad, user ko transparently, taaki unki session bina interrupt kiye continue rahe.",
    interviewExplanation:
      "I'd explain both the cause and the fix: 'Access tokens are deliberately short-lived for security. A session longer than that lifetime hits expiry mid-use if nothing refreshes it, causing abrupt 401s and lost work. The fix is silent token refresh — using a refresh token to get a new access token automatically before or at expiry, transparent to the user, so their session continues without interruption.'",
    diagramNote:
      "'Access token issued (short-lived)' → 'Session continues past expiry' → without refresh: '401 error, work lost' vs with refresh: 'Refresh token silently gets new access token, session continues'.",
    diagramMermaid: `flowchart LR
    A["Access token issued<br/>short-lived"] --> B["Session continues past expiry"]
    B --> C["Without refresh:<br/>401 error, work lost"]
    B --> D["With refresh: silently gets<br/>new token, session continues"]`,
    realProjectExample:
      "A long approval form's users kept losing unsaved input to sudden 401s during longer review sessions; implementing silent token refresh in the frontend eliminated the issue entirely, with users never noticing the underlying token renewal happening.",
    interviewTip:
      "If asked 'should you just make the token expiry longer instead', explain the security tradeoff — longer-lived tokens increase the damage window if leaked, so refresh is the correct fix, not simply extending expiry.",
    followupQuestions: [
      "What is a refresh token and how does it differ from an access token?",
      "What happens if the refresh token itself expires?",
      "How would you handle a failed token refresh gracefully in the UI?",
    ],
    commonMistakes: [
      "Suggesting simply extending access token lifetime instead of implementing proper refresh.",
      "Not knowing refresh tokens are the standard mechanism for this exact problem.",
    ],
    importantPoints: [
      "Access tokens are deliberately short-lived for security.",
      "Mid-session expiry without refresh causes abrupt 401s and lost work.",
      "Silent token refresh (via a refresh token) is the correct fix, not extending expiry.",
    ],
    revisionNotes: "Mid-session 401 = access token expired. Fix = silent token refresh via refresh token, not just extending access token lifetime.",
  },
  {
    id: "scen-q4",
    topic: "Destination Missing",
    prompt: "An app suddenly can't reach an external system, with an error mentioning the destination couldn't be found. What would you check?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["destination-missing", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Verify the destination still exists and is correctly named/spelled in the subaccount (or wherever it's configured), check whether the Destination service instance is still bound to the app, and confirm the app is looking up the destination name exactly as configured (case sensitivity, typos).",
    detailedAnswer:
      "This is usually a straightforward configuration issue rather than a deep technical bug. First, check the destination still exists in the expected subaccount — someone may have deleted or renamed it during cleanup. Second, confirm the Destination service instance is still bound to the app — a redeploy or manifest change could have accidentally dropped the binding. Third, check for an exact name mismatch — destination names are typically case-sensitive, and a typo or copy-paste error between the app's code and the actual destination configuration is a very common, simple root cause. Working through exists → bound → exact name match covers the overwhelming majority of 'destination not found' issues.",
    hindiExplanation:
      "Ye usually ek straightforward configuration issue hai, deep technical bug nahi. Pehle, check karo destination expected subaccount mein still exist karta hai — ho sakta hai kisi ne cleanup ke dauraan delete ya rename kar diya ho. Doosra, confirm karo Destination service instance abhi bhi app se bound hai — ek redeploy ya manifest change se accidentally binding drop ho sakti hai. Teesra, exact name mismatch check karo — destination names typically case-sensitive hote hain, aur ek typo ya copy-paste error app ke code aur actual destination configuration ke beech ek bahut common, simple root cause hai.",
    interviewExplanation:
      "I'd give the ordered checklist: 'First, confirm the destination still exists in the expected subaccount — it may have been deleted or renamed. Second, check the Destination service is still bound to the app — a redeploy could have dropped it. Third, check for an exact name mismatch — destination names are case-sensitive, and typos are a very common, simple cause.'",
    diagramNote:
      "Checklist: 'Destination still exists?' → 'Destination service still bound to app?' → 'Exact name match (case-sensitive)?'.",
    diagramMermaid: `flowchart TD
    A["Destination not found error"] --> B["Destination still exists<br/>in expected subaccount?"]
    B --> C["Destination service<br/>still bound to app?"]
    C --> D["Exact name match<br/>case-sensitive?"]`,
    realProjectExample:
      "A 'destination not found' error turned out to be a simple case mismatch — the code referenced 'MyDestination' while the actual configured name was 'myDestination' — a five-minute fix once we specifically checked for exact case matching.",
    interviewTip:
      "If asked this, resist over-engineering the answer with complex theories — the correct instinct is to check the simple, common causes (existence, binding, exact name) first before assuming anything more exotic.",
    followupQuestions: [
      "How would you programmatically verify a destination exists before calling it?",
      "What error would you see specifically if the Destination service binding itself was missing, versus just the destination name being wrong?",
      "How would you prevent this kind of issue via better naming conventions?",
    ],
    commonMistakes: [
      "Jumping to complex network/firewall theories before checking the simple, common causes first.",
      "Not considering case-sensitivity as a likely source of a name mismatch.",
    ],
    importantPoints: [
      "Check destination existence first — it may have been deleted/renamed.",
      "Check the Destination service binding is still present.",
      "Check for exact, case-sensitive name matches — typos are a common cause.",
    ],
    revisionNotes: "Destination not found: check it still exists → Destination service still bound → exact case-sensitive name match. Usually a simple config issue.",
  },
  {
    id: "scen-q5",
    topic: "Deployment Failed",
    prompt: "A `cf deploy` of an MTA fails partway through. What state is the system left in, and how do you recover?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["deployment-failed", "mta", "scenario"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Check the deployment logs for exactly which module/resource failed and why; the MTA deployer generally attempts to keep the system in a consistent state (not leaving a half-deployed app running with an old, incompatible database schema), but you should verify affected modules' actual running state before assuming anything, then fix the root cause and re-run the deployment.",
    detailedAnswer:
      "First, get the specific failure reason from the deployment logs — a failed resource provisioning (e.g. HANA quota exceeded), a module that failed to start (bad config, missing env var), or a timeout are all different root causes needing different fixes. The MTA deployment process is designed with some resilience — for instance, it typically won't leave your production app pointing at a partially-migrated database schema — but you shouldn't just assume everything is fine; explicitly check which modules are actually running and what version/state they're in (`cf apps`, checking route mappings) rather than assuming the deployment's partial failure had no side effects. Once the root cause is identified and fixed (increased quota, corrected config), simply re-running `cf deploy` with the corrected MTA is the standard recovery path — the deployer is designed to be re-run safely.",
    hindiExplanation:
      "Pehle, deployment logs se specific failure reason nikaalo — ek failed resource provisioning (jaise HANA quota exceeded), ek module jo start hone mein fail hua (bad config, missing env var), ya ek timeout — sab alag root causes hain jinhe alag fixes chahiye. MTA deployment process kuch resilience ke saath design ki gayi hai — typically production app ko partially-migrated database schema ki taraf point karta nahi chhodega — lekin tumhe assume nahi karna chahiye ki sab thik hai; explicitly check karo kaunse modules actually chal rahe hain aur kis version/state mein hain. Root cause identify aur fix hone ke baad (quota badhaya, config correct kiya), simply `cf deploy` ko corrected MTA ke saath dobara chalana standard recovery path hai.",
    interviewExplanation:
      "I'd give the diagnosis-then-recovery sequence: 'First, check deployment logs for exactly which module/resource failed and why — quota, bad config, timeout are all different fixes. The deployer is designed with some resilience, but I'd explicitly verify what's actually running rather than assume. Once I fix the root cause, re-running cf deploy with the corrected MTA is the standard recovery — it's designed to be safely re-runnable.'",
    diagramNote:
      "'cf deploy fails' → 'Check deployment logs (which module/resource, why?)' → 'Verify actual running state (cf apps, route mappings)' → 'Fix root cause' → 'Re-run cf deploy'.",
    diagramMermaid: `flowchart TD
    A["cf deploy fails"] --> B["Check deployment logs<br/>which module/resource, why?"]
    B --> C["Verify actual running state<br/>cf apps, route mappings"]
    C --> D["Fix root cause"]
    D --> E["Re-run cf deploy"]`,
    realProjectExample:
      "A deployment failed midway due to a HANA schema resource hitting a quota limit; after increasing the subaccount's quota, simply re-running the identical `cf deploy` command completed successfully without any manual cleanup needed.",
    interviewTip:
      "If asked 'is a failed MTA deployment dangerous', the accurate answer acknowledges the deployer's designed resilience while still recommending explicit verification rather than blind trust — a balanced, precise answer.",
    followupQuestions: [
      "What are common reasons an MTA deployment might fail partway through?",
      "Is it always safe to just re-run cf deploy after a failure?",
      "How would you check which modules are actually running versus expected after a partial failure?",
    ],
    commonMistakes: [
      "Assuming a failed deployment automatically leaves the system in a totally broken state without checking.",
      "Not checking deployment logs for the specific failure reason before attempting a fix.",
    ],
    importantPoints: [
      "Get the specific failure reason from deployment logs first.",
      "Verify actual running state rather than assuming the worst (or that everything's fine).",
      "Fix the root cause, then re-run cf deploy — it's designed to be safely re-runnable.",
    ],
    revisionNotes: "Failed cf deploy: check logs for specific failure → verify actual running state → fix root cause → re-run deploy (designed to be re-runnable).",
  },
  {
    id: "scen-q6",
    topic: "CAP Crash",
    prompt: "A CAP application keeps crash-looping on Cloud Foundry after a recent deployment. How would you diagnose it?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["cap-crash", "scenario"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Check `cf logs --recent` for the actual startup error (often a missing environment variable, a failed service binding, or a CDS model compilation error), compare the deployed package.json/dependencies against what was actually tested locally, and verify all required service bindings (HANA, XSUAA) are present and valid.",
    detailedAnswer:
      "A CAP app crash-looping right after deployment almost always means it's failing during startup, not under later load — so `cf logs --recent` should show the actual exception during the boot sequence. Common specific causes: a missing or misconfigured environment variable the app expects (often from a service binding that wasn't actually bound in this environment), a CDS model compilation error (a syntax issue that only surfaces at runtime if not caught by local testing/CI), a Node.js dependency version mismatch between what was tested locally and what got deployed (if `package-lock.json` wasn't committed/respected), or a database connection failure if the HANA binding is missing or the schema hasn't been deployed yet. Systematically checking logs first, then bindings, then recent code changes narrows this down quickly.",
    hindiExplanation:
      "Ek CAP app jo deployment ke turant baad crash-loop kar rahi hai, almost hamesha matlab hai ki startup ke dauraan fail ho rahi hai, baad mein load ke dauraan nahi — isliye `cf logs --recent` boot sequence ke dauraan actual exception dikhana chahiye. Common specific causes: ek missing ya misconfigured environment variable jo app expect karta hai (aksar ek service binding se jo is environment mein actually bind nahi hui), ek CDS model compilation error, ek Node.js dependency version mismatch jo locally tested hua uske aur deploy hue ke beech, ya ek database connection failure agar HANA binding missing hai ya schema abhi deploy nahi hua.",
    interviewExplanation:
      "I'd start with the logs and give the common causes: 'A crash-loop right after deploy almost always means a startup failure, so cf logs --recent should show the actual exception. Common causes are a missing env var from a service binding that wasn't actually bound here, a CDS compilation error, a dependency version mismatch between local test and deploy, or a missing/broken HANA binding.'",
    diagramNote:
      "'CAP app crash-loops after deploy' → 'cf logs --recent (startup exception)' → branches: 'Missing env var/binding', 'CDS compilation error', 'Dependency version mismatch', 'HANA binding/schema issue'.",
    diagramMermaid: `flowchart TD
    A["CAP app crash-loops<br/>after deploy"] --> B["cf logs --recent<br/>startup exception"]
    B --> C["Missing env var/binding"]
    B --> D["CDS compilation error"]
    B --> E["Dependency version mismatch"]
    B --> F["HANA binding/schema issue"]`,
    realProjectExample:
      "A crash loop right after deploying to a new subaccount turned out to be a missing XSUAA binding — the manifest referenced a service instance name that existed in the old subaccount but hadn't been recreated in the new one, causing the app to fail at startup trying to read binding credentials that didn't exist.",
    interviewTip:
      "Emphasizing 'crash right after deploy = startup failure, check logs first' as the mental model shows a structured diagnostic approach rather than randomly guessing at possible causes.",
    followupQuestions: [
      "How would you distinguish a CDS compilation error from a runtime error in the logs?",
      "What's the risk of not committing package-lock.json?",
      "How would you verify all required service bindings are present before deploying?",
    ],
    commonMistakes: [
      "Assuming the issue is a runtime/load problem rather than checking if it's actually a startup failure.",
      "Not checking whether all expected service bindings actually exist in the target environment.",
    ],
    importantPoints: [
      "Crash-loop right after deploy usually means a startup failure — check cf logs --recent first.",
      "Common causes: missing env var/binding, CDS compilation error, dependency mismatch, HANA binding issue.",
      "Compare what was tested locally against what's actually deployed and bound.",
    ],
    revisionNotes: "CAP crash-loop after deploy = startup failure. Check logs first → missing binding/env var, CDS compile error, dependency mismatch, or HANA binding issue.",
  },
  {
    id: "scen-q7",
    topic: "Memory Leak",
    prompt: "An app's memory usage keeps climbing over days until it crashes and restarts. How would you investigate a suspected memory leak?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["memory-leak", "scenario"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Confirm the pattern via memory metrics over time (steady climb vs normal fluctuation), take heap snapshots at different points to compare what's accumulating, check for common leak sources (unclosed connections, growing in-memory caches with no eviction, event listeners never removed), and consider whether it's actually a leak versus just needing a higher memory limit for legitimate usage.",
    detailedAnswer:
      "First, confirm it's actually a leak and not just normal, bounded memory usage that happens to be near the configured limit — a metrics dashboard showing steady, unbounded growth over days (rather than usage that rises and falls with load) is the real signature of a leak. If confirmed, taking heap snapshots (via Node.js's built-in profiling tools, or language-appropriate equivalents) at two different points in time and diffing them reveals what type of object is accumulating — often an unbounded in-memory cache with no eviction policy, event listeners registered repeatedly without ever being removed, or database/HTTP connections opened but never properly closed. Once identified, the fix targets that specific accumulating resource; simply increasing the memory limit only delays the eventual crash without solving the underlying problem.",
    hindiExplanation:
      "Pehle, confirm karo ki ye actually ek leak hai, normal, bounded memory usage nahi jo configured limit ke paas hai. Ek metrics dashboard jo steady, unbounded growth dikhaye din ke over (load ke saath rise/fall karne wale usage ki jagah), leak ka real signature hai. Confirm hone pe, heap snapshots (Node.js ke built-in profiling tools se) do alag points pe lekar unhe diff karna reveal karta hai kis type ka object accumulate ho raha hai — aksar ek unbounded in-memory cache jisme koi eviction policy nahi, event listeners jo baar-baar register hote hain kabhi remove kiye bina, ya database/HTTP connections jo khule hain lekin properly close nahi hue. Identify hone ke baad, fix us specific accumulating resource ko target karta hai; sirf memory limit badhana crash ko delay karta hai, underlying problem solve nahi karta.",
    interviewExplanation:
      "I'd give the confirm-then-diagnose sequence: 'First, confirm via metrics it's actually unbounded growth over days, not just normal usage near the limit. Then I'd take heap snapshots at two points and diff them to see what's accumulating — commonly an unbounded cache with no eviction, unremoved event listeners, or unclosed connections. Once identified, fix that specific source — just raising the memory limit only delays the eventual crash.'",
    diagramNote:
      "'Memory metric: steady unbounded climb over days' → 'Confirmed as leak (not normal fluctuation)' → 'Heap snapshots at two points, diffed' → 'Identify accumulating object type (cache, listeners, connections)' → 'Fix that specific source'.",
    diagramMermaid: `flowchart TD
    A["Memory metric: steady<br/>unbounded climb over days"] --> B["Confirmed as leak"]
    B --> C["Heap snapshots at two points, diffed"]
    C --> D["Identify accumulating object type<br/>cache, listeners, connections"]
    D --> E["Fix that specific source"]`,
    realProjectExample:
      "A confirmed memory leak was traced via heap snapshot diffing to an in-memory cache with no eviction policy that grew unbounded with every unique request parameter combination — adding a simple LRU eviction policy fixed the leak entirely.",
    interviewTip:
      "If asked 'would increasing the memory limit fix this', the correct answer is no — it only delays the crash, and explicitly saying so shows you understand the difference between masking a symptom and fixing the root cause.",
    followupQuestions: [
      "What tools would you use to take a heap snapshot for a Node.js app?",
      "What's the difference between a memory leak and normal memory growth under increasing load?",
      "How would you add monitoring to catch a memory leak trend before it causes a crash?",
    ],
    commonMistakes: [
      "Treating 'increase the memory limit' as a real fix rather than a temporary delay of the same crash.",
      "Not distinguishing a true unbounded leak from normal, bounded memory usage near the configured limit.",
    ],
    importantPoints: [
      "Confirm via metrics it's unbounded growth, not just normal usage near the limit.",
      "Heap snapshot diffing reveals what type of object is accumulating.",
      "Fix the specific accumulating source — raising the memory limit only delays the crash.",
    ],
    revisionNotes: "Memory leak: confirm via metrics (unbounded growth) → heap snapshot diff (what's accumulating) → fix specific source (cache eviction, listener cleanup, connection closing).",
  },
  {
    id: "scen-q8",
    topic: "Scaling",
    prompt: "Your app is experiencing high latency under load, but CPU and memory both look fine. What else would you investigate?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["scaling", "performance", "scenario"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Check for a bottleneck outside the app's own compute — a database connection pool exhausted (requests queueing for a connection), a downstream external API being slow, or a single-threaded/blocking operation serializing requests that should run in parallel — since normal-looking CPU/memory means the bottleneck is likely I/O-bound or a shared resource contention issue, not raw compute.",
    detailedAnswer:
      "If CPU and memory are both healthy, scaling up instances or resources won't help, because the bottleneck isn't raw compute capacity. Common causes: a database connection pool that's too small, causing requests to queue waiting for an available connection (visible as elevated wait time in DB connection metrics, not CPU); a slow downstream external API or dependency that the app is waiting on synchronously, where the app itself is mostly idle-waiting, not computing; or a blocking, single-threaded operation (a large synchronous computation or an unindexed slow query) that serializes what should be parallel request handling, creating a queue even though overall CPU usage stays moderate because most requests are just waiting, not actively computing.",
    hindiExplanation:
      "Agar CPU aur memory dono healthy hain, instances ya resources scale up karna help nahi karega, kyunki bottleneck raw compute capacity nahi hai. Common causes: ek database connection pool jo bahut chhota hai, requests ko ek available connection ka wait karte hue queue karta hai (DB connection metrics mein elevated wait time ki tarah visible, CPU nahi); ek slow downstream external API jispe app synchronously wait kar raha hai, jaha app khud mostly idle-waiting hai, computing nahi; ya ek blocking, single-threaded operation (ek bada synchronous computation ya ek unindexed slow query) jo parallel request handling ko serialize kar deta hai.",
    interviewExplanation:
      "I'd reframe the investigation: 'Normal CPU/memory means scaling up won't help — the bottleneck isn't raw compute. I'd check the database connection pool size, since exhaustion causes requests to queue waiting for a connection. I'd check if a downstream external API is slow, where the app is idle-waiting, not computing. And I'd check for a blocking, single-threaded operation serializing requests that should run in parallel.'",
    diagramNote:
      "'CPU/memory normal, latency high' → not a compute problem → check: 'DB connection pool exhausted (queueing)', 'Slow downstream external API (idle-waiting)', 'Blocking single-threaded operation (serializing requests)'.",
    diagramMermaid: `flowchart TD
    A["CPU/memory normal,<br/>latency high"] --> B["Not a compute problem"]
    B --> C["DB connection pool exhausted<br/>requests queueing"]
    B --> D["Slow downstream API<br/>app idle-waiting"]
    B --> E["Blocking single-threaded op<br/>serializing requests"]`,
    realProjectExample:
      "High latency with normal CPU/memory was eventually traced to a database connection pool sized far too small for actual concurrent load — requests were queueing for a free connection, invisible in CPU metrics but clearly visible once we specifically checked connection pool wait time metrics.",
    interviewTip:
      "If asked 'wouldn't you just scale up more instances', the correct answer explains explicitly why that wouldn't help here — the bottleneck is I/O/contention-based, not compute-based, so more compute capacity doesn't address it.",
    followupQuestions: [
      "How would you check database connection pool wait time specifically?",
      "What's the fix if a downstream external API is genuinely slow and outside your control?",
      "How would horizontal scaling (more instances) actually make a connection pool exhaustion issue worse?",
    ],
    commonMistakes: [
      "Defaulting to 'scale up instances' without first checking whether CPU/memory are actually the bottleneck.",
      "Not considering database connection pool exhaustion as a common, invisible-in-CPU-metrics cause.",
    ],
    importantPoints: [
      "Normal CPU/memory means scaling up compute won't help.",
      "Check DB connection pool exhaustion, slow downstream dependencies, or blocking operations.",
      "The bottleneck is likely I/O-bound or contention-based, not raw compute capacity.",
    ],
    revisionNotes: "High latency, normal CPU/memory = not a compute problem. Check DB connection pool exhaustion, slow downstream API, or blocking serialized operations.",
  },
  {
    id: "scen-q9",
    topic: "Performance",
    prompt: "A specific API endpoint is slow only for certain customers/tenants, not others. How would you investigate?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["performance", "multitenancy", "scenario"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Compare the affected tenants' data volume/shape against unaffected ones — a slow query that scales poorly with data size often only shows up for tenants with significantly more data or a specific data pattern (many related records, unusual field values triggering a different query plan) — then check that tenant's specific query execution plan rather than assuming the code itself is uniformly slow.",
    detailedAnswer:
      "If the same code and infrastructure behaves differently per tenant, the most likely explanation is data-dependent, not code-dependent — a query that's fast against a small or typical dataset can become slow against a tenant with disproportionately more records, deeper relationship graphs, or specific values that cause the database's query planner to choose a different, less efficient execution plan. The investigation should compare data volume and shape between an affected and unaffected tenant, then get the actual execution plan for the slow query specifically against the affected tenant's data (not just a generic average-case plan), which usually reveals exactly where the divergence comes from — a missing index that only matters at a certain data volume, or a join that becomes expensive with a particular tenant's data distribution.",
    hindiExplanation:
      "Agar same code aur infrastructure har tenant ke liye differently behave karta hai, sabse likely explanation data-dependent hai, code-dependent nahi — ek query jo chhote ya typical dataset ke against fast hai, ek aise tenant ke against slow ho sakti hai jiske paas disproportionately zyada records hain, deeper relationship graphs hain, ya specific values hain jo database ke query planner ko ek alag, less efficient execution plan choose karwate hain. Investigation ko affected aur unaffected tenant ke beech data volume/shape compare karna chahiye, fir slow query ka actual execution plan lena chahiye specifically affected tenant ke data ke against.",
    interviewExplanation:
      "I'd reframe it as data-dependent, not code-dependent: 'Same code behaving differently per tenant points to data, not code. I'd compare data volume and shape between an affected and unaffected tenant, then get the actual execution plan for that specific tenant's data — often revealing a missing index that only matters at a certain volume, or a join that's expensive with that tenant's particular data distribution.'",
    diagramNote:
      "'Same code, different behavior per tenant' → 'likely data-dependent, not code-dependent' → 'Compare data volume/shape: affected vs unaffected tenant' → 'Get execution plan specifically for affected tenant's data' → 'Reveals divergence (missing index, expensive join at this scale)'.",
    diagramMermaid: `flowchart TD
    A["Same code, slow for<br/>specific tenants only"] --> B["Likely data-dependent,<br/>not code-dependent"]
    B --> C["Compare data volume/shape:<br/>affected vs unaffected"]
    C --> D["Execution plan for<br/>affected tenant's data specifically"]
    D --> E["Reveals divergence<br/>missing index, expensive join at scale"]`,
    realProjectExample:
      "A query slow for only three of fifty tenants was traced to those three having ten times the average record count in one specific related table — an index that wasn't necessary at typical data volumes became necessary at that scale, and adding it fixed all three affected tenants immediately.",
    interviewTip:
      "If asked 'is this a code bug', the strong answer clarifies it's usually a data-scale issue exposed by otherwise-correct code, not a logic bug — an important distinction for how you'd actually fix it (indexing/query tuning, not rewriting logic).",
    followupQuestions: [
      "How would you get a tenant-specific execution plan in a multitenant HDI container setup?",
      "What's a common data pattern that causes a query planner to choose a worse execution plan?",
      "How would you proactively catch this kind of tenant-specific performance issue before customers report it?",
    ],
    commonMistakes: [
      "Assuming the application code itself must be buggy rather than considering data-scale/shape differences.",
      "Testing performance only against a generic/average dataset rather than checking specific affected tenants' actual data.",
    ],
    importantPoints: [
      "Same code behaving differently per tenant is usually data-dependent, not code-dependent.",
      "Compare data volume/shape between affected and unaffected tenants.",
      "Get the execution plan specifically for the affected tenant's actual data.",
    ],
    revisionNotes: "Tenant-specific slowness = usually data-dependent (volume/shape), not code bug. Compare tenants' data, get execution plan for the affected tenant specifically.",
  },
  {
    id: "scen-q10",
    topic: "Database Lock",
    prompt: "Multiple requests are timing out with what looks like a database lock contention issue. How would you diagnose and resolve it?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["database-lock", "concurrency", "scenario"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Identify which specific query/transaction is holding the lock and which are waiting (via database session/lock monitoring views), check if a long-running transaction is holding a lock far longer than necessary (perhaps due to an unrelated slow operation happening inside the same transaction), and consider whether the transaction scope or isolation level can be narrowed to reduce contention.",
    detailedAnswer:
      "Database lock contention means one transaction holds a lock on a resource (a row, a table) that others need, and they queue waiting for it. First, use the database's session/lock monitoring views to identify exactly which transaction currently holds the contended lock and what it's doing — often it reveals a transaction that's unnecessarily long-running, perhaps because a slow, unrelated operation (like calling an external API) is happening inside the same database transaction as the actual data changes, holding the lock the entire time even though the lock is only strictly needed for the brief data-write portion. The fix is usually narrowing the transaction's scope — doing slow, non-database work outside the transaction boundary, keeping the lock held only as long as strictly necessary — or, in some cases, choosing a less restrictive isolation level or lock granularity (row-level instead of table-level) if the business logic allows it.",
    hindiExplanation:
      "Database lock contention ka matlab hai ek transaction ek resource (ek row, ek table) pe lock hold kar raha hai jo doosron ko chahiye, aur wo wait mein queue ho jaate hain. Pehle, database ki session/lock monitoring views use karo exactly identify karne ke liye ki kaunsa transaction abhi contended lock hold kar raha hai aur kya kar raha hai — aksar ye reveal karta hai ek transaction jo unnecessarily long-running hai, shayad kyunki ek slow, unrelated operation (jaise ek external API call) usi database transaction ke andar ho raha hai jaise actual data changes, poore time lock hold karte hue. Fix usually transaction ka scope narrow karna hai — slow, non-database work ko transaction boundary ke bahar karna, lock ko sirf zaroori waqt tak hold karna.",
    interviewExplanation:
      "I'd start with the diagnosis tool: 'I'd use the database's lock monitoring views to identify exactly which transaction holds the contended lock and what it's doing. Often it's an unnecessarily long-running transaction — say, calling a slow external API inside the same transaction as the actual data write, holding the lock the whole time. The fix is narrowing the transaction scope — moving slow, non-database work outside the transaction boundary — or reducing lock granularity if the business logic allows it.'",
    diagramNote:
      "'Requests timing out, lock contention suspected' → 'Check lock monitoring views (who holds it, what are they doing?)' → 'Often: slow unrelated work inside the transaction' → 'Fix: narrow transaction scope, move slow work outside it'.",
    diagramMermaid: `flowchart TD
    A["Requests timing out<br/>lock contention suspected"] --> B["Check lock monitoring views<br/>who holds it, doing what?"]
    B --> C["Often: slow unrelated work<br/>inside the transaction"]
    C --> D["Fix: narrow transaction scope,<br/>move slow work outside it"]`,
    realProjectExample:
      "Lock contention causing widespread timeouts was traced to a transaction that called a slow external notification API before committing its data changes, holding a row lock the entire time; moving the API call to after the transaction committed eliminated the contention entirely.",
    interviewTip:
      "If asked 'would you just add a longer timeout to fix this', the correct answer is no — that masks the symptom without addressing the actual lock-holding-too-long root cause, which will keep causing cascading delays under load.",
    followupQuestions: [
      "What database tools/views would you use to see current lock holders?",
      "What's the difference between row-level and table-level locking?",
      "Why should slow, non-database operations be kept outside a database transaction boundary?",
    ],
    commonMistakes: [
      "Increasing request timeouts as a 'fix' instead of addressing why the lock is held too long.",
      "Not knowing database lock/session monitoring views are the tool to identify the actual lock holder.",
    ],
    importantPoints: [
      "Use lock/session monitoring views to identify the actual lock holder and what it's doing.",
      "A common cause is slow, unrelated work happening inside the same transaction as the data change.",
      "Fix by narrowing transaction scope, not just increasing timeouts.",
    ],
    revisionNotes: "Lock contention: use DB lock monitoring views to find the holder → often slow unrelated work inside the transaction → fix by narrowing transaction scope.",
  },
  {
    id: "scen-q11",
    topic: "Project Architecture",
    prompt: "You're asked to design the BTP architecture for a new project that needs to extend S/4HANA with a custom approval app. Walk through your key decisions.",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["project-architecture", "design"],
    estimatedMinutes: 4,
    expectedAnswer:
      "Decide on clean-core side-by-side extension (CAP on Cloud Foundry) consuming S/4HANA via released OData APIs/events, choose HANA Cloud for any app-specific persistence, XSUAA for auth with role collections mapping to business roles, Destination/Connectivity for reaching S/4HANA (on-prem or cloud), and a landscape of Dev/QA/Prod subaccounts with an MTA-based CI/CD pipeline — all decisions tracing back to established principles covered earlier.",
    detailedAnswer:
      "This question tests whether you can synthesize the individual concepts into one coherent design. I'd reason through it top-down: (1) Extension approach — side-by-side, clean-core, using CAP rather than modifying S/4HANA directly, consuming it via released OData APIs or business events. (2) Data — HANA Cloud for whatever app-specific data doesn't belong in S/4HANA itself (approval history, custom fields), designed with an HDI container. (3) Security — XSUAA with role templates mapping to real business roles (Approver, Requester), assigned via role collections. (4) Connectivity — if S/4HANA is on-premise, Destination + Connectivity service + Cloud Connector, with principal propagation if per-user audit trails matter on the S/4HANA side. (5) Landscape — separate Dev/QA/Prod subaccounts, deployed via an MTA descriptor and a CI/CD pipeline following the build-once-deploy-many-times pattern. Walking through each layer and explaining why, not just what, demonstrates real architectural reasoning.",
    hindiExplanation:
      "Ye question test karta hai ki tum individual concepts ko ek coherent design mein synthesize kar sakte ho ya nahi. Main top-down reason karunga: (1) Extension approach — side-by-side, clean-core, CAP use karke S/4HANA ko directly modify karne ki jagah, use released OData APIs ya business events se consume karte hue. (2) Data — HANA Cloud app-specific data ke liye (approval history, custom fields). (3) Security — XSUAA, role templates real business roles se mapped. (4) Connectivity — agar S/4HANA on-premise hai, Destination + Connectivity service + Cloud Connector, principal propagation ke saath agar per-user audit trails matter karte hain. (5) Landscape — alag Dev/QA/Prod subaccounts, MTA descriptor aur CI/CD pipeline ke through deploy.",
    interviewExplanation:
      "I'd walk through five layers, explaining the why for each: 'Extension approach: side-by-side CAP app, clean core, consuming S/4HANA via released OData/events. Data: HANA Cloud for app-specific data like approval history. Security: XSUAA with role templates mapped to real business roles like Approver. Connectivity: Destination plus Cloud Connector if S/4HANA is on-prem, with principal propagation for per-user audit trails. Landscape: separate Dev/QA/Prod subaccounts with an MTA-based CI/CD pipeline.'",
    diagramNote:
      "Five architecture layers: 'Extension: CAP, clean-core, OData/events' → 'Data: HANA Cloud' → 'Security: XSUAA, role collections' → 'Connectivity: Destination + Cloud Connector (if on-prem)' → 'Landscape: Dev/QA/Prod + MTA CI/CD'.",
    diagramMermaid: `flowchart TD
    A["Extension: CAP,<br/>clean-core, OData/events"] --> B["Data: HANA Cloud"]
    B --> C["Security: XSUAA,<br/>role collections"]
    C --> D["Connectivity: Destination<br/>+ Cloud Connector if on-prem"]
    D --> E["Landscape: Dev/QA/Prod<br/>+ MTA CI/CD"]`,
    realProjectExample:
      "Designing exactly this kind of approval-app extension, we chose CAP on Cloud Foundry consuming S/4HANA via released OData APIs, HANA Cloud for approval history, XSUAA role collections mapped to 'Approver' and 'Requester' business roles, and principal propagation through the Cloud Connector so the on-prem S/4HANA system's own audit log correctly attributed actions to the real approving employee, not a generic technical user.",
    interviewTip:
      "For an open-ended architecture question like this, structuring your answer into clear layers (extension approach, data, security, connectivity, landscape) — rather than a rambling list — is what signals senior-level architectural thinking.",
    followupQuestions: [
      "Why choose side-by-side extension instead of modifying S/4HANA directly?",
      "How would you decide between Cloud Foundry and Kyma for this project?",
      "What would change in this design if S/4HANA were cloud-based rather than on-premise?",
    ],
    commonMistakes: [
      "Jumping straight to technology names without explaining the reasoning behind each choice.",
      "Forgetting to address the full landscape (Dev/QA/Prod) and deployment pipeline as part of the architecture.",
    ],
    importantPoints: [
      "Reason top-down: extension approach, data, security, connectivity, landscape.",
      "Every choice should trace back to a specific reason (clean core, audit requirements, etc.).",
      "A complete architecture answer addresses the full landscape/pipeline, not just the app itself.",
    ],
    revisionNotes: "Project architecture answer = layered reasoning: extension approach (CAP, clean-core) → data (HANA Cloud) → security (XSUAA) → connectivity (Destination/Cloud Connector) → landscape (Dev/QA/Prod + CI/CD).",
  },
  {
    id: "scen-q12",
    topic: "Production Issues",
    prompt: "During an active incident, a stakeholder keeps asking for updates every five minutes, distracting you from investigating. How do you handle this?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["production-issues", "communication"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Set up a dedicated, low-friction communication channel (a status update posted to a channel/status page at a fixed cadence, like every 15 minutes) so stakeholders get regular updates without needing to interrupt the investigation directly, and designate a separate incident communicator if the team is large enough so the person actively debugging isn't also fielding questions.",
    detailedAnswer:
      "Constant direct interruptions genuinely slow down root-causing, but stakeholders asking for updates is a legitimate need, not an unreasonable one — the fix is changing the communication channel, not ignoring the request. Proactively posting a brief status update at a fixed, predictable cadence (every 10-15 minutes) to a shared channel or status page satisfies the need for visibility without requiring anyone to interrupt with a direct question, since they can just check the channel themselves. For larger incidents with enough people involved, explicitly separating the 'incident commander/communicator' role from the person actively debugging means the debugger stays heads-down while someone else handles stakeholder updates — a role split many organizations formalize for exactly this reason.",
    hindiExplanation:
      "Constant direct interruptions genuinely root-causing ko slow karte hain, lekin stakeholders ka updates maangna ek legitimate need hai, unreasonable nahi — fix hai communication channel change karna, request ignore karna nahi. Proactively ek brief status update ek fixed, predictable cadence pe (har 10-15 minutes) ek shared channel ya status page pe post karna visibility ki need satisfy karta hai bina kisi ko direct question se interrupt kiye. Bade incidents ke liye jaha kaafi log involved hain, 'incident commander/communicator' role ko us person se explicitly separate karna jo actively debug kar raha hai, matlab debugger heads-down reh sakta hai.",
    interviewExplanation:
      "I'd change the channel, not ignore the need: 'Constant direct interruptions do slow debugging, but the underlying need for visibility is legitimate. I'd proactively post a brief status update at a fixed cadence — every 10-15 minutes — to a shared channel, so people can check it themselves instead of interrupting. For a larger incident, I'd explicitly split the debugger role from an incident communicator, so whoever's heads-down in the logs isn't also fielding questions.'",
    diagramNote:
      "'Constant direct interruptions' → slows debugging → fix: 'Fixed-cadence status updates to a shared channel' + 'Separate incident communicator role (for larger incidents)' — satisfies visibility need without interrupting debugging.",
    diagramMermaid: `flowchart LR
    A["Constant direct<br/>interruptions"] --> B["Slows debugging"]
    C["Fixed-cadence status<br/>updates to shared channel"] --> D["Satisfies visibility need<br/>without interrupting"]`,
    realProjectExample:
      "During a prolonged incident, switching from fielding individual direct-message questions to posting a status update every 15 minutes in a shared incident channel eliminated the interruptions entirely while stakeholders reported feeling more informed, not less.",
    interviewTip:
      "If asked how you'd balance investigation focus against stakeholder communication needs, proposing a structural fix (cadence-based updates, a separate communicator role) rather than just 'I'd ask them to stop' shows mature incident-management thinking.",
    followupQuestions: [
      "What would you include in a good status update during an ongoing incident?",
      "How would you decide the appropriate update cadence for a given incident's severity?",
      "Who would you designate as incident communicator on a small team with no dedicated role for it?",
    ],
    commonMistakes: [
      "Either ignoring stakeholder update requests entirely or letting constant interruptions derail the actual investigation.",
      "Not proactively establishing a communication cadence, leaving stakeholders to interrupt reactively instead.",
    ],
    importantPoints: [
      "Stakeholder need for visibility during an incident is legitimate, not something to dismiss.",
      "Fix it structurally — a fixed-cadence status channel — rather than fielding constant direct interruptions.",
      "Separate the incident communicator role from the active debugger for larger incidents.",
    ],
    revisionNotes: "Handle stakeholder update requests with a fixed-cadence status channel (every 10-15 min), and a separate communicator role for larger incidents — don't ignore the need or let it derail active debugging.",
  },
  {
    id: "scen-q13",
    topic: "Production Issues",
    prompt: "You've identified the root cause of an outage but the proper fix will take hours to implement and test. What do you do in the meantime?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["production-issues", "mitigation"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Look for a faster mitigation to restore service now (a rollback to the last known-good version, a feature flag disabling the problematic path, or a temporary workaround) even if it's not the final root-cause fix, since restoring service quickly matters more in the moment than shipping the complete correct solution — then implement and properly test the real fix afterward, without the pressure of an active outage.",
    detailedAnswer:
      "Once the root cause is understood, there's a meaningful difference between 'the fix that fully and correctly addresses this' and 'the fastest way to restore service right now' — and during an active outage, the second usually matters more, since every minute of continued downtime has real business impact. Common fast mitigations: rolling back to the last known-good deployed version (if the root cause was introduced by a recent change), disabling a specific feature flag if the problematic code path can be turned off without a full redeploy, or a manual, temporary workaround (like manually correcting bad data causing the issue) that buys time. The proper, fully-tested fix then gets implemented and validated afterward, without the time pressure and risk of rushing a change into an already-unstable production environment.",
    hindiExplanation:
      "Ek baar root cause samajh aa jaaye, 'fix jo isse fully aur correctly address kare' aur 'service ko abhi fastest tarike se restore karna' mein ek meaningful difference hai — aur active outage ke dauraan, doosra usually zyada matter karta hai, kyunki har minute continued downtime ka real business impact hota hai. Common fast mitigations: last known-good deployed version pe rollback karna, ek specific feature flag disable karna agar problematic code path ko poore redeploy ke bina turn off kiya ja sake, ya ek manual, temporary workaround. Proper, fully-tested fix fir baad mein implement/validate hota hai, time pressure ke bina.",
    interviewExplanation:
      "I'd prioritize restoring service over the perfect fix: 'Once I understand the root cause, I'd look for the fastest way to restore service now — a rollback if a recent change caused it, disabling a feature flag, or a temporary manual workaround — even if it's not the final fix. Every minute of continued downtime has real business impact. The proper, fully-tested fix gets implemented afterward, without the pressure and risk of rushing a change into an already-unstable production environment.'",
    diagramNote:
      "'Root cause identified, proper fix takes hours' → 'Look for fast mitigation NOW: rollback / feature flag / manual workaround' → restores service → 'Implement + properly test the real fix afterward, without outage pressure'.",
    diagramMermaid: `flowchart TD
    A["Root cause identified,<br/>proper fix takes hours"] --> B["Fast mitigation now:<br/>rollback/flag/workaround"]
    B --> C["Service restored"]
    C --> D["Implement + test real fix<br/>afterward, no time pressure"]`,
    realProjectExample:
      "A root cause traced to a specific new feature's code path was mitigated within minutes by disabling its feature flag, restoring full service immediately, while the actual code fix was properly implemented and tested over the following day without any outage-driven rush.",
    interviewTip:
      "If asked 'wouldn't the temporary fix just be technical debt', acknowledge that directly — it's a deliberate tradeoff (restore service now, fix it properly and calmly later), not laziness, and following through on the proper fix afterward is essential, not optional.",
    followupQuestions: [
      "How would you track that the temporary mitigation actually gets replaced by the proper fix later?",
      "What's the risk of a temporary mitigation becoming permanent by default?",
      "How would you decide whether a rollback is actually safe, versus making things worse?",
    ],
    commonMistakes: [
      "Insisting on shipping the complete, proper fix even while an outage continues, prioritizing correctness over restoring service.",
      "Never following up to replace a temporary mitigation with the actual root-cause fix.",
    ],
    importantPoints: [
      "Restoring service quickly matters more during an active outage than a complete, correct fix.",
      "Common fast mitigations: rollback, feature flag disable, temporary manual workaround.",
      "Implement and test the proper fix afterward, without the pressure of an ongoing outage.",
    ],
    revisionNotes: "During an outage, prioritize fast mitigation (rollback/feature flag/workaround) over the perfect fix — restore service now, implement the proper fix calmly afterward without outage pressure.",
  },
  {
    id: "scen-q14",
    topic: "Authentication Failure",
    prompt: "Only users from one specific corporate identity provider (out of several federated ones) can't log in. How would this narrow your investigation?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["authentication-failure", "federation", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Since only one IdP's users are affected while others work fine, the issue is specific to that one federation relationship, not XSUAA or the platform generally — check that specific IdP's trust configuration, certificate, or federation status rather than investigating platform-wide authentication infrastructure.",
    detailedAnswer:
      "If the issue affected every user regardless of which corporate IdP they federate through, that would point to a platform-wide XSUAA or trust-infrastructure problem. But since only users from one specific IdP are affected while others log in fine, the platform's core authentication mechanism is clearly working — the issue is scoped specifically to that one IdP's federation relationship. This narrows investigation dramatically: check that specific IdP's own health/availability, whether its federation trust certificate has expired specifically for that connection, or whether a recent change to that particular Trust Configuration (not a platform-wide one) broke just that relationship — investigating platform-wide infrastructure would be wasted effort once the symptom itself has already told you the issue is IdP-specific.",
    hindiExplanation:
      "Agar issue har user ko affect karta chahe wo kisi bhi corporate IdP se federate karta ho, ye ek platform-wide XSUAA ya trust-infrastructure problem point karta. Lekin kyunki sirf ek specific IdP ke users affected hain jabki doosre theek se login karte hain, platform ka core authentication mechanism clearly kaam kar raha hai — issue specifically us ek IdP ki federation relationship tak scoped hai. Ye investigation ko dramatically narrow karta hai: us specific IdP ki apni health/availability check karo, ya uska federation trust certificate expire hua hai specifically us connection ke liye, ya recently us particular Trust Configuration mein koi change hua jisne sirf us relationship ko break kiya.",
    interviewExplanation:
      "I'd let the symptom scope the investigation: 'If every user were affected regardless of IdP, that'd point to platform-wide XSUAA infrastructure. But since only one specific IdP's users are affected while others work fine, the platform's core auth is clearly working — the issue is scoped to that one federation relationship. I'd check that specific IdP's health, whether its trust certificate expired for that connection specifically, or whether a recent change to that particular Trust Configuration broke it — investigating platform-wide infrastructure would be wasted effort here.'",
    diagramNote:
      "'Only IdP-A users affected, IdP-B/C users fine' → rules out platform-wide XSUAA issue → 'Investigate IdP-A specifically: its health, its trust certificate, its specific Trust Configuration'.",
    diagramMermaid: `flowchart TD
    A["Only IdP-A users affected,<br/>IdP-B/C users fine"] --> B["Rules out platform-wide<br/>XSUAA issue"]
    B --> C["Investigate IdP-A specifically:<br/>health, trust cert, Trust Config"]`,
    realProjectExample:
      "Login failures affecting only one of three federated corporate identity providers were quickly traced to that specific IdP's federation certificate expiring, confirmed within minutes by narrowing the investigation to that one IdP based on the symptom pattern rather than investigating XSUAA broadly.",
    interviewTip:
      "If asked how you'd narrow a broad investigation quickly, explicitly using the symptom's actual scope (which users are affected, which aren't) to rule out entire categories of causes is a precise diagnostic instinct interviewers value highly.",
    followupQuestions: [
      "How would you verify a specific IdP's federation certificate status?",
      "Would this same narrowing logic apply if only one specific application (not one specific IdP) were affected?",
      "How would you communicate to affected users while you investigate an IdP-specific issue?",
    ],
    commonMistakes: [
      "Investigating platform-wide XSUAA health broadly when the symptom already indicates an IdP-specific issue.",
      "Not using the actual pattern of who's affected and who isn't to scope and speed up the investigation.",
    ],
    importantPoints: [
      "A symptom affecting only one specific IdP's users rules out a platform-wide XSUAA issue.",
      "This scopes investigation specifically to that IdP's federation trust, certificate, or configuration.",
      "Using the actual symptom pattern to narrow investigation avoids wasted effort on ruled-out causes.",
    ],
    revisionNotes: "Only one federated IdP's users affected → not a platform-wide XSUAA issue → investigate that specific IdP's trust config/certificate/federation status only.",
  },
  {
    id: "scen-q15",
    topic: "Authentication Failure",
    prompt: "A user reports they can log in but immediately get logged out again within seconds. What would you investigate?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["authentication-failure", "session", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Since login itself succeeds (proving credentials/authentication work), the issue is likely session/token handling after login — check for an unusually short token expiry misconfiguration, a client-side clock skew causing the token to appear already expired, or a session-storage issue (cookies being blocked/cleared) preventing the session from persisting between requests.",
    detailedAnswer:
      "The fact that login itself succeeds is an important diagnostic signal — it rules out credential/authentication problems entirely, narrowing the investigation specifically to what happens right after a successful login. Common causes for an immediate logout: a misconfigured token expiry set unreasonably short (seconds instead of minutes/hours) by mistake; client-side clock skew, where the user's device clock is significantly wrong, causing the token's expiry timestamp to appear already passed even though it's actually valid; or a session-storage issue, where the browser is blocking or immediately clearing cookies (privacy settings, a browser extension, third-party cookie blocking in certain configurations) needed to maintain the session across requests. Checking token expiry configuration first (the simplest, most likely cause) before investigating more exotic client-side possibilities is the efficient order.",
    hindiExplanation:
      "Login khud succeed hona ek important diagnostic signal hai — ye credential/authentication problems ko entirely rule out karta hai, investigation ko specifically narrow karte hue us par jo successful login ke turant baad hota hai. Immediate logout ke common causes: ek misconfigured token expiry jo galti se unreasonably short set hua (minutes/hours ki jagah seconds); client-side clock skew, jaha user ke device ka clock significantly galat hai, token ki expiry timestamp already pass hui dikhati hai chahe wo actually valid ho; ya ek session-storage issue, jaha browser cookies ko block ya immediately clear kar raha hai.",
    interviewExplanation:
      "I'd use the successful login as a diagnostic signal: 'Since login itself succeeds, that rules out credential/authentication problems entirely — the issue is specifically in what happens right after. I'd check token expiry configuration first, since a misconfigured value set to seconds instead of minutes is a simple, common cause. Then client-side clock skew, where the user's device clock being wrong makes a valid token appear already expired. Then session-storage issues, like cookies being blocked.'",
    diagramNote:
      "'Login succeeds, immediate logout' → 'rules out credential/auth issue' → check in order: 'Token expiry misconfigured (too short)' → 'Client-side clock skew' → 'Session storage/cookies blocked'.",
    diagramMermaid: `flowchart TD
    A["Login succeeds,<br/>immediate logout"] --> B["Rules out credential/auth issue"]
    B --> C["Token expiry misconfigured?"]
    B --> D["Client-side clock skew?"]
    B --> E["Session storage/cookies blocked?"]`,
    realProjectExample:
      "A user's immediate-logout issue was traced to their laptop's clock being set several hours behind due to a sync failure, making every freshly-issued token appear already expired the moment it arrived — correcting their system clock resolved the issue instantly, a cause that wasn't obvious until clock skew was specifically considered.",
    interviewTip:
      "If asked to debug this exact scenario, explicitly noting that successful login rules out credential problems (narrowing to post-login session/token handling) demonstrates precise diagnostic reasoning from the given symptom.",
    followupQuestions: [
      "How would you detect client-side clock skew as the actual cause remotely, without physical access to the user's device?",
      "What token expiry value would be reasonable for a typical business application?",
      "How would third-party cookie blocking specifically cause this symptom?",
    ],
    commonMistakes: [
      "Investigating credential/authentication mechanisms when the symptom (successful login) already rules that out.",
      "Not considering client-side clock skew as a possible, non-obvious cause of an apparently-already-expired token.",
    ],
    importantPoints: [
      "Successful login rules out credential/authentication problems, narrowing to post-login session/token handling.",
      "Check token expiry misconfiguration first as the simplest likely cause.",
      "Also consider client-side clock skew and session-storage/cookie issues.",
    ],
    revisionNotes: "Login succeeds but immediate logout: rules out credentials — check token expiry misconfiguration, client-side clock skew, and session storage/cookie blocking, in that order.",
  },
  {
    id: "scen-q16",
    topic: "Token Expired",
    prompt: "A background scheduled job that ran fine for months suddenly starts failing with 401 errors. What's different about diagnosing this versus a user-facing token expiry issue?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["token-expired", "service-to-service", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Since there's no interactive user, the job likely uses Client Credentials, so the investigation focuses on whether the service's own credentials (client ID/secret) were rotated or expired, or whether the service binding itself changed — not on refresh-token/session concepts, which don't apply to a non-interactive Client Credentials flow.",
    detailedAnswer:
      "A scheduled job with no human involved almost certainly authenticates via the Client Credentials grant, representing the service itself rather than any user — this immediately rules out user-session concepts like refresh tokens, client-side clock skew from a user's device, or cookie/session-storage issues, none of which apply here. Instead, the investigation should check whether the service's own credentials (an XSUAA service key's client ID/secret) were rotated, regenerated, or expired — a common cause if a security policy mandates periodic credential rotation and the job's configuration wasn't updated to match; or whether the underlying service binding itself changed (a re-bind during a redeploy generating new credentials the job's stored configuration doesn't know about). This is a genuinely different diagnostic path than a user-facing session issue, even though the surface symptom (401 errors) looks identical.",
    hindiExplanation:
      "Ek scheduled job jisme koi human involved nahi hai almost certainly Client Credentials grant se authenticate karti hai, service ko khud represent karte hue kisi user ki jagah — ye turant user-session concepts jaise refresh tokens, user ke device se client-side clock skew, ya cookie/session-storage issues ko rule out kar deta hai, jo yahan apply hi nahi hote. Iske bajaye, investigation ko check karna chahiye ki service ke apne credentials (ek XSUAA service key ka client ID/secret) rotate, regenerate, ya expire toh nahi hue — ek common cause agar ek security policy periodic credential rotation mandate karti hai aur job ki configuration match karne ke liye update nahi hui.",
    interviewExplanation:
      "I'd immediately note this rules out user-session concepts: 'A scheduled job with no human involved almost certainly uses Client Credentials, representing the service itself. That rules out refresh tokens, client-side clock skew, or cookie issues entirely — none apply here. Instead I'd check whether the service's own credentials were rotated or expired, perhaps by a periodic rotation policy the job's config wasn't updated for, or whether a redeploy re-bound the service and generated new credentials the job doesn't know about.'",
    diagramNote:
      "'Scheduled job, no human → Client Credentials grant' → rules out: 'refresh tokens, user clock skew, cookies' → investigate instead: 'service's own credential rotation/expiry, service binding changes'.",
    diagramMermaid: `flowchart TD
    A["Scheduled job, no human<br/>→ Client Credentials"] --> B["Rules out: refresh tokens,<br/>user clock skew, cookies"]
    A --> C["Investigate: service credential<br/>rotation/expiry, binding changes"]`,
    realProjectExample:
      "A nightly batch job's sudden 401 failures were traced to an automated security policy that had rotated the underlying service key's credentials, with the job's stored configuration still referencing the old, now-invalid client secret — updating the job's configuration to the new credentials resolved it immediately.",
    interviewTip:
      "If asked to debug this exact scenario, explicitly stating why user-session concepts don't apply here (no interactive user, so no refresh token/session/cookie mechanism involved) shows precise understanding of the Client Credentials flow's distinct nature.",
    followupQuestions: [
      "How would you detect that a service key's credentials were rotated before the job started failing?",
      "How would you design the job's credential management to survive future rotations automatically?",
      "Would this same diagnostic approach apply to any service-to-service call, not just a scheduled job?",
    ],
    commonMistakes: [
      "Investigating user-session concepts (refresh tokens, cookies, clock skew) for a non-interactive service-to-service failure.",
      "Not considering that a security policy might rotate service credentials on a schedule the job's config wasn't updated to match.",
    ],
    importantPoints: [
      "A scheduled job's authentication failure is almost certainly Client Credentials related, not a user-session issue.",
      "Investigate service credential rotation/expiry and service binding changes specifically.",
      "The diagnostic path differs meaningfully from a user-facing token expiry issue, despite an identical surface symptom.",
    ],
    revisionNotes: "Scheduled job 401s = Client Credentials issue, not user-session — check service credential rotation/expiry and binding changes, not refresh tokens/cookies/clock skew.",
  },
  {
    id: "scen-q17",
    topic: "Token Expired",
    prompt: "Users report intermittent 401 errors, but only during a specific time of day. What would you suspect?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["token-expired", "pattern-recognition", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A time-of-day pattern strongly suggests a scheduled event coinciding with that window — a certificate/key rotation job running on a schedule, a batch process temporarily overloading the auth infrastructure, or a scheduled maintenance window on the identity provider side — rather than a random, load-independent cause; correlate the exact failure window against any known scheduled jobs or maintenance windows first.",
    detailedAnswer:
      "A consistent time-of-day pattern is a strong diagnostic clue that shouldn't be ignored in favor of jumping straight to generic causes — if something fails reliably at, say, 2am every night, that's very unlikely to be pure coincidence and very likely correlates with something else scheduled at that same time. Common culprits: an automated certificate or signing key rotation job that briefly disrupts token validation during its execution window, a resource-intensive batch/reporting job running at that time that temporarily starves the auth infrastructure of resources, or a scheduled maintenance window on the identity provider's own side that the application team might not even be aware of. The efficient first step is simply asking 'what else is scheduled to run during this exact window' before investigating anything else, since the time correlation itself is often the strongest available clue.",
    hindiExplanation:
      "Ek consistent time-of-day pattern ek strong diagnostic clue hai jise ignore nahi karna chahiye generic causes pe seedha jump karne ke favor mein — agar kuch reliably 2am pe har raat fail hota hai, ye bahut unlikely hai pure coincidence hona aur bahut likely hai us same time pe kisi aur scheduled cheez se correlate karna. Common culprits: ek automated certificate ya signing key rotation job jo apne execution window ke dauraan briefly token validation disrupt karta hai, ek resource-intensive batch/reporting job jo us time pe chalti hai aur temporarily auth infrastructure ko resources se starve kar deti hai, ya identity provider ki apni side pe ek scheduled maintenance window jiske baare mein application team ko pata bhi na ho.",
    interviewExplanation:
      "I'd treat the time pattern as the strongest clue: 'A consistent time-of-day failure is very unlikely to be coincidence — I'd first ask what else is scheduled during that exact window before investigating anything else. Common culprits: an automated certificate/key rotation job briefly disrupting validation during its run, a resource-intensive batch job starving auth infrastructure at that time, or a scheduled IdP maintenance window the app team might not even know about.'",
    diagramNote:
      "'Consistent 401 failure pattern at specific time of day' → 'strong signal: correlate with scheduled events' → check: 'cert/key rotation job', 'resource-intensive batch job', 'IdP scheduled maintenance window'.",
    diagramMermaid: `flowchart TD
    A["Consistent 401 pattern<br/>at specific time of day"] --> B["Correlate with<br/>scheduled events first"]
    B --> C["Cert/key rotation job"]
    B --> D["Resource-intensive batch job"]
    B --> E["IdP scheduled maintenance window"]`,
    realProjectExample:
      "Intermittent 401 errors occurring reliably between 2:00 and 2:05am every night were traced to an automated certificate rotation job running on exactly that schedule, briefly causing token validation failures during the short window while the new certificate propagated — adjusting the rotation job's timing to a lower-traffic window and adding a brief grace period eliminated the pattern.",
    interviewTip:
      "If asked how you'd approach a time-correlated intermittent issue, explicitly stating you'd check scheduled jobs/maintenance windows FIRST (before deep technical investigation) shows efficient, clue-driven diagnostic instinct.",
    followupQuestions: [
      "How would you find out about an identity provider's scheduled maintenance windows you might not control?",
      "What would a 'grace period' during a certificate rotation actually look like technically?",
      "How would you distinguish a genuine time-correlated pattern from coincidental clustering?",
    ],
    commonMistakes: [
      "Ignoring a clear time-of-day pattern and investigating generic, non-time-correlated causes first.",
      "Not checking for scheduled jobs/maintenance windows that might coincide with the failure window.",
    ],
    importantPoints: [
      "A consistent time-of-day failure pattern strongly suggests a scheduled event, not random coincidence.",
      "Check certificate/key rotation jobs, resource-intensive batch jobs, and IdP maintenance windows first.",
      "Correlating the exact failure window against known scheduled activity is an efficient first diagnostic step.",
    ],
    revisionNotes: "Time-of-day-correlated 401 pattern = check scheduled events first (cert/key rotation, batch jobs, IdP maintenance windows) before deeper investigation — time correlation is a strong clue.",
  },
  {
    id: "scen-q18",
    topic: "Destination Missing",
    prompt: "A destination works fine when tested from the cockpit's 'Check Connection' button, but the actual application still fails to reach it. What would you check?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["destination-missing", "troubleshooting", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The cockpit's Check Connection test validates the destination configuration itself, but not the app's actual runtime wiring — check whether the Destination service instance is actually bound to the app, whether the app is requesting the destination by the exact correct name, and whether the app's own service binding has read access, since a passing cockpit test only rules out the destination/target being broken, not the app's connection to it.",
    detailedAnswer:
      "This is directly analogous to the earlier Postman-versus-app-code distinction covered for on-prem connectivity: the cockpit's Check Connection button validates that the destination's configuration (URL, auth) actually works against the real target, but it doesn't exercise the app's own runtime path to that destination at all. A passing cockpit test rules out the destination/target itself being broken, but says nothing about whether the Destination service instance is genuinely bound to the app in its deployment manifest, whether the app's code requests the destination using the exact correct name (a typo would fail silently from the app's perspective while the cockpit test, using the correct name directly, passes fine), or whether the app's own service binding has sufficient read permissions on the destination configuration.",
    hindiExplanation:
      "Ye directly analogous hai earlier Postman-versus-app-code distinction se jo on-prem connectivity ke liye cover hui thi: cockpit ka Check Connection button validate karta hai ki destination ki configuration (URL, auth) actually real target ke against kaam karti hai, lekin ye app ka apna runtime path us destination tak bilkul exercise nahi karta. Ek passing cockpit test destination/target khud ke broken hone ko rule out karta hai, lekin kuch nahi batata ki Destination service instance genuinely app se bound hai uske deployment manifest mein ya nahi, ya app ka code exact correct name se destination request karta hai ya nahi.",
    interviewExplanation:
      "I'd draw the parallel to the Postman-versus-app-wiring distinction: 'The cockpit's Check Connection test validates the destination's own configuration works against the real target — it doesn't exercise the app's actual runtime path to it at all. A passing test rules out the destination itself being broken, but says nothing about whether the Destination service is actually bound to the app, whether the app requests it by the exact correct name, or whether the app's own binding has read access to the config.'",
    diagramNote:
      "'Cockpit Check Connection: validates destination config against real target' — passes → but doesn't test 'app's actual binding', 'exact name match in app code', 'app's read access to destination config' — all separate potential failure points.",
    diagramMermaid: `flowchart TD
    A["Cockpit Check Connection<br/>passes"] --> B["Validates destination config<br/>against real target only"]
    B -.->|"doesn't test"| C["App's actual binding"]
    B -.->|"doesn't test"| D["Exact name match in app code"]
    B -.->|"doesn't test"| E["App's read access to config"]`,
    realProjectExample:
      "A destination that tested successfully via the cockpit's Check Connection button still failed from the actual CAP app because the app's deployment manifest had never actually included the Destination service binding — adding the binding fixed it immediately with no changes to the destination configuration itself.",
    interviewTip:
      "If asked to debug this exact scenario, immediately distinguishing what the cockpit test proves (destination config is valid) from what it doesn't (app's own wiring) shows precise, structured troubleshooting instinct.",
    followupQuestions: [
      "How would you verify the app's deployment manifest actually includes the Destination service binding?",
      "What error would the app show specifically if the destination name it requests doesn't match exactly?",
      "Would this same distinction apply to testing an on-prem destination via the cockpit versus the actual app?",
    ],
    commonMistakes: [
      "Assuming a passing cockpit connection test proves the app itself can successfully reach the destination.",
      "Re-testing the destination repeatedly via the cockpit instead of checking the app's own binding/wiring.",
    ],
    importantPoints: [
      "The cockpit's Check Connection test validates only the destination configuration, not the app's runtime path.",
      "Check the app's actual Destination service binding, exact name match, and read permissions separately.",
      "A passing cockpit test rules out the destination itself, not the app's connection to it.",
    ],
    revisionNotes: "Cockpit Check Connection passing ≠ app can reach the destination — separately check app's Destination service binding, exact name match in code, and read access on the config.",
  },
  {
    id: "scen-q19",
    topic: "Destination Missing",
    prompt: "A destination that worked fine in Dev fails with 'destination not found' after promoting the exact same build to QA. What's the likely cause, given the build-once-deploy-many-times pattern?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["destination-missing", "environment-config", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Since the build artifact is identical between Dev and QA (build once, deploy many times), the destination configuration itself must not exist yet in the QA subaccount — environment-specific destinations need to be configured separately per subaccount, and this was likely simply missed when setting up QA, rather than being a code or build issue.",
    detailedAnswer:
      "Given the earlier build-once-deploy-many-times principle, the exact same application code and configuration references are deployed to both Dev and QA — so if it worked in Dev, the application's own code/references aren't the problem. The remaining explanation is environment-specific configuration: destinations are typically configured per-subaccount (as covered for supporting different environments without code changes), and this particular destination simply wasn't created yet in the QA subaccount when it was set up — an easy, common gap when promoting to a new environment for the first time, especially if the destination was added to Dev after QA's initial setup and nobody remembered to replicate it. The fix is straightforward: create the matching destination in QA with the same name the app expects, pointing at QA's actual target system.",
    hindiExplanation:
      "Given earlier build-once-deploy-many-times principle, exact same application code aur configuration references Dev aur QA dono mein deploy hote hain — isliye agar Dev mein kaam kiya, application ka apna code/references problem nahi hain. Baaki explanation environment-specific configuration hai: destinations typically per-subaccount configure hote hain, aur ye particular destination simply QA subaccount mein abhi create nahi hua tha jab wo set up hua — ek easy, common gap jab pehli baar ek naye environment mein promote karte ho, especially agar destination Dev mein QA ke initial setup ke baad add hua ho aur koi replicate karna bhool gaya.",
    interviewExplanation:
      "I'd apply the build-once-deploy-many-times reasoning directly: 'Since the exact same build goes to both Dev and QA, if it worked in Dev, the app's own code isn't the problem — this is environment-specific configuration. Destinations are configured per-subaccount, and this one simply wasn't created yet in QA — a common gap when a destination gets added to Dev after QA's initial setup and nobody remembers to replicate it there. The fix is just creating the matching destination in QA, same name, pointing at QA's actual target.'",
    diagramNote:
      "'Same build deployed to Dev (works) and QA (fails)' → 'build-once principle: app code identical, not the problem' → 'Likely cause: destination not yet created in QA subaccount' → 'Fix: create matching destination in QA'.",
    diagramMermaid: `flowchart TD
    A["Same build: Dev (works),<br/>QA (fails)"] --> B["build-once principle:<br/>app code identical, not the issue"]
    B --> C["Likely: destination not yet<br/>created in QA subaccount"]
    C --> D["Fix: create matching<br/>destination in QA"]`,
    realProjectExample:
      "A newly added destination that worked immediately in Dev failed in QA purely because the QA subaccount's destination configuration hadn't been updated to match — creating the same destination in QA with QA's actual target URL resolved it with zero code or build changes needed.",
    interviewTip:
      "If asked to debug an environment-specific failure like this, explicitly reasoning from the build-once-deploy-many-times principle (ruling out the code/build as the cause) shows you connect this scenario back to the broader DevOps pattern rather than treating it as an isolated puzzle.",
    followupQuestions: [
      "How would you audit that every environment has the destinations it needs before a promotion?",
      "Would you automate destination configuration as part of the environment setup process?",
      "How does this relate to the earlier discussion of supporting different environments via consistent destination naming?",
    ],
    commonMistakes: [
      "Suspecting a code or build issue when the build-once-deploy-many-times pattern already rules that out.",
      "Not maintaining a checklist or automated process ensuring new destinations get replicated across all environments.",
    ],
    importantPoints: [
      "Build-once-deploy-many-times means identical code/references across Dev and QA — rules out the app itself.",
      "Destinations are configured per-subaccount, so a new one must be explicitly created in each environment.",
      "A common gap is forgetting to replicate a newly added destination into environments beyond where it was first created.",
    ],
    revisionNotes: "Same build fails in QA but works in Dev with a 'destination not found' error = destination simply not yet created in QA subaccount (env-specific config), not a code/build issue — build-once principle rules that out.",
  },
  {
    id: "scen-q20",
    topic: "Production Issues",
    prompt: "After resolving an incident, you're asked to write a post-mortem. What makes a post-mortem actually useful versus a box-checking exercise?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["production-issues", "post-mortem"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A useful post-mortem is blameless (focused on process/system gaps, not individual fault), includes a specific, honest timeline of what actually happened and when it was noticed, and produces concrete, assigned, trackable action items addressing root causes — not just a vague 'we'll be more careful' with no owner or follow-through.",
    detailedAnswer:
      "A box-checking post-mortem restates the incident timeline and closes with generic, unassigned intentions ('we should improve monitoring') that nobody actually follows up on — genuinely useless despite the document existing. A useful one is deliberately blameless — focused on what gap in process, tooling, or system design allowed the issue to happen and go undetected for as long as it did, not on which individual made a mistake, since blame culture actively discourages the honest reporting needed to actually learn from incidents. It includes a specific, honest timeline (when did the issue actually start, when was it detected, how long did detection take, when was it resolved) since the detection gap specifically often reveals a genuine monitoring/alerting improvement opportunity. And critically, it converts findings into concrete, individually-owned, trackable action items (not vague aspirations) — 'add an alert for X, owned by Y, by Z date' — that get tracked to actual completion, not just written down and forgotten.",
    hindiExplanation:
      "Ek box-checking post-mortem incident timeline restate karti hai aur generic, unassigned intentions ('humein monitoring improve karni chahiye') pe close hoti hai jinhe koi actually follow up nahi karta — genuinely useless chahe document exist kare. Ek useful wala deliberately blameless hota hai — us gap pe focus karta hai jo process, tooling, ya system design mein tha jisne issue ko hone diya, kisi individual ki mistake pe nahi, kyunki blame culture actively honest reporting ko discourage karti hai. Ye ek specific, honest timeline include karta hai, aur critically, findings ko concrete, individually-owned, trackable action items mein convert karta hai jo actual completion tak track hote hain.",
    interviewExplanation:
      "I'd contrast useful from box-checking: 'A box-checking post-mortem has generic, unowned intentions nobody follows up on. A useful one is deliberately blameless — focused on process/system gaps, not who made a mistake, since blame culture discourages the honest reporting needed to actually learn. It includes an honest timeline, especially the detection gap, which often reveals a real monitoring opportunity. And critically, it converts findings into specific, individually-owned, trackable action items — not vague aspirations — that get tracked to actual completion.'",
    diagramNote:
      "'Box-checking post-mortem: generic, unowned intentions, nobody follows up' vs 'Useful post-mortem: blameless, honest timeline, specific owned/trackable action items → actually tracked to completion'.",
    diagramMermaid: `flowchart LR
    A["Box-checking post-mortem"] --> B["Generic, unowned intentions,<br/>nobody follows up"]
    C["Useful post-mortem"] --> D["Blameless, honest timeline,<br/>specific owned action items"]
    D --> E["Tracked to actual completion"]`,
    realProjectExample:
      "A post-mortem's blameless focus on the actual detection gap (an issue that ran undetected for 40 minutes before anyone noticed) led directly to a specific, owned action item — adding a targeted alert — that was tracked and closed within a week, unlike an earlier post-mortem culture that produced vague 'improve monitoring' notes nobody ever acted on.",
    interviewTip:
      "If asked what makes a good post-mortem, naming blamelessness AND specific, owned, trackable action items (not just one or the other) shows a complete understanding of both the cultural and the practical/process aspects.",
    followupQuestions: [
      "How would you handle a post-mortem where the root cause genuinely was a specific person's mistake?",
      "What would you do if action items from a past post-mortem were never actually completed?",
      "How would you structure a post-mortem document itself — what sections would it include?",
    ],
    commonMistakes: [
      "Writing post-mortems that assign blame to individuals rather than focusing on process/system gaps.",
      "Ending a post-mortem with vague, unassigned intentions instead of specific, owned, trackable action items.",
    ],
    importantPoints: [
      "A useful post-mortem is blameless, focused on process/system gaps, not individual fault.",
      "Includes an honest timeline, especially around the detection gap.",
      "Converts findings into specific, individually-owned, trackable action items followed through to completion.",
    ],
    revisionNotes: "Useful post-mortem = blameless (process/system gaps, not individual fault) + honest timeline + specific owned/trackable action items actually followed through — not vague, unassigned intentions.",
  },
  {
    id: "scen-q21",
    topic: "Production Issues",
    prompt: "You discover during an incident that the runbook/documentation for this specific scenario is outdated and led you down the wrong path initially. How do you handle this in the moment and afterward?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["production-issues", "documentation"],
    estimatedMinutes: 2,
    expectedAnswer:
      "In the moment, abandon the outdated runbook and rely on direct investigation (logs, metrics, actual system state) rather than continuing to follow instructions you now know are wrong; afterward, update the runbook as a concrete post-incident action item, since an outdated runbook that misleads the next responder is itself a real operational risk worth fixing.",
    detailedAnswer:
      "In the moment, the priority is resolving the actual incident, so once a runbook is discovered to be wrong or outdated, continuing to follow it out of habit or completeness would be a mistake — pivot immediately to direct investigation based on actual current evidence (logs, metrics, system state) rather than trusting stale written instructions. This isn't a failure of the runbook concept — documentation naturally drifts out of date as systems evolve — but it is a signal worth acting on: after the incident is resolved, updating that specific runbook should be a genuine action item (not just a mental note), since the next person to hit this same scenario, potentially under even more time pressure, deserves accurate guidance rather than repeating the same wrong-path detour you just experienced.",
    hindiExplanation:
      "Us moment mein, priority actual incident resolve karna hai, isliye ek baar runbook galat ya outdated discover ho jaaye, use follow karna continue karna habit ya completeness ki wajah se ek mistake hogi — turant direct investigation pe pivot karo actual current evidence (logs, metrics, system state) ke aadhar pe, stale written instructions trust karne ki jagah. Ye runbook concept ki failure nahi hai — documentation naturally outdated ho jaati hai jaise systems evolve hote hain — lekin ye action lene layak signal hai: incident resolve hone ke baad, us specific runbook ko update karna ek genuine action item hona chahiye.",
    interviewExplanation:
      "I'd separate the in-the-moment response from the follow-up: 'In the moment, once I know the runbook's wrong, I'd abandon it and pivot to direct investigation based on actual current evidence — logs, metrics, system state — rather than continuing to trust stale instructions. Afterward, updating that specific runbook is a genuine action item, not just a mental note — documentation naturally drifts, but the next responder, maybe under more pressure than me, deserves accurate guidance instead of repeating the same wrong detour.'",
    diagramNote:
      "'Runbook discovered outdated mid-incident' → in the moment: 'abandon it, pivot to direct investigation (logs/metrics/state)' → afterward: 'update the runbook as a concrete post-incident action item'.",
    diagramMermaid: `flowchart TD
    A["Runbook discovered<br/>outdated mid-incident"] --> B["In the moment: abandon it,<br/>pivot to direct investigation"]
    A --> C["Afterward: update the runbook<br/>as a concrete action item"]`,
    realProjectExample:
      "A runbook's outdated instructions for a database failover scenario cost ten minutes before being abandoned in favor of direct investigation; the post-incident update to that runbook, tracked as a specific action item, ensured the next responder six months later resolved the same scenario in minutes instead of repeating the same detour.",
    interviewTip:
      "If asked how you'd handle discovering bad documentation mid-incident, explicitly stating you'd abandon it immediately (not waste more time trying to reconcile it) shows good in-the-moment judgment, while committing to updating it afterward shows follow-through discipline.",
    followupQuestions: [
      "How would you build a process to keep runbooks from going stale in the first place?",
      "Would you flag the outdated runbook immediately, or wait until the post-mortem?",
      "How would you decide which runbooks are high-priority to review regularly versus lower-risk ones?",
    ],
    commonMistakes: [
      "Continuing to follow a runbook out of habit even after discovering it's outdated and misleading.",
      "Not treating a runbook update as a concrete, tracked action item after the incident, letting the same gap persist.",
    ],
    importantPoints: [
      "Abandon an outdated runbook immediately once discovered mid-incident, relying on direct investigation instead.",
      "Documentation naturally drifts out of date — this isn't itself a failure, but should be acted on afterward.",
      "Updating the specific runbook should be a concrete, tracked post-incident action item.",
    ],
    revisionNotes: "Discovering a bad runbook mid-incident: abandon it immediately, pivot to direct investigation — then update it as a concrete post-incident action item so the next responder isn't misled the same way.",
  },
  {
    id: "scen-q22",
    topic: "Authentication Failure",
    prompt: "After deploying an update to XSUAA's xs-security.json, all users start getting authorization errors even though they were authenticating fine before. What would you check?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["authentication-failure", "xs-security-json", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Since users can still authenticate but now fail authorization, the issue is specific to scope/role changes in the xs-security.json update — check whether a role template's scope was accidentally renamed or removed (breaking existing Role Collections that reference the old scope name) rather than a broader authentication/XSUAA health problem.",
    detailedAnswer:
      "The distinction between authentication and authorization (covered earlier) is the key diagnostic clue here: if users are authenticating successfully (getting a valid token) but then failing at the authorization check, the problem is specific to scopes/roles, not XSUAA's core authentication function. Since this started right after an xs-security.json deployment, the most likely cause is that update accidentally renamed, removed, or restructured a scope that existing Role Collections still reference by the old name — existing users' assigned Role Collections now point to a scope that no longer exists (or exists under a different name) in the app's current security configuration, causing every authorization check depending on it to fail. The fix is comparing the old and new xs-security.json to identify exactly what scope name changed, then either reverting that specific change or updating the affected Role Collections to reference the new name.",
    hindiExplanation:
      "Authentication aur authorization ke beech distinction (jo pehle cover hui) yahan key diagnostic clue hai: agar users successfully authenticate ho rahe hain (ek valid token pa rahe hain) lekin phir authorization check pe fail ho rahe hain, problem specifically scopes/roles mein hai, XSUAA ke core authentication function mein nahi. Kyunki ye ek xs-security.json deployment ke turant baad shuru hua, sabse likely cause hai ki us update ne accidentally ek scope rename, remove, ya restructure kar diya jise existing Role Collections abhi bhi old name se reference karte hain.",
    interviewExplanation:
      "I'd use the authentication-versus-authorization distinction as the key clue: 'Since users still authenticate but fail authorization, this is scope/role-specific, not core XSUAA health. Given it started right after an xs-security.json deploy, the likely cause is that update accidentally renamed or removed a scope existing Role Collections still reference by the old name — every authorization check depending on it now fails. I'd diff the old and new xs-security.json to find exactly what scope name changed, then either revert it or update the affected Role Collections.'",
    diagramNote:
      "'Users authenticate fine, fail authorization' → 'scope/role-specific issue, not XSUAA health' → 'Diff old vs new xs-security.json' → 'Find renamed/removed scope' → 'Existing Role Collections still reference old name → all authz checks fail'.",
    diagramMermaid: `flowchart TD
    A["Users authenticate fine,<br/>fail authorization"] --> B["Scope/role-specific issue"]
    B --> C["Diff old vs new xs-security.json"]
    C --> D["Find renamed/removed scope"]
    D --> E["Existing Role Collections still<br/>reference old name → authz fails"]`,
    realProjectExample:
      "A well-intentioned xs-security.json cleanup renamed a scope from 'OrderRead' to 'Order.Read' for consistency, breaking every existing Role Collection still referencing the old 'OrderRead' name — diffing the two versions of the file immediately revealed the rename, and the fix was updating the affected Role Collections to the new scope name.",
    interviewTip:
      "If asked how a security configuration deployment could break existing users, explaining the authentication-versus-authorization distinction as your diagnostic lens (not just 'check the config') shows precise, structured troubleshooting grounded in real BTP security concepts.",
    followupQuestions: [
      "How would you diff two versions of xs-security.json to find exactly what changed?",
      "Would this same issue occur if only the scope's description changed, not its actual name?",
      "How would you test an xs-security.json change before deploying it to production to catch this kind of breakage?",
    ],
    commonMistakes: [
      "Investigating XSUAA's core health/authentication when the symptom (successful login, failed authorization) already points to a scope/role-specific issue.",
      "Not comparing the old and new xs-security.json to identify exactly what scope changed.",
    ],
    importantPoints: [
      "Successful authentication with failed authorization points specifically to a scope/role issue, not XSUAA health.",
      "A likely cause is a scope renamed/removed in the xs-security.json update, breaking existing Role Collection references.",
      "Diff the old and new configuration to find the exact change, then fix by reverting or updating references.",
    ],
    revisionNotes: "Auth succeeds, authorization fails right after an xs-security.json deploy = likely a renamed/removed scope breaking existing Role Collection references — diff old vs new config to find the exact change.",
  },
  {
    id: "scen-q23",
    topic: "Authentication Failure",
    prompt: "A partner integration using Client Credentials suddenly can't authenticate, but your own internal apps using the same XSUAA instance work fine. What would you investigate?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["authentication-failure", "client-credentials", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Since XSUAA itself is clearly healthy (internal apps work fine), the issue is scoped to that specific partner's service key/client credentials — check whether their client secret was rotated/expired, whether their specific service key was deleted or regenerated, or whether the scopes granted to their specific client changed, rather than investigating XSUAA broadly.",
    detailedAnswer:
      "The fact that internal apps authenticate successfully against the same XSUAA instance immediately rules out a platform-wide XSUAA health issue — the investigation should scope specifically to that one partner's client credentials configuration. Check: has their specific service key (containing their client ID/secret) been deleted or regenerated recently, perhaps during unrelated cleanup, invalidating the credentials they're still using? Has their client secret expired or been rotated as part of a security policy, with the new value not yet communicated to the partner? Have the scopes granted to their specific client been changed, restricting what they're now allowed to do even if their credentials themselves are still technically valid? This scoped investigation — specific to their one client configuration — is far more efficient than investigating XSUAA broadly, which the successful internal app authentication has already ruled out.",
    hindiExplanation:
      "Ye fact ki internal apps same XSUAA instance ke against successfully authenticate ho rahe hain turant ek platform-wide XSUAA health issue ko rule out kar deta hai — investigation specifically us ek partner ke client credentials configuration tak scope hona chahiye. Check karo: kya unki specific service key (jisme client ID/secret hai) recently delete ya regenerate hui, unrelated cleanup ke dauraan, jo unke abhi bhi use ho rahe credentials ko invalidate kar de? Kya unka client secret expire ya rotate hua ek security policy ke hisse ki tarah, naya value abhi tak partner ko communicate nahi hua?",
    interviewExplanation:
      "I'd immediately rule out XSUAA broadly: 'Since internal apps authenticate fine against the same XSUAA instance, this rules out a platform-wide health issue — I'd scope the investigation specifically to that partner's client credentials. Check whether their service key was deleted or regenerated during unrelated cleanup, whether their client secret expired or rotated without the new value reaching them, or whether the scopes granted to their specific client changed. This scoped investigation is far more efficient than re-checking XSUAA broadly, which the internal apps already ruled out.'",
    diagramNote:
      "'Internal apps work, one partner's Client Credentials fails on SAME XSUAA' → rules out platform-wide XSUAA issue → scope to: 'partner's service key deleted/regenerated', 'client secret expired/rotated', 'scopes granted to that client changed'.",
    diagramMermaid: `flowchart TD
    A["Internal apps work, one partner<br/>fails on SAME XSUAA"] --> B["Rules out platform-wide<br/>XSUAA issue"]
    B --> C["Partner's service key<br/>deleted/regenerated?"]
    B --> D["Client secret<br/>expired/rotated?"]
    B --> E["Scopes granted to that<br/>client changed?"]`,
    realProjectExample:
      "A partner integration's authentication failure was traced to their specific service key having been accidentally deleted during an unrelated cleanup of unused service instances — recreating their service key and communicating the new credentials to the partner resolved it, with zero impact on any internal app throughout.",
    interviewTip:
      "If asked to debug this exact scenario, explicitly using the 'internal apps work fine on the same XSUAA' fact to immediately scope out platform-wide causes demonstrates efficient, evidence-driven diagnostic reasoning.",
    followupQuestions: [
      "How would you audit which service keys are actually in active use before deleting any as 'cleanup'?",
      "How would you communicate a credential rotation to an external partner without causing an unplanned outage?",
      "Would this same scoping logic apply if two different partners both failed but internal apps worked fine?",
    ],
    commonMistakes: [
      "Investigating XSUAA's platform health broadly when internal apps working fine already rules that out.",
      "Not considering that unrelated cleanup activity (deleting 'unused' service keys) might have accidentally affected a partner's active credentials.",
    ],
    importantPoints: [
      "Internal apps authenticating successfully against the same XSUAA rules out a platform-wide issue.",
      "Scope investigation specifically to that partner's service key/client credentials.",
      "Common causes: accidental service key deletion/regeneration, secret rotation without communication, or scope changes.",
    ],
    revisionNotes: "One partner's Client Credentials fails, internal apps work fine on same XSUAA = not a platform issue — scope to that partner's specific service key (deleted/regenerated?), secret rotation, or scope changes.",
  },
  {
    id: "scen-q24",
    topic: "Token Expired",
    prompt: "Your mobile app's users complain of being logged out far more frequently than web users on the same backend. What would you investigate specific to mobile?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["token-expired", "mobile", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Check whether the mobile app's token/refresh-token storage is being cleared more aggressively than expected (OS-level background app termination, secure storage eviction policies, or the app not properly persisting the refresh token across app restarts), since mobile OS environments have different lifecycle and storage behaviors than a continuously-running browser tab.",
    detailedAnswer:
      "Web and mobile clients face genuinely different platform behaviors around app lifecycle and storage, even calling the identical backend with the identical token expiry/refresh configuration. A mobile OS might aggressively terminate a backgrounded app to reclaim memory, and if the refresh token isn't properly persisted to durable, OS-level secure storage (rather than just in-memory), that termination effectively logs the user out, since there's no refresh token available on next launch to silently re-authenticate with. Similarly, some secure storage mechanisms have their own eviction policies or require re-authentication under certain OS security conditions (a passcode change, biometric re-enrollment) that a web browser's storage model doesn't have an equivalent of. The investigation should focus specifically on how and where the mobile app persists its refresh token, and under what conditions the mobile OS might clear or invalidate that storage, rather than assuming the backend's token configuration itself is somehow platform-aware or different for mobile.",
    hindiExplanation:
      "Web aur mobile clients genuinely different platform behaviors face karte hain app lifecycle aur storage ke around, chahe identical backend ko identical token expiry/refresh configuration se call karein. Ek mobile OS ek backgrounded app ko aggressively terminate kar sakta hai memory reclaim karne ke liye, aur agar refresh token properly durable, OS-level secure storage mein persist nahi hua (sirf in-memory ki jagah), wo termination effectively user ko logout kar deta hai, kyunki next launch pe koi refresh token available nahi hota silently re-authenticate karne ke liye.",
    interviewExplanation:
      "I'd point to the different platform lifecycle behavior: 'Mobile and web hit the identical backend and token config, but mobile OS environments have genuinely different lifecycle and storage behavior. A mobile OS might aggressively terminate a backgrounded app, and if the refresh token isn't persisted to durable, OS-level secure storage — just kept in-memory — that termination effectively logs the user out, since there's nothing to silently re-authenticate with on next launch. I'd investigate specifically how and where the mobile app persists its refresh token, not the backend's token config, which is identical for both platforms.'",
    diagramNote:
      "'Web: continuously-running browser tab, refresh token in browser storage' vs 'Mobile: OS can aggressively terminate backgrounded app' → 'If refresh token not persisted to durable secure storage → termination = effective logout, no silent re-auth possible on relaunch'.",
    diagramMermaid: `flowchart TD
    A["Mobile OS terminates<br/>backgrounded app"] --> B{"Refresh token persisted<br/>to durable secure storage?"}
    B -->|"No — in-memory only"| C["Effective logout —<br/>no silent re-auth on relaunch"]
    B -->|"Yes — durable storage"| D["Silent re-auth works fine"]`,
    realProjectExample:
      "Mobile users' frequent logouts were traced to the app keeping its refresh token only in memory rather than the device's secure keychain storage, meaning any OS-initiated background termination (common under memory pressure) effectively logged users out — persisting the refresh token to durable secure storage resolved the issue, matching the reliability web users already experienced.",
    interviewTip:
      "If asked why the identical backend token configuration would produce different logout behavior on mobile versus web, focusing on client-side storage/lifecycle differences (not backend configuration) shows you correctly localize the problem to the actual differing variable.",
    followupQuestions: [
      "What's the appropriate secure storage mechanism for a refresh token on iOS versus Android?",
      "How would you test this hypothesis without waiting for real users to experience it?",
      "Would this same issue apply to a Progressive Web App (PWA) installed on a mobile home screen?",
    ],
    commonMistakes: [
      "Assuming the backend's token expiry configuration must be different or misconfigured for mobile, when it's actually identical.",
      "Not considering mobile OS-level app lifecycle behavior (background termination) as a client-side cause distinct from the backend.",
    ],
    importantPoints: [
      "Mobile OS environments have different app lifecycle and storage behavior than a continuously-running browser tab.",
      "A refresh token not persisted to durable, OS-level secure storage is lost on background termination.",
      "Investigate the mobile app's token persistence mechanism, not the backend's identical token configuration.",
    ],
    revisionNotes: "Mobile-specific frequent logout (same backend as web) = check refresh token persistence to durable OS secure storage, not in-memory only — mobile OS background termination can silently wipe an in-memory token.",
  },
  {
    id: "scen-q25",
    topic: "Destination Missing",
    prompt: "A destination worked fine for weeks, then suddenly started failing with no configuration changes on the BTP side at all. What would you suspect?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["destination-missing", "external-change", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Since nothing changed on the BTP side, the target system itself likely changed — its URL moved, its certificate expired or was rotated, its authentication requirements changed, or it's simply down — check the target system's own status and any recent changes on its side rather than continuing to investigate BTP-side configuration that hasn't been touched.",
    detailedAnswer:
      "A destination's configuration being genuinely unchanged rules out an entire category of causes (typos, accidental deletion, binding issues) that would otherwise be the first things to check — the investigation should shift entirely to the target system's side. Common causes: the target system's URL changed (a migration, a DNS update) without the destination being updated to match; a TLS certificate on the target system expired or was rotated in a way that broke the destination's trust validation; the target system's own authentication requirements changed (a new API key requirement, a deprecated auth method); or the target system is simply experiencing its own outage, unrelated to BTP entirely. This reframes the investigation from 'what's wrong with our destination configuration' to 'what changed on the other end', which is the correct question once BTP-side stability is confirmed.",
    hindiExplanation:
      "Ek destination ki configuration genuinely unchanged hone se ek poori category of causes rule out ho jaati hai (typos, accidental deletion, binding issues) jo otherwise pehle check karne layak hoti — investigation ko entirely target system ki side pe shift hona chahiye. Common causes: target system ka URL change hua (ek migration, ek DNS update) bina destination ko match karne ke liye update kiye; target system pe ek TLS certificate expire ya rotate hua jisne destination ki trust validation break kar di; target system ki apni authentication requirements change hui; ya target system simply apna khud ka outage experience kar raha hai, BTP se unrelated.",
    interviewExplanation:
      "I'd shift the investigation to the other end: 'Since the destination configuration genuinely didn't change, that rules out typos, deletion, or binding issues on our side — the investigation should shift entirely to the target system. I'd check whether their URL changed without our destination being updated, whether their TLS certificate expired or rotated, whether their auth requirements changed, or whether they're simply experiencing their own outage unrelated to BTP entirely.'",
    diagramNote:
      "'Destination config genuinely unchanged on BTP side' → rules out our-side causes → 'Investigate target system side: URL changed, TLS cert expired/rotated, auth requirements changed, target's own outage'.",
    diagramMermaid: `flowchart TD
    A["Destination config<br/>genuinely unchanged"] --> B["Rules out our-side causes"]
    B --> C["Target URL changed?"]
    B --> D["Target TLS cert<br/>expired/rotated?"]
    B --> E["Target's own outage?"]`,
    realProjectExample:
      "A destination that had worked reliably for months suddenly failed with no BTP-side changes at all; investigating the target system's side revealed they'd rotated their TLS certificate to a new certificate authority our destination's trust configuration didn't yet recognize — updating the trust configuration to include the new CA resolved it.",
    interviewTip:
      "If asked how you'd diagnose an issue with no changes on your own side, explicitly framing the investigation as 'what changed on the other end' rather than repeatedly re-checking your own unchanged configuration shows efficient, evidence-driven reasoning.",
    followupQuestions: [
      "How would you monitor a target system's certificate expiry proactively, even though it's outside your control?",
      "How would you communicate with a partner/vendor to find out what changed on their side?",
      "Would you set up alerting specifically for this kind of external-change scenario?",
    ],
    commonMistakes: [
      "Continuing to re-investigate BTP-side destination configuration after confirming nothing there actually changed.",
      "Not considering that the target system itself might have changed independently of anything on the BTP side.",
    ],
    importantPoints: [
      "Confirmed-unchanged BTP-side configuration rules out an entire category of common destination-issue causes.",
      "Shift investigation to the target system's side: URL changes, certificate rotation, auth changes, its own outage.",
      "The right question becomes 'what changed on the other end', not 'what's wrong with our config'.",
    ],
    revisionNotes: "Destination fails with NO BTP-side config change = investigate the target system's side instead: URL change, TLS cert rotation, auth requirement change, or their own outage.",
  },
  {
    id: "scen-q26",
    topic: "Deployment Failed",
    prompt: "An MTA deployment fails specifically at the HDI container schema deployment step. What are the most likely root causes?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["deployment-failed", "hdi", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Common causes at this specific step include an incompatible/unsafe schema change the HDI deployer refuses to apply automatically (like a NOT NULL addition against existing NULL data), insufficient HANA quota/resources for the schema operation, or a conflicting concurrent deployment/lock on the same container — check the deployer's specific error message first, since it usually names the exact incompatible change or resource issue directly.",
    detailedAnswer:
      "Because this failure is scoped specifically to the schema deployment step (not an earlier or later step in the overall MTA process), the cause is almost certainly schema-specific rather than a general application/config issue. The most common causes, exactly as covered for safe versus unsafe schema evolution: an ambiguous or unsafe schema change (a NOT NULL constraint added against a column with existing NULL values, a type change existing data can't cleanly convert to) that the HDI deployer correctly refuses to apply automatically rather than risk data corruption; insufficient quota or resources in the target HANA instance for the schema operation itself; or a conflicting lock from another concurrent deployment attempting to modify the same HDI container simultaneously. The deployer's actual error message is usually quite specific about which of these it is — reading that message carefully first, rather than guessing, is the efficient starting point.",
    hindiExplanation:
      "Kyunki ye failure specifically schema deployment step tak scoped hai, cause almost certainly schema-specific hai, general application/config issue nahi. Sabse common causes, exactly jaise safe versus unsafe schema evolution ke liye cover hue: ek ambiguous ya unsafe schema change (ek NOT NULL constraint add hui existing NULL values wale column pe) jise HDI deployer correctly automatically apply karne se refuse karta hai data corruption ka risk lene ki jagah; target HANA instance mein insufficient quota ya resources schema operation ke liye; ya same HDI container ko simultaneously modify karne ki koshish kar rahi ek doosri concurrent deployment se ek conflicting lock.",
    interviewExplanation:
      "I'd connect it directly to the safe-versus-unsafe schema change concept: 'Since the failure is scoped specifically to the schema deployment step, it's almost certainly schema-specific. The most common causes are an unsafe schema change, like a NOT NULL addition against existing NULL data, that the deployer correctly refuses to risk applying automatically; insufficient HANA quota for the operation; or a conflicting lock from a concurrent deployment on the same container. I'd read the deployer's actual error message first — it's usually specific about which of these it is.'",
    diagramNote:
      "'MTA deployment fails at HDI schema step' → check: 'Unsafe schema change (NOT NULL on existing NULLs)' / 'Insufficient HANA quota/resources' / 'Conflicting concurrent deployment lock' → 'Deployer error message usually names the specific one'.",
    diagramMermaid: `flowchart TD
    A["MTA fails at HDI<br/>schema deployment step"] --> B["Unsafe schema change<br/>e.g. NOT NULL on NULLs"]
    A --> C["Insufficient HANA<br/>quota/resources"]
    A --> D["Conflicting concurrent<br/>deployment lock"]`,
    realProjectExample:
      "An MTA deployment failing at the HDI schema step showed an explicit deployer error naming a NOT NULL constraint conflicting with existing NULL rows in a specific column — adding an explicit migration step to backfill a default value for those rows before the constraint was added resolved the deployment.",
    interviewTip:
      "If asked to debug a schema-deployment-step failure specifically, connecting it back to the earlier safe-versus-unsafe schema change concept (rather than treating it as a generic deployment error) shows you retain and apply cross-topic BTP knowledge.",
    followupQuestions: [
      "How would you write an explicit migration step to handle an unsafe schema change like this?",
      "How would you detect a conflicting concurrent deployment before it causes a lock failure?",
      "What HANA quota metric would you check if resource exhaustion is suspected?",
    ],
    commonMistakes: [
      "Treating an HDI schema deployment failure as a generic error without reading the deployer's specific message first.",
      "Not connecting this failure back to the safe-versus-unsafe schema change concepts covered for HDI deployment.",
    ],
    importantPoints: [
      "A schema-step-specific failure is almost certainly schema-specific, not a general app/config issue.",
      "Common causes: unsafe schema changes, insufficient HANA quota, or a conflicting concurrent deployment lock.",
      "The deployer's error message is usually specific — read it first rather than guessing.",
    ],
    revisionNotes: "MTA failure at HDI schema step = check for unsafe schema change (NOT NULL on existing NULLs), insufficient HANA quota, or a conflicting concurrent deployment lock — read the deployer's specific error message first.",
  },
  {
    id: "scen-q27",
    topic: "Deployment Failed",
    prompt: "A deployment that always succeeds in Dev and QA fails only in Prod, with an error suggesting insufficient memory/quota. How would you approach this?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["deployment-failed", "quota", "environment-differences"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Since the same build succeeds elsewhere (build-once principle rules out the artifact itself), this is an environment-specific resource/quota configuration difference — check Prod's actual configured memory/quota limits against what Dev/QA have, and confirm Prod's vars file or resource configuration wasn't accidentally left more restrictive than the lower environments.",
    detailedAnswer:
      "Given the same artifact deploys successfully to Dev and QA, the build itself isn't the problem — this is squarely an environment-specific configuration difference, most likely in how memory/resources are allocated for that specific deployment target. Check Prod's actual configured quota/memory limits (in the subaccount's entitlements, or the app's specific memory allocation in its manifest/vars file) against what Dev and QA have — it's common for Prod's environment-specific vars file to have been set up with a different (sometimes accidentally more restrictive) resource allocation than the lower environments, especially if Prod's configuration was set up independently rather than derived consistently from the same template as Dev/QA. Confirming the actual configured values side by side usually reveals the discrepancy directly, rather than needing deep application-level debugging.",
    hindiExplanation:
      "Given same artifact Dev aur QA mein successfully deploy hota hai, build khud problem nahi hai — ye squarely ek environment-specific configuration difference hai, most likely us specific deployment target ke liye memory/resources kaise allocate hote hain mein. Prod ke actual configured quota/memory limits check karo (subaccount ke entitlements mein, ya app ki specific memory allocation manifest/vars file mein) Dev aur QA ke against — ye common hai ki Prod ki environment-specific vars file ek different (kabhi kabhi accidentally more restrictive) resource allocation ke saath set up hui ho lower environments se.",
    interviewExplanation:
      "I'd apply the build-once reasoning again: 'Since the same artifact deploys fine to Dev and QA, the build isn't the problem — this is an environment-specific resource configuration difference. I'd check Prod's actual configured memory/quota limits against Dev and QA's — it's common for Prod's vars file to have been set up independently, sometimes with an accidentally more restrictive allocation. Comparing the actual configured values side by side usually reveals the discrepancy directly.'",
    diagramNote:
      "'Same artifact: Dev/QA succeed, Prod fails on quota/memory' → 'build-once rules out the artifact itself' → 'Compare Prod's configured memory/quota vs Dev/QA' → 'Prod's vars file likely accidentally more restrictive'.",
    diagramMermaid: `flowchart TD
    A["Same artifact: Dev/QA succeed,<br/>Prod fails on quota"] --> B["build-once rules out<br/>the artifact itself"]
    B --> C["Compare Prod's configured<br/>memory/quota vs Dev/QA"]
    C --> D["Prod's vars file likely<br/>accidentally more restrictive"]`,
    realProjectExample:
      "A Prod-only deployment failure was traced to Prod's environment-specific vars file specifying a smaller memory allocation than Dev/QA, set independently during initial Prod environment setup rather than derived from the same base template — aligning it to the intended, larger production memory allocation resolved the failure.",
    interviewTip:
      "If asked to debug an environment-specific-only failure, reasoning explicitly from the build-once-deploy-many-times principle to rule out the artifact first (before investigating environment config) shows structured, principle-driven troubleshooting.",
    followupQuestions: [
      "How would you prevent Prod's configuration from drifting inconsistently from Dev/QA in the first place?",
      "What subaccount-level entitlement would you check if the app-level memory setting looks correct but deployment still fails?",
      "Would you increase Prod's quota immediately, or first confirm this is genuinely a legitimate need versus a misconfiguration?",
    ],
    commonMistakes: [
      "Investigating the application code/build for an environment-specific-only failure when build-once already rules that out.",
      "Not comparing actual configured resource values side by side across environments to spot the discrepancy directly.",
    ],
    importantPoints: [
      "Same artifact succeeding elsewhere rules out the build itself — this is environment-specific configuration.",
      "Compare Prod's actual configured memory/quota against Dev/QA to find the discrepancy.",
      "Prod's vars file being set up independently (rather than derived from the same template) is a common source of drift.",
    ],
    revisionNotes: "Same build fails only in Prod on quota/memory = environment-specific config difference (build-once rules out the artifact) — compare Prod's actual configured resources against Dev/QA to find the discrepancy.",
  },
  {
    id: "scen-q28",
    topic: "Deployment Failed",
    prompt: "A teammate suggests just re-running a failed deployment repeatedly until it eventually succeeds, since it 'sometimes just works'. How would you respond?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["deployment-failed", "reliability-culture"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Push back on this as a practice — a deployment that intermittently succeeds/fails on retry without any actual change usually indicates a real underlying issue (a race condition, a resource that's sometimes available and sometimes not, a flaky dependency) that retrying masks rather than fixes, and this pattern will likely resurface at a worse moment (like during an urgent production release) if not actually diagnosed.",
    detailedAnswer:
      "This mirrors the earlier discussion of flaky tests — 'sometimes it just works on retry' without any actual change is a symptom worth investigating, not something to shrug off as normal. If a deployment intermittently fails with no code/config difference between attempts, that points to something genuinely non-deterministic: a race condition in resource provisioning, a downstream dependency (like a HANA quota check or a certificate service) that's occasionally slow or briefly unavailable, or a timing-sensitive step that usually but not always completes in time. Blindly retrying until it works masks this underlying issue rather than fixing it, and — just like a flaky test — this pattern doesn't go away on its own; it tends to resurface at the worst possible moment, like during a time-pressured emergency hotfix deployment when 'just retry it a few times' is a much riskier approach than it seems during routine, unpressured deployments.",
    hindiExplanation:
      "Ye earlier flaky tests discussion ko mirror karta hai — 'sometimes it just works on retry' bina kisi actual change ke ek symptom hai jise investigate karna chahiye, normal maan kar shrug off karna nahi. Agar ek deployment intermittently fail hoti hai bina attempts ke beech kisi code/config difference ke, ye kuch genuinely non-deterministic point karta hai: resource provisioning mein ek race condition, ek downstream dependency jo occasionally slow ya briefly unavailable hai, ya ek timing-sensitive step jo usually lekin hamesha nahi time pe complete hoti hai. Blindly retry karna jab tak kaam na kare is underlying issue ko mask karta hai fix karne ki jagah.",
    interviewExplanation:
      "I'd push back, drawing the parallel to flaky tests: 'This mirrors flaky tests — sometimes-works-on-retry without any actual change usually means something genuinely non-deterministic, like a race condition or a dependency that's occasionally slow. Blindly retrying masks that rather than fixing it, and it tends to resurface at the worst moment — like during an urgent hotfix deployment, where retry-until-it-works is a much riskier gamble than it seems during routine deployments. I'd want to actually diagnose the pattern.'",
    diagramNote:
      "'Deployment intermittently fails, retry-until-success suggested' → mirrors flaky test problem → 'Points to real non-deterministic issue (race condition, flaky dependency)' → 'Retrying masks it, risks resurfacing during a high-pressure emergency deployment'.",
    diagramMermaid: `flowchart TD
    A["Deployment intermittently<br/>fails, retry suggested"] --> B["Mirrors flaky test problem"]
    B --> C["Real non-deterministic issue:<br/>race condition, flaky dependency"]
    C --> D["Retrying masks it —<br/>risks resurfacing during emergency deploy"]`,
    realProjectExample:
      "A deployment that 'usually just needed a retry or two' was eventually diagnosed as a race condition where a resource provisioning step occasionally completed just after the dependent module's deployment attempt began — fixing the actual ordering/wait logic eliminated the need for retries entirely, avoiding what could have been a much riskier surprise during a future urgent release.",
    interviewTip:
      "If asked how you'd respond to a teammate's 'just retry it' suggestion, explicitly drawing the parallel to flaky test culture (rather than treating it as an unrelated, separate issue) shows you connect this as the same underlying engineering discipline principle.",
    followupQuestions: [
      "How would you actually investigate an intermittently-failing deployment to find its root cause?",
      "What would a race condition in resource provisioning during deployment actually look like?",
      "Is there ever a legitimate reason to accept an occasional deployment retry, and how would you distinguish that from masking a real issue?",
    ],
    commonMistakes: [
      "Accepting 'just retry until it works' as a normal, acceptable deployment practice without investigating.",
      "Not recognizing this as the same underlying pattern as flaky test culture, which erodes reliability over time.",
    ],
    importantPoints: [
      "Intermittent deployment failure resolved by blind retrying usually indicates a genuine non-deterministic issue.",
      "Retrying masks the root cause rather than fixing it, mirroring the flaky-test-culture problem.",
      "This pattern tends to resurface at the worst possible moment — an urgent, high-pressure deployment.",
    ],
    revisionNotes: "Don't accept 'just retry until it works' for deployments — mirrors flaky test culture, masks a real non-deterministic issue (race condition, flaky dependency) that will resurface at a worse, high-pressure moment.",
  },
  {
    id: "scen-q29",
    topic: "Deployment Failed",
    prompt: "A deployment succeeds but the new version immediately shows errors that the old version never had, even though all automated tests passed before deploying. What would you investigate?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["deployment-failed", "test-gap", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Since automated tests passed, the gap is likely something tests don't cover — an environment-specific configuration difference between the test environment and where it's now actually running, a data condition present in real production data but not in test fixtures, or a dependency/integration behavior only observable against real external systems the test suite mocked or didn't exercise.",
    detailedAnswer:
      "Passing automated tests doesn't guarantee production correctness if the tests don't actually exercise the specific conditions now causing errors — this is a real, common gap worth systematically investigating rather than being surprised by. Common causes: an environment-specific configuration difference (a feature flag, a connection string, a resource limit) that differs between the test environment and actual production, meaning tests validated behavior under conditions that don't match where the code now runs; a data condition present in real production data (an edge case, an unusual but legitimate value) that test fixtures simply didn't include, since synthetic test data rarely perfectly represents the full messiness of real accumulated production data; or an integration/dependency behavior that tests mocked or stubbed out, meaning the mock's assumed behavior doesn't match what the real external dependency actually does in production. Identifying which of these three categories the new error falls into narrows the investigation quickly.",
    hindiExplanation:
      "Automated tests pass hona production correctness guarantee nahi karta agar tests actual conditions exercise nahi karte jo abhi errors cause kar rahi hain — ye ek real, common gap hai jise systematically investigate karna chahiye. Common causes: ek environment-specific configuration difference (ek feature flag, ek connection string, ek resource limit) jo test environment aur actual production ke beech differ karta hai; real production data mein present ek data condition (ek edge case, ek unusual but legitimate value) jise test fixtures simply include nahi karte; ya ek integration/dependency behavior jise tests mock ya stub kiya, matlab mock ka assumed behavior actual real external dependency jo production mein karta hai usse match nahi karta.",
    interviewExplanation:
      "I'd give the three-category framework: 'Passing tests doesn't guarantee production correctness if they don't exercise the actual conditions now failing. I'd check three things: an environment-specific config difference — a flag, connection string, or limit that differs between test and prod; a real production data condition test fixtures didn't include, since synthetic data rarely captures the full messiness of real data; or a dependency behavior tests mocked, where the mock's assumptions don't match what the real external system actually does. Identifying which category narrows the investigation quickly.'",
    diagramNote:
      "'Tests passed, but new version errors in production' → three categories to check: 'Environment config difference (test vs prod)', 'Real production data edge case tests didn't cover', 'Mocked dependency behavior doesn't match reality'.",
    diagramMermaid: `flowchart TD
    A["Tests passed,<br/>new version errors in prod"] --> B["Environment config<br/>difference (test vs prod)"]
    A --> C["Real production data<br/>edge case not in tests"]
    A --> D["Mocked dependency behavior<br/>doesn't match reality"]`,
    realProjectExample:
      "A new version passing every automated test still failed in production against a specific customer's records containing a legacy data format from years ago that no test fixture had ever included — adding that exact edge case to the test suite once found both fixed the immediate issue and prevented the same gap from recurring for other similarly-formatted legacy records.",
    interviewTip:
      "If asked 'how could this pass tests but still fail', the strong answer is a structured framework (environment config, real data edge cases, mocked dependencies) rather than a vague 'tests aren't perfect' — showing you know specifically where the gaps tend to live.",
    followupQuestions: [
      "How would you add production-like data conditions to your test fixtures without exposing real sensitive data?",
      "What would make you trust a mock's behavior versus testing against the real dependency in a staging environment?",
      "How would you decide whether to roll back immediately or attempt a forward fix once this gap is identified?",
    ],
    commonMistakes: [
      "Assuming tests passing means the code is fully correct, without considering the specific gaps that test suites commonly miss.",
      "Not systematically checking environment config differences, real data edge cases, and mocked dependencies as the three likely categories.",
    ],
    importantPoints: [
      "Passing tests doesn't guarantee production correctness if they don't exercise the actual failing conditions.",
      "Check environment-specific config differences, real production data edge cases, and mocked dependency assumptions.",
      "Identifying which category the failure falls into narrows the investigation quickly.",
    ],
    revisionNotes: "Tests passed but production still fails = check environment config differences (test vs prod), real production data edge cases tests didn't cover, or mocked dependency behavior not matching reality — three likely gap categories.",
  },
  {
    id: "scen-q30",
    topic: "CAP Crash",
    prompt: "A CAP app doesn't crash-loop, but a specific OData request consistently returns a 500 error. How would you narrow down the cause?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["cap-crash", "500-error", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Since the app itself is running fine (unlike a crash-loop), check the specific request's actual error in the logs (not just the generic 500), reproduce it with the exact same parameters to isolate whether it's data-specific or a genuine code bug, and check whether a custom handler for that specific entity/operation is throwing an unhandled exception.",
    detailedAnswer:
      "A consistent 500 on one specific request, with the app otherwise healthy, is a different diagnostic path than a crash-loop — the app process itself is fine, so the issue is isolated to that request's specific handling. First, get the actual exception from the logs for that specific request (the generic 500 response hides the real error from the client, but the server-side log should show the actual stack trace). Second, reproduce it directly with the exact same parameters to confirm it's consistently reproducible (versus an intermittent issue) and to narrow whether it's specific to certain data (a particular record triggering unexpected null-handling, for instance) or a genuine logic bug that would fail for any input hitting that code path. Third, check whether a custom event handler for that specific entity/operation (rather than the generated CRUD default) is where the unhandled exception is being thrown, since custom handlers are exactly where unexpected edge cases in application logic tend to surface.",
    hindiExplanation:
      "Ek specific request pe consistent 500, app otherwise healthy hone ke saath, ek different diagnostic path hai crash-loop se — app process khud fine hai, issue us request ki specific handling tak isolated hai. Pehle, us specific request ka actual exception logs se nikaalo. Doosra, exact same parameters se directly reproduce karo confirm karne ke liye ki ye consistently reproducible hai, aur narrow karne ke liye ki ye certain data specific hai ya ek genuine logic bug hai. Teesra, check karo kya us specific entity/operation ke liye ek custom event handler hai jaha unhandled exception throw ho raha hai.",
    interviewExplanation:
      "I'd note this is a different diagnostic path from a crash-loop: 'The app itself is healthy, so this is isolated to that request's specific handling. I'd get the actual exception from server-side logs for that request — the 500 hides it from the client. Then I'd reproduce it with the exact same parameters to confirm it's consistent and narrow whether it's data-specific or a genuine logic bug. Then I'd check whether a custom handler for that entity/operation is where the unhandled exception is actually thrown.'",
    diagramNote:
      "'App healthy, specific request 500s consistently' → 'Get actual exception from server-side logs' → 'Reproduce with exact same parameters' → 'Data-specific or genuine logic bug?' → 'Check custom handler for that entity/operation'.",
    diagramMermaid: `flowchart TD
    A["App healthy, one request<br/>consistently 500s"] --> B["Get actual exception<br/>from server-side logs"]
    B --> C["Reproduce with<br/>exact same parameters"]
    C --> D["Check custom handler<br/>for that entity/operation"]`,
    realProjectExample:
      "A consistent 500 on a specific order-update request was traced via server-side logs to an unhandled null-reference exception in a custom handler, triggered only when a particular optional field was absent — reproducing it with that exact missing field confirmed the exact condition, and adding a null check in the handler fixed it.",
    interviewTip:
      "If asked to distinguish this from a crash-loop investigation, explicitly stating the app process itself is healthy (narrowing scope to one request's handling, not startup/global config) shows precise diagnostic framing.",
    followupQuestions: [
      "How would you get the actual server-side exception when the client only sees a generic 500?",
      "Would this same approach work if the 500 only happened for certain tenants, not certain data?",
      "How would you add a test case to prevent this exact bug from recurring?",
    ],
    commonMistakes: [
      "Investigating this the same way as a crash-loop (checking startup/config) when the app itself is clearly running fine.",
      "Not reproducing the exact failing request to confirm and narrow the specific condition triggering it.",
    ],
    importantPoints: [
      "A consistent 500 on one request (app otherwise healthy) is isolated to that request's handling, unlike a crash-loop.",
      "Get the actual server-side exception from logs, since the generic 500 hides it from the client.",
      "Reproduce with exact parameters, then check custom handlers for that specific entity/operation.",
    ],
    revisionNotes: "Consistent 500 on one request (app healthy) = isolated to that request's handling — get the actual server-side exception, reproduce with exact params, check the custom handler for that entity/operation.",
  },
  {
    id: "scen-q31",
    topic: "CAP Crash",
    prompt: "After scaling a CAP app to multiple instances, you notice it crashes only when running with more than one instance, never with just one. What would you suspect?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["cap-crash", "multi-instance", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "This points to a shared-resource assumption that breaks under multiple instances — code assuming exclusive access to something that's actually shared across instances (a file, an in-memory cache assumed consistent across instances that isn't, a database resource contention only surfacing under genuine concurrent access) — check for any state the app assumes is local/exclusive that's actually shared or contended once truly concurrent.",
    detailedAnswer:
      "A bug that only manifests with multiple concurrent instances but never with one is a strong, specific signal: something about concurrent/multi-instance execution specifically is the trigger, not a general code bug that a single instance would also hit. Common culprits: code that assumes it has exclusive access to a resource (writing to a local file, assuming an in-memory value is consistent) that's actually now being accessed by multiple instances simultaneously, causing a race condition or conflict that never happens with just one instance since there's no concurrency to conflict with; a database resource (a connection pool, a specific row lock) hitting genuine contention only when multiple instances are actually competing for it simultaneously; or a piece of application state incorrectly assumed to be consistent in-memory across instances (each instance actually has its own independent memory, a common misunderstanding), causing inconsistent behavior once more than one instance is involved.",
    hindiExplanation:
      "Ek bug jo sirf multiple concurrent instances ke saath manifest hota hai lekin kabhi ek se nahi, ek strong, specific signal hai: concurrent/multi-instance execution specifically trigger hai, ek general code bug nahi jo single instance bhi hit karega. Common culprits: code jo assume karta hai ki uska exclusive access hai ek resource pe (ek local file mein likhna, assume karna ek in-memory value consistent hai) jo actually ab multiple instances dwara simultaneously access ho rahi hai, ek race condition ya conflict cause karte hue jo kabhi ek instance ke saath nahi hota; ek database resource genuine contention hit karta hai sirf jab multiple instances actually simultaneously compete kar rahe hon.",
    interviewExplanation:
      "I'd note the specific signal a multi-instance-only crash gives: 'This only manifesting with multiple instances, never one, is a strong signal that concurrent execution specifically is the trigger. I'd check for code assuming exclusive access to something that's actually now shared or contended — a local file write, an in-memory value assumed consistent across instances when each instance actually has its own separate memory, or a database resource like a connection pool or row lock hitting genuine contention only under real concurrent access.'",
    diagramNote:
      "'Crashes only with 2+ instances, never with 1' → strong signal: concurrent execution is the trigger → check: 'Assumed-exclusive resource actually shared', 'In-memory state incorrectly assumed consistent across instances', 'DB resource contention (connection pool, row lock)'.",
    diagramMermaid: `flowchart TD
    A["Crashes only with 2+<br/>instances, never with 1"] --> B["Concurrent execution<br/>is the trigger"]
    B --> C["Assumed-exclusive resource<br/>actually shared"]
    B --> D["In-memory state incorrectly<br/>assumed consistent across instances"]
    B --> E["DB resource contention<br/>connection pool, row lock"]`,
    realProjectExample:
      "A crash appearing only under multi-instance scaling was traced to code writing a temporary file to local disk storage assuming exclusive access, which conflicted when two instances happened to process related requests simultaneously — moving that temporary state to a shared, properly-concurrent-safe store eliminated the issue entirely.",
    interviewTip:
      "If asked to explain why something works fine locally/in a single-instance dev environment but breaks in a scaled multi-instance production deployment, this exact shared-resource-assumption pattern is the precise, correct class of bug to name.",
    followupQuestions: [
      "Why would writing to local disk storage be problematic in a multi-instance Cloud Foundry deployment specifically?",
      "How would you test for this kind of concurrency bug before it reaches production at scale?",
      "What's the correct way to share state across multiple app instances if genuinely needed?",
    ],
    commonMistakes: [
      "Assuming in-memory state is automatically shared/consistent across multiple app instances, when each instance actually has its own separate memory.",
      "Writing to local disk storage in a way that assumes exclusive, single-instance access.",
    ],
    importantPoints: [
      "A crash appearing only with multiple instances strongly signals concurrent execution as the trigger.",
      "Check for code assuming exclusive access to something now actually shared/contended across instances.",
      "Common culprits: local file writes, incorrectly-assumed-shared in-memory state, database resource contention.",
    ],
    revisionNotes: "Crash only with 2+ instances, never 1 = concurrent execution is the trigger — check for assumed-exclusive resources actually shared (local files, in-memory state each instance actually has separately, DB contention).",
  },
  {
    id: "scen-q32",
    topic: "CAP Crash",
    prompt: "A CAP app works fine when you test it manually but fails under automated CI test runs specifically. What would you investigate?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["cap-crash", "ci-environment", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Check for environment differences between manual testing and CI (a missing environment variable/secret only configured locally, a different Node.js version in CI, test execution order dependencies if tests share state, or timing/resource constraints in CI's more limited environment causing something that's normally fast enough to actually time out).",
    detailedAnswer:
      "Since the same code behaves differently between manual local testing and automated CI, the difference lies in the environment or execution context, not the code logic itself (which is identical in both cases). Common causes: an environment variable or secret that's configured in your local development setup (perhaps in a personal .env file) but was never actually added to CI's secret/environment configuration; a different Node.js or dependency version in CI than what's installed locally, surfacing a compatibility issue; test execution order dependencies, where tests pass individually or in your usual local order but fail when CI runs them in a different order and they share some state that assumes a specific sequence; or CI's more resource-constrained environment causing something that's normally comfortably fast enough locally to actually hit a timeout under CI's tighter resource allocation. Systematically comparing the actual configured environment (not just the code) between local and CI is the key diagnostic step.",
    hindiExplanation:
      "Kyunki same code manual local testing aur automated CI ke beech differently behave karta hai, difference environment ya execution context mein hai, code logic mein nahi (jo dono cases mein identical hai). Common causes: ek environment variable ya secret jo local development setup mein configured hai lekin CI ke secret/environment configuration mein kabhi add hi nahi hua; CI mein ek different Node.js ya dependency version jo locally installed se alag hai; test execution order dependencies, jaha tests individually ya usual local order mein pass hote hain lekin CI unhe different order mein chalata hai; ya CI ka more resource-constrained environment kuch aisa cause karta hai jo normally locally comfortably fast enough hai actually timeout hit kar jaana.",
    interviewExplanation:
      "I'd point to environment differences, not code: 'Since the same code differs between manual and CI, the gap is in the environment, not the logic. I'd check for a secret configured locally but never added to CI, a different Node.js version in CI, test order dependencies if tests share state and CI runs them in a different sequence, or CI's more constrained resources causing something normally fast enough to actually time out. Systematically comparing the actual configured environment between local and CI is the key step.'",
    diagramNote:
      "'Same code: works manually, fails in CI' → 'Environment/execution context differs, not code logic' → check: 'Missing env var/secret in CI', 'Different Node.js version', 'Test order dependencies', 'CI resource constraints causing timeout'.",
    diagramMermaid: `flowchart TD
    A["Same code: works manually,<br/>fails in CI"] --> B["Environment/context differs,<br/>not code logic"]
    B --> C["Missing env var/secret in CI"]
    B --> D["Different Node.js version"]
    B --> E["Test order dependencies"]
    B --> F["CI resource constraints<br/>causing timeout"]`,
    realProjectExample:
      "A test that always passed locally but consistently failed in CI was traced to a personal .env file containing a required environment variable that had never actually been added to the CI pipeline's secret configuration — adding it as a proper CI secret resolved the discrepancy immediately.",
    interviewTip:
      "If asked how you'd debug a works-locally-fails-in-CI discrepancy, explicitly framing it as an environment/context difference (not a code bug) and listing the specific categories to check shows structured, efficient diagnostic reasoning.",
    followupQuestions: [
      "How would you keep your local .env file and CI's secret configuration in sync going forward?",
      "How would you reproduce CI's exact Node.js version locally to rule out a version mismatch?",
      "What's a good practice for writing tests that don't depend on a specific execution order?",
    ],
    commonMistakes: [
      "Assuming a code bug is the cause of a works-locally-fails-in-CI discrepancy rather than checking environment differences first.",
      "Not keeping local development environment configuration (like .env files) in sync with what's actually configured in CI.",
    ],
    importantPoints: [
      "A works-locally-fails-in-CI discrepancy usually indicates an environment/context difference, not a code bug.",
      "Check for missing CI secrets, Node.js version mismatches, test order dependencies, and CI resource constraints.",
      "Systematically compare the actual configured environment between local and CI, not just the code.",
    ],
    revisionNotes: "Works locally, fails in CI = environment/context difference, not a code bug — check missing CI secrets, Node.js version mismatch, test order dependencies, or CI resource-constraint timeouts.",
  },
  {
    id: "scen-q33",
    topic: "Memory Leak",
    prompt: "You suspect a memory leak, but the app runs in a containerized Cloud Foundry environment where you can't easily attach a profiler live. How would you investigate without direct profiler access?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["memory-leak", "containerized-debugging", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Trigger a heap snapshot programmatically from within the app itself (via a debug endpoint or a signal-triggered dump written to a persisted location) rather than needing external live profiler attachment, or reproduce the suspected leak in a local/staging environment where you do have full profiler access, using production-like load patterns to trigger the same accumulation.",
    detailedAnswer:
      "Cloud Foundry's managed, containerized nature genuinely limits the kind of direct, live profiler attachment you might do on a local machine or a VM you fully control — but this doesn't mean you're without options. One approach: instrument the app itself to programmatically trigger and write out a heap snapshot on demand (via a protected debug endpoint, or listening for a specific signal) that dumps to a location you can retrieve afterward (like uploading it to an object store), letting you capture and analyze snapshots without needing live interactive profiler access to the running container. Another approach: since you likely can't perfectly replicate production's exact conditions, reproduce the suspected leak pattern in a local or staging environment where you do have full profiler tooling access, using production-like load patterns (the same request types/volume that seem to trigger the growth) to induce the same accumulation somewhere you can actually attach and interactively investigate.",
    hindiExplanation:
      "Cloud Foundry ki managed, containerized nature genuinely us tarah ke direct, live profiler attachment ko limit karti hai jo tum local machine ya poori tarah control ki hui VM pe kar sakte ho — lekin iska matlab ye nahi ki tumhare paas options nahi hain. Ek approach: app ko khud instrument karo programmatically ek heap snapshot trigger/write out karne ke liye on demand (ek protected debug endpoint se, ya ek specific signal sunte hue) jo ek location pe dump kare jise tum baad mein retrieve kar sako. Doosra approach: kyunki tum production ki exact conditions perfectly replicate nahi kar sakte, suspected leak pattern ko ek local ya staging environment mein reproduce karo jaha tumhare paas full profiler tooling access hai.",
    interviewExplanation:
      "I'd give both approaches available despite the container constraint: 'Cloud Foundry's managed nature limits direct live profiler attachment, but I have two options. One: instrument the app to programmatically trigger and write out a heap snapshot on demand — a protected debug endpoint or signal-triggered dump — uploading it somewhere I can retrieve and analyze afterward. Two: since I can't perfectly replicate production, reproduce the suspected leak pattern in a local or staging environment where I do have full profiler access, using production-like load to trigger the same accumulation.'",
    diagramNote:
      "'CF container: no direct live profiler attachment' → option 1: 'App self-triggers heap snapshot on demand, uploads for later analysis' → option 2: 'Reproduce leak pattern in local/staging with full profiler access, using production-like load'.",
    diagramMermaid: `flowchart LR
    A["CF container: no direct<br/>live profiler attachment"] --> B["Option 1: app self-triggers<br/>heap snapshot on demand"]
    A --> C["Option 2: reproduce in local/staging<br/>with full profiler access"]`,
    realProjectExample:
      "Unable to attach a live profiler to production Cloud Foundry instances, the team added a protected debug endpoint that triggered a heap snapshot and uploaded it to an object store, letting them capture and analyze production memory state without any direct interactive access to the running container.",
    interviewTip:
      "If asked how you'd debug a memory leak in a platform-managed environment where you can't SSH in and attach a profiler the way you might locally, describing both the self-triggered-snapshot and the reproduce-elsewhere approaches shows you're not stuck without options in a constrained environment.",
    followupQuestions: [
      "How would you secure a debug endpoint that can trigger a heap snapshot, so it's not itself a security risk?",
      "What CF command could give SSH-like access to a running container, and what are its limitations?",
      "How would you generate production-like load in a staging environment to reproduce the leak pattern?",
    ],
    commonMistakes: [
      "Assuming a memory leak can't be investigated at all without direct live profiler access to production.",
      "Not considering reproducing the issue in a more accessible environment as a viable alternative path.",
    ],
    importantPoints: [
      "Cloud Foundry's containerized nature limits direct live profiler attachment, but doesn't eliminate all options.",
      "Instrument the app to self-trigger and export heap snapshots on demand.",
      "Alternatively, reproduce the suspected leak pattern in a local/staging environment with full profiler access.",
    ],
    revisionNotes: "No direct live profiler access in CF containers: instrument the app to self-trigger heap snapshots on demand, or reproduce the leak pattern in local/staging with full profiler tooling using production-like load.",
  },
  {
    id: "scen-q34",
    topic: "Memory Leak",
    prompt: "A memory leak was fixed months ago, but a very similar leak just reappeared in a different part of the codebase. How would you prevent this class of bug from recurring repeatedly?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["memory-leak", "prevention", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Rather than just fixing this specific instance again, identify the underlying pattern common to both leaks (like an unbounded cache without eviction, or a subscription/listener registered without a corresponding cleanup), then proactively audit the rest of the codebase for the same pattern, and consider whether a shared utility/convention (a wrapped cache implementation with mandatory eviction, a linting rule) could prevent the pattern from being reintroduced elsewhere.",
    detailedAnswer:
      "A recurring class of bug, not just a one-off, is a signal to address the pattern, not just the individual instance — fixing this specific occurrence again without asking 'why does this keep happening' means it'll likely resurface a third time somewhere else. First, identify precisely what pattern both leaks share (an unbounded cache, an unregistered listener, an unclosed connection) — this is the actual thing to prevent, not the specific code location. Second, proactively grep/audit the rest of the codebase for that same pattern elsewhere, since if it happened twice independently, it's plausible it exists in other not-yet-discovered places too. Third, consider a structural prevention mechanism — a shared, wrapped utility (a cache implementation that enforces eviction by construction, making the unsafe pattern harder to accidentally write) or an automated lint rule catching the specific anti-pattern — turning 'remember not to do this' into something the tooling itself enforces, which is far more reliable than relying on every future developer remembering a lesson from an incident they may not even know happened.",
    hindiExplanation:
      "Ek recurring class of bug, sirf ek one-off nahi, ek signal hai pattern ko address karne ka, sirf individual instance nahi — is specific occurrence ko dobara fix karna bina 'ye baar baar kyun ho raha hai' poochhe matlab ye likely teesri baar kahin aur resurface hoga. Pehle, precisely identify karo kaunsa pattern dono leaks share karte hain — ye actual cheez hai prevent karne layak, specific code location nahi. Doosra, proactively rest of codebase ko us same pattern ke liye audit karo. Teesra, ek structural prevention mechanism consider karo — ek shared, wrapped utility ya ek automated lint rule jo specific anti-pattern catch kare.",
    interviewExplanation:
      "I'd address the pattern, not just fix the instance again: 'A recurring class of bug is a signal to address the pattern, not just this occurrence. I'd identify exactly what pattern both leaks share — say, an unbounded cache without eviction — then proactively audit the rest of the codebase for that same pattern elsewhere, since it happening twice independently suggests it might exist undiscovered elsewhere too. Then I'd consider a structural prevention mechanism — a shared cache utility that enforces eviction by construction, or a lint rule — turning \"remember not to do this\" into something tooling actually enforces.'",
    diagramNote:
      "'Same leak class recurs in different code' → 'Identify the shared underlying pattern' → 'Proactively audit rest of codebase for same pattern' → 'Structural prevention: shared safe utility / lint rule, not just fixing this instance'.",
    diagramMermaid: `flowchart TD
    A["Same leak class recurs<br/>in different code"] --> B["Identify shared<br/>underlying pattern"]
    B --> C["Proactively audit codebase<br/>for same pattern elsewhere"]
    C --> D["Structural prevention:<br/>shared safe utility / lint rule"]`,
    realProjectExample:
      "After a second unbounded-cache memory leak appeared in a different module, the team audited the entire codebase and found two more instances of the same pattern not yet causing visible problems, then introduced a shared, wrapped cache utility with mandatory eviction that made the unsafe pattern structurally impossible to accidentally reintroduce going forward.",
    interviewTip:
      "If asked how you'd prevent a recurring class of bug (not just fix it again), proposing a structural/tooling-level prevention mechanism (not just documentation or a reminder) shows mature, systems-level thinking about how bugs actually get prevented at scale.",
    followupQuestions: [
      "How would you write a custom lint rule to catch a specific anti-pattern like this?",
      "What would make a shared utility genuinely 'safe by construction' versus just a convention developers might still bypass?",
      "How would you communicate this pattern to the team without it just becoming another forgotten wiki page?",
    ],
    commonMistakes: [
      "Fixing each recurrence of a bug pattern individually without ever addressing the underlying shared cause.",
      "Relying on documentation/reminders alone rather than structural tooling enforcement to prevent recurrence.",
    ],
    importantPoints: [
      "A recurring bug class signals the need to address the underlying pattern, not just fix each instance.",
      "Proactively audit the rest of the codebase for the same pattern once it's been identified twice.",
      "Structural prevention (safe-by-construction utilities, lint rules) is more reliable than relying on memory/documentation.",
    ],
    revisionNotes: "Recurring bug class = fix the underlying pattern, not just this instance — audit the rest of the codebase for it, and add structural prevention (safe utility, lint rule) rather than relying on documentation alone.",
  },
  {
    id: "scen-q35",
    topic: "Memory Leak",
    prompt: "Memory usage climbs steadily but the app never actually crashes, since Cloud Foundry restarts it automatically before it hits the hard limit each time. Is this actually a problem worth fixing?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["memory-leak", "auto-restart", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — even though the platform's auto-restart prevents a hard crash from being visible to users, each restart still causes a brief unavailability window and drops any in-flight requests/state, which is a real, if less dramatic, user-facing cost; treating 'the platform silently masks it' as acceptable just means the underlying leak keeps happening, undetected, until scale or timing makes the masking insufficient.",
    detailedAnswer:
      "It's tempting to deprioritize a leak that never causes a visible outage, but 'the platform quietly restarts it before anyone notices' isn't the same as 'there's no actual problem' — each restart, even if brief, drops any in-flight requests being processed at that exact moment (a real, if intermittent and hard-to-notice, source of user-facing errors), and represents wasted resource churn and reduced effective capacity compared to an instance that simply didn't need restarting. More importantly, relying on this masking is fragile: if traffic grows, if the leak rate itself increases due to some future code change, or if the restart timing happens to coincide with a moment of unusually high load, the previously-invisible problem can suddenly become a visible, more serious one — the underlying issue never actually went away, it was just quietly tolerated by a safety net that isn't guaranteed to keep working under different conditions.",
    hindiExplanation:
      "Ek leak ko deprioritize karna tempting hai jo kabhi visible outage cause nahi karta, lekin 'platform quietly restart kar deta hai kisi ke notice karne se pehle' 'koi actual problem nahi hai' ke barabar nahi hai — har restart, chahe brief ho, us exact moment pe process ho rahe koi bhi in-flight requests drop kar deta hai (ek real, chahe intermittent aur hard-to-notice, user-facing errors ka source), aur wasted resource churn represent karta hai. Aur importantly, is masking pe rely karna fragile hai: agar traffic badhe, agar leak rate khud future code change ki wajah se badhe, ya agar restart timing unusually high load ke moment se coincide kare, pehle-invisible problem achanak visible, zyada serious ban sakta hai.",
    interviewExplanation:
      "I'd argue yes, it's still worth fixing: 'The platform quietly masking it isn't the same as no problem existing — each restart drops any in-flight requests at that exact moment, a real, if hard-to-notice, source of user errors, plus wasted resource churn. More importantly, relying on this masking is fragile — if traffic grows or the leak rate itself worsens, or restart timing coincides with high load, the previously-invisible problem can suddenly become visible and serious. The underlying issue never actually went away, it was just quietly tolerated by a safety net that isn't guaranteed to keep working.'",
    diagramNote:
      "'Platform auto-restarts before hard limit — appears masked, no visible crash' → still costs: 'brief unavailability window, dropped in-flight requests, resource churn' → fragile masking: 'traffic growth or worse leak rate could make it suddenly visible/serious'.",
    diagramMermaid: `flowchart TD
    A["Platform auto-restarts<br/>before hard limit"] --> B["Appears masked —<br/>no visible crash"]
    B --> C["Still costs: brief unavailability,<br/>dropped in-flight requests"]
    B --> D["Fragile masking — traffic growth<br/>could make it suddenly visible"]`,
    realProjectExample:
      "A leak masked by frequent auto-restarts was deprioritized for months as 'not a real problem', until a traffic spike caused restarts to coincide with peak load, turning a previously invisible issue into a visible, customer-impacting outage — fixing the underlying leak (rather than continuing to rely on the restart safety net) had actually been the correct call all along.",
    interviewTip:
      "If asked whether a masked-but-not-crashing issue is worth fixing, the strong answer explicitly names the real, if subtle, costs (dropped in-flight requests, fragile masking) rather than dismissing it as 'not really a problem since it never crashes visibly'.",
    followupQuestions: [
      "How would you measure the actual user-facing impact of these frequent restarts?",
      "How would you prioritize fixing this against other, more visibly urgent issues?",
      "What metric would show you this masked leak is getting worse over time, before it becomes a visible outage?",
    ],
    commonMistakes: [
      "Deprioritizing a leak indefinitely just because the platform's auto-restart prevents a visible crash.",
      "Not recognizing that relying on auto-restart masking is fragile and can fail under different future conditions.",
    ],
    importantPoints: [
      "Auto-restart masking a leak isn't the same as there being no actual problem.",
      "Each restart still drops in-flight requests and represents real resource churn.",
      "Relying on masking is fragile — traffic growth or worsening leak rate can make it suddenly visible.",
    ],
    revisionNotes: "A leak masked by auto-restart still costs real (if subtle) impact — dropped in-flight requests, resource churn — and the masking is fragile, since traffic growth or a worsening leak rate can suddenly make it visible. Still worth fixing.",
  },
  {
    id: "scen-q36",
    topic: "Scaling",
    prompt: "You scale an app from 2 to 10 instances expecting a 5x throughput increase, but only see about 2x. What would you investigate?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["scaling", "bottleneck", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Look for a shared bottleneck downstream of the app instances that doesn't scale with them — most commonly the database (connection pool limits, or the database itself becoming the constraint since it's still one instance regardless of how many app instances call it), since horizontal app scaling only helps if every dependency in the chain can absorb the additional concurrent load too.",
    detailedAnswer:
      "Horizontal scaling assumes the app's own compute is the bottleneck, but scaling instances doesn't help if something downstream and shared can't absorb the additional load — the throughput improvement then gets capped by that shared constraint instead. The most common culprit is the database: even with 10x more app instances making requests, if they're all still hitting the same single HANA instance, and either the connection pool configuration or the database's own processing capacity was already near its limit at lower instance counts, the database becomes the new bottleneck, and adding more app instances just means more of them queueing for the same limited downstream capacity rather than genuinely parallel throughput. Diagnosing this means checking database-side metrics (connection pool utilization, query queue depth) specifically under the scaled load, not just app-instance-level CPU/memory, which might look perfectly healthy while the actual constraint sits one layer downstream.",
    hindiExplanation:
      "Horizontal scaling assume karta hai ki app ka apna compute bottleneck hai, lekin instances scale karna help nahi karta agar kuch downstream aur shared additional load absorb nahi kar sakta — throughput improvement fir us shared constraint se capped ho jaata hai. Sabse common culprit database hai: chahe 10x zyada app instances requests bana rahi hon, agar wo sab abhi bhi same single HANA instance ko hit kar rahi hain, aur connection pool configuration ya database ki apni processing capacity already lower instance counts pe apni limit ke paas thi, database naya bottleneck ban jaata hai.",
    interviewExplanation:
      "I'd look for a shared, non-scaling bottleneck downstream: 'Scaling app instances only helps if everything downstream can absorb the extra load too. The most common culprit is the database — even with 10x more app instances, they're all still hitting the same single HANA instance, and if its connection pool or processing capacity was already near its limit, it becomes the new bottleneck. I'd check database-side metrics specifically under the scaled load — connection pool utilization, query queue depth — since app-instance CPU/memory might look perfectly healthy while the real constraint sits one layer downstream.'",
    diagramNote:
      "'Scale app 2→10 instances, throughput only ~2x' → 'App instances scale, but shared downstream doesn't' → check: 'Database connection pool limits', 'Database's own processing capacity (single instance regardless of app count)'.",
    diagramMermaid: `flowchart TD
    A["Scale app 2→10 instances,<br/>throughput only ~2x"] --> B["App scales, but shared<br/>downstream doesn't"]
    B --> C["Database connection<br/>pool limits"]
    B --> D["Database's own processing<br/>capacity (single instance)"]`,
    realProjectExample:
      "Scaling from 2 to 10 instances yielded only a 2x throughput improvement because the database connection pool configuration had been set assuming the original 2-instance count, capping total concurrent database connections regardless of how many app instances were making requests — increasing the pool size appropriately unlocked most of the expected additional throughput.",
    interviewTip:
      "If asked why scaling instances didn't produce the expected linear throughput gain, immediately checking whether a shared downstream resource (especially the database) is the actual constraint — rather than assuming the app scaling itself is somehow broken — shows correct systems-level reasoning.",
    followupQuestions: [
      "How would you appropriately size a database connection pool for a given number of app instances?",
      "What other shared resources besides the database might similarly become a bottleneck under scaling?",
      "Would horizontally scaling the database itself help, and what would that actually involve?",
    ],
    commonMistakes: [
      "Assuming the app's own scaling mechanism is broken rather than checking for a shared downstream bottleneck.",
      "Checking only app-instance-level metrics (CPU/memory) instead of database-side metrics under the scaled load.",
    ],
    importantPoints: [
      "Horizontal app scaling only helps throughput if every downstream dependency can also absorb the extra load.",
      "The database is a common shared bottleneck that doesn't automatically scale with app instance count.",
      "Check database-side metrics (connection pool, query queue) specifically under the scaled load.",
    ],
    revisionNotes: "Scaling app instances but not seeing linear throughput gain = check for a shared, non-scaling downstream bottleneck (commonly the database's connection pool or processing capacity), not the app instances themselves.",
  },
  {
    id: "scen-q37",
    topic: "Scaling",
    prompt: "Would you always scale horizontally (more instances) rather than vertically (bigger instances)? What factors would change your decision?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["scaling", "horizontal-vertical", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "No — horizontal scaling is generally preferred for stateless web workloads since it also improves redundancy (one instance failing doesn't take down the whole app), but vertical scaling can be the right call for genuinely memory/CPU-intensive single operations that can't be parallelized across instances, or when the app has problematic shared/stateful assumptions that make running many instances actually harder than running fewer, bigger ones.",
    detailedAnswer:
      "Horizontal scaling's main advantages — redundancy (surviving individual instance failure) and elastic, incremental capacity adjustment — make it the generally preferred default for stateless web request handling, which is the common case for most BTP applications. But vertical scaling (a bigger instance with more CPU/memory) is the right call in specific situations: a genuinely single-threaded, memory-intensive operation (a large in-memory computation that can't be meaningfully split across multiple instances) benefits from more resources on one instance rather than more instances that don't actually help that specific operation; or an app with problematic in-memory state assumptions (session affinity requirements, in-memory caches that would need expensive synchronization across instances) where running many instances introduces real complexity that a single, bigger instance avoids entirely, at the cost of losing horizontal scaling's redundancy benefit. The decision should be driven by the actual workload's characteristics, not a blanket rule favoring one approach always.",
    hindiExplanation:
      "Horizontal scaling ke main advantages — redundancy (individual instance failure survive karna) aur elastic, incremental capacity adjustment — ise generally preferred default banate hain stateless web request handling ke liye, jo zyada tar BTP applications ka common case hai. Lekin vertical scaling (ek bada instance zyada CPU/memory ke saath) sahi call hai specific situations mein: ek genuinely single-threaded, memory-intensive operation (ek bada in-memory computation jo multiple instances mein meaningfully split nahi ho sakta) ek instance pe zyada resources se benefit karta hai; ya ek app jiske paas problematic in-memory state assumptions hain jaha kai instances chalana real complexity introduce karta hai jo ek single, bada instance entirely avoid kar leta hai.",
    interviewExplanation:
      "I'd say no, and give the decision factors: 'Horizontal scaling is generally the default for stateless web workloads, since it also gives redundancy — one instance failing doesn't take down the app. But vertical scaling is right for a genuinely single-threaded, memory-intensive operation that can't be parallelized, or for an app with problematic in-memory state assumptions where running many instances introduces real synchronization complexity that a bigger single instance avoids. It's driven by the actual workload's characteristics, not a blanket rule.'",
    diagramNote:
      "'Stateless web workload' → horizontal scaling default (redundancy + elastic capacity) vs 'Single-threaded memory-intensive op, or problematic shared state' → vertical scaling may be the right call.",
    diagramMermaid: `flowchart LR
    A["Stateless web workload"] --> B["Horizontal scaling default<br/>redundancy + elastic capacity"]
    C["Single-threaded intensive op,<br/>or problematic shared state"] --> D["Vertical scaling may<br/>be the right call"]`,
    realProjectExample:
      "A stateless CAP API service was scaled horizontally as the default approach for redundancy and elastic capacity, while a separate batch process performing a genuinely single-threaded, memory-intensive data transformation was instead given a larger instance size, since more parallel instances wouldn't have helped that specific, unparallelizable operation at all.",
    interviewTip:
      "If asked 'is horizontal scaling always better', the correct nuanced answer names specific factors (parallelizability, shared state complexity) that would change the decision — not a blanket 'yes, always horizontal' or 'it depends' without substance.",
    followupQuestions: [
      "How would you identify whether a specific operation is genuinely unparallelizable?",
      "What would 'problematic in-memory state assumptions' actually look like in a real app?",
      "Could you combine both — horizontally scaling several vertically-larger instances?",
    ],
    commonMistakes: [
      "Treating horizontal scaling as universally correct in every scenario without considering workload-specific factors.",
      "Not recognizing redundancy as a genuine, separate benefit of horizontal scaling beyond just raw capacity.",
    ],
    importantPoints: [
      "Horizontal scaling is generally preferred for stateless workloads, also providing redundancy.",
      "Vertical scaling fits genuinely unparallelizable, memory-intensive single operations.",
      "Also consider vertical scaling when in-memory state assumptions make many instances problematic.",
    ],
    revisionNotes: "Horizontal scaling = generally preferred default (redundancy + elastic capacity) for stateless workloads. Vertical scaling fits unparallelizable intensive operations or apps with problematic shared in-memory state.",
  },
  {
    id: "scen-q38",
    topic: "Scaling",
    prompt: "After auto-scaling adds new instances under load, you notice a brief spike in errors right as each new instance comes online. What would you investigate?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["scaling", "cold-start", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Check whether the new instance is receiving traffic before it's actually fully ready (a health check that reports ready too early, or no readiness gate at all before the platform starts routing to it), or whether a genuine cold-start cost (warming an in-memory cache, establishing initial database connections) causes the first several requests to that new instance to be slow or fail before it's fully warmed up.",
    detailedAnswer:
      "A new instance isn't instantaneously ready to handle production traffic the moment its process starts — there's often a brief period where it's technically running but not yet fully prepared, and errors clustering specifically at that moment point to this gap. Check whether the platform's health check is reporting the instance as ready prematurely (before dependencies are actually connected, before any startup initialization completes) — if so, traffic gets routed to an instance that isn't genuinely prepared yet. Separately, even with a correct readiness check, some genuine cold-start cost is common — an empty in-memory cache means the first several requests miss and have to compute/fetch what a warmed instance would have readily available, or initial database connection pool establishment takes a moment — causing those first requests specifically to be slower or occasionally timeout even though the instance is technically 'ready'. The fix depends on which: tightening the readiness check, or accepting/mitigating a brief warm-up cost (perhaps with a gradual traffic ramp-up rather than immediately sending full load to a brand-new instance).",
    hindiExplanation:
      "Ek naya instance apne process start hone ke exact moment pe instantaneously production traffic handle karne ke liye ready nahi hota — aksar ek brief period hota hai jaha wo technically chal raha hai lekin abhi fully prepared nahi hai, aur errors specifically us moment pe cluster hona is gap ko point karta hai. Check karo kya platform ka health check instance ko prematurely ready report kar raha hai — agar haan, traffic ek aise instance ko route hoti hai jo genuinely prepared nahi hai. Alag se, ek correct readiness check ke saath bhi, kuch genuine cold-start cost common hai — ek empty in-memory cache matlab pehle kai requests miss karte hain.",
    interviewExplanation:
      "I'd check two related possibilities: 'First, whether the health check is reporting the instance ready prematurely, before its dependencies are actually connected — traffic then gets routed to something not genuinely prepared. Second, even with a correct readiness check, some genuine cold-start cost is common — an empty cache means the first requests miss, or initial connection pool setup takes a moment — causing those first requests specifically to be slower or occasionally fail. The fix is either tightening the readiness check, or gradually ramping traffic to new instances rather than sending full load immediately.'",
    diagramNote:
      "'Error spike right as new instance comes online' → check: 'Health check reports ready too early (dependencies not actually connected)' + 'Genuine cold-start cost (empty cache, initial connection setup) even with correct readiness'.",
    diagramMermaid: `flowchart TD
    A["Error spike right as<br/>new instance comes online"] --> B["Health check reports<br/>ready too early?"]
    A --> C["Genuine cold-start cost<br/>empty cache, connection setup?"]`,
    realProjectExample:
      "New instance error spikes were traced to the health check reporting readiness immediately on process start, before the app had actually established its database connection pool — tightening the readiness check to wait for a genuine successful database connection before reporting ready eliminated the error spike entirely.",
    interviewTip:
      "If asked to debug errors specifically clustering around new instance startup, distinguishing a premature-readiness-check problem from a genuine unavoidable cold-start cost is precise, since they need different fixes — one is a bug, the other might just need traffic ramp-up mitigation.",
    followupQuestions: [
      "How would you configure a health check to more accurately reflect true readiness?",
      "What's a 'gradual traffic ramp-up' and how would you implement it for new instances?",
      "Would this same cold-start issue apply to a scale-to-zero scenario, and how might it be worse there?",
    ],
    commonMistakes: [
      "Assuming a health check reporting 'ready' actually means the instance is fully prepared for production traffic.",
      "Not distinguishing a fixable readiness-check bug from an inherent, mitigatable cold-start cost.",
    ],
    importantPoints: [
      "A premature health check can route traffic to an instance before it's genuinely ready.",
      "Genuine cold-start costs (cache warming, connection setup) can affect the first requests even with a correct readiness check.",
      "These need different fixes — tightening the check, versus gradual traffic ramp-up mitigation.",
    ],
    revisionNotes: "Error spike at new-instance startup: check if health check reports ready too early (dependencies not connected), or if it's a genuine cold-start cost (cache warming, connection setup) needing gradual traffic ramp-up.",
  },
  {
    id: "scen-q39",
    topic: "Scaling",
    prompt: "Your app scales fine under gradually increasing load, but crashes or errors badly under a sudden traffic spike (like a flash sale). What's different about this scenario?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["scaling", "traffic-spike", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Auto-scaling reacts to observed load with some inherent lag (detecting increased load, then provisioning new instances takes real time), so a sudden spike can overwhelm the currently-provisioned capacity before new instances actually come online — the fix involves either pre-scaling ahead of a known event, more aggressive/sensitive scaling triggers, or request-level protection (rate limiting, a queue) to survive the gap between spike onset and scaled-up capacity actually being ready.",
    detailedAnswer:
      "Gradual load increase gives auto-scaling time to react incrementally — by the time load has meaningfully grown, new instances have already been added to match. A sudden spike breaks this assumption: the scaling system needs to first detect the increased load (some monitoring interval/threshold), then actually provision and start new instances (which takes real time, often 30 seconds to a few minutes depending on the platform and app startup time) — during that entire gap, the existing, now-overwhelmed capacity has to absorb the full spike alone, which is exactly when things can crash or error badly. For a genuinely predictable spike (a scheduled flash sale, a known marketing event), pre-scaling ahead of time (manually or via a scheduled scaling action) sidesteps the detection-and-provisioning lag entirely. For less predictable spikes, more sensitive/aggressive scaling triggers (reacting faster, provisioning more instances per scaling event) reduce but don't eliminate the gap, and request-level protection — rate limiting to shed excess load gracefully, or a queue absorbing the burst — can prevent a genuine overload from becoming a full crash while capacity catches up.",
    hindiExplanation:
      "Gradual load increase auto-scaling ko incrementally react karne ka time deta hai — jab tak load meaningfully badh chuka hota hai, naye instances already add ho chuke hote hain match karne ke liye. Ek sudden spike is assumption ko break karta hai: scaling system ko pehle increased load detect karna hai (kuch monitoring interval/threshold), fir actually naye instances provision aur start karna hai (jo real time leta hai). Us poore gap ke dauraan, existing, ab overwhelmed capacity ko poora spike akele absorb karna padta hai, jo exactly tab hai jab cheezein badly crash ya error kar sakti hain.",
    interviewExplanation:
      "I'd explain the detection-and-provisioning lag: 'Gradual load gives auto-scaling time to react incrementally, but a sudden spike breaks that — the system has to first detect increased load, then actually provision and start new instances, which takes real time, often minutes. During that gap, existing capacity has to absorb the full spike alone. For a predictable event like a scheduled flash sale, I'd pre-scale ahead of time. For less predictable spikes, more sensitive scaling triggers and request-level protection — rate limiting or a queue — can prevent a crash while capacity catches up.'",
    diagramNote:
      "'Gradual load: auto-scaling reacts incrementally, keeps up' vs 'Sudden spike: detection + provisioning lag → existing capacity overwhelmed before new instances come online' → mitigate: 'pre-scale for known events', 'faster scaling triggers', 'rate limiting/queue for the gap'.",
    diagramMermaid: `flowchart TD
    A["Sudden spike"] --> B["Detection + provisioning lag<br/>real time to react"]
    B --> C["Existing capacity overwhelmed<br/>before new instances online"]
    D["Mitigate: pre-scale known events,<br/>faster triggers, rate limit/queue"] -.-> C`,
    realProjectExample:
      "A scheduled flash sale event caused a severe error spike in the first two minutes as auto-scaling detected and reacted to the sudden load, before enough new instances actually came online; pre-scaling to the expected peak capacity a few minutes before the sale's known start time eliminated the error spike entirely for a subsequent, similarly-sized event.",
    interviewTip:
      "If asked how you'd prepare for a known high-traffic event, proactively mentioning pre-scaling ahead of time (rather than relying on auto-scaling's reactive detection-and-provisioning cycle) shows practical, forward-planning operational judgment.",
    followupQuestions: [
      "How would you configure a scheduled pre-scaling action for a known event's start time?",
      "What would an appropriate rate-limiting strategy look like for absorbing an unpredictable spike?",
      "How would you decide how much to pre-scale ahead of a known event without over-provisioning unnecessarily?",
    ],
    commonMistakes: [
      "Assuming auto-scaling reacts instantaneously to load spikes, with no detection/provisioning lag to account for.",
      "Not pre-scaling ahead of a known, predictable high-traffic event, relying entirely on reactive auto-scaling.",
    ],
    importantPoints: [
      "Auto-scaling has an inherent detection-and-provisioning lag that a sudden spike can outrun.",
      "For predictable events, pre-scale ahead of time to sidestep the lag entirely.",
      "For unpredictable spikes, use more sensitive scaling triggers and request-level protection (rate limiting, queuing).",
    ],
    revisionNotes: "Auto-scaling has real detection+provisioning lag — a sudden spike can overwhelm capacity before it reacts. Pre-scale for known events; use faster triggers + rate limiting/queuing to survive unpredictable spikes.",
  },
  {
    id: "scen-q40",
    topic: "Performance",
    prompt: "An API endpoint was fast in testing but has gotten progressively slower in production over the past few months with no code changes. What would you investigate?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["performance", "data-growth", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Since no code changed, the most likely explanation is data volume growth — a query that performed fine against a small test/early-production dataset degrades as the underlying table grows over months of real usage, especially if it relies on a full scan or a query pattern that doesn't scale well; check the actual current data volume against what it was originally tested/designed for, and get a current execution plan.",
    detailedAnswer:
      "No code changes ruling out a logic regression means the variable that's actually changed is the data itself — a query that returns in milliseconds against a few hundred test rows can become genuinely slow against the same query pattern run against hundreds of thousands of real production rows accumulated over months. This is a very common, gradual-onset performance issue precisely because it doesn't announce itself with a sudden, page-worthy problem — it creeps rather than spikes, which is often why it goes unnoticed until users start actively complaining. Diagnosing it means checking the actual current row count/data volume for the relevant tables (compared to what was true when the endpoint was first built and tested), and getting a current execution plan for the specific query — this often reveals a missing index that wasn't necessary at smaller data volumes but has become genuinely necessary now, or a query pattern (like an unindexed full table scan) whose cost scales linearly or worse with data volume.",
    hindiExplanation:
      "Koi code changes na hone ka matlab logic regression rule out ho jaata hai, matlab actual changed variable data khud hai — ek query jo milliseconds mein return hoti hai kuch sau test rows ke against, genuinely slow ban sakti hai wahi query pattern ke saath jab wo hazaron real production rows ke against chale jo months mein accumulate hue hain. Ye ek bahut common, gradual-onset performance issue hai precisely kyunki ye khud ko ek sudden, page-worthy problem se announce nahi karta — ye creeps karta hai spike nahi. Diagnose karne ka matlab hai actual current row count/data volume check karna relevant tables ke liye, aur specific query ke liye ek current execution plan lena.",
    interviewExplanation:
      "I'd point to data growth as the likely explanation: 'No code changes rules out a logic regression — so the variable that changed is the data itself. A query fast against a small test dataset can become genuinely slow against hundreds of thousands of accumulated production rows months later. This creeps rather than spikes, which is why it goes unnoticed until users complain. I'd check the actual current row count against what it was when the endpoint was first tested, and get a current execution plan — often revealing a missing index that wasn't necessary at smaller volumes but is now.'",
    diagramNote:
      "'No code changes, progressively slower over months' → 'Data volume growth is the likely variable' → 'Check actual current row count vs original testing volume' + 'Get current execution plan (missing index at this scale?)'.",
    diagramMermaid: `flowchart TD
    A["No code changes,<br/>progressively slower"] --> B["Data volume growth<br/>is the likely variable"]
    B --> C["Check current row count<br/>vs original testing volume"]
    B --> D["Get current execution plan —<br/>missing index at this scale?"]`,
    realProjectExample:
      "An endpoint that returned in under 50ms during initial testing had degraded to over 2 seconds eight months later purely due to organic data growth from thousands to hundreds of thousands of rows, with an unindexed filter column becoming the bottleneck at that scale — adding the appropriate index restored sub-100ms response times immediately.",
    interviewTip:
      "If asked to explain a gradual, months-long performance degradation with zero code changes, immediately naming data volume growth (rather than assuming a subtle code issue) shows correct pattern recognition for this very common real-world scenario.",
    followupQuestions: [
      "How would you proactively catch this kind of gradual degradation before users start complaining?",
      "Why might this kind of issue not show up at all in a testing environment?",
      "What data growth rate would justify periodically re-reviewing execution plans for key queries?",
    ],
    commonMistakes: [
      "Assuming a subtle code regression must be responsible despite no actual code changes having occurred.",
      "Not considering data volume growth as a gradual, easy-to-overlook performance degradation cause.",
    ],
    importantPoints: [
      "No code changes plus gradual degradation points strongly to data volume growth as the cause.",
      "This kind of issue creeps rather than spikes, often going unnoticed until users actively complain.",
      "Check current data volume against original testing conditions, and get a current execution plan.",
    ],
    revisionNotes: "Gradual slowdown over months, no code changes = likely data volume growth — check current row count vs original testing volume, get a current execution plan (often reveals a now-needed missing index).",
  },
  {
    id: "scen-q41",
    topic: "Performance",
    prompt: "A performance issue only reproduces in production, never in a staging environment that's supposedly identical. What would make you question the 'identical' assumption?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["performance", "staging-parity", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Question the actual data volume/shape (staging rarely has genuinely production-scale, production-realistic data), the actual traffic pattern/concurrency (staging typically has far less simultaneous load), and any resource sizing differences (staging instances are often deliberately smaller/cheaper than production) — 'identical' environments usually means identical code/config, not identical data volume or load, which are often exactly what's actually different.",
    detailedAnswer:
      "'Identical staging environment' almost always means identical application code and configuration, not identical everything — and the dimensions that are almost never actually identical are precisely the ones that matter most for performance issues: data volume/shape (staging is rarely seeded with genuinely production-scale data, since that's expensive and sometimes involves sensitive data concerns), concurrent traffic/load pattern (staging typically has a handful of test users, not production's real concurrent request volume), and resource sizing (staging instances are commonly deliberately smaller/cheaper than production, since paying for production-grade resources in every lower environment is wasteful). A performance issue that only manifests under real data volume, real concurrent load, or specific resource constraints simply won't reproduce in an environment lacking those exact conditions, even with genuinely identical code — questioning which of these three dimensions actually differs (rather than assuming staging truly mirrors production in every respect) is the correct diagnostic instinct.",
    hindiExplanation:
      "'Identical staging environment' almost always matlab identical application code aur configuration hai, identical sab kuch nahi — aur wo dimensions jo almost kabhi actually identical nahi hote, exactly wahi hain jo performance issues ke liye sabse zyada matter karte hain: data volume/shape (staging rarely genuinely production-scale data se seeded hoti hai), concurrent traffic/load pattern (staging typically ek handful test users rakhta hai, production ka real concurrent request volume nahi), aur resource sizing (staging instances commonly deliberately chhote/cheaper hote hain production se).",
    interviewExplanation:
      "I'd question three specific dimensions: 'Identical staging almost always means identical code and config, not identical everything — and the dimensions that actually matter most for performance rarely are identical. I'd question data volume/shape — staging rarely has genuinely production-scale data — concurrent load, since staging typically has far fewer simultaneous users, and resource sizing, since staging instances are commonly smaller/cheaper. A performance issue needing real data volume, real concurrency, or specific resource constraints simply won't reproduce without those exact conditions.'",
    diagramNote:
      "'Staging = identical code/config' — but likely different: 'Data volume/shape', 'Concurrent traffic/load', 'Resource sizing (instance size)' — these three dimensions are what usually actually differ, causing production-only reproduction.",
    diagramMermaid: `flowchart LR
    A["Staging: identical<br/>code/config"] --> B["Likely different:<br/>Data volume/shape"]
    A --> C["Likely different:<br/>Concurrent traffic/load"]
    A --> D["Likely different:<br/>Resource sizing"]`,
    realProjectExample:
      "A production-only performance issue was eventually traced to staging using a small, deliberately-seeded dataset a fraction of production's actual size, while application code and configuration genuinely were identical — loading a production-scale, realistic dataset into staging finally let the issue reproduce there too, enabling proper investigation without touching real production.",
    interviewTip:
      "If asked why a 'supposedly identical' staging environment fails to reproduce a production issue, naming these three specific dimensions (data volume, concurrency, resource sizing) rather than vaguely questioning 'maybe something's different' shows precise, structured diagnostic thinking.",
    followupQuestions: [
      "How would you safely seed staging with production-realistic data volume without exposing sensitive real data?",
      "How would you simulate production-realistic concurrent load in staging?",
      "Would matching staging's resource sizing to production's be worth the extra cost for this purpose?",
    ],
    commonMistakes: [
      "Accepting 'staging is identical to production' at face value without questioning what dimensions actually differ.",
      "Assuming a performance issue that won't reproduce in staging must therefore be unfixable/undiagnosable.",
    ],
    importantPoints: [
      "'Identical' staging usually means identical code/config, not identical data volume, load, or resource sizing.",
      "Data volume/shape, concurrent traffic, and resource sizing are the dimensions most likely to actually differ.",
      "A production-only performance issue often needs one of these specific conditions to reproduce.",
    ],
    revisionNotes: "'Identical' staging usually means identical code/config only — question data volume/shape, concurrent load, and resource sizing specifically, since those are what usually actually differ and cause production-only performance issues.",
  },
  {
    id: "scen-q42",
    topic: "Performance",
    prompt: "You're asked to improve an endpoint's performance, but you have limited time. How would you prioritize where to focus your optimization effort?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["performance", "prioritization", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Profile first to find where the actual time is being spent (not guessing based on intuition about what 'seems slow'), then focus effort on whichever single component consumes the largest share of total time, since optimizing a component that's only 5% of total time has a hard ceiling on possible improvement regardless of effort, while the dominant component offers the most possible impact per unit of optimization effort.",
    detailedAnswer:
      "Without actual profiling data, it's tempting to optimize based on intuition — 'this looks complicated, it's probably slow' — but that's frequently wrong, and limited time makes guessing an expensive mistake. Profiling (an execution plan for a database query, a distributed trace breaking down where time goes across service hops, or simple timing instrumentation around suspected slow sections) reveals the actual breakdown of where time is genuinely spent. The mathematically correct prioritization then follows directly: a component consuming 60% of total request time has vastly more possible impact from optimization than one consuming 5%, since even a modest percentage improvement to the dominant component moves the needle far more than even a dramatic improvement to a minor one — this is exactly Amdahl's-law-style reasoning applied practically, and it means limited optimization time should go toward whatever the profile shows as the actual largest contributor, not wherever intuition or familiarity happens to point.",
    hindiExplanation:
      "Actual profiling data ke bina, intuition ke basis pe optimize karna tempting hai — 'ye complicated dikhta hai, probably slow hoga' — lekin ye frequently galat hota hai, aur limited time guessing ko ek expensive mistake banata hai. Profiling (ek execution plan, ek distributed trace, ya simple timing instrumentation) actual breakdown reveal karta hai ki time genuinely kaha spend ho raha hai. Mathematically correct prioritization fir directly follow karti hai: ek component jo total request time ka 60% consume karta hai uske paas optimization se vastly zyada possible impact hai ek 5% consume karne wale se, kyunki dominant component mein ek modest percentage improvement bhi needle ko zyada move karta hai.",
    interviewExplanation:
      "I'd profile first, not guess: 'It's tempting to optimize based on intuition about what looks slow, but that's often wrong, and limited time makes guessing expensive. I'd profile first — an execution plan, a distributed trace, or timing instrumentation — to see the actual breakdown of where time goes. Then I'd focus on whichever component is the largest share of total time, since a component that's only 5% of total time has a hard ceiling on possible improvement regardless of effort, while the dominant component offers the most impact per unit of effort.'",
    diagramNote:
      "'Limited optimization time' → 'Profile first: find actual time breakdown (execution plan/trace/instrumentation)' → 'Focus effort on the LARGEST contributor' — a 5%-of-total component has a hard ceiling on impact regardless of effort.",
    diagramMermaid: `flowchart TD
    A["Limited optimization time"] --> B["Profile first:<br/>find actual time breakdown"]
    B --> C["Focus on the LARGEST<br/>time contributor"]
    C --> D["Small components have a<br/>hard ceiling on possible impact"]`,
    realProjectExample:
      "Profiling a slow endpoint revealed a specific database query consumed 70% of total response time, while a piece of business logic the team had assumed was the bottleneck (based on its apparent complexity) accounted for barely 3% — focusing the limited available optimization time on the query specifically produced a dramatically larger overall improvement than optimizing the complex-looking logic would have.",
    interviewTip:
      "If asked how you'd prioritize optimization with limited time, explicitly stating 'profile first, then target the largest contributor' (rather than describing specific optimization techniques immediately) shows the correct meta-level prioritization instinct before diving into tactics.",
    followupQuestions: [
      "What profiling tools would you use for a CAP application specifically?",
      "What would you do if profiling revealed time spread roughly evenly across many components, with no single dominant contributor?",
      "How would you communicate to a stakeholder why you're focusing on one specific component rather than 'fixing everything'?",
    ],
    commonMistakes: [
      "Optimizing based on intuition about what 'seems complicated or slow' instead of profiling first.",
      "Spreading limited optimization effort across many small contributors instead of focusing on the single largest one.",
    ],
    importantPoints: [
      "Profile first to find the actual time breakdown, rather than guessing based on intuition.",
      "Focus optimization effort on the single largest contributor to total time.",
      "A minor component has a hard ceiling on possible improvement regardless of optimization effort spent on it.",
    ],
    revisionNotes: "Prioritize performance optimization: profile first (find actual time breakdown), then focus effort on the single largest time contributor — a minor component has a hard ceiling on possible impact regardless of effort spent.",
  },
  {
    id: "scen-q43",
    topic: "Database Lock",
    prompt: "Two separate transactions each hold a lock the other one needs, and both are waiting on each other indefinitely. What is this called, and how does the database typically handle it?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["database-lock", "deadlock", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "This is a deadlock; most databases (including HANA) automatically detect this circular-wait condition and forcibly abort one of the two transactions (rolling it back) to break the cycle, returning an error to that transaction's caller — application code needs to be written to catch this specific error and retry the aborted transaction, since the database resolves the deadlock but doesn't complete the aborted work for you.",
    detailedAnswer:
      "A deadlock is specifically this circular-wait pattern — Transaction A holds lock X and wants lock Y, while Transaction B holds lock Y and wants lock X, and neither can ever proceed since each is waiting on the other. Unlike simple lock contention (one transaction waiting for another to finish and release), a deadlock would wait forever without intervention, so databases implement deadlock detection — periodically or continuously checking for this circular-wait pattern — and when found, forcibly choose one transaction (often the one that would be 'cheaper' to roll back, using some internal heuristic) to abort, rolling back its changes and returning a specific deadlock error to that transaction's caller, letting the other transaction proceed. Critically, the database resolves the deadlock by picking a 'victim' but doesn't automatically retry or complete the aborted transaction's work — application code needs to specifically catch this deadlock error and decide whether/how to retry, since blindly treating it like any other database error (and not retrying) would silently lose that transaction's intended work.",
    hindiExplanation:
      "Ek deadlock specifically ye circular-wait pattern hai — Transaction A lock X hold karta hai aur lock Y chahta hai, jabki Transaction B lock Y hold karta hai aur lock X chahta hai, aur koi bhi kabhi proceed nahi kar sakta kyunki har ek doosre ka wait kar raha hai. Simple lock contention se alag, ek deadlock intervention ke bina hamesha wait karega, isliye databases deadlock detection implement karte hain — is circular-wait pattern ko periodically ya continuously check karte hue — aur mil jaane pe, forcibly ek transaction (aksar wo jo 'cheaper' ho rollback karne ke liye) abort karte hain. Critically, database ek 'victim' choose karke deadlock resolve karta hai lekin automatically aborted transaction ka kaam retry ya complete nahi karta — application code ko specifically is deadlock error ko catch karna chahiye aur decide karna chahiye ki retry karna hai ya nahi.",
    interviewExplanation:
      "I'd name it and explain the resolution and the app-side responsibility: 'This is a deadlock — a circular wait where A holds a lock B needs and vice versa, and neither can ever proceed without intervention. Databases like HANA detect this pattern and forcibly abort one transaction as a \"victim,\" rolling it back and returning a deadlock error, letting the other proceed. But the database doesn't retry the aborted work for you — application code needs to specifically catch that deadlock error and decide whether to retry, or it silently loses that transaction's intended work.'",
    diagramNote:
      "'Transaction A: holds X, wants Y' + 'Transaction B: holds Y, wants X' → circular wait = deadlock → 'Database detects it, aborts one transaction (victim), returns deadlock error' → 'App code must catch and decide whether to retry'.",
    diagramMermaid: `flowchart LR
    A["Transaction A:<br/>holds X, wants Y"] --> C["Circular wait = deadlock"]
    B["Transaction B:<br/>holds Y, wants X"] --> C
    C --> D["DB detects, aborts one<br/>transaction (victim)"]
    D --> E["App code must catch<br/>deadlock error, decide retry"]`,
    realProjectExample:
      "Two concurrent order-processing transactions occasionally deadlocked when updating related records in opposite orders; the database correctly detected and resolved each occurrence by aborting one transaction, but the application initially didn't catch the specific deadlock error, silently losing that transaction's work until retry logic was added specifically for that error type.",
    interviewTip:
      "If asked the difference between lock contention (waiting) and a deadlock (circular waiting), being precise about the circular-wait definition and the database's detect-and-abort resolution — plus the app-side retry responsibility — shows complete, accurate understanding.",
    followupQuestions: [
      "How would you design transaction logic to minimize the chance of deadlocks occurring in the first place?",
      "What heuristic might a database use to choose which transaction becomes the 'victim'?",
      "How would you distinguish a deadlock error from other types of database errors in application code?",
    ],
    commonMistakes: [
      "Confusing simple lock contention (waiting for a lock to free up) with a genuine deadlock (circular waiting).",
      "Not implementing application-level retry logic for the specific deadlock error, silently losing aborted work.",
    ],
    importantPoints: [
      "A deadlock is a circular-wait pattern where two transactions each hold what the other needs.",
      "Databases detect deadlocks and forcibly abort one transaction (the 'victim') to break the cycle.",
      "Application code must catch the specific deadlock error and decide whether to retry — the database doesn't do this automatically.",
    ],
    revisionNotes: "Deadlock = circular wait (A holds X wants Y, B holds Y wants X). DB detects it, aborts one transaction as victim, returns a deadlock error — app code must catch it and retry, DB doesn't auto-complete the aborted work.",
  },
  {
    id: "scen-q44",
    topic: "Database Lock",
    prompt: "You suspect lock contention is worse during a specific batch job's execution window. How would you confirm this correlation and address it?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["database-lock", "batch-jobs", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Correlate lock wait/contention metrics against the batch job's actual execution window to confirm the timing overlap, then check whether the batch job holds locks longer than necessary (perhaps processing many rows in one large transaction instead of smaller batches) or whether it could be scheduled during a lower-traffic window, or use a less restrictive locking/isolation approach if the business logic allows it.",
    detailedAnswer:
      "First, confirm the correlation with actual data rather than assuming it — overlay lock wait time metrics against the batch job's precise execution window over several occurrences to see if the pattern holds consistently, not just once by coincidence. If confirmed, common fixes include: breaking the batch job's processing into smaller transactions/batches (processing 100 rows per transaction and committing, rather than one giant transaction touching everything, holding locks for a much shorter cumulative time per unit of work); rescheduling the batch job to a lower-traffic window if its timing isn't actually business-critical to run when it currently does; or, if the business logic genuinely allows it, using a less restrictive isolation level or more granular locking (row-level rather than table-level) specifically for the batch job's operations to reduce how much it blocks concurrent interactive traffic.",
    hindiExplanation:
      "Pehle, correlation ko actual data se confirm karo assume karne ki jagah — lock wait time metrics ko batch job ke precise execution window ke against overlay karo kai occurrences pe ye dekhne ke liye ki pattern consistently hold karta hai, sirf ek baar coincidence se nahi. Confirm hone pe, common fixes shamil hain: batch job ki processing ko smaller transactions/batches mein todna (100 rows per transaction process karna aur commit karna, ek giant transaction ki jagah jo sab kuch touch karta hai); batch job ko ek lower-traffic window mein reschedule karna agar uski timing actually business-critical nahi hai; ya, agar business logic genuinely allow karti hai, ek less restrictive isolation level ya more granular locking use karna specifically batch job ke operations ke liye.",
    interviewExplanation:
      "I'd confirm with data first, then fix: 'I'd overlay lock wait time metrics against the batch job's precise execution window over several occurrences to confirm the correlation holds consistently, not just coincidentally once. If confirmed, I'd break the batch into smaller per-transaction chunks instead of one giant transaction holding locks the whole time, consider rescheduling to a lower-traffic window if timing isn't business-critical, or use less restrictive locking for the batch specifically if the business logic allows it.'",
    diagramNote:
      "'Overlay lock wait metrics vs batch job's exact execution window (multiple occurrences)' → confirmed correlation → fixes: 'smaller per-transaction batches', 'reschedule to lower-traffic window', 'less restrictive locking for batch specifically'.",
    diagramMermaid: `flowchart TD
    A["Overlay lock wait metrics<br/>vs batch job's exact window"] --> B["Confirmed correlation"]
    B --> C["Smaller per-transaction batches"]
    B --> D["Reschedule to<br/>lower-traffic window"]
    B --> E["Less restrictive locking<br/>for the batch specifically"]`,
    realProjectExample:
      "Lock wait time metrics consistently spiked during a nightly batch job's exact execution window across two weeks of monitoring, confirming the correlation; breaking the job from one giant transaction into per-1000-row committed batches reduced lock hold duration dramatically and eliminated the interactive-traffic contention entirely.",
    interviewTip:
      "If asked how you'd confirm a suspected correlation before acting on it, explicitly describing overlaying metrics over multiple occurrences (not just one observed instance) shows disciplined, evidence-based diagnosis rather than acting on a single coincidental observation.",
    followupQuestions: [
      "How would you determine an appropriate batch size for splitting a large transaction?",
      "What are the tradeoffs of a lower-traffic window for a batch job versus a business requirement for it to run at a specific time?",
      "How would you monitor to confirm the fix actually reduced lock contention afterward?",
    ],
    commonMistakes: [
      "Acting on a suspected correlation without confirming it against actual metrics over multiple occurrences.",
      "Not considering smaller transaction batching as a fix, defaulting only to rescheduling or isolation-level changes.",
    ],
    importantPoints: [
      "Confirm the suspected correlation with actual lock-wait-versus-execution-window data first.",
      "Fix by breaking large transactions into smaller batches, rescheduling, or less restrictive locking if appropriate.",
      "Verify the fix actually reduced contention afterward with the same metrics.",
    ],
    revisionNotes: "Confirm batch-job-vs-lock-contention correlation with actual metrics over multiple occurrences first — fix via smaller per-transaction batches, rescheduling to low-traffic windows, or less restrictive locking for the batch specifically.",
  },
  {
    id: "scen-q45",
    topic: "Database Lock",
    prompt: "A row-level lock seems to be held by a transaction that, according to the application logs, already completed successfully. What would explain this discrepancy?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["database-lock", "orphaned-transaction", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The application-level 'completed successfully' log might have fired before the actual database commit finished (a logging-before-commit ordering bug), or a connection was left open without actually committing/rolling back (an improperly closed transaction due to an unhandled error path), leaving the lock held at the database level even though application code believes the operation finished.",
    detailedAnswer:
      "This apparent contradiction — the app thinks it's done, but the database still shows a held lock — points to a mismatch between what the application code believes happened and what the database actually did. One cause: a logging statement that fires based on the application code reaching a certain point (like right after issuing a commit command) rather than actually confirming the commit succeeded and fully completed — a subtle ordering bug where 'logged as complete' doesn't perfectly correspond to 'database transaction actually finished.' Another, often more concerning cause: an error path in the code that doesn't properly roll back or commit a transaction before considering the overall operation 'done' — perhaps an exception was caught and logged as a success by mistake, or a connection pool returned a connection to the pool without the transaction on it being properly closed first, leaving an orphaned transaction silently holding its locks indefinitely from the database's perspective, even though the application has moved on. This second case is a genuine bug worth finding and fixing, not just a logging quirk.",
    hindiExplanation:
      "Ye apparent contradiction — app sochta hai ki kaam ho gaya, lekin database abhi bhi ek held lock dikhata hai — us mismatch ko point karta hai jo application code believe karta hai kya hua uske aur database ne actually kya kiya uske beech. Ek cause: ek logging statement jo application code ek certain point pe pahunchne pe fire hoti hai (jaise commit command issue karne ke turant baad) actually confirm karne ki jagah ki commit succeed hua aur fully complete hua. Ek doosra, aksar zyada concerning cause: code mein ek error path jo properly rollback ya commit nahi karta ek transaction ko poori operation 'done' consider karne se pehle.",
    interviewExplanation:
      "I'd give two possible explanations: 'One: a logging statement firing based on reaching a certain point in code — right after issuing a commit — rather than confirming the commit actually fully completed, a subtle ordering bug. Two, and more concerning: an error path that doesn't properly roll back or commit before considering the operation done — maybe an exception was caught and mislogged as success, or a connection returned to the pool without the transaction being properly closed, leaving an orphaned transaction silently holding locks. The second case is a genuine bug worth finding and fixing, not just a logging quirk.'",
    diagramNote:
      "'App logs \"completed\" but DB still shows lock held' → two explanations: 'Logging fires before commit actually fully finished (ordering bug)' OR 'Error path leaves transaction unclosed — orphaned transaction silently holding locks (real bug)'.",
    diagramMermaid: `flowchart TD
    A["App logs 'completed'<br/>but DB shows lock held"] --> B["Logging fires before<br/>commit fully finishes"]
    A --> C["Error path leaves transaction<br/>unclosed — orphaned, real bug"]`,
    realProjectExample:
      "An investigation into a held lock from a supposedly-completed transaction uncovered an error-handling path that caught a downstream exception, logged a generic success message by mistake, and returned the database connection to the pool without ever calling commit or rollback — the orphaned transaction held its lock indefinitely until the connection was eventually recycled, causing intermittent contention until the error-handling bug was fixed.",
    interviewTip:
      "If asked to investigate this exact discrepancy, distinguishing the relatively benign logging-ordering explanation from the more serious orphaned-transaction-due-to-a-bug explanation (and pursuing the latter as a genuine bug to fix) shows precise, non-superficial diagnostic thinking.",
    followupQuestions: [
      "How would you find the specific code path that left a transaction unclosed?",
      "What database tooling would show you exactly which session/connection is holding a specific lock?",
      "How would you add safeguards (like a transaction timeout) to prevent an orphaned transaction from holding a lock indefinitely?",
    ],
    commonMistakes: [
      "Assuming a logging discrepancy alone explains this without investigating whether a genuine orphaned-transaction bug exists.",
      "Not tracing back from the specific held lock to the exact session/connection and code path responsible.",
    ],
    importantPoints: [
      "A held lock from an app-logged-as-complete transaction indicates a mismatch between app belief and actual DB state.",
      "Could be a benign logging-ordering issue, or a more serious orphaned transaction from an improperly-handled error path.",
      "The orphaned-transaction case is a genuine bug worth finding and fixing, not dismissing as a logging quirk.",
    ],
    revisionNotes: "App logs 'completed' but DB still holds the lock = either a logging-before-commit-finishes ordering issue, or a genuine orphaned-transaction bug (error path leaving a transaction unclosed) — investigate as a real bug, don't dismiss it.",
  },
  {
    id: "scen-q46",
    topic: "Database Lock",
    prompt: "How would optimistic locking (using a version/timestamp column) help avoid some of the lock contention issues discussed, and what's its tradeoff?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["database-lock", "optimistic-locking", "scenario"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Optimistic locking avoids holding a database lock for the duration of a user's think-time by instead checking, at write time, whether a version/timestamp column still matches what was originally read — if it does, the write proceeds; if not, another update happened in between and the write is rejected, requiring the application to handle the conflict (retry, merge, or alert the user) rather than the database blocking concurrent access the whole time.",
    detailedAnswer:
      "Traditional (pessimistic) locking holds a database lock from when a record is read for editing until the write completes — if there's meaningful think-time in between (a user reviewing a form before submitting), that lock is held the entire time, contributing exactly to the kind of contention discussed elsewhere. Optimistic locking instead doesn't hold any lock during that gap at all — it reads a version/timestamp column alongside the data, and when writing back, includes a condition checking that column still matches its originally-read value (`WHERE id = ? AND version = ?`); if another update happened in between, that version no longer matches, the WHERE condition matches zero rows, and the write is rejected, signaling a conflict. This avoids long-held locks entirely for the read-then-later-write pattern, at the cost of needing explicit application-level conflict handling (retry the operation, show the user a 'this was changed by someone else' message, or attempt an automatic merge) for the case where a genuine conflict does occur — a real tradeoff, not a free lunch, appropriate specifically for scenarios with meaningful gaps between read and write where genuine conflicts are relatively rare.",
    hindiExplanation:
      "Traditional (pessimistic) locking ek database lock hold karta hai jab se ek record edit ke liye read hota hai jab tak write complete nahi hota — agar beech mein meaningful think-time hai (ek user form review kar raha hai submit karne se pehle), wo lock poore time hold hota hai, exactly usi tarah ki contention mein contribute karte hue. Optimistic locking iske bajaye us gap ke dauraan koi lock hold hi nahi karta — ye ek version/timestamp column read karta hai data ke saath, aur write back karte waqt, ek condition include karta hai jo check kare ki wo column abhi bhi apni originally-read value se match karta hai.",
    interviewExplanation:
      "I'd explain the mechanism and the honest tradeoff: 'Pessimistic locking holds a lock from read until write completes — if there's think-time in between, that's contention. Optimistic locking holds no lock during that gap — it checks at write time whether a version column still matches what was originally read, via a WHERE clause condition. If another update happened, the version doesn't match, zero rows update, and the write is rejected. This avoids long-held locks, but at the cost of needing explicit conflict handling — retry, merge, or alert the user — a real tradeoff, appropriate when read-write gaps are common but genuine conflicts are relatively rare.'",
    diagramNote:
      "'Pessimistic locking: lock held from read to write (contributes to contention)' vs 'Optimistic locking: no lock held, version checked at write time — mismatch = rejected write, app must handle conflict (retry/merge/alert)'.",
    diagramMermaid: `flowchart LR
    A["Pessimistic locking"] --> B["Lock held read→write<br/>contributes to contention"]
    C["Optimistic locking"] --> D["No lock held —<br/>version checked at write time"]
    D --> E["Mismatch = rejected write,<br/>app handles conflict"]`,
    realProjectExample:
      "A form-editing screen with meaningful user think-time between loading a record and submitting changes was redesigned to use optimistic locking with a version column, eliminating the long lock-hold duration that had been contributing to contention, while a small percentage of genuinely concurrent edits now surfaced a 'this record was changed by someone else, please review' message instead of silently blocking or overwriting.",
    interviewTip:
      "If asked when you'd choose optimistic over pessimistic locking, the correct decision factor is the length of the gap between read and write plus how rare genuine conflicts actually are — not a blanket preference for one approach.",
    followupQuestions: [
      "How would you implement the application-level conflict handling when an optimistic locking write is rejected?",
      "When would pessimistic locking still be the better choice despite optimistic locking's contention benefits?",
      "How would you choose between a version number and a timestamp for the optimistic locking column?",
    ],
    commonMistakes: [
      "Assuming optimistic locking eliminates conflicts entirely rather than shifting responsibility to application-level conflict handling.",
      "Applying optimistic locking to scenarios with very frequent genuine conflicts, where it would cause excessive rejected writes.",
    ],
    importantPoints: [
      "Optimistic locking avoids holding a lock during read-to-write gaps by checking a version column at write time.",
      "A mismatched version means a conflict — the write is rejected, and the application must handle it explicitly.",
      "Appropriate when read-write gaps are common but genuine concurrent conflicts are relatively rare.",
    ],
    revisionNotes: "Optimistic locking: no lock held during read-write gap, version column checked at write time — mismatch = rejected write, app must handle the conflict (retry/merge/alert) — good when conflicts are rare but read-write gaps are common.",
  },
  {
    id: "scen-q47",
    topic: "Project Architecture",
    prompt: "The business now wants the same approval app extended to support two different S/4HANA systems for two different business units. How would you adapt your original architecture?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["project-architecture", "multi-system", "design"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Configure two separate destinations (and Cloud Connector mappings, if on-prem) — one per S/4HANA system — with the app's logic parameterized to select the correct destination based on which business unit's data is being processed, rather than hard-coding a single destination; this keeps the app's core logic unified while the actual routing to the correct backend system is a configuration/parameter concern.",
    detailedAnswer:
      "Rather than building two separate, duplicate apps (one per S/4HANA system) or hard-coding a single destination that can't flex, the cleaner extension configures two distinct destinations (each with its own Cloud Connector mapping if the target systems are on-premise), and adds a parameter to the app's logic — likely derived from the business unit context of whatever record is being processed — that selects which destination to actually call for a given request. This mirrors the same pattern discussed for supporting different environments via destination naming/configuration, just applied to routing between two genuinely different backend systems within one running app, rather than routing to different environments of the same system. The core application logic, UI, and workflow definitions stay unified and maintained once, while the specific destination selected is a runtime, data-driven decision rather than a build-time or deployment-time one.",
    hindiExplanation:
      "Do separate, duplicate apps banane ki jagah (ek per S/4HANA system) ya ek single destination hard-code karne ki jagah jo flex nahi kar sakta, cleaner extension do distinct destinations configure karta hai (har ek ka apna Cloud Connector mapping agar target systems on-premise hain), aur app ki logic mein ek parameter add karta hai — likely business unit context se derived jo bhi record process ho raha hai — jo select karta hai kaunsa destination actually call karna hai ek given request ke liye. Ye exactly wahi pattern mirror karta hai jo different environments support karne ke liye discuss hua tha destination naming/configuration ke through, bas do genuinely different backend systems ke beech routing pe apply hota hai ek chalte app ke andar.",
    interviewExplanation:
      "I'd extend rather than duplicate: 'Rather than two duplicate apps or a hard-coded single destination, I'd configure two distinct destinations — each with its own Cloud Connector mapping if on-prem — and add a parameter to the app's logic, derived from the business unit context of the record being processed, that selects which destination to call. This mirrors the same pattern used for supporting different environments via destination configuration, just applied to routing between two genuinely different backend systems within one app. The core logic and UI stay unified, and destination selection becomes a runtime, data-driven decision.'",
    diagramNote:
      "'One unified app: UI, workflow, core logic' → parameterized destination selection (based on business unit context) → 'Destination A: S/4HANA System 1' or 'Destination B: S/4HANA System 2'.",
    diagramMermaid: `flowchart TD
    A["One unified app:<br/>UI, workflow, core logic"] --> B["Parameterized destination<br/>selection (business unit context)"]
    B --> C["Destination A:<br/>S/4HANA System 1"]
    B --> D["Destination B:<br/>S/4HANA System 2"]`,
    realProjectExample:
      "Extending an approval app to serve two business units on separate S/4HANA systems was done by configuring two destinations and adding a business-unit-derived parameter selecting between them at runtime, avoiding a duplicate app codebase entirely and keeping the workflow logic, UI, and maintenance effort unified across both business units.",
    interviewTip:
      "If asked how you'd scale an architecture to support multiple backend systems, explicitly rejecting app duplication in favor of parameterized destination selection shows a scalable, maintainable design instinct rather than a quick-but-costly copy-paste approach.",
    followupQuestions: [
      "How would you determine which business unit's destination to use for a given incoming request?",
      "What would change if a third S/4HANA system needed to be added later?",
      "Would this same parameterized-destination approach work if the two S/4HANA systems had meaningfully different data models?",
    ],
    commonMistakes: [
      "Building two entirely separate, duplicate applications instead of parameterizing a single unified app.",
      "Hard-coding a single destination that can't flex to support a second backend system without a code change.",
    ],
    importantPoints: [
      "Configure separate destinations per backend system, avoiding a hard-coded single destination.",
      "Parameterize the app's logic to select the correct destination based on business context (like business unit).",
      "Keeps core application logic unified while destination routing becomes a runtime, data-driven decision.",
    ],
    revisionNotes: "Extend to multiple backend systems: configure separate destinations per system, parameterize the app to select the right one based on business context (business unit) — keeps one unified app, avoids duplicate codebases.",
  },
  {
    id: "scen-q48",
    topic: "Project Architecture",
    prompt: "Six months after launch, the business asks why the approval app's data can't be included in their existing company-wide reporting/BI tool. What architectural gap does this reveal, and how would you address it?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["project-architecture", "reporting-integration", "design"],
    estimatedMinutes: 3,
    expectedAnswer:
      "This reveals that the original architecture didn't consider a reporting/analytics access path as a requirement — the fix is exposing the app's HANA Cloud data (or a purpose-built reporting view/Calculation View on top of it) to the existing BI tool via an appropriate connection, without disrupting the app's own transactional OData API, which likely isn't designed for the kind of broad, ad-hoc querying a BI tool needs.",
    detailedAnswer:
      "The original architecture likely focused entirely on the transactional need (the approval workflow itself) without considering a separate, legitimate analytical/reporting access requirement — a genuine, common gap when requirements gathering focuses on the immediate functional need without asking about downstream reporting consumers. The transactional OData API built for the app's own UI is typically not well-suited for a BI tool's access pattern (broad scans, complex aggregations, ad-hoc query flexibility) — exposing that same API to a BI tool risks either poor BI tool performance or accidentally impacting the transactional app's own performance if the BI tool runs a heavy query against the same live database. The better fix is building a purpose-built reporting view (or a dedicated Calculation View, as covered for HANA Cloud) specifically shaped for the BI tool's actual query patterns, connected via whatever integration mechanism the BI tool supports (a direct HANA connection, an OData feed specifically for reporting, or a scheduled export), decoupled from the transactional app's own API and performance characteristics.",
    hindiExplanation:
      "Original architecture likely entirely transactional need pe focus karta tha (approval workflow khud) bina ek separate, legitimate analytical/reporting access requirement consider kiye — ek genuine, common gap jab requirements gathering immediate functional need pe focus karta hai downstream reporting consumers ke baare mein poochhe bina. App ki apni UI ke liye banaya gaya transactional OData API typically ek BI tool ke access pattern (broad scans, complex aggregations, ad-hoc query flexibility) ke liye well-suited nahi hota — wahi API ek BI tool ko expose karna risk uthata hai. Better fix hai ek purpose-built reporting view (ya ek dedicated Calculation View) banana specifically BI tool ke actual query patterns ke liye shaped, jo transactional app ke apne API aur performance characteristics se decoupled ho.",
    interviewExplanation:
      "I'd name the gap and the fix: 'This reveals the original architecture focused entirely on the transactional need without considering reporting as a separate requirement — a common gap when requirements gathering doesn't ask about downstream reporting consumers. The transactional OData API isn't well-suited for a BI tool's broad-scan, aggregation-heavy access pattern — exposing it directly risks either poor BI performance or impacting the app's own transactional performance. I'd build a purpose-built reporting view or Calculation View shaped for the BI tool's actual patterns, connected via whatever mechanism it supports, decoupled from the transactional API entirely.'",
    diagramNote:
      "'Original architecture: transactional OData API only (built for app's own UI)' — gap: no reporting access path considered → fix: 'Purpose-built reporting view/Calculation View, connected to BI tool separately, decoupled from transactional API'.",
    diagramMermaid: `flowchart TD
    A["Original: transactional<br/>OData API only"] --> B["Gap: no reporting<br/>access path considered"]
    B --> C["Fix: purpose-built reporting<br/>view/Calculation View"]
    C --> D["Connected to BI tool,<br/>decoupled from transactional API"]`,
    realProjectExample:
      "An approval app's original architecture had no reporting access path at all, forcing the BI team to request direct database access to the transactional tables as a stopgap, which risked impacting live app performance; building a dedicated Calculation View shaped for the BI tool's actual reporting queries, connected separately from the transactional OData API, resolved this cleanly without any risk to the live app.",
    interviewTip:
      "If asked to identify a gap in a completed architecture, explicitly naming 'reporting/analytics as a separate, unconsidered requirement' (rather than a vague 'something was missed') shows you can retrospectively audit a design for exactly the kind of gap that commonly surfaces well after launch.",
    followupQuestions: [
      "How would you gather requirements upfront to avoid this kind of gap being discovered only after launch?",
      "What connection mechanism would a typical BI tool use to consume a HANA Calculation View?",
      "Would this reporting view need its own separate authorization model from the transactional app?",
    ],
    commonMistakes: [
      "Exposing the transactional OData API directly to a BI tool instead of building a purpose-built, decoupled reporting view.",
      "Not considering downstream reporting/analytics consumers as a distinct requirement during original architecture design.",
    ],
    importantPoints: [
      "This reveals a common gap — reporting/analytics access not considered as a separate requirement during original design.",
      "The transactional API isn't well-suited for a BI tool's broad-scan, aggregation-heavy access pattern.",
      "Fix with a purpose-built reporting view/Calculation View, decoupled from the transactional app's own API and performance.",
    ],
    revisionNotes: "Post-launch reporting request reveals a common architecture gap: reporting wasn't considered separately from the transactional need. Fix with a purpose-built reporting view/Calculation View for the BI tool, decoupled from the transactional OData API.",
  },
  {
    id: "scen-q49",
    topic: "Project Architecture",
    prompt: "A security audit flags that your approval app's architecture has no way to prove, after the fact, who approved a specific high-value transaction and when. How would you address this gap architecturally?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["project-architecture", "audit-trail", "design"],
    estimatedMinutes: 3,
    expectedAnswer:
      "This reveals that audit/compliance requirements weren't explicitly designed for upfront — address it by adding a dedicated audit trail (a separate, append-only record of who did what and when, tied to the real authenticated user via principal propagation/managed aspect fields, not just the current state of the approval record) that's genuinely tamper-resistant and specifically designed for after-the-fact accountability, distinct from the app's normal transactional data.",
    detailedAnswer:
      "If the app only stores the current state of an approval (status: approved, approvedBy: some field), that's insufficient for genuine audit purposes — it can be overwritten, doesn't necessarily capture every intermediate action, and might not even reliably capture the real individual's identity if principal propagation wasn't properly configured for downstream systems. A proper architectural fix adds a dedicated, append-only audit trail — a separate table/log specifically designed to record each significant action (approved, rejected, modified) along with who performed it (the real authenticated user, correctly captured via `managed`-aspect-style fields or explicit logging tied to the actual authenticated identity) and precisely when, structured so it's genuinely difficult to retroactively alter (an append-only design, potentially with restricted write/delete permissions even for admins). This is a deliberately separate concern from the app's normal transactional CRUD data — the audit trail's entire purpose is being trustworthy evidence after the fact, which requires different design considerations (immutability, completeness) than data optimized for the app's own day-to-day operational use.",
    hindiExplanation:
      "Agar app sirf ek approval ka current state store karta hai, ye genuine audit purposes ke liye insufficient hai — ise overwrite kiya ja sakta hai, zaroori nahi ki har intermediate action capture kare, aur shayad real individual ki identity reliably capture na kare agar principal propagation properly configure nahi hui thi. Ek proper architectural fix ek dedicated, append-only audit trail add karta hai — ek separate table/log specifically design ki gayi har significant action record karne ke liye (approved, rejected, modified) us insaan ke saath jisne wo action kiya aur precisely kab, structured aise ki retroactively alter karna genuinely mushkil ho.",
    interviewExplanation:
      "I'd identify the gap and the fix: 'Storing just the current state — status, approvedBy — is insufficient for real audit purposes, since it can be overwritten and might not even reliably capture the real individual if principal propagation wasn't properly set up. I'd add a dedicated, append-only audit trail — a separate log recording each significant action, who did it via the real authenticated identity, and precisely when — structured to be genuinely difficult to alter retroactively, deliberately separate from the app's normal transactional data, since its whole purpose is trustworthy after-the-fact evidence.'",
    diagramNote:
      "'Current-state-only storage (status, approvedBy field)' — insufficient, overwritable → 'Dedicated append-only audit trail: who (real identity), what action, when — tamper-resistant, separate from transactional data'.",
    diagramMermaid: `flowchart LR
    A["Current-state-only storage<br/>status, approvedBy field"] --> B["Insufficient — overwritable"]
    C["Dedicated append-only<br/>audit trail"] --> D["Who/what/when, tamper-resistant,<br/>separate from transactional data"]`,
    realProjectExample:
      "A security audit finding that the approval app couldn't prove after the fact who had approved a specific high-value transaction led to adding a dedicated append-only audit log capturing every state transition with the real authenticated user's identity and a precise timestamp, restricted from modification even by administrators — satisfying the compliance requirement without changing the app's normal operational data model.",
    interviewTip:
      "If asked how you'd retrofit audit/compliance requirements into an already-built app, distinguishing the audit trail as a deliberately separate, purpose-built concern (not just adding more fields to the existing transactional table) shows understanding of why audit data has genuinely different design requirements.",
    followupQuestions: [
      "How would you ensure the audit trail genuinely captures the real authenticated user, not a generic technical identity?",
      "What would make an audit trail 'tamper-resistant' at a technical level — restricted permissions, cryptographic signing, or something else?",
      "How would you retrofit this into an already-live app without disrupting existing users?",
    ],
    commonMistakes: [
      "Assuming the current-state approval status field alone is sufficient for genuine audit/compliance purposes.",
      "Not treating the audit trail as a deliberately separate, differently-designed concern from normal transactional data.",
    ],
    importantPoints: [
      "Current-state-only storage is insufficient for genuine after-the-fact audit purposes — it's overwritable and incomplete.",
      "Add a dedicated, append-only audit trail capturing who (real identity), what, and when for each significant action.",
      "This is a deliberately separate concern from transactional data, requiring different design considerations (immutability).",
    ],
    revisionNotes: "Current-state-only approval status is insufficient for audit purposes — add a dedicated, append-only, tamper-resistant audit trail (real identity, action, timestamp) as a deliberately separate concern from transactional data.",
  },
  {
    id: "scen-q50",
    topic: "Project Architecture",
    prompt: "Looking back at a project a year after launch, what's one architectural decision you'd revisit given what you know now, and why does this matter for how you'd approach a new project?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["project-architecture", "retrospective", "design"],
    estimatedMinutes: 3,
    expectedAnswer:
      "This is an open-ended reflection question testing whether a candidate can honestly evaluate their own past architectural decisions with the benefit of hindsight (rather than defending every choice as if it were perfect), and whether they've internalized specific, transferable lessons — a strong answer names a concrete decision, explains why it seemed reasonable at the time, what actually happened, and what specific practice they now apply differently as a result.",
    detailedAnswer:
      "This question isn't really about finding one specific correct answer — it's testing intellectual honesty and the ability to learn from experience, which interviewers value highly since it predicts whether someone will keep improving or keep repeating the same mistakes. A strong answer follows a specific structure: name a concrete decision (not a vague 'I'd be more careful'), explain the reasoning that made it seem right at the time (showing it wasn't a careless mistake, but a reasonable judgment call given what was known then), describe what actually happened that revealed the gap (a concrete consequence, not just an abstract 'it wasn't ideal'), and articulate a specific, transferable practice now applied differently as a result — something like 'now I explicitly ask about reporting/audit requirements upfront during architecture design, not just functional requirements' rather than a vague platitude. This structure — specific decision, honest reasoning, concrete consequence, transferable lesson — is what distinguishes genuine reflective growth from a rehearsed, generic answer.",
    hindiExplanation:
      "Ye question really ek specific correct answer dhundhne ke baare mein nahi hai — ye intellectual honesty aur experience se seekhne ki ability test karta hai, jo interviewers highly value karte hain kyunki ye predict karta hai ki koi improve karta rahega ya same mistakes repeat karta rahega. Ek strong answer ek specific structure follow karta hai: ek concrete decision naam do, us reasoning ko explain karo jo use us time pe sahi lagne diya, describe karo actually kya hua jisne gap reveal kiya, aur ek specific, transferable practice articulate karo jo ab differently apply karte ho.",
    interviewExplanation:
      "I'd give a concrete example following the honest-reflection structure: 'I'd name a specific decision — say, not considering reporting requirements upfront in an approval app's architecture. At the time it seemed reasonable since requirements gathering focused on the immediate functional workflow. Six months later, a reporting request revealed the gap, requiring a retrofit. Now, I explicitly ask about downstream reporting and audit requirements upfront during architecture design, not just functional requirements — a specific, transferable practice, not just a vague \"be more careful\" resolution.'",
    diagramNote:
      "Strong reflection structure: 'Name a specific decision' → 'Honest reasoning at the time' → 'Concrete consequence that revealed the gap' → 'Specific, transferable practice now applied differently'.",
    diagramMermaid: `flowchart LR
    A["Name a specific decision"] --> B["Honest reasoning<br/>at the time"]
    B --> C["Concrete consequence<br/>that revealed the gap"]
    C --> D["Specific transferable<br/>practice now applied"]`,
    realProjectExample:
      "Reflecting on the approval app project, the team specifically identified not asking about reporting/BI integration requirements during initial architecture design as the decision they'd revisit, leading to a standing practice of explicitly including 'who else needs this data, and how' as a required question in every subsequent project's architecture design phase.",
    interviewTip:
      "If asked this kind of retrospective question, avoid defending every past decision as perfect or giving a vague non-answer ('everything went well') — interviewers specifically want to see honest, specific self-evaluation, which is a stronger signal than a flawless-sounding but unconvincing narrative.",
    followupQuestions: [
      "How would you build a habit of capturing these lessons systematically across projects, not just recalling them ad-hoc in an interview?",
      "What's the difference between a decision that was genuinely wrong versus one that was reasonable given the information available at the time?",
      "How would you share this kind of lesson with a broader team, not just apply it individually?",
    ],
    commonMistakes: [
      "Giving a vague, non-specific answer ('I'd be more careful') instead of naming a concrete decision and lesson.",
      "Defending every past architectural decision as if it were perfect, missing the point of genuine reflective growth.",
    ],
    importantPoints: [
      "This question tests honest self-evaluation and the ability to learn from experience, not a single correct answer.",
      "A strong answer names a specific decision, honest reasoning at the time, a concrete consequence, and a transferable lesson.",
      "Interviewers value this because it predicts whether someone improves over time or repeats the same mistakes.",
    ],
    revisionNotes: "Retrospective questions test honest self-evaluation, not a single correct answer — structure: specific decision → honest reasoning at the time → concrete consequence → specific, transferable practice now applied differently.",
  },
];

export const scenarioBasedMcqs: BtpMcq[] = [
  {
    id: "scen-mcq1",
    topic: "Production Issues",
    prompt: "What should be your first step when production goes down?",
    options: [
      "Immediately start rewriting the suspected buggy code",
      "Confirm the scope of the issue and check recent changes/deploys",
      "Restart every service in the landscape",
      "Wait for someone else to investigate first",
    ],
    correctIndex: 1,
    explanation: "Triage starts with confirming scope and checking recent changes, since a recent deploy or config change is the most common cause of a sudden new outage.",
  },
  {
    id: "scen-mcq2",
    topic: "Authentication Failure",
    prompt: "A sudden, widespread authentication failure across many users most likely points to what kind of cause?",
    options: [
      "A bug in one specific user's browser",
      "A platform/config-level issue — XSUAA health, trust config, or certificate expiry",
      "The user typed their password wrong",
      "A CSS styling issue",
    ],
    correctIndex: 1,
    explanation: "Since authentication is handled by XSUAA and middleware, not app code, a widespread failure points to platform/config issues like trust configuration changes or certificate expiry.",
  },
  {
    id: "scen-mcq3",
    topic: "Token Expired",
    prompt: "What's the correct fix for users getting 401 errors mid-session due to token expiry?",
    options: [
      "Make the access token last forever",
      "Implement silent token refresh using a refresh token",
      "Tell users to refresh the page manually every few minutes",
      "Disable authentication entirely",
    ],
    correctIndex: 1,
    explanation: "Silent token refresh using a refresh token renews the access token transparently before or at expiry, avoiding both abrupt session loss and the security risk of overly long-lived access tokens.",
  },
  {
    id: "scen-mcq4",
    topic: "Deployment Failed",
    prompt: "After fixing the root cause of a failed MTA deployment, what's the standard recovery step?",
    options: [
      "Manually recreate every resource by hand",
      "Re-run cf deploy with the corrected MTA — it's designed to be safely re-runnable",
      "Delete the entire subaccount and start over",
      "There is no way to recover from a failed deployment",
    ],
    correctIndex: 1,
    explanation: "The MTA deployer is designed to be safely re-run after fixing the root cause of a failure, rather than requiring manual resource recreation.",
  },
  {
    id: "scen-mcq5",
    topic: "Memory Leak",
    prompt: "Does simply increasing an app's memory limit fix a genuine memory leak?",
    options: [
      "Yes, permanently",
      "No — it only delays the eventual crash without fixing the underlying accumulating resource",
      "Yes, but only for Java apps",
      "Memory limits have no relation to memory leaks",
    ],
    correctIndex: 1,
    explanation: "A true memory leak means something accumulates unboundedly; raising the limit only delays the crash, not fixes the root cause like an unbounded cache or unclosed connections.",
  },
  {
    id: "scen-mcq6",
    topic: "Scaling",
    prompt: "High latency with normal CPU and memory usage most likely points to what kind of issue?",
    options: [
      "Definitely needs more CPU cores",
      "An I/O-bound or contention issue, like database connection pool exhaustion",
      "A UI rendering bug",
      "Insufficient disk space",
    ],
    correctIndex: 1,
    explanation: "Normal CPU/memory rules out a compute bottleneck — the likely cause is I/O-bound, like connection pool exhaustion or a slow downstream dependency.",
  },
  {
    id: "scen-mcq7",
    topic: "Database Lock",
    prompt: "What's a common root cause of database lock contention causing widespread timeouts?",
    options: [
      "Too many users logged in at once",
      "A transaction unnecessarily holding a lock while doing slow, unrelated work (like an external API call)",
      "The database running out of disk space",
      "Using the wrong programming language",
    ],
    correctIndex: 1,
    explanation: "A common cause is a transaction that performs slow, unrelated operations (like calling an external API) while still holding a lock needed only for the brief data-write portion.",
  },
  {
    id: "scen-mcq8",
    topic: "CAP Crash",
    prompt: "A CAP app crash-loops right after a fresh deployment. What should you check first?",
    options: [
      "Restart the entire subaccount",
      "cf logs --recent for the actual startup exception",
      "Rewrite the app in a different language",
      "Increase the memory limit blindly",
    ],
    correctIndex: 1,
    explanation: "A crash-loop right after deploy almost always means a startup failure — the actual exception is visible in cf logs --recent, pointing to the specific cause (missing binding, CDS error, dependency mismatch).",
  },
  {
    id: "scen-mcq9",
    topic: "Memory Leak",
    prompt: "A memory leak is masked by Cloud Foundry auto-restarting the app before it hits the hard limit. Is this still worth fixing?",
    options: [
      "No, since the app never visibly crashes",
      "Yes — each restart still drops in-flight requests and the masking is fragile under traffic growth",
      "No, restarts are completely free with zero cost",
      "Only if the app crashes at least once a day",
    ],
    correctIndex: 1,
    explanation: "Auto-restart masking a leak isn't the same as no problem — each restart drops in-flight requests, and relying on the masking is fragile since traffic growth can suddenly make it visible and serious.",
  },
  {
    id: "scen-mcq10",
    topic: "Scaling",
    prompt: "Scaling from 2 to 10 instances only yields ~2x throughput instead of the expected ~5x. What's the likely cause?",
    options: [
      "The app code itself is broken",
      "A shared downstream bottleneck, like database connection pool limits, that doesn't scale with app instances",
      "Cloud Foundry has a hard cap of 2x improvement",
      "The instances aren't actually running"
    ],
    correctIndex: 1,
    explanation: "Horizontal scaling only helps if every downstream dependency can absorb the extra load too — a shared, non-scaling bottleneck like the database's connection pool commonly caps the actual throughput gain.",
  },
  {
    id: "scen-mcq11",
    topic: "Performance",
    prompt: "An endpoint has gotten progressively slower over months with zero code changes. What's the most likely cause?",
    options: [
      "A subtle, undetected code regression",
      "Data volume growth — a query that was fine against a small dataset degrades as the table grows",
      "The programming language became slower over time",
      "Random chance with no identifiable cause",
    ],
    correctIndex: 1,
    explanation: "With no code changes, the variable that actually changed is the data — a query fine against a small dataset can gradually degrade as real production data accumulates over months.",
  },
  {
    id: "scen-mcq12",
    topic: "Database Lock",
    prompt: "What is a deadlock, and how do databases like HANA typically resolve it?",
    options: [
      "A permanently frozen database with no recovery possible",
      "A circular wait between transactions; the database detects it and forcibly aborts one transaction (the 'victim') to break the cycle",
      "A type of index corruption",
      "A network timeout unrelated to locking",
    ],
    correctIndex: 1,
    explanation: "A deadlock is a circular wait where each transaction holds what the other needs; the database detects this and aborts one transaction, returning an error the application must catch and handle (e.g. retry).",
  },
  {
    id: "scen-mcq13",
    topic: "Project Architecture",
    prompt: "Six months after launch, the business wants the approval app's data included in their BI tool, but the architecture never considered this. What's the best fix?",
    options: [
      "Give the BI tool direct access to the transactional OData API",
      "Build a purpose-built reporting view/Calculation View, decoupled from the transactional API, shaped for the BI tool's query patterns",
      "Rebuild the entire app from scratch",
      "Tell the business it's not possible",
    ],
    correctIndex: 1,
    explanation: "The transactional API isn't suited for a BI tool's broad-scan, aggregation-heavy access pattern — a dedicated, decoupled reporting view avoids risking the app's own transactional performance.",
  },
];
