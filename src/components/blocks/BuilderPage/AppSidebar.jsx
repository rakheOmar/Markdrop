import { useDraggable, useDroppable } from "@dnd-kit/core";
import {
  CheckSquare,
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

function DraggableItem({ id, title, icon: Icon, isCollapsed }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors cursor-grab active:cursor-grabbing ${
        isCollapsed ? "justify-center mx-0 px-0" : "px-3 mx-2"
      }`}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <Icon className="w-4 h-4 shrink-0 text-muted-foreground" />
      {!isCollapsed && <span className="text-sm">{title}</span>}
    </div>
  );
}

export default function AppSidebar({ ...props }) {
  const { setNodeRef } = useDroppable({ id: "sidebar" });
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

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
      { title: "HTML Block", key: "html", icon: Code2 },
    ],
    lists: [
      { title: "Ordered List", key: "ol", icon: OrderedList },
      { title: "Unordered List", key: "ul", icon: UnorderedList },
      { title: "Task List", key: "task-list", icon: ListChecks },
      { title: "Checklist", key: "checklist", icon: CheckSquare },
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

  return (
    <Sidebar collapsible="icon" {...props} ref={setNodeRef}>
      <SidebarHeader className="flex items-center justify-center px-4 py-2 border-b h-16">
        <a href="/">
          {!isCollapsed ? (
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
                {!isCollapsed && (
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
                  />
                ))}

                {isCollapsed && i < arr.length - 1 && (
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
