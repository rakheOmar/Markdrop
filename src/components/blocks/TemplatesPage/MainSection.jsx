import { useState } from "react";
import { Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function MainSection() {
  const templateCount = 12;
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { value: "all", label: "All Templates" },
    { value: "profile", label: "Profile README" },
    { value: "project", label: "Project README" },
    { value: "misc", label: "Miscellaneous" },
  ];

  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-auto h-auto px-2 py-1.5 sm:px-2.5 sm:py-2 border-l border-b border-[#cecece] dark:border-[#16181d] lg:flex items-center justify-center hidden">
          <span className="font-mono text-[0.55rem] sm:text-[0.65rem] md:text-xs text-black dark:text-white whitespace-nowrap">
            templates.md
          </span>
        </div>
      </div>
      <div className="border-b border-[#cecece] dark:border-[#16181d] p-4 sm:p-6 md:p-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold truncate">
              {templateCount} {templateCount === 1 ? "Template" : "Templates"}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="h-8 sm:h-9 md:h-10 px-2 sm:px-2.5 md:px-3 gap-1 sm:gap-1.5 text-xs sm:text-sm"
            >
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Add</span>
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 sm:h-9 md:h-10 w-8 sm:w-9 md:w-10 p-0"
                >
                  <Filter className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="end">
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm">Filter Templates</h4>
                  <RadioGroup value={category} onValueChange={setCategory}>
                    <div className="space-y-3">
                      {categories.map((cat) => (
                        <div key={cat.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={cat.value} id={cat.value} />
                          <Label htmlFor={cat.value} className="text-sm font-normal cursor-pointer">
                            {cat.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </PopoverContent>
            </Popover>
            <Input
              type="text"
              placeholder="Search..."
              className="w-32 sm:w-48 md:w-64 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
