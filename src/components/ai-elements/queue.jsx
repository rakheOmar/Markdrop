"use client";

import { ChevronDownIcon, PaperclipIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export const QueueItem = ({ className, ...props }) => (
  <li
    className={cn(
      "group flex flex-col gap-1 rounded-md px-3 py-1 text-sm transition-colors hover:bg-muted",
      className
    )}
    {...props}
  />
);

export const QueueItemIndicator = ({ completed = false, className, ...props }) => (
  <span
    className={cn(
      "mt-0.5 inline-block size-2.5 rounded-full border",
      completed
        ? "border-muted-foreground/20 bg-muted-foreground/10"
        : "border-muted-foreground/50",
      className
    )}
    {...props}
  />
);

export const QueueItemContent = ({ completed = false, className, ...props }) => (
  <span
    className={cn(
      "line-clamp-1 grow break-words",
      completed ? "text-muted-foreground/50 line-through" : "text-muted-foreground",
      className
    )}
    {...props}
  />
);

export const QueueItemDescription = ({ completed = false, className, ...props }) => (
  <div
    className={cn(
      "ml-6 text-xs",
      completed ? "text-muted-foreground/40 line-through" : "text-muted-foreground",
      className
    )}
    {...props}
  />
);

export const QueueItemActions = ({ className, ...props }) => (
  <div className={cn("flex gap-1", className)} {...props} />
);

export const QueueItemAction = ({ className, ...props }) => (
  <Button
    className={cn(
      "size-auto rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted-foreground/10 hover:text-foreground group-hover:opacity-100",
      className
    )}
    size="icon"
    type="button"
    variant="ghost"
    {...props}
  />
);

export const QueueItemAttachment = ({ className, ...props }) => (
  <div className={cn("mt-1 flex flex-wrap gap-2", className)} {...props} />
);

export const QueueItemImage = ({ className, ...props }) => (
  <img
    alt=""
    className={cn("h-8 w-8 rounded border object-cover", className)}
    height={32}
    width={32}
    {...props}
  />
);

export const QueueItemFile = ({ children, className, ...props }) => (
  <span
    className={cn("flex items-center gap-1 rounded border bg-muted px-2 py-1 text-xs", className)}
    {...props}
  >
    <PaperclipIcon size={12} />
    <span className="max-w-[100px] truncate">{children}</span>
  </span>
);

export const QueueList = ({ children, className, ...props }) => (
  <ScrollArea className={cn("-mb-1 mt-2", className)} {...props}>
    <div className="max-h-40 pr-4">
      <ul>{children}</ul>
    </div>
  </ScrollArea>
);

export const QueueSection = ({ className, defaultOpen = true, ...props }) => (
  <Collapsible className={cn(className)} defaultOpen={defaultOpen} {...props} />
);

export const QueueSectionTrigger = ({ children, className, ...props }) => (
  <CollapsibleTrigger asChild>
    <button
      className={cn(
        "group flex w-full items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-left font-medium text-muted-foreground text-sm transition-colors hover:bg-muted",
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  </CollapsibleTrigger>
);

export const QueueSectionLabel = ({ count, label, icon, className, ...props }) => (
  <span className={cn("flex items-center gap-2", className)} {...props}>
    <ChevronDownIcon className="group-data-[state=closed]:-rotate-90 size-4 transition-transform" />
    {icon}
    <span>
      {count} {label}
    </span>
  </span>
);

export const QueueSectionContent = ({ className, ...props }) => (
  <CollapsibleContent className={cn(className)} {...props} />
);

export const Queue = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col gap-2 rounded-xl border border-border bg-background px-3 pt-2 pb-2 shadow-xs",
      className
    )}
    {...props}
  />
);
