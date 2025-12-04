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
