import { FileCode2, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const parseCodeBlock = (content) => {
  if (!content) return { language: "plaintext", code: "" };

  const match = content.match(/^```(\w*)\n([\s\S]*?)\n```$/);
  if (match) {
    return { language: match[1] || "plaintext", code: match[2] };
  }

  return { language: "plaintext", code: content };
};

const generateMarkdown = (language, code) => {
  return `\`\`\`${language}\n${code}\n\`\`\``;
};

const LANGUAGES = [
  { value: "plaintext", label: "Plain Text" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "jsx", label: "JSX" },
  { value: "tsx", label: "TSX" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "scss", label: "SCSS" },
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "xml", label: "XML" },
  { value: "markdown", label: "Markdown" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "Bash" },
  { value: "shell", label: "Shell" },
  { value: "powershell", label: "PowerShell" },
  { value: "dockerfile", label: "Dockerfile" },
  { value: "graphql", label: "GraphQL" },
];

export default function CodeBlock({ block, onUpdate }) {
  const [parsed, setParsed] = useState(() => parseCodeBlock(block.content));

  // biome-ignore lint/correctness/useExhaustiveDependencies: needed here
  useEffect(() => {
    const newParsed = parseCodeBlock(block.content);
    if (newParsed.language !== parsed.language || newParsed.code !== parsed.code) {
      setParsed(newParsed);
    }
  }, [block.content]);

  const updateBlock = (newState) => {
    setParsed(newState);
    const markdown = generateMarkdown(newState.language, newState.code);
    onUpdate(block.id, { ...block, content: markdown });
  };

  return (
    <div className="group relative rounded-md border border-border bg-background transition-all hover:border-ring/50 focus-within:border-ring">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Terminal className="h-3.5 w-3.5" />
          <span>Snippet</span>
        </div>

        <Select
          value={parsed.language}
          onValueChange={(val) => updateBlock({ ...parsed, language: val })}
        >
          <SelectTrigger className="h-6 w-fit gap-2 border-none bg-transparent px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground hover:text-primary focus:ring-0">
            <FileCode2 className="h-3 w-3 opacity-50" />
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value} className="text-xs">
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <Textarea
          value={parsed.code}
          onChange={(e) => updateBlock({ ...parsed, code: e.target.value })}
          placeholder="// Enter code here..."
          className="min-h-[100px] w-full resize-y border-0 bg-transparent p-3 font-mono text-sm leading-relaxed focus-visible:ring-0"
          spellCheck={false}
        />
      </div>

      <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="text-[10px] text-muted-foreground/50 font-mono">```{parsed.language}</span>
      </div>
    </div>
  );
}
