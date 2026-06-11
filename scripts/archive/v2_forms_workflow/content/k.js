module.exports = {
  'forms-workflow-040': {
    scriptH: "Sir, workflow aur form debugging ka structured approach hota hai. Stuck workflow ke liye SWI1 se work item find karta hoon, SWI5 se admin view, SWEL se event trace, SWETYPV se event type linkage check. Container binding issues ke liye SWI1 se work item detail mein binding tab dekhta hoon. Blank form output mein NACE config aur driver data check karte hain. SM37 se background job logs aur SP01 se spool output verify karte hain. Failed workflow restart SWPC se hota hai root cause fix ke baad. Practically, mere project mein ek PO workflow stuck thi - SWEL trace mein dekha event fire hua tha lekin SWE2 linkage inactive thi. Iska benefit yeh hai ki layered diagnostic se hidden config issues bhi expose ho jaate hain.",
    scriptE: "Workflow and form debugging follows a structured layered approach. For stuck workflows I use SWI1 to find the work item, SWI5 for admin view, SWEL for event trace, and SWETYPV to check event-type linkage. Container binding issues are inspected via the work item detail binding tab. Blank form output is checked against NACE config and driver data flow. SM37 reveals background job errors and SP01 verifies spool output. Failed workflows are restarted via SWPC after root cause is fixed. In one project a PO workflow was stuck the SWEL trace showed the event fired but SWE2 linkage was inactive. Layered diagnostics expose hidden config issues quickly.",
    words: [
      { keyword: "SWI1", meaning: "Work item monitor; filter by status, agent, task." },
      { keyword: "SWI5", meaning: "Workload analysis per agent with execution history." },
      { keyword: "SWEL", meaning: "Event trace display; shows fired events and linkages." },
      { keyword: "SWETYPV", meaning: "Event type linkage maintenance per object type." },
      { keyword: "SWE2", meaning: "Event linkage; per workflow / receiver." },
      { keyword: "SWPC", meaning: "Continue workflows in error after RCA." },
      { keyword: "SM37", meaning: "Background job overview." },
      { keyword: "Container binding", meaning: "Mapping of data elements between workflow, tasks, and rules." }
    ],
    mistakes: [
      { mistake: "Restarting a workflow without fixing root cause.", whyWrong: "Same instance fails again; business loses confidence; logs grow.", correctApproach: "Diagnose with SWI5/SWEL, fix the cause, then SWPC to continue." },
      { mistake: "Leaving event trace on permanently in production.", whyWrong: "Performance impact and disk usage; trace tables grow rapidly.", correctApproach: "Turn on via SWELS only while reproducing the issue, then turn off and purge." },
      { mistake: "Ignoring container binding when work item is empty.", whyWrong: "The work item has no business object reference; debugging in form code reveals nothing.", correctApproach: "Check binding tab in work item detail; correct workflow-to-task element mapping." }
    ],
    qrn: "What: Workflow and form debugging is a layered approach across event trace, work item analysis, and config check.\n\nUsed for:\n- Stuck or failed workflow instances\n- Blank or wrong form output\n- Event linkage and binding issues\n\nKey syntax / tables / Tcodes:\n- SWI1 / SWI5 / SWEL / SWETYPV / SWE2\n- SWPC continue after fix\n- SM37 / SP01 for execution verification\n\nInterview keyword: Layered diagnostics expose hidden config."
  },

  'forms-workflow-041': {
    scriptH: "Sir, Forms aur Workflow ke performance issues mostly N+1 SELECTs, large containers, synchronous workflows high-volume mein, aur unoptimised spool jobs se aate hain. SWWWIHEAD table workflow runtime store karta hai aur badi growth se performance degrade hoti hai periodic archive zaroori hai. Smart Form Code nodes mein nested SELECT loops se queries blast hoti hain hum data pre-fetch karte hain driver mein aur form mein sirf display logic rakhte hain. Practically, mere project mein 5000 invoices ki batch print 6 ghante le rahi thi optimisation mein DB SELECTs reduce kiye aur SSF_OPEN/CLOSE wrap kiya 1.5 ghante mein aa gayi. Iska benefit yeh hai ki SLA meet hoti hai aur infra cost low rehti hai.",
    scriptE: "Forms and Workflow performance issues commonly come from N+1 SELECTs inside form ABAP nodes, large workflow containers, synchronous workflows for high-volume scenarios, and unoptimised spool jobs. SWWWIHEAD stores workflow runtime data; uncontrolled growth degrades performance and archiving is essential. SmartForm Code nodes with nested SELECTs explode query counts move data pre-fetching to the driver and keep the form purely for display. In one project a 5000-invoice batch print took 6 hours; after consolidating SELECTs and wrapping calls with SSF_OPEN/CLOSE it dropped to 1.5 hours. Performance tuning protects SLAs and contains infrastructure cost.",
    words: [
      { keyword: "SWWWIHEAD", meaning: "Workflow work item runtime table; large size affects performance." },
      { keyword: "N+1 SELECT", meaning: "Anti-pattern where each loop row triggers a separate DB read." },
      { keyword: "SSF_OPEN / SSF_CLOSE", meaning: "Bracket spool job for batch SmartForm calls; single spool overhead." },
      { keyword: "Workflow Archiving", meaning: "Periodic archival of completed workflows to control table growth." },
      { keyword: "Asynchronous workflow", meaning: "Decoupled trigger and execution; better throughput than sync." },
      { keyword: "Pre-fetch", meaning: "Fetch all needed data once in driver instead of inside form Code nodes." },
      { keyword: "Index", meaning: "DB index on key columns used by driver SELECTs." }
    ],
    mistakes: [
      { mistake: "Putting SELECTs inside form ABAP Code nodes.", whyWrong: "Triggers N+1 SELECT problem with massive performance cost on batch runs.", correctApproach: "Pre-fetch all data in the driver and pass to form via TABLES." },
      { mistake: "Calling SSF_OPEN / SSF_CLOSE inside the loop per document.", whyWrong: "Creates a separate spool per document; overhead and management nightmare.", correctApproach: "Call SSF_OPEN once before the loop and SSF_CLOSE once after." },
      { mistake: "Skipping workflow archival.", whyWrong: "SWWWIHEAD grows unbounded; performance degrades across the system.", correctApproach: "Schedule WF_ARCH archiving and database statistics maintenance regularly." }
    ],
    qrn: "What: Forms and Workflow performance tuning targets DB query patterns, container sizes, spool batching, and runtime archiving.\n\nUsed for:\n- High-volume invoice / delivery batch printing\n- Long-running workflow processes\n- Database growth control\n\nKey syntax / tables / Tcodes:\n- SSF_OPEN / SSF_CLOSE for batch spool\n- Pre-fetch in driver, no SELECT in form Code nodes\n- Archive SWWWIHEAD via WF_ARCH program\n\nInterview keyword: Pre-fetch, batch, and archive."
  },

  'forms-workflow-042': {
    scriptH: "Sir, Forms aur Workflow ke authorisation issues SU53 se diagnose karte hain failed authority check details milti hain. ST01 trace specific user ke liye full auth trace deta hai. WF-BATCH user ko background workflow steps execute karne ki authorities chahiye RFC, business object, transactions. S_PROGRAM authority driver program ke liye lag sakti hai agar program user group restricted ho. Practically, mere project mein ek user form print nahi kar pa raha tha SU53 mein dekha S_TCODE missing tha ZINV_PRINT ke liye, role update kiya. Iska benefit yeh hai ki authorisation issues fast diagnose hote hain bina trial-and-error.",
    scriptE: "Forms and Workflow authorisation issues are diagnosed primarily with SU53 (shows the most recent failed authority check for the user) and ST01 (full authorisation trace for specific users). The WF-BATCH user needs authorities to execute background workflow steps RFC, business object methods, transactions. S_PROGRAM authority can block driver programs when restricted user groups apply. In one case a user could not print a form; SU53 revealed S_TCODE missing for the custom ZINV_PRINT transaction, and a role update fixed it. Authorisation issues diagnosed via SU53/ST01 are resolved much faster than trial-and-error role assignment.",
    words: [
      { keyword: "SU53", meaning: "Display last failed authorisation check for the current user." },
      { keyword: "ST01", meaning: "System trace including authorisation, RFC, kernel events." },
      { keyword: "WF-BATCH", meaning: "Default workflow background user; needs broad authorities for tasks." },
      { keyword: "S_TCODE", meaning: "Authorisation object for transaction code execution." },
      { keyword: "S_PROGRAM", meaning: "Authorisation object for ABAP report execution by group." },
      { keyword: "Structural Authorisation", meaning: "HR-specific authorisation based on org structure." },
      { keyword: "PFCG", meaning: "Role maintenance; assign authorisations to users." },
      { keyword: "S_RFC", meaning: "Authorisation object for RFC function module execution." }
    ],
    mistakes: [
      { mistake: "Granting SAP_ALL to WF-BATCH for convenience.", whyWrong: "Massive security risk; violates least-privilege; audit findings.", correctApproach: "Provide a tailored composite role for WF-BATCH covering only required tasks and RFCs." },
      { mistake: "Asking user to retry without checking SU53 first.", whyWrong: "Wastes user time; root cause remains hidden.", correctApproach: "Run SU53 immediately after the failure; diagnose missing authority precisely." },
      { mistake: "Leaving ST01 trace on permanently.", whyWrong: "Performance and storage impact; trace data exposes sensitive information.", correctApproach: "Enable ST01 trace briefly while reproducing the issue, then disable." }
    ],
    qrn: "What: Forms and Workflow authorisation issues are diagnosed with SU53 and ST01 and remediated via least-privilege role updates.\n\nUsed for:\n- User cannot print or trigger workflow\n- WF-BATCH execution failures\n- Background job authority errors\n\nKey syntax / tables / Tcodes:\n- SU53 (last failure), ST01 (trace)\n- WF-BATCH role design, S_TCODE, S_PROGRAM, S_RFC\n- PFCG for role updates\n\nInterview keyword: SU53 first, ST01 deep, least-privilege fix."
  },

  'forms-workflow-043': {
    scriptH: "Sir, Forms aur Workflow transport sequence carefully manage karna padta hai. SmartForms workbench transport mein jaate hain SMARTFORMS related repository objects ke saath. Workflow templates aur tasks workbench transports mein jaate hain WS aur TS objects. PFAC rules, NACE config customising transports mein jaate hain typically. BRF+ applications dedicated transport approach hota hai. Post-transport pe target system mein form activate, event linkage SWE2 active mark, agent assignment verify, aur smoke test karte hain. Practically, mere project mein ek transport mein NACE config bhi gayi but customising request alag tha workbench import ke baad customising bhi import karna pada. Iska benefit yeh hai ki coordinated transport se PROD smoothly enable hota hai bina manual fix.",
    scriptE: "Forms and Workflow transport sequencing requires coordination across workbench and customising transports. SmartForms travel as workbench objects (form, generated FM after activation). Workflow templates (WS) and tasks (TS) are workbench objects. PFAC rules and NACE config are usually customising transports. BRF+ applications have their own transport approach. Post-transport in the target system, mandatory steps include activating the form, marking SWE2 event linkage active, verifying agent assignment, and performing smoke tests. In one project a transport carried NACE config in a separate customising request, requiring sequential import. Coordinated transport sequencing enables smooth production cutover without manual repair.",
    words: [
      { keyword: "Workbench Transport", meaning: "Carries repository objects: programs, FMs, SmartForms, workflows." },
      { keyword: "Customising Transport", meaning: "Carries config: NACE, PFAC, agent assignment, condition records (with caveats)." },
      { keyword: "STMS", meaning: "Transport Management System for queue and import management." },
      { keyword: "SE10 / SE09", meaning: "Display and release transport requests." },
      { keyword: "WS (Workflow template)", meaning: "Active workflow object; workbench transportable." },
      { keyword: "TS (Standard task)", meaning: "Task object; workbench transportable." },
      { keyword: "Post-import steps", meaning: "Activation, linkage active, smoke test in target system." },
      { keyword: "BRF+ transport", meaning: "Application-level transport via FDT_HELPERS or BRFPLUS." }
    ],
    mistakes: [
      { mistake: "Transporting workflow without releasing dependent customising.", whyWrong: "Target system has workflow definition but missing agent or event config; runtime fails.", correctApproach: "Coordinate workbench and customising transports; release both together with explicit sequence." },
      { mistake: "Assuming activation status transfers via transport.", whyWrong: "Some target systems may need re-activation after import for various reasons.", correctApproach: "Always verify activation in target system post-import and run smoke tests." },
      { mistake: "Editing transports in production to fix issues.", whyWrong: "Breaks traceability; violates change management policies.", correctApproach: "Generate new corrective transport from DEV through the standard path." }
    ],
    qrn: "What: Forms and Workflow transport requires sequencing workbench (forms, workflows) with customising (NACE, PFAC) requests plus post-import verification.\n\nUsed for:\n- Promoting form and workflow changes through DEV/QAS/PROD\n- Coordinated config and code releases\n- Production cutover discipline\n\nKey syntax / tables / Tcodes:\n- STMS, SE10 / SE09\n- WS / TS workflow objects, NACE config\n- Post-import: activate, linkage active, smoke test\n\nInterview keyword: Coordinate workbench and customising transports."
  }
};
