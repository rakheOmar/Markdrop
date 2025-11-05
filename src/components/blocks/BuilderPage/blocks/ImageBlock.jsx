import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="space-y-2 p-3 border rounded-lg bg-muted/30">
      <Input
        value={block.content}
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder="Image URL"
        className="bg-background text-sm h-8"
      />
      <Input
        value={block.alt || ""}
        onChange={(e) => handleAltChange(e.target.value)}
        placeholder="Alt text (optional)"
        className="bg-background text-sm h-8"
      />
      <div className="grid grid-cols-3 gap-2">
        <Input
          value={block.width || ""}
          onChange={(e) => handleWidthChange(e.target.value)}
          placeholder="Width"
          className="bg-background text-sm h-8"
        />
        <Input
          value={block.height || ""}
          onChange={(e) => handleHeightChange(e.target.value)}
          placeholder="Height"
          className="bg-background text-sm h-8"
        />
        <Select value={align} onValueChange={handleAlignChange}>
          <SelectTrigger className="bg-background h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {block.content && (
        <p
          className={`mt-2 ${
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
