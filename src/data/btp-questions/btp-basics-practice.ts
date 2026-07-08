import type { BtpDragOrder, BtpFillBlank } from "@/lib/btp-content";

export const btpBasicsFillBlanks: BtpFillBlank[] = [
  {
    id: "btp-basics-fb1",
    topic: "Architecture",
    sentence: "In the BTP account hierarchy, a ___ is the top-level entity that holds the total purchased entitlements.",
    answer: "Global Account",
    acceptableAnswers: ["global account"],
    explanation: "The Global Account is the contract-level entity created when a customer signs up; Directories and Subaccounts sit below it.",
  },
  {
    id: "btp-basics-fb2",
    topic: "Neo vs Cloud Foundry",
    sentence: "SAP's current recommendation for new development is Cloud Foundry or Kyma — never ___, which is legacy and limited to SAP's own data centers.",
    answer: "Neo",
    acceptableAnswers: ["neo"],
    explanation: "Neo predates Cloud Foundry, only runs in SAP-owned data centers, and supports a narrow set of languages — it's treated as legacy today.",
  },
  {
    id: "btp-basics-fb3",
    topic: "Entitlements",
    sentence: "If a service doesn't appear in a subaccount's Service Marketplace, the most common cause is a missing ___.",
    answer: "entitlement",
    acceptableAnswers: ["entitlements"],
    explanation: "Entitlement is the permission + quota gate — until it's assigned to a subaccount, that service simply won't show up there.",
  },
  {
    id: "btp-basics-fb4",
    topic: "Cloud Concepts",
    sentence: "BTP's core runtimes (Cloud Foundry, Kyma) are classified as ___ — SAP manages the infrastructure and runtime, you manage the application.",
    answer: "PaaS",
    acceptableAnswers: ["paas", "platform as a service"],
    explanation: "PaaS sits between IaaS (you manage everything above hardware) and SaaS (provider manages everything) on the cloud service spectrum.",
  },
  {
    id: "btp-basics-fb5",
    topic: "Regions",
    sentence: "A subaccount's ___ determines its physical data center location, which matters for compliance, latency, and service availability.",
    answer: "region",
    acceptableAnswers: ["region code"],
    explanation: "Every subaccount is created in one region (e.g. eu10, us10), tied to a specific hyperscaler and physical location.",
  },
];

export const btpBasicsDragOrders: BtpDragOrder[] = [
  {
    id: "btp-basics-do1",
    topic: "Architecture",
    prompt: "Arrange the BTP account hierarchy from top (broadest) to bottom (most specific).",
    items: ["Global Account", "Directory", "Subaccount", "Cloud Foundry Org/Space"],
    explanation: "Global Account (contract) → Directory (optional grouping) → Subaccount (working unit) → CF Org/Space (where apps actually run).",
  },
  {
    id: "btp-basics-do2",
    topic: "Services",
    prompt: "Arrange the steps to actually consume a BTP service in an application, in the correct order.",
    items: ["Entitlement assigned to subaccount", "Service appears in Marketplace", "Service instance created", "Instance bound to app"],
    explanation: "Entitlement gates visibility → the service then appears in the Marketplace → you create an instance from a plan → you bind that instance to your app to get credentials.",
  },
  {
    id: "btp-basics-do3",
    topic: "Evolution",
    prompt: "Arrange SAP BTP's names in chronological order (oldest to current).",
    items: ["SAP HANA Cloud Platform", "SAP Cloud Platform", "SAP Business Technology Platform"],
    explanation: "HANA Cloud Platform (2012, Neo-only) → SAP Cloud Platform (2017, +Cloud Foundry) → SAP BTP (2021, +Analytics/AI/Kyma).",
  },
  {
    id: "btp-basics-do4",
    topic: "Entitlements",
    prompt: "Arrange the troubleshooting steps for 'service missing in Marketplace' in the order you'd actually perform them.",
    items: [
      "Check subaccount's Entitlements page",
      "Check Global Account's entitlement pool",
      "Assign entitlement to the subaccount",
      "Refresh and verify in Marketplace",
    ],
    explanation: "Always start closest to the symptom (the subaccount) before escalating to the Global Account pool, then assign and verify.",
  },
];
