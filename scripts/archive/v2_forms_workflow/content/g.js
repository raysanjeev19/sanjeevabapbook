module.exports = {
  'forms-workflow-024': {
    scriptH: "Sir, SE72 SAPscript ka Style transaction hai jahan Paragraph Format aur Character Format define hote hain. Paragraph format pura paragraph ka font, alignment, indent, line spacing decide karta hai. Character format inline character ya word ke liye different font ya bold style apply karta hai jaise TH heading ke liye, TI italic ke liye. Styles ek style sheet mein bundle hote hain jo form mein assign hota hai SE71 ya SMARTFORMS mein. Practically, mere project mein invoice ke liye custom style sheet banaya tha company branding ke liye. Iska benefit yeh hai ki same style multiple forms mein reuse ho jaata hai aur central change se sab forms update ho jaate hain.",
    scriptE: "SE72 maintains SAPscript styles consisting of Paragraph Formats and Character Formats. A Paragraph Format defines the font, alignment, indent, and line spacing applied to an entire paragraph. A Character Format applies inline formatting (font, bold, italic) to a selected character or word (e.g., TH for headings, TI for italic). These formats are bundled into a style sheet assigned to SAPscript forms in SE71 or SmartForms. In my project I built a custom style sheet for the invoice form aligned with corporate branding. The business value is consistent styling across forms and a single point of change when branding evolves.",
    words: [
      { keyword: "SE72", meaning: "SAPscript style maintenance transaction." },
      { keyword: "Style Sheet", meaning: "Container for paragraph and character formats applied to forms." },
      { keyword: "Paragraph Format", meaning: "Defines font, alignment, indent, spacing for whole paragraph." },
      { keyword: "Character Format", meaning: "Inline format applied to selected characters within a paragraph." },
      { keyword: "Default Paragraph", meaning: "Paragraph used when no specific format is selected." },
      { keyword: "Standard Style", meaning: "SAP-delivered style; do not modify, copy to Z-style first." },
      { keyword: "Font Family", meaning: "Helvetica, Courier, Times etc., declared in style and used by formats." },
      { keyword: "Tab Stops", meaning: "Defined in paragraph format to align columnar text in SAPscript." }
    ],
    mistakes: [
      { mistake: "Modifying SAP-delivered standard styles.", whyWrong: "Upgrades may overwrite changes; all forms using the style break unexpectedly.", correctApproach: "Copy to Z-style and modify the copy; assign Z-style to your form." },
      { mistake: "Changing a shared style without where-used check.", whyWrong: "Other forms relying on the same style change appearance unexpectedly.", correctApproach: "Use where-used in SE72 before changing; consider creating a new style for limited scope." },
      { mistake: "Defining inline character formatting directly in form text instead of using a Character Format.", whyWrong: "Formatting becomes inconsistent and impossible to change centrally.", correctApproach: "Define a Character Format in SE72 and apply it; centralised maintenance follows automatically." }
    ],
    qrn: "What: SE72 maintains SAPscript styles consisting of paragraph formats and character formats used by SAPscript and SmartForms.\n\nUsed for:\n- Branding consistency across forms\n- Central font and layout management\n- Paragraph and character-level formatting\n\nKey syntax / tables / Tcodes:\n- Paragraph format vs character format\n- Default paragraph for fallback\n- Assigned in SE71 / SMARTFORMS to forms\n\nInterview keyword: Style sheet for consistent branding."
  },

  'forms-workflow-025': {
    scriptH: "Sir, SMARTFORMS Tcode SmartForm design ka primary tool hai SE71 SAPscript ke liye hai, SMARTFORMS naya tool hai. Form Interface mein hum define karte hain kya parameters form ko chahiye importing structures, internal tables, scalars. Different node types hain Window node, Page node, Text node, Table node, Template node, Program node ABAP code, Loop node, Folder node. Global definitions mein form-wide variables declare karte hain. Conditional output node-level condition se control hota hai. Practically, mere project mein invoice form ke interface mein is_vbak aur it_vbap tha aur conditional discount text discount amount > 0 hone pe hi print hota tha. Iska benefit yeh hai ki modular structure se maintenance aur extensibility easy rehti hai.",
    scriptE: "SMARTFORMS is the modern form design transaction (SE71 is for older SAPscript). The Form Interface lets us define parameters the form needs importing structures, internal tables, and scalars. Node types include Window, Page, Text, Table, Template, Program (ABAP code), Loop, and Folder. Global Definitions hold form-wide variables. Conditional output is controlled per node via the Conditions tab. In my project the invoice form interface had is_vbak and it_vbap, and the discount text node only printed when discount amount was greater than zero. The business value is a modular structure that is easy to maintain and extend.",
    words: [
      { keyword: "SMARTFORMS", meaning: "Modern SmartForm design transaction." },
      { keyword: "Form Interface", meaning: "Section where importing parameters, tables, and exceptions are defined." },
      { keyword: "Global Definitions", meaning: "Form-wide variables and types accessible from any node." },
      { keyword: "Window node", meaning: "Container that holds text, tables, graphics on a page." },
      { keyword: "Page node", meaning: "Defines page format and next-page sequence." },
      { keyword: "Text node", meaning: "Static or dynamic text element." },
      { keyword: "Table node", meaning: "Loop output for internal tables with header/body/footer sections." },
      { keyword: "Template node", meaning: "Fixed-grid layout with predefined rows and columns." },
      { keyword: "Program node", meaning: "Inline ABAP code block." },
      { keyword: "Conditions tab", meaning: "Node-level conditional rendering controls." }
    ],
    mistakes: [
      { mistake: "Using SE71 to build a new modern form.", whyWrong: "SE71 is SAPscript legacy; SAP recommends SmartForms or Adobe Forms for new builds.", correctApproach: "Use SMARTFORMS for new SAP-internal forms; SFP for interactive PDF needs." },
      { mistake: "Putting business logic in Global Definitions.", whyWrong: "Hard to debug, breaks separation of concerns; logic should live in driver.", correctApproach: "Keep Global Definitions for variables and form-wide constants; do logic in driver or small Program nodes." },
      { mistake: "Defining unused parameters in Form Interface.", whyWrong: "Increases coupling and confuses maintainers; generated FM signature bloats.", correctApproach: "Only define what the form uses; remove unused parameters before transport." }
    ],
    qrn: "What: SMARTFORMS is the modern form design transaction with a structured node-based model and explicit form interface.\n\nUsed for:\n- New SAP-internal print and PDF forms\n- Reusable, conditional layouts\n- Multi-page invoice / delivery / PO outputs\n\nKey syntax / tables / Tcodes:\n- Form Interface (importing, tables, exceptions)\n- Nodes: Window, Page, Text, Table, Template, Program\n- Global Definitions, Conditions tab\n\nInterview keyword: Modern structured form design."
  },

  'forms-workflow-026': {
    scriptH: "Sir, SmartForm windows ke types hote hain Main Window, Secondary Window, Copy Window, aur Final Window. Main Window only one per form aur multi-page overflow yahin se hota hai isme repeating tables aur main body content rakhte hain. Secondary Window fixed position per page deta hai jaise header, footer, logo. Copy Window duplicate prints pe different content render karta hai. Final Window sirf last page pe print hota hai useful for signature ya totals. Practically, mere delivery note form mein Main Window items, Secondary Window company address, Copy Window 'Customer Copy' label, Final Window receiver signature line tha. Iska benefit yeh hai ki har content type ke liye right window selection se layout predictable aur maintainable rehti hai.",
    scriptE: "SmartForms support four window types Main, Secondary, Copy, and Final. The Main Window is unique per form and overflows across pages, hosting repeating tables and the principal body content. Secondary Windows are fixed per page and ideal for headers, footers, logos, and static address blocks. The Copy Window renders distinct content on duplicate prints. The Final Window prints only on the last page useful for totals, signatures, or terms. In my delivery note the Main Window held the items, a Secondary Window the company address, a Copy Window the 'Customer Copy' label, and the Final Window the signature area. Correct window selection makes layouts predictable and maintainable.",
    words: [
      { keyword: "Main Window", meaning: "Primary, single-instance window that overflows across pages." },
      { keyword: "Secondary Window", meaning: "Fixed per page; does not overflow." },
      { keyword: "Copy Window", meaning: "Renders distinct content per copy (original, customer copy, duplicate)." },
      { keyword: "Final Window", meaning: "Renders only on last page (signature, totals)." },
      { keyword: "SFSY-COPYCOUNT", meaning: "System field exposing current copy number (1, 2, 3...)." },
      { keyword: "SFSY-PAGE", meaning: "Current page number; can be used inside any window." },
      { keyword: "SFSY-FORMPAGES", meaning: "Total number of pages in the form output." },
      { keyword: "Next Page", meaning: "Property on page node defining the next page; usually self-reference for continuous flow." }
    ],
    mistakes: [
      { mistake: "Having more than one Main Window.", whyWrong: "Not allowed; SmartForms supports only one Main Window per form.", correctApproach: "Restructure layout using a single Main Window and Secondary Windows for additional fixed content." },
      { mistake: "Placing overflowing tables in a Secondary Window.", whyWrong: "Secondary does not overflow; rows beyond first page are silently clipped.", correctApproach: "Move repeating tables into Main Window." },
      { mistake: "Using Copy Window for content that depends on data, not on copy number.", whyWrong: "Copy Window logic uses SFSY-COPYCOUNT; data-driven differences should be Text or Table conditions.", correctApproach: "Use Copy Window strictly for copy-number-driven content; data conditions go on regular nodes." }
    ],
    qrn: "What: SmartForm windows come in four types Main (overflow), Secondary (fixed), Copy (per-copy), and Final (last-page-only).\n\nUsed for:\n- Page-spanning tables (Main)\n- Logos, footers, addresses (Secondary)\n- Duplicate-print labels (Copy)\n- Signatures and totals (Final)\n\nKey syntax / tables / Tcodes:\n- SFSY-COPYCOUNT, SFSY-PAGE, SFSY-FORMPAGES\n- Next Page property on page node\n- One Main Window per form\n\nInterview keyword: Right window for right content."
  },

  'forms-workflow-027': {
    scriptH: "Sir, Main Window SmartForm ka heart hai aur multi-page output ka primary mechanism. Jab Main Window content page bharta hai aur page ke Next Page property se SAP automatically next page generate karta hai aur Main Window content wahin continue hota hai. Yeh sirf Main Window ke saath possible hai Secondary Windows additional pages mein bhi same fixed position pe repeat hote hain. Practically, mere project mein invoice ke 30 items ek page mein nahi aate the Main Window mein table thi aur automatic page break ho jaata tha continuation pages pe headers repeat hote the Table node ke header section se. Iska benefit yeh hai ki multi-page output natural flow se generate hota hai bina manual page handling.",
    scriptE: "The Main Window is the heart of multi-page SmartForm output. When its content exceeds the available space on the current page, SAP automatically generates the next page based on the Next Page property and continues rendering the Main Window content. Only the Main Window supports this overflow; Secondary Windows repeat at fixed positions on each generated page. In my invoice project, 30 line items did not fit on one page so the table in the Main Window automatically flowed onto continuation pages, with table headers repeating via the Table node header section. This natural multi-page handling avoids manual page management.",
    words: [
      { keyword: "Main Window overflow", meaning: "Automatic page generation when Main Window content fills the page." },
      { keyword: "Next Page property", meaning: "On a page node, defines which page follows once the current one is full." },
      { keyword: "Self-reference page", meaning: "When Next Page points to the same page for continuous overflow." },
      { keyword: "Table header section", meaning: "Repeats on each new page automatically when set in Table node." },
      { keyword: "Table footer section", meaning: "Renders at end of table; on overflow can render on last page." },
      { keyword: "Conditional first vs continuation page", meaning: "Separate page nodes can be used for cover page vs continuation pages." }
    ],
    mistakes: [
      { mistake: "Expecting Secondary Windows to overflow like the Main Window.", whyWrong: "Secondary Windows are fixed-position per page; they do not flow.", correctApproach: "Use only the Main Window for content that may span pages." },
      { mistake: "Not setting Next Page on the page node.", whyWrong: "The Main Window has nowhere to go; rendering stops after the first page.", correctApproach: "Always set Next Page (often self-reference) for continuous output." },
      { mistake: "Putting totals at the end of Main Window expecting last-page behaviour.", whyWrong: "Totals print at the end of the last item, possibly mid-page, not at bottom of last page.", correctApproach: "Use Final Window for totals on last page only." }
    ],
    qrn: "What: The Main Window is the only SmartForm window that overflows across pages and is the basis for multi-page output.\n\nUsed for:\n- Invoice / delivery line item tables\n- Long narrative content like terms or descriptions\n- Auto-generating continuation pages\n\nKey syntax / tables / Tcodes:\n- Next Page property (often self-reference)\n- Table header / footer sections for repetition\n- Final Window for last-page-only content\n\nInterview keyword: Only Main Window overflows."
  }
};
