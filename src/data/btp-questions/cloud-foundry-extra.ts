import type { BtpCodingQuestion, BtpLab } from "@/lib/btp-content";

export const cloudFoundryTopicNotes: Record<string, string> = {
  "Cloud Controller":
    "Cloud Controller Cloud Foundry ka 'brain' hai — REST API jo `cf` CLI ki har request handle karta hai (push, bind, scale, sab kuch). Ye apne database mein 'desired state' store karta hai — matlab kya-kya chalna chahiye, kitni memory, kitne instances. Actual container scheduling ka kaam ye khud nahi karta, balki Diego layer ko de deta hai. Diego ka Brain component decide karta hai konsa container kis Diego Cell (worker VM) pe chalega, aur Cell Reps actually containers start/monitor karte hain, crash hone pe khud restart bhi kar dete hain. BTP mein har subaccount jisme Cloud Foundry enable hai, uska ek CF Org banta hai, jo region ke shared, multi-tenant Cloud Controller se manage hota hai — customers ke beech logically isolated rehte hue bhi infrastructure share hoti hai.",
  Org:
    "Org (Organization) Cloud Foundry hierarchy ka sabse upar wala level hai — isme ek ya zyada Spaces hote hain, aur iska apna quota plan hota hai (memory/instance limits). BTP mein tumhe khud Org banane ki zaroorat nahi padti — subaccount pe Cloud Foundry enable karte hi ek Org auto-create ho jaata hai (1:1 mapping). Org level pe teen roles hote hain: OrgManager (org/spaces/users manage kar sakta hai), OrgAuditor (sirf read-only), aur BillingManager (billing settings manage karta hai). Important baat — in teeno mein se koi bhi role akela app push/deploy karne ke liye kaafi nahi hai, uske liye Space level pe SpaceDeveloper role bhi chahiye.",
  Space:
    "Space Org ke andar wo jagah hai jaha apps, routes, aur service instances actually rehte hain — har `cf push` hamesha ek specific org AND space target karta hai. Ek Org ko multiple spaces mein baant sakte ho (jaise 'dev', 'staging') taaki environments alag rahein aur alag-alag access diya ja sake. Space level pe teen roles hote hain: SpaceDeveloper (push, scale, bind, delete — zyada tar engineers ko yahi chahiye), SpaceManager (space administration, users invite karna), aur SpaceAuditor (sirf read-only, testers/auditors ke liye useful).",
  Apps:
    "Cloud Foundry mein 'app' ek logical deployable unit hai — `cf push myapp` se ek app record banta hai apne naam, memory/disk settings, buildpack, aur routes ke saath. Wo app ek ya kai 'instances' (containers) mein chal sakta hai, jo scaling aur availability ke liye zaroori hai. `cf restart` same droplet se app ko stop-start karta hai (fast), jabki `cf restage` buildpack se dobara build karta hai (jab staging-affecting cheez change hui ho). Health checks (port/http/process) decide karte hain ki naya instance traffic lene ke liye ready hai ya nahi — port sabse simple hai, http sabse strict (ek specific endpoint 2xx return kare), process non-HTTP workers ke liye hai.",
  Routes:
    "Route ek URL hota hai (hostname + domain + optional path) jo ek ya zyada apps se mapped hota hai. Saara traffic Gorouter se guzarta hai, jo apna routing table maintain karta hai aur healthy instances mein load-balance karta hai. Ek route ko multiple apps se map kiya ja sakta hai — yahi blue-green deployment ka core mechanism hai (naye version ko bhi usi route pe map karo, phir purane ko unmap kar do). Kuch workloads HTTP se route nahi ho sakte (jaise custom binary protocols) — unke liye TCP routes hote hain, jo ek alag TCP Router component se dedicated port pe traffic forward karte hain.",
  Buildpacks:
    "Buildpack ek script hai jo tumhare source code se app ki language/framework detect karta hai (telltale files dekh kar, jaise Node.js ke liye package.json), fir dependencies install karke ek 'droplet' banata hai — wahi actual runnable artifact jise Diego chalata hai. Cloud Foundry har buildpack ka detect script try karta hai jab tak koi match na ho, ya tum `-b` flag se khud specify kar sakte ho. Agar koi buildpack match na kare, staging fail ho jaata hai ('unable to select a buildpack'). Droplet CF ka apna format hai (buildpack se bana), jabki Docker image ek standard OCI format hai jo tum `cf push --docker-image` se directly push kar sakte ho — Diego dono ko chala sakta hai.",
  "Service Marketplace":
    "Service Marketplace ek catalog hai jo tumhare subaccount mein available services dikhata hai. Har service ek 'broker' ke through offer hoti hai jo Open Service Broker (OSB) API standard implement karta hai — catalog, provision, bind, unbind, deprovision, ye paanch operations. Isi wajah se HANA Cloud ho ya XSUAA, dono ka Marketplace/Instance/Binding experience consistent lagta hai, chahe underlying service bilkul alag ho. Kabhi-kabhi tumhe kisi cheez se app bind karna hota hai jo Marketplace mein registered broker-backed service nahi hai (jaise external database) — uske liye `cf create-user-provided-service` use karte ho, jo manually credentials leta hai but same VCAP_SERVICES mechanism se bind hota hai.",
  Bindings:
    "`cf bind-service` chalane pe Cloud Controller broker ke bind operation ko call karta hai, jo credentials generate karta hai. Ye credentials VCAP_SERVICES environment variable mein store hote hain, lekin sirf app ke next restart/restage pe hi app inhe actually dekh paata hai — sirf bind karne se app turant naye credentials use nahi karta. Multiple apps ek hi service instance se bind ho sakte hain (cost saving ke liye), lekin phir wo instance ka quota aur fate share karte hain. Security ke liye credential rotation important hai — long-lived static credentials leak hone pe hamesha ke liye valid rehte hain jab tak rotate na kiya jaaye.",
  Scaling:
    "Horizontal scaling (`cf scale -i`) instances ki count badhata hai — throughput aur availability improve hoti hai. Vertical scaling (`cf scale -m`) har instance ko zyada memory deta hai — jab ek single request ko zyada resources chahiye ho. Application Autoscaler service ye kaam automatically kar deta hai, CPU/memory/HTTP metrics ke rules ke through, hamesha ek configured min/max ke andar. Jab koi instance stop hota hai (scale down ya restart), Diego pehle use Gorouter se hata deta hai (naya traffic band), fir SIGTERM bhejta hai (graceful shutdown ka grace period), aur agar wo time pe nahi rukta toh SIGKILL se force-terminate karta hai.",
  CLI:
    "Typical `cf` CLI flow hai: `cf login` (authenticate) → `cf target -o -s` (org/space set karo) → `cf push` (app deploy) → `cf create-service` + `cf bind-service` (agar service chahiye) → `cf restart` (binding pick up karne ke liye). Debugging ke liye `cf logs myapp --recent` (recent errors turant dekhne ke liye), `cf events myapp` (lifecycle timeline), aur `cf ssh myapp` (live container ke andar debugging — lekin ephemeral hai, changes restart pe gayab ho jaate hain).",
  Deployment:
    "Simple apps ke liye `cf push` (single app) kaafi hai, ideally ek `manifest.yml` ke saath (jisse config version-controlled aur repeatable ban jaati hai, CI/CD ke liye zaroori). Complex projects (jaise CAP backend + Fiori frontend + kai services) ke liye MTA-based deployment use hota hai — `mta.yaml` sab modules/resources declare karta hai, `mbt build` se `.mtar` banta hai, aur `cf deploy` sab kuch ek coordinated, dependency-ordered operation mein deploy kar deta hai. Zero-downtime releases ke liye blue-green deployment pattern use hota hai — naya version (green) purane (blue) ke saath deploy karo, route ko dono pe map karo, verify karke blue ko unmap kar do.",
  Logs:
    "App ke stdout/stderr ko Diego cell pe chalne wala Loggregator agent capture karta hai aur Loggregator ke aggregation pipeline mein forward karta hai. `cf logs` isi stream ko subscribe karta hai. Loggregator sirf ek limited recent buffer rakhta hai, isliye production mein syslog drain ya Application Logging service bind karna zaroori hai long-term retention ke liye. Application logs (tumhare app ke) aur platform/component logs (Cloud Controller, Diego, Gorouter) alag hote hain — platform logs SAP-managed hain, customer ko access nahi milta; suspected platform issue ke liye SAP support ticket raise karna padta hai.",
  Troubleshooting:
    "Crash loop debug karne ka structured order hai: `cf logs --recent` (actual error dekho) → `cf events` (CF ne khud kya observe kiya — OOM kill? health check fail?) → memory check karo → health check config verify karo → env variables/bindings check karo (`cf env`). Quota-exceeded errors ke liye pehle current usage vs quota check karo, fir ya toh unused apps free karo ya admin se quota badhwao. Network issues ke liye yaad rakho — container-to-container traffic deny-by-default hai, `cf add-network-policy` explicitly allow karta hai. Sudden binding failures (jo kal tak thik chal rahe the) ke liye credential rotation aur service instance maintenance dono check karo.",
};

