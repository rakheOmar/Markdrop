import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function VideoSection() {
  const [isInView, setIsInView] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25, rootMargin: "50px" }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
            02.
          </span>
        </motion.div>
      </div>

      <div className="border-b border-[#CECECE] dark:border-[#16181d] flex items-center justify-center h-full px-4">
        <motion.div
          className="flex items-center justify-center w-full max-w-4xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="aspect-video w-full" ref={iframeRef}>
            {isInView && (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/oYzU5soosMo?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&showinfo=0&playlist=oYzU5soosMo&enablejsapi=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                style={{
                  border: 0,
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              />
            )}
          </div>
        </motion.div>
      </div>

      <div className="border-l border-b border-[#CECECE] dark:border-[#16181d]"></div>
    </>
  );
}
