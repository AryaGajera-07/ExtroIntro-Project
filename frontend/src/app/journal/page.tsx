"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { Reflection } from "@/lib/types";
import { getDifficultyColor, getDifficultyBg } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import {
  BookOpen, Loader2, Calendar, Smile, Frown, Meh,
  Heart, Zap, Brain, Battery, Save, ChevronDown
} from "lucide-react";

export default function JournalPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Mood form
  const [mood, setMood] = useState(7);
  const [anxiety, setAnxiety] = useState(4);
  const [confidence, setConfidence] = useState(6);
  const [energy, setEnergy] = useState(6);
  const [moodNotes, setMoodNotes] = useState("");
  const [savingMood, setSavingMood] = useState(false);
  const [moodSaved, setMoodSaved] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      api.getReflections().then(setReflections).catch(console.error).finally(() => setLoadingData(false));
    }
  }, [user]);

  const handleSaveMood = async () => {
    setSavingMood(true);
    try {
      await api.logMood(mood, anxiety, confidence, energy, moodNotes);
      setMoodSaved(true);
      setMoodNotes("");
      setTimeout(() => setMoodSaved(false), 3000);
    } catch (err) {
      console.error("Failed to log mood:", err);
    } finally {
      setSavingMood(false);
    }
  };

  const getMoodEmoji = (score: number) => {
    if (score >= 8) return "😄";
    if (score >= 6) return "🙂";
    if (score >= 4) return "😐";
    if (score >= 2) return "😟";
    return "😢";
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="gradient-text">Journal</span> & Mood Tracker
          </h1>
          <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>Track your emotional journey and reflect on your growth</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Mood Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-rose-400" />
              <h2 className="text-lg font-bold">How are you feeling?</h2>
            </div>

            <div className="space-y-6">
              {/* Mood */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    <Smile className="w-4 h-4 inline mr-1.5" /> Mood
                  </label>
                  <span className="text-2xl">{getMoodEmoji(mood)}</span>
                </div>
                <input
                  type="range" min="1" max="10" value={mood} onChange={(e) => setMood(Number(e.target.value))}
                  className="w-full accent-purple-500 h-2 rounded-full"
                  style={{ background: `linear-gradient(to right, #8b5cf6 ${mood * 10}%, rgba(255,255,255,0.06) ${mood * 10}%)` }}
                />
                <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
                  <span>Low</span><span>{mood}/10</span><span>High</span>
                </div>
              </div>

              {/* Anxiety */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    <Frown className="w-4 h-4 inline mr-1.5" /> Anxiety Level
                  </label>
                  <span className="text-sm font-bold" style={{ color: anxiety > 6 ? "#f43f5e" : anxiety > 3 ? "#f59e0b" : "#10b981" }}>{anxiety}/10</span>
                </div>
                <input
                  type="range" min="1" max="10" value={anxiety} onChange={(e) => setAnxiety(Number(e.target.value))}
                  className="w-full h-2 rounded-full"
                  style={{ background: `linear-gradient(to right, #f43f5e ${anxiety * 10}%, rgba(255,255,255,0.06) ${anxiety * 10}%)`, accentColor: "#f43f5e" }}
                />
              </div>

              {/* Confidence */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    <Zap className="w-4 h-4 inline mr-1.5" /> Confidence
                  </label>
                  <span className="text-sm font-bold text-cyan-400">{confidence}/10</span>
                </div>
                <input
                  type="range" min="1" max="10" value={confidence} onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full h-2 rounded-full"
                  style={{ background: `linear-gradient(to right, #06b6d4 ${confidence * 10}%, rgba(255,255,255,0.06) ${confidence * 10}%)`, accentColor: "#06b6d4" }}
                />
              </div>

              {/* Social Energy */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    <Battery className="w-4 h-4 inline mr-1.5" /> Social Energy
                  </label>
                  <span className="text-sm font-bold text-emerald-400">{energy}/10</span>
                </div>
                <input
                  type="range" min="1" max="10" value={energy} onChange={(e) => setEnergy(Number(e.target.value))}
                  className="w-full h-2 rounded-full"
                  style={{ background: `linear-gradient(to right, #10b981 ${energy * 10}%, rgba(255,255,255,0.06) ${energy * 10}%)`, accentColor: "#10b981" }}
                />
              </div>

              {/* Notes */}
              <textarea
                value={moodNotes}
                onChange={(e) => setMoodNotes(e.target.value)}
                placeholder="Any notes about how you're feeling today? (optional)"
                rows={2}
                className="w-full p-3 rounded-xl text-sm outline-none resize-none focus:ring-2 focus:ring-purple-500/30"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)", color: "var(--text-primary)" }}
              />

              <button
                onClick={handleSaveMood}
                disabled={savingMood}
                className="gradient-btn w-full !rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {savingMood ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{savingMood ? "Saving..." : moodSaved ? "Saved! ✨" : "Log Today's Mood"}</span>
              </button>
            </div>
          </motion.div>

          {/* Reflections List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold">Past Reflections</h2>
            </div>

            {loadingData ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="skeleton h-20 w-full" />
                ))}
              </div>
            ) : reflections.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  No reflections yet. Complete a challenge and write about your experience!
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {reflections.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 rounded-xl transition-all"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-sm font-semibold">{r.challenge_title}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${getDifficultyBg(r.challenge_difficulty)} ${getDifficultyColor(r.challenge_difficulty)}`}>
                        {r.challenge_difficulty}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>
                      {r.reflection}
                    </p>
                    {r.completed_at && (
                      <div className="flex items-center gap-1 text-[10px]" style={{ color: "var(--text-muted)" }}>
                        <Calendar className="w-3 h-3" />
                        {new Date(r.completed_at).toLocaleDateString()}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
