import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import BlockquoteBlock from "./blocks/BlockquoteBlock";
import CodeBlock from "./blocks/CodeBlock";
import HeadingBlock from "./blocks/HeadingBlock";

import ImageBlock from "./blocks/ImageBlock";
import LinkBlock from "./blocks/LinkBlock";
import ListBlock from "./blocks/ListBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";
import SeparatorBlock from "./blocks/SeparatorBlock";
import ShieldBadgeBlock from "./blocks/ShieldBadgeBlock";
import SkillIconsBlock from "./blocks/SkillIconsBlock";
import TableBlock from "./blocks/TableBlock";
import VideoBlock from "./blocks/VideoBlock";

const MarkdownBlock = memo(function MarkdownBlock({
  block,
  onUpdate,
  onDelete,
  onBlockAdd,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
  });

  const handleDelete = useCallback(() => {
    onDelete(block.id);
  }, [onDelete, block.id]);

  const handleDoubleClick = useCallback(
    (e) => {
      // Prevent event bubbling to parent
      e.stopPropagation();
      // Add a new block after this one
      onBlockAdd(block.id);
    },
    [onBlockAdd, block.id]
  );

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
    <div className="relative mx-12">
      <div
        ref={setNodeRef}
        style={style}
        onDoubleClick={handleDoubleClick}
        className="group relative rounded-lg border border-transparent hover:border-muted-foreground/20 transition-all p-3 touch-manipulation"
      >
        {/* Controls - always visible on mobile, hover on desktop */}
        <div className="absolute -left-12 top-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex flex-col gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:h-7 md:w-7 cursor-grab active:cursor-grabbing touch-manipulation"
            {...attributes}
            {...listeners}
            style={{ touchAction: "none" }}
          >
            <GripVertical className="h-5 w-5 md:h-4 md:w-4" />
          </Button>
        </div>

        <div className="absolute -right-12 top-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:h-7 md:w-7 text-destructive hover:text-destructive touch-manipulation"
            onClick={handleDelete}
          >
            <Trash2 className="h-5 w-5 md:h-4 md:w-4" />
          </Button>
        </div>

        {/* Block content */}
        <div className="w-full block-content">{renderBlock()}</div>
      </div>
    </div>
  );
});

export default MarkdownBlock;
