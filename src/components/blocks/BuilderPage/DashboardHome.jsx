import { useRef, useState } from "react";
import Editor from "../BuilderPage/Editor";
import Preview from "../BuilderPage/Preview";
import Raw from "../BuilderPage/Raw";

export default function DashboardHome({
  activeTab,
  blocks,
  onBlocksChange,
  onBlockUpdate,
  onBlockDelete,
  onBlockAdd,
}) {
  const dropZoneRef= useRef(null);
  const [isDraggingFile, setIsDraggingFile]= useState(false);
  
  const handleDragOver=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(true);
  };

  const handleDragLeave=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
  };

  const handleDrop=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);

  const files= e.dataTransfer.files;
  if(files.length === 0) return;
  
  const file= files[0];
  const reader= new FileReader();
  reader.onload= (event)=>{
    const text= event.target.result;
  
  onBlocksChange([
    {
      id: Date.now(),
      type: "paragraph",
      content: text,
    },
  ]);
};
reader.readAsText(file);
};
  return (
    <div className="w-full h-full">
      <div className="w-full h-[calc(100vh-8rem)] rounded-xl border bg-card shadow-sm overflow-hidden">
        {activeTab === "editor" && (
          <div className="w-full h-full">
            <Editor
              blocks={blocks}
              onBlockUpdate={onBlockUpdate}
              onBlockDelete={onBlockDelete}
              onBlockAdd={onBlockAdd}

            />
          </div>
        )}

        {activeTab === "preview" && (
          <div className="w-full h-full">
            <Preview blocks={blocks} />
          </div>
        )}

        {activeTab === "raw" && (
          <div className="w-full h-full">
            <Raw blocks={blocks} onBlocksChange={onBlocksChange} />
          </div>
        )}
      </div>
    </div>
  );
}
