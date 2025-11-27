import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import SectionBuilder from "@/components/blocks/Home/Features/SectionBuilder";
import SectionExport from "@/components/blocks/Home/Features/SectionExport";
import SectionSync from "@/components/blocks/Home/Features/SectionSync";
import SectionTemplates from "@/components/blocks/Home/Features/SectionTemplates";
import SidebarItem from "@/components/blocks/Home/Features/SidebarItem";

const defaultTabs = [
  {
    id: "templates",
    title: "Ready-to-Use Templates",
    description:
      "Don't start from a blank page. Choose from a library of pre-designed templates for GitHub Profiles, Documentation, or Blog posts and customize them to fit your brand.",
    linkText: "Explore Templates",
  },
  {
    id: "builder",
    title: "Visual Block Builder",
    description:
      "Craft complex layouts without touching a single line of code. Our intuitive drag-and-drop interface lets you stack, reorder, and style content blocks instantly.",
    linkText: "Try the Builder",
  },
  {
    id: "sync",
    title: "Cloud Sync & Backup",
    description:
      "Never lose your work again. Powered by Supabase, your documents are securely stored in the cloud and synced across all your devices in real-time.",
    linkText: "Learn about Sync",
  },
  {
    id: "export",
    title: "Seamless Export",
    description:
      "Your content isn't locked in. With one click, export your visual designs into clean, production-ready Markdown, HTML, or PDF formats.",
    linkText: "View Export Options",
  },
];

export default function FeatureSection({ tabs = defaultTabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isDesktop, setIsDesktop] = useState(false);

  const scrollRef = useRef(null);

  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    container: scrollRef, 
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      if (!isDesktop || isScrollingRef.current) return;

      const index = Math.min(Math.floor(latest * tabs.length), tabs.length - 1);
      const newTab = tabs[index]?.id;

      if (newTab !== activeTab) setActiveTab(newTab);
    });

    return () => unsub();
  }, [scrollYProgress, isDesktop, tabs, activeTab]);

  const handleTabClick = (id) => {
    if (!isDesktop) return setActiveTab(id);

    const index = tabs.findIndex((t) => t.id === id);
    if (index === -1 || !scrollRef.current) return;

    isScrollingRef.current = true;
    setActiveTab(id);

    const scrollableDistance = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;

    const progress = index / tabs.length;
    const scrollPosition = scrollableDistance * progress;

    scrollRef.current.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });

    setTimeout(() => (isScrollingRef.current = false), 600);
  };

  const renderSection = () => {
    switch (activeTab) {
      case "templates":
        return <SectionTemplates />;
      case "builder":
        return <SectionBuilder />;
      case "sync":
        return <SectionSync />;
      case "export":
        return <SectionExport />;
    }
  };

  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden bg-background">
        <motion.div
          className="absolute top-0 right-0 w-auto h-auto px-2 py-1.5 sm:px-2.5 sm:py-2 border-l border-b border-[#cecece] dark:border-[#16181d] sm:flex items-center justify-center hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="font-mono text-[0.55rem] sm:text-[0.65rem] md:text-xs text-foreground whitespace-nowrap">
            01.
          </span>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        className="h-screen lg:h-screen overflow-y-scroll overflow-x-hidden no-scrollbar relative border-b border-[#cecece] dark:border-[#16181d] "
      >
        <div ref={containerRef} className="relative h-[400vh] bg-background">
          <div className="sticky top-0 h-screen w-full flex justify-center p-6 md:p-12 lg:p-24 overflow-hidden">
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-20 h-full">
              <div className="flex flex-col gap-12 h-fit lg:justify-center">
                <header>
                  <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-foreground">
                    Draft visually.
                    <br /> Ship instantly.
                  </h2>
                </header>

                <div className="flex flex-col">
                  {tabs.map((tab) => (
                    <SidebarItem
                      key={tab.id}
                      data={tab}
                      isActive={activeTab === tab.id}
                      onClick={() => handleTabClick(tab.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center h-full w-full">
                <div className="relative w-full lg:w-auto lg:h-full aspect-video bg-card rounded-2xl border border-border overflow-hidden shadow-2xl lg:shrink-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {renderSection()}
                    </motion.div>
                  </AnimatePresence>

                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-border" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
