<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# CodeGurukul — Product Spec

This repository ships **CodeGurukul**, a SAP ABAP interview-prep learning platform. Tagline: **Learn • Practice • Prepare • Get Hired**.

Target users: ABAP freshers, working developers, students prepping for interviews, professionals switching to SAP, 0–5 yrs experience.

Feel: professional, modern, trustworthy, clean, interview-focused, mobile-first, highly readable.

## Color tokens (lock-in)

| Token | Light | Dark | Use |
|---|---|---|---|
| Primary | `#2563EB` | `#2563EB` | Trust, links, primary CTAs |
| Success | `#22C55E` | `#22C55E` | Progress, completion |
| Warning | `#F59E0B` | `#F59E0B` | Interview tips |
| Error   | `#EF4444` | `#EF4444` | Mistakes, warnings |
| Background | `#F8FAFC` | `#0F172A` | Page background |
| Card    | `#FFFFFF` | `#1E293B` | Card / surface |
| Text    | `#0F172A` | `#F8FAFC` | Foreground |

## Typography

- Primary font: **Inter**, fallback **Poppins**, then system sans.
- Heading 32px · Subheading 24px · Body 18px.
- Max 3 lines per paragraph. Use bullets. Highlight keywords. Skimmable. Strong visual hierarchy.

## Question page — fixed 9-section order

Every question page renders sections in this order. No skipping, no reordering:

1. **Seedha Samjho** — beginner Hindi, real-world analogy, one-line summary at the end.
2. **Deep Dive** — architecture, internal working, business usage, step-by-step flow.
3. **Interview Script (Hinglish)** — natural, professional, speakable. The candidate memorizes and delivers this.
4. **Interview Script (English)** — corporate language. Definition → Usage → Business Value → Conclusion.
5. **Code Example** — real ABAP, practical use case, clean formatting, expected output.
6. **Word-by-Word Samjho** — break the code into pieces; every important keyword explained.
7. **Common Mistakes** — Mistake / Why wrong / Correct approach.
8. **Quick Revision Notes** — 2-minute revision: keyword summary, bullet list, interview keyword.
9. **Follow-Up Questions** — tiered Easy / Medium / Advanced.

When generating content for any SAP ABAP topic or question, use this exact structure.

## Roadmap

**V1 — Core Learning Platform.** 573 questions, chapter nav, deep dive, interview scripts, code examples, notes, follow-ups, search, bookmarks, progress, dark mode.

**V2 — Interview Preparation Platform.** AI mock interview, daily quiz, interview-readiness score, chapter completion %, smart revision, most-asked questions, Top 50 fresher / Top 50 experienced.

**V3 — AI-Powered Career Platform.** AI resume review, AI interview feedback, AI mentor, AI code review/explanation, study planner, ABAP roadmap, personalized learning path, interview performance analytics.
