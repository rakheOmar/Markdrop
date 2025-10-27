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
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  BarChart3,
  CheckSquare,
  Code,
  FileDown,
  FileText,
  FileUp,
  Github,
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
  Menu,
  Minus,
  Moon,
  Quote,
  RefreshCcw,
  RotateCcw,
  RotateCw,
  Shield,
  Sparkles,
  Sun,
  Table,
  Type,
  Users,
  Video,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import AppSidebar from "@/components/blocks/BuilderPage/AppSidebar";
import DashboardHome from "@/components/blocks/BuilderPage/DashboardHome";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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

          // If width or height is specified, use HTML img tag
          if (block.width || block.height) {
            const attrs = [`src="${block.content}"`];
            if (block.alt) attrs.push(`alt="${block.alt}"`);
            if (block.width) attrs.push(`width="${block.width}"`);
            if (block.height) attrs.push(`height="${block.height}"`);
            imageMarkdown = `<img ${attrs.join(" ")} />`;
          } else {
            imageMarkdown = `![${block.alt || ""}](${block.content})`;
          }

          // Wrap with alignment p tag if not left
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
          let url = `https://img.shields.io/badge/${encodeURIComponent(
            label
          )}-${encodeURIComponent(message)}-${color}`;
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
        case "github-stats": {
          const stats = block.stats || [];
          const align = block.align || "left";

          if (stats.length === 0) return "";

          const badgesMarkdown = stats
            .filter((stat) => stat.username && stat.repo)
            .map((stat) => {
              const { type, username, repo, label } = stat;
              const baseUrl = "https://img.shields.io/github";

              switch (type) {
                case "stars":
                  return `![${label}](${baseUrl}/stars/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )})`;
                case "forks":
                  return `![${label}](${baseUrl}/forks/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )})`;
                case "issues":
                  return `![${label}](${baseUrl}/issues/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )})`;
                case "pull-requests":
                  return `![${label}](${baseUrl}/issues-pr/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )})`;
                case "license":
                  return `![${label}](${baseUrl}/license/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )})`;
                case "last-commit":
                  return `![${label}](${baseUrl}/last-commit/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )})`;
                case "repo-size":
                  return `![${label}](${baseUrl}/repo-size/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )})`;
                case "languages":
                  return `![${label}](${baseUrl}/languages/top/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )})`;
                default:
                  return "";
              }
            })
            .filter(Boolean)
            .join(" ");

          if (align === "center") {
            return `<div align="center">\n\n${badgesMarkdown}\n\n</div>`;
          } else if (align === "right") {
            return `<div align="right">\n\n${badgesMarkdown}\n\n</div>`;
          }
          return badgesMarkdown;
        }
        case "social-badges": {
          const badges = block.badges || [];
          const align = block.align || "left";

          if (badges.length === 0) return "";

          const badgesMarkdown = badges
            .filter((badge) => badge.username)
            .map((badge) => {
              const { type, username, label } = badge;
              const baseUrl = "https://img.shields.io";

              switch (type) {
                case "twitter":
                  return `![${label}](${baseUrl}/twitter/follow/${username}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=twitter&logoColor=white)`;
                case "youtube":
                  return `![${label}](${baseUrl}/youtube/channel/subscribers/${username}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=youtube&logoColor=red)`;
                case "discord":
                  return `![${label}](${baseUrl}/discord/${username}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=discord&logoColor=white)`;
                case "twitch":
                  return `![${label}](${baseUrl}/twitch/status/${username}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=twitch&logoColor=white)`;
                case "instagram":
                  return `![${label}](${baseUrl}/instagram/followers/${username}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=instagram&logoColor=white)`;
                case "linkedin":
                  return `![${label}](${baseUrl}/linkedin/followers/${username}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=linkedin&logoColor=white)`;
                case "github":
                  return `![${label}](${baseUrl}/github/followers/${username}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=github&logoColor=white)`;
                case "reddit":
                  return `![${label}](${baseUrl}/reddit/user-karma/${username}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=reddit&logoColor=white)`;
                default:
                  return "";
              }
            })
            .filter(Boolean)
            .join(" ");

          if (align === "center") {
            return `<div align="center">\n\n${badgesMarkdown}\n\n</div>`;
          } else if (align === "right") {
            return `<div align="right">\n\n${badgesMarkdown}\n\n</div>`;
          }
          return badgesMarkdown;
        }
        case "dev-metrics": {
          const metrics = block.metrics || [];
          const align = block.align || "left";

          if (metrics.length === 0) return "";

          const metricsMarkdown = metrics
            .filter((metric) => {
              const needsPackage = [
                "npm-downloads",
                "npm-version",
                "pypi-downloads",
                "pypi-version",
                "docker-pulls",
                "docker-stars",
              ].includes(metric.type);
              const needsRepo = [
                "codecov",
                "coveralls",
                "travis-ci",
                "github-actions",
              ].includes(metric.type);
              return (
                (needsPackage && metric.package) ||
                (needsRepo && metric.username && metric.repo)
              );
            })
            .map((metric) => {
              const { type, package: pkg, label, username, repo } = metric;
              const baseUrl = "https://img.shields.io";

              switch (type) {
                case "npm-downloads":
                  return `![${label}](${baseUrl}/npm/dm/${pkg}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=npm&logoColor=white)`;
                case "npm-version":
                  return `![${label}](${baseUrl}/npm/v/${pkg}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=npm&logoColor=white)`;
                case "pypi-downloads":
                  return `![${label}](${baseUrl}/pypi/dm/${pkg}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=pypi&logoColor=white)`;
                case "pypi-version":
                  return `![${label}](${baseUrl}/pypi/v/${pkg}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=pypi&logoColor=white)`;
                case "codecov":
                  return `![${label}](${baseUrl}/codecov/c/github/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=codecov&logoColor=white)`;
                case "coveralls":
                  return `![${label}](${baseUrl}/coveralls/github/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=coveralls&logoColor=white)`;
                case "travis-ci":
                  return `![${label}](${baseUrl}/travis-ci/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=travis-ci&logoColor=white)`;
                case "github-actions":
                  return `![${label}](${baseUrl}/github/workflows/status/${username}/${repo}/main?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=github-actions&logoColor=white)`;
                case "docker-pulls":
                  return `![${label}](${baseUrl}/docker/pulls/${pkg}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=docker&logoColor=white)`;
                case "docker-stars":
                  return `![${label}](${baseUrl}/docker/stars/${pkg}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=docker&logoColor=white)`;
                default:
                  return "";
              }
            })
            .filter(Boolean)
            .join(" ");

          if (align === "center") {
            return `<div align="center">\n\n${metricsMarkdown}\n\n</div>`;
          } else if (align === "right") {
            return `<div align="right">\n\n${metricsMarkdown}\n\n</div>`;
          }
          return metricsMarkdown;
        }
        case "doc-badges": {
          const badges = block.badges || [];
          const align = block.align || "left";

          if (badges.length === 0) return "";

          const badgesMarkdown = badges
            .filter((badge) => {
              const badgeType = [
                "stars",
                "forks",
                "issues",
                "license",
                "last-commit",
                "repo-size",
                "languages",
                "contributors",
              ].includes(badge.type);
              const needsRepo = badgeType;
              return (
                (needsRepo && badge.username && badge.repo) ||
                (!needsRepo && badge.label)
              );
            })
            .map((badge) => {
              const { type, username, repo, label } = badge;
              const baseUrl = "https://img.shields.io";

              switch (type) {
                case "stars":
                  return `![${label}](${baseUrl}/github/stars/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=github&logoColor=white)`;
                case "forks":
                  return `![${label}](${baseUrl}/github/forks/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=github&logoColor=white)`;
                case "issues":
                  return `![${label}](${baseUrl}/github/issues/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=github&logoColor=white)`;
                case "license":
                  return `![${label}](${baseUrl}/github/license/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=github&logoColor=white)`;
                case "last-commit":
                  return `![${label}](${baseUrl}/github/last-commit/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=github&logoColor=white)`;
                case "repo-size":
                  return `![${label}](${baseUrl}/github/repo-size/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=github&logoColor=white)`;
                case "languages":
                  return `![${label}](${baseUrl}/github/languages/top/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=github&logoColor=white)`;
                case "contributors":
                  return `![${label}](${baseUrl}/github/contributors/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                    label
                  )}&logo=github&logoColor=white)`;
                case "gitbook":
                  return `![${label}](${baseUrl}/static/v1?label=${encodeURIComponent(
                    label
                  )}&message=GitBook&color=3884FF&logo=gitbook&logoColor=white&style=flat-square)`;
                case "notion":
                  return `![${label}](${baseUrl}/static/v1?label=${encodeURIComponent(
                    label
                  )}&message=Notion&color=000000&logo=notion&logoColor=white&style=flat-square)`;
                case "confluence":
                  return `![${label}](${baseUrl}/static/v1?label=${encodeURIComponent(
                    label
                  )}&message=Confluence&color=172B4D&logo=confluence&logoColor=white&style=flat-square)`;
                case "docusaurus":
                  return `![${label}](${baseUrl}/static/v1?label=${encodeURIComponent(
                    label
                  )}&message=Docusaurus&color=2E8555&logo=docusaurus&logoColor=white&style=flat-square)`;
                case "mkdocs":
                  return `![${label}](${baseUrl}/static/v1?label=${encodeURIComponent(
                    label
                  )}&message=MkDocs&color=000000&logo=markdown&logoColor=white&style=flat-square)`;
                case "sphinx":
                  return `![${label}](${baseUrl}/static/v1?label=${encodeURIComponent(
                    label
                  )}&message=Sphinx&color=4B8B3B&logo=sphinx&logoColor=white&style=flat-square)`;
                default:
                  return "";
              }
            })
            .filter(Boolean)
            .join(" ");

          if (align === "center") {
            return `<div align="center">\n\n${badgesMarkdown}\n\n</div>`;
          } else if (align === "right") {
            return `<div align="right">\n\n${badgesMarkdown}\n\n</div>`;
          }
          return badgesMarkdown;
        }
        default:
          return block.content;
      }
    })
    .join("\n\n");
};

