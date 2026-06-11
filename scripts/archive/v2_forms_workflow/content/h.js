module.exports = {
  'forms-workflow-028': {
    scriptH: "Sir, Secondary Window SmartForm ka fixed-position window hai jo har page pe same position pe repeat hota hai aur overflow nahi karta. Typically header, footer, logo, company address, ya page number jaise static information ke liye use hota hai. Secondary Window ki size predefined hoti hai aur content overflow ho jaaye toh silently clip ho jaata hai. Conditional rendering Conditions tab se control hota hai jaise sirf first page pe hi show karna. Practically, mere project mein company logo aur address Secondary Window mein the jo har page pe top-right pe consistent dikhte the. Iska benefit yeh hai ki static branding aur reference info reliably display hoti hai bina layout overflow ki tension.",
    scriptE: "A Secondary Window in SmartForms is a fixed-position window that repeats at the same coordinates on every page and does not overflow. It is typically used for headers, footers, logos, company address, or page numbers. Its size is predefined; if content exceeds it, the overflow is silently clipped. Conditional rendering through the Conditions tab can restrict appearance (for example, first page only). In my project the company logo and address sat in a Secondary Window so they appeared consistently at the top-right of every page. The business value is reliable static branding and reference info without overflow surprises.",
    words: [
      { keyword: "Secondary Window", meaning: "Fixed-position window repeating per page; no overflow." },
      { keyword: "Conditions tab", meaning: "Per-node setting to render only when condition is true (e.g., first page)." },
      { keyword: "SFSY-PAGE", meaning: "Current page number; usable for first-page logic." },
      { keyword: "SFSY-FORMPAGES", meaning: "Total page count; useful for 'Page X of Y' displays." },
      { keyword: "Window size", meaning: "Width and height set at design time; clipping if content exceeds." },
      { keyword: "Static text", meaning: "Hardcoded label or instruction usually placed in Secondary Window." },
      { keyword: "Logo node", meaning: "Graphic node uploaded via SE78 and referenced in a window." }
    ],
    mistakes: [
      { mistake: "Putting long dynamic text in a Secondary Window.", whyWrong: "Content can exceed window size and silently clip without warning.", correctApproach: "Keep Secondary Windows for short static content; long dynamic text belongs in Main Window." },
      { mistake: "Placing items table in a Secondary Window.", whyWrong: "Secondary Windows do not overflow; rows beyond first page are lost.", correctApproach: "Put repeating tables in the Main Window." },
      { mistake: "Forgetting to set first-page condition for a cover-page-only Secondary Window.", whyWrong: "Cover content like 'Customer Original' appears on every page.", correctApproach: "Use SFSY-PAGE = 1 condition on the node to limit appearance to first page." }
    ],
    qrn: "What: Secondary Window is a fixed-position SmartForm window for static per-page content; it does not overflow.\n\nUsed for:\n- Logos, headers, footers, addresses\n- Page number displays\n- First-page-only labels\n\nKey syntax / tables / Tcodes:\n- Conditions tab on node\n- SFSY-PAGE, SFSY-FORMPAGES system fields\n- One per role (header, footer, logo) on a page\n\nInterview keyword: Fixed position, no overflow, short static content."
  },

  'forms-workflow-029': {
    scriptH: "Sir, Copy Window SmartForms ka special window hai jo har copy ke liye different content render karta hai. Print mein jab multiple copies generate hote hain Original, Customer Copy, Vendor Copy, Office Copy SFSY-COPYCOUNT system field har copy ke liye 1, 2, 3 hota hai. Copy Window mein conditional text use karke har copy pe alag label dikhate hain. Practically, mere invoice form mein Copy Window tha jo CASE SFSY-COPYCOUNT pe 'Customer Original', 'Vendor Copy', 'Accounting Copy' switch karta tha. Iska benefit yeh hai ki single form definition se multiple labelled copies generate hote hain bina form duplicate kiye.",
    scriptE: "The Copy Window in SmartForms renders different content for each print copy. When multiple copies are produced (Original, Customer Copy, Office Copy), the system field SFSY-COPYCOUNT takes values 1, 2, 3, and so on. Using conditions or a CASE block inside the Copy Window, we render different labels or content per copy. In my invoice project the Copy Window switched between 'Customer Original', 'Vendor Copy', and 'Accounting Copy' based on SFSY-COPYCOUNT. The business value is single-source form maintenance every copy is generated from one form definition rather than maintaining duplicate forms.",
    words: [
      { keyword: "Copy Window", meaning: "Window that renders per-copy specific content." },
      { keyword: "SFSY-COPYCOUNT", meaning: "System field with current copy number (1, 2, 3...)." },
      { keyword: "TDCOPIES", meaning: "Output option specifying number of copies to print." },
      { keyword: "Copy 1", meaning: "Original; typically labelled 'Customer Original'." },
      { keyword: "Copy 2+", meaning: "Duplicates; typically labelled 'Customer Copy', 'Office Copy', etc." },
      { keyword: "Condition on node", meaning: "Branch text per copy using SFSY-COPYCOUNT in node condition." },
      { keyword: "Final Window", meaning: "Different from Copy Window; renders only on last page." }
    ],
    mistakes: [
      { mistake: "Using Copy Window for data-driven content differences.", whyWrong: "Copy Window logic uses copy number, not business data; content gets out of sync with intent.", correctApproach: "Use Copy Window strictly for copy-number-based labelling; data-driven differences belong on regular nodes." },
      { mistake: "Setting TDCOPIES = 1 but expecting Copy Window variations to appear.", whyWrong: "Only one copy is produced; SFSY-COPYCOUNT is always 1, so other copy variants never render.", correctApproach: "Set TDCOPIES to the desired number of copies in driver output_options." },
      { mistake: "Maintaining separate forms for original and customer copy.", whyWrong: "Duplicate maintenance, divergence over time.", correctApproach: "Use a single form with Copy Window logic for all copy variants." }
    ],
    qrn: "What: Copy Window renders different content per copy of a printed form using SFSY-COPYCOUNT.\n\nUsed for:\n- Customer Original vs Customer Copy vs Office Copy labelling\n- Differentiated text per copy (e.g., legal note on original only)\n- Single-source form maintenance for multiple copies\n\nKey syntax / tables / Tcodes:\n- SFSY-COPYCOUNT system field\n- TDCOPIES in output_options (driver)\n- Conditions tab on text nodes within Copy Window\n\nInterview keyword: Copy number drives content, not business data."
  },

  'forms-workflow-030': {
    scriptH: "Sir, Final Window SmartForms ka special window hai jo sirf last page pe render hota hai. Typically totals, signature line, terms and conditions footer, ya stamp area ke liye use hota hai. Single-page form mein Final Window us page pe hi appear karta hai. Agar Main Window content multiple pages span karta hai toh Final Window automatically last page pe place ho jaata hai. Practically, mere invoice form mein Final Window tha jo grand total, tax summary, aur authorised signatory text show karta tha last page pe consistent. Iska benefit yeh hai ki end-of-document content automatically last page pe attach hota hai bina manual page tracking.",
    scriptE: "A Final Window in SmartForms renders content only on the last page of the form output. It is typically used for grand totals, signature line, terms and conditions footer, or stamp areas. In a single-page form the Final Window naturally appears on that page. When the Main Window flows across multiple pages, the Final Window automatically attaches to the last page. In my invoice project the Final Window showed the grand total, tax summary, and authorised signatory text. The business value is automatic end-of-document content placement without manual page tracking or post-processing.",
    words: [
      { keyword: "Final Window", meaning: "Renders only on the last page of the form output." },
      { keyword: "SFSY-PAGE", meaning: "Current page number." },
      { keyword: "SFSY-FORMPAGES", meaning: "Total number of pages; equals SFSY-PAGE on the last page." },
      { keyword: "Single-page form", meaning: "Final Window appears on the single page." },
      { keyword: "Multi-page form", meaning: "Final Window automatically attaches to the last page." },
      { keyword: "Grand total", meaning: "Sum of all line items; placed in Final Window for visibility." },
      { keyword: "Signature area", meaning: "Block for authorised signatory placed in Final Window." }
    ],
    mistakes: [
      { mistake: "Placing totals at the end of the Main Window.", whyWrong: "Totals render right after the last item, possibly mid-page, not at bottom of last page.", correctApproach: "Use Final Window for totals so they always appear cleanly on the last page." },
      { mistake: "Using a Secondary Window with last-page condition for totals.", whyWrong: "Adds complex conditional logic and is more error-prone than Final Window.", correctApproach: "Use Final Window which has built-in last-page semantics." },
      { mistake: "Putting heavy ABAP logic in a Program node inside Final Window.", whyWrong: "Hard to debug and slows last-page rendering; debugger access is awkward.", correctApproach: "Calculate totals in driver or earlier ABAP code node; only display in Final Window." }
    ],
    qrn: "What: Final Window in SmartForms is a special window that renders only on the last page of the form output.\n\nUsed for:\n- Grand totals and tax summary\n- Signature line and terms\n- Last-page-only stamps and approvals\n\nKey syntax / tables / Tcodes:\n- SFSY-PAGE = SFSY-FORMPAGES on last page\n- Final Window automatically attaches to last page\n- Single-page form Final Window appears on that page\n\nInterview keyword: Last page only, automatic placement."
  },

  'forms-workflow-031': {
    scriptH: "Sir, Main Window vs Secondary Window key SmartForm concept hai. Main Window form mein one and only one hota hai, multi-page overflow karta hai aur primary content body host karta hai. Secondary Window unlimited count, fixed position per page, no overflow. Main Window mein data-driven content jaise tables, narratives. Secondary mein static content jaise logo, header, footer. Page break Main Window content overflow se trigger hota hai, Secondary windows automatically copy hote hain each generated page pe. Practically, mere delivery note mein Main mein items table aur Secondary mein company branding the. Iska benefit yeh hai ki content responsibility clear hai aur multi-page rendering predictable hoti hai.",
    scriptE: "Main vs Secondary Window is a foundational SmartForm concept. The Main Window is unique per form, supports overflow across pages, and hosts the primary body content. Secondary Windows can be many, are fixed-position per page, and do not overflow. Use the Main Window for data-driven content like tables and narratives, and Secondary Windows for static content such as logos, headers, and footers. Page breaks are triggered by Main Window overflow; Secondary Windows are automatically replicated on each generated page. In my delivery note the Main Window held the items table while Secondary Windows held company branding. This clear split keeps multi-page rendering predictable.",
    words: [
      { keyword: "Main Window", meaning: "Unique, overflow-capable window for primary body content." },
      { keyword: "Secondary Window", meaning: "Multiple, fixed-position windows for static per-page content." },
      { keyword: "Overflow", meaning: "Automatic page generation when Main Window content exceeds page space." },
      { keyword: "Page replication", meaning: "Secondary Windows appear on every generated page automatically." },
      { keyword: "Window coordinates", meaning: "Left, top, width, height defined on each window." },
      { keyword: "Overlap rule", meaning: "Secondary Windows should not overlap with Main Window area." },
      { keyword: "Table node placement", meaning: "Repeating tables must sit inside Main Window for multi-page support." }
    ],
    mistakes: [
      { mistake: "Creating multiple Main Windows.", whyWrong: "Not allowed; SmartForms enforces a single Main Window per form.", correctApproach: "Restructure layout using one Main Window and additional Secondary Windows." },
      { mistake: "Overlapping a Secondary Window with the Main Window.", whyWrong: "Output overlap causes visual clipping or unpredictable rendering.", correctApproach: "Design layout so Secondary Windows sit outside the Main Window's drawing area." },
      { mistake: "Placing repeating tables in Secondary Windows.", whyWrong: "Secondary does not overflow; rows beyond first page are silently lost.", correctApproach: "Always place repeating tables in the Main Window." }
    ],
    qrn: "What: SmartForms distinguishes Main Window (unique, overflow) from Secondary Window (many, fixed) for predictable multi-page rendering.\n\nUsed for:\n- Choosing where to place content (data vs static)\n- Multi-page invoice and delivery layouts\n- Headers, footers, logos placement\n\nKey syntax / tables / Tcodes:\n- One Main Window, many Secondary Windows\n- Secondary Windows replicate on each page\n- Tables go in Main Window\n\nInterview keyword: Main is unique and flows; Secondary is many and static."
  }
};
