import type { BtpMcq, BtpQuestion } from "@/lib/btp-content";

/** Section 14 — Monitoring. Interview questions, full format. */
export const monitoringQuestions: BtpQuestion[] = [
  {
    id: "mon-q1",
    topic: "Application Logging",
    prompt: "What is the Application Logging service, and why bind it instead of relying on `cf logs`?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["application-logging", "cloud-foundry"],
    estimatedMinutes: 3,
    expectedAnswer:
      "The Application Logging service persists logs long-term and makes them searchable/filterable through a dedicated UI (backed by an ELK-style stack); `cf logs` alone only shows a limited recent buffer and has no persistence, search, or cross-instance aggregation once that buffer ages out.",
    detailedAnswer:
      "As covered earlier, Cloud Foundry's Loggregator only retains a limited recent window of logs — fine for live tailing or checking what just happened, but useless for investigating an issue from last week or searching across many app instances at once. Binding the Application Logging service gives your app a persistent log store with a proper search UI, letting you filter by time range, severity, or free text across all instances and over a much longer retention period, and often integrates with structured logging (JSON log lines with custom fields you can filter on) for much richer investigation than plain text `cf logs` output.",
    hindiExplanation:
      "Jaisa pehle cover kiya, Cloud Foundry ka Loggregator sirf ek limited recent window ke logs retain karta hai — live tailing ya abhi kya hua check karne ke liye theek hai, lekin pichle hafte ka koi issue investigate karne ya kai app instances mein ek saath search karne ke liye useless hai. Application Logging service bind karne se tumhare app ko ek persistent log store milta hai ek proper search UI ke saath, jisse tum time range, severity, ya free text se filter kar sakte ho sab instances mein aur kaafi lambi retention period ke saath, aur aksar structured logging ke saath integrate hota hai (JSON log lines custom fields ke saath jinpe filter kar sako).",
    interviewExplanation:
      "I'd connect it to Loggregator's limitation: 'Loggregator only keeps a limited recent buffer — great for live tailing, useless for investigating something from last week or searching across many instances. Binding Application Logging gives a persistent log store with a real search UI — filter by time, severity, or free text — and often supports structured JSON logging for much richer investigation.'",
    diagramNote:
      "'cf logs (Loggregator, limited recent buffer)' vs 'Application Logging service (persistent, searchable, cross-instance, structured logs)'.",
    diagramMermaid: `flowchart LR
    A["cf logs<br/>Loggregator, limited recent buffer"]
    B["Application Logging service<br/>persistent, searchable, cross-instance"]`,
    realProjectExample:
      "Investigating an intermittent error reported by a user two days earlier was only possible because Application Logging had retained and indexed the relevant log lines — plain `cf logs --recent` would have long since lost that history.",
    interviewTip:
      "If asked 'how would you investigate an issue from several days ago', the Application Logging service (not `cf logs`) is the correct answer — the retention window is the key differentiator.",
    followupQuestions: [
      "What's a benefit of structured (JSON) logging over plain text logs?",
      "How long does Application Logging typically retain data compared to Loggregator's buffer?",
      "Can Application Logging aggregate logs across multiple different apps?",
    ],
    commonMistakes: [
      "Relying solely on `cf logs --recent` for any real production investigation.",
      "Not knowing Application Logging supports structured/JSON log filtering, not just plain text search.",
    ],
    importantPoints: [
      "cf logs/Loggregator = limited recent buffer, no persistence.",
      "Application Logging service = persistent, searchable, cross-instance log store.",
      "Often supports structured (JSON) logging for richer filtering.",
    ],
    revisionNotes: "Application Logging service = persistent, searchable log store (vs Loggregator's limited recent buffer) — needed for real investigation beyond 'just happened'.",
  },
  {
    id: "mon-q2",
    topic: "Logs",
    prompt: "What is structured logging, and why is it preferred over plain text log messages in production?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["logs", "structured-logging"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Structured logging emits log entries as machine-parseable data (typically JSON) with named fields (like `userId`, `orderId`, `durationMs`) rather than free-form text sentences, letting log tools filter, aggregate, and search on those specific fields precisely instead of relying on fragile text pattern matching.",
    detailedAnswer:
      "A plain text log line like `\"Order 123 processed for user 456 in 230ms\"` is readable by a human but requires fragile regex/text parsing to extract the order ID, user ID, or duration programmatically. A structured log entry expresses the same event as `{\"event\": \"order_processed\", \"orderId\": 123, \"userId\": 456, \"durationMs\": 230}` — every field is directly queryable ('show me all orders that took over 500ms', 'show me every log entry for user 456') without any text parsing, and log aggregation tools can build dashboards, alerts, and precise filters directly on these fields. The tradeoff is structured logs are less immediately human-readable when eyeballed raw, but log viewer UIs typically render them nicely, so this is rarely a real downside in practice.",
    hindiExplanation:
      "Ek plain text log line jaise `\"Order 123 processed for user 456 in 230ms\"` insaan ke liye readable hai lekin order ID, user ID, ya duration ko programmatically extract karne ke liye fragile regex/text parsing chahiye. Ek structured log entry usi event ko `{\"event\": \"order_processed\", \"orderId\": 123, \"userId\": 456, \"durationMs\": 230}` ki tarah express karta hai — har field directly queryable hai ('mujhe wo saare orders dikhao jinme 500ms se zyada laga', 'user 456 ke saare log entries dikhao') bina kisi text parsing ke, aur log aggregation tools in fields pe directly dashboards, alerts, precise filters bana sakte hain.",
    interviewExplanation:
      "I'd give a concrete before/after: 'A plain text log needs fragile regex parsing to extract fields programmatically. A structured JSON log entry has named fields — orderId, durationMs — directly queryable, so I can filter for orders over 500ms or all logs for a specific user without any text parsing. Log viewer UIs render structured logs nicely too, so readability isn't really a downside in practice.'",
    diagramNote:
      "'Plain text log: \"Order 123 processed... 230ms\"' → 'needs fragile regex to query'. 'Structured log: {orderId:123, durationMs:230}' → 'directly queryable/filterable'.",
    diagramMermaid: `flowchart LR
    A["Plain text log"] --> B["Needs fragile regex<br/>to query fields"]
    C["Structured log (JSON)<br/>orderId, durationMs fields"] --> D["Directly queryable/filterable"]`,
    realProjectExample:
      "Switching from plain text to structured logs let us build a dashboard filtering specifically for requests exceeding a duration threshold, something that would have needed unreliable text parsing against the old plain-text log format.",
    interviewTip:
      "If asked to justify the extra effort of structured logging, the concrete answer is precise, reliable queryability — not just 'it looks more professional'.",
    followupQuestions: [
      "What fields would you typically include in a structured log entry?",
      "How does structured logging relate to distributed tracing?",
      "Is structured logging harder to read for a human debugging live?",
    ],
    commonMistakes: [
      "Relying on regex/text parsing of plain log messages instead of adopting structured logging.",
      "Not knowing structured logs are typically still rendered readably by log viewer UIs.",
    ],
    importantPoints: [
      "Structured logging = machine-parseable entries (JSON) with named fields.",
      "Enables precise filtering/aggregation without fragile text parsing.",
      "Log viewer UIs typically render structured logs readably for humans too.",
    ],
    revisionNotes: "Structured logging = JSON with named fields, directly queryable — vs plain text needing fragile regex parsing.",
  },
  {
    id: "mon-q3",
    topic: "Metrics",
    prompt: "What's the difference between a metric and a log, and when would you reach for one over the other?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["metrics", "logs"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A metric is a numeric measurement aggregated over time (like request count, average latency, CPU usage) optimized for trends and dashboards; a log is a discrete event record with detail, optimized for investigating a specific occurrence — you'd use metrics to notice something's wrong (a spike, a trend), and logs to actually diagnose why.",
    detailedAnswer:
      "Metrics are numeric time series — CPU usage over the last hour, request count per minute, error rate percentage — cheap to store at high volume and ideal for dashboards and threshold-based alerting ('alert if error rate exceeds 5%'), but they don't carry the specific detail of any individual event. Logs carry rich, per-event detail (a specific error message, a specific user ID, a stack trace) but are more expensive to store and search at volume, and don't naturally answer 'is this trending up over time' the way a metric dashboard does at a glance. In practice: metrics tell you something's wrong and roughly when it started; logs (ideally correlated by a trace ID) tell you the specific detail of what actually happened during that window.",
    hindiExplanation:
      "Metrics numeric time series hain — pichle ghante ka CPU usage, per-minute request count, error rate percentage — high volume pe store karna sasta hai aur dashboards/threshold-based alerting ke liye ideal hai ('alert karo agar error rate 5% se zyada ho'), lekin ye kisi individual event ka specific detail carry nahi karte. Logs rich, per-event detail carry karte hain (ek specific error message, ek specific user ID, ek stack trace) lekin volume pe store/search karna zyada expensive hai. Practically: metrics batate hain kuch galat hai aur roughly kab shuru hua; logs (ideally ek trace ID se correlated) batate hain us window ke dauraan actually kya hua ka specific detail.",
    interviewExplanation:
      "I'd give the practical workflow: 'Metrics are numeric time series — cheap at volume, great for dashboards and threshold alerts, like error rate over 5%. Logs are rich per-event detail — a specific error, a stack trace — more expensive to store/search at scale. In practice, metrics tell you something's wrong and roughly when; logs tell you the specific detail of what actually happened.'",
    diagramNote:
      "'Metric: numeric time series (CPU%, request count) → dashboards, threshold alerts' vs 'Log: per-event detail (error message, stack trace) → diagnose specific occurrence'.",
    diagramMermaid: `flowchart LR
    A["Metric<br/>numeric time series"] --> B["Dashboards, threshold alerts"]
    C["Log<br/>per-event detail"] --> D["Diagnose specific occurrence"]`,
    realProjectExample:
      "A dashboard metric showed error rate spiking at 2:15am; correlating that timestamp with detailed application logs revealed the specific exception (a downstream timeout) responsible — the metric flagged 'something's wrong and when', the logs revealed exactly what.",
    interviewTip:
      "If asked 'would you just use logs for everything since they have more detail', explain the cost/scale argument — metrics are cheap to aggregate and dashboard at high volume, logs are not, which is exactly why both exist as complementary tools.",
    followupQuestions: [
      "How would you correlate a metric spike with the relevant log entries?",
      "What's a common metric you'd set a threshold alert on?",
      "Why are metrics cheaper to store at high volume than logs?",
    ],
    commonMistakes: [
      "Trying to use logs alone for dashboarding/alerting instead of metrics.",
      "Not knowing metrics and logs serve genuinely different, complementary purposes.",
    ],
    importantPoints: [
      "Metric = numeric time series, cheap at volume, good for dashboards/threshold alerts.",
      "Log = rich per-event detail, more expensive at volume, good for diagnosis.",
      "Metrics flag 'something's wrong and when'; logs reveal the specific 'what happened'.",
    ],
    revisionNotes: "Metric = numeric trend (dashboards/alerts). Log = per-event detail (diagnosis). Metrics flag issues; logs explain them.",
  },
  {
    id: "mon-q4",
    topic: "Tracing",
    prompt: "What is distributed tracing, and why is a trace ID important across multiple microservices?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["tracing", "trace-id"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Distributed tracing follows a single request as it hops across multiple services, recording a 'span' at each hop with timing; a trace ID is a unique identifier propagated through every hop (typically via a request header) so all the spans from one original request can be correlated together into one coherent timeline, even across completely separate services and their independent logs.",
    detailedAnswer:
      "A single user action might trigger calls across a Fiori frontend, an App Router, a CAP backend, and two downstream microservices — without tracing, correlating what happened across all of these for one specific request is nearly impossible, since each service's logs are independent and have no inherent link to each other. A trace ID (generated at the very first entry point and propagated through every subsequent call via a header, like `traceparent` in the W3C standard) tags every span (each service's individual piece of work) with the same identifier, so a tracing tool can reconstruct the full end-to-end timeline — showing exactly which service took how long, and where in the chain a failure or slowdown actually occurred, rather than trying to manually cross-reference timestamps across five different services' independent logs.",
    hindiExplanation:
      "Ek single user action Fiori frontend, App Router, CAP backend, aur do downstream microservices ke aar-paar calls trigger kar sakta hai — tracing ke bina, ek specific request ke liye in sab mein kya hua correlate karna almost impossible hai, kyunki har service ke logs independent hain aur unka koi inherent link nahi hai. Ek trace ID (bilkul pehle entry point pe generate hota hai aur har agli call mein ek header ke through propagate hota hai, jaise W3C standard mein `traceparent`) har span (har service ka individual kaam) ko same identifier se tag karta hai, taaki ek tracing tool poora end-to-end timeline reconstruct kar sake — exactly dikhate hue kaunsi service ne kitna time liya, aur chain mein kaha failure ya slowdown actually hua.",
    interviewExplanation:
      "I'd explain the correlation problem it solves: 'A single request might hop across five different services, each with its own independent logs — without a shared identifier, correlating what happened for one specific request is nearly impossible. A trace ID, generated at the first entry point and propagated through every call via a header, tags every span with the same ID, so a tracing tool can reconstruct the full timeline and show exactly where a slowdown or failure occurred.'",
    diagramNote:
      "'Request enters, trace ID generated' → propagated through 'Frontend → App Router → CAP backend → Microservice A → Microservice B', each logging a span tagged with the same trace ID → 'Tracing tool reconstructs full timeline'.",
    diagramMermaid: `flowchart LR
    A["Request enters<br/>trace ID generated"] --> B["Frontend"] --> C["App Router"] --> D["CAP backend"] --> E["Microservice A"] --> F["Microservice B"]
    F --> G["Tracing tool reconstructs<br/>full timeline from shared trace ID"]`,
    realProjectExample:
      "A slow user-facing request was traced end-to-end using its trace ID, revealing that 90% of the total latency was spent in one specific downstream microservice call — a finding that would have taken far longer to piece together manually across five separate services' independent logs.",
    interviewTip:
      "Mentioning the specific propagation mechanism (a header carrying the trace ID through every hop, like the W3C `traceparent` standard) shows real technical depth beyond a vague 'tracing tracks requests' description.",
    followupQuestions: [
      "What is a 'span' within a distributed trace?",
      "How does a trace ID actually get propagated between services?",
      "How does Istio contribute to distributed tracing, as covered in the Kyma section?",
    ],
    commonMistakes: [
      "Trying to manually correlate logs across services by timestamp instead of using a shared trace ID.",
      "Not knowing the trace ID is propagated via a request header through every hop.",
    ],
    importantPoints: [
      "Distributed tracing follows one request across multiple services/hops.",
      "Trace ID is propagated via a header, tagging every span with the same identifier.",
      "Lets a tracing tool reconstruct the full timeline and pinpoint where issues occurred.",
    ],
    revisionNotes: "Distributed tracing = trace ID propagated via header across every service hop, tagging spans — reconstructs full request timeline, pinpoints slow/failing hop.",
  },
  {
    id: "mon-q5",
    topic: "Alert Notification",
    prompt: "What is the Alert Notification service, and what would you configure it to alert on?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["alert-notification", "alerting"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Alert Notification service lets you define conditions (based on metrics, events, or platform notifications) that trigger alerts routed to configured channels (email, Slack, PagerDuty, etc.); you'd typically configure it for things like error rate thresholds, resource exhaustion warnings, or critical platform events, so someone's notified proactively rather than only discovering an issue when a user complains.",
    detailedAnswer:
      "Rather than someone needing to actively watch a dashboard around the clock, Alert Notification lets you declare rules — 'if error rate exceeds 5% for 5 minutes', 'if a subaccount's quota crosses 90% usage', 'if a specific critical platform event occurs' — and routes matching alerts to configured destinations like email, Slack channels, or incident-management tools like PagerDuty. This shifts monitoring from purely reactive (a user reports something's broken) to proactive (the team is notified automatically the moment a defined threshold is crossed), which matters enormously for production reliability — the gap between an issue starting and someone noticing is often the biggest factor in how much impact an incident actually has.",
    hindiExplanation:
      "Kisi ko actively ek dashboard chauबीस ghante watch karne ki jagah, Alert Notification tumhe rules declare karne deta hai — 'agar error rate 5 minute tak 5% se zyada ho', 'agar ek subaccount ka quota 90% usage cross kare', 'agar koi specific critical platform event ho' — aur matching alerts ko configured destinations tak route karta hai jaise email, Slack channels, ya PagerDuty jaise incident-management tools. Ye monitoring ko purely reactive (user kuch broken report kare) se proactive (team automatically notify ho jaaye jaise hi ek defined threshold cross ho) mein shift karta hai, jo production reliability ke liye bahut matter karta hai.",
    interviewExplanation:
      "I'd emphasize the reactive-to-proactive shift: 'Alert Notification lets you declare rules — error rate over 5%, quota over 90%, a critical platform event — and routes matching alerts to email, Slack, or PagerDuty. This shifts monitoring from reactive, where a user reports the issue, to proactive, where the team is notified automatically — often the biggest factor in how much impact an incident actually has.'",
    diagramNote:
      "'Condition defined (error rate > 5%, quota > 90%, critical event)' → 'Alert Notification service evaluates' → 'Routes to Email/Slack/PagerDuty' → 'Team notified proactively, before user complaints'.",
    diagramMermaid: `flowchart LR
    A["Condition defined<br/>error rate > 5%, quota > 90%"] --> B["Alert Notification service evaluates"]
    B --> C["Routes to Email/Slack/PagerDuty"]
    C --> D["Team notified proactively"]`,
    realProjectExample:
      "Configuring an alert on error rate exceeding 5% for any 5-minute window meant the on-call engineer was paged within minutes of a production regression, well before any customer had a chance to report it themselves.",
    interviewTip:
      "If asked 'how would you know about a production issue before a customer complains', Alert Notification configured on relevant thresholds is exactly the answer being tested.",
    followupQuestions: [
      "What destinations can Alert Notification route alerts to?",
      "What's a good threshold to set for error-rate alerting, and why not alert on every single error?",
      "How would you avoid alert fatigue from overly sensitive rules?",
    ],
    commonMistakes: [
      "Relying purely on users reporting issues instead of proactive alerting.",
      "Not knowing Alert Notification can route to multiple different channel types (not just email).",
    ],
    importantPoints: [
      "Alert Notification triggers on defined conditions (metrics, events, platform notifications).",
      "Routes alerts to configured destinations (email, Slack, PagerDuty, etc.).",
      "Shifts monitoring from reactive (user reports) to proactive (team notified automatically).",
    ],
    revisionNotes: "Alert Notification = condition-based alerts (error rate, quota, platform events) routed to email/Slack/PagerDuty — proactive vs reactive monitoring.",
  },
  {
    id: "mon-q6",
    topic: "Health Check",
    prompt: "How does a health check endpoint relate to monitoring, beyond just Cloud Foundry's own instance health checking?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["health-check", "monitoring"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Beyond just telling Cloud Foundry an instance is ready for traffic, a well-designed health check endpoint can report the status of the app's actual dependencies (database connectivity, downstream service reachability), making it a valuable target for external monitoring tools to poll and alert on, not just an internal platform mechanism.",
    detailedAnswer:
      "A minimal health check might just return 200 OK if the process is alive — useful for Cloud Foundry's own routing decisions, but not very informative for broader monitoring. A richer health check endpoint can actually verify the app's critical dependencies are reachable (can it connect to its database, can it reach a required downstream service) and report a degraded/unhealthy status if not — this same endpoint can then be polled by external monitoring tools (not just the platform's own health check mechanism) to build dashboards or trigger alerts specifically when a dependency, not just the process itself, is unhealthy. The key insight is a health check endpoint serves two audiences: the platform (deciding whether to route traffic) and external monitoring (deciding whether to alert someone).",
    hindiExplanation:
      "Ek minimal health check bas 200 OK return kar sakta hai agar process zinda hai — Cloud Foundry ke apne routing decisions ke liye useful hai, lekin broader monitoring ke liye zyada informative nahi. Ek richer health check endpoint actually app ki critical dependencies reachable hain ya nahi verify kar sakta hai (kya wo apne database se connect kar sakta hai, kya wo ek required downstream service tak pahunch sakta hai) aur degraded/unhealthy status report kar sakta hai agar nahi — yahi endpoint fir external monitoring tools se bhi poll ho sakta hai (sirf platform ke apne mechanism se nahi) dashboards banane ya alerts trigger karne ke liye specifically jab koi dependency, sirf process khud nahi, unhealthy ho.",
    interviewExplanation:
      "I'd give the dual-audience framing: 'A minimal health check just confirms the process is alive, useful for Cloud Foundry's own routing. A richer one actually checks critical dependencies — database, downstream services — and reports degraded status if unhealthy. That same endpoint serves two audiences: the platform decides whether to route traffic, and external monitoring tools can poll it to alert specifically when a dependency, not just the process, is unhealthy.'",
    diagramNote:
      "Health check endpoint serving two audiences: 'Cloud Foundry (routing decision: is process alive?)' and 'External monitoring tool (polls same endpoint for dependency health, triggers alerts)'.",
    diagramMermaid: `flowchart LR
    HC["Health check endpoint"] --> A["Cloud Foundry<br/>routing decision: process alive?"]
    HC --> B["External monitoring tool<br/>polls for dependency health, alerts"]`,
    realProjectExample:
      "Enriching a health check to verify database connectivity (not just process aliveness) let an external monitoring tool catch and alert on a database outage within seconds, even though Cloud Foundry itself still considered the app instance 'running' since the process hadn't crashed.",
    interviewTip:
      "If asked 'is a basic 200 OK health check sufficient', the strong answer distinguishes what it's sufficient FOR (platform routing) versus what a richer check adds (external monitoring on actual dependency health).",
    followupQuestions: [
      "What's the risk of a health check that's too expensive to compute (e.g. checking too many dependencies)?",
      "Should a health check endpoint require authentication?",
      "How would a health check distinguish 'degraded' from 'fully healthy' status?",
    ],
    commonMistakes: [
      "Treating a minimal 'process alive' health check as sufficient for all monitoring purposes.",
      "Not recognizing the health check endpoint can serve both the platform and external monitoring tools.",
    ],
    importantPoints: [
      "Minimal health check = process alive, sufficient for platform routing decisions.",
      "Richer health check = verifies actual dependencies, valuable for external monitoring.",
      "Same endpoint can serve both the platform and external monitoring/alerting tools.",
    ],
    revisionNotes: "Health check serves two audiences: platform (routing, process-alive check) and external monitoring (richer dependency checks — DB, downstream services — for alerting).",
  },
  {
    id: "mon-q7",
    topic: "Application Logging",
    prompt: "What's a common mistake when logging sensitive data, and how would Application Logging's retention make that mistake worse?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["application-logging", "sensitive-data"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Accidentally logging sensitive data (passwords, full credit card numbers, PII) directly in log statements is a common mistake, and because Application Logging persists logs for an extended retention period and makes them broadly searchable, that sensitive data doesn't just briefly exist in a transient buffer — it sits accessible to anyone with log access for as long as the retention window, significantly amplifying the exposure compared to a short-lived Loggregator buffer.",
    detailedAnswer:
      "A quick debug statement like `log.info('Processing payment: ' + cardNumber)` might seem harmless in the moment, but once Application Logging persists and indexes it, that sensitive value sits in a searchable store, readable by anyone with appropriate log access, for the entire configured retention period — potentially weeks or months — rather than disappearing quickly the way it would in Loggregator's small rolling buffer. This is a genuinely more serious exposure than it might first appear, since 'it's just a log line' undersells how long-lived and broadly searchable that data now is. The mitigation is disciplined logging practice — never logging raw sensitive values, masking/redacting them (like logging only the last 4 digits of a card number) before the log statement is ever written, treating log content with the same sensitivity awareness as any other data store.",
    hindiExplanation:
      "Ek quick debug statement jaisa `log.info('Processing payment: ' + cardNumber)` us moment mein harmless lag sakta hai, lekin ek baar Application Logging use persist/index kar de, wo sensitive value ek searchable store mein baith jaata hai, appropriate log access wale kisi ke bhi liye readable, poori configured retention period ke liye — potentially weeks ya months — Loggregator ke chhote rolling buffer ki tarah jaldi disappear hone ki jagah. Ye genuinely ek zyada serious exposure hai jo pehli nazar mein lag sakta hai, kyunki 'ye toh bas ek log line hai' undersell karta hai ki ye data ab kitna long-lived aur broadly searchable hai.",
    interviewExplanation:
      "I'd explain the amplification specifically: 'A quick debug log with a raw sensitive value might seem harmless in the moment, but once Application Logging persists and indexes it, that value sits in a searchable store for the entire retention period — weeks or months — rather than disappearing quickly in Loggregator's small buffer. That's a genuinely more serious exposure than it first appears. The mitigation is disciplined masking — never logging raw sensitive values, redacting them before the log statement is written — treating log content with the same sensitivity awareness as any other data store.'",
    diagramNote:
      "'Raw sensitive value logged (e.g. full card number)' → 'Loggregator: disappears quickly (small rolling buffer)' vs 'Application Logging: persists, indexed, searchable for full retention period (weeks/months) — much bigger exposure'.",
    diagramMermaid: `flowchart LR
    A["Raw sensitive value logged"] --> B["Loggregator: disappears quickly<br/>small rolling buffer"]
    A --> C["Application Logging: persists,<br/>searchable for full retention — bigger exposure"]`,
    realProjectExample:
      "A security audit discovered full customer email addresses and partial payment details had been logged in plain debug statements for months, fully searchable in Application Logging by anyone with log access — remediated by adding log-scrubbing middleware and a retroactive review of what had been exposed.",
    interviewTip:
      "If asked about a security risk in logging practices, connecting the specific amplification effect of long-term persistence/searchability (not just 'don't log secrets' generically) shows deeper understanding of why this matters more with Application Logging than with a transient buffer.",
    followupQuestions: [
      "How would you implement automated masking/redaction of sensitive fields before they're logged?",
      "How would you audit existing logs for accidentally-exposed sensitive data?",
      "What retention period would be appropriate for logs that might contain business-sensitive (if not personally-identifiable) information?",
    ],
    commonMistakes: [
      "Logging raw sensitive values without considering how long-lived and searchable Application Logging makes them.",
      "Treating 'it's just a debug log' as low-risk without considering the actual retention/searchability exposure.",
    ],
    importantPoints: [
      "Logging raw sensitive data is a common mistake, seemingly low-risk in the moment.",
      "Application Logging's persistence and searchability significantly amplifies this exposure over time.",
      "Mitigate with disciplined masking/redaction before sensitive values are ever logged.",
    ],
    revisionNotes: "Logging raw sensitive data is amplified by Application Logging's long retention/searchability (vs Loggregator's quick-disappearing buffer) — mask/redact sensitive values before logging, don't treat it as low-risk.",
  },
  {
    id: "mon-q8",
    topic: "Logs",
    prompt: "How would you decide what log level (debug, info, warn, error) a specific log statement should use?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["logs", "log-levels"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Match the level to actual severity and audience: debug for verbose detail only useful during active development/troubleshooting (usually disabled in production), info for normal, expected operational events worth a record, warn for something unexpected but not immediately breaking, and error for genuine failures needing attention — using this consistently prevents both noisy production logs and missing genuinely important signals.",
    detailedAnswer:
      "Log level discipline matters because production log volume and noise directly affect how useful logging actually is: if everything is logged at 'info' (or worse, 'error') regardless of actual severity, genuinely important error signals get buried in noise, and if debug-level verbose logging runs constantly in production, storage/search costs balloon with information nobody needs day-to-day. A reasonable convention: debug = verbose detail useful only when actively troubleshooting (typically disabled or filtered out in production by default), info = normal, expected events worth recording for audit/visibility (a request completed, a scheduled job ran), warn = something unexpected happened but the system recovered or continued functioning, error = a genuine failure that likely needs someone's attention. Consistently applying this (not defaulting everything to the same level out of laziness) keeps production logs actually useful for triage.",
    hindiExplanation:
      "Log level discipline matter karta hai kyunki production log volume aur noise directly affect karte hain ki logging actually kitni useful hai: agar sab kuch 'info' pe (ya worse, 'error') log hota hai regardless of actual severity, genuinely important error signals noise mein bury ho jaate hain, aur agar debug-level verbose logging production mein constantly chalti hai, storage/search costs balloon ho jaate hain. Ek reasonable convention: debug = verbose detail sirf actively troubleshoot karte waqt useful (typically production mein disabled/filtered), info = normal, expected events record karne layak, warn = kuch unexpected hua lekin system recover ya function karta raha, error = ek genuine failure jise kisi ka attention chahiye.",
    interviewExplanation:
      "I'd give the concrete convention: 'Debug is verbose detail only useful when actively troubleshooting, usually disabled in production. Info is normal, expected events worth recording. Warn is something unexpected but the system recovered or continued. Error is a genuine failure needing attention. Applying this consistently — not defaulting everything to the same level — is what keeps production logs actually useful for triage instead of buried in noise.'",
    diagramNote:
      "'Debug: verbose, dev-only troubleshooting' → 'Info: normal expected events' → 'Warn: unexpected but recovered' → 'Error: genuine failure needing attention' — consistent application prevents noise burying real signals.",
    diagramMermaid: `flowchart LR
    A["Debug: verbose,<br/>dev-only"] --> B["Info: normal<br/>expected events"]
    B --> C["Warn: unexpected<br/>but recovered"]
    C --> D["Error: genuine failure,<br/>needs attention"]`,
    realProjectExample:
      "A team that had defaulted almost every log statement to 'error' level found their alerting completely desensitized — genuine production failures got lost among hundreds of 'errors' that were actually just normal, expected conditions; re-leveling logs to their appropriate severity restored the error-level alert's actual signal.",
    interviewTip:
      "If asked to review a codebase's logging practices, checking for over-use of 'error' level for non-error conditions (a very common real mistake) is a specific, valuable thing to look for.",
    followupQuestions: [
      "Should debug-level logging ever be enabled in production, and under what circumstances?",
      "How would you retroactively fix a codebase where log levels have been used inconsistently?",
      "Would you alert on warn-level logs, or only error-level ones?",
    ],
    commonMistakes: [
      "Defaulting most or all log statements to the same level (often 'error') regardless of actual severity.",
      "Running verbose debug-level logging constantly in production, ballooning storage/search costs unnecessarily.",
    ],
    importantPoints: [
      "Log levels should match actual severity: debug (dev-only detail), info (normal events), warn (unexpected but recovered), error (genuine failure).",
      "Consistent, disciplined level usage keeps production logs useful for triage.",
      "Misusing levels (everything as 'error', or leaving debug on in production) buries real signals in noise.",
    ],
    revisionNotes: "Log levels: debug (dev-only verbose) → info (normal events) → warn (unexpected, recovered) → error (genuine failure). Consistent use keeps production logs useful; misuse buries real signals in noise.",
  },
  {
    id: "mon-q9",
    topic: "Metrics",
    prompt: "What's the difference between a counter, a gauge, and a histogram as metric types?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["metrics", "metric-types"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A counter only ever increases (like total requests served), a gauge can go up or down and represents a current value (like current active connections or memory usage), and a histogram captures the distribution of a value across buckets (like request latency, letting you see p50/p95/p99, not just an average) — picking the right type matters for what question you're actually able to answer later.",
    detailedAnswer:
      "A counter (total requests, total errors) is monotonically increasing and is typically viewed as a rate over time (requests per second) rather than its raw ever-growing total. A gauge (current memory usage, current queue depth, active connections right now) represents a point-in-time value that can go up or down, appropriate for anything measuring 'how much right now' rather than 'how many total ever'. A histogram (request latency, payload size) buckets observed values so you can later compute percentiles (p50, p95, p99) rather than just a potentially-misleading average — this distinction matters enormously for latency specifically, since an average can look fine while a meaningful fraction of requests are actually experiencing much worse latency, which only a histogram/percentile view reveals.",
    hindiExplanation:
      "Ek counter (total requests, total errors) monotonically increasing hai aur typically ek rate ki tarah viewed hota hai time ke saath (requests per second) uske raw ever-growing total ki jagah. Ek gauge (current memory usage, current queue depth, active connections abhi) ek point-in-time value represent karta hai jo upar/neeche ja sakta hai. Ek histogram (request latency, payload size) observed values ko bucket karta hai taaki tum baad mein percentiles compute kar sako (p50, p95, p99) sirf ek potentially-misleading average ki jagah — ye distinction latency ke liye especially bahut matter karta hai.",
    interviewExplanation:
      "I'd give concrete examples per type: 'A counter, like total requests served, only ever increases and is typically viewed as a rate. A gauge, like current memory usage or active connections, represents a point-in-time value that can go up or down. A histogram, like request latency, buckets observed values so you can compute percentiles like p95 or p99, not just an average — which matters a lot, since an average can hide that a meaningful fraction of requests are experiencing much worse latency.'",
    diagramNote:
      "'Counter: monotonically increasing (total requests) → viewed as rate' + 'Gauge: point-in-time value, up/down (current memory)' + 'Histogram: buckets values (latency) → percentiles p50/p95/p99, not just average'.",
    diagramMermaid: `flowchart LR
    A["Counter<br/>total requests, always increasing"] --> B["Viewed as rate"]
    C["Gauge<br/>current memory usage"] --> D["Point-in-time, up/down"]
    E["Histogram<br/>request latency"] --> F["Percentiles p50/p95/p99"]`,
    realProjectExample:
      "A latency dashboard showing only an average request time of 200ms looked healthy, but switching to a histogram-based p99 view revealed 1% of requests were actually taking over 5 seconds — a real problem entirely hidden by the average, only visible via the correct metric type.",
    interviewTip:
      "If asked why an average latency metric alone can be misleading, explaining the histogram/percentile alternative (and why p99 specifically matters) shows real depth beyond just naming metric types abstractly.",
    followupQuestions: [
      "Why does p99 latency matter more than average latency for user experience in many cases?",
      "Would you use a counter or a gauge for tracking the number of currently logged-in users?",
      "How would you choose appropriate histogram bucket boundaries for a latency metric?",
    ],
    commonMistakes: [
      "Using an average alone for latency monitoring, missing tail-latency problems a histogram/percentile view would reveal.",
      "Confusing a counter (always increasing) with a gauge (can go up or down) for the same underlying measurement.",
    ],
    importantPoints: [
      "Counter = monotonically increasing (total requests), typically viewed as a rate.",
      "Gauge = point-in-time value that can go up or down (current memory, active connections).",
      "Histogram = bucketed distribution enabling percentile analysis (p50/p95/p99), not just an average.",
    ],
    revisionNotes: "Counter = always increasing (viewed as rate). Gauge = point-in-time, up/down. Histogram = bucketed distribution → percentiles (p95/p99) — critical for latency, since averages hide tail problems.",
  },
  {
    id: "mon-q10",
    topic: "Tracing",
    prompt: "What is a 'span' within a distributed trace, and how do spans relate to each other in a single trace?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["tracing", "spans"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A span represents one unit of work within a trace (like one service's handling of the request, or one specific downstream call), with its own start/end time and metadata; spans are organized in a parent-child hierarchy reflecting the actual call structure, so a tracing tool can reconstruct not just the total duration but exactly how the work was structured — what called what, and in what order/nesting.",
    detailedAnswer:
      "While the trace ID ties everything from one original request together, each individual span within that trace represents a specific, timed unit of work — a particular service handling the request, or one particular outbound call that service made to a dependency. Spans carry a parent-span reference forming a hierarchy that mirrors the actual call structure: if Service A calls Service B, which calls Service C, the trace shows A's span as the parent of B's span, which is the parent of C's span, with each span's own start/end time nested within its parent's. This hierarchical structure is what lets a tracing tool render a proper waterfall/flame-graph view showing not just 'this request took 800ms total' but exactly how that 800ms was spent across the nested call structure.",
    hindiExplanation:
      "Jabki trace ID ek original request ke saare hisson ko jodta hai, us trace ke andar har individual span ek specific, timed unit of work represent karta hai — ek particular service jo request handle kar rahi hai, ya ek particular outbound call jo us service ne ek dependency ko kiya. Spans ek parent-span reference carry karte hain ek hierarchy banate hue jo actual call structure ko mirror karta hai: agar Service A Service B ko call karta hai, jo Service C ko call karta hai, trace A ke span ko B ke span ka parent dikhata hai, jo C ke span ka parent hai, har span ka apna start/end time uske parent ke andar nested.",
    interviewExplanation:
      "I'd explain the hierarchy specifically: 'A span is a specific, timed unit of work within a trace — one service handling the request, or one outbound call it made. Spans carry a parent reference mirroring the actual call structure — if A calls B calls C, the trace shows A's span as parent of B's, which is parent of C's, each with its own start/end time nested within the parent. That hierarchy is what lets a tracing tool render a proper waterfall view showing exactly how the total time was spent across the nested calls, not just the total duration.'",
    diagramNote:
      "'Trace' contains 'Span A (Service A, parent)' → nested → 'Span B (Service B, child of A)' → nested → 'Span C (Service C, child of B)' — hierarchy mirrors actual call structure, each with own timing.",
    diagramMermaid: `flowchart TD
    A["Span A: Service A<br/>parent"] --> B["Span B: Service B<br/>child of A"]
    B --> C["Span C: Service C<br/>child of B"]`,
    realProjectExample:
      "A tracing waterfall view for a slow request showed the top-level span taking 800ms total, with a nested child span revealing that a specific downstream database call span alone accounted for 650ms of that total — precisely because the parent-child span hierarchy preserved exactly where in the nested call structure the time was actually spent.",
    interviewTip:
      "If asked to explain how a tracing tool can show 'this specific downstream call was the bottleneck' rather than just a total duration, describing the parent-child span hierarchy is the precise, correct mechanism.",
    followupQuestions: [
      "What metadata, beyond start/end time, would a span typically carry?",
      "How does a span know which parent span it belongs to?",
      "Would every service hop always create its own span, or could some work be un-instrumented?",
    ],
    commonMistakes: [
      "Describing a trace as a flat list of events rather than a hierarchical parent-child span structure.",
      "Not knowing spans carry a parent reference that mirrors the actual nested call structure.",
    ],
    importantPoints: [
      "A span represents one specific, timed unit of work within a trace.",
      "Spans carry a parent-span reference, forming a hierarchy mirroring the actual call structure.",
      "This hierarchy enables a waterfall/flame-graph view pinpointing exactly where time was spent.",
    ],
    revisionNotes: "Span = one timed unit of work within a trace, with a parent-span reference forming a hierarchy mirroring the actual call structure — enables a waterfall view pinpointing exactly where time was spent, not just total duration.",
  },
  {
    id: "mon-q11",
    topic: "Alert Notification",
    prompt: "What is 'alert fatigue', and how would you design alerting rules to avoid it?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["alert-notification", "alert-fatigue"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Alert fatigue is when too many low-value or frequently-false-positive alerts desensitize the team, causing them to start ignoring or delaying response to alerts in general — including genuinely critical ones; avoid it by tuning thresholds to only alert on things that genuinely warrant action, using appropriate duration windows (not single-data-point spikes), and routing alerts by actual severity rather than treating everything as equally urgent.",
    detailedAnswer:
      "If an alerting system pages someone for every minor, self-resolving blip or sends dozens of low-value notifications a day, the team's natural response is to start tuning out alerts generally — checking them less carefully, delaying response, or even muting channels — which is exactly the dangerous outcome, since a genuinely critical alert can now get lost in the same desensitized noise. Designing against this means: setting thresholds that reflect genuine actionability (not alerting on every single transient blip, but on a sustained condition over a reasonable duration window, like 'error rate over 5% for 5 minutes' rather than any single elevated data point), and routing/prioritizing alerts by actual severity (a critical production outage pages someone immediately; a minor anomaly might just log to a dashboard for later review, not page anyone at 3am). The goal is every alert that fires should genuinely warrant the attention it demands.",
    hindiExplanation:
      "Agar ek alerting system har minor, self-resolving blip ke liye kisi ko page karti hai ya ek din mein dozens low-value notifications bhejti hai, team ka natural response hai alerts ko generally tune out karna shuru karna — unhe kam carefully check karna, response delay karna, ya channels mute bhi karna — jo exactly wo dangerous outcome hai, kyunki ek genuinely critical alert ab isi desensitized noise mein lost ho sakta hai. Isse design karne ke against ka matlab hai: thresholds set karna jo genuine actionability reflect karein (har single transient blip pe alert nahi, ek sustained condition over reasonable duration window pe), aur alerts ko actual severity se route/prioritize karna.",
    interviewExplanation:
      "I'd explain the desensitization risk and the design mitigations: 'Alert fatigue happens when too many low-value alerts desensitize the team, so they start ignoring alerts generally — including genuinely critical ones. I'd design against it by using duration windows, not single-data-point spikes, so I'm not alerting on every transient blip, and by routing alerts by actual severity — a real outage pages immediately, a minor anomaly just logs for later review rather than paging anyone at 3am. Every alert that fires should genuinely warrant the attention it demands.'",
    diagramNote:
      "'Too many low-value alerts' → 'Team desensitized, starts ignoring alerts generally' → 'Genuinely critical alert gets lost in the noise' — avoid via: duration-window thresholds, severity-based routing/prioritization.",
    diagramMermaid: `flowchart TD
    A["Too many low-value alerts"] --> B["Team desensitized,<br/>ignores alerts generally"]
    B --> C["Genuinely critical alert<br/>lost in the noise"]
    D["Duration-window thresholds +<br/>severity-based routing"] -.->|"prevents"| A`,
    realProjectExample:
      "A team receiving dozens of low-value pages daily had started silencing their alert channel entirely, missing a genuine production outage for hours; redesigning thresholds to use sustained duration windows and routing only true critical severity to paging (with lower-severity anomalies going to a dashboard instead) restored trust in the alerting system.",
    interviewTip:
      "If asked how you'd design an alerting strategy for a new service, proactively addressing alert fatigue (not just 'set up alerts on errors') shows mature operational thinking about the actual human response to alerting design.",
    followupQuestions: [
      "How would you decide an appropriate duration window for a given alert condition?",
      "What's the difference between paging someone immediately versus just logging to a dashboard for review?",
      "How would you recover a team's trust in alerting after a period of fatigue-induced silencing?",
    ],
    commonMistakes: [
      "Alerting on every single transient spike rather than a sustained condition over a reasonable duration.",
      "Treating every alert as equally urgent instead of routing/prioritizing by actual severity.",
    ],
    importantPoints: [
      "Alert fatigue desensitizes teams, causing genuinely critical alerts to get lost in noise.",
      "Use duration-window thresholds rather than alerting on single transient data points.",
      "Route and prioritize alerts by actual severity, not treating everything as equally urgent.",
    ],
    revisionNotes: "Alert fatigue = too many low-value alerts desensitize the team, burying critical ones. Avoid via duration-window thresholds (not single spikes) and severity-based routing/prioritization.",
  },
  {
    id: "mon-q12",
    topic: "Health Check",
    prompt: "What's the risk of a health check that checks too many downstream dependencies, and how would you balance thoroughness against this risk?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["health-check", "cascading-failure"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A health check that transitively verifies every downstream dependency can cause a single unrelated dependency's outage to make many otherwise-healthy services all report unhealthy simultaneously, potentially triggering a cascading failure (unnecessary restarts, traffic routing away from healthy instances) — balance by checking only the dependencies genuinely critical to the app's core function, and considering degraded-but-still-serving states rather than binary healthy/unhealthy.",
    detailedAnswer:
      "If a health check verifies connectivity to every single dependency (including ones the core function doesn't strictly need), an outage in any one of those dependencies makes the app report itself as fully unhealthy — potentially causing the platform to restart it repeatedly (which won't fix an external dependency issue) or route traffic away from it entirely, even though the app could have continued serving its core function in a degraded mode without that particular dependency. This over-checking can actually cause a single external outage to cascade into much broader apparent unavailability than the situation actually warrants. A more thoughtful design distinguishes truly critical dependencies (without which the app genuinely cannot function at all — checking these makes sense) from non-critical ones (where a degraded response is more appropriate than reporting fully unhealthy), and might even support a distinct 'degraded' status rather than a strict binary healthy/unhealthy.",
    hindiExplanation:
      "Agar ek health check har single dependency (including wo bhi jo core function ko strictly zaroori nahi) tak connectivity verify karta hai, un dependencies mein se kisi bhi ek ka outage app ko fully unhealthy report karwa deta hai — potentially platform ko use repeatedly restart karwate hue (jo ek external dependency issue fix nahi karega) ya traffic ko poori tarah use se door route karte hue, chahe app apna core function degraded mode mein continue kar sakta tha us particular dependency ke bina. Ye over-checking actually ek single external outage ko much broader apparent unavailability mein cascade kar sakta hai.",
    interviewExplanation:
      "I'd explain the cascading-failure risk and the balance: 'If a health check verifies every dependency, including non-critical ones, an outage in any one makes the app report fully unhealthy — potentially causing restarts that won't fix an external issue, or routing away traffic unnecessarily, even if the app could still serve its core function in a degraded mode. I'd distinguish truly critical dependencies, where checking makes sense, from non-critical ones where a degraded response is more appropriate — and consider a distinct degraded status rather than a strict binary healthy/unhealthy.'",
    diagramNote:
      "'Health check verifies EVERY dependency (including non-critical)' → 'One unrelated dependency outage → app reports fully unhealthy' → 'Unnecessary restarts/traffic routing — cascading over-reaction' — balance: check only truly critical dependencies, consider a 'degraded' status.",
    diagramMermaid: `flowchart TD
    A["Health check verifies<br/>EVERY dependency"] --> B["One unrelated outage →<br/>reports fully unhealthy"]
    B --> C["Unnecessary restarts/<br/>traffic routing — cascading over-reaction"]
    D["Check only truly critical deps,<br/>consider 'degraded' status"] -.->|"avoids"| B`,
    realProjectExample:
      "An app's health check verified a non-critical analytics service alongside its actually-critical database connection; when the analytics service had a brief unrelated outage, every instance of the app reported unhealthy and got restarted repeatedly by the platform, unnecessarily disrupting service that could have continued fine without analytics — the fix removed the non-critical dependency from the health check entirely.",
    interviewTip:
      "If asked to review a health check design, specifically checking whether it distinguishes truly critical dependencies from nice-to-have ones (rather than checking everything indiscriminately) shows awareness of this real, common failure mode.",
    followupQuestions: [
      "How would you implement a 'degraded' status distinct from fully healthy or fully unhealthy?",
      "What would restarting an app instance actually accomplish if the real problem is an external dependency outage?",
      "How would you decide which dependencies are 'truly critical' versus not for a given app?",
    ],
    commonMistakes: [
      "Checking every downstream dependency indiscriminately in a health check, regardless of actual criticality.",
      "Not considering that an over-thorough health check can cause a single unrelated outage to cascade into broader apparent unavailability.",
    ],
    importantPoints: [
      "Over-checking non-critical dependencies in a health check risks cascading, unnecessary failure reactions.",
      "Distinguish truly critical dependencies (worth checking) from non-critical ones (degraded response is better).",
      "Consider a distinct 'degraded' status rather than a strict binary healthy/unhealthy.",
    ],
    revisionNotes: "Health checks verifying every dependency risk cascading over-reaction to unrelated outages — check only truly critical dependencies, consider a 'degraded' status rather than strict binary healthy/unhealthy.",
  },
  {
    id: "mon-q13",
    topic: "Application Logging",
    prompt: "How would you correlate a specific error in Application Logging back to the exact user session or request that caused it?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["application-logging", "correlation"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Include a consistent correlation identifier (a request ID or trace ID) in every log statement related to that request, generated at the entry point and propagated through the whole call chain — searching Application Logging for that specific ID then surfaces every log line related to that exact request/session, across all the code paths and services it touched.",
    detailedAnswer:
      "Without a consistent identifier tying related log lines together, correlating a specific error with everything else that happened during that same request (earlier log lines showing what led up to it, or related activity in other services) means guessing based on rough timestamps — unreliable, especially under concurrent load where many requests' logs interleave. Generating a correlation ID (often the same trace ID used for distributed tracing, or a simpler request-scoped ID for a single-service context) at the entry point and including it as a field in every subsequent log statement for that request lets you search Application Logging for exactly that ID and see every related log line, in the correct order, regardless of how many other unrelated requests' logs are interleaved around them in the raw log stream.",
    hindiExplanation:
      "Ek consistent identifier ke bina jo related log lines ko jode, ek specific error ko baaki sab kuch jo usi request ke dauraan hua (earlier log lines jo dikhati hain kya lead hua, ya related activity doosri services mein) se correlate karna rough timestamps ke basis pe guess karna hai — unreliable, especially concurrent load ke under jaha kai requests ke logs interleave hote hain. Ek correlation ID generate karna (aksar wahi trace ID jo distributed tracing ke liye use hota hai, ya ek simpler request-scoped ID single-service context ke liye) entry point pe aur use har subsequent log statement mein ek field ki tarah include karna tumhe Application Logging mein exactly us ID ko search karne deta hai.",
    interviewExplanation:
      "I'd describe the correlation-ID-based approach: 'Without a consistent identifier, correlating an error with everything else that happened in the same request means guessing by rough timestamps — unreliable under concurrent load where many requests' logs interleave. I'd generate a correlation ID at the entry point, often the same trace ID used for distributed tracing, and include it in every subsequent log statement for that request. Then searching Application Logging for that exact ID surfaces every related log line, in order, regardless of what else is interleaved in the raw stream.'",
    diagramNote:
      "'Request enters, correlation ID generated' → 'included in every subsequent log statement' → 'search Application Logging for that ID' → 'surfaces every related log line, in order, across concurrent noise'.",
    diagramMermaid: `flowchart LR
    A["Request enters,<br/>correlation ID generated"] --> B["Included in every<br/>subsequent log statement"]
    B --> C["Search Application Logging<br/>for that exact ID"]
    C --> D["Every related log line,<br/>in order"]`,
    realProjectExample:
      "Investigating a specific user's failed checkout was straightforward because every log line related to that request carried the same correlation ID generated at the App Router entry point — searching for that ID in Application Logging surfaced the complete sequence of events across the CAP backend and a downstream payment microservice, without any timestamp guesswork.",
    interviewTip:
      "If asked how you'd investigate a specific error report under high concurrent load (where timestamp-based correlation would be unreliable), naming correlation-ID-based log searching specifically is the precise, correct technique.",
    followupQuestions: [
      "Would you generate a separate correlation ID, or reuse the same trace ID from distributed tracing?",
      "How would you ensure a correlation ID actually gets included in every single log statement, not just some?",
      "What would you do if a request touched a legacy system that couldn't propagate the correlation ID?",
    ],
    commonMistakes: [
      "Trying to correlate related log lines by rough timestamp matching instead of a consistent correlation ID.",
      "Not propagating the correlation ID consistently through every part of the request's processing.",
    ],
    importantPoints: [
      "A correlation ID generated at the entry point and included in every log statement enables precise correlation.",
      "Searching Application Logging for that specific ID surfaces exactly the related log lines, in order.",
      "This is far more reliable than timestamp-based guessing, especially under concurrent load.",
    ],
    revisionNotes: "Correlate logs to a specific request via a correlation ID (often the same trace ID) generated at entry and included in every log statement — search Application Logging for that ID, far more reliable than timestamp guessing.",
  },
  {
    id: "mon-q14",
    topic: "Metrics",
    prompt: "How would you decide an appropriate alert threshold for a metric like error rate — why not alert on any single error?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["metrics", "threshold-design"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Alerting on any single error would cause constant noise, since some baseline error rate is normal in most real systems (a user typo, an expected validation failure); an appropriate threshold reflects a rate meaningfully above that normal baseline sustained over a reasonable duration, distinguishing a genuine problem from expected background noise.",
    detailedAnswer:
      "Real systems virtually always have some non-zero baseline error rate that's entirely expected and not actually a problem — invalid user input triggering validation errors, expected retries, and similar normal operational noise. Alerting on any single error occurrence would page someone constantly for events that aren't actionable problems at all, quickly leading to alert fatigue. A sensible threshold is set meaningfully above that established normal baseline (which requires actually knowing what normal looks like for this specific system, not guessing), and typically requires the elevated rate to be sustained over a reasonable window (several minutes) rather than triggering off one brief spike, distinguishing a genuine, ongoing problem worth someone's attention from routine background noise or a momentary blip that resolves itself.",
    hindiExplanation:
      "Real systems mein virtually hamesha kuch non-zero baseline error rate hoti hai jo entirely expected hai aur actually koi problem nahi — invalid user input jo validation errors trigger karta hai, expected retries, aur similar normal operational noise. Kisi bhi single error occurrence pe alert karna kisi ko constantly page karega events ke liye jo actually actionable problems hain hi nahi, jaldi alert fatigue tak le jaate hue. Ek sensible threshold established normal baseline se meaningfully upar set hoti hai, aur typically elevated rate ko ek reasonable window (kai minutes) tak sustained hona chahiye ek brief spike pe trigger hone ki jagah.",
    interviewExplanation:
      "I'd explain why zero-tolerance alerting fails: 'Real systems always have some non-zero baseline error rate that's entirely expected — user typos, validation failures. Alerting on any single error would page someone constantly for non-actionable noise, quickly causing alert fatigue. I'd set the threshold meaningfully above the actual established baseline — which requires knowing what normal looks like for this system — and require it sustained over several minutes, not a single brief spike, to distinguish a genuine problem from routine noise.'",
    diagramNote:
      "'Any single error → alert' — constant noise, non-actionable, causes fatigue. vs 'Threshold above established normal baseline, sustained over minutes → alert' — distinguishes genuine problem from routine noise.",
    diagramMermaid: `flowchart LR
    A["Alert on any single error"] --> B["Constant noise,<br/>non-actionable, fatigue"]
    C["Threshold above baseline,<br/>sustained over minutes"] --> D["Distinguishes genuine problem<br/>from routine noise"]`,
    realProjectExample:
      "A newly deployed alert on 'any error occurring' paged the on-call engineer dozens of times a day for entirely normal validation failures; establishing the actual baseline error rate (around 0.5%) and setting the threshold at 5% sustained over 5 minutes reduced alerts to genuinely actionable events only.",
    interviewTip:
      "If asked to design an error-rate alert, explicitly mentioning the need to first establish the actual normal baseline (not guessing at an arbitrary threshold) shows a data-driven, not assumption-driven, approach.",
    followupQuestions: [
      "How would you establish what the 'normal baseline' error rate actually is for a given system?",
      "Would the appropriate threshold differ between a brand-new service and a mature, stable one?",
      "How would you adjust a threshold that turns out to be either too noisy or too insensitive after go-live?",
    ],
    commonMistakes: [
      "Setting an alert threshold at zero tolerance (any single error), causing constant non-actionable noise.",
      "Not first establishing the system's actual normal baseline error rate before picking an arbitrary threshold.",
    ],
    importantPoints: [
      "Real systems have a non-zero baseline error rate that's entirely expected, not a problem.",
      "An appropriate threshold sits meaningfully above that established baseline.",
      "Require the elevated rate sustained over a reasonable duration, not a single brief spike.",
    ],
    revisionNotes: "Don't alert on any single error — establish the system's actual normal baseline error rate, then set a threshold meaningfully above it, sustained over minutes, to distinguish genuine problems from routine noise.",
  },
  {
    id: "mon-q15",
    topic: "Tracing",
    prompt: "What's the performance/cost tradeoff of tracing every single request versus sampling a subset?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["tracing", "sampling"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Tracing every single request gives complete visibility but adds overhead to every request and can generate enormous trace data volume/storage cost at high traffic; sampling (tracing only a representative subset, or specifically tracing requests that errored or were unusually slow) reduces this cost while typically still catching the patterns and problems that matter, though at the risk of occasionally missing a specific rare issue that wasn't in the sampled subset.",
    detailedAnswer:
      "At high request volume, tracing every single request adds a small but real per-request overhead (generating and propagating span data) and generates a data volume that can become genuinely expensive to store and query at scale, especially for high-traffic services where most traces look identical and uninteresting. Sampling strategies address this: a simple percentage-based sample (trace 1% of all requests) gives a statistically representative view of typical behavior at much lower cost, while smarter strategies specifically prioritize tracing requests that are more likely to be interesting — always trace requests that errored, or that exceeded a latency threshold, even if the overall sample rate for 'normal' requests is low. The tradeoff is that any sampling risks occasionally missing a specific rare issue that happened not to be in the sampled subset, but a well-designed sampling strategy (especially one biased toward errors/slow requests) captures the overwhelming majority of what actually matters for troubleshooting at a fraction of full-tracing's cost.",
    hindiExplanation:
      "High request volume pe, har single request trace karna ek chhota lekin real per-request overhead add karta hai (span data generate/propagate karna) aur ek data volume generate karta hai jo genuinely expensive ho sakta hai store/query karne mein scale pe, especially high-traffic services ke liye jaha zyada tar traces identical aur uninteresting dikhte hain. Sampling strategies isse address karti hain: ek simple percentage-based sample (1% saare requests ko trace karo) ek statistically representative view deta hai typical behavior ka much lower cost pe, jabki smarter strategies specifically un requests ko trace karna prioritize karti hain jo interesting hone ki zyada possibility rakhte hain — hamesha wo requests trace karo jo error hue, ya ek latency threshold exceed kiya.",
    interviewExplanation:
      "I'd give the concrete tradeoff and the smart sampling middle ground: 'Full tracing adds per-request overhead and generates huge data volume/storage cost at scale, especially since most traces at high-traffic services look identical. Sampling — say, 1% of all requests — reduces cost while giving a statistically representative view. Smarter strategies bias toward tracing anything that errored or exceeded a latency threshold, even at a low overall sample rate, capturing the overwhelming majority of what actually matters for troubleshooting at a fraction of the cost — at the risk of occasionally missing a specific rare issue outside the sampled subset.'",
    diagramNote:
      "'Trace every request: full visibility, but high overhead + storage cost at scale' vs 'Sample (e.g. 1% + always-trace errors/slow requests): much lower cost, captures most of what matters, small risk of missing a rare unsampled issue'.",
    diagramMermaid: `flowchart LR
    A["Trace every request"] --> B["Full visibility,<br/>high overhead/storage cost"]
    C["Sample (e.g. 1% +<br/>always trace errors/slow)"] --> D["Lower cost, captures most<br/>of what matters"]`,
    realProjectExample:
      "A high-traffic service switched from full tracing (which was generating unsustainable storage costs) to a 2% baseline sample rate combined with always-tracing any request that errored or exceeded a 1-second latency threshold, dramatically cutting cost while still catching essentially every reported production issue during subsequent investigations.",
    interviewTip:
      "If asked how you'd design a tracing strategy for a high-traffic service, mentioning error/latency-biased sampling specifically (not just a flat percentage) shows a more sophisticated understanding of how to preserve troubleshooting value while controlling cost.",
    followupQuestions: [
      "How would you decide an appropriate baseline sample percentage for a specific service's traffic volume?",
      "What's the risk of biasing sampling too heavily toward errors, and what might you miss?",
      "Would sample rate need to differ across environments (dev/test/production)?",
    ],
    commonMistakes: [
      "Tracing every single request indiscriminately at high traffic volume without considering cost/overhead.",
      "Using only a flat percentage sample without biasing toward errors/slow requests, missing valuable troubleshooting signal.",
    ],
    importantPoints: [
      "Full tracing gives complete visibility but adds real overhead and storage cost at high volume.",
      "Sampling (percentage-based, or biased toward errors/slow requests) reduces cost while capturing most of what matters.",
      "Any sampling risks occasionally missing a specific rare issue outside the sampled subset.",
    ],
    revisionNotes: "Full tracing = complete visibility but high overhead/storage cost at scale. Sample instead — bias toward always-tracing errors/slow requests — captures most troubleshooting value at much lower cost.",
  },
];

