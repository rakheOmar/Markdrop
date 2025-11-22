import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const parseMathBlock = (content) => {
  if (!content) return { type: "inline", expression: "", syntax: "dollar" };

  // Check for block math with $$
  const blockMatch = content.match(/^\$\$([\s\S]*?)\$\$/);
  if (blockMatch) {
    return { type: "block", expression: blockMatch[1].trim(), syntax: "dollar" };
  }

  // Check for block math with ```math
  const codeBlockMatch = content.match(/^```math\n([\s\S]*?)\n```$/);
  if (codeBlockMatch) {
    return { type: "block", expression: codeBlockMatch[1].trim(), syntax: "codeblock" };
  }

  // Check for inline math with $` and `$
  const inlineAltMatch = content.match(/^\$`([\s\S]*?)`\$$/);
  if (inlineAltMatch) {
    return { type: "inline", expression: inlineAltMatch[1], syntax: "backtick" };
  }

  // Check for inline math with $
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
  // Inline
  if (syntax === "backtick") {
    return `$\`${expression}\`$`;
  }
  return `$${expression}$`;
};

export default function MathBlock({ block, onUpdate }) {
  const [parsed, setParsed] = useState(() => parseMathBlock(block.content));
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isUpdating) {
      setIsUpdating(false);
      return;
    }
    const newParsed = parseMathBlock(block.content);
    if (
      newParsed.type !== parsed.type ||
      newParsed.expression !== parsed.expression ||
      newParsed.syntax !== parsed.syntax
    ) {
      setParsed(newParsed);
    }
  }, [block.content, isUpdating, parsed.expression, parsed.type, parsed.syntax]);

  const handleExpressionChange = (value) => {
    const markdown = generateMarkdown(parsed.type, value, parsed.syntax);
    setParsed({ ...parsed, expression: value });
    setIsUpdating(true);
    onUpdate(block.id, { ...block, content: markdown });
  };

  const handleTypeChange = (type) => {
    // When switching to block, prefer $$ syntax
    const newSyntax = type === "block" ? "dollar" : parsed.syntax;
    const markdown = generateMarkdown(type, parsed.expression, newSyntax);
    setParsed({ ...parsed, type, syntax: newSyntax });
    setIsUpdating(true);
    onUpdate(block.id, { ...block, content: markdown });
  };

  const handleSyntaxChange = (syntax) => {
    const markdown = generateMarkdown(parsed.type, parsed.expression, syntax);
    setParsed({ ...parsed, syntax });
    setIsUpdating(true);
    onUpdate(block.id, { ...block, content: markdown });
  };

  // Check if expression contains dollar signs
  const hasDollarSign = parsed.expression.includes("$");

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-muted/50">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted">
        <RadioGroup
          value={parsed.type}
          onValueChange={handleTypeChange}
          className="flex items-center gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="inline" id="inline" />
            <Label htmlFor="inline" className="text-xs cursor-pointer">
              Inline
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="block" id="block" />
            <Label htmlFor="block" className="text-xs cursor-pointer">
              Block
            </Label>
          </div>
        </RadioGroup>
        <span className="text-xs text-muted-foreground">Math Expression</span>
      </div>

      {hasDollarSign && parsed.type === "inline" && parsed.syntax === "dollar" && (
        <Alert className="m-3 mb-0">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Your expression contains a $ sign. Consider using{" "}
            <button
              type="button"
              onClick={() => handleSyntaxChange("backtick")}
              className="underline font-medium hover:text-foreground"
            >
              $` and `$ syntax
            </button>{" "}
            to avoid conflicts.
          </AlertDescription>
        </Alert>
      )}

      <Textarea
        value={parsed.expression}
        onChange={(e) => handleExpressionChange(e.target.value)}
        placeholder="Enter LaTeX expression (e.g., \sqrt{3x-1}+(1+x)^2)"
        className="font-mono text-sm p-3 resize-y border-none shadow-none focus-visible:ring-1 bg-transparent rounded-none"
        rows={Math.max(3, parsed.expression.split("\n").length + 1)}
      />

      <div className="px-4 py-2 border-t border-border bg-muted/30 space-y-2">
        {parsed.type === "inline" && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Syntax:</span>
            <RadioGroup
              value={parsed.syntax}
              onValueChange={handleSyntaxChange}
              className="flex items-center gap-3"
            >
              <div className="flex items-center space-x-1.5">
                <RadioGroupItem value="dollar" id="syntax-dollar" />
                <Label htmlFor="syntax-dollar" className="text-xs cursor-pointer">
                  <code>$...$</code>
                </Label>
              </div>
              <div className="flex items-center space-x-1.5">
                <RadioGroupItem value="backtick" id="syntax-backtick" />
                <Label htmlFor="syntax-backtick" className="text-xs cursor-pointer">
                  <code>$`...`$</code>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {parsed.type === "block" && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Syntax:</span>
            <RadioGroup
              value={parsed.syntax}
              onValueChange={handleSyntaxChange}
              className="flex items-center gap-3"
            >
              <div className="flex items-center space-x-1.5">
                <RadioGroupItem value="dollar" id="syntax-block-dollar" />
                <Label htmlFor="syntax-block-dollar" className="text-xs cursor-pointer">
                  <code>$$...$$</code>
                </Label>
              </div>
              <div className="flex items-center space-x-1.5">
                <RadioGroupItem value="codeblock" id="syntax-codeblock" />
                <Label htmlFor="syntax-codeblock" className="text-xs cursor-pointer">
                  <code>```math</code>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        <p className="text-xs text-muted-foreground pt-1">
          {parsed.type === "inline" ? (
            <>
              Use <code className="text-xs">$`...`$</code> when expression contains $ or markdown
              characters
            </>
          ) : (
            <>
              Use <code className="text-xs">```math</code> for better compatibility in .md files
            </>
          )}
        </p>
      </div>
    </div>
  );
}
