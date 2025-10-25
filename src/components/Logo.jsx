import markdropLogoDark from "@/assets/markdrop_icon_dark.svg";
import markdropLogoLight from "@/assets/markdrop_icon_light.svg";
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
