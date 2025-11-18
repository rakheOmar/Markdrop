import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const ModelSelector = (props) => <Dialog {...props} />;

export const ModelSelectorTrigger = (props) => <DialogTrigger {...props} />;

export const ModelSelectorContent = ({
  className,
  children,
  title = "Model Selector",
  ...props
}) => (
  <DialogContent className={cn("p-0", className)} {...props}>
    <DialogTitle className="sr-only">{title}</DialogTitle>
    <Command className="**:data-[slot=command-input-wrapper]:h-auto">{children}</Command>
  </DialogContent>
);

export const ModelSelectorDialog = (props) => <CommandDialog {...props} />;

export const ModelSelectorInput = ({ className, ...props }) => (
  <CommandInput className={cn("h-auto py-3.5", className)} {...props} />
);

export const ModelSelectorList = (props) => <CommandList {...props} />;

export const ModelSelectorEmpty = (props) => <CommandEmpty {...props} />;

export const ModelSelectorGroup = (props) => <CommandGroup {...props} />;

export const ModelSelectorItem = (props) => <CommandItem {...props} />;

export const ModelSelectorShortcut = (props) => <CommandShortcut {...props} />;

export const ModelSelectorSeparator = (props) => <CommandSeparator {...props} />;

export const ModelSelectorLogo = ({ provider, className, ...props }) => (
  <img
    {...props}
    alt={`${provider} logo`}
    className={cn("size-3 dark:invert", className)}
    height={12}
    src={`https://models.dev/logos/${provider}.svg`}
    width={12}
  />
);

export const ModelSelectorLogoGroup = ({ className, ...props }) => (
  <div
    className={cn(
      "-space-x-1 flex shrink-0 items-center [&>img]:rounded-full [&>img]:bg-background [&>img]:p-px [&>img]:ring-1 dark:[&>img]:bg-foreground",
      className
    )}
    {...props}
  />
);

export const ModelSelectorName = ({ className, ...props }) => (
  <span className={cn("flex-1 truncate text-left", className)} {...props} />
);
