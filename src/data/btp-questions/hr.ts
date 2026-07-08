import type { BtpMcq, BtpQuestion } from "@/lib/btp-content";

/** Section 17 — HR. Behavioral/HR interview questions, tailored for SAP BTP roles. */
export const hrQuestions: BtpQuestion[] = [
  {
    id: "hr-q1",
    topic: "Tell me about yourself",
    prompt: "Tell me about yourself.",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["tell-me-about-yourself", "introduction"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A tight 60-90 second summary structured as: current role/background, 1-2 concrete BTP technical highlights (what you've actually built), and why you're interested in this specific role — not a full life story or a generic resume readout.",
    detailedAnswer:
      "This question is an opener, not an invitation to recite your entire resume chronologically. A strong structure: (1) one sentence on your current role and experience level (e.g. '2 years as a CAP developer building BTP extensions for S/4HANA'), (2) one or two concrete, specific technical highlights — a real project or capability, not a vague 'I have experience in cloud technologies' — and (3) a genuine, specific reason you're interested in this particular role or company, connecting your background to what they're actually looking for. Keeping it to 60-90 seconds forces you to prioritize the most relevant, impressive details rather than rambling through unrelated history.",
    hindiExplanation:
      "Ye question ek opener hai, poora resume chronologically recite karne ka invitation nahi. Ek strong structure: (1) ek sentence current role aur experience level pe (jaise '2 saal CAP developer ki tarah BTP extensions banaya S/4HANA ke liye'), (2) ek ya do concrete, specific technical highlights — ek real project ya capability, vague 'cloud technologies mein experience hai' nahi — aur (3) ek genuine, specific reason ki tum is particular role/company mein interested kyun ho. Isse 60-90 seconds tak rakhna tumhe force karta hai sabse relevant, impressive details prioritize karne ke liye.",
    interviewExplanation:
      "I'd script it as: 'I'm a [role] with [X years] experience, most recently [one concrete BTP project/highlight]. I'm particularly interested in this role because [specific, genuine reason tied to the company/role] — connecting my background in [specific skill] to what you're looking for.' Keep it under 90 seconds and let it lead naturally into follow-up questions.",
    diagramNote:
      "Three-part structure: 'Current role/experience (1 sentence)' → 'Concrete technical highlight (1-2 sentences)' → 'Why this role/company (1-2 sentences)' — total under 90 seconds.",
    diagramMermaid: `flowchart LR
    A["Current role/experience<br/>1 sentence"] --> B["Concrete technical highlight<br/>1-2 sentences"]
    B --> C["Why this role/company<br/>1-2 sentences"]`,
    realProjectExample:
      "A strong answer: 'I'm a CAP developer with two years building side-by-side extensions for S/4HANA — most recently a multitenant approval workflow app built entirely in CAP on Cloud Foundry, with a CDS data model and Node.js handlers, integrating back to S/4HANA over an OData destination. I'm interested in this role because it involves scaling exactly that kind of multitenant SaaS architecture, which is where I want to deepen my expertise.'",
    interviewTip:
      "Practice this out loud with a timer — candidates who ramble past 2 minutes on this opening question often lose the interviewer's attention before the technical portion even starts.",
    followupQuestions: [
      "What's your current project?",
      "Why are you looking to leave your current role?",
      "What are you looking for in your next role?",
    ],
    commonMistakes: [
      "Reciting the entire resume chronologically from first job to present.",
      "Giving a vague, generic answer with no concrete technical specifics.",
    ],
    importantPoints: [
      "Keep it to 60-90 seconds — a summary, not a full history.",
      "Include concrete, specific technical highlights, not vague generalities.",
      "End with a genuine, specific reason for interest in this role.",
    ],
    revisionNotes: "Tell me about yourself: current role (1 line) + concrete technical highlight + genuine reason for this role — 60-90 seconds, not a full resume readout.",
  },
  {
    id: "hr-q2",
    topic: "Current Project",
    prompt: "Walk me through your current project and your specific role in it.",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["current-project", "star-method"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Describe the business problem the project solves, the architecture at a high level (which BTP services, why), and specifically what YOU did versus what the team did — interviewers are listening for your individual contribution, not just a description of the overall system.",
    detailedAnswer:
      "A common mistake is describing the project entirely in terms of 'we' and the overall architecture without ever clarifying the interviewer's actual question: what did you specifically do? A strong answer starts with the business context (what problem this solves, briefly), gives a high-level architecture overview (which BTP services and why — showing you understand the reasoning, not just tech names), and then explicitly separates your individual contribution ('I specifically designed the CAP service's CDS data model and wrote the custom handler logic implementing the approval workflow') from what other team members handled. This directly demonstrates both your technical depth and your ability to communicate clearly about your own scope of work.",
    hindiExplanation:
      "Ek common mistake hai project ko poori tarah 'we' aur overall architecture ke terms mein describe karna, interviewer ke actual question ko kabhi clarify kiye bina: tumne specifically kya kiya? Ek strong answer business context se start hota hai (ye kya problem solve karta hai, briefly), ek high-level architecture overview deta hai (kaunse BTP services aur kyun), aur fir explicitly tumhare individual contribution ko alag karta hai ('maine specifically CAP service ka CDS data model design kiya aur approval workflow implement karne wala custom handler logic likha') doosre team members ne kya handle kiya usse.",
    interviewExplanation:
      "I'd structure it: 'The project solves [business problem] for [context]. Architecturally, we used [key BTP services] because [reasoning]. My specific role was [exactly what you built/owned] — for example, I built the CAP service's CDS entities and the custom handler logic implementing the approval workflow, while a teammate handled the Fiori frontend.'",
    diagramNote:
      "'Business problem (why the project exists)' → 'High-level architecture (which BTP services, why)' → 'MY specific contribution (clearly separated from team's)'.",
    diagramMermaid: `flowchart LR
    A["Business problem<br/>why it exists"] --> B["High-level architecture<br/>which services, why"]
    B --> C["MY specific contribution<br/>clearly separated from team's"]`,
    realProjectExample:
      "A strong version: 'Our project automates purchase order approvals above a spending threshold for a manufacturing client. We used CAP on Cloud Foundry with HANA Cloud and XSUAA. I specifically designed and built the CAP service's custom handler logic and the approval workflow's Business Rules integration, while a teammate built the Fiori UI.'",
    interviewTip:
      "If you catch yourself saying 'we' more than 'I' throughout this answer, consciously rephrase — interviewers are specifically listening for your individual contribution.",
    followupQuestions: [
      "What was the most technically challenging part of that project for you specifically?",
      "What would you do differently if you rebuilt this project today?",
      "Who were the other stakeholders/teams you worked with on this?",
    ],
    commonMistakes: [
      "Describing only the overall system/architecture without clarifying individual contribution.",
      "Overusing 'we' throughout without ever specifying what you personally did.",
    ],
    importantPoints: [
      "Give business context briefly, then architecture, then your specific contribution.",
      "Clearly separate 'I' (your work) from 'we' (the team's work).",
      "Interviewers are listening for individual contribution and depth, not just system description.",
    ],
    revisionNotes: "Current project answer: business context → architecture (why these BTP services) → YOUR specific contribution, clearly separated from the team's.",
  },
  {
    id: "hr-q3",
    topic: "Challenges",
    prompt: "Tell me about a challenging technical problem you faced and how you solved it.",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["challenges", "star-method"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Use the STAR method (Situation, Task, Action, Result) with a genuinely specific technical problem — not a vague 'things were hard' story — walking through what you actually diagnosed and did, and quantifying the result where possible.",
    detailedAnswer:
      "The STAR structure keeps this focused: Situation (brief context — what was the system/project), Task (what specifically needed to be solved and why it mattered), Action (what YOU actually did — the diagnostic steps, the specific fix, ideally referencing real BTP concepts like 'I found the CDS association's join was executing unnecessarily on every request, so I restructured the query to lazily load it only when actually expanded'), and Result (the measurable outcome — 'cut response time by 60%', 'eliminated the recurring crash entirely'). Picking a genuinely technical, specific example (not 'a teammate was difficult' — that's a conflict question) and being able to explain the actual technical reasoning, not just 'I fixed it', is what separates a strong answer.",
    hindiExplanation:
      "STAR structure ise focused rakhta hai: Situation (brief context), Task (specifically kya solve karna tha aur kyun matter karta tha), Action (tumne actually kya kiya — diagnostic steps, specific fix, ideally real BTP concepts reference karte hue), aur Result (measurable outcome — 'response time 60% kam hua', 'recurring crash poori tarah khatam hua'). Ek genuinely technical, specific example choose karna (na ki 'ek teammate difficult tha' — wo conflict question hai) aur actual technical reasoning explain kar pana, sirf 'maine fix kar diya' nahi, yahi strong answer ko alag banata hai.",
    interviewExplanation:
      "I'd frame it in STAR: 'In [project], we had [specific technical problem]. I needed to [specific task/goal]. I diagnosed it by [specific steps — e.g. checking execution plans, logs], found [specific root cause], and fixed it by [specific technical action]. The result was [measurable outcome].'",
    diagramNote:
      "STAR structure: 'Situation (context)' → 'Task (what needed solving)' → 'Action (specific diagnostic steps + fix)' → 'Result (measurable outcome)'.",
    diagramMermaid: `flowchart LR
    A["Situation<br/>context"] --> B["Task<br/>what needed solving"]
    B --> C["Action<br/>diagnostic steps + fix"]
    C --> D["Result<br/>measurable outcome"]`,
    realProjectExample:
      "'Our CAP service was intermittently timing out under load. I checked the execution plan for the slow query and found a CDS association was being unnecessarily expanded on every request even when the data wasn't used. I restructured the projection to only expand it when explicitly needed, cutting average response time by 65% and eliminating the timeouts entirely.'",
    interviewTip:
      "Prepare 2-3 of these STAR stories in advance for different themes (a performance issue, a production incident, a design decision) so you're never caught without a concrete example.",
    followupQuestions: [
      "What would you have done differently in hindsight?",
      "How did you first realize there was a problem?",
      "Did you involve anyone else in solving this?",
    ],
    commonMistakes: [
      "Giving a vague answer with no specific technical detail ('something was slow and I fixed it').",
      "Not having a prepared, quantified result to reference.",
    ],
    importantPoints: [
      "Use STAR: Situation, Task, Action, Result.",
      "Pick a genuinely technical, specific example with real BTP concepts.",
      "Quantify the result where possible.",
    ],
    revisionNotes: "Challenge story: STAR method with a specific technical problem, real diagnostic steps, and a quantified result — prepare 2-3 in advance.",
  },
  {
    id: "hr-q4",
    topic: "Achievements",
    prompt: "What's an achievement you're most proud of in your BTP work?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["achievements", "star-method"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Choose an achievement with measurable business or technical impact (not just 'I learned a new technology'), explain your specific role in it, and connect it to a skill relevant to the role you're interviewing for.",
    detailedAnswer:
      "Structure this explicitly with STAR: Situation (brief context — what project or system this was), Task (the specific goal or gap you set out to address), Action (what you specifically did — the technical or design decisions you made, not the team's), and Result (the measurable or clearly impactful outcome — 'reduced manual approval time from 3 days to same-day', 'the multitenant architecture I designed now serves 40 customers from one deployment'). The strongest achievement answers have a clear 'so what' in the Result step — a measurable outcome that mattered to the business or the team, not just a personal learning milestone. Ideally, pick an achievement whose Action connects to a skill genuinely relevant to the role you're interviewing for — if the role emphasizes performance optimization, lead with a performance-related achievement rather than an unrelated one, even if both are genuinely proud moments.",
    hindiExplanation:
      "Ise explicitly STAR se structure karo: Situation (brief context — ye kaunsa project/system tha), Task (specific goal ya gap jo tumne address karne ka socha), Action (tumne specifically kya kiya — technical/design decisions, team ke nahi), aur Result (measurable ya clearly impactful outcome — 'manual approval time 3 din se same-day kar diya', 'jo multitenant architecture maine design kiya wo ab 40 customers ko ek hi deployment se serve karta hai'). Sabse strong achievement answers mein Result step mein ek clear 'so what' hota hai — ek measurable outcome jo business ya team ke liye matter karta hai, sirf personal learning milestone nahi. Ideally, ek aisa achievement choose karo jiska Action us role se relevant skill se connect ho jispe tum interview de rahe ho.",
    interviewExplanation:
      "I'd walk through it in STAR: 'Situation — our SaaS product's tenant onboarding was fully manual. Task — I needed to make onboarding self-service and fast enough to support scaling past a handful of customers. Action — I designed and implemented tenant-onboarding automation via SaaS Provisioning callbacks. Result — onboarding time dropped from a full day of manual setup to under a minute, and the platform now serves over 40 customers from one deployment.'",
    diagramNote:
      "STAR structure: 'Situation (brief context)' → 'Task (specific goal/gap)' → 'Action (your specific technical/design decisions)' → 'Result (quantified/clear impact)' — pick one relevant to the role's emphasis.",
    diagramMermaid: `flowchart LR
    A["Situation<br/>brief context"] --> B["Task<br/>specific goal/gap"]
    B --> C["Action<br/>your specific decisions"]
    C --> D["Result<br/>quantified/clear impact"]`,
    realProjectExample:
      "'Situation: two systems relied on a nightly batch sync, so downstream reports were always up to 24 hours stale. Task: the business wanted a new real-time reporting feature, which meant that staleness had to go. Action: I designed and implemented an event-driven integration replacing the nightly batch sync entirely. Result: data latency dropped from up to 24 hours down to under a minute, directly enabling the real-time reporting feature the business had been asking for.'",
    interviewTip:
      "If asked this in the same interview as 'tell me about a challenge', pick genuinely different examples for each — reusing the same story for both questions signals you don't have enough material prepared.",
    followupQuestions: [
      "What made that particular achievement personally meaningful to you?",
      "What would you do differently if you tackled it again?",
      "How did your team/manager react to that outcome?",
    ],
    commonMistakes: [
      "Choosing an achievement with no measurable business or technical impact.",
      "Reusing the exact same story already told for a 'challenge' question.",
    ],
    importantPoints: [
      "Pick an achievement with a clear, measurable impact, not just a personal learning moment.",
      "Structure it with context, your action, and quantified result.",
      "Choose one relevant to the specific role's emphasis when possible.",
    ],
    revisionNotes: "Achievement answer: measurable impact (not just learning) + your specific action + quantified result, ideally relevant to the role.",
  },
  {
    id: "hr-q5",
    topic: "Conflict",
    prompt: "Tell me about a time you disagreed with a teammate or a technical decision. How did you handle it?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["conflict", "star-method"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Describe a genuine, specific technical disagreement, explain how you advocated for your position with evidence/reasoning (not just insistence), how the resolution was reached (compromise, data, or deferring gracefully if you were wrong), and what you learned — avoiding both 'I was never wrong' and 'I just gave in' as the framing.",
    detailedAnswer:
      "Structure this with STAR: Situation (the genuine technical disagreement, stated specifically — e.g. 'a teammate and I disagreed on how to expose a bulk-cancellation feature'), Task (the real goal — reaching the right technical answer without just winning the argument or quietly caving), Action (how you advocated with reasoning or evidence rather than repeating your opinion louder, and — just as importantly — how you genuinely listened to and engaged with their side, whether that was a prototype comparison, data, a senior review, or a real back-and-forth discussion), and Result (the actual resolution reached — ideally a genuine compromise or a point where one side was authentically persuaded by the other's reasoning — plus what you honestly learned). A weak answer either claims you were always right and the other person simply came around, or paints yourself as a pushover who abandoned your position without any real advocacy; the Action and Result steps are exactly where that shows — real two-sided back-and-forth, not silence and not a one-sided victory. This shows maturity and collaborative skill, which is exactly what's being tested, not who was 'right'.",
    hindiExplanation:
      "Ise STAR se structure karo: Situation (genuine technical disagreement, specifically — jaise 'ek teammate aur maine bulk-cancellation feature expose karne ke tarike pe disagree kiya'), Task (real goal — sahi technical answer tak pahunchna, sirf argument jeetna ya quietly cave karna nahi), Action (tumne reasoning/evidence se kaise advocate kiya, aur — utna hi important — tumne unki side ko genuinely kaise suna aur engage kiya, chahe wo prototype comparison ho, data ho, senior review ho, ya ek real back-and-forth discussion), aur Result (actual resolution jo hua — ideally ek genuine compromise ya ek point jaha ek side dusre ki reasoning se authentically persuade hui — plus tumne honestly kya seekha). Ek weak answer ya toh claim karta hai ki tum hamesha sahi the aur doosra person bas mann gaya, ya khud ko ek pushover ki tarah paint karta hai — Action aur Result steps mein exactly yahi dikhta hai: real two-sided back-and-forth, chup rehna nahi aur one-sided victory bhi nahi.",
    interviewExplanation:
      "I'd frame it in STAR: 'Situation — a teammate and I disagreed on how to expose a bulk-cancellation feature: I wanted a single transactional action, he wanted a client-side loop for better UI progress feedback. Task — we needed a design that was both transactionally safe and didn't leave the UI blocked with no feedback. Action — I explained my consistency concern, he explained the UX gap in mine that I hadn't fully weighed, and we went back and forth on it. Result — we landed on a real compromise: one bound action with server-side chunked processing and progress events streamed to the UI, and I learned to weigh UX feedback concerns as seriously as backend consistency ones.'",
    diagramNote:
      "STAR structure: 'Situation (specific technical disagreement)' → 'Task (reach the right answer, not just win or cave)' → 'Action (advocate with reasoning AND genuinely listen — real back-and-forth)' → 'Result (genuine compromise/resolution + what you learned)'.",
    diagramMermaid: `flowchart LR
    A["Situation<br/>specific technical disagreement"] --> B["Task<br/>reach the right answer,<br/>not just win or cave"]
    B --> C["Action<br/>advocate + genuinely listen,<br/>real back-and-forth"]
    C --> D["Result<br/>genuine compromise + what you learned"]`,
    realProjectExample:
      "'A teammate and I disagreed on how to expose a bulk-cancellation feature. I argued it should be a single bound action, since cancelling multiple orders is a side-effecting operation that needed to stay transactionally consistent. He argued for looping the existing single-cancel action from the UI instead, and made a fair point I hadn't fully weighed — with hundreds of orders selected, a single synchronous call would block the UI with no progress feedback, while our list report already had a pattern for showing progress on repeated single-record actions. I pushed back that a pure client-side loop risked partial failures leaving orders in a mixed cancelled/not-cancelled state, which he agreed was a real risk once we walked through it. We went back and forth for a bit, then landed on a compromise: keep it as one bound action for transactional consistency, but have it process in server-side chunks and stream progress events back to the UI. Neither of us got exactly the design we first proposed, but the combined approach addressed both concerns.'",
    interviewTip:
      "Avoid choosing an example where you were simply, unambiguously right the whole time with no genuine tension — the most convincing answers show real back-and-forth and a fair resolution, not a one-sided victory story.",
    followupQuestions: [
      "How do you generally handle disagreeing with someone more senior than you?",
      "What would you do if the disagreement couldn't be resolved through discussion?",
      "How do you know when to let a minor disagreement go versus push for your position?",
    ],
    commonMistakes: [
      "Framing yourself as always right, with the other person simply capitulating.",
      "Framing yourself as someone who avoids conflict entirely by always deferring.",
    ],
    importantPoints: [
      "Show genuine disagreement, advocated with reasoning, not just insistence.",
      "Describe an honest resolution process — not a one-sided 'I was right' story.",
      "Reflect on what you actually learned from the interaction.",
    ],
    revisionNotes: "Conflict answer: genuine disagreement + advocated with reasoning + honest resolution (not always-right or always-caving) + what you learned.",
  },
  {
    id: "hr-q6",
    topic: "Leadership",
    prompt: "Describe a time you showed leadership, even without a formal 'lead' title.",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["leadership", "star-method"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Leadership without a title usually shows up as taking initiative on something nobody assigned you, helping a struggling teammate, driving a technical decision the team needed but hadn't made, or proactively identifying and fixing a process gap — describe a specific instance and its outcome.",
    detailedAnswer:
      "Structure this with STAR: Situation (brief context — what gap or unaddressed problem existed), Task (the informal task you set for yourself, since nobody assigned it), Action (what you specifically did — proposing and documenting a standard, mentoring a teammate, driving a fix, facilitating a stuck decision), and Result (the positive, ideally measurable outcome from your initiative). Many candidates freeze on this question assuming leadership requires having managed people, but for early-career roles, interviewers are looking for signs of initiative and ownership beyond your assigned tasks — that's precisely what the Task and Action steps test here. Strong examples include: noticing the team lacked a clear pattern for something (like error handling) and proactively proposing and documenting one; mentoring a newer teammate through a concept without being asked to; identifying a recurring production issue nobody had prioritized and driving the fix yourself; or facilitating a decision when the team was stuck between options. Mapped to STAR, the key elements are: Situation/Task — you noticed something needed doing that nobody assigned you; Action — you acted without being told to; Result — there was a positive outcome from your initiative.",
    hindiExplanation:
      "Ise STAR se structure karo: Situation (brief context — kaunsa gap ya unaddressed problem tha), Task (informal task jo tumne khud ke liye set kiya, kyunki kisi ne assign nahi kiya), Action (tumne specifically kya kiya — ek standard propose/document karna, ek teammate ko mentor karna, ek fix drive karna, ek stuck decision facilitate karna), aur Result (tumhare initiative se positive, ideally measurable outcome). Kai candidates is question pe freeze ho jaate hain ye assume karke ki leadership ke liye people manage karna zaroori hai, lekin early-career roles ke liye, interviewers initiative aur ownership ke signs dhundh rahe hain tumhare assigned tasks se aage — yahi exactly Task aur Action steps test karte hain. Strong examples: team ko ek clear pattern ki kami thi (jaise error handling) notice karna aur proactively ek propose/document karna; ek naye teammate ko mentor karna bina puche; ek recurring production issue identify karna jise koi priority nahi de raha tha aur khud fix drive karna; ya ek decision facilitate karna jab team stuck thi options ke beech.",
    interviewExplanation:
      "I'd walk through it in STAR: 'Situation — our team had no consistent pattern for error handling across services, causing inconsistent behavior. Task — nobody assigned this to me, but I could see it needed fixing. Action — I documented a proposed standard and discussed it with the team without being asked to. Result — we adopted it, reducing a class of bugs we'd been hitting repeatedly.'",
    diagramNote:
      "STAR structure: 'Situation (gap/problem context)' → 'Task (unassigned — you set it for yourself)' → 'Action (took initiative without being told)' → 'Result (positive outcome from that initiative)' — the leadership signal without a formal title.",
    diagramMermaid: `flowchart LR
    A["Situation<br/>gap/problem context"] --> B["Task<br/>unassigned, self-set"]
    B --> C["Action<br/>took initiative,<br/>not told to"]
    C --> D["Result<br/>positive outcome"]`,
    realProjectExample:
      "'Situation: a new team member joined mid-project with no onboarding material for our CAP project's conventions. Task: nobody assigned me to fix this, but I could see it would slow their ramp-up. Action: I proactively created a short onboarding doc covering our conventions and walked them through our CDS model. Result: their ramp-up time dropped significantly, and the doc became the standard reference for every new joiner after that.'",
    interviewTip:
      "If you genuinely can't think of an example, it's worth reflecting before the interview — most people have at least one instance of proactive initiative, even something small, and it's much better prepared in advance than improvised under pressure.",
    followupQuestions: [
      "How did the team react to your initiative?",
      "Would you handle it differently if you did it again?",
      "How do you decide when to take initiative versus wait to be asked?",
    ],
    commonMistakes: [
      "Claiming you have no leadership example because you've never had a formal title.",
      "Describing something you were explicitly assigned to do, rather than genuine unprompted initiative.",
    ],
    importantPoints: [
      "Leadership without a title = initiative on something unassigned.",
      "Examples: proposing a standard, mentoring, driving a fix, facilitating a stuck decision.",
      "Key elements: noticed a gap, acted without being told, positive outcome.",
    ],
    revisionNotes: "Leadership without a title: noticed a gap → took unprompted initiative → positive outcome. Examples: proposing standards, mentoring, driving fixes.",
  },
  {
    id: "hr-q7",
    topic: "Salary Negotiation",
    prompt: "What are your salary expectations?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["salary-negotiation"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Research the market range for the role/level/location beforehand, give a well-reasoned range rather than a single number or a deflection, and anchor it to your actual skills/experience rather than just your current salary — while remaining open to discussing the full compensation package, not just base salary.",
    detailedAnswer:
      "Answering with 'whatever you think is fair' gives away negotiating position entirely and can read as underprepared. Instead, research typical market ranges for this role, level, and location beforehand (via salary surveys, sites like Glassdoor/Levels.fyi, or industry contacts), and state a researched range confidently ('based on my experience with BTP/CAP development and market rates for this role, I'm targeting X to Y'). Anchoring purely to your current salary (especially if it was below market) can undersell you — anchor instead to the value and market rate for the role you're moving into. Also be ready to discuss the full package (bonus, benefits, remote flexibility, learning budget), not just base salary, since total compensation is often more negotiable than the base number alone.",
    hindiExplanation:
      "'Jo bhi aapko sahi lage' bolna negotiating position poori tarah de deta hai aur underprepared lag sakta hai. Iske bajaye, is role, level, aur location ke liye typical market ranges research karo pehle se (salary surveys, Glassdoor/Levels.fyi jaise sites, ya industry contacts se), aur ek researched range confidently state karo ('BTP/CAP development mein mere experience aur is role ke market rates ke aadhar pe, main X se Y target kar raha hoon'). Sirf apni current salary pe anchor karna (khaaskar agar wo market se kam thi) tumhe undersell kar sakta hai — role ki value aur market rate pe anchor karo. Poore package (bonus, benefits, remote flexibility, learning budget) discuss karne ke liye bhi ready raho, sirf base salary nahi.",
    interviewExplanation:
      "I'd state a researched, confident range: 'Based on my research into market rates for this role and level, and my experience with CAP and BTP architecture, I'm targeting a range of X to Y. I'm also open to discussing the full package — I'd want to understand the complete compensation structure before finalizing expectations.'",
    diagramNote:
      "'Research market range beforehand' → 'State a confident, researched range' → 'Anchor to role/market value, not just current salary' → 'Stay open to full package discussion'.",
    diagramMermaid: `flowchart LR
    A["Research market range<br/>beforehand"] --> B["State confident,<br/>researched range"]
    B --> C["Anchor to role/market value,<br/>not just current salary"]
    C --> D["Stay open to<br/>full package discussion"]`,
    realProjectExample:
      "Having researched typical ranges for CAP/BTP developers at a similar experience level in the target city beforehand, a candidate confidently stated a specific range backed by that research, rather than anchoring low based on an underpaid previous role — resulting in an offer at the top of their stated range.",
    interviewTip:
      "Never state a number you haven't researched — a confident, well-reasoned range signals professionalism, while an unresearched, uncertain answer can actually lower an offer.",
    followupQuestions: [
      "Are you open to negotiating on benefits if base salary is fixed?",
      "What's most important to you in the full compensation package beyond base salary?",
      "How does this range compare to your current compensation?",
    ],
    commonMistakes: [
      "Answering 'whatever you think is fair' with no researched range at all.",
      "Anchoring purely to a low current salary instead of the target role's market value.",
    ],
    importantPoints: [
      "Research market ranges for the role/level/location beforehand.",
      "State a confident, researched range, not a single number or deflection.",
      "Anchor to role/market value, and stay open to discussing the full compensation package.",
    ],
    revisionNotes: "Salary expectations: research market range beforehand, state a confident range anchored to role/market value (not just current salary), stay open on full package.",
  },
  {
    id: "hr-q8",
    topic: "Notice Period",
    prompt: "What is your notice period, and are you open to negotiating it if needed?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["notice-period"],
    estimatedMinutes: 2,
    expectedAnswer:
      "State your actual contractual notice period honestly, and if there's flexibility (like using accrued leave to shorten it, or your current employer being willing to release you early), mention that specifically — companies often have real timeline needs, so accurate, proactive information here helps both sides plan.",
    detailedAnswer:
      "This is a straightforward factual question, but candidates sometimes either understate their actual notice period hoping it won't matter, or fail to proactively mention genuine flexibility that could help. State your actual contractual period honestly (commonly 30, 60, or 90 days depending on your current employer and seniority) — misrepresenting this creates problems later when your actual employer's HR confirms the real number. If there's genuine flexibility — you have accrued leave you could use to shorten the effective start date, or you've already had a conversation with your current manager about an earlier release — mention it proactively, since it directly affects whether this timeline works for the hiring company's needs.",
    hindiExplanation:
      "Ye ek straightforward factual question hai, lekin candidates kabhi kabhi apna actual notice period understate kar dete hain ye soch kar ki matter nahi karega, ya genuine flexibility proactively mention nahi karte jo help kar sakti hai. Apna actual contractual period honestly state karo (commonly 30, 60, ya 90 din depend karta hai current employer aur seniority pe) — ise misrepresent karna baad mein problems create karta hai jab actual employer ki HR real number confirm karti hai. Agar genuine flexibility hai — accrued leave hai jo effective start date shorten karne ke liye use kar sakte ho, ya current manager se pehle se hi ek conversation ho chuki hai earlier release ke baare mein — usse proactively mention karo.",
    interviewExplanation:
      "I'd be direct and proactive: 'My contractual notice period is 60 days. I do have some accrued leave I could potentially use to shorten the effective transition time, and I'm happy to discuss that if timeline is a constraint on your side.'",
    diagramNote:
      "'State actual contractual notice period honestly' → 'Mention genuine flexibility if any (accrued leave, early release conversation)' → 'Helps both sides plan the actual timeline'.",
    diagramMermaid: `flowchart LR
    A["State actual contractual<br/>notice period honestly"] --> B["Mention genuine flexibility<br/>if any (leave, early release)"]
    B --> C["Helps both sides<br/>plan the actual timeline"]`,
    realProjectExample:
      "A candidate with a 90-day contractual notice period proactively mentioned they had already discussed a potential 30-day early release with their manager given the project's timing, giving the hiring company accurate information to plan their own onboarding timeline around.",
    interviewTip:
      "Never state a shorter notice period than your actual contract requires hoping it won't come up — it typically does surface during background/reference checks and creates avoidable friction right before you're supposed to start a new role.",
    followupQuestions: [
      "Would your current employer consider an earlier release given the circumstances?",
      "Is your notice period the same regardless of who initiates the departure?",
      "How much accrued leave do you currently have available?",
    ],
    commonMistakes: [
      "Understating your actual contractual notice period hoping it won't matter later.",
      "Not proactively mentioning genuine flexibility that could help both parties plan.",
    ],
    importantPoints: [
      "State your actual contractual notice period honestly.",
      "Proactively mention any genuine flexibility (accrued leave, early release possibility).",
      "Accurate information here helps both sides plan realistically.",
    ],
    revisionNotes: "Notice period: state actual contractual period honestly, mention genuine flexibility proactively if it exists — never understate hoping it won't surface later.",
  },
  {
    id: "hr-q9",
    topic: "Tell me about yourself",
    prompt: "You have a strong technical background but it's in a completely different domain (e.g. mobile apps) from this BTP role. How would you adjust your 'tell me about yourself' answer?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["tell-me-about-yourself", "career-transition"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Explicitly bridge the transition — briefly acknowledge the different background, then emphasize transferable skills and concrete self-directed BTP learning/projects you've done, framing the transition as a deliberate, informed choice rather than something you're hoping the interviewer won't notice.",
    detailedAnswer:
      "Avoiding or downplaying a domain transition doesn't work — the interviewer will notice the gap on your resume regardless, so it's better to address it directly and confidently rather than hope it goes unmentioned. Structure: briefly acknowledge the background ('I spent three years building mobile apps'), pivot explicitly to why you're moving toward BTP/enterprise development (a genuine reason — enjoying backend/integration work more, wanting bigger-scale enterprise problems), then anchor the transition in concrete evidence you've actually taken action on it — self-directed learning, a personal or open-source CAP project, a certification, anything showing this is a deliberate, already-in-progress transition rather than just an aspiration stated in the interview room for the first time.",
    hindiExplanation:
      "Ek domain transition ko avoid ya downplay karna kaam nahi karta — interviewer resume pe gap notice karega regardless, isliye better hai directly aur confidently address karna, hope karne ki jagah ki mention hi na ho. Structure: background briefly acknowledge karo ('maine teen saal mobile apps banaye'), explicitly pivot karo ki BTP/enterprise development ki taraf kyun move ho rahe ho (ek genuine reason), fir transition ko concrete evidence mein anchor karo jo tumne actually action liya hai — self-directed learning, ek personal ya open-source CAP project, ek certification.",
    interviewExplanation:
      "I'd bridge it directly: 'I spent three years building mobile apps, which gave me strong skills in API integration and async programming. I've been moving toward enterprise/backend development because I enjoy the architectural complexity of larger systems more — I've been actively building this out through a personal CAP project and completing SAP's BTP learning path, so this move is something I've already been working toward, not a first-time idea.'",
    diagramNote:
      "'Briefly acknowledge different background' → 'Explicit, genuine pivot reason' → 'Concrete evidence of self-directed action (project, learning, certification)' — frames it as deliberate, not hopeful.",
    diagramMermaid: `flowchart LR
    A["Briefly acknowledge<br/>different background"] --> B["Explicit, genuine<br/>pivot reason"]
    B --> C["Concrete evidence of<br/>self-directed action"]`,
    realProjectExample:
      "A candidate transitioning from mobile development explicitly framed their answer around building a personal CAP-based expense-tracking app over several weekends specifically to validate their interest in enterprise backend development before applying, giving the interviewer concrete evidence the transition was deliberate and already underway.",
    interviewTip:
      "If asked about a domain transition, having one concrete, specific piece of self-directed evidence (a project, a course actually completed) is far more convincing than saying 'I'm really interested in learning this' with nothing to point to.",
    followupQuestions: [
      "What specifically drew you away from your previous domain toward BTP/enterprise development?",
      "What transferable skills from your previous domain do you think apply here?",
      "How have you been preparing for this transition concretely?",
    ],
    commonMistakes: [
      "Downplaying or avoiding mention of the domain transition, hoping the interviewer won't notice or ask.",
      "Stating interest in the new domain with no concrete evidence of self-directed action taken so far.",
    ],
    importantPoints: [
      "Address a domain transition directly and confidently, not by downplaying or avoiding it.",
      "Give a genuine, specific reason for the pivot, not a vague 'I want a change'.",
      "Anchor it in concrete evidence of self-directed learning/projects already undertaken.",
    ],
    revisionNotes: "Domain transition in 'tell me about yourself': acknowledge briefly → genuine pivot reason → concrete self-directed evidence (project/learning) — frame as deliberate, already in progress.",
  },
  {
    id: "hr-q10",
    topic: "Current Project",
    prompt: "Your current project is confidential or you're not allowed to share specific details. How would you still answer this question meaningfully?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["current-project", "confidentiality"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Describe the project at a genericized level — the type of business problem, the general architecture pattern and technologies used, and your specific role and contribution — without naming the client, specific business logic, or proprietary details, since interviewers primarily care about your technical depth and role, not the confidential specifics.",
    detailedAnswer:
      "Confidentiality doesn't actually prevent giving a meaningful answer, since what interviewers are actually evaluating (your technical depth, your specific contribution, your architectural reasoning) rarely requires naming the client or exposing proprietary business logic. Generalize the business context ('a supply-chain approval workflow for a manufacturing client' rather than the client's actual name or specific proprietary process details), describe the technical architecture and technologies genuinely and specifically (this is rarely itself confidential), and give your specific contribution in full technical detail — since 'I built the CAP service's data model and handler logic for approval routing' reveals nothing proprietary while still fully answering what the interviewer actually wants to know. It's worth briefly and professionally noting the confidentiality upfront ('I can't share the specific client, but I can walk through the technical architecture and my role in detail') so the interviewer understands why certain details are generalized, rather than the answer feeling evasive without explanation.",
    hindiExplanation:
      "Confidentiality actually ek meaningful answer dene se rokti nahi hai, kyunki jo interviewers actually evaluate kar rahe hain (tumhari technical depth, specific contribution, architectural reasoning) rarely client naam ya proprietary business logic expose karne ki maang karta hai. Business context ko generalize karo ('ek supply-chain approval workflow ek manufacturing client ke liye' client ke actual naam ya specific proprietary process details ki jagah), technical architecture aur technologies ko genuinely aur specifically describe karo, aur apna specific contribution poore technical detail mein do.",
    interviewExplanation:
      "I'd frame confidentiality upfront and still give full technical detail: 'I can't share the specific client name, but I can walk through the technical architecture and my role in full detail. It was a supply-chain approval workflow for a manufacturing client — we used CAP on Cloud Foundry with HANA Cloud, and I specifically built the CAP service's data model and the handler logic for approval routing.' The interviewer gets everything they actually need to evaluate my depth.",
    diagramNote:
      "'Confidential project' → 'Generalize business context (type of problem, not client name)' + 'Full technical architecture/technology detail (rarely confidential)' + 'Full specific contribution detail' → meaningfully answers the actual question.",
    diagramMermaid: `flowchart LR
    A["Confidential project"] --> B["Generalize business context<br/>(problem type, not client)"]
    A --> C["Full technical/architecture detail<br/>rarely confidential"]
    A --> D["Full specific contribution detail"]`,
    realProjectExample:
      "A candidate under an NDA described their project as 'a multitenant compliance-tracking system for a financial services client' without naming the client, then gave full, specific technical detail about the CAP/HANA architecture and their own contribution to the multitenancy design, giving the interviewer everything needed to assess their depth without violating any confidentiality.",
    interviewTip:
      "If asked about a confidential project, briefly stating the confidentiality constraint upfront (rather than silently generalizing without explanation) helps the interviewer understand why some details are abstracted, avoiding the impression that you're being evasive.",
    followupQuestions: [
      "What parts of a project are typically safe to discuss even under an NDA?",
      "How would you handle a follow-up question that gets close to confidential territory?",
      "Would you name the technologies used even if the client/business context is confidential?",
    ],
    commonMistakes: [
      "Refusing to give any meaningful detail at all, citing confidentiality as a blanket excuse.",
      "Not briefly explaining the confidentiality constraint upfront, making the generalized answer seem evasive.",
    ],
    importantPoints: [
      "Generalize the business context (problem type, not client specifics), but give full technical detail.",
      "Technical architecture and your specific contribution are rarely themselves confidential.",
      "Briefly note the confidentiality constraint upfront so the generalization doesn't seem evasive.",
    ],
    revisionNotes: "Confidential project: generalize business context (problem type, not client name), but give full technical architecture and contribution detail — briefly note the confidentiality upfront so it doesn't seem evasive.",
  },
  {
    id: "hr-q11",
    topic: "Challenges",
    prompt: "Describe a technical challenge where you ultimately couldn't fully solve the problem, or had to accept a compromise. How do you talk about that honestly?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["challenges", "honesty"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Use the same STAR structure, but be honest that the outcome was a compromise or partial solution, explain the real constraints that made a perfect solution infeasible (time, technical limitations, business priorities), and focus on demonstrating good judgment in choosing the compromise rather than pretending everything worked out ideally.",
    detailedAnswer:
      "Every candidate who's worked on real systems has faced situations without a clean, perfect resolution, and pretending otherwise (either by avoiding this question's honest version, or reframing a genuine compromise as a full success) is both dishonest and a missed opportunity to demonstrate mature judgment. A strong answer is honest about the actual outcome — 'we didn't have time to implement the fully robust solution, so we shipped a more limited version with a documented follow-up' — and focuses on explaining why that compromise was the right call given real constraints (a deadline, a technical limitation genuinely outside your control, a business priority that outweighed technical perfection), demonstrating that you can make sound engineering tradeoffs under real-world constraints rather than only being able to describe idealized, unconstrained solutions.",
    hindiExplanation:
      "Har candidate jo real systems pe kaam kar chuka hai un situations ka saamna kar chuka hai jinka koi clean, perfect resolution nahi tha, aur is question ka honest version avoid karna, ya ek genuine compromise ko full success ki tarah reframe karna, dono dishonest hai aur mature judgment dikhane ka ek missed opportunity hai. Ek strong answer actual outcome ke baare mein honest hota hai — 'humare paas fully robust solution implement karne ka time nahi tha, isliye humne ek more limited version ship kiya ek documented follow-up ke saath' — aur explain karta hai ki wo compromise sahi call kyun tha given real constraints.",
    interviewExplanation:
      "I'd be genuinely honest about the outcome: 'We identified a genuinely better long-term architecture for handling this, but given the deadline, implementing it fully wasn't feasible. I chose to ship a more limited but stable version, document the ideal approach for a future iteration, and communicate that tradeoff clearly to stakeholders. It wasn't the perfect outcome, but given the real constraint, I believe it was the right engineering judgment call.'",
    diagramNote:
      "'Genuine compromise/incomplete outcome' → 'Honest explanation of the real constraint (time, technical limit, business priority)' → 'Focus on the judgment shown in choosing that compromise, not pretending it was ideal'.",
    diagramMermaid: `flowchart LR
    A["Genuine compromise/<br/>incomplete outcome"] --> B["Honest explanation<br/>of the real constraint"]
    B --> C["Focus on judgment shown<br/>in choosing the compromise"]`,
    realProjectExample:
      "'We needed a proper caching layer for a slow reporting query, but given a two-day deadline before a client demo, I instead added a targeted index that improved performance enough to pass the demo, while documenting the caching approach as a follow-up ticket — an honest, deliberate tradeoff given the real time constraint, not the ideal long-term fix.'",
    interviewTip:
      "If asked this specifically, resist the urge to quietly reframe a genuine compromise as a full success — interviewers specifically value candidates who can discuss imperfect outcomes honestly, since it signals trustworthy self-reporting under pressure in a real job.",
    followupQuestions: [
      "How did you communicate the tradeoff/compromise to stakeholders?",
      "Did you ever get to implement the ideal solution later?",
      "How do you decide when a compromise is acceptable versus when you should push back on a deadline?",
    ],
    commonMistakes: [
      "Reframing a genuine compromise as if it were a complete, ideal success.",
      "Avoiding this question's honest version entirely by only ever telling fully-resolved success stories.",
    ],
    importantPoints: [
      "Be honest about compromise/incomplete outcomes rather than reframing them as full successes.",
      "Explain the real constraint that made a perfect solution infeasible.",
      "Focus on demonstrating sound judgment in the tradeoff, not pretending it was ideal.",
    ],
    revisionNotes: "Honest compromise story: use STAR, but be genuinely honest the outcome was a tradeoff — explain the real constraint and focus on demonstrating good judgment, not pretending it was a perfect success.",
  },
  {
    id: "hr-q12",
    topic: "Achievements",
    prompt: "Your proudest achievement was actually a team effort where your individual contribution was relatively small. How would you present this honestly without either overclaiming or underselling yourself?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["achievements", "team-credit"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Give honest credit to the team effort while still being specific about your actual contribution, however proportionally modest — interviewers respect honest team-credit framing more than obvious overclaiming, and a modest-but-real specific contribution to something significant is still a legitimate, strong answer.",
    detailedAnswer:
      "Trying to inflate a small individual contribution to sound like the primary driver of a team success is usually transparent to an experienced interviewer and can undermine trust in the rest of your answers. The honest, still-strong approach: clearly credit it as a team achievement, then specifically and honestly describe your actual contribution ('I owned the data model design and the migration script, while two teammates built the majority of the business logic and UI') — a genuine, specific, if proportionally modest, contribution to something significant is a legitimate achievement to be proud of, and honestly framing it this way actually builds more credibility than an inflated solo-hero narrative would, since interviewers can usually sense the difference and value the honesty.",
    hindiExplanation:
      "Ek chhoti individual contribution ko inflate karke lagana ki tum ek team success ke primary driver the, usually experienced interviewer ke liye transparent hota hai aur tumhare baaki answers mein trust undermine kar sakta hai. Honest, still-strong approach: clearly ise ek team achievement ki tarah credit do, fir specifically aur honestly apna actual contribution describe karo ('maine data model design aur migration script own kiya, jabki do teammates ne zyada tar business logic aur UI banaya') — ek genuine, specific, chahe proportionally modest, contribution ek significant cheez mein ek legitimate achievement hai proud hone layak.",
    interviewExplanation:
      "I'd give honest, specific credit: 'This was genuinely a team achievement — I want to be clear about that. My specific piece was owning the data model design and the migration script, while two teammates handled most of the business logic and UI. It's a modest slice of a bigger success, but it's a real, specific contribution I'm proud of, and I learned a lot from being part of that team effort.'",
    diagramNote:
      "'Team achievement, individual piece modest' → 'Honestly credit the team' + 'Specifically describe YOUR actual, modest-but-real contribution' — more credible than inflating to sound like the primary driver.",
    diagramMermaid: `flowchart LR
    A["Team achievement,<br/>your piece modest"] --> B["Honestly credit the team"]
    A --> C["Specifically describe YOUR<br/>actual, modest-but-real contribution"]`,
    realProjectExample:
      "A candidate discussing a major successful product launch was specific and honest that their contribution was designing and implementing the data migration script — a relatively small but genuinely important piece of a larger team effort — rather than implying broader ownership of the launch's overall success, which the interviewer noted came across as more credible than an inflated narrative would have.",
    interviewTip:
      "If asked to elaborate on a team achievement, being ready with the specific, honest detail of your actual contribution (rather than a vague 'I was part of the team that...') shows you can discuss team success with integrity rather than either false modesty or overclaiming.",
    followupQuestions: [
      "What did you personally learn from being part of that larger team effort?",
      "How did the team divide responsibilities on that project?",
      "Do you have a different achievement example where your individual contribution was more central?",
    ],
    commonMistakes: [
      "Inflating a modest individual contribution to sound like the primary driver of a team success.",
      "Being so overly modest that you fail to specifically credit your actual, real contribution at all.",
    ],
    importantPoints: [
      "Honestly credit team achievements as team achievements, not solo victories.",
      "Still specifically describe your actual contribution, however proportionally modest.",
      "Honest, specific team-credit framing builds more credibility than obvious overclaiming.",
    ],
    revisionNotes: "Team-effort achievement: honestly credit the team, then specifically describe YOUR actual, modest-but-real contribution — honest framing builds more credibility than inflating to sound like the primary driver.",
  },
  {
    id: "hr-q13",
    topic: "Conflict",
    prompt: "How would you handle a disagreement with someone significantly more senior than you, where you believe they're technically wrong?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["conflict", "seniority-dynamics"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Raise the concern respectfully and with specific reasoning/evidence rather than staying silent out of deference, frame it as a genuine question or a data point rather than a confrontational challenge, and be genuinely open to being wrong yourself — seniority alone isn't a reason to withhold a genuinely well-reasoned technical concern, but how you raise it matters as much as the concern itself.",
    detailedAnswer:
      "Staying silent purely out of deference to seniority, even when you have a genuinely well-founded technical concern, is a real failure mode — senior people are still capable of being wrong, and a team benefits when concerns are raised, not suppressed by hierarchy. The right approach: raise it respectfully and specifically, framed as a genuine question or observation rather than an accusatory challenge ('I want to make sure I understand the reasoning here — I was thinking about X because of Y, could you help me understand how that's accounted for?' rather than 'that's wrong'), back it with concrete reasoning or evidence rather than just a feeling, and stay genuinely open to the possibility that the senior person has context or reasoning you're missing — since they might indeed be right for reasons not immediately obvious to you. This balances not staying silent out of misplaced deference against not being needlessly confrontational, which matters especially given the seniority gap.",
    hindiExplanation:
      "Purely seniority ki deference ki wajah se chup rehna, chahe tumhare paas genuinely well-founded technical concern ho, ek real failure mode hai — senior log bhi galat ho sakte hain, aur ek team benefit karti hai jab concerns raise kiye jaate hain, hierarchy se suppress nahi hote. Sahi approach: respectfully aur specifically raise karo, ek genuine question ya observation ki tarah framed (accusatory challenge ki jagah), concrete reasoning ya evidence se back karo, aur genuinely open raho is possibility ke liye ki senior person ke paas context/reasoning ho jo tum miss kar rahe ho.",
    interviewExplanation:
      "I'd raise it respectfully but genuinely: 'I wouldn't stay silent just because of the seniority gap — that doesn't serve the team well if I genuinely have a well-founded concern. I'd frame it as a question rather than a challenge — \"I was thinking about X, could you help me understand how this handles that case?\" — backed by specific reasoning, while staying genuinely open that they might have context I'm missing. It's about raising it respectfully, not staying silent, and not being needlessly confrontational either.'",
    diagramNote:
      "'Senior person's technical decision, genuine concern' → 'Raise respectfully, as a question with specific reasoning (not silence, not confrontation)' → 'Stay genuinely open — they might have context you're missing'.",
    diagramMermaid: `flowchart LR
    A["Senior person's decision,<br/>genuine concern"] --> B["Raise respectfully,<br/>as a question with reasoning"]
    B --> C["Stay genuinely open —<br/>they might have missing context"]`,
    realProjectExample:
      "Noticing a senior architect's proposed design seemed to miss a specific multitenancy edge case, a candidate raised it as a specific question during a design review rather than staying silent — the architect appreciated the catch and adjusted the design, though in a different instance the same approach revealed the architect had already accounted for the concern in a way not immediately visible.",
    interviewTip:
      "If asked this, the strong answer explicitly rejects pure silent-deference as the wrong instinct, while also explicitly avoiding a confrontational framing — showing you understand both failure modes (staying silent, and being needlessly aggressive) and how to navigate between them.",
    followupQuestions: [
      "What would you do if you raised the concern and they dismissed it without addressing your reasoning?",
      "How would this differ if the disagreement were about a stylistic preference rather than a genuine technical concern?",
      "Have you had an actual experience like this, and how did it turn out?",
    ],
    commonMistakes: [
      "Staying silent about a genuinely well-founded technical concern purely out of deference to seniority.",
      "Framing the concern confrontationally ('that's wrong') rather than as a respectful question.",
    ],
    importantPoints: [
      "Seniority alone isn't a reason to withhold a genuinely well-reasoned technical concern.",
      "Raise it respectfully, framed as a question with specific reasoning, not a confrontational challenge.",
      "Stay genuinely open to being wrong yourself — the senior person might have missing context.",
    ],
    revisionNotes: "Disagreeing with someone senior: raise it respectfully as a specific, reasoned question (not silence, not confrontation) — stay genuinely open they might have context you're missing.",
  },
  {
    id: "hr-q14",
    topic: "Conflict",
    prompt: "Describe a situation where a technical disagreement couldn't be resolved through discussion alone, and how it ultimately got settled.",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["conflict", "escalation"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Describe an appropriate escalation path when discussion genuinely reaches an impasse — bringing in a neutral third party/tech lead for a decision, building a small prototype/proof-of-concept to generate objective data rather than continuing to argue opinions, or explicitly agreeing to timebox the decision and move forward — showing you know how to break a stalemate constructively rather than letting it drag on unresolved.",
    detailedAnswer:
      "Some genuine technical disagreements really do reach a point where further discussion alone isn't converging, and knowing how to break that impasse constructively (rather than either an unproductive standoff or someone just giving up out of exhaustion) is a real, valuable skill. Legitimate paths: escalating to a neutral third party (a tech lead, architect, or someone with relevant authority/expertise) specifically to make a call, framed as seeking a decision rather than 'reporting' the other person; building a small, fast prototype or proof-of-concept of the contested approaches to generate actual, objective data/evidence rather than continuing to argue from opinion; or, if the disagreement is genuinely low-stakes and both approaches are reasonable, explicitly agreeing to timebox further discussion and just make a decision to keep the team moving, revisiting later if it proves wrong. The specific mechanism matters less than showing you have a constructive way to break a stalemate rather than letting it fester.",
    hindiExplanation:
      "Kuch genuine technical disagreements really ek point tak pahunch jaate hain jaha further discussion akela converge nahi ho raha, aur us impasse ko constructively break karna kaise jaanna (ek unproductive standoff ya koi exhaustion se give up karne ki jagah) ek real, valuable skill hai. Legitimate paths: ek neutral third party (tech lead, architect) ko escalate karna specifically ek call lene ke liye; contested approaches ka ek chhota, fast prototype/proof-of-concept banana actual, objective data generate karne ke liye opinion se argue karne ki jagah; ya, agar disagreement genuinely low-stakes hai aur dono approaches reasonable hain, explicitly further discussion ko timebox karne ke liye agree karna.",
    interviewExplanation:
      "I'd describe a constructive escalation path: 'After a few rounds of discussion weren't converging, we agreed to build a quick prototype of both approaches over a day to get actual performance data rather than continuing to argue from opinion. The data clearly favored one approach, and both of us accepted it — having an objective way to break the stalemate, rather than just continuing to argue or one of us giving up out of exhaustion, was what actually resolved it.'",
    diagramNote:
      "'Discussion alone not converging' → escalation options: 'Neutral third party makes the call' / 'Build a prototype for objective data' / 'Timebox and decide, revisit if wrong' — constructive stalemate-breaking, not an unresolved standoff.",
    diagramMermaid: `flowchart TD
    A["Discussion alone<br/>not converging"] --> B["Neutral third party<br/>makes the call"]
    A --> C["Build a prototype<br/>for objective data"]
    A --> D["Timebox and decide,<br/>revisit if wrong"]`,
    realProjectExample:
      "A disagreement about whether to use a Calculation View or a CDS view for a specific reporting requirement wasn't resolving through discussion, so the team agreed to spend half a day building both and comparing actual query performance — the data clearly favored one approach, and the objective comparison ended the disagreement immediately without lingering resentment.",
    interviewTip:
      "If asked how you handle a genuine impasse, naming a specific, constructive mechanism (prototype for data, neutral escalation, timeboxing) is a much stronger answer than a vague 'we eventually worked it out' with no actual described process.",
    followupQuestions: [
      "How would you decide whether to escalate versus build a prototype for a given disagreement?",
      "What would you do if the prototype/data still didn't clearly favor one approach?",
      "How do you avoid resentment after a disagreement is settled via an escalation or a timeboxed decision?",
    ],
    commonMistakes: [
      "Describing an unresolved standoff or someone simply giving up out of exhaustion as if it were a genuine resolution.",
      "Not having a concrete, describable mechanism for breaking a genuine impasse.",
    ],
    importantPoints: [
      "Some genuine disagreements need an explicit mechanism to break the stalemate, not just more discussion.",
      "Legitimate paths: neutral third-party escalation, building a prototype for objective data, or timeboxing a decision.",
      "Showing a constructive resolution mechanism is stronger than describing an unresolved standoff.",
    ],
    revisionNotes: "Genuine impasse resolution: escalate to a neutral third party, build a prototype for objective data, or timebox and decide — a constructive stalemate-breaking mechanism, not an unresolved standoff.",
  },
  {
    id: "hr-q15",
    topic: "Leadership",
    prompt: "Describe a time your initiative or proposed idea was rejected. How did you handle that, and what did you take away from it?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["leadership", "rejection"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Show that you accepted the rejection gracefully without becoming defensive or disengaged, genuinely tried to understand the reasoning behind it (rather than assuming it was simply not listened to), and either found a modified way to address the underlying concern or moved on constructively — this tests resilience and maturity, not just the ability to propose ideas.",
    detailedAnswer:
      "This question specifically probes what happens after the positive leadership-initiative story — proposing something is only half the skill; handling rejection of that proposal gracefully and constructively is the other half, and it's a genuine signal of maturity interviewers value. A strong answer shows you didn't become defensive, dismissive of the decision-maker, or disengaged/resentful after being turned down — instead, you sought to understand the actual reasoning (which might reveal a legitimate constraint or context you hadn't considered), and either found an alternative, smaller way to address the underlying concern that was more palatable, or genuinely accepted the decision and moved forward productively rather than continuing to relitigate it. This shows you can handle not always getting your way, which matters enormously for someone who's expected to keep proposing good ideas over a long career, not just once.",
    hindiExplanation:
      "Ye question specifically probe karta hai ki positive leadership-initiative story ke baad kya hota hai — kuch propose karna sirf half skill hai; us proposal ki rejection ko gracefully aur constructively handle karna doosra half hai, aur ye maturity ka ek genuine signal hai jo interviewers value karte hain. Ek strong answer dikhata hai ki tum defensive, decision-maker se dismissive, ya disengaged/resentful nahi hue reject hone ke baad — iske bajaye, tumne actual reasoning samajhne ki koshish ki, aur ya toh ek alternative, chhota tarika dhoonda underlying concern address karne ka jo zyada palatable tha, ya genuinely decision accept karke productively aage badhe.",
    interviewExplanation:
      "I'd show graceful handling and genuine understanding-seeking: 'I proposed adopting a specific tool that got turned down. Instead of pushing back defensively, I asked to understand the reasoning — it turned out there was a licensing cost constraint I hadn't known about. I accepted that and instead found a lighter-weight, free alternative that addressed most of the same underlying need. I learned to understand the full constraint picture before proposing something, not just the technical merits.'",
    diagramNote:
      "'Initiative/idea rejected' → 'Handled gracefully, not defensive/disengaged' → 'Sought to genuinely understand the reasoning' → 'Found an alternative addressing the concern, or accepted and moved forward constructively'.",
    diagramMermaid: `flowchart TD
    A["Initiative/idea rejected"] --> B["Handled gracefully,<br/>not defensive/disengaged"]
    B --> C["Sought to genuinely<br/>understand the reasoning"]
    C --> D["Found an alternative,<br/>or accepted and moved on"]`,
    realProjectExample:
      "A proposal to migrate a service to a different messaging pattern was rejected due to a timeline constraint the team hadn't fully explained upfront; rather than pushing back, the candidate asked clarifying questions, understood the real timeline pressure, and instead proposed a smaller, lower-risk change addressing the most pressing part of the underlying concern within the existing timeline.",
    interviewTip:
      "If asked this, avoid a story where the rejection was clearly wrong and you were simply right all along vindicated later — the strongest answers show genuine acceptance and understanding-seeking even when the outcome wasn't what you wanted, not a delayed-vindication narrative.",
    followupQuestions: [
      "Did you ever revisit that idea later, and how did that go?",
      "How do you decide when to accept a rejection versus continue advocating for something you believe in?",
      "How did this experience change how you propose ideas going forward?",
    ],
    commonMistakes: [
      "Becoming defensive or dismissive of the decision-maker after having an idea rejected.",
      "Telling a story where you were simply right all along and later vindicated, missing the point of showing genuine acceptance.",
    ],
    importantPoints: [
      "Show graceful handling of rejection — not defensive, dismissive, or disengaged.",
      "Genuinely seek to understand the reasoning behind the rejection.",
      "Either find an alternative addressing the underlying concern, or accept and move forward constructively.",
    ],
    revisionNotes: "Handling a rejected idea: accept gracefully (not defensive/disengaged), genuinely seek to understand the reasoning, then either find an alternative or accept and move on constructively — resilience, not just initiative.",
  },
  {
    id: "hr-q16",
    topic: "Salary Negotiation",
    prompt: "The company's initial offer comes in below your researched range. How would you respond in that specific conversation?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["salary-negotiation", "counter-offer"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Respond professionally and factually, not emotionally — express genuine continued interest in the role, reference your research/market data as the basis for a specific counter, and ask open questions about the offer's structure (is there flexibility on base vs. signing bonus vs. equity) rather than issuing an ultimatum immediately.",
    detailedAnswer:
      "Reacting emotionally (frustration, immediately threatening to walk) to a below-range initial offer is rarely effective and can damage what's otherwise a good relationship with a company you're still genuinely interested in — initial offers are often deliberately an opening position, not a final number, especially at larger organizations with negotiation as an expected part of the process. A professional response reaffirms genuine interest in the role first (so the conversation doesn't read as purely transactional), references your specific market research as the basis for a counter ('based on my research into market rates for this role and level, I was expecting something closer to X'), and asks about the offer's actual structure and flexibility (is the base fixed but there's room in signing bonus, equity, or other components) rather than jumping straight to an ultimatum, which forecloses a productive negotiation before it's even started.",
    hindiExplanation:
      "Ek below-range initial offer pe emotionally react karna (frustration, turant walk karne ki threat) rarely effective hota hai aur ek genuinely interested company ke saath otherwise good relationship damage kar sakta hai — initial offers aksar deliberately ek opening position hote hain, final number nahi, especially larger organizations mein jaha negotiation process ka expected hissa hai. Ek professional response pehle genuine interest reaffirm karta hai role mein, apna specific market research reference karta hai ek counter ke basis ki tarah, aur offer ke actual structure/flexibility ke baare mein poochta hai.",
    interviewExplanation:
      "I'd respond professionally with data, not emotion: 'I want to reaffirm I'm genuinely excited about this role. Based on my research into market rates for this position and level, I was expecting something closer to X — could we discuss whether there's room to move on the base, or flexibility in other parts of the package like signing bonus or equity?' This keeps it collaborative and specific rather than issuing an immediate ultimatum.",
    diagramNote:
      "'Below-range offer received' → 'Respond professionally, not emotionally' → 'Reaffirm genuine interest' + 'Counter with specific market research basis' + 'Ask about offer structure/flexibility (base vs bonus vs equity)'.",
    diagramMermaid: `flowchart TD
    A["Below-range offer<br/>received"] --> B["Respond professionally,<br/>not emotionally"]
    B --> C["Reaffirm genuine interest"]
    B --> D["Counter with specific<br/>market research basis"]
    B --> E["Ask about offer structure/<br/>flexibility"]`,
    realProjectExample:
      "Receiving an initial offer below their researched range, a candidate calmly reaffirmed enthusiasm for the role, referenced specific market data points supporting a higher base, and asked whether there was flexibility in the signing bonus if base salary was constrained — resulting in an improved combined package without any relationship friction.",
    interviewTip:
      "If asked how you'd handle a below-range offer, showing you understand negotiation as a normal, expected professional conversation (not a confrontation) demonstrates the emotional maturity that companies actually want to see in this specific moment.",
    followupQuestions: [
      "What would you do if the company said the base salary was truly fixed with no flexibility at all?",
      "How would you decide whether to accept a below-range offer if negotiation doesn't move it?",
      "Would you ever use a competing offer as leverage, and how would you do that professionally?",
    ],
    commonMistakes: [
      "Reacting emotionally or with an immediate ultimatum to a below-range initial offer.",
      "Not referencing specific market research as the basis for a counter, making the request seem arbitrary.",
    ],
    importantPoints: [
      "Respond professionally and factually, not emotionally, to a below-range offer.",
      "Reaffirm genuine interest first, then counter with specific market research as the basis.",
      "Ask about the offer's actual structure and flexibility rather than issuing an immediate ultimatum.",
    ],
    revisionNotes: "Below-range offer: respond professionally (not emotionally) — reaffirm genuine interest, counter with specific market research, ask about structure/flexibility (base vs bonus vs equity) rather than an ultimatum.",
  },
  {
    id: "hr-q17",
    topic: "Salary Negotiation",
    prompt: "You're asked directly what your current salary is. How would you handle this, especially if disclosure isn't legally required or feels disadvantageous to share?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["salary-negotiation", "current-salary-disclosure"],
    estimatedMinutes: 2,
    expectedAnswer:
      "It's reasonable to politely redirect the conversation toward your expectations for this specific role rather than disclosing current salary, especially if you believe it's below market or could anchor negotiations unfavorably — frame it professionally around focusing on the value/market rate for the new role rather than refusing outright or being evasive. Worth knowing: in a growing number of jurisdictions, employers are actually legally prohibited from asking this question at all, not merely optional to answer.",
    detailedAnswer:
      "This isn't just a matter of being 'not obligated' to answer — in a growing number of jurisdictions (several US states and cities including New York City, California, Colorado, and others, plus a growing list elsewhere), employers are legally prohibited from asking about current or past salary history at all, precisely because it tends to perpetuate existing pay gaps. Where no such ban applies, you're still never legally obligated to answer directly if you have a legitimate reason not to (like your current salary being below-market for reasons specific to your current employer, which shouldn't anchor what a new role should pay). A professional, non-evasive way to redirect either way: 'I'd prefer to focus on the value and market rate for this specific role rather than my current compensation, which may not be directly comparable given differences in company/role. Based on my research, I'm targeting a range of X to Y for this position.' This is respectful and professional rather than a flat refusal, while still protecting your negotiating position from being unfavorably anchored to a number that might not reflect your actual market value for the role in question.",
    hindiExplanation:
      "Ye sirf 'obligated nahi ho' ki baat nahi hai — kai jurisdictions mein (several US states/cities jaise New York City, California, Colorado, aur badhti hui list kahi aur bhi) employers ko current ya past salary history poochna legally prohibited hai, kyunki ye existing pay gaps ko perpetuate karta hai. Jaha aisa koi ban nahi hai, wahan bhi tum directly answer dene ke liye obligated nahi ho agar tumhare paas ek legitimate reason hai na dene ka (jaise tumhari current salary below-market hai reasons ki wajah se jo specific hain tumhare current employer ke liye). Ek professional, non-evasive tarika redirect karne ka: 'Main is specific role ke value aur market rate pe focus karna prefer karunga apni current compensation ki jagah, jo directly comparable nahi ho sakti company/role mein differences ki wajah se. Apni research ke aadhar pe, main X se Y ka range target kar raha hoon is position ke liye.'",
    interviewExplanation:
      "I'd redirect professionally rather than refuse outright or feel obligated to answer directly: 'I'd prefer to focus on the value and market rate for this specific role, since my current compensation may not be directly comparable given differences in company and role scope. Based on my research, I'm targeting a range of X to Y for this position.' If it's relevant, I'd also note that in several jurisdictions employers are actually barred from asking this question outright, not just that I'm free to decline — but either way, this is respectful, not evasive, while protecting my negotiating position from being anchored unfavorably.",
    diagramNote:
      "'Asked directly for current salary' → 'Politely redirect to role-specific expectations/market research, rather than disclosing or flatly refusing' → protects negotiating position without being evasive.",
    diagramMermaid: `flowchart LR
    A["Asked directly for<br/>current salary"] --> B["Politely redirect to<br/>role-specific market research"]
    B --> C["Protects negotiating position,<br/>without being evasive"]`,
    realProjectExample:
      "Asked directly about a below-market current salary, a candidate professionally redirected to their researched market range for the new role instead, avoiding anchoring the new offer to an unrelated, unfavorable historical number, while still engaging constructively and respectfully with the recruiter's question.",
    interviewTip:
      "If asked this directly, having a prepared, professional redirect phrase ready (rather than being caught off guard and either blurting out an unfavorable number or refusing awkwardly) shows composed negotiation skill.",
    followupQuestions: [
      "What would you do if the interviewer pressed further after your initial redirect?",
      "Is current salary disclosure ever actually required by law where you're interviewing?",
      "Would your approach differ if your current salary were actually competitive/above market?",
    ],
    commonMistakes: [
      "Disclosing a below-market current salary without considering how it might anchor the new offer unfavorably.",
      "Refusing to answer abruptly or awkwardly instead of professionally redirecting to role-specific expectations.",
    ],
    importantPoints: [
      "It's reasonable to redirect rather than disclose current salary, especially if it could anchor negotiations unfavorably.",
      "In many jurisdictions (several US states/cities and a growing list elsewhere), employers are legally prohibited from asking about salary history at all — it's not just that you're free to decline.",
      "Frame the redirect professionally around focusing on the new role's value/market rate.",
      "This isn't evasive or a refusal — it's a respectful, composed negotiation technique.",
    ],
    revisionNotes: "Asked for current salary: politely redirect to role-specific market research/expectations rather than disclosing (especially if below-market) or refusing awkwardly — a professional, composed technique. Note: many jurisdictions legally bar employers from asking this at all, beyond just candidates being free to decline.",
  },
  {
    id: "hr-q18",
    topic: "Notice Period",
    prompt: "The hiring company wants you to start much sooner than your notice period allows. How would you navigate this conversation professionally?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["notice-period", "timeline-negotiation"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Explain honestly why the notice period exists and matters (a professional obligation to your current employer, not an arbitrary constraint), explore any genuine flexibility you actually have, but avoid agreeing to something that would mean leaving your current employer in a way that damages your professional reputation just to accommodate a new company's preference.",
    detailedAnswer:
      "Agreeing to breach your notice period commitment just to satisfy a new employer's preferred timeline is a real reputational risk — it signals to the new employer that you might do the same to them someday, and it damages your relationship with your current employer and professional network. The right approach: explain clearly and professionally why the notice period matters (it's a genuine professional commitment, not an arbitrary bureaucratic hurdle), explore any actual flexibility you have (accrued leave, an honest conversation with your current manager about the transition), but hold the line on not agreeing to something that would mean leaving your current role in a way that burns a bridge — a good hiring company should understand and respect this, and pushing back on unreasonable timeline pressure with clear, professional reasoning is itself a positive signal about your integrity, not a negative one.",
    hindiExplanation:
      "Apna notice period commitment breach karne ke liye agree karna sirf naye employer ki preferred timeline satisfy karne ke liye ek real reputational risk hai — ye naye employer ko signal karta hai ki tum unke saath bhi kabhi wahi kar sakte ho, aur ye current employer/professional network ke saath relationship damage karta hai. Sahi approach: clearly aur professionally explain karo notice period kyun matter karta hai (ye ek genuine professional commitment hai, arbitrary bureaucratic hurdle nahi), koi actual flexibility explore karo jo tumhare paas hai, lekin us pe line hold karo jo tumhare current role ko chhodne ka matlab ho ek bridge burn karna.",
    interviewExplanation:
      "I'd explain the commitment clearly and hold a reasonable line: 'My notice period is a genuine professional commitment to my current employer, not an arbitrary constraint — I want to honor that the same way I'd want a future employee to honor their commitment to leaving here properly. I do have some flexibility through accrued leave that could shorten it somewhat, and I'm happy to explore that. But I wouldn't want to leave my current role in a way that damages that relationship just to meet an aggressive timeline — I think that would actually be a bad signal to send you too.'",
    diagramNote:
      "'New company wants earlier start than notice period allows' → 'Explain notice period is a genuine professional commitment' + 'Explore genuine flexibility (accrued leave)' → 'Hold the line against burning a bridge with current employer'.",
    diagramMermaid: `flowchart TD
    A["New company wants<br/>earlier start"] --> B["Explain: genuine<br/>professional commitment"]
    A --> C["Explore genuine flexibility<br/>accrued leave"]
    B --> D["Hold the line against<br/>burning a bridge"]
    C --> D`,
    realProjectExample:
      "A hiring manager pushing for a start date two weeks earlier than the candidate's actual notice period allowed was met with a clear, professional explanation of why the commitment mattered, along with an offer to explore a partial accrued-leave-based compromise — the hiring manager respected the position and the original notice period was ultimately honored with only a minor adjustment.",
    interviewTip:
      "If pressured on this in an interview, the strong answer explicitly frames honoring your notice period as a positive integrity signal for the new employer to consider, not just an inconvenient obstacle to their preferred timeline.",
    followupQuestions: [
      "How would you feel if a future employee tried to leave your team without honoring proper notice?",
      "Would you consider a partial remote/part-time transition arrangement to bridge the gap?",
      "How would you communicate this timeline constraint to the new employer without seeming inflexible?",
    ],
    commonMistakes: [
      "Agreeing to breach a notice period commitment just to satisfy a new employer's preferred timeline.",
      "Not explaining why the notice period genuinely matters, making the pushback seem like arbitrary inflexibility.",
    ],
    importantPoints: [
      "Explain that a notice period is a genuine professional commitment, not an arbitrary constraint.",
      "Explore genuine flexibility (accrued leave) without breaching the actual commitment.",
      "Holding a reasonable line here is a positive integrity signal, not just an inconvenient obstacle.",
    ],
    revisionNotes: "New employer wants earlier start than notice period allows: explain it's a genuine professional commitment, explore real flexibility (accrued leave), but hold the line against burning a bridge — framing this as an integrity signal, not inflexibility.",
  },
  {
    id: "hr-q19",
    topic: "Notice Period",
    prompt: "You're currently on a probation period at your current job with a shorter notice requirement, but you're already interviewing elsewhere. How would you discuss this honestly?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["notice-period", "probation"],
    estimatedMinutes: 2,
    expectedAnswer:
      "State the actual, accurate notice period that applies during probation (typically shorter, and genuinely correct information the hiring company needs), without needing to over-explain or justify why you're job-searching during probation unless directly and reasonably asked — the factual timeline detail is what's actually relevant to the hiring company's planning.",
    detailedAnswer:
      "Being on probation with a shorter notice period is simply a factual detail to communicate accurately — state it plainly ('I'm currently in my probation period, which has a 2-week notice requirement rather than the standard 60 days') since this is genuinely useful, accurate information for the hiring company's own planning purposes. There's no inherent need to justify or over-explain why you're interviewing during probation unless the interviewer specifically and reasonably asks about it (in which case, an honest, brief, professional reason — the role turned out to be a poor fit, you found something more aligned with your goals — is perfectly reasonable to share). Over-explaining or seeming defensive about this unprompted can actually create more concern than the fact itself, which is a normal, common situation that experienced interviewers have seen many times before.",
    hindiExplanation:
      "Probation pe hona ek shorter notice period ke saath simply ek factual detail hai accurately communicate karne ke liye — plainly state karo ('main currently apne probation period mein hoon, jiski 2-week notice requirement hai standard 60 days ki jagah') kyunki ye genuinely useful, accurate information hai hiring company ke apne planning purposes ke liye. Iski inherent zaroorat nahi hai justify ya over-explain karne ki ki tum probation ke dauraan interview kyun kar rahe ho jab tak interviewer specifically aur reasonably na poochhe.",
    interviewExplanation:
      "I'd state it factually and simply: 'I'm currently in my probation period, which has a 2-week notice requirement rather than the standard 60 days — I wanted to give you accurate information for your own planning.' If asked why I'm interviewing during probation, I'd give a brief, honest reason — 'the role turned out to be a different fit than expected' — without over-explaining or sounding defensive about a fairly normal situation.",
    diagramNote:
      "'On probation, shorter notice period' → 'State it plainly, factually — accurate info for hiring company's planning' → if asked why: 'brief, honest reason, no over-explaining or defensiveness'.",
    diagramMermaid: `flowchart LR
    A["On probation,<br/>shorter notice period"] --> B["State it plainly, factually"]
    B --> C["If asked why: brief, honest<br/>reason, no over-explaining"]`,
    realProjectExample:
      "A candidate on probation with a 1-week notice period stated it directly and factually when asked, and when the interviewer followed up asking why, gave a brief, honest answer that the role's actual responsibilities had turned out quite different from what was described during their own hiring process — a normal, non-defensive answer the interviewer accepted without further concern.",
    interviewTip:
      "If asked about probation-period job searching, resist the urge to over-justify unprompted — stating the factual notice period plainly and only elaborating if specifically and reasonably asked keeps the answer proportionate to what's actually being asked.",
    followupQuestions: [
      "Would your current employer be surprised to learn you're interviewing during probation?",
      "How would you handle a reference check request during your probation period?",
      "What would you do if the new company wanted you to start immediately, before formally resigning?",
    ],
    commonMistakes: [
      "Over-explaining or sounding defensive about interviewing during probation without being specifically asked why.",
      "Not stating the actual, accurate shorter notice period clearly, leaving the hiring company with incorrect planning assumptions.",
    ],
    importantPoints: [
      "State the actual, accurate shorter notice period plainly — it's useful, factual information for planning.",
      "No inherent need to justify job-searching during probation unless specifically and reasonably asked.",
      "If asked why, give a brief, honest, non-defensive reason.",
    ],
    revisionNotes: "On probation with shorter notice: state the actual notice period plainly (factual, useful for planning) — don't over-explain or sound defensive about job-searching during probation unless specifically asked.",
  },
  {
    id: "hr-q20",
    topic: "Achievements",
    prompt: "How would you answer this question differently if you're early-career with limited professional achievements to draw from, compared to a senior candidate?",
    difficulty: "Intermediate",
    experienceLevel: "Fresher",
    tags: ["achievements", "early-career"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Draw from academic projects, personal/side projects, internships, or even significant coursework/certifications with genuine effort and outcome behind them — interviewers evaluating early-career candidates calibrate expectations accordingly and don't expect the same scale of achievement as a senior candidate, so a well-articulated smaller-scale achievement with genuine depth is entirely appropriate and sufficient.",
    detailedAnswer:
      "Early-career candidates sometimes freeze on this question assuming it requires a significant professional achievement they haven't had the opportunity to accumulate yet — but interviewers evaluating early-career candidates calibrate their expectations to the candidate's actual career stage, not an absolute bar meant for senior professionals. Legitimate, strong sources: a substantial academic or capstone project where you can describe genuine technical depth and outcome; a personal or open-source side project built out of genuine interest, showing initiative beyond coursework; an internship contribution, even if modest in scope; or a certification/learning achievement that required genuine sustained effort (like completing a rigorous BTP learning path or building a working CAP application independently). What matters is genuine depth, specific detail, and real effort/outcome behind whatever you choose — a well-articulated personal project often outperforms a vague, unspecific 'I contributed to a team project' answer, even from an early-career candidate.",
    hindiExplanation:
      "Early-career candidates kabhi kabhi is question pe freeze ho jaate hain ye assume karke ki isse ek significant professional achievement chahiye jo unke paas accumulate karne ka mauka nahi mila abhi tak — lekin interviewers early-career candidates ko evaluate karte waqt apni expectations candidate ke actual career stage ke hisaab se calibrate karte hain, senior professionals ke liye meant ek absolute bar nahi. Legitimate, strong sources: ek substantial academic ya capstone project, ek personal ya open-source side project genuine interest se bana, ek internship contribution chahe modest scope mein, ya ek certification/learning achievement jisme genuine sustained effort laga ho.",
    interviewExplanation:
      "I'd draw from an appropriate early-career source: 'As a recent graduate, I'd point to a personal project I built independently — a working CAP application for expense tracking, where I designed the full data model and implemented the approval workflow logic myself, specifically to deepen my BTP skills beyond what my coursework covered. It's smaller scale than a professional achievement, but it represents genuine effort and initiative I'm proud of.'",
    diagramNote:
      "Early-career sources: 'Academic/capstone project (genuine technical depth)', 'Personal/open-source side project (initiative beyond coursework)', 'Internship contribution', 'Certification/learning achievement with sustained effort' — interviewers calibrate expectations to career stage.",
    diagramMermaid: `flowchart TD
    A["Early-career candidate"] --> B["Academic/capstone project"]
    A --> C["Personal/open-source<br/>side project"]
    A --> D["Internship contribution"]
    A --> E["Certification/learning<br/>achievement"]`,
    realProjectExample:
      "A fresh graduate with no professional achievements drew instead on a self-directed side project — a working CAP application built over several weekends specifically to learn BTP development beyond their university coursework — describing it with the same genuine depth and specific technical detail a professional achievement story would have, which the interviewer found entirely satisfying for an early-career candidate.",
    interviewTip:
      "If you're early-career and freeze on this question, remember interviewers aren't expecting a senior-level achievement — a genuinely well-articulated personal project with real depth is a completely legitimate and sufficient answer at this career stage.",
    followupQuestions: [
      "What specifically motivated you to build that personal project?",
      "What would you improve about that project if you revisited it today?",
      "How did that project or achievement shape what you're looking for in this role?",
    ],
    commonMistakes: [
      "Freezing on this question assuming it requires a significant professional achievement not yet accumulated.",
      "Giving a vague, generic answer instead of a specific, genuinely detailed personal/academic project.",
    ],
    importantPoints: [
      "Interviewers calibrate expectations to career stage, not an absolute senior-level bar.",
      "Legitimate sources: academic projects, personal/side projects, internships, certifications with genuine effort.",
      "Genuine depth and specific detail matter more than the scale/prestige of the achievement itself.",
    ],
    revisionNotes: "Early-career achievement answer: draw from academic/personal projects, internships, or certifications with genuine depth — interviewers calibrate expectations to career stage, so a well-articulated smaller achievement is entirely sufficient.",
  },
];

export const hrMcqs: BtpMcq[] = [
  {
    id: "hr-mcq1",
    topic: "Tell me about yourself",
    prompt: "What's the recommended length for a 'tell me about yourself' answer?",
    options: ["10-15 minutes, covering full career history", "60-90 seconds, a focused summary", "As long as possible to show thoroughness", "A single sentence"],
    correctIndex: 1,
    explanation: "A tight 60-90 second summary — current role, a concrete highlight, and interest in the role — is far more effective than a full chronological career history.",
  },
  {
    id: "hr-mcq2",
    topic: "Current Project",
    prompt: "When describing your current project, what should you make sure to clarify?",
    options: [
      "Only the overall team's work, never your individual contribution",
      "Your specific individual contribution, clearly separated from the team's work",
      "Only the technologies used, with no context",
      "Nothing specific, a general description is sufficient",
    ],
    correctIndex: 1,
    explanation: "Interviewers are specifically listening for your individual contribution — describing only 'we did X' without clarifying what you personally did misses the point of the question.",
  },
  {
    id: "hr-mcq3",
    topic: "Challenges",
    prompt: "What structure is recommended for answering a 'tell me about a challenge' question?",
    options: ["Random anecdote with no structure", "STAR: Situation, Task, Action, Result", "Just describe the technology used", "Only mention that it was hard"],
    correctIndex: 1,
    explanation: "STAR (Situation, Task, Action, Result) keeps the answer focused and ensures you cover the specific diagnostic steps and a quantified outcome.",
  },
  {
    id: "hr-mcq4",
    topic: "Conflict",
    prompt: "What's a weak way to frame a conflict/disagreement story?",
    options: [
      "Showing genuine back-and-forth and a fair resolution",
      "Claiming you were always right and the other person simply capitulated",
      "Explaining how you advocated with reasoning",
      "Reflecting honestly on what you learned",
    ],
    correctIndex: 1,
    explanation: "A one-sided 'I was always right' framing is unconvincing — strong answers show genuine tension, reasoned advocacy, and a fair resolution process.",
  },
  {
    id: "hr-mcq5",
    topic: "Leadership",
    prompt: "What does 'leadership without a title' typically look like for an early-career candidate?",
    options: [
      "Managing a formal team of direct reports",
      "Taking initiative on something unassigned, like proposing a standard or mentoring a teammate",
      "Only leadership shown through official promotions counts",
      "It's impossible to demonstrate without a management title",
    ],
    correctIndex: 1,
    explanation: "Interviewers look for initiative beyond assigned tasks — proposing standards, mentoring, or driving an unprioritized fix — not necessarily formal people management.",
  },
  {
    id: "hr-mcq6",
    topic: "Salary Negotiation",
    prompt: "What's the recommended approach to answering 'what are your salary expectations'?",
    options: [
      "Say 'whatever you think is fair' to avoid the topic",
      "Research market rates beforehand and state a confident, reasoned range",
      "Always ask for the maximum number you can think of with no research",
      "Refuse to discuss compensation at all",
    ],
    correctIndex: 1,
    explanation: "Researching market rates for the role/level/location beforehand and stating a confident, reasoned range is far stronger than deflecting or answering without preparation.",
  },
  {
    id: "hr-mcq7",
    topic: "Notice Period",
    prompt: "What should you do if you have genuine flexibility in your notice period (e.g. accrued leave)?",
    options: [
      "Never mention it, keep it hidden",
      "Proactively mention it, since it helps both sides plan the actual timeline",
      "Only mention it if directly asked twice",
      "Understate your actual notice period instead",
    ],
    correctIndex: 1,
    explanation: "Proactively mentioning genuine flexibility (like accrued leave) while stating your honest contractual notice period helps both parties plan realistically.",
  },
  {
    id: "hr-mcq8",
    topic: "Achievements",
    prompt: "As an early-career candidate with no professional achievements yet, what's an appropriate way to answer an achievement question?",
    options: [
      "Say you have no achievements and skip the question",
      "Draw from a genuine academic, personal, or side project with real depth and effort behind it",
      "Fabricate a professional achievement",
      "Only senior candidates can meaningfully answer this question",
    ],
    correctIndex: 1,
    explanation: "Interviewers calibrate expectations to career stage — a well-articulated academic or personal project with genuine depth is a completely legitimate and sufficient answer for an early-career candidate.",
  },
  {
    id: "hr-mcq9",
    topic: "Conflict",
    prompt: "How should you handle a genuine technical disagreement with someone significantly more senior than you?",
    options: [
      "Always stay silent out of deference to their seniority",
      "Raise it respectfully as a specific, reasoned question, while staying open that they might have missing context",
      "Confront them directly and insist you're right",
      "Only raise it if a manager specifically asks you to",
    ],
    correctIndex: 1,
    explanation: "Seniority alone isn't a reason to withhold a well-founded concern — raise it respectfully as a question backed by reasoning, while staying genuinely open to being wrong yourself.",
  },
  {
    id: "hr-mcq10",
    topic: "Salary Negotiation",
    prompt: "How should you respond if an initial offer comes in below your researched range?",
    options: [
      "React emotionally and immediately threaten to walk away",
      "Respond professionally — reaffirm interest, counter with market research, ask about offer flexibility",
      "Silently accept it without any response",
      "Refuse to discuss compensation any further",
    ],
    correctIndex: 1,
    explanation: "A professional response reaffirms genuine interest, references specific market research as the basis for a counter, and asks about the offer's structure and flexibility rather than reacting emotionally.",
  },
];
