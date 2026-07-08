import type { Difficulty } from "@/lib/types";
import { btpBasicsMcqs, btpBasicsQuestions, btpBasicsTopicNotes } from "@/data/btp-questions/btp-basics";
import {
  btpBasicsAssignments,
  btpBasicsCodingQuestions,
  btpBasicsLabs,
  btpBasicsMiniProject,
} from "@/data/btp-questions/btp-basics-extra";
import { btpBasicsDragOrders, btpBasicsFillBlanks } from "@/data/btp-questions/btp-basics-practice";
import { cloudFoundryMcqs, cloudFoundryQuestions } from "@/data/btp-questions/cloud-foundry";
import {
  cloudFoundryCodingQuestions,
  cloudFoundryLabs,
  cloudFoundryTopicNotes,
} from "@/data/btp-questions/cloud-foundry-extra";
import { kymaRuntimeMcqs, kymaRuntimeQuestions } from "@/data/btp-questions/kyma-runtime";
import {
  kymaRuntimeCodingQuestions,
  kymaRuntimeLabs,
  kymaRuntimeTopicNotes,
} from "@/data/btp-questions/kyma-runtime-extra";
import { abapEnvironmentMcqs, abapEnvironmentQuestions } from "@/data/btp-questions/abap-environment";
import {
  abapEnvironmentCodingQuestions,
  abapEnvironmentTopicNotes,
} from "@/data/btp-questions/abap-environment-extra";
import { capModelMcqs, capModelQuestions } from "@/data/btp-questions/cap-model";
import { capModelCodingQuestions, capModelTopicNotes } from "@/data/btp-questions/cap-model-extra";
import { hanaCloudMcqs, hanaCloudQuestions } from "@/data/btp-questions/hana-cloud";
import {
  hanaCloudCodingQuestions,
  hanaCloudLabs,
  hanaCloudTopicNotes,
} from "@/data/btp-questions/hana-cloud-extra";
import { securityMcqs, securityQuestions } from "@/data/btp-questions/security";
import { securityCodingQuestions, securityTopicNotes } from "@/data/btp-questions/security-extra";
import { connectivityMcqs, connectivityQuestions } from "@/data/btp-questions/connectivity";
import { connectivityCodingQuestions, connectivityTopicNotes } from "@/data/btp-questions/connectivity-extra";
import { integrationSuiteMcqs, integrationSuiteQuestions } from "@/data/btp-questions/integration-suite";
import { integrationSuiteTopicNotes } from "@/data/btp-questions/integration-suite-extra";
import { eventMeshMcqs, eventMeshQuestions } from "@/data/btp-questions/event-mesh";
import { eventMeshTopicNotes } from "@/data/btp-questions/event-mesh-extra";
import { html5AppsMcqs, html5AppsQuestions } from "@/data/btp-questions/html5-apps";
import { html5AppsTopicNotes } from "@/data/btp-questions/html5-apps-extra";
import { launchpadServiceMcqs, launchpadServiceQuestions } from "@/data/btp-questions/launchpad-service";
import { launchpadServiceTopicNotes } from "@/data/btp-questions/launchpad-service-extra";
import { sapBuildMcqs, sapBuildQuestions } from "@/data/btp-questions/sap-build";
import { sapBuildTopicNotes } from "@/data/btp-questions/sap-build-extra";
import { monitoringMcqs, monitoringQuestions } from "@/data/btp-questions/monitoring";
import { monitoringTopicNotes } from "@/data/btp-questions/monitoring-extra";
import { devopsMcqs, devopsQuestions } from "@/data/btp-questions/devops";
import { devopsTopicNotes } from "@/data/btp-questions/devops-extra";
import { scenarioBasedMcqs, scenarioBasedQuestions } from "@/data/btp-questions/scenario-based";
import { scenarioBasedTopicNotes } from "@/data/btp-questions/scenario-based-extra";
import { hrMcqs, hrQuestions } from "@/data/btp-questions/hr";
import { hrTopicNotes } from "@/data/btp-questions/hr-extra";

/**
 * Static skeleton content for the "SAP BTP Interview Bible" track.
 * Deliberately separate from `src/lib/content.ts` (the ABAP question bank) —
 * BTP chapters get filled in incrementally without touching existing content.
 */
