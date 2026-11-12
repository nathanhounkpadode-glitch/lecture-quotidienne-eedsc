"use client";

import React, { useState, useEffect } from "react";
import { X, Smartphone, Download, Share2, PlusSquare, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";

interface InstallPwaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstallPwaModal({ isOpen, onClose }: InstallPwaModalProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [installSuccess, setInstallSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if already in standalone mode (already installed)
      const isStandaloneMode = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone;
      setIsStandalone(Boolean(isStandaloneMode));

      // Check iOS detection
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(isAppleDevice);

      // Listen for Chrome/Android install prompt
      const handleBeforeInstall = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstall);
      return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    }
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="max-w-md w-full bg-gradient-to-b from-[#0E234B] via-[#08152D] to-[#060E1E] border-2 border-amber-400/50 rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-6 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Logo */}
        <div className="text-center space-y-3 pt-2">
          <div className="relative inline-block">
            <img
              src="/logo_eedsc.jpg"
              alt="Logo EEDSC"
              className="w-20 h-20 rounded-2xl mx-auto border-2 border-amber-400 shadow-xl object-cover ring-4 ring-amber-500/20"
            />
            <span className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-slate-950 font-black shadow">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-white font-serif">
              Installer l'Application Mobile
            </h3>
            <p className="text-xs text-amber-300 font-medium mt-0.5">
              Lecture Quotidienne EEDSC sur votre Téléphone
            </p>
          </div>
        </div>

        {/* Benefits List */}
        <div className="space-y-2.5 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 text-xs">
          <div className="flex items-center gap-2.5 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Accès immédiat depuis l'écran d'accueil sans passer par le navigateur</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Fonctionne même avec faible connexion Internet (hors-ligne)</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100 % gratuit, sans inscription complexe et sans publicité</span>
          </div>
        </div>

        {/* Install states */}
        {isStandalone ? (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-1">
            <p className="text-xs font-bold text-emerald-300">
              🎉 Félicitations ! L'application est déjà installée sur ton appareil.
            </p>
            <p className="text-[11px] text-slate-400">
              Tu peux y accéder directement depuis tes icônes d'applications.
            </p>
          </div>
        ) : installSuccess ? (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-1">
            <p className="text-xs font-bold text-emerald-300">
              ✅ Application installée avec succès !
            </p>
            <p className="text-[11px] text-slate-400">
              Retrouve l'icône EEDSC sur ton écran d'accueil.
            </p>
          </div>
        ) : isIOS ? (
          /* iOS Step-by-Step Instructions */
          <div className="space-y-3 bg-[#0A1A3A] p-4 rounded-2xl border border-amber-400/30 text-xs">
            <span className="font-bold text-amber-300 block text-center">
              📱 Sur iPhone / iPad (Safari) :
            </span>
            <ol className="space-y-2 text-slate-300 list-decimal list-inside text-[11px] leading-relaxed">
              <li>
                Appuie sur l'icône de <strong className="text-white">Partage <Share2 className="w-3.5 h-3.5 inline text-blue-400" /></strong> en bas de l'écran.
              </li>
              <li>
                Fais défiler et touche <strong className="text-white">« Sur l'écran d'accueil » <PlusSquare className="w-3.5 h-3.5 inline text-emerald-400" /></strong>.
              </li>
              <li>
                Touche <strong className="text-amber-400">« Ajouter »</strong> en haut à droite. C'est tout !
              </li>
            </ol>
          </div>
        ) : deferredPrompt ? (
          /* Direct Android / Chrome Install Button */
          <button
            onClick={handleInstallClick}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl transition active:scale-95"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>Installer l'application maintenant (1 clic)</span>
          </button>
        ) : (
          /* Fallback Android/PC instructions */
          <div className="space-y-2.5 bg-[#0A1A3A] p-4 rounded-2xl border border-slate-800 text-xs text-center">
            <Smartphone className="w-6 h-6 text-amber-400 mx-auto" />
            <p className="font-bold text-white">
              Installation sur Android / Ordinateur
            </p>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Appuie sur le menu du navigateur (les <strong className="text-amber-300">3 points ⋮</strong> en haut à droite) et choisis <strong className="text-white">« Installer l'application »</strong> ou <strong className="text-white">« Ajouter à l'écran d'accueil »</strong>.
            </p>
          </div>
        )}

        <div className="text-center pt-1">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition"
          >
            Fermer et continuer la lecture
          </button>
        </div>

      </div>
    </div>
  );
}
