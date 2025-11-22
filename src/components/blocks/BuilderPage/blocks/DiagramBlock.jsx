import { Code2, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: needed
  useEffect(() => {
    const incomingCode = parseDiagramBlock(block.content);
    if (incomingCode !== code) {
      setCode(incomingCode);
    }
  }, [block.content]);

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

      <div className="relative">
        <Textarea
          value={code}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="graph TD;..."
          className="min-h-[150px] w-full resize-y border-0 bg-transparent p-3 font-mono text-sm leading-relaxed focus-visible:ring-0"
          spellCheck={false}
        />
      </div>

      <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="text-[10px] text-muted-foreground/50 font-mono">```mermaid</span>
      </div>
    </div>
  );
}
