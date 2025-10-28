import { Menu, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import markdropIconDark from "@/assets/markdrop_icon_dark.svg";
import markdropIconLight from "@/assets/markdrop_icon_light.svg";
import markdropLogoDark from "@/assets/markdrop_logo_dark.svg";
import markdropLogoLight from "@/assets/markdrop_logo_light.svg";
import HomeModeToggle from "@/components/blocks/Navbar/NavModeToggle";
import { useTheme } from "@/components/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { NAV_LINKS } from "@/config/nav";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] lg:block hidden" />
      <nav className="border-b border-[#cecece] dark:border-[#16181d] flex items-center justify-between px-4 md:px-8 py-4 col-span-3 lg:col-span-1 overflow-hidden max-w-full">
        <img
          src={theme === "dark" ? markdropLogoDark : markdropLogoLight}
          alt="Markdrop Logo"
          className="h-6 md:h-8 w-auto flex-shrink-0 object-contain"
        />

        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-semibold relative transition-colors duration-500 ease-in-out text-sm xl:text-base
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="lg:hidden">
            <button className="p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors flex-shrink-0">
              <Menu className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {NAV_LINKS.map((link) => (
              <DropdownMenuItem key={link.href} asChild>
                <Link
                  to={link.href}
                  className={`cursor-pointer w-full
                    ${currentPath === link.href ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            {/* Theme Toggle */}
            <DropdownMenuItem onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="w-4 h-4 mr-2" />
              ) : (
                <Moon className="w-4 h-4 mr-2" />
              )}
              Switch to {theme === "dark" ? "Light" : "Dark"} Mode
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d] lg:flex items-start hidden">
        <HomeModeToggle />
      </div>
    </>
  );
}
