import markdropLogoDark from "@/assets/markdrop_logo_dark.svg";
import markdropLogoLight from "@/assets/markdrop_logo_light.svg";
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
