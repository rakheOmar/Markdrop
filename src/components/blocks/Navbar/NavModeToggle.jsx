import { Moon, Sun } from "lucide-react";
import { useCallback } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useThemeTransition } from "@/hooks/useThemeTransition";

export default function NavModeToggle() {
  const { theme, setTheme } = useTheme();
  const { applyCircleExpand } = useThemeTransition();

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    applyCircleExpand(() => setTheme(newTheme), "100", "0");
  }, [theme, setTheme, applyCircleExpand]);

  return (
    <button
      onClick={toggleTheme}
      className="h-[7vh] aspect-square border-r border-[#cecece] dark:border-[#16181d] flex items-center justify-center"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
