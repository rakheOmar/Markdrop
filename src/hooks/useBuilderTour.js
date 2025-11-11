import { driver } from "driver.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import "driver.js/dist/driver.css";

const TOUR_COMPLETED_KEY = "markdrop-builder-tour-completed";

export function useBuilderTour() {
  const [tourCompleted, setTourCompleted] = useState(() => {
    return localStorage.getItem(TOUR_COMPLETED_KEY) === "true";
  });

  const driverObj = useMemo(() => {
    const width = window.innerWidth;

    const showStats = width >= 1024;
    const showUndo = width >= 1280;
    const showImport = width >= 1024;
    const showSave = width >= 768;

    const steps = [
      {
        popover: {
          title: "Welcome to Markdrop Builder! 🎉",
          description:
            "Let's take a quick tour of the builder interface. This will help you get started creating beautiful markdown documents.",
          side: "over",
        },
      },
      {
        element: "#builder-sidebar-trigger",
        popover: {
          title: "Elements Sidebar",
          description:
            "Click here to open the sidebar containing all available markdown elements. You can drag elements from here into your document or double-click to add them.",
          side: width >= 1024 ? "right" : "bottom",
          align: "start",
        },
      },
      {
        element: "#builder-tabs",
        popover: {
          title: "View Modes",
          description:
            "Switch between Editor (drag & drop interface), Raw (markdown code), and Preview (final rendered output) modes.",
          side: "bottom",
          align: "center",
        },
      },
    ];

    if (showStats) {
      steps.push({
        element: "#builder-stats",
        popover: {
          title: "Document Statistics",
          description:
            "Track your document's reading time, word count, and character count in real-time.",
          side: "bottom",
          align: "start",
        },
      });
    }

    if (showUndo) {
      steps.push({
        element: "#builder-undo-btn",
        popover: {
          title: "Undo & Redo",
          description:
            "Made a mistake? Use these buttons or keyboard shortcuts (Ctrl+Z / Ctrl+Y) to undo or redo your changes.",
          side: "bottom",
          align: "start",
        },
      });
    }

    if (showImport) {
      steps.push({
        element: "#builder-import-btn",
        popover: {
          title: "Import Existing Files",
          description:
            "Import markdown (.md) or text (.txt) files to continue editing them in Markdrop.",
          side: "bottom",
          align: "center",
        },
      });
    }

    if (showSave) {
      steps.push({
        element: "#builder-save-btn",
        popover: {
          title: "Save Your Work",
          description:
            "Save your document to your account. You can access it later from your profile. Use Ctrl+S as a shortcut!",
          side: "bottom",
          align: "end",
        },
      });
    }

    const hiddenFeatures = [];
    if (!showStats) hiddenFeatures.push("document statistics");
    if (!showImport) hiddenFeatures.push("import files");
    if (!showSave) hiddenFeatures.push("save your work");
    if (!showUndo) hiddenFeatures.push("undo/redo changes");

    let menuDescription =
      "Export your document as Markdown, PDF, or HTML. You can also reset the editor or switch themes from here.";

    if (hiddenFeatures.length > 0) {
      menuDescription = `Open this menu to ${hiddenFeatures.join(", ")}, and export your document. You can also switch themes or reset the editor from here.`;
    }

    steps.push({
      element: "#builder-menu-btn",
      popover: {
        title: hiddenFeatures.length > 0 ? "Menu & Tools" : "More Options",
        description: menuDescription,
        side: "left",
        align: "start",
      },
    });

    steps.push(
      {
        element: "#builder-content-area",
        popover: {
          title: "Your Canvas",
          description:
            "This is where you'll build your document. Drag elements here, reorder them by dragging, and click to edit their content.",
          side: "top",
          align: "center",
        },
      },
      {
        popover: {
          title: "You're All Set! 🚀",
          description:
            "Start creating amazing markdown documents! If you need to see this tutorial again, you can find it in the menu.",
          side: "over",
        },
      }
    );

    const driverInstance = driver({
      showProgress: true,
      animate: true,
      smoothScroll: true,
      allowClose: true,
      overlayOpacity: 0.7,
      popoverClass: "driverjs-theme",
      stagePadding: 4,
      steps,
      onDestroyed: () => {
        localStorage.setItem(TOUR_COMPLETED_KEY, "true");
        setTourCompleted(true);
      },
    });

    return driverInstance;
  }, []);

  const startTour = useCallback(() => {
    driverObj.drive();
  }, [driverObj]);

  const resetTour = useCallback(() => {
    localStorage.removeItem(TOUR_COMPLETED_KEY);
    setTourCompleted(false);
  }, []);

  useEffect(() => {
    if (!tourCompleted) {
      const timer = setTimeout(() => {
        driverObj.drive();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [tourCompleted, driverObj]);

  return {
    startTour,
    resetTour,
    tourCompleted,
  };
}
