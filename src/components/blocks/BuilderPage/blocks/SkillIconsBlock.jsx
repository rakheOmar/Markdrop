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
import { GripVertical, Sparkles, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { popularIcons } from "@/config/icons";

function SortableIcon({ icon, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: icon,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group flex items-center gap-1 px-2 py-1.5 bg-muted rounded text-sm cursor-move hover:bg-muted/70 transition-colors"
    >
      <div {...attributes} {...listeners}>
        <GripVertical className="w-3 h-3 text-muted-foreground" />
      </div>
      <code className="text-sm">{icon}</code>
      <button
        onClick={() => onRemove(icon)}
        className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
      </button>
    </div>
  );
}

export default function SkillIconsBlock({ block, onUpdate }) {
  const selectedIcons = block.icons ? block.icons.split(",").filter(Boolean) : [];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddIcon = (icon) => {
    if (!selectedIcons.includes(icon)) {
      const newIcons = [...selectedIcons, icon].join(",");
      onUpdate(block.id, { ...block, icons: newIcons });
    }
  };

  const handleRemoveIcon = (iconToRemove) => {
    const newIcons = selectedIcons.filter((icon) => icon !== iconToRemove).join(",");
    onUpdate(block.id, { ...block, icons: newIcons });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = selectedIcons.indexOf(active.id);
      const newIndex = selectedIcons.indexOf(over.id);
      const newIcons = arrayMove(selectedIcons, oldIndex, newIndex);
      onUpdate(block.id, { ...block, icons: newIcons.join(",") });
    }
  };

  const handleThemeChange = (value) => {
    onUpdate(block.id, { ...block, theme: value });
  };

  const handlePerLineChange = (value) => {
    onUpdate(block.id, { ...block, perLine: value });
  };

  const handleAlignChange = (value) => {
    onUpdate(block.id, { ...block, align: value });
  };

  const generateIconsUrl = () => {
    const icons = block.icons || "js,html,css";
    let url = `https://skillicons.dev/icons?i=${icons}`;

    if (block.theme && block.theme !== "dark") {
      url += `&theme=${block.theme}`;
    }
    if (block.perLine && block.perLine !== "15") {
      url += `&perline=${block.perLine}`;
    }

    return url;
  };

  return (
    <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Skill Icons</span>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-2 block">
          Selected Icons
        </label>
        {selectedIcons.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={selectedIcons} strategy={horizontalListSortingStrategy}>
              <div className="flex flex-wrap gap-2 p-3 bg-background rounded border min-h-[60px]">
                {selectedIcons.map((icon) => (
                  <SortableIcon key={icon} icon={icon} onRemove={handleRemoveIcon} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="p-6 bg-background rounded border text-center text-sm text-muted-foreground">
            Click icons below to add them
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Theme</label>
          <Select value={block.theme || "dark"} onValueChange={handleThemeChange}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="light">Light</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Icons Per Line
          </label>
          <Input
            type="number"
            min="1"
            max="50"
            value={block.perLine || "15"}
            onChange={(e) => handlePerLineChange(e.target.value)}
            className="bg-background"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Alignment</label>
          <Select value={block.align || "left"} onValueChange={handleAlignChange}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select alignment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <details className="text-sm">
          <summary className="cursor-pointer text-muted-foreground hover:text-foreground font-medium">
            Available Icons
          </summary>
          <ScrollArea className="mt-2 h-40 w-full rounded border bg-background">
            <div className="p-3 flex flex-wrap gap-2">
              {popularIcons.map((icon) => (
                <code
                  key={icon}
                  className={`px-2 py-1 rounded text-sm cursor-pointer transition-colors ${
                    selectedIcons.includes(icon)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/70"
                  }`}
                  onClick={() => handleAddIcon(icon)}
                >
                  {icon}
                </code>
              ))}
            </div>
          </ScrollArea>
        </details>
      </div>

      {block.icons && (
        <div className="mt-3 p-3 bg-background rounded border">
          <div style={{ textAlign: block.align || "left" }}>
            <img
              src={generateIconsUrl()}
              alt="Skill Icons"
              className="max-w-full h-auto inline-block"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
