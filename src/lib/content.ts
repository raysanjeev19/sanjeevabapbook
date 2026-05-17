import type { Chapter, Difficulty, Followup, Question, QuestionAnswer } from "@/lib/types";

type ChapterSeed = {
  slug: string;
  title: string;
  icon: string;
  difficulty: Difficulty;
  description: string;
  color: string;
  prompts: string[];
};

const companies = ["Accenture", "TCS", "Infosys", "Capgemini", "Deloitte", "IBM", "Cognizant", "Wipro"];
const levels = ["Foundation", "Project", "Support", "Implementation", "Advanced"] as const;

const chapterSeeds: ChapterSeed[] = [
  {
    slug: "basic-abap",
    title: "Basic ABAP Questions",
    icon: "BookOpen",
    difficulty: "Beginner",
    description: "Core syntax, reports, modularization, events, runtime behavior, and interview fundamentals.",
    color: "#67E8F9",
    prompts: [
      "What is SAP ABAP and where is it used?",
      "Explain the difference between classical report and interactive report.",
      "What are ABAP data types and data objects?",
      "What is the difference between PARAMETERS and SELECT-OPTIONS?",
      "Explain ABAP events INITIALIZATION, AT SELECTION-SCREEN, START-OF-SELECTION, and END-OF-SELECTION.",
      "What is modularization in ABAP?",
      "Difference between subroutine, function module, and method.",
      "What is MESSAGE statement and message class?",
      "Explain SY-SUBRC, SY-TABIX, SY-DATUM, and SY-UZEIT.",
      "What is the difference between CHECK, EXIT, CONTINUE, and STOP?",
    ],
  },
  {
    slug: "data-dictionary",
    title: "Data Dictionary",
    icon: "Database",
    difficulty: "Beginner",
    description: "SE11 objects, domains, data elements, tables, views, indexes, locks, and transports.",
    color: "#A78BFA",
    prompts: [
      "What is SAP Data Dictionary?",
      "Difference between domain and data element.",
      "Difference between transparent table, pooled table, and cluster table.",
      "What is a primary key and foreign key in SE11?",
      "What are table maintenance generator events?",
      "What is a search help and how do elementary and collective search helps differ?",
      "What are lock objects and how do ENQUEUE and DEQUEUE work?",
      "What is a database view versus projection view?",
      "What is append structure and include structure?",
      "How do indexes improve ABAP report performance?",
    ],
  },
  {
    slug: "internal-tables",
    title: "Internal Tables",
    icon: "Table",
    difficulty: "Intermediate",
    description: "Standard, sorted, hashed tables, field symbols, memory use, binary search, and parallel cursor.",
    color: "#34D399",
    prompts: [
      "What is an internal table?",
      "Difference between standard, sorted, and hashed internal tables.",
      "When should you use hashed internal table?",
      "What is binary search in ABAP and when does it work?",
      "What is parallel cursor technique?",
      "Difference between work area and field symbol.",
      "How do COLLECT, APPEND, INSERT, MODIFY, and DELETE work on internal tables?",
      "What is a deep structure and nested internal table?",
      "How do you optimize internal table memory usage?",
      "How do you avoid nested loop performance issues?",
    ],
  },
  {
    slug: "selection-screens",
    title: "Selection Screen",
    icon: "SlidersHorizontal",
    difficulty: "Beginner",
    description: "Dynamic selections, validations, variants, radio buttons, blocks, and user experience.",
    color: "#FBBF24",
    prompts: [
      "How do you create a selection screen in ABAP?",
      "Difference between obligatory parameter and selection-screen validation.",
      "How do you make fields hide or display dynamically?",
      "What is AT SELECTION-SCREEN OUTPUT?",
      "What are selection variants?",
      "How do you validate date ranges on a selection screen?",
      "How do radio buttons and checkboxes work in selection screens?",
      "What is MODIF ID and why is it used?",
      "How do you provide F4 help on a custom field?",
      "How do you design a user-friendly report selection screen?",
    ],
  },
  {
    slug: "reports-alv",
    title: "Reports and ALV",
    icon: "PanelTop",
    difficulty: "Intermediate",
    description: "Classical reports, interactive reports, ALV grid, OO ALV, field catalogs, layouts, and spools.",
    color: "#F472B6",
    prompts: [
      "What is ALV and why is it used?",
      "Difference between REUSE_ALV_GRID_DISPLAY and OO ALV.",
      "How do you build an ALV field catalog?",
      "How do hotspots and user commands work in ALV?",
      "How do you add custom buttons in ALV toolbar?",
      "What is TOP-OF-PAGE in classical report?",
      "How do you handle spool issues in reports?",
      "How do you export ALV output to Excel?",
      "How do you create editable ALV?",
      "How do you troubleshoot ALV layout variant issues?",
    ],
  },
  {
    slug: "ooabap",
    title: "OOABAP and Design Patterns",
    icon: "Boxes",
    difficulty: "Intermediate",
    description: "Classes, interfaces, inheritance, polymorphism, exceptions, singleton, factory, and clean design.",
    color: "#60A5FA",
    prompts: [
      "What is Object Oriented ABAP?",
      "Difference between abstract class and interface.",
      "What is inheritance and polymorphism in ABAP?",
      "What are constructor and class constructor?",
      "What is exception class and TRY CATCH?",
      "Explain singleton pattern in ABAP.",
      "Explain factory pattern in ABAP.",
      "How do you make ABAP code testable?",
      "What is dependency injection in ABAP?",
      "How do you apply Clean ABAP principles?",
    ],
  },
  {
    slug: "cds-views",
    title: "CDS Views",
    icon: "Layers3",
    difficulty: "Advanced",
    description: "Core Data Services, annotations, associations, parameters, access control, and analytics.",
    color: "#C084FC",
    prompts: [
      "What is a CDS view in S/4HANA?",
      "Difference between CDS view and database view.",
      "What are CDS annotations?",
      "What is association in CDS view?",
      "Difference between association and join in CDS.",
      "What is parameterized CDS view?",
      "What is CDS access control and DCL?",
      "How do you expose CDS as OData?",
      "What are consumption views, interface views, and composite views?",
      "How do you troubleshoot CDS performance issues?",
    ],
  },
  {
    slug: "odata-gateway",
    title: "OData and Gateway",
    icon: "Radio",
    difficulty: "Advanced",
    description: "SEGW, CRUDQ operations, Gateway debugging, metadata, batch, errors, and Fiori integration.",
    color: "#FB923C",
    prompts: [
      "What is OData in SAP?",
      "How do you create an OData service using SEGW?",
      "Explain GET_ENTITY and GET_ENTITYSET.",
      "How do CREATE_ENTITY, UPDATE_ENTITY, and DELETE_ENTITY work?",
      "What is $filter, $select, $expand, and $top?",
      "How do you debug SAP Gateway service?",
      "How do you handle OData errors and messages?",
      "What is batch processing in OData?",
      "How do you register and activate OData service?",
      "How does Fiori consume OData services?",
    ],
  },
  {
    slug: "amdp-hana",
    title: "AMDP and HANA Optimization",
    icon: "Cpu",
    difficulty: "Expert",
    description: "SQLScript, AMDP classes, code pushdown, HANA views, execution plans, and optimization.",
    color: "#F87171",
    prompts: [
      "What is AMDP?",
      "Difference between AMDP and CDS view.",
      "What is SQLScript and why is it used?",
      "How do you call AMDP from ABAP?",
      "What is code pushdown in S/4HANA?",
      "How do you optimize SQL for HANA?",
      "What is PlanViz and when do you use it?",
      "How do you handle client field in AMDP?",
      "What are limitations of AMDP?",
      "How do you debug AMDP?",
    ],
  },
  {
    slug: "enhancements",
    title: "Enhancements",
    icon: "Puzzle",
    difficulty: "Intermediate",
    description: "User exits, customer exits, BAdIs, implicit/explicit enhancements, and upgrade-safe changes.",
    color: "#2DD4BF",
    prompts: [
      "What are enhancements in SAP ABAP?",
      "Difference between user exit, customer exit, and BAdI.",
      "What is implicit enhancement?",
      "What is explicit enhancement point and enhancement section?",
      "How do you find the right enhancement for a requirement?",
      "How do you debug a BAdI implementation?",
      "What is filter-dependent BAdI?",
      "How do you avoid modification in standard SAP?",
      "What are enhancement spots?",
      "How do enhancements impact S/4HANA migration?",
    ],
  },
  {
    slug: "forms-workflow",
    title: "Forms and Workflow",
    icon: "FileSignature",
    difficulty: "Intermediate",
    description: "Smart Forms, Adobe Forms, outputs, BRF+, workflows, agents, and troubleshooting.",
    color: "#A3E635",
    prompts: [
      "Difference between Smart Forms and Adobe Forms.",
      "How do you debug Smart Form?",
      "What are driver programs in forms?",
      "How do you handle output determination issues?",
      "What is BRF+ and where is it used?",
      "What is SAP Workflow?",
      "How do you troubleshoot workflow stuck issues?",
      "What is SWDD used for?",
      "How do you determine workflow agents?",
      "How do you fix form alignment issues in production?",
    ],
  },
  {
    slug: "s4hana",
    title: "S/4HANA",
    icon: "Sparkles",
    difficulty: "Advanced",
    description: "Simplification, migration impact, new data model, compatibility views, Fiori, and custom code remediation.",
    color: "#818CF8",
    prompts: [
      "What is S/4HANA and how is it different from ECC?",
      "What is simplification list in S/4HANA?",
      "How does MATDOC replace material document tables?",
      "What is ACDOCA and why is it important?",
      "What is custom code remediation during S/4HANA migration?",
      "How does S/4HANA impact ABAP performance practices?",
      "What are compatibility views?",
      "What is SAP Fiori integration in S/4HANA?",
      "What is RAP in S/4HANA?",
      "How do you prepare ABAP code for S/4HANA conversion?",
    ],
  },
  {
    slug: "support-debugging",
    title: "Support, Debugging and Basis Touchpoints",
    icon: "Bug",
    difficulty: "Advanced",
    description: "ST22, SM37, SM50, ST05, SAT, dumps, authorizations, transports, IDocs, RFC, SICF, and SOAMANAGER.",
    color: "#FB7185",
    prompts: [
      "How do you analyze a dump in ST22?",
      "How do you troubleshoot failed background job in SM37?",
      "How do you use ST05 SQL Trace?",
      "How do you use SAT runtime analysis?",
      "How do you debug RFC?",
      "How do you troubleshoot IDoc failure in WE02 and WE19?",
      "How do you fix authorization issue using SU53 and STAUTHTRACE?",
      "How do you analyze long running work process in SM50?",
      "How do transports move ABAP objects across systems?",
      "How do you troubleshoot SICF and SOAMANAGER service issues?",
    ],
  },
  {
    slug: "rap-bopf",
    title: "RAP, BOPF and Fiori",
    icon: "Rocket",
    difficulty: "Expert",
    description: "RAP basics, behavior definitions, service binding, BOPF basics, Fiori elements, and transactional apps.",
    color: "#E879F9",
    prompts: [
      "What is RESTful ABAP Programming Model?",
      "What are behavior definition and behavior implementation in RAP?",
      "Managed versus unmanaged RAP scenario.",
      "What is service definition and service binding?",
      "How do Fiori Elements use CDS annotations?",
      "What is BOPF and why was it used?",
      "Difference between BOPF and RAP.",
      "How do validations and determinations work in RAP?",
      "How do you expose a RAP business object as OData V4?",
      "How do you debug RAP behavior implementation?",
    ],
  },
  {
    slug: "module-pool",
    title: "Module Pool Programming",
    icon: "PanelTop",
    difficulty: "Intermediate",
    description: "Dialog programming, screens, PBO, PAI, table controls, tab strips, validations, and user actions.",
    color: "#38BDF8",
    prompts: [],
  },
  {
    slug: "bdc-data-migration",
    title: "BDC and Data Migration",
    icon: "Database",
    difficulty: "Intermediate",
    description: "BDC, call transaction, session method, recordings, error handling, upload programs, and migration basics.",
    color: "#4ADE80",
    prompts: [],
  },
];

