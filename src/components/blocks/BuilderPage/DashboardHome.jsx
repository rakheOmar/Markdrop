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
  
//   //prevent from opening new tab
//   if(e.dataTransfer.items){
//     for(let i=0; i< e.dataTransfer.items.length; i++){
//       if(e.dataTransfer.items[i].kind === "file"){
//         e.dataTransfer.dropEffect= "copy";
//       } else{
//         e.dataTransfer.dropEffect= "none";
//       }
//   }
// }
  const files= e.dataTransfer.files;
  if(files.length === 0) return;
  
  const file= files[0];
  const reader= new FileReader();
  reader.onload= (event)=>{
    const text= event.target.result;
  
  onBlocksChange([
    // ...blocks,
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
      <div
      ref={dropZoneRef}
      className={`w-full h-[calc(100vh-8rem)] rounded-xl border bg-card shadow-sm overflow-hidden ${
      isDraggingFile ? "bg-muted/40 border-dashed border-2 border-primary" : ""
    }`}
      onDragOver={(e)=>{
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect= "copy";
        setIsDraggingFile(true);
      }}
      onDragLeave={handleDragLeave} 
      onDrop={handleDrop}
    >
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
