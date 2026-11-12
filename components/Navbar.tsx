"use client";

import React from "react";
import { Flame, BookOpen, Heart, Sparkles, Share2, User, ArrowLeft, ArrowRight } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  streakCount: number;
  userName?: string | null;
  onOpenProfile?: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  onGoBack?: () => void;
  onGoForward?: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  streakCount,
  userName = null,
  onOpenProfile,
  canGoBack = false,
  canGoForward = false,
  onGoBack,
  onGoForward,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#071329]/95 backdrop-blur-md border-b border-amber-500/20 px-3 sm:px-6 md:px-8 py-3 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Navigation History (Retour / Suivant) + Logo & Titre */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Boutons Retour / Suivant (Navigation Historique) */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 shadow-inner">
            <button
              onClick={onGoBack}
              disabled={!canGoBack}
              className={`p-1.5 sm:p-2 rounded-lg transition flex items-center gap-1 ${
                canGoBack
                  ? "bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-white border border-amber-400/40 shadow cursor-pointer active:scale-95"
                  : "text-slate-600 opacity-40 cursor-not-allowed"
              }`}
              title={canGoBack ? "Retour en arrière (Précédent)" : "Aucune page précédente"}
              aria-label="Retour en arrière"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onGoForward}
              disabled={!canGoForward}
              className={`p-1.5 sm:p-2 rounded-lg transition flex items-center gap-1 ${
                canGoForward
                  ? "bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-white border border-amber-400/40 shadow cursor-pointer active:scale-95"
                  : "text-slate-600 opacity-40 cursor-not-allowed"
              }`}
              title={canGoForward ? "Avancer (Suivant)" : "Aucune page suivante"}
              aria-label="Page suivante"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Logo & Titre */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab("today")}>
            <img 
              src="/logo_eedsc.jpg" 
              alt="Logo EEDSC" 
              className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-amber-400/80 shadow-md object-cover ring-2 ring-amber-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base md:text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 font-serif">
                  LECTURE QUOTIDIENNE
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  EEDSC
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden lg:block">
                Église Évangélique de la Délivrance et du Salut en Christ • <span className="text-amber-300 font-semibold">FR | EN | FON | GOUN (Audio)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === "today"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Portion du Jour
          </button>

          <button
            onClick={() => setActiveTab("plans")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === "plans"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Plans de Lecture
          </button>

          <button
            onClick={() => setActiveTab("prayers")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === "prayers"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Heart className="w-4 h-4" />
            Mur de Prière
          </button>

          <button
            onClick={() => setActiveTab("kids")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === "kids"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <span>🧒</span>
            Bible Enfants
          </button>
        </nav>

        {/* Flamme de Streak & Profil */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* User Profile / Connexion Pill */}
          <button
            onClick={onOpenProfile}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm group active:scale-95 cursor-pointer ${
              userName && userName.trim()
                ? "bg-slate-900/90 hover:bg-slate-800 border border-amber-400/50 text-amber-200 hover:text-white"
                : "bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-400/40 text-amber-300 hover:text-amber-100"
            }`}
            title={userName && userName.trim() ? `Bien-aimé(e) : ${userName} (Cliquer pour modifier)` : "Se connecter / S'identifier avec votre prénom"}
          >
            <User className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span suppressHydrationWarning className="max-w-[120px] truncate">
              {userName && userName.trim() ? userName : "Se connecter"}
            </span>
          </button>

          {/* Streak Flame */}
          <div className="hidden xs:flex items-center gap-1.5 bg-gradient-to-r from-orange-500/15 to-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-full text-xs font-bold text-amber-300 shadow-inner">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
            <span suppressHydrationWarning>{streakCount} j</span>
          </div>

          <a
            href="https://wa.me/?text=Rejoins-moi+sur+la+plateforme+Lecture+Quotidienne+EEDSC+pour+m%C3%A9diter+la+Parole+de+Dieu+%21"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            Inviter un ami
          </a>
        </div>

      </div>

      {/* Mobile Bottom Navigation Bar for smartphones */}
      <nav aria-label="Navigation mobile" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#071329]/95 backdrop-blur-lg border-t border-amber-500/30 py-2 px-4 shadow-2xl">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab("today")}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-semibold transition ${
              activeTab === "today"
                ? "text-amber-400 font-bold scale-105"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Portion</span>
          </button>

          <button
            onClick={() => setActiveTab("plans")}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-semibold transition ${
              activeTab === "plans"
                ? "text-amber-400 font-bold scale-105"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Plans</span>
          </button>

          <button
            onClick={() => setActiveTab("prayers")}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-semibold transition ${
              activeTab === "prayers"
                ? "text-amber-400 font-bold scale-105"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Prières</span>
          </button>

          <button
            onClick={() => setActiveTab("kids")}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-semibold transition ${
              activeTab === "kids"
                ? "text-amber-400 font-bold scale-105"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="text-base leading-none">🧒</span>
            <span>Enfants</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
