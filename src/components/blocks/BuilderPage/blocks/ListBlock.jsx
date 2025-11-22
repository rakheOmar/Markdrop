import {
  Bold,
  CheckSquare,
  Code,
  Italic,
  List,
  ListOrdered,
  Plus,
  Strikethrough,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const parseList = (content, type) => {
  if (!content) return [];
  const lines = content.split("\n").filter((line) => line.trim());

  return lines.map((line, index) => {
    let indent = 0;
    let text = line;
    let checked = false;
    let number = index + 1;

    const indentMatch = line.match(/^(\s+)/);
    if (indentMatch) {
      indent = Math.floor(indentMatch[1].length / 2);
    }

    if (type === "task-list") {
      const taskMatch = line.match(/^\s*-\s*\[([ x])\]\s*(.*)$/);
      if (taskMatch) {
        checked = taskMatch[1] === "x";
        text = taskMatch[2];
      }
    } else if (type === "ul") {
      text = line.replace(/^\s*-\s*/, "");
    } else if (type === "ol") {
      const numberMatch = line.match(/^\s*(\d+)\.\s*/);
      if (numberMatch) {
        number = parseInt(numberMatch[1]);
      }
      text = line.replace(/^\s*\d+\.\s*/, "");
    }

    return { id: `${index}-${Date.now()}`, text, indent, checked, number };
  });
};

const generateMarkdown = (items, type) => {
  return items
    .map((item) => {
      const indentation = "  ".repeat(item.indent);
      if (type === "task-list") {
        return `${indentation}- [${item.checked ? "x" : " "}] ${item.text}`;
      } else if (type === "ul") {
        return `${indentation}- ${item.text}`;
      } else if (type === "ol") {
        return `${indentation}${item.number}. ${item.text}`;
      }
      return item.text;
    })
    .join("\n");
};

export default function ListBlock({ block, onUpdate }) {
  const blockId = block.id;
  const blockType = block.type;
  const blockContent = block.content;

  const [items, setItems] = useState(() => {
    const parsed = parseList(blockContent, blockType);
    return parsed.length > 0
      ? parsed
      : [{ id: "0", text: "", indent: 0, checked: false, number: 1 }];
  });

  const [activeItemId, setActiveItemId] = useState(null);
  const inputRefs = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const markdown = useMemo(() => generateMarkdown(items, blockType), [items, blockType]);

  useEffect(() => {
    if (isUpdatingRef.current) {
      isUpdatingRef.current = false;
      return;
    }
    const parsed = parseList(blockContent, blockType);
    if (parsed.length > 0) {
      setItems(parsed);
    }
  }, [blockContent, blockType]);

  useEffect(() => {
    if (markdown !== blockContent) {
      isUpdatingRef.current = true;
      onUpdate(blockId, { ...block, content: markdown });
    }
  }, [markdown, blockId, block, onUpdate, blockContent]);

  const updateItem = (id, updates) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const addItem = () => {
    const newId = Date.now().toString();
    setItems((prev) => {
      const lastNumber = prev.length > 0 ? prev[prev.length - 1].number : 0;
      return [...prev, { id: newId, text: "", indent: 0, checked: false, number: lastNumber + 1 }];
    });
    setTimeout(() => {
      const el = inputRefs.current.get(newId);
      if (el) el.focus();
    }, 0);
  };

  const removeItem = (id) => {
    setItems((prev) => {
      if (prev.length <= 1) return prev;
      const filtered = prev.filter((item) => item.id !== id);

      if (blockType === "ol") {
        return filtered.map((item, index) => ({
          ...item,
          number: index + 1,
        }));
      }
      return filtered;
    });
  };

  const getTrimmedSelection = (input) => {
    let start = input.selectionStart;
    let end = input.selectionEnd;
    const text = input.value;

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
    if (!activeItemId) return;

    const input = inputRefs.current.get(activeItemId);
    if (!input) return;

    const selection = getTrimmedSelection(input);
    if (!selection) return;

    const { start, end, selectedText } = selection;
    const currentText = items.find((i) => i.id === activeItemId)?.text || "";

    const newText =
      currentText.substring(0, start) + prefix + selectedText + suffix + currentText.substring(end);

    updateItem(activeItemId, { text: newText });

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleKeyDown = (e, itemId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    } else if (e.key === "Backspace" && items.length > 1) {
      const item = items.find((i) => i.id === itemId);
      if (item && item.text === "") {
        e.preventDefault();
        removeItem(itemId);
      }
    }
  };

  const ListIcon =
    blockType === "ol" ? ListOrdered : blockType === "task-list" ? CheckSquare : List;
  const listLabel =
    blockType === "ol" ? "Ordered List" : blockType === "task-list" ? "Task List" : "Bullet List";

  return (
    <div className="group relative rounded-md border border-border bg-background transition-all focus-within:border-ring">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-muted/10">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <ListIcon className="h-3.5 w-3.5" />
          <span>{listLabel}</span>
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
        </ButtonGroup>
      </div>

      <div className="p-3 space-y-2">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2 group/item">
            <div
              className="flex items-center gap-2 flex-1"
              style={{ paddingLeft: `${item.indent * 24}px` }}
            >
              {blockType === "task-list" && (
                <Checkbox
                  checked={item.checked}
                  onCheckedChange={(checked) => updateItem(item.id, { checked })}
                />
              )}
              {blockType === "ol" && (
                <span className="text-sm font-mono text-muted-foreground w-6 flex-shrink-0 text-right">
                  {item.number}.
                </span>
              )}
              {blockType === "ul" && <span className="text-muted-foreground px-1">•</span>}

              <Input
                ref={(el) => {
                  if (el) inputRefs.current.set(item.id, el);
                  else inputRefs.current.delete(item.id);
                }}
                value={item.text}
                onChange={(e) => updateItem(item.id, { text: e.target.value })}
                onFocus={() => setActiveItemId(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                placeholder="List item..."
                className="border-0 h-8 px-2 py-1 focus-visible:ring-0 shadow-none bg-transparent text-sm"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 opacity-0 group-hover/item:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={() => removeItem(item.id)}
              disabled={items.length <= 1}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}

        <Button
          variant="ghost"
          size="sm"
          onClick={addItem}
          className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground ml-1"
        >
          <Plus className="h-3 w-3" />
          Add item
        </Button>
      </div>
    </div>
  );
}
