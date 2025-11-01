import { GithubIcon, Mail01Icon, NewTwitterIcon } from "hugeicons-react";
import { Link } from "react-router-dom";
import markdropIconDark from "@/assets/markdrop_icon_dark.svg";
import markdropIconLight from "@/assets/markdrop_icon_light.svg";
import { useTheme } from "@/components/ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <>
      <div className="border-r border-t border-[#cecece] dark:border-[#16181d] lg:block hidden relative">
        <div className="absolute bottom-1 right-1 hidden sm:flex items-center gap-2 text-xs text-[#6b7280] dark:text-[#9ca3af] font-mono">
          <a
            href="https://github.com/rakheOmar/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black dark:hover:text-white transition-colors"
          >
            rakheOmar
          </a>
        </div>
      </div>

      <footer className="border-t border-[#cecece] dark:border-[#16181d] flex items-center justify-between px-2 sm:px-4 md:px-8 py-2 col-span-3 lg:col-span-1 overflow-hidden">
        <div className="flex items-center gap-2">
          <img
            src={theme === "dark" ? markdropIconDark : markdropIconLight}
            alt="Markdrop Logo"
            className="h-4 sm:h-5 md:h-6 w-auto flex-shrink-0"
          />
        </div>

        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#6b7280] dark:text-[#9ca3af] font-mono">
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

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="https://github.com/rakheOmar/Markdrop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b7280] dark:text-[#9ca3af] hover:text-black dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={14} className="sm:w-4 sm:h-4" />
          </a>
          <a
            href="https://x.com/rakheOmar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b7280] dark:text-[#9ca3af] hover:text-black dark:hover:text-white transition-colors"
            aria-label="X (Twitter)"
          >
            <NewTwitterIcon size={14} className="sm:w-4 sm:h-4" />
          </a>
          <a
            href="mailto:rakheomar@outlook.com"
            className="text-[#6b7280] dark:text-[#9ca3af] hover:text-black dark:hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail01Icon size={14} className="sm:w-4 sm:h-4" />
          </a>
        </div>
      </footer>

      <div className="border-l border-t border-[#cecece] dark:border-[#16181d] relative lg:block hidden">
        <span className="absolute bottom-1 left-1 text-[10px] text-[#6b7280] dark:text-[#9ca3af] font-mono">
          Last updated on: October 30, 2025
        </span>
      </div>
    </>
  );
}
