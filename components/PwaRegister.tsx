"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Service Worker EEDSC enregistré avec succès :", registration.scope);
          })
          .catch((err) => {
            console.warn("Échec d'enregistrement Service Worker EEDSC :", err);
          });
      });
    }
  }, []);

  return null;
}
