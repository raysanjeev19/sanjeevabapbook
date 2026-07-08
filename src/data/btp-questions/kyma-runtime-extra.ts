import type { BtpCodingQuestion, BtpLab } from "@/lib/btp-content";

export const kymaRuntimeTopicNotes: Record<string, string> = {
  Containers:
    "Container ek app ko uski dependencies ke saath ek isolated, portable unit mein pack karta hai, lekin host machine ka kernel share karta hai — VM ki tarah poora OS virtualize nahi karta, isliye fast start hote hain aur lightweight hote hain. Container image ek static, immutable, layered snapshot hoti hai (build hokar registry mein store hoti hai), jabki running container us image se banaya gaya ek live process hai, apni ek writable layer ke saath jo restart pe gayab ho jaati hai. Kyma, Kubernetes-based hone ki wajah se, har workload ko containers ke roop mein Pods mein group karke chalata hai.",
  Kubernetes:
    "Kubernetes ek open-source container orchestration platform hai jo Pods, Deployments, Services, Namespaces jaise core primitives deta hai containers ko reliably scale pe chalane ke liye. Control plane (API Server, etcd, Scheduler, Controller Manager) cluster ka desired state maintain karta hai aur decide karta hai kya karna hai; worker nodes (kubelet ke through) actually containers chalate hain. Kubernetes Service ek stable IP/DNS deta hai jo dynamic Pods ke set ko load-balance karta hai, kyunki Pod IPs ephemeral hote hain (har recreation pe badal jaate hain). Kyma is core Kubernetes ke upar curated modules (Istio, Serverless, API Gateway, Eventing) add karta hai, SAP ke support ke saath.",
  Pods:
    "Pod Kubernetes ka sabse chhota deployable unit hai — ek ya zyada containers jo hamesha same node pe saath schedule hote hain, network aur storage share karte hain. Zyada tar Pods mein ek 'main' container hota hai, lekin sidecar pattern common hai (jaise Istio ka Envoy proxy automatically inject hota hai). Agar ek container crash ho jaaye, kubelet usi Pod ke andar usse restart kar deta hai (same IP), lekin agar poora Pod delete ho ya node fail ho jaaye, toh controller (Deployment) ek bilkul naya Pod banata hai naye IP ke saath — isi wajah se kabhi bhi specific Pod IP pe depend nahi karna chahiye, hamesha Service use karo.",
  Deployments:
    "Deployment ek higher-level resource hai jo ek ReplicaSet manage karta hai, jo actual mein desired number of identical Pods ensure karta hai. Deployment iske upar rolling-update aur rollback behavior add karta hai — jab Pod template change hota hai (jaise naya image), ek naya ReplicaSet banta hai aur gradually Pods shift hote hain, purana ReplicaSet thodi der rakha jaata hai taaki `kubectl rollout undo` se rollback ho sake. Native strategies sirf do hain: RollingUpdate (default) aur Recreate (downtime ke saath, jab old/new version saath nahi chal sakte). Blue-green aur canary native nahi hain — inhe Service/Ingress traffic manipulation ya Flagger/Argo Rollouts jaise tools se implement kiya jaata hai.",
  Namespaces:
    "Namespace ek logical partition hai ek hi cluster ke andar jo resource names, RBAC permissions, aur resource quotas ko scope karta hai. Ye by default network isolation NAHI deta — alag namespaces ke Pods aapas mein reach kar sakte hain jab tak koi NetworkPolicy explicitly restrict na kare. Kisi team ko sirf unke namespace tak restrict karne ke liye Role + RoleBinding (dono namespace-scoped) use karo, na ki ClusterRole/ClusterRoleBinding (jo cluster-wide apply hote hain).",
  Functions:
    "Kyma Function ek chhota sa code hai (Node.js ya Python) jo tum bina Dockerfile likhe deploy karte ho — Serverless module automatically build/containerize kar deta hai. Regular microservice ke bilkul ulta, jaha tum khud Dockerfile likhte ho. Functions ko HTTP se (API Rule ke through) ya events se (Eventing system ke through, in-cluster ya external jaise Event Mesh) trigger kiya ja sakta hai. Chhote, intermittent, event/HTTP-triggered workloads ke liye best hain.",
  Serverless:
    "Serverless module Functions ka scale-to-zero behavior enable karta hai — jab traffic na ho, zero instances chalte hain (zero cost), aur naye request pe on-demand spin up hote hain. Tradeoff hai 'cold start' — idle period ke baad pehli request ko wait karna padta hai jab tak naya instance schedule/start ho. Latency-sensitive ya high-frequency workloads ke liye minimum instance count rakhna better hota hai, cost ka thoda tradeoff karke.",
  Helm:
    "Helm Kubernetes ka package manager hai. Ek Chart saare zaroori Kubernetes manifests (Deployment, Service, ConfigMap, Secret) ko templates ki tarah bundle karta hai, values `values.yaml` se fill hote hain — isliye wahi chart alag environments (dev/staging/prod) mein consistently deploy ho sakta hai, sirf values badal ke. Helm 'releases' track karta hai — `helm install` naya release banata hai, `helm upgrade` existing release pe changes apply karta hai (naya revision), aur `helm rollback` kisi purane revision pe wapas le jaata hai.",
  Istio:
    "Istio ek service mesh hai jo har Pod mein ek Envoy sidecar proxy inject karta hai (jab namespace mein sidecar injection enable ho). Saara traffic transparently is proxy se guzarta hai (iptables rules ke through), directly app-to-app nahi jaata — isse Istio mutual TLS enforce kar sakta hai (bina app code change kiye), traffic policies (retries, canary splitting) implement kar sakta hai, aur detailed metrics/traces collect kar sakta hai. Canary traffic splitting DestinationRule (subsets by label) aur VirtualService (weighted routing) se hoti hai. Ek known gotcha hai — agar app container sidecar se pehle traffic lena start kar de, requests fail ho sakti hain (isliye startup ordering config zaroori hai).",
  "API Rules":
    "API Rule Kyma ka custom resource hai (API Gateway module ke through) jo ek internal Kubernetes Service ko externally expose karta hai, ek defined access strategy ke saath — 'noop' (bilkul koi auth nahi, sirf genuinely public endpoints ke liye), 'jwt' (valid bearer token chahiye), 'oauth2_introspection' (authorization server se validate hota hai), aur rate limiting bhi add kar sakte ho. 'noop' ko sensitive endpoints pe galti se use karna ek common real security mistake hai.",
  Secrets:
    "Kubernetes Secret sensitive data (passwords, tokens, certs) store karta hai Pod spec se alag, aur env variable ya mounted file ki tarah inject hota hai. Important — default mein ye sirf base64-encoded hai, ENCRYPTED nahi — koi bhi jiske paas API/etcd access hai, trivially decode kar sakta hai. Real protection ke liye etcd encryption-at-rest enable karna aur RBAC tightly scope karna padta hai. Env var injection ek one-time snapshot hai (Secret change hone pe restart chahiye), jabki volume-mounted Secret kubelet dwara automatically sync hoti hai (~1 minute delay), lekin app ko khud file re-read karni padti hai changes dekhne ke liye.",
  Monitoring:
    "Observability ke teen pillars hain: metrics (Prometheus, app aur Istio sidecars dono se), logs (central aggregation, jaise Loki), aur distributed traces (Jaeger/OpenTelemetry, Istio sidecars automatically contribute karte hain lekin app ko trace headers forward karne padte hain). Yaad rakho — Pod ka 'Running' status sirf itna guarantee karta hai ki container process zinda hai, application ke andar sab thik hai ye nahi batata. Troubleshooting order: probe status check karo (`kubectl describe pod`) → logs → resource pressure (`kubectl top pod`) → live exec/debug container.",
};

