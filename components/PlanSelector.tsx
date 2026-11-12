"use client";

import React from "react";
import { READING_PLANS, ReadingPlan } from "@/data/readingPlans";
import { Check, Calendar, Clock, Sparkles } from "lucide-react";

interface PlanSelectorProps {
  currentPlanId: string;
  onSelectPlan: (planId: string, startDayOne?: boolean) => void;
  userStartDate?: string | null;
  onResetToDayOne?: () => void;
}

export default function PlanSelector({
  currentPlanId,
  onSelectPlan,
  userStartDate,
  onResetToDayOne,
}: PlanSelectorProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
          Personnalisation Spirituelle • Chacun son Départ
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white font-serif">
          Choisis ton Plan et Démarre Quand Tu Veux
        </h2>
        <p className="text-xs md:text-sm text-slate-300">
          Peu importe le jour où tu découvres la plateforme, tu commences au <strong>Jour 1</strong> ! Le système compte tes jours à partir de ta date de début pour t'accompagner fidèlement jusqu'au bout.
        </p>

        {/* Quick Reset to Day 1 button */}
        {onResetToDayOne && (
          <div className="pt-2 flex justify-center">
            <button
              onClick={onResetToDayOne}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              Démarrer (ou Recommencer) mon parcours à Jour 1 aujourd'hui !
            </button>
          </div>
        )}
      </div>

      {/* Grid of Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {READING_PLANS.map((plan) => {
          const isSelected = currentPlanId === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between p-6 rounded-3xl transition duration-300 shadow-xl ${
                isSelected
                  ? "bg-gradient-to-b from-[#0E234B] to-[#0A162D] border-2 border-amber-400 ring-2 ring-amber-400/20 scale-[1.02]"
                  : "bg-[#09152B] border border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Top Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-300">
                  {plan.badge}
                </span>
                {isSelected && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    <Check className="w-3 h-3" /> Actif
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white font-serif">
                  {plan.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {plan.description}
                </p>

                <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span><strong>Rythme :</strong> {plan.chaptersPerDay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span><strong>Public :</strong> {plan.recommendedFor}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 space-y-2">
                <button
                  onClick={() => onSelectPlan(plan.id, true)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow ${
                    isSelected
                      ? "bg-amber-500/20 border border-amber-400/40 text-amber-300"
                      : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-extrabold"
                  }`}
                >
                  {isSelected ? "Démarrer ce plan à Jour 1 🚀" : "Choisir et Démarrer (Jour 1)"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
