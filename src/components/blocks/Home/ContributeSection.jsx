export default function ContributeSection() {
  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-l border-b border-[#cecece] dark:border-[#16181d] sm:flex items-center justify-center hidden">
          <span className="font-mono text-xs sm:text-sm md:text-base text-black dark:text-white whitespace-nowrap">
            02.
          </span>
        </div>
      </div>
      <div className="border-b border-[#cecece] dark:border-[#16181d] bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] dark:from-[#1a1d23] dark:to-[#0f1115] flex items-center justify-center px-4 md:px-8">
        <div className="text-center space-y-4 sm:space-y-5 md:space-y-6 px-4 sm:px-6 md:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Want to Contribute?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#6b7280] dark:text-[#9ca3af] max-w-2xl">
            Help make Markdrop better. Contribute to the project on GitHub.
          </p>
          <a
            href="https://github.com/rakheOmar/Markdrop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-black dark:bg-white text-white dark:text-black font-mono text-xs sm:text-sm hover:opacity-80 transition-opacity"
          >
            View on GitHub
          </a>
        </div>
      </div>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
