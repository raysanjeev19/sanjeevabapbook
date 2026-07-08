import type { BtpMcq, BtpQuestion } from "@/lib/btp-content";

/** Section 7 — Security. Interview questions, full format. */
export const securityQuestions: BtpQuestion[] = [
  {
    id: "sec-q1",
    topic: "XSUAA",
    prompt: "What is XSUAA, and what role does it play in securing a BTP application?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["xsuaa", "overview"],
    estimatedMinutes: 3,
    expectedAnswer:
      "XSUAA (Authorization and Trust Management service) is BTP's OAuth 2.0 authorization server — it issues and validates JWT access tokens carrying a user's identity and scopes, which apps bind to and use to authenticate/authorize incoming requests.",
    detailedAnswer:
      "Almost every secured app or service on BTP binds an XSUAA service instance, configured via an `xs-security.json` file declaring the app's scopes and role templates. XSUAA handles the OAuth 2.0 flows (authorization code, client credentials, etc.) to issue signed JWT tokens after a user authenticates, and any resource server (your CAP/RAP app, or another API) validates incoming bearer tokens against XSUAA's public signing key, checking the token's scopes to decide what the caller is allowed to do. It's the foundational security service almost everything else in BTP's auth story builds on top of.",
    hindiExplanation:
      "Almost har secured app/service BTP pe XSUAA service instance bind karta hai, jo `xs-security.json` file se configure hoti hai jisme app ke scopes aur role templates declare hote hain. XSUAA OAuth 2.0 flows handle karta hai (authorization code, client credentials, etc.) taaki user authenticate hone ke baad signed JWT tokens issue kar sake, aur koi bhi resource server (tumhara CAP/RAP app, ya koi doosri API) incoming bearer tokens ko XSUAA ki public signing key ke against validate karta hai, scopes check karke decide karta hai caller kya karne ki permission rakhta hai. Ye foundational security service hai jispe BTP ki baaki almost saari auth story build hoti hai.",
    interviewExplanation:
      "I'd say: 'XSUAA is BTP's OAuth 2.0 authorization server. Apps bind to it, configured via xs-security.json declaring scopes and roles. XSUAA issues signed JWT tokens after a user authenticates, and any resource server validates incoming tokens against XSUAA's public key, checking scopes to decide what's allowed — it's the foundational auth service almost everything else on BTP builds on.'",
    diagramNote:
      "Flow: 'User authenticates' → 'XSUAA issues signed JWT (with scopes)' → 'App/API validates token against XSUAA's public key' → 'Checks scopes → allow/deny'.",
    diagramMermaid: `flowchart LR
    A["User authenticates"] --> B["XSUAA issues signed JWT<br/>with scopes"]
    B --> C["App/API validates token<br/>against XSUAA public key"]
    C --> D["Checks scopes → allow/deny"]`,
    realProjectExample:
      "Binding an XSUAA instance and declaring two scopes ('Read', 'Admin') in xs-security.json was all it took for our CAP app to automatically reject unauthenticated requests and enforce role-based access on specific entities.",
    interviewTip:
      "If asked 'what does XSUAA stand for', it's fine to not recall the acronym expansion exactly — the important thing is explaining its role as the OAuth 2.0 authorization server correctly.",
    followupQuestions: [
      "What is xs-security.json and what does it declare?",
      "How does a resource server validate a JWT token from XSUAA?",
      "What's the difference between a scope and a role collection?",
    ],
    commonMistakes: [
      "Confusing XSUAA with IAS (Identity Authentication Service) — XSUAA is the authorization server, IAS is more about identity/authentication federation.",
      "Not knowing xs-security.json is the configuration source for XSUAA scopes/roles.",
    ],
    importantPoints: [
      "XSUAA = BTP's OAuth 2.0 authorization server.",
      "Configured via xs-security.json (scopes, role templates).",
      "Issues and validates JWT tokens carrying identity + scopes.",
    ],
    revisionNotes: "XSUAA = OAuth 2.0 authorization server for BTP. Configured via xs-security.json. Issues/validates JWT tokens with scopes.",
  },
  {
    id: "sec-q2",
    topic: "OAuth",
    prompt: "What OAuth 2.0 grant types are commonly used on BTP, and when would you use each?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["oauth", "grant-types"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Authorization Code grant is used for interactive user logins (a browser redirects through a login page); Client Credentials grant is used for service-to-service (machine-to-machine) calls with no interactive user involved.",
    detailedAnswer:
      "Authorization Code is the flow behind a user clicking 'log in' — they're redirected to an identity provider's login page, authenticate, and get redirected back with a code that's exchanged for tokens; this is what powers Fiori app logins. Client Credentials is entirely non-interactive — a service authenticates using its own client ID/secret (no human involved) to get a token representing 'this service', used for backend-to-backend calls like a scheduled job calling another API. Other grants exist (like JWT Bearer for token exchange scenarios), but these two cover the vast majority of real BTP authentication scenarios.",
    hindiExplanation:
      "Authorization Code wo flow hai jab koi user 'log in' click karta hai — unhe ek identity provider ke login page pe redirect kiya jaata hai, wo authenticate hote hain, aur wapas redirect hote hain ek code ke saath jo tokens ke liye exchange hota hai — yahi Fiori app logins ko power karta hai. Client Credentials poori tarah non-interactive hai — ek service apne khud ke client ID/secret se authenticate hoti hai (koi human involved nahi) ek token pane ke liye jo 'ye service' represent karta hai, backend-to-backend calls ke liye use hota hai jaise ek scheduled job doosri API ko call kare.",
    interviewExplanation:
      "I'd give both with a concrete use case: 'Authorization Code is for interactive logins — a user is redirected to authenticate and comes back with a code exchanged for tokens, powering Fiori logins. Client Credentials is for service-to-service calls with no human involved — a backend job authenticates with its own client ID/secret to call another API.'",
    diagramNote:
      "Two flows: 'Authorization Code: User → redirect to login → authenticate → code → token (interactive)' vs 'Client Credentials: Service → client ID/secret → token (non-interactive)'.",
    diagramMermaid: `flowchart LR
    A["Authorization Code"] --> B["User redirected to login,<br/>authenticates, gets token"]
    C["Client Credentials"] --> D["Service uses own client<br/>ID/secret, no human involved"]`,
    realProjectExample:
      "Our Fiori app used Authorization Code for real user logins, while a nightly batch job that called an internal API used Client Credentials, authenticating as itself with no user session at all.",
    interviewTip:
      "If asked 'which grant would a background job use', the correct answer is always Client Credentials — a common trick question to see if you understand the interactive-vs-non-interactive distinction.",
    followupQuestions: [
      "What actually gets exchanged in the Authorization Code flow?",
      "Does a Client Credentials token represent a specific user?",
      "What is the JWT Bearer grant used for?",
    ],
    commonMistakes: [
      "Using Authorization Code for a non-interactive backend service (unnecessary complexity).",
      "Not knowing Client Credentials tokens represent the service itself, not a specific user.",
    ],
    importantPoints: [
      "Authorization Code = interactive user login flow.",
      "Client Credentials = non-interactive service-to-service flow.",
      "Choice depends on whether a human user is actually involved.",
    ],
    revisionNotes: "Authorization Code = interactive user login. Client Credentials = non-interactive service-to-service (no user).",
  },
  {
    id: "sec-q3",
    topic: "JWT",
    prompt: "What does a JWT (JSON Web Token) actually contain, and how is its integrity guaranteed?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["jwt", "tokens"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A JWT has three parts — a header (algorithm/type), a payload (claims like user identity, scopes, expiry), and a signature — and its integrity is guaranteed because the signature is cryptographically generated from the header+payload using the issuer's private key, verifiable by anyone with the corresponding public key.",
    detailedAnswer:
      "The header and payload are base64-encoded JSON (readable, not encrypted, by anyone who intercepts the token — never put secrets in the payload). The signature is what actually matters for security: it's computed by the issuer (XSUAA) using its private signing key over the header and payload, and any resource server can independently verify that signature using XSUAA's corresponding public key (fetched from a well-known JWKS endpoint) — if the payload were tampered with even slightly, the signature verification would fail, immediately revealing tampering. This is why validating a JWT doesn't require calling back to XSUAA for every single request — the signature alone proves authenticity, as long as you trust the issuer's public key.",
    hindiExplanation:
      "Header aur payload base64-encoded JSON hote hain (readable, encrypted nahi, koi bhi jisne token intercept kiya wo padh sakta hai — isliye payload mein kabhi secrets mat daalo). Signature wahi cheez hai jo security ke liye actually matter karti hai — ye issuer (XSUAA) ne apni private signing key se header+payload pe compute kiya hota hai, aur koi bhi resource server independently is signature ko verify kar sakta hai XSUAA ki corresponding public key se (ek well-known JWKS endpoint se fetch ki hui) — agar payload mein thoda sa bhi tamper hua ho, signature verification fail ho jaayegi. Isi wajah se JWT validate karne ke liye har request pe XSUAA ko wapas call karna nahi padta — sirf signature hi authenticity prove kar deti hai, jab tak tum issuer ki public key trust karte ho.",
    interviewExplanation:
      "I'd explain the three parts and why signature matters: 'A JWT has a header, payload, and signature. Header and payload are just base64-encoded JSON — readable by anyone, never encrypted, so no secrets should go in there. The signature is computed by XSUAA using its private key, and any resource server verifies it independently using XSUAA's public key — no callback to XSUAA needed per request, and any tampering with the payload breaks the signature immediately.'",
    diagramNote:
      "JWT = Header.Payload.Signature. Header+Payload readable (base64, not encrypted). Signature computed with issuer's private key, verified with public key — tampering breaks verification.",
    diagramMermaid: `flowchart LR
    A["JWT = Header.Payload.Signature"] --> B["Header+Payload:<br/>base64, readable (not encrypted)"]
    A --> C["Signature: computed with<br/>issuer's private key"]
    C --> D["Verified with public key<br/>— tampering breaks it"]`,
    realProjectExample:
      "A teammate assumed a JWT was encrypted and put a sensitive internal ID directly in a custom claim; a quick decode of the base64 payload in a browser console showed it was fully readable, prompting us to move that data server-side instead.",
    interviewTip:
      "The phrase 'never put secrets in a JWT payload, it's encoded not encrypted' is exactly the kind of security-aware detail that separates a strong answer from a surface-level one.",
    followupQuestions: [
      "Where does a resource server get the public key to verify a JWT signature?",
      "What happens if a JWT's expiry claim has passed?",
      "Is a JWT's payload ever encrypted, and if so how?",
    ],
    commonMistakes: [
      "Believing a JWT's payload is encrypted and safe to store secrets in.",
      "Not knowing signature verification uses a public key fetched from a JWKS endpoint.",
    ],
    importantPoints: [
      "JWT = Header.Payload.Signature.",
      "Header/Payload are readable (base64), never encrypted — no secrets belong there.",
      "Signature (private-key-signed, public-key-verified) is what proves authenticity/integrity.",
    ],
    revisionNotes: "JWT = Header.Payload.Signature. Header/payload readable (not encrypted). Signature (private/public key pair) proves integrity — no per-request callback needed.",
  },
  {
    id: "sec-q4",
    topic: "Role Collections",
    prompt: "What is a Role Collection, and how does it relate to role templates defined in xs-security.json?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["role-collections", "roles"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A role template (defined in an app's xs-security.json) is a blueprint of scopes an app declares; a Role Collection is the actual assignable unit BTP administrators create in the cockpit, bundling one or more role templates (potentially from multiple apps), which is then assigned to real users.",
    detailedAnswer:
      "Developers declare what roles their app conceptually needs in xs-security.json (e.g. a 'Viewer' role template granting a read scope, an 'Admin' role template granting read+write scopes) as part of the app's deployment artifact. Administrators then, in the BTP cockpit, create Role Collections — reusable bundles that can combine role templates from one or even multiple different apps — and assign those Role Collections to specific users or groups. This two-step design separates 'what an app is capable of granting' (developer-defined role templates) from 'what a specific user actually gets' (admin-assigned Role Collections), letting the same app's role templates be mixed into different collections for different organizational needs.",
    hindiExplanation:
      "Developers apni app ke xs-security.json mein declare karte hain ki app ko conceptually kaunse roles chahiye (jaise ek 'Viewer' role template jo read scope grant kare, ek 'Admin' role template jo read+write scopes grant kare) — app ke deployment artifact ke hisse ki tarah. Administrators fir BTP cockpit mein Role Collections banate hain — reusable bundles jo ek ya kai alag apps ke role templates ko combine kar sakte hain — aur un Role Collections ko specific users/groups ko assign karte hain. Ye do-step design 'app kya grant kar sakti hai' (developer-defined role templates) ko 'ek specific user ko actually kya milta hai' (admin-assigned Role Collections) se alag karta hai.",
    interviewExplanation:
      "I'd explain the two-step separation: 'A role template, declared in xs-security.json, is what an app says it's capable of granting — like Viewer or Admin. A Role Collection is what an admin actually creates in the cockpit, bundling one or more role templates, possibly from multiple apps, and assigns to real users. That separates what an app CAN grant from what a specific user actually GETS.'",
    diagramNote:
      "Flow: 'App declares role templates in xs-security.json' → 'Admin creates Role Collection bundling templates (possibly from multiple apps)' → 'Role Collection assigned to a user'.",
    diagramMermaid: `flowchart LR
    A["App declares role templates<br/>in xs-security.json"] --> B["Admin creates Role Collection<br/>bundles templates, maybe from multiple apps"]
    B --> C["Role Collection assigned to a user"]`,
    realProjectExample:
      "An admin created a single 'Regional Manager' Role Collection combining an 'Approver' role template from our order app and a 'Viewer' role template from a separate reporting app, giving one user exactly the cross-app access they needed without any code changes.",
    interviewTip:
      "Mentioning that a Role Collection can bundle templates from multiple different apps is a specific detail that shows you understand the real flexibility of this model, not just 'roles get assigned to users'.",
    followupQuestions: [
      "Who is responsible for creating Role Collections — developers or admins?",
      "Can one user be assigned multiple Role Collections?",
      "What happens if a role template is removed from an app after Role Collections already reference it?",
    ],
    commonMistakes: [
      "Confusing role templates (developer-declared) with Role Collections (admin-assigned).",
      "Not knowing a Role Collection can combine templates from multiple different apps.",
    ],
    importantPoints: [
      "Role template = developer-declared blueprint of scopes (in xs-security.json).",
      "Role Collection = admin-created, assignable bundle of templates (possibly cross-app).",
      "Separates 'what an app can grant' from 'what a user actually gets'.",
    ],
    revisionNotes: "Role template = app-declared blueprint (xs-security.json). Role Collection = admin-created assignable bundle (possibly cross-app), assigned to users.",
  },
  {
    id: "sec-q5",
    topic: "Scopes",
    prompt: "What is a 'scope' in the OAuth/XSUAA context, and how granular should scopes typically be?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["scopes", "oauth"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A scope is a named permission string (like `Orders.Read` or `Orders.Write`) embedded in a token, checked by a resource server before allowing an operation; scopes should be granular enough to express meaningfully different levels of access, but not so fine-grained that managing dozens of near-identical scopes per entity becomes unmanageable.",
    detailedAnswer:
      "A scope is essentially a string like `$XSAPPNAME.Orders.Read` that gets embedded in a user's JWT if their assigned roles grant it, and your application code (or a CAP `@restrict` annotation) checks for its presence before allowing an operation. The granularity tradeoff: too coarse (one giant 'access' scope for everything) gives no meaningful separation of duties; too fine (a separate scope for every single field or micro-operation) becomes an administrative nightmare to manage and assign correctly. A reasonable middle ground groups scopes around meaningful business capabilities (Read vs Write vs Admin per functional area), matching how an organization actually thinks about access levels.",
    hindiExplanation:
      "Scope basically ek string hai jaise `$XSAPPNAME.Orders.Read`, jo user ke JWT mein embed ho jaata hai agar unke assigned roles wo grant karte hain, aur tumhari application code (ya CAP ka `@restrict` annotation) uski presence check karta hai operation allow karne se pehle. Granularity ka tradeoff: bahut coarse (ek hi giant 'access' scope sab kuch ke liye) koi meaningful separation of duties nahi deta; bahut fine (har single field ya micro-operation ke liye alag scope) manage karna ek administrative nightmare ban jaata hai. Ek reasonable middle ground scopes ko meaningful business capabilities ke aaspaas group karta hai (Read vs Write vs Admin har functional area ke liye).",
    interviewExplanation:
      "I'd define it and address granularity directly: 'A scope is a named permission string embedded in the token, like Orders.Read, checked before allowing an operation. The right granularity is a middle ground — too coarse gives no real separation of duties, too fine becomes an admin nightmare. I'd group scopes around meaningful business capabilities, like Read/Write/Admin per functional area.'",
    diagramNote:
      "Granularity spectrum: 'Too coarse: one giant scope' — 'Reasonable: Read/Write/Admin per functional area' — 'Too fine: scope per field/micro-operation'.",
    diagramMermaid: `flowchart LR
    A["Too coarse<br/>one giant scope"] --> B["Reasonable<br/>Read/Write/Admin per area"]
    B --> C["Too fine<br/>scope per field/micro-op"]`,
    realProjectExample:
      "An early design with a separate scope for every individual field update became impossible to manage across dozens of role assignments; consolidating to Read/Write/Admin scopes per business entity struck a much more maintainable balance without losing meaningful access control.",
    interviewTip:
      "If asked 'should you have one scope per field', the correct answer is no — explain the administrative-overhead tradeoff explicitly rather than just saying 'more granular is more secure'.",
    followupQuestions: [
      "How does a scope actually get into a user's JWT?",
      "How would you check for a scope in application code versus a CAP annotation?",
      "What's the risk of having too few, overly broad scopes?",
    ],
    commonMistakes: [
      "Assuming maximum granularity is always the most secure/correct choice.",
      "Not knowing scopes are just checked-for strings embedded in the token via role assignment.",
    ],
    importantPoints: [
      "Scope = named permission string in the token, checked before an operation.",
      "Granularity tradeoff: too coarse loses separation of duties, too fine is unmanageable.",
      "Reasonable default: group by business capability (Read/Write/Admin per area).",
    ],
    revisionNotes: "Scope = permission string in token (e.g. Orders.Read). Pick a middle granularity — grouped by business capability, not per-field.",
  },
  {
    id: "sec-q6",
    topic: "Authorization",
    prompt: "What's the difference between authentication and authorization, and where does each happen in a typical BTP request?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["authorization", "authentication"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Authentication answers 'who are you' (validated via the JWT's signature/issuer, typically by framework middleware); authorization answers 'what are you allowed to do' (checked via scopes/roles in the token against what a specific operation requires, often via declarative annotations).",
    detailedAnswer:
      "In a typical CAP/RAP request, authentication happens first and automatically — the framework's middleware validates the incoming bearer token's signature and expiry against XSUAA, establishing who the caller is (populating something like `req.user`). Authorization happens next, checking whether that authenticated identity's scopes/roles actually permit the specific operation being requested — via a CAP `@restrict` annotation, a RAP authorization object check, or custom logic. The clean separation matters: a request can be perfectly authenticated (valid token, known user) yet still be denied by authorization (that user simply isn't allowed to do this specific thing).",
    hindiExplanation:
      "Typical CAP/RAP request mein, authentication pehle aur automatically hoti hai — framework ka middleware incoming bearer token ki signature aur expiry XSUAA ke against validate karta hai, ye establish karte hue ki caller kaun hai (`req.user` jaisa kuch populate karke). Authorization uske baad hoti hai, check karta hai ki us authenticated identity ke scopes/roles specific requested operation ko actually permit karte hain ya nahi — CAP ke `@restrict` annotation se, ya RAP authorization object check se, ya custom logic se. Clean separation important hai — ek request perfectly authenticated ho sakti hai (valid token, known user) lekin phir bhi authorization se deny ho sakti hai (wo user simply ye specific cheez karne ki permission nahi rakhta).",
    interviewExplanation:
      "I'd give the clean two-step order: 'Authentication happens first, automatically — middleware validates the token's signature/expiry against XSUAA, establishing who the caller is. Authorization happens next, checking whether that identity's scopes actually permit this specific operation, via something like a CAP @restrict annotation. A request can be fully authenticated yet still denied by authorization if the user just isn't permitted to do that particular thing.'",
    diagramNote:
      "Sequential: 'Incoming request' → 'Authentication (who are you? — token validated)' → 'Authorization (what can you do? — scopes checked)' → 'Allow / deny'.",
    diagramMermaid: `flowchart LR
    A["Incoming request"] --> B["Authentication<br/>who are you? (token validated)"]
    B --> C["Authorization<br/>what can you do? (scopes checked)"]
    C --> D["Allow / deny"]`,
    realProjectExample:
      "A support ticket about a '403 Forbidden' error was resolved by clarifying to the user that their login (authentication) was working fine — the issue was they simply didn't have the 'Admin' scope needed for that specific operation (an authorization gap, not a login problem).",
    interviewTip:
      "If asked to debug a 401 vs 403 error, the distinction is exactly this: 401 = authentication failed (who are you is unclear/invalid), 403 = authenticated fine, but authorization denied (you're known, but not allowed).",
    followupQuestions: [
      "What HTTP status code typically indicates an authentication failure versus an authorization failure?",
      "Can authorization checks differ per operation on the same entity?",
      "Where does authentication actually get enforced in a CAP app?",
    ],
    commonMistakes: [
      "Conflating authentication and authorization as the same concept.",
      "Not knowing 401 vs 403 map to authentication vs authorization failures respectively.",
    ],
    importantPoints: [
      "Authentication = who are you (token validity/signature).",
      "Authorization = what can you do (scopes/roles vs required permission).",
      "A request can be authenticated but still denied by authorization.",
    ],
    revisionNotes: "Authentication = who (token validity). Authorization = what allowed (scopes vs requirement). 401 = auth fail. 403 = authz denied.",
  },
  {
    id: "sec-q7",
    topic: "Principal Propagation",
    prompt: "What is principal propagation, and why does it matter when calling an on-premise system?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["principal-propagation", "connectivity"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Principal propagation forwards the original end-user's identity through the entire call chain (BTP app → Cloud Connector → on-prem system), so the on-prem system enforces authorization based on the actual real user, not a shared generic technical user — preserving proper audit trails and per-user access control.",
    detailedAnswer:
      "Without principal propagation, a BTP app calling an on-prem system typically authenticates using one shared technical user, meaning the on-prem system has no idea which actual end user triggered the request — every action looks identical from its perspective, defeating per-user authorization and audit logging on that side. Principal propagation instead uses a certificate-based trust mechanism through the Cloud Connector: the BTP app's JWT identity is exchanged/mapped to an X.509 certificate representing that specific user, which the Cloud Connector forwards to the on-prem system, letting it apply its own authorization checks and log actions against the real, individual user — exactly as if that user had connected directly.",
    hindiExplanation:
      "Principal propagation ke bina, BTP app ek on-prem system ko call karte waqt typically ek shared technical user se authenticate hota hai, matlab on-prem system ko pata hi nahi chalta ki actual end user kaun tha jisne request trigger ki — har action uski perspective se identical dikhta hai, per-user authorization aur audit logging waha defeat ho jaati hai. Principal propagation iske bajaye ek certificate-based trust mechanism use karta hai Cloud Connector ke through: BTP app ki JWT identity ek X.509 certificate mein exchange/map hoti hai jo us specific user ko represent karta hai, jise Cloud Connector on-prem system tak forward karta hai, jisse wo apne khud ke authorization checks apply kar sake aur actions real, individual user ke against log kar sake.",
    interviewExplanation:
      "I'd explain the problem and the mechanism: 'Without principal propagation, an on-prem call authenticates as one shared technical user — the on-prem system has no idea which real user triggered it, breaking per-user authorization and audit logs on that side. Principal propagation uses a certificate-based trust mechanism through the Cloud Connector, mapping the BTP user's identity to an X.509 certificate the on-prem system recognizes as that specific real user.'",
    diagramNote:
      "Without: 'BTP app → shared technical user → on-prem (no idea who the real user was)'. With principal propagation: 'BTP app (user identity) → Cloud Connector (maps to X.509 cert) → on-prem (recognizes real user, applies own authz)'.",
    diagramMermaid: `flowchart LR
    A["Without: BTP app"] --> B["Shared technical user"] --> C["On-prem<br/>no idea who the real user was"]
    D["With: BTP app<br/>user identity"] --> E["Cloud Connector<br/>maps to X.509 cert"] --> F["On-prem<br/>recognizes real user, applies own authz"]`,
    realProjectExample:
      "An audit requirement mandated that every on-prem action be traceable to the actual employee who triggered it, not a generic service account — enabling principal propagation through the Cloud Connector satisfied this without any changes to the on-prem system's own authorization logic.",
    interviewTip:
      "Mentioning the X.509 certificate mapping mechanism specifically (not just 'it forwards the user') demonstrates real understanding of how principal propagation is technically implemented.",
    followupQuestions: [
      "What role does the Cloud Connector play in principal propagation specifically?",
      "What has to be configured on the on-prem side to trust these certificates?",
      "What's the alternative if principal propagation isn't set up — how would auditing work?",
    ],
    commonMistakes: [
      "Thinking principal propagation just means 'forwarding the JWT as-is' to the on-prem system.",
      "Not knowing it requires a certificate-based trust mechanism, not a simple token pass-through.",
    ],
    importantPoints: [
      "Principal propagation forwards real end-user identity through the whole call chain, not a shared technical user.",
      "Uses certificate-based trust (X.509) via the Cloud Connector.",
      "Preserves per-user authorization and audit logging on the on-prem side.",
    ],
    revisionNotes: "Principal propagation = forwards real user identity (via X.509 cert through Cloud Connector) to on-prem, not a shared technical user — preserves per-user authz/audit.",
  },
  {
    id: "sec-q8",
    topic: "Destinations",
    prompt: "How does the Destination service integrate with security — what does a destination actually secure?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["destinations", "security"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A destination centralizes both connection details AND authentication configuration for calling an external system, so application code never handles raw credentials directly — it just requests the destination by name and gets back a ready-to-use, authenticated connection.",
    detailedAnswer:
      "Rather than hard-coding a target URL and credentials (API key, OAuth client secret, certificate) in application code or config, a destination stores this centrally in the Destination service, including which auth type to use (Basic, OAuth2ClientCredentials, PrincipalPropagation, etc.). Application code simply asks for a destination by name at runtime, and the Destination service handles the actual authentication handshake, returning a ready-to-call connection. This means rotating a credential or changing an auth mechanism is a configuration change in the Destination service, not a code change and redeploy — and secrets never need to live in application source code or environment variables directly.",
    hindiExplanation:
      "Ek target URL aur credentials (API key, OAuth client secret, certificate) ko application code ya config mein hard-code karne ki jagah, ek destination inhe centrally Destination service mein store karta hai, including ye ki kaunsa auth type use karna hai (Basic, OAuth2ClientCredentials, PrincipalPropagation, etc.). Application code runtime pe simply naam se ek destination maangta hai, aur Destination service actual authentication handshake handle karta hai, ek ready-to-call connection return karta hai. Isse credential rotate karna ya auth mechanism badalna Destination service mein ek configuration change hai, code change aur redeploy nahi — aur secrets kabhi application source code ya environment variables mein directly rehne ki zaroorat nahi.",
    interviewExplanation:
      "I'd emphasize the credential-centralization benefit: 'A destination centralizes both the connection URL and auth configuration for an external system. Application code just requests it by name at runtime and gets back a ready-to-use, authenticated connection — the Destination service handles the actual handshake. Rotating a credential becomes a config change there, not a code change and redeploy.'",
    diagramNote:
      "'App code requests destination by name' → 'Destination service holds URL + auth config (Basic/OAuth2/PrincipalPropagation)' → 'Destination service handles auth handshake' → 'Returns ready-to-use connection'.",
    diagramMermaid: `flowchart LR
    A["App code requests<br/>destination by name"] --> B["Destination service<br/>URL + auth config"]
    B --> C["Handles auth handshake"]
    C --> D["Returns ready-to-use connection"]`,
    realProjectExample:
      "Rotating an external API's OAuth client secret required only updating the destination's configuration in the cockpit — no application redeploy, since the app always requested the destination by name at runtime rather than holding the secret itself.",
    interviewTip:
      "If asked 'where should you store an external API's credentials', the correct answer is never directly in app code/env vars if a destination can be used instead — that's precisely the security benefit being tested.",
    followupQuestions: [
      "What authentication types can a destination be configured with?",
      "How does a destination relate to the Connectivity service for on-prem calls?",
      "What happens if a destination's credentials expire or are rotated?",
    ],
    commonMistakes: [
      "Hard-coding external API credentials directly in app code instead of using a destination.",
      "Not knowing destinations can be configured with different auth types beyond basic username/password.",
    ],
    importantPoints: [
      "Destination centralizes connection URL + authentication configuration.",
      "App code requests by name, never handles raw credentials directly.",
      "Credential rotation/auth changes become config changes, not code changes.",
    ],
    revisionNotes: "Destination = centralizes URL + auth config for external calls. App requests by name; credentials never hard-coded in app code.",
  },
  {
    id: "sec-q9",
    topic: "Trust Configuration",
    prompt: "What is a Trust Configuration in BTP, and why would you set up a custom one instead of using the default identity provider?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["trust-configuration", "identity-provider"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A Trust Configuration establishes which identity provider a subaccount trusts for authenticating users; you'd set up a custom one (pointing to your own corporate IdP, often via IAS) instead of SAP's default identity provider when you need corporate single sign-on, custom user attributes, or centralized user lifecycle management.",
    detailedAnswer:
      "By default, a new BTP subaccount trusts SAP's own default identity provider for authentication — fine for quick starts or trial scenarios, but not appropriate for an enterprise wanting employees to log in with their existing corporate credentials (single sign-on) rather than a separate SAP-managed identity. A custom Trust Configuration points the subaccount at a different identity provider — commonly SAP Identity Authentication Service (IAS) itself federated with a corporate Active Directory or another SAML/OIDC provider — so users authenticate with their familiar corporate login, custom user attributes can flow through into the token, and user provisioning/deprovisioning stays centrally managed at the corporate identity level rather than duplicated in BTP.",
    hindiExplanation:
      "Default mein, ek naya BTP subaccount SAP ke apne default identity provider ko authentication ke liye trust karta hai — quick starts ya trial scenarios ke liye theek hai, lekin ek enterprise ke liye appropriate nahi jo chahti hai employees apne existing corporate credentials se login karein (single sign-on), alag SAP-managed identity se nahi. Custom Trust Configuration subaccount ko ek doosre identity provider pe point karta hai — commonly SAP Identity Authentication Service (IAS) khud, corporate Active Directory ya kisi doosre SAML/OIDC provider se federated — taaki users apne familiar corporate login se authenticate ho sakein, custom user attributes token mein flow ho sakein, aur user provisioning/deprovisioning centrally corporate identity level pe managed rahe.",
    interviewExplanation:
      "I'd explain the enterprise SSO need: 'A Trust Configuration establishes which identity provider a subaccount trusts. The default SAP one is fine for trials, but an enterprise wanting corporate single sign-on would set up a custom Trust Configuration pointing to IAS, federated with their own Active Directory or another provider — so employees log in with their familiar corporate credentials, and user lifecycle stays centrally managed there.'",
    diagramNote:
      "Default: 'Subaccount trusts SAP default IdP'. Custom: 'Subaccount trusts custom Trust Configuration → IAS → federated with Corporate AD/SAML/OIDC' → 'Employees log in with corporate credentials (SSO)'.",
    diagramMermaid: `flowchart LR
    A["Default: Subaccount<br/>trusts SAP default IdP"]
    B["Custom Trust Configuration"] --> C["IAS"] --> D["Federated with<br/>Corporate AD / SAML / OIDC"]
    D --> E["Employees log in with<br/>corporate credentials (SSO)"]`,
    realProjectExample:
      "An enterprise customer configured a custom Trust Configuration pointing their BTP subaccount to IAS, federated with their corporate Azure AD, so employees logged into Fiori apps with the exact same credentials they used for email — no separate SAP-managed accounts to maintain.",
    interviewTip:
      "If asked 'why not just use SAP's default identity provider always', the answer centers on enterprise SSO, centralized user lifecycle management, and custom attribute needs — not a technical limitation of the default provider itself.",
    followupQuestions: [
      "What is IAS and how does it relate to a Trust Configuration?",
      "Can a subaccount have multiple Trust Configurations?",
      "What happens to existing user sessions if you change the Trust Configuration?",
    ],
    commonMistakes: [
      "Not knowing IAS is the common bridge between BTP and a corporate identity provider.",
      "Assuming the default identity provider is fine for any enterprise scenario.",
    ],
    importantPoints: [
      "Trust Configuration = which identity provider a subaccount trusts.",
      "Custom ones (often via IAS) enable corporate SSO, custom attributes, centralized user lifecycle.",
      "Default SAP IdP is fine for trials, not typically for enterprise production.",
    ],
    revisionNotes: "Trust Configuration = subaccount's trusted IdP. Custom (via IAS, federated with corporate IdP) enables SSO — default SAP IdP is trial-grade only.",
  },
  {
    id: "sec-q10",
    topic: "IAS",
    prompt: "What is SAP Identity Authentication Service (IAS), and how does it relate to XSUAA?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["ias", "identity"],
    estimatedMinutes: 3,
    expectedAnswer:
      "IAS is SAP's cloud identity provider — it authenticates users (handling login, MFA, federation with corporate directories) and issues an initial identity assertion; XSUAA then consumes that identity to issue the actual OAuth access tokens with app-specific scopes — IAS handles 'who you are', XSUAA handles 'what you can do here'.",
    detailedAnswer:
      "IAS is specifically the identity provider layer — it owns the actual login experience (username/password, multi-factor authentication, social login, or federation with a corporate Active Directory/SAML IdP), and can serve as a central identity hub across many different applications and even across multiple BTP subaccounts. XSUAA, by contrast, is the authorization server for a specific app/subaccount — after IAS establishes who the user is, XSUAA takes that identity and issues an OAuth token scoped with the specific app's roles/scopes. In practice, a Trust Configuration wires a subaccount's XSUAA to trust IAS as its identity source, cleanly separating the 'authenticate the person' concern (IAS) from the 'authorize them for this specific app' concern (XSUAA).",
    hindiExplanation:
      "IAS specifically identity provider layer hai — ye actual login experience own karta hai (username/password, multi-factor authentication, social login, ya corporate Active Directory/SAML IdP se federation), aur ek central identity hub ki tarah serve kar sakta hai kai alag applications aur multiple BTP subaccounts ke aar-paar. XSUAA iske ulta ek specific app/subaccount ka authorization server hai — IAS ye establish karne ke baad ki user kaun hai, XSUAA us identity ko leke ek OAuth token issue karta hai jo specific app ke roles/scopes se scoped hota hai. Practically, Trust Configuration ek subaccount ke XSUAA ko IAS ko apne identity source ki tarah trust karne ke liye wire karta hai — 'person ko authenticate karna' (IAS) aur 'unhe is specific app ke liye authorize karna' (XSUAA) do alag concerns cleanly separate hote hain.",
    interviewExplanation:
      "I'd give the clean division: 'IAS is the identity provider — it owns the actual login experience, MFA, and federation with a corporate directory, and can act as a central identity hub across many apps and subaccounts. XSUAA is the authorization server for a specific app — after IAS establishes who you are, XSUAA issues the OAuth token scoped with that app's specific roles. IAS handles who you are; XSUAA handles what you can do here.'",
    diagramNote:
      "'IAS (identity provider: login, MFA, federation)' → 'establishes identity' → 'XSUAA (authorization server: app-specific scopes)' → 'issues OAuth token for this app'.",
    diagramMermaid: `flowchart LR
    A["IAS<br/>identity provider: login, MFA, federation"] --> B["Establishes identity"]
    B --> C["XSUAA<br/>authorization server: app-specific scopes"]
    C --> D["Issues OAuth token for this app"]`,
    realProjectExample:
      "A single IAS tenant served as the central identity hub for an organization's employees, while each of their five different BTP subaccounts had its own XSUAA authorization server issuing app-specific scopes after IAS confirmed the user's identity once.",
    interviewTip:
      "The clean summary — 'IAS = who you are, XSUAA = what you can do here' — is a memorable, accurate way to answer this frequently-confused distinction in an interview.",
    followupQuestions: [
      "Can one IAS tenant serve multiple BTP subaccounts?",
      "What does IAS provide beyond simple username/password login?",
      "How does a Trust Configuration technically wire XSUAA to IAS?",
    ],
    commonMistakes: [
      "Using IAS and XSUAA interchangeably as if they're the same thing.",
      "Not knowing IAS can serve as a central identity hub across multiple apps/subaccounts.",
    ],
    importantPoints: [
      "IAS = identity provider (login, MFA, federation) — 'who you are'.",
      "XSUAA = app-specific authorization server (scopes) — 'what you can do here'.",
      "A Trust Configuration wires a subaccount's XSUAA to trust IAS as its identity source.",
    ],
    revisionNotes: "IAS = identity provider (who you are — login/MFA/federation). XSUAA = authorization server (what you can do — app scopes). Trust Configuration links them.",
  },
  {
    id: "sec-q11",
    topic: "IPS",
    prompt: "What is SAP Identity Provisioning Service (IPS), and what problem does it solve?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["ips", "provisioning"],
    estimatedMinutes: 2,
    expectedAnswer:
      "IPS automates user account provisioning and deprovisioning across connected systems — when an employee joins, changes role, or leaves in a source system (like SuccessFactors or a corporate directory), IPS automatically creates, updates, or removes their accounts in target systems (like IAS or an on-prem system), instead of manual admin work.",
    detailedAnswer:
      "Without automated provisioning, onboarding or offboarding an employee across many connected systems means an admin manually creating or deleting accounts in each one — slow, error-prone, and a real security risk if an offboarded employee's access isn't promptly revoked everywhere. IPS solves this by acting as a synchronization hub: it reads user/group changes from a source system (an HR system like SuccessFactors, a corporate directory, or IAS itself) and automatically propagates create/update/delete operations to configured target systems, keeping identity data consistent across the landscape without manual intervention, and critically ensuring departed employees lose access everywhere promptly.",
    hindiExplanation:
      "Automated provisioning ke bina, ek employee ko kai connected systems mein onboard ya offboard karna matlab ek admin ko manually har jagah account create/delete karna padta — slow, error-prone, aur ek real security risk agar offboarded employee ki access sab jagah promptly revoke na ho. IPS ye solve karta hai ek synchronization hub ki tarah act karke — ye ek source system se user/group changes padhta hai (jaise SuccessFactors, corporate directory, ya IAS khud) aur automatically create/update/delete operations ko configured target systems tak propagate karta hai, identity data ko consistent rakhta hai poore landscape mein bina manual intervention ke, aur importantly ye ensure karta hai ki departed employees ki access sab jagah promptly khatam ho jaaye.",
    interviewExplanation:
      "I'd focus on the security/efficiency problem it solves: 'Without automation, onboarding or offboarding across many systems means manual account creation and deletion everywhere — slow and a real security risk if access isn't revoked promptly. IPS synchronizes user changes from a source like SuccessFactors or a corporate directory, automatically propagating create/update/delete to target systems like IAS, keeping identity data consistent and ensuring departed employees lose access everywhere quickly.'",
    diagramNote:
      "'Source system (SuccessFactors/corporate directory)' → user change (join/role change/leave) → 'IPS synchronizes' → propagates to 'Target systems (IAS, on-prem systems)'.",
    diagramMermaid: `flowchart LR
    A["Source system<br/>SuccessFactors/corporate directory"] -- "user change<br/>join/role change/leave" --> B["IPS synchronizes"]
    B --> C["Target systems<br/>IAS, on-prem systems"]`,
    realProjectExample:
      "Configuring IPS to sync from SuccessFactors to IAS meant a new hire's account was automatically created with correct group memberships the same day they were entered into HR, and an employee's departure automatically revoked their access across every connected system within hours, not weeks.",
    interviewTip:
      "Mentioning the security risk angle (delayed offboarding = real vulnerability) alongside the efficiency angle shows a more complete understanding of why IPS matters, not just 'it saves admin time'.",
    followupQuestions: [
      "What are common source and target systems IPS connects?",
      "How quickly does a change in the source system propagate via IPS?",
      "What's the security risk of NOT having automated deprovisioning?",
    ],
    commonMistakes: [
      "Confusing IPS (provisioning/synchronization) with IAS (authentication) — they're related but distinct services.",
      "Only mentioning the efficiency benefit and missing the security/compliance angle of prompt deprovisioning.",
    ],
    importantPoints: [
      "IPS automates user provisioning/deprovisioning across connected systems.",
      "Synchronizes from a source (HR system, directory) to targets (IAS, on-prem).",
      "Critical for both efficiency and security — prompt offboarding closes access gaps.",
    ],
    revisionNotes: "IPS = automated user provisioning/deprovisioning sync (source like SuccessFactors → targets like IAS/on-prem) — efficiency + security (prompt offboarding).",
  },
  {
    id: "sec-q12",
    topic: "XSUAA",
    prompt: "What does xs-security.json's 'oauth2-configuration' section typically control, and why would you configure a redirect URI there?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["xsuaa", "xs-security-json"],
    estimatedMinutes: 2,
    expectedAnswer:
      "It configures OAuth 2.0 client behavior for the app's XSUAA binding, including allowed redirect URIs — XSUAA will only redirect back to explicitly whitelisted URIs after login, preventing an attacker from tricking the flow into redirecting a stolen authorization code to a malicious URL.",
    detailedAnswer:
      "The oauth2-configuration section in xs-security.json declares settings like allowed redirect URIs, token validity duration, and refresh token behavior for the app's OAuth client. Redirect URI whitelisting specifically is a security control against authorization code interception attacks — during the Authorization Code flow, the identity provider only redirects the browser back to a URI on this explicit allowlist after successful login, so even if an attacker could manipulate a redirect parameter, they couldn't redirect the authorization code to their own malicious endpoint since it isn't on the configured list.",
    hindiExplanation:
      "oauth2-configuration section xs-security.json mein settings declare karta hai jaise allowed redirect URIs, token validity duration, aur refresh token behavior app ke OAuth client ke liye. Redirect URI whitelisting specifically ek security control hai authorization code interception attacks ke against — Authorization Code flow ke dauraan, identity provider sirf browser ko is explicit allowlist pe kisi URI pe redirect karta hai successful login ke baad, isliye chahe attacker ek redirect parameter manipulate kar sake, wo authorization code ko apne malicious endpoint pe redirect nahi kar sakta kyunki wo configured list pe nahi hai.",
    interviewExplanation:
      "I'd frame this as a specific security control: 'oauth2-configuration in xs-security.json declares OAuth client settings, including allowed redirect URIs. Whitelisting redirect URIs specifically defends against authorization code interception — the identity provider only redirects back to an explicitly allowed URI after login, so an attacker manipulating the redirect parameter can't send the authorization code to their own malicious endpoint.'",
    diagramNote:
      "'Authorization Code flow completes' → 'Identity provider checks redirect URI against xs-security.json allowlist' → if matched 'redirect with code' if not matched 'reject, preventing code interception'.",
    diagramMermaid: `flowchart TD
    A["Authorization Code flow completes"] --> B{"Redirect URI on<br/>xs-security.json allowlist?"}
    B -->|Yes| C["Redirect with code"]
    B -->|No| D["Reject — prevents<br/>code interception"]`,
    realProjectExample:
      "A security review flagged an overly permissive wildcard redirect URI configuration, tightening it to the exact production and staging URLs specifically to close a potential authorization-code-interception vector before go-live.",
    interviewTip:
      "If asked why redirect URIs need to be whitelisted rather than accepted freely, the authorization-code-interception attack scenario is the concrete, correct security rationale to cite.",
    followupQuestions: [
      "What would happen if a redirect URI were left as a permissive wildcard?",
      "How would you configure different redirect URIs for dev, staging, and production?",
      "What other settings live in the oauth2-configuration section besides redirect URIs?",
    ],
    commonMistakes: [
      "Using an overly permissive wildcard redirect URI for convenience, weakening this security control.",
      "Not knowing why redirect URI whitelisting matters — treating it as just boilerplate configuration.",
    ],
    importantPoints: [
      "oauth2-configuration in xs-security.json controls redirect URIs, token validity, refresh behavior.",
      "Redirect URI whitelisting defends against authorization code interception attacks.",
      "Should be scoped precisely per environment, not left permissively broad.",
    ],
    revisionNotes: "xs-security.json's oauth2-configuration whitelists redirect URIs — defends against authorization code interception by rejecting redirects to unlisted URLs.",
  },
  {
    id: "sec-q13",
    topic: "XSUAA",
    prompt: "How would you handle a scenario where an app needs to call another BTP app's API on behalf of the same logged-in user (not as a separate technical user)?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["xsuaa", "token-exchange"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Use the JWT Bearer token exchange grant — the calling app presents the original user's token to XSUAA and requests a new token scoped for the target app, preserving the original user's identity throughout, rather than falling back to a separate Client Credentials call that would lose the user context.",
    detailedAnswer:
      "If App A needs to call App B's API while preserving 'this is user X calling', simply using Client Credentials would authenticate as App A's own technical identity, losing the actual user context entirely — App B would see a generic service call, not user X's request. The JWT Bearer grant solves this: App A presents the user's existing JWT to XSUAA, requesting a new token scoped for App B, and XSUAA issues a token that still represents user X but now carries App B's specific scopes — preserving the end-to-end user identity across the service-to-service hop, which matters for both correct per-user authorization on App B's side and accurate audit logging.",
    hindiExplanation:
      "Agar App A ko App B ki API call karni hai 'ye user X call kar raha hai' preserve karte hue, sirf Client Credentials use karna App A ki apni technical identity se authenticate karega, actual user context poori tarah lose ho jaayega — App B ko ek generic service call dikhegi, user X ki request nahi. JWT Bearer grant ye solve karta hai: App A user ka existing JWT XSUAA ko present karta hai, App B ke liye scoped ek naya token request karte hue, aur XSUAA ek token issue karta hai jo abhi bhi user X ko represent karta hai lekin App B ke specific scopes carry karta hai.",
    interviewExplanation:
      "I'd name the specific grant and explain why it's needed: 'Using Client Credentials here would lose the user context entirely — App B would just see a generic service call. The JWT Bearer grant solves this: App A presents the user's existing token to XSUAA, requesting a new token scoped for App B, and XSUAA issues one that still represents that same user but carries App B's scopes — preserving identity end-to-end for correct authorization and audit logging.'",
    diagramNote:
      "'App A has user X's JWT' → 'JWT Bearer exchange with XSUAA, requesting App B scope' → 'New token: still user X, now scoped for App B' → 'App B sees the real user, not a generic service call'.",
    diagramMermaid: `flowchart LR
    A["App A has<br/>user X's JWT"] --> B["JWT Bearer exchange<br/>with XSUAA"]
    B --> C["New token: still user X,<br/>scoped for App B"]
    C --> D["App B sees the real user"]`,
    realProjectExample:
      "A dashboard app calling a separate reporting API needed the reporting API to enforce the actual logged-in user's row-level data restrictions, which required token exchange via JWT Bearer rather than a simpler Client Credentials call that would have exposed all data indiscriminately.",
    interviewTip:
      "If asked how you'd preserve user identity across a service-to-service call (not just authenticate as a generic service), naming the JWT Bearer grant specifically is the precise, correct answer over a vague 'pass the token along'.",
    followupQuestions: [
      "Why can't you just forward the original JWT directly to App B without an exchange?",
      "What scopes would the new exchanged token actually contain?",
      "Is this related to principal propagation, or a distinct mechanism?",
    ],
    commonMistakes: [
      "Using Client Credentials for a call that actually needs to preserve the original user's identity.",
      "Assuming you can just forward the original JWT unchanged to a different app expecting its own scopes.",
    ],
    importantPoints: [
      "JWT Bearer grant exchanges an existing user token for a new one scoped to a different app.",
      "Preserves the original user's identity across a service-to-service call.",
      "Distinct from Client Credentials, which authenticates as the calling service itself, losing user context.",
    ],
    revisionNotes: "JWT Bearer grant = exchange user's existing token for one scoped to another app, preserving user identity — use instead of Client Credentials when user context must be preserved.",
  },
  {
    id: "sec-q14",
    topic: "OAuth",
    prompt: "What is PKCE (Proof Key for Code Exchange), and why does it matter for the Authorization Code flow?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["oauth", "pkce"],
    estimatedMinutes: 2,
    expectedAnswer:
      "PKCE adds a dynamically generated secret (a code verifier/challenge pair) to the Authorization Code flow, so even if an intercepted authorization code is stolen, an attacker can't exchange it for tokens without also having the original code verifier — protecting public clients (like mobile/SPA apps) that can't safely store a traditional client secret.",
    detailedAnswer:
      "Traditional Authorization Code flow security partly relies on a confidential client secret only the legitimate app knows, but public clients (mobile apps, single-page browser apps) can't securely store a secret — anything embedded in client-side code is extractable. PKCE addresses this: before starting the flow, the client generates a random 'code verifier' and sends its hashed form (the 'code challenge') with the initial authorization request; when exchanging the authorization code for tokens later, it must present the original code verifier, which the server checks against the challenge sent earlier. Even if an attacker intercepts the authorization code itself, they can't complete the token exchange without also having the original code verifier, which never left the legitimate client.",
    hindiExplanation:
      "Traditional Authorization Code flow ki security partly ek confidential client secret pe rely karti hai jo sirf legitimate app jaanta hai, lekin public clients (mobile apps, single-page browser apps) securely ek secret store nahi kar sakte — client-side code mein embedded kuch bhi extractable hai. PKCE ise address karta hai: flow shuru karne se pehle, client ek random 'code verifier' generate karta hai aur uska hashed form ('code challenge') initial authorization request ke saath bhejta hai; baad mein authorization code ko tokens ke liye exchange karte waqt, use original code verifier present karna padta hai.",
    interviewExplanation:
      "I'd explain the public-client problem it solves: 'Public clients like mobile or SPA apps can't securely store a client secret. PKCE has the client generate a random code verifier and send its hashed challenge upfront, then present the original verifier when exchanging the code for tokens. Even if an attacker intercepts the authorization code, they can't complete the exchange without the original verifier, which never left the legitimate client.'",
    diagramNote:
      "'Client generates code verifier → sends hashed code challenge with auth request' → 'later: presents original verifier when exchanging code for tokens' → 'Server checks verifier matches challenge — intercepted code alone is useless without it'.",
    diagramMermaid: `flowchart TD
    A["Client generates code verifier,<br/>sends hashed challenge"] --> B["Auth code issued"]
    B --> C["Client presents original<br/>verifier to exchange code"]
    C --> D["Server checks verifier matches<br/>challenge — intercepted code alone is useless"]`,
    realProjectExample:
      "A mobile app team initially planned to embed a client secret directly in the app binary before realizing it could be extracted by anyone; switching to PKCE eliminated the need for that secret entirely while maintaining the same security guarantee against code interception.",
    interviewTip:
      "If asked how a mobile app or SPA can safely use the Authorization Code flow without a client secret, PKCE is the specific, correct mechanism to name.",
    followupQuestions: [
      "What's the difference between the code verifier and the code challenge?",
      "Would a confidential server-side web app still benefit from using PKCE?",
      "What attack does PKCE specifically defend against?",
    ],
    commonMistakes: [
      "Embedding a client secret in a public client (mobile app/SPA) instead of using PKCE.",
      "Not knowing PKCE specifically defends against authorization code interception for public clients.",
    ],
    importantPoints: [
      "PKCE adds a dynamically generated code verifier/challenge pair to the Authorization Code flow.",
      "Protects public clients (mobile/SPA) that can't safely store a traditional client secret.",
      "An intercepted authorization code alone is useless without the original code verifier.",
    ],
    revisionNotes: "PKCE = code verifier/challenge pair added to Authorization Code flow — protects public clients (mobile/SPA) without a client secret, defeats code-interception attacks.",
  },
  {
    id: "sec-q15",
    topic: "JWT",
    prompt: "How would you handle token expiry gracefully in a long-running user session — would you force the user to log in again every time the token expires?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["jwt", "refresh-tokens"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Use a refresh token — a longer-lived credential issued alongside the access token, which the client can silently exchange for a new access token when the current one expires, without requiring the user to re-authenticate interactively each time, as long as the refresh token itself remains valid.",
    detailedAnswer:
      "Access tokens (JWTs) are deliberately short-lived to limit the damage window if one is compromised, but forcing users to fully re-login every time a short-lived token expires would be a poor experience. A refresh token, issued alongside the access token during the initial login, is longer-lived and can be exchanged (via a token endpoint call) for a fresh access token silently in the background whenever the current one expires — as long as the refresh token itself hasn't expired or been revoked. This gives the security benefit of short-lived access tokens (limiting exposure if one leaks) while still providing a seamless long-running session experience for the user.",
    hindiExplanation:
      "Access tokens (JWTs) deliberately short-lived hote hain damage window limit karne ke liye agar ek compromise ho jaaye, lekin har baar jab ek short-lived token expire ho tab users ko poori tarah re-login karwana ek poor experience hoga. Ek refresh token, jo access token ke saath initial login ke dauraan issue hota hai, longer-lived hota hai aur exchange kiya ja sakta hai (ek token endpoint call se) ek fresh access token ke liye silently background mein jab bhi current wala expire ho — jab tak refresh token khud expire ya revoke nahi hua ho.",
    interviewExplanation:
      "I'd explain the balance it strikes: 'Access tokens are deliberately short-lived to limit exposure if compromised, but forcing full re-login every time would be a bad experience. A refresh token, issued alongside the access token, is longer-lived and gets silently exchanged for a fresh access token in the background whenever the current one expires — giving both the security benefit of short-lived tokens and a seamless session for the user.'",
    diagramNote:
      "'Access token (short-lived, expires)' + 'Refresh token (longer-lived)' → on expiry: 'silently exchange refresh token for new access token' → 'no interactive re-login needed, unless refresh token itself expired/revoked'.",
    diagramMermaid: `flowchart LR
    A["Access token expires<br/>short-lived"] --> B["Silently exchange<br/>refresh token"]
    B --> C["New access token issued<br/>no interactive re-login"]`,
    realProjectExample:
      "A user reported being logged out every 15 minutes before refresh-token-based silent renewal was properly implemented in the frontend's token handling logic — after the fix, sessions remained seamless for hours while access tokens still individually expired every 15 minutes underneath.",
    interviewTip:
      "If asked why access tokens are short-lived instead of just making them long-lived to avoid this complexity, the security answer — limiting the exposure window if a token leaks — is the correct justification for the refresh-token pattern's added complexity.",
    followupQuestions: [
      "What happens if a refresh token itself is stolen?",
      "How would you revoke a user's session immediately, given tokens are normally self-contained and valid until expiry?",
      "Where should a refresh token be stored on the client to minimize theft risk?",
    ],
    commonMistakes: [
      "Making access tokens very long-lived to avoid refresh complexity, weakening the security benefit of short-lived tokens.",
      "Not knowing refresh tokens are the standard mechanism for silent, seamless session renewal.",
    ],
    importantPoints: [
      "Access tokens are short-lived to limit exposure if compromised.",
      "Refresh tokens are longer-lived and silently exchanged for new access tokens.",
      "This balances security (short-lived tokens) with a seamless user session experience.",
    ],
    revisionNotes: "Refresh tokens (longer-lived) silently renew short-lived access tokens without forcing re-login — balances security (short access token life) with seamless sessions.",
  },
  {
    id: "sec-q16",
    topic: "Role Collections",
    prompt: "Can a user be assigned Role Collections at different organizational levels (e.g. global account versus a specific subaccount), and how would conflicts be resolved?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["role-collections", "org-levels"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Role Collections are typically assigned at the subaccount level where the relevant apps actually run, not usually inherited automatically from a higher global-account level — so 'conflicts' in the sense of overlapping org levels rarely arise the way they might in a system with hierarchical permission inheritance; access is additive based on whatever Role Collections a user is directly assigned in that specific subaccount.",
    detailedAnswer:
      "Unlike some systems with complex hierarchical inheritance (where a parent-level permission might override or combine unpredictably with a child-level one), BTP's Role Collection assignment is straightforwardly scoped to the subaccount where a user needs access — you assign Role Collections directly in the subaccount where the relevant apps are deployed. If a user needs access in multiple subaccounts, they're assigned appropriate Role Collections separately in each one. Within a single subaccount, if a user has multiple Role Collections, the effective permissions are simply the union of all scopes granted across all their assigned collections — additive, not something requiring complex conflict resolution logic.",
    hindiExplanation:
      "Kuch systems ke complex hierarchical inheritance ke ulta (jaha ek parent-level permission unpredictably ek child-level ke saath override ya combine ho sakti hai), BTP ka Role Collection assignment straightforwardly us subaccount tak scoped hota hai jaha user ko access chahiye — tum Role Collections directly us subaccount mein assign karte ho jaha relevant apps deploy hain. Agar user ko multiple subaccounts mein access chahiye, unhe appropriate Role Collections alag-alag har ek mein assign kiya jaata hai. Ek single subaccount ke andar, agar user ke paas multiple Role Collections hain, effective permissions simply saare granted scopes ka union hote hain unke saare assigned collections mein.",
    interviewExplanation:
      "I'd clarify there isn't complex hierarchical inheritance to conflict-resolve: 'Role Collections are assigned directly in the subaccount where the relevant apps run — there isn't automatic inheritance from a higher global-account level the way some hierarchical systems work. If a user has multiple Role Collections within one subaccount, the effective permissions are simply the union of all granted scopes — additive, not something needing complex conflict resolution.'",
    diagramNote:
      "'User assigned Role Collection A + Role Collection B in same subaccount' → 'Effective permissions = union of all scopes from A and B' — additive, no conflict-resolution logic needed.",
    diagramMermaid: `flowchart LR
    A["Role Collection A"] --> C["Effective permissions =<br/>union of all scopes"]
    B["Role Collection B"] --> C`,
    realProjectExample:
      "A user needing access to both a reporting app and an order-approval app in the same subaccount was simply assigned both relevant Role Collections, with their effective access being the straightforward combination of both — no special handling needed for the 'overlap'.",
    interviewTip:
      "If asked about permission conflicts across org levels, correcting the premise — that BTP's model is subaccount-scoped and additive within a subaccount, not deeply hierarchical — shows accurate understanding of the actual access model rather than assuming complexity that doesn't apply here.",
    followupQuestions: [
      "How would you audit which Role Collections a specific user currently has across all subaccounts?",
      "Is there any scenario where a broader, org-level role assignment mechanism exists in BTP?",
      "How would you remove a user's access cleanly if they change roles within the organization?",
    ],
    commonMistakes: [
      "Assuming BTP has complex hierarchical permission inheritance requiring conflict-resolution logic, when access is actually additive within a subaccount.",
      "Not realizing Role Collections need to be assigned separately per subaccount a user needs access to.",
    ],
    importantPoints: [
      "Role Collections are assigned at the subaccount level, not inherited from a higher global-account level.",
      "Multiple Role Collections for the same user in one subaccount combine additively (union of scopes).",
      "No complex conflict-resolution logic is needed — the model isn't deeply hierarchical.",
    ],
    revisionNotes: "Role Collections assigned per subaccount, not inherited hierarchically from global account. Multiple collections for one user combine additively (union of scopes) — no conflict resolution needed.",
  },
  {
    id: "sec-q17",
    topic: "Scopes",
    prompt: "How would you design scopes to support a 'read your own records only' versus 'read all records' distinction for the same entity?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["scopes", "instance-based-authorization"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A scope alone (like `Orders.Read`) can't express 'only your own records' — that requires instance-based authorization logic in the handler (comparing the record's owner field against the authenticated user's identity from the token), often combined with a broader scope (like `Orders.ReadAll`) that bypasses this restriction for privileged users.",
    detailedAnswer:
      "Scopes are effective at expressing coarse-grained, operation-level permissions ('can this user read Orders at all'), but they're not designed to express row-level/instance-based conditions ('only orders this specific user owns'). For that finer distinction, you'd implement instance-based authorization in your handler logic (or a CAP `@restrict` with an instance-based condition referencing `$user`), comparing a record's owner/creator field against the authenticated user's identity extracted from the token. A common combined design: a base scope (`Orders.Read`) grants access filtered to the user's own records by default, while a separate, more privileged scope (`Orders.ReadAll`) — granted only to specific roles like managers — bypasses that instance filter entirely, letting the same entity support both restricted and broad access via a combination of scope-level and instance-level checks.",
    hindiExplanation:
      "Scopes coarse-grained, operation-level permissions express karne mein effective hain ('ye user Orders read kar sakta hai ya nahi'), lekin wo row-level/instance-based conditions express karne ke liye design nahi hue ('sirf woh orders jo ye specific user own karta hai'). Us finer distinction ke liye, tum instance-based authorization implement karoge handler logic mein (ya ek CAP `@restrict` instance-based condition ke saath `$user` reference karte hue), ek record ke owner/creator field ko authenticated user ki identity se compare karte hue jo token se extract hoti hai.",
    interviewExplanation:
      "I'd explain the layered approach: 'Scopes handle coarse-grained, operation-level permissions, but not row-level instance conditions like own-records-only. For that, I'd implement instance-based authorization, comparing a record's owner field against the authenticated user's identity — often via a CAP @restrict with an instance-based condition on $user. A common design combines a base scope filtering to own records with a separate, more privileged scope like Orders.ReadAll that bypasses the filter for managers.'",
    diagramNote:
      "'Orders.Read scope: filtered to own records (instance-based check on owner field vs $user)' vs 'Orders.ReadAll scope: privileged, bypasses instance filter entirely' — combines scope-level and instance-level checks.",
    diagramMermaid: `flowchart LR
    A["Orders.Read scope"] --> B["Filtered to own records<br/>instance check vs $user"]
    C["Orders.ReadAll scope"] --> D["Privileged, bypasses<br/>instance filter"]`,
    realProjectExample:
      "A CAP service used an instance-based @restrict condition filtering employees to their own expense reports by default, with a separate 'ReadAll' scope granted only to finance managers allowing them to see every employee's reports — combining a coarse scope check with a fine-grained instance-level condition.",
    interviewTip:
      "If asked how to implement 'users see only their own data', the precise answer distinguishes scope-level (operation-wide) permissions from instance-based (row-level) authorization logic — conflating the two is a common gap in weaker answers.",
    followupQuestions: [
      "How would a CAP @restrict instance-based condition actually reference the current user?",
      "What's the performance consideration of an instance-based filter applied to every query?",
      "How would you test that a regular user genuinely can't see another user's records?",
    ],
    commonMistakes: [
      "Trying to express row-level 'own records only' restrictions purely through scope naming, without instance-based logic.",
      "Not knowing CAP's @restrict supports instance-based conditions referencing the current user.",
    ],
    importantPoints: [
      "Scopes express coarse, operation-level permissions — not row-level/instance conditions.",
      "Instance-based authorization (comparing owner field to authenticated user) handles 'own records only'.",
      "A combined design: base scope filters to own records, a privileged scope bypasses the filter entirely.",
    ],
    revisionNotes: "Scopes = coarse operation-level permissions. 'Own records only' needs instance-based authorization (owner field vs $user) — combine with a privileged bypass scope (e.g. ReadAll) for managers.",
  },
  {
    id: "sec-q18",
    topic: "Authorization",
    prompt: "How would you unit-test authorization logic that depends on the authenticated user's roles, without a real login flow?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["authorization", "testing"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Use a mocked authentication context in your test framework (like CAP's cds.test mocked-user support) to simulate a request as a user with specific roles/scopes, then assert both a positive case (correctly permitted) and a negative case (correctly denied with a 403) — without needing a real XSUAA token exchange.",
    detailedAnswer:
      "Testing authorization logic against a real XSUAA login flow in every automated test would be slow and fragile, dependent on external infrastructure. Instead, mock the authenticated identity directly in the test — specifying that a given test request should be treated as coming from a user with certain roles, without any real token exchange — letting you write both a positive test (a user with 'Admin' successfully performs a restricted action) and a negative test (a user without that role correctly receives a 403), entirely offline and fast. This is essential for actually exercising both branches of your authorization logic, since only testing the happy path would miss whether the restriction genuinely blocks unauthorized users.",
    hindiExplanation:
      "Ek real XSUAA login flow ke against authorization logic test karna har automated test mein slow aur fragile hoga, external infrastructure pe dependent. Iske bajaye, authenticated identity ko directly test mein mock karo — specify karo ki ek given test request ko certain roles wale user se aaya treat kiya jaaye, bina kisi real token exchange ke — tumhe dono ek positive test likhne dete hue (ek 'Admin' wala user successfully ek restricted action perform karta hai) aur ek negative test (ek user jiske paas wo role nahi hai correctly 403 receive karta hai), entirely offline aur fast.",
    interviewExplanation:
      "I'd explain both the mechanism and the necessity of testing both branches: 'I'd mock the authenticated identity directly in the test — like CAP's cds.test mocked-user support — specifying a request comes from a user with certain roles, without real token exchange. That lets me write both a positive test, where an Admin user succeeds, and a negative test, where a user without that role correctly gets a 403 — entirely offline and fast, and critically testing both branches of the authorization logic.'",
    diagramNote:
      "'Test framework mocks authenticated user (roles specified directly, no real token)' → 'Positive test: correct role → operation succeeds' + 'Negative test: missing role → 403 correctly returned'.",
    diagramMermaid: `flowchart TD
    A["Test mocks authenticated user<br/>roles specified, no real token"] --> B["Positive test:<br/>correct role → succeeds"]
    A --> C["Negative test:<br/>missing role → 403"]`,
    realProjectExample:
      "Our test suite used mocked authentication to verify both that an Admin-role user could delete a record and that a regular user attempting the same action correctly received a 403 — catching a real regression once when a refactor accidentally removed the restriction entirely.",
    interviewTip:
      "If asked whether you test authorization failure paths (not just success), confidently describing negative-case testing with mocked roles shows a thorough testing mindset, not just happy-path coverage.",
    followupQuestions: [
      "How would you configure a mocked user's specific roles in a cds.test setup?",
      "Would you ever also want a real integration test against actual XSUAA, and when?",
      "How would you test instance-based authorization (own-records-only) specifically?",
    ],
    commonMistakes: [
      "Only testing the happy path where the user has sufficient permissions, never the denied case.",
      "Attempting real XSUAA token exchange in tests instead of using mocked authentication.",
    ],
    importantPoints: [
      "Mock the authenticated user's roles directly in tests, avoiding real token exchange.",
      "Test both positive (permitted) and negative (correctly denied, 403) cases.",
      "Essential for catching regressions where an authorization restriction is accidentally removed or weakened.",
    ],
    revisionNotes: "Test authorization with mocked user roles (e.g. cds.test) — no real XSUAA token needed. Test BOTH positive (permitted) and negative (403 denied) cases to catch regressions.",
  },
  {
    id: "sec-q19",
    topic: "Authorization",
    prompt: "What's the security risk of implementing authorization checks only in the UI layer (like hiding a button) rather than the backend?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["authorization", "defense-in-depth"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A UI-only restriction (hiding a button) is trivially bypassable — a user can call the underlying API directly (via browser dev tools, a script, or a different client) regardless of what the UI shows, so the backend must independently enforce every authorization rule; UI-level hiding is a UX nicety, never a real security boundary.",
    detailedAnswer:
      "Hiding a delete button for non-admin users in the UI improves the experience by not showing an option they can't use, but it provides zero actual security — nothing stops a user from directly calling the underlying DELETE API endpoint via browser dev tools, a REST client, or a custom script, entirely bypassing whatever the UI does or doesn't render. The backend (CAP service, RAP business object) must independently enforce every authorization rule regardless of what the UI shows, since the UI is fundamentally client-controlled and untrusted from the server's perspective. The correct mental model: UI-level restrictions are a UX convenience, backend authorization checks are the actual security boundary — and you always need the latter, with the former being optional polish on top.",
    hindiExplanation:
      "Non-admin users ke liye UI mein ek delete button hide karna experience improve karta hai unhe ek option na dikha kar jo wo use nahi kar sakte, lekin ye zero actual security provide karta hai — kuch bhi ek user ko underlying DELETE API endpoint directly call karne se nahi rokta browser dev tools, ek REST client, ya ek custom script se, poori tarah bypass karte hue jo bhi UI render kare ya na kare. Backend (CAP service, RAP business object) ko independently har authorization rule enforce karna hi hoga, kyunki UI fundamentally client-controlled aur untrusted hai server ke perspective se.",
    interviewExplanation:
      "I'd state this as a fundamental security principle: 'Hiding a button in the UI is purely a UX nicety — nothing stops a user from directly calling the underlying API via dev tools or a script, entirely bypassing whatever the UI shows. The backend must independently enforce every authorization rule regardless, since the UI is client-controlled and untrusted from the server's perspective. UI restrictions are convenience; backend checks are the actual security boundary — you always need the latter.'",
    diagramNote:
      "'UI hides delete button (UX nicety only)' vs 'User calls DELETE API directly via dev tools/script — bypasses UI entirely' → 'Backend MUST independently enforce authorization — the only real security boundary'.",
    diagramMermaid: `flowchart LR
    A["UI hides delete button<br/>UX nicety only"] -.->|"bypassable"| B["User calls DELETE API<br/>directly via dev tools"]
    B --> C["Backend MUST independently<br/>enforce authorization"]`,
    realProjectExample:
      "A security audit found a delete action was only hidden in the UI for non-admin users, with the backend API accepting the delete request from any authenticated user regardless of role — a genuine vulnerability fixed by adding a proper @restrict rule enforced server-side.",
    interviewTip:
      "If asked to identify a security gap in a design that only hides UI elements, immediately flagging the missing backend enforcement (not just noting the UI could be improved) is exactly the critical-thinking response interviewers look for.",
    followupQuestions: [
      "How would you actually verify a backend enforces an authorization rule, beyond just checking the UI?",
      "Is there ever a legitimate reason to have authorization logic duplicated between frontend and backend?",
      "How would a penetration test typically uncover this kind of vulnerability?",
    ],
    commonMistakes: [
      "Treating a hidden UI element as an actual security control rather than just a UX convenience.",
      "Not verifying that backend authorization checks exist independently of what the UI does or doesn't show.",
    ],
    importantPoints: [
      "UI-level restrictions (hidden buttons) are trivially bypassable via direct API calls.",
      "The backend must independently enforce every authorization rule — the only real security boundary.",
      "UI restrictions are a UX convenience layered on top of, never a substitute for, backend enforcement.",
    ],
    revisionNotes: "UI-hidden buttons are NOT a security boundary — trivially bypassed via direct API calls. Backend must independently enforce every authorization rule; UI hiding is UX polish only.",
  },
  {
    id: "sec-q20",
    topic: "Principal Propagation",
    prompt: "What has to be configured on the on-premise side for principal propagation to actually work?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["principal-propagation", "on-prem-config"],
    estimatedMinutes: 2,
    expectedAnswer:
      "The on-premise system must trust the certificate authority that issues the X.509 certificates used in principal propagation (typically by importing the relevant trust/root certificate), and must be configured to map the certificate's subject/identity to its own local user accounts for authorization purposes.",
    detailedAnswer:
      "Principal propagation's certificate-based mechanism only works if the on-premise system is actually configured to participate: it needs to trust the certificate authority (importing the appropriate root/trust certificate into its own trust store) so it accepts certificates issued through this mechanism as valid, and it needs a mapping configuration translating the identity embedded in the certificate (representing the BTP user) to a corresponding local user account or identity the on-prem system's own authorization logic understands. Without this on-prem-side configuration, the propagated identity would arrive but the on-prem system wouldn't know what to do with it or wouldn't trust it in the first place — principal propagation genuinely requires cooperation and configuration on both ends, not just the BTP/Cloud Connector side.",
    hindiExplanation:
      "Principal propagation ka certificate-based mechanism sirf tab kaam karta hai jab on-premise system actually participate karne ke liye configured ho: use certificate authority ko trust karna padta hai (appropriate root/trust certificate apne trust store mein import karke) taaki wo is mechanism se issue hue certificates ko valid accept kare, aur use ek mapping configuration chahiye jo certificate mein embedded identity (BTP user represent karti hui) ko ek corresponding local user account ya identity mein translate kare jo on-prem system ki apni authorization logic samajhti ho.",
    interviewExplanation:
      "I'd list both required pieces: 'The on-prem system needs to trust the certificate authority issuing these certificates — importing the relevant root/trust certificate into its own trust store. It also needs a mapping configuration translating the identity in the certificate to a corresponding local user account its own authorization logic understands. Without both pieces configured on the on-prem side, principal propagation wouldn't actually work — it genuinely requires cooperation on both ends, not just the BTP/Cloud Connector side.'",
    diagramNote:
      "'On-prem side needs: (1) trust the certificate authority (import root/trust cert)' + '(2) map certificate identity → local user account' → 'Only then does principal propagation actually work end-to-end'.",
    diagramMermaid: `flowchart TD
    A["On-prem: trust the<br/>certificate authority"] --> C["Principal propagation<br/>works end-to-end"]
    B["On-prem: map certificate<br/>identity to local user"] --> C`,
    realProjectExample:
      "An initial principal propagation setup failed silently because the on-prem system hadn't imported the trust certificate, so it rejected the propagated identity entirely — resolved by properly configuring the trust store and identity mapping on the on-prem side.",
    interviewTip:
      "If asked to troubleshoot a principal propagation failure, checking on-prem-side trust store and identity-mapping configuration (not just the BTP/Cloud Connector side) shows understanding that this requires cooperation on both ends.",
    followupQuestions: [
      "What would a silent failure of this on-prem trust configuration typically look like from the app's perspective?",
      "How would you verify the on-prem system's trust store contains the correct certificate?",
      "Does this configuration differ between different on-prem system types (e.g. an ABAP system versus a generic REST API)?",
    ],
    commonMistakes: [
      "Assuming principal propagation works automatically once configured on the BTP/Cloud Connector side alone.",
      "Not knowing the on-prem system needs its own trust store and identity-mapping configuration.",
    ],
    importantPoints: [
      "On-prem system must trust the certificate authority (import root/trust certificate).",
      "On-prem system must map the certificate's identity to a local user account.",
      "Principal propagation requires configuration cooperation on both the BTP and on-prem sides.",
    ],
    revisionNotes: "Principal propagation needs on-prem-side config too: trust the certificate authority (import root cert) + map certificate identity to local user accounts — not just a BTP-side setup.",
  },
  {
    id: "sec-q21",
    topic: "Destinations",
    prompt: "How would you securely store and reference a destination's credentials so they never appear in source control?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["destinations", "secrets-management"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Destination credentials are configured directly in the Destination service (via the cockpit or a deployment-time binding), never hard-coded in application source files — the destination configuration itself (name, URL, auth type) can be version-controlled safely, since the actual secret values are stored and managed separately by the Destination service.",
    detailedAnswer:
      "A destination's structural configuration (its name, target URL, authentication type) is generally safe to keep in source control or deployment descriptors, since that's just metadata about how to connect — no actual secret. The genuinely sensitive part (the API key, client secret, or certificate) is entered directly into the Destination service via the BTP cockpit or provided at deployment time through a secure binding mechanism, never written into application code or checked into a repository. This separation means your codebase and version history never contain the actual secret value, and rotating a credential is purely a Destination-service-side operation that doesn't require any code change or redeploy.",
    hindiExplanation:
      "Ek destination ki structural configuration (uska naam, target URL, authentication type) generally source control ya deployment descriptors mein rakhna safe hai, kyunki ye bas metadata hai connection ke baare mein — koi actual secret nahi. Genuinely sensitive part (API key, client secret, ya certificate) directly Destination service mein enter kiya jaata hai BTP cockpit se ya deployment time pe ek secure binding mechanism se provide kiya jaata hai, kabhi application code mein likha ya repository mein check-in nahi kiya jaata.",
    interviewExplanation:
      "I'd distinguish structural config from actual secrets: 'A destination's structural configuration — name, URL, auth type — is safe to version-control, since it's just connection metadata. The actual secret, like an API key or client secret, is entered directly into the Destination service via the cockpit or a secure deployment-time binding, never written into application code or checked into a repo. That separation means your codebase and history never contain the actual secret, and rotating it is purely a Destination-service operation.'",
    diagramNote:
      "'Destination structural config (name, URL, auth type) — safe in source control' vs 'Actual secret (API key/client secret) — entered directly into Destination service, never in code/repo'.",
    diagramMermaid: `flowchart LR
    A["Destination structural config<br/>name, URL, auth type"] --> B["Safe in source control"]
    C["Actual secret<br/>API key/client secret"] --> D["Entered directly into<br/>Destination service, never in repo"]`,
    realProjectExample:
      "A code review caught a destination's client secret accidentally hard-coded in a deployment script instead of being configured directly in the Destination service — moving it to proper destination configuration eliminated the secret from the codebase entirely and made rotation trivial going forward.",
    interviewTip:
      "If asked 'where should a destination's credentials live', the precise answer is directly in the Destination service configuration, never in application code, environment files checked into a repo, or deployment scripts.",
    followupQuestions: [
      "How would you configure destination credentials differently for dev versus production environments?",
      "What deployment-time mechanisms exist for providing destination credentials securely without manual cockpit entry?",
      "How would you audit whether any secrets have accidentally leaked into source control historically?",
    ],
    commonMistakes: [
      "Hard-coding a destination's actual secret value in a deployment script or application config file.",
      "Not distinguishing between safe-to-version-control structural config and genuinely sensitive credential values.",
    ],
    importantPoints: [
      "Destination structural configuration (name, URL, auth type) is safe to keep in source control.",
      "Actual secrets are entered directly into the Destination service, never in application code/repos.",
      "This separation keeps secrets entirely out of the codebase and version history.",
    ],
    revisionNotes: "Destination structural config (name/URL/auth type) is safe in source control. Actual secrets go directly into the Destination service — never in code or repos.",
  },
  {
    id: "sec-q22",
    topic: "Trust Configuration",
    prompt: "What would happen to existing user sessions if you changed a subaccount's Trust Configuration to point at a different identity provider?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["trust-configuration", "migration"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Existing sessions/tokens issued under the old identity provider would generally remain valid until their own expiry (since a JWT's validity doesn't retroactively depend on the current Trust Configuration once issued), but any NEW login attempt after the change would authenticate against the new identity provider — meaning a transition period exists where old and new sessions coexist until old tokens naturally expire.",
    detailedAnswer:
      "A JWT is a self-contained, signed artifact valid until its own expiry claim — changing the Trust Configuration doesn't retroactively invalidate already-issued tokens (though if the new configuration also involves rotating trust/signing keys, tokens signed under keys no longer trusted could fail validation sooner, depending on exact configuration). In the more common case of simply pointing at a different identity provider without changing signing keys the resource server already trusts, existing sessions continue working until natural expiry, while any new login (or token refresh, if refresh also requires re-authentication against the new IdP) goes through the newly configured identity provider. This means such a change should be planned with awareness of this transition window — communicating to users that they may need to log in again, and verifying the new identity provider is fully configured and tested before cutting over.",
    hindiExplanation:
      "Ek JWT ek self-contained, signed artifact hai apni expiry claim tak valid — Trust Configuration change karna already-issued tokens ko retroactively invalidate nahi karta (chahe agar new configuration signing keys bhi rotate karti ho, tokens jo ab-trusted-nahi keys se signed hain validation mein sooner fail ho sakte hain, exact configuration pe depend karte hue). More common case mein, sirf ek doosre identity provider pe point karna signing keys change kiye bina jo resource server already trust karta hai, existing sessions natural expiry tak kaam karte rehte hain, jabki koi bhi naya login newly configured identity provider se guzarta hai.",
    interviewExplanation:
      "I'd explain the transition-window behavior: 'A JWT is valid until its own expiry, so changing the Trust Configuration doesn't retroactively invalidate already-issued tokens — existing sessions keep working until natural expiry, while new logins go through the newly configured identity provider. This creates a transition window with both old and new sessions coexisting, so I'd plan this change with awareness of it — communicating to users and thoroughly testing the new IdP before cutover.'",
    diagramNote:
      "'Trust Configuration changed to new IdP' → 'Existing tokens (issued under old IdP): remain valid until natural expiry' + 'New logins: authenticate against new IdP' → transition window until old tokens expire.",
    diagramMermaid: `flowchart LR
    A["Trust Configuration<br/>changed to new IdP"] --> B["Existing tokens: valid<br/>until natural expiry"]
    A --> C["New logins: authenticate<br/>against new IdP"]`,
    realProjectExample:
      "A migration to a new corporate identity provider was planned with a communicated transition window, during which some users still had valid sessions from the old IdP while others logging in fresh went through the new one, until all old tokens had naturally expired within a day.",
    interviewTip:
      "If asked to plan an identity provider migration, explicitly mentioning this transition-window behavior (rather than assuming an instant cutover for all users) shows realistic operational planning awareness.",
    followupQuestions: [
      "Would this transition window differ if signing keys were also rotated as part of the change?",
      "How would you force all existing sessions to re-authenticate immediately if truly necessary?",
      "What testing would you do on a new identity provider before actually cutting over the Trust Configuration?",
    ],
    commonMistakes: [
      "Assuming a Trust Configuration change instantly invalidates all existing sessions.",
      "Not planning for or communicating the transition window to affected users during an IdP migration.",
    ],
    importantPoints: [
      "Existing JWTs remain valid until their own expiry, regardless of a later Trust Configuration change.",
      "New logins after the change authenticate against the newly configured identity provider.",
      "A transition window exists where old and new sessions coexist — plan and communicate around it.",
    ],
    revisionNotes: "Changing Trust Configuration doesn't retroactively invalidate existing tokens (valid until natural expiry) — new logins use the new IdP. Plan for a transition window, not an instant cutover.",
  },
  {
    id: "sec-q23",
    topic: "IAS",
    prompt: "Can IAS itself enforce multi-factor authentication (MFA), and how would you decide when to require it?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["ias", "mfa"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Yes — IAS supports configuring MFA as part of its authentication policy, and it can be applied conditionally (e.g. only for certain user groups, applications, or risk conditions) rather than uniformly for every single login, letting you balance security against user friction based on the actual sensitivity of what's being accessed.",
    detailedAnswer:
      "IAS's authentication policies can require a second factor (like a one-time code from an authenticator app, or another verification method) beyond just username/password, configurable at various scopes — potentially applied only to specific applications handling sensitive data, only for certain user groups (like admins), or triggered conditionally based on risk signals, rather than blanket-applying MFA to every login for every app regardless of sensitivity. This lets an organization balance the genuine security benefit of MFA against the real user-friction cost, reserving the stricter requirement for scenarios where the added security meaningfully matters (admin access, financial data) rather than applying it indiscriminately everywhere.",
    hindiExplanation:
      "IAS ki authentication policies ek second factor require kar sakti hain (jaise ek authenticator app se ek one-time code, ya koi doosra verification method) sirf username/password se aage, configurable various scopes pe — potentially sirf specific applications pe apply hote hue jo sensitive data handle karte hain, sirf certain user groups ke liye (jaise admins), ya risk signals ke basis pe conditionally trigger hote hue, har login ke liye blanket MFA apply karne ki jagah har app ke liye regardless of sensitivity.",
    interviewExplanation:
      "I'd confirm the capability and the conditional-application angle: 'Yes, IAS supports MFA as part of its authentication policy, and it can be applied conditionally — only for specific sensitive applications, only for certain user groups like admins, or based on risk signals — rather than blanket-applying it everywhere. That lets an organization balance MFA's real security benefit against its user-friction cost, reserving it for scenarios where it genuinely matters.'",
    diagramNote:
      "'IAS authentication policy' → conditional MFA application: 'sensitive apps only', 'admin user groups only', 'risk-based triggers' — not uniformly applied to every login.",
    diagramMermaid: `flowchart TD
    A["IAS authentication policy"] --> B["MFA for sensitive apps only"]
    A --> C["MFA for admin groups only"]
    A --> D["Risk-based conditional MFA"]`,
    realProjectExample:
      "A configuration required MFA only for users accessing a financial-approval application and for anyone with an Admin role across all apps, while general-purpose reporting apps used single-factor login — balancing security investment against friction based on actual data sensitivity.",
    interviewTip:
      "If asked whether you'd apply MFA to every single login uniformly, the nuanced answer — conditional application based on actual risk/sensitivity — shows a more mature security design perspective than a blanket 'always require MFA' answer.",
    followupQuestions: [
      "What MFA methods does IAS typically support?",
      "How would you configure MFA to apply only to a specific application rather than the whole tenant?",
      "What's a risk-based authentication trigger, and how might it decide to require MFA dynamically?",
    ],
    commonMistakes: [
      "Assuming MFA is all-or-nothing across an entire IAS tenant rather than configurable per application/group.",
      "Applying MFA uniformly everywhere without considering the friction-versus-security tradeoff for lower-sensitivity scenarios.",
    ],
    importantPoints: [
      "IAS supports MFA as part of its configurable authentication policy.",
      "Can be applied conditionally — per application, user group, or risk signal — not just uniformly.",
      "Balances real security benefit against user friction based on actual sensitivity.",
    ],
    revisionNotes: "IAS supports MFA, configurable conditionally (per app/user group/risk signal) rather than uniformly — balance security benefit against friction based on actual sensitivity.",
  },
  {
    id: "sec-q24",
    topic: "IPS",
    prompt: "What would happen if IPS's synchronization job itself failed silently for several days — what's the security implication?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["ips", "monitoring"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A silently failed IPS sync means offboarded employees' access wouldn't actually be revoked in target systems despite being removed from the source (a real security gap — departed employees retaining access), and new hires wouldn't get provisioned correctly either — proactive monitoring/alerting on sync job health is essential, not optional, precisely because this failure mode is dangerous and easy to miss.",
    detailedAnswer:
      "IPS's entire value proposition rests on it actually running reliably — if the sync job silently stops or starts failing, the most dangerous consequence is that offboarding stops propagating: an employee removed from the source HR system continues to have valid access in every target system IPS was supposed to update, for as long as the failure goes undetected. This is a genuine security exposure, not just an operational inconvenience, since it directly means departed employees retain system access. New employee onboarding would also silently break, causing business disruption, but the offboarding failure mode is the more security-critical one. This is exactly why IPS sync job health needs its own proactive monitoring and alerting — treating it as 'set up once and forget' is a real risk, given how silent and consequential its failure mode is.",
    hindiExplanation:
      "IPS ka poora value proposition is baat pe rest karta hai ki wo actually reliably chal raha hai — agar sync job silently ruk jaaye ya fail hona shuru ho jaaye, sabse dangerous consequence hai ki offboarding propagate hona band ho jaata hai: ek employee jo source HR system se remove ho chuka hai har target system mein valid access rakhna jaari rakhta hai jise IPS ko update karna tha, jab tak failure undetected rehta hai. Ye ek genuine security exposure hai, sirf ek operational inconvenience nahi, kyunki iska matlab directly hai ki departed employees system access retain karte hain.",
    interviewExplanation:
      "I'd emphasize the offboarding-specific risk: 'If IPS's sync silently fails, the most dangerous consequence is offboarding stops propagating — an employee removed from the source HR system keeps valid access in every target system IPS was supposed to update, for as long as it goes undetected. That's a real security exposure, not just an inconvenience. This is exactly why sync job health needs its own proactive monitoring and alerting, not a set-and-forget assumption.'",
    diagramNote:
      "'IPS sync fails silently' → 'Offboarded employees NOT actually deprovisioned in target systems' → 'Real security exposure: departed employees retain access' — needs proactive monitoring/alerting.",
    diagramMermaid: `flowchart TD
    A["IPS sync fails silently"] --> B["Offboarded employees NOT<br/>actually deprovisioned"]
    B --> C["Security exposure:<br/>departed employees retain access"]
    D["Proactive monitoring/alerting"] --> E["Catches sync failures<br/>before exposure grows"]`,
    realProjectExample:
      "An audit discovered several departed employees still had valid access to a connected system weeks after leaving, traced back to an IPS sync job that had been silently failing due to an expired service account credential — prompting the addition of proactive sync-health alerting going forward.",
    interviewTip:
      "If asked to design monitoring for an identity provisioning pipeline, explicitly naming the offboarding-failure security risk (not just 'monitor for errors generically') shows you understand the specific, serious consequence of this particular integration failing.",
    followupQuestions: [
      "What would you specifically monitor to detect an IPS sync job that's silently failing?",
      "How would you conduct a periodic access audit to catch this kind of gap even without perfect real-time monitoring?",
      "What compensating controls would you put in place in case IPS itself has an extended outage?",
    ],
    commonMistakes: [
      "Treating IPS as a set-up-once-and-forget integration without ongoing health monitoring.",
      "Focusing only on the onboarding-failure business impact, missing the more security-critical offboarding-failure risk.",
    ],
    importantPoints: [
      "A silently failed IPS sync means offboarded employees retain access — a real security exposure.",
      "New employee onboarding would also silently break, causing business disruption.",
      "Sync job health requires its own proactive monitoring/alerting, not a set-and-forget assumption.",
    ],
    revisionNotes: "Silent IPS sync failure = offboarded employees retain access (real security exposure), not just an operational inconvenience — needs dedicated proactive monitoring/alerting.",
  },
  {
    id: "sec-q25",
    topic: "IPS",
    prompt: "How would you handle a scenario where a user needs different roles in different target systems based on their department, using IPS?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["ips", "attribute-mapping"],
    estimatedMinutes: 2,
    expectedAnswer:
      "IPS supports attribute-based mapping rules — using a source attribute (like a department field from the HR system) to determine which groups/roles a user gets provisioned with in each target system, rather than provisioning every user identically regardless of their actual department or function.",
    detailedAnswer:
      "Rather than provisioning every synchronized user with the same flat set of groups/roles everywhere, IPS supports mapping rules that read specific attributes from the source system (like a 'department' or 'costCenter' field from SuccessFactors) and use them to conditionally determine which target-system groups/roles that specific user gets assigned. This means a Finance department employee might automatically get a 'Finance-Viewer' group in a target system, while an Engineering department employee gets an 'Engineering-Contributor' group instead — all driven declaratively by the source attribute value, without any manual per-user admin intervention needed as employees are hired, transferred between departments, or leave.",
    hindiExplanation:
      "Har synchronized user ko same flat set of groups/roles har jagah provision karne ki jagah, IPS mapping rules support karta hai jo specific attributes source system se padhte hain (jaise ek 'department' ya 'costCenter' field SuccessFactors se) aur unhe use karte hain conditionally determine karne ke liye ki specific user ko kaunse target-system groups/roles assign hone chahiye. Iska matlab hai ek Finance department employee automatically ek 'Finance-Viewer' group pa sakta hai ek target system mein, jabki ek Engineering department employee 'Engineering-Contributor' group pata hai iske bajaye.",
    interviewExplanation:
      "I'd describe the attribute-driven mapping mechanism: 'IPS supports mapping rules that read a source attribute, like department from SuccessFactors, and use it to conditionally determine which target-system groups a user gets. A Finance employee might automatically get a Finance-Viewer group, while an Engineering employee gets an Engineering-Contributor group — all declarative, driven by the source attribute, with no manual per-user intervention as people are hired, transferred, or leave.'",
    diagramNote:
      "'Source attribute: department = Finance' → 'IPS mapping rule' → 'Target group: Finance-Viewer' vs 'department = Engineering' → 'Target group: Engineering-Contributor' — declarative, attribute-driven.",
    diagramMermaid: `flowchart LR
    A["Source attribute:<br/>department = Finance"] --> B["IPS mapping rule"] --> C["Target group:<br/>Finance-Viewer"]
    D["department = Engineering"] --> B --> E["Target group:<br/>Engineering-Contributor"]`,
    realProjectExample:
      "Configuring an IPS mapping rule based on the department attribute from SuccessFactors meant new hires were automatically provisioned into the correct departmental group in every connected system on their first day, and department transfers automatically updated their group memberships without any manual admin ticket.",
    interviewTip:
      "If asked how you'd avoid manual per-user role assignment at scale for a growing organization, naming attribute-based IPS mapping rules specifically demonstrates the correct, scalable, automation-first approach.",
    followupQuestions: [
      "What happens automatically when an employee's department attribute changes in the source system?",
      "Can multiple source attributes be combined in a single mapping rule?",
      "How would you test that a new mapping rule works correctly before applying it broadly?",
    ],
    commonMistakes: [
      "Assuming IPS only supports identical, flat provisioning for every user regardless of department or role.",
      "Relying on manual per-user role assignment instead of attribute-based mapping rules at scale.",
    ],
    importantPoints: [
      "IPS supports attribute-based mapping rules using source attributes (like department).",
      "Determines which target-system groups/roles a user gets, conditionally per attribute value.",
      "Automates correct provisioning at hire, transfer, and departure without manual per-user intervention.",
    ],
    revisionNotes: "IPS attribute-based mapping rules use a source attribute (e.g. department) to determine target-system group/role assignment automatically — no manual per-user intervention needed at scale.",
  },
];

