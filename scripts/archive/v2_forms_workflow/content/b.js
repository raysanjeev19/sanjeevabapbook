module.exports = {
  'forms-workflow-004': {
    scriptH: "Sir, output determination troubleshooting matlab jab koi document ki print ya email output nahi aati. Mera systematic approach yeh hai pehle NACE check karta hoon, dekhta hoon output type pe correct form aur driver assign hain ya nahi. Phir NAST table dekhta hoon dekhne ke liye ki output trigger hua aur uska status kya hai green, yellow ya red. Status red ho toh VL71 ya VF31 jaise standard reprocess Tcode se reprint kar deta hoon. SP01 mein spool requests bhi check karta hoon. Practically, ek bar invoice print nahi ho rahi thi, NACE mein form naam mein typo tha purana form point kar raha tha. Iska benefit yeh hai ki sequential checklist follow karne se 90 percent issues 10 minute mein resolve ho jaate hain.",
    scriptE: "When troubleshooting output determination issues I follow a sequential approach. First I check NACE to confirm the output type has the correct form and driver program in Processing Routines. Next I inspect the NAST table to see whether the output record was created and its processing status, then I look at SP01 for spool requests. Standard reprocess transactions like VL71 for deliveries or VF31 for billing allow safe re-output. Common root causes include wrong form name in NACE, condition records missing in VV23, partner function not maintained, or output medium misconfigured. The business value is faster mean-time-to-recovery during critical document printing incidents.",
    words: [
      { keyword: "NACE", meaning: "Central transaction for output determination configuration across SD, MM and other applications." },
      { keyword: "NAST", meaning: "Output management table that stores all output records and their processing status." },
      { keyword: "VV21 / VV22 / VV23", meaning: "Create / change / display condition records for output determination." },
      { keyword: "VL71", meaning: "Reprocess output for outbound deliveries." },
      { keyword: "VF31", meaning: "Reprocess output for billing documents." },
      { keyword: "SP01", meaning: "Spool request overview; check status of generated print output." },
      { keyword: "SOST", meaning: "SAPconnect send requests; check email output status." },
      { keyword: "RSNAST00", meaning: "Standard program that processes NAST records for output transmission." },
      { keyword: "KSCHL", meaning: "Output type key like RD00 (invoice), LD00 (delivery note)." }
    ],
    mistakes: [
      { mistake: "Investigating form code before checking NACE configuration.", whyWrong: "Most output failures are configuration issues; debugging code first wastes hours.", correctApproach: "Follow the sequence NACE then NAST then SP01 then form, only debug code if config is correct." },
      { mistake: "Manually changing NAST records in production to force reprocessing.", whyWrong: "Direct table updates bypass logging and audit; they can corrupt downstream processes.", correctApproach: "Use standard reprocess Tcodes like VL71, VF31 or report RSNAST00 with proper authorisation." },
      { mistake: "Ignoring partner function setup when output is missing.", whyWrong: "Output medium 5 (email) requires partner function with valid email; missing partner suppresses output silently.", correctApproach: "Verify partner function and contact data in document partner tab before retriggering output." }
    ],
    qrn: "What: Output determination troubleshooting is the disciplined approach to locate why a SAP document did not produce print or email output.\n\nUsed for:\n- Missing or failed invoice / delivery prints\n- Email output not sent\n- Wrong form printed\n\nKey syntax / tables / Tcodes:\n- NACE (config), NAST (status), SP01 (spool), SOST (email)\n- VL71 / VF31 for safe reprocessing\n- RSNAST00 batch processor for NAST records\n\nInterview keyword: Sequential checklist NACE then NAST then SP01."
  },

  'forms-workflow-005': {
    scriptH: "Sir, BRF+ matlab Business Rules Framework Plus, SAP ka rule engine hai jo business decisions ko configurable rules mein convert karta hai bina ABAP code change kiye. BRFPLUS Tcode se access hota hai aur applications, functions, expressions, decision tables se rules banate hain. S/4HANA Output Management mein BRF+ heavily use hota hai output type aur form decide karne ke liye. Practically, mere project mein invoice output ke liye BRF+ decision table use hua tha company code aur document type ke combination pe form name decide karne ke liye business team khud rules update kar sakti thi without developer help. Iska benefit yeh hai ki business changes fast roll out hote hain aur code change cycle avoid hota hai.",
    scriptE: "BRF+ stands for Business Rules Framework Plus, a SAP rule engine accessible via the BRFPLUS transaction. It allows business decisions to be defined as configurable rules using applications, functions, expressions, and decision tables, all without ABAP code changes. In S/4HANA Output Management, BRF+ is central for determining which output type and form to use based on document attributes. In my project, a BRF+ decision table mapped company code and document type to the correct form name, letting the business team change mappings without a developer. The business value is faster turnaround for rule changes and a clean separation of business logic from technical code.",
    words: [
      { keyword: "BRFPLUS", meaning: "Transaction code to launch the Business Rules Framework Plus workbench." },
      { keyword: "Application", meaning: "Top-level BRF+ container that groups related functions and objects." },
      { keyword: "Function", meaning: "Entry point object that receives context and returns a result." },
      { keyword: "Decision Table", meaning: "Tabular rule object that maps input combinations to output values." },
      { keyword: "Expression", meaning: "Generic rule object (formula, decision table, decision tree) that produces a result." },
      { keyword: "Catalog", meaning: "Optional grouping for navigation and reuse of BRF+ objects." },
      { keyword: "FDT_TRACE", meaning: "Trace and test framework to validate BRF+ rule execution." },
      { keyword: "cl_fdt_factory", meaning: "ABAP factory class used to instantiate and call BRF+ functions from code." }
    ],
    mistakes: [
      { mistake: "Treating BRF+ as a replacement for all ABAP logic.", whyWrong: "Complex iterations and database-heavy logic perform poorly in BRF+; it is meant for decisions, not procedural code.", correctApproach: "Use BRF+ for business rules and decision tables, keep heavy data processing in ABAP." },
      { mistake: "Skipping decision table simulation before activation.", whyWrong: "Wrong rules go live and silently drive incorrect form or output type selection.", correctApproach: "Use FDT_TRACE or the built-in simulation in BRFPLUS to test all key scenarios before activating." },
      { mistake: "Transporting individual BRF+ objects instead of whole applications.", whyWrong: "Object references break in the target system because dependent objects are missing.", correctApproach: "Transport the whole BRF+ application or use FDT_HELPERS for consistent transport packaging." }
    ],
    qrn: "What: BRF+ is SAP's rule engine that lets business decisions be defined as configurable rules outside ABAP code.\n\nUsed for:\n- S/4HANA Output Management form determination\n- Workflow agent and approval rules\n- Pricing and validation logic\n\nKey syntax / tables / Tcodes:\n- BRFPLUS (workbench), FDT_TRACE (testing)\n- Application -> Function -> Expression / Decision Table\n- cl_fdt_factory to call BRF+ from ABAP\n\nInterview keyword: Configurable business rules without code changes."
  },

  'forms-workflow-006': {
    scriptH: "Sir, SAP Workflow ek business process automation framework hai jo work items ko relevant agents tak route karta hai. Workflow ki design SWDD transaction mein hoti hai jahan steps activities, conditions, forks, loops drag-drop karte hain. Trigger ke liye events use hote hain BOR objects jaise BUS2012 PO ya BUS2105 PR pe event raise hone se workflow start ho jaata hai SWE2 linkage ke through. Agent determination PFAC ke responsibility rules ya direct user assignment se hota hai. Practically, mere project mein PO release workflow banaya tha jo limit cross hone pe manager ko SBWP inbox mein approval bhejta tha. Iska benefit yeh hai ki approval process automated hota hai, audit trail milta hai, aur SLA monitor hoti hai.",
    scriptE: "SAP Workflow is a business process automation framework that routes work items to the responsible agents based on defined process steps. Workflows are designed in SWDD using step types like Activity for human tasks, Condition for branching, Fork for parallel branches, and Loop for iterations. They are triggered by events on BOR business objects such as BUS2012 (purchase order) or BUS2105 (purchase requisition), with event linkages maintained in SWE2. Agent determination uses PFAC responsibility rules or direct organisational assignment. The business value is automated approvals, full audit trail, deadline monitoring, and consistent execution across the enterprise.",
    words: [
      { keyword: "SWDD", meaning: "Workflow Builder transaction for designing workflow templates." },
      { keyword: "SBWP", meaning: "SAP Business Workplace user inbox where work items appear for action." },
      { keyword: "SWE2", meaning: "Event linkage transaction; binds a business object event to a workflow." },
      { keyword: "SWO1", meaning: "Business Object Builder for BOR objects like BUS2012." },
      { keyword: "BUS2012", meaning: "Standard BOR object for purchase order events and methods." },
      { keyword: "BUS2105", meaning: "Standard BOR object for purchase requisition events." },
      { keyword: "PFAC", meaning: "Maintain responsibility rules for agent determination." },
      { keyword: "SWI1", meaning: "Work item monitor to view all work items by status." },
      { keyword: "SWUE", meaning: "Test event generation to manually trigger a workflow event." }
    ],
    mistakes: [
      { mistake: "Forgetting to activate the event linkage in SWE2.", whyWrong: "Even if the workflow is active and the event fires, no instance starts because the linkage is inactive.", correctApproach: "After creating the workflow, set the event linkage in SWE2 to active and check the 'Enabled' flag." },
      { mistake: "Using a specific user instead of a position or role for agent assignment.", whyWrong: "When the user leaves or is on leave the workflow gets stuck; substitution does not always cover all cases.", correctApproach: "Use organisational position, role, or PFAC responsibility rule so that resolution stays dynamic." },
      { mistake: "Ignoring container binding between workflow and tasks.", whyWrong: "Without correct binding the task does not receive the business object reference; work item shows blank context.", correctApproach: "Define container elements at workflow and task level and create explicit binding for each step." }
    ],
    qrn: "What: SAP Workflow automates business processes by routing work items to the right agents using events, tasks, and containers.\n\nUsed for:\n- PO and PR release approvals\n- Invoice approvals and exception handling\n- HR processes like leave and travel approval\n\nKey syntax / tables / Tcodes:\n- SWDD (design), SBWP (inbox), SWE2 (linkage)\n- SWO1 (BOR objects BUS2012, BUS2105)\n- PFAC (responsibility rules), SWUE (test event)\n\nInterview keyword: Events trigger, agents act, containers carry context."
  },

  'forms-workflow-007': {
    scriptH: "Sir, stuck workflow troubleshoot karne ke liye mera approach systematic hota hai. Pehle SWI1 se pending work item dhoondhta hoon aur dekhta hoon kitne din pending hai aur kaunse status mein hai. SWI5 se admin view leta hoon jahan execution log detail mein milta hai konsa step ruka hai. SWI2_FREQ se frequent errors monitor karta hoon. Agar event fire nahi ho raha toh SWEL transaction se event trace dekhta hoon. Agent issue ho toh SWIA se manually agent forward kar deta hoon. Practically, mere project mein ek PO approval workflow stuck thi kyunki agent resign kar gaya tha. PFAC mein substitute set kiya aur SWIA se workflow reassign kar diya. Iska benefit yeh hai ki business operations rukti nahi.",
    scriptE: "Troubleshooting a stuck workflow follows a structured path. I start with SWI1 to identify the pending work item and how long it has been waiting. SWI5 gives an administrator view of the workflow execution log to find where the process stopped. SWEL shows whether the triggering event was actually fired and successfully linked. For agent issues, SWIA lets me forward the work item to another user. SWI2_FREQ helps spot recurring errors. In one project, a PO workflow was stuck because the agent had left the company; I configured substitution in PFAC and reassigned through SWIA. This minimises business disruption and maintains the audit trail.",
    words: [
      { keyword: "SWI1", meaning: "Work item selection screen to list and filter pending or completed work items." },
      { keyword: "SWI5", meaning: "Workload analysis showing work items per agent with status and history." },
      { keyword: "SWIA", meaning: "Admin Tcode to manage individual work items (forward, complete, set to ready)." },
      { keyword: "SWEL", meaning: "Event trace display; shows fired events and their linkages." },
      { keyword: "SWELS", meaning: "Switch event trace on or off." },
      { keyword: "SWI2_FREQ", meaning: "Reports work items by frequency to spot patterns and recurring errors." },
      { keyword: "SWPC", meaning: "Continue workflows that are in error after fixing the root cause." },
      { keyword: "PFAC", meaning: "Responsibility rule maintenance; used to set substitutes and agent rules." }
    ],
    mistakes: [
      { mistake: "Completing a stuck work item manually in production without root cause analysis.", whyWrong: "The same workflow will get stuck again; business loses traceability and the audit trail is broken.", correctApproach: "Diagnose with SWI5 and SWEL, fix the root cause (agent rule, event linkage), then restart with SWPC." },
      { mistake: "Switching event trace permanently on in production.", whyWrong: "Performance impact and disk usage are significant; trace tables grow rapidly.", correctApproach: "Enable trace via SWELS only when reproducing an issue, then switch off and clean up." },
      { mistake: "Hardcoding agent users in workflow steps.", whyWrong: "When the user leaves, the workflow halts with no agent; admin intervention is needed for every instance.", correctApproach: "Use organisational position or PFAC rule so that resolution survives staff changes." }
    ],
    qrn: "What: Workflow troubleshooting is the disciplined investigation of stuck or failed work items to restore process flow and prevent recurrence.\n\nUsed for:\n- Work items not appearing in inbox\n- Workflow stuck waiting on agent or event\n- Recurring errors in high-volume workflows\n\nKey syntax / tables / Tcodes:\n- SWI1 / SWI5 (work item analysis)\n- SWIA (admin actions), SWPC (continue after error)\n- SWEL / SWELS (event trace)\n\nInterview keyword: Diagnose then fix root cause then restart."
  }
};
