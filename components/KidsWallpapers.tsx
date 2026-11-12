"use client";

import React, { useState } from "react";
import { Download, Eye, Sparkles, Smartphone, Check, Heart, X, ArrowLeft, Share2 } from "lucide-react";
import { KidsLang } from "./KidsBible";

export interface KidsWallpaper {
  id: string;
  badge: string;
  category: "courage" | "shepherd" | "night" | "rainbow" | "light" | "crown";
  imageSrc: string;
  fr: {
    title: string;
    verse: string;
    reference: string;
    description: string;
    tag: string;
  };
  en: {
    title: string;
    verse: string;
    reference: string;
    description: string;
    tag: string;
  };
  accentColor: string;
}

export const KIDS_WALLPAPERS: KidsWallpaper[] = [
  {
    id: "shepherd",
    badge: "Le Bon Berger 🐑",
    category: "shepherd",
    imageSrc: "/kids/wallpaper_shepherd.png",
    fr: {
      title: "Jésus est mon Bon Berger",
      verse: "L'Éternel est mon berger: je ne manquerai de rien.",
      reference: "Psaume 23:1",
      description: "Un petit agneau doux et souriant dans une prairie ensoleillée avec un bel arc-en-ciel.",
      tag: "Douceur & Protection"
    },
    en: {
      title: "Jesus is My Shepherd",
      verse: "The Lord is my shepherd; I shall not want.",
      reference: "Psalm 23:1",
      description: "A sweet fluffy lamb resting peacefully in a sunny wildflower meadow.",
      tag: "Peace & Protection"
    },
    accentColor: "#F59E0B"
  },
  {
    id: "lion",
    badge: "Fort & Courageux 🦁",
    category: "courage",
    imageSrc: "/kids/wallpaper_lion.png",
    fr: {
      title: "Fort et Courageux !",
      verse: "Ne t'effraie point, car l'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.",
      reference: "Josué 1:9",
      description: "Un lionceau brave avec une couronne dorée et le bouclier victorieux de la foi.",
      tag: "Courage & Victoire"
    },
    en: {
      title: "Strong & Courageous!",
      verse: "Do not be afraid, for the Lord your God is with you wherever you go.",
      reference: "Joshua 1:9",
      description: "A brave little lion cub with a golden crown and the shield of faith.",
      tag: "Courage & Faith"
    },
    accentColor: "#EA580C"
  },
  {
    id: "night",
    badge: "Nuit Paisible 🌙",
    category: "night",
    imageSrc: "/kids/wallpaper_night.png",
    fr: {
      title: "Jésus veille sur mon Sommeil",
      verse: "Je me couche et je m'endors en paix, car toi seul, ô Éternel! me donnes la sécurité.",
      reference: "Psaume 4:8",
      description: "Une lune bienveillante et des étoiles dorées au-dessus d'un petit bateau paisible.",
      tag: "Douce Nuit & Sérénité"
    },
    en: {
      title: "Jesus Watches My Sleep",
      verse: "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
      reference: "Psalm 4:8",
      description: "A gentle smiling moon and glowing stars over a peaceful calm sea.",
      tag: "Sweet Dreams & Peace"
    },
    accentColor: "#818CF8"
  },
  {
    id: "rainbow",
    badge: "Promesse d'Amour 🌈",
    category: "rainbow",
    imageSrc: "/kids/wallpaper_rainbow.png",
    fr: {
      title: "L'Arc-en-ciel de la Promesse",
      verse: "J'ai placé mon arc dans la nue, et il servira de signe d'alliance entre moi et la terre.",
      reference: "Genèse 9:13",
      description: "Un arc-en-ciel géant éclatant et une colombe blanche apportant la paix divine.",
      tag: "Alliance & Joie"
    },
    en: {
      title: "The Rainbow Promise",
      verse: "I have set my rainbow in the clouds, and it will be the sign of the covenant.",
      reference: "Genesis 9:13",
      description: "A radiant rainbow and a gentle white dove bringing God's everlasting peace.",
      tag: "Promise & Joy"
    },
    accentColor: "#06B6D4"
  },
  {
    id: "light",
    badge: "Petite Lumière ✨",
    category: "light",
    imageSrc: "/kids/wallpaper_light.png",
    fr: {
      title: "Tu es la Lumière du Monde",
      verse: "Vous êtes la lumière du monde. Que votre lumière luise ainsi devant les hommes.",
      reference: "Matthieu 5:14",
      description: "Un enfant joyeux tenant un lampion étoilé qui illumine la nuit de son éclat.",
      tag: "Rayonnement & Amour"
    },
    en: {
      title: "You are the Light of the World",
      verse: "You are the light of the world. Let your light shine before others.",
      reference: "Matthew 5:14",
      description: "A joyful child holding a glowing star lantern that lights up the starry night.",
      tag: "Shine & Kindness"
    },
    accentColor: "#FBBF24"
  },
  {
    id: "crown",
    badge: "Enfant du Roi 👑",
    category: "crown",
    imageSrc: "/kids/wallpaper_crown.png",
    fr: {
      title: "Enfant Bien-Aimé de Dieu",
      verse: "Voyez quel amour le Père nous a témoigné, pour que nous soyons appelés enfants de Dieu !",
      reference: "1 Jean 3:1",
      description: "Couronne d'or royale et cœurs flottants célébrant l'amour infini du Père céleste.",
      tag: "Identité Royale en Christ"
    },
    en: {
      title: "Beloved Child of the King",
      verse: "See what great love the Father has lavished on us, that we should be called children of God!",
      reference: "1 John 3:1",
      description: "Golden royal crown and floating heart balloons celebrating God's infinite love.",
      tag: "Royal Identity"
    },
    accentColor: "#EC4899"
  }
];

