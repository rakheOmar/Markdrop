import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  CheckSquare,
  Code,
  Eye,
  FileCode,
  FileDown,
  FileUp,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Image,
  Info,
  Link,
  List,
  ListOrdered,
  Menu,
  Minus,
  Moon,
  PanelRight,
  Pencil,
  Quote,
  RefreshCcw,
  RotateCcw,
  RotateCw,
  Save,
  Shield,
  Sparkles,
  Sun,
  Table,
  Type,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import AIAssistantSheet from "@/components/blocks/BuilderPage/AIAssistantSheet";
import AppSidebar from "@/components/blocks/BuilderPage/AppSidebar";
import DashboardHome from "@/components/blocks/BuilderPage/DashboardHome";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useBuilderTour } from "@/hooks/useBuilderTour";
import { useThemeTransition } from "@/hooks/useThemeTransition";
import { blocksToMarkdown, exportToHTML, exportToMarkdown, exportToPDF } from "@/lib/exportUtils";
import { createMarkdown, getMarkdownById, updateMarkdown } from "@/lib/storage";

export default function Builder() {
  const { theme, setTheme } = useTheme();
  const { applyCircleExpand } = useThemeTransition();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const { startTour } = useBuilderTour();
  const [activeTab, setActiveTab] = useState("editor");
  const [blocks, setBlocks] = useState(() => {
    const saved = localStorage.getItem("markdown-blocks");
    return saved ? JSON.parse(saved) : [];
  });
  const [isImporting, setIsImporting] = useState(false);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [currentDocumentId, setCurrentDocumentId] = useState(null);
  const [lastSavedContent, setLastSavedContent] = useState("");
  const [showSparkleDialog, setShowSparkleDialog] = useState(false);

  useEffect(() => {
    localStorage.setItem("markdown-blocks", JSON.stringify(blocks));
  }, [blocks]);

  // Load document from URL parameter on mount
  useEffect(() => {
    const loadDocumentFromUrl = async () => {
      if (id && user) {
        try {
          const document = await getMarkdownById(id);
          if (document && document.user_id === user.id) {
            const parsedBlocks = JSON.parse(document.content);
            setBlocks(parsedBlocks);
            setCurrentDocumentId(document.id);
            setSaveTitle(document.title);
            setLastSavedContent(document.content);
            setHistory([parsedBlocks]);
            setHistoryIndex(0);
            toast.success(`Loaded "${document.title}"`);
          } else {
            toast.error("Document not found or access denied");
            navigate("/builder");
          }
        } catch (error) {
          console.error("Error loading document:", error);
          toast.error("Failed to load document");
          navigate("/builder");
        }
      }
    };

    loadDocumentFromUrl();
  }, [id, user, navigate]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor)
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

  const saveToHistory = useCallback(
    (newBlocks) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newBlocks);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [history, historyIndex]
  );

  const handleReset = () => {
    setBlocks([]);
    saveToHistory([]);
    toast.success("Editor reset");
  };

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setBlocks(history[historyIndex - 1]);
    }
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBlocks(history[historyIndex + 1]);
    }
  }, [historyIndex, history]);

  const handleSave = useCallback(async () => {
    if (!user) {
      toast.error("Please log in to save your document");
      navigate("/login");
      return;
    }

    if (blocks.length === 0) {
      toast.error("Cannot save an empty document");
      return;
    }

    if (currentDocumentId && saveTitle) {
      setIsSaving(true);
      try {
        const content = JSON.stringify(blocks);
        await updateMarkdown(currentDocumentId, {
          title: saveTitle,
          content: content,
        });
        setLastSavedContent(content);
        toast.success("Document updated successfully!");
      } catch (error) {
        console.error("Save error:", error);
        toast.error("Failed to save document. Please try again.");
      } finally {
        setIsSaving(false);
      }
      return;
    }

    if (!saveTitle) {
      const firstHeading = blocks.find(
        (block) => ["h1", "h2", "h3", "h4", "h5", "h6"].includes(block.type) && block.content.trim()
      );
      if (firstHeading) {
        setSaveTitle(firstHeading.content.trim());
      }
    }

    setShowSaveDialog(true);
  }, [user, navigate, blocks, saveTitle, currentDocumentId]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "z" && !event.shiftKey) {
        event.preventDefault();
        handleUndo();
      } else if ((event.ctrlKey || event.metaKey) && event.key === "y") {
        event.preventDefault();
        handleRedo();
      } else if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleUndo, handleRedo, handleSave]);

  const toggleTheme = () => {
    applyCircleExpand(() => setTheme(theme === "dark" ? "light" : "dark"));
  };

  const handleExport = async (format) => {
    if (blocks.length === 0) {
      toast.error("No content to export");
      return;
    }

    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `markdrop-document-${timestamp}`;

    try {
      switch (format) {
        case "md":
          exportToMarkdown(blocks, `${filename}.md`);
          toast.success("Markdown exported!");
          break;
        case "html":
          exportToHTML(blocks, `${filename}.html`);
          toast.success("HTML exported!");
          break;
        case "pdf":
          await exportToPDF(blocks, `${filename}.pdf`);
          toast.success("PDF exported!");
          break;
        default:
          toast.error(`Unsupported format: ${format}`);
      }
    } catch (error) {
      console.error(`Export error for ${format}:`, error);
      toast.error(`Failed to export ${format.toUpperCase()}`);
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
      } catch {
        toast.error("Failed to import file");
      } finally {
        setIsImporting(false);
      }
    };
    input.click();
  };

  const handleSaveConfirm = async () => {
    if (!saveTitle.trim()) {
      toast.error("Please enter a title for your document");
      return;
    }

    setIsSaving(true);
    try {
      const content = JSON.stringify(blocks);

      // Create new document (existing documents are handled directly in handleSave)
      const newDoc = await createMarkdown(user.id, saveTitle.trim(), content);
      setCurrentDocumentId(newDoc.id);
      setLastSavedContent(content);
      toast.success("Document saved successfully!");

      setShowSaveDialog(false);
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save document. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveCancel = () => {
    setShowSaveDialog(false);
    if (!currentDocumentId) {
      setSaveTitle("");
    }
  };

  const loadDocument = useCallback(
    (document) => {
      try {
        const parsedBlocks = JSON.parse(document.content);
        setBlocks(parsedBlocks);
        setCurrentDocumentId(document.id);
        setSaveTitle(document.title);
        setLastSavedContent(document.content);
        saveToHistory(parsedBlocks);
        toast.success(`Loaded "${document.title}"`);
      } catch (error) {
        console.error("Error loading document:", error);
        toast.error("Failed to load document");
      }
    },
    [saveToHistory]
  );

  useEffect(() => {
    window.loadDocument = loadDocument;
    return () => {
      delete window.loadDocument;
    };
  }, [loadDocument]);

  const markdownToBlocks = (markdown) => {
    const lines = markdown.split("\n");
    const blocks = [];
    let i = 0;
    let blockCounter = 0;

    const generateUniqueId = () => {
      return `${Date.now()}-${blockCounter++}-${Math.random().toString(36).substring(2, 11)}`;
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

  // biome-ignore lint/suspicious/noEmptyBlockStatements: for responsiveness
  const handleDragOver = () => {};

  const handleDragEnd = (event) => {
    const { over, active } = event;
    setActiveId(null);

    if (!over || over.id === "sidebar") {
      return;
    }

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
          ...(blockType === "image" && {
            alt: "",
            width: "",
            height: "",
            align: "left",
          }),
          ...(blockType === "video" && { title: "" }),
          ...(blockType === "link" && { url: "" }),
          ...(blockType === "shield-badge" && {
            badges: [
              {
                type: "custom",
                label: "build",
                message: "passing",
                color: "brightgreen",
                style: "flat",
                logo: "",
                username: "",
                repo: "",
                package: "",
              },
            ],
            align: "left",
          }),
          ...(blockType === "skill-icons" && {
            icons: "js,html,css",
            theme: "dark",
            perLine: "15",
          }),
        };

        let newBlocks;
        if (over.id === "editor-dropzone" || !blocks.find((b) => b.id === over.id)) {
          newBlocks = [...blocks, newBlock];
        } else {
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

  const handleBlockAdd = (afterBlockId = null, customBlock = null) => {
    const newBlock = customBlock || {
      id: Date.now().toString(),
      type: "paragraph",
      content: "",
    };

    if (!newBlock.id) {
      newBlock.id = Date.now().toString();
    }

    let newBlocks;
    if (afterBlockId) {
      const afterIndex = blocks.findIndex((b) => b.id === afterBlockId);
      if (afterIndex !== -1) {
        newBlocks = [...blocks.slice(0, afterIndex + 1), newBlock, ...blocks.slice(afterIndex + 1)];
      } else {
        newBlocks = [...blocks, newBlock];
      }
    } else {
      newBlocks = [...blocks, newBlock];
    }

    setBlocks(newBlocks);
    saveToHistory(newBlocks);
  };

  const getStats = () => {
    const markdown = blocksToMarkdown(blocks);
    const words = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
    const characters = markdown.length;
    const readingTime = Math.ceil(words / 200);
    return { words, characters, readingTime };
  };

  const stats = getStats();

  const hasUnsavedChanges = () => {
    const currentContent = JSON.stringify(blocks);
    return currentContent !== lastSavedContent && blocks.length > 0;
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <AppSidebar onBlockAdd={handleBlockAdd} />

        <SidebarInset>
          <motion.header
            className="flex h-16 shrink-0 items-center px-2 sm:px-4 border-b relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <SidebarTrigger id="builder-sidebar-trigger" className="-ml-1" />
              <Separator orientation="vertical" className="h-4 hidden sm:block" />

              <div
                id="builder-stats"
                className="hidden lg:flex items-center gap-3 text-sm text-muted-foreground"
              >
                <span>
                  <span className="font-semibold text-foreground">{stats.readingTime}</span> min
                  read
                </span>
                <span>
                  <span className="font-semibold text-foreground">{stats.words}</span> words
                </span>
                <span>
                  <span className="font-semibold text-foreground">{stats.characters}</span> chars
                </span>
              </div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 px-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList
                  id="builder-tabs"
                  className="grid w-full grid-cols-3 max-w-[280px] sm:max-w-[300px] bg-muted/50 p-1"
                >
                  <TabsTrigger
                    value="editor"
                    className="text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="hidden sm:inline">Editor</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="raw"
                    className="text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5"
                  >
                    <FileCode className="h-4 w-4" />
                    <span className="hidden sm:inline">Raw</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">Preview</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 flex-1 justify-end">
              <div id="builder-undo-btn" className="hidden xl:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  title="Undo"
                  onClick={handleUndo}
                  disabled={historyIndex === 0}
                  className="px-2"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  title="Redo"
                  onClick={handleRedo}
                  disabled={historyIndex === history.length - 1}
                  className="px-2"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-4" />
              </div>

              <Button
                id="builder-import-btn"
                variant="outline"
                size="sm"
                onClick={handleImport}
                className="hidden lg:flex gap-1.5"
              >
                <FileUp className="w-4 h-4" />
                <span className="hidden lg:inline">Import</span>
              </Button>

              <Button
                id="builder-save-btn"
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="hidden md:flex gap-1.5 relative"
              >
                <Save className="w-4 h-4" />
                <span className="hidden lg:inline">Save</span>
                {hasUnsavedChanges() && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button id="builder-menu-btn" variant="ghost" size="sm" className="px-2">
                    <Menu className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="lg:hidden px-2 py-2 text-xs text-muted-foreground bg-muted/50 rounded-sm mb-2">
                    <div className="font-medium mb-1">Document Stats</div>
                    <div className="space-y-0.5">
                      <div>
                        {stats.readingTime} min read • {stats.words} words
                      </div>
                      <div>{stats.characters} characters</div>
                    </div>
                  </div>

                  <DropdownMenuItem onClick={handleImport} className="lg:hidden">
                    <FileUp className="w-4 h-4 mr-2" />
                    Import File
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleSave} className="md:hidden">
                    <Save className="w-4 h-4 mr-2" />
                    Save Document
                    {hasUnsavedChanges() && (
                      <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full" />
                    )}
                  </DropdownMenuItem>

                  <div className="xl:hidden">
                    {(historyIndex > 0 || historyIndex < history.length - 1) && (
                      <>
                        <DropdownMenuItem onClick={handleUndo} disabled={historyIndex === 0}>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Undo
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={handleRedo}
                          disabled={historyIndex === history.length - 1}
                        >
                          <RotateCw className="w-4 h-4 mr-2" />
                          Redo
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                  </div>

                  <DropdownMenuItem
                    onClick={() => handleExport("md")}
                    disabled={blocks.length === 0}
                  >
                    <FileDown className="w-4 h-4 mr-2" />
                    Export Markdown
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleExport("pdf")}
                    disabled={blocks.length === 0}
                  >
                    <FileDown className="w-4 h-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleExport("html")}
                    disabled={blocks.length === 0}
                  >
                    <FileDown className="w-4 h-4 mr-2" />
                    Export as HTML
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={startTour}>
                    <Info className="w-4 h-4 mr-2" />
                    Show Tutorial
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={toggleTheme}>
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4 mr-2" />
                    ) : (
                      <Moon className="w-4 h-4 mr-2" />
                    )}
                    Switch to {theme === "dark" ? "Light" : "Dark"}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleReset}
                    disabled={blocks.length === 0}
                    className="text-destructive focus:text-destructive"
                  >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Reset Editor
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                id="builder-right-sidebar-trigger"
                variant="ghost"
                size="sm"
                className="px-2"
                onClick={() => setShowSparkleDialog(true)}
                title="AI Assistant"
              >
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
          </motion.header>

          <motion.div
            className="flex flex-1 flex-col p-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div id="builder-content-area" className="flex-1 w-full max-w-none">
              <DashboardHome
                activeTab={activeTab}
                blocks={blocks}
                onBlocksChange={handleBlocksChange}
                onBlockUpdate={handleBlockUpdate}
                onBlockDelete={handleBlockDelete}
                onBlockAdd={handleBlockAdd}
              />
            </div>
          </motion.div>
        </SidebarInset>

        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Document</DialogTitle>
              <DialogDescription>Enter a title for your markdown document.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Document Title</Label>
                <Input
                  id="title"
                  placeholder="Enter document title..."
                  value={saveTitle}
                  onChange={(e) => setSaveTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSaveConfirm();
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleSaveCancel} disabled={isSaving}>
                Cancel
              </Button>
              <Button onClick={handleSaveConfirm} disabled={isSaving || !saveTitle.trim()}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AIAssistantSheet open={showSparkleDialog} onOpenChange={setShowSparkleDialog} />

        {isImporting && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex items-center gap-3 bg-background/90 rounded-lg px-4 py-3 shadow-lg border">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent border-primary"></div>
              <span className="font-medium text-sm sm:text-base">Importing...</span>
            </div>
          </div>
        )}

        <DragOverlay>
          {activeId ? (
            <div className="bg-background border border-border rounded-md px-2 sm:px-3 py-2 shadow-lg cursor-grabbing min-w-[150px] sm:min-w-[200px]">
              <div className="flex items-center gap-2">
                {(() => {
                  const Icon = getBlockIcon(activeId);
                  return <Icon className="h-4 w-4 text-muted-foreground shrink-0" />;
                })()}
                <span className="text-xs sm:text-sm font-medium text-foreground truncate">
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
