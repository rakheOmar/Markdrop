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
        <div className="relative z-10 flex items-center justify-center h-full px-4 md:px-8">
          <div className="text-center space-y-3 md:space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Turn Ideas Into
              <br />
              Beautiful Markdown
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#6b7280] dark:text-[#9ca3af] px-4 sm:px-0">
              The easiest way to create professional .md files—just write naturally
            </p>
          </div>
        </div>
      </div>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
