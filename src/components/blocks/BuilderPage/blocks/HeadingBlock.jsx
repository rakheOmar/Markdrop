import { useEffect, useRef, useState } from "react";

export default function HeadingBlock({ block, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(block.content);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    onUpdate(block.id, { ...block, content });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setContent(block.content);
      setIsEditing(false);
    }
  };

  const sizeClasses = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-bold",
    h4: "text-xl font-semibold",
    h5: "text-lg font-semibold",
    h6: "text-base font-semibold text-muted-foreground",
  };

  const commonClasses = `cursor-text pb-2 border-b border-border ${sizeClasses[block.type]}`;

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`w-full bg-transparent outline-none border-b-2 border-primary pb-1 ${sizeClasses[block.type]}`}
      />
    );
  }

  const HeadingTag = block.type;

  return (
    <HeadingTag onClick={() => setIsEditing(true)} className={commonClasses}>
      {content || "Click to edit heading"}
    </HeadingTag>
  );
}
