import { Sparkles, Upload, Zap } from "lucide-react";
import Features from "@/components/ui/custom/features";

const data = [
  {
    id: 1,
    title: "Drag & Drop",
    content: "Simply drag markdown blocks from the sidebar and drop them into your editor",
    image: "/assets/filter.webp",
    icon: <Upload className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "Edit in Real-Time",
    content: "Edit your content with instant feedback as you type and arrange blocks",
    image: "/assets/search.webp",
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "Preview Live",
    content: "See exactly how your markdown will look with real-time preview rendering",
    image: "/assets/contribute.webp",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
  },
  {
    id: 4,
    title: "Export Anywhere",
    content: "Export your work as markdown, HTML, or PDF ready for GitHub and beyond",
    image: "/assets/export.webp",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
  },
];

export default function HomeFeatures() {
  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-auto h-auto px-2 py-1.5 sm:px-2.5 sm:py-2 border-l border-b border-[#cecece] dark:border-[#16181d] sm:flex items-center justify-center hidden">
          <span className="font-mono text-[0.55rem] sm:text-[0.65rem] md:text-xs text-black dark:text-white whitespace-nowrap">
            01.
          </span>
        </div>
      </div>
      <div className="border-b border-[#cecece] dark:border-[#16181d]">
        <Features data={data} />
      </div>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
