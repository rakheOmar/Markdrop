import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import MarkdownBlock from "./MarkdownBlock";

export default function Editor({ blocks = [], onBlockUpdate, onBlockDelete }) {
  const { setNodeRef, isOver } = useDroppable({ id: "editor-dropzone" });

  return (
    <div
      ref={setNodeRef}
      className={`w-full min-h-[500px] rounded-lg p-4 transition-colors ${
        isOver ? "bg-muted/30" : ""
      }`}
    >
      {blocks.length === 0 ? (
        <div className="flex items-center justify-center h-[400px] border-2 border-dashed rounded-lg border-muted-foreground/20">
          <p className="text-center text-sm text-muted-foreground">
            {isOver ? "Release to add block..." : "Drag blocks here to start building"}
          </p>
        </div>
      ) : (
        <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {blocks.map((block) => (
              <MarkdownBlock
                key={block.id}
                block={block}
                onUpdate={onBlockUpdate}
                onDelete={onBlockDelete}
              />
            ))}
            {isOver && (
              <div className="h-16 border-2 border-dashed border-primary rounded-lg bg-muted/30 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Drop here</p>
              </div>
            )}
          </div>
        </SortableContext>
      )}
    </div>
  );
}
