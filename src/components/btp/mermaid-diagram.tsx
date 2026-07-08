"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Maximize2, Minus, Plus, RotateCcw } from "lucide-react";

let mermaidInitialized = false;

/** Renders a Mermaid diagram definition with pan/zoom controls. Client-only (Mermaid needs the DOM). */
export function MermaidDiagram({ definition, className }: { definition: string; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      if (!mermaidInitialized) {
        mermaid.initialize({ startOnLoad: false, theme: "neutral", securityLevel: "strict" });
        mermaidInitialized = true;
      }
      try {
        const { svg: rendered } = await mermaid.render(`mermaid-${id}`, definition);
        if (!cancelled) setSvg(rendered);
      } catch {
        if (!cancelled) setError("Diagram could not be rendered.");
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [definition, id]);

  if (error) {
    return <p className="text-xs italic text-muted">{error}</p>;
  }

  return (
    <div className={`rounded-xl border border-border bg-surface-2 ${className ?? ""}`}>
      <div className="flex items-center justify-end gap-1 border-b border-border px-2 py-1.5">
        <button
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}
          aria-label="Zoom out"
          className="rounded-md p-1 text-faint hover:bg-surface hover:text-foreground"
        >
          <Minus size={13} />
        </button>
        <button
          onClick={() => setZoom(1)}
          aria-label="Reset zoom"
          className="rounded-md p-1 text-faint hover:bg-surface hover:text-foreground"
        >
          <RotateCcw size={12} />
        </button>
        <button
          onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
          aria-label="Zoom in"
          className="rounded-md p-1 text-faint hover:bg-surface hover:text-foreground"
        >
          <Plus size={13} />
        </button>
        <button
          onClick={() => containerRef.current?.requestFullscreen?.()}
          aria-label="Fullscreen"
          className="rounded-md p-1 text-faint hover:bg-surface hover:text-foreground"
        >
          <Maximize2 size={12} />
        </button>
      </div>
      <div ref={containerRef} className="overflow-auto p-3">
        {svg ? (
          <div
            className="mx-auto origin-top transition-transform duration-150 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-none"
            style={{ width: `${zoom * 100}%` }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="flex h-24 items-center justify-center text-xs text-faint">Rendering diagram…</div>
        )}
      </div>
    </div>
  );
}