export type BtpSection = {
  slug: string;
  order: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  difficulty: Difficulty;
  targetQuestionCount: number;
  topics: string[];
};

/** One interview question, matching the "Every Interview Question Format" spec. */
export type BtpQuestion = {
  id: string;
  topic: string;
  prompt: string;
  difficulty: Difficulty;
  experienceLevel: string;
  tags: string[];
  estimatedMinutes: number;
  /** Crisp answer an interviewer expects to hear. */
  expectedAnswer: string;
  /** Full English explanation. */
  detailedAnswer: string;
  /** Hinglish explanation, simple. */
  hindiExplanation: string;
  /** How to actually phrase it out loud in an interview. */
  interviewExplanation: string;
  /** Text description of the diagram/flow — always present, used as a fallback/caption. */
  diagramNote: string;
  /** Optional Mermaid diagram definition rendered interactively (pan/zoom) when present. */
  diagramMermaid?: string;
  realProjectExample: string;
  interviewTip: string;
  followupQuestions: string[];
  commonMistakes: string[];
  importantPoints: string[];
  revisionNotes: string;
};

export type BtpMcq = {
  id: string;
  topic: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type BtpFillBlank = {
  id: string;
  topic: string;
  /** Sentence with a single "___" placeholder for the blank. */
  sentence: string;
  answer: string;
  acceptableAnswers?: string[];
  explanation: string;
};

export type BtpDragOrder = {
  id: string;
  topic: string;
  prompt: string;
  /** Steps/items in their correct order — shuffled for the learner to re-order. */
  items: string[];
  explanation: string;
};

export type CodingLanguage = "Node.js" | "Java" | "SQL" | "CF CLI" | "Bash" | "MTA" | "CDS";

export type BtpCodingQuestion = {
  id: string;
  topic: string;
  language: CodingLanguage;
  prompt: string;
  difficulty: Difficulty;
  starterCode?: string;
  solution: string;
  explanation: string;
};

export type BtpAssignment = {
  id: string;
  title: string;
  description: string;
  tasks: string[];
  difficulty: Difficulty;
};

export type BtpMiniProject = {
  title: string;
  objective: string;
  requirements: string[];
  bonusChallenges: string[];
};

export type BtpLab = {
  id: string;
  sectionSlug: string;
  title: string;
  objective: string;
  architectureNote: string;
  steps: { instruction: string; command?: string }[];
  expectedOutput: string;
  commonErrors: { error: string; solution: string }[];
};

export const btpSections: BtpSection[] = [
  {
    slug: "btp-basics",
    order: 1,
    title: "SAP BTP Basics",
    description: "Foundations of the platform — accounts, entitlements, regions, and the Neo vs Cloud Foundry split.",
    icon: "Cloud",
    color: "#67E8F9",
    difficulty: "Beginner",
    targetQuestionCount: 30,
    topics: [
      "What is SAP BTP", "Evolution", "Architecture", "Cloud Concepts", "Neo vs Cloud Foundry",
      "Services", "Global Account", "Subaccount", "Directories", "Regions", "Providers",
      "Entitlements", "Quotas", "Boosters",
    ],
  },
  {
    slug: "cloud-foundry",
    order: 2,
    title: "Cloud Foundry",
    description: "Orgs, spaces, apps, buildpacks, routes, and the CF CLI workflow.",
    icon: "Server",
    color: "#A78BFA",
    difficulty: "Beginner",
    targetQuestionCount: 35,
    topics: [
      "Cloud Controller", "Org", "Space", "Apps", "Routes", "Buildpacks", "Service Marketplace",
      "Bindings", "Scaling", "CLI", "Deployment", "Logs", "Troubleshooting",
    ],
  },
  {
    slug: "kyma-runtime",
    order: 3,
    title: "Kyma Runtime",
    description: "Kubernetes-native development on BTP — pods, functions, Helm, and Istio.",
    icon: "Boxes",
    color: "#34D399",
    difficulty: "Intermediate",
    targetQuestionCount: 25,
    topics: [
      "Containers", "Kubernetes", "Pods", "Deployments", "Namespaces", "Functions", "Serverless",
      "Helm", "Istio", "API Rules", "Secrets", "Monitoring",
    ],
  },
  {
    slug: "abap-environment",
    order: 4,
    title: "ABAP Environment (Steampunk)",
    description: "Cloud-native ABAP development — ADT, RAP, CDS-based services, and transports.",
    icon: "Code2",
    color: "#FBBF24",
    difficulty: "Intermediate",
    targetQuestionCount: 30,
    topics: [
      "ADT", "Packages", "Transport", "CDS", "OData", "Business Objects", "RAP",
      "Service Definition", "Service Binding", "Authorization",
    ],
  },
  {
    slug: "cap-model",
    order: 5,
    title: "CAP Model",
    description: "Core Data Services and the Cloud Application Programming model in Node.js and Java.",
    icon: "Layers",
    color: "#F472B6",
    difficulty: "Intermediate",
    targetQuestionCount: 50,
    topics: [
      "Node.js CAP", "Java CAP", "CDS", "Entities", "Associations", "Compositions", "Actions",
      "Functions", "Authentication", "Authorization", "Draft", "Multitenancy", "Events",
      "Deployments", "Testing",
    ],
  },
  {
    slug: "hana-cloud",
    order: 6,
    title: "SAP HANA Cloud",
    description: "Database fundamentals — HDI containers, calculation views, and performance tuning.",
    icon: "Database",
    color: "#60A5FA",
    difficulty: "Intermediate",
    targetQuestionCount: 35,
    topics: [
      "Database", "HDI Containers", "Calculation Views", "SQL", "Indexes", "Performance",
      "Replication", "Backup", "Database Explorer",
    ],
  },
  {
    slug: "security",
    order: 7,
    title: "Security",
    description: "XSUAA, OAuth, role collections, trust, and identity — how BTP locks things down.",
    icon: "ShieldCheck",
    color: "#F87171",
    difficulty: "Advanced",
    targetQuestionCount: 25,
    topics: [
      "XSUAA", "OAuth", "JWT", "Role Collections", "Scopes", "Authorization",
      "Principal Propagation", "Destinations", "Trust Configuration", "IAS", "IPS",
    ],
  },
  {
    slug: "connectivity",
    order: 8,
    title: "Connectivity",
    description: "Bridging cloud and on-premise — destinations, Cloud Connector, and principal propagation.",
    icon: "Cable",
    color: "#C084FC",
    difficulty: "Advanced",
    targetQuestionCount: 20,
    topics: [
      "Destination Service", "Connectivity Service", "Cloud Connector", "On Premise", "Proxy",
      "Principal Propagation", "Certificates",
    ],
  },
  {
    slug: "integration-suite",
    order: 9,
    title: "Integration Suite",
    description: "Cloud Integration, API Management, and partner/EDI mapping at scale.",
    icon: "Workflow",
    color: "#FB923C",
    difficulty: "Advanced",
    targetQuestionCount: 35,
    topics: [
      "Cloud Integration", "API Management", "Open Connectors", "Integration Advisor",
      "Trading Partner Management", "EDI", "Mapping", "Groovy Scripts", "Adapters",
    ],
  },
  {
    slug: "event-mesh",
    order: 10,
    title: "Event Mesh",
    description: "Asynchronous, event-driven messaging — queues, topics, and retry semantics.",
    icon: "Radio",
    color: "#2DD4BF",
    difficulty: "Advanced",
    targetQuestionCount: 15,
    topics: ["Queues", "Topics", "Publish Subscribe", "Events", "Retry", "Dead Letter Queue"],
  },
  {
    slug: "html5-apps",
    order: 11,
    title: "HTML5 Apps",
    description: "Shipping UIs on BTP — App Router, the HTML5 repository, and launchpad deployment.",
    icon: "MonitorSmartphone",
    color: "#4ADE80",
    difficulty: "Beginner",
    targetQuestionCount: 20,
    topics: ["App Router", "HTML5 Repository", "Deployment", "Launchpad", "UI5", "React", "Angular"],
  },
  {
    slug: "launchpad-service",
    order: 12,
    title: "Launchpad Service",
    description: "Tiles, catalogs, groups, and intent-based navigation for the Fiori launchpad.",
    icon: "LayoutGrid",
    color: "#818CF8",
    difficulty: "Beginner",
    targetQuestionCount: 15,
    topics: ["Tiles", "Catalog", "Groups", "Roles", "Navigation", "Intent"],
  },
  {
    slug: "sap-build",
    order: 13,
    title: "SAP Build",
    description: "Low-code app building, process automation, Work Zone, and business rules.",
    icon: "Hammer",
    color: "#FB7185",
    difficulty: "Intermediate",
    targetQuestionCount: 20,
    topics: ["Build Apps", "Process Automation", "Work Zone", "Business Rules"],
  },
  {
    slug: "monitoring",
    order: 14,
    title: "Monitoring",
    description: "Logs, metrics, tracing, and health checks for BTP applications.",
    icon: "Activity",
    color: "#38BDF8",
    difficulty: "Intermediate",
    targetQuestionCount: 15,
    topics: ["Logs", "Metrics", "Tracing", "Alert Notification", "Application Logging", "Health Check"],
  },
  {
    slug: "devops",
    order: 15,
    title: "DevOps",
    description: "CI/CD, MTA deployment, transports, versioning, and blue-green rollouts.",
    icon: "GitBranch",
    color: "#A3E635",
    difficulty: "Advanced",
    targetQuestionCount: 20,
    topics: [
      "Git", "GitHub", "GitHub Actions", "Jenkins", "CI/CD", "MTA", "Transport", "Deployment",
      "Versioning", "Blue Green Deployment",
    ],
  },
  {
    slug: "scenario-based",
    order: 16,
    title: "Scenario Based",
    description: "Production incidents and architecture judgment calls — the questions that separate levels.",
    icon: "AlertTriangle",
    color: "#F43F5E",
    difficulty: "Expert",
    targetQuestionCount: 50,
    topics: [
      "Production Issues", "Authentication Failure", "Token Expired", "Destination Missing",
      "Deployment Failed", "CAP Crash", "Memory Leak", "Scaling", "Performance", "Database Lock",
      "Project Architecture",
    ],
  },
  {
    slug: "hr",
    order: 17,
    title: "HR",
    description: "The non-technical round — behavioral questions, project narratives, and negotiation.",
    icon: "Users",
    color: "#E879F9",
    difficulty: "Expert",
    targetQuestionCount: 20,
    topics: [
      "Tell me about yourself", "Current Project", "Challenges", "Achievements", "Conflict",
      "Leadership", "Salary Negotiation", "Notice Period",
    ],
  },
];

export const btpStageOrder: Difficulty[] = ["Beginner", "Intermediate", "Advanced", "Expert"];

export function getBtpSection(slug: string): BtpSection | undefined {
  return btpSections.find((s) => s.slug === slug);
}

export function btpTotalQuestions(): number {
  return btpSections.reduce((sum, s) => sum + s.targetQuestionCount, 0);
}

/**
 * Question/MCQ banks are authored per section under `src/data/btp-questions/`
 * and registered here. Sections with no bank yet simply return an empty array
 * so the UI falls back to its "coming soon" placeholder.
 */
const questionBanks: Record<string, BtpQuestion[]> = {
  "btp-basics": btpBasicsQuestions,
  "cloud-foundry": cloudFoundryQuestions,
  "kyma-runtime": kymaRuntimeQuestions,
  "abap-environment": abapEnvironmentQuestions,
  "cap-model": capModelQuestions,
  "hana-cloud": hanaCloudQuestions,
  security: securityQuestions,
  connectivity: connectivityQuestions,
  "integration-suite": integrationSuiteQuestions,
  "event-mesh": eventMeshQuestions,
  "html5-apps": html5AppsQuestions,
  "launchpad-service": launchpadServiceQuestions,
  "sap-build": sapBuildQuestions,
  monitoring: monitoringQuestions,
  devops: devopsQuestions,
  "scenario-based": scenarioBasedQuestions,
  hr: hrQuestions,
};

const mcqBanks: Record<string, BtpMcq[]> = {
  "btp-basics": btpBasicsMcqs,
  "cloud-foundry": cloudFoundryMcqs,
  "kyma-runtime": kymaRuntimeMcqs,
  "abap-environment": abapEnvironmentMcqs,
  "cap-model": capModelMcqs,
  "hana-cloud": hanaCloudMcqs,
  security: securityMcqs,
  connectivity: connectivityMcqs,
  "integration-suite": integrationSuiteMcqs,
  "event-mesh": eventMeshMcqs,
  "html5-apps": html5AppsMcqs,
  "launchpad-service": launchpadServiceMcqs,
  "sap-build": sapBuildMcqs,
  monitoring: monitoringMcqs,
  devops: devopsMcqs,
  "scenario-based": scenarioBasedMcqs,
  hr: hrMcqs,
};

const topicNoteBanks: Record<string, Record<string, string>> = {
  "btp-basics": btpBasicsTopicNotes,
  "cloud-foundry": cloudFoundryTopicNotes,
  "kyma-runtime": kymaRuntimeTopicNotes,
  "abap-environment": abapEnvironmentTopicNotes,
  "cap-model": capModelTopicNotes,
  "hana-cloud": hanaCloudTopicNotes,
  security: securityTopicNotes,
  connectivity: connectivityTopicNotes,
  "integration-suite": integrationSuiteTopicNotes,
  "event-mesh": eventMeshTopicNotes,
  "html5-apps": html5AppsTopicNotes,
  "launchpad-service": launchpadServiceTopicNotes,
  "sap-build": sapBuildTopicNotes,
  monitoring: monitoringTopicNotes,
  devops: devopsTopicNotes,
  "scenario-based": scenarioBasedTopicNotes,
  hr: hrTopicNotes,
};

const codingQuestionBanks: Record<string, BtpCodingQuestion[]> = {
  "btp-basics": btpBasicsCodingQuestions,
  "cloud-foundry": cloudFoundryCodingQuestions,
  "kyma-runtime": kymaRuntimeCodingQuestions,
  "abap-environment": abapEnvironmentCodingQuestions,
  "cap-model": capModelCodingQuestions,
  "hana-cloud": hanaCloudCodingQuestions,
  security: securityCodingQuestions,
  connectivity: connectivityCodingQuestions,
};

const assignmentBanks: Record<string, BtpAssignment[]> = {
  "btp-basics": btpBasicsAssignments,
};

const miniProjectBanks: Record<string, BtpMiniProject> = {
  "btp-basics": btpBasicsMiniProject,
};

const labBanks: Record<string, BtpLab[]> = {
  "btp-basics": btpBasicsLabs,
  "cloud-foundry": cloudFoundryLabs,
  "kyma-runtime": kymaRuntimeLabs,
  "hana-cloud": hanaCloudLabs,
};

const fillBlankBanks: Record<string, BtpFillBlank[]> = {
  "btp-basics": btpBasicsFillBlanks,
};

const dragOrderBanks: Record<string, BtpDragOrder[]> = {
  "btp-basics": btpBasicsDragOrders,
};

export function getBtpQuestions(slug: string): BtpQuestion[] {
  return questionBanks[slug] ?? [];
}

export function getBtpMcqs(slug: string): BtpMcq[] {
  return mcqBanks[slug] ?? [];
}

export function getBtpTopicNotes(slug: string): Record<string, string> {
  return topicNoteBanks[slug] ?? {};
}

export function getBtpCodingQuestions(slug: string): BtpCodingQuestion[] {
  return codingQuestionBanks[slug] ?? [];
}

export function getBtpAssignments(slug: string): BtpAssignment[] {
  return assignmentBanks[slug] ?? [];
}

export function getBtpMiniProject(slug: string): BtpMiniProject | undefined {
  return miniProjectBanks[slug];
}

export function getBtpLabs(slug: string): BtpLab[] {
  return labBanks[slug] ?? [];
}

export function getAllBtpLabs(): BtpLab[] {
  return btpSections.flatMap((section) => getBtpLabs(section.slug));
}

export function getBtpFillBlanks(slug: string): BtpFillBlank[] {
  return fillBlankBanks[slug] ?? [];
}

export function getBtpDragOrders(slug: string): BtpDragOrder[] {
  return dragOrderBanks[slug] ?? [];
}

/** Every authored question across every section — powers the Dashboard and search. */
export function getAllBtpQuestions(): (BtpQuestion & { sectionSlug: string; sectionTitle: string })[] {
  return btpSections.flatMap((section) =>
    getBtpQuestions(section.slug).map((q) => ({ ...q, sectionSlug: section.slug, sectionTitle: section.title })),
  );
}

/** Every authored MCQ across every section. */
export function getAllBtpMcqs(): (BtpMcq & { sectionSlug: string })[] {
  return btpSections.flatMap((section) => getBtpMcqs(section.slug).map((m) => ({ ...m, sectionSlug: section.slug })));
}

export function btpAuthoredQuestionCount(): number {
  return getAllBtpQuestions().length;
}
