import { Link2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function LinkBlock({ block, onUpdate }) {
  const handleContentChange = (value) => {
    onUpdate(block.id, { ...block, content: value });
  };

  const handleUrlChange = (value) => {
    onUpdate(block.id, { ...block, url: value });
  };

  return (
    <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Link Text</label>
        <Input
          value={block.content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="Click here"
          className="bg-background"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">URL</label>
        <Input
          value={block.url || ""}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://example.com"
          className="bg-background"
        />
      </div>
      {block.content && block.url && (
        <div className="mt-3 flex items-center gap-2 text-sm text-primary">
          <Link2 className="w-4 h-4" />
          <a href={block.url} target="_blank" rel="noopener noreferrer" className="underline">
            {block.content}
          </a>
        </div>
      )}
    </div>
  );
}
