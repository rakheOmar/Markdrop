import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SidebarItem({ data, isActive, onClick }) {
  return (
    <div
      className={`group relative flex flex-col py-6 border-b border-white/10 cursor-pointer transition-colors duration-300 ${isActive ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
      onClick={onClick}
    >
      <h3
        className={`text-xl font-medium mb-2 transition-colors duration-300 ${isActive ? "text-foreground" : "text-foreground/60 group-hover:text-foreground"}`}
      >
        {data.title}
      </h3>

      <motion.div
        initial={false}
        animate={{
          height: isActive ? "auto" : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="text-foreground/60 leading-relaxed mb-4 text-[15px]">{data.description}</p>
      </motion.div>

      {isActive && (
        <motion.div
          layoutId="active-line"
          className="absolute -bottom-px left-0 w-full h-px bg-primary"
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
}
