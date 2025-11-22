import { AlertTriangle, Settings2, Sigma } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const parseMathBlock = (content) => {
  if (!content) return { type: "inline", expression: "", syntax: "dollar" };

  const blockMatch = content.match(/^\$\$([\s\S]*?)\$\$/);
  if (blockMatch) {
    return { type: "block", expression: blockMatch[1].trim(), syntax: "dollar" };
  }

  const codeBlockMatch = content.match(/^```math\n([\s\S]*?)\n```$/);
  if (codeBlockMatch) {
    return { type: "block", expression: codeBlockMatch[1].trim(), syntax: "codeblock" };
  }

  const inlineAltMatch = content.match(/^\$`([\s\S]*?)`\$$/);
  if (inlineAltMatch) {
    return { type: "inline", expression: inlineAltMatch[1], syntax: "backtick" };
  }

  const inlineMatch = content.match(/^\$([\s\S]*?)\$/);
  if (inlineMatch) {
    return { type: "inline", expression: inlineMatch[1], syntax: "dollar" };
  }

  return { type: "inline", expression: content, syntax: "dollar" };
};

const generateMarkdown = (type, expression, syntax) => {
  if (type === "block") {
    if (syntax === "codeblock") {
      return `\`\`\`math\n${expression}\n\`\`\``;
    }
    return `$$${expression}$$`;
  }
  if (syntax === "backtick") {
    return `$\`${expression}\`$`;
  }
  return `$${expression}$`;
};

export default function MathBlock({ block, onUpdate }) {
  const [parsed, setParsed] = useState(() => parseMathBlock(block.content));

  // biome-ignore lint/correctness/useExhaustiveDependencies: <needed>
  useEffect(() => {
    const newParsed = parseMathBlock(block.content);
    if (
      newParsed.type !== parsed.type ||
      newParsed.expression !== parsed.expression ||
      newParsed.syntax !== parsed.syntax
    ) {
      setParsed(newParsed);
    }
  }, [block.content]);

  const updateBlock = (newState) => {
    setParsed(newState);
    const markdown = generateMarkdown(newState.type, newState.expression, newState.syntax);
    onUpdate(block.id, { ...block, content: markdown });
  };

  const handleExpressionChange = (value) => {
    updateBlock({ ...parsed, expression: value });
  };

  const toggleType = () => {
    const newType = parsed.type === "inline" ? "block" : "inline";
    const newSyntax = newType === "block" ? "dollar" : "dollar";
    updateBlock({ ...parsed, type: newType, syntax: newSyntax });
  };

  const cycleSyntax = () => {
    let newSyntax = parsed.syntax;
    if (parsed.type === "block") {
      newSyntax = parsed.syntax === "dollar" ? "codeblock" : "dollar";
    } else {
      newSyntax = parsed.syntax === "dollar" ? "backtick" : "dollar";
    }
    updateBlock({ ...parsed, syntax: newSyntax });
  };

  const hasDollarConflict =
    parsed.type === "inline" && parsed.syntax === "dollar" && parsed.expression.includes("$");

  return (
    <div className="group relative rounded-md border border-border bg-background transition-all hover:border-ring/50 focus-within:border-ring">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Sigma className="h-3.5 w-3.5" />
          <span>Math</span>
        </div>

        <div className="flex items-center gap-1">
          {hasDollarConflict && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateBlock({ ...parsed, syntax: "backtick" })}
              className="h-6 px-2 text-[10px] text-amber-600 hover:text-amber-700 hover:bg-amber-50"
            >
              <AlertTriangle className="mr-1 h-3 w-3" />
              Fix Syntax
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleType}
            className="h-6 px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground hover:text-primary"
          >
            {parsed.type}
          </Button>

          <div className="h-3 w-[1px] bg-border/60" />

          <Button
            variant="ghost"
            size="sm"
            onClick={cycleSyntax}
            className="h-6 px-2 text-[10px] font-mono text-muted-foreground hover:text-primary"
            title="Switch Syntax"
          >
            {parsed.type === "block"
              ? parsed.syntax === "dollar"
                ? "$$...$$"
                : "```math"
              : parsed.syntax === "dollar"
                ? "$...$"
                : "$`...`$"}
            <Settings2 className="ml-1.5 h-3 w-3 opacity-50" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <Textarea
          value={parsed.expression}
          onChange={(e) => handleExpressionChange(e.target.value)}
          placeholder="e.g., \sqrt{3x-1}+(1+x)^2"
          className="min-h-[80px] w-full resize-y border-0 bg-transparent p-3 font-mono text-sm leading-relaxed focus-visible:ring-0"
          spellCheck={false}
        />
      </div>

      <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
        <span
          className={cn(
            "text-[10px] font-mono",
            hasDollarConflict ? "text-amber-600" : "text-muted-foreground/50"
          )}
        >
          {parsed.type === "block"
            ? parsed.syntax === "dollar"
              ? "$$"
              : "```math"
            : parsed.syntax === "dollar"
              ? "$"
              : "$`"}
        </span>
      </div>
    </div>
  );
}
