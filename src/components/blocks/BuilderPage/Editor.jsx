import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { memo, useMemo } from "react";
import MarkdownBlock from "./MarkdownBlock";

const Editor = memo(function Editor({ blocks = [], onBlockUpdate, onBlockDelete, onBlockAdd }) {
  const { setNodeRef, isOver } = useDroppable({ id: "editor-dropzone" });

  // Memoize block IDs for SortableContext
  const blockIds = useMemo(() => blocks.map((b) => b.id), [blocks]);

  return (
    <div
      ref={setNodeRef}
      className={`w-full h-full rounded-lg transition-colors relative ${
        isOver ? "bg-muted/30" : ""
      }`}
    >
      {blocks.length === 0 ? (
        <div className="absolute inset-4 flex items-center justify-center border-2 border-dashed rounded-lg border-muted-foreground/20">
          <p className="text-center text-sm text-muted-foreground px-4">
            {isOver ? "Release to add block..." : "Drag blocks here to start building"}
          </p>
        </div>
      ) : (
        <div className="h-full overflow-y-auto overflow-x-hidden">
          <div className="p-2 sm:p-4">
            <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {blocks.map((block) => (
                  <MarkdownBlock
                    key={block.id}
                    block={block}
                    onUpdate={onBlockUpdate}
                    onDelete={onBlockDelete}
                    onBlockAdd={onBlockAdd}
                  />
                ))}
                {/* Extended drop zone at the bottom */}
                <div className="h-32 w-full">
                  {isOver && (
                    <div className="h-16 border-2 border-dashed border-primary rounded-lg bg-muted/30 flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Drop here</p>
                    </div>
                  )}
                </div>
              </div>
            </SortableContext>
          </div>
        </div>
      )}
    </div>
  );
});

export default Editor;
