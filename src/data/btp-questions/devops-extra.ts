export const devopsTopicNotes: Record<string, string> = {
  Git:
    "Clean, focused commit history sirf stylistic nahi hai — ye `git bisect` ko exactly wo commit find karne deta hai jisne regression introduce kiya, meaningful code review enable karta hai, aur selective revert possible banata hai (unrelated good changes lose kiye bina).",
  GitHub:
    "GitHub source control hosting ke saath-saath pull requests, code review workflows, aur GitHub Actions jaisi built-in CI/CD capability deta hai. BTP projects ke liye, GitHub repo ka structure (branches, PR review policy) directly CI/CD pipeline triggers aur deployment gates ko drive karta hai.",
  "GitHub Actions":
    "GitHub Actions workflow typically do jobs mein structured hoti hai: build-and-test (har PR pe chalta hai — deps install, `cds.test` se tests) aur deploy (sirf main branch pe push hone pe gated — `mbt build` + `cf deploy`). Credentials encrypted GitHub secrets mein store hoti hain, workflow file mein hard-coded nahi.",
  Jenkins:
    "Jenkins ek self-hosted automation server hai (khud install/manage karte ho), GitHub Actions ke managed/hosted model ke ulta. Full control deta hai execution environment aur network access pe (on-prem systems tak directly reach ke liye). Organizations existing investment ya on-prem reachability ki wajah se Jenkins continue karte hain.",
  "CI/CD":
    "CI (Continuous Integration) = har change ka automated build/test, integration issues jaldi catch karna. Full CD (Continuous Deployment) = automatic production deploy, koi human gate nahi. Kai teams 'continuous delivery' karte hain — automated ek manual approval gate tak — ek deliberate risk-control choice, immature pipeline ka sign nahi.",
  MTA:
    "MTA modules apni `requires` dependencies declare karte hain (doosre modules ya resources jaise HANA schema/XSUAA instance). Deployment tooling in declarations se ek dependency graph banata hai aur correct deployment order compute karta hai — resources pehle provision hote hain, fir unpe depend karne wale modules deploy hote hain.",
  Transport:
    "Multi-environment promotion ke liye correct pattern hai 'build once, deploy many times' — `.mtar` artifact ek hi baar build karo, fir wahi identical artifact Dev → QA → Prod tak sequence mein deploy karo, environment-specific `--vars-file` se sirf config values badalte hue. Har environment ke liye alag rebuild karna subtle differences ka risk rakhta hai.",
  Deployment:
    "BTP deployment typically `mbt build` (MTA archive banata hai) + `cf deploy` (poori application ko coordinated, dependency-ordered tarike se deploy karta hai) involve karta hai. CI/CD pipelines isse automate karte hain — test → build → gated deploy — manual steps ki jagah.",
  Versioning:
    "Semantic versioning (major.minor.patch) version changes ko meaning deta hai — patch (fix), minor (backward-compatible feature), major (breaking change). Har build ko uniquely versioned rakhna rollback ke liye essential hai — exact prior artifact retrieve/redeploy karna, git se rebuild karne ki jagah jo subtly different ho sakta hai.",
  "Blue Green Deployment":
    "Blue-green deployment pipeline mein: naya version (green) deploy karo bina production route touch kiye → automated smoke tests chalao → `cf map-route` se production route green ko add karo → `cf unmap-route` se blue se remove karo (near-instant cutover) → blue ko thodi der rollback option ki tarah rakho before teardown.",
};
