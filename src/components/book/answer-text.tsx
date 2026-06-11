"use client";

import { cn } from "@/lib/utils";

/**
 * Renders Hinglish answer text with structured formatting.
 *
 * Detects and styles:
 * - Numbered lists  (1. 2. 3.)
 * - Bullet lists    (- or •)
 * - Section headers (short line ending in : )
 * - Inline code     (backtick-wrapped or ABAP keywords)
 * - Emojis as visual anchors
 * - Bold text       (**term**)
 *
 * No dependency on external markdown libraries — pure parsing.
 */

type AnswerTextProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
};

function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const remaining = text;
  let key = 0;

  /* Process **bold** spans */
  const boldRe = /\*\*(.+?)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = boldRe.exec(remaining)) !== null) {
    if (match.index > last) {
      parts.push(<span key={key++}>{remaining.slice(last, match.index)}</span>);
    }
    parts.push(<strong key={key++} className="font-semibold text-foreground">{match[1]}</strong>);
    last = match.index + match[0].length;
  }
  if (last < remaining.length) {
    parts.push(<span key={key++}>{remaining.slice(last)}</span>);
  }

  return parts;
}

function isHeader(line: string): boolean {
  const trimmed = line.trim();
  /* Short line ending in colon, or ALL CAPS short line */
  if (trimmed.length === 0) return false;
  if (trimmed.endsWith(":") && trimmed.length < 80 && !trimmed.includes(". ")) return true;
  if (trimmed === trimmed.toUpperCase() && trimmed.length < 60 && /[A-Z]/.test(trimmed)) return true;
  return false;
}

function isNumberedItem(line: string): { n: number; rest: string } | null {
  const m = line.match(/^(\d+)[.)]\s+(.+)/);
  if (m) return { n: parseInt(m[1], 10), rest: m[2] };
  return null;
}

function isBulletItem(line: string): string | null {
  const m = line.match(/^[-•✓→▶►*]\s+(.+)/);
  if (m) return m[1];
  /* Also treat lines starting with ✅ ❌ 💡 etc. as bullets */
  const emoji = line.match(/^([\u{1F300}-\u{1FFFF}]|[☀-➿])\s+(.+)/u);
  if (emoji) return `${emoji[1]} ${emoji[2]}`;
  return null;
}

type Block =
  | { type: "para"; text: string }
  | { type: "header"; text: string }
  | { type: "ol"; items: string[] }
  | { type: "ul"; items: string[] }
  | { type: "code"; text: string };

function parse(raw: string): Block[] {
  const blocks: Block[] = [];
  /* Split on blank lines first */
  const sections = raw.split(/\n{2,}/);

  for (const section of sections) {
    const lines = section.split("\n").filter((l) => l.trim().length > 0);
    if (lines.length === 0) continue;

    /* Detect code fence blocks (``` delimiters or indented 4-space ABAP) */
    if (lines[0].trim().startsWith("```") || lines.every((l) => l.startsWith("    "))) {
      const code = lines
        .map((l) => (l.startsWith("    ") ? l.slice(4) : l.replace(/^```[a-z]*/, "").replace(/```$/, "")))
        .join("\n");
      blocks.push({ type: "code", text: code.trim() });
      continue;
    }

    /* Check if all lines are numbered list items */
    if (lines.every((l) => isNumberedItem(l))) {
      blocks.push({ type: "ol", items: lines.map((l) => isNumberedItem(l)!.rest) });
      continue;
    }

    /* Check if all lines are bullet items */
    if (lines.every((l) => isBulletItem(l) !== null)) {
      blocks.push({ type: "ul", items: lines.map((l) => isBulletItem(l)!) });
      continue;
    }

    /* Mixed section — parse line by line */
    let current: Block | null = null;

    function flush() {
      if (current) {
        blocks.push(current);
        current = null;
      }
    }

    for (const line of lines) {
      const numbered = isNumberedItem(line);
      const bulleted = isBulletItem(line);

      if (numbered) {
        if (current?.type !== "ol") {
          flush();
          current = { type: "ol", items: [] };
        }
        (current as { type: "ol"; items: string[] }).items.push(numbered.rest);
      } else if (bulleted) {
        if (current?.type !== "ul") {
          flush();
          current = { type: "ul", items: [] };
        }
        (current as { type: "ul"; items: string[] }).items.push(bulleted);
      } else if (isHeader(line)) {
        flush();
        blocks.push({ type: "header", text: line.trim() });
      } else {
        flush();
        /* Accumulate into paragraph — consecutive non-list lines join */
        const last = blocks[blocks.length - 1];
        if (last?.type === "para") {
          last.text += " " + line.trim();
        } else {
          blocks.push({ type: "para", text: line.trim() });
        }
      }
    }
    flush();
  }

  return blocks;
}

export function AnswerText({ text, className, style }: AnswerTextProps) {
  const blocks = parse(text ?? "");

  return (
    <div className={cn("answer-text space-y-3 leading-relaxed", className)} style={style}>
      {blocks.map((block, i) => {
        if (block.type === "header") {
          return (
            <p key={i} className="mt-4 font-semibold text-foreground first:mt-0" style={{ fontFamily: "inherit" }}>
              {parseInline(block.text.replace(/:$/, ""))}
              {block.text.endsWith(":") ? ":" : ""}
            </p>
          );
        }

        if (block.type === "ol") {
          return (
            <ol key={i} className="space-y-1.5 pl-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-2.5">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                    style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
                  >
                    {j + 1}
                  </span>
                  <span className="flex-1">{parseInline(item)}</span>
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === "ul") {
          return (
            <ul key={i} className="space-y-1.5 pl-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-2.5">
                  <span
                    className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                  <span className="flex-1">{parseInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "code") {
          return (
            <pre
              key={i}
              className="code-block overflow-x-auto rounded-lg border border-border bg-surface-2 p-4 text-sm text-foreground"
            >
              {block.text}
            </pre>
          );
        }

        /* para */
        return (
          <p key={i} className="text-foreground">
            {parseInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}