export const cloudFoundryCodingQuestions: BtpCodingQuestion[] = [
  {
    id: "cf-cq1",
    topic: "CLI",
    language: "CF CLI",
    difficulty: "Beginner",
    prompt: "Write the command to push an app named 'myapp' from the current directory with 512MB memory and 2 instances.",
    solution: "cf push myapp -m 512M -i 2",
    explanation: "`-m` sets memory per instance, `-i` sets the instance count. Both can be combined with `cf push` in one command instead of pushing then scaling separately.",
  },
  {
    id: "cf-cq2",
    topic: "Bindings",
    language: "CF CLI",
    difficulty: "Intermediate",
    prompt: "Write the commands to create a service instance named 'my-hana' from the 'hana-cloud' service using the 'standard-edition' plan, bind it to 'myapp', and restart the app.",
    solution: "cf create-service hana-cloud standard-edition my-hana\ncf bind-service myapp my-hana\ncf restart myapp",
    explanation: "create-service provisions the instance, bind-service creates the binding and injects credentials into VCAP_SERVICES, and restart is required for the running app to actually see the new environment variable.",
  },
  {
    id: "cf-cq3",
    topic: "Scaling",
    language: "CF CLI",
    difficulty: "Beginner",
    prompt: "Write the command to scale 'myapp' to 5 instances without changing its memory.",
    solution: "cf scale myapp -i 5",
    explanation: "The `-i` flag alone changes only the instance count (horizontal scaling); omitting `-m` leaves memory per instance unchanged.",
  },
  {
    id: "cf-cq4",
    topic: "Troubleshooting",
    language: "CF CLI",
    difficulty: "Intermediate",
    prompt: "Write the command to see the recent log buffer for 'myapp' right after it crashed, without streaming live.",
    solution: "cf logs myapp --recent",
    explanation: "`--recent` dumps the buffered recent history and exits immediately — the fast first move after a crash, instead of the blocking live-stream mode.",
  },
  {
    id: "cf-cq5",
    topic: "Troubleshooting",
    language: "CF CLI",
    difficulty: "Advanced",
    prompt: "Write the command to allow app 'service-a' to reach app 'service-b' on TCP port 8080 over container-to-container networking.",
    solution: "cf add-network-policy service-a service-b --port 8080 --protocol tcp",
    explanation: "Container-to-container networking is deny-by-default; this command explicitly creates the network policy allowing that specific traffic.",
  },
  {
    id: "cf-cq6",
    topic: "Deployment",
    language: "Bash",
    difficulty: "Intermediate",
    prompt: "Write the commands to build an MTA project into an .mtar archive and deploy it.",
    solution: "mbt build\ncf deploy mta_archives/myproject.mtar",
    explanation: "`mbt build` (Multitarget Application Build Tool) packages all modules/resources declared in mta.yaml into a single .mtar archive, which `cf deploy` then deploys as one coordinated, dependency-ordered operation.",
  },
];

