import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ImageBlock({ block, onUpdate }) {
  const handleContentChange = (value) => {
    onUpdate(block.id, { ...block, content: value });
  };

  const handleAltChange = (value) => {
    onUpdate(block.id, { ...block, alt: value });
  };

  const handleWidthChange = (value) => {
    onUpdate(block.id, { ...block, width: value });
  };

  const handleHeightChange = (value) => {
    onUpdate(block.id, { ...block, height: value });
  };

  const handleAlignChange = (align) => {
    onUpdate(block.id, { ...block, align });
  };

  const align = block.align || "left";

  return (
    <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Image URL</label>
        <Input
          value={block.content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="https://example.com/image.png"
          className="bg-background"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">
          Alt Text (optional)
        </label>
        <Input
          value={block.alt || ""}
          onChange={(e) => handleAltChange(e.target.value)}
          placeholder="Description of the image"
          className="bg-background"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Width (optional)
          </label>
          <Input
            value={block.width || ""}
            onChange={(e) => handleWidthChange(e.target.value)}
            placeholder="e.g., 2000 or 100%"
            className="bg-background"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Height (optional)
          </label>
          <Input
            value={block.height || ""}
            onChange={(e) => handleHeightChange(e.target.value)}
            placeholder="e.g., 376 or auto"
            className="bg-background"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Alignment</label>
        <div className="flex gap-1">
          <Button
            variant={align === "left" ? "default" : "outline"}
            size="sm"
            onClick={() => handleAlignChange("left")}
            className="flex-1"
          >
            <AlignLeft className="h-4 w-4 mr-1" />
            Left
          </Button>
          <Button
            variant={align === "center" ? "default" : "outline"}
            size="sm"
            onClick={() => handleAlignChange("center")}
            className="flex-1"
          >
            <AlignCenter className="h-4 w-4 mr-1" />
            Center
          </Button>
          <Button
            variant={align === "right" ? "default" : "outline"}
            size="sm"
            onClick={() => handleAlignChange("right")}
            className="flex-1"
          >
            <AlignRight className="h-4 w-4 mr-1" />
            Right
          </Button>
        </div>
      </div>
      {block.content && (
        <p
          className={`mt-3 ${
            align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"
          }`}
        >
          <img
            src={block.content}
            alt={block.alt || ""}
            width={block.width || undefined}
            height={block.height || undefined}
            className="max-w-full h-auto rounded border inline-block"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </p>
      )}
    </div>
  );
}
