export const html5AppsTopicNotes: Record<string, string> = {
  "App Router":
    "App Router ek single-entry-point Node.js component hai jo users authenticate karta hai (XSUAA se) ek baar, fir har request ko sahi backend service ya static resource tak route karta hai `xs-app.json` mein declared path rules ke aadhar pe — multi-service application ko ek unified, secured entry point deta hai.",
  "HTML5 Repository":
    "HTML5 Application Repository static frontend assets (HTML, JS, CSS) ke liye ek managed, versioned storage service hai. Static content ko backend se serve karne ki jagah yahan deploy karne se frontend release cycle backend se decouple hota hai, aur multiple backend deployments same UI assets share kar sakte hain.",
  Deployment:
    "UI5 built output `mta.yaml` mein `com.sap.application.content` type ke module ki tarah declare hota hai, jo `cf deploy` ke dauraan HTML5 Repository ke deployer service ke through upload hota hai — poori application (backend, HANA, XSUAA) ke saath ek coordinated, atomic deployment ka hissa.",
  Launchpad:
    "Launchpad tile click ek 'intent' trigger karta hai (fixed URL nahi), jise target mapping specific registered app tak resolve karti hai. Wo app apna App Router chalata hai (authenticate karta hai) aur HTML5 Repository se actual UI content serve karta hai. Ye layered chain deployment flexibility deta hai — sirf target mapping update karni padti hai, tiles nahi.",
  UI5:
    "UI5 MVC pattern: View (structure, XML mein, Model paths se bound), Controller (event logic, Model read/write karta hai), Model (application data). Data binding (one-way aur two-way) automatically View aur Model ko sync rakhta hai — manual DOM manipulation ki zaroorat nahi.",
  React:
    "React use karte waqt bhi BTP-specific pieces manually wire karni padti hain: App Router authentication ke liye (React ye replace nahi karta), custom data-fetching layer OData/REST ke liye (UI5 jaisa automatic model binding nahi hai), aur Fiori design consistency chahiye toh UI5 Web Components ya deliberate design guideline compliance.",
  Angular:
    "Angular use karne mein koi fundamental technical barrier nahi hai — real difference ye hai ki UI5 Fiori design compliance, native OData binding, aur Launchpad integration 'for free' deta hai jo Angular ko deliberately reimplement karna padega. Choice depend karti hai team expertise aur Fiori consistency ki zaroorat pe.",
};
