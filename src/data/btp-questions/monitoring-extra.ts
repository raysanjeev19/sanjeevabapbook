export const monitoringTopicNotes: Record<string, string> = {
  Logs:
    "Structured logging (JSON, named fields jaise `orderId`, `durationMs`) plain text logs se better hai — directly queryable/filterable, fragile regex parsing ki zaroorat nahi. Log viewer UIs structured logs ko readably render karte hain, isliye human-readability real downside nahi hai.",
  Metrics:
    "Metric ek numeric time series hai (CPU%, request count, error rate) — high volume pe store karna sasta, dashboards/threshold alerts ke liye ideal. Log rich per-event detail deta hai (specific error, stack trace) — investigate karne ke liye. Metrics batate hain 'kuch galat hai aur kab', logs batate hain 'exactly kya hua'.",
  Tracing:
    "Distributed tracing ek single request ko multiple services ke aar-paar follow karta hai. Trace ID (header ke through propagate hota hai, jaise W3C `traceparent`) har span ko same identifier se tag karta hai, taaki ek tracing tool poora end-to-end timeline reconstruct kar sake — pata chalta hai kaunsi service ne kitna time liya, kaha failure hua.",
  "Alert Notification":
    "Alert Notification service conditions define karne deta hai (error rate > threshold, quota > 90%, critical events) aur matching alerts ko email/Slack/PagerDuty jaise destinations tak route karta hai. Monitoring ko reactive (user complain kare) se proactive (team automatically notify ho) mein shift karta hai.",
  "Application Logging":
    "Application Logging service persistent, searchable log storage deta hai (ELK-style stack), `cf logs`/Loggregator ke limited recent buffer ke ulta. Time range, severity, ya free text se filter kar sakte ho sab instances mein, structured JSON logging support ke saath.",
  "Health Check":
    "Health check endpoint do audiences serve karta hai: Cloud Foundry (routing decision — process alive hai?) aur external monitoring tools (jo actual dependencies — database, downstream services — check karke degraded status report karte hain, alerting ke liye). Minimal 'process alive' check platform ke liye kaafi hai, lekin richer check external monitoring ke liye zaroori hai.",
};
