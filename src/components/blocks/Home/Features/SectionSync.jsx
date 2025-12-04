import { motion } from "framer-motion";
import {
  Calendar,
  Cloud,
  FileCode,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";

const MOCK_FILES = [
  {
    id: 1,
    title: "README.md",
    desc: "Project overview",
    date: "Just now",
    type: "md",
    size: "2.4 KB",
  },
  {
    id: 2,
    title: "CONTRIBUTING.md",
    desc: "Developer guidelines",
    date: "2h ago",
    type: "md",
    size: "3.1 KB",
  },
  {
    id: 3,
    title: "CHANGELOG.md",
    desc: "Version history",
    date: "5h ago",
    type: "md",
    size: "1.8 KB",
  },
  {
    id: 4,
    title: "getting-started.md",
    desc: "Onboarding guide",
    date: "1d ago",
    type: "md",
    size: "5.2 KB",
  },
  {
    id: 5,
    title: "api-reference.md",
    desc: "Endpoints & usage",
    date: "2d ago",
    type: "md",
    size: "12.4 KB",
  },
  {
    id: 6,
    title: "2025-roadmap.md",
    desc: "Q1 Objectives",
    date: "1w ago",
    type: "md",
    size: "1.5 KB",
  },
];

const MOCK_FOLDERS = [
  { id: 1, name: "docs", count: 12, date: "2 days ago" },
  { id: 2, name: "assets", count: 24, date: "1 week ago" },
  { id: 3, name: "blog-posts", count: 8, date: "3 weeks ago" },
  { id: 4, name: "archived", count: 5, date: "1 month ago" },
];

const FileCard = ({ file }) => {
  const getIcon = (type) => {
    switch (type) {
      case "json":
        return <FileJson className="w-6 h-6 text-orange-400" />;
      case "code":
        return <FileCode className="w-6 h-6 text-blue-400" />;
      case "css":
        return <FileCode className="w-6 h-6 text-sky-300" />;
      default:
        return <FileText className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group bg-card border border-border hover:border-primary/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="h-24 bg-muted/30 flex items-center justify-center border-b border-border group-hover:bg-muted/50 transition-colors">
        {getIcon(file.type)}
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-medium text-xs text-foreground truncate flex-1">{file.title}</h3>
          <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical size={14} />
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground mb-2 truncate">{file.desc}</p>
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar size={10} />
            <span>{file.date}</span>
          </div>
          <span>{file.size}</span>
        </div>
      </div>
    </motion.div>
  );
};

const FolderCard = ({ folder }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="group p-4 bg-card border border-border hover:border-primary/50 rounded-xl cursor-pointer transition-all duration-200 hover:bg-accent/50"
  >
    <div className="flex justify-between items-start mb-3">
      <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
        <FolderOpen size={18} />
      </div>
      <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreVertical size={14} />
      </button>
    </div>

    <h3 className="font-medium text-sm text-foreground mb-1">{folder.name}</h3>
    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
      <span>{folder.count} files</span>
      <span>•</span>
      <span>{folder.date}</span>
    </div>
  </motion.div>
);

export default function SectionSync() {
  const [activeTab, setActiveTab] = useState("files");

  return (
    <div className="w-full h-full flex flex-col bg-background relative overflow-hidden font-sans select-none border-l border-border">
      <div className="absolute top-0 right-0 px-3 py-1.5 border-l border-b border-border bg-background z-20 flex items-center justify-center">
        <span className="font-mono text-[10px] text-muted-foreground">storage.tsx</span>
      </div>

      <div className="p-6 pb-2 border-b border-border bg-background z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border border-border p-1 relative">
              <img
                src="https://github.com/rakheOmar.png"
                className="w-full h-full rounded-full object-cover"
                alt="User"
              />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Omar Rakhe</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">dev.markdrop@proton.me</span>
                <span className="px-1.5 py-0.5 rounded bg-muted/50 border border-border text-muted-foreground text-[10px] font-medium">
                  Free Plan
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Cloud size={14} />
              <span>Storage</span>
            </div>
            <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="w-[65%] h-full bg-primary rounded-full" />
            </div>
            <span className="text-[10px] text-muted-foreground">6.5 GB of 10 GB used</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex gap-1 p-1 bg-muted/40 border border-border rounded-lg">
            <button
              onClick={() => setActiveTab("files")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${activeTab === "files" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <FileText size={14} /> Files
            </button>
            <button
              onClick={() => setActiveTab("folders")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${activeTab === "folders" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Folder size={14} /> Folders
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative group">
              <Search className="absolute left-2.5 top-1.5 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="h-7 w-40 bg-muted/40 border border-input rounded-md pl-8 pr-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring transition-all"
              />
            </div>
            <button className="h-7 w-7 flex items-center justify-center bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pt-4">
        {activeTab === "files" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {MOCK_FILES.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
            {[1, 2].map((i) => (
              <div
                key={`empty-${i}`}
                className="border border-border border-dashed rounded-xl h-40 flex items-center justify-center opacity-30"
              >
                <span className="text-xs text-muted-foreground">Empty Slot</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {MOCK_FOLDERS.map((folder) => (
              <FolderCard key={folder.id} folder={folder} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
