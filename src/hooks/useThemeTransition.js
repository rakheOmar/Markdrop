import { useCallback } from "react";

export function useThemeTransition() {
  const applyCircleExpand = useCallback((callback, cx = "100", cy = "0") => {
    const styleId = `theme-transition-${Date.now()}`;
    const style = document.createElement("style");
    style.id = styleId;

    const css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: none;
          }
          ::view-transition-new(root) {
            animation: circle-expand 0.4s ease-out;
            transform-origin: ${cx}% ${cy}%;
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
    }, 3000);

    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        callback();
      });
    } else {
      callback();
    }
  }, []);

  return { applyCircleExpand };
}