const importedDocxPromptsByChapter: Record<string, string[]> = {
  "basic-abap": [
    "What is SAP?",
    "What is ERP based software?",
    "What is Three-Tier Architecture?",
    "What is RANGES in SAP ABAP?",
    "What is exception handling in SAP ABAP?",
    "What is CALL FUNCTION vs CALL METHOD?",
    "What are system variables in SAP ABAP?",
    "What are CLEAR, REFRESH, and FREE?",
  ],
  "data-dictionary": [
    "What is DDIC or Data Dictionary?",
    "What is the Tcode to create Data Dictionary objects?",
    "What is the Tcode to display Data Dictionary table data?",
    "What is Delivery Class?",
    "What is an Application Table?",
    "What is Master Data?",
    "What is Transaction Data?",
    "What is Data Browser and Table View Maintenance?",
    "What is Field in a table?",
    "What is MANDT?",
    "What is Client in SAP?",
    "What is Initial Value in Data Dictionary?",
    "What is Field Level?",
    "What is Check Table?",
    "What is Domain Value Range?",
    "What are Technical Settings?",
    "What is Data Class?",
    "What is Organization Data?",
    "What is Size Category?",
    "What is TMG?",
    "How to create Table Maintenance Generator?",
    "What is the Tcode for maintaining TMG data?",
    "Which table has one-to-one relation and many-to-one relation?",
    "What is the difference between Transparent Table and Cluster Table?",
    "What is the difference between Structure and Table in ABAP Dictionary?",
    "How many types of structures are there?",
    "Difference between Append Structure and Include Structure.",
    "What is Table Buffer?",
    "What is Index?",
    "What is View?",
    "What is Search Help?",
    "What is Lock Object?",
    "Why do we need Lock Objects?",
    "In lock object which function modules are used?",
    "What are the types of lock object or lock mode?",
  ],
  "internal-tables": [
    "How many types of internal tables are there in SAP ABAP?",
    "What is a work area and structure in SAP ABAP?",
    "What is the difference between a work area and a field symbol in ABAP?",
    "What is FOR ALL ENTRIES in SAP ABAP?",
    "What is the difference between FOR ALL ENTRIES and INNER JOIN in SAP ABAP?",
    "How many types of joins are there in SAP ABAP?",
    "How can I count the number of lines in an internal table?",
    "How do you declare an Internal Table and Work Area?",
    "What is the use of APPEND, INSERT, MODIFY, READ, DELETE in internal tables?",
    "How to find the maximum value in an internal table?",
    "What is the difference between LOOP and READ TABLE in SAP ABAP?",
  ],
  "selection-screens": [
    "What is the difference between SELECT-OPTIONS and PARAMETERS in SAP ABAP?",
    "Can SELECT-OPTIONS handle ranges?",
    "Which function module is used for F4 help?",
  ],
  "reports-alv": [
    "What is a report in SAP ABAP?",
    "How to display grid in ABAP?",
    "How many events are there in Classical Report and ALV Report?",
    "What is the use of TOP-OF-PAGE event in classical reports?",
    "How many events are there in Interactive Report?",
    "What are the different types of reports in ABAP?",
  ],
  ooabap: [
    "What is the difference between a function module and a subroutine in ABAP?",
    "What are the types of Modularization techniques in ABAP?",
    "What is the difference between CALL FUNCTION and PERFORM?",
  ],
  "forms-workflow": [
    "What is a Smart Form in SAP ABAP?",
    "What is the transaction code for Smart Forms?",
    "What is the transaction code for Style Sheet?",
    "How do you create a SmartForm?",
    "How many types of windows are there in SAP SmartForms?",
    "What is the Main Window in SmartForms?",
    "What is a Secondary Window in SmartForms?",
    "What is a Copy Window in SmartForms?",
    "What is a Final Window in SmartForms?",
    "What is the difference between Main Window and Secondary Window in SmartForms?",
    "What is the difference between Copy Window and Final Window in SmartForms?",
    "What is the difference between Table and Template in SmartForms?",
    "How do you upload a logo and barcode in SmartForms?",
    "In the driver program, which function do we use to call a SmartForm?",
    "Which function module do we use to generate a PDF from a SmartForm?",
  ],
  "module-pool": [
    "How many events are there in Module Pool Programming?",
    "What is the difference between PBO and PAI in Module Pool Programming?",
    "What is the ADD EXIT command in Module Pool Programming?",
    "What is the use of CHAIN and ENDCHAIN in Module Pool Programming?",
    "What is the Table Control Wizard in Module Pool Programming?",
    "What is the Tab Strip Wizard in Module Pool Programming and how do you use it?",
  ],
  "bdc-data-migration": [
    "What is BDC in SAP ABAP?",
    "What are the different methods of BDC?",
    "What is the difference between Call Transaction and Session Method?",
    "What is the transaction code to record a BDC?",
    "What is the structure used for BDC data?",
    "What are the key function modules used in BDC?",
    "How do you handle errors in BDC?",
    "What are the modes in CALL TRANSACTION?",
    "Can BDC be used for custom transactions?",
    "What are the limitations of BDC?",
  ],
};

