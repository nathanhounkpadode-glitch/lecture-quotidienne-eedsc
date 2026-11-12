"use client";

import React, { useState, useEffect } from "react";
import { INITIAL_PRAYERS, PrayerRequest } from "@/data/prayerWall";
import {
  Heart,
  Send,
  PlusCircle,
  Check,
  MessageSquare,
  MapPin,
  Trash2,
  RotateCcw,
  Search,
  Filter,
  Sparkles,
} from "lucide-react";

interface PrayerWallProps {
  defaultUserName?: string;
}

export default function PrayerWall({ defaultUserName }: PrayerWallProps) {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("eedsc_prayer_wall");
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_PRAYERS;
  });

  const [prayedSet, setPrayedSet] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("eedsc_prayed_set");
        if (saved) return new Set(JSON.parse(saved));
      } catch (e) {}
    }
    return new Set();
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  // Form states
  const [author, setAuthor] = useState<string>(defaultUserName || "");
  const [location, setLocation] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<PrayerRequest["category"]>("Délivrance");

  // Keep author synchronized if defaultUserName changes
  useEffect(() => {
    if (defaultUserName && !author) {
      setAuthor(defaultUserName);
    }
  }, [defaultUserName]);

  // Save prayers whenever updated
  const savePrayers = (updated: PrayerRequest[]) => {
    setPrayers(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("eedsc_prayer_wall", JSON.stringify(updated));
    }
  };

  const categories = ["Tous", "Délivrance", "Famille", "Santé", "Études & Travail", "Action de grâce"];

  const handlePray = (id: string) => {
    if (prayedSet.has(id)) return;
    const nextPrayed = new Set(prayedSet).add(id);
    setPrayedSet(nextPrayed);
    if (typeof window !== "undefined") {
      localStorage.setItem("eedsc_prayed_set", JSON.stringify(Array.from(nextPrayed)));
    }

    const updated = prayers.map((p) =>
      p.id === id ? { ...p, prayerCount: p.prayerCount + 1 } : p
    );
    savePrayers(updated);
  };

  const handleAddPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPrayer: PrayerRequest = {
      id: `p-${Date.now()}`,
      author: author.trim() || defaultUserName || "Anonyme",
      location: location.trim() || "Cotonou, Bénin",
      title: title.trim(),
      content: content.trim(),
      category: category,
      prayerCount: 1,
      timeAgo: "À l'instant",
    };

    savePrayers([newPrayer, ...prayers]);
    setShowForm(false);
    setTitle("");
    setContent("");
    setLocation("");
  };

  const handleDeletePrayer = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof window !== "undefined") {
      const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette requête de prière ?");
      if (!confirmDelete) return;
    }
    const updated = prayers.filter((p) => p.id !== id);
    savePrayers(updated);
  };

  const handleResetPrayers = () => {
    if (typeof window !== "undefined") {
      const confirmReset = window.confirm(
        "Voulez-vous réinitialiser le mur de prière avec les requêtes officielles par défaut ?"
      );
      if (!confirmReset) return;
    }
    savePrayers(INITIAL_PRAYERS);
  };

  const handleClearAll = () => {
    if (typeof window !== "undefined") {
      const confirmClear = window.confirm(
        "Voulez-vous vider entièrement le mur de prière ?"
      );
      if (!confirmClear) return;
    }
    savePrayers([]);
  };

  const filtered = prayers
    .filter((p) => (selectedCategory === "Tous" ? true : p.category === selectedCategory))
    .filter((p) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0E234B] via-[#071329] to-[#0E234B] border border-amber-500/30 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
              Communion Fraternelle & Intercession
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800">
              {prayers.length} requête{prayers.length > 1 ? "s" : ""}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-serif">
            Mur de Prière & d'Intercession
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
            « Priez les uns pour les autres, afin que vous soyez guéris. La prière fervente du juste a une grande efficacité. » (Jacques 5:16)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold rounded-2xl text-xs md:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Déposer une requête</span>
          </button>

          <button
            onClick={handleResetPrayers}
            className="px-3.5 py-3 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 border border-slate-800 hover:border-amber-400/40 transition active:scale-95 cursor-pointer"
            title="Réinitialiser le mur de prière avec les requêtes officielles"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Réinitialiser</span>
          </button>
        </div>
      </div>

      {/* New Prayer Form */}
      {showForm && (
        <form onSubmit={handleAddPrayer} className="p-6 md:p-8 rounded-3xl bg-[#0A162D] border-2 border-amber-400/50 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400">
                <PlusCircle className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-white text-base font-serif">
                Nouvelle Requête de Prière ou Action de Grâce
              </h3>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">Visible par toute la communauté</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Votre Prénom ou Pseudo</label>
              <input
                type="text"
                placeholder="Ex: David, Sœur Grâce... (ou vide pour Anonyme)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition shadow-inner"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Votre Ville / Quartier</label>
              <input
                type="text"
                placeholder="Ex: Vêdoko, Cotonou ou Porto-Novo"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition shadow-inner"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 transition shadow-inner"
              >
                <option value="Délivrance">⚔️ Délivrance & Combat spirituel</option>
                <option value="Famille">👨‍👩‍👧‍👦 Famille & Foyer</option>
                <option value="Santé">🩺 Santé & Guérison</option>
                <option value="Études & Travail">💼 Études & Travail</option>
                <option value="Action de grâce">🙌 Action de grâce & Témoignage</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Titre de la requête *</label>
            <input
              type="text"
              placeholder="Ex: Prière pour un entretien d'embauche décisif et briser toute stagnation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition shadow-inner"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Détails de votre sujet de prière *</label>
            <textarea
              rows={3}
              placeholder="Expliquez brièvement votre sujet afin que l'assemblée s'accorde avec vous dans la foi..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition shadow-inner"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-lg transition active:scale-95 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publier sur le Mur</span>
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md scale-102"
                  : "bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Quick Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher une prière..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50 transition"
          />
        </div>
      </div>

      {/* Prayers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prayer) => {
          const hasPrayed = prayedSet.has(prayer.id);

          return (
            <div
              key={prayer.id}
              className="flex flex-col justify-between p-6 rounded-3xl bg-gradient-to-b from-[#0A1832] to-[#071329] border border-slate-800/80 hover:border-amber-500/40 transition shadow-xl space-y-4 relative group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-amber-300 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30">
                    {prayer.category}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-[10px]">{prayer.timeAgo}</span>
                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={(e) => handleDeletePrayer(prayer.id, e)}
                      className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/15 transition cursor-pointer"
                      title="Supprimer cette requête du mur"
                      aria-label="Supprimer cette requête"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="text-base font-bold text-white font-serif line-clamp-2">
                  {prayer.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                  {prayer.content}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-200">{prayer.author}</span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <MapPin className="w-2.5 h-2.5" />
                    <span>{prayer.location}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handlePray(prayer.id)}
                  disabled={hasPrayed}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    hasPrayed
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default"
                      : "bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-400/30 active:scale-95"
                  }`}
                  title={hasPrayed ? "Vous avez prié pour ce sujet" : "Je prie pour ce frère / cette sœur"}
                >
                  <Heart className={`w-3.5 h-3.5 ${hasPrayed ? "fill-emerald-400 text-emerald-400" : "text-amber-400"}`} />
                  <span>{prayer.prayerCount}</span>
                  <span className="hidden sm:inline font-normal">{hasPrayed ? "Prié !" : "Je prie"}</span>
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 px-4 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-400/20">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-serif">
              Aucune requête de prière trouvée
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {searchQuery
                ? `Aucun résultat pour "${searchQuery}". Essayez un autre mot-clé ou réinitialisez le filtre.`
                : "Le mur de prière est vide. Soyez le premier à déposer un sujet de prière ou une action de grâce !"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Tous");
                  setShowForm(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Déposer une requête</span>
              </button>
              <button
                type="button"
                onClick={handleResetPrayers}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition border border-slate-700 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Restaurer les requêtes de départ</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
