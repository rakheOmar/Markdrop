"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export const InlineCitation = ({ className, ...props }) => (
  <span className={cn("group inline items-center gap-1", className)} {...props} />
);

export const InlineCitationText = ({ className, ...props }) => (
  <span className={cn("transition-colors group-hover:bg-accent", className)} {...props} />
);

export const InlineCitationCard = (props) => <HoverCard closeDelay={0} openDelay={0} {...props} />;

export const InlineCitationCardTrigger = ({ sources, className, ...props }) => (
  <HoverCardTrigger asChild>
    <Badge className={cn("ml-1 rounded-full", className)} variant="secondary" {...props}>
      {sources[0] ? (
        <>
          {new URL(sources[0]).hostname} {sources.length > 1 && `+${sources.length - 1}`}
        </>
      ) : (
        "unknown"
      )}
    </Badge>
  </HoverCardTrigger>
);

export const InlineCitationCardBody = ({ className, ...props }) => (
  <HoverCardContent className={cn("relative w-80 p-0", className)} {...props} />
);

const CarouselApiContext = createContext(undefined);

const useCarouselApi = () => {
  const context = useContext(CarouselApiContext);
  return context;
};

export const InlineCitationCarousel = ({ className, children, ...props }) => {
  const [api, setApi] = useState();

  return (
    <CarouselApiContext.Provider value={api}>
      <Carousel className={cn("w-full", className)} setApi={setApi} {...props}>
        {children}
      </Carousel>
    </CarouselApiContext.Provider>
  );
};

export const InlineCitationCarouselContent = (props) => <CarouselContent {...props} />;

export const InlineCitationCarouselItem = ({ className, ...props }) => (
  <CarouselItem className={cn("w-full space-y-2 p-4 pl-8", className)} {...props} />
);

export const InlineCitationCarouselHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex items-center justify-between gap-2 rounded-t-md bg-secondary p-2",
      className
    )}
    {...props}
  />
);

export const InlineCitationCarouselIndex = ({ children, className, ...props }) => {
  const api = useCarouselApi();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-end px-3 py-1 text-muted-foreground text-xs",
        className
      )}
      {...props}
    >
      {children ?? `${current}/${count}`}
    </div>
  );
};

export const InlineCitationCarouselPrev = ({ className, ...props }) => {
  const api = useCarouselApi();

  const handleClick = useCallback(() => {
    if (api) {
      api.scrollPrev();
    }
  }, [api]);

  return (
    <button
      aria-label="Previous"
      className={cn("shrink-0", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <ArrowLeftIcon className="size-4 text-muted-foreground" />
    </button>
  );
};

export const InlineCitationCarouselNext = ({ className, ...props }) => {
  const api = useCarouselApi();

  const handleClick = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  return (
    <button
      aria-label="Next"
      className={cn("shrink-0", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <ArrowRightIcon className="size-4 text-muted-foreground" />
    </button>
  );
};

export const InlineCitationSource = ({
  title,
  url,
  description,
  className,
  children,
  ...props
}) => (
  <div className={cn("space-y-1", className)} {...props}>
    {title && <h4 className="truncate font-medium text-sm leading-tight">{title}</h4>}
    {url && <p className="truncate break-all text-muted-foreground text-xs">{url}</p>}
    {description && (
      <p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">{description}</p>
    )}
    {children}
  </div>
);

export const InlineCitationQuote = ({ children, className, ...props }) => (
  <blockquote
    className={cn("border-muted border-l-2 pl-3 text-muted-foreground text-sm italic", className)}
    {...props}
  >
    {children}
  </blockquote>
);
