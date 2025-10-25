import { Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Video className="w-4 h-4" />
          Video
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="video-url">Video URL</Label>
          <Input
            id="video-url"
            value={block.content || ""}
            onChange={(e) => handleChange("content", e.target.value)}
            placeholder="https://www.youtube.com/watch?v=... or direct video URL"
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Supports YouTube, Vimeo, or direct video URLs (mp4, webm, etc.)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="video-title">Title (optional)</Label>
          <Input
            id="video-title"
            value={block.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Video title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="video-align">Alignment</Label>
          <Select
            value={block.align || "left"}
            onValueChange={(value) => handleChange("align", value)}
          >
            <SelectTrigger id="video-align">
              <SelectValue placeholder="Select alignment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {block.content && (
          <>
            <Separator />
            <Card>
              <CardContent className="p-3">
                <div style={{ textAlign: block.align || "left" }}>
                  {block.title && <h3 className="text-lg font-semibold mb-2">{block.title}</h3>}
                  {isDirect ? (
                    <video
                      src={block.content}
                      controls
                      className="max-w-full h-auto rounded inline-block"
                      style={{ maxHeight: "400px" }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="aspect-video max-w-2xl inline-block">
                      <iframe
                        src={embedUrl}
                        title={block.title || "Video"}
                        className="w-full h-full rounded"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </CardContent>
    </Card>
  );
}