const extraPrompts = [
  "How do you explain {topic} to a functional consultant?",
  "What changes in {topic} for S/4HANA?",
  "What common mistakes do developers make in {topic}?",
  "How do you test {topic} before moving to production?",
  "What interviewer trap questions are common in {topic}?",
  "How do you document {topic} technical design?",
  "How do you estimate effort for a {topic} requirement?",
  "Which SAP transactions are commonly connected with {topic}?",
  "What follow-up questions can come from {topic}?",
  "How do you explain {topic} with a small code example?",
  "What is the best interview answer for {topic}?",
];

const practicalExperiencePrompts = [
  "What real-time project work should an ABAP developer explain for {topic}?",
  "How do you handle production incident for {topic}?",
  "What real-time ticket have you solved related to {topic}?",
  "How do you debug {topic} issue end to end?",
  "What performance problem can happen in {topic}?",
  "What authorization issue can appear in {topic}?",
  "How do you transport {topic} changes safely?",
  "What practical interview answer should you give for {topic}?",
  "How do you handle urgent support escalation in {topic}?",
  "How do you explain FS to TS conversion for {topic}?",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function cleanTopic(prompt: string) {
  return prompt
    .replace(/\?$/, "")
    .replace(/^which sap transactions are commonly (connected with|used for)\s+/i, "SAP transactions for ")
    .replace(/^what is\s+/i, "")
    .replace(/^what are\s+/i, "")
    .replace(/^explain\s+/i, "")
    .replace(/^how do you\s+/i, "")
    .replace(/^difference between\s+/i, "difference between ")
    .replace(/^when should you use\s+/i, "")
    .replace(/^when do you use\s+/i, "")
    .trim();
}

function inferTags(prompt: string, chapter: ChapterSeed) {
  const base = [chapter.title, chapter.slug, "ABAP", "S/4HANA"];
  const keywords = ["CDS", "OData", "AMDP", "RAP", "ST05", "SAT", "ALV", "IDoc", "Workflow", "Enhancement", "Debugging"];
  return [...base, ...keywords.filter((keyword) => prompt.toLowerCase().includes(keyword.toLowerCase()))];
}

function isModernSapRelevant(chapterSlug: string, prompt: string) {
  const normalized = `${chapterSlug} ${prompt}`.toLowerCase();
  return [
    "s4hana",
    "cds",
    "odata",
    "gateway",
    "amdp",
    "hana",
    "rap",
    "bopf",
    "fiori",
    "alv",
    "report",
    "performance",
    "internal table",
    "sql",
  ].some((keyword) => normalized.includes(keyword));
}

const chapterDetectionRules: Array<{ slug: string; keywords: string[] }> = [
  { slug: "cds-views", keywords: ["cds", "annotation", "association", "dcl", "view entity"] },
  { slug: "odata-gateway", keywords: ["odata", "gateway", "segw", "entityset", "$filter", "fiori service"] },
  { slug: "reports-alv", keywords: ["alv", "report", "field catalog", "spool", "layout"] },
  { slug: "amdp-hana", keywords: ["amdp", "hana", "sqlscript", "planviz", "pushdown", "code pushdown"] },
  { slug: "enhancements", keywords: ["badi", "exit", "enhancement", "implicit", "explicit"] },
  { slug: "forms-workflow", keywords: ["smartform", "adobe", "workflow", "brf", "swdd", "output"] },
  { slug: "internal-tables", keywords: ["internal table", "hashed", "sorted", "standard table", "field symbol", "parallel cursor"] },
  { slug: "data-dictionary", keywords: ["se11", "domain", "data element", "lock object", "search help", "table"] },
  { slug: "support-debugging", keywords: ["st22", "sm37", "st05", "sat", "sm50", "we02", "we19", "su53", "dump", "debug"] },
  { slug: "rap-bopf", keywords: ["rap", "bopf", "behavior", "service binding", "odata v4"] },
  { slug: "s4hana", keywords: ["s/4hana", "acdoca", "matdoc", "simplification", "migration"] },
  { slug: "ooabap", keywords: ["class", "interface", "singleton", "factory", "ooabap", "constructor"] },
  { slug: "selection-screens", keywords: ["selection-screen", "parameter", "select-options", "modif", "f4"] },
];

export function detectChapterForQuestion(question: string) {
  const normalized = question.toLowerCase();
  const match = chapterDetectionRules.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword.toLowerCase())),
  );
  return match?.slug ?? "basic-abap";
}

function buildFollowups(prompt: string, chapter: ChapterSeed, index: number): Followup[] {
  const core = [
    `Can you explain ${prompt.replace(/\?$/, "").toLowerCase()} with a real project example?`,
    `What can go wrong in production for ${chapter.title}?`,
    `How would you debug this if the user says output is wrong?`,
    `What is the S/4HANA impact and HANA optimization angle?`,
    `Which SAP transactions or tables would you check first?`,
    `What would be your answer as a project-ready ABAP developer?`,
    `What is the performance risk and how would you prove it with ST05 or SAT?`,
    `What follow-up trap question can the interviewer ask here?`,
  ];

  if (chapter.slug === "internal-tables") {
    core.push(
      "Difference between standard, sorted, and hashed tables?",
      "When is binary search incorrect?",
      "How do field symbols reduce copying?",
      "How do parallel cursor and secondary keys compare?",
    );
  }

  return core.map((item, itemIndex) => ({
    id: `${chapter.slug}-${index}-fu-${itemIndex}`,
    prompt: item,
    category: itemIndex % 3 === 0 ? "Scenario" : itemIndex % 3 === 1 ? "Trap" : "Deep Dive",
    difficulty: itemIndex > 4 ? "Advanced" : chapter.difficulty,
  }));
}

