module.exports = {
  'forms-workflow-020': {
    scriptH: "Sir, SAP Business Workflow ek built-in process automation engine hai jo standard business processes ko automate karta hai. SWDD se workflows design hote hain, BOR ya CL business objects pe trigger events define hote hain, aur work items SBWP inbox mein agents tak pahunchte hain. Standard scenarios mein PO release, leave approval, vendor change, customer credit limit increase aate hain. Practically, mere project mein vendor master change workflow tha jo update ke baad purchasing team ko approval task bhejta tha. Iska benefit yeh hai ki audit trail, SLA monitoring, aur consistent execution milti hai bina custom code likhe.",
    scriptE: "SAP Business Workflow is the built-in process automation engine that orchestrates standard business processes without custom code. Workflows are designed in SWDD, triggered by events on BOR or class-based business objects, and work items flow into agents' SBWP inboxes. Standard scenarios include PO release, leave approval, vendor master change, and customer credit limit changes. In my project a vendor master change workflow routed updates to the purchasing team for approval and propagated to procurement. The business value is a built-in audit trail, SLA and deadline monitoring, and consistent execution governed by SAP rather than custom approval programs.",
    words: [
      { keyword: "SWDD", meaning: "Workflow Builder for designing workflow templates." },
      { keyword: "SBWP", meaning: "Business Workplace where users see and act on work items." },
      { keyword: "BOR object", meaning: "Business Object Repository entity with attributes, methods, and events (e.g., BUS2012)." },
      { keyword: "Event", meaning: "Trigger raised by SAP application on business action (e.g., PO created)." },
      { keyword: "Work item", meaning: "Unit of work delivered to an agent in their inbox." },
      { keyword: "Container", meaning: "Holds data passed between workflow, tasks, and rules at runtime." },
      { keyword: "BUS2012", meaning: "BOR object for purchase orders." },
      { keyword: "BUS2032", meaning: "BOR object for sales orders." }
    ],
    mistakes: [
      { mistake: "Building a custom approval program instead of using SAP Workflow.", whyWrong: "Loses audit trail, deadline monitoring, substitution, escalation, and adds heavy maintenance cost.", correctApproach: "Use SAP Workflow for any process needing approvals and routing; only build custom for genuine non-fit." },
      { mistake: "Ignoring container design and dumping all data in one element.", whyWrong: "Tasks cannot consume the data cleanly; bindings break.", correctApproach: "Design container elements per logical entity (object ref, decision, comments) and bind explicitly." },
      { mistake: "Treating workflow as one-off custom code.", whyWrong: "Misses reuse opportunities; every new request becomes a fresh build.", correctApproach: "Build reusable subworkflows and standard tasks, call from parents." }
    ],
    qrn: "What: SAP Business Workflow is the built-in engine for automating standard business processes with events, work items, and agents.\n\nUsed for:\n- PO and vendor approvals\n- HR processes (leave, travel, separation)\n- Master data change approvals\n\nKey syntax / tables / Tcodes:\n- SWDD (design), SBWP (inbox), SWE2 (linkage)\n- BOR objects: BUS2012 (PO), BUS2032 (SO)\n- Container with explicit bindings\n\nInterview keyword: Built-in automation with audit and escalation."
  },

  'forms-workflow-021': {
    scriptH: "Sir, Forms aur Workflow interview answer start karte time main pehle structure deta hoon tool type, business purpose, design transaction, runtime behaviour, aur real project example. Hamesha SMARTFORMS, NACE, SWDD, SBWP, SWE2 jaise key Tcodes mention karta hoon. Common mistakes avoid karta hoon jaise sirf theory bolna, real project context na dena, ya basic Tcodes confuse karna. Practically, mere ek interview mein SmartForm activation poochha tha maine pehle definition, phir generated FM kahaani, phir mere project mein invoice form ka example diya interviewer impressed tha. Iska benefit yeh hai ki structured answer se senior level confidence transmit hoti hai.",
    scriptE: "When opening a Forms and Workflow interview answer, I structure it as: tool type, business purpose, design transaction, runtime behaviour, and a real project example. I always mention the key Tcodes (SMARTFORMS, NACE, SWDD, SBWP, SWE2) where appropriate. Common pitfalls to avoid include reciting only theory, missing real project context, and confusing basic Tcodes. In one interview asked about SmartForm activation, I gave the definition, then the generated FM story, then a concrete invoice form example from my project; the interviewer engaged immediately. Structured, example-backed answers transmit senior-level depth.",
    words: [
      { keyword: "Structured answer", meaning: "Definition -> Tcodes -> runtime -> example pattern that interviewers value." },
      { keyword: "Real project example", meaning: "Brief, specific anecdote anchoring the answer in lived experience." },
      { keyword: "Key Tcodes", meaning: "Anchor terms (SMARTFORMS, NACE, SWDD, SBWP, SWE2) that signal hands-on work." },
      { keyword: "Activation", meaning: "Process that regenerates the form FM; must be mentioned when discussing SmartForms." },
      { keyword: "Container binding", meaning: "Workflow concept to mention even briefly to show depth." },
      { keyword: "Agent determination", meaning: "Critical workflow concept; mention PFAC for rules-based resolution." }
    ],
    mistakes: [
      { mistake: "Starting with a long theoretical preamble.", whyWrong: "Interviewer disengages before you reach the relevant content.", correctApproach: "Lead with a one-line definition, then transactions and example." },
      { mistake: "Listing every transaction you ever used.", whyWrong: "Signals memorisation, not understanding; interviewer probes superficial recall.", correctApproach: "Mention 4 to 6 core Tcodes that map to the question." },
      { mistake: "Saying 'I have no real project experience' and stopping.", whyWrong: "Closes the conversation; interviewer cannot probe further.", correctApproach: "Pivot to learning context: 'I have not delivered yet in production, but in training I built X using Y.'" }
    ],
    qrn: "What: Forms and Workflow interview answers should follow definition -> Tcodes -> runtime -> real project example.\n\nUsed for:\n- All interview answers\n- Internal design reviews\n- Client demo openings\n\nKey syntax / tables / Tcodes:\n- Anchor Tcodes: SMARTFORMS, NACE, SWDD, SBWP, SWE2\n- Always mention activation, agent rule, container binding when relevant\n- Backed by one concrete project example\n\nInterview keyword: Structure plus example beats theory."
  },

  'forms-workflow-022': {
    scriptH: "Sir, SmartForms ke core concepts mein Main Window vs Secondary Window, Table aur Template nodes, Text aur Code nodes, page format, output options, PDF generation, copy aur final windows, aur transport handling shamil hain. Main Window page overflow kar sakta hai aur multi-page tables yahan rakhte hain. Secondary Window fixed position pe rehta hai. ABAP code node mein logic likh sakte hain. Practically, mere project mein delivery note Main Window mein items table tha aur Secondary Window mein company logo. Iska benefit yeh hai ki right window choice se layout predictable aur maintainable rehti hai.",
    scriptE: "Core SmartForms concepts include Main Window versus Secondary Window, Table versus Template nodes, Text and ABAP Code nodes, page formats and next-page settings, output options, PDF generation via OTF, Copy and Final windows, and transport handling. The Main Window is the only window that can overflow to additional pages, so multi-page tables must sit inside it. Secondary Windows are fixed per page and useful for headers, logos, or terms. ABAP code nodes let you compute values within the form. In my delivery note project the Main Window held the items table while a Secondary Window held the company logo, giving predictable, maintainable layout.",
    words: [
      { keyword: "Main Window", meaning: "Primary window that can overflow across multiple pages." },
      { keyword: "Secondary Window", meaning: "Fixed-position window per page; does not overflow." },
      { keyword: "Copy Window", meaning: "Special window that renders different content for each copy of the printout." },
      { keyword: "Final Window", meaning: "Renders content only on the last page (e.g., totals, signature)." },
      { keyword: "Table node", meaning: "Loops over an internal table; supports header, body, footer sub-areas." },
      { keyword: "Template node", meaning: "Fixed-grid layout with predefined rows and columns." },
      { keyword: "Text node", meaning: "Plain text element with formatted output." },
      { keyword: "Program node (Code)", meaning: "Inline ABAP code block for runtime calculations." },
      { keyword: "Activation", meaning: "Generates the form FM (/1BCDWB/SF...)." }
    ],
    mistakes: [
      { mistake: "Placing the items table in a Secondary Window.", whyWrong: "Secondary Windows do not overflow, so additional items are clipped silently.", correctApproach: "Always put repeating tables in the Main Window so they can flow across pages." },
      { mistake: "Putting heavy ABAP logic in Code nodes.", whyWrong: "Hard to debug, hard to test, slows rendering and complicates maintenance.", correctApproach: "Keep ABAP code nodes minimal; do heavy logic in the driver and pass results to the form." },
      { mistake: "Forgetting to set the Next Page on a page node.", whyWrong: "The form stops after the first page even though more content exists.", correctApproach: "Always set Next Page (often self-reference for continuous pages) and verify with overflow tests." }
    ],
    qrn: "What: SmartForms concepts cover windows, nodes, page flow, ABAP integration, and transport handling.\n\nUsed for:\n- Designing maintainable multi-page forms\n- Producing PDF, print, and email outputs\n- Driving by ABAP driver programs\n\nKey syntax / tables / Tcodes:\n- Main vs Secondary vs Copy vs Final windows\n- Table, Template, Text, Program nodes\n- SMARTFORMS for design and activation\n\nInterview keyword: Main Window for flow, Secondary for fixed."
  },

  'forms-workflow-023': {
    scriptH: "Sir, Forms-related Tcodes ka quick map yeh hai SE71 SAPscript painter, SMARTFORMS SmartForm builder, SFP Adobe Forms, SE72 styles paragraph and character formats, SE73 fonts and barcodes, SE78 graphics upload, NACE output determination, SP01 spool requests, SP02 user spool requests, SOST email outbound, STMS transport management. Har Tcode ka clear scope hai. Practically, mere project mein logo update SE78 mein hua tha, NACE mein output type wrong tha, aur SP01 se spool diagnose kiya tha. Iska benefit yeh hai ki har incident mein Tcode pata hone se direct path milta hai resolution ka.",
    scriptE: "The Forms-related transaction map is: SE71 for SAPscript form painter, SMARTFORMS for SmartForm builder, SFP for Adobe Forms, SE72 for SAPscript styles (paragraph and character formats), SE73 for fonts and barcodes, SE78 for graphics upload, NACE for output determination, SP01 for spool requests, SP02 for user spool requests, SOST for email outbound, and STMS for transport management. Each has a clear scope. In my project a logo update happened in SE78, NACE had a wrong output type assignment, and SP01 confirmed the spool was generated correctly. Knowing the right Tcode gives the shortest path to resolution.",
    words: [
      { keyword: "SE71", meaning: "SAPscript form painter (legacy)." },
      { keyword: "SMARTFORMS", meaning: "SmartForm design and activation." },
      { keyword: "SFP", meaning: "Adobe Form interface and layout." },
      { keyword: "SE72", meaning: "SAPscript style maintenance." },
      { keyword: "SE73", meaning: "Font and bar code definitions." },
      { keyword: "SE78", meaning: "Graphics upload (TIFF/BMP) for use in forms." },
      { keyword: "NACE", meaning: "Output determination configuration." },
      { keyword: "SP01", meaning: "Spool requests across system." },
      { keyword: "SP02", meaning: "Logged-in user's spool requests." },
      { keyword: "SOST", meaning: "SAPconnect outbound email and fax monitor." },
      { keyword: "STMS", meaning: "Transport Management System." }
    ],
    mistakes: [
      { mistake: "Confusing SP01 with SP02.", whyWrong: "SP02 only shows current user's spools; full system view needs SP01.", correctApproach: "Use SP01 for system-wide investigation, SP02 only for personal print verification." },
      { mistake: "Uploading large unoptimised graphics via SE78.", whyWrong: "Form output size balloons and print performance suffers.", correctApproach: "Optimise images (size, format) before upload; use BW BMP for small logos." },
      { mistake: "Editing SAPscript forms (SE71) in production.", whyWrong: "Production changes bypass transport and break DEV-QAS-PROD parity.", correctApproach: "Always edit in DEV, transport via STMS." }
    ],
    qrn: "What: Forms Tcode map covers design (SE71, SMARTFORMS, SFP), styles and graphics (SE72, SE73, SE78), output (NACE, SP01, SOST), and transport (STMS).\n\nUsed for:\n- Daily Forms development\n- Incident triage\n- Output configuration and monitoring\n\nKey syntax / tables / Tcodes:\n- SE71 / SMARTFORMS / SFP for design\n- SE78 logo, SE73 fonts and bar codes\n- SP01 spool, SOST email, STMS transport\n\nInterview keyword: Right Tcode for the right job."
  }
};
