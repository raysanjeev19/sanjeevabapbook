import type { BtpMcq, BtpQuestion } from "@/lib/btp-content";

/** Section 10 — Event Mesh. Interview questions, full format. */
export const eventMeshQuestions: BtpQuestion[] = [
  {
    id: "em-q1",
    topic: "Queues",
    prompt: "What is a queue in Event Mesh, and how does it differ from a topic?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["queues", "topics"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A queue holds messages for exactly one competing set of consumers — each message is delivered to and processed by only one consumer instance, even with multiple subscribers; a topic broadcasts each message to every subscriber independently, so many different subscribers each get their own copy.",
    detailedAnswer:
      "Queues implement point-to-point, competing-consumer semantics — if you have three instances of a worker service reading from the same queue, each message goes to exactly one of them (great for load-balancing work across instances). Topics implement publish-subscribe/fan-out semantics — every subscriber gets its own independent copy of every message, appropriate when multiple, different downstream systems each need to react to the same event independently (an order-placed event might need to trigger both an email notification and an inventory update, each as a separate, independent subscriber). Choosing between them is really a choice about whether messages should be load-balanced across one logical consumer (queue) or broadcast to many different, independent consumers (topic).",
    hindiExplanation:
      "Queues point-to-point, competing-consumer semantics implement karti hain — agar tumhare paas ek worker service ke teen instances hain jo same queue se read kar rahe hain, har message unme se exactly ek ko jaata hai (instances ke beech work load-balance karne ke liye achha). Topics publish-subscribe/fan-out semantics implement karte hain — har subscriber ko har message ki apni independent copy milti hai, jab multiple, alag downstream systems ko ek hi event pe independently react karna ho (order-placed event ek email notification aur inventory update dono trigger kar sakta hai, har ek alag, independent subscriber ki tarah).",
    interviewExplanation:
      "I'd give the concrete distinction: 'A queue is competing-consumer — with multiple consumer instances, each message goes to exactly one of them, good for load-balancing work. A topic is publish-subscribe — every subscriber gets its own independent copy of every message, good when multiple different systems each need to react to the same event independently.'",
    diagramNote:
      "Queue: 'Message → one of 3 competing consumer instances (each message to exactly one)'. Topic: 'Message → Subscriber A (own copy) + Subscriber B (own copy) + Subscriber C (own copy)'.",
    diagramMermaid: `flowchart LR
    Q["Queue message"] --> C1["Consumer instance 1"]
    Q -.-> C2["Consumer instance 2"]
    Q -.-> C3["Consumer instance 3"]
    T["Topic message"] --> S1["Subscriber A (own copy)"]
    T --> S2["Subscriber B (own copy)"]
    T --> S3["Subscriber C (own copy)"]`,
    realProjectExample:
      "An order-processing worker pool read from a queue so incoming orders were load-balanced across instances, while an 'order.placed' topic separately notified both an email service and an analytics service, each getting its own independent copy of every event.",
    interviewTip:
      "If asked 'when would three subscribers to the same queue each get a copy', clarify that's not how queues work — that's topic behavior; queues split work, topics broadcast.",
    followupQuestions: [
      "What happens if no consumer is currently reading from a queue?",
      "Can a topic have zero subscribers, and what happens to messages if so?",
      "Which would you use for a 'notify multiple systems of an event' scenario?",
    ],
    commonMistakes: [
      "Thinking multiple consumers on a queue each get every message (that's topic behavior).",
      "Using a topic when work-splitting (queue) is actually needed, or vice versa.",
    ],
    importantPoints: [
      "Queue = competing consumers, each message to exactly one consumer (load-balancing).",
      "Topic = publish-subscribe, every subscriber gets its own independent copy (broadcast).",
      "Choice depends on whether you want to split work or broadcast to independent reactors.",
    ],
    revisionNotes: "Queue = competing consumers (message to one). Topic = pub-sub (every subscriber gets a copy). Queue splits work; topic broadcasts.",
  },
  {
    id: "em-q2",
    topic: "Publish Subscribe",
    prompt: "What are the benefits of a publish-subscribe architecture over direct point-to-point service calls?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["publish-subscribe", "architecture"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Publish-subscribe decouples the publisher from knowing who (or how many) consumers exist — a publisher just emits an event without needing to call each interested system directly, new subscribers can be added later with zero changes to the publisher, and consumers can process events at their own pace independently.",
    detailedAnswer:
      "With direct point-to-point calls, a service that needs to notify three other systems must know about, call, and handle failures from all three directly — adding a fourth interested system means modifying the publisher's code. Pub-sub inverts this: the publisher just emits an event to a topic without knowing or caring who's listening; new subscribers can be added entirely independently with zero changes to the publisher. This also naturally supports asynchronous, independent processing speeds — a slow downstream consumer doesn't block or slow down the publisher or other faster consumers, unlike a synchronous direct call chain.",
    hindiExplanation:
      "Direct point-to-point calls ke saath, ek service jise teen doosre systems ko notify karna hai, use un teeno ke baare mein pata hona chahiye, unhe call karna chahiye, aur unke failures handle karne chahiye directly — ek chautha interested system add karna publisher ka code modify karne ki maang karta hai. Pub-sub isse ulta karta hai: publisher bas ek event ek topic ko emit karta hai bina jaane ya care kiye kaun sun raha hai; naye subscribers bilkul independently add ho sakte hain publisher mein zero changes ke saath. Ye naturally asynchronous, independent processing speeds bhi support karta hai — ek slow downstream consumer publisher ya doosre faster consumers ko block ya slow nahi karta.",
    interviewExplanation:
      "I'd contrast the coupling: 'With direct calls, a publisher must know about and directly call every interested system — adding a new one means changing the publisher. Pub-sub decouples this — the publisher just emits to a topic, new subscribers can be added with zero publisher changes, and each consumer processes at its own pace without a slow one blocking others.'",
    diagramNote:
      "Direct calls: 'Publisher directly calls Service A, B, C — adding D means changing publisher code'. Pub-sub: 'Publisher emits to topic → A, B, C subscribe independently → adding D needs zero publisher changes'.",
    diagramMermaid: `flowchart LR
    A["Direct calls:<br/>Publisher directly calls A, B, C"] -.-> B["Adding D changes publisher code"]
    C["Pub-sub:<br/>Publisher emits to topic"] --> D["A, B, C subscribe independently"]
    D -.-> E["Adding D: zero publisher changes"]`,
    realProjectExample:
      "Adding a new fraud-detection service that needed to react to every order event was done by simply subscribing it to the existing 'order.placed' topic — the order service that published the event never needed to change at all.",
    interviewTip:
      "If asked to justify pub-sub's added complexity over 'just calling the other service directly', the decoupling and independent-scaling benefits are the concrete justification, not just 'it's more modern'.",
    followupQuestions: [
      "What's a downside or tradeoff of pub-sub compared to direct synchronous calls?",
      "How would a publisher know if a critical subscriber failed to process an event?",
      "Does pub-sub guarantee message ordering across all subscribers?",
    ],
    commonMistakes: [
      "Not identifying the specific decoupling benefit (adding subscribers without publisher changes).",
      "Assuming pub-sub is strictly 'better' without acknowledging any tradeoffs (like harder end-to-end tracing).",
    ],
    importantPoints: [
      "Publisher doesn't need to know who or how many subscribers exist.",
      "New subscribers can be added independently, with zero publisher changes.",
      "Consumers process at their own pace — one slow consumer doesn't block others.",
    ],
    revisionNotes: "Pub-sub decouples publisher from subscribers — add subscribers with zero publisher changes, each consumer processes independently at its own pace.",
  },
  {
    id: "em-q3",
    topic: "Events",
    prompt: "What should go into an event payload, and what's a common mistake in event design?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["events", "design"],
    estimatedMinutes: 3,
    expectedAnswer:
      "An event should carry enough information for subscribers to act without needing an immediate follow-up call back to the publisher (a common design goal), but a common mistake is either including too little (forcing subscribers to constantly call back for details) or too much (tightly coupling subscribers to the publisher's full internal data model).",
    detailedAnswer:
      "There's a real design tension here. If an event payload is too thin (just an ID, like 'order 123 was placed'), every subscriber has to immediately call back to the source system to get any actual details, creating a synchronous dependency that undermines much of the decoupling benefit pub-sub was supposed to provide, and adding load back on the publisher. If an event payload is too fat (the entire internal order object with every field, including ones only relevant to specific internal logic), subscribers become tightly coupled to the publisher's internal data shape, and every internal schema change risks breaking every subscriber. A better middle ground includes the fields a typical subscriber actually needs to act (enough for most common reactions), while treating the event as a notification of 'something happened, here's the relevant business data' rather than a full dump of internal state.",
    hindiExplanation:
      "Yahan ek real design tension hai. Agar event payload bahut thin hai (bas ek ID, jaise 'order 123 place hua'), har subscriber ko turant source system ko wapas call karna padta hai actual details ke liye, jo ek synchronous dependency banata hai jo pub-sub ke decoupling fayde ko undermine karta hai. Agar event payload bahut fat hai (poora internal order object har field ke saath), subscribers publisher ke internal data shape se tightly coupled ho jaate hain, aur har internal schema change har subscriber ko break karne ka risk rakhta hai. Ek better middle ground un fields ko include karta hai jo ek typical subscriber ko actually chahiye, event ko 'kuch hua, ye relevant business data hai' ki notification ki tarah treat karte hue, poore internal state ka dump nahi.",
    interviewExplanation:
      "I'd explain the tension and the middle ground: 'Too thin an event — just an ID — forces subscribers to call back for details, undermining decoupling. Too fat an event — the full internal object — tightly couples subscribers to your internal schema, breaking on every internal change. The right middle ground includes the business-relevant fields a typical subscriber actually needs, treating the event as a meaningful notification, not a full internal state dump.'",
    diagramNote:
      "Spectrum: 'Too thin (just ID) → forces callback, undermines decoupling' — 'Right balance (relevant business fields)' — 'Too fat (full internal object) → tight coupling to internal schema'.",
    diagramMermaid: `flowchart LR
    A["Too thin<br/>just ID"] --> B["Forces callback,<br/>undermines decoupling"]
    C["Right balance<br/>relevant business fields"]
    D["Too fat<br/>full internal object"] --> E["Tight coupling<br/>to internal schema"]`,
    realProjectExample:
      "An initial 'order.placed' event carrying only the order ID forced every subscriber to call back to the order service for details, creating a synchronous bottleneck — redesigning the event to include key order fields (customer, total, line item summary) eliminated the callback pattern entirely.",
    interviewTip:
      "If asked to design an event payload, explicitly articulating this thin-vs-fat tradeoff and landing on a deliberate middle ground shows real architectural maturity, not just 'include everything to be safe'.",
    followupQuestions: [
      "How would you version an event schema as it evolves over time?",
      "What's a concrete example of a field that shouldn't go into an event payload?",
      "How do you decide what counts as 'business-relevant' for an event?",
    ],
    commonMistakes: [
      "Including only an ID and forcing every subscriber into a synchronous callback pattern.",
      "Dumping the entire internal object into every event, tightly coupling subscribers to internal schema changes.",
    ],
    importantPoints: [
      "Event payload should carry business-relevant data, not just an ID or the full internal object.",
      "Too thin forces callbacks, undermining decoupling; too fat couples subscribers to internal schema.",
      "Treat events as meaningful notifications, not internal state dumps.",
    ],
    revisionNotes: "Event payload design: not too thin (forces callback) or too fat (couples to internal schema) — include business-relevant fields, treat as a meaningful notification.",
  },
  {
    id: "em-q4",
    topic: "Retry",
    prompt: "What happens when a consumer fails to process a message, and how does retry behavior typically work?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["retry", "reliability"],
    estimatedMinutes: 2,
    expectedAnswer:
      "If a consumer fails to acknowledge successful processing (throws an error, crashes, or times out), the message broker redelivers the message for another attempt, typically with a configurable retry count and backoff delay, before eventually routing it to a Dead Letter Queue if retries are exhausted.",
    detailedAnswer:
      "Messaging systems generally only remove a message from a queue once the consumer explicitly acknowledges successful processing; if that acknowledgment never comes (an exception is thrown, the consumer crashes mid-processing, or a processing timeout is exceeded), the broker considers the message unprocessed and redelivers it — either immediately or after a backoff delay, depending on configuration. This retry behavior handles transient failures gracefully (a downstream database being briefly unavailable, a momentary network blip) without manual intervention, but it also means consumer processing logic should generally be idempotent — safe to run more than once on the same message — since a message might be redelivered even after partially succeeding, if the acknowledgment itself was lost.",
    hindiExplanation:
      "Messaging systems generally ek message ko queue se tabhi remove karte hain jab consumer explicitly successful processing acknowledge kare; agar wo acknowledgment kabhi nahi aata (ek exception throw hua, consumer processing ke beech crash ho gaya, ya ek processing timeout exceed ho gaya), broker message ko unprocessed maanta hai aur redeliver karta hai — either immediately ya ek backoff delay ke baad, configuration ke hisaab se. Ye retry behavior transient failures ko gracefully handle karta hai bina manual intervention ke, lekin iska matlab ye bhi hai ki consumer processing logic generally idempotent honi chahiye — same message pe ek se zyada baar chalne ke liye safe — kyunki ek message redeliver ho sakta hai chahe wo partially succeed bhi ho chuka ho, agar acknowledgment khud lost ho gaya ho.",
    interviewExplanation:
      "I'd explain the acknowledgment-based mechanism: 'The broker only removes a message once the consumer acknowledges successful processing. If that never comes — an error, a crash, a timeout — the broker redelivers it, typically with configurable retry count and backoff. This means consumer logic should be idempotent, since a message could be redelivered even after partial success, if the acknowledgment itself got lost.'",
    diagramNote:
      "Flow: 'Message delivered to consumer' → 'Consumer fails (error/crash/timeout)' → 'No acknowledgment' → 'Broker redelivers (with backoff)' → repeats until retries exhausted → 'Dead Letter Queue'.",
    diagramMermaid: `flowchart TD
    A["Message delivered to consumer"] --> B["Consumer fails<br/>error/crash/timeout"]
    B --> C["No acknowledgment"]
    C --> D["Broker redelivers<br/>with backoff"]
    D --> A
    D -.-> E["Retries exhausted →<br/>Dead Letter Queue"]`,
    realProjectExample:
      "A consumer that briefly lost its database connection had its in-flight messages automatically redelivered and successfully processed once the connection recovered, without any manual intervention — but this only worked correctly because the processing logic was written to be idempotent.",
    interviewTip:
      "Mentioning idempotency explicitly as a design requirement for consumers is a strong, precise detail that shows you understand the real implications of retry/redelivery behavior.",
    followupQuestions: [
      "What does 'idempotent' mean for a message consumer, and why does it matter here?",
      "How would you configure the retry count and backoff delay?",
      "What happens after all retries are exhausted?",
    ],
    commonMistakes: [
      "Writing non-idempotent consumer logic that breaks or double-processes on redelivery.",
      "Not knowing retries typically use a backoff delay rather than immediate infinite retry.",
    ],
    importantPoints: [
      "Unacknowledged messages get redelivered (configurable retry count + backoff).",
      "Consumer logic should be idempotent, since redelivery can happen even after partial success.",
      "Exhausted retries typically route the message to a Dead Letter Queue.",
    ],
    revisionNotes: "Failed/unacknowledged message → broker redelivers (retry count + backoff) → consumer logic must be idempotent → exhausted retries go to Dead Letter Queue.",
  },
  {
    id: "em-q5",
    topic: "Dead Letter Queue",
    prompt: "What is a Dead Letter Queue, and why is monitoring it important?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["dead-letter-queue", "monitoring"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A Dead Letter Queue (DLQ) holds messages that failed processing after exhausting all retry attempts, preventing them from being silently lost or endlessly retried; monitoring it is important because messages piling up there represent real business events that were never successfully processed — a silent failure if nobody's watching.",
    detailedAnswer:
      "Without a DLQ, a message that a consumer can never successfully process (due to a bug, malformed data, or a persistent downstream outage) would either be retried forever, consuming resources and potentially blocking other messages behind it, or be dropped silently, losing that business event entirely. A DLQ gives failed messages a final resting place after retries are exhausted, letting the main processing pipeline continue unblocked while preserving the failed message for investigation. Critically, a DLQ with no monitoring or alerting is nearly as bad as having no DLQ at all — messages accumulating there represent real, unprocessed business events (an order that was never fulfilled, a notification never sent) that need human attention, not just cold storage nobody ever checks.",
    hindiExplanation:
      "DLQ ke bina, ek message jise consumer kabhi successfully process nahi kar sakta (bug, malformed data, ya persistent downstream outage ki wajah se) ya toh hamesha ke liye retry hota rahega, resources consume karte hue aur potentially doosre messages ko block karte hue, ya silently drop ho jaayega, us business event ko poori tarah lose karte hue. DLQ failed messages ko ek final resting place deta hai retries exhaust hone ke baad, main processing pipeline ko unblocked chalne deta hai jabki failed message ko investigation ke liye preserve karta hai. Critically, monitoring/alerting ke bina DLQ almost utna hi bura hai jitna koi DLQ na hona — waha accumulate ho rahe messages real, unprocessed business events represent karte hain jinhe human attention chahiye.",
    interviewExplanation:
      "I'd explain both the purpose and the operational responsibility: 'A DLQ catches messages that exhausted all retries, preventing infinite retry loops or silent data loss, and lets the main pipeline continue unblocked. But a DLQ nobody monitors is almost as bad as not having one — messages piling up there are real business events that never got processed, and someone needs to be alerted to investigate, not just let it silently accumulate.'",
    diagramNote:
      "'Message fails all retries' → 'Routed to Dead Letter Queue' → branches: 'Monitored (alert fires, human investigates)' vs 'Unmonitored (silent accumulation — nearly as bad as no DLQ)'.",
    diagramMermaid: `flowchart TD
    A["Message fails all retries"] --> B["Routed to Dead Letter Queue"]
    B --> C["Monitored: alert fires,<br/>human investigates"]
    B --> D["Unmonitored: silent accumulation<br/>— nearly as bad as no DLQ"]`,
    realProjectExample:
      "A malformed message from an upstream system silently accumulated in a Dead Letter Queue for two weeks with no alerting configured, representing two weeks of unprocessed order-cancellation events before anyone noticed — after which a monitoring alert on DLQ depth was added immediately.",
    interviewTip:
      "If asked 'is having a DLQ enough for reliability', the correct answer is no — explicitly mention that monitoring/alerting on it is just as essential as the DLQ's existence itself.",
    followupQuestions: [
      "What would you alert on specifically — DLQ depth, or something else?",
      "How would you investigate and reprocess a message stuck in a DLQ?",
      "What's a common root cause of messages ending up in a DLQ?",
    ],
    commonMistakes: [
      "Treating a DLQ's existence alone as sufficient for reliability, without monitoring it.",
      "Not connecting DLQ accumulation to real, unprocessed business impact.",
    ],
    importantPoints: [
      "DLQ = final destination for messages that exhausted all retries.",
      "Prevents infinite retry loops and silent message loss.",
      "Monitoring/alerting on DLQ depth is essential — an unmonitored DLQ is nearly as bad as none.",
    ],
    revisionNotes: "DLQ = catches messages after retries exhausted, prevents silent loss/infinite retry. Must be monitored/alerted on — unmonitored DLQ ≈ no DLQ.",
  },
  {
    id: "em-q6",
    topic: "Queues",
    prompt: "What does 'message ordering' guarantee mean, and does Event Mesh guarantee strict ordering across all messages?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["queues", "ordering"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Message ordering means messages are delivered/processed in the same sequence they were published; Event Mesh (like most distributed messaging systems) generally guarantees ordering only within a single queue/partition with a single consumer, not globally across an entire topic with multiple parallel consumers or partitions.",
    detailedAnswer:
      "Strict global ordering across every message in a system is fundamentally at odds with horizontal scalability — if multiple consumer instances process messages in parallel for throughput, there's no way to guarantee they finish in the exact original publish order. What's realistically guaranteed is ordering within a narrower scope: typically, messages within the same queue processed by a single consumer instance, or messages sharing the same partition/grouping key, will arrive in order relative to each other — but two unrelated messages processed by different parallel consumers offer no such guarantee. If an application genuinely needs strict ordering for a related sequence of events (like all events for one specific order), the practical solution is ensuring those related events share a common key/partition so they're always routed to the same consumer, preserving relative order for that subset while still allowing overall parallelism.",
    hindiExplanation:
      "Har message ke across strict global ordering fundamentally horizontal scalability ke against hai — agar multiple consumer instances throughput ke liye parallel mein messages process karte hain, unke exact original publish order mein finish hone ki koi guarantee nahi ho sakti. Realistically jo guarantee hoti hai wo ek narrower scope mein hai: typically, ek hi queue mein ek single consumer instance dwara process hone wale messages, ya same partition/grouping key share karne wale messages, ek doosre ke against order mein aayenge — lekin do unrelated messages jo alag parallel consumers dwara process ho rahe hain, koi aisi guarantee nahi. Agar ek application ko genuinely strict ordering chahiye related events ke ek sequence ke liye (jaise ek specific order ke saare events), practical solution hai ki un related events ko ek common key/partition share karwao taaki wo hamesha same consumer ko route hon.",
    interviewExplanation:
      "I'd clarify the realistic scope: 'Strict global ordering across every message conflicts with horizontal scalability — parallel consumers can't guarantee finishing in original publish order. What's actually guaranteed is ordering within a narrower scope, like a single queue with one consumer, or messages sharing a partition/grouping key. If an app needs strict ordering for related events, like all events for one order, the solution is giving them a shared key so they're always routed to the same consumer.'",
    diagramNote:
      "'Global ordering across all messages' — crossed out, conflicts with parallelism. 'Ordering within same partition/key (e.g. same order ID)' — guaranteed, since always routed to same consumer.",
    diagramMermaid: `flowchart LR
    A["Global ordering<br/>across all messages"] -.-> B["Conflicts with parallel<br/>consumer scalability"]
    C["Ordering within<br/>same partition/key"] --> D["Guaranteed — always<br/>routed to same consumer"]`,
    realProjectExample:
      "An application processing order-status-change events used the order ID as the partition key, guaranteeing that all status changes for one specific order were processed in order relative to each other, even while different orders were processed fully in parallel across many consumers.",
    interviewTip:
      "If asked 'does the platform guarantee message ordering', a confident 'yes always' answer is a red flag — the nuanced, correct answer acknowledges the scope limitation and the partition-key solution for when ordering genuinely matters.",
    followupQuestions: [
      "What is a partition key and how would you choose one for your events?",
      "What happens to ordering guarantees if you scale up the number of consumers?",
      "Give an example where message ordering genuinely matters for correctness.",
    ],
    commonMistakes: [
      "Claiming the messaging system guarantees strict global ordering across all messages.",
      "Not knowing partition/grouping keys are the practical mechanism for preserving relative order where it matters.",
    ],
    importantPoints: [
      "Global ordering across all messages conflicts with horizontal scalability.",
      "Ordering is typically guaranteed only within a single queue/consumer or shared partition key.",
      "Use a shared key (e.g. order ID) to preserve relative order for related events.",
    ],
    revisionNotes: "No guaranteed global message ordering (conflicts with parallelism). Ordering guaranteed only within same queue/partition/key — use a shared key for related events needing order.",
  },
  {
    id: "em-q7",
    topic: "Topics",
    prompt: "How do you decide the right granularity for a topic — one broad topic for all order events, or several narrower topics per event type?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["topics", "granularity"],
    estimatedMinutes: 3,
    expectedAnswer:
      "It depends on whether subscribers genuinely need to react to a broad category as a whole or only to specific event types within it — a single broad topic requires every subscriber to filter out irrelevant event types themselves, while overly narrow per-event-type topics can lead to subscribers needing to subscribe to many topics just to get a complete picture; the right granularity groups events that are typically consumed together.",
    detailedAnswer:
      "A single 'order events' topic carrying every possible order-related event type (created, updated, cancelled, shipped) means every subscriber receives all of them and must filter for what it actually cares about — fine if most subscribers genuinely care about most event types, wasteful and noisy if a given subscriber only ever wants one specific type. Conversely, a separate topic per fine-grained event type means a subscriber wanting 'anything happening to an order' must subscribe to many topics and reassemble the full picture itself. The practical guideline is designing topic granularity around actual consumption patterns — group event types that are typically consumed together into one topic, and split out event types that have genuinely distinct, separate audiences into their own topics.",
    hindiExplanation:
      "Ek single 'order events' topic jo har possible order-related event type carry karta hai (created, updated, cancelled, shipped) matlab har subscriber sab kuch receive karta hai aur khud filter karna padta hai jo actually chahiye — fine hai agar zyada tar subscribers genuinely zyada tar event types care karte hain, wasteful/noisy hai agar ek given subscriber sirf ek specific type chahta hai. Doosri taraf, har fine-grained event type ke liye ek separate topic matlab ek subscriber jise 'order ko kuch bhi ho raha hai' chahiye use kai topics subscribe karne padenge. Practical guideline hai topic granularity ko actual consumption patterns ke around design karna.",
    interviewExplanation:
      "I'd frame it around actual consumption patterns: 'A single broad topic means every subscriber filters out what it doesn't need — fine if most subscribers care about most event types, noisy otherwise. Overly narrow per-event-type topics mean a subscriber wanting the full picture has to subscribe to many topics and reassemble it. The practical guideline is grouping event types that are typically consumed together, and splitting out ones with genuinely distinct audiences.'",
    diagramNote:
      "'One broad topic (all order events)' → subscribers filter out unwanted types vs 'Many narrow topics (per event type)' → subscribers needing the full picture must subscribe to many — right granularity groups by actual consumption pattern.",
    diagramMermaid: `flowchart LR
    A["One broad topic<br/>all order events"] --> B["Subscribers filter<br/>out unwanted types"]
    C["Many narrow topics<br/>per event type"] --> D["Full-picture subscribers<br/>must subscribe to many"]`,
    realProjectExample:
      "An initial single 'order events' topic was split into 'order.lifecycle' (created/updated/cancelled, consumed together by an order-tracking service) and a separate 'order.shipped' topic (consumed by an entirely different logistics-notification audience), matching the actual distinct consumption patterns.",
    interviewTip:
      "If asked how granular to make topics, the strong answer references actual subscriber consumption patterns rather than an arbitrary rule like 'one topic per entity' or 'one topic per event type'.",
    followupQuestions: [
      "How would you migrate from one broad topic to several narrower ones without breaking existing subscribers?",
      "What signals would tell you a topic has become too broad in practice?",
      "Would you ever combine two originally-separate topics later if consumption patterns converge?",
    ],
    commonMistakes: [
      "Defaulting to one giant topic for an entire entity's events regardless of actual subscriber needs.",
      "Over-splitting into a topic per fine-grained event type without considering subscribers needing the full picture.",
    ],
    importantPoints: [
      "Topic granularity should be designed around actual subscriber consumption patterns.",
      "Too broad forces filtering; too narrow forces subscribing to many topics for a full picture.",
      "Group event types typically consumed together; split out genuinely distinct audiences.",
    ],
    revisionNotes: "Topic granularity: group event types typically consumed together, split out genuinely distinct audiences — not an arbitrary one-topic-per-entity or one-topic-per-event-type rule.",
  },
  {
    id: "em-q8",
    topic: "Topics",
    prompt: "How would you evolve a topic's event schema over time without breaking existing subscribers?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["topics", "schema-evolution"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Make additive, backward-compatible changes (adding new optional fields) rather than removing or renaming existing fields, since existing subscribers were built expecting the old shape to remain valid; a genuinely breaking change should go out as a new topic/version, mirroring the same API-versioning principle used elsewhere.",
    detailedAnswer:
      "Existing subscribers were written against the event schema as it existed when they were built, and they'll keep running unchanged unless something forces an update — so removing a field they might be reading, or renaming one, silently breaks them without any obvious error at the publisher's end. Additive changes (introducing a new optional field) are safe, since existing subscribers simply ignore fields they don't know about. A genuinely breaking change (removing/renaming a field, restructuring the payload) should be introduced as a new topic or a versioned event type, with existing subscribers continuing against the old topic/version until they deliberately migrate — exactly the same principle as API versioning, just applied to event schemas instead of REST endpoints.",
    hindiExplanation:
      "Existing subscribers event schema ke against likhe gaye the jaise wo unke banne ke time exist karta tha, aur wo unchanged chalte rahenge jab tak kuch unhe update karne pe majboor na kare — isliye ek field remove karna jo wo shayad read kar rahe hon, ya use rename karna, silently unhe break kar deta hai bina kisi obvious error ke publisher ki taraf. Additive changes (ek naya optional field introduce karna) safe hain, kyunki existing subscribers un fields ko simply ignore kar dete hain jo wo nahi jaante. Ek genuinely breaking change ek naye topic ya versioned event type ki tarah introduce hona chahiye.",
    interviewExplanation:
      "I'd draw the exact parallel to API versioning: 'Existing subscribers were built against the current schema and keep running unchanged — removing or renaming a field silently breaks them with no obvious error. Additive changes, new optional fields, are safe since subscribers ignore what they don't know about. A genuinely breaking change should go out as a new topic or versioned event type, with old subscribers staying on the old one until they deliberately migrate — same principle as API versioning, applied to events.'",
    diagramNote:
      "'Additive change (new optional field)' → 'Safe — existing subscribers ignore unknown fields' vs 'Breaking change (remove/rename field)' → 'New topic/versioned event type — old subscribers stay on old version until migrating'.",
    diagramMermaid: `flowchart LR
    A["Additive change<br/>new optional field"] --> B["Safe — subscribers<br/>ignore unknown fields"]
    C["Breaking change<br/>remove/rename field"] --> D["New topic/versioned event —<br/>old subscribers stay on old version"]`,
    realProjectExample:
      "Adding a new optional 'discountCode' field to an existing order event required zero subscriber changes, while a later restructuring that removed a deprecated field entirely was published as a new event version, letting existing subscribers keep working against the old version during their migration window.",
    interviewTip:
      "If asked how you'd add a new field to an event schema already in production, confirming that additive/optional changes are safe (unlike removing fields) shows precise understanding of backward compatibility.",
    followupQuestions: [
      "How would a subscriber signal it's ready to migrate to a new event version?",
      "Would you ever deprecate and retire an old event version, and how would you know it's safe to do so?",
      "How does this compare to the API versioning approach covered for Integration Suite/API Management?",
    ],
    commonMistakes: [
      "Removing or renaming an existing event field, silently breaking subscribers with no obvious error.",
      "Not recognizing this as the same versioning principle used for REST API breaking changes.",
    ],
    importantPoints: [
      "Additive, optional field changes are backward-compatible and safe.",
      "Removing/renaming fields silently breaks existing subscribers.",
      "Genuinely breaking changes should go out as a new topic/versioned event type.",
    ],
    revisionNotes: "Evolve event schemas additively (new optional fields = safe). Breaking changes (remove/rename fields) need a new topic/version — same principle as REST API versioning.",
  },
  {
    id: "em-q9",
    topic: "Publish Subscribe",
    prompt: "What's a genuine downside or tradeoff of pub-sub compared to direct synchronous calls?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["publish-subscribe", "tradeoffs"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Pub-sub makes end-to-end tracing and debugging harder — since the publisher doesn't know who's listening, tracing 'what actually happened as a result of this event' across multiple independent, asynchronous subscribers requires deliberate distributed tracing infrastructure, unlike a direct call chain where the caller can see the immediate outcome.",
    detailedAnswer:
      "The same decoupling that makes pub-sub valuable also makes observability harder: a direct synchronous call chain lets you follow cause-and-effect linearly (A calls B calls C, and you can trace the whole path), but a published event might trigger several independent subscribers processing asynchronously, at different times, with no built-in mechanism for the publisher (or an observer) to know all the downstream effects that eventually happened. Answering 'what was the full consequence of this one event' requires deliberately building distributed tracing (correlation IDs propagated through the event and each subscriber's logs) — this isn't automatic the way following a synchronous call stack is, and needs to be designed in deliberately rather than assumed to work by default.",
    hindiExplanation:
      "Wahi decoupling jo pub-sub ko valuable banata hai, observability ko bhi harder banata hai: ek direct synchronous call chain tumhe cause-and-effect linearly follow karne deti hai, lekin ek published event kai independent subscribers ko trigger kar sakta hai asynchronously process karte hue, different times pe, koi built-in mechanism ke bina publisher (ya ek observer) ke liye ye jaanne ka ki saare downstream effects eventually kya hue. 'Is ek event ka poora consequence kya tha' answer karna deliberately distributed tracing build karne ki maang karta hai.",
    interviewExplanation:
      "I'd name observability as the concrete tradeoff: 'The same decoupling that makes pub-sub valuable makes tracing harder — a synchronous call chain lets you follow cause-and-effect linearly, but a published event triggers independent async subscribers with no built-in way to know all downstream effects. Answering \"what happened as a result of this event\" requires deliberately built distributed tracing — correlation IDs propagated through the event and subscriber logs — it doesn't come for free the way following a call stack does.'",
    diagramNote:
      "'Direct synchronous call chain: A→B→C, traceable linearly' vs 'Pub-sub: publisher emits, independent async subscribers react — no built-in way to trace full downstream consequence without deliberate correlation IDs'.",
    diagramMermaid: `flowchart LR
    A["Direct call chain:<br/>A→B→C"] --> B["Traceable linearly"]
    C["Pub-sub: publisher emits"] --> D["Independent async subscribers —<br/>needs deliberate correlation IDs to trace"]`,
    realProjectExample:
      "Debugging why a specific order's downstream notification never arrived required manually correlating logs across three independent subscriber services with timestamps, since there was no built-in tracing — after this incident, correlation IDs were added to every event to make future tracing dramatically easier.",
    interviewTip:
      "If asked to name a real downside of pub-sub (not just praise its benefits), the tracing/observability tradeoff is the specific, correct answer that shows balanced, honest architectural thinking.",
    followupQuestions: [
      "How would you design correlation IDs to make cross-subscriber tracing possible?",
      "What tooling would you use to visualize an event's full downstream consequence across subscribers?",
      "Would this tracing challenge be worse or better with a queue versus a topic?",
    ],
    commonMistakes: [
      "Presenting pub-sub as strictly superior to direct calls without acknowledging the tracing/observability tradeoff.",
      "Not proactively designing correlation IDs or tracing infrastructure until after a debugging incident forces it.",
    ],
    importantPoints: [
      "Pub-sub's decoupling makes end-to-end tracing across independent async subscribers harder.",
      "Answering 'what happened as a result of this event' requires deliberately built distributed tracing.",
      "This tradeoff should be designed for upfront (correlation IDs), not discovered during an incident.",
    ],
    revisionNotes: "Pub-sub tradeoff: decoupling makes end-to-end tracing harder — need deliberate correlation IDs/distributed tracing, unlike a synchronous call chain's built-in traceability.",
  },
  {
    id: "em-q10",
    topic: "Publish Subscribe",
    prompt: "How would a publisher know if a critical subscriber failed to process an important event, given pub-sub's inherent decoupling?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["publish-subscribe", "reliability"],
    estimatedMinutes: 2,
    expectedAnswer:
      "By design, the publisher generally doesn't and shouldn't know — that's the whole point of the decoupling; instead, each subscriber is responsible for its own reliability (retries, Dead Letter Queue, monitoring), and if genuine end-to-end confirmation is business-critical, that's modeled as an explicit separate mechanism (like the subscriber publishing its own completion event) rather than the publisher somehow reaching back to check on subscribers.",
    detailedAnswer:
      "This is a common misunderstanding to correct: pub-sub's core value proposition is precisely that the publisher doesn't need to know or care about subscriber outcomes — reintroducing that dependency (the publisher checking whether each subscriber succeeded) would undo the decoupling benefit entirely, effectively turning it back into a synchronous dependency chain. Each subscriber is independently responsible for its own reliability — retry logic, a Dead Letter Queue for failures, its own monitoring/alerting. If there's a genuine business need for end-to-end confirmation (like 'I need to know the fraud check genuinely completed before releasing the order'), that's modeled as its own explicit mechanism — the fraud-check subscriber publishing its own 'fraud-check-completed' event that something else waits for — not the original publisher somehow monitoring subscriber-side success.",
    hindiExplanation:
      "Ye ek common misunderstanding hai jo correct karni chahiye: pub-sub ki core value proposition precisely yahi hai ki publisher ko subscriber outcomes janne/care karne ki zaroorat nahi — us dependency ko reintroduce karna (publisher check kare ki har subscriber succeed hua ya nahi) decoupling fayde ko poori tarah undo kar dega. Har subscriber independently apni reliability ke liye responsible hai — retry logic, failures ke liye ek Dead Letter Queue, apna monitoring/alerting. Agar genuine business need hai end-to-end confirmation ki, wo apna explicit mechanism ki tarah model hota hai — jaise fraud-check subscriber apna 'fraud-check-completed' event publish kare jise kuch aur wait kare.",
    interviewExplanation:
      "I'd correct the premise: 'By design, the publisher generally doesn't and shouldn't know — that's the whole point of decoupling. Reintroducing that dependency would undo the benefit entirely. Each subscriber owns its own reliability — retries, its own DLQ, its own monitoring. If genuine end-to-end confirmation is business-critical, I'd model that as its own explicit mechanism — the subscriber publishing a completion event something else waits for — not the original publisher somehow monitoring subscriber success.'",
    diagramNote:
      "'Publisher emits event' — does NOT track subscriber outcomes (would undo decoupling) → 'Each subscriber owns its own reliability (retry/DLQ/monitoring)' → if genuine confirmation needed: 'Subscriber publishes its own completion event as an explicit separate mechanism'.",
    diagramMermaid: `flowchart TD
    A["Publisher emits event"] -.->|"does NOT track outcomes"| B["Would undo decoupling"]
    A --> C["Each subscriber owns<br/>its own reliability"]
    C --> D["If confirmation needed:<br/>subscriber publishes its own completion event"]`,
    realProjectExample:
      "A team initially wanted the order-placement service to somehow verify the fraud-check subscriber had succeeded before proceeding, which was redesigned instead to have the fraud-check subscriber publish its own 'fraud-check-passed' event that the order-fulfillment step explicitly waited for — an intentional, separate mechanism rather than reaching back into pub-sub's decoupling.",
    interviewTip:
      "If asked 'how does the publisher know a subscriber succeeded', the correct answer directly challenges the premise — it generally doesn't and shouldn't, and explaining why reveals real understanding of pub-sub's actual design intent.",
    followupQuestions: [
      "How would you design the explicit completion-event mechanism for a case where confirmation genuinely matters?",
      "Does this differ for a queue's competing-consumer model versus a topic's broadcast model?",
      "What would you monitor to catch a subscriber that's silently failing, without the publisher needing to know?",
    ],
    commonMistakes: [
      "Trying to have the publisher somehow track or verify subscriber-side success, undoing the decoupling benefit.",
      "Not designing an explicit completion-event mechanism when genuine end-to-end confirmation is actually needed.",
    ],
    importantPoints: [
      "The publisher generally doesn't and shouldn't know about subscriber-side outcomes — that's the point of decoupling.",
      "Each subscriber independently owns its own reliability (retries, DLQ, monitoring).",
      "Genuine end-to-end confirmation needs are modeled as an explicit, separate completion-event mechanism.",
    ],
    revisionNotes: "Publisher shouldn't track subscriber success — that would undo pub-sub's decoupling. Each subscriber owns its own reliability; genuine confirmation needs get modeled as an explicit completion-event mechanism.",
  },
  {
    id: "em-q11",
    topic: "Events",
    prompt: "How would you version an event schema when a genuinely breaking change is unavoidable?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["events", "versioning"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Include an explicit version indicator in the event (like a version field or a versioned event type name), publish the new version alongside the old one for a transition period, and migrate subscribers deliberately, rather than silently changing the existing event's shape for everyone at once.",
    detailedAnswer:
      "A genuinely breaking change to an event's structure (restructuring nested fields, changing a field's meaning or type) can't be handled additively, so it needs explicit versioning — commonly a version field in the event envelope, or a distinctly-named event type (like `OrderPlaced.v2`) published alongside the existing `OrderPlaced.v1`. This lets existing subscribers keep consuming v1 unaffected while new or migrating subscribers adopt v2, with the publisher (temporarily) emitting both versions during a transition period. Only once all subscribers have confirmed migration to v2 would the publisher stop emitting v1 — the same deliberate, migration-window-respecting principle as API and topic versioning, just at the individual event-schema level.",
    hindiExplanation:
      "Ek event ki structure mein ek genuinely breaking change (nested fields restructure karna, ek field ka meaning/type change karna) additively handle nahi ho sakta, isliye use explicit versioning chahiye — commonly ek version field event envelope mein, ya ek distinctly-named event type (jaise `OrderPlaced.v2`) jo existing `OrderPlaced.v1` ke saath publish hota hai. Isse existing subscribers v1 consume karte rehte hain unaffected, jabki naye ya migrating subscribers v2 adopt karte hain, publisher temporarily dono versions emit karta hue transition period ke dauraan.",
    interviewExplanation:
      "I'd describe the explicit dual-version approach: 'A genuinely breaking change can't be additive, so I'd version it explicitly — a version field, or a distinctly-named event type like OrderPlaced.v2 published alongside the existing v1. Existing subscribers keep consuming v1 unaffected while new ones adopt v2, with the publisher emitting both during a transition period, only stopping v1 once all subscribers have confirmed migration.'",
    diagramNote:
      "'OrderPlaced.v1 (existing, unchanged)' + 'OrderPlaced.v2 (new, breaking change)' — both published during transition → existing subscribers stay on v1, new/migrating subscribers move to v2 → v1 retired only after full migration confirmed.",
    diagramMermaid: `flowchart LR
    A["OrderPlaced.v1<br/>existing, unchanged"] --> C["Existing subscribers<br/>keep working"]
    B["OrderPlaced.v2<br/>new, breaking change"] --> D["New/migrating subscribers"]`,
    realProjectExample:
      "A restructured order event was published as OrderPlaced.v2 alongside the original OrderPlaced.v1 for a three-month transition period, with the publisher only retiring v1 emission after confirming every known subscriber had migrated to v2.",
    interviewTip:
      "If asked how event versioning differs from just API versioning, the honest answer is it doesn't fundamentally — it's the same principle (explicit versioning, dual emission during transition, deliberate retirement) applied at the event-schema level.",
    followupQuestions: [
      "How would you confirm all subscribers have actually migrated before retiring the old version?",
      "Would you version the whole event type, or just specific changed fields within it?",
      "What would you do if a subscriber can't be identified or contacted to confirm migration?",
    ],
    commonMistakes: [
      "Silently changing an existing event's structure in place instead of introducing an explicit new version.",
      "Retiring the old event version before confirming all subscribers have actually migrated.",
    ],
    importantPoints: [
      "Breaking event changes need explicit versioning (a version field or distinctly-named event type).",
      "Publish both versions during a transition period, letting subscribers migrate deliberately.",
      "Retire the old version only after confirming full subscriber migration.",
    ],
    revisionNotes: "Breaking event changes = explicit version (e.g. OrderPlaced.v2), published alongside v1 during a transition period — retire v1 only after confirmed subscriber migration. Same principle as API versioning.",
  },
  {
    id: "em-q12",
    topic: "Events",
    prompt: "Would you include a full audit trail (who/when/why) in every event payload, or handle auditing separately?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["events", "audit-metadata"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Include lightweight, commonly-useful metadata (like a timestamp, event ID, and the triggering user/system) directly in the event envelope since most subscribers benefit from it, but a genuinely comprehensive audit trail (detailed justification, full context) is usually better handled by a dedicated audit/logging system rather than bloating every event payload with data most subscribers don't need.",
    detailedAnswer:
      "A reasonable middle ground exists here too: lightweight metadata that's broadly useful — a unique event ID (for deduplication/tracing), a timestamp, and an indication of what user/system triggered the event — is cheap to include and benefits most subscribers directly (e.g. for the correlation-ID-based tracing discussed earlier). A genuinely comprehensive audit trail, though — detailed justification for why an action was taken, full contextual state at the time, compliance-specific metadata — is a different concern best served by a dedicated audit/logging system that the triggering service writes to directly, rather than bloating every downstream event with audit-specific data that most subscribers have no use for and that couples the event schema to audit/compliance requirements unrelated to its actual business purpose.",
    hindiExplanation:
      "Yahan bhi ek reasonable middle ground exist karta hai: lightweight metadata jo broadly useful hai — ek unique event ID (deduplication/tracing ke liye), ek timestamp, aur ye indication ki kaunsa user/system ne event trigger kiya — include karna cheap hai aur zyada tar subscribers ko directly benefit karta hai. Ek genuinely comprehensive audit trail, though — action lene ki detailed justification, full contextual state — ek different concern hai jo best ek dedicated audit/logging system se serve hoti hai jise triggering service directly likhta hai, har downstream event ko audit-specific data se bloat karne ki jagah.",
    interviewExplanation:
      "I'd distinguish lightweight metadata from full auditing: 'Lightweight, broadly-useful metadata — an event ID, timestamp, triggering user/system — is cheap to include and benefits most subscribers, especially for correlation-based tracing. But a genuinely comprehensive audit trail — detailed justification, full context, compliance metadata — is a different concern, best served by a dedicated audit system the triggering service writes to directly, rather than bloating every event with data most subscribers don't need.'",
    diagramNote:
      "'Lightweight metadata (event ID, timestamp, triggering user)' → include in event envelope, broadly useful vs 'Full audit trail (justification, full context, compliance data)' → dedicated audit/logging system, not the event payload.",
    diagramMermaid: `flowchart LR
    A["Lightweight metadata<br/>event ID, timestamp, triggering user"] --> B["Include in event envelope<br/>broadly useful"]
    C["Full audit trail<br/>justification, context, compliance"] --> D["Dedicated audit/logging system,<br/>not event payload"]`,
    realProjectExample:
      "Every event included a lightweight envelope with an event ID, timestamp, and triggering user ID for correlation purposes, while detailed compliance audit records (full justification and contextual state for regulated actions) were written directly to a separate audit database, never bloating the events themselves.",
    interviewTip:
      "If asked whether events should carry full audit detail, the balanced answer — lightweight correlation metadata yes, comprehensive audit trails no — shows you distinguish these two genuinely different concerns rather than conflating them.",
    followupQuestions: [
      "What specific lightweight metadata fields would you standardize across all your events?",
      "How would a dedicated audit system relate to or correlate with the events themselves?",
      "Would compliance requirements ever force more audit detail into the event payload itself?",
    ],
    commonMistakes: [
      "Bloating every event payload with comprehensive audit/compliance data most subscribers don't need.",
      "Omitting even lightweight correlation metadata, making cross-subscriber tracing harder later.",
    ],
    importantPoints: [
      "Include lightweight, broadly-useful metadata (event ID, timestamp, triggering user) in events.",
      "Handle comprehensive audit trails via a dedicated audit/logging system, not the event payload.",
      "These are genuinely different concerns that shouldn't be conflated.",
    ],
    revisionNotes: "Events should carry lightweight metadata (ID/timestamp/triggering user) for correlation — full audit trails belong in a dedicated audit system, not bloating every event payload.",
  },
  {
    id: "em-q13",
    topic: "Retry",
    prompt: "What's the difference between a fixed-delay retry and an exponential-backoff retry strategy, and when would you use each?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["retry", "backoff-strategy"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Fixed-delay retries wait the same interval between every attempt; exponential backoff increases the delay between successive attempts (doubling or similar), which is generally preferred for handling downstream outages gracefully — it avoids hammering an already-struggling system with a constant stream of immediate retries, giving it more room to recover as retries continue.",
    detailedAnswer:
      "If a downstream dependency is genuinely down or overloaded, fixed-delay retries (say, every 5 seconds indefinitely) keep hitting it at the same constant rate throughout the outage — potentially contributing to keeping it down longer, or wasting resources on retries that are unlikely to succeed anytime soon. Exponential backoff instead increases the wait between attempts as failures continue (5s, then 10s, then 20s, then 40s...), reducing load on the struggling system precisely when it needs relief most, while still eventually retrying at a reasonable cadence once the outage might have resolved. This is generally the preferred default for handling transient/unknown-duration downstream failures, though a short fixed-delay might still make sense for failures known to be extremely brief and self-resolving.",
    hindiExplanation:
      "Agar ek downstream dependency genuinely down ya overloaded hai, fixed-delay retries (kaho, har 5 seconds indefinitely) use same constant rate pe hit karte rehte hain poori outage ke dauraan — potentially use aur zyada der tak down rakhne mein contribute karte hue, ya retries pe resources waste karte hue jo jaldi succeed hone ki possibility kam hai. Exponential backoff iske bajaye attempts ke beech wait ko increase karta hai jaise failures continue hote hain (5s, phir 10s, phir 20s, phir 40s...), struggling system pe load reduce karta hai exactly jab use sabse zyada relief chahiye.",
    interviewExplanation:
      "I'd explain the load-relief benefit of backoff: 'Fixed-delay retries keep hitting a struggling downstream system at the same constant rate throughout an outage, potentially prolonging it. Exponential backoff increases the wait between attempts as failures continue, reducing load precisely when the system needs relief most, while still eventually retrying at a reasonable cadence. That's generally the preferred default for unknown-duration failures, though a short fixed delay might still fit known-brief, self-resolving issues.'",
    diagramNote:
      "'Fixed-delay: 5s, 5s, 5s, 5s... constant rate, keeps hammering struggling system' vs 'Exponential backoff: 5s, 10s, 20s, 40s... reduces load as failures continue, gives system room to recover'.",
    diagramMermaid: `flowchart LR
    A["Fixed-delay: 5s, 5s, 5s..."] --> B["Constant rate —<br/>keeps hammering struggling system"]
    C["Exponential backoff:<br/>5s, 10s, 20s, 40s..."] --> D["Reduces load as failures<br/>continue, gives room to recover"]`,
    realProjectExample:
      "A downstream payment gateway outage was made noticeably worse by a fixed-delay retry configuration hammering it at a constant rate from many consumer instances; switching to exponential backoff reduced retry load on the recovering gateway significantly, letting it stabilize faster.",
    interviewTip:
      "If asked to justify exponential backoff over fixed delay, the specific mechanism — reducing load on a struggling system precisely when failures indicate it needs relief — is a stronger answer than a vague 'it's a best practice'.",
    followupQuestions: [
      "Would you cap the maximum backoff delay, or let it grow indefinitely?",
      "What's 'jitter' in the context of backoff strategies, and why might you add it?",
      "How would you decide the retry count limit before routing to a Dead Letter Queue?",
    ],
    commonMistakes: [
      "Defaulting to fixed-delay retries for downstream outages, potentially worsening an already-struggling system.",
      "Not knowing exponential backoff is the generally preferred default for unknown-duration transient failures.",
    ],
    importantPoints: [
      "Fixed-delay retries hit a struggling system at a constant rate throughout an outage.",
      "Exponential backoff increases delay as failures continue, reducing load when relief is needed most.",
      "Exponential backoff is the generally preferred default for unknown-duration transient failures.",
    ],
    revisionNotes: "Fixed-delay = constant retry rate, can worsen an outage. Exponential backoff = increasing delay, reduces load on a struggling system — generally the preferred default.",
  },
  {
    id: "em-q14",
    topic: "Retry",
    prompt: "Are all errors equally worth retrying? How would you distinguish a retryable error from one that should fail immediately?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["retry", "error-classification"],
    estimatedMinutes: 2,
    expectedAnswer:
      "No — transient errors (network timeouts, temporary unavailability, rate limiting) are worth retrying since the same attempt might succeed later, but permanent/deterministic errors (malformed data that will never parse, a genuinely invalid business state) will fail identically no matter how many times you retry, so retrying them just wastes time and resources before an inevitable Dead Letter Queue routing.",
    detailedAnswer:
      "Blindly retrying every failure the same way ignores an important distinction: some failures are transient (a momentary network blip, a downstream service briefly overloaded, a rate limit that will reset shortly) where the exact same request genuinely might succeed on a later attempt — these are worth retrying. Others are permanent/deterministic (a message with malformed JSON that will never suddenly become valid JSON, a business rule violation that isn't going to resolve itself, referencing a record that was deleted and won't come back) — retrying these identically will fail every single time, wasting retry attempts, delaying the inevitable Dead Letter Queue routing, and potentially masking the real problem behind generic 'still retrying' noise instead of surfacing it immediately for investigation. A well-designed consumer classifies errors and routes permanent failures to the DLQ immediately rather than exhausting retries pointlessly first.",
    hindiExplanation:
      "Har failure ko blindly same tarike se retry karna ek important distinction ignore karta hai: kuch failures transient hote hain (ek momentary network blip, ek downstream service jo briefly overloaded hai, ek rate limit jo shortly reset hoga) jaha exact same request genuinely ek baad ke attempt pe succeed ho sakti hai — ye retry karne layak hain. Doosre permanent/deterministic hote hain (malformed JSON wala message jo kabhi suddenly valid JSON nahi banega, ek business rule violation jo khud resolve nahi hone wala) — inhe identically retry karna har baar fail hoga, retry attempts waste karta hue.",
    interviewExplanation:
      "I'd explain the classification and why it matters: 'No — transient errors, like network timeouts or temporary overload, are worth retrying since the same request might succeed later. Permanent errors, like malformed data that'll never parse or a deleted record reference, will fail identically every time — retrying them just wastes attempts and delays the inevitable DLQ routing, potentially masking the real problem in generic retry noise. A well-designed consumer classifies errors and routes permanent failures to the DLQ immediately rather than exhausting retries pointlessly.'",
    diagramNote:
      "'Transient error (network blip, temp overload)' → worth retrying, might succeed later vs 'Permanent error (malformed data, deleted record)' → will fail identically every time, route to DLQ immediately instead of wasting retries.",
    diagramMermaid: `flowchart TD
    A["Error occurs"] --> B{"Transient or<br/>permanent?"}
    B -->|"Transient"| C["Retry — might<br/>succeed later"]
    B -->|"Permanent"| D["Route to DLQ<br/>immediately, don't waste retries"]`,
    realProjectExample:
      "A consumer that blindly retried every error type, including permanently malformed messages, wasted significant processing time retrying messages that could never possibly succeed before finally routing to the DLQ — adding error classification let permanent failures skip straight to the DLQ, freeing up retry capacity for genuinely transient issues.",
    interviewTip:
      "If asked how you'd design retry logic, explicitly distinguishing transient from permanent errors (rather than treating all failures identically) shows a more thoughtful, production-grade approach to reliability design.",
    followupQuestions: [
      "How would you determine programmatically whether a given error is transient or permanent?",
      "What's the risk of misclassifying a permanent error as transient, or vice versa?",
      "Would circuit-breaker patterns relate to this transient-versus-permanent distinction at all?",
    ],
    commonMistakes: [
      "Retrying every error identically without distinguishing transient from permanent failures.",
      "Wasting retry attempts and delaying DLQ routing for errors that will never resolve through retrying.",
    ],
    importantPoints: [
      "Transient errors (network issues, temporary overload) are genuinely worth retrying.",
      "Permanent/deterministic errors will fail identically no matter how many retries occur.",
      "Well-designed consumers classify errors and route permanent failures to the DLQ immediately.",
    ],
    revisionNotes: "Classify errors: transient (network/overload — worth retrying) vs permanent (malformed data/deleted record — will always fail, route to DLQ immediately instead of wasting retries).",
  },
  {
    id: "em-q15",
    topic: "Dead Letter Queue",
    prompt: "How would you safely reprocess messages from a Dead Letter Queue after fixing the underlying bug that caused them to fail?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["dead-letter-queue", "reprocessing"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Verify the fix actually resolves the failure mode against a sample of the DLQ messages first, then replay them back into the original processing path (often the original queue/topic) in a controlled, monitored, and ideally rate-limited manner, watching closely for any new failures rather than assuming the fix works for every message.",
    detailedAnswer:
      "Blindly replaying every DLQ message immediately after a fix risks re-triggering the same failure at scale if the fix was incomplete, or if some messages failed for a genuinely different reason than the one just fixed. A safer approach: first test the fix against a small sample of representative DLQ messages to confirm it actually resolves their specific failure, then replay the remainder back into the original processing path in a controlled, rate-limited, monitored way — watching for new failures as reprocessing proceeds, rather than dumping everything back in at once and hoping for the best. Messages that still fail even after the fix should be investigated as a potentially distinct root cause, not assumed to be resolved by the same fix that worked for others.",
    hindiExplanation:
      "Har DLQ message ko fix ke turant baad blindly replay karna risk rakhta hai same failure ko scale pe re-trigger karne ka agar fix incomplete tha, ya kuch messages genuinely ek different reason se fail hue the jo abhi fix nahi hua. Ek safer approach: pehle fix ko ek chhoti sample of representative DLQ messages ke against test karo ye confirm karne ke liye ki wo actually unki specific failure resolve karta hai, fir remainder ko wapas original processing path mein replay karo ek controlled, rate-limited, monitored tarike se.",
    interviewExplanation:
      "I'd describe a cautious, staged approach: 'Blindly replaying everything immediately risks re-triggering the same failure at scale if the fix is incomplete. I'd first test the fix against a small sample of representative DLQ messages to confirm it actually resolves their failure, then replay the rest into the original path in a controlled, rate-limited, monitored way — watching for new failures rather than dumping everything back at once. Messages that still fail after the fix need investigating as a potentially distinct root cause.'",
    diagramNote:
      "'Fix deployed' → 'Test fix against small sample of DLQ messages first' → confirmed working → 'Replay remainder in controlled, rate-limited, monitored batches' → watch for new failures throughout.",
    diagramMermaid: `flowchart TD
    A["Fix deployed"] --> B["Test against small sample<br/>of DLQ messages first"]
    B --> C["Confirmed working"]
    C --> D["Replay remainder:<br/>controlled, rate-limited, monitored"]
    D --> E["Watch for new failures<br/>throughout reprocessing"]`,
    realProjectExample:
      "After fixing a bug causing malformed-date parsing failures, the team first replayed a sample of ten affected DLQ messages successfully before replaying the remaining several hundred in small rate-limited batches with close monitoring, catching a handful of messages that failed for an entirely unrelated reason and needed separate investigation.",
    interviewTip:
      "If asked how you'd reprocess a large DLQ backlog after a fix, describing this sample-first, controlled-and-monitored replay approach (rather than 'just replay everything') shows production-grade operational caution.",
    followupQuestions: [
      "How would you rate-limit the replay to avoid overwhelming the downstream system a second time?",
      "What would you do with messages that still fail even after the fix?",
      "How would you decide the sample size for initial fix verification?",
    ],
    commonMistakes: [
      "Blindly replaying an entire DLQ backlog immediately after a fix without first verifying it against a sample.",
      "Assuming every DLQ message failed for the same root cause the fix addresses.",
    ],
    importantPoints: [
      "Verify a fix against a small sample of DLQ messages before full-scale replay.",
      "Replay the remainder in a controlled, rate-limited, monitored manner.",
      "Investigate messages that still fail after the fix as a potentially distinct root cause.",
    ],
    revisionNotes: "DLQ reprocessing after a fix: test against a small sample first, then replay the rest in controlled, rate-limited, monitored batches — don't assume every message shares the same root cause.",
  },
];

