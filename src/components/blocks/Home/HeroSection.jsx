import Squares from "../../Squares";

export default function HeroSection() {
  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d]" />
      <div className="border-b border-[#cecece] dark:border-[#16181d] relative">
        <div className="absolute inset-0">
          <Squares
            direction="diagonal"
            speed={0.2}
            borderColor="#cecece"
            darkBorderColor="#16181d"
            squareSize={35}
            hoverFillColor="#000000"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
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
      </div>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
