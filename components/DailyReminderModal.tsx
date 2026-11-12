"use client";

import React, { useState, useEffect } from "react";
import { X, Bell, BellRing, Clock, CheckCircle2, AlertCircle, Sparkles, Flame } from "lucide-react";

interface DailyReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const PRESET_HOURS = [
  { label: "Aube avec Dieu", time: "06:00", desc: "Commencer la journée dans la présence du Seigneur" },
  { label: "Avant le départ", time: "07:30", desc: "Méditer avant l'école, l'université ou le travail" },
  { label: "Pause Midi", time: "12:30", desc: "Se ressourcer au milieu de la journée" },
  { label: "Crépuscule", time: "19:00", desc: "Action de grâce pour la journée écoulée" },
  { label: "Soirée & Coucher", time: "21:30", desc: "Prière et paix biblique avant de dormir" },
];

export default function DailyReminderModal({
  isOpen,
  onClose,
  userName = "Fidèle",
}: DailyReminderModalProps) {
  const [selectedTime, setSelectedTime] = useState<string>("06:00");
  const [permissionStatus, setPermissionStatus] = useState<string>("default");
  const [isReminderEnabled, setIsReminderEnabled] = useState<boolean>(false);
  const [testNotificationSent, setTestNotificationSent] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTime = localStorage.getItem("eedsc_reminder_time") || "06:00";
      const savedEnabled = localStorage.getItem("eedsc_reminder_enabled") === "true";
      setSelectedTime(savedTime);
      setIsReminderEnabled(savedEnabled);

      if ("Notification" in window) {
        setPermissionStatus(Notification.permission);
      }
    }
  }, []);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        const perm = await Notification.requestPermission();
        setPermissionStatus(perm);
        if (perm === "granted") {
          setIsReminderEnabled(true);
          localStorage.setItem("eedsc_reminder_enabled", "true");
          localStorage.setItem("eedsc_reminder_time", selectedTime);
          sendSampleNotification();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const sendSampleNotification = () => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      new Notification(`Lecture Quotidienne EEDSC 🔥`, {
        body: `Bonjour ${userName} ! Ta portion biblique du jour t'attend. Viens méditer la Parole de Dieu !`,
        icon: "/logo_eedsc.jpg",
      });
      setTestNotificationSent(true);
      setTimeout(() => setTestNotificationSent(false), 3000);
    }
  };

  const handleToggleReminder = () => {
    const newState = !isReminderEnabled;
    setIsReminderEnabled(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem("eedsc_reminder_enabled", String(newState));
      localStorage.setItem("eedsc_reminder_time", selectedTime);
    }
    if (newState && permissionStatus !== "granted") {
      handleRequestPermission();
    }
  };

  const handleSaveTime = (time: string) => {
    setSelectedTime(time);
    if (typeof window !== "undefined") {
      localStorage.setItem("eedsc_reminder_time", time);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="max-w-md w-full bg-gradient-to-b from-[#0E234B] via-[#08152D] to-[#060E1E] border-2 border-amber-400/50 rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-6 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30 text-amber-300 inline-block">
            <BellRing className="w-7 h-7 text-amber-400 animate-bounce" />
          </div>
          <h3 className="text-xl font-extrabold text-white font-serif">
            Rappel Spirituel Quotidien
          </h3>
          <p className="text-xs text-slate-300">
            Reçois une douce notification chaque matin pour ne jamais éteindre ta flamme de méditation !
          </p>
        </div>

        {/* Toggle Active Switch */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-orange-400 fill-orange-400" />
            <div>
              <span className="text-xs font-bold text-white block">Activer les rappels quotidiens</span>
              <span className="text-[11px] text-slate-400">
                {isReminderEnabled ? `Rappel programmé à ${selectedTime}` : "Désactivé pour l'instant"}
              </span>
            </div>
          </div>

          <button
            onClick={handleToggleReminder}
            className={`w-12 h-6 rounded-full transition relative p-0.5 ${
              isReminderEnabled ? "bg-amber-500" : "bg-slate-800"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                isReminderEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Choose Preferred Hour */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
            Choisis ton heure de rendez-vous avec Dieu :
          </label>

          <div className="grid grid-cols-1 gap-2">
            {PRESET_HOURS.map((item) => {
              const isSelected = selectedTime === item.time;
              return (
                <button
                  key={item.time}
                  onClick={() => handleSaveTime(item.time)}
                  className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                    isSelected
                      ? "bg-amber-500/20 border-amber-400 text-white font-bold ring-1 ring-amber-400/30 shadow"
                      : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-850 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Clock className={`w-4 h-4 ${isSelected ? "text-amber-400" : "text-slate-500"}`} />
                    <div>
                      <span className="text-xs block font-bold">{item.label}</span>
                      <span className="text-[10px] text-slate-400">{item.desc}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded-lg ${
                    isSelected ? "bg-amber-400 text-slate-950" : "bg-slate-800 text-slate-400"
                  }`}>
                    {item.time}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Test Notification Button */}
        <div className="space-y-2 pt-1">
          {permissionStatus === "granted" ? (
            <button
              onClick={sendSampleNotification}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-amber-300 border border-amber-400/30 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>{testNotificationSent ? "✅ Notification envoyée !" : "Tester la notification maintenant"}</span>
            </button>
          ) : (
            <button
              onClick={handleRequestPermission}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition shadow"
            >
              <Bell className="w-4 h-4 text-slate-950" />
              <span>Autoriser les notifications sur mon appareil</span>
            </button>
          )}

          <p className="text-[10px] text-slate-500 text-center">
            Aucun spam. Une seule notification spirituelle par jour à l'heure de votre choix.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 text-xs text-slate-400 hover:text-white transition text-center"
        >
          Valider et fermer
        </button>

      </div>
    </div>
  );
}