export const eventMeshMcqs: BtpMcq[] = [
  {
    id: "em-mcq1",
    topic: "Queues",
    prompt: "In a queue with 3 competing consumer instances, how many instances receive each individual message?",
    options: ["All 3", "Exactly 1", "Exactly 2", "It depends on the message size"],
    correctIndex: 1,
    explanation: "Queues implement competing-consumer semantics — each message is delivered to exactly one consumer, splitting work across instances (unlike topics, which broadcast to every subscriber).",
  },
  {
    id: "em-mcq2",
    topic: "Publish Subscribe",
    prompt: "What is the main architectural benefit of publish-subscribe over direct service-to-service calls?",
    options: [
      "It's always faster in every case",
      "It decouples the publisher from needing to know who or how many subscribers exist",
      "It eliminates the need for any error handling",
      "It guarantees synchronous responses",
    ],
    correctIndex: 1,
    explanation: "Pub-sub lets a publisher emit events without knowing about subscribers; new subscribers can be added with zero changes to the publisher.",
  },
  {
    id: "em-mcq3",
    topic: "Events",
    prompt: "What's a common mistake in event payload design?",
    options: [
      "Including too many business-relevant fields",
      "Making the payload either too thin (forcing callbacks) or too fat (tight coupling to internal schema)",
      "Using JSON instead of XML",
      "Including a timestamp",
    ],
    correctIndex: 1,
    explanation: "Too thin an event forces subscribers into synchronous callbacks; too fat an event tightly couples subscribers to the publisher's internal data model.",
  },
  {
    id: "em-mcq4",
    topic: "Retry",
    prompt: "Why should consumer processing logic generally be idempotent?",
    options: [
      "It's a legal requirement",
      "Because a message may be redelivered and reprocessed even after partial success",
      "It makes the code run faster",
      "It's only relevant for queues, not topics",
    ],
    correctIndex: 1,
    explanation: "Since acknowledgment failures can cause redelivery even after a message was partially processed, consumer logic should be safe to run more than once on the same message.",
  },
  {
    id: "em-mcq5",
    topic: "Dead Letter Queue",
    prompt: "Why is monitoring a Dead Letter Queue important, not just having one?",
    options: [
      "It isn't important, DLQs are self-managing",
      "Unmonitored DLQ accumulation represents real, unprocessed business events going unnoticed",
      "DLQs automatically delete old messages",
      "Monitoring is only needed in production, not other environments",
    ],
    correctIndex: 1,
    explanation: "Messages accumulating in a DLQ represent real business events that failed processing — without monitoring/alerting, this failure goes unnoticed, nearly as bad as having no DLQ.",
  },
  {
    id: "em-mcq6",
    topic: "Queues",
    prompt: "Does Event Mesh (like most distributed messaging systems) guarantee strict global ordering across all messages?",
    options: [
      "Yes, always, regardless of consumer count",
      "No — ordering is typically guaranteed only within a single queue/consumer or shared partition key",
      "Only for messages under 1KB",
      "Only on weekdays",
    ],
    correctIndex: 1,
    explanation: "Global ordering across parallel consumers conflicts with horizontal scalability; ordering is realistically guaranteed only within a narrower scope like a shared partition/grouping key.",
  },
  {
    id: "em-mcq7",
    topic: "Topics",
    prompt: "What should guide how granular you make a topic (one broad topic vs many narrow ones)?",
    options: [
      "Always use exactly one topic per entity, no exceptions",
      "Actual subscriber consumption patterns — group event types typically consumed together",
      "The size of the event payload in bytes",
      "Alphabetical ordering of event type names",
    ],
    correctIndex: 1,
    explanation: "Topic granularity should be designed around how subscribers actually consume events — grouping types typically consumed together, splitting out genuinely distinct audiences.",
  },
  {
    id: "em-mcq8",
    topic: "Topics",
    prompt: "How should a breaking change to an event's schema be introduced?",
    options: [
      "Silently modify the existing event structure for everyone",
      "As an explicit new version (e.g. a version field or a distinctly-named event type), published alongside the old one during a transition",
      "Delete the old event type immediately",
      "Breaking changes to events are never possible",
    ],
    correctIndex: 1,
    explanation: "Breaking event changes need explicit versioning, with both versions published during a transition period so existing subscribers aren't silently broken — the same principle as API versioning.",
  },
  {
    id: "em-mcq9",
    topic: "Retry",
    prompt: "Why is exponential backoff generally preferred over fixed-delay retries for downstream outages?",
    options: [
      "It retries faster overall",
      "It reduces load on a struggling downstream system precisely when it needs relief most",
      "It guarantees zero message loss",
      "It eliminates the need for a Dead Letter Queue",
    ],
    correctIndex: 1,
    explanation: "Exponential backoff increases the delay between attempts as failures continue, reducing load on a struggling system, unlike fixed-delay retries which hit it at a constant rate throughout an outage.",
  },
  {
    id: "em-mcq10",
    topic: "Retry",
    prompt: "Should a permanently malformed message be retried the same way as a transient network error?",
    options: [
      "Yes, all errors should be retried identically",
      "No — permanent errors will fail identically every time; they should route to the DLQ rather than waste retry attempts",
      "Only if the message is under 1KB",
      "Only during business hours",
    ],
    correctIndex: 1,
    explanation: "Transient errors are worth retrying since the same attempt might succeed later; permanent/deterministic errors will fail every time, so retrying them wastes time before an inevitable DLQ routing.",
  },
];
