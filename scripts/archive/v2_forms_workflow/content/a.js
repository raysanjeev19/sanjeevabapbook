module.exports = {
  'forms-workflow-001': {
    scriptH: "Sir, SmartForms aur Adobe Forms dono SAP ke print document tools hain jo invoice, delivery note, PO jaisi documents banate hain. SmartForms SAP ka native tool hai jo SMARTFORMS transaction mein design hota hai aur SSF_FUNCTION_MODULE_NAME se uska generated FM call hota hai. Adobe Forms SFP transaction mein bante hain, layout Adobe LiveCycle Designer mein design hota hai, aur FP_FUNCTION_MODULE_NAME se call hota hai FP_JOB_OPEN aur FP_JOB_CLOSE ke beech. Practically, mere project mein logistics module ke liye SmartForms use kiya tha invoice batch printing ke liye, aur HR self-service leave forms ke liye Adobe Forms use hue the kyunki fillable PDF chahiye thi. Iska benefit yeh hai ki batch printing ke liye SmartForms reliable hai aur interactive PDF ke liye Adobe Forms best hai.",
    scriptE: "SmartForms and Adobe Forms are SAP's two main form rendering tools. SmartForms is designed in the SMARTFORMS transaction and called via SSF_FUNCTION_MODULE_NAME from the driver program, making it ideal for static batch printing like invoices and POs. Adobe Forms are designed in SFP using Adobe LiveCycle Designer, called via FP_FUNCTION_MODULE_NAME wrapped in FP_JOB_OPEN and FP_JOB_CLOSE, and support interactive PDF for user input. In my project, SmartForms handled high-volume invoice spool jobs while Adobe Forms supported employee leave applications. The business value is selecting the right tool per use case batch reliability versus interactive PDF.",
    words: [
      { keyword: "SSF_FUNCTION_MODULE_NAME", meaning: "Standard FM that returns the generated function module name for a SmartForm." },
      { keyword: "FP_FUNCTION_MODULE_NAME", meaning: "Standard FM that returns the generated function module name for an Adobe Form." },
      { keyword: "FP_JOB_OPEN", meaning: "Opens the Adobe Forms output job before invoking the form FM." },
      { keyword: "FP_JOB_CLOSE", meaning: "Closes the Adobe Forms output job and releases output to spool." },
      { keyword: "SSFCTRLOP", meaning: "Control parameters structure for SmartForms (preview, no_dialog, getotf, langu)." },
      { keyword: "SSFCOMPOP", meaning: "Output options structure for SmartForms (printer, copies, immediate print)." },
      { keyword: "SFPOUTPUTPARAMS", meaning: "Output parameters structure used with FP_JOB_OPEN for Adobe Forms." },
      { keyword: "SFPDOCPARAMS", meaning: "Document parameters (language, country) passed to Adobe Form FM." },
      { keyword: "SMARTFORMS", meaning: "Transaction code to create, edit, and activate SmartForms." },
      { keyword: "SFP", meaning: "Transaction code for Adobe Form interface and layout maintenance." }
    ],
    mistakes: [
      { mistake: "Hardcoding the generated SmartForm FM name like /1BCDWB/SF00000123.", whyWrong: "The generated FM name differs between DEV, QAS, and PROD systems because SAP regenerates it per activation.", correctApproach: "Always retrieve the FM name at runtime using SSF_FUNCTION_MODULE_NAME with the logical form name." },
      { mistake: "Calling an Adobe Form FM without FP_JOB_OPEN and FP_JOB_CLOSE.", whyWrong: "Adobe Forms require an output job context; without it the FM raises a 'no open job' error or returns no output.", correctApproach: "Wrap every Adobe form FM call between FP_JOB_OPEN and FP_JOB_CLOSE." },
      { mistake: "Setting preview = abap_true in a background batch job.", whyWrong: "Background jobs have no GUI session, so the form waits for a screen that never appears and the job hangs.", correctApproach: "Check sy-batch; in background set no_dialog = abap_true and preview = abap_false, output to spool." },
      { mistake: "Choosing Adobe Forms for simple high-volume batch printing.", whyWrong: "Adobe rendering through ADS adds latency and operational complexity unnecessary for non-interactive print.", correctApproach: "Use SmartForms for batch spool printing and reserve Adobe Forms for interactive PDF use cases." }
    ],
    qrn: "What: SmartForms and Adobe Forms are SAP's two main form rendering tools for printable and interactive documents.\n\nUsed for:\n- SmartForms: invoices, POs, delivery notes (batch print)\n- Adobe Forms: HR leave forms, employee self-service (interactive PDF)\n- Both: archive output via SAP ArchiveLink\n\nKey syntax / tables / Tcodes:\n- SMARTFORMS (design), SFP (Adobe), NACE (output assignment)\n- SSF_FUNCTION_MODULE_NAME, FP_FUNCTION_MODULE_NAME\n- FP_JOB_OPEN / FP_JOB_CLOSE wrap Adobe form calls\n\nInterview keyword: Right tool per use case batch vs interactive PDF."
  },

  'forms-workflow-002': {
    scriptH: "Sir, SmartForm debug karne ka tarika thoda alag hai normal ABAP se. Form ke andar directly breakpoint nahi lag sakta, isliye hum ek ABAP code node banake BREAK-POINT ya BREAK username daalte hain. Driver program mein bhi CALL FUNCTION ke pehle breakpoint daalke check karte hain ki data sahi pass ho raha hai ya nahi. Practically, mere project mein invoice amounts galat aa rahi thi maine code node mein BREAK daala, debugger khula form ke andar, currency conversion logic missing tha woh fix kiya. NACE configuration aur form activation status bhi pehle check karna chahiye. Iska benefit yeh hai ki systematic approach se data issue aur form logic issue dono isolate ho jaate hain.",
    scriptE: "Debugging SmartForms requires a two-level approach. First, I set a breakpoint in the driver program before CALL FUNCTION to verify that the correct data structures and tables are being passed. Second, for form-internal logic, I add an ABAP code node inside the SmartForm with BREAK username, activate, and run the driver the debugger then opens inside the form context where I can inspect global variables and parameters. For output not appearing at all, I check NACE first to verify the right form and driver are assigned, and confirm the form is active in SMARTFORMS. SSFTRACE provides node-level execution trace when conditions misbehave.",
    words: [
      { keyword: "SSF_FUNCTION_MODULE_NAME", meaning: "Returns the generated FM name; subrc 2 means the form is inactive." },
      { keyword: "BREAK-POINT", meaning: "Static ABAP statement that opens the debugger for any user when executed." },
      { keyword: "BREAK username", meaning: "Opens the debugger only for the specified SAP user; safer in shared systems." },
      { keyword: "SSFTRACE", meaning: "Transaction to enable and view SmartForms node execution trace." },
      { keyword: "SMARTFORMS", meaning: "Form design transaction; status bar shows Active or Inactive state." },
      { keyword: "NACE", meaning: "Output determination transaction where form and driver program are assigned to an output type." },
      { keyword: "SSFCTRLOP", meaning: "Control parameters; trace = abap_true enables execution trace from the driver." },
      { keyword: "VBAK / VBAP", meaning: "Sales header / item tables commonly used in invoice driver programs." },
      { keyword: "SE37", meaning: "Function Builder used to test the generated SmartForm FM with sample data." }
    ],
    mistakes: [
      { mistake: "Leaving BREAK-POINT statements inside a SmartForm before transport.", whyWrong: "Production users hit the debugger and the form appears hung; it is also a security risk.", correctApproach: "Remove or comment out all BREAK nodes before saving and transporting the form." },
      { mistake: "Forgetting to activate the SmartForm after modifying it.", whyWrong: "The driver still calls the previously generated FM, so code changes never take effect.", correctApproach: "Always activate with Ctrl+F3 after every change and verify activation in the target system after transport." },
      { mistake: "Debugging only inside the form when fields show empty values.", whyWrong: "Often the data issue is upstream in the driver where wrong values were fetched or the parameter name mismatched.", correctApproach: "First debug the driver (data fetched and parameter names), then debug inside the form if data is correct." },
      { mistake: "Skipping NACE check and going straight to form code debugging.", whyWrong: "If the wrong form is configured in the output type, no amount of form debugging will help.", correctApproach: "Always verify NACE Processing Routines (form name, driver program) before deep code debugging." }
    ],
    qrn: "What: SmartForm debugging combines driver-level breakpoints, in-form BREAK code nodes, NACE checks, and SSFTRACE.\n\nUsed for:\n- Diagnosing wrong or empty field values\n- Investigating conditional text appearing incorrectly\n- Troubleshooting page break and layout issues\n\nKey syntax / tables / Tcodes:\n- BREAK-POINT / BREAK username inside ABAP code node\n- SMARTFORMS (Activate), NACE (output config), SSFTRACE (node trace)\n- SE37 for direct FM testing of the generated function module\n\nInterview keyword: Two-level debugging driver first, then in-form."
  },

  'forms-workflow-003': {
    scriptH: "Sir, driver program ek ABAP report hai jo form ko data deta hai aur output control karta hai. Form akela nahi chal sakta, koi program use call karna padta hai. SmartForm ke liye driver pehle SSF_FUNCTION_MODULE_NAME se generated FM ka naam leta hai, phir data fetch karta hai database se, control_parameters aur output_options set karta hai, aur CALL FUNCTION se form trigger karta hai. Practically, mere project mein delivery note driver banaya tha jo LIKP-LIPS-MAKT join karke data leta tha, selection screen pe delivery range aur printer naam leta tha, aur background ya foreground mode handle karta tha. Iska benefit yeh hai ki same form different scenarios mein flexible reuse ho jaata hai driver ki logic se.",
    scriptE: "A driver program is the ABAP report that orchestrates form output. It owns the selection screen, database reads, data preparation, control settings, and the actual CALL FUNCTION to the generated form FM. For SmartForms the sequence is: call SSF_FUNCTION_MODULE_NAME to get the FM name, fetch header and item data from tables like VBAK/VBAP, set control_parameters (preview, no_dialog, langu) and output_options (printer, copies), then CALL FUNCTION with EXPORTING for structures, TABLES for internal tables, and proper EXCEPTIONS. For Adobe Forms the equivalents are FP_FUNCTION_MODULE_NAME with FP_JOB_OPEN/CLOSE bracket calls. This separation keeps the form purely about layout while business logic stays in ABAP.",
    words: [
      { keyword: "SSF_FUNCTION_MODULE_NAME", meaning: "Retrieves dynamic FM name for a SmartForm before CALL FUNCTION." },
      { keyword: "SSFCTRLOP", meaning: "Control parameters: preview, no_dialog, getotf, langu, trace." },
      { keyword: "SSFCOMPOP", meaning: "Output options: tddest (printer), tdcopies, tdimmed, tdnewid." },
      { keyword: "SSFCRESCL", meaning: "Result structure returned by SmartForm; contains otfdata for PDF conversion." },
      { keyword: "SSF_OPEN", meaning: "Opens a single spool job for batch printing of multiple form calls." },
      { keyword: "SSF_CLOSE", meaning: "Closes the SSF_OPEN spool job after the loop ends." },
      { keyword: "FP_FUNCTION_MODULE_NAME", meaning: "Returns FM name for an Adobe Form." },
      { keyword: "FP_JOB_OPEN / FP_JOB_CLOSE", meaning: "Mandatory bracket calls around Adobe form FM invocation." },
      { keyword: "LIKP / LIPS", meaning: "Delivery header / item tables typically read in delivery note drivers." },
      { keyword: "AT SELECTION-SCREEN", meaning: "Event for validating user inputs before START-OF-SELECTION runs." }
    ],
    mistakes: [
      { mistake: "Passing an internal table inside EXPORTING parameters.", whyWrong: "EXPORTING is only for structures and scalars; internal tables must use the TABLES parameter section.", correctApproach: "Use EXPORTING for structures (is_header) and TABLES for internal tables (it_items)." },
      { mistake: "Calling SSF_OPEN / SSF_CLOSE inside the loop for each document.", whyWrong: "It creates one spool request per document, causing performance and management overhead.", correctApproach: "Call SSF_OPEN once before the loop and SSF_CLOSE once after for a single batched spool job." },
      { mistake: "Hardcoding the printer name (TDDEST) inside the driver.", whyWrong: "Printer names vary across plants and systems, making the program inflexible and breaking on transport.", correctApproach: "Take printer from selection screen (TYPE rspopname) or a Z-configuration table." },
      { mistake: "Treating user_canceled exception (sy-subrc = 4) as an error.", whyWrong: "When the user cancels the print dialog no failure occurred; logging it as error pollutes alerts.", correctApproach: "Handle sy-subrc = 4 separately as a normal user action, not as an error condition." }
    ],
    qrn: "What: The driver program is the ABAP report that fetches data, configures output, and calls the generated form FM.\n\nUsed for:\n- Selection screen and user input handling\n- Database reads (VBAK/VBAP, LIKP/LIPS, EKKO/EKPO)\n- Calling the SmartForm or Adobe Form FM with correct parameters\n\nKey syntax / tables / Tcodes:\n- SSF_FUNCTION_MODULE_NAME then CALL FUNCTION lv_fm_name\n- FP_JOB_OPEN then form FM then FP_JOB_CLOSE for Adobe\n- SSFCTRLOP / SSFCOMPOP control execution and output\n\nInterview keyword: Three steps get FM name, fetch data, call FM with handling."
  }
};
