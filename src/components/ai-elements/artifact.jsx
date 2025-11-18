"use client";

import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const Artifact = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col overflow-hidden rounded-lg border bg-background shadow-sm",
      className
    )}
    {...props}
  />
);

export const ArtifactHeader = ({ className, ...props }) => (
  <div
    className={cn("flex items-center justify-between border-b bg-muted/50 px-4 py-3", className)}
    {...props}
  />
);

export const ArtifactClose = ({
  className,
  children,
  size = "sm",
  variant = "ghost",
  ...props
}) => (
  <Button
    className={cn("size-8 p-0 text-muted-foreground hover:text-foreground", className)}
    size={size}
    type="button"
    variant={variant}
    {...props}
  >
    {children ?? <XIcon className="size-4" />}
    <span className="sr-only">Close</span>
  </Button>
);

export const ArtifactTitle = ({ className, ...props }) => (
  <p className={cn("font-medium text-foreground text-sm", className)} {...props} />
);

export const ArtifactDescription = ({ className, ...props }) => (
  <p className={cn("text-muted-foreground text-sm", className)} {...props} />
);

export const ArtifactActions = ({ className, ...props }) => (
  <div className={cn("flex items-center gap-1", className)} {...props} />
);

export const ArtifactAction = ({
  tooltip,
  label,
  icon: Icon,
  children,
  className,
  size = "sm",
  variant = "ghost",
  ...props
}) => {
  const button = (
    <Button
      className={cn("size-8 p-0 text-muted-foreground hover:text-foreground", className)}
      size={size}
      type="button"
      variant={variant}
      {...props}
    >
      {Icon ? <Icon className="size-4" /> : children}
      <span className="sr-only">{label || tooltip}</span>
    </Button>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
};

export const ArtifactContent = ({ className, ...props }) => (
  <div className={cn("flex-1 overflow-auto p-4", className)} {...props} />
);