export const securityMcqs: BtpMcq[] = [
  {
    id: "sec-mcq1",
    topic: "XSUAA",
    prompt: "What is XSUAA's primary role in BTP security?",
    options: [
      "It's a database encryption service",
      "It's BTP's OAuth 2.0 authorization server, issuing and validating JWT tokens",
      "It's a network firewall",
      "It's a logging service",
    ],
    correctIndex: 1,
    explanation: "XSUAA is the OAuth 2.0 authorization server for BTP, issuing signed JWT tokens with scopes and validating them for resource servers.",
  },
  {
    id: "sec-mcq2",
    topic: "OAuth",
    prompt: "Which OAuth grant type is used for non-interactive service-to-service calls?",
    options: ["Authorization Code", "Client Credentials", "Implicit", "Password"],
    correctIndex: 1,
    explanation: "Client Credentials is used when a service authenticates as itself with no human user involved, common for backend-to-backend calls.",
  },
  {
    id: "sec-mcq3",
    topic: "JWT",
    prompt: "Is a JWT's payload encrypted?",
    options: [
      "Yes, always encrypted with the issuer's private key",
      "No — it's base64-encoded (readable), only the signature guarantees integrity",
      "Only if the token is used over HTTPS",
      "Encryption is optional and rarely used either way",
    ],
    correctIndex: 1,
    explanation: "A JWT's header and payload are base64-encoded, not encrypted, and readable by anyone — the signature (not encryption) is what guarantees the token hasn't been tampered with.",
  },
  {
    id: "sec-mcq4",
    topic: "Role Collections",
    prompt: "Where are role templates initially declared for a BTP app?",
    options: ["In the BTP cockpit by an admin", "In the app's xs-security.json file", "In a database table", "They don't need to be declared"],
    correctIndex: 1,
    explanation: "Role templates are declared by developers in xs-security.json; admins then bundle them into Role Collections in the cockpit and assign those to users.",
  },
  {
    id: "sec-mcq5",
    topic: "Authorization",
    prompt: "What does a 403 Forbidden HTTP status typically indicate, as opposed to a 401?",
    options: [
      "The user isn't authenticated at all",
      "The user is authenticated but not authorized for this specific operation",
      "The server is down",
      "The request format is invalid",
    ],
    correctIndex: 1,
    explanation: "401 indicates an authentication failure (who are you is unclear/invalid); 403 means the user is known but their permissions don't allow this specific operation.",
  },
  {
    id: "sec-mcq6",
    topic: "Principal Propagation",
    prompt: "What problem does principal propagation solve for on-premise system calls?",
    options: [
      "It encrypts data in transit",
      "It forwards the real end-user's identity instead of a shared technical user",
      "It speeds up network calls",
      "It eliminates the need for a Cloud Connector",
    ],
    correctIndex: 1,
    explanation: "Principal propagation forwards the actual end-user identity (via an X.509 certificate through the Cloud Connector) so the on-prem system can apply per-user authorization and audit logging.",
  },
  {
    id: "sec-mcq7",
    topic: "Destinations",
    prompt: "What's a key security benefit of using a Destination instead of hard-coding a URL and credentials in app code?",
    options: [
      "It makes the app run faster",
      "Credential rotation becomes a config change, not a code change/redeploy",
      "It removes the need for HTTPS",
      "It automatically encrypts all application data",
    ],
    correctIndex: 1,
    explanation: "Destinations centralize connection URL and auth configuration, so rotating credentials or changing auth type is a configuration change in the Destination service, not an app code change.",
  },
  {
    id: "sec-mcq8",
    topic: "IAS",
    prompt: "What's the key distinction between IAS and XSUAA?",
    options: [
      "They are the same service with two names",
      "IAS handles identity/authentication ('who you are'); XSUAA handles app-specific authorization ('what you can do')",
      "XSUAA is for identity, IAS is for authorization",
      "IAS is only used for on-premise systems",
    ],
    correctIndex: 1,
    explanation: "IAS is the identity provider (login, MFA, federation), while XSUAA is the authorization server issuing app-specific scoped tokens after IAS establishes identity.",
  },
  {
    id: "sec-mcq9",
    topic: "IPS",
    prompt: "What does SAP Identity Provisioning Service (IPS) primarily automate?",
    options: [
      "Database backups",
      "User account creation/update/deletion synchronization across connected systems",
      "Network routing",
      "Application deployments",
    ],
    correctIndex: 1,
    explanation: "IPS synchronizes user and group changes from a source system to target systems automatically, ensuring prompt onboarding and — critically — offboarding across the landscape.",
  },
  {
    id: "sec-mcq10",
    topic: "OAuth",
    prompt: "What problem does PKCE solve in the Authorization Code flow?",
    options: [
      "It encrypts the JWT payload",
      "It protects public clients (mobile/SPA) that can't safely store a client secret from code interception",
      "It eliminates the need for scopes",
      "It replaces the need for XSUAA entirely",
    ],
    correctIndex: 1,
    explanation: "PKCE adds a dynamically generated code verifier/challenge pair so an intercepted authorization code alone is useless without the original verifier, protecting clients that can't securely hold a secret.",
  },
  {
    id: "sec-mcq11",
    topic: "JWT",
    prompt: "Why are refresh tokens used alongside short-lived access tokens?",
    options: [
      "To make tokens encrypted instead of signed",
      "To let a client silently obtain a new access token without forcing the user to log in again",
      "To replace the need for scopes",
      "To speed up network requests",
    ],
    correctIndex: 1,
    explanation: "Refresh tokens are longer-lived and let a client silently renew a short-lived access token, balancing the security benefit of short expiry with a seamless session experience.",
  },
  {
    id: "sec-mcq12",
    topic: "Authorization",
    prompt: "Why is hiding a button in the UI not a real security control?",
    options: [
      "UI code can't be changed after deployment",
      "A user can call the underlying API directly (e.g. via dev tools), bypassing the UI entirely — the backend must enforce authorization independently",
      "Because browsers ignore hidden HTML elements",
      "It actually is sufficient security on its own",
    ],
    correctIndex: 1,
    explanation: "UI restrictions are a UX convenience only — nothing stops a user from calling the API directly, so the backend must independently enforce every authorization rule as the real security boundary.",
  },
  {
    id: "sec-mcq13",
    topic: "Scopes",
    prompt: "Can a scope alone express an 'only your own records' row-level restriction?",
    options: [
      "Yes, scopes handle row-level filtering automatically",
      "No — that requires instance-based authorization logic comparing a record's owner to the authenticated user",
      "Only if the scope name includes the word 'own'",
      "Only in CAP Java, not CAP Node.js",
    ],
    correctIndex: 1,
    explanation: "Scopes express coarse, operation-level permissions; row-level 'own records only' restrictions require instance-based authorization logic, often via a CAP @restrict condition referencing $user.",
  },
  {
    id: "sec-mcq14",
    topic: "Destinations",
    prompt: "Where should a destination's actual secret (API key/client secret) be stored?",
    options: [
      "Hard-coded in application source files",
      "Directly in the Destination service, never in application code or version control",
      "In a plain-text config file checked into the repo",
      "It doesn't matter as long as it's documented",
    ],
    correctIndex: 1,
    explanation: "The destination's structural config (name, URL, auth type) is safe to version-control, but the actual secret must be entered directly into the Destination service, never in application code or a repo.",
  },
  {
    id: "sec-mcq15",
    topic: "IPS",
    prompt: "What's the most security-critical risk if an IPS sync job silently fails for several days?",
    options: [
      "Slightly slower report generation",
      "Offboarded employees' access isn't actually revoked in target systems, since deprovisioning stops propagating",
      "Increased storage costs",
      "Application performance degradation",
    ],
    correctIndex: 1,
    explanation: "A silently failed IPS sync means offboarding stops propagating — departed employees retain valid access in target systems for as long as the failure goes undetected, a real security exposure.",
  },
];
