"use client";

import React, { useState } from "react";
import { Sparkles, Heart, BookOpen, ChevronRight, Check, User, X } from "lucide-react";

export interface UserProfile {
  firstName: string;
  lastName?: string;
  age: number;
}

interface UserOnboardingModalProps {
  isOpen: boolean;
  initialProfile?: UserProfile | null;
  onSaveProfile: (profile: UserProfile, suggestedTab?: string) => void;
  onClose?: () => void;
  canCloseWithoutSaving?: boolean;
}

export default function UserOnboardingModal({
  isOpen,
  initialProfile,
  onSaveProfile,
  onClose,
  canCloseWithoutSaving = false,
}: UserOnboardingModalProps) {
  const [firstName, setFirstName] = useState(initialProfile?.firstName || "");
  const [lastName, setLastName] = useState(initialProfile?.lastName || "");
  const [age, setAge] = useState<number | "">(initialProfile?.age || "");
  const [step, setStep] = useState<"form" | "recommendation">("form");
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialProfile) {
      setFirstName(initialProfile.firstName || "");
      setLastName(initialProfile.lastName || "");
      setAge(initialProfile.age || "");
    }
  }, [initialProfile]);

  if (!isOpen) return null;

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setError("Veuillez renseigner votre prénom.");
      return;
    }
    const numAge = Number(age);
    if (!numAge || numAge < 1 || numAge > 120) {
      setError("Veuillez renseigner un âge valide (ex: 8, 18, 30).");
      return;
    }

    setError(null);
    const newProfile: UserProfile = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      age: numAge,
    };

    // Immediately save the profile to persistent storage
    onSaveProfile(newProfile);

    // If user is editing their existing profile, close directly
    if (initialProfile && onClose) {
      onClose();
      return;
    }

    setStep("recommendation");
  };

  const handleSelectTab = (tab: string) => {
    onSaveProfile(
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        age: Number(age),
      },
      tab
    );
  };

  const numAge = Number(age) || 20;
  const isKid = numAge <= 12;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-md w-full bg-gradient-to-b from-[#0E234B] to-[#081329] border-2 border-amber-400/50 rounded-3xl p-6 md:p-8 shadow-2xl relative space-y-6"
      >
        
        {/* Close Button: Always available */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition cursor-pointer"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* STEP 1: FORM */}
        {step === "form" && (
          <div className="space-y-6">
            
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 shadow-inner">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-white font-serif">
                {initialProfile ? "Modifier mon Profil" : "Bienvenue sur EEDSC ! 🙏"}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Renseigne ton prénom et ton âge pour que la plateforme t'accueille personnellement chaque jour.
              </p>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              
              {/* Prénom */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <span>Ton Prénom *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Grâce, Samuel, David, Esther..."
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-slate-500 transition shadow-inner"
                />
              </div>

              {/* Nom (optionnel) */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 flex items-center justify-between">
                  <span>Ton Nom de famille</span>
                  <span className="text-[10px] text-slate-500">(Facultatif)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Hounkpadode"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-slate-500 transition shadow-inner"
                />
              </div>

              {/* Âge */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-300 flex items-center justify-between">
                  <span>Ton Âge *</span>
                  <span className="text-[10px] text-slate-400">Pour adapter nos suggestions</span>
                </label>
                <input
                  type="number"
                  min="2"
                  max="120"
                  required
                  placeholder="Ex: 8 ans, 17 ans, 25 ans..."
                  value={age}
                  onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-slate-500 transition shadow-inner"
                />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-xs text-rose-300 font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition active:scale-95 cursor-pointer"
              >
                <span>{initialProfile ? "Enregistrer les modifications ✓" : "Continuer"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {initialProfile && (
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      localStorage.removeItem("eedsc_user_profile");
                    }
                    if (onClose) onClose();
                    window.location.reload();
                  }}
                  className="w-full py-2 rounded-xl text-[11px] font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition border border-transparent hover:border-rose-500/20"
                >
                  Effacer ce profil & changer d'utilisateur
                </button>
              )}

              <p className="text-[10px] text-slate-500 text-center">
                🔒 Aucun mot de passe requis. Vos données restent privées sur votre appareil.
              </p>

            </form>

          </div>
        )}

        {/* STEP 2: SMART PROPOSITION BASED ON AGE */}
        {step === "recommendation" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="text-center space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30 inline-block">
                Proposition sur-mesure • {numAge} ans
              </span>
              <h2 className="text-2xl font-extrabold text-white font-serif">
                Ravi de te compter parmi nous, {firstName} ! 👋
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isKid
                  ? `Comme tu as ${numAge} ans, nous te proposons de découvrir notre section spéciale Bible pour Enfants avec des histoires illustrées, des dessins animés et des mini-jeux !`
                  : `Nous avons préparé ton parcours de méditation quotidienne avec le Verset du Jour, la portion biblique et le mur de prière.`}
              </p>
            </div>

            {/* Proposition Cards */}
            <div className="space-y-3">
              
              {/* Option 1 : Enfants (Mise en avant si <= 12 ans) */}
              <button
                onClick={() => handleSelectTab("kids")}
                className={`w-full p-4 rounded-2xl border-2 transition flex items-center justify-between text-left group ${
                  isKid
                    ? "bg-gradient-to-r from-indigo-950 to-purple-950 border-amber-400 ring-2 ring-amber-400/20 shadow-xl"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🧒</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                        Bible pour Enfants
                      </span>
                      {isKid && (
                        <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase">
                          Conseillé
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Dessins animés, histoires illustrées, voix audio & quiz
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
              </button>

              {/* Option 2 : Portion du Jour Adulte / Famille */}
              <button
                onClick={() => handleSelectTab("today")}
                className={`w-full p-4 rounded-2xl border-2 transition flex items-center justify-between text-left group ${
                  !isKid
                    ? "bg-gradient-to-r from-[#0E234B] to-[#0A162D] border-amber-400 ring-2 ring-amber-400/20 shadow-xl"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📖</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                        Portion Biblique du Jour
                      </span>
                      {!isKid && (
                        <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase">
                          Conseillé
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Verset clé, Ancien & Nouveau Testament, Audio 4 langues
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
              </button>

            </div>

            <p className="text-[11px] text-slate-400 text-center italic">
              Tu pourras naviguer librement entre toutes les sections à tout moment grâce au menu !
            </p>

          </div>
        )}

      </div>
    </div>
  );
}
