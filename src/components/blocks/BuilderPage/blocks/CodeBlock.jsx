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
    const language = match[1] || "plaintext";
    const code = match[2];
    return { language, code };
  }

  return { language: "plaintext", code: content };
};

const generateMarkdown = (language, code) => {
  return `\`\`\`${language}\n${code}\n\`\`\``;
};

export default function CodeBlock({ block, onUpdate }) {
  const [parsed, setParsed] = useState(() => parseCodeBlock(block.content));
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isUpdating) {
      setIsUpdating(false);
      return;
    }
    const newParsed = parseCodeBlock(block.content);
    if (newParsed.language !== parsed.language || newParsed.code !== parsed.code) {
      setParsed(newParsed);
    }
  }, [block.content, isUpdating, parsed.code, parsed.language]);

  const handleCodeChange = (value) => {
    const markdown = generateMarkdown(parsed.language, value);
    setParsed({ ...parsed, code: value });
    setIsUpdating(true);
    onUpdate(block.id, { ...block, content: markdown });
  };

  const handleLanguageChange = (language) => {
    const markdown = generateMarkdown(language, parsed.code);
    setParsed({ ...parsed, language });
    setIsUpdating(true);
    onUpdate(block.id, { ...block, content: markdown });
  };

  const languages = [
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

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-muted/50">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted">
        <Select value={parsed.language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-[180px] h-8 text-xs">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value} className="text-xs">
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground">Code Block</span>
      </div>
      <Textarea
        value={parsed.code}
        onChange={(e) => handleCodeChange(e.target.value)}
        placeholder="// Your code here"
        className="font-mono text-sm p-3 resize-y border-none shadow-none focus-visible:ring-1 bg-transparent rounded-none"
        rows={Math.max(3, parsed.code.split("\n").length + 1)}
      />
    </div>
  );
}