export const monitoringMcqs: BtpMcq[] = [
  {
    id: "mon-mcq1",
    topic: "Application Logging",
    prompt: "Why bind the Application Logging service instead of relying only on `cf logs`?",
    options: [
      "cf logs is deprecated",
      "Application Logging persists logs long-term and provides search/filter across instances, unlike cf logs' limited buffer",
      "cf logs only works in production",
      "There's no real difference",
    ],
    correctIndex: 1,
    explanation: "cf logs/Loggregator only retains a limited recent buffer; Application Logging provides persistent, searchable, cross-instance log storage.",
  },
  {
    id: "mon-mcq2",
    topic: "Logs",
    prompt: "What is the main advantage of structured (JSON) logging over plain text logs?",
    options: [
      "It uses less disk space always",
      "Fields are directly queryable/filterable without fragile text parsing",
      "It's required by law",
      "It removes the need for a log viewer UI",
    ],
    correctIndex: 1,
    explanation: "Structured logs have named fields (like orderId, durationMs) that can be precisely filtered and aggregated, unlike plain text requiring regex parsing.",
  },
  {
    id: "mon-mcq3",
    topic: "Metrics",
    prompt: "What are metrics best suited for, compared to logs?",
    options: [
      "Storing detailed stack traces",
      "Numeric trends, dashboards, and threshold-based alerting",
      "Replacing the need for any logging",
      "Storing user passwords",
    ],
    correctIndex: 1,
    explanation: "Metrics are numeric time series, cheap at high volume, ideal for dashboards and threshold alerts — logs carry the rich per-event detail for diagnosis.",
  },
  {
    id: "mon-mcq4",
    topic: "Tracing",
    prompt: "What does a trace ID enable across multiple microservices?",
    options: [
      "Faster database queries",
      "Correlating all the spans from one original request into a single coherent timeline",
      "Automatic code deployment",
      "User authentication",
    ],
    correctIndex: 1,
    explanation: "A trace ID, propagated via a header through every service hop, lets a tracing tool reconstruct the full end-to-end timeline of one request across independent services.",
  },
  {
    id: "mon-mcq5",
    topic: "Alert Notification",
    prompt: "What does Alert Notification service shift monitoring from and to?",
    options: [
      "From automated to manual",
      "From reactive (user reports issues) to proactive (team notified automatically)",
      "From cloud to on-premise",
      "From metrics to logs",
    ],
    correctIndex: 1,
    explanation: "Alert Notification triggers on defined conditions and routes alerts automatically, shifting from reactive (waiting for user complaints) to proactive monitoring.",
  },
  {
    id: "mon-mcq6",
    topic: "Health Check",
    prompt: "What can a richer health check endpoint provide beyond a minimal 'process alive' check?",
    options: [
      "Nothing additional",
      "Verification of actual dependencies (database, downstream services), useful for external monitoring",
      "Automatic scaling",
      "User authentication",
    ],
    correctIndex: 1,
    explanation: "A richer health check verifies real dependencies and can report degraded status, serving as a valuable target for external monitoring tools, not just the platform's routing decision.",
  },
  {
    id: "mon-mcq7",
    topic: "Metrics",
    prompt: "What's the difference between a counter and a gauge metric type?",
    options: [
      "They are identical",
      "A counter only ever increases (e.g. total requests); a gauge can go up or down (e.g. current memory usage)",
      "A gauge only ever increases, a counter can go up or down",
      "Counters are for logs, gauges are for traces",
    ],
    correctIndex: 1,
    explanation: "A counter is monotonically increasing and typically viewed as a rate; a gauge represents a point-in-time value that can move up or down.",
  },
  {
    id: "mon-mcq8",
    topic: "Tracing",
    prompt: "What does a span's parent-child relationship represent in a distributed trace?",
    options: [
      "Nothing meaningful, it's just metadata",
      "The actual call structure/hierarchy — which service called which, enabling a waterfall view of where time was spent",
      "The order alerts were sent",
      "The user's role permissions",
    ],
    correctIndex: 1,
    explanation: "Spans carry a parent-span reference mirroring the actual nested call structure, letting a tracing tool render a waterfall view pinpointing exactly where time was spent.",
  },
  {
    id: "mon-mcq9",
    topic: "Alert Notification",
    prompt: "What is 'alert fatigue'?",
    options: [
      "A metric measuring server load",
      "When too many low-value alerts desensitize a team, causing genuinely critical alerts to be missed or ignored",
      "A type of distributed trace",
      "A billing charge for excessive alerts",
    ],
    correctIndex: 1,
    explanation: "Alert fatigue happens when excessive low-value or false-positive alerts cause a team to start ignoring alerts generally, risking a genuinely critical one getting lost in the noise.",
  },
  {
    id: "mon-mcq10",
    topic: "Application Logging",
    prompt: "How would you correlate all log lines related to one specific request across multiple services?",
    options: [
      "Match log lines by approximate timestamp",
      "Include a consistent correlation/trace ID in every log statement for that request, then search for that ID",
      "It's not possible across services",
      "Only by checking each service's logs manually one at a time",
    ],
    correctIndex: 1,
    explanation: "A correlation ID generated at the entry point and propagated through every log statement lets you search Application Logging for that exact ID, reliably surfacing all related log lines regardless of concurrent noise.",
  },
];
