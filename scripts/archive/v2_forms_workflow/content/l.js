module.exports = {
  'forms-workflow-044': {
    scriptH: "Sir, real project mein Forms aur Workflow ke typical artefacts hote hain delivery note ya invoice driver mein LIKP-LIPS ya VBRK-VBRP read karte hain, NACE mein output type assignment hota hai, SmartForm ke through layout render hota hai. Workflow side pe SBWP inbox mein workitem dikhta hai, programmatic trigger SAP_WAPI_CREATE_EVENT se hota hai, SWDD mein workflow design hoti hai TS task aur WS template ke saath, email notification step EXTENDED_NOTIF_CONFIG ya simple email node se. Practically, mere project mein PO release workflow tha jo manager ko SBWP inbox mein approval task bhejta tha, approval pe SmartForm se PO PDF email vendor ko jaata tha. Iska benefit yeh hai ki end-to-end automation deliver hoti hai print plus process.",
    scriptE: "In real projects the Forms and Workflow artefacts integrate end-to-end. A delivery note or invoice driver reads LIKP-LIPS or VBRK-VBRP, NACE assigns the output type to a form and driver, and the SmartForm renders the layout. On the workflow side, SBWP shows the user inbox, SAP_WAPI_CREATE_EVENT triggers workflow programmatically, SWDD designs workflows using TS tasks and WS templates, and email notification is added via standard email step or EXTENDED_NOTIF_CONFIG. In my PO release project, the workflow routed approval to the manager via SBWP and on approval triggered a SmartForm PO PDF email to the vendor. The business value is automated end-to-end print plus process.",
    words: [
      { keyword: "LIKP / LIPS", meaning: "Delivery header / item tables." },
      { keyword: "VBRK / VBRP", meaning: "Billing header / item tables." },
      { keyword: "NACE", meaning: "Output determination config." },
      { keyword: "SAP_WAPI_CREATE_EVENT", meaning: "Trigger workflow event from ABAP code." },
      { keyword: "SBWP", meaning: "Business Workplace inbox for work items." },
      { keyword: "SWDD", meaning: "Workflow Builder transaction." },
      { keyword: "TS (Standard task)", meaning: "Reusable task object linked to BOR method." },
      { keyword: "WS (Workflow template)", meaning: "Workflow definition object activated in SWDD." },
      { keyword: "EXTENDED_NOTIF_CONFIG", meaning: "Standard email notification configuration for workflow." }
    ],
    mistakes: [
      { mistake: "Triggering workflow via custom event raise instead of standard FM.", whyWrong: "Misses standard event log handling, error processing, and admin tooling.", correctApproach: "Use SAP_WAPI_CREATE_EVENT to trigger workflow events from custom code." },
      { mistake: "Adding email notification as custom ABAP step.", whyWrong: "Reinvents notification framework; loses substitution, multi-language, and retry features.", correctApproach: "Use standard email step or EXTENDED_NOTIF_CONFIG for robust notification." },
      { mistake: "Reading individual document tables instead of using JOIN.", whyWrong: "Extra round-trips slow batch processing; high-volume drivers suffer.", correctApproach: "Use SELECT with JOIN to fetch header and items in one round-trip." }
    ],
    qrn: "What: Real-project Forms and Workflow artefacts span driver tables, NACE config, SmartForm rendering, SBWP inbox, and SWDD design.\n\nUsed for:\n- PO release with print and approval\n- Invoice generation triggered by billing event\n- Email-based notifications\n\nKey syntax / tables / Tcodes:\n- LIKP/LIPS, VBRK/VBRP for driver data\n- SAP_WAPI_CREATE_EVENT for programmatic trigger\n- TS task + WS template, EXTENDED_NOTIF_CONFIG\n\nInterview keyword: End-to-end print plus process."
  },

  'forms-workflow-045': {
    scriptH: "Sir, critical Forms escalation pe pehla step yeh hai SP01 check karna print failure ka exact symptom dekhne ke liye, fir SE38 driver ke saath quick reproduce karna QAS mein. Workflow escalation mein missing inbox items SWI1 se find karte hain agent search se, fir SWE2 active flag check, fir agent rule SWUE_TEST se verify. Workaround typically manual reprocess hota hai jab tak permanent fix transport nahi ho jaata. Communication regular updates aur stakeholder briefings ke saath hota hai. Practically, mere project mein ek month-end escalation thi 500 invoices spool fail customer copies missing the SP01 mein dekha printer queue stuck thi, basis se quick clear karwaaya, RSNAST00 se reprocess. Iska benefit yeh hai ki structured response se business impact contain hota hai.",
    scriptE: "For critical Forms escalations my first step is SP01 to see the exact print failure symptom, then reproducing in QAS via SE38. For workflow escalations with missing inbox items I find items in SWI1 by agent search, then check SWE2 active flag, then verify the agent rule via SWUE_TEST. A workaround typically involves manual reprocessing until the permanent fix is transported. Communication is regular through status updates and stakeholder briefings. In one month-end escalation, 500 invoices failed and customer copies were missing SP01 showed the printer queue was stuck, basis cleared it, and RSNAST00 reprocessed. A structured response contains business impact and preserves stakeholder confidence.",
    words: [
      { keyword: "SP01", meaning: "Spool overview; first check during print escalation." },
      { keyword: "SE38", meaning: "Reproduce issue via driver program in QAS." },
      { keyword: "SWI1", meaning: "Workflow work item search across users / tasks." },
      { keyword: "SWE2", meaning: "Event linkage; verify the Active flag." },
      { keyword: "SWUE_TEST", meaning: "Test agent rule directly without running workflow." },
      { keyword: "RSNAST00", meaning: "Reprocess pending NAST records after fix." },
      { keyword: "Emergency Transport", meaning: "Expedited transport with governance for production fixes." },
      { keyword: "RCA", meaning: "Root Cause Analysis; document for compliance and learning." }
    ],
    mistakes: [
      { mistake: "Promising a fix timeline before diagnosis.", whyWrong: "Sets unrealistic expectations; credibility loss when slipping.", correctApproach: "Diagnose first, then commit; communicate diagnosis status to stakeholders." },
      { mistake: "Skipping workaround and waiting for the permanent fix.", whyWrong: "Business impact balloons during the wait.", correctApproach: "Offer a workaround (manual reprocess) while the permanent fix flows through transports." },
      { mistake: "Closing escalation without RCA document.", whyWrong: "No prevention; no audit trail; same issue can recur.", correctApproach: "Always produce an RCA document covering cause, fix, evidence, prevention." }
    ],
    qrn: "What: Forms and Workflow escalation response is a fast structured triage covering symptom check, workaround, fix, communication, and RCA.\n\nUsed for:\n- Month-end critical print failures\n- Missing workflow inbox items\n- Vendor or customer-facing output incidents\n\nKey syntax / tables / Tcodes:\n- SP01 (print), SWI1 / SWE2 / SWUE_TEST (workflow)\n- RSNAST00 reprocess\n- Emergency transport with RCA\n\nInterview keyword: Triage fast, workaround now, fix properly, document always."
  },

  'forms-workflow-046': {
    scriptH: "Sir, FS Functional Spec aur TS Technical Spec project mein clear handoff documents hote hain. FS business requirement aur functional flow describe karta hai, TS developer banata hai jo bataata hai ki kaise implement karenge tables, FMs, transactions, transport plan. Form ke TS mein interface signature, layout sketch, driver structure, NACE config define karte hain. Workflow TS mein steps, agents, container bindings, escalation document karte hain. FS-TS ambiguity ke time clarify karne ke liye functional consultant ke saath sit-down karte hain. Practically, mere project mein PO release workflow ka TS mein flow diagram, PFAC rule, deadline matrix sab tha review meeting mein sign-off liya tha. Iska benefit yeh hai ki TS ke baad rework minimal hoti hai aur audit-ready documentation banta hai.",
    scriptE: "FS (Functional Spec) and TS (Technical Spec) are clear handoff documents in projects. FS describes business requirements and functional flows; TS is produced by the developer detailing the implementation tables, FMs, transactions, transport plan. For a form, TS defines the interface signature, layout sketch, driver structure, NACE config. For a workflow, TS documents steps, agents, container bindings, escalation. FS-TS ambiguity is resolved by sitting with the functional consultant to clarify before coding. In my project the PO release workflow TS included a flow diagram, PFAC rule, deadline matrix, all signed off in a review meeting. A solid TS minimises rework and produces audit-ready documentation.",
    words: [
      { keyword: "FS (Functional Spec)", meaning: "Business and functional requirement document produced by FC." },
      { keyword: "TS (Technical Spec)", meaning: "Developer-produced design from the FS, covering implementation detail." },
      { keyword: "Interface signature", meaning: "Form's importing parameters, tables, and exceptions documented in TS." },
      { keyword: "Driver structure", meaning: "Selection screen, data fetch, FM call sequence in driver program." },
      { keyword: "Workflow steps", meaning: "Activities, conditions, forks, loops in workflow design." },
      { keyword: "PFAC rule", meaning: "Responsibility rule documented in TS for agent determination." },
      { keyword: "Deadline matrix", meaning: "Step-level deadline configuration in workflow." },
      { keyword: "Transport plan", meaning: "Sequence and dependencies of transports for the change." }
    ],
    mistakes: [
      { mistake: "Treating TS as developer-only documentation.", whyWrong: "Functional consultant cannot validate logic; audit cannot trace decisions later.", correctApproach: "Write TS for the wider audience: clear language plus technical detail; obtain explicit sign-off." },
      { mistake: "Skipping TS for small changes.", whyWrong: "Small changes accumulate undocumented design drift; later maintainers struggle.", correctApproach: "Even for small changes, capture a brief design note attached to the change request." },
      { mistake: "Coding ahead of FS-TS clarification on ambiguous requirements.", whyWrong: "Rework explodes when business sees output; integration gaps appear late.", correctApproach: "Pause coding, schedule clarification with FC, capture decision in TS revision before resuming." }
    ],
    qrn: "What: FS-TS workflow documents the business requirement and the developer's design for Forms and Workflow changes.\n\nUsed for:\n- Pre-build review and sign-off\n- Audit and maintenance reference\n- Minimising rework and clarifying ambiguity\n\nKey syntax / tables / Tcodes:\n- Documented form interface and driver structure\n- Documented workflow steps, agents, containers\n- Documented transport plan\n\nInterview keyword: FS for what, TS for how, sign-off before code."
  }
};