export const kymaRuntimeCodingQuestions: BtpCodingQuestion[] = [
  {
    id: "kyma-cq1",
    topic: "Kubernetes",
    language: "Bash",
    difficulty: "Beginner",
    prompt: "Write the kubectl command to list all Pods in the 'dev' namespace.",
    solution: "kubectl get pods -n dev",
    explanation: "`-n` (or `--namespace`) scopes the command to a specific namespace; without it, kubectl uses your current context's default namespace.",
  },
  {
    id: "kyma-cq2",
    topic: "Deployments",
    language: "Bash",
    difficulty: "Intermediate",
    prompt: "Write the command to roll back a Deployment named 'myapp' to its previous revision.",
    solution: "kubectl rollout undo deployment/myapp",
    explanation: "`kubectl rollout undo` reverts a Deployment to the prior ReplicaSet's Pod template — the fastest way to recover from a bad rollout.",
  },
  {
    id: "kyma-cq3",
    topic: "Monitoring",
    language: "Bash",
    difficulty: "Beginner",
    prompt: "Write the command to view the recent events and probe status for a Pod named 'myapp-abc123'.",
    solution: "kubectl describe pod myapp-abc123",
    explanation: "`kubectl describe pod` shows recent events, readiness/liveness probe results, and container status — the first diagnostic step for a Pod that's Running but misbehaving.",
  },
  {
    id: "kyma-cq4",
    topic: "Helm",
    language: "Bash",
    difficulty: "Intermediate",
    prompt: "Write the command to upgrade an existing Helm release named 'myapp' using the chart in the current directory and a custom values file 'values-prod.yaml'.",
    solution: "helm upgrade myapp . -f values-prod.yaml",
    explanation: "`helm upgrade` applies the chart (and any -f values overrides) to an existing release, recording it as a new revision you could later roll back from.",
  },
  {
    id: "kyma-cq5",
    topic: "Namespaces",
    language: "Bash",
    difficulty: "Advanced",
    prompt: "Write the kubectl command to create a RoleBinding granting user 'jane@company.com' the 'edit' ClusterRole, scoped only to the 'team-a' namespace.",
    solution: "kubectl create rolebinding jane-edit --clusterrole=edit --user=jane@company.com -n team-a",
    explanation: "A RoleBinding (not a ClusterRoleBinding) confines the grant to the specified namespace, even though it references a ClusterRole — the binding type, not the role type, controls the scope here.",
  },
];

