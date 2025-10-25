import { Textarea } from "@/components/ui/textarea";

export default function BlockquoteBlock({ block, onUpdate }) {
  const handleChange = (value) => {
    onUpdate(block.id, { ...block, content: value });
  };

  return (
    <div className="border-l-4 border-muted-foreground/30 pl-4 py-1">
      <Textarea
        value={block.content}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Quote text..."
        className="min-h-[60px] border-none shadow-none focus-visible:ring-0 px-0 resize-none text-muted-foreground"
      />
    </div>
  );
}
