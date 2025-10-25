export default function ContributeSection() {
  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative">
        <div className="absolute top-0 right-0 w-12 h-12 border-l border-b border-[#cecece] dark:border-[#16181d] flex items-center justify-center">
          <span className="font-mono text-sm text-black dark:text-white">02.</span>
        </div>
      </div>
      <div className="border-b border-[#cecece] dark:border-[#16181d] bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] dark:from-[#1a1d23] dark:to-[#0f1115] flex items-center justify-center">
        <div className="text-center space-y-6 px-8">
          <h2 className="text-4xl font-bold tracking-tight">Want to Contribute?</h2>
          <p className="text-lg text-[#6b7280] dark:text-[#9ca3af] max-w-2xl">
            Help make Markdrop better. Contribute to the project on GitHub.
          </p>
          <a
            href="https://github.com/rakheOmar/Markdrop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-mono text-sm hover:opacity-80 transition-opacity"
          >
            View on GitHub
          </a>
        </div>
      </div>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