export default function Dashboard() {
  const { theme, setTheme } = useTheme();
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
      "github-stats": Github,
      "social-badges": Users,
      "dev-metrics": BarChart3,
      "doc-badges": FileText,
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
      "github-stats": "GitHub Stats",
      "social-badges": "Social Badges",
      "dev-metrics": "Dev Metrics",
      "doc-badges": "Documentation Badges",
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Detect Ctrl+Z (Windows) or Command+Z (Mac) for Undo
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "z" &&
        !event.shiftKey
      ) {
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
  }, [handleUndo, handleRedo]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
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
      } catch {
        toast.error("Failed to import file");
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
      return `${Date.now()}-${blockCounter++}-${Math.random()
        .toString(36)
        .substring(2, 11)}`;
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

  const handleDragOver = () => {
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
    if (
      over &&
      active.id !== over.id &&
      blocks.find((b) => b.id === active.id)
    ) {
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
          "github-stats": "",
          "social-badges": "",
          "dev-metrics": "",
          "doc-badges": "",
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
          ...(blockType === "github-stats" && {
            stats: [{ type: "stars", username: "", repo: "", label: "Stars" }],
            align: "left",
          }),
          ...(blockType === "social-badges" && {
            badges: [{ type: "twitter", username: "", label: "Followers" }],
            align: "left",
          }),
          ...(blockType === "dev-metrics" && {
            metrics: [
              { type: "npm-downloads", package: "", label: "Downloads" },
            ],
            align: "left",
          }),
          ...(blockType === "doc-badges" && {
            badges: [{ type: "stars", username: "", repo: "", label: "Stars" }],
            align: "left",
          }),
        };

        let newBlocks;
        // If dropped on editor-dropzone or no specific block, add to end
        if (
          over.id === "editor-dropzone" ||
          !blocks.find((b) => b.id === over.id)
        ) {
          newBlocks = [...blocks, newBlock];
        } else {
          // Insert at the position of the block it was dropped on
          const overIndex = blocks.findIndex((b) => b.id === over.id);
          newBlocks = [
            ...blocks.slice(0, overIndex + 1),
            newBlock,
            ...blocks.slice(overIndex + 1),
          ];
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

    // Ensure the block has a unique ID
    if (!newBlock.id) {
      newBlock.id = Date.now().toString();
    }

    let newBlocks;
    if (afterBlockId) {
      // Insert after the specified block
      const afterIndex = blocks.findIndex((b) => b.id === afterBlockId);
      if (afterIndex !== -1) {
        newBlocks = [
          ...blocks.slice(0, afterIndex + 1),
          newBlock,
          ...blocks.slice(afterIndex + 1),
        ];
      } else {
        newBlocks = [...blocks, newBlock];
      }
    } else {
      // Add to the end
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
          <header className="flex h-16 shrink-0 items-center justify-between px-2 sm:px-4 border-b">
            {/* Left: Sidebar trigger and stats */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="h-4 hidden sm:block"
              />

              {/* Stats - responsive visibility */}
              <div className="hidden lg:flex items-center gap-3 text-sm text-muted-foreground">
                <span>
                  <span className="font-semibold text-foreground">
                    {stats.readingTime}
                  </span>{" "}
                  min read
                </span>
                <span>
                  <span className="font-semibold text-foreground">
                    {stats.words}
                  </span>{" "}
                  words
                </span>
                <span>
                  <span className="font-semibold text-foreground">
                    {stats.characters}
                  </span>{" "}
                  chars
                </span>
              </div>
            </div>

            {/* Center: Tabs */}
            <div className="flex-1 flex justify-center px-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 max-w-[280px] sm:max-w-[300px] bg-muted/50 p-1">
                  <TabsTrigger
                    value="editor"
                    className="text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200"
                  >
                    Editor
                  </TabsTrigger>
                  <TabsTrigger
                    value="raw"
                    className="text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200"
                  >
                    Raw
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200"
                  >
                    Preview
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Quick actions - visible on larger screens */}
              <div className="hidden xl:flex items-center gap-2">
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

              {/* Import button - visible on large+ screens */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleImport}
                className="hidden lg:flex gap-1.5"
              >
                <FileUp className="w-4 h-4" />
                <span className="hidden lg:inline">Import</span>
              </Button>

              {/* Actions dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="px-2">
                    <Menu className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {/* Document Stats - Mobile/Tablet Only */}
                  <div className="lg:hidden px-3 py-2 text-xs text-muted-foreground bg-muted/50 rounded-sm mx-2 mb-2">
                    <div className="font-medium mb-1">Document Stats</div>
                    <div className="space-y-0.5">
                      <div>
                        {stats.readingTime} min read • {stats.words} words
                      </div>
                      <div>{stats.characters} characters</div>
                    </div>
                  </div>

                  {/* File Operations */}
                  <DropdownMenuItem
                    onClick={handleImport}
                    className="lg:hidden"
                  >
                    <FileUp className="w-4 h-4 mr-2" />
                    Import File
                  </DropdownMenuItem>

                  {/* Edit Actions - Mobile/Tablet Only */}
                  <div className="xl:hidden">
                    {(historyIndex > 0 ||
                      historyIndex < history.length - 1) && (
                      <>
                        <DropdownMenuItem
                          onClick={handleUndo}
                          disabled={historyIndex === 0}
                        >
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

                  {/* Export Section */}
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

                  {/* Appearance */}
                  <DropdownMenuItem onClick={toggleTheme}>
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4 mr-2" />
                    ) : (
                      <Moon className="w-4 h-4 mr-2" />
                    )}
                    Switch to {theme === "dark" ? "Light" : "Dark"}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {/* Danger Zone */}
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
            </div>
          </header>

          {/* Main Content */}
          <div className="flex flex-1 flex-col p-4 gap-4">
            <div className="flex-1 w-full max-w-none">
              <DashboardHome
                activeTab={activeTab}
                blocks={blocks}
                onBlocksChange={handleBlocksChange}
                onBlockUpdate={handleBlockUpdate}
                onBlockDelete={handleBlockDelete}
                onBlockAdd={handleBlockAdd}
              />
            </div>
          </div>
        </SidebarInset>
        {isImporting && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex items-center gap-3 bg-background/90 rounded-lg px-4 py-3 shadow-lg border">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent border-primary"></div>
              <span className="font-medium text-sm sm:text-base">
                Importing...
              </span>
            </div>
          </div>
        )}

        <DragOverlay>
          {activeId ? (
            <div className="bg-background border border-border rounded-md px-2 sm:px-3 py-2 shadow-lg cursor-grabbing min-w-[150px] sm:min-w-[200px]">
              <div className="flex items-center gap-2">
                {(() => {
                  const Icon = getBlockIcon(activeId);
                  return (
                    <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  );
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
