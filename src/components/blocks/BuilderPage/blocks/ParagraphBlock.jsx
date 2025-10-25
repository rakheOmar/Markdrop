import { Bold, Code, Italic, Strikethrough } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ParagraphBlock({ block, onUpdate }) {
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const textareaRef = useRef(null);

  const handleChange = (value) => {
    onUpdate(block.id, { ...block, content: value });
  };

  const handleSelect = (e) => {
    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start !== end) {
      const rect = textarea.getBoundingClientRect();
      setToolbarPosition({
        top: rect.top - 45,
        left: rect.left + rect.width / 2 - 100,
      });
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
    }
  };

  const wrapSelection = (prefix, suffix = prefix) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = block.content.substring(start, end);
    const newText =
      block.content.substring(0, start) +
      prefix +
      selectedText +
      suffix +
      block.content.substring(end);

    handleChange(newText);
    setShowToolbar(false);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const lineCount = block.content ? block.content.split("\n").length : 1;

  return (
    <>
      {showToolbar && (
        <div
          className="fixed z-50 flex items-center gap-1 bg-popover border border-border rounded-md shadow-lg p-1"
          style={{ top: `${toolbarPosition.top}px`, left: `${toolbarPosition.left}px` }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => wrapSelection("**")}
            title="Bold"
          >
            <Bold className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => wrapSelection("*")}
            title="Italic"
          >
            <Italic className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => wrapSelection("~~")}
            title="Strikethrough"
          >
            <Strikethrough className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => wrapSelection("`")}
            title="Inline Code"
          >
            <Code className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
      <Textarea
        ref={textareaRef}
        value={block.content}
        onChange={(e) => handleChange(e.target.value)}
        onSelect={handleSelect}
        onBlur={() => setTimeout(() => setShowToolbar(false), 200)}
        placeholder="Write your paragraph here..."
        className="border-none shadow-none focus-visible:ring-0 px-3 py-2 resize-y text-base leading-relaxed"
        rows={Math.max(1, lineCount)}
      />
    </>
  );
}
