import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlockquoteBlock from "./blocks/BlockquoteBlock";
import CodeBlock from "./blocks/CodeBlock";
import HeadingBlock from "./blocks/HeadingBlock";
import HtmlBlock from "./blocks/HtmlBlock";
import ImageBlock from "./blocks/ImageBlock";
import LinkBlock from "./blocks/LinkBlock";
import ListBlock from "./blocks/ListBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";
import SeparatorBlock from "./blocks/SeparatorBlock";
import ShieldBadgeBlock from "./blocks/ShieldBadgeBlock";
import SkillIconsBlock from "./blocks/SkillIconsBlock";
import TableBlock from "./blocks/TableBlock";
import VideoBlock from "./blocks/VideoBlock";

export default function MarkdownBlock({ block, onUpdate, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const renderBlock = () => {
    const headingTypes = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const listTypes = ["ul", "ol", "task-list"];

    if (headingTypes.includes(block.type)) {
      return <HeadingBlock block={block} onUpdate={onUpdate} />;
    }

    switch (block.type) {
      case "paragraph":
        return <ParagraphBlock block={block} onUpdate={onUpdate} />;
      case "blockquote":
        return <BlockquoteBlock block={block} onUpdate={onUpdate} />;
      case "code":
        return <CodeBlock block={block} onUpdate={onUpdate} />;
      case "html":
        return <HtmlBlock block={block} onUpdate={onUpdate} />;
      case "separator":
        return <SeparatorBlock />;
      case "image":
        return <ImageBlock block={block} onUpdate={onUpdate} />;
      case "video":
        return <VideoBlock block={block} onUpdate={onUpdate} />;
      case "link":
        return <LinkBlock block={block} onUpdate={onUpdate} />;
      case "table":
        return <TableBlock block={block} onUpdate={onUpdate} />;
      case "shield-badge":
        return <ShieldBadgeBlock block={block} onUpdate={onUpdate} />;
      case "skill-icons":
        return <SkillIconsBlock block={block} onUpdate={onUpdate} />;
      default:
        if (listTypes.includes(block.type)) {
          return <ListBlock block={block} onUpdate={onUpdate} />;
        }
        return <ParagraphBlock block={block} onUpdate={onUpdate} />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative rounded-lg border border-transparent hover:border-muted-foreground/20 transition-all p-3"
    >
      {/* Hover controls */}
      <div className="absolute -left-10 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute -right-10 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-destructive hover:text-destructive"
          onClick={() => onDelete(block.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Block content */}
      <div className="w-full">{renderBlock()}</div>
    </div>
  );
}
