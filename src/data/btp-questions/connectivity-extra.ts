import type { BtpCodingQuestion } from "@/lib/btp-content";

export const connectivityTopicNotes: Record<string, string> = {
  "Destination Service":
    "Destination service 'kaha call karna hai aur kaise authenticate karna hai' manage karta hai — URL, auth type, credentials sab centrally store hote hain. On-prem system ke liye destination `ProxyType: OnPremise` set hota hai, jo routing ko Connectivity service ke through karta hai. On-prem call ke liye Destination aur Connectivity service dono zaroori hain saath mein.",
  "Connectivity Service":
    "Connectivity service ka core purpose sirf on-prem Cloud Connector tunnel provide karna hai — cloud-to-cloud calls ke liye iski zaroorat nahi, wahan `ProxyType: Internet` wala destination direct HTTPS call kar leta hai. Sirf un apps ko Connectivity service bind karni chahiye jinhe genuinely on-prem reachability chahiye.",
  "Cloud Connector":
    "Cloud Connector ek lightweight software hai jo customer ke on-prem network ke andar install hota hai aur BTP ki taraf ek OUTBOUND connection initiate karta hai — kabhi inbound firewall port kholne ki zaroorat nahi padti, jo ek major security risk hota. Tunnel establish hone ke baad bhi, sirf explicitly whitelisted backends/ports/URL paths hi reachable hote hain — poora network expose nahi hota.",
  "On Premise":
    "`ProxyType: OnPremise` destination ke routing ko poori tarah badal deta hai — configured 'URL' actually ek virtual hostname hai jo sirf Cloud Connector ki configuration ke context mein sense banata hai. Request Connectivity service se hokar tunnel se guzarti hai, Cloud Connector virtual hostname ko real internal address mein resolve karta hai. `ProxyType: Internet` galat set karna ek common misconfiguration hai.",
  Proxy:
    "Cloud Connector ek reverse proxy ki tarah kaam karta hai — BTP requests real backend ke actual address tak directly nahi jaati, sirf ek virtual hostname pe address hoti hain jo Cloud Connector samajhta hai. Ye real backend ka address hide karta hai aur ek central, controllable enforcement point deta hai har request ke liye.",
  "Principal Propagation":
    "Principal propagation kaam karne ke liye teen cheezein configure honi chahiye: (1) BTP destination ka Authentication = PrincipalPropagation, (2) Cloud Connector ke specific backend mapping pe propagation explicitly enabled, (3) on-prem system ka trust configuration us certificate authority ko trust kare jo propagated identity certificates issue karta hai. Koi bhi ek piece missing ho, toh silently fail ho jaata hai (anonymous/technical user pe fallback), obvious error nahi aata.",
  Certificates:
    "Certificates sirf encryption ke liye nahi, trust establish karne ke liye bhi zaroori hain. Tunnel-level: mutual certificate authentication confirm karta hai ki Cloud Connector genuinely customer ke apne BTP subaccount se connected hai. Principal propagation ke liye: ek short-lived client certificate real end-user ko represent karta hai, jise on-prem system ko trust karne ke liye configure karna padta hai.",
};

export const connectivityCodingQuestions: BtpCodingQuestion[] = [
  {
    id: "conn-cq1",
    topic: "Destination Service",
    language: "Bash",
    difficulty: "Intermediate",
    prompt: "Write the key-value pairs for a destination configuration pointing to an on-premise SAP system, using principal propagation authentication.",
    solution: "Name=OnPremSystem\nType=HTTP\nURL=https://virtual-erp-host:443\nProxyType=OnPremise\nAuthentication=PrincipalPropagation\nCloudConnectorLocationId=my-location",
    explanation: "ProxyType=OnPremise routes through the Connectivity service and Cloud Connector; Authentication=PrincipalPropagation forwards the real end-user's identity rather than a shared technical user.",
  },
];
