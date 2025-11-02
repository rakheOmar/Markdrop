export default function ContributeSection() {
  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-auto h-auto px-2 py-1.5 sm:px-2.5 sm:py-2 border-l border-b border-[#cecece] dark:border-[#16181d] sm:flex items-center justify-center hidden">
          <span className="font-mono text-[0.55rem] sm:text-[0.65rem] md:text-xs text-black dark:text-white whitespace-nowrap">
            02.
          </span>
        </div>
      </div>
      <div className="border-b border-[#cecece] dark:border-[#16181d] bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] dark:from-[#1a1d23] dark:to-[#0f1115] flex items-center justify-center px-4 md:px-8 py-12 md:py-16">
        <div className="text-center space-y-6 sm:space-y-7 md:space-y-8 px-4 sm:px-6 md:px-8 max-w-3xl">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white">
              Join the Community
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              Help make Markdrop better for everyone. Contribute code, report bugs, or suggest new
              features on GitHub.
            </p>
          </div>
          <a
            href="https://github.com/rakheOmar/Markdrop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-black dark:bg-white text-white dark:text-black font-medium text-sm sm:text-base hover:opacity-90 transition-all duration-200 hover:scale-105"
          >
            <span>View on GitHub</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
