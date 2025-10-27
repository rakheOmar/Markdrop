import { Link, useLocation } from "react-router-dom";
import markdropLogoDark from "@/assets/markdrop_logo_dark.svg";
import markdropLogoLight from "@/assets/markdrop_logo_light.svg";
import HomeModeToggle from "@/components/blocks/Navbar/NavModeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { NAV_LINKS } from "@/config/nav";

export default function Navbar() {
  const { theme } = useTheme();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d]" />
      <nav className="border-b border-[#cecece] dark:border-[#16181d] flex items-center justify-between px-8 py-4">
        <img
          src={theme === "dark" ? markdropLogoDark : markdropLogoLight}
          alt="Markdrop Logo"
          className="h-8 w-auto"
        />
        <div className="flex items-center gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-semibold relative transition-colors duration-500 ease-in-out
                ${
                  currentPath === link.href
                    ? "text-black dark:text-white"
                    : "text-[#9b9b9b] dark:text-[#a0a0a0] hover:text-black dark:hover:text-white"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d] flex items-start">
        <HomeModeToggle />
      </div>
    </>
  );
}
