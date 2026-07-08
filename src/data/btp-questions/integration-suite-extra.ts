export const integrationSuiteTopicNotes: Record<string, string> = {
  "Cloud Integration":
    "Cloud Integration message-based integration ka runtime hai. iFlow ek scenario ki graphical, step-by-step definition hai — sender adapter, processing steps (mapping, routing, enrichment), receiver adapter. Content Modifier step headers/properties/body ko set/read/transform karta hai, chhote adjustments ke liye poori mapping ki zaroorat nahi.",
  "API Management":
    "API Management backend ke aage ek proxy layer add karta hai — rate limiting, API key/OAuth enforcement, request/response transformation, analytics, aur developer catalog — sab kuch backend code touch kiye bina, independently adjustable.",
  "Open Connectors":
    "Open Connectors popular third-party SaaS systems (Salesforce, Workday, etc.) ke liye sainkdo pre-built connectors deta hai, ek normalized REST interface ke through — har vendor ki apni API quirks/auth ko hand-build karne ki zaroorat nahi, vendor API changes connector maintenance mein absorb ho jaate hain.",
  "Integration Advisor":
    "Integration Advisor ML-assisted tool hai B2B message mapping (jaise EDI to custom format) ke liye — tumhare Message Implementation Guideline (MIG) ke against, ye ek shared, crowd-sourced knowledge base se likely mappings suggest karta hai, traditionally slow expert-heavy mapping work ko significantly speed up karta hai.",
  "Trading Partner Management":
    "Trading Partner Management har B2B partner ka master data centrally manage karta hai — identifiers, connection details, agreed document formats. Integration flows partner-specific logic hard-code nahi karte, dynamically partner profile lookup karte hain — naya partner onboard karna config task ban jaata hai, code change nahi.",
  EDI:
    "EDI (Electronic Data Interchange) standardized document formats (X12, EDIFACT) hain B2B document exchange ke liye. Retail, automotive, logistics jaise industries mein abhi bhi dominant hai kyunki poori trading partner network (sainkdo partners) ko naye format pe switch karna ek massive coordination problem hai, sirf technical decision nahi.",
  Mapping:
    "Graphical mapping fast aur visual hai — straightforward field renames, basic logic ke liye achha, built-in functions ke saath. XSLT mapping hand-written transformation code hai — genuinely complex logic (deep nesting, complex grouping) ke liye jo graphical tool express nahi kar sakta. Zyada tar projects graphical default use karte hain, XSLT sirf zaroorat pe.",
  "Groovy Scripts":
    "Groovy Script step genuinely custom logic ke liye hai jo standard graphical steps express nahi kar sakte — complex validation, Java library calls, intricate data manipulation. Poora message (body, headers, properties) tak access milta hai. Deliberately use karo, default replacement ki tarah nahi — overuse maintainability ko undermine karta hai.",
  Adapters:
    "Adapter choice depend karti hai us par ki doosri taraf ka system kya bolta hai: IDoc adapter (classic SAP systems, IDoc documents), OData adapter (OData services jaise CAP/RAP ya S/4HANA OData — native query/metadata understanding), HTTP adapter (generic REST/HTTP fallback jab koi specific adapter na ho).",
};
