import { motion } from "framer-motion";
import { Code2, Eye, FileText, Filter, Github, Layout, Plus, Search } from "lucide-react";

const Badge = ({ children, className = "" }) => (
  <div className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${className}`}>
    {children}
  </div>
);

const TemplateCard = ({ title, category, description, date, imageColor, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="group relative flex flex-col h-[260px] bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden"
  >
    <div
      className={`h-28 w-full ${imageColor} relative overflow-hidden group-hover:opacity-90 transition-opacity`}
    >
      <div className="absolute inset-0 bg-linear-to-t from-card to-transparent opacity-60" />
      <div className="absolute bottom-2 left-3 flex gap-1">
        {category === "Profile" && <Github size={14} className="text-muted-foreground" />}
        {category === "Project" && <Code2 size={14} className="text-muted-foreground" />}
        {category === "Blog" && <Layout size={14} className="text-muted-foreground" />}
      </div>
    </div>

    <div className="flex-1 p-3 flex flex-col min-h-0 relative">
      <div className="flex items-start justify-between gap-2 mb-2">
        <Badge className="bg-muted/50 border-border text-muted-foreground group-hover:text-foreground group-hover:border-primary/20 transition-colors">
          {category.toUpperCase()}
        </Badge>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Eye className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
        </div>
      </div>

      <h3 className="font-semibold text-sm text-foreground mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
        {title}
      </h3>

      <p className="text-[11px] text-muted-foreground line-clamp-3 leading-relaxed">
        {description}
      </p>
    </div>

    <div className="h-10 px-3 flex items-center justify-between border-t border-border bg-muted/30 shrink-0 mt-auto">
      <span className="text-[10px] text-muted-foreground font-mono">{date}</span>
      <button className="h-6 px-2 text-[10px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
        Use Template
      </button>
    </div>
  </motion.div>
);

export default function SectionTemplates() {
  const templates = [
    {
      title: "Modern Developer Profile",
      category: "Profile",
      description:
        "A clean, minimalist GitHub profile README featuring skill icons, social links, and a dynamic activity graph section.",
      date: "Oct 24, 2023",
      imageColor: "bg-gradient-to-br from-blue-900/40 to-slate-900/40",
    },
    {
      title: "Project Documentation",
      category: "Project",
      description:
        "Comprehensive documentation template with sections for installation, usage examples, API reference, and contribution guidelines.",
      date: "Nov 12, 2023",
      imageColor: "bg-gradient-to-br from-emerald-900/40 to-teal-900/40",
    },
    {
      title: "Portfolio Showcase",
      category: "Profile",
      description:
        "Show off your best work with this grid-based portfolio template. Includes project cards, tech stack pills, and a contact section.",
      date: "Dec 05, 2023",
      imageColor: "bg-gradient-to-br from-purple-900/40 to-pink-900/40",
    },
    {
      title: "Tech Blog Theme",
      category: "Blog",
      description:
        "A content-focused layout optimized for technical writing. Features syntax highlighting support and estimated reading times.",
      date: "Jan 15, 2024",
      imageColor: "bg-gradient-to-br from-orange-900/40 to-red-900/40",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-background relative overflow-hidden font-sans select-none border-l border-border">
      <div className="absolute top-0 right-0 px-3 py-1.5 border-l border-b border-border bg-background z-20">
        <span className="font-mono text-[10px] text-muted-foreground">templates.md</span>
      </div>

      <div className="border-b border-border bg-background sticky top-0 z-10 px-6 py-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight text-foreground">
                  Template Library
                </h2>
                <Badge className="rounded-full border-border text-muted-foreground bg-transparent">
                  {templates.length}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Jumpstart your README with community-crafted layouts.
              </p>
            </div>

            <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90 transition-colors">
              <Plus size={14} />
              <span>Create</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full">
            <div className="relative flex-1 group">
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full h-8 pl-9 pr-3 bg-muted/50 border border-input rounded-md text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring transition-all"
                readOnly
              />
            </div>

            <button className="h-8 w-8 flex items-center justify-center border border-border bg-muted/50 rounded-md text-muted-foreground hover:text-foreground hover:border-ring transition-colors">
              <Filter className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {templates.map((template, idx) => (
            <TemplateCard key={idx} {...template} delay={0.1 * idx} />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-2 opacity-0">
          <FileText className="h-8 w-8 text-muted-foreground/30" />
          <span className="text-xs text-muted-foreground/50">End of list</span>
        </div>
      </div>
    </div>
  );
}
