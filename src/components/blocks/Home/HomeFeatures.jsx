export default function HomeFeatures() {
  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden bg-gradient-to-br from-transparent to-[#f9fafb] dark:to-[#0f1115]">
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-l border-b border-[#cecece] dark:border-[#16181d] sm:flex items-center justify-center hidden backdrop-blur-sm">
          <span className="font-mono text-xs sm:text-sm md:text-base text-black dark:text-white whitespace-nowrap">
            01.
          </span>
        </div>
      </div>
      {/* Features grid */}
      <div className="border-b border-[#cecece] dark:border-[#16181d] grid grid-rows-4">
        {/* Feature 1 */}
        <div className="border-b border-[#cecece] dark:border-[#16181d] flex group hover:bg-[#fafbfc] dark:hover:bg-[#0d0f13] transition-colors duration-300">
          <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3 md:space-y-4">
            <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
              01
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold group-hover:text-[#3b82f6] dark:group-hover:text-[#8b5cf6] transition-colors duration-300">
              Live Markdown Preview
            </h3>
            <p className="text-xs sm:text-sm text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              Edit markdown and instantly preview the formatted output — no refresh, no lag.
            </p>
          </div>
          <div className="aspect-square h-full border-l border-[#cecece] dark:border-[#16181d] bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] dark:from-[#1a1d23] dark:to-[#0f1115] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3b82f6]/5 to-[#8b5cf6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-xs font-medium text-[#3b82f6] dark:text-[#8b5cf6] relative z-10 tracking-wider">LIVE PREVIEW</span>
          </div>
        </div>
        {/* Feature 2 */}
        <div className="border-b border-[#cecece] dark:border-[#16181d] flex group hover:bg-[#fafbfc] dark:hover:bg-[#0d0f13] transition-colors duration-300">
          <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3 md:space-y-4">
            <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-[#10b981] to-[#06b6d4] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
              02
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold group-hover:text-[#10b981] dark:group-hover:text-[#06b6d4] transition-colors duration-300">
              Folder & File Management
            </h3>
            <p className="text-xs sm:text-sm text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              Organize your markdowns into folders, rename or delete them from your profile — all synced securely in your database.
            </p>
          </div>
          <div className="aspect-square h-full border-l border-[#cecece] dark:border-[#16181d] bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] dark:from-[#1a1d23] dark:to-[#0f1115] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#10b981]/5 to-[#06b6d4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-xs font-medium text-[#10b981] dark:text-[#06b6d4] relative z-10 tracking-wider">ORGANIZED</span>
          </div>
        </div>
        {/* Feature 3 */}
        <div className="border-b border-[#cecece] dark:border-[#16181d] flex group hover:bg-[#fafbfc] dark:hover:bg-[#0d0f13] transition-colors duration-300">
          <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3 md:space-y-4">
            <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-[#f59e0b] to-[#ef4444] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
              03
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold group-hover:text-[#f59e0b] dark:group-hover:text-[#ef4444] transition-colors duration-300">
              Dark Mode & Theming
            </h3>
            <p className="text-xs sm:text-sm text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              Write comfortably in any environment with automatic dark/light mode.
            </p>
          </div>
          <div className="aspect-square h-full border-l border-[#cecece] dark:border-[#16181d] bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] dark:from-[#1a1d23] dark:to-[#0f1115] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#f59e0b]/5 to-[#ef4444]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-xs font-medium text-[#f59e0b] dark:text-[#ef4444] relative z-10 tracking-wider">ADAPTIVE</span>
          </div>
        </div>
        {/* Feature 4 */}
        <div className="flex group hover:bg-[#fafbfc] dark:hover:bg-[#0d0f13] transition-colors duration-300">
          <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3 md:space-y-4">
            <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-[#ec4899] to-[#8b5cf6] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
              04
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold group-hover:text-[#ec4899] dark:group-hover:text-[#8b5cf6] transition-colors duration-300">
              Secure Cloud Sync
            </h3>
            <p className="text-xs sm:text-sm text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
              All your notes are backed up in the cloud via Supabase — accessible anywhere, anytime.
            </p>
          </div>
          <div className="aspect-square h-full border-l border-[#cecece] dark:border-[#16181d] bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] dark:from-[#1a1d23] dark:to-[#0f1115] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ec4899]/5 to-[#8b5cf6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-xs font-medium text-[#ec4899] dark:text-[#8b5cf6] relative z-10 tracking-wider">SYNCED</span>
          </div>
        </div>
      </div>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}