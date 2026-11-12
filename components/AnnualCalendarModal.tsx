"use client";

import React, { useState } from "react";
import { X, Calendar, BookOpen, ChevronRight, Sparkles, Check, ChevronLeft, ArrowRight } from "lucide-react";
import { getDayOfYear, getDayPortions, ReadingMode } from "@/data/readingPlans";

interface AnnualCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDay: number;
  onSelectDay: (dayOfYear: number) => void;
  planDurationMonths?: number;
  readingMode: ReadingMode;
}

const MONTHS_FR = [
  { name: "Janvier", days: 31, index: 0 },
  { name: "Février", days: 28, index: 1 },
  { name: "Mars", days: 31, index: 2 },
  { name: "Avril", days: 30, index: 3 },
  { name: "Mai", days: 31, index: 4 },
  { name: "Juin", days: 30, index: 5 },
  { name: "Juillet", days: 31, index: 6 },
  { name: "Août", days: 31, index: 7 },
  { name: "Septembre", days: 30, index: 8 },
  { name: "Octobre", days: 31, index: 9 },
  { name: "Novembre", days: 30, index: 10 },
  { name: "Décembre", days: 31, index: 11 },
];

export default function AnnualCalendarModal({
  isOpen,
  onClose,
  selectedDay,
  onSelectDay,
  planDurationMonths = 12,
  readingMode,
}: AnnualCalendarModalProps) {
  const currentMonthIdx = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonthIdx);
  const [hoveredDay, setHoveredDay] = useState<number>(selectedDay);

  if (!isOpen) return null;

  const currentYear = new Date().getFullYear();
  const todayDayOfYear = getDayOfYear();

  // Helper to get day of year from day and month
  const getDayNumber = (d: number, m: number) => {
    return getDayOfYear(new Date(currentYear, m, d));
  };

  const previewPortions = getDayPortions(hoveredDay, planDurationMonths);
  const currentPassages = readingMode === "linear" ? previewPortions.linearPassages : previewPortions.balancedPassages;

  const activeMonthObj = MONTHS_FR[selectedMonth];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="max-w-4xl w-full bg-gradient-to-b from-[#0E234B] via-[#09152B] to-[#040914] border-2 border-amber-400/60 rounded-3xl p-5 sm:p-8 shadow-2xl relative space-y-6 my-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                <Calendar className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                Calendrier Annuel • 365 Jours
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-serif">
              Programme Annuel de Méditation Biblique
            </h2>
            <p className="text-xs text-slate-300">
              Clique sur n'importe quelle date de l'année pour voir et lire ses chapitres bibliques.
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => {
                setSelectedMonth(currentMonthIdx);
                setHoveredDay(todayDayOfYear);
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Aujourd'hui (Jour {todayDayOfYear})</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 12 Months Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {MONTHS_FR.map((m) => (
            <button
              key={m.name}
              onClick={() => setSelectedMonth(m.index)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedMonth === m.index
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md scale-105"
                  : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-850 border border-slate-800"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Days Grid of Selected Month */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-amber-300 uppercase tracking-wider">
              {activeMonthObj.name} ({activeMonthObj.days} jours)
            </span>
            <span className="text-slate-400 text-[11px]">
              Survole ou clique sur un jour pour voir les portions
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2">
            {Array.from({ length: activeMonthObj.days }, (_, i) => i + 1).map((d) => {
              const dayNum = getDayNumber(d, activeMonthObj.index);
              const isToday = dayNum === todayDayOfYear;
              const isSelected = dayNum === hoveredDay;
              const portions = getDayPortions(dayNum, planDurationMonths);
              const firstRef = readingMode === "linear" 
                ? (portions.linearPassages[0]?.reference || "")
                : (portions.balancedPassages[0]?.reference || "");

              return (
                <button
                  key={d}
                  onClick={() => setHoveredDay(dayNum)}
                  className={`p-2.5 rounded-2xl border text-left transition relative flex flex-col justify-between aspect-square group ${
                    isSelected
                      ? "bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 border-amber-300 font-extrabold shadow-lg scale-102 ring-2 ring-amber-400/40"
                      : isToday
                      ? "bg-[#152F64] border-amber-400 text-white font-bold ring-2 ring-amber-400/20"
                      : "bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs sm:text-sm font-bold">{d}</span>
                    {isToday && (
                      <span className="text-[8px] px-1 rounded bg-amber-400 text-slate-950 font-black uppercase">
                        Auj
                      </span>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <span className={`text-[9px] block truncate font-medium ${isSelected ? "text-slate-950 font-bold" : "text-amber-300"}`}>
                      {firstRef}
                    </span>
                    <span className={`text-[8px] block ${isSelected ? "text-slate-900" : "text-slate-500"}`}>
                      J-{dayNum}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Preview Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border-2 border-amber-400/40 space-y-3 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                  Jour {hoveredDay} / 365
                </span>
                {hoveredDay === todayDayOfYear && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Aujourd'hui
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-serif">
                Thème : {previewPortions.theme}
              </h3>
            </div>

            <button
              onClick={() => {
                onSelectDay(hoveredDay);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-slate-950" />
              <span>Lire les portions de ce jour</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

          {/* Portions summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {currentPassages.map((p, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-white block">{p.reference}</span>
                  <span className="text-[10px] text-slate-400">{p.category}</span>
                </div>
                <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded">
                  {p.book}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
