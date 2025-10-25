import markdropLogoDark from "@/assets/markdrop_logo_dark.svg";
import markdropLogoLight from "@/assets/markdrop_logo_light.svg";
import HomeModeToggle from "@/components/blocks/Navbar/NavModeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { NAV_LINKS } from "@/config/nav";

export default function Navbar() {
  const { theme } = useTheme();
  const currentPath = window.location.pathname;

  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d]" />

      <nav className="border-b border-[#cecece] dark:border-[#16181d] flex items-center justify-between px-8">
        <img
          src={theme === "dark" ? markdropLogoDark : markdropLogoLight}
          alt="Markdrop Logo"
          className="h-8 w-auto"
        />
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={
                currentPath === link.href
                  ? "font-semibold text-black dark:text-white"
                  : "font-semibold text-[#cecece] dark:text-[#cecece]"
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="border-l border-b border-[#cecece] dark:border-[#16181d] flex items-start">
        <HomeModeToggle />
      </div>
    </>
  );
}
