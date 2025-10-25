import { Edit3, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function HtmlBlock({ block, onUpdate }) {
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (value) => {
    onUpdate(block.id, { ...block, content: value });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">HTML Block</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <Eye className="h-3.5 w-3.5" /> : <Edit3 className="h-3.5 w-3.5" />}
        </Button>
      </div>

      {isEditing ? (
        <Textarea
          value={block.content}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="<div>Your HTML here...</div>"
          className="min-h-[150px] font-mono text-sm p-4 resize-none border bg-muted"
        />
      ) : (
        <div
          className="min-h-[150px] p-4 border rounded-md bg-background overflow-auto"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      )}
    </div>
  );
}
