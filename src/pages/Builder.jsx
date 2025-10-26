import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { CheckSquare, Code, FileDown, FileUp, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Image, Link, List, ListOrdered, Minus, Quote, RefreshCcw, RotateCcw, RotateCw, Shield, Sparkles, Table, Type, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DashboardHome from "@/components/blocks/BuilderPage/DashboardHome";

const WATERMARK = "\n\n---\n\nMade by Markdrop — https://github.com/Aujasyarajput18/Markdrop\n";

const blocksToMarkdown = (blocks) => {
  const content = blocks
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
          if (block.style && block.style !== "flat") params.push(`style=${block.style}`);
          if (block.logo) params.push(`logo=${encodeURIComponent(block.logo)}`);
          if (params.length > 0) url += `?${params.join("&")}`;
          return `![${label}: ${message}](${url})`;
        }
        case "skill-icons": {
          const icons = block.icons || "js,html,css";
          let url = `https://skillicons.dev/icons?i=${icons}`;
          if (block.theme && block.theme !== "dark") url += `&theme=${block.theme}`;
          if (block.perLine && block.perLine !== "15") url += `&perline=${block.perLine}`;
          return `![Skill Icons](${url})`;
        }
        default:
          return block.content;
      }
    })
    .join("\n\n");

  return `${content}${WATERMARK}`;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("editor");
  const [blocks, setBlocks] = useState(() => {
    const saved = localStorage.getItem("markdown-blocks");
    return saved ? JSON.parse(saved) : [];
  });
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    localStorage.setItem("markdown-blocks", JSON.stringify(blocks));
  }, [blocks]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
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
      toast.success("Markdown exported with watermark!");
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
      try {
        const text = await file.text();
        const newBlocks = markdownToBlocks(text);
        setBlocks(newBlocks);
        saveToHistory(newBlocks);
        toast.success("Markdown imported!");
      } catch (error) {
        toast.error("Failed to import file");
        console.log(error);
      }
    };
    input.click();
  };

  const markdownToBlocks = (markdown) => {
    const lines = markdown.split("\n");
    const blocks = [];
    let i = 0;
    let blockCounter = 0;
    const generateUniqueId = () => `${Date.now()}-${blockCounter++}-${Math.random().toString(36).substr(2, 9)}`;

    while (i < lines.length) {
      const line = lines[i];
      if (line.startsWith("```") ) {
        const language = line.replace("```", "").trim() || "javascript";
        const codeLines = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("```") ) {
          codeLines.push(lines[i]);
          i++;
        }
        blocks.push({ id: generateUniqueId(), type: "code", content: "```" + language + "\n" + codeLines.join("\n") + "\n```" });
        i++;
      } else if (line.match(/^<img[^>]*>/)) {
        const srcMatch = line.match(/src=["']([^"']+)["']/);
        const altMatch = line.match(/alt=["']([^"']+)["']/);
        const widthMatch = line.match(/width=["']([^"']+)["']/);
        const heightMatch = line.match(/height=["']([^"']+)["']/);
        blocks.push({ id: generateUniqueId(), type: "image", content: srcMatch ? srcMatch[1] : "", alt: altMatch ? altMatch[1] : "", width: widthMatch ? widthMatch[1] : "", height: heightMatch ? heightMatch[1] : "", align: "left" });
        i++;
      } else if (line.match(/^<(\w+)[^>]*>/)) {
        const tagMatch = line.match(/^<(\w+)[^>]*>/);
        const tagName = tagMatch[1];
        const closingTag = `</${tagName}>`;
        if (line.includes(closingTag)) {
          blocks.push({ id: generateUniqueId(), type: "html", content: line });
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
          blocks.push({ id: generateUniqueId(), type: "html", content: htmlLines.join("\n") });
        }
      } else if (line.startsWith("# ")) {
        blocks.push({ id: generateUniqueId(), type: "h1", content: line.slice(2) });
        i++;
      } else if (line.startsWith("## ")) {
        blocks.push({ id: generateUniqueId(), type: "h2", content: line.slice(3) });
        i++;
      } else if (line.startsWith("### ")) {
        blocks.push({ id: generateUniqueId(), type: "h3", content: line.slice(4) });
        i++;
      } else if (line.startsWith("#### ")) {
        blocks.push({ id: generateUniqueId(), type: "h4", content: line.slice(5) });
        i++;
      } else if (line.startsWith("##### ")) {
        blocks.push({ id: generateUniqueId(), type: "h5", content: line.slice(6) });
        i++;
      } else if (line.startsWith("###### ")) {
        blocks.push({ id: generateUniqueId(), type: "h6", content: line.slice(7) });
        i++;
      } else if (line.startsWith("> ")) {
        blocks.push({ id: generateUniqueId(), type: "blockquote", content: line.slice(2) });
        i++;
      } else if (line === "---") {
        blocks.push({ id: generateUniqueId(), type: "separator", content: "" });
        i++;
      } else if (line.trim()) {
        blocks.push({ id: generateUniqueId(), type: "paragraph", content: line });
        i++;
      } else {
        i++;
      }
    }
    return blocks;
  };

  const handleDragStart = (event) => { setActiveId(event.active.id); };
  const handleDragOver = () => {};
  const handleDragEnd = (event) => {
    const { over, active } = event;
    setActiveId(null);
    if (!over || over.id === "sidebar") return;
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
          html: "",
          ul: "- Item 1\n- Item 2\n- Item 3",
          ol: "1. First item\n2. Second item\n3. Third item",
          "task-list": "- [ ] Task 1\n- [x] Task 2\n- [ ] Task 3",
          separator: "",
          image: "",
          video: "",
          link: "",
          table: "| Header 1 | Header 2 |\n|----------|----------|\n| Add text..   | Add text..   |",
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
          ...(blockType === "shield-badge" && { label: "build", message: "passing", badgeColor: "brightgreen", style: "flat", logo: "" }),
          ...(blockType === "skill-icons" && { icons: "js,html,css", theme: "dark", perLine: "15" }),
        };
        let newBlocks;
        if (over.id === "editor-dropzone" || !blocks.find((b) => b.id === over.id)) {
          newBlocks = [...blocks, newBlock];
        } else {
          const overIndex = blocks.findIndex((
