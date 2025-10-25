export default function HomeFeatures() {
  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative">
        <div className="absolute top-0 right-0 w-12 h-12 border-l border-b border-[#cecece] dark:border-[#16181d] flex items-center justify-center">
          <span className="font-mono text-sm text-black dark:text-white">01.</span>
        </div>
      </div>
      <div className="border-b border-[#cecece] dark:border-[#16181d] grid grid-rows-4">
        <div className="border-b border-[#cecece] dark:border-[#16181d] flex">
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="font-mono text-4xl font-bold">01</div>
            <h3 className="text-xl font-semibold">Step One</h3>
            <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">Feature description</p>
          </div>
          <div className="aspect-square h-full border-l border-[#cecece] dark:border-[#16181d] bg-[#f3f4f6] dark:bg-[#1a1d23] flex items-center justify-center">
            <span className="text-xs text-[#6b7280] dark:text-[#9ca3af]">Image</span>
          </div>
        </div>
        <div className="border-b border-[#cecece] dark:border-[#16181d] flex">
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="font-mono text-4xl font-bold">02</div>
            <h3 className="text-xl font-semibold">Step Two</h3>
            <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">Feature description</p>
          </div>
          <div className="aspect-square h-full border-l border-[#cecece] dark:border-[#16181d] bg-[#f3f4f6] dark:bg-[#1a1d23] flex items-center justify-center">
            <span className="text-xs text-[#6b7280] dark:text-[#9ca3af]">Image</span>
          </div>
        </div>
        <div className="border-b border-[#cecece] dark:border-[#16181d] flex">
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="font-mono text-4xl font-bold">03</div>
            <h3 className="text-xl font-semibold">Step Three</h3>
            <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">Feature description</p>
          </div>
          <div className="aspect-square h-full border-l border-[#cecece] dark:border-[#16181d] bg-[#f3f4f6] dark:bg-[#1a1d23] flex items-center justify-center">
            <span className="text-xs text-[#6b7280] dark:text-[#9ca3af]">Image</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="font-mono text-4xl font-bold">04</div>
            <h3 className="text-xl font-semibold">Step Four</h3>
            <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">Feature description</p>
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
