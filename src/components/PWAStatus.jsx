import { useEffect, useState } from "react";

export function PWAStatus() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstallable(false);
      setDeferredPrompt(null);
    }
  };

  // Don't show anything if already installed
  if (isInstalled) {
    return null;
  }

  // Show install button if installable
  if (isInstallable) {
    return (
      <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
        <div className="flex items-center gap-2">
          <span className="text-sm">Install Markdrop</span>
          <button
            onClick={handleInstallClick}
            className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm transition-colors"
          >
            Install
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// Service Worker registration status (for development)
export function SWStatus() {
  const [swStatus, setSWStatus] = useState("checking");

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then(() => setSWStatus("ready"))
        .catch(() => setSWStatus("error"));
    } else {
      setSWStatus("not-supported");
    }
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const statusColors = {
    checking: "bg-yellow-500",
    ready: "bg-green-500",
    error: "bg-red-500",
    "not-supported": "bg-gray-500",
  };

  const statusTexts = {
    checking: "SW: Checking...",
    ready: "SW: Ready",
    error: "SW: Error",
    "not-supported": "SW: Not Supported",
  };

  return (
    <div className="fixed top-4 left-4 z-40">
      <div className={`${statusColors[swStatus]} text-white px-2 py-1 rounded text-xs`}>
        {statusTexts[swStatus]}
      </div>
    </div>
  );
}