function buildAnswer(prompt: string, chapter: ChapterSeed): QuestionAnswer {
  const topic = prompt.replace(/\?$/, "");
  const topicName = cleanTopic(prompt);
  const isSapAbapIntro = prompt === "What is SAP ABAP and where is it used?";
  const isTransactionQuestion = /^Which SAP transactions are commonly/i.test(prompt);
  const tableHints = ["MARA", "MARC", "VBAK", "VBAP", "EKKO", "EKPO", "BKPF", "BSEG", "ACDOCA", "MATDOC", "USR02", "TADIR", "TRDIR", "EDIDC", "EDIDS"];
  const mentorIntro = `Samjho agar interview me aapse "${prompt}" poocha jaaye, toh interviewer sirf definition nahi sunna chahta. Woh dekhna chahta hai ki aap ${topicName} ko real SAP system, client requirement, debugging, performance, support pressure, aur S/4HANA impact ke saath connect kar paate ho ya nahi.`;
  const code = `DATA lt_result TYPE STANDARD TABLE OF mara.\nSELECT matnr, mtart, meins\n  FROM mara\n  INTO TABLE @lt_result\n  UP TO 20 ROWS.\nIF sy-subrc = 0.\n  LOOP AT lt_result ASSIGNING FIELD-SYMBOL(<row>).\n    \"Apply ${chapter.title} logic here\n  ENDLOOP.\nENDIF.`;
  const followupBank = [
    `Can you explain ${topicName} with a real project example?`,
    `What production issue can happen in ${topicName}?`,
    `How will you debug ${topicName} if output is wrong?`,
    `What is the performance angle in ${topicName}?`,
    `How does ${topicName} change in S/4HANA?`,
    `What would a project-ready ABAP developer say about ${topicName}?`,
    `Which SAP transaction or table will you check for ${topicName}?`,
    `What is the common trap question in ${topicName}?`,
  ].map((question, itemIndex) => ({
    question,
    hinglishExplanation: `Is follow-up ka simple matlab hai ki interviewer dekh raha hai aap ${topicName} ko sirf theory nahi, real project thinking ke saath explain kar sakte ho ya nahi. Pehle requirement bolo, phir system me kaunsi jagah check karoge woh batao, phir expected result and validation explain karo.`,
    interviewAnswer: `I would explain ${topicName} using a business scenario, identify the relevant ABAP object/table/API, validate with debugging or trace, handle errors, and confirm the S/4HANA/performance impact before transport.`,
    realtimeExplanation: `Real project me ${topicName} usually report, enhancement, OData/CDS exposure, support ticket, dump, authorization, job, ya performance issue ke form me aata hai. Developer ko functional input, test data, logs, and transport sequence clear rakhna hota hai.`,
    mistakes: `Weak answer: only definition. Strong answer: definition + example + debugging + performance + support validation. Common mistake is ST05/SAT/SU53/ST22 ka naam na lena jab scenario demands it.`,
    codeExample:
      itemIndex % 2 === 0
        ? `READ TABLE lt_result ASSIGNING FIELD-SYMBOL(<row>) WITH KEY matnr = lv_matnr.\nIF sy-subrc <> 0.\n  MESSAGE 'Material not found' TYPE 'E'.\nENDIF.`
        : `SELECT matnr, mtart\n  FROM mara\n  WHERE mtart = @p_mtart\n  INTO TABLE @DATA(lt_materials).`,
  }));
  const sapAbapIntroFollowups = [
    {
      question: "SAP aur ABAP mein difference kya hai?",
      hinglishExplanation:
        "SAP ek ERP/business software hai jisme company finance, HR, sales, purchase, inventory jaise processes manage karti hai. ABAP SAP ke andar development/customization karne ki programming language hai.",
      interviewAnswer:
        "SAP is an ERP software used to manage business processes, whereas ABAP is the programming language used to develop and customize applications inside SAP.",
      realtimeExplanation:
        "Real project me SAP standard process deta hai, aur agar client ko custom sales report, validation, invoice format, ya interface chahiye hota hai toh ABAP developer woh banata hai.",
      mistakes: "SAP ko language bolna ya ABAP ko ERP bolna wrong hai. Dono ka role clearly separate bolo.",
      codeExample: `REPORT zdemo_sales_report.\nWRITE: / 'Custom report created using ABAP inside SAP'.`,
    },
    {
      question: "ABAP kis type ka language hai?",
      hinglishExplanation:
        "ABAP SAP ka high-level programming language hai. Iska use business applications, reports, forms, interfaces, enhancements, and data migration programs banane ke liye hota hai.",
      interviewAnswer: "ABAP is a high-level programming language developed by SAP for business application development.",
      realtimeExplanation:
        "ABAP ka syntax business data ke saath kaam karne ke liye optimized hota hai, jaise database se sales/material/customer data read karna and report/form me show karna.",
      mistakes: "Sirf 'ABAP is programming language' bolkar stop mat karo. Use cases zaroor add karo.",
      codeExample: `DATA lv_message TYPE string.\nlv_message = 'ABAP is used for SAP custom development'.\nWRITE lv_message.`,
    },
    {
      question: "ABAP developer ka kaam kya hota hai?",
      hinglishExplanation:
        "ABAP developer business requirement ke according SAP me custom reports, forms, interfaces, enhancements, data upload programs, debugging, and support fixes karta hai.",
      interviewAnswer:
        "An ABAP developer develops reports, forms, interfaces, enhancements, data migration programs, and also supports debugging and production issue fixes in SAP.",
      realtimeExplanation:
        "Example: client ko monthly sales report chahiye, invoice print format change chahiye, ya save ke time validation chahiye. Ye sab ABAP developer handle karta hai.",
      mistakes: "ABAP developer ko sirf report developer mat bolo. Forms, interfaces, enhancements, support, debugging bhi mention karo.",
      codeExample: `SELECT vbeln, erdat\n  FROM vbak\n  INTO TABLE @DATA(lt_sales)\n  UP TO 10 ROWS.`,
    },
    {
      question: "Real-time mein ABAP kaha use kiya?",
      hinglishExplanation:
        "Real-time project me ABAP mostly reports, SmartForms/Adobe Forms, enhancements, debugging, BAPI/RFC/IDoc interfaces, and data upload/migration me use hota hai.",
      interviewAnswer:
        "In my project, I used ABAP for ALV reports, SmartForms, enhancements, debugging, and interface-related developments based on business requirements.",
      realtimeExplanation:
        "Sales team ko report, finance ko invoice, purchase team ko PO print, external system ko data transfer, ya production issue debugging - ye common ABAP work hota hai.",
      mistakes: "Agar experience hai toh 'I only learned in training' mat bolo. At least report, form, debugging, enhancement examples do.",
      codeExample: `CALL FUNCTION 'BAPI_MATERIAL_GET_DETAIL'\n  EXPORTING material = lv_matnr\n  IMPORTING material_general_data = ls_material.`,
    },
  ];
  const transactionFollowups = [
    {
      question: "SE38 aur SE80 me difference kya hai?",
      hinglishExplanation:
        "SE38 mainly report/program create, change, display, execute ke liye use hota hai. SE80 Object Navigator hai jahan package ke andar programs, classes, function groups, screens, and other objects ek jagah milte hain.",
      interviewAnswer:
        "SE38 is mainly used for ABAP report/program development, while SE80 is Object Navigator used to manage multiple repository objects in a package.",
      realtimeExplanation:
        "Project me simple report ke liye developer SE38 use kar sakta hai, but package-level development ya multiple related objects ke liye SE80 convenient hota hai.",
      mistakes: "SE38 aur SE80 ko same mat bolo. SE80 broader object navigation tool hai.",
      codeExample: `REPORT zbasic_report.\nWRITE: / 'Created from SE38 or opened from SE80'.`,
    },
    {
      question: "ST22, SM37, ST05, SAT kab use karte hain?",
      hinglishExplanation:
        "ST22 dump ke liye, SM37 background job ke liye, ST05 SQL trace ke liye, aur SAT ABAP runtime analysis ke liye use hota hai. Ye support interview me bahut important hain.",
      interviewAnswer:
        "I use ST22 for dump analysis, SM37 for background job failures, ST05 for SQL trace, and SAT for ABAP runtime/performance analysis.",
      realtimeExplanation:
        "Agar user bole report dump ho raha hai toh ST22. Job fail hai toh SM37. Report slow hai toh ST05/SAT. Isse interviewer ko lagta hai ki aap support-ready ho.",
      mistakes: "Performance issue me sirf debug bolna weak answer hai. ST05/SAT mention karo.",
      codeExample: `SELECT matnr\n  FROM mara\n  INTO TABLE @DATA(lt_mara).\n\"If slow, analyze SQL in ST05 and runtime in SAT.`,
    },
    {
      question: "SE11 aur SE16N me difference kya hai?",
      hinglishExplanation:
        "SE11 Data Dictionary object design ke liye hai: table, structure, data element, domain. SE16N table data display/check karne ke liye hai.",
      interviewAnswer:
        "SE11 is used to create or display Data Dictionary objects, while SE16N is used to display table data.",
      realtimeExplanation:
        "Requirement me table fields samajhne ke liye SE11; actual records verify karne ke liye SE16N use hota hai.",
      mistakes: "SE16N ko table create tcode mat bolo. Table create/design SE11 se hota hai.",
      codeExample: `SELECT SINGLE matnr\n  FROM mara\n  INTO @DATA(lv_matnr).`,
    },
    {
      question: "SE37, SE24, SE93 kis kaam ke liye use hote hain?",
      hinglishExplanation:
        "SE37 function modules ke liye, SE24 classes/methods ke liye, aur SE93 custom transaction code create karne ke liye use hota hai.",
      interviewAnswer:
        "SE37 is for function modules, SE24 is for ABAP classes, and SE93 is for creating or maintaining transaction codes.",
      realtimeExplanation:
        "Agar interface/BAPI/FM test karna hai toh SE37. OOABAP class dekhni hai toh SE24. Custom report ko transaction code dena hai toh SE93.",
      mistakes: "BAPI/function module test ke liye SE38 bolna weak answer hai. SE37 mention karo.",
      codeExample: `CALL FUNCTION 'BAPI_TRANSACTION_COMMIT'\n  EXPORTING wait = abap_true.`,
    },
  ];

  return {
    simpleAnswer: `${topicName} is an interview-critical ABAP concept. Explain the purpose first, then mention where it is used, what problem it solves, and one project-safe example.`,
    detailedAnswer: `For ${topicName}, start with definition, then implementation flow, runtime behavior, and limitations. A strong answer connects business requirement, ABAP object design, database impact, testing, transport, and support ownership. In interviews, avoid only textbook lines; add what you checked in the system and why.`,
    hinglishExplanation: `Interview me agar "${prompt}" aaye toh bolo: simple terms me ${topicName} real SAP requirement ko efficiently solve karne ke liye use hota hai. Pehle requirement samjho, phir correct ABAP/S/4HANA object choose karo, debug karke validate karo, aur performance plus authorization ka dhyan rakho.`,
    realInterviewExplanation: `A practical answer: "In my project, I would analyze the functional requirement, identify relevant SAP tables or APIs, build the ABAP object with reusable logic, test with positive and negative data, run ST05/SAT if data volume is high, and move through transport after peer review."`,
    fresherExplanation: `As a fresher, define ${topic}, mention the syntax or object involved, and give one small example. Say clearly that you understand the concept and know how to debug it in a development system.`,
    twoYearsExperiencedAnswer: `For a project-ready profile, add ownership: requirement clarification, technical design, coding, unit testing, peer review, transport, post-deployment validation, and support. Mention one incident or enhancement where ${topic} mattered.`,
    s4hanaPerspective: `In S/4HANA, prefer released APIs, CDS views, code pushdown, modern Open SQL, and clean extension approaches. Check simplification impact, compatibility views, and whether old table assumptions still hold.`,
    realtimeProjectScenario: `Client asks for a report or enhancement involving ${topic}. You gather inputs, identify tables/APIs, prepare technical design, implement with test data, validate with business users, and document edge cases.`,
    productionSupportScenario: `A user reports incorrect output or failure. Reproduce with user inputs, check job logs or dumps, debug the failing path, compare database records, verify authorization, fix root cause, and communicate impact.`,
    debuggingScenario: `Set an external/session breakpoint, reproduce the flow, inspect SY-SUBRC, internal table contents, SQL result, BAdI/user exit triggers, and message handling. For service flows, debug Gateway/RFC/background context as needed.`,
    performanceConsiderations: `Avoid SELECT inside LOOP, reduce database round trips, use keys correctly, fetch only required columns, prefer joins/CDS where appropriate, check indexes, and verify with ST05, SQL Monitor, or SAT before claiming improvement.`,
    bestPractices: `Use meaningful names, small methods, typed structures, exception handling, authorization checks, testable logic, transport discipline, and Clean ABAP. Prefer standard APIs/BAdIs over modifications.`,
    commonMistakes: `Common mistakes include memorized definitions without scenario, missing SY-SUBRC handling, ignoring authorization, hardcoding values, overfetching data, not checking S/4HANA table changes, and no unit/support testing story.`,
    trapQuestions: [
      `What is the biggest limitation of ${topic}?`,
      `How would your answer change if the data volume is ten million records?`,
      "How do you prove this is not an authorization issue?",
      "What would you check after transport import?",
    ],
    crossQuestions: [
      `How is ${topic} related to debugging?`,
      `How is ${topic} related to performance tuning?`,
      "Which transaction would you use first and why?",
      "What is the S/4HANA migration impact?",
    ],
    followupQuestions: [
      `Give a real-time scenario for ${topic}.`,
      `What production issue can happen in ${topic}?`,
      `How do you test ${topic}?`,
      `How do you explain ${topic} to a non-technical stakeholder?`,
    ],
    hrStyleExplanation: `This answer shows ownership, clarity, and calm problem solving. It tells the interviewer you can learn, communicate with functional teams, and handle production pressure responsibly.`,
    technicalDeepDive: `Deep dive areas: runtime call stack, database access pattern, locks/LUW, update task behavior, authorization objects, transport dependencies, error logging, and how the object behaves under high volume.`,
    codeExamples: code,
    outputExamples: `Expected output should show correct business fields, stable sorting, no duplicate unintended records, clear messages, and graceful handling when no data is found.`,
    realSapTableExamples: `Useful tables/objects to mention: ${tableHints.join(", ")}. Choose only those relevant to the module and requirement.`,
    realClientRequirementExample: `Client requirement: create or fix a process where ${topic} supports faster month-end, sales, procurement, finance, or master data activity with audit-safe output.`,
    realtimeTicketExample: `Ticket example: "User gets wrong value after recent transport." You check transport changes, reproduce input, debug calculation, compare old/new logic, test regression, and share RCA.`,
    interviewTips: `Answer in this order: definition, business use, technical flow, project scenario, debugging, performance, S/4HANA angle, and one mistake to avoid.`,
    interviewerExpectations: `The interviewer expects clarity, system awareness, correct transaction names, performance thinking, and proof that you can work beyond syntax.`,
    whatNotToSay: `Do not say "I only know theory" or "Basis will handle everything." Do not claim performance improvement without trace evidence.`,
    commonRejectionReasons: `Rejections usually happen when answers are vague, no project scenario is given, debugging steps are missing, or the candidate cannot handle follow-up pressure.`,
    advancedFollowupQuestions: [
      `How would you redesign ${topic} for S/4HANA public cloud restrictions?`,
      `How would you expose this through CDS/OData/Fiori?`,
      `How do locks, LUW, and update task affect this?`,
      `How would you monitor this after go-live?`,
    ],
    s4hanaMigrationImpact: `During migration, run custom code checks, replace obsolete table assumptions, review enhancements, validate SQL performance on HANA, and align with clean core principles.`,
    hanaOptimizationConcepts: `Use set-based operations, push aggregation/filtering to the database, avoid row-by-row processing, use modern Open SQL/CDS, and validate execution plan.`,
    relatedCdsConcepts: `Related CDS concepts include annotations, associations, parameters, DCL authorization, consumption views, analytical annotations, and OData exposure.`,
    relatedOdataConcepts: `Related OData concepts include entity sets, metadata, CRUDQ methods, $filter, $expand, batch, Gateway error handling, and Fiori consumption.`,
    relatedEnhancementConcepts: `Related enhancement concepts include BAdI, user exit, customer exit, implicit enhancement, enhancement spot, filters, and upgrade-safe extension.`,
    relatedPerformanceTuningConcepts: `Related tuning tools and ideas: ST05, SAT, SQL Monitor, indexes, buffering, FOR ALL ENTRIES hygiene, parallel cursor, hashed tables, and avoiding SELECT in LOOP.`,
    relatedAuthorizationConcepts: `Check SU53, STAUTHTRACE, authority-check statements, role design, CDS DCL, Gateway authorization, and missing organizational values.`,
    relatedDebuggingConcepts: `Use session/external breakpoints, update debugging, RFC debugging, background debugging, watchpoints, call stack, and SQL trace correlation.`,
    relatedTransportConcepts: `Check object dependencies, transport sequence, customizing versus workbench, retrofit conflicts, import logs, and post-import validation.`,
    relatedSupportIssueExamples: `Support issues: dump, wrong output, missing authorization, slow job, locked object, failed IDoc, inactive service, failed form output, or regression after transport.`,
    relatedProductionIssueFixes: `Fix with RCA, targeted code/config change, regression test, transport approval, deployment communication, post-import validation, and monitoring.`,
    easyUnderstanding: isTransactionQuestion
      ? `Is question ka simple matlab hai: interviewer dekhna chahta hai ki aapko ABAP development ke common T-codes pata hain ya nahi.\n\nBasic ABAP me ye transactions interview ke liye important hain:\n\n- SE38: ABAP report/program create aur execute karne ke liye\n- SA38: Program execute karne ke liye\n- SE80: Object Navigator, package/program/class/function group dekhne ke liye\n- SE11: Data Dictionary, table, structure, data element, domain ke liye\n- SE16N / SE16: Table data display karne ke liye\n- SE37: Function Module ke liye\n- SE24: Class Builder / OOABAP ke liye\n- SE93: Transaction code create karne ke liye\n- ST22: Dump analysis ke liye\n- SM37: Background job check karne ke liye\n- ST05: SQL trace ke liye\n- SAT: Runtime analysis ke liye\n\nBachhe ko simple way me samjhao toh: ABAP developer ke paas ye tools hain. Coding ke liye SE38/SE80, table ke liye SE11/SE16N, function ke liye SE37, class ke liye SE24, issue/debug/performance ke liye ST22, SM37, ST05, SAT.`
      : isSapAbapIntro
      ? `SAP ek bahut bada business software hai jo companies apna business manage karne ke liye use karti hain, jaise:\n\n- Finance\n- HR\n- Sales\n- Purchase\n- Inventory\n- Manufacturing\n\nABAP ka full form hota hai:\n\nAdvanced Business Application Programming\n\nYe SAP ka programming language hai.\n\nSimple words mein:\n\n"SAP software ke andar jo customization, reports, logic, forms, interfaces, ya development hota hai, wo mostly ABAP se kiya jata hai."\n\nMatlab:\n- SAP business process ko handle karta hai.\n- ABAP SAP ke andar custom development karta hai.`
      : `${mentorIntro}\n\nZero level se samjho: SAP me business process jaise sales, purchase, finance, inventory, HR wagairah ka data system me store hota hai. ABAP developer ka kaam hota hai us data ko business requirement ke according read, validate, process, display, expose, ya enhance karna. ${topicName} isi learning path ka important part hai.\n\nAap answer start karte waqt pehle simple meaning bolo. Phir bolo ki project me iska use kaha hota hai. Last me ek line add karo: "I will validate this through debugging, authorization check, and performance trace if data volume is high." Yeh line answer ko mature bana deti hai.`,
    hinglishMasterExplanation: isTransactionQuestion
      ? `Maan lo tum ABAP developer ho. Tumhe kaam karne ke liye SAP me alag-alag rooms/tools milte hain. Har T-code ek tool ki tarah hota hai.\n\nAgar report banana hai toh SE38 ya SE80 use karoge.\nAgar table, data element, domain, structure dekhna hai toh SE11 use karoge.\nAgar table ka data dekhna hai toh SE16N use karoge.\nAgar function module test karna hai toh SE37 use karoge.\nAgar class/method dekhna hai toh SE24 use karoge.\nAgar custom T-code banana hai toh SE93 use karoge.\nAgar production me dump aaya toh ST22.\nAgar background job fail hua toh SM37.\nAgar report slow hai toh ST05 aur SAT.\n\nInterview me bas itna clear bolna hai ki ABAP developer ko development, dictionary, debugging, job, dump, and performance related transactions ka practical idea hona chahiye.`
      : isSapAbapIntro
      ? `Real life example se samjho.\n\nMaan lo ek company products sell karti hai. Us company ko SAP me bahut saare kaam chahiye hote hain:\n\n- Sales report chahiye\n- Invoice print karna hai\n- Automatic email bhejna hai\n- Excel se data upload/download karna hai\n- Custom screen banana hai\n- Save karte time validation lagana hai\n\nYe sab kaam ABAP developer karta hai.\n\nABAP kaha use hota hai?\n\n1. Custom Reports banane mein\nExamples:\n- Monthly sales report\n- Employee salary report\n- Stock report\nTransactions: SE38, SA38\n\n2. Forms / Invoice print karne mein\nExamples:\n- Invoice\n- Purchase Order\n- Delivery Note\nTechnologies: SmartForms, SAP Scripts, Adobe Forms\n\n3. Interfaces mein\nDusre systems ke saath SAP connect karne ke liye.\nExamples:\n- SAP to Bank\n- SAP to Website\n- SAP to Mobile App\nTechnologies: IDoc, RFC, BAPI, Web Services\n\n4. Enhancements / Custom Logic mein\nAgar company ko SAP standard behavior me extra validation ya custom logic chahiye.\nExamples:\n- Save karte time validation\n- Extra approval process\nTechnologies: User Exit, BAdI, Enhancement\n\n5. Data Upload / Migration mein\nExcel ya legacy system se SAP me data lana.\nExamples:\n- Customer master upload\n- Material upload\nTechnologies: BDC, LSMW, BAPI\n\nEasy yaad rakhne wali line:\n"SAP business chalata hai, aur ABAP us business requirement ke according customization karta hai."`
      : `Is question ko interview ke hisaab se samjho. Pehle simple definition do, phir ek practical use case do, aur last me batao ki project me aap isko kaise validate/debug karoge.\n\nSimple Hinglish flow:\n"Sir/Ma'am, ${topicName} ka matlab yeh hai ki SAP me business requirement ko technically handle karne ke liye hume correct object, table, logic, validation aur testing ka dhyan rakhna hota hai. Real project me main pehle requirement samajhta hoon, then relevant SAP object identify karta hoon, code/test karta hoon, aur issue aaye toh debug/trace se root cause find karta hoon."\n\nBas itna interview ke liye enough hai: definition + where used + real example + debugging/performance awareness.`,
    interviewMeKyaBolnaHai: isTransactionQuestion
      ? `Interview Me Aap Aise Bol Sakte Ho:\n\n"Common SAP ABAP transactions are SE38 and SA38 for reports, SE80 for Object Navigator, SE11 for Data Dictionary, SE16N for table data display, SE37 for function modules, SE24 for classes, and SE93 for creating transaction codes. For support and debugging, we commonly use ST22 for dumps, SM37 for background jobs, ST05 for SQL trace, and SAT for runtime analysis."\n\nShort answer:\n"Development ke liye SE38/SE80/SE11, function/class ke liye SE37/SE24, aur support-performance ke liye ST22, SM37, ST05, SAT important hote hain."`
      : isSapAbapIntro
      ? `Interview Me Aap Aise Bol Sakte Ho:\n\nShort Professional Answer:\n"SAP ABAP is the programming language of SAP which is used for developing custom business applications inside SAP. It is mainly used for creating reports, forms, interfaces, enhancements, and data migration programs according to business requirements."\n\nAgar interviewer bole "Explain in simple words":\n"SAP ek ERP software hai aur ABAP uska programming language hai. Company ke requirement ke according custom report, invoice, interface, ya logic banana hota hai, wo ABAP developer karta hai."\n\nExperienced Style Answer:\n"In my project, I used ABAP for developing ALV reports, SmartForms, enhancements, debugging, and interface-related developments. ABAP helps businesses customize SAP according to their process requirements."`
      : `Interview Me Aap Aise Bol Sakte Ho:\n\n"${topicName} is an important SAP ABAP concept. In projects, I first understand the business requirement, identify the relevant SAP object or table, implement the required logic with validations and error handling, and test it with proper data. If an issue comes in support, I debug the flow, check logs or dumps if needed, and verify performance with ST05 or SAT for high-volume cases."\n\nShort confident answer:\n"${topicName} ko main definition, real project use, debugging, and support validation ke saath explain kar sakta hoon."`,
    interviewerKyaSochtaHai: `Interviewer Mindset:\nInterviewer ${topicName} me yeh check karta hai ki candidate ko concept samajh aaya hai ya sirf ratta maara hai. Usko yeh sunna hota hai ki aap requirement samajh sakte ho, correct SAP object choose kar sakte ho, issue debug kar sakte ho, aur production me responsible behavior rakhte ho.\n\nInterviewer kya expect karta hai:\n- Clear definition without confusion.\n- One real-time use case.\n- Debugging path.\n- Performance awareness.\n- S/4HANA/CDS/OData connection when relevant.\n\nCandidate kaha reject hota hai:\n- Sirf book definition bolta hai.\n- Project example nahi deta.\n- SY-SUBRC, authorization, transport, dumps, job logs, ST05/SAT jaise practical points miss karta hai.\n- "I have not worked on it" bolkar answer close kar deta hai.\n\nInterview me kya bolna hai:\n"Sir/Ma'am, main ${topicName} ko sirf theory ke level par nahi dekhta. Main isko requirement, implementation, debugging, performance, support validation, aur S/4HANA impact ke saath explain kar sakta hoon."`,
    realtimeProjectExplanation: `Real Project:\nImplementation example: Client asks for a report/enhancement/service related to ${topicName}. Developer FS padhta hai, TS me logic likhta hai, relevant objects identify karta hai, unit test cases banata hai, and functional testing ke baad transport move karta hai.\n\nSupport example: User bolta hai output wrong hai ya job fail hua. Aap input reproduce karte ho, logs/dumps check karte ho, breakpoint lagate ho, data compare karte ho, authorization verify karte ho, then RCA and fix provide karte ho.\n\nClient requirement example: "Business wants faster and accurate output for master/transaction data with audit-safe messages." Aap performance, validation, and error handling ke saath solution dete ho.\n\nProduction issue example: Recent transport ke baad regression aaya. You compare object versions, check import logs, debug changed logic, test fix, and share RCA.\n\nInterview me kya bolna hai:\n"In my project, I would first understand the FS, prepare TS, identify relevant objects, implement modular logic, test with business data, and validate after transport. If production issue comes, I will reproduce, debug, check logs/traces, fix root cause, and share RCA."`,
    twoYearsExperienceQuestions: `Project Practical Q&A:\n1. Aapne ${topicName} real project me kaha use kiya?\nAnswer: Requirement explain karo, object ka naam bolo, tables/API/CDS mention karo, testing and transport validation add karo.\n\n2. ${topicName} me production issue kaise handle kiya?\nAnswer: Ticket reproduce, logs/dump/job/spool check, debug, root cause, fix, regression test, RCA.\n\n3. ${topicName} ka performance issue kaise identify karoge?\nAnswer: ST05 for SQL trace, SAT for ABAP runtime, SELECT inside LOOP, missing WHERE, large internal table, wrong key usage check karunga.\n\n4. ${topicName} related debugging ka exact flow kya hai?\nAnswer: Breakpoint, input data, SY-SUBRC, internal table, call stack, message variables, authorization, and DB trace.\n\n5. Transport ke baad issue aaye toh kya check karoge?\nAnswer: Import log, object activation, dependent objects, customizing, variant/service activation, and regression data.\n\nInterview me kya bolna hai:\n"I can handle requirement analysis, coding, debugging, unit testing, transport movement, and post-production support for ${topicName}."`,
    s4hanaHanaCdsOdataConnection: isModernSapRelevant(chapter.slug, prompt)
      ? `S/4HANA + CDS + OData Connection:\n- S/4HANA: obsolete table assumptions avoid karo, simplification list/custom code checks dekho.\n- HANA: set-based logic, fewer DB round trips, projection/filter pushdown, modern Open SQL.\n- CDS: reporting/data model ke liye CDS view, annotations, associations, DCL authorization.\n- OData/Fiori: CDS or SEGW/RAP service se UI integration possible.\n- Clean core: standard API/BAdI/released object prefer karo.\n\n${chapter.title} chapter me interviewer yeh dekh sakta hai ki aap old ABAP and modern S/4HANA thinking ko connect kar paate ho ya nahi.\n\nInterview me kya bolna hai:\n"In S/4HANA, I will not blindly use old table logic. I will check simplification impact, use modern Open SQL/CDS where suitable, push filtering to HANA, and expose data through OData/RAP if Fiori integration is required."`
      : "",
    codeWalkthrough: `Code walkthrough:\n${code}\n\nLine by line:\n1. DATA lt_result TYPE STANDARD TABLE OF mara. Temporary internal table create hoti hai jisme MARA ka selected data memory me rahega.\n2. SELECT matnr, mtart, meins FROM mara. Sirf required columns select kar rahe hain; SELECT * avoid karna best practice hai.\n3. INTO TABLE @lt_result. Database result internal table me aata hai.\n4. UP TO 20 ROWS. Demo me limit lagayi hai; production me business WHERE condition mandatory hoti hai.\n5. IF sy-subrc = 0. Data mila ya nahi, yeh check karte hain.\n6. LOOP AT ... ASSIGNING FIELD-SYMBOL. Field symbol copy avoid karta hai, large data me better hota hai.\n\nInterviewer asks: SELECT * kyu avoid? SY-SUBRC kyu check? LOOP me SELECT kyu wrong? Field symbol ka benefit? HANA me filter database par push karoge ya ABAP me?`,
    debuggingSection: `Debugging:\n- Reproduce exact input from user/ticket.\n- Breakpoint set karo: report, method, function module, BAdI, OData DPC_EXT, update task, or RFC as needed.\n- Check SY-SUBRC, internal table rows, key fields, message variables, authorization result.\n- ST22: dump aaye toh exception, include/program, line number, and short text check karo.\n- SM37: background job fail ho toh job log, spool, variant, user, and step program check karo.\n- ST05: slow SQL, missing WHERE, full table scan, repeated SELECT inside LOOP pakadne ke liye.\n- SAT: ABAP runtime bottleneck, expensive loops, methods, and DB time ratio ke liye.\n\nCommon dumps: CX_SY_ITAB_LINE_NOT_FOUND, TSV_TNEW_PAGE_ALLOC_FAILED, DBSQL_SQL_ERROR, MESSAGE_TYPE_X, conversion errors.\n\nInterview me kya bolna hai:\n"I will reproduce the issue, debug with the same input, check SY-SUBRC and data flow, analyze ST22/SM37 if failure happened, and use ST05/SAT if it is slow."`,
    supportProjectSection: `Support Project:\nTicket examples:\n- Output wrong after transport.\n- Background job failed in SM37.\n- User gets authorization error; check SU53/STAUTHTRACE.\n- Report is slow; check ST05/SAT.\n- Spool not generated or layout wrong.\n- OData service inactive; check SICF/Gateway.\n- IDoc failed; check WE02/WE19.\n\nUrgent fix flow: acknowledge ticket, reproduce, assess business impact, debug root cause, prepare fix, regression test, get approval, move transport, validate production, share RCA.\n\nTransport issues: missing dependent object, wrong sequence, inactive object, customizing not moved, or post-import variant/service activation missed.\n\nInterview me kya bolna hai:\n"In support, I first reproduce the issue and check business impact. Then I analyze logs, dumps, authorization, job/spool/trace details, fix root cause, test regression, and provide RCA with preventive action."`,
    implementationProjectSection: `Implementation:\nFS to TS understanding:\n- Read business process, input/output, validations, error messages, roles, volume, and frequency.\n- Convert FS into technical objects: report/class/CDS/OData/BAdI/form/workflow/job.\n- Identify tables/APIs and authorization objects.\n- Design enhancement logic without modifying standard SAP.\n- Build unit test cases: positive, negative, no data, high volume, authorization, and regression.\n- Deployment: peer review, ATC/SCI if applicable, transport sequencing, UAT sign-off, production validation.\n\nInterview me kya bolna hai:\n"I do not start coding immediately. I first understand FS, prepare TS, clarify open points, design the ABAP object, write modular code, perform unit testing, support UAT, and validate production after deployment."`,
    memoryTricks: isSapAbapIntro
      ? `Easy Yaad Karne Wala Line:\n"SAP business chalata hai, aur ABAP us business requirement ke according customization karta hai."\n\nQuick memory:\n- SAP = ERP/business software\n- ABAP = SAP ki programming language\n- ABAP developer = Reports + Forms + Interfaces + Enhancements + Data Migration + Debugging\n\nInterview shortcut:\nR-F-I-E-D yaad rakho:\n- Reports\n- Forms\n- Interfaces\n- Enhancements\n- Data migration`
      : `Memory tricks:\n- D-P-P-S formula: Definition, Project, Performance, Support.\n- 5-check interview close: Debugging, ST22, ST05/SAT, Authorization, Transport.\n- For S/4HANA: Simplification, CDS, Pushdown, Clean core.\n- For any answer: "What it is, where used, issue faced, how debugged, how optimized."\n\nQuick revision note: Never end with only theory. Add one project sentence and one troubleshooting sentence.`,
    aiMentorPrompt: `Act as my senior SAP ABAP mentor. Explain ${topicName} slowly in Hinglish, ask me one trap question, improve my answer, convert it into polished interview language, and connect it with S/4HANA, CDS, OData, debugging, support, and performance.`,
    followupAnswerBank: isTransactionQuestion ? transactionFollowups : isSapAbapIntro ? sapAbapIntroFollowups : followupBank,
  };
}

