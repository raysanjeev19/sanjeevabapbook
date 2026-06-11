module.exports = {
  'forms-workflow-008': {
    scriptH: "Sir, SWDD matlab Workflow Builder hai SAP ka, jahan workflow templates ko visually design karte hain. SWDD mein different step types drag-drop karte hain Activity for human tasks, Condition for branching, Fork for parallel paths, Loop for iterations, aur Container Operation for data manipulation. Steps ke beech data flow workflow container aur bindings se control hota hai. Hum activate karte hain Ctrl+F3 se aur SWUE ya direct event linkage se test karte hain. Practically, mere project mein PO release workflow design ki thi SWDD mein limit check condition lagaayi, manager approval step add kiya, parallel notification fork banayi. Iska benefit yeh hai ki business process ka visual representation milta hai jo functional team bhi samajh sakti hai.",
    scriptE: "SWDD is the Workflow Builder transaction used to visually design and maintain workflow templates. I add steps from the palette Activity for human tasks, Background steps for automated tasks, Condition for branching, Fork for parallel execution, Loop for iterations, and Container Operation for data updates. Data flows between steps through workflow and task containers using bindings. Once designed, the workflow is activated with Ctrl+F3 and tested via SWUE or direct event triggering. In my project I built a PO release workflow with a condition on amount, a manager approval activity, and a fork for parallel notifications. SWDD provides a clear visual model that business stakeholders can also review.",
    words: [
      { keyword: "SWDD", meaning: "Workflow Builder for designing workflow templates (WS) visually." },
      { keyword: "Activity step", meaning: "Step that calls a standard task; usually involves a human agent." },
      { keyword: "Condition step", meaning: "Branch step that evaluates a logical condition on container values." },
      { keyword: "Fork step", meaning: "Defines parallel branches that execute simultaneously and merge later." },
      { keyword: "Loop step", meaning: "Repeats a block of steps until a condition becomes false." },
      { keyword: "Container Operation", meaning: "Manipulates workflow container variables at runtime (assign, calculate)." },
      { keyword: "WS template", meaning: "Workflow template object created in SWDD; activated as WS<number>." },
      { keyword: "TS task", meaning: "Standard task object linking to a BOR method, reused across workflows." },
      { keyword: "PFTC", meaning: "Standard task maintenance; create and configure TS tasks used by activities." }
    ],
    mistakes: [
      { mistake: "Skipping container binding between workflow and task in an activity step.", whyWrong: "The task receives no business object reference and work item context is empty.", correctApproach: "Maintain explicit container binding for every activity, mapping workflow elements to task parameters." },
      { mistake: "Activating workflow but forgetting to release the transport.", whyWrong: "Workflow stays in DEV; QAS and PROD systems do not get the change and tests fail.", correctApproach: "Release the transport request and validate import logs after each workflow change." },
      { mistake: "Designing one huge monolithic workflow with all logic inline.", whyWrong: "Hard to maintain, debug, and reuse; small changes risk regression across the whole process.", correctApproach: "Break logic into reusable subworkflows or standard tasks and call them from a parent workflow." }
    ],
    qrn: "What: SWDD is the SAP Workflow Builder used to visually design workflow templates with step-based logic.\n\nUsed for:\n- Designing approval workflows (PO, PR, invoice)\n- HR processes and exception handling\n- Multi-level escalation processes\n\nKey syntax / tables / Tcodes:\n- SWDD (builder), PFTC (standard tasks)\n- Step types Activity, Condition, Fork, Loop, Container Operation\n- Activate with Ctrl+F3, test with SWUE\n\nInterview keyword: Visual design with containers and bindings."
  },

  'forms-workflow-009': {
    scriptH: "Sir, agent determination decide karta hai workflow runtime pe konse user ko work item milega. Do levels hote hain Possible Agents jo PFTC mein task level pe maintain hote hain matlab kaun is task ko theoretically execute kar sakta hai, aur Responsible Agents jo step level pe define hote hain matlab is particular instance mein actually kaun karega. Responsible Agent specific user, position, role, ya PFAC responsibility rule ho sakta hai. Practically, mere project mein PO approval workflow mein responsible agent PFAC rule se aata tha jo plant aur amount ke base pe correct manager pick karta tha. Iska benefit yeh hai ki organisation change pe rule update karne se hi workflow continue ho jaata hai bina code change.",
    scriptE: "Agent determination decides who receives a work item at runtime. SAP has two layers Possible Agents defined at the task level in PFTC, representing all users theoretically allowed to execute that task; and Responsible Agents defined at the step level, representing who actually gets it for this instance. Responsible Agent can be a specific user, position, role, or a PFAC responsibility rule that evaluates context data. In my PO approval project, the responsible agent came from a PFAC rule keyed on plant and amount so the right manager always got the work item. The business value is dynamic resolution that survives organisational changes without code updates.",
    words: [
      { keyword: "PFTC", meaning: "Standard task maintenance; define possible agents on the Agent Assignment screen." },
      { keyword: "PFAC", meaning: "Maintain responsibility rules used as dynamic responsible agents." },
      { keyword: "Possible Agent", meaning: "Set of users authorised at the task level; superset for runtime selection." },
      { keyword: "Responsible Agent", meaning: "Actual recipient at runtime, set on the workflow step." },
      { keyword: "General Task", meaning: "Task flagged so any SAP user can execute; used carefully for open inboxes." },
      { keyword: "Organisational Unit", meaning: "Department or team object in HR org structure used in agent rules." },
      { keyword: "Position", meaning: "Org element holder of an agent; assignment survives person changes." },
      { keyword: "Role (PFCG)", meaning: "Authorisation role that can also be used as a possible agent set." }
    ],
    mistakes: [
      { mistake: "Marking every task as General Task to avoid agent setup.", whyWrong: "Any SAP user can pick the work item, breaking segregation of duties and audit requirements.", correctApproach: "Define proper Possible Agents in PFTC and a precise Responsible Agent at the step using PFAC or position." },
      { mistake: "Assigning a specific user as Responsible Agent.", whyWrong: "When the user leaves, work items have no recipient and the workflow gets stuck.", correctApproach: "Use position, organisational unit, role, or PFAC rule so resolution stays dynamic." },
      { mistake: "Forgetting to enhance the possible agents list when adding a new approval scenario.", whyWrong: "PFAC rule returns a user not in possible agents list, triggering 'no agent found' exception.", correctApproach: "Keep possible agents broad (e.g., role) and use the responsible agent rule for precision." }
    ],
    qrn: "What: Agent determination in SAP Workflow selects the right user to receive each work item at runtime.\n\nUsed for:\n- PO and PR approval routing\n- HR process recipients (manager, HR partner)\n- Substitution and escalation handling\n\nKey syntax / tables / Tcodes:\n- PFTC (possible agents), PFAC (responsibility rule)\n- Position, role, org unit, or rule for responsible agent\n- SWI1 to verify which agent received an item\n\nInterview keyword: Possible Agent is who can; Responsible Agent is who does."
  },

  'forms-workflow-010': {
    scriptH: "Sir, form alignment issues production mein mostly font, paragraph format, ya printer device type ki mismatch se aati hain. Mera principle yeh hai ki kabhi production mein direct form fix nahi karta DEV mein correction banata hoon, QAS mein test karta hoon, phir transport karta hoon. SE71 SAPscript ke liye, SMARTFORMS aur SFP SmartForm aur Adobe ke liye debug karta hoon. SPAD se device types check karta hoon aur SP01 se actual spool output dekhta hoon. Practically, mere project mein invoice ke amount column right-align nahi ho rahe the alignment paragraph format mein THSDS pe set tha jo decimals shift karta tha SAPscript mein TH char format apply kiya. Iska benefit yeh hai ki controlled fix transport-tested aur audit-safe rehta hai.",
    scriptE: "Form alignment issues in production typically come from font selection, paragraph formats, character formats, or device type mismatches at the printer. My discipline is to never modify a form directly in production; I create the correction in DEV, test in QAS, then transport via STMS. I open the form in SE71 for SAPscript, SMARTFORMS for SmartForms, or SFP for Adobe Forms, and use SPAD to check device types and SP01 to inspect actual spool output. In one project amount columns were not right-aligned because the paragraph format used wrong decimal handling; I applied the correct character format and the fix flowed through QAS to production cleanly.",
    words: [
      { keyword: "SE71", meaning: "SAPscript form painter; edit pages, windows, text elements." },
      { keyword: "SMARTFORMS", meaning: "SmartForm builder; modify pages, windows, text and ABAP code nodes." },
      { keyword: "SFP", meaning: "Adobe Forms transaction; layout in LiveCycle Designer, interface in SAP." },
      { keyword: "SPAD", meaning: "Spool administration; configure printers and device types." },
      { keyword: "SP01", meaning: "Display spool requests; verify exact rendered output." },
      { keyword: "STMS", meaning: "Transport Management System; move corrections through DEV -> QAS -> PROD." },
      { keyword: "SE73", meaning: "SAPscript font maintenance; check installed fonts and bar code definitions." },
      { keyword: "Paragraph Format", meaning: "Defines font, alignment, indent for a SAPscript or SmartForms paragraph." },
      { keyword: "Character Format", meaning: "Inline format overriding font or style for selected characters." }
    ],
    mistakes: [
      { mistake: "Editing a SmartForm directly in production to fix alignment fast.", whyWrong: "Bypasses transport, breaks DEV-QAS-PROD consistency, and creates an unauthorised production change.", correctApproach: "Fix in DEV, validate in QAS, transport via STMS even for emergencies use the formal emergency transport process." },
      { mistake: "Assuming output looks the same on every printer.", whyWrong: "Different device types (SAPWIN, POSTSCRIPT, ZPL for label printers) interpret formatting differently.", correctApproach: "Test on the exact device type used in production; configure correct device type in SPAD." },
      { mistake: "Changing a shared paragraph format without impact analysis.", whyWrong: "Style sheet changes ripple to every form using it, breaking unrelated layouts.", correctApproach: "Use 'where-used' on style or font before modifying; clone the style if scope must be limited." }
    ],
    qrn: "What: Form alignment troubleshooting is the controlled investigation and fix of layout, font, and device-related output defects.\n\nUsed for:\n- Misaligned columns in invoice or PO\n- Cut-off text near margins\n- Wrong font or character rendering across printers\n\nKey syntax / tables / Tcodes:\n- SE71 (SAPscript), SMARTFORMS, SFP (Adobe)\n- SPAD (device types), SP01 (verify output), STMS (transport)\n- SE73 fonts and bar codes\n\nInterview keyword: Fix in DEV, validate in QAS, transport via STMS."
  },

  'forms-workflow-011': {
    scriptH: "Sir, agar koi pooche SmartForm aur Workflow simple language mein toh main bolunga SmartForm woh template hai jo invoice, delivery challan, PO ki print output banata hai bas form ka layout hai. Workflow approval process hai jaise PO bana, manager ko approval karna hai, agar approve kiya toh PO release, reject kiya toh requestor ko wapas. Dono milke business automation karte hain SmartForm dikhata hai document, workflow control karta hai uska flow. Practically, mere project mein PO release workflow tha jo amount check karta tha aur threshold cross hone pe manager ko approval task bhejta tha, approve hone pe SmartForm se PO print spool jaata tha. Iska benefit yeh hai ki print aur process automation ek end-to-end solution banta hai.",
    scriptE: "If asked in plain language, I explain that a SmartForm is a layout template that produces printed output for documents like invoices, delivery notes, or POs. A Workflow is an automated approval and routing process for example a PO is created, the manager must approve, and on approval the PO is released; on rejection it returns to the requestor. SmartForm handles the document appearance, Workflow handles the process. In my project a PO release workflow checked the value against thresholds, routed approval to the right manager, and on approval the SmartForm produced the official PO printout. Together they deliver a complete print plus process automation experience.",
    words: [
      { keyword: "SmartForm", meaning: "Template for printable SAP documents created in SMARTFORMS." },
      { keyword: "Workflow", meaning: "Sequence of approval or process steps automated in SAP using SWDD." },
      { keyword: "Driver Program", meaning: "ABAP report that fetches data and calls the SmartForm FM." },
      { keyword: "PO release", meaning: "Approval step before a purchase order can be sent to vendor." },
      { keyword: "SBWP", meaning: "Business Workplace where workflow work items appear for the approver." },
      { keyword: "BUS2012", meaning: "BOR object for purchase order events that trigger workflow." },
      { keyword: "NACE", meaning: "Configures which SmartForm and driver run for an output type like NEU for PO." },
      { keyword: "Output type", meaning: "Configuration object that decides when and how a document prints." }
    ],
    mistakes: [
      { mistake: "Explaining SmartForm and Workflow using only technical jargon.", whyWrong: "Functional consultants and business users disengage; design errors creep in from miscommunication.", correctApproach: "Use simple analogies (invoice layout vs approval process) and back up with one concrete example." },
      { mistake: "Assuming the functional consultant knows the technical components like NACE or SWDD.", whyWrong: "Critical configuration details get missed during requirement gathering.", correctApproach: "Walk through the end-to-end flow in plain language and ask explicit configuration questions." },
      { mistake: "Treating SmartForm and workflow as unrelated when they jointly serve the process.", whyWrong: "Approval delay or output failure becomes hard to triage if the integration is not understood as one flow.", correctApproach: "Map the end-to-end journey trigger event, workflow steps, output generation, archival." }
    ],
    qrn: "What: SmartForm is the document layout; Workflow is the process automation; together they deliver end-to-end document and approval flow.\n\nUsed for:\n- Explaining technical components to business and functional consultants\n- Designing integrated PO release plus print solutions\n- Joint requirement gathering\n\nKey syntax / tables / Tcodes:\n- SMARTFORMS (layout), SWDD (workflow design)\n- NACE (output assignment), SBWP (approver inbox)\n- BUS2012 events trigger workflow\n\nInterview keyword: Layout vs flow SmartForm prints, workflow approves."
  }
};
