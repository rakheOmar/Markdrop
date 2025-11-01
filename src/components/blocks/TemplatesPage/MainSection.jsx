import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MainSection() {
  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-auto h-auto px-3 py-2 border-l border-b border-[#cecece] dark:border-[#16181d] flex items-center justify-center">
          <span className="font-mono text-sm text-black dark:text-white whitespace-nowrap">
            Templates
          </span>
        </div>
      </div>
      <div className="border-b border-[#cecece] dark:border-[#16181d] flex items-start justify-between px-4 md:px-8 py-4">
        <Tabs defaultValue="all">
          <TabsList className="bg-transparent gap-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="landing">Profile README</TabsTrigger>
            <TabsTrigger value="portfolio">Project README</TabsTrigger>
            <TabsTrigger value="blog">Misc</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative">
          <Input type="text" placeholder="Search templates..." className="w-64" />
        </div>
      </div>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
