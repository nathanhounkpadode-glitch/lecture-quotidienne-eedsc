"use client";

import React, { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import VerseCard from "@/components/VerseCard";
import PlanSelector from "@/components/PlanSelector";
import PrayerWall from "@/components/PrayerWall";
import BibleReaderModal from "@/components/BibleReaderModal";
import KidsBible from "@/components/KidsBible";
import UserOnboardingModal, { UserProfile } from "@/components/UserOnboardingModal";
import DemoVideoModal from "@/components/DemoVideoModal";
import UserFeedbackModal from "@/components/UserFeedbackModal";
import AnnualCalendarModal from "@/components/AnnualCalendarModal";
import { TODAY_PORTIONS_DATA, READING_PLANS, ReadingMode, BIBLE_BOOKS_SUMMARY, getDayOfYear, formatDateFrench, getDayPortions } from "@/data/readingPlans";
import { CheckCircle2, Clock, BookOpen, Flame, Trophy, Scroll, Compass, ChevronRight, Layers, Sparkles, RotateCcw, Calendar, Edit3, Star, MessageSquarePlus, ArrowLeft, ArrowRight, WifiOff, History, BookMarked, Check, Film } from "lucide-react";

function formatPassagesSummary(passages: { book: string; chapter: number }[]) {
  if (!passages || passages.length === 0) return "";
  const byBook: { [book: string]: number[] } = {};
  passages.forEach((p) => {
    if (!byBook[p.book]) byBook[p.book] = [];
    byBook[p.book].push(p.chapter);
  });
  return Object.entries(byBook)
    .map(([book, chapters]) => {
      if (chapters.length === 1) return `${book} ${chapters[0]}`;
      const min = Math.min(...chapters);
      const max = Math.max(...chapters);
      return `${book} ${min} à ${max}`;
    })
    .join(" • ");
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("today");
  const [navHistory, setNavHistory] = useState<string[]>(["today"]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [currentPlanId, setCurrentPlanId] = useState<string>("plan-12-mois");
  const [readingMode, setReadingMode] = useState<ReadingMode>("linear");
  const [streakCount, setStreakCount] = useState<number>(12);
  const [timingMode, setTimingMode] = useState<"personal" | "calendar">("personal");
  const [userStartDate, setUserStartDate] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // Connection status listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < navHistory.length - 1;

  const navigateToTab = (newTab: string) => {
    if (newTab === activeTab) return;
    const nextHistory = navHistory.slice(0, historyIndex + 1);
    nextHistory.push(newTab);
    setNavHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setActiveTab(newTab);
    if (typeof window !== "undefined") {
      window.history.pushState({ tab: newTab }, "", `#${newTab}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGoBack = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      setActiveTab(navHistory[prevIdx]);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleGoForward = () => {
    if (historyIndex < navHistory.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setActiveTab(navHistory[nextIdx]);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  // Sync with browser back/forward buttons and hash navigation
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.tab) {
        setActiveTab(e.state.tab);
      } else if (window.location.hash) {
        const h = window.location.hash.replace("#", "");
        if (["today", "plans", "prayers", "kids"].includes(h)) {
          setActiveTab(h);
        }
      }
    };
    const handleHashChange = () => {
      if (window.location.hash) {
        const h = window.location.hash.replace("#", "");
        if (["today", "plans", "prayers", "kids"].includes(h)) {
          setActiveTab(h);
        }
      }
    };
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Initialize hash and personalized start date on first visit
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      // Check initial URL hash
      if (window.location.hash) {
        const h = window.location.hash.replace("#", "");
        if (["today", "plans", "prayers", "kids"].includes(h)) {
          setActiveTab(h);
        }
      }

      const savedProfile = localStorage.getItem("eedsc_user_profile");
      if (savedProfile) {
        try {
          setUserProfile(JSON.parse(savedProfile));
        } catch (e) {}
      }

      const savedStart = localStorage.getItem("eedsc_user_start_date");
      const savedMode = (localStorage.getItem("eedsc_timing_mode") as "personal" | "calendar") || "personal";
      const savedPlan = localStorage.getItem("eedsc_user_plan_id");
      if (savedPlan) setCurrentPlanId(savedPlan);
      setTimingMode(savedMode);

      if (savedMode === "calendar") {
        setSelectedDay(getDayOfYear());
      } else if (savedStart) {
        setUserStartDate(savedStart);
        const startMs = new Date(savedStart).getTime();
        const diffDays = Math.max(1, Math.floor((Date.now() - startMs) / 86400000) + 1);
        setSelectedDay(diffDays);
      } else {
        const todayIso = new Date().toISOString().slice(0, 10);
        localStorage.setItem("eedsc_user_start_date", todayIso);
        setUserStartDate(todayIso);
        setSelectedDay(1);
      }
    }
  }, []);

  const handleResetToDayOne = () => {
    if (typeof window !== "undefined") {
      const todayIso = new Date().toISOString().slice(0, 10);
      localStorage.setItem("eedsc_user_start_date", todayIso);
      localStorage.setItem("eedsc_timing_mode", "personal");
      setUserStartDate(todayIso);
      setTimingMode("personal");
      setSelectedDay(1);
    }
  };

  const handleSaveProfile = (profile: UserProfile, suggestedTab?: string) => {
    setUserProfile(profile);
    if (typeof window !== "undefined") {
      localStorage.setItem("eedsc_user_profile", JSON.stringify(profile));
    }
    setIsOnboardingOpen(false);
    if (suggestedTab) {
      navigateToTab(suggestedTab);
    }
  };

  const handleSelectPlan = (planId: string, startDayOne = true) => {
    setCurrentPlanId(planId);
    if (typeof window !== "undefined") {
      localStorage.setItem("eedsc_user_plan_id", planId);
    }
    if (startDayOne) {
      handleResetToDayOne();
    }
    navigateToTab("today");
  };

  const handleSwitchTimingMode = (mode: "personal" | "calendar") => {
    setTimingMode(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("eedsc_timing_mode", mode);
    }
    if (mode === "calendar") {
      setSelectedDay(getDayOfYear());
    } else {
      if (userStartDate) {
        const startMs = new Date(userStartDate).getTime();
        const diffDays = Math.max(1, Math.floor((Date.now() - startMs) / 86400000) + 1);
        setSelectedDay(diffDays);
      } else {
        handleResetToDayOne();
      }
    }
  };
  
  const currentPlan = READING_PLANS.find((p) => p.id === currentPlanId) || READING_PLANS[3];
  const totalPlanDays = Math.round(currentPlan.durationMonths * 30.42);
  const currentPortions = useMemo(() => {
    return getDayPortions(selectedDay, currentPlan.durationMonths);
  }, [selectedDay, currentPlan.durationMonths]);
  const bibleReadPct = Math.min(100, Math.max(1, Math.round((selectedDay / totalPlanDays) * 100)));

  // Passages state depending on mode
  const [linearPassages, setLinearPassages] = useState(currentPortions.linearPassages);
  const [balancedPassages, setBalancedPassages] = useState(currentPortions.balancedPassages);

  // Sync passages with selected day and reading mode
  useEffect(() => {
    const key = `eedsc_progress_d${selectedDay}_${readingMode}`;
    const saved = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (readingMode === "linear") setLinearPassages(parsed);
        else setBalancedPassages(parsed);
        return;
      } catch (e) {}
    }
    setLinearPassages(currentPortions.linearPassages);
    setBalancedPassages(currentPortions.balancedPassages);
  }, [selectedDay, readingMode, currentPortions]);

  // Active reading modal state
  const [isReaderOpen, setIsReaderOpen] = useState<boolean>(false);
  const [activePassageIndex, setActivePassageIndex] = useState<number>(0);

  const activePassages = readingMode === "linear" ? linearPassages : balancedPassages;
  const completedCount = activePassages.filter((p) => p.completed).length;
  const isDayFinished = completedCount === activePassages.length;

  const saveDayProgress = (updated: any[]) => {
    if (typeof window !== "undefined") {
      const key = `eedsc_progress_d${selectedDay}_${readingMode}`;
      localStorage.setItem(key, JSON.stringify(updated));
    }
  };

  // Open reader at specific passage and mark as in progress
  const handleOpenReader = (index: number) => {
    setActivePassageIndex(index);
    if (readingMode === "linear") {
      const updated = [...linearPassages];
      if (!updated[index].completed) {
        updated[index].inProgress = true;
        setLinearPassages(updated);
        saveDayProgress(updated);
      }
    } else {
      const updated = [...balancedPassages];
      if (!updated[index].completed) {
        updated[index].inProgress = true;
        setBalancedPassages(updated);
        saveDayProgress(updated);
      }
    }
    setIsReaderOpen(true);
  };

  // AUTOMATIC VALIDATION: validate current and jump to next
  const handleValidateAndNext = (currentIndex: number) => {
    if (readingMode === "linear") {
      const updated = [...linearPassages];
      updated[currentIndex].completed = true;
      updated[currentIndex].inProgress = false;
      setLinearPassages(updated);
      saveDayProgress(updated);
    } else {
      const updated = [...balancedPassages];
      updated[currentIndex].completed = true;
      updated[currentIndex].inProgress = false;
      setBalancedPassages(updated);
      saveDayProgress(updated);
    }
    setActivePassageIndex(currentIndex + 1);
  };

  // AUTOMATIC VALIDATION: validate last chapter and finish day
  const handleValidateAndFinish = (currentIndex: number) => {
    if (readingMode === "linear") {
      const updated = [...linearPassages];
      updated[currentIndex].completed = true;
      updated[currentIndex].inProgress = false;
      setLinearPassages(updated);
      saveDayProgress(updated);
    } else {
      const updated = [...balancedPassages];
      updated[currentIndex].completed = true;
      updated[currentIndex].inProgress = false;
      setBalancedPassages(updated);
      saveDayProgress(updated);
    }
    setIsReaderOpen(false);
  };

  // Compute past days list for the history section
  const pastDaysList = useMemo(() => {
    const list = [];
    const maxPast = Math.min(selectedDay, 14);
    for (let d = 1; d <= maxPast; d++) {
      const port = getDayPortions(d, currentPlan.durationMonths);
      list.push({
        dayNumber: d,
        theme: port.theme,
        dateStr: port.dateStr,
        summary: formatPassagesSummary(readingMode === "linear" ? port.linearPassages : port.balancedPassages),
      });
    }
    return list;
  }, [selectedDay, currentPlan.durationMonths, readingMode]);

  return (
    <div className="min-h-screen bg-[#040914] text-slate-100 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={navigateToTab}
        streakCount={streakCount}
        userName={userProfile?.firstName ? userProfile.firstName : null}
        onOpenProfile={() => setIsOnboardingOpen(true)}
        onOpenVideoDemo={() => setIsVideoModalOpen(true)}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
      />

      {/* Network Disconnection / Connection Cut Banner */}
      {!isOnline && (
        <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 shadow-lg animate-pulse">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>
            🔴 Connexion internet coupée : Mode Hors-Ligne activé ! Vos textes bibliques et vos plans restent 100% accessibles.
          </span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 pb-24 md:pb-12 space-y-8">

        {/* Universal Back & Forward Navigation Sub-Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800/80 px-4 py-2.5 rounded-2xl text-xs backdrop-blur-md shadow-md">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleGoBack}
              disabled={!canGoBack}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                canGoBack
                  ? "bg-slate-800 hover:bg-slate-750 text-amber-300 border border-amber-400/30 shadow active:scale-95 cursor-pointer"
                  : "bg-slate-950/40 text-slate-600 border border-slate-800/40 cursor-not-allowed"
              }`}
              title="Retourner à la page précédente"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>◀ Retour</span>
            </button>

            <button
              type="button"
              onClick={handleGoForward}
              disabled={!canGoForward}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                canGoForward
                  ? "bg-slate-800 hover:bg-slate-750 text-amber-300 border border-amber-400/30 shadow active:scale-95 cursor-pointer"
                  : "bg-slate-950/40 text-slate-600 border border-slate-800/40 cursor-not-allowed"
              }`}
              title="Avancer à la page suivante"
            >
              <span>Suivant ▶</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="hidden sm:flex items-center gap-1.5 ml-2 text-slate-400">
              <span className="text-slate-600">•</span>
              <span>Section active :</span>
              <span className="font-extrabold text-amber-400">
                {activeTab === "today"
                  ? "📖 Portion du Jour"
                  : activeTab === "plans"
                  ? "✨ Plans de Lecture"
                  : activeTab === "prayers"
                  ? "🙏 Mur de Prière"
                  : "🧒 Bible Enfants"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCalendarModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-extrabold shadow transition active:scale-95 text-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>📅 Calendrier Annuel (365 jours)</span>
            </button>

            {activeTab !== "today" && (
              <button
                type="button"
                onClick={() => navigateToTab("today")}
                className="text-[11px] px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1"
              >
                <span>🏠 Accueil</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1 : PORTION DU JOUR */}
        {activeTab === "today" && (
          <div className="space-y-10 animate-fadeIn">
            
            {/* Top Welcome Banner & Streak Progress */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Daily Streak & Overall Progress Card */}
              <div className="relative overflow-hidden lg:col-span-2 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0E234B] via-[#09152B] to-[#0E234B] border border-amber-500/30 shadow-xl space-y-6">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity pointer-events-none"
                  style={{ backgroundImage: "url('/bg_verse_sanctuary.png')" }}
                />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
                        Jour {currentPortions.dayNumber} / {totalPlanDays}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setSelectedDay((d) => Math.max(1, d - 1))}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition"
                          title="Jour précédent"
                        >
                          ◀ J-{Math.max(1, selectedDay - 1)}
                        </button>
                        {selectedDay !== (timingMode === "calendar" ? getDayOfYear() : Math.max(1, Math.floor((Date.now() - new Date(userStartDate || new Date().toISOString().slice(0, 10)).getTime()) / 86400000) + 1)) && (
                          <button
                            type="button"
                            onClick={() => {
                              if (timingMode === "calendar") {
                                setSelectedDay(getDayOfYear());
                              } else if (userStartDate) {
                                const diff = Math.max(1, Math.floor((Date.now() - new Date(userStartDate).getTime()) / 86400000) + 1);
                                setSelectedDay(diff);
                              } else {
                                setSelectedDay(1);
                              }
                            }}
                            className="px-2.5 py-0.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] transition shadow"
                            title="Revenir à mon jour actuel"
                          >
                            Aujourd'hui
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setSelectedDay((d) => Math.min(totalPlanDays, d + 1))}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition"
                          title="Jour suivant"
                        >
                          J+{Math.min(totalPlanDays, selectedDay + 1)} ▶
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <h1 suppressHydrationWarning className="text-2xl md:text-3xl font-extrabold text-white font-serif">
                        {userProfile?.firstName
                          ? `Bonjour ${userProfile.firstName} ! 🙏`
                          : "Bienvenue sur Lecture Quotidienne EEDSC ! 🙏"}
                      </h1>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setIsOnboardingOpen(true)}
                          className="p-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-700/80 transition shadow cursor-pointer"
                          title={userProfile?.firstName ? "Modifier mon profil" : "Se connecter avec votre prénom"}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsVideoModalOpen(true)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 text-xs font-semibold transition cursor-pointer shadow-sm active:scale-95"
                          title="Voir le tutoriel vidéo pour se connecter"
                        >
                          <Film className="w-3.5 h-3.5 text-amber-400" />
                          <span>Démo Vidéo</span>
                        </button>
                      </div>
                    </div>
                    <p suppressHydrationWarning className="text-xs text-slate-400 mt-0.5">
                      {currentPortions.dateStr} • <span className="text-amber-300 font-medium">{currentPortions.theme}</span>
                    </p>

                    {/* Mode Rythme Personnel vs Calendrier Annuel */}
                    <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-slate-800/60">
                      <div className="flex items-center gap-1.5 bg-slate-950/70 px-2.5 py-1 rounded-xl border border-slate-800 text-[11px]">
                        {timingMode === "personal" ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-amber-300 font-semibold">Rythme Personnel</span>
                            <span className="text-slate-400 text-[10px]">({userStartDate ? `Début le ${userStartDate}` : "Jour 1"})</span>
                          </>
                        ) : (
                          <>
                            <Calendar className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-blue-300 font-semibold">Calendrier Annuel</span>
                            <span className="text-slate-400 text-[10px]">(Jour {getDayOfYear()}/365)</span>
                          </>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsCalendarModalOpen(true)}
                        className="text-[11px] font-bold px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 transition shadow flex items-center gap-1.5 active:scale-95 cursor-pointer"
                        title="Ouvrir le calendrier annuel complet (365 jours)"
                      >
                        <Calendar className="w-3.5 h-3.5 text-slate-950" />
                        <span>📅 Ouvrir Calendrier Annuel (12 Mois)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSwitchTimingMode(timingMode === "personal" ? "calendar" : "personal")}
                        className="text-[11px] px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition"
                        title="Basculer entre Rythme Personnel et Jour Civil"
                      >
                        {timingMode === "personal" ? "Basculer sur Jour Civil" : "Basculer sur Mon Rythme"}
                      </button>

                      <button
                        type="button"
                        onClick={handleResetToDayOne}
                        className="text-[11px] px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 transition flex items-center gap-1"
                        title="Réinitialiser mon départ à aujourd'hui (Jour 1)"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Démarrer à Jour 1</span>
                      </button>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl text-center">
                      <div className="flex items-center gap-1 text-orange-400 font-extrabold text-lg">
                        <Flame className="w-5 h-5 fill-orange-400 animate-pulse" />
                        {streakCount}
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Jours consécutifs</span>
                    </div>

                    <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl text-center">
                      <div className="text-amber-400 font-extrabold text-lg">
                        {bibleReadPct}%
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Bible lue</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">
                      Progression du jour : <strong>{completedCount} / {activePassages.length} chapitres lus</strong>
                    </span>
                    <span className="text-amber-400 font-bold">
                      {Math.round((completedCount / activePassages.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500 shadow"
                      style={{ width: `${(completedCount / activePassages.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Congratulation banner if completed */}
                {isDayFinished && (
                  <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-xs text-emerald-300 font-medium animate-bounce">
                    <Trophy className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Gloire à Dieu ! Tu as complété toute ta lecture biblique d'aujourd'hui. Ta flamme de méditation est préservée !</span>
                  </div>
                )}
              </div>

              {/* Current Active Plan Badge */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#09152B] border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Plan Actif
                  </span>
                  <h3 className="text-xl font-bold text-white font-serif">
                    {currentPlan.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentPlan.description}
                  </p>
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-amber-300 font-semibold">
                    {currentPlan.chaptersPerDay}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab("plans")}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition"
                >
                  <span>Changer la durée (3, 6, 9 ou 12 mois)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </section>

            {/* SÉLECTEUR DE MODE DE LECTURE (CHRONOLOGIQUE VS ÉQUILIBRÉ) */}
            <section className="p-6 rounded-3xl bg-gradient-to-r from-[#0A1835] via-[#071329] to-[#0A1835] border border-amber-500/40 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Choix de ton Parcours de Lecture
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sélectionne la méthode qui nourrit le mieux ton âme au quotidien.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setReadingMode("linear")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                      readingMode === "linear"
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Scroll className="w-4 h-4" />
                    <span>De Genèse à Apocalypse</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReadingMode("balanced")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                      readingMode === "balanced"
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>L'Alliance Quotidienne (Mixte)</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                {readingMode === "linear" ? (
                  <span>
                    <strong>Mode Chronologique Linéaire :</strong> Vous lisez les 66 livres dans l'ordre biblique, chapitre par chapitre. Aujourd'hui : <strong className="text-amber-300">{formatPassagesSummary(linearPassages)}</strong>.
                  </span>
                ) : (
                  <span>
                    <strong>Mode Alliance Quotidienne :</strong> Chaque jour, une portion d'Ancien Testament (l'Histoire), un Psaume (la Prière) et le Nouveau Testament (Jésus et la Grâce). Aujourd'hui : <strong className="text-amber-300">{formatPassagesSummary(balancedPassages)}</strong>.
                  </span>
                )}
              </div>
            </section>

            {/* Verset du Jour Multilingue (FR, EN, FON, GOUN) */}
            <section>
              <VerseCard theme={currentPortions.theme} verseOfDay={currentPortions.verseOfDay} />
            </section>

            {/* Passages Bibliques à Lire Aujourd'hui */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white font-serif">
                    Portion Biblique du Jour ({readingMode === "linear" ? "Parcours Genèse à Apocalypse" : "Parcours Alliance Quotidienne"})
                  </h2>
                  <p className="text-xs text-slate-400">
                    🔒 La validation se fait automatiquement au fil de votre lecture intégrale dans la Bible !
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-400/30 rounded-xl text-xs text-amber-300 font-semibold self-start sm:self-auto">
                  <span>🎧 Audio Studio HD en 4 langues : FR • EN • FON • GOUN</span>
                </div>
              </div>

              {/* Passages Cards with 3 Dynamic States & High-Contrast Colors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {activePassages.map((passage, idx) => {
                  const isCompleted = passage.completed;
                  const isInProgress = passage.inProgress && !isCompleted;

                  return (
                    <div
                      key={idx}
                      className={`p-6 rounded-3xl border transition-all duration-300 shadow-lg flex flex-col justify-between space-y-4 ${
                        isCompleted
                          ? "bg-gradient-to-br from-[#062419] to-[#0A162D] border-emerald-500/60 shadow-emerald-500/10"
                          : isInProgress
                          ? "bg-gradient-to-br from-[#2D1602] to-[#09152B] border-amber-400/80 ring-2 ring-amber-400/20 shadow-amber-500/10 animate-pulse"
                          : "bg-[#09152B] border-slate-800 hover:border-amber-500/40"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                            {passage.category}
                          </span>

                          {/* 3 Explicit Visual States */}
                          {isCompleted ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/50 shadow-sm">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              Validé
                            </span>
                          ) : isInProgress ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-200 bg-amber-500/25 px-2.5 py-0.5 rounded-full border border-amber-400/60 shadow-sm">
                              <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "6s" }} />
                              Lecture coupée / En cours
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] font-medium text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
                              <Clock className="w-3 h-3 text-slate-400" />
                              À lire
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-white font-serif">
                          {passage.reference}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {passage.book} • Chapitre {passage.chapter}
                        </p>
                      </div>

                      {/* Open / Resume Reader Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenReader(idx)}
                        className={`w-full py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition active:scale-95 ${
                          isCompleted
                            ? "bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40"
                            : isInProgress
                            ? "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/25"
                            : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold shadow-md"
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>
                          {isCompleted
                            ? "Relire le chapitre"
                            : isInProgress
                            ? "Reprendre la lecture là où ça s'est coupé ▶"
                            : "Commencer la lecture"}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION HISTORIQUE PASSÉ DES MÉDITATIONS */}
            <section className="p-6 md:p-8 rounded-3xl bg-[#09152B] border border-amber-500/30 space-y-6 shadow-xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
                    <History className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-serif">
                      📜 Historique des Méditations Passées & Jours Précédents
                    </h3>
                    <p className="text-xs text-slate-400">
                      Consultez vos portions lues des jours antérieurs, relisez un chapitre ou rattrapez une journée.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-300 font-bold">
                    Plan : {currentPlan.title}
                  </span>
                </div>
              </div>

              {/* Past days selector cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastDaysList.map((item) => {
                  const isCurrent = item.dayNumber === selectedDay;

                  return (
                    <div
                      key={item.dayNumber}
                      onClick={() => setSelectedDay(item.dayNumber)}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 ${
                        isCurrent
                          ? "bg-gradient-to-br from-[#0B1E40] to-[#08152C] border-amber-400/80 ring-2 ring-amber-400/30 shadow-lg"
                          : "bg-slate-900/80 border-slate-800 hover:border-amber-400/50 hover:bg-slate-850"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          Jour {item.dayNumber}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {item.dateStr}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white font-serif line-clamp-1">
                          {item.theme}
                        </h4>
                        <p className="text-xs text-amber-300/90 font-medium line-clamp-2">
                          📖 {item.summary}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-400 text-[11px]">
                          {isCurrent ? "Jour sélectionné" : "Cliquer pour réviser"}
                        </span>
                        <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                          Ouvrir ➔
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Explorateur des 66 Livres de la Bible */}
            <section className="p-6 md:p-8 rounded-3xl bg-[#09152B] border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-serif">
                    Table des 66 Livres de la Sainte Bible
                  </h3>
                  <p className="text-xs text-slate-400">
                    De Genèse à Apocalypse : 39 livres de l'Ancien Testament et 27 livres du Nouveau Testament (1 189 chapitres).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BIBLE_BOOKS_SUMMARY.map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-300">{sec.section}</span>
                      <span className="text-[10px] text-slate-500">{sec.count}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {sec.books.map((b) => (
                        <span key={b} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 hover:text-amber-300 hover:bg-slate-750 transition cursor-pointer">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* TAB 2 : PLANS DE LECTURE */}
        {activeTab === "plans" && (
          <PlanSelector
            currentPlanId={currentPlanId}
            onSelectPlan={handleSelectPlan}
            userStartDate={userStartDate}
            onResetToDayOne={handleResetToDayOne}
          />
        )}

        {/* TAB 3 : MUR DE PRIÈRE */}
        {activeTab === "prayers" && (
          <PrayerWall defaultUserName={userProfile?.firstName} />
        )}

        {/* TAB 4 : BIBLE ENFANTS */}
        {activeTab === "kids" && (
          <KidsBible />
        )}

      </main>

      {/* Bible Reader Modal with AUTOMATIC validation & next chapter jump */}
      {isReaderOpen && (
        <BibleReaderModal
          passageIndex={activePassageIndex}
          passagesList={activePassages}
          isOpen={isReaderOpen}
          onClose={() => setIsReaderOpen(false)}
          onValidateAndNext={handleValidateAndNext}
          onValidateAndFinish={handleValidateAndFinish}
          onGoToPassage={(newIdx) => setActivePassageIndex(newIdx)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#071329] py-8 px-4 text-center text-xs text-slate-500 space-y-3">
        <div className="flex items-center justify-center gap-3">
          <img src="/logo_eedsc.jpg" alt="Logo" className="w-6 h-6 rounded-full opacity-80" />
          <span className="font-semibold text-slate-400">Lecture Quotidienne EEDSC</span>
        </div>
        <p>Plateforme spirituelle d'édification • Église Évangélique de la Délivrance et du Salut en Christ (Cotonou, Bénin)</p>
        <p className="text-[11px] text-slate-600">Développé par Nathan Schalom Hounkpadode • Epitech Tek2</p>

        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={() => setIsFeedbackModalOpen(true)}
            className="px-4 py-2 rounded-full bg-slate-900/90 hover:bg-slate-850 text-amber-300 border border-amber-400/30 text-xs font-bold transition flex items-center gap-2 shadow"
          >
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Donner mon avis & Témoignage d'édification</span>
          </button>
        </div>
      </footer>

      {/* Onboarding Profile Modal */}
      {isOnboardingOpen && (
        <UserOnboardingModal
          isOpen={isOnboardingOpen}
          initialProfile={userProfile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setIsOnboardingOpen(false)}
          onOpenVideoDemo={() => setIsVideoModalOpen(true)}
          canCloseWithoutSaving={true}
        />
      )}

      {/* Demo Video & Connection Guide Modal */}
      {isVideoModalOpen && (
        <DemoVideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          onStartOnboarding={() => setIsOnboardingOpen(true)}
        />
      )}

      {/* User Feedback & Testimonies Modal */}
      {isFeedbackModalOpen && (
        <UserFeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
          defaultUserName={userProfile?.firstName || ""}
        />
      )}

      {/* Interactive Annual Reading Calendar Modal */}
      {isCalendarModalOpen && (
        <AnnualCalendarModal
          isOpen={isCalendarModalOpen}
          onClose={() => setIsCalendarModalOpen(false)}
          selectedDay={selectedDay}
          onSelectDay={(day) => {
            setSelectedDay(day);
            setIsCalendarModalOpen(false);
          }}
          planDurationMonths={currentPlan.durationMonths}
          readingMode={readingMode}
        />
      )}
    </div>
  );
}