interface KidsWallpapersProps {
  kidsLang: KidsLang;
  onBackToStories?: () => void;
}

export default function KidsWallpapers({ kidsLang, onBackToStories }: KidsWallpapersProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [previewWallpaper, setPreviewWallpaper] = useState<KidsWallpaper | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const filteredWallpapers = selectedFilter === "all"
    ? KIDS_WALLPAPERS
    : KIDS_WALLPAPERS.filter((w) => w.category === selectedFilter);

  // High-Resolution 1080x1920 HD PNG Downloader via HTML5 Canvas
  const handleDownload = async (wallpaper: KidsWallpaper) => {
    try {
      setDownloadingId(wallpaper.id);

      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const content = kidsLang === "fr" ? wallpaper.fr : wallpaper.en;

      // 1. Load image onto canvas
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = wallpaper.imageSrc;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => {
          // If custom image fails, resolve anyway with gradient fallback
          resolve();
        };
      });

      if (img.complete && img.naturalWidth > 0) {
        // Draw image covering the entire 1080x1920 canvas
        ctx.drawImage(img, 0, 0, 1080, 1920);
      } else {
        // Fallback gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
        bgGrad.addColorStop(0, "#081329");
        bgGrad.addColorStop(0.5, "#0E244B");
        bgGrad.addColorStop(1, "#040914");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1080, 1920);
      }

      // 2. Add soft top gradient scrim for status bar readability
      const topScrim = ctx.createLinearGradient(0, 0, 0, 260);
      topScrim.addColorStop(0, "rgba(0,0,0,0.45)");
      topScrim.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = topScrim;
      ctx.fillRect(0, 0, 1080, 260);

      // 3. Add soft bottom gradient scrim for typography
      const bottomScrim = ctx.createLinearGradient(0, 1200, 0, 1920);
      bottomScrim.addColorStop(0, "rgba(0,0,0,0)");
      bottomScrim.addColorStop(0.3, "rgba(7, 19, 41, 0.75)");
      bottomScrim.addColorStop(1, "rgba(4, 9, 20, 0.95)");
      ctx.fillStyle = bottomScrim;
      ctx.fillRect(0, 1200, 1080, 720);

      // 4. Draw Christian Title in Golden Glow
      ctx.textAlign = "center";
      ctx.fillStyle = "#FBBF24";
      ctx.font = "bold 56px 'Georgia', serif";
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 16;
      ctx.fillText(content.title, 540, 1530);

      // 5. Draw Scripture Verse text (wrapped nicely)
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "italic 36px 'Helvetica Neue', Arial, sans-serif";
      ctx.shadowBlur = 8;
      
      const words = content.verse.split(" ");
      let line = "";
      let y = 1610;
      const maxWidth = 920;
      const lineHeight = 50;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText("« " + line.trim() + (line.endsWith(" ") ? "" : "") , 540, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText("« " + line.trim() + " »", 540, y);

      // 6. Draw Scripture Reference
      ctx.fillStyle = "#FCD34D";
      ctx.font = "bold 34px 'Helvetica Neue', Arial, sans-serif";
      ctx.fillText("— " + content.reference + " —", 540, y + 65);

      // 7. Draw Discrete Church & Kids Watermark at bottom
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.font = "bold 24px 'Helvetica Neue', Arial, sans-serif";
      ctx.fillText("✨ Lecture Quotidienne EEDSC • Pour les Enfants de Dieu", 540, 1850);

      // 8. Trigger PNG Download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `eedsc_fond_ecran_${wallpaper.id}_${kidsLang}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccessId(wallpaper.id);
      setTimeout(() => setDownloadSuccessId(null), 3000);
    } catch (err) {
      console.error("Failed to download wallpaper:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner & Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0E234B] via-[#09152B] to-[#122244] border-2 border-amber-400/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2 max-w-2xl">
            {onBackToStories && (
              <button
                onClick={onBackToStories}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800 mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {kidsLang === "fr" ? "Retour aux Histoires Bibliques" : "Back to Bible Stories"}
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {kidsLang === "fr" ? "Cadeau Spirituel pour Enfants" : "Spiritual Gift for Children"}
              </span>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-900/90 px-2.5 py-1 rounded-full border border-slate-800">
                📱 Format Téléphone & Tablette HD
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold text-white font-serif">
              {kidsLang === "fr" ? "Fonds d'Écran Chrétiens pour Enfants 🎨" : "Christian Wallpapers for Kids 🎨"}
            </h2>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {kidsLang === "fr"
                ? "Télécharge gratuitement de magnifiques fonds d'écran bibliques pleins d'amour et de versets de bénédiction pour illuminer l'écran de verrouillage de ton téléphone ou ta tablette !"
                : "Download beautiful Christian wallpapers filled with God's love and encouraging Bible verses to brighten your phone or tablet lock screen!"}
            </p>
          </div>

          {/* Quick Tip for Parents Card */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-400/30 text-xs text-slate-300 space-y-2 max-w-xs shrink-0 shadow-lg">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>{kidsLang === "fr" ? "Astuce pour les Parents :" : "Tip for Parents:"}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {kidsLang === "fr"
                ? "Clique sur « Télécharger en HD », puis dans la galerie photo choisis « Définir comme fond d'écran » pour garder la Parole de Dieu sous les yeux toute la journée !"
                : "Click 'Download HD', then in your photo gallery choose 'Set as wallpaper' to keep God's Word in sight all day long!"}
            </p>
          </div>

        </div>
      </div>

      {/* Filter Categories */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: "all", label: kidsLang === "fr" ? "Tous les fonds" : "All Wallpapers", icon: "🎨" },
          { id: "shepherd", label: kidsLang === "fr" ? "🐑 Bon Berger" : "🐑 Good Shepherd", icon: "🐑" },
          { id: "courage", label: kidsLang === "fr" ? "🦁 Courage & Foi" : "🦁 Courage & Faith", icon: "🦁" },
          { id: "night", label: kidsLang === "fr" ? "🌙 Nuit Paisible" : "🌙 Peaceful Night", icon: "🌙" },
          { id: "rainbow", label: kidsLang === "fr" ? "🌈 Promesse" : "🌈 Promise", icon: "🌈" },
          { id: "light", label: kidsLang === "fr" ? "✨ Petite Lumière" : "✨ Little Light", icon: "✨" },
          { id: "crown", label: kidsLang === "fr" ? "👑 Enfant du Roi" : "👑 Child of King", icon: "👑" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
              selectedFilter === f.id
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-extrabold scale-105"
                : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {/* Grid of Wallpapers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWallpapers.map((wallpaper) => {
          const content = kidsLang === "fr" ? wallpaper.fr : wallpaper.en;
          const isDownloading = downloadingId === wallpaper.id;
          const isSuccess = downloadSuccessId === wallpaper.id;

          return (
            <div
              key={wallpaper.id}
              className="group bg-[#09152B] border-2 border-slate-800 hover:border-amber-400/60 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between hover:shadow-amber-500/10 hover:-translate-y-1"
            >
              {/* Smartphone Frame Mockup Preview */}
              <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex justify-center">
                <div className="relative w-56 aspect-[9/16] rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-black">
                  
                  {/* Phone Notch / Dynamic Island */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black/90 rounded-full z-20 border border-slate-800" />
                  
                  {/* Phone Status bar mock */}
                  <div className="absolute top-2.5 left-4 right-4 flex items-center justify-between text-[8px] font-bold text-white/90 z-20">
                    <span>09:41</span>
                    <div className="flex items-center gap-1">
                      <span>5G</span>
                      <span>🔋 100%</span>
                    </div>
                  </div>

                  {/* Wallpaper Artwork Image */}
                  <img
                    src={wallpaper.imageSrc}
                    alt={content.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />

                  {/* Scrim Overlay & Mock Lock Screen typography */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-black/30 flex flex-col justify-between p-3 pt-8 text-center pointer-events-none">
                    
                    {/* Time Widget */}
                    <div className="pt-2 text-white drop-shadow-md">
                      <div className="text-2xl font-light tracking-tight">09:41</div>
                      <div className="text-[9px] text-slate-200 capitalize">
                        {kidsLang === "fr" ? "Dimanche 12 Novembre" : "Sunday, November 12"}
                      </div>
                    </div>

                    {/* Bottom Verse on lockscreen */}
                    <div className="pb-2 space-y-1 drop-shadow-lg">
                      <span className="text-[10px] font-bold text-amber-300 block font-serif">
                        {content.title}
                      </span>
                      <p className="text-[8px] text-white italic line-clamp-2 leading-tight">
                        « {content.verse} »
                      </p>
                      <span className="text-[7px] text-amber-400 font-bold block">
                        {content.reference}
                      </span>
                    </div>

                  </div>

                </div>
              </div>

              {/* Wallpaper Details & Actions */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/20">
                      {content.tag}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      📱 1080 × 1920 HD
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-serif group-hover:text-amber-300 transition">
                    {content.title}
                  </h3>

                  <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                    « {content.verse} » <span className="text-amber-400 font-bold not-italic block mt-1">— {content.reference}</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleDownload(wallpaper)}
                    disabled={isDownloading}
                    className={`w-full py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition shadow-lg active:scale-95 ${
                      isSuccess
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950"
                    }`}
                  >
                    {isSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                        <span>{kidsLang === "fr" ? "Fond d'écran Téléchargé ! 🎉" : "Downloaded Successfully! 🎉"}</span>
                      </>
                    ) : isDownloading ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                        <span>{kidsLang === "fr" ? "Génération HD en cours..." : "Generating HD PNG..."}</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-slate-950" />
                        <span>{kidsLang === "fr" ? "Télécharger en HD (Mobile)" : "Download HD Wallpaper"}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setPreviewWallpaper(wallpaper)}
                    className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{kidsLang === "fr" ? "Aperçu Plein Écran" : "Fullscreen Preview"}</span>
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Fullscreen Interactive Smartphone Preview Modal */}
      {previewWallpaper && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="relative max-w-sm w-full my-6 flex flex-col items-center">
            
            {/* Close Button */}
            <button
              onClick={() => setPreviewWallpaper(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Life-sized Mock Phone */}
            <div className="w-full aspect-[9/18] rounded-[40px] overflow-hidden border-4 border-slate-700 shadow-2xl relative bg-black flex flex-col justify-between">
              
              {/* Phone Camera Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 border border-slate-800" />
              
              {/* Status Bar */}
              <div className="absolute top-3.5 left-6 right-6 flex items-center justify-between text-[11px] font-bold text-white z-30">
                <span>09:41</span>
                <div className="flex items-center gap-1.5">
                  <span>5G</span>
                  <span>🔋 100%</span>
                </div>
              </div>

              {/* Wallpaper Background Image */}
              <img
                src={previewWallpaper.imageSrc}
                alt="Wallpaper Preview"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Lockscreen typography overlay */}
              <div className="relative z-20 flex-1 flex flex-col justify-between p-6 pt-16 text-center bg-gradient-to-t from-slate-950/95 via-transparent to-black/40">
                
                {/* Big Time */}
                <div className="pt-6 text-white drop-shadow-xl space-y-1">
                  <div className="text-6xl font-light tracking-tight">09:41</div>
                  <div className="text-xs text-slate-200 capitalize">
                    {kidsLang === "fr" ? "Dimanche 12 Novembre" : "Sunday, November 12"}
                  </div>
                </div>

                {/* Bottom Scripture Quote Card on Lock Screen */}
                <div className="space-y-3 pb-8">
                  <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-2xl space-y-1.5">
                    <span className="text-xs font-bold text-amber-300 font-serif block">
                      {kidsLang === "fr" ? previewWallpaper.fr.title : previewWallpaper.en.title}
                    </span>
                    <p className="text-xs italic text-slate-100 leading-snug">
                      « {kidsLang === "fr" ? previewWallpaper.fr.verse : previewWallpaper.en.verse} »
                    </p>
                    <span className="text-[10px] font-bold text-amber-400 block">
                      — {kidsLang === "fr" ? previewWallpaper.fr.reference : previewWallpaper.en.reference} —
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-300 flex items-center justify-center gap-1 pt-1 opacity-80">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{kidsLang === "fr" ? "Glisser vers le haut pour déverrouiller" : "Swipe up to unlock"}</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Quick Action below modal */}
            <div className="mt-4 w-full flex items-center gap-3">
              <button
                onClick={() => {
                  handleDownload(previewWallpaper);
                }}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>{kidsLang === "fr" ? "Télécharger cette image en HD" : "Download This Wallpaper HD"}</span>
              </button>

              <button
                onClick={() => setPreviewWallpaper(null)}
                className="px-5 py-3 rounded-2xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700"
              >
                {kidsLang === "fr" ? "Fermer" : "Close"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