function expandPrompts(seed: ChapterSeed) {
  const topic = seed.title.replace(/ Questions$/i, "");
  return [
    ...seed.prompts,
    ...extraPrompts.map((prompt) => prompt.replace("{topic}", topic)),
    ...(importedDocxPromptsByChapter[seed.slug] ?? []),
    ...practicalExperiencePrompts.map((prompt) => prompt.replace("{topic}", topic)),
  ];
}

export const chapters: Chapter[] = chapterSeeds.map((seed, chapterIndex) => {
  const prompts = expandPrompts(seed);
  const questions: Question[] = prompts.map((prompt, index) => ({
    id: `${seed.slug}-${String(index + 1).padStart(3, "0")}`,
    slug: `${slugify(prompt)}-${index + 1}`,
    chapterSlug: seed.slug,
    prompt,
    difficulty: index > 14 ? "Advanced" : seed.difficulty,
    experienceLevel: levels[(chapterIndex + index) % levels.length],
    companyBadges: [companies[index % companies.length], companies[(index + 3) % companies.length]],
    tags: inferTags(prompt, seed),
    answers: buildAnswer(prompt, seed),
    followups: buildFollowups(prompt, seed, index),
  }));

  return {
    id: seed.slug,
    slug: seed.slug,
    title: seed.title,
    description: seed.description,
    icon: seed.icon,
    color: seed.color,
    order: chapterIndex + 1,
    difficulty: seed.difficulty,
    questions,
  };
});

