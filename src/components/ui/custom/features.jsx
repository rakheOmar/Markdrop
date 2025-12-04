import * as Accordion from "@radix-ui/react-accordion";
import { motion, useInView } from "framer-motion";
import { forwardRef, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const AccordionItem = forwardRef(function AccordionItem(
  { children, className, ...props },
  forwardedRef
) {
  return (
    <Accordion.Item
      className={cn("mt-px overflow-hidden focus-within:relative focus-within:z-10", className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  );
});

const AccordionTrigger = forwardRef(function AccordionTrigger(
  { children, className, ...props },
  forwardedRef
) {
  return (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={cn(
          "group flex flex-1 cursor-pointer items-center justify-between px-5 text-[15px] leading-none outline-none",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  );
});

export default function Features({
  collapseDelay = 5000,
  ltr = false,
  linePosition = "left",
  data = [],
}) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const carouselRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isInView) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(-1);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isInView]);

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelectorAll(".card")[index];
      if (card) {
        const cardRect = card.getBoundingClientRect();
        const carouselRect = carouselRef.current.getBoundingClientRect();
        const offset =
          cardRect.left - carouselRect.left - (carouselRect.width - cardRect.width) / 2;

        carouselRef.current.scrollTo({
          left: carouselRef.current.scrollLeft + offset,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex !== undefined ? (prevIndex + 1) % data.length : 0));
    }, collapseDelay);

    return () => clearInterval(timer);
  }, [collapseDelay, data.length]);

  useEffect(() => {
    const handleAutoScroll = () => {
      const nextIndex = (currentIndex !== undefined ? currentIndex + 1 : 0) % data.length;
      scrollToIndex(nextIndex);
    };

    const autoScrollTimer = setInterval(handleAutoScroll, collapseDelay);

    return () => clearInterval(autoScrollTimer);
    // biome-ignore lint/correctness/useExhaustiveDependencies: ok
  }, [collapseDelay, currentIndex, data.length, scrollToIndex]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const handleScroll = () => {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = carousel.querySelector(".card")?.clientWidth || 0;
        const newIndex = Math.min(Math.floor(scrollLeft / cardWidth), data.length - 1);
        setCurrentIndex(newIndex);
      };

      carousel.addEventListener("scroll", handleScroll);
      return () => carousel.removeEventListener("scroll", handleScroll);
    }
  }, [data.length]);

  return (
    <section ref={ref} id="features">
      <div>
        <div className="w-full mx-auto">
          <div className="mx-auto h-full grid lg:grid-cols-2 items-center">
            <div
              className={`hidden lg:flex order-1 lg:order-0 ${
                ltr ? "lg:order-2 lg:justify-end" : "justify-start"
              }`}
            >
              <Accordion.Root
                type="single"
                defaultValue={`item-${currentIndex}`}
                value={`item-${currentIndex}`}
                onValueChange={(value) => setCurrentIndex(Number(value.split("-")[1]))}
              >
                {data.map((item, index) => (
                  <AccordionItem
                    key={item.id}
                    className="relative border-b border-x last:border-y-0 border-[#CECECE] dark:border-[#16181d] p-10"
                    value={`item-${index}`}
                  >
                    {(linePosition === "left" || linePosition === "right") && (
                      <div
                        className={`absolute bottom-0 top-0 h-full w-0.5 overflow-hidden rounded-lg bg-primary/20 ${
                          linePosition === "right" ? "left-auto right-0" : "left-0 right-auto"
                        }`}
                      >
                        <div
                          className={`absolute left-0 top-0 w-full ${
                            currentIndex === index ? "h-full" : "h-0"
                          } origin-top transition-all ease-linear bg-primary`}
                          style={{
                            transitionDuration:
                              currentIndex === index ? `${collapseDelay}ms` : "0s",
                          }}
                        ></div>
                      </div>
                    )}

                    {(linePosition === "top" || linePosition === "bottom") && (
                      <div
                        className={`absolute left-0 right-0 w-full h-0.5 overflow-hidden rounded-lg bg-primary/20 ${
                          linePosition === "bottom" ? "bottom-0" : "top-0"
                        }`}
                      >
                        <div
                          className={`absolute left-0 ${
                            linePosition === "bottom" ? "bottom-0" : "top-0"
                          } h-full ${
                            currentIndex === index ? "w-full" : "w-0"
                          } origin-left bg-primary transition-all ease-linear`}
                          style={{
                            transitionDuration:
                              currentIndex === index ? `${collapseDelay}ms` : "0s",
                          }}
                        ></div>
                      </div>
                    )}

                    <div className="flex items-center relative">
                      <div>
                        <AccordionTrigger className="text-xl font-medium pb-1 pl-0 tracking-tight text-foreground">
                          {item.title}
                        </AccordionTrigger>

                        <AccordionTrigger className="justify-start text-left leading-4 text-base font-light pl-0 tracking-tight text-muted-foreground">
                          {item.content}
                        </AccordionTrigger>
                      </div>
                    </div>
                  </AccordionItem>
                ))}
              </Accordion.Root>
            </div>

            <div
              className={`lg:h-[485px] md:h-80 h-[260px] lg:min-h-[200px] w-auto flex items-center justify-center ${
                ltr && "lg:order-1 lg:col-start-2 border"
              }`}
            >
              {data[currentIndex]?.image ? (
                <motion.img
                  key={currentIndex}
                  src={data[currentIndex].image}
                  alt="feature"
                  className="aspect-auto h-full w-full object-cover p-0"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              ) : data[currentIndex]?.video ? (
                <video
                  preload="auto"
                  src={data[currentIndex].video}
                  className="aspect-auto h-full w-full rounded-lg object-cover"
                  autoPlay
                  loop
                  muted
                />
              ) : (
                <div className="aspect-auto h-full w-full rounded-xl border border-neutral-300/50 bg-gray-200 p-1"></div>
              )}
            </div>

            <ul
              ref={carouselRef}
              className="flex h-full snap-x flex-nowrap overflow-x-auto py-10 [-ms-overflow-style:none] [-webkit-mask-image:linear-gradient(90deg,transparent,black_20%,white_80%,transparent)] mask-[linear-gradient(90deg,transparent,black_20%,white_80%,transparent)] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden snap-mandatory"
              style={{
                padding: "50px calc(50%)",
              }}
            >
              {data.map((item, index) => (
                <div
                  key={item.id}
                  className="card relative mr-8 grid h-full max-w-60 shrink-0 gap-1 items-start justify-center py-4 last:mr-0"
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    scrollSnapAlign: "center",
                  }}
                >
                  <div className="absolute bottom-0 left-0 right-auto top-0 h-0.5 w-full overflow-hidden rounded-lg bg-primary/20">
                    <div
                      className={`absolute left-0 top-0 h-full ${
                        currentIndex === index ? "w-full" : "w-0"
                      } origin-top transition-all ease-linear bg-primary`}
                      style={{
                        transitionDuration: currentIndex === index ? `${collapseDelay}ms` : "0s",
                      }}
                    ></div>
                  </div>

                  <h2 className="text-xl font-bold text-center text-foreground">{item.title}</h2>
                  <p className="mx-0 max-w-sm text-balance text-sm text-center text-muted-foreground">
                    {item.content}
                  </p>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
