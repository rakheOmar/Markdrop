import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {
  CheckSquare,
  Code,
  FileDown,
  FileUp,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Image,
  Link,
  List,
  ListOrdered,
  Minus,
  Quote,
  RefreshCcw,
  RotateCcw,
  RotateCw,
  Shield,
  Sparkles,
  Table,
  Type,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppSidebar from "@/components/blocks/BuilderPage/AppSidebar";
import DashboardHome from "@/components/blocks/BuilderPage/DashboardHome";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const blocksToMarkdown = (blocks) => {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "h1":
          return `# ${block.content}`;
        case "h2":
          return `## ${block.content}`;
        case "h3":
          return `### ${block.content}`;
        case "h4":
          return `#### ${block.content}`;
        case "h5":
          return `##### ${block.content}`;
        case "h6":
          return `###### ${block.content}`;
        case "paragraph":
          return block.content;
        case "blockquote":
          return `> ${block.content}`;
        case "code":
          return block.content;
        case "html":
          return block.content;
        case "ul":
          return block.content;
        case "ol":
          return block.content;
        case "task-list":
          return block.content;
        case "separator":
          return "---";
        case "image": {
          const align = block.align || "left";
          let imageMarkdown;

          if (block.width || block.height) {
            const attrs = [`src="${block.content}"`];
            if (block.alt) attrs.push(`alt="${block.alt}"`);
            if (block.width) attrs.push(`width="${block.width}"`);
            if (block.height) attrs.push(`height="${block.height}"`);
            imageMarkdown = `<img ${attrs.join(" ")} />`;
          } else {
            imageMarkdown = `![${block.alt || ""}](${block.content})`;
          }

          if (align === "center") {
            return `<p align="center">\n\n${imageMarkdown}\n\n</p>`;
          } else if (align === "right") {
            return `<p align="right">\n\n${imageMarkdown}\n\n</p>`;
          }
          return imageMarkdown;
        }
        case "link":
          return `[${block.content}](${block.url || ""})`;
        case "table":
          return block.content;
        case "shield-badge": {
          const label = block.label || "label";
          const message = block.message || "message";
          const color = block.badgeColor || "blue";
          let url = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}`;
          const params = [];
          if (block.style && block.style !== "flat") {
            params.push(`style=${block.style}`);
          }
          if (block.logo) {
            params.push(`logo=${encodeURIComponent(block.logo)}`);
          }
          if (params.length > 0) {
            url += `?${params.join("&")}`;
          }
          return `![${label}: ${message}](${url})`;
        }
        case "skill-icons": {
          const icons = block.icons || "js,html,css";
          let url = `https://skillicons.dev/icons?i=${icons}`;
          if (block.theme && block.theme !== "dark") {
            url += `&theme=${block.theme}`;
          }
          if (block.perLine && block.perLine !== "15") {
            url += `&perline=${block.perLine}`;
          }
          return `![Skill Icons](${url})`;
        }
        default:
          return block.content;
      }
    })
    .join("\n\n");
};

