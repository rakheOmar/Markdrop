"use client";

import { BookmarkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const Checkpoint = ({ className, children, ...props }) => (
  <div
    className={cn("flex items-center gap-0.5 text-muted-foreground overflow-hidden", className)}
    {...props}
  >
    {children}
    <Separator />
  </div>
);

export const CheckpointIcon = ({ className, children, ...props }) =>
  children ?? <BookmarkIcon className={cn("size-4 shrink-0", className)} {...props} />;

export const CheckpointTrigger = ({
  children,
  className,
  variant = "ghost",
  size = "sm",
  tooltip,
  ...props
}) =>
  tooltip ? (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size={size} type="button" variant={variant} {...props}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent align="start" side="bottom">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  ) : (
    <Button size={size} type="button" variant={variant} {...props}>
      {children}
    </Button>
  );
