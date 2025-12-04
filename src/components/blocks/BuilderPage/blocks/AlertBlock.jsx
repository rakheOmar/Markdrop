import {
  AlertTriangle,
  Bold,
  CheckCircle2,
  Code,
  Info,
  Italic,
  Lightbulb,
  Link as LinkIcon,
  OctagonAlert,
  Strikethrough,
} from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const alertTypes = {
  note: {
    icon: Info,
    label: "Note",
    borderColor: "border-blue-500",
    iconColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50/30 dark:bg-blue-950/10",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    borderColor: "border-green-500",
    iconColor: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50/30 dark:bg-green-950/10",
  },
  important: {
    icon: CheckCircle2,
    label: "Important",
    borderColor: "border-purple-500",
    iconColor: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50/30 dark:bg-purple-950/10",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    borderColor: "border-amber-500",
    iconColor: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50/30 dark:bg-amber-950/10",
  },
  caution: {
    icon: OctagonAlert,
    label: "Caution",
    borderColor: "border-red-500",
    iconColor: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50/30 dark:bg-red-950/10",
  },
};

export default function AlertBlock({ block, onUpdate }) {
  const alertType = block.alertType || "note";
  const alertConfig = alertTypes[alertType];
  const Icon = alertConfig.icon;

  const textareaRef = useRef(null);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("https://");
  const [linkSelection, setLinkSelection] = useState(null);

  const handleContentChange = (value) => {
    onUpdate(block.id, { ...block, content: value });
  };

  const handleTypeChange = (value) => {
    onUpdate(block.id, { ...block, alertType: value });
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

    handleContentChange(newText);

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

    handleContentChange(newText);
    setLinkDialogOpen(false);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  return (
    <div
      className={cn(
        "group relative rounded-md border border-border border-l-4 transition-all focus-within:border-ring",
        alertConfig.borderColor,
        alertConfig.bgColor
      )}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-background/40">
        <Select value={alertType} onValueChange={handleTypeChange}>
          <SelectTrigger className="h-7 w-fit gap-2 border-none bg-transparent px-2 text-xs font-semibold uppercase tracking-wider hover:bg-background/50 focus:ring-0">
            <Icon className={cn("h-4 w-4", alertConfig.iconColor)} />
            <span className={alertConfig.iconColor}>{alertConfig.label}</span>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(alertTypes).map(([key, config]) => {
              const TypeIcon = config.icon;
              return (
                <SelectItem key={key} value={key} className="text-xs">
                  <div className="flex items-center gap-2">
                    <TypeIcon className={cn("h-3.5 w-3.5", config.iconColor)} />
                    <span>{config.label}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

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
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder={`Enter ${alertConfig.label.toLowerCase()} text...`}
        className="min-h-[80px] w-full resize-y border-0 bg-transparent p-3 text-sm leading-relaxed focus-visible:ring-0 placeholder:text-muted-foreground/50"
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
