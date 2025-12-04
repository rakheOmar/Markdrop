import { Sparkles, Upload, Zap } from "lucide-react";
import { motion } from "motion/react";
import drag_n_drop from "@/assets/drag_n_drop.png";
import exportFeature from "@/assets/export.png";
import preview from "@/assets/preview.png";
import realtime from "@/assets/realtime.png";

import Features from "@/components/ui/custom/features";

const data = [
  {
    id: 1,
    title: "Drag & Drop",
    content: "Simply drag markdown blocks from the sidebar and drop them into your editor",
    image: drag_n_drop,
    icon: <Upload className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "Edit in Real-Time",
    content: "Edit your content with instant feedback as you type and arrange blocks",
    image: realtime,
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "Preview Live",
    content: "See exactly how your markdown will look with real-time preview rendering",
    image: preview,
    icon: <Sparkles className="w-6 h-6 text-primary" />,
  },
  {
    id: 4,
    title: "Export Anywhere",
    content: "Export your work as markdown, HTML, or PDF ready for GitHub and beyond",
    image: exportFeature,
    icon: <Sparkles className="w-6 h-6 text-primary" />,
  },
];

export default function HomeFeatures() {
  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-auto h-auto px-2 py-1.5 sm:px-2.5 sm:py-2 border-l border-b border-[#cecece] dark:border-[#16181d] sm:flex items-center justify-center hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="font-mono text-[0.55rem] sm:text-[0.65rem] md:text-xs text-black dark:text-white whitespace-nowrap">
            01.
          </span>
        </motion.div>
      </div>
      <motion.div
        className="border-b border-[#cecece] dark:border-[#16181d]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <Features data={data} />
      </motion.div>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
