export default function FeatureSection() {
  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-l border-b border-[#cecece] dark:border-[#16181d] sm:flex items-center justify-center hidden">
          <span className="font-mono text-xs sm:text-sm md:text-base text-black dark:text-white whitespace-nowrap">
            01.
          </span>
        </div>
      </div>
      <div className="border-b border-[#cecece] dark:border-[#16181d] flex items-center justify-center px-4 md:px-8">
        <div className="text-center space-y-3 md:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Feature Section
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#6b7280] dark:text-[#9ca3af]">WIP</p>
        </div>
      </div>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
