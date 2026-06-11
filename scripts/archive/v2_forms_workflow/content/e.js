module.exports = {
  'forms-workflow-016': {
    scriptH: "Sir, technical design document Forms aur Workflow ke liye basic blueprint hota hai jo development se pehle banta hai. Isme requirement summary, in-scope out-of-scope, form ka layout sketch ya sample, driver program structure, data sources tables ya CDS views, function module signatures, workflow steps with agent assignment, error handling, transport plan aur testing approach include hote hain. Practically, mere project mein PO release workflow ke TS mein flow diagram, agent rule, escalation matrix, aur NACE config sab tha. Iska benefit yeh hai ki review ke baad coding clean aur predictable hoti hai, aur future maintenance team ke liye reference document banta hai.",
    scriptE: "A technical design document for Forms and Workflow is the blueprint produced before development. It typically covers requirement summary, in-scope and out-of-scope items, sample form layout, driver program structure, data sources (tables, CDS views), function module signatures, workflow steps with agent assignment and bindings, error handling strategy, transport plan, and the testing approach. In my project the PO release workflow TS included a flow diagram, PFAC agent rule, escalation matrix, and the NACE configuration. The business value is a clean, predictable build, easier reviews, and a permanent reference for future maintenance and audit.",
    words: [
      { keyword: "TS document", meaning: "Technical Specification produced by developer from the Functional Spec." },
      { keyword: "Form interface", meaning: "Documented parameters (importing structures, tables) the form expects." },
      { keyword: "Driver program structure", meaning: "Selection screen, data fetch logic, FM call sequence, exception handling." },
      { keyword: "Workflow flow diagram", meaning: "Visual representation of steps, branches, and agents." },
      { keyword: "Agent determination plan", meaning: "Documents which step uses which PFAC rule, position, or role." },
      { keyword: "Transport plan", meaning: "Sequence of transport requests and dependencies (workbench, customising, BRF+)." },
      { keyword: "Sample layout", meaning: "Mock-up of form output shared with business for sign-off before build." }
    ],
    mistakes: [
      { mistake: "Skipping the TS and going straight to coding.", whyWrong: "Rework explodes when business sees the output; integration gaps and missed requirements appear late.", correctApproach: "Produce TS, get functional sign-off, then build; rework cost is far lower." },
      { mistake: "Treating TS as documentation for developer only.", whyWrong: "Functional consultants cannot validate logic, and audit cannot trace decisions later.", correctApproach: "Write TS for the broader audience with diagrams and clear language alongside technical detail." },
      { mistake: "Not version-controlling TS updates after changes.", whyWrong: "Production code diverges from documentation; future maintenance is blind.", correctApproach: "Maintain TS versions in document management aligned with transport request history." }
    ],
    qrn: "What: TS for Forms and Workflow is the blueprint document covering layout, driver, workflow steps, agents, and transports.\n\nUsed for:\n- Pre-build review and sign-off\n- Audit trail and future maintenance reference\n- Onboarding new team members\n\nKey syntax / tables / Tcodes:\n- Documented FM interface and form name\n- PFAC rule and agent matrix\n- Transport sequence with dependencies\n\nInterview keyword: Blueprint before build; sign-off before code."
  },

  'forms-workflow-017': {
    scriptH: "Sir, Forms aur Workflow ka effort estimation mein main complexity scope, integration touchpoints, aur testing depth dekhta hoon. Simple SmartForm 3-5 din le sakta hai including driver aur unit testing, complex multi-page form with multiple tables 8-10 din. Workflow medium complexity 8-12 din leta hai design, build, agent setup, end-to-end testing. Hamesha 25-30 percent buffer add karta hoon for testing iterations, business feedback, aur transport issues. Practically, mere ek project mein invoice form estimate 6 days tha aur actual 8 days laga because of multi-currency requirement late aayi. Iska benefit yeh hai ki realistic estimate se commitment honest rehta hai aur scope creep manage hoti hai.",
    scriptE: "Forms and Workflow effort estimation requires looking at scope, integration touchpoints, and testing depth. A simple SmartForm with driver and unit tests takes about 3 to 5 days, while a complex multi-page form with several tables and multilingual support takes 8 to 10 days. A medium-complexity workflow including design, build, agent rule setup, and end-to-end testing typically takes 8 to 12 days. I always add 25 to 30 percent buffer for testing iterations, business feedback, and transport hiccups. In one project an invoice form estimated at 6 days ran to 8 because of a late multi-currency requirement. Honest, realistic estimates protect commitments and surface scope creep early.",
    words: [
      { keyword: "Effort estimate", meaning: "Days or hours required to design, build, test, and deploy a change." },
      { keyword: "Buffer", meaning: "Additional time added for testing iterations, rework, and unknowns." },
      { keyword: "Scope creep", meaning: "Uncontrolled growth of requirements after the estimate is given." },
      { keyword: "Complexity drivers", meaning: "Multi-page, multi-language, multi-currency, archiving, integration." },
      { keyword: "Re-estimation", meaning: "Updating the estimate when scope or requirements change mid-project." },
      { keyword: "Unit test", meaning: "Developer-level test of FM, driver, or workflow step in isolation." },
      { keyword: "Integration test", meaning: "End-to-end test of the form or workflow across upstream and downstream systems." }
    ],
    mistakes: [
      { mistake: "Estimating only the build effort.", whyWrong: "Testing, documentation, deployment, and stabilisation can equal or exceed build time.", correctApproach: "Use a build-test-deploy-stabilise framework, allocate effort to each phase." },
      { mistake: "Giving no buffer to look efficient.", whyWrong: "Inevitable rework and integration delays cause missed deadlines and credibility loss.", correctApproach: "Add 25 to 30 percent buffer transparently; explain the reason to stakeholders." },
      { mistake: "Refusing to re-estimate when scope changes.", whyWrong: "Original commitment becomes impossible; team burns out and quality drops.", correctApproach: "Re-estimate openly when scope materially changes; document the change request." }
    ],
    qrn: "What: Forms and Workflow estimation sums design, build, testing, deployment effort plus a realistic buffer.\n\nUsed for:\n- Project planning and commitment\n- Resource allocation\n- Negotiating scope vs schedule\n\nKey syntax / tables / Tcodes:\n- Typical ranges: simple form 3-5 days, complex form 8-10, workflow 8-12\n- 25-30 percent buffer is standard\n- Re-estimate on scope change\n\nInterview keyword: Honest estimates protect commitments."
  },

  'forms-workflow-018': {
    scriptH: "Sir, Forms aur Workflow ke top transactions mein SMARTFORMS form design, SFP Adobe Form, SE71 SAPscript, NACE output config, SWDD workflow builder, SBWP user inbox, SWE2 event linkage, SWI1 work item monitor, SWIA admin action, SWUE event test, SP01 spool, SOST email, SM37 background jobs, SOAMANAGER web service config, aur SE93 transaction creation. Practically, mere daily kaam mein SMARTFORMS, SWDD, SWI1, SP01 frequent the. Iska benefit yeh hai ki har situation ke liye correct Tcode ready hone se troubleshooting fast hoti hai aur interview mein bhi confidence se transaction names recall ho jaate hain.",
    scriptE: "The Forms and Workflow toolbox revolves around a core set of transactions. For forms: SMARTFORMS, SFP for Adobe, SE71 for SAPscript, SE78 for graphics, SE72 for styles, NACE for output determination. For workflow: SWDD for design, SBWP for the user inbox, SWE2 for event linkage, SWI1 and SWI5 for work item monitoring, SWIA for admin actions, SWUE for test events, SWEL for event trace. For execution and operations: SP01 for spool, SOST for email, SM37 for background jobs, SOAMANAGER for web service channels, SE93 for transaction creation. Mastery of these makes incident response fast and confident.",
    words: [
      { keyword: "SMARTFORMS", meaning: "SmartForm design transaction." },
      { keyword: "SFP", meaning: "Adobe Forms design transaction." },
      { keyword: "SE71", meaning: "SAPscript form maintenance." },
      { keyword: "SE72", meaning: "SAPscript style maintenance (paragraph and character formats)." },
      { keyword: "SE78", meaning: "Upload and manage graphics for use in forms." },
      { keyword: "NACE", meaning: "Output determination configuration." },
      { keyword: "SWDD", meaning: "Workflow Builder." },
      { keyword: "SBWP", meaning: "Business Workplace inbox." },
      { keyword: "SWE2", meaning: "Event linkage maintenance." },
      { keyword: "SWI1 / SWI5", meaning: "Work item monitoring and workload analysis." },
      { keyword: "SP01 / SOST", meaning: "Spool and email outbound monitoring." }
    ],
    mistakes: [
      { mistake: "Relying on one or two transactions and not knowing the rest.", whyWrong: "When the issue is outside that subset, troubleshooting stalls.", correctApproach: "Build muscle memory across the core set: design, monitor, admin, troubleshoot." },
      { mistake: "Using SWIA in production for routine work item completion.", whyWrong: "Bypasses normal authorisation flow and audit; introduces operational risk.", correctApproach: "Use SWIA only for genuine admin needs (forwarding, restart) after RCA; otherwise let agents act in SBWP." },
      { mistake: "Confusing SP01 and SOST scope.", whyWrong: "Looking in the wrong place delays email vs print incident response.", correctApproach: "SP01 for spool / print, SOST for email outbound; check the right one for the channel." }
    ],
    qrn: "What: A practical Tcode toolbox covers form design, workflow design, monitoring, and operations for Forms and Workflow.\n\nUsed for:\n- Daily build and maintenance\n- Incident triage\n- Interview Tcode recall\n\nKey syntax / tables / Tcodes:\n- Design: SMARTFORMS, SFP, SE71, SWDD\n- Monitor: SWI1, SWI5, SP01, SOST\n- Admin: SWIA, SWPC, SE93\n\nInterview keyword: Right Tcode for the right job."
  },

  'forms-workflow-019': {
    scriptH: "Sir, common interview questions mein output type vs message type, NACE config vs condition records, agent types, stuck workflow restart, SmartForm vs Adobe selection, deadline monitoring, performance issues, aur testing approach jaise topics aate hain. Hamesha real example ke saath answer dena chahiye. Practically, mere project mein PO release workflow ka deadline monitoring set kiya tha 24 hour ke baad escalate hoke senior manager ko jaata tha. Iska benefit yeh hai ki structured prepared answers se confident interview perform hota hai aur senior level confidence dikhti hai.",
    scriptE: "Common Forms and Workflow interview questions cluster around: output type vs message type, NACE config vs condition records, types of agents, restarting stuck workflows, SmartForm vs Adobe selection criteria, deadline monitoring, performance tuning, and testing strategy. Always answer with a structured definition followed by a real project example. In my project the PO release workflow had deadline monitoring at 24 hours; on breach it escalated to the senior manager automatically. The business value of preparing this catalogue is a confident, structured interview performance that signals senior-level depth and operational experience.",
    words: [
      { keyword: "Output type", meaning: "Configuration object that defines when and how a document produces output (e.g., NEU, RD00)." },
      { keyword: "Message type", meaning: "Older term sometimes used interchangeably with output type in NACE." },
      { keyword: "Condition record (VV21)", meaning: "Master data that triggers output for specific keys (sales org, customer, etc.)." },
      { keyword: "Workflow agent", meaning: "User, position, role, or PFAC rule resolved at runtime to receive a work item." },
      { keyword: "Deadline monitoring", meaning: "Workflow feature for requested start, latest start, requested end, latest end." },
      { keyword: "Escalation step", meaning: "Workflow path executed when a deadline is breached." },
      { keyword: "Asynchronous workflow", meaning: "Workflow that decouples trigger from execution for better performance." }
    ],
    mistakes: [
      { mistake: "Confusing output type and condition record.", whyWrong: "Both are needed; one defines the rule, the other the master data trigger.", correctApproach: "Explain: output type is the config in NACE, condition record (VV21) is the data trigger by key." },
      { mistake: "Saying deadline monitoring is automatic.", whyWrong: "It requires explicit configuration on each step that needs monitoring.", correctApproach: "Configure requested and latest start/end on workflow steps; design escalation paths." },
      { mistake: "Choosing Adobe Forms for all new development without analysis.", whyWrong: "ADS dependency adds latency and cost; SmartForms still suit high-volume batch printing.", correctApproach: "Use SmartForms for batch print, Adobe for interactive PDF." }
    ],
    qrn: "What: Common interview questions cover output config, agent setup, restart, tool selection, deadlines, and testing.\n\nUsed for:\n- Interview preparation\n- Onboarding and knowledge transfer\n- Catalogue of recurring design decisions\n\nKey syntax / tables / Tcodes:\n- NACE output type and VV21 condition record\n- PFAC agent rule, deadline config on step\n- SmartForms vs Adobe selection criteria\n\nInterview keyword: Structured definition plus real example."
  }
};
