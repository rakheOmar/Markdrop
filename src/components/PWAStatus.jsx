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

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Handle when app gets installed
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

  if (isInstalled) return null;

  if (isInstallable) {
    return (
      <button
        onClick={handleInstallClick}
        className="hidden sm:flex fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 
                   text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm 
                   transition-colors duration-200 ease-in-out cursor-pointer"
      >
        Install Markdrop
      </button>
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

  if (process.env.NODE_ENV !== "development") return null;

  const statusColors = {
    checking: "bg-yellow-500",
    ready: "bg-green-500",
    error: "bg-red-500",
    "not-supported": "bg-gray-500",
  };

  const statusTitles = {
    checking: "Service Worker: Checking...",
    ready: "Service Worker: Ready",
    error: "Service Worker: Error",
    "not-supported": "Service Worker: Not Supported",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50" title={statusTitles[swStatus]}>
      <div className={`${statusColors[swStatus]} w-4 h-4 rounded-full`} />
    </div>
  );
}
