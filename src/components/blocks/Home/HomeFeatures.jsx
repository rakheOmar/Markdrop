export default function HomeFeatures() {
  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-auto h-auto px-2 py-1.5 sm:px-2.5 sm:py-2 border-l border-b border-[#cecece] dark:border-[#16181d] sm:flex items-center justify-center hidden">
          <span className="font-mono text-[0.55rem] sm:text-[0.65rem] md:text-xs text-black dark:text-white whitespace-nowrap">
            01.
          </span>
        </div>
      </div>
      <div className="border-b border-[#cecece] dark:border-[#16181d] grid grid-rows-4">
        <div className="border-b border-[#cecece] dark:border-[#16181d] flex">
          <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3 md:space-y-4">
            <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold">01</div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold">Drag & Drop</h3>
            <p className="text-xs sm:text-sm text-[#6b7280] dark:text-[#9ca3af]">
              Simply drag markdown blocks from the sidebar and drop them into your editor
            </p>
          </div>
          <div className="aspect-square h-full border-l border-[#cecece] dark:border-[#16181d] bg-[#f3f4f6] dark:bg-[#1a1d23] flex items-center justify-center">
            <span className="text-xs text-[#6b7280] dark:text-[#9ca3af]">Image</span>
          </div>
        </div>
        <div className="border-b border-[#cecece] dark:border-[#16181d] flex">
          <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3 md:space-y-4">
            <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold">02</div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold">Edit in Real-Time</h3>
            <p className="text-xs sm:text-sm text-[#6b7280] dark:text-[#9ca3af]">
              Edit your content with instant feedback as you type and arrange blocks
            </p>
          </div>
          <div className="aspect-square h-full border-l border-[#cecece] dark:border-[#16181d] bg-[#f3f4f6] dark:bg-[#1a1d23] flex items-center justify-center">
            <span className="text-xs text-[#6b7280] dark:text-[#9ca3af]">Image</span>
          </div>
        </div>
        <div className="border-b border-[#cecece] dark:border-[#16181d] flex">
          <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3 md:space-y-4">
            <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold">03</div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold">Preview Live</h3>
            <p className="text-xs sm:text-sm text-[#6b7280] dark:text-[#9ca3af]">
              See exactly how your markdown will look with real-time preview rendering
            </p>
          </div>
          <div className="aspect-square h-full border-l border-[#cecece] dark:border-[#16181d] bg-[#f3f4f6] dark:bg-[#1a1d23] flex items-center justify-center">
            <span className="text-xs text-[#6b7280] dark:text-[#9ca3af]">Image</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3 md:space-y-4">
            <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold">04</div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold">Export Anywhere</h3>
            <p className="text-xs sm:text-sm text-[#6b7280] dark:text-[#9ca3af]">
              Export your work as markdown, HTML, or PDF ready for GitHub and beyond
            </p>
          </div>
          <div className="aspect-square h-full border-l border-[#cecece] dark:border-[#16181d] bg-[#f3f4f6] dark:bg-[#1a1d23] flex items-center justify-center">
            <span className="text-xs text-[#6b7280] dark:text-[#9ca3af]">Image</span>
          </div>
        </div>
      </div>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
