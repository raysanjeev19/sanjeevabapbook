import type { BtpMcq, BtpQuestion } from "@/lib/btp-content";

/** Section 8 — Connectivity. Interview questions, full format. */
export const connectivityQuestions: BtpQuestion[] = [
  {
    id: "conn-q1",
    topic: "Destination Service",
    prompt: "What's the difference between the Destination service and the Connectivity service?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["destination-service", "connectivity-service"],
    estimatedMinutes: 3,
    expectedAnswer:
      "The Destination service manages 'what to call and how to authenticate' (URLs, credentials, auth type); the Connectivity service provides the actual network tunnel (via Cloud Connector) that lets a BTP app reach an on-premise system at all — they're complementary, and calling an on-prem system typically uses both together.",
    detailedAnswer:
      "A destination pointing to an on-premise system is configured with `ProxyType: OnPremise`, which tells the runtime to route the call through the Connectivity service rather than directly over the internet. The Connectivity service is the component that actually establishes and manages the secure tunnel connection to the Cloud Connector running in the customer's on-prem network — without it, BTP simply has no network path to reach an on-prem system regardless of what credentials a destination has configured. So a typical on-prem call flow uses the Destination service to resolve 'where and how to authenticate', and the Connectivity service to actually get the request there over the tunnel.",
    hindiExplanation:
      "Ek on-premise system ko point karne wala destination `ProxyType: OnPremise` se configure hota hai, jo runtime ko batata hai ki call ko Connectivity service ke through route karo, directly internet pe nahi. Connectivity service wo component hai jo actually customer ke on-prem network mein chal rahe Cloud Connector tak ek secure tunnel connection establish/manage karta hai — iske bina, BTP ke paas on-prem system tak pahunchne ka koi network path hi nahi hota, chahe destination mein kaise bhi credentials configured hon. Typical on-prem call flow Destination service use karta hai 'kaha aur kaise authenticate karna hai' resolve karne ke liye, aur Connectivity service use karta hai request ko actually wahan tak pahunchane ke liye tunnel ke through.",
    interviewExplanation:
      "I'd separate the two clearly: 'The Destination service resolves where to call and how to authenticate — the URL and credentials. The Connectivity service is what actually establishes the secure tunnel to the on-prem Cloud Connector — without it, there's no network path at all, regardless of destination config. Calling an on-prem system typically uses both: Destination for the what/how, Connectivity for the actual network path.'",
    diagramNote:
      "BTP App → 'Destination service (resolves URL + auth)' → 'Connectivity service (provides the actual tunnel)' → 'Cloud Connector' → 'On-prem system'.",
    diagramMermaid: `flowchart LR
    A["BTP App"] --> B["Destination service<br/>resolves URL + auth"]
    B --> C["Connectivity service<br/>provides the actual tunnel"]
    C --> D["Cloud Connector"] --> E["On-prem system"]`,
    realProjectExample:
      "A newly created destination with `ProxyType: OnPremise` still failed to connect until we realized the Connectivity service instance hadn't actually been bound to the app — correct destination config alone wasn't enough without the tunnel infrastructure in place.",
    interviewTip:
      "This distinction is a very common point of confusion — explicitly stating that both are needed together for on-prem calls (not either/or) shows precise understanding.",
    followupQuestions: [
      "What does ProxyType: OnPremise actually configure?",
      "What happens if you call an on-prem destination without binding the Connectivity service?",
      "Is the Connectivity service needed for calling internet/cloud-based external systems too?",
    ],
    commonMistakes: [
      "Thinking a correctly configured destination alone is sufficient for on-prem connectivity.",
      "Confusing the Destination and Connectivity services as the same thing.",
    ],
    importantPoints: [
      "Destination service = resolves URL + auth configuration.",
      "Connectivity service = provides the actual secure tunnel to the Cloud Connector.",
      "On-prem calls need both together, not either alone.",
    ],
    revisionNotes: "Destination service = what to call + how to auth. Connectivity service = the actual tunnel to Cloud Connector. On-prem calls need both.",
  },
  {
    id: "conn-q2",
    topic: "Cloud Connector",
    prompt: "What is the Cloud Connector, and why does it initiate the connection outbound rather than BTP connecting inbound to the on-prem network?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["cloud-connector", "security"],
    estimatedMinutes: 3,
    expectedAnswer:
      "The Cloud Connector is a lightweight piece of software installed inside the customer's on-premise network that establishes an outbound tunnel connection to BTP; it connects outbound (rather than BTP connecting inbound) specifically so the customer's firewall never needs an inbound port opened, which would be a significant security exposure.",
    detailedAnswer:
      "Opening an inbound port on a corporate firewall so an external cloud platform could reach in would be a major security risk most enterprises rightly refuse. The Cloud Connector flips this: it runs inside the trusted on-prem network and initiates an outbound connection to BTP's Connectivity service (outbound connections through a firewall are generally much less risky and commonly already allowed), establishing a persistent tunnel. Once established, BTP can send requests through that existing tunnel to reach specific, explicitly whitelisted on-prem systems — but the connection was always initiated from inside the trusted network outward, never the reverse.",
    hindiExplanation:
      "Corporate firewall pe ek inbound port kholna taaki ek external cloud platform andar aa sake, ek major security risk hoga jise zyada tar enterprises sahi tarike se refuse karte hain. Cloud Connector isse flip kar deta hai: ye trusted on-prem network ke andar chalta hai aur BTP ke Connectivity service ko ek outbound connection initiate karta hai (firewall ke through outbound connections generally kaafi kam risky hote hain aur commonly already allowed hote hain), ek persistent tunnel establish karke. Ek baar establish hone ke baad, BTP us existing tunnel ke through requests bhej sakta hai specific, explicitly whitelisted on-prem systems tak pahunchne ke liye — lekin connection hamesha trusted network ke andar se outward initiate hota hai, kabhi reverse nahi.",
    interviewExplanation:
      "I'd explain the security rationale directly: 'Opening an inbound firewall port for an external cloud platform would be a major security exposure. The Cloud Connector runs inside the trusted network and initiates an outbound connection instead — outbound is generally much less risky and commonly already allowed. Once that persistent tunnel exists, BTP can send requests through it to reach explicitly whitelisted on-prem systems, but the connection always originates from inside the trusted network.'",
    diagramNote:
      "'On-prem network (Cloud Connector inside)' -- outbound connection initiated --> 'BTP Connectivity service' — with a crossed-out reverse arrow labeled 'never inbound into on-prem firewall'.",
    diagramMermaid: `flowchart LR
    A["On-prem network<br/>Cloud Connector inside"] -- "outbound connection initiated" --> B["BTP Connectivity service"]
    B -.-> A
    B -.- C["never inbound into on-prem firewall"]`,
    realProjectExample:
      "A customer's security team approved the Cloud Connector setup specifically because it required zero inbound firewall changes — only an outbound rule to BTP's Connectivity service endpoints, which was already a standard, low-risk exception.",
    interviewTip:
      "If asked 'doesn't BTP need to reach into the on-prem network', correct that framing explicitly — it never does; the trust direction is always outbound-initiated from on-prem.",
    followupQuestions: [
      "What ports/protocols does the Cloud Connector's outbound connection typically use?",
      "How does BTP know which on-prem systems it's allowed to reach through the tunnel?",
      "What happens if the Cloud Connector's connection drops?",
    ],
    commonMistakes: [
      "Describing the connection as BTP reaching inbound into the on-prem network.",
      "Not understanding the specific security rationale for the outbound-only design.",
    ],
    importantPoints: [
      "Cloud Connector runs inside the trusted on-prem network.",
      "It initiates an OUTBOUND connection to BTP — no inbound firewall port ever needed.",
      "This design avoids exposing the on-prem network to inbound access from the cloud.",
    ],
    revisionNotes: "Cloud Connector initiates OUTBOUND connection from on-prem to BTP — no inbound firewall port ever opened. Security-by-design.",
  },
  {
    id: "conn-q3",
    topic: "Cloud Connector",
    prompt: "How does the Cloud Connector control which on-prem systems and resources are actually reachable from BTP?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["cloud-connector", "access-control"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The Cloud Connector administrator explicitly whitelists specific backend systems, ports, and even URL path patterns that are exposed through the tunnel — anything not explicitly configured remains completely unreachable from BTP, giving fine-grained control rather than exposing the entire on-prem network.",
    detailedAnswer:
      "Establishing the tunnel doesn't automatically expose the whole on-prem network — the Cloud Connector's own configuration (done by an on-prem administrator) explicitly lists which specific backend hosts and ports are accessible, mapped to a 'virtual' hostname that BTP-side destinations reference. For HTTP-based access, you can even restrict down to specific URL path patterns, so a destination could only be allowed to reach `/api/orders/*` on a given backend, not the entire application. This means the on-prem administrator retains precise, granular control over the tunnel's actual attack surface, rather than the whole internal network becoming reachable the moment a tunnel exists.",
    hindiExplanation:
      "Tunnel establish karna automatically poora on-prem network expose nahi kar deta — Cloud Connector ki apni configuration (on-prem administrator dwara ki hui) explicitly list karti hai kaunse specific backend hosts aur ports accessible hain, ek 'virtual' hostname se mapped jise BTP-side destinations reference karte hain. HTTP-based access ke liye, tum specific URL path patterns tak bhi restrict kar sakte ho, taaki ek destination sirf `/api/orders/*` tak pahunch sake ek given backend pe, poori application tak nahi. Isse on-prem administrator tunnel ke actual attack surface pe precise, granular control retain karta hai.",
    interviewExplanation:
      "I'd emphasize the granularity: 'Establishing the tunnel doesn't expose the whole network — the on-prem admin explicitly whitelists specific backend hosts and ports in the Cloud Connector, mapped to a virtual hostname. For HTTP, you can restrict even further to specific URL path patterns, so only exactly the endpoints you intend are reachable — the admin retains precise control over the attack surface.'",
    diagramNote:
      "Cloud Connector config: 'Backend: internal-erp.company.local:443 → virtual: erp-virtual.com, allowed paths: /api/orders/*' — everything else on that network stays unreachable.",
    diagramMermaid: `flowchart LR
    A["Cloud Connector config"] --> B["Backend: internal-erp:443<br/>→ virtual host: erp-virtual.com<br/>allowed paths: /api/orders/*"]
    A -.-> C["Everything else on network:<br/>unreachable"]`,
    realProjectExample:
      "A security review confirmed that even though the Cloud Connector tunnel existed, only two specific backend endpoints with a narrow URL path pattern were actually whitelisted — the rest of the internal network, including sensitive admin systems, remained completely unreachable through it.",
    interviewTip:
      "Mentioning the URL-path-level restriction specifically (not just host/port) shows a more thorough, security-conscious understanding of Cloud Connector's actual configuration granularity.",
    followupQuestions: [
      "What is a 'virtual host' in Cloud Connector configuration and why is it used?",
      "Who is responsible for maintaining this whitelist — the BTP team or the on-prem admin?",
      "Can the Cloud Connector restrict access based on the calling subaccount too?",
    ],
    commonMistakes: [
      "Assuming establishing the Cloud Connector tunnel exposes the entire on-prem network.",
      "Not knowing access can be restricted down to specific URL path patterns, not just host/port.",
    ],
    importantPoints: [
      "Cloud Connector requires explicit whitelisting of backends/ports/paths — nothing else is reachable.",
      "Uses virtual hostnames that BTP destinations reference, mapping to real internal addresses.",
      "On-prem admin retains full, granular control over the actual exposed surface.",
    ],
    revisionNotes: "Cloud Connector = explicit whitelist (host/port/URL path) via virtual hostnames — only exactly configured endpoints are reachable, not the whole network.",
  },
  {
    id: "conn-q4",
    topic: "On Premise",
    prompt: "What does `ProxyType: OnPremise` actually change in how a destination's requests are routed?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["on-premise", "destinations"],
    estimatedMinutes: 2,
    expectedAnswer:
      "It tells BTP's runtime to route the destination's calls through the Connectivity service and Cloud Connector tunnel instead of making a direct internet call — the destination's 'URL' becomes a virtual hostname resolved by the Cloud Connector, not a real internet-reachable address.",
    detailedAnswer:
      "A destination with `ProxyType: Internet` makes a normal, direct outbound HTTPS call to a publicly reachable URL, exactly like any regular API call. Setting `ProxyType: OnPremise` changes this entirely — the 'URL' configured is actually a virtual hostname that only makes sense inside the context of a specific Cloud Connector's configuration; the request gets routed to the Connectivity service, tunneled to the matching Cloud Connector, which resolves the virtual hostname to the real internal address and forwards the request onward. Getting this proxy type wrong (using Internet for something that should be OnPremise, or vice versa) is a common, simple misconfiguration that causes connection failures.",
    hindiExplanation:
      "`ProxyType: Internet` wala destination ek normal, direct outbound HTTPS call karta hai ek publicly reachable URL pe, bilkul kisi normal API call ki tarah. `ProxyType: OnPremise` set karna ye poori tarah badal deta hai — configured 'URL' actually ek virtual hostname hai jo sirf ek specific Cloud Connector ki configuration ke context mein sense banata hai; request Connectivity service tak route hoti hai, matching Cloud Connector tak tunnel hoti hai, jo virtual hostname ko real internal address mein resolve karta hai aur request aage forward karta hai. Ye proxy type galat set karna (Internet use karna jaha OnPremise hona chahiye, ya ulta) ek common, simple misconfiguration hai jo connection failures cause karti hai.",
    interviewExplanation:
      "I'd contrast the two proxy types: 'Internet proxy type makes a normal direct HTTPS call to a public URL. OnPremise changes the routing entirely — the configured URL is actually a virtual hostname meaningful only inside a specific Cloud Connector's config; the request routes through the Connectivity service and tunnel, and the Cloud Connector resolves the virtual name to the real internal address. Getting the proxy type wrong is a common, simple cause of connection failures.'",
    diagramNote:
      "ProxyType: Internet → 'direct HTTPS call to public URL'. ProxyType: OnPremise → 'virtual hostname → Connectivity service → tunnel → Cloud Connector resolves to real internal address'.",
    diagramMermaid: `flowchart LR
    A["ProxyType: Internet"] --> B["Direct HTTPS call<br/>to public URL"]
    C["ProxyType: OnPremise"] --> D["Virtual hostname"] --> E["Connectivity service"] --> F["Tunnel → Cloud Connector<br/>resolves to real address"]`,
    realProjectExample:
      "A destination accidentally configured with ProxyType: Internet instead of OnPremise failed immediately, since BTP tried to resolve the 'virtual hostname' as a real public DNS name — correcting the proxy type fixed it instantly.",
    interviewTip:
      "If asked to debug a destination connection failure, checking the ProxyType setting against the actual target (public internet vs on-prem) is one of the first, simplest things to verify.",
    followupQuestions: [
      "What happens if you set ProxyType: Internet for an on-prem system by mistake?",
      "Who defines what a 'virtual hostname' actually maps to?",
      "Are there other ProxyType options besides Internet and OnPremise?",
    ],
    commonMistakes: [
      "Not knowing ProxyType fundamentally changes the routing mechanism, not just a label.",
      "Confusing the virtual hostname with a real, internet-resolvable address.",
    ],
    importantPoints: [
      "ProxyType: Internet = direct HTTPS call to a real public URL.",
      "ProxyType: OnPremise = routes through Connectivity service + Cloud Connector tunnel.",
      "The 'URL' for an OnPremise destination is a virtual hostname, not a real address.",
    ],
    revisionNotes: "ProxyType: Internet = direct call. ProxyType: OnPremise = routed via Connectivity service + tunnel, URL is a virtual hostname resolved by Cloud Connector.",
  },
  {
    id: "conn-q5",
    topic: "Proxy",
    prompt: "What is a 'reverse proxy' role that the Cloud Connector plays, and how does it protect the on-prem system?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["proxy", "cloud-connector"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The Cloud Connector acts as a reverse proxy sitting in front of the actual on-prem backend — external BTP requests never talk directly to the real system, only to the Cloud Connector, which forwards (and can filter/restrict) requests to the real backend, hiding its actual address and adding a controllable checkpoint.",
    detailedAnswer:
      "Rather than BTP requests reaching the real backend system's actual network address directly, they're addressed to a virtual hostname that only the Cloud Connector understands — the Cloud Connector receives the request, applies its configured access rules (allowed paths, principal propagation mapping), and only then forwards it to the real backend over the internal network. This reverse-proxy positioning means the real backend's actual hostname/IP is never directly exposed to BTP or the internet at all, and gives the on-prem admin a single, controllable enforcement point for every request passing through, rather than needing to harden every individual backend system against direct external exposure.",
    hindiExplanation:
      "BTP requests real backend system ke actual network address tak directly pahunchne ki jagah, ek virtual hostname pe address hoti hain jise sirf Cloud Connector samajhta hai — Cloud Connector request receive karta hai, apne configured access rules apply karta hai (allowed paths, principal propagation mapping), aur tabhi use real backend tak internal network pe forward karta hai. Ye reverse-proxy positioning ka matlab hai real backend ka actual hostname/IP kabhi BTP ya internet ko directly expose nahi hota, aur on-prem admin ko har request ke liye ek single, controllable enforcement point milta hai, har individual backend system ko direct external exposure ke against harden karne ki zaroorat ki jagah.",
    interviewExplanation:
      "I'd explain the hiding/checkpoint benefit: 'The Cloud Connector acts as a reverse proxy — BTP requests are addressed to a virtual hostname only it understands, and it applies access rules before forwarding to the real backend over the internal network. The real backend's actual address is never exposed to BTP or the internet, and the admin gets one central enforcement point instead of hardening every backend system individually.'",
    diagramNote:
      "'BTP request → virtual hostname' → 'Cloud Connector (reverse proxy, applies access rules)' → 'Real backend (actual address hidden from BTP)'.",
    diagramMermaid: `flowchart LR
    A["BTP request<br/>virtual hostname"] --> B["Cloud Connector<br/>reverse proxy, applies access rules"]
    B --> C["Real backend<br/>actual address hidden from BTP"]`,
    realProjectExample:
      "A penetration test confirmed that even with full knowledge of the BTP-side destination configuration, the actual internal hostname and IP of the backend ERP system were never discoverable from outside — only the Cloud Connector's virtual hostname was ever visible externally.",
    interviewTip:
      "If asked 'is the real backend's address exposed anywhere externally', the correct answer is no — that's specifically what the reverse-proxy design of the Cloud Connector prevents.",
    followupQuestions: [
      "What access rules can the Cloud Connector enforce before forwarding a request?",
      "How does this reverse-proxy design relate to principal propagation?",
      "Could an attacker who compromises the Cloud Connector reach the whole internal network?",
    ],
    commonMistakes: [
      "Thinking BTP requests reach the real backend's actual address directly.",
      "Not connecting the reverse-proxy design to the security benefit of hiding internal topology.",
    ],
    importantPoints: [
      "Cloud Connector acts as a reverse proxy between BTP and the real backend.",
      "Real backend's actual address is never exposed to BTP or the internet.",
      "Provides one central, controllable enforcement checkpoint for every request.",
    ],
    revisionNotes: "Cloud Connector = reverse proxy — BTP only ever talks to virtual hostnames; real backend address stays hidden, one central enforcement point.",
  },
  {
    id: "conn-q6",
    topic: "Certificates",
    prompt: "What role do certificates play in a Cloud Connector connection, beyond just encrypting traffic?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["certificates", "trust"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Certificates establish mutual trust — the Cloud Connector verifies it's genuinely talking to the customer's actual BTP subaccount (not an impersonator), and, for principal propagation specifically, a client certificate represents the actual end-user's identity that the on-prem system can verify and trust.",
    detailedAnswer:
      "Beyond just TLS encryption (which any HTTPS connection provides), certificates in this context establish identity and trust. The tunnel connection itself uses certificate-based mutual authentication so the Cloud Connector can be confident it's genuinely connected to the customer's own BTP subaccount infrastructure, not an attacker impersonating it. Separately, for principal propagation, a short-lived client certificate is generated representing the specific authenticated end-user, which the on-prem system's own trust configuration must be set up to recognize and validate — without this certificate trust chain being correctly configured on the on-prem side, principal propagation simply won't work even if the network tunnel itself is fine.",
    hindiExplanation:
      "Sirf TLS encryption (jo koi bhi HTTPS connection deta hai) se aage, certificates yahan identity aur trust establish karte hain. Tunnel connection khud certificate-based mutual authentication use karta hai taaki Cloud Connector confident ho sake ki wo genuinely customer ke apne BTP subaccount infrastructure se connected hai, kisi attacker se nahi jo impersonate kar raha ho. Alag se, principal propagation ke liye, ek short-lived client certificate generate hota hai jo specific authenticated end-user ko represent karta hai, jise on-prem system ka apna trust configuration recognize/validate karne ke liye set up hona chahiye — is certificate trust chain ke on-prem side pe sahi se configure na hone pe, principal propagation kaam nahi karega chahe network tunnel bilkul thik ho.",
    interviewExplanation:
      "I'd separate the two roles: 'Beyond encryption, certificates establish trust — the tunnel itself uses mutual certificate authentication so the Cloud Connector knows it's genuinely talking to the real BTP subaccount. Separately, for principal propagation, a short-lived client certificate represents the specific real user, and the on-prem system needs its own trust configuration set up to recognize that certificate — without that, principal propagation fails even if the network tunnel itself works fine.'",
    diagramNote:
      "Two roles: 'Tunnel-level: mutual certificate auth confirms genuine BTP subaccount identity' and 'Principal propagation: short-lived client cert represents the real user, on-prem must trust it'.",
    diagramMermaid: `flowchart LR
    A["Tunnel-level:<br/>mutual cert auth"] --> B["Confirms genuine BTP subaccount"]
    C["Principal propagation:<br/>short-lived client cert"] --> D["Represents real user<br/>on-prem must trust it"]`,
    realProjectExample:
      "Principal propagation kept failing with the network tunnel working perfectly fine — the actual issue was the on-prem system's trust store hadn't been configured to recognize the certificate authority issuing BTP's client certificates, a separate configuration step from the tunnel setup itself.",
    interviewTip:
      "If asked to debug a principal propagation failure, checking the on-prem trust store's recognition of the client certificate's issuing CA is a specific, precise diagnostic step beyond generic 'check the connection'.",
    followupQuestions: [
      "What has to be configured on the on-prem side to trust these client certificates?",
      "Are the certificates used for principal propagation long-lived or short-lived?",
      "What happens if the tunnel's own mutual authentication certificate expires?",
    ],
    commonMistakes: [
      "Thinking certificates in this context are only about encrypting traffic in transit.",
      "Not distinguishing tunnel-level trust certificates from principal-propagation client certificates.",
    ],
    importantPoints: [
      "Tunnel-level certificates establish mutual trust (genuine BTP subaccount identity).",
      "Principal propagation uses separate, short-lived client certificates representing the real user.",
      "On-prem system needs its own trust configuration to recognize these certificates.",
    ],
    revisionNotes: "Certificates = trust, not just encryption. Tunnel-level: mutual auth (genuine subaccount). Principal propagation: short-lived client cert per user, on-prem must trust the issuing CA.",
  },
  {
    id: "conn-q7",
    topic: "Connectivity Service",
    prompt: "Is the Connectivity service only needed for on-premise calls, or does it play a role for cloud-to-cloud calls too?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["connectivity-service", "scope"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The Connectivity service's core purpose — the tunnel to a Cloud Connector — is specifically for on-premise connectivity; calling another cloud/internet-based system doesn't need it, since a direct HTTPS call (via a destination with ProxyType: Internet) works without any tunnel infrastructure.",
    detailedAnswer:
      "For calling another cloud service or public internet API, a destination with `ProxyType: Internet` is sufficient — it's a normal outbound HTTPS call needing no tunnel at all. The Connectivity service exists specifically to solve the on-premise reachability problem: providing the BTP-side endpoint of the tunnel that a Cloud Connector establishes an outbound connection to. So while it's binding-required for any app needing on-prem access, it's simply irrelevant infrastructure for a service that only ever calls other cloud/internet endpoints.",
    hindiExplanation:
      "Kisi doosri cloud service ya public internet API ko call karne ke liye, `ProxyType: Internet` wala destination kaafi hai — ye ek normal outbound HTTPS call hai jisme koi tunnel ki zaroorat nahi. Connectivity service specifically on-premise reachability problem solve karne ke liye exist karta hai — BTP-side endpoint provide karta hai us tunnel ka jise Cloud Connector outbound connection karta hai. Isliye ye on-prem access chahne wali kisi bhi app ke liye binding-required hai, lekin ek aisi service ke liye simply irrelevant infrastructure hai jo sirf doosre cloud/internet endpoints ko hi kabhi call karti hai.",
    interviewExplanation:
      "I'd clarify its scope precisely: 'The Connectivity service's whole purpose is the on-prem tunnel — calling another cloud or public internet API just needs a destination with ProxyType: Internet, a normal direct HTTPS call with no tunnel needed at all. So it's essential for on-prem access, but simply irrelevant infrastructure for cloud-to-cloud calls.'",
    diagramNote:
      "Two paths: 'Cloud-to-cloud call → destination (ProxyType: Internet) → direct HTTPS, no Connectivity service needed' vs 'On-prem call → destination (ProxyType: OnPremise) → Connectivity service + tunnel required'.",
    diagramMermaid: `flowchart LR
    A["Cloud-to-cloud call"] --> B["ProxyType: Internet"] --> C["Direct HTTPS<br/>no Connectivity service needed"]
    D["On-prem call"] --> E["ProxyType: OnPremise"] --> F["Connectivity service + tunnel required"]`,
    realProjectExample:
      "A microservice calling only external SaaS APIs never bound a Connectivity service instance at all — it was purely a cloud-to-cloud caller and had no on-prem connectivity need whatsoever.",
    interviewTip:
      "If asked 'do all BTP apps need the Connectivity service', the correct answer is no — only ones that actually need on-prem reachability; it's not a universal requirement.",
    followupQuestions: [
      "What binding is actually required for a purely cloud-to-cloud calling app?",
      "Does the Connectivity service handle authentication for cloud-to-cloud calls?",
      "What error would you see if you tried to use an on-prem destination without binding Connectivity?",
    ],
    commonMistakes: [
      "Assuming every BTP app needs the Connectivity service bound regardless of what it actually calls.",
      "Not knowing cloud-to-cloud calls work with a simple direct HTTPS destination, no tunnel involved.",
    ],
    importantPoints: [
      "Connectivity service's core purpose is the on-prem Cloud Connector tunnel.",
      "Cloud-to-cloud calls just need ProxyType: Internet, no tunnel/Connectivity service needed.",
      "Only bind Connectivity service if the app genuinely needs on-prem reachability.",
    ],
    revisionNotes: "Connectivity service = on-prem tunnel only. Cloud-to-cloud calls use ProxyType: Internet directly, no Connectivity service needed.",
  },
  {
    id: "conn-q8",
    topic: "Principal Propagation",
    prompt: "What has to be configured on BOTH the BTP side and the on-premise side to make principal propagation actually work end-to-end?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["principal-propagation", "configuration"],
    estimatedMinutes: 3,
    expectedAnswer:
      "On the BTP side, the destination must be configured with Authentication: PrincipalPropagation; on the on-premise side, the Cloud Connector must have principal propagation enabled for that system mapping, and the on-prem backend itself must trust the certificate authority issuing the propagated identity certificates.",
    detailedAnswer:
      "This is a genuinely multi-step configuration, and missing any one piece silently breaks it. On BTP, the destination pointing to the on-prem system needs its `Authentication` property set to `PrincipalPropagation` (not Basic or another type). On the Cloud Connector side, the specific backend mapping needs principal propagation explicitly enabled — it's not automatic just because the tunnel exists. And critically, the on-premise backend system itself (e.g. an ABAP system's trust configuration) needs to trust the certificate authority that issues the short-lived client certificates BTP generates to represent the propagated user — without this trust relationship configured on the receiving system, it will reject or ignore the propagated identity entirely, often failing silently or falling back to an anonymous/technical user rather than throwing an obvious error.",
    hindiExplanation:
      "Ye ek genuinely multi-step configuration hai, aur koi bhi ek piece miss hone se ye silently break ho jaata hai. BTP pe, on-prem system ko point karne wale destination ka `Authentication` property `PrincipalPropagation` pe set hona chahiye (Basic ya kisi aur type pe nahi). Cloud Connector side pe, specific backend mapping mein principal propagation explicitly enable hona chahiye — ye automatic nahi hai sirf tunnel exist karne se. Aur critically, on-premise backend system khud (jaise ek ABAP system ki trust configuration) ko us certificate authority ko trust karna chahiye jo BTP dwara generate short-lived client certificates issue karta hai — is trust relationship ke bina receiving system pe, wo propagated identity ko reject ya ignore kar dega, aksar silently fail hoke ya anonymous/technical user pe fallback karke, obvious error throw kiye bina.",
    interviewExplanation:
      "I'd walk through all three required pieces: 'On BTP, the destination's Authentication property must be set to PrincipalPropagation specifically. On the Cloud Connector, that backend mapping needs principal propagation explicitly enabled — it's not automatic. And on the on-prem system itself, its trust configuration must trust the certificate authority issuing BTP's propagated identity certificates — missing this often fails silently, falling back to an anonymous or technical user instead of an obvious error.'",
    diagramNote:
      "Three required pieces: 'BTP destination: Authentication = PrincipalPropagation' + 'Cloud Connector: propagation enabled on backend mapping' + 'On-prem system: trusts the certificate authority' — all three required, or it silently fails.",
    diagramMermaid: `flowchart TD
    A["BTP destination:<br/>Authentication = PrincipalPropagation"] --> D["Principal propagation works"]
    B["Cloud Connector:<br/>propagation enabled on mapping"] --> D
    C["On-prem system:<br/>trusts the issuing CA"] --> D`,
    realProjectExample:
      "Principal propagation silently fell back to an anonymous technical user for weeks before we discovered the Cloud Connector's backend mapping simply never had principal propagation explicitly enabled — the destination and on-prem trust store were both configured correctly, but that one missing piece broke the whole chain.",
    interviewTip:
      "This is a strong scenario question to answer with 'here are the three specific places to check', rather than a vague 'make sure it's configured correctly' — naming all three pieces shows real troubleshooting depth.",
    followupQuestions: [
      "What's the specific symptom when principal propagation silently falls back to a technical user?",
      "How would you verify each of the three configuration pieces independently?",
      "Does every on-prem system type support receiving a propagated principal identity?",
    ],
    commonMistakes: [
      "Assuming setting the destination's Authentication type alone is sufficient for principal propagation to work.",
      "Not knowing Cloud Connector requires explicit per-mapping enablement, separate from the destination configuration.",
    ],
    importantPoints: [
      "BTP destination: Authentication = PrincipalPropagation.",
      "Cloud Connector: propagation explicitly enabled on the specific backend mapping.",
      "On-prem system: must trust the certificate authority issuing propagated identity certs.",
    ],
    revisionNotes: "Principal propagation needs 3 pieces: BTP destination auth type + Cloud Connector mapping enablement + on-prem trust of the issuing CA. Missing any = silent failure/fallback.",
  },
  {
    id: "conn-q9",
    topic: "Destination Service",
    prompt: "How would you configure a destination differently for calling an OData V2 on-prem service versus a plain REST endpoint?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["destination-service", "odata"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Set the destination's `Type` to `HTTP` in both cases, but for OData specifically you'd typically add `WebIDEUsage` and `sap-client` properties (and possibly `odata_version` metadata) so BTP tooling knows to treat it as an OData service — a plain REST endpoint doesn't need these OData-specific hints.",
    detailedAnswer:
      "Both OData and plain REST destinations use `Type: HTTP` as the base type, since both are HTTP-based. The difference is in additional properties: an OData destination commonly includes `sap-client` (identifying the ABAP client/mandant for SAP backends), `WebIDEUsage: odata_gen` (a hint for design-time tooling like SAP Business Application Studio to recognize it as an OData source for generating consuming apps), and sometimes explicit OData version metadata. A plain REST destination typically omits these SAP/OData-specific properties entirely, since there's no client concept or OData-specific tooling integration needed for a generic REST API.",
    hindiExplanation:
      "OData aur plain REST dono destinations `Type: HTTP` base type use karte hain, kyunki dono HTTP-based hain. Difference additional properties mein hai: ek OData destination commonly `sap-client` include karta hai (ABAP client/mandant identify karne ke liye SAP backends ke liye), `WebIDEUsage: odata_gen` (design-time tooling jaise SAP Business Application Studio ke liye ek hint ki ise OData source ki tarah recognize kare consuming apps generate karne ke liye), aur kabhi kabhi explicit OData version metadata. Ek plain REST destination typically in SAP/OData-specific properties ko entirely omit karta hai.",
    interviewExplanation:
      "I'd explain the shared base and the extra hints: 'Both use Type: HTTP as the base. An OData destination adds SAP-specific hints — sap-client for the ABAP mandant, and WebIDEUsage: odata_gen so design-time tooling like Business Application Studio recognizes it as an OData source for generating consuming apps. A plain REST destination just omits all these OData-specific properties.'",
    diagramNote:
      "'OData destination: Type=HTTP + sap-client + WebIDEUsage=odata_gen' vs 'Plain REST destination: Type=HTTP only, no SAP/OData-specific properties'.",
    diagramMermaid: `flowchart LR
    A["OData destination"] --> B["Type=HTTP + sap-client<br/>+ WebIDEUsage=odata_gen"]
    C["Plain REST destination"] --> D["Type=HTTP only"]`,
    realProjectExample:
      "Adding the WebIDEUsage=odata_gen property to an existing destination let SAP Business Application Studio automatically recognize it as a valid OData source when generating a new Fiori app, something a plain REST-configured destination wouldn't have offered.",
    interviewTip:
      "If asked how tooling knows a destination is an OData source specifically, naming WebIDEUsage as the specific property is more convincing than a vague 'it's just configured differently'.",
    followupQuestions: [
      "What does sap-client actually represent in an ABAP system?",
      "What other WebIDEUsage values exist besides odata_gen?",
      "Would a destination need different properties again for calling an SAP RFC-enabled function module?",
    ],
    commonMistakes: [
      "Assuming OData destinations require a fundamentally different Type value from REST destinations.",
      "Not knowing WebIDEUsage is specifically a tooling hint, not something affecting the actual runtime call.",
    ],
    importantPoints: [
      "Both OData and REST destinations use Type: HTTP as the base.",
      "OData destinations add SAP-specific hints like sap-client and WebIDEUsage: odata_gen.",
      "These extra properties primarily help design-time tooling recognize and consume the service correctly.",
    ],
    revisionNotes: "OData and REST destinations both use Type=HTTP. OData adds sap-client + WebIDEUsage=odata_gen for tooling recognition — REST omits these SAP-specific hints.",
  },
  {
    id: "conn-q10",
    topic: "Destination Service",
    prompt: "How would you troubleshoot a destination that connects fine from Postman/curl but fails when called from your CAP application?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["destination-service", "troubleshooting"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Check whether the destination service instance is actually bound to the CAP app (not just configured in the cockpit), verify the app is requesting the destination by the correct exact name at runtime, and confirm the app's own runtime identity has the necessary read access to the destination configuration — a working Postman test only proves the destination/target itself is reachable, not that the app's binding and code are wired correctly.",
    detailedAnswer:
      "A successful Postman/curl test typically means you've manually supplied a valid token/credential directly against the target — it proves the target system and its credentials work, but says nothing about whether your app's actual runtime binding to the Destination service is correct. Common gaps: the destination service instance was created in the cockpit but never actually bound to the CAP app in its deployment manifest; the app's code requests a destination by a slightly different name than what's actually configured (a simple typo); or the app's own service binding doesn't have sufficient read permissions on the destination configuration. Since Postman bypasses all of this app-specific wiring entirely, its success doesn't rule out any of these app-side configuration gaps.",
    hindiExplanation:
      "Ek successful Postman/curl test typically matlab hai tumne manually ek valid token/credential directly target ke against supply kiya — ye prove karta hai target system aur uske credentials kaam karte hain, lekin ye kuch nahi batata ki tumhari app ki actual runtime binding Destination service se sahi hai ya nahi. Common gaps: destination service instance cockpit mein create hua tha lekin actually CAP app se bind nahi hua deployment manifest mein; app ka code destination ko thodi different naam se request karta hai jo actually configured hai (simple typo); ya app ki apni service binding ke paas destination configuration pe sufficient read permissions nahi hain.",
    interviewExplanation:
      "I'd explain what a Postman success actually proves versus doesn't: 'A Postman success proves the target and its credentials work, but says nothing about my app's actual runtime binding. I'd check: is the destination service instance actually bound to the app in its deployment manifest? Is the app requesting the destination by the exact correct name — a common typo source? Does the app's own binding have sufficient read access to the destination config? Postman bypasses all this app-specific wiring entirely.'",
    diagramNote:
      "'Postman success: proves target + credentials work directly' vs 'App failure: check binding actually exists, exact destination name match, app's read permission on destination config' — Postman doesn't rule these out.",
    diagramMermaid: `flowchart TD
    A["Postman success"] --> B["Proves target + credentials work"]
    C["App failure — check:"] --> D["Is destination service<br/>actually bound to app?"]
    C --> E["Is destination name<br/>exactly correct in code?"]
    C --> F["Does app binding have<br/>read access to destination config?"]`,
    realProjectExample:
      "A destination that worked perfectly in Postman failed from the CAP app because the destination service instance had been created but never actually added to the app's deployment manifest bindings — adding the binding fixed it immediately with no other changes needed.",
    interviewTip:
      "If asked to debug this exact scenario, immediately distinguishing 'Postman proves the target works' from 'the app's own binding/wiring is a separate thing to verify' shows precise troubleshooting instinct rather than re-testing the same thing that already worked.",
    followupQuestions: [
      "How would you verify a destination service instance is actually bound to an app?",
      "What error message would you typically see if the destination name doesn't match exactly?",
      "How would you check the app's runtime read permissions on the destination configuration?",
    ],
    commonMistakes: [
      "Re-testing the destination externally (Postman) repeatedly instead of checking the app's own binding configuration.",
      "Not considering a simple naming mismatch between the configured destination and what the code requests.",
    ],
    importantPoints: [
      "A working Postman/curl test only proves the target and credentials work, not the app's binding.",
      "Check the destination service instance is actually bound to the app's deployment.",
      "Verify the exact destination name match and the app's read permissions on the configuration.",
    ],
    revisionNotes: "Postman success ≠ app wiring correct. Check: destination service actually bound to app, exact name match in code, app's read access to destination config.",
  },
  {
    id: "conn-q11",
    topic: "Cloud Connector",
    prompt: "Can you run multiple Cloud Connector instances for high availability, and how does BTP know which one to use?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["cloud-connector", "high-availability"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — Cloud Connector supports a high-availability shadow instance configuration, where a secondary instance stays synchronized with the primary and automatically takes over if the primary becomes unavailable; BTP-side destinations reference a 'location ID' rather than a specific Cloud Connector instance, letting the failover happen transparently.",
    detailedAnswer:
      "A single Cloud Connector instance would be a single point of failure for all on-prem connectivity — if it goes down, every on-prem call fails until it's restored. Cloud Connector supports a master-shadow high-availability setup: a shadow instance continuously syncs configuration from the master and can take over the tunnel connection if the master becomes unreachable. On the BTP side, destinations don't hardcode a reference to one specific Cloud Connector instance — they reference a 'Cloud Connector Location ID', an abstraction that lets whichever instance (master or shadow) is currently active handle the tunnel, making the failover transparent to the calling application without any destination reconfiguration needed.",
    hindiExplanation:
      "Ek single Cloud Connector instance saare on-prem connectivity ke liye ek single point of failure hoga — agar wo down ho jaaye, har on-prem call fail ho jaati hai jab tak wo restore nahi hoti. Cloud Connector ek master-shadow high-availability setup support karta hai: ek shadow instance continuously master se configuration sync karta hai aur tunnel connection le sakta hai agar master unreachable ho jaaye. BTP side pe, destinations ek specific Cloud Connector instance ko hardcode reference nahi karte — wo ek 'Cloud Connector Location ID' reference karte hain, ek abstraction jo currently active instance (master ya shadow) ko tunnel handle karne deta hai.",
    interviewExplanation:
      "I'd confirm the HA support and the abstraction mechanism: 'Yes — Cloud Connector supports a master-shadow high-availability setup, where a shadow instance stays synced and takes over if the master goes down. On the BTP side, destinations reference a Cloud Connector Location ID rather than a specific instance, so failover is transparent — the calling app never needs reconfiguration when the shadow takes over.'",
    diagramNote:
      "'Master Cloud Connector' + 'Shadow Cloud Connector (synced)' → BTP destination references 'Location ID' (abstraction) → if master fails 'shadow takes over transparently, no destination reconfiguration needed'.",
    diagramMermaid: `flowchart TD
    A["Master Cloud Connector"] --> C["BTP destination:<br/>references Location ID"]
    B["Shadow Cloud Connector<br/>synced, standby"] --> C
    C --> D["Failover is transparent —<br/>no reconfiguration needed"]`,
    realProjectExample:
      "A production landscape configured a shadow Cloud Connector instance in a separate availability zone, which automatically took over when the master instance's host had an unplanned outage, with zero application-side impact or reconfiguration needed.",
    interviewTip:
      "If asked about single points of failure in an on-prem connectivity design, naming the Cloud Connector's master-shadow HA capability specifically (not just 'add redundancy somehow') shows real platform-specific knowledge.",
    followupQuestions: [
      "What exactly gets synchronized between master and shadow Cloud Connector instances?",
      "How quickly does failover typically happen if the master becomes unreachable?",
      "Would you need separate on-prem network access configured for the shadow instance too?",
    ],
    commonMistakes: [
      "Assuming a Cloud Connector instance is an unavoidable single point of failure with no HA option.",
      "Not knowing destinations reference a Location ID abstraction rather than a specific Cloud Connector instance.",
    ],
    importantPoints: [
      "Cloud Connector supports master-shadow high-availability configuration.",
      "The shadow instance stays synced and can take over if the master becomes unreachable.",
      "BTP destinations reference a Location ID abstraction, making failover transparent.",
    ],
    revisionNotes: "Cloud Connector HA = master-shadow setup, shadow takes over on master failure. BTP destinations reference a Location ID abstraction — failover is transparent, no reconfiguration needed.",
  },
  {
    id: "conn-q12",
    topic: "Cloud Connector",
    prompt: "What would you check if a Cloud Connector's tunnel shows as 'connected' but calls through it still time out?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["cloud-connector", "troubleshooting"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Verify the specific backend mapping (host/port/path whitelist) actually matches what's being requested, confirm the on-prem backend system itself is reachable from the Cloud Connector's own network position (not just that the tunnel to BTP is up), and check the Cloud Connector's own access logs for what's happening to the forwarded request specifically.",
    detailedAnswer:
      "A 'connected' tunnel status only confirms the Cloud Connector-to-BTP link itself is healthy — it says nothing about whether the specific backend mapping being requested is correctly configured, or whether the on-prem backend system is actually reachable from wherever the Cloud Connector itself sits on the internal network. Troubleshooting should check: does the backend mapping's configured host/port/path actually match what the destination is requesting (a mismatch would cause the Cloud Connector to reject or fail to route the request even with a healthy tunnel); can the Cloud Connector itself reach the target backend system over the internal network (a firewall or network issue between the Cloud Connector and the actual backend, separate from the BTP-facing tunnel, could cause exactly this symptom); and what do the Cloud Connector's own access/audit logs show for that specific request — they'll typically reveal exactly where in the chain the request is failing or timing out.",
    hindiExplanation:
      "Ek 'connected' tunnel status sirf ye confirm karta hai ki Cloud Connector-to-BTP link khud healthy hai — ye kuch nahi batata ki specific backend mapping jo request ho raha hai sahi se configured hai ya nahi, ya on-prem backend system actually reachable hai ya nahi jahan bhi Cloud Connector khud internal network pe baitha hai. Troubleshooting check karna chahiye: kya backend mapping ka configured host/port/path actually match karta hai jo destination request kar raha hai; kya Cloud Connector khud target backend system tak internal network pe pahunch sakta hai; aur Cloud Connector ke apne access/audit logs us specific request ke liye kya dikhate hain.",
    interviewExplanation:
      "I'd walk through what 'connected' does and doesn't prove: 'A connected status only confirms the Cloud Connector-to-BTP tunnel itself is healthy — it says nothing about the specific backend mapping or whether the backend is actually reachable from the Cloud Connector's own network position. I'd check the backend mapping's host/port/path matches what's requested, verify the Cloud Connector can reach the actual backend over the internal network, and check its access logs for exactly where the request is failing.'",
    diagramNote:
      "'Tunnel status: connected (BTP↔Cloud Connector link healthy)' — but separately check: 'backend mapping match', 'Cloud Connector → actual backend reachability (internal network)', 'Cloud Connector access logs' — any of these could cause timeouts despite a healthy tunnel.",
    diagramMermaid: `flowchart TD
    A["Tunnel status: connected<br/>BTP↔Cloud Connector link healthy"] -.->|"doesn't guarantee"| B["Backend mapping<br/>host/port/path match?"]
    A -.-> C["Cloud Connector → backend<br/>reachable internally?"]
    A -.-> D["Cloud Connector access logs<br/>show where it's failing"]`,
    realProjectExample:
      "A tunnel showing healthy 'connected' status masked the real issue — an internal firewall change had blocked the Cloud Connector's own network path to the actual backend system, which was only discovered by checking the Cloud Connector's own access logs showing repeated connection timeouts to that specific backend.",
    interviewTip:
      "If asked to debug this scenario, explicitly stating that 'connected' status doesn't rule out a downstream backend-reachability issue (a distinct network hop) demonstrates a precise mental model of the whole chain, not just the BTP-facing piece.",
    followupQuestions: [
      "Where would you find the Cloud Connector's own access/audit logs?",
      "What's the difference between a tunnel connectivity issue and a backend mapping issue, symptom-wise?",
      "How would you test backend reachability directly from the Cloud Connector's host machine?",
    ],
    commonMistakes: [
      "Assuming a healthy tunnel status rules out any connectivity problem in the whole chain.",
      "Not checking the Cloud Connector's own access logs, which typically pinpoint exactly where a request fails.",
    ],
    importantPoints: [
      "'Connected' tunnel status only confirms the BTP-to-Cloud-Connector link, not the whole chain.",
      "Check backend mapping accuracy and Cloud-Connector-to-backend network reachability separately.",
      "Cloud Connector's own access logs typically pinpoint exactly where a request is failing.",
    ],
    revisionNotes: "Tunnel 'connected' only proves the BTP↔Cloud Connector link. Also check backend mapping match, Cloud Connector→backend network reachability, and Cloud Connector access logs for the real failure point.",
  },
  {
    id: "conn-q13",
    topic: "On Premise",
    prompt: "Would you use ProxyType: OnPremise for a system hosted in a private cloud/VPC that BTP can't directly reach over the public internet, even if it's not a traditional 'on-premise data center'?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["on-premise", "private-cloud"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — 'OnPremise' in this context really means 'not directly internet-reachable, requires a Cloud Connector tunnel', regardless of whether the system physically sits in a traditional data center or a private cloud/VPC network; the terminology is historical, but the actual criterion is network reachability, not physical location.",
    detailedAnswer:
      "The name 'OnPremise' is a bit of a historical artifact from when this pattern was primarily about connecting to traditional corporate data centers, but the actual technical criterion for using it is simply: 'is this system directly reachable from the public internet, or does reaching it require going through a private network boundary that BTP has no direct path into?' A system in a private VPC with no public endpoint faces exactly the same reachability problem as a traditional on-prem system — BTP has no direct network path to it, so the same Cloud Connector tunnel solution applies, using `ProxyType: OnPremise` regardless of the target not being a literal physical data center.",
    hindiExplanation:
      "'OnPremise' naam thoda sa historical artifact hai jab ye pattern primarily traditional corporate data centers se connect karne ke baare mein tha, lekin actual technical criterion use karne ke liye simply ye hai: 'kya ye system directly public internet se reachable hai, ya reach karne ke liye ek private network boundary se guzarna padta hai jahan BTP ka koi direct path nahi hai?' Ek private VPC mein system jiske paas koi public endpoint nahi hai, exactly wahi reachability problem face karta hai jo ek traditional on-prem system karta hai — BTP ke paas uske liye koi direct network path nahi hai, isliye same Cloud Connector tunnel solution apply hota hai.",
    interviewExplanation:
      "I'd correct the terminology assumption directly: 'OnPremise here really means \"not directly internet-reachable, needs a Cloud Connector tunnel\" — the name is a bit of a historical artifact. The actual criterion is network reachability, not physical location. A system in a private VPC with no public endpoint faces the exact same problem as a traditional data center system, so yes, you'd use ProxyType: OnPremise and a Cloud Connector regardless of it not being a literal physical data center.'",
    diagramNote:
      "'Criterion: is the system directly internet-reachable?' → No (whether traditional data center OR private cloud/VPC) → 'ProxyType: OnPremise + Cloud Connector tunnel needed either way'.",
    diagramMermaid: `flowchart TD
    A["Is the system directly<br/>internet-reachable?"] -->|"No — traditional data center"| B["ProxyType: OnPremise<br/>+ Cloud Connector needed"]
    A -->|"No — private cloud/VPC"| B`,
    realProjectExample:
      "A backend service hosted in a private VPC on a different cloud provider, with no public endpoint, was connected to via a Cloud Connector installed inside that VPC's network, using ProxyType: OnPremise exactly as if it were a traditional data center system — the pattern applied identically.",
    interviewTip:
      "If asked whether Cloud Connector is 'only for traditional on-prem data centers', correcting this misconception — it's about network reachability, not literal physical premises — shows a more accurate, criterion-based understanding.",
    followupQuestions: [
      "Could a Cloud Connector be installed inside a VPC on a different public cloud provider?",
      "What would make a private-cloud-hosted system NOT need a Cloud Connector?",
      "Is there a performance difference calling a nearby private cloud system through Cloud Connector versus a traditional distant data center?",
    ],
    commonMistakes: [
      "Assuming ProxyType: OnPremise strictly applies only to literal, traditional physical data centers.",
      "Not recognizing that the real criterion is network reachability, not the target's physical hosting location.",
    ],
    importantPoints: [
      "'OnPremise' terminology is historical; the real criterion is direct internet reachability, not physical location.",
      "Any system not directly internet-reachable needs the same Cloud Connector tunnel pattern.",
      "This applies equally to private cloud/VPC-hosted systems as to traditional data centers.",
    ],
    revisionNotes: "'OnPremise' really means 'not directly internet-reachable' — applies to private cloud/VPC systems too, not just literal traditional data centers. Criterion is reachability, not physical location.",
  },
  {
    id: "conn-q14",
    topic: "On Premise",
    prompt: "How would you migrate a destination from ProxyType: OnPremise to ProxyType: Internet if the target system is moved to a publicly reachable cloud endpoint?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["on-premise", "migration"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Update the destination's ProxyType to Internet and replace the virtual hostname URL with the system's real, publicly reachable URL — the Cloud Connector-specific properties (like CloudConnectorLocationId) become irrelevant and should be removed, since the call no longer routes through the tunnel at all.",
    detailedAnswer:
      "Once a system becomes directly internet-reachable, the whole Cloud Connector tunnel mechanism is no longer needed for it, so the destination configuration changes fundamentally, not just cosmetically: `ProxyType` changes from `OnPremise` to `Internet`, the `URL` changes from a virtual hostname meaningful only to a Cloud Connector to the system's actual public URL, and Cloud-Connector-specific properties (like `CloudConnectorLocationId`) become meaningless and should be removed rather than left as unused leftover configuration. Depending on the target's actual authentication requirements, the `Authentication` property might also need to change (e.g. from PrincipalPropagation, which is specifically an on-prem/Cloud-Connector mechanism, to a standard OAuth2 or Basic auth type appropriate for direct internet calls).",
    hindiExplanation:
      "Ek baar system directly internet-reachable ban jaaye, poora Cloud Connector tunnel mechanism uske liye zaroori nahi rehta, isliye destination configuration fundamentally change hoti hai, sirf cosmetically nahi: `ProxyType` `OnPremise` se `Internet` mein badalta hai, `URL` ek virtual hostname se system ke actual public URL mein badalta hai, aur Cloud-Connector-specific properties (jaise `CloudConnectorLocationId`) meaningless ho jaati hain aur remove kar deni chahiye. Target ke actual authentication requirements ke depend karte hue, `Authentication` property bhi change ho sakti hai (jaise PrincipalPropagation se, jo specifically ek on-prem/Cloud-Connector mechanism hai, ek standard OAuth2 ya Basic auth type mein jo direct internet calls ke liye appropriate ho).",
    interviewExplanation:
      "I'd describe it as a fundamental config change, not cosmetic: 'ProxyType changes from OnPremise to Internet, the URL changes from a virtual hostname to the system's actual public URL, and Cloud-Connector-specific properties like CloudConnectorLocationId become meaningless and should be removed. Depending on the target's auth requirements, the Authentication type might also need to change — PrincipalPropagation is specifically an on-prem mechanism, so it'd likely move to something like OAuth2 for a direct internet call.'",
    diagramNote:
      "'Before: ProxyType=OnPremise, virtual hostname URL, CloudConnectorLocationId set' → 'After: ProxyType=Internet, real public URL, CloudConnectorLocationId removed, Authentication type reconsidered'.",
    diagramMermaid: `flowchart LR
    A["Before: OnPremise,<br/>virtual hostname, LocationId set"] --> B["After: Internet,<br/>real public URL, LocationId removed"]`,
    realProjectExample:
      "Migrating an on-prem ERP system to a cloud-hosted, publicly reachable instance required updating its destination's ProxyType, replacing the virtual hostname with the new public URL, removing the now-meaningless CloudConnectorLocationId, and switching Authentication from PrincipalPropagation to OAuth2ClientCredentials appropriate for the new setup.",
    interviewTip:
      "If asked to plan this migration, mentioning all the fields that need to change (not just ProxyType) shows you understand this is a fundamentally different configuration, not a one-property tweak.",
    followupQuestions: [
      "Would principal propagation still be possible after this migration, or would it need to be redesigned?",
      "How would you test the new destination configuration before fully decommissioning the old on-prem path?",
      "What would happen if you forgot to remove the CloudConnectorLocationId property after the migration?",
    ],
    commonMistakes: [
      "Only changing ProxyType and leaving the virtual hostname or Cloud-Connector-specific properties in place.",
      "Not reconsidering the Authentication type, which may no longer be appropriate after removing the on-prem tunnel.",
    ],
    importantPoints: [
      "ProxyType, URL, and Cloud-Connector-specific properties all need updating together, not just ProxyType alone.",
      "The Authentication type may also need reconsidering, since PrincipalPropagation is on-prem-specific.",
      "This is a fundamental reconfiguration, not a cosmetic one-field change.",
    ],
    revisionNotes: "Migrating OnPremise→Internet destination: change ProxyType, replace virtual hostname with real public URL, remove Cloud-Connector-specific properties, reconsider Authentication type.",
  },
  {
    id: "conn-q15",
    topic: "Proxy",
    prompt: "If an attacker compromised the Cloud Connector itself, what's the actual blast radius, given its reverse-proxy role?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["proxy", "security-blast-radius"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The blast radius is limited to exactly the backends/ports/paths the Cloud Connector has been explicitly configured to reach and expose — a compromised Cloud Connector doesn't automatically grant an attacker access to the entire internal network, only to whatever its own whitelisted mappings allow, though this is still a meaningful exposure worth taking seriously.",
    detailedAnswer:
      "Because the Cloud Connector's own configuration explicitly whitelists specific backends/ports/paths (as covered in its access-control design), a compromise of the Cloud Connector itself is bounded by that same whitelist — an attacker controlling it could abuse exactly those whitelisted mappings, potentially reaching backend systems and paths that were intentionally exposed, but wouldn't automatically gain access to arbitrary other internal systems that were never configured into the Cloud Connector's mappings at all. That said, this is still a genuinely serious compromise (full control over whatever WAS whitelisted, potential to abuse valid credentials/certificates it holds, and a foothold inside the trusted network), so 'limited blast radius' doesn't mean 'not a serious incident' — it means the exposure is bounded by configuration, not unlimited.",
    hindiExplanation:
      "Kyunki Cloud Connector ki apni configuration explicitly specific backends/ports/paths whitelist karti hai, khud Cloud Connector ka compromise usi whitelist se bounded hota hai — ek attacker jo use control karta hai exactly un whitelisted mappings ko abuse kar sakta hai, potentially un backend systems aur paths tak pahunch sakta hai jo intentionally expose kiye gaye the, lekin automatically arbitrary doosre internal systems tak access nahi paayega jo kabhi Cloud Connector ki mappings mein configure hi nahi hue the. Phir bhi, ye still ek genuinely serious compromise hai, isliye 'limited blast radius' ka matlab 'serious incident nahi' nahi hai — iska matlab hai exposure configuration se bounded hai, unlimited nahi.",
    interviewExplanation:
      "I'd give the nuanced, bounded-but-still-serious answer: 'The blast radius is bounded by whatever the Cloud Connector was explicitly configured to reach — an attacker controlling it could abuse exactly those whitelisted mappings, but wouldn't automatically gain access to arbitrary other internal systems never configured into it. That said, this is still a genuinely serious compromise — full control over whatever WAS whitelisted, and a foothold inside the trusted network — so bounded doesn't mean minor.'",
    diagramNote:
      "'Cloud Connector compromised' → attacker gets: 'access to exactly whitelisted backends/ports/paths' — NOT 'automatic access to entire internal network (never configured mappings stay unreachable)' — still a serious incident.",
    diagramMermaid: `flowchart TD
    A["Cloud Connector compromised"] --> B["Attacker gets access to<br/>exactly whitelisted mappings"]
    A -.->|"NOT automatic"| C["Access to entire<br/>internal network"]
    B --> D["Still a serious incident —<br/>bounded, not minor"]`,
    realProjectExample:
      "A tabletop security exercise modeling a Cloud Connector compromise concluded the attacker would gain access to two specific whitelisted backend APIs but not the broader internal network — still prompting a decision to further narrow the whitelisted URL paths to reduce even that bounded exposure.",
    interviewTip:
      "If asked to assess the risk of a Cloud Connector compromise, giving the nuanced 'bounded by configuration, but still a serious incident' answer shows more mature security thinking than either 'it's fine, blast radius is small' or 'it's catastrophic, the whole network is exposed'.",
    followupQuestions: [
      "What credentials or certificates does a compromised Cloud Connector actually hold that an attacker could abuse?",
      "How would you detect that a Cloud Connector has been compromised?",
      "Would narrowing the whitelist configuration reduce this risk further, and what's the tradeoff?",
    ],
    commonMistakes: [
      "Assuming a Cloud Connector compromise automatically exposes the entire internal network.",
      "Dismissing a Cloud Connector compromise as low-risk just because the blast radius is bounded.",
    ],
    importantPoints: [
      "A Cloud Connector compromise's blast radius is bounded by its own whitelisted mappings.",
      "It does NOT automatically grant access to the entire internal network.",
      "Still a genuinely serious incident — bounded exposure isn't the same as minor exposure.",
    ],
    revisionNotes: "Cloud Connector compromise blast radius = bounded by its whitelisted mappings, NOT the whole internal network — but still a serious incident, not minor.",
  },
  {
    id: "conn-q16",
    topic: "Certificates",
    prompt: "What would you monitor to catch a Cloud Connector's tunnel or client certificate before it expires unexpectedly?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["certificates", "monitoring"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Proactively track certificate expiry dates (via the Cloud Connector's own administration UI or automated monitoring/alerting) well before the actual expiry date, since an expired certificate causes the tunnel or principal propagation to fail — often abruptly and without much advance warning if not monitored proactively.",
    detailedAnswer:
      "Certificates used for the tunnel's mutual authentication and for principal propagation both have expiry dates, and an expired certificate causes an abrupt failure — the tunnel disconnects or principal propagation stops working entirely, exactly at the expiry moment, with no gradual degradation warning. Proactive monitoring should track these expiry dates well in advance (the Cloud Connector's administration UI typically surfaces certificate validity information), ideally with automated alerting at some meaningful lead time (weeks, not days) before expiry, so renewal can happen calmly and planned rather than as an emergency incident response after connectivity has already broken in production.",
    hindiExplanation:
      "Tunnel ki mutual authentication aur principal propagation dono ke liye use hone wale certificates expiry dates rakhte hain, aur ek expired certificate ek abrupt failure cause karta hai — tunnel disconnect ho jaata hai ya principal propagation kaam karna band kar deta hai entirely, exactly expiry moment pe, koi gradual degradation warning ke bina. Proactive monitoring ko in expiry dates ko well in advance track karna chahiye, ideally automated alerting ke saath kuch meaningful lead time pe (weeks, days nahi) expiry se pehle, taaki renewal calmly aur planned tarike se ho sake, ek emergency incident response ki jagah jab connectivity already production mein break ho chuki ho.",
    interviewExplanation:
      "I'd emphasize the abrupt-failure nature and the need for lead time: 'Certificate expiry causes an abrupt failure with no gradual warning — the tunnel or principal propagation just stops at expiry. I'd proactively track expiry dates, typically visible in the Cloud Connector's admin UI, with automated alerting at a meaningful lead time — weeks, not days — before expiry, so renewal is a calm, planned activity rather than an emergency after production connectivity has already broken.'",
    diagramNote:
      "'Certificate expiry date' → without monitoring: 'Abrupt failure at expiry, no warning' vs with monitoring: 'Proactive alert weeks in advance → calm, planned renewal'.",
    diagramMermaid: `flowchart LR
    A["Certificate expiry date"] -->|"No monitoring"| B["Abrupt failure at expiry"]
    A -->|"Proactive monitoring"| C["Alert weeks in advance<br/>calm, planned renewal"]`,
    realProjectExample:
      "A production incident caused by an expired Cloud Connector certificate that nobody had been tracking led to configuring automated expiry alerting several weeks in advance going forward, turning subsequent renewals into non-events instead of fire drills.",
    interviewTip:
      "If asked how you'd prevent a certificate-expiry-related outage, describing proactive alerting with meaningful lead time (not just 'renew certificates when they expire') shows an operationally mature approach.",
    followupQuestions: [
      "Where specifically in the Cloud Connector admin UI would you check certificate validity?",
      "How would you automate alerting on certificate expiry dates?",
      "What's the actual renewal process once you're alerted a certificate is nearing expiry?",
    ],
    commonMistakes: [
      "Not proactively monitoring certificate expiry at all, discovering the problem only after an outage.",
      "Setting alerting lead time too short (days) to allow for calm, planned renewal.",
    ],
    importantPoints: [
      "Certificate expiry causes an abrupt failure with no gradual warning.",
      "Proactively track expiry dates via the Cloud Connector's admin UI or automated monitoring.",
      "Alert with meaningful lead time (weeks) to allow calm, planned renewal rather than emergency response.",
    ],
    revisionNotes: "Certificate expiry = abrupt failure, no warning. Proactively monitor expiry dates (Cloud Connector admin UI) with alerting weeks in advance for calm, planned renewal.",
  },
  {
    id: "conn-q17",
    topic: "Connectivity Service",
    prompt: "Does binding a Connectivity service instance to an app automatically grant it access to every on-prem system reachable via any Cloud Connector in the subaccount?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["connectivity-service", "scope-of-access"],
    estimatedMinutes: 2,
    expectedAnswer:
      "No — binding the Connectivity service only gives the app the ability to use the tunnel infrastructure at all; which specific on-prem systems it can actually reach still depends entirely on which destinations exist and reference which Cloud Connector location, plus what that Cloud Connector's own configuration whitelists — binding Connectivity service alone grants no automatic reach to anything.",
    detailedAnswer:
      "The Connectivity service binding is a prerequisite/enabler, not a grant of access itself — it lets the app's runtime use the underlying tunnel mechanism at all, but doesn't by itself specify which on-prem systems or paths are reachable. Actual reachability is determined by a combination of: which destinations exist and are configured with `ProxyType: OnPremise` (and which specific Cloud Connector location they reference), and what that particular Cloud Connector instance's own configuration has whitelisted (backend hosts/ports/paths). An app with the Connectivity service bound but zero relevant destinations configured, or with destinations pointing at a Cloud Connector location that doesn't whitelist what it's asking for, would still have no actual reach to those systems — the binding alone is necessary but far from sufficient.",
    hindiExplanation:
      "Connectivity service binding ek prerequisite/enabler hai, khud ek access grant nahi hai — ye app ke runtime ko underlying tunnel mechanism use karne deta hai at all, lekin khud se ye specify nahi karta ki kaunse on-prem systems ya paths reachable hain. Actual reachability ek combination se determine hoti hai: kaunse destinations exist karte hain aur `ProxyType: OnPremise` se configured hain (aur kaunsa specific Cloud Connector location wo reference karte hain), aur us particular Cloud Connector instance ki apni configuration ne kya whitelist kiya hai.",
    interviewExplanation:
      "I'd clarify it's necessary but not sufficient: 'No — the Connectivity service binding is just a prerequisite, enabling the app to use the tunnel mechanism at all. Actual reachability comes from a combination of which destinations exist with ProxyType: OnPremise, which Cloud Connector location they reference, and what that Cloud Connector's own configuration has whitelisted. An app with Connectivity bound but no relevant destinations, or destinations pointing at a location that doesn't whitelist the target, would still have zero actual reach.'",
    diagramNote:
      "'Connectivity service bound: necessary but NOT sufficient' + 'Destination exists (ProxyType: OnPremise, references a location)' + 'Cloud Connector at that location whitelists the specific target' → only ALL THREE together = actual reachability.",
    diagramMermaid: `flowchart TD
    A["Connectivity service bound<br/>necessary but not sufficient"] --> D["Actual reachability"]
    B["Destination exists,<br/>references a location"] --> D
    C["Cloud Connector at that location<br/>whitelists the target"] --> D`,
    realProjectExample:
      "An app had the Connectivity service bound from initial project scaffolding but no actual on-prem destinations configured yet, so despite the binding being present, it had zero actual reach to any on-prem system until specific destinations were created and a Cloud Connector whitelisted the relevant backends.",
    interviewTip:
      "If asked 'does binding Connectivity service expose all on-prem systems to the app', the correct, precise answer is no — it's a layered model requiring destinations and Cloud Connector whitelisting too, not a single all-or-nothing switch.",
    followupQuestions: [
      "What's the minimum set of configuration pieces needed for an app to actually reach one specific on-prem system?",
      "How would you audit exactly which on-prem systems a given app can actually reach?",
      "Could two apps sharing the same Connectivity service binding have different actual on-prem reach?",
    ],
    commonMistakes: [
      "Assuming binding the Connectivity service alone grants broad access to on-prem systems.",
      "Not recognizing this as a layered model requiring destinations AND Cloud Connector whitelisting together.",
    ],
    importantPoints: [
      "Connectivity service binding is a necessary prerequisite, not an access grant itself.",
      "Actual reachability requires destinations (referencing a Cloud Connector location) AND that Cloud Connector's own whitelist.",
      "Two apps with the same Connectivity binding can have entirely different actual on-prem reach.",
    ],
    revisionNotes: "Connectivity service binding alone grants NO reach — actual reachability needs destinations (referencing a location) + that Cloud Connector's own whitelist, all three layered together.",
  },
  {
    id: "conn-q18",
    topic: "Principal Propagation",
    prompt: "What's the specific symptom you'd observe if principal propagation silently falls back to an anonymous or technical user, rather than throwing an obvious error?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["principal-propagation", "silent-failure"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The call succeeds and returns data, but the on-prem system's own audit logs show a generic/technical user rather than the real end-user, and any per-user authorization or row-level filtering the on-prem system was supposed to apply based on the real user's identity doesn't actually happen — the failure is invisible unless you specifically check the on-prem system's own logs.",
    detailedAnswer:
      "This is precisely why this failure mode is dangerous: from the calling application's perspective, everything looks fine — the request succeeds, data comes back, no error is thrown. The problem only becomes visible when you check the on-prem system's own side: its audit logs show a generic technical/service account performed the action, not the real individual user, and any authorization logic on that side meant to restrict data based on the real user's specific identity/department/permissions instead applies whatever the fallback technical user's permissions happen to be — potentially showing broader data than the real user should see, or narrower, depending on the technical user's actual configured access. Catching this requires deliberately checking the on-prem system's audit trail for a specific test request, not just confirming the BTP-side call 'worked'.",
    hindiExplanation:
      "Yahi exactly wo wajah hai ki ye failure mode dangerous hai: calling application ke perspective se, sab kuch theek dikhta hai — request succeed hoti hai, data wapas aata hai, koi error throw nahi hota. Problem sirf tab visible hoti hai jab tum on-prem system ki apni side check karte ho: uske audit logs ek generic technical/service account dikhate hain jisne action perform kiya, real individual user nahi, aur us side pe koi bhi authorization logic jo real user ki specific identity/department/permissions ke basis pe data restrict karne wali thi, uske bajaye whatever fallback technical user ki permissions hoti hain wo apply hoti hain.",
    interviewExplanation:
      "I'd describe exactly why it's dangerous: 'From the calling app's perspective, everything looks fine — the request succeeds, data comes back, no error. The problem is only visible on the on-prem system's own side: its audit logs show a generic technical account instead of the real user, and any per-user authorization there applies the fallback technical user's permissions instead — potentially over- or under-exposing data. Catching this means deliberately checking on-prem audit logs for a specific test request, not just confirming the BTP-side call worked.'",
    diagramNote:
      "'BTP-side view: call succeeds, data returned, no error' — looks completely fine → but 'On-prem audit log: shows generic technical user, not real user' + 'Authorization applied = technical user's permissions, not real user's' — the actual, hidden problem.",
    diagramMermaid: `flowchart TD
    A["BTP-side: call succeeds,<br/>no error — looks fine"] -.->|"hides"| B["On-prem audit log: shows<br/>generic technical user"]
    B --> C["Authorization = technical user's<br/>permissions, not real user's"]`,
    realProjectExample:
      "A silent principal propagation fallback went undetected for weeks because every BTP-side call appeared completely successful — it was only discovered when an on-prem audit review noticed a specific technical service account had performed an unusually large number of individual user-attributed actions.",
    interviewTip:
      "If asked how you'd verify principal propagation is genuinely working (not just that calls succeed), describing this specific on-prem-audit-log verification step is precisely the kind of thorough validation that catches this exact dangerous failure mode.",
    followupQuestions: [
      "How would you proactively test that principal propagation is working correctly, beyond just confirming calls succeed?",
      "What on-prem system configuration would cause this specific silent-fallback behavior?",
      "What's the business/compliance risk if this goes undetected for an extended period?",
    ],
    commonMistakes: [
      "Verifying principal propagation only by confirming BTP-side calls succeed, missing the silent on-prem fallback.",
      "Not knowing to specifically check on-prem audit logs to catch this exact failure mode.",
    ],
    importantPoints: [
      "The BTP-side call appears completely successful even when principal propagation has silently failed.",
      "The failure is only visible in the on-prem system's own audit logs (generic technical user instead of real user).",
      "Per-user authorization on the on-prem side applies the wrong (fallback) user's permissions, invisibly.",
    ],
    revisionNotes: "Silent principal propagation fallback: BTP-side call looks fine, but on-prem audit logs show a technical user instead of the real one — verify by checking on-prem audit logs specifically, not just call success.",
  },
  {
    id: "conn-q19",
    topic: "Principal Propagation",
    prompt: "Would principal propagation work if the end user calling your BTP app authenticated via Client Credentials rather than an interactive login?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["principal-propagation", "grant-type-interaction"],
    estimatedMinutes: 2,
    expectedAnswer:
      "No — principal propagation fundamentally requires a real, specific end-user identity to propagate; a Client Credentials token represents the calling service itself, not any individual user, so there's no genuine 'principal' to propagate, and the on-prem system would either see a technical identity or the flow would need to be redesigned entirely.",
    detailedAnswer:
      "Principal propagation's entire purpose is forwarding a real, specific human user's identity through the call chain so the on-prem system can apply per-user authorization and audit logging — this presupposes there IS a real user in the picture to begin with. A request authenticated via Client Credentials represents the calling service's own technical identity, with no individual end user behind it at all (as covered in the CAP Model authentication distinction between end-user and service-to-service tokens) — there's simply no 'principal' (real user) to meaningfully propagate. In this scenario, the on-prem call would either need to use a different authentication approach entirely (accepting that it's a technical/service call, not a per-user one) or the overall architecture would need reconsidering if per-user on-prem authorization is genuinely required for this flow.",
    hindiExplanation:
      "Principal propagation ka poora purpose ek real, specific human user ki identity ko call chain mein forward karna hai taaki on-prem system per-user authorization aur audit logging apply kar sake — ye presuppose karta hai ki shuru mein ek real user hai bhi picture mein. Client Credentials se authenticated ek request calling service ki apni technical identity represent karti hai, koi individual end user uske peeche bilkul nahi — simply koi 'principal' (real user) hai hi nahi meaningfully propagate karne ke liye. Is scenario mein, on-prem call ko ya toh ek different authentication approach entirely use karna padega, ya overall architecture ko reconsider karna padega agar per-user on-prem authorization genuinely required hai is flow ke liye.",
    interviewExplanation:
      "I'd point out the fundamental mismatch: 'No — principal propagation's whole purpose presupposes a real end user exists to propagate. A Client Credentials token represents the calling service's own technical identity, with no individual user behind it at all — there's simply no principal to propagate. In this scenario, the on-prem call either needs a different auth approach accepting it's a technical call, or the architecture needs reconsidering if per-user on-prem authorization is genuinely required.'",
    diagramNote:
      "'Client Credentials token: represents the SERVICE itself, no individual user' → 'No principal exists to propagate' → 'Principal propagation doesn't apply — needs a different approach or architecture reconsideration'.",
    diagramMermaid: `flowchart TD
    A["Client Credentials token:<br/>represents the SERVICE itself"] --> B["No individual user —<br/>no principal to propagate"]
    B --> C["Principal propagation doesn't<br/>apply — reconsider approach"]`,
    realProjectExample:
      "A batch job authenticating via Client Credentials attempted to use a destination configured for principal propagation, which failed since there was no actual end-user identity behind that technical call — the destination was corrected to use a standard technical-user authentication approach instead.",
    interviewTip:
      "If asked to design an on-prem call for a scheduled batch job (no interactive user involved), recognizing upfront that principal propagation simply doesn't apply here shows you understand it's contingent on a genuine end-user identity existing in the first place.",
    followupQuestions: [
      "What authentication type would you use instead for a Client-Credentials-based on-prem call?",
      "Could a batch job still need per-user context passed to the on-prem system some other way?",
      "How would you design an architecture where a batch job needs to act 'on behalf of' different users for different records it processes?",
    ],
    commonMistakes: [
      "Assuming principal propagation can be configured regardless of whether a real end user is actually involved.",
      "Not connecting this back to the Client-Credentials-versus-Authorization-Code distinction covered elsewhere.",
    ],
    importantPoints: [
      "Principal propagation requires a real end-user identity to exist in the call chain to begin with.",
      "Client Credentials tokens represent the service itself, with no individual user behind them.",
      "A Client-Credentials-authenticated call has no genuine principal to propagate.",
    ],
    revisionNotes: "Principal propagation needs a REAL end user to propagate. Client Credentials tokens represent the service itself — no principal exists, so propagation doesn't apply; use a different auth approach.",
  },
  {
    id: "conn-q20",
    topic: "Destination Service",
    prompt: "How would you support calling the same logical on-prem system differently across dev, test, and production environments without changing application code?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["destination-service", "environment-configuration"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Create separate destinations with the same logical name convention but environment-specific configuration (different target URLs/Cloud Connector locations) in each environment's subaccount, so the application code always requests the destination by the same name and the actual target resolves differently per environment automatically.",
    detailedAnswer:
      "Since application code requests a destination by name at runtime rather than hardcoding a URL, achieving environment-specific behavior is purely a configuration exercise: each environment's subaccount (dev, test, production) has its own destination configured with the same name the app code expects, but pointing at that environment's actual corresponding on-prem system (different virtual hostnames, potentially different Cloud Connector location IDs entirely if each environment has its own Cloud Connector instance). This means promoting the exact same application artifact from dev through test to production requires zero code changes — only environment-specific destination configuration needs to exist in each target subaccount, which is precisely the separation of concerns destinations are designed to provide.",
    hindiExplanation:
      "Kyunki application code destination ko naam se request karta hai runtime pe URL hardcode karne ki jagah, environment-specific behavior achieve karna purely ek configuration exercise hai: har environment ka subaccount (dev, test, production) apna khud ka destination configure karta hai wahi naam se jo app code expect karta hai, lekin us environment ke actual corresponding on-prem system ko point karte hue (different virtual hostnames, potentially poori tarah different Cloud Connector location IDs agar har environment ka apna Cloud Connector instance ho). Iska matlab hai wahi exact application artifact ko dev se test se production tak promote karne ke liye zero code changes chahiye.",
    interviewExplanation:
      "I'd explain this as pure configuration, no code involvement: 'Since app code requests a destination by name, not a hardcoded URL, this is purely a config exercise — each environment's subaccount has its own destination with the same name the code expects, but pointing at that environment's actual system, potentially with its own Cloud Connector location. Promoting the exact same artifact from dev to test to production needs zero code changes — just environment-specific destination config in each subaccount.'",
    diagramNote:
      "'App code: requests destination \"ERP_SYSTEM\" (same name everywhere)' → 'Dev subaccount: ERP_SYSTEM → dev virtual host' / 'Test subaccount: ERP_SYSTEM → test virtual host' / 'Prod subaccount: ERP_SYSTEM → prod virtual host' — same code, different resolved config per environment.",
    diagramMermaid: `flowchart TD
    A["App code: requests<br/>destination 'ERP_SYSTEM'"] --> B["Dev subaccount:<br/>ERP_SYSTEM → dev host"]
    A --> C["Test subaccount:<br/>ERP_SYSTEM → test host"]
    A --> D["Prod subaccount:<br/>ERP_SYSTEM → prod host"]`,
    realProjectExample:
      "The exact same CAP application artifact was deployed unchanged across dev, test, and production subaccounts, each with its own 'ERP_SYSTEM' destination pointing at that environment's actual backend via its own Cloud Connector instance — zero code differences between environments.",
    interviewTip:
      "If asked how you'd avoid environment-specific if/else logic in application code for different backend targets, this destination-name-consistency pattern is the precise, correct answer showing proper separation of configuration from code.",
    followupQuestions: [
      "Would each environment need its own separate Cloud Connector instance, or could they share one?",
      "How would you ensure the destination name stays consistent across environments as a team convention?",
      "What would happen if the dev environment's destination were accidentally missing when deploying there?",
    ],
    commonMistakes: [
      "Hardcoding environment-specific URLs or conditional logic directly in application code instead of relying on consistent destination naming.",
      "Using different destination names per environment, forcing the application code to know which environment it's running in.",
    ],
    importantPoints: [
      "Application code requests a destination by a consistent name across all environments.",
      "Each environment's subaccount configures that same-named destination to point at its own actual target.",
      "This achieves environment-specific behavior through pure configuration, with zero code changes.",
    ],
    revisionNotes: "Use the SAME destination name across dev/test/prod subaccounts, each configured to point at that environment's actual target — achieves environment-specific behavior via config only, zero code changes.",
  },
];

