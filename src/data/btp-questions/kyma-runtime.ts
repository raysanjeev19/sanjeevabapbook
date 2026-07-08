import type { BtpMcq, BtpQuestion } from "@/lib/btp-content";

/** Section 3 — Kyma Runtime. 25 interview questions, full format (mirrors btp-basics). */
export const kymaRuntimeQuestions: BtpQuestion[] = [
  {
    id: "kyma-q1",
    topic: "Containers",
    prompt: "What is a container, and why does Kyma run workloads as containers instead of directly on VMs?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["containers", "basics"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A container packages an app with its dependencies and runtime into one isolated, portable unit sharing the host OS kernel; Kyma runs workloads as containers because they start fast, are lightweight compared to full VMs, and behave identically across dev/test/prod.",
    detailedAnswer:
      "Unlike a VM, which virtualizes an entire OS (heavier, slower to boot), a container shares the host machine's kernel but isolates the process's filesystem, network, and resources — giving VM-like isolation at a fraction of the overhead. This means containers start in seconds, pack more densely on the same hardware, and, since the container image bundles exact dependency versions, eliminate 'works on my machine' inconsistencies between environments. Kyma, being Kubernetes-based, schedules and runs every workload as one or more containers grouped into Pods.",
    hindiExplanation:
      "Container ek app ko uski dependencies aur runtime ke saath ek isolated, portable unit mein pack karta hai, lekin host machine ka kernel share karta hai (VM ki tarah poora OS virtualize nahi karta). Isse container fast start hote hain, VM se kaafi lightweight hote hain, aur same hardware pe zyada density mein chal sakte hain. Kyunki image mein exact dependency versions bundled hote hain, 'mere machine pe toh chal raha tha' wali problem khatam ho jaati hai. Kyma, Kubernetes-based hone ki wajah se, har workload ko container(s) ke roop mein Pods mein group karke chalata hai.",
    interviewExplanation:
      "I'd say: 'A container packages an app and its dependencies into one isolated unit, sharing the host's kernel rather than virtualizing a whole OS like a VM. That makes it lightweight and fast to start, and since the image locks in exact dependency versions, it behaves identically across dev, test, and prod. Kyma runs every workload this way, grouped into Pods.'",
    diagramNote:
      "Comparison: 'VM: full OS + hypervisor per app (heavy)' vs 'Container: shared kernel, isolated process (lightweight)' — both sitting on the same physical host.",
    diagramMermaid: `flowchart LR
    subgraph VM["Virtual Machine"]
        H1["Hypervisor"] --> OS1["Full Guest OS"] --> APP1["App"]
    end
    subgraph CT["Container"]
        K["Shared Host Kernel"] --> APP2["Isolated App Process"]
    end`,
    realProjectExample:
      "Migrating a Java service from VM-hosted deployment to a container on Kyma cut its startup time from minutes to seconds and let us run several instances on the same node that previously needed dedicated VMs.",
    interviewTip:
      "If asked to contrast with VMs, always mention the shared-kernel point specifically — it's the core technical reason containers are lighter, not just 'they're smaller'.",
    followupQuestions: [
      "What is a Pod and how does it relate to containers?",
      "What container runtime does Kubernetes typically use under the hood?",
      "Why might you still use a VM instead of a container for some workloads?",
    ],
    commonMistakes: [
      "Saying a container 'is basically a small VM' without noting the shared-kernel difference.",
      "Not connecting containers to Kyma's Kubernetes foundation.",
    ],
    importantPoints: [
      "Containers share the host kernel; VMs virtualize a full OS.",
      "Containers are lightweight, fast-starting, and consistent across environments.",
      "Kyma schedules every workload as containers grouped into Pods.",
    ],
    revisionNotes: "Container = isolated app + deps, shared kernel (lighter than a VM). Kyma runs everything as containers grouped into Pods.",
  },
  {
    id: "kyma-q2",
    topic: "Containers",
    prompt: "How does a container image differ from a running container?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["containers", "images"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A container image is a static, immutable, layered filesystem snapshot (built once, stored in a registry); a running container is a live process instantiated from that image, with its own writable layer and runtime state.",
    detailedAnswer:
      "An image is built (e.g. via a Dockerfile) into layers and pushed to a registry — it never changes once built, and many containers can be started from the exact same image. When Kubernetes schedules a Pod, the container runtime pulls the image and starts a container from it, adding a thin writable layer on top for any runtime file changes (which are lost when the container is removed unless a volume is used). This distinction is why you 'rebuild and redeploy' rather than 'edit the running container' when changing app code.",
    hindiExplanation:
      "Image ek static, immutable, layered filesystem snapshot hota hai — ek baar build hota hai (jaise Dockerfile se), registry mein store hota hai, aur kabhi badalta nahi. Running container us image se instantiate hua ek live process hota hai, jiski apni ek writable layer hoti hai runtime changes ke liye (jo container delete hone pe gayab ho jaate hain, jab tak volume use na ho). Isi wajah se app code change karne ke liye tum 'rebuild aur redeploy' karte ho, running container ko directly edit nahi karte.",
    interviewExplanation:
      "I'd draw the distinction: 'The image is the static, built artifact stored in a registry — it never changes. A running container is a live process started from that image, with a writable layer on top for runtime state, which is why you rebuild and redeploy an image rather than editing a running container directly.'",
    diagramNote:
      "Flow: 'Dockerfile' → 'docker build' → 'Image (immutable, in registry)' → 'docker run / K8s schedules Pod' → 'Running Container (writable layer on top)'.",
    diagramMermaid: `flowchart LR
    A["Dockerfile"] --> B["Build"] --> C["Image<br/>immutable, in registry"]
    C --> D["Run / K8s schedules Pod"] --> E["Running Container<br/>writable layer on top"]`,
    realProjectExample:
      "When debugging via `kubectl exec` into a running container and editing a config file directly, we learned the hard way that the fix disappeared the moment the Pod was rescheduled — the correct fix was updating the source and rebuilding the image.",
    interviewTip:
      "If asked 'can you edit a running container permanently', the correct answer is no — changes vanish on restart/reschedule unless persisted via a volume or baked into a new image.",
    followupQuestions: [
      "What is a container registry?",
      "What happens to a container's writable layer when it's removed?",
      "How would you persist data across container restarts?",
    ],
    commonMistakes: [
      "Thinking edits made inside a running container persist across restarts.",
      "Confusing 'image' and 'container' as the same thing.",
    ],
    importantPoints: [
      "Image = static, immutable, layered, in a registry.",
      "Container = live process from an image, with a writable layer.",
      "Code changes require rebuilding the image, not editing the running container.",
    ],
    revisionNotes: "Image = immutable build artifact (registry). Container = running instance of it (writable layer, ephemeral).",
  },
  {
    id: "kyma-q3",
    topic: "Kubernetes",
    prompt: "What is Kubernetes, and how does Kyma relate to it?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["kubernetes", "kyma"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Kubernetes is an open-source container orchestration platform that schedules, scales, and heals containerized workloads across a cluster of machines; Kyma is SAP BTP's managed Kubernetes offering — a Kubernetes cluster plus a curated set of add-on modules (Serverless, Istio, API Gateway, Eventing).",
    detailedAnswer:
      "Kubernetes alone gives you the core primitives — Pods, Deployments, Services, Namespaces — for running and managing containers reliably at scale, but it doesn't include things like a service mesh, a serverless function experience, or built-in event handling out of the box. Kyma packages a real Kubernetes cluster together with these curated modules pre-integrated and supported by SAP, so BTP customers get a batteries-included Kubernetes experience rather than having to assemble and manage all these pieces themselves.",
    hindiExplanation:
      "Kubernetes ek open-source container orchestration platform hai jo containers ko cluster ke machines mein schedule, scale, aur heal karta hai — core primitives deta hai jaise Pods, Deployments, Services, Namespaces. Lekin Kubernetes akela service mesh, serverless functions, ya event handling jaisi cheezein built-in nahi deta. Kyma ek real Kubernetes cluster ko in curated modules (Serverless, Istio, API Gateway, Eventing) ke saath pre-integrated deta hai, SAP ke support ke saath — matlab BTP customers ko ek 'batteries-included' Kubernetes experience milta hai, khud sab kuch assemble karne ki jagah.",
    interviewExplanation:
      "I'd say: 'Kubernetes is the open-source orchestration platform giving you the core primitives to run containers reliably at scale. Kyma is BTP's managed offering built on top — a real Kubernetes cluster plus curated modules like Istio, Serverless, and API Gateway, pre-integrated and supported by SAP, so I don't have to assemble all those pieces myself.'",
    diagramNote:
      "Base layer 'Kubernetes (core: Pods, Deployments, Services, Namespaces)' with 'Kyma' as a box wrapping it, adding modules: Istio, Serverless, API Gateway, Eventing.",
    diagramMermaid: `flowchart TD
    K8S["Kubernetes core<br/>Pods, Deployments, Services, Namespaces"] --> KYMA["Kyma"]
    KYMA --> M1["Istio (service mesh)"]
    KYMA --> M2["Serverless (Functions)"]
    KYMA --> M3["API Gateway (API Rules)"]
    KYMA --> M4["Eventing"]`,
    realProjectExample:
      "Instead of separately installing and maintaining Istio and a serverless framework on a self-managed Kubernetes cluster, enabling Kyma on a BTP subaccount gave us both pre-integrated and supported out of the box.",
    interviewTip:
      "If asked 'is Kyma just Kubernetes', correct that gently — it's Kubernetes plus a specific, SAP-curated and supported set of add-ons, not a from-scratch reimplementation.",
    followupQuestions: [
      "What are the core building blocks of plain Kubernetes?",
      "Name two modules Kyma adds on top of Kubernetes.",
      "Could you run vanilla Kubernetes instead of Kyma on BTP?",
    ],
    commonMistakes: [
      "Saying Kyma and Kubernetes are the exact same thing.",
      "Not naming any of Kyma's specific add-on modules.",
    ],
    importantPoints: [
      "Kubernetes = core orchestration primitives.",
      "Kyma = managed Kubernetes + curated modules (Istio, Serverless, API Gateway, Eventing).",
      "Kyma is SAP's supported, batteries-included Kubernetes offering on BTP.",
    ],
    revisionNotes: "Kubernetes = core orchestration. Kyma = Kubernetes + curated SAP-supported modules (Istio, Serverless, API Gateway, Eventing).",
  },
  {
    id: "kyma-q4",
    topic: "Kubernetes",
    prompt: "What is the Kubernetes control plane, and what does it actually do?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["kubernetes", "architecture"],
    estimatedMinutes: 3,
    expectedAnswer:
      "The control plane is the set of components (API server, scheduler, controller manager, etcd) that maintains the cluster's desired state and makes scheduling decisions; worker nodes then run the actual workload containers via the kubelet.",
    detailedAnswer:
      "The API server is the front door — every `kubectl` command and internal component talks to it. etcd is the cluster's key-value store holding all desired-state configuration. The scheduler decides which node a new Pod should run on based on resource availability and constraints. The controller manager runs reconciliation loops (like the Deployment controller ensuring the right number of Pod replicas exist) constantly comparing desired state (in etcd) against actual state and correcting drift. Worker nodes are separate from all this — each runs a kubelet agent that actually starts/stops containers as instructed by the control plane.",
    hindiExplanation:
      "Control plane components ka set hai jo cluster ka desired state maintain karta hai aur scheduling decisions leta hai: API server (sabka front door — har kubectl command yahin se guzarta hai), etcd (key-value store, saara desired-state config yahin store hota hai), scheduler (decide karta hai naya Pod kis node pe chalega), aur controller manager (reconciliation loops chalata hai, jaise Deployment controller ye ensure karta hai ki sahi number mein Pod replicas exist karein). Worker nodes alag hote hain — har node pe ek kubelet agent chalta hai jo actually containers start/stop karta hai control plane ke instructions ke hisaab se.",
    interviewExplanation:
      "I'd list the components with their jobs: 'The API server is the front door everything talks to. etcd stores desired state. The scheduler decides which node a new Pod lands on. The controller manager continuously reconciles desired state against actual state. Worker nodes are separate — each runs a kubelet that actually starts and stops containers as the control plane instructs.'",
    diagramNote:
      "Control plane box (API Server, etcd, Scheduler, Controller Manager) with arrows down to multiple Worker Node boxes, each running a kubelet and Pods.",
    diagramMermaid: `flowchart TD
    subgraph CP["Control Plane"]
        API["API Server"]
        ETCD["etcd"]
        SCHED["Scheduler"]
        CM["Controller Manager"]
    end
    CP --> N1["Worker Node 1<br/>kubelet + Pods"]
    CP --> N2["Worker Node 2<br/>kubelet + Pods"]`,
    realProjectExample:
      "When a Deployment wasn't scaling as expected, checking the controller manager's reconciliation behavior (via `kubectl describe`) revealed a resource constraint preventing the scheduler from placing new Pods on any available node.",
    interviewTip:
      "In BTP/Kyma, SAP manages the control plane for you — mentioning that distinction (you don't operate etcd or the API server yourself) shows awareness of what's abstracted away in a managed offering.",
    followupQuestions: [
      "What is etcd and why is it critical to cluster health?",
      "What does the kubelet do on a worker node?",
      "In Kyma, who manages the control plane — you or SAP?",
    ],
    commonMistakes: [
      "Not knowing etcd is the actual state store, thinking the API server stores state itself.",
      "Confusing control plane responsibilities with worker node responsibilities.",
    ],
    importantPoints: [
      "Control plane: API server, etcd, scheduler, controller manager.",
      "Worker nodes: run kubelet, actually execute containers.",
      "In Kyma, SAP manages the control plane for you.",
    ],
    revisionNotes: "Control plane (API server, etcd, scheduler, controller manager) = brain. Worker nodes (kubelet) = execute containers. SAP manages control plane in Kyma.",
  },
  {
    id: "kyma-q5",
    topic: "Kubernetes",
    prompt: "What is a Kubernetes Service, and why is it needed if Pods already have IP addresses?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["kubernetes", "services", "networking"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A Service provides a stable, single virtual IP/DNS name that load-balances across a dynamic set of Pods, because individual Pod IPs are ephemeral — they change every time a Pod is recreated, so nothing should ever hard-code a direct Pod IP.",
    detailedAnswer:
      "Pods are inherently disposable — a crashed or rescheduled Pod gets a brand new IP address. If other components had to track individual Pod IPs directly, connections would break constantly. A Service sits in front of a set of Pods (selected via labels), gets one stable ClusterIP and DNS name that never changes, and transparently load-balances traffic to whichever Pods currently match its selector — completely decoupling 'who's calling' from 'which specific Pod instance answers'.",
    hindiExplanation:
      "Pods inherently disposable hote hain — agar koi Pod crash ho ya reschedule ho, usko ek bilkul naya IP address milta hai. Agar doosre components ko individual Pod IPs directly track karne padte, toh connections baar-baar toot jaate. Service ek set of Pods (labels se select kiye gaye) ke aage baitha hota hai, ek stable ClusterIP aur DNS name deta hai jo kabhi nahi badalta, aur traffic ko transparently load-balance karta hai jo bhi Pods abhi uske selector se match karte hain — 'kaun call kar raha hai' aur 'kaunsa specific Pod jawab de raha hai' ko poori tarah decouple kar deta hai.",
    interviewExplanation:
      "I'd explain the ephemerality problem first: 'Pod IPs change every time a Pod restarts or gets rescheduled, so nothing should depend on them directly. A Service gives you one stable IP and DNS name in front of a set of Pods matched by label, and load-balances traffic across whichever Pods currently match — completely decoupling callers from individual Pod instances.'",
    diagramNote:
      "One 'Service (stable ClusterIP + DNS)' box with a selector arrow to three 'Pod' boxes, each with a different, changing IP; caller only ever talks to the Service, never a Pod IP directly.",
    diagramMermaid: `flowchart LR
    CALLER["Caller"] --> SVC["Service<br/>stable ClusterIP + DNS"]
    SVC --> P1["Pod (IP: changes)"]
    SVC --> P2["Pod (IP: changes)"]
    SVC --> P3["Pod (IP: changes)"]`,
    realProjectExample:
      "A teammate hard-coded a Pod's IP address in a config for quick testing; it broke within minutes when Kubernetes rescheduled that Pod — switching to the Service's stable DNS name fixed it permanently.",
    interviewTip:
      "If asked 'why not just use Pod IPs directly', the ephemerality argument is exactly the answer being tested — say it explicitly rather than just 'Services are better'.",
    followupQuestions: [
      "What are the different Service types (ClusterIP, NodePort, LoadBalancer)?",
      "How does a Service know which Pods to route to?",
      "What's the DNS name format for a Kubernetes Service?",
    ],
    commonMistakes: [
      "Hard-coding a Pod's IP address anywhere in configuration.",
      "Not knowing Services select Pods via labels, not fixed lists.",
    ],
    importantPoints: [
      "Pod IPs are ephemeral — they change on every recreation.",
      "A Service gives one stable ClusterIP/DNS name in front of matching Pods.",
      "Services select Pods dynamically via labels, decoupling caller from instance.",
    ],
    revisionNotes: "Pod IPs are ephemeral. Service = stable IP/DNS + label-based load balancing across current matching Pods.",
  },
  {
    id: "kyma-q6",
    topic: "Pods",
    prompt: "What is a Pod, and why might a Pod contain more than one container?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["pods", "basics"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A Pod is the smallest deployable unit in Kubernetes — one or more containers that are always scheduled together on the same node, sharing network and storage; a second 'sidecar' container is commonly added for cross-cutting concerns like a service mesh proxy (Istio) or a log shipper.",
    detailedAnswer:
      "Containers within the same Pod share a network namespace (they can reach each other via localhost) and can share volumes, and Kubernetes always schedules and scales them as one atomic unit — you can't have half a Pod's containers on one node and half on another. Most Pods run exactly one 'main' application container, but a second sidecar container is a common pattern: Istio automatically injects an Envoy proxy sidecar into every Pod in a mesh-enabled namespace to handle traffic interception for mTLS and observability, without the app container needing any code changes.",
    hindiExplanation:
      "Pod Kubernetes ka sabse chhota deployable unit hai — ek ya zyada containers jo hamesha same node pe saath schedule hote hain, network aur storage share karte hain. Zyada tar Pods mein ek hi 'main' application container hota hai, lekin ek second 'sidecar' container add karna common pattern hai — jaise Istio automatically har Pod mein ek Envoy proxy sidecar inject kar deta hai mTLS aur observability handle karne ke liye, bina app container mein koi code change kiye.",
    interviewExplanation:
      "I'd define it and give the sidecar example: 'A Pod is the smallest deployable unit — one or more containers always scheduled together on the same node, sharing network and storage. A common reason for a second container is a sidecar, like the Envoy proxy Istio injects automatically for mTLS and traffic observability, without touching the app container's code.'",
    diagramNote:
      "One Pod box containing two containers: 'App Container' and 'Sidecar: Envoy Proxy (Istio)', sharing one network namespace and volume.",
    diagramMermaid: `flowchart TD
    subgraph POD["Pod (shared network + storage)"]
        APP["App Container"]
        SIDECAR["Sidecar: Envoy Proxy (Istio)"]
    end`,
    realProjectExample:
      "Enabling Istio sidecar injection on our namespace automatically added an Envoy proxy container to every existing Pod on next restart, giving us mTLS between services with zero application code changes.",
    interviewTip:
      "Mention that containers in a Pod share localhost networking — that's the specific technical reason a sidecar pattern works so cleanly.",
    followupQuestions: [
      "What does 'containers in a Pod share a network namespace' actually mean in practice?",
      "Can two containers in the same Pod use the same port?",
      "What is an init container and how does it differ from a sidecar?",
    ],
    commonMistakes: [
      "Thinking a Pod is the same thing as a container.",
      "Not knowing sidecar containers can be injected automatically (e.g. by Istio) without app changes.",
    ],
    importantPoints: [
      "Pod = smallest deployable unit, one or more containers, always co-scheduled.",
      "Containers in a Pod share network (localhost) and can share volumes.",
      "Sidecar containers (like Istio's Envoy proxy) are the common multi-container reason.",
    ],
    revisionNotes: "Pod = smallest unit, 1+ co-scheduled containers sharing network/storage. Sidecar (e.g. Istio proxy) is the common multi-container case.",
  },
  {
    id: "kyma-q7",
    topic: "Pods",
    prompt: "What happens when a Pod crashes — does Kubernetes restart the same Pod or create a new one?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["pods", "lifecycle"],
    estimatedMinutes: 2,
    expectedAnswer:
      "If a container inside a Pod crashes, the kubelet restarts just that container in place (same Pod, same IP); but if the whole Pod is deleted or its node fails, a controller (like a Deployment) creates a brand new Pod with a new identity and IP to replace it.",
    detailedAnswer:
      "Kubernetes distinguishes between a container crashing (handled locally by the kubelet's restart policy — the Pod object itself persists, same name/IP, just the container process restarts) versus the Pod itself being terminated (deleted, evicted, or its node going down) — in that case, if the Pod is managed by a Deployment/ReplicaSet, the controller notices the actual replica count has dropped below desired and schedules a completely new Pod, with a new name and IP, to replace it. This is why you should never assume a specific Pod IP or name is stable — always go through a Service.",
    hindiExplanation:
      "Kubernetes do situations mein farak karta hai: agar ek container crash ho jaaye, kubelet usi Pod ke andar us container ko restart kar deta hai (same Pod, same IP, bas container process restart hota hai). Lekin agar poora Pod hi terminate ho jaaye (delete, evict, ya uska node fail ho jaaye), toh agar wo Pod Deployment/ReplicaSet se managed hai, controller notice karta hai ki actual replica count desired se kam ho gaya hai aur ek bilkul naya Pod schedule karta hai, naye naam aur IP ke saath. Isi wajah se kabhi bhi kisi specific Pod ka IP ya naam stable maan kar chalna nahi chahiye — hamesha Service ke through jaana chahiye.",
    interviewExplanation:
      "I'd draw the two-scenario distinction: 'If just a container inside a Pod crashes, the kubelet restarts that container in place — same Pod, same IP. But if the whole Pod is deleted or its node fails, a controller like a Deployment notices the replica count dropped and schedules a brand new Pod with a new identity and IP. That's exactly why nothing should ever depend on a specific Pod IP directly.'",
    diagramNote:
      "Two branches: 'Container crashes → kubelet restarts container in place (same Pod/IP)' vs 'Pod deleted/node fails → controller schedules new Pod (new IP)'.",
    diagramMermaid: `flowchart TD
    A["Container crashes"] --> B["kubelet restarts container<br/>same Pod, same IP"]
    C["Pod deleted / node fails"] --> D["Controller schedules new Pod<br/>new identity, new IP"]`,
    realProjectExample:
      "During a node maintenance event, all Pods scheduled on that node were rescheduled elsewhere with new IPs automatically by the Deployment controller — our app kept working uninterrupted because it only ever addressed the Service, never individual Pod IPs.",
    interviewTip:
      "If asked 'is a Pod's IP guaranteed to stay the same forever', the correct nuanced answer is 'only as long as that exact Pod object exists — a crash-and-restart keeps it, but a Pod recreation doesn't'.",
    followupQuestions: [
      "What is a restart policy and what options does it have?",
      "What controller is responsible for recreating a deleted Pod?",
      "Why should apps never hard-code Pod IPs?",
    ],
    commonMistakes: [
      "Thinking every kind of Pod failure results in a completely new Pod.",
      "Not distinguishing container-level restart from Pod-level recreation.",
    ],
    importantPoints: [
      "Container crash → kubelet restarts it in place (same Pod/IP).",
      "Pod deletion/node failure → controller creates a new Pod (new IP).",
      "Never depend on a specific Pod IP — always go through a Service.",
    ],
    revisionNotes: "Container crash = restarted in place (same Pod). Pod deleted/node fails = new Pod created (new IP) by its controller.",
  },
  {
    id: "kyma-q8",
    topic: "Deployments",
    prompt: "What is a Kubernetes Deployment, and how does it relate to Pods and ReplicaSets?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["deployments", "replicasets"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A Deployment is a higher-level resource that manages a ReplicaSet, which in turn ensures a specified number of identical Pods are running; Deployments add rolling-update and rollback behavior on top of what a bare ReplicaSet provides.",
    detailedAnswer:
      "You almost never create a ReplicaSet directly — you declare a Deployment with a desired replica count and Pod template, and the Deployment controller creates and manages a ReplicaSet, which in turn creates the actual Pods and continuously ensures that count stays correct (recreating any that disappear). The Deployment layer on top adds update strategy logic — when you change the Pod template (e.g. a new image version), it creates a new ReplicaSet and gradually shifts Pods from the old ReplicaSet to the new one (a rolling update), and keeps the old ReplicaSet around briefly so you can `kubectl rollout undo` if something's wrong.",
    hindiExplanation:
      "Tum almost kabhi bhi directly ReplicaSet nahi banate — tum ek Deployment declare karte ho jisme desired replica count aur Pod template hota hai, aur Deployment controller ek ReplicaSet create/manage karta hai, jo actually Pods banata hai aur continuously ensure karta hai ki count sahi rahe (koi gayab ho jaaye toh naya bana deta hai). Deployment layer iske upar update strategy logic add karta hai — jab tum Pod template change karte ho (jaise naya image version), ye ek naya ReplicaSet banata hai aur gradually Pods ko purane ReplicaSet se naye mein shift karta hai (rolling update), aur purana ReplicaSet thodi der ke liye rakhta hai taaki agar kuch galat ho toh `kubectl rollout undo` kar sako.",
    interviewExplanation:
      "I'd lay out the layers: 'A Deployment manages a ReplicaSet, which ensures the desired number of identical Pods are always running. The Deployment layer adds rolling updates on top — when the Pod template changes, it creates a new ReplicaSet and gradually shifts Pods over, keeping the old one around briefly for an instant rollback via kubectl rollout undo.'",
    diagramNote:
      "Layered: 'Deployment' → manages → 'ReplicaSet' → ensures → 'N identical Pods'. Separate arrow showing 'Deployment update → new ReplicaSet, old kept for rollback'.",
    diagramMermaid: `flowchart TD
    D["Deployment"] --> RS["ReplicaSet"] --> P["N identical Pods"]
    D2["Deployment update"] --> NEWRS["New ReplicaSet"]
    D2 -.-> OLDRS["Old ReplicaSet kept<br/>for rollback"]`,
    realProjectExample:
      "After a bad image rollout caused errors, `kubectl rollout undo deployment/myapp` instantly reverted to the previous ReplicaSet's Pods without needing to manually redeploy the old image version.",
    interviewTip:
      "Mentioning the rollback mechanism (`kubectl rollout undo`) unprompted shows you understand Deployments aren't just 'a way to run Pods' but specifically manage safe change rollout.",
    followupQuestions: [
      "What is a rolling update strategy and what parameters control its pace?",
      "How would you roll back a bad deployment?",
      "Why don't you create ReplicaSets directly in normal practice?",
    ],
    commonMistakes: [
      "Not knowing Deployments manage ReplicaSets, thinking Deployments directly manage Pods with no intermediate layer.",
      "Forgetting that old ReplicaSets are kept around specifically to enable rollback.",
    ],
    importantPoints: [
      "Deployment → manages ReplicaSet → ensures N Pods running.",
      "Deployment adds rolling update + rollback on top of a bare ReplicaSet.",
      "`kubectl rollout undo` reverts to the previous ReplicaSet's Pods.",
    ],
    revisionNotes: "Deployment manages a ReplicaSet (ensures N Pods) + adds rolling update/rollback (`kubectl rollout undo`).",
  },
  {
    id: "kyma-q9",
    topic: "Deployments",
    prompt: "What deployment strategies does Kubernetes support besides the default rolling update?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["deployments", "strategies"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Kubernetes natively supports 'RollingUpdate' (default, gradual replacement) and 'Recreate' (kill all old Pods, then start all new ones — brief downtime); more advanced patterns like blue-green or canary deployments aren't native Deployment strategies but are implemented using Services/Ingress traffic shifting or dedicated tools (Flagger, Argo Rollouts).",
    detailedAnswer:
      "The Deployment resource's `.spec.strategy.type` field only has two built-in options: RollingUpdate (the default — gradually scales down old Pods while scaling up new ones, controlled by maxSurge/maxUnavailable) and Recreate (terminates all existing Pods before creating any new ones, causing a brief outage, sometimes needed when old and new versions genuinely can't run simultaneously, like an incompatible database migration). True blue-green (two full separate environments, instant cutover) and canary (a small percentage of traffic to the new version first) aren't native Deployment features — they're implemented by manipulating Service selectors/Ingress weights yourself, or using a purpose-built progressive-delivery controller.",
    hindiExplanation:
      "Deployment resource ke `.spec.strategy.type` field mein sirf do built-in options hain: RollingUpdate (default — gradually purane Pods scale down karta hai jabki naye scale up hote hain, maxSurge/maxUnavailable se control hota hai) aur Recreate (saare purane Pods terminate karta hai naye banane se pehle, thodi downtime hoti hai — kabhi zaroori hota hai jab old aur new version saath mein chal hi nahi sakte, jaise incompatible database migration). Real blue-green (do poore alag environments, instant cutover) aur canary (thoda sa traffic pehle naye version ko) native Deployment features nahi hain — inhe Service selectors/Ingress weights khud manipulate karke ya kisi progressive-delivery controller (Flagger, Argo Rollouts) se implement kiya jaata hai.",
    interviewExplanation:
      "I'd name exactly what's native vs not: 'Kubernetes natively supports RollingUpdate and Recreate on the Deployment resource itself. True blue-green and canary deployments aren't native Deployment strategies — you implement them by manipulating Service selectors or Ingress traffic weights yourself, or using a tool like Flagger or Argo Rollouts for progressive delivery.'",
    diagramNote:
      "Two native strategies (RollingUpdate, Recreate) inside 'Deployment resource' box, with a separate box 'Blue-green / Canary — NOT native, implemented via Service/Ingress or Flagger/Argo Rollouts'.",
    diagramMermaid: `flowchart LR
    D["Deployment resource"] --> R["RollingUpdate (native, default)"]
    D --> RC["Recreate (native)"]
    E["Blue-green / Canary<br/>NOT native"] --> F["Implemented via Service/Ingress<br/>or Flagger/Argo Rollouts"]`,
    realProjectExample:
      "For a database schema change incompatible between versions, we used the Recreate strategy deliberately (accepting brief downtime) rather than RollingUpdate, since running old and new app versions simultaneously against the migrated schema wasn't safe.",
    interviewTip:
      "If asked to implement canary deployment, don't claim Kubernetes does it natively — name the actual mechanism (traffic-weighted Services/Ingress or a dedicated tool) to show accurate knowledge.",
    followupQuestions: [
      "When would you deliberately choose Recreate over RollingUpdate?",
      "What controls the pace of a RollingUpdate?",
      "What is Argo Rollouts or Flagger used for?",
    ],
    commonMistakes: [
      "Claiming Kubernetes Deployments natively support blue-green or canary.",
      "Not knowing Recreate causes brief downtime by design.",
    ],
    importantPoints: [
      "Native: RollingUpdate (default) and Recreate.",
      "Blue-green/canary are patterns, not native Deployment strategies.",
      "Implemented via Service/Ingress traffic control or tools like Flagger/Argo Rollouts.",
    ],
    revisionNotes: "Native Deployment strategies: RollingUpdate, Recreate. Blue-green/canary = patterns via Service/Ingress or Flagger/Argo Rollouts, not built-in.",
  },
  {
    id: "kyma-q10",
    topic: "Namespaces",
    prompt: "What is a Namespace in Kubernetes, and what does it actually isolate?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["namespaces", "isolation"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A Namespace is a logical partition within a single cluster that scopes resource names, RBAC permissions, and resource quotas — it does NOT provide network isolation by default (that requires a separate NetworkPolicy) or hardware-level isolation.",
    detailedAnswer:
      "Namespaces let you run multiple environments or teams within one physical cluster without name collisions (two 'myapp' Deployments can coexist in different namespaces) and let you scope RBAC roles and ResourceQuotas per namespace. But it's purely a logical/administrative boundary at the API level — by default, Pods in different namespaces can still reach each other over the network unless a NetworkPolicy explicitly restricts it, and there's no dedicated hardware or kernel-level isolation the way there is between separate clusters or nodes.",
    hindiExplanation:
      "Namespace ek logical partition hai ek hi cluster ke andar jo resource names, RBAC permissions, aur resource quotas scope karta hai — matlab do alag namespaces mein 'myapp' naam ke Deployments coexist kar sakte hain bina naam clash ke. Lekin ye by default network isolation nahi deta — alag namespaces ke Pods aapas mein network pe pahunch sakte hain jab tak koi NetworkPolicy explicitly restrict na kare. Aur ye hardware-level isolation bhi nahi deta jaisa alag clusters/nodes ke beech hota hai.",
    interviewExplanation:
      "I'd be precise about what it does and doesn't isolate: 'A Namespace is a logical partition — it scopes resource names, RBAC, and quotas within one cluster. But it's not network isolation by default; Pods in different namespaces can still talk to each other unless a NetworkPolicy explicitly blocks it, and there's no hardware-level separation like you'd get from separate clusters.'",
    diagramNote:
      "One cluster box containing two Namespace boxes ('team-a', 'team-b'), each with its own 'myapp' Deployment (no name clash), with a dashed line between them labeled 'network still reachable by default, unless NetworkPolicy restricts it'.",
    diagramMermaid: `flowchart TD
    subgraph CLUSTER["One Cluster"]
        subgraph NSA["Namespace: team-a"]
            A["myapp Deployment"]
        end
        subgraph NSB["Namespace: team-b"]
            B["myapp Deployment"]
        end
    end
    NSA -.-> NSB`,
    realProjectExample:
      "Two teams both had a Deployment named 'api' in the same cluster without conflict, since each lived in its own namespace — but we still had to add explicit NetworkPolicies when we wanted to actually restrict cross-team network access for compliance reasons.",
    interviewTip:
      "This is a very commonly misunderstood point — explicitly stating 'namespaces are NOT network isolation by default' is what separates a correct answer from a common misconception.",
    followupQuestions: [
      "What is a NetworkPolicy and how does it restrict traffic between namespaces?",
      "What gets scoped per-namespace besides resource names?",
      "How would you enforce that two namespaces can never talk to each other?",
    ],
    commonMistakes: [
      "Assuming namespaces provide network isolation by default.",
      "Not knowing RBAC and ResourceQuotas are namespace-scoped.",
    ],
    importantPoints: [
      "Namespace = logical partition, scopes names/RBAC/quotas.",
      "NOT network-isolated by default — needs an explicit NetworkPolicy.",
      "No hardware/kernel-level isolation like separate clusters have.",
    ],
    revisionNotes: "Namespace = logical scope (names/RBAC/quota) in one cluster. Not network-isolated by default — needs a NetworkPolicy.",
  },
  {
    id: "kyma-q11",
    topic: "Namespaces",
    prompt: "How would you restrict a team's access to only their own Namespace in Kyma?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["namespaces", "rbac"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Create a Role (or ClusterRole) scoped with a RoleBinding to that specific Namespace, granting only the permissions that team needs there — RBAC in Kubernetes is namespace-scoped for Roles/RoleBindings, unlike ClusterRoles/ClusterRoleBindings which apply cluster-wide.",
    detailedAnswer:
      "Kubernetes RBAC has two levels: a Role (namespace-scoped) or ClusterRole (cluster-wide) defines a set of permitted verbs (get, list, create, delete) on specific resource types; a RoleBinding (namespace-scoped) or ClusterRoleBinding (cluster-wide) then grants that role to specific users/groups/service accounts. To restrict a team to only their namespace, you'd create a Role in that namespace with the permissions they need, then a RoleBinding in the same namespace linking their identity to that Role — critically using a RoleBinding (not a ClusterRoleBinding), since a ClusterRoleBinding would grant access everywhere even if it references a namespace-scoped Role's permission set... actually a ClusterRoleBinding always applies cluster-wide, so the namespace confinement specifically comes from using a RoleBinding.",
    hindiExplanation:
      "Kubernetes RBAC ke do levels hote hain: Role (namespace-scoped) ya ClusterRole (cluster-wide) — ye define karta hai kaunse permissions milenge (get, list, create, delete) kaunse resources pe. RoleBinding (namespace-scoped) ya ClusterRoleBinding (cluster-wide) fir us role ko specific users/groups/service accounts ko grant karta hai. Kisi team ko sirf unke apne namespace tak restrict karne ke liye, us namespace mein ek Role banao unki zaroorat ke permissions ke saath, fir usi namespace mein ek RoleBinding banao jo unki identity ko us Role se link kare — important baat ye hai ki RoleBinding use karo (ClusterRoleBinding nahi), kyunki ClusterRoleBinding hamesha cluster-wide apply hota hai.",
    interviewExplanation:
      "I'd explain the RBAC building blocks: 'I'd create a Role in that specific namespace with only the permissions the team needs, then a RoleBinding — also namespace-scoped — linking their user or group to that Role. The key is using a RoleBinding rather than a ClusterRoleBinding, since ClusterRoleBindings always apply cluster-wide regardless of what Role they reference.'",
    diagramNote:
      "Namespace 'team-a' containing a 'Role (permissions)' and a 'RoleBinding' linking 'Team A Users' to that Role, confined entirely within the namespace boundary.",
    diagramMermaid: `flowchart TD
    subgraph NS["Namespace: team-a"]
        ROLE["Role<br/>permissions"]
        RB["RoleBinding"] --> ROLE
        USERS["Team A Users"] --> RB
    end`,
    realProjectExample:
      "We scoped each development team to a RoleBinding in their own namespace granting create/delete on Deployments and Pods, but explicitly no access to Secrets in other teams' namespaces, keeping cross-team blast radius contained.",
    interviewTip:
      "The Role-vs-ClusterRole and RoleBinding-vs-ClusterRoleBinding distinction is a classic Kubernetes RBAC interview question — get the scoping direction exactly right.",
    followupQuestions: [
      "What's the difference between a Role and a ClusterRole?",
      "Can a RoleBinding reference a ClusterRole?",
      "How would you grant read-only access to all namespaces for an auditor?",
    ],
    commonMistakes: [
      "Using a ClusterRoleBinding when namespace confinement was the actual goal.",
      "Not knowing Roles/RoleBindings are namespace-scoped by definition.",
    ],
    importantPoints: [
      "Role/RoleBinding = namespace-scoped.",
      "ClusterRole/ClusterRoleBinding = cluster-wide.",
      "Confining a team to one namespace requires a RoleBinding, not a ClusterRoleBinding.",
    ],
    revisionNotes: "Namespace-confined access = Role + RoleBinding (both namespace-scoped). ClusterRole/ClusterRoleBinding = cluster-wide.",
  },
  {
    id: "kyma-q12",
    topic: "Functions",
    prompt: "What is a Kyma Function, and how is it different from deploying a regular containerized microservice?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["functions", "serverless"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A Kyma Function is a small piece of code (Node.js or Python) you write inline without building a Docker image yourself — Kyma's Serverless module automatically builds, containerizes, and runs it, and can scale it down to zero when idle, unlike a regular Deployment which normally stays running.",
    detailedAnswer:
      "With a regular microservice, you write a Dockerfile, build and push an image, and create a Deployment/Service yourself. With a Kyma Function, you write just the handler code and its dependencies as a Kubernetes custom resource; the Serverless module's build pipeline automatically containerizes it behind the scenes — you never touch a Dockerfile. Functions are also commonly configured to scale to zero instances when there's no traffic (true serverless economics — no idle cost), and scale back up on the next incoming request/event, whereas a typical Deployment usually keeps a minimum replica count running at all times.",
    hindiExplanation:
      "Regular microservice mein tum khud Dockerfile likhte ho, image build/push karte ho, aur khud Deployment/Service banate ho. Kyma Function mein tum sirf handler code aur uski dependencies likhte ho ek Kubernetes custom resource ki tarah — Serverless module ka build pipeline automatically usse containerize kar deta hai, tumhe Dockerfile touch bhi nahi karna padta. Functions aksar 'scale to zero' pe configure hote hain jab traffic na ho (true serverless economics — idle cost nahi), aur agle request/event pe wapas scale up ho jaate hain, jabki normal Deployment usually hamesha minimum replicas chalata rehta hai.",
    interviewExplanation:
      "I'd contrast the developer experience: 'With a regular microservice, I write a Dockerfile and build/push the image myself. With a Kyma Function, I just write the handler code, and the Serverless module automatically builds and containerizes it — no Dockerfile at all. Functions can also scale to zero when idle for true serverless economics, whereas a typical Deployment usually keeps some replicas running all the time.'",
    diagramNote:
      "Two paths: 'Regular microservice: Dockerfile → build/push image → Deployment (always running)' vs 'Kyma Function: write handler code → Serverless module auto-builds → scale-to-zero when idle'.",
    diagramMermaid: `flowchart LR
    A["Regular microservice"] --> B["Dockerfile → build/push image"] --> C["Deployment<br/>always running"]
    D["Kyma Function"] --> E["Write handler code only"] --> F["Serverless auto-builds"] --> G["Scale-to-zero when idle"]`,
    realProjectExample:
      "A lightweight webhook handler triggered only occasionally was implemented as a Kyma Function, scaling to zero between invocations, instead of running a small but permanently-on Deployment for something used a handful of times a day.",
    interviewTip:
      "If asked 'when would you use a Function vs a full Deployment', the honest answer is: small, event/HTTP-triggered, intermittent workloads suit Functions; complex, always-on, or workloads needing custom runtime dependencies suit full container Deployments.",
    followupQuestions: [
      "What languages does the Kyma Serverless module support for Functions?",
      "What triggers can invoke a Function?",
      "When would you choose a full Deployment over a Function?",
    ],
    commonMistakes: [
      "Thinking a Function still requires you to write a Dockerfile.",
      "Not mentioning scale-to-zero as a key differentiator.",
    ],
    importantPoints: [
      "Function = handler code only, no Dockerfile — Serverless module auto-builds.",
      "Can scale to zero when idle (true serverless cost model).",
      "Best for small, event/HTTP-triggered, intermittent workloads.",
    ],
    revisionNotes: "Kyma Function = code only (no Dockerfile), auto-built by Serverless module, can scale to zero — vs Deployment (always-on, you build the image).",
  },
  {
    id: "kyma-q13",
    topic: "Functions",
    prompt: "What can trigger a Kyma Function to execute?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["functions", "triggers"],
    estimatedMinutes: 2,
    expectedAnswer:
      "A Function can be triggered by a direct HTTP call (exposed via an API Rule), or by an event from Kyma's Eventing system (in-cluster events or events forwarded from external sources like an Event Mesh subscription).",
    detailedAnswer:
      "For synchronous, request-response use cases, you expose the Function via an API Rule (Kyma's API Gateway resource), and it responds to HTTP calls like any web endpoint. For asynchronous, decoupled use cases, you subscribe the Function to events through Kyma's Eventing infrastructure — this could be an event published by another in-cluster Function/service, or an external event forwarded in (for example, a business event published to Event Mesh that Kyma is subscribed to). This flexibility lets the same programming model handle both 'answer this API request' and 'react whenever X happens elsewhere' use cases.",
    hindiExplanation:
      "Synchronous, request-response use cases ke liye, tum Function ko ek API Rule se expose karte ho, aur wo kisi bhi web endpoint ki tarah HTTP calls ka response deta hai. Asynchronous, decoupled use cases ke liye, tum Function ko Kyma ke Eventing infrastructure ke through kisi event pe subscribe karte ho — ye ho sakta hai koi in-cluster event (kisi doosre Function/service se publish hua), ya koi external event jo forward hokar aaya ho (jaise Event Mesh ko publish hua koi business event jise Kyma subscribe kiye hue hai).",
    interviewExplanation:
      "I'd name both trigger types: 'For synchronous request-response, you expose the Function via an API Rule and it just responds to HTTP calls. For asynchronous, decoupled use cases, you subscribe it to events through Kyma's Eventing system — either in-cluster events or events forwarded from an external source like Event Mesh.'",
    diagramNote:
      "Two trigger paths into 'Function': 'HTTP request → API Rule → Function' and 'Event (in-cluster or from Event Mesh) → Eventing subscription → Function'.",
    diagramMermaid: `flowchart LR
    A["HTTP request"] --> B["API Rule"] --> F["Function"]
    C["Event (in-cluster or Event Mesh)"] --> D["Eventing subscription"] --> F`,
    realProjectExample:
      "A Function that sent a notification email was triggered asynchronously via an Eventing subscription to an 'order.created' business event, decoupling the notification logic entirely from the order-processing service that published it.",
    interviewTip:
      "If asked to design an event-reactive piece of logic, naming 'subscribe a Function to an event via Eventing' rather than 'expose it via API Rule and have something poll it' shows you understand the async pattern Kyma is built for.",
    followupQuestions: [
      "What is an API Rule and what access strategies does it support?",
      "How does Kyma's Eventing system relate to BTP's Event Mesh service?",
      "Can one Function be triggered by both HTTP and events?",
    ],
    commonMistakes: [
      "Thinking Functions can only be triggered by HTTP requests.",
      "Not knowing external events (like from Event Mesh) can trigger in-cluster Functions.",
    ],
    importantPoints: [
      "HTTP trigger: expose via an API Rule.",
      "Event trigger: subscribe via Kyma's Eventing system.",
      "Events can be in-cluster or forwarded from external sources like Event Mesh.",
    ],
    revisionNotes: "Function triggers: HTTP (via API Rule) or events (via Eventing — in-cluster or external, e.g. Event Mesh).",
  },
  {
    id: "kyma-q14",
    topic: "Serverless",
    prompt: "What does 'scale to zero' mean, and what's the tradeoff of using it?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["serverless", "scaling"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Scale to zero means a workload runs zero instances (and costs nothing in compute) when there's no traffic, spinning up on demand when a request arrives; the tradeoff is 'cold start' latency — the first request after idle has to wait for a new instance to start before it's served.",
    detailedAnswer:
      "For intermittent workloads (a webhook handler used a few times a day), scaling to zero avoids paying for idle capacity around the clock. But since there's no warm instance sitting ready, the very first request after a period of inactivity has to wait for Kubernetes to schedule a Pod, pull the image (or use a cached one), and start the process before it can respond — this delay is the 'cold start'. For latency-sensitive or high-frequency workloads, this tradeoff often isn't acceptable, and you'd keep a minimum instance count running instead (accepting some idle cost for consistent responsiveness).",
    hindiExplanation:
      "Scale to zero ka matlab hai — jab traffic na ho, workload zero instances pe chala jaata hai (aur compute cost bhi zero ho jaati hai), aur jab request aaye tab on-demand spin up hota hai. Intermittent workloads (jaise din mein kuch baar use hone wala webhook) ke liye ye idle capacity ki cost bachata hai. Lekin kyunki koi warm instance ready nahi baitha hota, idle period ke baad pehli request ko wait karna padta hai jab tak Kubernetes ek Pod schedule na kar de, image pull na kare, aur process start na ho — isi delay ko 'cold start' bolte hain. Latency-sensitive ya high-frequency workloads ke liye ye tradeoff often acceptable nahi hota, wahan minimum instance count chalate rehna better hota hai.",
    interviewExplanation:
      "I'd define it with the tradeoff upfront: 'Scale to zero means zero running instances (and zero compute cost) when idle, spinning up on demand. The tradeoff is cold start — the first request after idle time waits for a new instance to be scheduled and started. That's fine for intermittent workloads, but for latency-sensitive or high-frequency ones, you'd keep a minimum instance count instead and accept some idle cost.'",
    diagramNote:
      "Timeline: 'No traffic → 0 instances (no cost)' → 'Request arrives → cold start delay (Pod scheduled + started)' → 'Instance ready, request served' → 'Idle again → scales back to 0'.",
    diagramMermaid: `flowchart LR
    A["No traffic<br/>0 instances, no cost"] --> B["Request arrives<br/>cold start delay"]
    B --> C["Instance ready<br/>request served"]
    C --> D["Idle again<br/>scales back to 0"]`,
    realProjectExample:
      "A rarely-used internal admin Function was fine with scale-to-zero and its occasional few-second cold start, but a customer-facing checkout Function was kept at a minimum of 2 warm instances specifically to avoid that latency hit during real purchases.",
    interviewTip:
      "If asked 'would you use scale-to-zero for everything', the correct nuanced answer is no — it's great for cost on intermittent workloads, but wrong for latency-sensitive, high-frequency ones.",
    followupQuestions: [
      "How would you configure a minimum instance count to avoid cold starts?",
      "What specifically causes cold start latency (what has to happen before serving)?",
      "Is scale-to-zero the default behavior for every Kyma Function?",
    ],
    commonMistakes: [
      "Treating scale-to-zero as strictly better with no downside.",
      "Not being able to explain what actually causes cold start delay.",
    ],
    importantPoints: [
      "Scale to zero = no running instances, no cost, when idle.",
      "Cold start = latency on the first request after idle, while a new instance spins up.",
      "Not ideal for latency-sensitive or high-frequency workloads.",
    ],
    revisionNotes: "Scale to zero = no cost when idle, but cold-start latency on next request. Trade cost for latency — pick based on workload pattern.",
  },
  {
    id: "kyma-q15",
    topic: "Helm",
    prompt: "What is Helm, and what problem does a Helm chart solve?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["helm", "packaging"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Helm is Kubernetes' package manager; a chart bundles a set of Kubernetes YAML manifests as templates with configurable values, so you can install, upgrade, and manage a whole application (potentially dozens of resources) as one versioned unit instead of hand-managing many separate YAML files.",
    detailedAnswer:
      "A real application often needs many Kubernetes resources — Deployment, Service, ConfigMap, Secret, maybe an API Rule — and deploying it to multiple environments means the same resources with slightly different values (replica counts, image tags, hostnames). A Helm chart templates all these manifests with placeholders filled from a `values.yaml` file, so the same chart deploys consistently to dev, staging, or prod just by supplying different values. Helm also tracks 'releases' — installed instances of a chart — letting you `helm upgrade` or `helm rollback` an entire application as one atomic unit, rather than tracking each YAML file's state manually.",
    hindiExplanation:
      "Real application ko aksar kai Kubernetes resources chahiye hote hain — Deployment, Service, ConfigMap, Secret, shayad API Rule bhi. Multiple environments mein deploy karne ka matlab hai wahi resources thodi alag values ke saath (replica counts, image tags, hostnames). Helm chart in saare manifests ko templates ki tarah banata hai, placeholders `values.yaml` file se fill hote hain, taaki wahi chart dev, staging, ya prod mein consistently deploy ho sake, sirf alag values dekar. Helm 'releases' bhi track karta hai — installed instances of a chart — jisse tum poori application ko ek atomic unit ki tarah `helm upgrade` ya `helm rollback` kar sakte ho, har YAML file ka state manually track karne ki jagah.",
    interviewExplanation:
      "I'd frame it as templating + release management: 'Helm is Kubernetes' package manager. A chart templates all the manifests an app needs — Deployment, Service, ConfigMap, whatever — with values filled in from a values.yaml, so the same chart deploys consistently across environments. Helm also tracks installed releases, so I can upgrade or roll back an entire application as one unit instead of managing individual YAML files by hand.'",
    diagramNote:
      "Flow: 'Helm Chart (templates + values.yaml)' → 'helm install/upgrade' → 'Deployment + Service + ConfigMap + Secret, all deployed together as one Release'.",
    diagramMermaid: `flowchart LR
    A["Helm Chart<br/>templates + values.yaml"] --> B["helm install/upgrade"]
    B --> C["Deployment"]
    B --> D["Service"]
    B --> E["ConfigMap"]
    B --> F["Secret"]`,
    realProjectExample:
      "Our CAP application's dozen-plus Kubernetes resources were packaged as one Helm chart, letting us deploy the exact same chart to dev and prod with only a `values-prod.yaml` file differing — no manual YAML editing per environment.",
    interviewTip:
      "Mention 'release' as the specific Helm term for an installed chart instance — it signals real hands-on familiarity rather than a surface-level 'Helm is like a package manager' answer.",
    followupQuestions: [
      "How does values.yaml override defaults in a chart's templates?",
      "What does `helm rollback` actually do?",
      "Can one chart depend on another (subcharts)?",
    ],
    commonMistakes: [
      "Describing Helm only as 'a templating tool' without mentioning release/upgrade/rollback management.",
      "Not knowing values.yaml is how the same chart adapts per environment.",
    ],
    importantPoints: [
      "Chart = templated bundle of Kubernetes manifests + values.yaml.",
      "Same chart deploys consistently across environments via different values.",
      "Helm tracks 'releases' for atomic upgrade/rollback of a whole app.",
    ],
    revisionNotes: "Helm = K8s package manager. Chart = templated manifests + values.yaml. Tracks releases for atomic upgrade/rollback.",
  },
  {
    id: "kyma-q16",
    topic: "Helm",
    prompt: "What's the difference between `helm install`, `helm upgrade`, and `helm rollback`?",
    difficulty: "Beginner",
    experienceLevel: "Fresher",
    tags: ["helm", "cli"],
    estimatedMinutes: 2,
    expectedAnswer:
      "`helm install` creates a brand new release from a chart; `helm upgrade` applies changes (new values or chart version) to an existing release; `helm rollback` reverts a release to a previously recorded revision.",
    detailedAnswer:
      "Every `helm install` or `helm upgrade` creates a new numbered revision of that release, which Helm tracks internally. `helm install <name> <chart>` is a first-time deployment. `helm upgrade <name> <chart>` applies new configuration (updated values, or a newer chart version) to an already-installed release, recording it as the next revision. `helm rollback <name> <revision>` reverts the release back to a specific earlier revision's exact configuration — useful the same way `kubectl rollout undo` is for a plain Deployment, but at the whole-application-chart level.",
    hindiExplanation:
      "Har `helm install` ya `helm upgrade` us release ka ek naya numbered revision banata hai, jise Helm internally track karta hai. `helm install <name> <chart>` first-time deployment hota hai. `helm upgrade <name> <chart>` already-installed release pe naya configuration apply karta hai (updated values, ya newer chart version), aur usse next revision ki tarah record karta hai. `helm rollback <name> <revision>` release ko ek specific purane revision ki exact configuration pe wapas le jaata hai — bilkul waisa hi jaisa `kubectl rollout undo` ek plain Deployment ke liye karta hai, lekin poori application-chart level pe.",
    interviewExplanation:
      "I'd give each command its exact job: 'install creates a brand new release. upgrade applies changes — new values or a new chart version — to an existing release, creating a new revision. rollback reverts the release to a specific earlier revision's exact configuration, similar to kubectl rollout undo but for the whole chart.'",
    diagramNote:
      "Timeline: 'helm install → Revision 1' → 'helm upgrade → Revision 2' → 'helm upgrade → Revision 3 (bad)' → 'helm rollback to Revision 2'.",
    diagramMermaid: `flowchart LR
    A["helm install<br/>Revision 1"] --> B["helm upgrade<br/>Revision 2"] --> C["helm upgrade<br/>Revision 3 (bad)"]
    C -- "helm rollback" --> D["Back to Revision 2"]`,
    realProjectExample:
      "A `helm upgrade` that introduced a misconfigured value caused errors in production; `helm rollback myapp 2` instantly reverted to the last known-good revision while we fixed the values file properly before re-attempting the upgrade.",
    interviewTip:
      "Mention that Helm tracks numbered revisions automatically — that's what makes rollback possible without you manually keeping old YAML files around.",
    followupQuestions: [
      "How do you view the revision history of a Helm release?",
      "What happens to the previous revision's resources during an upgrade?",
      "Can you roll back to a revision more than one step back?",
    ],
    commonMistakes: [
      "Using `helm install` again to try to update an existing release instead of `helm upgrade`.",
      "Not knowing rollback targets a specific revision number.",
    ],
    importantPoints: [
      "install = first-time deployment (new release).",
      "upgrade = apply changes to an existing release (new revision).",
      "rollback = revert to a specific earlier revision.",
    ],
    revisionNotes: "install = new release. upgrade = new revision on existing release. rollback = revert to a specific earlier revision.",
  },
  {
    id: "kyma-q17",
    topic: "Istio",
    prompt: "What is Istio, and what does the sidecar proxy actually do?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["istio", "service-mesh"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Istio is a service mesh that transparently intercepts all network traffic between Pods via an injected Envoy sidecar proxy in each Pod, providing mutual TLS encryption, traffic routing/retries, and observability (metrics, tracing) without any changes to application code.",
    detailedAnswer:
      "When a namespace has Istio sidecar injection enabled, every Pod automatically gets an Envoy proxy container added alongside the app container. All inbound and outbound traffic for that Pod is transparently routed through this proxy (via iptables rules set up at Pod startup), rather than going directly between app containers. This lets Istio enforce mutual TLS between services (automatic encryption + identity verification, with zero app code changes), implement traffic policies (retries, timeouts, circuit breaking, canary traffic splitting), and collect detailed metrics/traces for every request — all at the infrastructure layer, invisible to the application itself.",
    hindiExplanation:
      "Jab kisi namespace mein Istio sidecar injection enable hota hai, har Pod ko automatically ek Envoy proxy container add ho jaata hai app container ke saath. Us Pod ka saara inbound/outbound traffic transparently is proxy se guzarta hai (Pod startup pe set hui iptables rules ke through), directly app containers ke beech jaane ki jagah. Isse Istio mutual TLS enforce kar sakta hai services ke beech (automatic encryption + identity verification, bina app code change kiye), traffic policies implement kar sakta hai (retries, timeouts, circuit breaking, canary traffic splitting), aur har request ke detailed metrics/traces collect kar sakta hai — sab infrastructure layer pe, application ke liye invisible.",
    interviewExplanation:
      "I'd explain the mechanism, not just the buzzwords: 'Istio injects an Envoy proxy sidecar into every Pod in a mesh-enabled namespace. All network traffic for that Pod gets transparently routed through the proxy via iptables rules, not directly between app containers. That lets Istio enforce mutual TLS, implement retries/timeouts/circuit breaking, and collect detailed metrics and tracing — all without the application code knowing or changing anything.'",
    diagramNote:
      "Two Pods, each with an App container + Envoy sidecar; traffic between them flows App1 → Envoy1 → Envoy2 → App2 (never directly App-to-App), with mTLS between the two Envoy proxies.",
    diagramMermaid: `flowchart LR
    subgraph P1["Pod 1"]
        A1["App"] --> E1["Envoy sidecar"]
    end
    subgraph P2["Pod 2"]
        E2["Envoy sidecar"] --> A2["App"]
    end
    E1 -- "mTLS" --> E2`,
    realProjectExample:
      "Enabling Istio's mTLS between all our microservices required zero application code changes — just enabling sidecar injection on the namespace — and we got service-to-service traffic encryption and a full request-tracing dashboard as a side effect.",
    interviewTip:
      "The specific mechanism — 'iptables redirects traffic through the injected Envoy sidecar' — is what separates a strong senior answer from a vague 'it adds security and observability' one.",
    followupQuestions: [
      "How is sidecar injection actually enabled for a namespace?",
      "What is mutual TLS (mTLS) and why does it matter?",
      "What observability data does Istio provide out of the box?",
    ],
    commonMistakes: [
      "Describing Istio's benefits without explaining the sidecar interception mechanism.",
      "Thinking Istio requires application code changes to get mTLS.",
    ],
    importantPoints: [
      "Istio injects an Envoy sidecar into every Pod in a mesh-enabled namespace.",
      "Traffic is transparently routed through the sidecar via iptables, not directly.",
      "Enables mTLS, traffic policies, and observability with zero app code changes.",
    ],
    revisionNotes: "Istio = service mesh, injects Envoy sidecar per Pod, transparently intercepts traffic (iptables) for mTLS/routing/observability — no app code changes.",
  },
  {
    id: "kyma-q18",
    topic: "Istio",
    prompt: "How does Istio enable canary traffic splitting (e.g. 90% to v1, 10% to v2)?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["istio", "canary", "traffic-management"],
    estimatedMinutes: 3,
    expectedAnswer:
      "Istio's VirtualService and DestinationRule resources let you define weighted traffic routing rules across different Pod subsets (versions), so the Envoy sidecars split incoming requests by percentage without needing separate Kubernetes Services per version.",
    detailedAnswer:
      "A DestinationRule defines named 'subsets' of a Service based on Pod labels (e.g. version: v1, version: v2). A VirtualService then routes traffic to a host with weighted rules across those subsets — e.g. 90% weight to the v1 subset, 10% to the v2 subset. Because this routing logic lives in the Envoy sidecars (configured by Istio's control plane, istiod), the actual traffic split happens transparently at the network layer — the client calling the Service has no idea it's being split, and you can adjust weights incrementally (10% → 25% → 50% → 100%) as you gain confidence in the new version, all without touching Kubernetes Deployments or Services directly.",
    hindiExplanation:
      "DestinationRule Service ke 'subsets' define karta hai Pod labels ke aadhar pe (jaise version: v1, version: v2). VirtualService fir un subsets mein weighted traffic routing rules define karta hai — jaise v1 subset ko 90% weight, v2 ko 10%. Ye routing logic Envoy sidecars mein rehta hai (Istio ke control plane, istiod, se configure hota hai), isliye actual traffic split network layer pe transparently hota hai — Service ko call karne wale client ko pata hi nahi chalta ki split ho raha hai, aur tum weights ko gradually badha sakte ho (10% → 25% → 50% → 100%) jaise-jaise naye version pe confidence badhta hai, bina Kubernetes Deployments ya Services ko directly touch kiye.",
    interviewExplanation:
      "I'd name the two resources and their roles: 'A DestinationRule defines subsets of a Service based on Pod labels, like version v1 and v2. A VirtualService then applies weighted routing across those subsets — say 90/10. This is enforced by the Envoy sidecars, configured through Istio's control plane, so the split happens transparently at the network layer, and I can gradually shift the weight as confidence in the new version grows.'",
    diagramNote:
      "VirtualService with weighted routing (90%/10%) pointing to two DestinationRule subsets (v1 Pods, v2 Pods), enforced by Envoy sidecars.",
    diagramMermaid: `flowchart TD
    VS["VirtualService<br/>90% / 10% weighted routing"] --> DR["DestinationRule subsets"]
    DR --> V1["v1 Pods (90%)"]
    DR --> V2["v2 Pods (10%)"]`,
    realProjectExample:
      "We rolled out a new API version by starting its VirtualService weight at 5%, monitoring error rates via Istio's built-in metrics, then incrementally increasing to 100% over a day once confident, all without a single change to the underlying Deployments.",
    interviewTip:
      "Naming both `VirtualService` and `DestinationRule` specifically (not just 'Istio routing rules') is what shows real hands-on experience with traffic management in Istio.",
    followupQuestions: [
      "What is istiod and what role does it play?",
      "How would you route traffic based on a request header instead of a fixed percentage?",
      "What happens to existing connections when you change the traffic weights?",
    ],
    commonMistakes: [
      "Not knowing the specific resource names (VirtualService, DestinationRule).",
      "Thinking canary splitting requires separate Kubernetes Services per version.",
    ],
    importantPoints: [
      "DestinationRule = defines subsets (versions) via Pod labels.",
      "VirtualService = weighted routing rules across those subsets.",
      "Enforced by Envoy sidecars, transparent to the calling client.",
    ],
    revisionNotes: "Canary splitting = DestinationRule (subsets by label) + VirtualService (weighted routing), enforced by Envoy sidecars.",
  },
  {
    id: "kyma-q19",
    topic: "Istio",
    prompt: "What happens to an app if its Istio sidecar proxy fails or isn't ready yet during Pod startup?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["istio", "troubleshooting"],
    estimatedMinutes: 2,
    expectedAnswer:
      "Since all traffic is routed through the sidecar, if it's not ready before the app container starts accepting traffic, requests can fail; Istio addresses this with 'holdApplicationUntilProxyStarts' behavior or init-container ordering so the sidecar is ready before the app's traffic starts flowing.",
    detailedAnswer:
      "Because Istio's sidecar interception is transparent at the network layer, a race condition can occur: if the app container starts and begins receiving/sending traffic before its Envoy sidecar has finished starting, requests through the (not-yet-ready) proxy can fail. Istio addresses this with startup ordering configuration (like `holdApplicationUntilProxyStarts` or newer native Kubernetes sidecar container support) to ensure the proxy is healthy before the app container is considered ready to receive traffic. If the sidecar crashes later during normal operation, that Pod effectively loses network connectivity for mesh traffic until the sidecar is restarted (typically automatically, since it's just another container in the Pod).",
    hindiExplanation:
      "Kyunki Istio ka sidecar interception network layer pe transparent hota hai, ek race condition ho sakti hai — agar app container start hokar traffic lena/dena shuru kar de uske Envoy sidecar ke ready hone se pehle, toh (abhi ready na hue) proxy ke through requests fail ho sakti hain. Istio isse startup ordering configuration se handle karta hai (jaise `holdApplicationUntilProxyStarts` ya newer native Kubernetes sidecar container support), taaki proxy healthy ho jaaye app container ke traffic lene se pehle. Agar sidecar baad mein normal operation ke dauraan crash ho jaaye, toh us Pod ki mesh traffic ke liye network connectivity effectively chali jaati hai jab tak sidecar restart na ho (usually automatically, kyunki wo Pod ka bas ek aur container hai).",
    interviewExplanation:
      "I'd name the actual race condition: 'Since all traffic goes through the sidecar, there's a potential race — if the app container starts accepting traffic before its Envoy sidecar is ready, those requests can fail. Istio handles this with startup ordering, like holdApplicationUntilProxyStarts, ensuring the proxy is healthy first. If the sidecar crashes later, that Pod loses mesh connectivity until it restarts, which normally happens automatically since it's just another container in the Pod.'",
    diagramNote:
      "Sequence: 'Pod starting' → 'Envoy sidecar starts and becomes ready' → 'App container allowed to start receiving traffic' — vs a warning path if this order is violated: 'App starts first → requests through not-yet-ready proxy fail'.",
    diagramMermaid: `flowchart TD
    A["Pod starting"] --> B["Envoy sidecar starts, becomes ready"]
    B --> C["App container starts receiving traffic"]
    A -.-> D["If app starts first:<br/>requests through not-yet-ready proxy fail"]`,
    realProjectExample:
      "We hit intermittent connection-refused errors right after Pod startup until enabling proper sidecar startup ordering, which eliminated the race between the app container coming up and its Envoy proxy being ready.",
    interviewTip:
      "This is a genuinely advanced/senior-level gotcha — even mentioning 'there's a known startup ordering race with sidecars' without full detail shows deeper real-world exposure than most candidates have.",
    followupQuestions: [
      "What is `holdApplicationUntilProxyStarts` and what does it configure?",
      "How does native Kubernetes sidecar container support (newer K8s versions) help this problem?",
      "What happens to in-flight requests if the sidecar crashes mid-operation?",
    ],
    commonMistakes: [
      "Not knowing this startup race condition exists at all.",
      "Assuming a crashed sidecar has no effect on the app container's network connectivity.",
    ],
    importantPoints: [
      "Sidecar readiness must precede app traffic — a known startup race condition.",
      "Istio addresses it via startup ordering configuration.",
      "A crashed sidecar effectively cuts that Pod's mesh network connectivity until restarted.",
    ],
    revisionNotes: "Sidecar-not-ready-yet = startup race; Istio orders sidecar-before-app via config. Sidecar crash = Pod loses mesh connectivity until restart.",
  },
  {
    id: "kyma-q20",
    topic: "API Rules",
    prompt: "What is a Kyma API Rule, and what access strategies does it support?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["api-rules", "api-gateway"],
    estimatedMinutes: 3,
    expectedAnswer:
      "An API Rule is Kyma's custom resource (via the API Gateway module) that exposes a Kubernetes Service externally with a defined access strategy — options include 'noop' (no auth, open), 'jwt' (require a valid JWT token), and 'oauth2_introspection', among others, plus optional rate limiting.",
    detailedAnswer:
      "Without an API Rule, a Service is only reachable inside the cluster. An API Rule declares an external hostname, which Service/port to expose, and an access strategy per path — 'noop' allows unauthenticated access (fine for public health-check endpoints, risky for anything sensitive), 'jwt' validates a bearer token against a configured issuer/JWKS before allowing the request through, and other strategies integrate with OAuth2 introspection for token validation against an authorization server. You can also layer in rate limiting to protect the backend from excessive traffic. Effectively, the API Rule is the Kyma-native way of saying 'expose this internal Service to the outside world, and here's exactly how callers must authenticate.'",
    hindiExplanation:
      "API Rule ke bina, ek Service sirf cluster ke andar hi reachable hota hai. API Rule ek external hostname declare karta hai, batata hai kaunsi Service/port expose karni hai, aur har path ke liye ek access strategy — 'noop' unauthenticated access allow karta hai (public health-check endpoints ke liye theek hai, sensitive cheezon ke liye risky), 'jwt' ek bearer token ko configured issuer/JWKS ke against validate karta hai request allow karne se pehle, aur doosri strategies OAuth2 introspection ke saath integrate hoti hain. Rate limiting bhi layer kar sakte ho backend ko excessive traffic se bachane ke liye. Effectively, API Rule Kyma ka native tarika hai ye batane ka ki 'is internal Service ko bahar expose karo, aur callers ko exactly aise authenticate karna hai'.",
    interviewExplanation:
      "I'd explain the purpose and name the strategies: 'An API Rule is how you expose an internal Kubernetes Service externally in Kyma, via the API Gateway module. You define the hostname, which Service to expose, and an access strategy per path — noop for open access, jwt to require a valid bearer token, or oauth2_introspection to validate against an authorization server. You can also add rate limiting on top.'",
    diagramNote:
      "Internal Service (not reachable externally by default) → API Rule declares external hostname + access strategy (noop / jwt / oauth2_introspection) → externally reachable endpoint.",
    diagramMermaid: `flowchart LR
    S["Internal Service<br/>not externally reachable"] --> AR["API Rule<br/>hostname + access strategy"]
    AR --> N["noop (open)"]
    AR --> J["jwt (bearer token)"]
    AR --> O["oauth2_introspection"]
    AR --> EXT["Externally reachable endpoint"]`,
    realProjectExample:
      "We exposed a public health-check endpoint with the 'noop' strategy but locked down the actual business API on the same Service with a 'jwt' strategy requiring a valid XSUAA-issued token, all declared per-path in the same API Rule.",
    interviewTip:
      "Mentioning per-path access strategies (not just one blanket rule for the whole Service) shows a more precise, production-realistic understanding.",
    followupQuestions: [
      "What's the security risk of using the 'noop' strategy carelessly?",
      "How does the 'jwt' strategy validate a token?",
      "Can one API Rule define different access strategies for different paths?",
    ],
    commonMistakes: [
      "Using 'noop' on sensitive endpoints without realizing it means no authentication at all.",
      "Not knowing API Rules are what actually make a Service reachable from outside the cluster.",
    ],
    importantPoints: [
      "API Rule = exposes a Service externally with a defined access strategy.",
      "Strategies: noop (open), jwt (bearer token), oauth2_introspection, and more.",
      "Can add rate limiting; strategies can differ per path.",
    ],
    revisionNotes: "API Rule = external exposure + access strategy (noop/jwt/oauth2_introspection) for a Service, per path, plus optional rate limiting.",
  },
  {
    id: "kyma-q21",
    topic: "API Rules",
    prompt: "Why would exposing a Service with the 'noop' access strategy be a security risk?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["api-rules", "security"],
    estimatedMinutes: 2,
    expectedAnswer:
      "'noop' means no authentication check is enforced by the API Rule at all — anyone who discovers the URL can call it, so it should only be used for genuinely public, non-sensitive endpoints (like a health check), never for anything touching business data.",
    detailedAnswer:
      "The 'noop' strategy literally does nothing for auth — it's a deliberate 'no operation' choice for endpoints meant to be fully public. Using it on an endpoint that returns or modifies business data means anyone on the internet who finds or guesses the URL can access it freely, with no way to trace or restrict who's calling. This is a genuinely common real-world misconfiguration mistake — teams sometimes use 'noop' during development for convenience and forget to switch to a proper auth strategy (jwt or oauth2_introspection) before going to production.",
    hindiExplanation:
      "'noop' strategy literally auth ke liye kuch bhi nahi karti — ye ek deliberate 'no operation' choice hai un endpoints ke liye jo genuinely public hone chahiye. Agar isse kisi aise endpoint pe use kiya jaaye jo business data return ya modify karta hai, toh internet pe koi bhi jisne URL dhundh liya ya guess kar liya, wo freely access kar sakta hai, bina kisi trace/restriction ke ki kaun call kar raha hai. Ye ek genuinely common real-world misconfiguration mistake hai — teams development ke dauraan convenience ke liye 'noop' use kar deti hain aur production mein jaane se pehle proper auth strategy (jwt ya oauth2_introspection) pe switch karna bhool jaati hain.",
    interviewExplanation:
      "I'd be direct about the risk: 'noop means literally no authentication is enforced — anyone who finds the URL can call it. It should only ever be used for genuinely public endpoints like a health check. A very common real mistake is using noop during development for convenience and forgetting to switch to jwt or oauth2_introspection before production.'",
    diagramNote:
      "'API Rule with noop strategy' → 'Anyone with the URL can call it (no auth check)' with a warning icon, contrasted with 'API Rule with jwt strategy' → 'Only requests with a valid token succeed'.",
    diagramMermaid: `flowchart LR
    A["API Rule: noop"] --> B["Anyone with the URL<br/>can call it — no auth check"]
    C["API Rule: jwt"] --> D["Only valid-token<br/>requests succeed"]`,
    realProjectExample:
      "A security review flagged an internal reporting endpoint accidentally left on 'noop' from initial development, exposing business data publicly — switching it to 'jwt' with proper token validation closed the gap immediately.",
    interviewTip:
      "This is a great scenario question to answer with 'I've seen/would catch this in a security review' — it shows practical security awareness beyond just knowing the strategy names.",
    followupQuestions: [
      "What kind of endpoints are genuinely appropriate for 'noop'?",
      "How would you audit a cluster for accidentally 'noop'-exposed sensitive endpoints?",
      "What's the difference between 'jwt' and 'oauth2_introspection' strategies?",
    ],
    commonMistakes: [
      "Using 'noop' for convenience during development and forgetting to change it before production.",
      "Not recognizing 'noop' as a genuine security risk when auditing API Rules.",
    ],
    importantPoints: [
      "'noop' = zero authentication enforced, anyone can call it.",
      "Appropriate only for genuinely public, non-sensitive endpoints.",
      "A common real misconfiguration: forgetting to change it before production.",
    ],
    revisionNotes: "'noop' = no auth at all — fine only for genuinely public endpoints (health checks); a common, real security misconfiguration if left on sensitive ones.",
  },
  {
    id: "kyma-q22",
    topic: "Secrets",
    prompt: "What is a Kubernetes Secret, and is it actually encrypted?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["secrets", "security"],
    estimatedMinutes: 3,
    expectedAnswer:
      "A Secret is a Kubernetes object for storing sensitive data (passwords, tokens, certs) separately from Pod specs, injectable as environment variables or mounted files — but by default it's only base64-encoded, NOT encrypted, unless you explicitly enable encryption-at-rest for etcd or use an external secrets manager integration.",
    detailedAnswer:
      "A Secret keeps sensitive values out of your Deployment YAML and application code, and lets you inject them into Pods as environment variables or mounted volume files. The critical nuance: base64 encoding is not encryption — anyone with API access to read that Secret object (or direct etcd access) can trivially decode it, since base64 is fully reversible with no key required. Real protection requires enabling etcd encryption-at-rest (so the underlying storage is actually encrypted) and tightly scoping RBAC so only the Pods/users that truly need it can read a given Secret. Many production setups also integrate with an external secrets manager (like a Vault-backed operator) rather than relying on raw Kubernetes Secrets alone.",
    hindiExplanation:
      "Secret ek Kubernetes object hai sensitive data (passwords, tokens, certs) store karne ke liye, Pod specs se alag rakh kar, aur Pods mein environment variables ya mounted files ki tarah inject kiya ja sakta hai. Important nuance ye hai — base64 encoding encryption nahi hai — koi bhi jiske paas us Secret object ko read karne ka API access hai (ya direct etcd access), wo use trivially decode kar sakta hai, kyunki base64 poori tarah reversible hai, koi key nahi chahiye. Real protection ke liye etcd encryption-at-rest enable karna padta hai (taaki underlying storage actually encrypted ho) aur RBAC ko tightly scope karna padta hai taaki sirf zaroorat wale Pods/users hi kisi Secret ko read kar sakein. Kai production setups external secrets manager (jaise Vault-backed operator) ke saath bhi integrate karte hain.",
    interviewExplanation:
      "I'd correct the common misconception directly: 'A Secret stores sensitive data separately from Pod specs and injects it as env vars or mounted files. But by default it's only base64-encoded, not encrypted — anyone with API or etcd access can trivially decode it. Real protection needs etcd encryption-at-rest enabled and tight RBAC scoping, and many teams integrate an external secrets manager like Vault rather than relying on raw Secrets alone.'",
    diagramNote:
      "'Secret object (base64-encoded, NOT encrypted by default)' with a warning arrow to 'anyone with API/etcd access can decode trivially', contrasted with 'etcd encryption-at-rest enabled + tight RBAC = actual protection'.",
    diagramMermaid: `flowchart LR
    A["Secret object<br/>base64-encoded, NOT encrypted"] -.-> B["Anyone with API/etcd access<br/>can decode trivially"]
    C["etcd encryption-at-rest<br/>+ tight RBAC"] --> D["Actual protection"]`,
    realProjectExample:
      "A security audit flagged that base64-'encoded' database credentials in a Secret were assumed to be 'encrypted' by the team — after enabling etcd encryption-at-rest and tightening RBAC to that namespace, the actual risk was properly closed.",
    interviewTip:
      "This is one of the most common Kubernetes security misconceptions — explicitly stating 'base64 is encoding, not encryption' is exactly what a strong answer needs to include.",
    followupQuestions: [
      "How do you enable etcd encryption-at-rest?",
      "What's the difference between mounting a Secret as an env var vs a volume file?",
      "What's an external secrets manager integration and why use one?",
    ],
    commonMistakes: [
      "Believing base64 encoding provides real encryption/security.",
      "Not knowing etcd encryption-at-rest must be explicitly enabled for actual protection.",
    ],
    importantPoints: [
      "Secret = sensitive data, separate from Pod spec, injectable as env/volume.",
      "Base64 by default — encoding, NOT encryption.",
      "Real protection: etcd encryption-at-rest + tight RBAC (+ external secrets manager, optionally).",
    ],
    revisionNotes: "Secret = base64-encoded by default (NOT encrypted). Real security = etcd encryption-at-rest + tight RBAC (+ external secrets manager).",
  },
  {
    id: "kyma-q23",
    topic: "Secrets",
    prompt: "What's the difference between mounting a Secret as an environment variable versus as a volume file?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["secrets", "volumes"],
    estimatedMinutes: 2,
    expectedAnswer:
      "An env var injection is a one-time snapshot at container start — updating the Secret later doesn't change the running process's environment; a mounted volume file is kept in sync by the kubelet and updates automatically (after a short delay) when the Secret changes, without needing a Pod restart.",
    detailedAnswer:
      "Environment variables are set once when the container process starts — there's no mechanism for Kubernetes to 'push' an updated value into an already-running process's environment, so if the Secret changes, you must restart the Pod to pick up the new value. A volume-mounted Secret, by contrast, is periodically synced by the kubelet (typically within a minute or so of the Secret changing), updating the file's contents on disk without any Pod restart — but this only helps if your application actually re-reads the file periodically rather than caching its contents in memory at startup, which is an application-level responsibility, not something Kubernetes handles for you.",
    hindiExplanation:
      "Environment variables container process start hote waqt ek baar set hote hain — Kubernetes ke paas koi mechanism nahi hai ki already-running process ke environment mein updated value 'push' kar sake, isliye agar Secret change ho, toh naya value pick karne ke liye Pod restart karna padta hai. Volume-mounted Secret alag hai — kubelet periodically usse sync karta hai (Secret change hone ke ek minute ke andar), disk pe file ka content update ho jaata hai bina Pod restart kiye — lekin ye tabhi useful hai jab tumhari application actually file ko periodically re-read kare, na ki startup pe contents ko memory mein cache kar le, jo ek application-level responsibility hai, Kubernetes ye khud handle nahi karta.",
    interviewExplanation:
      "I'd explain the practical difference: 'Env vars are a one-time snapshot at container start — if the Secret changes later, the running process never sees it until you restart the Pod. A volume-mounted Secret is kept in sync by the kubelet and updates on disk automatically within about a minute of the Secret changing, with no restart needed — but only if the app actually re-reads the file rather than caching it in memory at startup.'",
    diagramNote:
      "Two paths: 'Env var: set once at container start, static until restart' vs 'Volume file: kubelet syncs updates automatically (~1 min delay), app must re-read to see changes'.",
    diagramMermaid: `flowchart LR
    A["Secret changes"] --> B["Env var injection:<br/>static until Pod restart"]
    A --> C["Volume file:<br/>kubelet syncs (~1 min)"]
    C --> D["App must re-read file<br/>to see the update"]`,
    realProjectExample:
      "An app expecting rotated credentials to apply automatically kept failing until we realized it read the Secret as an env var — switching to a volume mount (and adding logic to periodically re-read the file) let credential rotations apply without a Pod restart.",
    interviewTip:
      "If asked about supporting credential rotation without downtime, mentioning the volume-mount-plus-re-read pattern (rather than env vars) is the precise, correct answer.",
    followupQuestions: [
      "How would you make an application re-read a mounted Secret file periodically?",
      "How long does the kubelet typically take to sync a changed Secret to a mounted volume?",
      "Does this same env-var-vs-volume distinction apply to ConfigMaps too?",
    ],
    commonMistakes: [
      "Assuming an env-var-injected Secret updates automatically when the Secret changes.",
      "Not knowing the app itself must re-read a mounted file to see updates — Kubernetes doesn't push it in.",
    ],
    importantPoints: [
      "Env var = one-time snapshot at container start, static until restart.",
      "Volume file = kubelet keeps it in sync automatically (short delay).",
      "App must actively re-read the mounted file to see updates — not automatic in-process.",
    ],
    revisionNotes: "Env var Secret = static snapshot (needs restart to update). Volume-mounted Secret = kubelet auto-syncs, but app must re-read file to see changes.",
  },
  {
    id: "kyma-q24",
    topic: "Monitoring",
    prompt: "What observability signals would you want for a Kyma workload, and where do they typically come from?",
    difficulty: "Intermediate",
    experienceLevel: "0-2 Years",
    tags: ["monitoring", "observability"],
    estimatedMinutes: 3,
    expectedAnswer:
      "The three pillars are metrics (CPU/memory/request rates, typically via Prometheus), logs (application stdout/stderr, aggregated via a logging stack like Loki or Fluent Bit), and distributed traces (per-request spans across services, via Jaeger/OpenTelemetry) — Kyma's telemetry/observability tooling collects all three, and Istio's sidecars contribute a lot of the metrics/tracing data automatically.",
    detailedAnswer:
      "Metrics tell you aggregate health and trends (is CPU spiking, is the error rate rising) and are typically scraped by Prometheus from both the app (if it exposes a /metrics endpoint) and Istio's Envoy sidecars (which emit detailed per-request metrics automatically, with zero app instrumentation). Logs are the raw stdout/stderr from each container, collected and shipped to a central store so you can search across all Pods rather than `kubectl logs`-ing each one individually. Distributed tracing follows a single request as it hops across multiple services, showing you exactly where time was spent — Istio's sidecars can automatically propagate trace headers and emit spans, giving you cross-service tracing without instrumenting every app individually (though apps still need to forward the trace context headers for full continuity).",
    hindiExplanation:
      "Teen pillars hote hain: metrics (CPU/memory/request rates, usually Prometheus se), logs (application ka stdout/stderr, ek logging stack jaise Loki/Fluent Bit se aggregate hota hai), aur distributed traces (per-request spans multiple services ke aar-paar, Jaeger/OpenTelemetry se). Metrics batate hain aggregate health aur trends (CPU spike ho raha hai kya, error rate badh raha hai kya) — Prometheus app se (agar wo /metrics endpoint expose kare) aur Istio ke Envoy sidecars se (jo automatically detailed per-request metrics emit karte hain, bina app instrumentation ke) dono se scrape hote hain. Logs har container ka raw stdout/stderr hote hain, central store mein collect/ship hote hain taaki sab Pods mein search kar sako, har ek pe `kubectl logs` chalane ki jagah. Distributed tracing ek single request ko track karta hai jab wo multiple services ke aar-paar jaata hai — Istio ke sidecars automatically trace headers propagate aur spans emit kar sakte hain.",
    interviewExplanation:
      "I'd name the three pillars and where each comes from: 'Metrics — CPU, memory, request rates — typically via Prometheus, scraped from both the app and Istio's Envoy sidecars, which emit detailed per-request metrics automatically. Logs — raw stdout/stderr — aggregated centrally via something like Loki so I can search across all Pods. Distributed tracing follows a request across services, and Istio's sidecars can propagate trace headers and emit spans automatically, though the app still needs to forward those headers for full continuity.'",
    diagramNote:
      "Three parallel pillars feeding into an observability dashboard: 'Metrics (Prometheus, from app + Istio sidecars)', 'Logs (central aggregation, e.g. Loki)', 'Traces (Jaeger/OpenTelemetry, via Istio sidecars + app header propagation)'.",
    diagramMermaid: `flowchart LR
    A["Metrics<br/>Prometheus (app + Istio sidecars)"] --> D["Observability Dashboard"]
    B["Logs<br/>central aggregation (Loki)"] --> D
    C["Traces<br/>Jaeger/OpenTelemetry (Istio + app headers)"] --> D`,
    realProjectExample:
      "During a performance investigation, distributed tracing showed a specific downstream service call was responsible for 80% of total request latency — a finding that raw logs and metrics alone hadn't made obvious, since neither showed the full request path across services.",
    interviewTip:
      "Naming all three pillars (metrics, logs, traces) — not just 'logs and monitoring' — is what shows a complete observability mental model.",
    followupQuestions: [
      "What does Istio contribute to observability automatically, without app changes?",
      "What must an application still do itself for full distributed tracing?",
      "How would you correlate a log line with a specific trace?",
    ],
    commonMistakes: [
      "Only mentioning logs and calling it 'monitoring', missing metrics and tracing as distinct pillars.",
      "Assuming Istio gives full tracing with zero app involvement — apps still need to propagate trace headers.",
    ],
    importantPoints: [
      "Three pillars: metrics, logs, distributed traces.",
      "Istio's sidecars automatically contribute a lot of metrics/tracing data.",
      "Apps still need to propagate trace headers for full end-to-end tracing continuity.",
    ],
    revisionNotes: "Observability = metrics (Prometheus) + logs (central aggregation) + traces (Jaeger/OTel). Istio sidecars auto-contribute metrics/tracing; app must still forward trace headers.",
  },
  {
    id: "kyma-q25",
    topic: "Monitoring",
    prompt: "A Pod is reported as 'Running' by Kubernetes but the application inside seems unresponsive. How would you investigate?",
    difficulty: "Advanced",
    experienceLevel: "2-5 Years",
    tags: ["monitoring", "troubleshooting", "scenario"],
    estimatedMinutes: 3,
    expectedAnswer:
      "'Running' only means the container process hasn't exited — check readiness/liveness probe results (`kubectl describe pod`), pull recent logs, check resource usage for throttling/OOM-adjacent pressure, and consider `kubectl exec` into the Pod for live diagnostics — since 'Running' says nothing about whether the app is actually serving requests correctly.",
    detailedAnswer:
      "Kubernetes' 'Running' Pod phase strictly means the container's main process is alive — it has zero awareness of whether the application logic inside is functioning correctly. If a readiness probe is configured and failing, the Pod would actually be removed from the Service's endpoints (no traffic routed to it) — check that first via `kubectl describe pod`, which shows recent probe failures and events. Next, pull recent logs for exceptions or hangs. Check `kubectl top pod` for CPU/memory pressure that might indicate the process is thrashing or CPU-throttled rather than truly hung. If still unclear, `kubectl exec` into the Pod (or use an ephemeral debug container) to run live diagnostics — check open connections, thread dumps, or whatever language-specific tooling applies.",
    hindiExplanation:
      "Kubernetes ka 'Running' Pod phase strictly matlab hai ki container ka main process zinda hai — isse koi lena-dena nahi ki andar application logic sahi se kaam kar raha hai ya nahi. Agar readiness probe configured hai aur fail ho rahi hai, toh Pod actually Service ke endpoints se hata diya jaata hai (koi traffic route nahi hota) — pehle ye check karo `kubectl describe pod` se, jo recent probe failures aur events dikhata hai. Fir recent logs check karo exceptions ya hangs ke liye. `kubectl top pod` se CPU/memory pressure check karo — ho sakta hai process thrash ho raha ho ya CPU-throttled ho, genuinely hung na ho. Agar abhi bhi clear na ho, toh `kubectl exec` se Pod ke andar jaake (ya ephemeral debug container use karke) live diagnostics chalao.",
    interviewExplanation:
      "I'd walk through the investigation in order: 'Running only means the process hasn't exited, nothing about app health. First I'd check readiness/liveness probe status via kubectl describe pod — if readiness is failing, it's already been pulled from the Service's endpoints. Then recent logs for exceptions or hangs, then kubectl top pod for CPU/memory pressure like throttling. If still unclear, I'd exec into the Pod or use an ephemeral debug container for live diagnostics.'",
    diagramNote:
      "Troubleshooting flow: 'Pod Running but app unresponsive' → 'kubectl describe pod (probe status?)' → 'Check recent logs' → 'kubectl top pod (resource pressure?)' → 'kubectl exec / debug container (live diagnostics)'.",
    diagramMermaid: `flowchart TD
    A["Pod Running but app unresponsive"] --> B["kubectl describe pod<br/>probe status?"]
    B --> C["Check recent logs"]
    C --> D["kubectl top pod<br/>resource pressure?"]
    D --> E["kubectl exec / debug container<br/>live diagnostics"]`,
    realProjectExample:
      "A 'Running' Pod turned out to have its readiness probe silently failing for hours — it had already been pulled from Service endpoints and was receiving zero real traffic, which `kubectl describe pod` revealed immediately once we thought to check probe status rather than assuming 'Running' meant 'healthy'.",
    interviewTip:
      "The key insight to state explicitly is that 'Running' is a weak signal — it says nothing about application-level health, only that the process hasn't crashed.",
    followupQuestions: [
      "What's the difference between a readiness probe and a liveness probe in this scenario?",
      "What does an ephemeral debug container let you do that a regular exec doesn't?",
      "How would CPU throttling show up in kubectl top vs application behavior?",
    ],
    commonMistakes: [
      "Assuming 'Running' means the application is healthy and functioning correctly.",
      "Not checking readiness probe status as an early, high-value diagnostic step.",
    ],
    importantPoints: [
      "'Running' only means the process is alive — no guarantee of app-level health.",
      "Check probe status first (a failing readiness probe already pulled it from traffic).",
      "Then logs, then resource pressure, then live exec/debug container diagnostics.",
    ],
    revisionNotes: "'Running' != healthy. Investigate: probe status (describe pod) → logs → resource pressure (top pod) → exec/debug container for live diagnosis.",
  },
];