///////////////////////////////////


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("editor");
  const [blocks, setBlocks] = useState(() => {
    const saved = localStorage.getItem("markdown-blocks");
    return saved ? JSON.parse(saved) : [];
  });
  const [isImporting, setIsImporting] = useState(false);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    localStorage.setItem("markdown-blocks", JSON.stringify(blocks));
  }, [blocks]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Detect Ctrl+Z (Windows) or Command+Z (Mac) for Undo
      if ((event.ctrlKey || event.metaKey) && event.key === "z" && !event.shiftKey) {
        event.preventDefault();
        handleUndo();
      }
      // Detect Ctrl+Y (Windows) or Command+Y (Mac) for Redo
      else if ((event.ctrlKey || event.metaKey) && event.key === "y") {
        event.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [history, historyIndex]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const getBlockIcon = (blockType) => {
    const icons = {
      h1: Heading1,
      h2: Heading2,
      h3: Heading3,
      h4: Heading4,
      h5: Heading5,
      h6: Heading6,
      paragraph: Type,
      blockquote: Quote,
      code: Code,
      ul: List,
      ol: ListOrdered,
      "task-list": CheckSquare,
      separator: Minus,
      image: Image,
      video: Video,
      link: Link,
      table: Table,
      "shield-badge": Shield,
      "skill-icons": Sparkles,
    };
    return icons[blockType] || Type;
  };

  const getBlockLabel = (blockType) => {
    const labels = {
      h1: "Heading 1",
      h2: "Heading 2",
      h3: "Heading 3",
      h4: "Heading 4",
      h5: "Heading 5",
      h6: "Heading 6",
      paragraph: "Paragraph",
      blockquote: "Blockquote",
      code: "Code Block",
      html: "HTML Block",
      ul: "Bullet List",
      ol: "Numbered List",
      "task-list": "Task List",
      separator: "Separator",
      image: "Image",
      video: "Video",
      link: "Link",
      table: "Table",
      "shield-badge": "Shield Badge",
      "skill-icons": "Skill Icons",
    };
    return labels[blockType] || blockType;
  };

  const saveToHistory = (newBlocks) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBlocks);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleReset = () => {
    setBlocks([]);
    saveToHistory([]);
    toast.success("Editor reset");
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setBlocks(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBlocks(history[historyIndex + 1]);
    }
  };

  const handleExport = (format) => {
    const markdown = blocksToMarkdown(blocks);
    if (format === "md") {
      const blob = new Blob([markdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document.md";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Markdown exported!");
    } else {
      toast.info(`${format.toUpperCase()} export coming soon!`);
    }
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".md,.markdown,.txt";
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsImporting(true);
      try {
        const text = await file.text();
        const newBlocks = markdownToBlocks(text);
        setBlocks(newBlocks);
        saveToHistory(newBlocks);
        toast.success("Markdown imported!");
      } catch (error) {
        toast.error("Failed to import file");
        console.log(error);
      } finally {
        setIsImporting(false);
      }
    };
    input.click();
  };

  const markdownToBlocks = (markdown) => {
    const lines = markdown.split("\n");
    const blocks = [];
    let i = 0;
    let blockCounter = 0;

    const generateUniqueId = () => {
      return `${Date.now()}-${blockCounter++}-${Math.random().toString(36).substr(2, 9)}`;
    };

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith("```")) {
        const language = line.replace("```", "").trim() || "javascript";
        const codeLines = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        blocks.push({
          id: generateUniqueId(),
          type: "code",
          content: `\`\`\`${language}\n${codeLines.join("\n")}\n\`\`\``,
        });
        i++;
      } else if (line.match(/^<img\s+[^>]*>/)) {
        // Parse img tag with attributes
        const srcMatch = line.match(/src=["']([^"']+)["']/);
        const altMatch = line.match(/alt=["']([^"']+)["']/);
        const widthMatch = line.match(/width=["']([^"']+)["']/);
        const heightMatch = line.match(/height=["']([^"']+)["']/);

        blocks.push({
          id: generateUniqueId(),
          type: "image",
          content: srcMatch ? srcMatch[1] : "",
          alt: altMatch ? altMatch[1] : "",
          width: widthMatch ? widthMatch[1] : "",
          height: heightMatch ? heightMatch[1] : "",
          align: "left",
        });
        i++;
      } else if (line.match(/^<(\w+)[^>]*>/)) {
        const tagMatch = line.match(/^<(\w+)[^>]*>/);
        const tagName = tagMatch[1];
        const closingTag = `</${tagName}>`;

        if (line.includes(closingTag)) {
          blocks.push({
            id: generateUniqueId(),
            type: "html",
            content: line,
          });
          i++;
        } else {
          const htmlLines = [line];
          i++;

          while (i < lines.length && !lines[i].includes(closingTag)) {
            htmlLines.push(lines[i]);
            i++;
          }

          if (i < lines.length && lines[i].includes(closingTag)) {
            htmlLines.push(lines[i]);
            i++;
          }

          blocks.push({
            id: generateUniqueId(),
            type: "html",
            content: htmlLines.join("\n"),
          });
        }
      } else if (line.startsWith("# ")) {
        blocks.push({
          id: generateUniqueId(),
          type: "h1",
          content: line.slice(2),
        });
        i++;
      } else if (line.startsWith("## ")) {
        blocks.push({
          id: generateUniqueId(),
          type: "h2",
          content: line.slice(3),
        });
        i++;
      } else if (line.startsWith("### ")) {
        blocks.push({
          id: generateUniqueId(),
          type: "h3",
          content: line.slice(4),
        });
        i++;
      } else if (line.startsWith("#### ")) {
        blocks.push({
          id: generateUniqueId(),
          type: "h4",
          content: line.slice(5),
        });
        i++;
      } else if (line.startsWith("##### ")) {
        blocks.push({
          id: generateUniqueId(),
          type: "h5",
          content: line.slice(6),
        });
        i++;
      } else if (line.startsWith("###### ")) {
        blocks.push({
          id: generateUniqueId(),
          type: "h6",
          content: line.slice(7),
        });
        i++;
      } else if (line.startsWith("> ")) {
        blocks.push({
          id: generateUniqueId(),
          type: "blockquote",
          content: line.slice(2),
        });
        i++;
      } else if (line === "---") {
        blocks.push({ id: generateUniqueId(), type: "separator", content: "" });
        i++;
      } else if (line.trim()) {
        blocks.push({
          id: generateUniqueId(),
          type: "paragraph",
          content: line,
        });
        i++;
      } else {
        i++;
      }
    }

    return blocks;
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    // Just for visual feedback - don't update state here
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;
    setActiveId(null);

    // If no drop target or dropped back on sidebar, do nothing
    if (!over || over.id === "sidebar") {
      return;
    }

    // Handle reordering existing blocks
    if (over && active.id !== over.id && blocks.find((b) => b.id === active.id)) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newBlocks = arrayMove(blocks, oldIndex, newIndex);
        setBlocks(newBlocks);
        saveToHistory(newBlocks);
      }
      return;
    }

    // Handle adding new blocks from sidebar
    if (over) {
      const isExistingBlock = blocks.find((b) => b.id === active.id);
      if (!isExistingBlock) {
        const blockType = active.id;

        const defaultContent = {
          h1: "Heading 1",
          h2: "Heading 2",
          h3: "Heading 3",
          h4: "Heading 4",
          h5: "Heading 5",
          h6: "Heading 6",
          paragraph: "",
          blockquote: "",
          code: "```javascript\n// Your code here\n```",
          html: "",
          ul: "- Item 1\n- Item 2\n- Item 3",
          ol: "1. First item\n2. Second item\n3. Third item",
          "task-list": "- [ ] Task 1\n- [x] Task 2\n- [ ] Task 3",
          separator: "",
          image: "",
          video: "",
          link: "",
          table:
            "| Header 1 | Header 2 |\n|----------|----------|\n| Add text..   | Add text..   |",
          "shield-badge": "",
          "skill-icons": "",
        };

        const newBlock = {
          id: Date.now().toString(),
          type: blockType,
          content: defaultContent[blockType] || "",
          ...(blockType === "image" && { alt: "", width: "", height: "", align: "left" }),
          ...(blockType === "video" && { title: "" }),
          ...(blockType === "link" && { url: "" }),
          ...(blockType === "shield-badge" && {
            label: "build",
            message: "passing",
            badgeColor: "brightgreen",
            style: "flat",
            logo: "",
          }),
          ...(blockType === "skill-icons" && {
            icons: "js,html,css",
            theme: "dark",
            perLine: "15",
          }),
        };

        let newBlocks;
        // If dropped on editor-dropzone or no specific block, add to end
        if (over.id === "editor-dropzone" || !blocks.find((b) => b.id === over.id)) {
          newBlocks = [...blocks, newBlock];
        } else {
          // Insert at the position of the block it was dropped on
          const overIndex = blocks.findIndex((b) => b.id === over.id);
          newBlocks = [...blocks.slice(0, overIndex + 1), newBlock, ...blocks.slice(overIndex + 1)];
        }

        setBlocks(newBlocks);
        saveToHistory(newBlocks);
      }
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleBlockUpdate = (blockId, updatedBlock) => {
    const newBlocks = blocks.map((b) => (b.id === blockId ? updatedBlock : b));
    setBlocks(newBlocks);
  };

  const handleBlockDelete = (blockId) => {
    const newBlocks = blocks.filter((b) => b.id !== blockId);
    setBlocks(newBlocks);
    saveToHistory(newBlocks);
    toast.success("Block deleted");
  };

  const handleBlocksChange = (newBlocks) => {
    setBlocks(newBlocks);
    saveToHistory(newBlocks);
  };
///////////////////////////////////////////////////////////////////////////


  const getStats = () => {
  const markdown = blocksToMarkdown(blocks);
  const words = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
  const characters = markdown.length;
  const readingTime = Math.ceil(words / 200);
  return { words, characters, readingTime };
};

const stats = getStats();

return (
  <SidebarProvider>
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <AppSidebar />

      <SidebarInset>
        {/* Header */}
        <header className="relative flex h-16 items-center px-4 border-b">
          {/* Left: Sidebar + Stats */}
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-shrink-0 min-w-0">
              <span>
                <span className="font-semibold text-foreground">{stats.readingTime}</span> min read
              </span>
              <span>
                <span className="font-semibold text-foreground">{stats.words}</span> words
              </span>
              <span>
                <span className="font-semibold text-foreground">{stats.characters}</span> chars
              </span>
            </div>
          </div>

          {/* Center: Tabs */}
          <div className="flex justify-center flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="raw">Raw</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              title="Reset"
              onClick={handleReset}
              disabled={blocks.length === 0}
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="Undo"
              onClick={handleUndo}
              disabled={historyIndex === 0}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="Redo"
              onClick={handleRedo}
              disabled={historyIndex === history.length - 1}
            >
              <RotateCw className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-4" />

            <Button variant="outline" size="sm" onClick={handleImport} className="gap-1.5">
              <FileUp className="w-4 h-4" /> Import
            </Button>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("md")}
                disabled={blocks.length === 0}
                className="gap-1.5"
              >
                <FileDown className="w-4 h-4" /> .md
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("pdf")}
                disabled={blocks.length === 0}
                className="gap-1.5"
              >
                <FileDown className="w-4 h-4" /> .pdf
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("html")}
                disabled={blocks.length === 0}
                className="gap-1.5"
              >
                <FileDown className="w-4 h-4" /> .html
              </Button>
            </div>

            <Separator orientation="vertical" className="h-4" />
            <ModeToggle />
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col pt-0 gap-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <DashboardHome
              activeTab={activeTab}
              blocks={blocks}
              onBlocksChange={handleBlocksChange}
              onBlockUpdate={handleBlockUpdate}
              onBlockDelete={handleBlockDelete}
            />
          </div>
        </div>
      </SidebarInset>

      {isImporting && (
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-primary"></div>
          <span className="ml-3 font-medium">Importing...</span>
        </div>
      )}

      <DragOverlay>
        {activeId ? (
          <div className="bg-background border border-border rounded-md px-3 py-2 shadow-lg cursor-grabbing min-w-[200px]">
            <div className="flex items-center gap-2">
              {(() => {
                const Icon = getBlockIcon(activeId);
                return <Icon className="h-4 w-4 text-muted-foreground" />;
              })()}
              <span className="text-sm font-medium text-foreground">
                {blocks.find((b) => b.id === activeId)
                  ? "Moving block..."
                  : getBlockLabel(activeId)}
              </span>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  </SidebarProvider>
);


}
