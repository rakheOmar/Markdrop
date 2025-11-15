import markdropLogoDark from "@/assets/markdrop_logo_dark.svg";
import markdropLogoLight from "@/assets/markdrop_logo_light.svg";
import markdropIconDark from "@/assets/markdrop_icon_dark.svg";
import markdropIcoLight from "@/assets/markdrop_icon_light.svg";
import { useTheme } from "@/components/ThemeProvider";

export const Logo = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <img
      src={isDarkMode ? markdropLogoDark : markdropLogoLight}
      alt="Markdrop Logo"
      className="h-9 w-auto object-contain"
    />
  );
};

export const Icon = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <img
      src={isDarkMode ? markdropIconDark : markdropIcoLight}
      alt="Markdrop Logo"
      className="h-9 w-auto object-contain"
    />
  );
};
