"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Headphones, Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { SupportedLang } from "@/data/bibleContent";

interface AudioPlayerBarProps {
  chapterRef: string;
  selectedLang: SupportedLang;
  langName: string;
}

const MP3_MAP: Record<string, string> = {
  "Genèse 1": "/audio_genese_1_fr.mp3",
  "Genèse 2": "/audio_genese_2_fr.mp3",
  "Genèse 3": "/audio_genese_3_fr.mp3",
  "Psaume 27": "/audio_psaume_27_fr.mp3",
  "Jean 8": "/audio_jean_8_fr.mp3",
};

export default function AudioPlayerBar({ chapterRef, selectedLang, langName }: AudioPlayerBarProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(120);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [wasInterrupted, setWasInterrupted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Pick audio file
  const audioSrc = MP3_MAP[chapterRef] || "/audio_jean8_36_fr.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
      setWasInterrupted(false);
    }
  }, [chapterRef, selectedLang]);

  const handleTogglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setWasInterrupted(true);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setWasInterrupted(false);
        })
        .catch((err) => {
          console.log("Audio play error:", err);
          // Fallback speech
          if ("speechSynthesis" in window) {
            const u = new SpeechSynthesisUtterance(`Lecture de ${chapterRef} en ${langName}`);
            u.lang = "fr-FR";
            window.speechSynthesis.speak(u);
            setIsPlaying(true);
            setWasInterrupted(false);
          }
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setWasInterrupted(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const toggleSpeed = () => {
    const speeds = [1.0, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setPlaybackSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // State distinction:
  // 1. "playing" -> Glowing emerald / gold
  // 2. "interrupted/cut" -> Warm amber / warning orange with resumption pill
  // 3. "ready" -> Night blue
  const isCutOrPaused = !isPlaying && currentTime > 0 && currentTime < duration;

  return (
    <div
      className={`p-4 rounded-2xl transition-all duration-300 shadow-xl space-y-3 border ${
        isPlaying
          ? "bg-gradient-to-r from-[#072418] via-[#081B30] to-[#072418] border-emerald-400/60 shadow-emerald-500/10"
          : isCutOrPaused
          ? "bg-gradient-to-r from-[#2B1803] via-[#1A1208] to-[#2B1803] border-amber-400/70 shadow-amber-500/10"
          : "bg-gradient-to-r from-slate-900 via-[#071329] to-slate-900 border-amber-500/30"
      }`}
    >
      {/* Hidden real HTML5 audio engine */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Dynamic Status Pill when audio is cut / paused or playing */}
      {isCutOrPaused && (
        <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-between text-xs text-amber-200 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
            <span className="font-bold">
              ⏸️ L'audio s'est coupé / mis en pause à <strong>{formatTime(currentTime)}</strong>
            </span>
          </div>
          <button
            onClick={handleTogglePlay}
            className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-[11px] hover:bg-amber-300 transition"
          >
            Reprendre l'écoute ▶
          </button>
        </div>
      )}

      {isMuted && (
        <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center gap-2 text-xs text-rose-200">
          <VolumeX className="w-4 h-4 text-rose-400 shrink-0" />
          <span><strong>Son coupé (Muet) :</strong> Cliquez sur le haut-parleur pour réactiver le son.</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className={`p-2 rounded-xl transition ${
              isPlaying
                ? "bg-emerald-500/20 text-emerald-400"
                : isCutOrPaused
                ? "bg-amber-500/20 text-amber-400"
                : "bg-slate-800 text-amber-400"
            }`}
          >
            <Headphones className={`w-4 h-4 ${isPlaying ? "animate-bounce" : ""}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white block">
                Audio Studio HD • {chapterRef}
              </span>
              {isPlaying && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 animate-pulse">
                  ● En direct
                </span>
              )}
            </div>
            <span className="text-[11px] text-amber-300">
              Voix : <strong>{langName}</strong>
            </span>
          </div>
        </div>

        {/* Audio Wave Animated Bars */}
        <div className="flex items-center gap-1 self-start sm:self-auto">
          {[40, 70, 30, 90, 50, 80, 45, 65, 35].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-200 ${
                isPlaying
                  ? "bg-emerald-400 animate-pulse"
                  : isCutOrPaused
                  ? "bg-amber-400 opacity-60"
                  : "bg-slate-600 opacity-40"
              }`}
              style={{
                height: isPlaying
                  ? `${Math.max(6, h * (i % 2 === 0 ? 0.35 : 0.2))}px`
                  : isCutOrPaused
                  ? "8px"
                  : "6px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar & Timing */}
      <div className="space-y-1">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer transition ${
            isPlaying
              ? "bg-slate-800 accent-emerald-400"
              : isCutOrPaused
              ? "bg-slate-800 accent-amber-400"
              : "bg-slate-800 accent-amber-500"
          }`}
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span className={isCutOrPaused ? "text-amber-300 font-bold" : ""}>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              if (audioRef.current) audioRef.current.currentTime = 0;
              setCurrentTime(0);
              setWasInterrupted(false);
            }}
            className="p-1.5 text-slate-400 hover:text-white transition"
            title="Recommencer depuis le début"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleMute}
            className={`p-1.5 rounded-lg transition ${
              isMuted
                ? "bg-rose-500/20 text-rose-300 border border-rose-400/40"
                : "text-slate-400 hover:text-white"
            }`}
            title={isMuted ? "Réactiver le son" : "Couper le son"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        <button
          onClick={handleTogglePlay}
          className={`px-6 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow-lg transition active:scale-95 ${
            isPlaying
              ? "bg-emerald-400 text-slate-950 shadow-emerald-400/20"
              : isCutOrPaused
              ? "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold ring-4 ring-amber-400/30 animate-pulse"
              : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold"
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isPlaying ? "Pause" : isCutOrPaused ? "Reprendre la Voix HD ▶" : "Écouter la Voix HD"}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSpeed}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-[11px] font-bold border border-slate-700 transition"
            title="Changer la vitesse"
          >
            {playbackSpeed}x
          </button>

          <a
            href={audioSrc}
            download={`${chapterRef}_EEDSC.mp3`}
            className="p-1.5 text-slate-400 hover:text-amber-400 transition"
            title="Télécharger l'audio MP3 pour écouter hors-ligne"
          >
            <Download className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Pastoral note for Fongbe and Goun */}
      {(selectedLang === "fon" || selectedLang === "goun") && (
        <div className="text-[10px] text-amber-300/90 italic text-center pt-1 border-t border-slate-800/60">
          Enregistrement officiel de l'Alliance Biblique du Bénin (dédié aux papas, mamans et fidèles).
        </div>
      )}
    </div>
  );
}
