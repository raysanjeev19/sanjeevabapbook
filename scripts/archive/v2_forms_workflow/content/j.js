module.exports = {
  'forms-workflow-036': {
    scriptH: "Sir, SmartForm se PDF generate karne ke do steps hain. Pehle control_parameters mein getotf = abap_true set karte hain form OTF data return karta hai job_output_info-otfdata mein. Phir CONVERT_OTF standard function module call karte hain format PDF ke saath jo OTF ko binary PDF xstring mein convert karta hai. PDF data fir GUI_DOWNLOAD se desktop pe save kar sakte hain ya SO_NEW_DOCUMENT_ATT_SEND_API1 se email attachment ban sakti hai. Practically, mere project mein invoice form ka PDF auto generate hota tha aur customer ko email pe attached jaata tha. Iska benefit yeh hai ki paperless workflow enable hota hai aur archival electronic format mein hoti hai.",
    scriptE: "Generating PDF from a SmartForm is a two-step process. First, set getotf = abap_true in control_parameters so the form returns OTF data in job_output_info-otfdata. Second, call the standard CONVERT_OTF function module with format = 'PDF' to convert OTF into a binary PDF xstring. The resulting PDF can be downloaded via GUI_DOWNLOAD, archived via ArchiveLink, or sent as an email attachment via SO_NEW_DOCUMENT_ATT_SEND_API1. In my project the invoice PDF was generated automatically and emailed to the customer. The business value is paperless workflow, faster delivery, and electronic archival.",
    words: [
      { keyword: "getotf", meaning: "Control parameter that requests OTF data instead of immediate print." },
      { keyword: "OTF", meaning: "Output Text Format intermediate representation used by SAP printing." },
      { keyword: "CONVERT_OTF", meaning: "Standard FM converting OTF to PDF or other formats." },
      { keyword: "job_output_info-otfdata", meaning: "Table returned by SmartForm containing OTF data." },
      { keyword: "GUI_DOWNLOAD", meaning: "FM to save binary data to user's desktop." },
      { keyword: "SO_NEW_DOCUMENT_ATT_SEND_API1", meaning: "Standard FM to send emails with attachments." },
      { keyword: "ArchiveLink", meaning: "SAP framework to archive generated PDFs against business objects." },
      { keyword: "tline", meaning: "Internal table type used as buffer when downloading PDF lines." }
    ],
    mistakes: [
      { mistake: "Forgetting to set getotf = abap_true.", whyWrong: "Form prints directly to spool; job_output_info-otfdata is empty, no PDF source available.", correctApproach: "Always set getotf = abap_true when PDF output is required." },
      { mistake: "Emailing OTF data directly without PDF conversion.", whyWrong: "Recipient sees raw text and binary characters, unreadable.", correctApproach: "Always convert OTF to PDF via CONVERT_OTF before attaching to email or downloading." },
      { mistake: "Hardcoding file path in GUI_DOWNLOAD without user selection.", whyWrong: "Fails on different user machines; permission errors common.", correctApproach: "Use F4 file save dialog (CL_GUI_FRONTEND_SERVICES=>FILE_SAVE_DIALOG) to obtain a valid path." }
    ],
    qrn: "What: PDF generation from SmartForms is a two-step process getotf in control parameters plus CONVERT_OTF.\n\nUsed for:\n- Email invoice and PO PDFs to customers and vendors\n- Archive PDFs against business objects via ArchiveLink\n- Desktop downloads from user-facing programs\n\nKey syntax / tables / Tcodes:\n- getotf = abap_true, job_output_info-otfdata\n- CONVERT_OTF (format = 'PDF') -> binary xstring\n- SO_NEW_DOCUMENT_ATT_SEND_API1 for email\n\nInterview keyword: getotf then CONVERT_OTF."
  },

  'forms-workflow-037': {
    scriptH: "Sir, mere project mein invoice SmartForm driver mein main tables VBRK header, VBRP items, KNA1 customer, T001 company code, KONV pricing conditions, MAKT material descriptions the. NACE mein V3 application ke RD00 output type pe form aur driver assign the. Items table internal table mein collect kiya aur Table node ke through Main Window mein print kiya. Company logo SE78 mein upload kiya tha aur Graphic node se referenced. Customer address ADDRESS_INTO_PRINTFORM standard FM se formatted hua tha country-specific layout. Tax breakup KONV se separate types extract karke Final Window mein totals ke saath rendered hue. Testing aur transport STMS se DEV-QAS-PROD route follow kiya. Iska benefit yeh hai ki sab pieces integrate ho ke complete invoice solution bana.",
    scriptE: "In my invoice SmartForm project the driver read VBRK (billing header), VBRP (items), KNA1 (customer), T001 (company code), KONV (pricing conditions), and MAKT (material descriptions). NACE assigned the form and driver to output type RD00 under application V3 (Billing). Item rows were collected into an internal table and rendered through a Table node in the Main Window. The company logo was uploaded in SE78 and referenced via a Graphic node. Customer address was formatted using the standard ADDRESS_INTO_PRINTFORM FM for country-specific layout. Tax breakup was extracted from KONV by condition type and rendered with totals in the Final Window. STMS transported across DEV, QAS, PROD.",
    words: [
      { keyword: "VBRK", meaning: "Billing document header table." },
      { keyword: "VBRP", meaning: "Billing document item table." },
      { keyword: "KNA1", meaning: "General customer master." },
      { keyword: "T001", meaning: "Company code table; carries address and currency." },
      { keyword: "KONV", meaning: "Pricing conditions table; tax breakup source." },
      { keyword: "MAKT", meaning: "Material descriptions per language." },
      { keyword: "NAST", meaning: "Output records linking documents to messages." },
      { keyword: "RD00", meaning: "Standard SD output type for invoice printing." },
      { keyword: "ADDRESS_INTO_PRINTFORM", meaning: "Standard FM that formats addresses per country rules." },
      { keyword: "SE78 Graphic node", meaning: "Renders uploaded logo in the form." }
    ],
    mistakes: [
      { mistake: "Reading VBRK and VBRP separately when a JOIN suffices.", whyWrong: "Extra round-trips slow batch printing; high-volume jobs suffer.", correctApproach: "Use SELECT with JOIN to fetch header and items in fewer round-trips." },
      { mistake: "Hardcoding tax condition types in the driver.", whyWrong: "Changes in pricing procedure break the driver.", correctApproach: "Configure tax condition types in a Z-table or use pricing procedure metadata." },
      { mistake: "Loading the logo as inline graphic per call.", whyWrong: "Repeated overhead in batch print.", correctApproach: "Upload once in SE78; reference via Graphic node; SAP caches output efficiently." }
    ],
    qrn: "What: An invoice SmartForm driver integrates billing tables, NACE config, item rendering, address formatting, and tax breakup.\n\nUsed for:\n- High-volume invoice printing\n- Email and ArchiveLink archival\n- Multi-country tax presentation\n\nKey syntax / tables / Tcodes:\n- VBRK / VBRP / KNA1 / T001 / KONV / MAKT\n- NACE: application V3, output type RD00\n- ADDRESS_INTO_PRINTFORM for address formatting\n\nInterview keyword: Integration of data, config, layout, and tax."
  },

  'forms-workflow-038': {
    scriptH: "Sir, production printing incident mein mera first step SP01 check karna hai spool requests dekhne ke liye konsa status hai green processed, yellow waiting, ya red error. Blank pages ka issue usually data fetch fail ya wrong driver from NACE. Alignment issues mostly font, paragraph format, ya device type se. Stuck workflow ke liye SWI1 aur SWI5 ki diagnosis SWPC se continue. SM37 background job log se errors trace karte hain. Practically, mere project mein ek critical month-end incident mein SP01 mein 200 spool requests red the SAP printer driver issue tha, basis team se quick fix lekar reprocess kiya. Iska benefit yeh hai ki structured incident response se MTTR minimise hota hai.",
    scriptE: "For production printing incidents, my first step is to check SP01 for spool requests green (processed), yellow (waiting), or red (error). Blank pages usually indicate failed data fetch or wrong driver in NACE. Alignment issues come from fonts, paragraph formats, or device types. Stuck workflows are diagnosed via SWI1 and SWI5, then continued via SWPC. SM37 reveals background job failures. In one month-end incident I found 200 spool requests in red due to a SAP printer driver issue; basis applied a quick fix and we reprocessed via RSNAST00. Structured incident response with proper Tcodes and emergency transport process minimises mean-time-to-recovery.",
    words: [
      { keyword: "SP01", meaning: "Spool overview; check status of generated print output." },
      { keyword: "SP02", meaning: "Current user spool requests." },
      { keyword: "SWPC", meaning: "Continue workflows in error after RCA." },
      { keyword: "SM37", meaning: "Background job overview; check job status and joblog." },
      { keyword: "SWIA", meaning: "Workflow admin transaction for individual work items." },
      { keyword: "RSNAST00", meaning: "Reprocess NAST records in batch after fix." },
      { keyword: "Emergency Transport", meaning: "Expedited STMS process for production fixes with proper governance." },
      { keyword: "MTTR", meaning: "Mean Time To Recovery; key incident KPI." }
    ],
    mistakes: [
      { mistake: "Direct table updates in production to clear stuck records.", whyWrong: "Bypasses audit, can corrupt downstream processes, fails compliance.", correctApproach: "Use standard reprocess Tcodes (VL71, VF31), SWPC, or RSNAST00 with proper authorisation." },
      { mistake: "Fixing the form directly in production for speed.", whyWrong: "Breaks DEV-QAS-PROD parity, no transport trail, compliance risk.", correctApproach: "Use emergency transport process: fix in DEV, fast-track QAS, transport with governance approval." },
      { mistake: "Communicating only after issue is resolved.", whyWrong: "Stakeholders lose confidence; escalations explode in parallel.", correctApproach: "Provide regular status updates during the incident, even if no new progress." }
    ],
    qrn: "What: Production Forms incident response is a structured approach using SP01, SM37, SWPC, SWIA, RSNAST00, and emergency transports.\n\nUsed for:\n- Blank pages, alignment issues, stuck workflows\n- Bulk reprocessing after a fix\n- Critical month-end print failures\n\nKey syntax / tables / Tcodes:\n- SP01 spool status, SM37 job log\n- SWPC continue, SWIA admin action\n- RSNAST00 batch reprocess\n\nInterview keyword: Structured response minimises MTTR."
  },

  'forms-workflow-039': {
    scriptH: "Sir, mere project mein ek production ticket tha invoice ke tax amount wrong aa rahe the kuch line items pe. Investigation mein pata chala VBAP-MWST sirf single tax type hold karta hai jabki actual requirement multi-tax CGST, SGST, IGST breakup ki thi. Solution mein KONV table se condition types extract karke separate amounts calculate kiye aur form mein dedicated tax section banaya. Fix ko QAS mein replicate kiya, business sign-off liya, regression test kiya, fir emergency transport se PROD mein push kiya. Practically, mere ticket close karte time root cause, fix description, test evidence, aur lessons learnt sab document kiya tha. Iska benefit yeh hai ki same issue recur nahi karta aur knowledge base build hoti hai team ke liye.",
    scriptE: "In one production ticket the invoice tax amounts were wrong for certain line items. Investigation showed VBAP-MWST holds only a single tax type while the requirement needed multi-tax (CGST, SGST, IGST) breakup. The fix extracted condition types from KONV and calculated each tax separately, rendering a dedicated tax section in the form. I replicated the scenario in QAS, obtained business sign-off, ran regression tests, and pushed via emergency transport with governance approval. On ticket closure I documented root cause, fix description, test evidence, and lessons learnt. The business value is no recurrence, audit trail, and a growing team knowledge base.",
    words: [
      { keyword: "VBAP-MWST", meaning: "Sales item tax amount; single value, insufficient for multi-tax." },
      { keyword: "KONV", meaning: "Pricing conditions table; holds all condition records per document." },
      { keyword: "Condition Type", meaning: "Pricing element code (MWST, CGST, SGST, IGST) used in KONV." },
      { keyword: "Pricing Procedure", meaning: "Sequence of condition types applied to a document; T-code V/08." },
      { keyword: "KOMV", meaning: "Pricing structure used during pricing call." },
      { keyword: "Emergency Transport", meaning: "Expedited STMS process for production fixes with approval." },
      { keyword: "Root Cause Analysis", meaning: "Documented cause and fix included in ticket closure." }
    ],
    mistakes: [
      { mistake: "Treating VBAP-MWST as the canonical tax breakup.", whyWrong: "Multi-tax regimes (GST split, EU VAT) require separation by condition type.", correctApproach: "Read KONV by condition type for accurate breakup." },
      { mistake: "Closing ticket without root cause analysis.", whyWrong: "Same defect recurs; team loses learning opportunity.", correctApproach: "Document root cause, fix, test evidence, and prevention in the ticket closure." },
      { mistake: "Skipping QAS regression after a production fix.", whyWrong: "Fix may break adjacent flows; surprise defects appear later.", correctApproach: "Run targeted regression in QAS before emergency transport to PROD." }
    ],
    qrn: "What: Tax breakup defects in invoice forms often need KONV-based condition-type extraction instead of relying on VBAP-MWST.\n\nUsed for:\n- Multi-tax regimes (CGST, SGST, IGST, VAT)\n- Compliant invoice presentation\n- Audit trail of incident resolution\n\nKey syntax / tables / Tcodes:\n- KONV (conditions), KOMV (pricing struct)\n- V/08 pricing procedure config\n- Emergency transport process with documentation\n\nInterview keyword: KONV by condition type, not VBAP-MWST alone."
  }
};
