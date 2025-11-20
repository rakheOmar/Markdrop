import {
  AlertCircle,
  AlertTriangle,
  Bold,
  Code,
  Info,
  Italic,
  Lightbulb,
  Link,
  OctagonAlert,
  Strikethrough,
} from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const alertTypes = {
  note: {
    icon: Info,
    label: "NOTE",
    borderColor: "border-blue-500",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50/50 dark:bg-blue-950/10",
  },
  tip: {
    icon: Lightbulb,
    label: "TIP",
    borderColor: "border-green-500",
    iconColor: "text-green-500",
    bgColor: "bg-green-50/50 dark:bg-green-950/10",
  },
  important: {
    icon: AlertCircle,
    label: "IMPORTANT",
    borderColor: "border-purple-500",
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50/50 dark:bg-purple-950/10",
  },
  warning: {
    icon: AlertTriangle,
    label: "WARNING",
    borderColor: "border-yellow-500",
    iconColor: "text-yellow-600 dark:text-yellow-500",
    bgColor: "bg-yellow-50/50 dark:bg-yellow-950/10",
  },
  caution: {
    icon: OctagonAlert,
    label: "CAUTION",
    borderColor: "border-red-500",
    iconColor: "text-red-500",
    bgColor: "bg-red-50/50 dark:bg-red-950/10",
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

  const getTrimmedSelection = (fullSelection) => {
    const trimmed = fullSelection.trim();
    const startOffset = fullSelection.indexOf(trimmed);
    const endOffset = startOffset + trimmed.length;
    return { trimmed, startOffset, endOffset };
  };

  const applyFormatting = (prefix, suffix = prefix) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = block.content.substring(start, end);

    if (!selectedText.trim()) return;

    const { trimmed, startOffset } = getTrimmedSelection(selectedText);

    const beforeSelection = block.content.substring(0, start);
    const ignoredLeadingSpace = selectedText.substring(0, startOffset);
    const formattedPart = prefix + trimmed + suffix;
    const ignoredTrailingSpace = selectedText.substring(startOffset + trimmed.length);
    const afterSelection = block.content.substring(end);

    const newText =
      beforeSelection + ignoredLeadingSpace + formattedPart + ignoredTrailingSpace + afterSelection;

    handleContentChange(newText);

    setTimeout(() => {
      textarea.focus();
      const newStart = start + startOffset + prefix.length;
      const newEnd = newStart + trimmed.length;
      textarea.setSelectionRange(newStart, newEnd);
    }, 0);
  };

  const applyLink = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = block.content.substring(start, end);

    if (!selectedText.trim()) return;

    const { trimmed, startOffset } = getTrimmedSelection(selectedText);

    setLinkSelection({
      start: start + startOffset,
      end: start + startOffset + trimmed.length,
      selectedText: trimmed,
      originalStart: start,
      originalEnd: end,
    });

    setLinkUrl("https://");
    setLinkDialogOpen(true);
  };

  const handleApplyLink = () => {
    if (!linkSelection || !linkUrl) return;

    const { selectedText, originalStart, originalEnd } = linkSelection;

    const beforeOriginal = block.content.substring(0, originalStart);
    const rawSelection = block.content.substring(originalStart, originalEnd);
    const leadingSpace = rawSelection.substring(0, rawSelection.indexOf(selectedText));
    const trailingSpace = rawSelection.substring(leadingSpace.length + selectedText.length);
    const afterOriginal = block.content.substring(originalEnd);

    const newText =
      beforeOriginal +
      leadingSpace +
      `[${selectedText}](${linkUrl})` +
      trailingSpace +
      afterOriginal;

    handleContentChange(newText);
    setLinkDialogOpen(false);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  return (
    <div
      className={`relative rounded-r-lg border border-l-4 p-2.5 ${alertConfig.borderColor} ${alertConfig.bgColor || ""}`}
    >
      <div className="flex items-start gap-2.5">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <Icon className={`h-5 w-5 shrink-0 ${alertConfig.iconColor}`} />
              <span className={`font-semibold text-sm uppercase ${alertConfig.iconColor}`}>
                {alertType}
              </span>
            </div>

            <div className="overflow-x-auto -mx-2.5 px-2.5 sm:mx-0 sm:px-0">
              <ButtonGroup className="w-fit">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => applyFormatting("**")}
                  title="Bold"
                >
                  <Bold />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => applyFormatting("*")}
                  title="Italic"
                >
                  <Italic />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => applyFormatting("~~")}
                  title="Strikethrough"
                >
                  <Strikethrough />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => applyFormatting("`")}
                  title="Inline Code"
                >
                  <Code />
                </Button>
                <Button variant="outline" size="icon" onClick={applyLink} title="Link">
                  <Link />
                </Button>
                <Select value={alertType} onValueChange={handleTypeChange}>
                  <SelectTrigger className="w-[110px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="note">Note</SelectItem>
                    <SelectItem value="tip">Tip</SelectItem>
                    <SelectItem value="important">Important</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="caution">Caution</SelectItem>
                  </SelectContent>
                </Select>
              </ButtonGroup>
            </div>
          </div>

          <Textarea
            ref={textareaRef}
            value={block.content}
            onChange={(e) => handleContentChange(e.target.value)}
            onSelect={handleSelect}
            placeholder={`Enter ${alertConfig.label.toLowerCase()}...`}
            className="min-h-[60px] border-none shadow-none focus-visible:ring-0 px-3 py-2 resize-none bg-transparent text-sm leading-relaxed"
          />
        </div>
      </div>

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
