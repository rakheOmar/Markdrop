import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function NavModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

 return (
  <button
    style={{ cursor: "pointer" }}
    onClick={toggleTheme}
    className="
      h-[7vh] aspect-square border-r border-[#cecece] dark:border-[#16181d]
      flex items-center justify-center
      transition-transform duration-200
      hover:scale-108
    "
    aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
  >
    {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
  </button>
);

}
