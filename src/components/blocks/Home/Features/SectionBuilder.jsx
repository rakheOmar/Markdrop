import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckSquare,
  Code2,
  CreditCard,
  Eye,
  FileCode,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Image as ImageIcon,
  Link2,
  List,
  ListOrdered,
  Menu,
  Minus,
  Network,
  Pencil,
  Pilcrow,
  Quote,
  RotateCcw,
  RotateCw,
  Save,
  Shield,
  Sigma,
  Sparkles,
  Table,
  Type,
  Video,
} from "lucide-react";
import React from "react";
import { Logo } from "@/components/Logo";

const SidebarItem = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-accent hover:text-accent-foreground group cursor-grab active:cursor-grabbing transition-colors">
    <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
    <span className="text-[11px] text-muted-foreground group-hover:text-foreground transition-colors truncate">
      {label}
    </span>
  </div>
);

const SidebarSection = ({ title, children }) => (
  <div className="mb-4">
    <div className="px-2 mb-1.5 text-[9px] font-semibold text-muted-foreground/70 uppercase tracking-wider">
      {title}
    </div>
    <div className="space-y-0.5">{children}</div>
  </div>
);

export default function SectionBuilder() {
  return (
    <div className="w-full h-full flex bg-background relative overflow-hidden font-sans select-none border-l border-border">
      <div className="w-48 border-r border-border flex flex-col bg-muted/10 shrink-0 z-20">
        <div className="h-14 flex items-center justify-center border-b border-border shrink-0">
          <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="w-25 h-auto">
              <Logo />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 no-scrollbar">
          <SidebarSection title="Headings">
            <SidebarItem icon={Heading1} label="Heading 1" />
            <SidebarItem icon={Heading2} label="Heading 2" />
            <SidebarItem icon={Heading3} label="Heading 3" />
            <SidebarItem icon={Heading4} label="Heading 4" />
            <SidebarItem icon={Heading5} label="Heading 5" />
            <SidebarItem icon={Heading6} label="Heading 6" />
          </SidebarSection>

          <SidebarSection title="Blocks">
            <SidebarItem icon={Pilcrow} label="Paragraph" />
            <SidebarItem icon={Table} label="Table" />
            <SidebarItem icon={Minus} label="Separator" />
            <SidebarItem icon={Quote} label="Blockquote" />
            <SidebarItem icon={AlertCircle} label="Alert" />
            <SidebarItem icon={Code2} label="Code Block" />
            <SidebarItem icon={Sigma} label="Math Expression" />
            <SidebarItem icon={Network} label="Diagram" />
          </SidebarSection>

          <SidebarSection title="Lists">
            <SidebarItem icon={ListOrdered} label="Ordered List" />
            <SidebarItem icon={List} label="Unordered List" />
            <SidebarItem icon={CheckSquare} label="Task List" />
          </SidebarSection>

          <SidebarSection title="Media">
            <SidebarItem icon={ImageIcon} label="Image" />
            <SidebarItem icon={Video} label="Video" />
          </SidebarSection>

          <SidebarSection title="Links">
            <SidebarItem icon={Link2} label="Link" />
          </SidebarSection>

          <SidebarSection title="Special Blocks">
            <SidebarItem icon={Shield} label="Shield Badge" />
            <SidebarItem icon={Sparkles} label="Skill Icons" />
            <SidebarItem icon={Type} label="Typing SVG" />
            <SidebarItem icon={CreditCard} label="GitHub Profile Cards" />
          </SidebarSection>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-background">
        <div className="h-14 border-b border-border flex items-center justify-between px-4 bg-background z-10 shrink-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button className="p-1.5 hover:bg-accent rounded-md -ml-1 text-muted-foreground hover:text-foreground">
              <Menu className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-border hidden sm:block" />

            <div className="hidden lg:flex items-center gap-3 text-xs text-muted-foreground">
              <span>
                <span className="font-semibold text-foreground">1</span> min read
              </span>
              <span>
                <span className="font-semibold text-foreground">124</span> words
              </span>
              <span>
                <span className="font-semibold text-foreground">842</span> chars
              </span>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="grid grid-cols-3 w-60 bg-muted/40 p-1 rounded-lg border border-border">
              <div className="flex items-center justify-center gap-1.5 px-3 py-1 bg-background text-foreground text-[10px] font-medium rounded shadow-sm">
                <Pencil size={10} /> <span>Editor</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 px-3 py-1 text-muted-foreground hover:text-foreground text-[10px] font-medium rounded transition-colors">
                <FileCode size={10} /> <span>Raw</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 px-3 py-1 text-muted-foreground hover:text-foreground text-[10px] font-medium rounded transition-colors">
                <Eye size={10} /> <span>Preview</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <div className="hidden xl:flex items-center gap-1">
              <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md">
                <RotateCcw size={14} />
              </button>
              <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md">
                <RotateCw size={14} />
              </button>
              <div className="h-4 w-px bg-border mx-1" />
            </div>

            <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-md hover:opacity-90 transition-opacity">
              <Save size={14} />
              <span className="hidden lg:inline">Save</span>
            </button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md">
              <Sparkles size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-hidden relative">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="group relative p-2 -ml-2 rounded hover:bg-accent/50 border border-transparent hover:border-border transition-all">
              <h1 className="text-3xl font-bold text-foreground">Project Roadmap 2024</h1>
            </div>

            <div className="group relative p-2 -ml-2 rounded hover:bg-accent/50 border border-transparent hover:border-border transition-all">
              <div className="flex gap-2">
                <img
                  src="https://img.shields.io/badge/status-active-brightgreen?style=flat"
                  alt="status"
                  className="h-5"
                />
                <img
                  src="https://img.shields.io/badge/version-1.0.0-blue?style=flat"
                  alt="version"
                  className="h-5"
                />
              </div>
            </div>

            <div className="group relative p-2 -ml-2 rounded hover:bg-accent/50 border border-transparent hover:border-border transition-all">
              <p className="text-muted-foreground text-sm leading-relaxed">
                This document outlines the core features and development milestones for the upcoming
                year. Our primary focus is on{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-foreground text-xs font-mono">
                  performance
                </code>{" "}
                and{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-foreground text-xs font-mono">
                  user experience
                </code>
                .
              </p>
            </div>

            <div className="group relative p-2 -ml-2 rounded hover:bg-accent/50 border border-transparent hover:border-border transition-all">
              <div className="flex items-center gap-2 p-3 bg-blue-500/10 border-l-4 border-blue-500 text-blue-600 dark:text-blue-300 text-xs rounded-r">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Q1 goals must be finalized by the end of January.</span>
              </div>
            </div>

            <div className="group relative p-4 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-foreground/20 hover:bg-accent/50 transition-all">
              <span className="text-xs text-muted-foreground font-medium">Drag blocks here</span>
            </div>
          </div>

          <motion.div
            initial={{ x: -220, y: 350, opacity: 0, scale: 0.9 }}
            animate={{
              x: [-220, 50, 150],
              y: [350, 300, 250],
              opacity: [0, 1, 0],
              scale: [0.9, 1, 0.95],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              times: [0, 0.4, 1],
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute z-50 pointer-events-none top-0 left-0"
          >
            <div className="bg-popover border border-border rounded-md px-3 py-2 shadow-xl flex items-center gap-2 min-w-[140px]">
              <CheckSquare className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-xs font-medium text-foreground">Task List</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