export const kymaRuntimeMcqs: BtpMcq[] = [
  {
    id: "kyma-mcq1",
    topic: "Containers",
    prompt: "What's the key architectural difference between a container and a virtual machine?",
    options: [
      "Containers are always bigger than VMs",
      "Containers share the host kernel; VMs virtualize a full guest OS",
      "VMs start faster than containers",
      "There is no real difference",
    ],
    correctIndex: 1,
    explanation: "Containers share the host's kernel, making them much lighter and faster to start than VMs, which virtualize an entire guest OS.",
  },
  {
    id: "kyma-mcq2",
    topic: "Kubernetes",
    prompt: "Which component is the actual persistent store of a Kubernetes cluster's desired state?",
    options: ["kubelet", "API Server", "etcd", "Scheduler"],
    correctIndex: 2,
    explanation: "etcd is the key-value store holding all cluster configuration/desired state; the API server is the interface to it, not the store itself.",
  },
  {
    id: "kyma-mcq3",
    topic: "Pods",
    prompt: "Why is a Kubernetes Service needed instead of just using Pod IP addresses directly?",
    options: [
      "Pod IPs cost extra",
      "Pod IPs are ephemeral and change when a Pod is recreated",
      "Services are required for a Pod to have any IP at all",
      "There's no real reason, it's just convention",
    ],
    correctIndex: 1,
    explanation: "Pod IPs change every time a Pod is recreated; a Service gives a stable IP/DNS name that load-balances across whichever Pods currently match its selector.",
  },
  {
    id: "kyma-mcq4",
    topic: "Deployments",
    prompt: "What relationship does a Deployment have with a ReplicaSet?",
    options: [
      "They're unrelated, separate resources",
      "A Deployment manages a ReplicaSet, which ensures the desired Pod count",
      "A ReplicaSet manages multiple Deployments",
      "ReplicaSets are deprecated and unused by Deployments",
    ],
    correctIndex: 1,
    explanation: "A Deployment manages a ReplicaSet (which keeps the desired number of Pods running) and adds rolling update/rollback behavior on top.",
  },
  {
    id: "kyma-mcq5",
    topic: "Namespaces",
    prompt: "Do Kubernetes Namespaces provide network isolation between Pods by default?",
    options: [
      "Yes, always, automatically",
      "No — Pods in different namespaces can reach each other unless a NetworkPolicy restricts it",
      "Only in Kyma, not in vanilla Kubernetes",
      "Only for Secrets, not for Pods",
    ],
    correctIndex: 1,
    explanation: "Namespaces are a logical/administrative boundary (names, RBAC, quotas) — network reachability across namespaces is allowed by default unless a NetworkPolicy restricts it.",
  },
  {
    id: "kyma-mcq6",
    topic: "Functions",
    prompt: "What must you write yourself when deploying a Kyma Function, compared to a regular containerized microservice?",
    options: [
      "A full Dockerfile and image build pipeline",
      "Just the handler code — Kyma's Serverless module builds the container automatically",
      "A Kubernetes Deployment manifest by hand",
      "A custom container registry",
    ],
    correctIndex: 1,
    explanation: "Kyma Functions only require the handler code; the Serverless module automatically builds and containerizes it, unlike a regular microservice where you write and build your own Dockerfile.",
  },
  {
    id: "kyma-mcq7",
    topic: "Serverless",
    prompt: "What is the main tradeoff of 'scale to zero'?",
    options: [
      "It costs more than always-on instances",
      "Cold start latency on the first request after being idle",
      "It only works for Java applications",
      "It disables logging",
    ],
    correctIndex: 1,
    explanation: "Scaling to zero saves cost when idle but introduces cold-start latency, since a new instance must start before serving the first request after idle time.",
  },
  {
    id: "kyma-mcq8",
    topic: "Helm",
    prompt: "What does a Helm chart's values.yaml file let you do?",
    options: [
      "Store application logs",
      "Override configurable parameters so the same chart deploys differently per environment",
      "Define Kubernetes RBAC roles exclusively",
      "Replace the need for a Kubernetes cluster",
    ],
    correctIndex: 1,
    explanation: "values.yaml supplies the configurable values that fill in a chart's templates, letting the same chart be deployed consistently across dev/staging/prod with different settings.",
  },
  {
    id: "kyma-mcq9",
    topic: "Istio",
    prompt: "How does Istio intercept traffic between services without application code changes?",
    options: [
      "The application must call an Istio SDK directly",
      "An injected Envoy sidecar proxy transparently routes traffic via iptables rules",
      "Istio modifies the application's source code at build time",
      "It requires a special programming language",
    ],
    correctIndex: 1,
    explanation: "Istio injects an Envoy sidecar into each Pod; iptables rules transparently redirect traffic through it, requiring zero changes to application code.",
  },
  {
    id: "kyma-mcq10",
    topic: "API Rules",
    prompt: "Which Kyma API Rule access strategy enforces no authentication at all?",
    options: ["jwt", "oauth2_introspection", "noop", "mtls"],
    correctIndex: 2,
    explanation: "'noop' means no auth check is enforced — appropriate only for genuinely public endpoints, since anyone with the URL can call it.",
  },
  {
    id: "kyma-mcq11",
    topic: "Secrets",
    prompt: "Is a Kubernetes Secret encrypted by default?",
    options: [
      "Yes, fully encrypted automatically",
      "No — it's only base64-encoded unless etcd encryption-at-rest is explicitly enabled",
      "Only if bound to an XSUAA instance",
      "Secrets can't store sensitive data at all",
    ],
    correctIndex: 1,
    explanation: "By default, Secrets are only base64-encoded (trivially reversible), not encrypted — real protection requires enabling etcd encryption-at-rest and tight RBAC.",
  },
  {
    id: "kyma-mcq12",
    topic: "Monitoring",
    prompt: "What does a Kubernetes Pod status of 'Running' actually guarantee?",
    options: [
      "The application inside is fully healthy and serving requests correctly",
      "Only that the container's main process hasn't exited — nothing about app-level health",
      "That all readiness probes have passed",
      "That the Pod has zero resource usage",
    ],
    correctIndex: 1,
    explanation: "'Running' only reflects the container process being alive; it says nothing about whether the application logic inside is actually functioning — check probes, logs, and resource usage separately.",
  },
];
