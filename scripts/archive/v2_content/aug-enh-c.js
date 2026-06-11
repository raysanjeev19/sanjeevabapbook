const fs = require('fs');
const path = '/Users/sanjayray/boook/src/data/answers/enhancements-c.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const aug = {
  'enhancements-008': {
    interviewScriptHinglish: "Sir, classic BAdI ABAP Enhancement Framework se pehle wala model hai jisme SE18 mein BAdI define hoti hai aur SE19 mein implementation banayi jaati hai using IF_EX_* interface aur GET BADI ya CALL BADI statements. Yeh single-use ya multi-use ho sakti hai aur filter support karti hai lekin internally function module dispatch pe based hai. New BAdI kernel-based aur object-oriented hai, Enhancement Spot ke under define hoti hai SE18 mein, multiple implementations natively support karti hai, aur faster runtime dispatch deti hai. Mere project mein S/4HANA migration ke time maine classic BAdIs ko new BAdIs ke saath replace kiya — performance bhi improved aur upgrade-safe bhi raha. Iska benefit yeh hai ki cleaner OOP, faster dispatch aur S/4HANA-aligned architecture.",
    interviewScriptEnglish: "Classic BAdIs were introduced before the ABAP Enhancement Framework and rely on the IF_EX_* interface with GET BADI and CALL BADI statements, using internal function-module dispatch. New BAdIs are kernel-based, fully object-oriented, defined under an Enhancement Spot, and provide native multiple-use, filter-dependent dispatch with significantly better runtime performance. In S/4HANA the new BAdI is the preferred extension point because it integrates cleanly with the Enhancement Framework, transports as an ENHO object, and aligns with the modern ABAP development model. Migrating classic BAdIs to new BAdIs during S/4HANA transition is a standard upgrade activity to gain both performance and architectural benefits.",
    wordByWordSamjho: [
      { keyword: "GET BADI", meaning: "ABAP statement to instantiate a BAdI reference for both classic and new BAdIs." },
      { keyword: "CALL BADI", meaning: "Invokes a method on the BAdI reference triggering all active implementations." },
      { keyword: "IF_EX_*", meaning: "Naming convention for the BAdI interface that implementation classes must implement." },
      { keyword: "Enhancement Spot", meaning: "Container introduced with new BAdIs grouping BAdI definitions and explicit points." },
      { keyword: "SE18", meaning: "BAdI Builder transaction used to define and inspect classic and new BAdIs." },
      { keyword: "SE19", meaning: "BAdI Implementation Builder for creating customer implementation classes." },
      { keyword: "CL_BADI_BASE", meaning: "Base class behind new BAdI runtime providing the kernel-level dispatch." },
      { keyword: "ENHO", meaning: "Repository object type holding new BAdI implementations for transport." }
    ],
    commonMistakesSection: [
      { mistake: "Mixing classic and new BAdI syntax in the same project without clear standards.", whyWrong: "Inconsistent patterns confuse new developers and complicate code reviews.", correctApproach: "Adopt new BAdI as the default in S/4HANA and migrate classic BAdIs progressively with team guidelines." },
      { mistake: "Forgetting that GET BADI requires TRY-CATCH for CX_BADI_NOT_IMPLEMENTED.", whyWrong: "Calling code dumps when no active implementation exists, especially after deactivations.", correctApproach: "Wrap GET BADI and CALL BADI in TRY-CATCH and define a sensible fallback path." },
      { mistake: "Re-creating an existing classic BAdI as a new BAdI without analysing dependencies.", whyWrong: "Calling programs still reference the old definition; the new BAdI is never triggered.", correctApproach: "Search SE18 Where-Used for all callers before refactoring and adjust them in the same transport." },
      { mistake: "Using new BAdI syntax in ECC systems below 7.0.", whyWrong: "New BAdI kernel features are unavailable on older releases, leading to syntax errors.", correctApproach: "Verify the NetWeaver release and stick to classic BAdI where new BAdI is not supported." },
      { mistake: "Assuming both styles transport identically.", whyWrong: "Classic BAdIs transport as SXSD objects, new BAdIs as ENHO; missing the right object breaks activation in target systems.", correctApproach: "Verify the correct object types are in the transport request via SE09." }
    ],
    quickRevisionNotes: "What: Classic BAdIs use function-module dispatch with IF_EX_* interfaces; new BAdIs are kernel-based, OOP, and live under Enhancement Spots.\n\nUsed for:\n- Adding upgrade-safe extensions in ECC (classic) or S/4HANA (new BAdI).\n- Replacing legacy enhancements with modern, faster BAdI patterns.\n- Implementing multiple-use, filter-dependent extension points.\n\nKey syntax / tables / Tcodes:\n- SE18 for definition, SE19 for implementation, ENHO objects in TADIR.\n- GET BADI ... FILTERS / CALL BADI with TRY-CATCH on CX_BADI_NOT_IMPLEMENTED.\n- New BAdI under Enhancement Spot; classic BAdI standalone object.\n\nInterview keyword: Classic = FM-dispatch legacy, New BAdI = kernel-based S/4HANA standard.",
    tiers: ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'advanced', 'advanced']
  },
  'enhancements-009': {
    interviewScriptHinglish: "Sir, Enhancement Spot ek container hai jo Enhancement Framework mein multiple BAdI definitions, enhancement points aur sections ko logical group karta hai. SE18 ya SEHP transaction se manage hota hai. Jab koi business area mein multiple related extensions hote hain — jaise pricing ke saath surcharge, discount aur tax — un sabhi ko ek Enhancement Spot mein rakhte hain. Mere project mein humne custom pricing engine ke liye ZES_CUSTOM_PRICING spot banaya tha jisme 5 BAdI definitions aur 3 explicit enhancement points the. Iska benefit yeh hai ki related extensions ek jagah managed hote hain, naming consistent rehti hai aur transport organize karna easy ho jaata hai.",
    interviewScriptEnglish: "An Enhancement Spot is a container in the ABAP Enhancement Framework that groups related BAdI definitions and explicit enhancement points or sections under a single logical name. It is created and managed through transaction SE18 or SEHP. Enhancement Spots provide namespace organization, improve discoverability, and simplify transport packaging when multiple related extensions exist in a business area. In a custom pricing engine project, a Z-prefixed Enhancement Spot grouped five BAdIs and three explicit points, allowing parallel team development and clean handover documentation while keeping all related extension metadata centralised.",
    wordByWordSamjho: [
      { keyword: "Enhancement Spot", meaning: "Container grouping related BAdI definitions, enhancement points, and sections." },
      { keyword: "SEHP", meaning: "Transaction for creating and maintaining Enhancement Spot metadata." },
      { keyword: "SPOTS", meaning: "Keyword linking an ENHANCEMENT-POINT or ENHANCEMENT-SECTION to its parent spot." },
      { keyword: "SE18", meaning: "Used to view BAdIs and Enhancement Spots, including their points and definitions." },
      { keyword: "Composite Enhancement Spot", meaning: "Spot type that aggregates multiple sub-spots for very large modules." },
      { keyword: "SXSD", meaning: "Repository object type that stores Enhancement Spot definitions for transport." },
      { keyword: "Simple Enhancement Spot", meaning: "Spot that directly contains BAdIs and enhancement points without nested spots." }
    ],
    commonMistakesSection: [
      { mistake: "Creating a separate Enhancement Spot for every BAdI.", whyWrong: "Bloats the namespace and makes related extensions hard to find together.", correctApproach: "Group related BAdIs and points under one well-named spot like ZES_BUSINESS_AREA_NAME." },
      { mistake: "Confusing Enhancement Spot with BAdI definition itself.", whyWrong: "They are different concepts; mixing them up signals shallow knowledge in interviews.", correctApproach: "Remember Spot = container (SEHP), BAdI = definition inside the spot (SE18)." },
      { mistake: "Transporting BAdI implementation without first transporting the Spot in custom scenarios.", whyWrong: "Target system rejects the implementation since the spot does not exist yet.", correctApproach: "Transport order: custom Spot definition first (R3TR SXSD), then BAdI implementations (R3TR ENHO)." },
      { mistake: "Naming spots without a Z prefix in custom development.", whyWrong: "Risk of clashing with SAP namespace and being overwritten on upgrade.", correctApproach: "Always use Z or Y prefix for custom Enhancement Spots and document the naming convention." },
      { mistake: "Using a composite spot when a simple one would do.", whyWrong: "Over-engineering increases maintenance overhead with no real benefit for small modules.", correctApproach: "Prefer simple Enhancement Spots and use composite only for very large frameworks." }
    ],
    quickRevisionNotes: "What: An Enhancement Spot is the Enhancement Framework container that groups BAdIs and explicit points under one logical name.\n\nUsed for:\n- Organising related extensions in a business area like pricing or output.\n- Cleanly transporting BAdI definitions together with their parent spot.\n- Designing extensible custom frameworks with multiple injection points.\n\nKey syntax / tables / Tcodes:\n- SE18 / SEHP to create and view spots; R3TR SXSD for transport.\n- ENHANCEMENT-POINT / ENHANCEMENT-SECTION ... SPOTS zes_name.\n- Simple vs Composite Enhancement Spots for scaling complexity.\n\nInterview keyword: Spot = container; BAdI = definition inside the spot.",
    tiers: ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'advanced', 'advanced']
  },
  'enhancements-010': {
    interviewScriptHinglish: "Sir, S/4HANA migration mein classic enhancements — user exits, customer exits, classic BAdIs — sab evaluate karne padte hain because S/4HANA mein simplification ke kaaran kuch standard programs hata diye gaye ya replaced ho gaye hain. SAP Readiness Check aur Custom Code Migration tool se sab existing custom code aur enhancements ka impact analysis karte hain. Modifications ko hatake BAdI ya RAP-based extension mein convert karte hain, deprecated objects ke liye SAP-provided alternatives use karte hain. Mere migration project mein humne 47 custom enhancements identify kiye — 30 BAdIs as-is migrate ho gayi, 12 ko new BAdI mein convert kiya, aur 5 modifications ko BAdI ya enhancement point se replace kiya. Iska benefit yeh hai ki S/4HANA upgrade clean hota hai aur future upgrades zero touch ho jaate hain.",
    interviewScriptEnglish: "S/4HANA migration requires a systematic review of all existing enhancements because the simplification list deprecates certain ECC objects. The SAP Readiness Check, Custom Code Migration tool, and SCI (Code Inspector) identify enhancements affected by simplification. Modifications must be removed and replaced with BAdI or RAP-based extensions; deprecated function modules and tables are replaced by SAP-recommended successors. In a migration project, classifying enhancements as keep, refactor, or retire — with clear test coverage for each — ensures the S/4HANA conversion is upgrade-safe and that future S/4HANA cloud-ready extensions follow Key User and Developer Extensibility patterns.",
    wordByWordSamjho: [
      { keyword: "SAP Readiness Check", meaning: "Cloud-based tool analysing custom code, add-ons, and simplification impact before S/4HANA conversion." },
      { keyword: "Custom Code Migration tool", meaning: "ATC-based tool that scans Z code and enhancements for S/4HANA simplification issues." },
      { keyword: "SPDD", meaning: "Transaction to adjust DDIC modifications during an SAP upgrade." },
      { keyword: "SPAU", meaning: "Transaction to adjust repository-object modifications during an SAP upgrade." },
      { keyword: "SPAU_ENH", meaning: "Adjusts enhancement implementations affected by upgrade or simplification." },
      { keyword: "Simplification List", meaning: "SAP-published list of ECC objects deprecated or changed in S/4HANA." },
      { keyword: "RAP", meaning: "ABAP RESTful Application Programming model used for modern Fiori-based extensions." },
      { keyword: "ATC", meaning: "ABAP Test Cockpit; central quality-check framework executing simplification checks." }
    ],
    commonMistakesSection: [
      { mistake: "Going live on S/4HANA without running the Custom Code Migration tool.", whyWrong: "Hidden simplification issues only surface in production, causing dumps and incorrect postings.", correctApproach: "Run ATC with the S/4HANA target release variant during early migration phases and address all priority findings." },
      { mistake: "Keeping legacy modifications instead of converting them to BAdIs.", whyWrong: "Modifications survive in SPAU but require manual rework on every S/4HANA feature pack upgrade.", correctApproach: "Convert each modification to a BAdI or explicit enhancement implementation during the migration window." },
      { mistake: "Ignoring SPAU_ENH after upgrade.", whyWrong: "Enhancements affected by Note implementations may remain inactive in the target system.", correctApproach: "Always work the SPAU_ENH worklist after the technical upgrade and re-test the affected processes." },
      { mistake: "Skipping a test plan for enhancements.", whyWrong: "Behaviour differences in S/4HANA standard code may break custom logic that was working in ECC.", correctApproach: "Build a regression-test plan with concrete cases for every retained enhancement before go-live." },
      { mistake: "Not using Key User or Developer Extensibility for new requirements in S/4HANA Cloud.", whyWrong: "Classic BAdIs are not available in S/4HANA Public Cloud and modifications are forbidden.", correctApproach: "Follow the SAP-recommended extensibility model — Key User for low-code, Developer Extensibility for ABAP." }
    ],
    quickRevisionNotes: "What: S/4HANA enhancement migration is the disciplined review and conversion of ECC enhancements to S/4HANA-compatible patterns.\n\nUsed for:\n- Removing modifications and converting them to BAdIs or RAP extensions.\n- Resolving simplification list impacts on custom code and enhancements.\n- Preparing extensions for future S/4HANA upgrades with minimal effort.\n\nKey syntax / tables / Tcodes:\n- SAP Readiness Check, Custom Code Migration (ATC), SPDD, SPAU, SPAU_ENH.\n- Simplification list, BAdI new syntax, RAP behavior implementations.\n- Tables: TADIR (ENHO), CMOD_EHDR for legacy customer exits.\n\nInterview keyword: Readiness Check plus ATC plus SPAU_ENH = S/4HANA enhancement migration triad.",
    tiers: ['easy', 'easy', 'medium', 'medium', 'medium', 'advanced', 'advanced', 'easy']
  },
  'enhancements-011': {
    interviewScriptHinglish: "Sir, functional consultant ko enhancements explain karne ka simple approach yeh hai ki business analogy se start karo, technical jargon avoid karo. Main bolta hoon — sochiye standard SAP ek printed form hai jisme client extra field chahta hai. Modification matlab form pe ink se likho — agle baar SAP update aaya toh wo extra likhayi mit jaayegi. Enhancement matlab form ke saath sticky note attach karo — SAP update aaye, form change ho lekin sticky note safe rahega. Phir three options batao: User Exit purana sticky note, Customer Exit standard sticky note, BAdI modern smart sticky note jo conditions ke hisaab se change ho sakta hai. Iska benefit yeh hai ki functional consultant easily samjh jaate hain aur project ke design decisions mein meaningful contribute kar sakte hain.",
    interviewScriptEnglish: "Explaining enhancements to a functional consultant works best with business analogies rather than technical syntax. I describe standard SAP as a pre-printed form: a modification is permanent ink that gets erased on the next upgrade, while an enhancement is a sticky note that survives. From there I map the options — User Exit as the legacy sticky note, Customer Exit as a managed sticky note, and BAdI as a smart, modern sticky note that can vary by context such as company code. This lets functional consultants understand upgrade safety, plan realistic timelines, and make informed business decisions about whether to use SAP standard, configure, or enhance.",
    wordByWordSamjho: [
      { keyword: "Modification", "meaning": "Direct change to SAP standard code that is overwritten or merged during upgrades." },
      { keyword: "User Exit", meaning: "Legacy FORM-routine based extension used in older ECC code." },
      { keyword: "Customer Exit", meaning: "Function-module based extension activated through CMOD enhancement projects." },
      { keyword: "BAdI", meaning: "Modern class-based extension supporting multiple implementations and filters." },
      { keyword: "CMOD", meaning: "Transaction used to create and activate customer-exit enhancement projects." },
      { keyword: "SE18", meaning: "BAdI Builder used to discover BAdIs available for a business process." },
      { keyword: "Upgrade Safe", meaning: "Concept that custom logic survives SAP version upgrades without manual merge." }
    ],
    commonMistakesSection: [
      { mistake: "Using deep technical jargon when explaining to functional consultants.", whyWrong: "Functional team cannot translate to business owners, leading to misaligned expectations.", correctApproach: "Anchor explanations in business analogies first, then introduce technical names only where needed." },
      { mistake: "Promising modifications without flagging upgrade risk.", whyWrong: "Future upgrades silently break the customisation, surprising functional and business teams.", correctApproach: "Always disclose that modifications are upgrade-risk and require explicit governance approval." },
      { mistake: "Suggesting modification when a BAdI or enhancement point exists.", whyWrong: "Skips the upgrade-safe option and locks the client into long-term technical debt.", correctApproach: "Run discovery via SE84, SE18, and SPRO first and present BAdI options to the functional team." },
      { mistake: "Skipping the impact analysis when proposing an enhancement.", whyWrong: "Functional team underestimates testing scope and timeline slips during integration testing.", correctApproach: "Provide a short impact note covering objects touched, test scenarios, and downstream effects." }
    ],
    quickRevisionNotes: "What: Explaining enhancements to functional consultants in business-friendly language without losing technical accuracy.\n\nUsed for:\n- Aligning functional and technical teams on extension approach.\n- Justifying BAdI usage over modification in design discussions.\n- Setting realistic timelines for enhancement delivery.\n\nKey syntax / tables / Tcodes:\n- SE18 / SE19 / CMOD reference points to mention if asked.\n- Business analogies: sticky note vs ink, smart sticky note for BAdI.\n- Upgrade-safe vs upgrade-risk classification.\n\nInterview keyword: Translate enhancements with sticky-note analogy; upgrade-safe by design.",
    tiers: ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'advanced', 'advanced']
  }
};

// Now extract per-question word/mistake based on individual codeExamples
// Build per-question wordByWord from aug

function buildOutput() {
  for (const id of Object.keys(data)) {
    const q = data[id];
    const a = aug[id];
    if (!a) { console.error('Missing aug for', id); continue; }
    const tiers = a.tiers;
    const fa = q.followupAnswerBank.map((f, i) => ({ ...f, tier: tiers[i] || 'medium' }));
    const newQ = {
      easyUnderstanding: q.easyUnderstanding,
      hinglishMasterExplanation: q.hinglishMasterExplanation,
      interviewMeKyaBolnaHai: q.interviewMeKyaBolnaHai,
      codeExamples: q.codeExamples,
      interviewScriptHinglish: a.interviewScriptHinglish,
      interviewScriptEnglish: a.interviewScriptEnglish,
      wordByWordSamjho: a.wordByWordSamjho,
      commonMistakesSection: a.commonMistakesSection,
      quickRevisionNotes: a.quickRevisionNotes,
      followupAnswerBank: fa
    };
    data[id] = newQ;
  }
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log('Wrote', path);
}
buildOutput();
