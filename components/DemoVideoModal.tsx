"use client";

import React, { useState } from "react";
import { X, Play, Smartphone, User, Sparkles, CheckCircle2, BookOpen, ExternalLink, HelpCircle, Film, ArrowRight, ShieldCheck, Heart } from "lucide-react";

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartOnboarding: () => void;
  videoSrc?: string; // Optional custom video URL (e.g., MP4 or YouTube embed)
}

export default function DemoVideoModal({
  isOpen,
  onClose,
  onStartOnboarding,
  videoSrc,
}: DemoVideoModalProps) {
  const [activeTab, setActiveTab] = useState<"video" | "steps">("video");
  const [isPlayingSimulated, setIsPlayingSimulated] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full bg-gradient-to-b from-[#0B1A35] via-[#071329] to-[#040914] border-2 border-amber-400/50 rounded-3xl p-5 sm:p-7 shadow-2xl relative space-y-5 text-slate-100"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 transition cursor-pointer"
          title="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            Tutoriel & Démo
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 font-serif">
            Comment se connecter sur EEDSC ?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Guide pas-à-pas pour créer votre profil, choisir votre plan et méditer chaque jour.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-950/80 rounded-2xl border border-slate-800 max-w-sm mx-auto">
          <button
            type="button"
            onClick={() => setActiveTab("video")}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
              activeTab === "video"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Démo Vidéo
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("steps")}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
              activeTab === "steps"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Guide en 4 étapes
          </button>
        </div>

        {/* CONTENT TAB 1: VIDEO */}
        {activeTab === "video" && (
          <div className="space-y-4">
            {videoSrc ? (
              /* If a custom video URL is provided */
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-amber-400/30 bg-slate-950 shadow-inner">
                {videoSrc.includes("youtube.com") || videoSrc.includes("youtu.be") ? (
                  <iframe
                    src={videoSrc}
                    title="Tutoriel Connexion EEDSC"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={videoSrc}
                    controls
                    className="w-full h-full object-cover"
                    poster="/logo_eedsc.jpg"
                  />
                )}
              </div>
            ) : (
              /* Interactive Animated Video Mockup Player */
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-amber-400/40 bg-gradient-to-br from-[#071329] to-[#02050D] flex flex-col items-center justify-center p-6 text-center shadow-xl group">
                {/* Background glow & decorative elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

                {!isPlayingSimulated ? (
                  <div className="space-y-3 z-10 max-w-md">
                    <button
                      type="button"
                      onClick={() => setIsPlayingSimulated(true)}
                      className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 hover:scale-110 active:scale-95 transition-all cursor-pointer group-hover:ring-4 group-hover:ring-amber-400/30"
                    >
                      <Play className="w-8 h-8 fill-slate-950 ml-1" />
                    </button>
                    <div>
                      <h3 className="font-bold text-base text-amber-200">
                        Démonstration animée de connexion
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Découvrez comment entrer votre prénom, configurer votre plan de lecture et enregistrer vos progrès.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Animated Walkthrough Screen */
                  <div className="w-full h-full flex flex-col justify-between p-4 z-10 animate-fadeIn">
                    <div className="flex items-center justify-between text-xs text-amber-300 pb-2 border-b border-slate-800">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" /> Simulation Démo EEDSC
                      </span>
                      <button
                        onClick={() => setIsPlayingSimulated(false)}
                        className="text-slate-400 hover:text-white text-[11px] underline"
                      >
                        Recommencer
                      </button>
                    </div>

                    <div className="my-auto space-y-3 max-w-sm mx-auto bg-slate-900/90 p-4 rounded-2xl border border-amber-400/40 shadow-2xl">
                      <div className="text-left space-y-1">
                        <label className="text-[11px] font-bold text-amber-300">1. Votre Prénom</label>
                        <div className="p-2 bg-slate-950 rounded-lg border border-amber-500/50 text-xs text-white font-medium flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-amber-400" />
                          <span className="typing-demo font-mono">Nathan Schalom</span>
                        </div>
                      </div>
                      <div className="text-left space-y-1">
                        <label className="text-[11px] font-bold text-amber-300">2. Votre Âge</label>
                        <div className="p-2 bg-slate-950 rounded-lg border border-slate-700 text-xs text-white font-medium flex items-center gap-2">
                          <span>🎂</span>
                          <span className="font-mono">22 ans (Mode Adulte Activé)</span>
                        </div>
                      </div>
                      <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-400/30 text-[11px] text-amber-200 text-center font-bold">
                        ✅ Plan recommandé : La Bible en 1 an (Ancien + Nouveau Testament)
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400">
                      Vos lectures quotidiennes et streaks sont mémorisés automatiquement sur votre appareil !
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Link to Official YouTube Channel */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                Chaîne officielle YouTube de l'Église :
              </span>
              <a
                href="https://www.youtube.com/@eedscbenin9997"
                target="_blank"
                rel="noreferrer"
                className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 transition"
              >
                @eedscbenin9997 <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* CONTENT TAB 2: STEP BY STEP GUIDE */}
        {activeTab === "steps" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
            
            {/* Step 1 */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-amber-400/30 transition">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] border border-amber-400/40">1</span>
                <span>Accéder à la plateforme</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ouvrez le lien officiel sur votre smartphone ou ordinateur : <strong className="text-amber-300">lecture-quotidienne-eedsc.vercel.app</strong> (ou scannez le QR code projeté à l'église).
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-amber-400/30 transition">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] border border-amber-400/40">2</span>
                <span>Cliquer sur « Se connecter »</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                En haut à droite de l'écran, cliquez sur le bouton <strong className="text-amber-300">« Se connecter »</strong>. Saisissez votre prénom et votre âge (aucun mot de passe complexe n'est requis).
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-amber-400/30 transition">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] border border-amber-400/40">3</span>
                <span>Choisir son Parcours Biblique</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sélectionnez le plan idéal (ex: <em>La Bible en 1 An</em>). Vous pouvez écouter la version audio en <strong>Français, Fongbé ou Goun</strong>.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-amber-400/30 transition">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] border border-amber-400/40">4</span>
                <span>Installer sur son Smartphone</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cliquez sur <strong>« Installer l'application »</strong> pour ajouter l'icône EEDSC sur votre écran d'accueil et ne plus jamais retaper le lien !
              </p>
            </div>

          </div>
        )}

        {/* Action Button: Start Connection */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onStartOnboarding();
            }}
            className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-500 active:scale-98 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>J'ai compris, me connecter maintenant !</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
