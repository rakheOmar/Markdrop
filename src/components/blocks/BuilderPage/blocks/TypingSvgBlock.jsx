import { Palette } from "lucide-react";
import { memo, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const COLOR_PRESETS = [
  "FF0000",
  "00FF00",
  "0000FF",
  "FFFF00",
  "FF00FF",
  "00FFFF",
  "FF8800",
  "8800FF",
  "00FF88",
  "FF0088",
  "88FF00",
  "0088FF",
];

const TypingSvgBlock = memo(function TypingSvgBlock({ block, onUpdate }) {
  const lines = Array.isArray(block.lines) ? block.lines : ["Hi there! I'm a developer 👋"];
  const font = block.font || "Fira Code";
  const size = block.size || "28";
  const duration = block.duration || "3000";
  const pause = block.pause || "1000";
  const color = block.color || "00FFB3";
  const center = block.center !== false;
  const vCenter = block.vCenter !== false;
  const width = block.width || "900";
  const height = block.height || "80";

  const handleLinesChange = useCallback(
    (value) => {
      const linesArray = value.split("\n");
      onUpdate(block.id, { ...block, lines: linesArray });
    },
    [block, onUpdate]
  );

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      return;
    }
  }, []);

  const handlePropertyChange = useCallback(
    (property, value) => {
      onUpdate(block.id, { ...block, [property]: value });
    },
    [block.id, onUpdate, block]
  );

  const previewUrl = useMemo(() => {
    const baseUrl = "https://readme-typing-svg.herokuapp.com";
    const params = new URLSearchParams();

    params.append("font", font);
    params.append("size", size);
    params.append("duration", duration);
    params.append("pause", pause);
    params.append("color", color.replace("#", ""));
    params.append("center", center.toString());
    params.append("vCenter", vCenter.toString());
    params.append("width", width);
    params.append("height", height);

    const filteredLines = lines.filter((line) => line.trim() !== "");
    if (filteredLines.length > 0) {
      params.append("lines", filteredLines.join(";"));
    }

    return `${baseUrl}?${params.toString()}`;
  }, [lines, font, size, duration, pause, color, center, vCenter, width, height]);

  const hasContent = useMemo(
    () => lines.length > 0 && lines.some((line) => line.trim() !== ""),
    [lines]
  );

  return (
    <div className="space-y-2 p-3 border rounded-lg bg-muted/30">
      <div>
        <Label className="text-xs font-medium text-muted-foreground mb-1">Text Lines</Label>
        <Textarea
          value={lines.join("\n")}
          onChange={(e) => handleLinesChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Line 1&#10;Line 2&#10;Line 3..."
          className="bg-background min-h-20 font-mono text-xs resize-none"
        />
      </div>

      <div className="flex items-end gap-2">
        <div className="flex-1 min-w-0">
          <Label className="text-xs font-medium text-muted-foreground mb-1">Font</Label>
          <Select value={font} onValueChange={(value) => handlePropertyChange("font", value)}>
            <SelectTrigger className="bg-background h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fira Code">Fira Code</SelectItem>
              <SelectItem value="Roboto">Roboto</SelectItem>
              <SelectItem value="Courier New">Courier New</SelectItem>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Monospace">Monospace</SelectItem>
              <SelectItem value="Helvetica">Helvetica</SelectItem>
              <SelectItem value="Comic Sans MS">Comic Sans MS</SelectItem>
              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-14">
          <Label className="text-xs font-medium text-muted-foreground mb-1">Size</Label>
          <Input
            type="text"
            value={size}
            onChange={(e) => handlePropertyChange("size", e.target.value)}
            placeholder="28"
            className="bg-background h-8 text-xs text-center px-1"
          />
        </div>

        <div className="w-20">
          <Label className="text-xs font-medium text-muted-foreground mb-1">Color</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-8 px-1.5 justify-start text-left font-normal bg-background"
              >
                <div
                  className="w-3 h-3 rounded border mr-1 shrink-0"
                  style={{ backgroundColor: `#${color.replace("#", "")}` }}
                />
                <span className="text-[10px] truncate">{color.replace("#", "").toUpperCase()}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3">
              <div className="space-y-2">
                <div>
                  <Label className="text-xs mb-1">Hex Color</Label>
                  <Input
                    value={color.replace("#", "")}
                    onChange={(e) =>
                      handlePropertyChange("color", e.target.value.replace("#", "").toUpperCase())
                    }
                    placeholder="00FFB3"
                    className="bg-background h-8 text-xs font-mono uppercase"
                    maxLength={6}
                  />
                </div>
                <div>
                  <Label className="text-xs mb-1">Pick Color</Label>
                  <Input
                    type="color"
                    value={`#${color.replace("#", "")}`}
                    onChange={(e) => handlePropertyChange("color", e.target.value.replace("#", ""))}
                    className="w-full h-10 bg-background cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-6 gap-1 pt-1">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePropertyChange("color", preset)}
                      className="w-full h-6 rounded border border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: `#${preset}` }}
                      title={`#${preset}`}
                    />
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-16">
          <Label className="text-xs font-medium text-muted-foreground mb-1">Duration</Label>
          <Input
            type="text"
            value={duration}
            onChange={(e) => handlePropertyChange("duration", e.target.value)}
            placeholder="3000"
            className="bg-background h-8 text-xs text-center px-1"
          />
        </div>

        <div className="w-16">
          <Label className="text-xs font-medium text-muted-foreground mb-1">Pause</Label>
          <Input
            type="text"
            value={pause}
            onChange={(e) => handlePropertyChange("pause", e.target.value)}
            placeholder="1000"
            className="bg-background h-8 text-xs text-center px-1"
          />
        </div>

        <div className="w-16">
          <Label className="text-xs font-medium text-muted-foreground mb-1">Width</Label>
          <Input
            type="text"
            value={width}
            onChange={(e) => handlePropertyChange("width", e.target.value)}
            placeholder="900"
            className="bg-background h-8 text-xs text-center px-1"
          />
        </div>

        <div className="w-16">
          <Label className="text-xs font-medium text-muted-foreground mb-1">Height</Label>
          <Input
            type="text"
            value={height}
            onChange={(e) => handlePropertyChange("height", e.target.value)}
            placeholder="80"
            className="bg-background h-8 text-xs text-center px-1"
          />
        </div>

        <div className="w-20">
          <Label className="text-xs font-medium text-muted-foreground mb-1">H-Center</Label>
          <Select
            value={center.toString()}
            onValueChange={(value) => handlePropertyChange("center", value === "true")}
          >
            <SelectTrigger className="bg-background h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-20">
          <Label className="text-xs font-medium text-muted-foreground mb-1">V-Center</Label>
          <Select
            value={vCenter.toString()}
            onValueChange={(value) => handlePropertyChange("vCenter", value === "true")}
          >
            <SelectTrigger className="bg-background h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasContent && (
        <div className="mt-2">
          <Label className="text-xs font-medium text-muted-foreground mb-1 block">Preview</Label>
          <div className="p-2 bg-background rounded border flex justify-center">
            <img
              src={previewUrl}
              alt="Typing SVG"
              className="max-w-full h-auto"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default TypingSvgBlock;
