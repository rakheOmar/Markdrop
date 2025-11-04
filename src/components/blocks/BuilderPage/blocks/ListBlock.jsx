import { Bold, Code, Italic, Plus, Strikethrough, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
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

    return { id: `${index}`, text, indent, checked, number };
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
        return `${indentation}${item.number || parseInt(item.id) + 1}. ${item.text}`;
      }
      return item.text;
    })
    .join("\n");
};

export default function ListBlock({ block, onUpdate }) {
  const blockId = block.id;
  const blockType = block.type;
  const blockContent = block.content;

  const initializedRef = useRef(false);
  const [items, setItems] = useState(() => {
    const parsed = parseList(blockContent, blockType);
    return parsed.length > 0
      ? parsed
      : [{ id: "0", text: "", indent: 0, checked: false, number: 1 }];
  });
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [activeInputRef, setActiveInputRef] = useState(null);

  // Memoize the markdown generation to prevent unnecessary recalculations
  const markdown = useMemo(() => generateMarkdown(items, blockType), [items, blockType]);

  // Use useCallback to prevent function recreation on every render
  const handleUpdate = useCallback(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      return;
    }
    onUpdate(blockId, { ...block, content: markdown });
  }, [blockId, block, markdown, onUpdate]);

  // Only update when markdown actually changes
  useEffect(() => {
    if (markdown !== blockContent) {
      handleUpdate();
    }
  }, [markdown, blockContent, handleUpdate]);

  const updateItem = useCallback((id, updates) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  }, []);

  const addItem = useCallback(() => {
    const newId = Date.now().toString();
    setItems((prev) => {
      const lastNumber = prev.length > 0 ? prev[prev.length - 1].number || prev.length : 0;
      return [...prev, { id: newId, text: "", indent: 0, checked: false, number: lastNumber + 1 }];
    });
  }, []);

  const removeItem = useCallback(
    (id) => {
      setItems((prev) => {
        if (prev.length <= 1) return prev;
        const filtered = prev.filter((item) => item.id !== id);

        // Recalculate sequence numbers for ordered lists
        if (blockType === "ol") {
          return filtered.map((item, index) => ({
            ...item,
            number: index + 1,
          }));
        }

        return filtered;
      });
    },
    [blockType]
  );

  const handleSelect = useCallback((e, itemId) => {
    const input = e.target;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (start !== end) {
      const rect = input.getBoundingClientRect();
      setToolbarPosition({
        top: rect.top - 45,
        left: rect.left + rect.width / 2 - 100,
      });
      setShowToolbar(true);
      setActiveInputRef({ input, itemId });
    } else {
      setShowToolbar(false);
    }
  }, []);

  const wrapSelection = useCallback(
    (prefix, suffix = prefix) => {
      if (!activeInputRef) return;

      const { input, itemId } = activeInputRef;
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const item = items.find((i) => i.id === itemId);
      if (!item) return;

      const selectedText = item.text.substring(start, end);
      const newText =
        item.text.substring(0, start) + prefix + selectedText + suffix + item.text.substring(end);

      updateItem(itemId, { text: newText });
      setShowToolbar(false);

      setTimeout(() => {
        input.focus();
        input.setSelectionRange(start + prefix.length, end + prefix.length);
      }, 0);
    },
    [activeInputRef, items, updateItem]
  );

  const handleKeyDown = useCallback(
    (e, itemId) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addItem();
      }
    },
    [addItem]
  );

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
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2 group">
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
                <span className="text-sm font-medium text-muted-foreground w-6">
                  {item.number || index + 1}.
                </span>
              )}
              {blockType === "ul" && <span className="text-muted-foreground">•</span>}

              <Input
                value={item.text}
                onChange={(e) => updateItem(item.id, { text: e.target.value })}
                onSelect={(e) => handleSelect(e, item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                onBlur={() => setTimeout(() => setShowToolbar(false), 200)}
                placeholder="List item..."
                className="border-0 h-9 px-3 py-2 focus-visible:ring-1 shadow-none bg-transparent"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => removeItem(item.id)}
              disabled={items.length <= 1}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}

        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={addItem}
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add item
          </Button>
        </div>
      </div>
    </>
  );
}
