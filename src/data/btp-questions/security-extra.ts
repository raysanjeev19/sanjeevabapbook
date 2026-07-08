import type { BtpCodingQuestion } from "@/lib/btp-content";

export const securityTopicNotes: Record<string, string> = {
  XSUAA:
    "XSUAA (Authorization and Trust Management service) BTP ka OAuth 2.0 authorization server hai. Apps XSUAA instance bind karte hain, `xs-security.json` se configure hoti hai (scopes, role templates). XSUAA JWT tokens issue karta hai user authenticate hone ke baad, aur resource servers in tokens ko XSUAA ki public key se validate karte hain, scopes check karke.",
  OAuth:
    "Do common grant types: Authorization Code (interactive user login — browser redirect through login page) aur Client Credentials (non-interactive service-to-service, koi human involved nahi, service apne client ID/secret se authenticate hoti hai). Fiori app login = Authorization Code. Backend job doosri API call kare = Client Credentials.",
  JWT:
    "JWT = Header.Payload.Signature. Header/Payload sirf base64-encoded hain, encrypted NAHI — koi bhi padh sakta hai, isliye secrets kabhi payload mein mat daalo. Signature issuer (XSUAA) ki private key se compute hoti hai, aur public key se verify hoti hai — tampering se signature fail ho jaati hai. Isi wajah se validate karne ke liye har request pe XSUAA ko call karne ki zaroorat nahi.",
  "Role Collections":
    "Role template developer `xs-security.json` mein declare karta hai (app kya grant kar sakti hai). Role Collection admin BTP cockpit mein banata hai — ek ya kai role templates (multiple apps se bhi) ko bundle karke, aur actual users ko assign karta hai. Ye separation 'app kya grant kar sakti hai' ko 'user ko actually kya milta hai' se alag karta hai.",
  Scopes:
    "Scope ek named permission string hai (jaise `Orders.Read`) jo token mein embed hoti hai, resource server operation allow karne se pehle check karta hai. Granularity: bahut coarse = no separation of duties; bahut fine = admin nightmare. Reasonable middle ground: business capability ke hisaab se group karo (Read/Write/Admin per area).",
  Authorization:
    "Authentication 'tum kaun ho' answer karti hai (token validate hota hai, framework middleware se). Authorization 'tum kya kar sakte ho' answer karti hai (scopes/roles check hote hain specific operation ke against, jaise CAP ka `@restrict`). 401 = authentication fail. 403 = authenticated but authorization deny.",
  "Principal Propagation":
    "Principal propagation real end-user identity ko poori call chain mein forward karta hai (BTP app → Cloud Connector → on-prem), shared technical user ki jagah — X.509 certificate-based trust mechanism se. Isse on-prem system apna khud ka authorization aur audit logging real user ke against apply kar sakta hai.",
  Destinations:
    "Destination connection URL aur authentication configuration (Basic, OAuth2ClientCredentials, PrincipalPropagation) centrally store karta hai. App code sirf naam se destination request karta hai, raw credentials kabhi directly handle nahi karta. Credential rotation ek config change ban jaata hai, code change/redeploy nahi.",
  "Trust Configuration":
    "Trust Configuration decide karta hai ki subaccount kaunse identity provider ko trust kare authentication ke liye. Default SAP identity provider trial ke liye theek hai; enterprise SSO ke liye custom Trust Configuration (IAS ke through, corporate AD/SAML se federated) chahiye hoti hai.",
  IAS:
    "IAS (Identity Authentication Service) identity provider layer hai — login, MFA, corporate directory se federation handle karta hai, 'tum kaun ho' establish karta hai. XSUAA fir app-specific OAuth token issue karta hai scopes ke saath — 'yahan tum kya kar sakte ho'. Trust Configuration XSUAA ko IAS trust karne ke liye wire karta hai.",
  IPS:
    "IPS (Identity Provisioning Service) user account creation/update/deletion ko automatically source system (jaise SuccessFactors, corporate directory) se target systems (IAS, on-prem) tak sync karta hai. Isse onboarding fast hoti hai aur offboarding prompt — security ke liye critical, kyunki delayed access revocation ek real risk hai.",
};

export const securityCodingQuestions: BtpCodingQuestion[] = [
  {
    id: "sec-cq1",
    topic: "XSUAA",
    language: "Bash",
    difficulty: "Intermediate",
    prompt: "Write a curl command to call a protected API endpoint with a bearer token stored in the variable $TOKEN.",
    solution: 'curl -H "Authorization: Bearer $TOKEN" https://myapp.cfapps.eu10.hana.ondemand.com/api/orders',
    explanation: "The Authorization header with the 'Bearer' scheme is how a JWT access token is presented to a resource server for validation.",
  },
  {
    id: "sec-cq2",
    topic: "Role Collections",
    language: "CDS",
    difficulty: "Intermediate",
    prompt: "In a CAP CDS service definition, declare a role template requirement so only users with the 'Admin' role can access the whole service.",
    solution: "@requires: 'Admin'\nservice AdminService { ... }",
    explanation: "@requires at the service level is the simpler counterpart to @restrict, blocking all access to the service for any user whose token doesn't include the 'Admin' scope/role.",
  },
];
