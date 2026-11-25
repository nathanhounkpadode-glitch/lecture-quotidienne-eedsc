"use client";

import React, { useState, useEffect } from "react";
import { X, Volume2, CheckCircle2, Share2, Headphones, ArrowRight, ArrowLeft, Trophy } from "lucide-react";
import { MULTILANG_BIBLE, SupportedLang } from "@/data/bibleContent";
import { PassageItem } from "@/data/readingPlans";
import AudioPlayerBar from "@/components/AudioPlayerBar";

interface BibleReaderModalProps {
  passageIndex: number;
  passagesList: PassageItem[];
  isOpen: boolean;
  onClose: () => void;
  onValidateAndNext: (currentIndex: number) => void;
  onValidateAndFinish: (currentIndex: number) => void;
  onGoToPassage: (newIndex: number) => void;
}

export default function BibleReaderModal({
  passageIndex,
  passagesList,
  isOpen,
  onClose,
  onValidateAndNext,
  onValidateAndFinish,
  onGoToPassage,
}: BibleReaderModalProps) {
  const [selectedLang, setSelectedLang] = useState<SupportedLang>("fr");
  const [fontSize, setFontSize] = useState<number>(18);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [dynamicChapter, setDynamicChapter] = useState<{ fr: any[]; en: any[]; fon?: any[]; goun?: any[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const currentPassage = passagesList[passageIndex] || passagesList[0];
  const isLastChapter = passageIndex === passagesList.length - 1;
  const isFirstChapter = passageIndex === 0;

  useEffect(() => {
    if (!isOpen || !currentPassage) return;
    setLoading(true);
    fetch(`/api/bible/chapter?ref=${encodeURIComponent(currentPassage.reference)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.fr && data.fr.length > 0) {
          setDynamicChapter(data);
        } else {
          setDynamicChapter(null);
        }
      })
      .catch(() => setDynamicChapter(null))
      .finally(() => setLoading(false));
  }, [isOpen, currentPassage?.reference]);

  if (!isOpen) return null;

  // Find chapter in data
  const chapterData = MULTILANG_BIBLE[currentPassage.reference] || MULTILANG_BIBLE["Genèse 1"];
  const currentTranslation = chapterData.translations[selectedLang] || chapterData.translations.fr;
  const displayedVerses = (() => {
    if (dynamicChapter) {
      if (selectedLang === "en" && dynamicChapter.en && dynamicChapter.en.length > 0) {
        return dynamicChapter.en;
      }
      if (selectedLang === "fon" && dynamicChapter.fon && dynamicChapter.fon.length > 0) {
        return dynamicChapter.fon;
      }
      if (selectedLang === "goun" && dynamicChapter.goun && dynamicChapter.goun.length > 0) {
        return dynamicChapter.goun;
      }
      return dynamicChapter.fr;
    }
    return currentTranslation.verses;
  })();

  const handleToggleAudio = () => {
    if ("speechSynthesis" in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const textToRead = displayedVerses.map((v: any) => `${v.num}. ${v.text}`).join(" ");
        const utterance = new SpeechSynthesisUtterance(textToRead);
        
        if (selectedLang === "en") {
          utterance.lang = "en-US";
        } else {
          utterance.lang = "fr-FR";
        }
        utterance.rate = 0.9;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);

        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      alert("La lecture audio n'est pas supportée sur ce navigateur.");
    }
  };

  const languages: { key: SupportedLang; label: string; flag: string }[] = [
    { key: "fr", label: "Français", flag: "🇫🇷" },
    { key: "en", label: "English", flag: "🇬🇧" },
    { key: "fon", label: "Fongbé", flag: "🇧🇯" },
    { key: "goun", label: "Goun", flag: "🇧🇯" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0A162D] border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-[#071329]/95 space-y-3">
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  {currentTranslation.langName}
                </span>
                <span className="text-[10px] font-bold text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
                  Étape {passageIndex + 1} sur {passagesList.length}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <Headphones className="w-2.5 h-2.5" /> Audio Disponible
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white font-serif mt-1">
                {currentPassage.reference}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {/* Font size adjustments */}
              <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
                <button
                  onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                  className="px-2 py-1 hover:bg-slate-800 rounded text-slate-300 font-bold"
                  title="Diminuer la police"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize(Math.min(26, fontSize + 2))}
                  className="px-2 py-1 hover:bg-slate-800 rounded text-slate-300 font-bold"
                  title="Agrandir la police"
                >
                  A+
                </button>
              </div>

              {/* Close */}
              <button
                onClick={() => {
                  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                  setIsPlayingAudio(false);
                  onClose();
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 4 Languages Selector Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            
            {/* Lang Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
              {languages.map((l) => (
                <button
                  key={l.key}
                  onClick={() => {
                    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                    setIsPlayingAudio(false);
                    setSelectedLang(l.key);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                    selectedLang === l.key
                      ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>

            <span className="text-[11px] text-amber-300 font-medium">
              Voix active : <strong>{currentTranslation.langName}</strong>
            </span>
          </div>

          {/* Full Interactive Audio Player Bar */}
          <div className="pt-2">
            <AudioPlayerBar
              chapterRef={currentPassage.reference}
              selectedLang={selectedLang}
              langName={currentTranslation.langName}
            />
          </div>

        </div>

        {/* Modal Scrollable Text Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-4 text-slate-100 leading-relaxed font-sans">
          
          {/* Note for Mother Tongues (Fongbe & Goun) */}
          {(selectedLang === "fon" || selectedLang === "goun") && (
            <div className="p-3.5 bg-amber-500/10 border border-amber-400/30 rounded-2xl flex items-center gap-2.5 text-xs text-amber-300">
              <Headphones className="w-4 h-4 shrink-0" />
              <span>
                <strong>Version Audio {currentTranslation.langName} :</strong> Écoutez les passages clés de ce chapitre dans votre langue maternelle.
              </span>
            </div>
          )}

          {loading ? (
            <div className="py-12 text-center text-amber-400 animate-pulse text-sm">
              Chargement du texte biblique en cours...
            </div>
          ) : (
            displayedVerses.map((v: any) => (
              <p key={v.num} style={{ fontSize: `${fontSize}px` }} className="hover:bg-amber-500/5 p-2 rounded-lg transition leading-relaxed">
                <sup className="text-amber-400 font-bold mr-2 text-xs select-none">
                  {v.num}
                </sup>
                {v.text}
              </p>
            ))
          )}
        </div>

        {/* Modal Footer Actions - AUTOMATIC VALIDATION & NEXT CHAPTER */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#071329] flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            {!isFirstChapter && (
              <button
                onClick={() => {
                  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                  setIsPlayingAudio(false);
                  onGoToPassage(passageIndex - 1);
                }}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-800 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Chapitre précédent
              </button>
            )}

            <button
              onClick={() => {
                const text = `Je médite actuellement ${currentPassage.reference} (${currentTranslation.langName}) sur Lecture Quotidienne EEDSC !\n\n👉 https://lecture-quotidienne-eedsc.vercel.app`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
              }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition"
            >
              <Share2 className="w-4 h-4" />
              Partager
            </button>
          </div>

          {/* NEXT / COMPLETE BUTTON WITH AUTOMATIC VALIDATION */}
          {!isLastChapter ? (
            <button
              onClick={() => {
                if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                setIsPlayingAudio(false);
                onValidateAndNext(passageIndex);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition"
            >
              <span>Valider {currentPassage.reference} & Chapitre Suivant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                setIsPlayingAudio(false);
                onValidateAndFinish(passageIndex);
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 active:scale-95 transition"
            >
              <Trophy className="w-4 h-4" />
              <span>Valider & Terminer la Lecture du Jour 🎉</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
