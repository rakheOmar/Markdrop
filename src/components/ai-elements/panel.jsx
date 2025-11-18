import { Panel as PanelPrimitive } from "@xyflow/react";
import { cn } from "@/lib/utils";

export const Panel = ({ className, ...props }) => (
  <PanelPrimitive
    className={cn("m-4 overflow-hidden rounded-md border bg-card p-1", className)}
    {...props}
  />
);
