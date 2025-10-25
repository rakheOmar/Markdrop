import { GithubIcon, Mail01Icon, NewTwitterIcon, FavouriteIcon } from "hugeicons-react";
import markdropIconDark from "@/assets/markdrop_icon_dark.svg";
import markdropIconLight from "@/assets/markdrop_icon_light.svg";
import { useTheme } from "@/components/ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <>
      <div className="border-r border-[#cecece] dark:border-[#16181d]" />

      <footer className="border-[#cecece] dark:border-[#16181d] flex items-center justify-between px-8">
        <img
          src={theme === "dark" ? markdropIconDark : markdropIconLight}
          alt="Markdrop Logo"
          className="h-6 w-auto"
        />

        <div className="flex items-center gap-2 text-sm text-[#6b7280] dark:text-[#9ca3af]">
          <span>Created with</span>
          <FavouriteIcon size={15} />
          <span>by rakheOmar</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/rakheOmar/Markdrop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b7280] dark:text-[#9ca3af] hover:text-black dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://x.com/rakheOmar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b7280] dark:text-[#9ca3af] hover:text-black dark:hover:text-white transition-colors"
            aria-label="X (Twitter)"
          >
            <NewTwitterIcon size={20} />
          </a>
          <a
            href="mailto:rakheomar@outlook.com"
            className="text-[#6b7280] dark:text-[#9ca3af] hover:text-black dark:hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail01Icon size={20} />
          </a>
        </div>
      </footer>

      <div className="border-l border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
