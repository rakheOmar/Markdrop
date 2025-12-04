import { AlignCenter, AlignVerticalJustifyCenter, Keyboard, Settings2 } from "lucide-react";
import { memo, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
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

const FONTS = [
  "Fira Code",
  "Roboto",
  "Courier New",
  "Arial",
  "Monospace",
  "Helvetica",
  "Comic Sans MS",
  "Times New Roman",
];

const TypingSvgBlock = memo(function TypingSvgBlock({ block, onUpdate }) {
  const lines = Array.isArray(block.lines) ? block.lines : ["Hi there! I'm a developer 👋"];
  const font = block.font || "Fira Code";
  const size = block.size || "20";
  const duration = block.duration || "3000";
  const pause = block.pause || "1000";
  const color = block.color || "00FFB3";
  const center = block.center !== false;
  const vCenter = block.vCenter !== false;
  const width = block.width || "435";
  const height = block.height || "50";

  const handleUpdate = useCallback(
    (updates) => {
      onUpdate(block.id, { ...block, ...updates });
    },
    [block, onUpdate]
  );

  const handleLinesChange = useCallback(
    (value) => {
      handleUpdate({ lines: value.split("\n") });
    },
    [handleUpdate]
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

  return (
    <div className="group relative rounded-md border border-border bg-background transition-all focus-within:border-ring">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-muted/10">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Keyboard className="h-3.5 w-3.5" />
          <span>Typing Effect</span>
        </div>

        <ButtonGroup className="bg-background/80">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7" title="Color">
                <div
                  className="h-3.5 w-3.5 rounded-sm border border-border shadow-sm"
                  style={{ backgroundColor: `#${color.replace("#", "")}` }}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3" align="end">
              <div className="space-y-3">
                <div className="grid gap-1.5">
                  <Label className="text-xs">Hex Color</Label>
                  <div className="flex gap-2">
                    <Input
                      value={color.replace("#", "")}
                      onChange={(e) => handleUpdate({ color: e.target.value })}
                      className="h-8 text-xs font-mono uppercase"
                      maxLength={6}
                    />
                    <Input
                      type="color"
                      value={`#${color.replace("#", "")}`}
                      onChange={(e) => handleUpdate({ color: e.target.value.replace("#", "") })}
                      className="h-8 w-8 p-0 border-0 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleUpdate({ color: preset })}
                      className="w-full h-6 rounded border border-border/50 hover:scale-110 transition-transform"
                      style={{ backgroundColor: `#${preset}` }}
                    />
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <ButtonGroupSeparator />

          <Button
            variant={center ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => handleUpdate({ center: !center })}
            title="Center Horizontal"
          >
            <AlignCenter className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={vCenter ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => handleUpdate({ vCenter: !vCenter })}
            title="Center Vertical"
          >
            <AlignVerticalJustifyCenter className="h-3.5 w-3.5" />
          </Button>

          <ButtonGroupSeparator />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7" title="Settings">
                <Settings2 className="h-3.5 w-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label className="text-xs">Font Family</Label>
                  <Select value={font} onValueChange={(val) => handleUpdate({ font: val })}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONTS.map((f) => (
                        <SelectItem key={f} value={f} className="text-xs">
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1.5">
                    <Label className="text-xs">Font Size</Label>
                    <Input
                      value={size}
                      onChange={(e) => handleUpdate({ size: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label className="text-xs">Duration (ms)</Label>
                    <Input
                      value={duration}
                      onChange={(e) => handleUpdate({ duration: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label className="text-xs">Pause (ms)</Label>
                    <Input
                      value={pause}
                      onChange={(e) => handleUpdate({ pause: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label className="text-xs">Width (px)</Label>
                    <Input
                      value={width}
                      onChange={(e) => handleUpdate({ width: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label className="text-xs">Height (px)</Label>
                    <Input
                      value={height}
                      onChange={(e) => handleUpdate({ height: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </ButtonGroup>
      </div>

      <div className="p-3 space-y-3">
        {lines.some((l) => l.trim()) && (
          <div className="w-full flex items-center justify-center rounded-md border border-border/50 bg-muted/5 p-4 min-h-[60px] overflow-hidden">
            <img src={previewUrl} alt="Typing SVG" className="max-w-full h-auto" />
          </div>
        )}

        <div className="relative">
          <Textarea
            value={lines.join("\n")}
            onChange={(e) => handleLinesChange(e.target.value)}
            placeholder="Enter text lines here (one per line)..."
            className="min-h-[80px] w-full resize-y border-0 bg-muted/20 p-3 font-mono text-xs leading-relaxed focus-visible:ring-1 focus-visible:bg-background transition-colors"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
});

export default TypingSvgBlock;