export const cloudFoundryLabs: BtpLab[] = [
  {
    id: "cf-lab1",
    sectionSlug: "cloud-foundry",
    title: "Push, Bind, and Scale a Cloud Foundry App",
    objective:
      "Get hands-on with the full Cloud Foundry app lifecycle: push an app, create and bind a service, verify the binding, then scale the app horizontally.",
    architectureNote:
      "You'll target a specific Org and Space (matching your BTP subaccount's auto-created CF Org), push a sample app, provision a small service instance, bind it, and observe VCAP_SERVICES.",
    steps: [
      { instruction: "Log in and target your org and space." , command: "cf login\ncf target -o <your-org> -s dev" },
      { instruction: "Push a simple app from its source directory.", command: "cf push myapp -m 256M -i 1" },
      { instruction: "Confirm it's running.", command: "cf apps" },
      { instruction: "Create a small service instance." , command: "cf create-service hana-cloud standard-edition my-hana" },
      { instruction: "Bind it to the app." , command: "cf bind-service myapp my-hana" },
      { instruction: "Restart so the app picks up the new binding." , command: "cf restart myapp" },
      { instruction: "Inspect the injected credentials." , command: "cf env myapp" },
      { instruction: "Scale the app to 3 instances." , command: "cf scale myapp -i 3" },
    ],
    expectedOutput:
      "`cf apps` shows 'myapp' running with 3/3 instances healthy, and `cf env myapp` shows a VCAP_SERVICES entry for 'my-hana' with connection credentials.",
    commonErrors: [
      {
        error: "\"unable to select a buildpack\" during push.",
        solution: "You're likely pushing from the wrong directory (missing the app's dependency descriptor file, like package.json). cd into the actual app folder, or specify the buildpack explicitly with -b.",
      },
      {
        error: "cf env shows no VCAP_SERVICES entry for the new binding after bind-service.",
        solution: "Binding alone doesn't refresh a running app's environment — run `cf restart myapp` after binding.",
      },
      {
        error: "Scaling fails with a quota-exceeded error.",
        solution: "Check current memory usage against your space's quota (`cf space <name>`); free up memory by stopping unused apps, or ask an admin to increase the subaccount's Application Runtime quota.",
      },
    ],
  },
];
