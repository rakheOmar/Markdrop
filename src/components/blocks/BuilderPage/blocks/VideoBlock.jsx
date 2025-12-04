import { AlignCenter, AlignLeft, AlignRight, Link as LinkIcon, Type, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function VideoBlock({ block, onUpdate }) {
  const handleChange = (field, value) => {
    onUpdate(block.id, { ...block, [field]: value });
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be")
        ? url.split("youtu.be/")[1]?.split("?")[0]
        : url.split("v=")[1]?.split("&")[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    }

    if (url.includes("vimeo.com")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : "";
    }

    return url;
  };

  const isDirectVideo = (url) => {
    return (
      url && !url.includes("youtube.com") && !url.includes("youtu.be") && !url.includes("vimeo.com")
    );
  };

  const embedUrl = getEmbedUrl(block.content);
  const isDirect = isDirectVideo(block.content);
  const align = block.align || "left";

  return (
    <div className="group relative rounded-md border border-border bg-background transition-all focus-within:border-ring">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-muted/10">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Video className="h-3.5 w-3.5" />
          <span>Video</span>
        </div>

        <ButtonGroup className="bg-background/80">
          <Button
            variant={align === "left" ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => handleChange("align", "left")}
            title="Align Left"
          >
            <AlignLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={align === "center" ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => handleChange("align", "center")}
            title="Align Center"
          >
            <AlignCenter className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={align === "right" ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => handleChange("align", "right")}
            title="Align Right"
          >
            <AlignRight className="h-3.5 w-3.5" />
          </Button>
        </ButtonGroup>
      </div>

      <div className="p-3 space-y-3">
        {block.content && (
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
            <div className="w-full max-w-2xl">
              {block.title && (
                <h3
                  className={cn(
                    "text-sm font-medium mb-2 text-foreground",
                    align === "center"
                      ? "text-center"
                      : align === "right"
                        ? "text-right"
                        : "text-left"
                  )}
                >
                  {block.title}
                </h3>
              )}

              <div
                className={cn(
                  "relative rounded overflow-hidden bg-black/5",
                  isDirect ? "h-auto" : "aspect-video"
                )}
              >
                {isDirect ? (
                  <video
                    src={block.content}
                    controls
                    className="max-w-full h-auto max-h-[400px] rounded"
                  />
                ) : (
                  <iframe
                    src={embedUrl}
                    title={block.title || "Video"}
                    className="w-full h-full absolute top-0 left-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-3">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <LinkIcon className="h-3.5 w-3.5" />
            </div>
            <Input
              value={block.content || ""}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Video URL (YouTube, Vimeo, or direct link)..."
              className="pl-9 border-0 bg-muted/20 h-9 shadow-none focus-visible:ring-1 focus-visible:bg-background transition-colors font-mono text-xs"
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Type className="h-3.5 w-3.5" />
            </div>
            <Input
              value={block.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Video title (optional)..."
              className="pl-9 border-0 bg-muted/20 h-9 shadow-none focus-visible:ring-1 focus-visible:bg-background transition-colors text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
