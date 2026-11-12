"use client";

import React, { useState, useRef } from "react";
import { Share2, Copy, Check, Sparkles, Pause, Play, Volume2 } from "lucide-react";
import { MULTILANG_DAILY_VERSES, MULTILANG_KEY_VERSES, SupportedLang } from "@/data/bibleContent";

interface VerseCardProps {
  theme: string;
  verseOfDay?: {
    reference: string;
    text: string;
  };
}

export default function VerseCard({ theme, verseOfDay }: VerseCardProps) {
  const [lang, setLang] = useState<SupportedLang>("fr");
  const [copied, setCopied] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Match the specific verse for EVERY language (FR, EN, FON, GOUN)
  const targetRef = verseOfDay?.reference || "Jean 8:36";
  const matchedEntry = MULTILANG_KEY_VERSES[targetRef];

  const currentVerse = matchedEntry
    ? matchedEntry[lang]
    : {
        reference: targetRef,
        text: verseOfDay?.text || "Si donc le Fils vous affranchit, vous serez réellement libres.",
        langLabel:
          lang === "fr"
            ? "Louis Segond (ABU)"
            : lang === "en"
            ? "King James Version (KJV)"
            : lang === "fon"
            ? "Fongbé (Biblu Wiwe)"
            : "Goun (Porto-Novo)",
      };

  const audioSrc = lang === "en" ? "/audio_jean8_36_en.mp3" : "/audio_jean8_36_fr.mp3";

  const handleCopy = () => {
    const fullText = `« ${currentVerse.text} » (${currentVerse.reference}) [${currentVerse.langLabel}] • Lecture Quotidienne EEDSC`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const message = `✨ *Verset du Jour • EEDSC* ✨\n\n« ${currentVerse.text} »\n\n📖 *${currentVerse.reference}*\n_Thème : ${theme}_\n\n🎧 Écoute et médite sur : https://lecture-eedsc.org`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const playSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(currentVerse.text);
      u.lang = lang === "en" ? "en-US" : "fr-FR";
      u.rate = 0.92;
      u.onend = () => setIsPlayingAudio(false);
      u.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(u);
      setIsPlayingAudio(true);
    }
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      if (audioRef.current) audioRef.current.pause();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if (currentVerse.reference.includes("Jean 8") && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlayingAudio(true);
    } else {
      playSpeech();
    }
  };

  const langButtons: { key: SupportedLang; label: string; flag: string }[] = [
    { key: "fr", label: "Français", flag: "🇫🇷" },
    { key: "en", label: "English", flag: "🇬🇧" },
    { key: "fon", label: "Fongbé", flag: "🇧🇯" },
    { key: "goun", label: "Goun", flag: "🇧🇯" },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#122A58] via-[#0E2042] to-[#0A1730] border-2 border-amber-400/60 p-6 md:p-8 shadow-2xl shadow-amber-500/10 space-y-6">
      
      {/* Real HTML5 Audio element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={() => setIsPlayingAudio(false)}
      />

      {/* Luminous Warm Golden Ambient Glows */}
      <div className="absolute -top-12 -right-12 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Badge, Theme & Language Switcher */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-amber-300">
              Verset Clé du Jour
            </span>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-200 border border-amber-400/30">
              Renouvelé à 00h00 🌅
            </span>
          </div>

          <div className="text-xs font-semibold text-slate-300">
            Thème spirituel : <span className="text-white font-bold">{theme}</span>
          </div>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-700/80 self-start sm:self-auto shadow-inner">
          {langButtons.map((b) => (
            <button
              key={b.key}
              onClick={() => {
                if (audioRef.current) audioRef.current.pause();
                setIsPlayingAudio(false);
                setLang(b.key);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                lang === b.key
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md font-extrabold scale-102"
                  : "text-slate-300 hover:text-white hover:bg-slate-850"
              }`}
            >
              <span>{b.flag}</span>
              <span>{b.label}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Verse Quote Body with High-Contrast Luminous Typography */}
      <div className="relative z-10 space-y-4 py-2">
        <p className="text-xl md:text-3xl font-extrabold text-white leading-relaxed font-serif tracking-wide drop-shadow-md">
          « {currentVerse.text} »
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <span className="text-base md:text-xl font-extrabold text-amber-300 font-serif tracking-wider drop-shadow-sm">
            — {currentVerse.reference}
          </span>
          <span className="text-[11px] px-3 py-1 rounded-full bg-slate-950/80 text-amber-200 font-bold border border-amber-400/30 shadow-inner">
            {currentVerse.langLabel}
          </span>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="relative z-10 pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Audio Button */}
        <button
          onClick={handleToggleAudio}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2.5 transition active:scale-95 shadow-xl ${
            isPlayingAudio
              ? "bg-amber-400 text-slate-950 animate-pulse ring-4 ring-amber-400/30"
              : "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950"
          }`}
        >
          {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isPlayingAudio ? "Lecture vocale en cours..." : `Écouter le Verset (${currentVerse.langLabel}) 🎧`}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition shadow"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Verset Copié !" : "Copier le texte"}</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-emerald-950/50 transition active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Statut WhatsApp</span>
          </button>
        </div>

      </div>

    </div>
  );
}
