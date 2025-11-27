import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  Download,
  FileCode,
  FileDown,
  FileText,
  FileType,
  Printer,
} from "lucide-react";
import { useState } from "react";

const FormatCard = ({ icon: Icon, label, desc, active, onClick }) => (
  <div
    onClick={onClick}
    className={`
      relative flex flex-col gap-2 p-3 rounded-lg border cursor-pointer transition-all duration-200
      ${
        active
          ? "bg-primary/10 border-primary/50 ring-1 ring-primary/20"
          : "bg-muted/40 border-border hover:bg-muted/60 hover:border-foreground/20"
      }
    `}
  >
    <div className="flex items-start justify-between">
      <div
        className={`p-1.5 rounded-md ${
          active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
        }`}
      >
        <Icon size={16} />
      </div>
      {active && <div className="w-2 h-2 rounded-full bg-primary" />}
    </div>
    <div>
      <div className={`text-xs font-semibold ${active ? "text-primary" : "text-foreground"}`}>
        {label}
      </div>
      <div className="text-[10px] text-muted-foreground">{desc}</div>
    </div>
  </div>
);

const ToggleRow = ({ label }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-xs text-muted-foreground">{label}</span>
    <div className="w-8 h-4 bg-muted border border-input rounded-full relative cursor-pointer">
      <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 bg-muted-foreground rounded-full shadow-sm" />
    </div>
  </div>
);

export default function SectionExport() {
  const [selectedFormat, setSelectedFormat] = useState("markdown");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background relative overflow-hidden font-sans border-l border-border">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none select-none overflow-hidden"
        style={{ filter: "blur(0.5px)" }}
      >
        <div className="p-8 font-mono text-xs text-muted-foreground/50 space-y-1">
          <div className="text-primary"># Project Documentation</div>
          <div className="h-4" />
          <div>## Introduction</div>
          <div>This project aims to revolutionise the way we handle...</div>
          <div className="h-4" />
          <div className="text-purple-400">```javascript</div>
          <div>const init = () =&gt; {"{"}</div>
          <div className="pl-4">console.log("Hello World");</div>
          <div>{"}"}</div>
          <div className="text-purple-400">```</div>
        </div>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-[400px] bg-card border border-border rounded-xl shadow-2xl overflow-hidden 
                   relative z-10 -translate-x-30"
      >
        <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-muted rounded-md">
              <FileDown size={14} className="text-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">Export Document</span>
          </div>
          <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Cancel
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              <FormatCard
                icon={FileCode}
                label="Markdown"
                desc=".md file"
                active={selectedFormat === "markdown"}
                onClick={() => setSelectedFormat("markdown")}
              />
              <FormatCard
                icon={FileType}
                label="HTML"
                desc="Web page"
                active={selectedFormat === "html"}
                onClick={() => setSelectedFormat("html")}
              />
              <FormatCard
                icon={FileText}
                label="PDF"
                desc="Document"
                active={selectedFormat === "pdf"}
                onClick={() => setSelectedFormat("pdf")}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Settings
            </label>
            <div className="divide-y divide-border">
              <ToggleRow label="Include Assets" />
              <ToggleRow label="Optimize Images" />
              <ToggleRow label="Add Footer Attribution" />
            </div>
          </div>

          <button
            onClick={handleExport}
            className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 
                       transition-colors rounded-lg text-sm font-semibold flex items-center 
                       justify-center gap-2 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isExporting ? (
                <motion.div
                  key="exporting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <span className="w-3 h-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Processing...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  {selectedFormat === "pdf" && <Printer size={14} />}
                  {selectedFormat !== "pdf" && <Download size={14} />}
                  <span>
                    Export to{" "}
                    {selectedFormat === "markdown" ? "Markdown" : selectedFormat.toUpperCase()}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        <div className="px-5 py-3 bg-muted/30 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <Check size={10} className="text-green-500" />
            <span>Auto-saved 2m ago</span>
          </div>
          <button className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
            <Copy size={10} />
            <span>Copy Link</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
