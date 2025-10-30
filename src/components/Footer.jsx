import { FavouriteIcon, GithubIcon, Mail01Icon, NewTwitterIcon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  // PWA install state
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstallable(false);
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      <div className="border-r border-t border-2 relative border-[#cecece] dark:border-[#16181d]">
        <div className="absolute bottom-1 right-1 hidden sm:flex items-center gap-2 text-xs text-[#6b7280] dark:text-[#9ca3af] font-mono">
          <a
            href="https://github.com/rakheOmar/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black dark:hover:text-white transition-colors"
          ></a>
        </div>
      </div>

      <footer className="border-t border-[#cecece] px-4 py-2  sm:py-4 w-full border-2 dark:border-[#16181d] cursor-pointer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-col lg:flex-row items-center lg:items-start justify-between gap-4">
          {/* Left: Logo (always left-aligned) */}
          {/* <div className="flex justify-start items-center w-full lg:w-auto">
            <img
              src={theme === 'dark' ? markdropIconDark : markdropIconLight}
              alt="Markdrop Logo"
              className="h-5 w-auto"
            />
          </div> */}

          {/* ✅ Mobile-only “Install Now” button (functional PWA) */}
          {isInstallable && (
            <div className="flex sm:hidden justify-center w-full mb-2">
              <button
                onClick={handleInstallClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm 
                           transition-colors duration-200 ease-in-out cursor-pointer"
              >
                Install Now
              </button>
            </div>
          )}

          {/* Middle: Social Icons */}
          <div className="flex justify-center lg:justify-center items-center gap-4 flex-wrap w-full lg:w-auto  p-1 ">
            <a
              href="https://github.com/rakheOmar/Markdrop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b7280] dark:text-[#9ca3af] hover:text-black dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://x.com/rakheOmar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b7280] dark:text-[#9ca3af] hover:text-black dark:hover:text-white transition-colors"
              aria-label="X (Twitter)"
            >
              <NewTwitterIcon size={18} />
            </a>
            <a
              href="mailto:rakheomar@outlook.com"
              className="text-[#6b7280] dark:text-[#9ca3af] hover:text-black dark:hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail01Icon size={18} />
            </a>
          </div>

          {/* Right: Privacy Links */}
          <div className="flex flex-wrap justify-center  gap-2 text-xs text-[#6b7280] dark:text-[#9ca3af] font-mono lg:justify-end w-full lg:w-auto  pt-0 sm:pt-2">
            <Link
              to="/privacy-policy"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              to="/terms-of-services"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Last updated (centered for all screens) */}
        <div className="text-center text-[12px] text-[#6b7280] dark:text-[#9ca3af] font-mono mt-2 md:mt-4 md:pt-2 pb-2 sm:pb-0">
          Last updated on: October 30, 2025
        </div>
      </footer>

      {/* 
      <div className="border-l border-t border-[#cecece] dark:border-[#16181d] relative lg:block hidden">
        <span className="absolute bottom-1 left-1 text-[10px] text-[#6b7280] dark:text-[#9ca3af] font-mono">
          Last updated on: October 30, 2025
        </span>
      </div> 
      */}
    </>
  );
}
