import { Bold, Code, Italic, Link as LinkIcon, Quote, Strikethrough } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function BlockquoteBlock({ block, onUpdate }) {
  const textareaRef = useRef(null);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("https://");
  const [linkSelection, setLinkSelection] = useState(null);

  const handleChange = (value) => {
    onUpdate(block.id, { ...block, content: value });
  };

  const getTrimmedSelection = () => {
    const textarea = textareaRef.current;
    if (!textarea) return null;

    let start = textarea.selectionStart;
    let end = textarea.selectionEnd;
    const text = block.content;

    while (start < end && /\s/.test(text[start])) {
      start++;
    }

    while (end > start && /\s/.test(text[end - 1])) {
      end--;
    }

    if (start === end) return null;

    return {
      start,
      end,
      selectedText: text.substring(start, end),
    };
  };

  const applyFormatting = (prefix, suffix = prefix) => {
    const selection = getTrimmedSelection();
    if (!selection) return;

    const { start, end, selectedText } = selection;

    const newText =
      block.content.substring(0, start) +
      prefix +
      selectedText +
      suffix +
      block.content.substring(end);

    handleChange(newText);

    setTimeout(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(start + prefix.length, end + prefix.length);
      }
    }, 0);
  };

  const applyLink = () => {
    const selection = getTrimmedSelection();
    if (!selection) return;

    setLinkSelection(selection);
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

  return (
    <div className="group relative rounded-md border border-border border-l-4 border-l-muted-foreground/40 bg-background focus-within:border-ring transition-all">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-muted/10">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Quote className="h-3.5 w-3.5" />
          <span>Quote</span>
        </div>

        <ButtonGroup className="bg-background/80">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => applyFormatting("**")}
            title="Bold"
          >
            <Bold className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => applyFormatting("*")}
            title="Italic"
          >
            <Italic className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => applyFormatting("~~")}
            title="Strikethrough"
          >
            <Strikethrough className="h-3.5 w-3.5" />
          </Button>

          <ButtonGroupSeparator />

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => applyFormatting("`")}
            title="Inline Code"
          >
            <Code className="h-3.5 w-3.5" />
          </Button>

          <ButtonGroupSeparator />

          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={applyLink} title="Link">
            <LinkIcon className="h-3.5 w-3.5" />
          </Button>
        </ButtonGroup>
      </div>

      <Textarea
        ref={textareaRef}
        value={block.content}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Enter quote..."
        className="min-h-[80px] w-full resize-y border-0 bg-transparent p-3 text-sm leading-relaxed italic text-muted-foreground focus-visible:ring-0 placeholder:text-muted-foreground/50 placeholder:not-italic"
      />

      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
            <DialogDescription>Add a URL for the selected text.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="url" className="text-xs">
                URL
              </Label>
              <Input
                id="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="h-8 text-sm"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setLinkDialogOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleApplyLink}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