export const allQuestions = chapters.flatMap((chapter) => chapter.questions);

export function getChapter(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug);
}

export function getQuestion(id: string) {
  return allQuestions.find((question) => question.id === id || question.slug === id);
}

export function getChapterColor(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug)?.color ?? "#67E8F9";
}

export function searchQuestions(query: string, topic = "all", level = "all") {
  const normalized = query.trim().toLowerCase();
  return allQuestions.filter((question) => {
    const matchesQuery =
      !normalized ||
      question.prompt.toLowerCase().includes(normalized) ||
      question.tags.some((tag) => tag.toLowerCase().includes(normalized));
    const matchesTopic = topic === "all" || question.chapterSlug === topic;
    const matchesLevel = level === "all" || question.experienceLevel === level;
    return matchesQuery && matchesTopic && matchesLevel;
  });
}

export const platformStats = {
  chapters: chapters.length,
  questions: allQuestions.length,
  answerSectionsPerQuestion: 40,
  followups: allQuestions.reduce((total, question) => total + question.followups.length, 0),
};

export const answerLabels: Array<{ key: keyof QuestionAnswer; label: string }> = [
  { key: "easyUnderstanding", label: "Easy Understanding" },
  { key: "hinglishMasterExplanation", label: "Hinglish Master" },
  { key: "interviewMeKyaBolnaHai", label: "Interview Me Kya Bolna Hai" },
  { key: "interviewerKyaSochtaHai", label: "Interviewer Mindset" },
  { key: "realtimeProjectExplanation", label: "Real Project" },
  { key: "twoYearsExperienceQuestions", label: "Project Practical Q&A" },
  { key: "s4hanaHanaCdsOdataConnection", label: "S/4HANA + CDS + OData" },
  { key: "codeWalkthrough", label: "Code Walkthrough" },
  { key: "debuggingSection", label: "Debugging" },
  { key: "supportProjectSection", label: "Support Project" },
  { key: "implementationProjectSection", label: "Implementation" },
  { key: "memoryTricks", label: "Memory Tricks" },
];