export const kymaRuntimeLabs: BtpLab[] = [
  {
    id: "kyma-lab1",
    sectionSlug: "kyma-runtime",
    title: "Deploy a Function and Expose It with an API Rule",
    objective:
      "Get hands-on with Kyma's core developer flow: write a Function, deploy it, and expose it externally with a secured API Rule.",
    architectureNote:
      "A Function (Serverless module) gets auto-built into a container by Kyma; an API Rule (API Gateway module) then exposes its underlying Service externally with a chosen access strategy.",
    steps: [
      { instruction: "Create a Function resource with a simple handler (via the Kyma dashboard or a Function custom resource YAML)." },
      { instruction: "Wait for it to build and reach 'Running' status.", command: "kubectl get functions -n dev" },
      { instruction: "Confirm the underlying Service was created for it.", command: "kubectl get svc -n dev" },
      { instruction: "Create an API Rule exposing that Service with the 'jwt' access strategy (not 'noop', for a real secured endpoint)." },
      { instruction: "Call the exposed endpoint without a token and confirm it's rejected." },
      { instruction: "Call it again with a valid bearer token and confirm it succeeds." },
    ],
    expectedOutput:
      "The Function shows status 'Running', a Service exists for it, and the exposed endpoint returns 401/403 without a token but succeeds with a valid one.",
    commonErrors: [
      {
        error: "Function stuck in 'Building' status indefinitely.",
        solution: "Check the Function's build Job logs (`kubectl logs job/<function-name>-build`) — usually a syntax error in the handler code or a missing dependency in its package definition.",
      },
      {
        error: "Endpoint returns 404 after creating the API Rule.",
        solution: "Confirm the API Rule's service name/port exactly matches the Function's actual Service, and that DNS has propagated for the new hostname — this can take a minute.",
      },
      {
        error: "Endpoint accepts requests with no token at all.",
        solution: "Double-check the API Rule's access strategy is actually set to 'jwt', not accidentally left as 'noop' — a very common real misconfiguration.",
      },
    ],
  },
];
