module.exports = {
  'forms-workflow-012': {
    scriptH: "Sir, S/4HANA mein forms aur workflow ka landscape evolve hua hai. Output Management framework ne classical NACE-based approach ko complement kiya hai BRF+ rules se output type aur form determine hote hain, Adobe Forms primary form technology hai standard scenarios mein, aur My Inbox Fiori app modern UX deta hai classical SBWP ki jagah. Flexible Workflow new low-code approach hai jahan business users khud rules configure kar sakte hain. Practically, mere project mein S/4HANA migration ke time hum existing SmartForms aur classical workflows ko continue rakha, naye scenarios ke liye Flexible Workflow use kiya. Iska benefit yeh hai ki backward compatibility milti hai aur naye features se modernise bhi ho jaata hai gradually.",
    scriptE: "In S/4HANA the forms and workflow landscape has been modernised but remains backward compatible. The Output Management framework complements classical NACE with BRF+ driven form determination, and Adobe Forms is the primary form technology for standard scenarios while existing SmartForms continue to run. Flexible Workflow brings a low-code approach where business users configure approval rules directly through Fiori. My Inbox in Fiori replaces SBWP for end users with a modern UX while SBWP still works. In my migration project we kept existing SmartForms and classical workflows running, then layered Flexible Workflow for new scenarios. The business value is gradual modernisation without disrupting existing automation.",
    words: [
      { keyword: "Output Management (OM)", meaning: "S/4HANA framework for output determination using BRF+ rules instead of pure NACE." },
      { keyword: "Flexible Workflow", meaning: "Low-code Fiori-based workflow configurable by business users." },
      { keyword: "My Inbox", meaning: "Fiori app that lists workflow work items, replacement UX for SBWP." },
      { keyword: "BRF+ in OM", meaning: "Rules engine that decides output type, form, channel based on context." },
      { keyword: "PPF", meaning: "Post Processing Framework; older S/4HANA output engine used in CRM and some scenarios." },
      { keyword: "SOAMANAGER", meaning: "Configure email and Web Service channels used by S/4HANA output." },
      { keyword: "NACE", meaning: "Classical output determination still available in S/4HANA for compatibility." },
      { keyword: "Adobe Forms (SFP)", meaning: "Primary form technology in S/4HANA for new development." }
    ],
    mistakes: [
      { mistake: "Rebuilding every form and workflow during S/4HANA migration.", whyWrong: "Massive rework cost; existing artifacts often run unchanged with backward compatibility.", correctApproach: "Keep working SmartForms and classical workflows; modernise selectively for new requirements." },
      { mistake: "Configuring Output Management without BRF+ skills on the team.", whyWrong: "Rules become unmaintainable; business cannot self-service changes.", correctApproach: "Train team on BRF+ basics and structure decision tables for business ownership." },
      { mistake: "Forcing all users to abandon SBWP for My Inbox immediately.", whyWrong: "Adoption suffers; users miss work items if both inboxes show different sets.", correctApproach: "Coexist initially, ensure My Inbox subscribes to all relevant task types, then plan retirement." }
    ],
    qrn: "What: S/4HANA modernises forms and workflow with Output Management, Flexible Workflow, and My Inbox while remaining backward compatible.\n\nUsed for:\n- New form output via OM and BRF+ rules\n- Self-service workflow design via Flexible Workflow\n- Modern user experience with My Inbox Fiori app\n\nKey syntax / tables / Tcodes:\n- Output Management with BRF+, NACE still works\n- Adobe Forms (SFP) as primary new form tech\n- My Inbox replaces SBWP for end users\n\nInterview keyword: Modernise selectively, keep backward compatibility."
  },

  'forms-workflow-013': {
    scriptH: "Sir, common mistakes Forms aur Workflow mein bahut hain aur production issues mostly inhi se aate hain. SmartForm activate karna bhool jaate hain code change ke baad, agent assignment specific user pe rakhte hain jo leave pe hai, event linkage SWE2 mein active mark karna miss kar dete hain, BREAK statement form mein chhod dete hain transport mein, FP_JOB_OPEN ya CLOSE skip kar dete hain Adobe form mein, NACE mein form name typo, background task ko dialog ban diya ya vice versa, aur exception handling skip kiya. Practically, mere project mein agent specific user tha jo resign hua aur workflow stuck ho gayi PFAC rule mein change kiya. Iska benefit yeh hai ki yeh mistakes pehle se pata hone se proactive avoid kar sakte hain.",
    scriptE: "Forms and Workflow have a well-known set of mistakes that cause most production incidents. Common ones include forgetting to activate the SmartForm after a change, assigning a specific user as agent who later leaves, missing the active flag in SWE2 event linkage, leaving BREAK statements inside the form before transport, skipping FP_JOB_OPEN or FP_JOB_CLOSE around an Adobe form call, typos in NACE form name, defining a background task as dialog or vice versa, and skipping exception handling on CALL FUNCTION. Awareness of these patterns prevents recurring issues. The business value is fewer incidents, shorter recovery times, and better confidence in production deployments.",
    words: [
      { keyword: "Activate (Ctrl+F3)", meaning: "Compiles the SmartForm and regenerates its FM; required after every change." },
      { keyword: "SWE2", meaning: "Event linkage; must be active for workflow to start on event." },
      { keyword: "PFAC rule", meaning: "Responsibility rule that resolves agent dynamically, surviving user changes." },
      { keyword: "BREAK / BREAK-POINT", meaning: "Debugger statements; must never reach production transports." },
      { keyword: "FP_JOB_OPEN / FP_JOB_CLOSE", meaning: "Mandatory bracket calls around Adobe form FM." },
      { keyword: "Background Task", meaning: "Workflow task that runs without dialog; method must not use MESSAGE." },
      { keyword: "Dialog Task", meaning: "Workflow task that runs in user session and can use MESSAGE." },
      { keyword: "RAISE exception", meaning: "Proper way for workflow methods to communicate errors back to the workflow." }
    ],
    mistakes: [
      { mistake: "Forgetting to activate the SmartForm after editing.", whyWrong: "The driver still calls the previously generated FM, so the change does not take effect at runtime.", correctApproach: "Always activate with Ctrl+F3 and verify activation status in DEV, QAS, and PROD after transport." },
      { mistake: "Hardcoding agent users in workflow steps.", whyWrong: "When the user leaves or is on long leave, the work item has no agent and the workflow halts.", correctApproach: "Use position, role, or PFAC rule for dynamic agent resolution." },
      { mistake: "Using MESSAGE statements in a background workflow task.", whyWrong: "Background tasks have no GUI, so the workflow throws an error and the work item goes to error status.", correctApproach: "Use RAISE exception in background methods; let the workflow handle the exception path." },
      { mistake: "Leaving BREAK or BREAK-POINT inside a SmartForm and transporting it.", whyWrong: "Production users hit the debugger and the form appears hung.", correctApproach: "Remove all BREAK nodes and review the transport before release." }
    ],
    qrn: "What: A well-known set of Forms and Workflow mistakes causes most production incidents; awareness prevents recurrence.\n\nUsed for:\n- Pre-transport review checklists\n- Knowledge transfer to new team members\n- Production stability and incident reduction\n\nKey syntax / tables / Tcodes:\n- Ctrl+F3 (activate), SWE2 (event linkage)\n- PFAC for dynamic agents, no hardcoded users\n- FP_JOB_OPEN / FP_JOB_CLOSE always paired\n\nInterview keyword: Know the mistakes, avoid them proactively."
  },

  'forms-workflow-014': {
    scriptH: "Sir, testing strategy Forms aur Workflow ke liye layered hoti hai. SmartForm directly SE37 ya SMARTFORMS test mode mein test karta hoon hardcoded sample data se layout verify ho jaata hai. Driver program SE38 mein run karke end-to-end test karta hoon. Workflow trigger ke liye SWUE se manual event raise karta hoon, SWI1 se work item dekhta hoon, agent ke under login karke approval karta hoon. Background output ke liye SM37 job log aur SP01 spool check karta hoon. Multilingual cases mein SU01 user language change karke test karta hoon. Practically, mere project mein QAS mein full UAT karwaaya tha actual business users se. Iska benefit yeh hai ki layered testing se PROD mein surprises nahi aate.",
    scriptE: "Testing Forms and Workflow is layered. For SmartForms I test directly using SMARTFORMS test mode or SE37 on the generated FM with sample data, then run the driver from SE38 for end-to-end output. For workflow, I trigger the event manually via SWUE, watch the work item appear in SWI1, log in as the agent (or simulate) to complete steps, and check SM37 for background steps. SP01 confirms spool output for background printing. Multilingual scenarios require SU01 language changes per test user. End-to-end UAT in QAS with real business users gives final confidence. The business value is fewer production defects and quicker stabilisation post go-live.",
    words: [
      { keyword: "SMARTFORMS test", meaning: "Built-in test mode launched via F8 from the form; runs with hardcoded inputs." },
      { keyword: "SE37", meaning: "Function Builder used to test generated SmartForm and Adobe FMs directly." },
      { keyword: "SWUE", meaning: "Test event generation; manually fires an event to trigger a workflow." },
      { keyword: "SWI1", meaning: "Lists work items by user and status; used to verify workflow trigger and routing." },
      { keyword: "SM37", meaning: "Job overview for background scheduling; check status and spool of background prints." },
      { keyword: "SP01", meaning: "Spool requests list; inspect generated output for batch jobs." },
      { keyword: "SU01", meaning: "User maintenance; change logon language for multilingual form testing." },
      { keyword: "UAT", meaning: "User Acceptance Testing performed by real business users in QAS." }
    ],
    mistakes: [
      { mistake: "Testing forms only in foreground with print preview.", whyWrong: "Background jobs behave differently (no dialog, spool only); issues only emerge in production batch runs.", correctApproach: "Always include a background test via SM36 to validate behaviour without GUI." },
      { mistake: "Skipping workflow trigger testing via SWUE.", whyWrong: "Event linkage problems only surface when a real business action fires the event, often in production.", correctApproach: "Use SWUE to manually raise the event and verify the workflow starts as expected." },
      { mistake: "Running UAT in DEV instead of QAS.", whyWrong: "DEV lacks production-like configuration; defects from environmental drift are missed.", correctApproach: "Perform UAT in QAS with a refreshed dataset and full transport set imported." }
    ],
    qrn: "What: Forms and Workflow testing is a layered strategy from FM-level unit tests through full UAT in QAS.\n\nUsed for:\n- SmartForm layout verification\n- Workflow trigger and routing tests\n- End-to-end UAT before production cut-over\n\nKey syntax / tables / Tcodes:\n- SMARTFORMS test / SE37 (form unit)\n- SWUE (event), SWI1 (work item), SBWP (agent action)\n- SM37 / SP01 for background validation\n\nInterview keyword: Layered tests catch issues before production."
  },

  'forms-workflow-015': {
    scriptH: "Sir, interview mein trap questions ka mqasad hota hai overconfident ya superficial knowledge expose karna. Mera approach yeh hai ki absolute statements ko challenge karta hoon politely jaise SmartForms deprecated hai S/4HANA mein yeh wrong hai, woh available aur supported hai, sirf naye scenarios mein Adobe preferred hai. General Task always use karo bhi galat hai security risk hota hai. MESSAGE background task mein nahi chalna chahiye RAISE exception use karo. Practically, ek interview mein puucha tha BREAK production safe hai maine clearly explain kiya nahi, transport ke pehle hatao. Iska benefit yeh hai ki nuanced answers se senior level samajh dikhti hai aur trap successfully navigate ho jaata hai.",
    scriptE: "Trap questions in interviews are designed to expose superficial knowledge or overconfidence. My approach is to challenge absolute statements politely with nuance. SmartForms is not deprecated in S/4HANA it remains supported, Adobe is preferred for new builds. General Task should not be the default it creates security gaps. MESSAGE statements do not belong in background workflow tasks; RAISE exception is the correct pattern. Workflow deadline monitoring requires explicit configuration, it is not automatic. In one interview I was asked if BREAK in production is safe; I clearly explained it is not and must be removed before transport. Demonstrating this nuance signals senior-level depth.",
    words: [
      { keyword: "Deprecation", meaning: "Marking a feature as legacy; not the same as removal or unsupported." },
      { keyword: "General Task", meaning: "Task open to any SAP user; used selectively, not as default." },
      { keyword: "MESSAGE in background", meaning: "Anti-pattern; background tasks have no GUI and the workflow errors." },
      { keyword: "RAISE EXCEPTION", meaning: "Correct way for background method to signal failures back to workflow." },
      { keyword: "Deadline monitoring", meaning: "Requires explicit configuration on workflow step (requested start, latest end)." },
      { keyword: "SWPC", meaning: "Continue workflows in error after root cause resolution." },
      { keyword: "SWI6", meaning: "Show workflows started for a business object instance, useful for trap question validation." },
      { keyword: "QAS testing", meaning: "User acceptance and integration testing in quality system; mandatory before PROD." }
    ],
    mistakes: [
      { mistake: "Accepting an interviewer's incorrect statement to avoid disagreement.", whyWrong: "It signals weak understanding and the answer becomes wrong in the record.", correctApproach: "Politely correct with evidence: 'SmartForms remains supported in S/4HANA; new builds usually go to Adobe.'" },
      { mistake: "Saying any restart can be done from any transaction.", whyWrong: "Restart procedures depend on workflow type, step status, and authorisation; this answer reveals shallow operational knowledge.", correctApproach: "Mention SWPC for continue-on-error, SWIA for individual work item admin, and the need for proper roles." },
      { mistake: "Skipping QAS testing because DEV passed.", whyWrong: "Environmental drift means configuration and data differ; PROD defects are inevitable.", correctApproach: "Always cycle through DEV then QAS UAT then PROD with the correct transport path." }
    ],
    qrn: "What: Forms and Workflow trap questions test depth by pushing absolute statements; the senior answer is the nuanced one.\n\nUsed for:\n- Distinguishing senior from junior candidates\n- Interview preparation around legacy vs S/4HANA features\n- Operational discipline around restart and testing\n\nKey syntax / tables / Tcodes:\n- SWPC (continue after error), SWIA (admin action)\n- Background tasks use RAISE EXCEPTION, not MESSAGE\n- Deadline monitoring requires explicit step config\n\nInterview keyword: Politely nuance the absolute statement."
  }
};
