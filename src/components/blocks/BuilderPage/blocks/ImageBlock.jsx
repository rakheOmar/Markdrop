import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Image as ImageIcon,
  Link as LinkIcon,
  Maximize,
  Type,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ImageBlock({ block, onUpdate }) {
  const [imgError, setImgError] = useState(false);
  const align = block.align || "left";

  const updateField = (key, value) => {
    onUpdate(block.id, { ...block, [key]: value });
  };

  return (
    <div className="group relative rounded-md border border-border bg-background transition-all focus-within:border-ring">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-muted/10">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <ImageIcon className="h-3.5 w-3.5" />
          <span>Image</span>
        </div>

        <ButtonGroup className="bg-background/80">
          <Button
            variant={align === "left" ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => updateField("align", "left")}
            title="Align Left"
          >
            <AlignLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={align === "center" ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => updateField("align", "center")}
            title="Align Center"
          >
            <AlignCenter className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={align === "right" ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => updateField("align", "right")}
            title="Align Right"
          >
            <AlignRight className="h-3.5 w-3.5" />
          </Button>
        </ButtonGroup>
      </div>

      <div className="p-3 space-y-3">
        {block.content && !imgError && (
          <div
            className={cn(
              "w-full flex mb-4 rounded-md border border-border/50 bg-muted/5 p-4 overflow-hidden",
              align === "center"
                ? "justify-center"
                : align === "right"
                  ? "justify-end"
                  : "justify-start"
            )}
          >
            <img
              src={block.content}
              alt={block.alt || "Preview"}
              style={{
                width: block.width ? `${block.width}px` : "auto",
                height: block.height ? `${block.height}px` : "auto",
                maxWidth: "100%",
              }}
              className="rounded shadow-sm object-cover max-h-[400px]"
              onError={() => setImgError(true)}
            />
          </div>
        )}

        <div className="grid gap-3">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <LinkIcon className="h-3.5 w-3.5" />
            </div>
            <Input
              value={block.content}
              onChange={(e) => {
                setImgError(false);
                updateField("content", e.target.value);
              }}
              placeholder="Image URL..."
              className="pl-9 border-0 bg-muted/20 h-9 shadow-none focus-visible:ring-1 focus-visible:bg-background transition-colors"
            />
          </div>

          <div className="grid grid-cols-[2fr,1fr,1fr] gap-2">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Type className="h-3.5 w-3.5" />
              </div>
              <Input
                value={block.alt || ""}
                onChange={(e) => updateField("alt", e.target.value)}
                placeholder="Alt text"
                className="pl-9 border-0 bg-muted/20 h-8 text-xs shadow-none focus-visible:ring-1 focus-visible:bg-background transition-colors"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Maximize className="h-3 w-3" />
              </div>
              <Input
                value={block.width || ""}
                onChange={(e) => updateField("width", e.target.value)}
                placeholder="Width"
                className="pl-8 border-0 bg-muted/20 h-8 text-xs shadow-none focus-visible:ring-1 focus-visible:bg-background transition-colors"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Maximize className="h-3 w-3 rotate-90" />
              </div>
              <Input
                value={block.height || ""}
                onChange={(e) => updateField("height", e.target.value)}
                placeholder="Height"
                className="pl-8 border-0 bg-muted/20 h-8 text-xs shadow-none focus-visible:ring-1 focus-visible:bg-background transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
