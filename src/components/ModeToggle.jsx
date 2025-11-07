import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [optimisticTheme, setOptimisticTheme] = useState(theme);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    setOptimisticTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    if (isToggling) return;
    const newTheme = theme === "dark" ? "light" : "dark";
    setOptimisticTheme(newTheme);
    setIsToggling(true);

    const styleId = `theme-transition-${Date.now()}`;
    const style = document.createElement("style");
    style.id = styleId;

    const cx = "100";
    const cy = "0";
    const css = `
      @supports (view-transition-name: root) {
        ::view-transition-old(root) {
          animation: none;
        }
        ::view-transition-new(root) {
          animation: circle-expand 0.35s ease-out;
          transform-origin: top right;
        }
        @keyframes circle-expand {
          from {
            clip-path: circle(0% at ${cx}% ${cy}%);
          }
          to {
            clip-path: circle(150% at ${cx}% ${cy}%);
          }
        }
      }
    `;

    style.textContent = css;
    document.head.appendChild(style);

    setTimeout(() => {
      const styleEl = document.getElementById(styleId);
      if (styleEl) {
        styleEl.remove();
      }
      setIsToggling(false);
    }, 700);

    if ("startViewTransition" in document) {
      document.startViewTransition(() => setTheme(newTheme));
    } else {
      setTheme(newTheme);
    }
  }, [theme, setTheme, isToggling]);

  return (
    <Button
      style={{ cursor: "pointer" }}
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden transition-transform active:scale-95 hover:scale-110 h-8 w-8"
      aria-label={`Switch to ${optimisticTheme === "light" ? "dark" : "light"} theme`}
      aria-pressed={optimisticTheme === "dark"}
      title={`Switch to ${optimisticTheme === "light" ? "dark" : "light"} theme`}
    >
      {optimisticTheme === "light" ? (
        <Sun className="h-[1.1rem] w-[1.1rem]" />
      ) : (
        <Moon className="h-[1.1rem] w-[1.1rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
