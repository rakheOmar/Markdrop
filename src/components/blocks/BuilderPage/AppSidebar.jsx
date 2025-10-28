import { useDraggable, useDroppable } from "@dnd-kit/core";
import {
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Image,
  Link2,
  ListChecks,
  Minus,
  ListOrdered as OrderedList,
  Pilcrow,
  Quote,
  Shield,
  Sparkles,
  Table,
  List as UnorderedList,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import markdropIconDark from "@/assets/markdrop_icon_dark.svg";
import markdropIconLight from "@/assets/markdrop_icon_light.svg";
import markdropLogoDark from "@/assets/markdrop_logo_dark.svg";
import markdropLogoLight from "@/assets/markdrop_logo_light.svg";
import { useTheme } from "@/components/ThemeProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

function DraggableItem({ id, title, icon: Icon, isCollapsed, isMobile, onDoubleClick }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });

  // On mobile, always show text even if sidebar is "collapsed"
  const showText = !isCollapsed || isMobile;
  const itemClasses = showText ? "px-3 mx-2" : "justify-center mx-0 px-0";

  const handleDoubleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDoubleClick(id);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onDoubleClick={handleDoubleClick}
      className={`flex items-center gap-2 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors cursor-grab active:cursor-grabbing ${itemClasses}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      title={showText ? `Drag or double-click to add ${title}` : `Double-click to add ${title}`}
    >
      <Icon className="w-4 h-4 shrink-0 text-muted-foreground" />
      {showText && <span className="text-sm">{title}</span>}
    </div>
  );
}

export default function AppSidebar({ onBlockAdd, ...props }) {
  const { setNodeRef } = useDroppable({ id: "sidebar" });
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const handleDoubleClickAdd = (blockType) => {
    if (!onBlockAdd) return;

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

    // Add the block using the existing onBlockAdd function structure
    // We need to modify the Builder's handleBlockAdd to accept a block object
    onBlockAdd(null, newBlock);
  };

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const data = {
    headings: [
      { title: "Heading 1", key: "h1", icon: Heading1 },
      { title: "Heading 2", key: "h2", icon: Heading2 },
      { title: "Heading 3", key: "h3", icon: Heading3 },
      { title: "Heading 4", key: "h4", icon: Heading4 },
      { title: "Heading 5", key: "h5", icon: Heading5 },
      { title: "Heading 6", key: "h6", icon: Heading6 },
    ],
    blocks: [
      { title: "Paragraph", key: "paragraph", icon: Pilcrow },
      { title: "Table", key: "table", icon: Table },
      { title: "Separator", key: "separator", icon: Minus },
      { title: "Blockquote", key: "blockquote", icon: Quote },
      { title: "Code Block", key: "code", icon: Code2 },
    ],
    lists: [
      { title: "Ordered List", key: "ol", icon: OrderedList },
      { title: "Unordered List", key: "ul", icon: UnorderedList },
      { title: "Task List", key: "task-list", icon: ListChecks },
    ],
    media: [
      { title: "Image", key: "image", icon: Image },
      { title: "Video", key: "video", icon: Video },
    ],
    links: [{ title: "Link", key: "link", icon: Link2 }],
    badges: [
      { title: "Shield Badge", key: "shield-badge", icon: Shield },
      { title: "Skill Icons", key: "skill-icons", icon: Sparkles },
    ],
  };

  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // On mobile, always show full content when sidebar is open
  const showFullContent = !isCollapsed || isMobile;

  return (
    <Sidebar collapsible="icon" {...props} ref={setNodeRef}>
      <SidebarHeader className="flex items-center justify-center px-4 py-2 border-b h-16">
        <a
          href="/"
          className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
          title="Go to Home"
        >
          {showFullContent ? (
            <img
              src={isDarkMode ? markdropLogoDark : markdropLogoLight}
              alt="Markdrop"
              className="h-8 w-auto"
            />
          ) : (
            <img
              src={isDarkMode ? markdropIconDark : markdropIconLight}
              alt="Markdrop"
              className="h-6 w-6"
            />
          )}
        </a>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-full">
          <div className="space-y-4 py-2">
            {Object.entries(data).map(([section, items], i, arr) => (
              <div key={section}>
                {showFullContent && (
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
                    {section}
                  </div>
                )}

                {items.map((item) => (
                  <DraggableItem
                    key={item.key}
                    id={item.key}
                    title={item.title}
                    icon={item.icon}
                    isCollapsed={isCollapsed}
                    isMobile={isMobile}
                    onDoubleClick={handleDoubleClickAdd}
                  />
                ))}

                {!showFullContent && i < arr.length - 1 && (
                  <div className="px-3">
                    <Separator className="my-2 opacity-40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
