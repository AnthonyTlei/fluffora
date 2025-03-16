"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js").then(
        (registration) => {
          console.log("Service Worker registered:", registration);
        },
        (error) => {
          console.error("Service Worker registration failed:", error);
        },
      );
    }
  }, []);

  return null;
}
