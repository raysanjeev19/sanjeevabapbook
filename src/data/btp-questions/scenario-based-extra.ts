export const scenarioBasedTopicNotes: Record<string, string> = {
  "Production Issues":
    "Incident ke pehle 10 minutes triage ke liye hain, root-cause-fix ke liye nahi: scope confirm karo → recent changes/deploys check karo (achanak outage ka sabse common cause) → `cf logs --recent` + `cf events` → dependency health check karo (HANA/XSUAA/external APIs) → stakeholders ko status communicate karo jaldi, root cause milne se pehle bhi.",
  "Authentication Failure":
    "Kyunki authentication XSUAA/middleware se handle hoti hai, widespread failure almost hamesha platform/config-level cause hai, app code nahi: XSUAA health → Trust Config/IdP changes → certificate/key expiry (common, preventable) → app ki XSUAA binding/role collection changes.",
  "Token Expired":
    "Access tokens deliberately short-lived hote hain security ke liye. Mid-session expiry bina refresh ke abrupt 401s aur lost work deta hai. Fix = silent token refresh via refresh token, na ki simply expiry time badhana (jo security tradeoff hai).",
  "Destination Missing":
    "'Destination not found' usually simple config issue hai: destination exist karta hai kya (delete/rename hua?) → Destination service still bound hai kya → exact case-sensitive name match hai kya (typos common cause hain).",
  "Deployment Failed":
    "Failed `cf deploy`: deployment logs se specific failure reason nikaalo (quota, bad config, timeout — sab alag fixes) → actual running state verify karo (assume mat karo) → root cause fix karo → `cf deploy` dobara chalao (safely re-runnable designed hai).",
  "CAP Crash":
    "Crash-loop deploy ke turant baad usually startup failure hai — `cf logs --recent` boot exception dikhayega. Common causes: missing env var/binding, CDS compilation error, dependency version mismatch (local vs deployed), missing/broken HANA binding.",
  "Memory Leak":
    "Pehle confirm karo ye genuinely unbounded leak hai (metrics mein steady climb), normal fluctuation nahi. Heap snapshots do points pe lekar diff karo — reveal karta hai kya accumulate ho raha hai (unbounded cache, unremoved listeners, unclosed connections). Sirf memory limit badhana crash delay karta hai, fix nahi karta.",
  Scaling:
    "Normal CPU/memory + high latency = compute problem nahi hai, scale up karne se help nahi milegi. Check karo: DB connection pool exhaustion (queueing), slow downstream external API (idle-waiting), blocking single-threaded operation (requests serialize ho rahe).",
  Performance:
    "Same code, kuch specific tenants ke liye hi slow — likely data-dependent hai, code-dependent nahi. Affected vs unaffected tenant ka data volume/shape compare karo, fir specifically affected tenant ke data ke against execution plan lo — missing index ya expensive join at scale reveal hoga.",
  "Database Lock":
    "Lock contention: database ki lock/session monitoring views use karo exactly identify karne ke liye kaun lock hold kar raha hai aur kya kar raha hai. Common cause: slow, unrelated work (jaise external API call) transaction ke andar hote hue lock zaroorat se zyada der hold hota hai. Fix = transaction scope narrow karo, sirf timeout badhana nahi.",
  "Project Architecture":
    "Layered reasoning se architecture design karo: Extension approach (CAP, clean-core, OData/events) → Data (HANA Cloud) → Security (XSUAA, role collections) → Connectivity (Destination + Cloud Connector agar on-prem) → Landscape (Dev/QA/Prod + MTA-based CI/CD). Har choice ka reason batao, sirf technology names nahi.",
};
