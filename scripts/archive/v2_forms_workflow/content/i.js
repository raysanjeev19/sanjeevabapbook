module.exports = {
  'forms-workflow-032': {
    scriptH: "Sir, SmartForm window types ka summary yeh hai Main Window primary content, Secondary Window fixed static, Copy Window per-copy variant, Final Window last-page only. Each ka clear use case hai. Watermark COPY stamp typically Copy Window mein conditional text se add karte hain SFSY-COPYCOUNT > 1 hone pe. Page number 'X of Y' SFSY-PAGE aur SFSY-FORMPAGES se Secondary Window mein render hota hai. Practically, mere invoice mein Main mein items, Secondary mein logo, Copy mein 'Duplicate' watermark copy 2 ke liye, aur Final mein authorised signature tha. Iska benefit yeh hai ki each requirement ke liye precise window choice se layout reliable rehti hai.",
    scriptE: "SmartForm window types are Main (primary content), Secondary (fixed static), Copy (per-copy variant), and Final (last-page only). Each has a specific use case. A COPY watermark is typically rendered inside a Copy Window with a condition like SFSY-COPYCOUNT > 1. Page numbering 'Page X of Y' uses SFSY-PAGE and SFSY-FORMPAGES inside a Secondary Window. In my invoice the Main Window held items, a Secondary Window held the logo, a Copy Window showed 'Duplicate' watermark from copy 2 onwards, and the Final Window carried authorised signature. Choosing the right window for each requirement keeps layout reliable across pages and copies.",
    words: [
      { keyword: "Main Window", meaning: "Primary, overflow-capable content area." },
      { keyword: "Secondary Window", meaning: "Static per-page fixed-position window." },
      { keyword: "Copy Window", meaning: "Renders per-copy specific content using SFSY-COPYCOUNT." },
      { keyword: "Final Window", meaning: "Renders only on the last page." },
      { keyword: "SFSY-COPYCOUNT", meaning: "Current copy number (1 = original)." },
      { keyword: "SFSY-PAGE", meaning: "Current page number for page numbering displays." },
      { keyword: "SFSY-FORMPAGES", meaning: "Total page count for 'X of Y' displays." },
      { keyword: "TDCOPIES", meaning: "Number of copies set in driver output_options." }
    ],
    mistakes: [
      { mistake: "Putting page numbers in the Main Window.", whyWrong: "Page numbers must appear consistently on every page; Main Window content varies by overflow.", correctApproach: "Place page number text in a Secondary Window using SFSY-PAGE and SFSY-FORMPAGES." },
      { mistake: "Using a regular Secondary Window for watermark on duplicates.", whyWrong: "Cannot leverage SFSY-COPYCOUNT semantics cleanly; logic gets tangled.", correctApproach: "Use Copy Window with condition SFSY-COPYCOUNT > 1 for watermark on duplicates." },
      { mistake: "Mixing Copy Window with Final Window logic for the same content.", whyWrong: "Either misses last-page rendering or duplicates per copy.", correctApproach: "Decide whether the content is per-copy (Copy Window) or last-page (Final Window) and pick one." }
    ],
    qrn: "What: SmartForm window types collectively handle main content, static, per-copy, and last-page rendering scenarios.\n\nUsed for:\n- Multi-page document body (Main)\n- Page numbers, logos (Secondary)\n- Duplicate watermarks (Copy)\n- Totals and signatures (Final)\n\nKey syntax / tables / Tcodes:\n- SFSY-COPYCOUNT, SFSY-PAGE, SFSY-FORMPAGES\n- TDCOPIES in driver output_options\n- Conditions tab on text nodes\n\nInterview keyword: Right window for right scenario."
  },

  'forms-workflow-033': {
    scriptH: "Sir, SmartForm Table aur Template nodes alag purposes serve karte hain. Table node internal table iterate karta hai aur header, body, footer sub-areas provide karta hai dynamic row count ke liye. Template node fixed grid hai predefined rows and columns ke saath static layout ke liye useful jaise label-value pairs ya bordered sections. Column widths Table node ki line type ke through control hote hain. Subtotals body mein WHERE event ke saath ABAP code node se calculate hote hain. Empty table ke liye Conditions tab pe 'not initial' check karna chahiye warna empty area render hota hai. Practically, mere invoice mein items Table node mein the aur address block Template mein. Iska benefit yeh hai ki repeating data Table mein structured aur static layout Template mein precise rehta hai.",
    scriptE: "SmartForm Table and Template nodes serve different purposes. The Table node iterates an internal table and provides header, body, and footer sub-areas for dynamic row counts. The Template node is a fixed grid ideal for static layouts like label-value pairs. Column widths in Tables are controlled via line types. Subtotals use ABAP code nodes with WHERE events. For empty tables, the Conditions tab tests 'not initial' to avoid empty areas. In my invoice items used a Table node while the address block used a Template. This split keeps repeating data structured and static layout precise.",
    words: [
      { keyword: "Table node", meaning: "Iterates an internal table; supports header / body / footer." },
      { keyword: "Template node", meaning: "Fixed grid with predefined rows and columns." },
      { keyword: "Line Type", meaning: "Defines column widths for a Table or Template line." },
      { keyword: "Header section", meaning: "Repeats on each page when the table overflows." },
      { keyword: "Body section", meaning: "Looped rows from the internal table." },
      { keyword: "Footer section", meaning: "Renders at end of table; used for subtotals." },
      { keyword: "Calculations tab", meaning: "Define subtotal events on table for SUM aggregations." },
      { keyword: "WHERE event", meaning: "Break event during row processing for subtotal grouping." }
    ],
    mistakes: [
      { mistake: "Using Template node for repeating data.", whyWrong: "Template is fixed; cannot iterate, rows beyond defined count are not rendered.", correctApproach: "Use Table node for repeating data and Template only for static layouts." },
      { mistake: "Forgetting empty-table condition leading to blank tables in output.", whyWrong: "Empty header and footer areas render awkwardly without data.", correctApproach: "Set Conditions tab on Table node to render only when internal table is NOT INITIAL." },
      { mistake: "Manually summing inside ABAP code node when SmartForm Calculations tab is available.", whyWrong: "More complex, error-prone, harder to maintain.", correctApproach: "Use the Calculations tab with SUM and WHERE events for clean subtotal handling." }
    ],
    qrn: "What: Table node iterates dynamic data with header/body/footer; Template node is a fixed grid for static layouts.\n\nUsed for:\n- Invoice line items, delivery items (Table)\n- Address blocks, label-value pairs (Template)\n- Subtotals via Calculations tab\n\nKey syntax / tables / Tcodes:\n- Line types control column widths\n- Header section repeats on overflow\n- Calculations tab for subtotals\n\nInterview keyword: Table iterates, Template stays fixed."
  },

  'forms-workflow-034': {
    scriptH: "Sir, SE78 graphics maintenance ka Tcode hai jahan TIFF, BMP, JPG formats upload hote hain BCOL (color) ya BMON (monochrome) categories mein. Graphics SmartForm ya SAPscript mein Graphic node se reference hote hain. SE73 barcodes ke liye hai jahan system barcode definitions hote hain Code39, Code128, EAN-13 etc. Practically, mere project mein company logo SE78 mein BCOL mein upload kiya tha aur SmartForm Graphic node se reference kiya tha. Conditional logo company code condition se control hota hai. Iska benefit yeh hai ki centralised graphic repository milta hai jahan se multiple forms reuse karte hain.",
    scriptE: "SE78 is the transaction for managing graphics in SAP. It supports TIFF, BMP, and JPG formats under BCOL (color) or BMON (monochrome) categories. Graphics are referenced from SmartForms or SAPscript via Graphic nodes. SE73 is for barcode definitions like Code39, Code128, and EAN-13. In my project the company logo was uploaded in SE78 under BCOL and referenced from the SmartForm Graphic node. Conditional logos (different per company code) are controlled via the Conditions tab on the Graphic node. The business value is a centralised graphic repository that multiple forms reuse, simplifying brand updates.",
    words: [
      { keyword: "SE78", meaning: "Graphics maintenance transaction for SmartForms and SAPscript." },
      { keyword: "BCOL", meaning: "Color graphics category in SE78." },
      { keyword: "BMON", meaning: "Monochrome graphics category in SE78." },
      { keyword: "SE73", meaning: "Bar code definition maintenance." },
      { keyword: "Graphic node", meaning: "SmartForm node that references a SE78 graphic." },
      { keyword: "TIFF", meaning: "Tagged Image File Format; commonly used for SE78 graphics." },
      { keyword: "BMP", meaning: "Bitmap; widely supported by SAP graphic upload." },
      { keyword: "Resolution", meaning: "DPI of the graphic; affects print quality and file size." }
    ],
    mistakes: [
      { mistake: "Uploading high-resolution images without optimisation.", whyWrong: "Form size balloons; print performance suffers and spool storage grows.", correctApproach: "Optimise images for required resolution before SE78 upload." },
      { mistake: "Hardcoding the same logo in multiple forms.", whyWrong: "Brand change requires touching every form; risk of inconsistency.", correctApproach: "Upload once in SE78 and reference from each form; centralised brand maintenance." },
      { mistake: "Forgetting conditional rendering on company-specific logos.", whyWrong: "Wrong company logo appears for entities sharing the same form.", correctApproach: "Use Conditions tab on Graphic node keyed on company code or sales org." }
    ],
    qrn: "What: SE78 manages graphics (TIFF/BMP/JPG) for forms; SE73 manages barcodes; SmartForms reference them via Graphic nodes.\n\nUsed for:\n- Company logos and signatures on forms\n- Barcodes on shipping labels\n- Centralised brand asset management\n\nKey syntax / tables / Tcodes:\n- SE78 (BCOL / BMON), SE73 (barcodes)\n- Graphic node in SmartForms\n- Conditions tab for company-specific logos\n\nInterview keyword: Centralised graphic repo with conditional rendering."
  },

  'forms-workflow-035': {
    scriptH: "Sir, SSF_FUNCTION_MODULE_NAME hardcode na karne ka reason yeh hai ki generated FM name SAP system-specific hota hai. DEV mein /1BCDWB/SF00000123, PROD mein /1BCDWB/SF00000456 ho sakta hai because numbering activate hone pe assign hoti hai per system. Hardcode karne se transport fail hoga production runtime. Control parameters mein no_dialog dialog suppress karta hai, preview screen pe dikhata hai dono alag concepts. no_form exception form not found ya inactive ko indicate karta hai. Practically, mere project mein hum hamesha SSF_FUNCTION_MODULE_NAME first call karte the, fir CALL FUNCTION lv_fm_name. Iska benefit yeh hai ki same code dev, qas, prod sab mein bina change kaam karta hai.",
    scriptE: "We never hardcode the SmartForm FM name because the generated name (e.g., /1BCDWB/SF00000123) is system-specific each system assigns its own number on activation. Hardcoding would work in DEV and fail in PROD. SSF_FUNCTION_MODULE_NAME returns the correct name per system at runtime. In control parameters, no_dialog suppresses the print dialog (essential for background) while preview shows on-screen output (interactive only); they are independent flags. The no_form exception indicates the form does not exist or is inactive in the current system. In my project we always called SSF_FUNCTION_MODULE_NAME first then CALL FUNCTION lv_fm_name a portable, robust pattern across all environments.",
    words: [
      { keyword: "SSF_FUNCTION_MODULE_NAME", meaning: "Returns generated FM name; never hardcode the FM directly." },
      { keyword: "no_dialog", meaning: "Suppress print dialog; required in background jobs." },
      { keyword: "preview", meaning: "Show output on screen; only applicable interactively." },
      { keyword: "getotf", meaning: "Return OTF data; enables PDF conversion downstream." },
      { keyword: "no_form exception", meaning: "Raised when form does not exist or is inactive." },
      { keyword: "user_canceled (sy-subrc=4)", meaning: "User dismissed the print dialog; not an error." },
      { keyword: "is_<param>", meaning: "Convention for importing structure parameters." },
      { keyword: "it_<param>", meaning: "Convention for internal table TABLES parameters." }
    ],
    mistakes: [
      { mistake: "Hardcoding the generated FM name.", whyWrong: "Fails in any system where the activation generated a different number.", correctApproach: "Call SSF_FUNCTION_MODULE_NAME to retrieve the FM name at runtime." },
      { mistake: "Setting preview = abap_true in background.", whyWrong: "Background has no GUI; the form waits for a screen and the job hangs.", correctApproach: "In background set no_dialog = abap_true and preview = abap_false." },
      { mistake: "Treating user_canceled like an error.", whyWrong: "Generates false alerts and confuses operations.", correctApproach: "Handle sy-subrc = 4 separately as a user action, not a failure." }
    ],
    qrn: "What: Driver programs must call SSF_FUNCTION_MODULE_NAME at runtime to get the system-specific generated FM name.\n\nUsed for:\n- Portable form code across DEV/QAS/PROD\n- Distinguishing no_dialog vs preview semantics\n- Handling form-not-active and user_canceled cases\n\nKey syntax / tables / Tcodes:\n- SSF_FUNCTION_MODULE_NAME -> CALL FUNCTION lv_fm_name\n- Control params: no_dialog, preview, getotf, langu\n- Exceptions: no_form, no_function_module, user_canceled\n\nInterview keyword: Never hardcode the generated FM."
  }
};
