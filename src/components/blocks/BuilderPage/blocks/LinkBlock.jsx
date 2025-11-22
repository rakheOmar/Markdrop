import { ExternalLink, Globe, Link as LinkIcon, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LinkBlock({ block, onUpdate }) {
  const handleUpdate = (key, value) => {
    onUpdate(block.id, { ...block, [key]: value });
  };

  return (
    <div className="group relative rounded-md border border-border bg-background transition-all focus-within:border-ring">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-muted/10">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <LinkIcon className="h-3.5 w-3.5" />
          <span>Link Card</span>
        </div>

        {block.url && (
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-6 px-2 text-[10px] text-muted-foreground hover:text-primary"
          >
            <a href={block.url} target="_blank" rel="noopener noreferrer">
              Test Link <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>
        )}
      </div>

      <div className="p-3 space-y-3">
        <div className="grid gap-3">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Type className="h-3.5 w-3.5" />
            </div>
            <Input
              value={block.content || ""}
              onChange={(e) => handleUpdate("content", e.target.value)}
              placeholder="Link Text (e.g., Click here)"
              className="pl-9 border-0 bg-muted/20 h-9 shadow-none focus-visible:ring-1 focus-visible:bg-background transition-colors text-sm"
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Globe className="h-3.5 w-3.5" />
            </div>
            <Input
              value={block.url || ""}
              onChange={(e) => handleUpdate("url", e.target.value)}
              placeholder="URL (e.g., https://example.com)"
              className="pl-9 border-0 bg-muted/20 h-9 shadow-none focus-visible:ring-1 focus-visible:bg-background transition-colors font-mono text-xs"
            />
          </div>
        </div>

        {block.content && block.url && (
          <div className="rounded-md border border-border/50 bg-muted/5 p-3 flex items-center justify-between group/preview">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                <LinkIcon className="h-4 w-4" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-medium text-foreground">
                  {block.content}
                </span>
                <span className="truncate text-[10px] text-muted-foreground font-mono">
                  {block.url}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
