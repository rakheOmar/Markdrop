import Navbar from "@/components/blocks/Navbar/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full h-screen grid grid-rows-[7vh_58vh_28vh_7vh] grid-cols-[15%_70%_15%]">
      <Navbar />

      <div className="border-r border-b border-[#cecece] dark:border-[#16181d]" />

      <div className="border-b border-[#cecece] dark:border-[#16181d] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            Turn Ideas Into
            <br />
            Beautiful Markdown
          </h1>
          <p className="text-xl text-[#6b7280] dark:text-[#9ca3af]">
            The easiest way to create professional .md files—just write naturally
          </p>
        </div>
      </div>

      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />

      <div className="border-r border-b border-[#cecece] dark:border-[#16181d]" />

      <div className="border-b border-[#cecece] dark:border-[#16181d]" />

      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />

      <Footer />
    </div>
  );
}
