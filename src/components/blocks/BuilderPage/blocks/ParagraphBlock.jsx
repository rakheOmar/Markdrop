import { Bold, Code, Italic, Link, Strikethrough } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function ParagraphBlock({ block, onUpdate }) {
  const textareaRef = useRef(null);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("https://");
  const [linkSelection, setLinkSelection] = useState(null);

  const handleChange = (value) => {
    onUpdate(block.id, { ...block, content: value });
  };

  const handleSelect = (e) => {
    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start !== end) {
      const selectedText = block.content.substring(start, end);
      return { start, end, selectedText };
    }
    return null;
  };

  const applyFormatting = (prefix, suffix = prefix) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = block.content.substring(start, end);

    if (!selectedText) return;

    const newText =
      block.content.substring(0, start) +
      prefix +
      selectedText +
      suffix +
      block.content.substring(end);

    handleChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const applyLink = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = block.content.substring(start, end);

    if (!selectedText) return;

    setLinkSelection({ start, end, selectedText });
    setLinkUrl("https://");
    setLinkDialogOpen(true);
  };

  const handleApplyLink = () => {
    if (!linkSelection || !linkUrl) return;

    const { start, end, selectedText } = linkSelection;
    const newText =
      block.content.substring(0, start) +
      `[${selectedText}](${linkUrl})` +
      block.content.substring(end);

    handleChange(newText);
    setLinkDialogOpen(false);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = block.content.substring(0, start) + "\n\n" + block.content.substring(end);
      handleChange(newText);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 bg-muted/50 rounded-md p-2 border border-border">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => applyFormatting("**")}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => applyFormatting("*")}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => applyFormatting("~~")}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => applyFormatting("`")}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={applyLink} title="Link">
          <Link className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        ref={textareaRef}
        value={block.content}
        onChange={(e) => handleChange(e.target.value)}
        onSelect={handleSelect}
        onKeyDown={handleKeyDown}
        placeholder="Write your paragraph here..."
        className="border-none shadow-none focus-visible:ring-1 px-3 py-2 resize-y text-base leading-relaxed"
        rows={Math.max(3, Math.min(8, block.content.split("\n").length))}
      />
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
            <DialogDescription>Enter the URL for "{linkSelection?.selectedText}"</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                autoFocus
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleApplyLink}>Add Link</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
