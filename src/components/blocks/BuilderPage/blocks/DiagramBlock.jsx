import { Code2, Wand2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/components/ThemeProvider";

const parseDiagramBlock = (content) => {
  if (!content) return "";
  const mermaidMatch = content.match(/^```mermaid\n([\s\S]*?)\n```$/);
  return mermaidMatch ? mermaidMatch[1].trim() : content;
};

const generateMarkdown = (code) => `\`\`\`mermaid\n${code}\n\`\`\``;

const TEMPLATE = `graph TD;
    A[Start] --> B{Decision};
    B -->|Yes| C[Result 1];
    B -->|No| D[Result 2];
    C --> E[End];
    D --> E;`;

export default function DiagramBlock({ block, onUpdate }) {
  const [code, setCode] = useState(() => parseDiagramBlock(block.content));
  const previewRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const incomingCode = parseDiagramBlock(block.content);
    if (incomingCode !== code) {
      setCode(incomingCode);
    }
  }, [block.content]);

  useEffect(() => {
    if (!previewRef.current || !code.trim() || code.trim().length < 5) {
      return;
    }

    const renderDiagram = async () => {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "loose",
          fontFamily: "inherit",
        });

        const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;

        if (previewRef.current) {
          previewRef.current.innerHTML = "";
          const { svg } = await mermaid.render(id, code.trim());
          if (previewRef.current) {
            previewRef.current.innerHTML = svg;
          }
        }
      } catch (error) {
        console.error("Mermaid render error:", error);
        if (previewRef.current) {
          previewRef.current.innerHTML = `<div class="text-destructive text-sm p-4 rounded bg-destructive/10">Mermaid Error: ${error.message}</div>`;
        }
      }
    };

    renderDiagram();
  }, [code, isDark]);

  const handleChange = (value) => {
    setCode(value);
    onUpdate(block.id, { ...block, content: generateMarkdown(value) });
  };

  const loadTemplate = () => {
    handleChange(TEMPLATE);
  };

  return (
    <div className="group relative rounded-md border border-border bg-background transition-all hover:border-ring/50 focus-within:border-ring">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Code2 className="h-3.5 w-3.5" />
          <span>Mermaid</span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={loadTemplate}
          className="h-6 px-2 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary"
        >
          {code ? "Reset" : "Load Template"}
          {!code && <Wand2 className="ml-1 h-3 w-3" />}
        </Button>
      </div>

      <div className="p-3 space-y-3">
        {code.trim() && (
          <div className="w-full rounded-md border border-border/50 bg-muted/5 p-4 overflow-auto">
            <div ref={previewRef} className="mermaid-diagram flex items-center justify-center" />
          </div>
        )}

        <div className="relative">
          <Textarea
            value={code}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="graph TD;..."
            className="min-h-[150px] w-full resize-y border-0 bg-muted/20 p-3 font-mono text-sm leading-relaxed focus-visible:ring-1 focus-visible:bg-background transition-colors"
            spellCheck={false}
          />
          <div className="absolute bottom-2 right-2 opacity-50 pointer-events-none">
            <span className="text-[10px] text-muted-foreground/50 font-mono">```mermaid</span>
          </div>
        </div>
      </div>
    </div>
  );
}
