export const launchpadServiceTopicNotes: Record<string, string> = {
  Tiles:
    "Tile Launchpad home page pe ek clickable entry point hai. Static tile bas ek link hai (title/icon, koi live data nahi). Dynamic tile ek service call karti hai (typically OData) live data dikhane ke liye (jaise 'Open Orders: 12'), periodically refresh hoti hai. Custom tile fully bespoke visuals/behavior deta hai.",
  Catalog:
    "Catalog available tiles/apps ka master inventory hai (definitions: kaunsa app, kaunsa intent). Catalogs roles ko assign hote hain — sirf jin users ke paas wo role hai, unhe us catalog ke tiles tak access milta hai. Sirf catalog mein exist karna automatic visibility nahi deta.",
  Groups:
    "Group ek user ke home page ki actual arranged layout hai (kaunse tiles, kaunse order/section mein) — Catalog ke ulta jo sirf available inventory hai. Ek tile group mein add hone se pehle uska catalog user ke role ko assign hona chahiye, lekin catalog access se group automatically populate nahi hota.",
  Roles:
    "Tile visibility ki poori chain: role template (catalog access grant karta hai) → role collection (us template ko bundle karta hai, user ko assign hota hai) → catalog access milta hai → tile ek assigned group mein add hota hai → tabhi home page pe visible hota hai.",
  Navigation:
    "Intent-based navigation ka matlab hai ek app doosre app ko semantic action (jaise `#SalesOrder-display`) express karke navigate karta hai, hard-coded URL ki jagah. Launchpad ki target mapping us intent ko resolve karti hai jo bhi app currently registered hai. Target app change hone pe sirf mapping update karni padti hai, calling apps nahi.",
  Intent:
    "Intent do parts se bana hota hai: Semantic Object (business entity, jaise SalesOrder) aur Action (kya karna hai, jaise display/create) — `#SemanticObject-Action` format mein. Target mapping is combination ko (optionally parameters ke saath) ek specific registered app tak resolve karti hai. Naming consistency poori organization mein zaroori hai.",
};
