import Editor from "../BuilderPage/Editor";
import Preview from "../BuilderPage/Preview";
import Raw from "../BuilderPage/Raw";

export default function DashboardHome({
  activeTab,
  blocks,
  onBlocksChange,
  onBlockUpdate,
  onBlockDelete,
}) {
  return (
    <div className="flex flex-col h-full items-center justify-start py-4">
      <div className="w-full max-w-[95vw] min-h-[calc(100vh-12rem)] rounded-xl border bg-card shadow-sm p-4">
        {activeTab === "editor" && (
          <div className="w-full h-full">
            <Editor blocks={blocks} onBlockUpdate={onBlockUpdate} onBlockDelete={onBlockDelete} />
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