export function getAnswerLabelsForQuestion(question: Question) {
  return answerLabels.filter((item) => {
    if (item.key === "s4hanaHanaCdsOdataConnection") {
      return Boolean(question.answers.s4hanaHanaCdsOdataConnection.trim());
    }
    return true;
  });
}

export const requiredAnswerSections = [
  "Question",
  "Easy Understanding",
  "Hinglish Master Explanation",
  "Interview Me Kya Bolna Hai",
  "Interviewer Kya Sochta Hai",
  "Real-time Project Explanation",
  "Follow-up Questions With Answers",
  "Project Practical Questions",
  "S/4HANA + HANA + CDS + OData Connection",
  "Code Walkthrough",
  "Debugging Section",
  "Support Project Section",
  "Implementation Project Section",
  "Memory Tricks",
  "Simple Answer",
  "Detailed Answer",
  "Hinglish Explanation",
  "Real Interview Explanation",
  "Fresher Explanation",
  "Project-ready Developer Answer",
  "S/4HANA Perspective",
  "Real-time Project Scenario",
  "Production Support Scenario",
  "Debugging Scenario",
  "Performance Considerations",
  "Best Practices",
  "Common Mistakes",
  "Trap Questions",
  "Cross Questions",
  "Follow-up Questions",
  "HR Style Explanation",
  "Technical Deep Dive",
  "Code Examples",
  "Output Examples",
  "Real SAP Table Examples",
  "Real Client Requirement Example",
  "Real-time Ticket Example",
  "Interview Tips",
  "What interviewer expects",
  "What NOT to say in interview",
  "Common rejection reasons",
  "Advanced follow-up questions",
  "S/4HANA migration impact",
  "HANA optimization concepts",
  "Related CDS concepts",
  "Related OData concepts",
  "Related Enhancement concepts",
  "Related Performance tuning concepts",
  "Related authorization concepts",
  "Related debugging concepts",
  "Related transport concepts",
  "Related support issue examples",
  "Related production issue fixes",
];
