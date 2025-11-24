import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  GripVertical,
  Moon,
  Plus,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { popularIcons } from "@/config/icons";
import { cn } from "@/lib/utils";

function SortableIcon({ icon, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: icon,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-center gap-1.5 px-2 py-1 bg-muted/40 hover:bg-muted rounded border border-border/50 text-xs font-mono cursor-move select-none transition-colors",
        isDragging && "ring-2 ring-ring ring-offset-2 bg-background"
      )}
      draggable={false}
      onDragStart={(e)=>e.preventDefault()}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="w-3 h-3 text-muted-foreground/50 group-hover:text-muted-foreground" />
      </div>
      <span>{icon}</span>
      <button
        onClick={() => onRemove(icon)}
        className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

export default function SkillIconsBlock({ block, onUpdate }) {
  const selectedIcons = block.icons ? block.icons.split(",").filter(Boolean) : [];
  const [search, setSearch] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleUpdate = (updates) => {
    onUpdate(block.id, { ...block, ...updates });
  };

  const handleAddIcon = (icon) => {
    if (!selectedIcons.includes(icon)) {
      const newIcons = [...selectedIcons, icon].join(",");
      handleUpdate({ icons: newIcons });
    }
  };

  const handleRemoveIcon = (iconToRemove) => {
    const newIcons = selectedIcons.filter((icon) => icon !== iconToRemove).join(",");
    handleUpdate({ icons: newIcons });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over && active.id !== over.id) return;
      const oldIndex = selectedIcons.indexOf(active.id);
      const newIndex = selectedIcons.indexOf(over.id);
      const newIcons = arrayMove(selectedIcons, oldIndex, newIndex);
      handleUpdate({ icons: newIcons.join(",") });
    
  };

  const generateIconsUrl = () => {
    const icons = block.icons || "js,html,css";
    let url = `https://skillicons.dev/icons?i=${icons}`;
    if (block.theme && block.theme !== "dark") url += `&theme=${block.theme}`;
    if (block.perLine && block.perLine !== "15") url += `&perline=${block.perLine}`;
    return url;
  };

  const filteredIcons = popularIcons.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase())
  );

  const align = block.align || "left";
  const theme = block.theme || "dark";

  return (
    <div className="group relative rounded-md border border-border bg-background transition-all focus-within:border-ring">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-muted/10">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Skills</span>
        </div>

        <ButtonGroup className="bg-background/80">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs font-normal px-2">
                <Plus className="h-3 w-3" /> Add Icons
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0" align="end">
              <div className="p-2 border-b border-border">
                <Input
                  placeholder="Search icons..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <ScrollArea className="h-[200px] p-2">
                <div className="flex flex-wrap gap-1.5">
                  {filteredIcons.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => handleAddIcon(icon)}
                      disabled={selectedIcons.includes(icon)}
                      className={cn(
                        "px-2 py-1 rounded text-[10px] font-mono border transition-all",
                        selectedIcons.includes(icon)
                          ? "bg-primary/10 border-primary/20 text-primary opacity-50 cursor-not-allowed"
                          : "bg-muted/40 border-transparent hover:border-border hover:bg-muted cursor-pointer"
                      )}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>

          <ButtonGroupSeparator />

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleUpdate({ theme: theme === "dark" ? "light" : "dark" })}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
          </Button>

          <ButtonGroupSeparator />

          <Button
            variant={align === "left" ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => handleUpdate({ align: "left" })}
          >
            <AlignLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={align === "center" ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => handleUpdate({ align: "center" })}
          >
            <AlignCenter className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={align === "right" ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => handleUpdate({ align: "right" })}
          >
            <AlignRight className="h-3.5 w-3.5" />
          </Button>
        </ButtonGroup>
      </div>

      <div className="p-3 space-y-3">
        {selectedIcons.length > 0 && (
          <div
            className={cn(
              "flex justify-start rounded-md border border-border/50 bg-muted/5 p-4 min-h-[60px]",
              align === "center"
                ? "justify-center"
                : align === "right"
                  ? "justify-end"
                  : "justify-start"
            )}
          >
            <img src={generateIconsUrl()} alt="Skills" className="max-w-full h-auto" />
          </div>
        )}

        <div className="min-h-[40px]">
          {selectedIcons.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={selectedIcons} strategy={horizontalListSortingStrategy}>
                <div className="flex flex-wrap gap-2 p-3 bg-background rounded border min-h-[60px]"
                onDragOver={(e)=> e.preventDefault()}
                onDrop={(e)=>e.preventDefault()}
                >
                  {selectedIcons.map((icon) => (
                    <SortableIcon key={icon} icon={icon} onRemove={handleRemoveIcon} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <div className="text-center py-4 text-xs text-muted-foreground border-2 border-dashed border-muted rounded-md">
              No icons selected. Click "Add Icons" to start.
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-border/40">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
            Per line:
          </span>
          <Input
            type="number"
            value={block.perLine || 15}
            onChange={(e) => handleUpdate({ perLine: e.target.value })}
            className="h-6 w-16 text-xs px-2 bg-transparent border-border/50"
            min={1}
            max={50}
          />
        </div>
      </div>
    </div>
  );
}
