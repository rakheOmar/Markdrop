import { cn } from "@/lib/utils";

export const Image = ({ base64, uint8Array, mediaType, ...props }) => (
  <img
    {...props}
    alt={props.alt}
    className={cn("h-auto max-w-full overflow-hidden rounded-md", props.className)}
    src={`data:${mediaType};base64,${base64}`}
  />
);
