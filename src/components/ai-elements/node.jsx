import { Handle, Position } from "@xyflow/react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Node = ({ handles, className, ...props }) => (
  <Card
    className={cn("node-container relative size-full h-auto w-sm gap-0 rounded-md p-0", className)}
    {...props}
  >
    {handles.target && <Handle position={Position.Left} type="target" />}
    {handles.source && <Handle position={Position.Right} type="source" />}
    {props.children}
  </Card>
);

export const NodeHeader = ({ className, ...props }) => (
  <CardHeader
    className={cn("gap-0.5 rounded-t-md border-b bg-secondary p-3!", className)}
    {...props}
  />
);

export const NodeTitle = (props) => <CardTitle {...props} />;

export const NodeDescription = (props) => <CardDescription {...props} />;

export const NodeAction = (props) => <CardAction {...props} />;

export const NodeContent = ({ className, ...props }) => (
  <CardContent className={cn("p-3", className)} {...props} />
);

export const NodeFooter = ({ className, ...props }) => (
  <CardFooter className={cn("rounded-b-md border-t bg-secondary p-3!", className)} {...props} />
);
