"use client";

import React, { useState, useEffect } from "react";
import { Star, X, Check, MessageSquarePlus, Heart, Sparkles, Send } from "lucide-react";

export interface UserReview {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
}

const DEFAULT_REVIEWS: UserReview[] = [
  {
    id: "rev-1",
    name: "Pasteur Emmanuel D.",
    city: "EEDSC Cotonou",
    rating: 5,
    comment: "Une plateforme d'édification extraordinaire pour l'église ! La méditation quotidienne et les plans personnalisés transforment la vie de prière de nos assemblées.",
    date: "Il y a 2 jours"
  },
  {
    id: "rev-2",
    name: "Sœur Grâce T.",
    city: "Porto-Novo, Bénin",
    rating: 5,
    comment: "Mes enfants adorent la section Bible Enfants ! Les dessins animés, les contes audio et les quiz bibliques ont rendu notre culte familial tellement joyeux.",
    date: "Il y a 3 jours"
  },
  {
    id: "rev-3",
    name: "Frère Samuel K.",
    city: "Diaspora (Paris, France)",
    rating: 5,
    comment: "La possibilité de commencer à son propre rythme et d'avoir le verset du jour renouvelé chaque matin est une merveille. Bravo à Nathan pour ce chef-d'œuvre technologique !",
    date: "Il y a 5 jours"
  }
];

interface UserFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultUserName?: string;
}

export default function UserFeedbackModal({
  isOpen,
  onClose,
  defaultUserName = "",
}: UserFeedbackModalProps) {
  const [reviews, setReviews] = useState<UserReview[]>(DEFAULT_REVIEWS);
  const [name, setName] = useState(defaultUserName || "");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "list">("write");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("eedsc_user_reviews");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReviews([...parsed, ...DEFAULT_REVIEWS]);
          }
        } catch (e) {}
      }
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: UserReview = {
      id: "rev-" + Date.now(),
      name: name.trim(),
      city: city.trim() || "Fidèle EEDSC",
      rating,
      comment: comment.trim(),
      date: "Aujourd'hui"
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);

    if (typeof window !== "undefined") {
      localStorage.setItem("eedsc_user_reviews", JSON.stringify([newReview]));
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setActiveTab("list");
      setComment("");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="max-w-xl w-full bg-gradient-to-b from-[#0E234B] via-[#09152B] to-[#040914] border-2 border-amber-400/50 rounded-3xl p-6 md:p-8 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 shadow-inner">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-white font-serif">
            Avis & Témoignages de la Communauté
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
            Ton retour d'expérience fortifie la foi de tes frères et sœurs et aide l'équipe à perfectionner cette œuvre pour la gloire de Dieu !
          </p>
        </div>

        {/* Tabs: Donner mon avis VS Voir les témoignages */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab("write")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              activeTab === "write"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>Écrire un Avis</span>
          </button>

          <button
            onClick={() => setActiveTab("list")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              activeTab === "list"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Lire les Témoignages ({reviews.length})</span>
          </button>
        </div>

        {/* TAB 1: FORM */}
        {activeTab === "write" && (
          <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
            
            {/* Stars Rating Selector */}
            <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 text-center space-y-1.5">
              <span className="text-xs font-bold text-amber-300 block">
                Ta note pour la plateforme :
              </span>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 transition hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 transition ${
                        star <= rating
                          ? "text-amber-400 fill-amber-400 drop-shadow"
                          : "text-slate-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Nom & Ville */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Ton Nom / Prénom *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Frère Samuel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-400">Ville / Assemblée</label>
                <input
                  type="text"
                  placeholder="Ex: Cotonou, Porto-Novo, France..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Commentaire / Témoignage */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">
                Ton Témoignage / Avis sur l'application *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Partage comment la plateforme bénit ta vie spirituelle, ce que tu apprécies le plus..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            {submitted ? (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-bold flex items-center justify-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                <span>Gloire à Dieu ! Ton avis a été publié avec succès.</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Publier mon Témoignage</span>
              </button>
            )}

          </form>
        )}

        {/* TAB 2: LIST OF TESTIMONIES */}
        {activeTab === "list" && (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1 animate-fadeIn">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-xs block">{rev.name}</span>
                    <span className="text-[10px] text-slate-400">{rev.city} • {rev.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed italic">
                  « {rev.comment} »
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