export const connectivityMcqs: BtpMcq[] = [
  {
    id: "conn-mcq1",
    topic: "Destination Service",
    prompt: "What does the Destination service manage, as distinct from the Connectivity service?",
    options: [
      "The actual network tunnel to on-premise systems",
      "The target URL and authentication configuration for a call",
      "Certificate renewal for the Cloud Connector",
      "User role assignment",
    ],
    correctIndex: 1,
    explanation: "The Destination service manages where to call and how to authenticate; the Connectivity service provides the actual network tunnel via Cloud Connector.",
  },
  {
    id: "conn-mcq2",
    topic: "Cloud Connector",
    prompt: "Why does the Cloud Connector initiate an outbound connection rather than BTP connecting inbound?",
    options: [
      "Outbound connections are faster",
      "So the on-prem firewall never needs an inbound port opened, avoiding a major security exposure",
      "Inbound connections aren't supported by any firewall",
      "There's no specific reason, it's arbitrary",
    ],
    correctIndex: 1,
    explanation: "Initiating outbound avoids the security risk of opening an inbound firewall port for an external cloud platform — outbound connections are generally much lower risk.",
  },
  {
    id: "conn-mcq3",
    topic: "Cloud Connector",
    prompt: "Does establishing a Cloud Connector tunnel expose the entire on-premise network to BTP?",
    options: [
      "Yes, the whole network becomes reachable",
      "No — only explicitly whitelisted backends/ports/paths are reachable",
      "Only if principal propagation is enabled",
      "Only during business hours",
    ],
    correctIndex: 1,
    explanation: "The Cloud Connector requires explicit whitelisting of specific backends, ports, and even URL paths — anything not configured remains unreachable.",
  },
  {
    id: "conn-mcq4",
    topic: "On Premise",
    prompt: "What does setting ProxyType: OnPremise on a destination actually change?",
    options: [
      "Nothing, it's just a label",
      "Routes the call through the Connectivity service + Cloud Connector tunnel instead of a direct internet call",
      "It encrypts the request twice",
      "It disables authentication",
    ],
    correctIndex: 1,
    explanation: "ProxyType: OnPremise changes the routing mechanism entirely — the configured URL becomes a virtual hostname resolved via the Cloud Connector tunnel, not a direct internet call.",
  },
  {
    id: "conn-mcq5",
    topic: "Proxy",
    prompt: "What security benefit does the Cloud Connector's reverse-proxy role provide?",
    options: [
      "It speeds up requests",
      "The real backend's actual address is never exposed to BTP or the internet",
      "It removes the need for any authentication",
      "It automatically load-balances requests",
    ],
    correctIndex: 1,
    explanation: "As a reverse proxy, the Cloud Connector hides the real backend's address behind a virtual hostname, and provides one central enforcement checkpoint for every request.",
  },
  {
    id: "conn-mcq6",
    topic: "Certificates",
    prompt: "Beyond encrypting traffic, what do certificates establish in a Cloud Connector / principal propagation setup?",
    options: [
      "Nothing additional",
      "Trust — verifying genuine subaccount identity and, for principal propagation, the real end-user's identity",
      "Only compression settings",
      "The billing configuration for the connection",
    ],
    correctIndex: 1,
    explanation: "Certificates establish mutual trust for the tunnel (confirming genuine BTP subaccount identity) and, for principal propagation, represent the real end-user's identity that the on-prem system must be configured to trust.",
  },
  {
    id: "conn-mcq7",
    topic: "Cloud Connector",
    prompt: "How does Cloud Connector achieve high availability?",
    options: [
      "It doesn't support HA at all",
      "A master-shadow setup where a synced shadow instance takes over if the master becomes unreachable",
      "By running entirely inside BTP instead of on-prem",
      "By automatically load-balancing across multiple on-prem networks",
    ],
    correctIndex: 1,
    explanation: "Cloud Connector supports a master-shadow HA configuration; destinations reference a Location ID abstraction, making failover to the shadow instance transparent to the calling app.",
  },
  {
    id: "conn-mcq8",
    topic: "Connectivity Service",
    prompt: "Does binding the Connectivity service to an app automatically grant access to every on-prem system in the subaccount?",
    options: [
      "Yes, binding alone grants full access",
      "No — actual reachability also requires destinations referencing a Cloud Connector location, plus that Cloud Connector's own whitelist",
      "Only if principal propagation is also configured",
      "Only for entities marked public in CDS",
    ],
    correctIndex: 1,
    explanation: "The Connectivity service binding is a necessary prerequisite, not a grant of access — actual reachability requires destinations and the specific Cloud Connector's own whitelisted backends.",
  },
  {
    id: "conn-mcq9",
    topic: "Principal Propagation",
    prompt: "Would principal propagation apply to a call authenticated via the Client Credentials grant?",
    options: [
      "Yes, it works the same regardless of grant type",
      "No — Client Credentials represents the service itself, with no individual end user to propagate",
      "Only for on-premise systems, not cloud ones",
      "Only if the service has an Admin scope",
    ],
    correctIndex: 1,
    explanation: "Principal propagation requires a real end-user identity to forward. A Client Credentials token represents the calling service itself, with no individual user behind it — there's no principal to propagate.",
  },
];
