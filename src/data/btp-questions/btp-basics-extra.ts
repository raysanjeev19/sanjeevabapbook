import type { BtpAssignment, BtpCodingQuestion, BtpLab, BtpMiniProject } from "@/lib/btp-content";

export const btpBasicsCodingQuestions: BtpCodingQuestion[] = [
  {
    id: "btp-basics-cq1",
    topic: "Subaccount",
    language: "Bash",
    difficulty: "Beginner",
    prompt: "Using the SAP BTP command line interface (`btp`), write the command to list every subaccount you have access to.",
    solution: "btp list accounts/subaccount",
    explanation:
      "The `btp` CLI groups resources by area — `accounts` covers the account-hierarchy objects (global account, directory, subaccount, entitlements). `btp list accounts/subaccount` prints every subaccount visible to your logged-in user, with its ID, display name, and region.",
  },
  {
    id: "btp-basics-cq2",
    topic: "Entitlements",
    language: "Bash",
    difficulty: "Intermediate",
    prompt: "Write the `btp` CLI command to view the entitlements currently assigned to a specific subaccount (id `12ab-34cd`).",
    solution: "btp list accounts/entitlement --subaccount 12ab-34cd",
    explanation:
      "`btp list accounts/entitlement` needs a target scope — passing `--subaccount <id>` filters to exactly the entitlements assigned to that subaccount, which is the first thing to check when a service is missing from the Marketplace.",
  },
  {
    id: "btp-basics-cq3",
    topic: "Global Account",
    language: "Bash",
    difficulty: "Beginner",
    prompt: "Write the `btp` CLI command to log in against a specific global account subdomain `acme-prod`.",
    solution: "btp login --url https://cli.btp.cloud.sap --user you@company.com --subdomain acme-prod",
    starterCode: "btp login --url ___ --user ___ --subdomain ___",
    explanation:
      "The `--subdomain` flag scopes the login session to a specific global account (its subdomain, shown in the cockpit URL). Without it, `btp` prompts you to pick one interactively if you belong to more than one.",
  },
  {
    id: "btp-basics-cq4",
    topic: "Cloud Foundry",
    language: "CF CLI",
    difficulty: "Beginner",
    prompt: "Write the CF CLI command to see which org and space you're currently targeting.",
    solution: "cf target",
    explanation:
      "`cf target` prints the API endpoint, logged-in user, and the currently targeted org and space — the first command to run when you're unsure where a `cf push` will land.",
  },
  {
    id: "btp-basics-cq5",
    topic: "Cloud Foundry",
    language: "CF CLI",
    difficulty: "Intermediate",
    prompt: "Write the command to deploy a Multi-Target Application archive `myapp.mtar` to your currently targeted Cloud Foundry space.",
    solution: "cf deploy myapp.mtar",
    explanation:
      "`cf deploy` (from the multiapps CF CLI plugin) is the MTA-aware deployment command — it reads the `.mtar` archive's manifest, deploys every module and resource it declares, and wires up service bindings, unlike a plain `cf push` which only handles a single app.",
  },
];

export const btpBasicsAssignments: BtpAssignment[] = [
  {
    id: "btp-basics-assignment1",
    title: "Set up your first BTP landscape",
    difficulty: "Beginner",
    description:
      "Using a free-tier or trial BTP Global Account, build a minimal but correctly-structured landscape — this is the hands-on version of the architecture you just read about.",
    tasks: [
      "Create (or reuse) a trial/free-tier Global Account.",
      "Create a Directory named 'learning'.",
      "Inside it, create two Subaccounts: 'dev' and 'prod', both in the same region.",
      "Assign a Cloud Foundry Runtime entitlement to the 'dev' subaccount with a small quota.",
      "Enable Cloud Foundry in 'dev' and confirm an Org and Space now exist.",
      "Write one paragraph explaining why 'dev' and 'prod' are separate subaccounts instead of one.",
    ],
  },
];

export const btpBasicsMiniProject: BtpMiniProject = {
  title: "BTP Landscape Governance Design",
  objective:
    "Design (on paper or in a doc/diagram) a complete BTP account hierarchy for a fictitious company with real-world constraints — this mirrors the kind of landscape-design task a BTP architect actually does before a project starts.",
  requirements: [
    "The company, 'Acme Retail', has 3 business units: Retail, Logistics, Finance.",
    "Each business unit needs its own Dev, QA, and Prod subaccounts.",
    "The company operates in both the EU and the US; EU customer data must legally stay in an EU region.",
    "There should be one shared subaccount for CI/CD tooling used by all business units.",
    "Draw the full hierarchy (Global Account → Directories → Subaccounts) as a diagram (Mermaid is fine).",
    "For each subaccount, note its region and which entitlements it would need at minimum.",
  ],
  bonusChallenges: [
    "Add directory-level entitlement pooling so each business unit manages its own quota independently.",
    "Explain how you'd migrate this design if Acme Retail acquired a 4th business unit next year.",
  ],
};

export const btpBasicsLabs: BtpLab[] = [
  {
    id: "btp-basics-lab1",
    sectionSlug: "btp-basics",
    title: "Create Your First Subaccount and Assign Entitlements",
    objective:
      "Get hands-on with the account hierarchy: create a subaccount, assign it an entitlement, and confirm the service appears in its Service Marketplace.",
    architectureNote:
      "You'll work one level below your Global Account: Global Account → (Directory, optional) → Subaccount. Entitlements flow down from the Global Account's purchased quota into the Subaccount you create.",
    steps: [
      { instruction: "Log in to the BTP cockpit and open your Global Account." },
      { instruction: "Create a new Subaccount, choosing a region close to you." },
      { instruction: "Open the new Subaccount's Entitlements page and add an entitlement for 'SAP HANA Cloud', plan 'standard-edition', with a small quota." },
      { instruction: "Or do the same from the CLI once logged in:", command: "btp assign accounts/entitlement --to-subaccount <subaccount-id> --for-service hana-cloud --plan standard-edition --amount 1" },
      { instruction: "Open the Subaccount's Service Marketplace and search for 'HANA Cloud'." },
      { instruction: "Confirm it now appears as provisionable (it wasn't, before the entitlement was assigned)." },
    ],
    expectedOutput:
      "The Service Marketplace of your subaccount shows 'SAP HANA Cloud' with the 'standard-edition' plan available to create an instance from.",
    commonErrors: [
      {
        error: "Service still doesn't appear in the Marketplace after assigning the entitlement.",
        solution: "Refresh the Marketplace page — the UI sometimes caches the previous list. If it still doesn't appear, double-check you assigned the entitlement to the correct subaccount, not a sibling one.",
      },
      {
        error: "\"No entitlement available\" error when trying to assign it.",
        solution: "Your Global Account itself doesn't have unassigned quota for that plan — this is a trial-account limitation or requires purchasing more capacity; try a smaller quota amount or a 'trial'/'lite' plan instead.",
      },
    ],
  },
];
