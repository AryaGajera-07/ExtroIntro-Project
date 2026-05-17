"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { Challenge } from "@/lib/types";
import { getRandomQuote, getDifficultyColor, getDifficultyBg } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import {
  Zap, Target, Flame, Shield, TrendingUp, Award,
  CheckCircle2, Sparkles, Quote, Brain, Battery, Loader2, PartyPopper
} from "lucide-react";

export default function DashboardPage() {
  const { user, loading: authLoading, updateUser } = useAuth();
  const router = useRouter();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loadingChallenge, setLoadingChallenge] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reflection, setReflection] = useState("");
  const [showReflection, setShowReflection] = useState(false);
  const [quote] = useState(getRandomQuote());
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchChallenge = useCallback(async () => {
    try {
      const data = await api.getDailyChallenge();
      setChallenge(data);
    } catch (err) {
      console.error("Failed to fetch challenge:", err);
    } finally {
      setLoadingChallenge(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }
    if (user) fetchChallenge();
  }, [user, authLoading, router, fetchChallenge]);

  const handleComplete = async () => {
    if (!challenge) return;
    setCompleting(true);
    try {
      const result = await api.completeChallenge(challenge.id, reflection);
      setCompleted(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      // Update user context
      if (user) {
        updateUser({
          ...user,
          xp: result.total_xp,
          level: result.level,
          streak: result.streak,
          rank: result.rank,
          confidence_score: result.confidence_score,
        });
      }
    } catch (err) {
      console.error("Failed to complete challenge:", err);
    } finally {
      setCompleting(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  const xpForNext = user.level * 100;
  const xpProgress = ((user.xp % 100) / 100) * 100;

  const statCards = [
    { label: "Level", value: user.level, icon: Award, color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
    { label: "Total XP", value: user.xp, icon: Zap, color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
    { label: "Streak", value: `${user.streak} 🔥`, icon: Flame, color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    { label: "Confidence", value: `${Math.round(user.confidence_score)}%`, icon: Shield, color: "#06b6d4", bg: "rgba(6,182,212,0.1)" },
  ];

  const conversationStarters = [
    "What's something exciting you're working on?",
    "Have you watched anything good recently?",
    "What's the best advice you've ever received?",
    "If you could learn any skill instantly, what would it be?",
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-sm"
                style={{
                  background: ["#8b5cf6", "#3b82f6", "#06b6d4", "#f59e0b", "#ec4899", "#10b981"][i % 6],
                  left: `${Math.random() * 100}%`,
                  top: -20,
                }}
                initial={{ y: -20, opacity: 1, rotate: 0 }}
                animate={{
                  y: window.innerHeight + 20,
                  opacity: 0,
                  rotate: Math.random() * 720,
                  x: (Math.random() - 0.5) * 200,
                }}
                transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5, ease: "easeOut" }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">
            Welcome back, <span className="gradient-text">{user.name}</span> 👋
          </h1>
          <p style={{ color: "var(--text-secondary)" }} className="text-sm">
            {user.rank} • Level {user.level} • Keep pushing your boundaries!
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: stat.bg, border: `1px solid ${stat.color}30` }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
              </div>
              <div className="text-2xl font-bold stat-number">{stat.value}</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* XP Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Level Progress</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{user.xp % 100}/{100} XP to Level {user.level + 1}</span>
              </div>
              <div className="progress-track">
                <motion.div
                  className="progress-fill"
                  initial={{ width: "0%" }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            {/* Daily Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 glow-purple"
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-bold">Today&apos;s Challenge</h2>
              </div>

              {loadingChallenge ? (
                <div className="space-y-3">
                  <div className="skeleton h-6 w-3/4" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-10 w-40 mt-4" />
                </div>
              ) : challenge ? (
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold">{challenge.title}</h3>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold border whitespace-nowrap ${getDifficultyBg(challenge.difficulty)} ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>{challenge.description}</p>

                  <div className="flex items-center gap-4 mb-5 text-sm" style={{ color: "var(--text-muted)" }}>
                    <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-purple-400" /> +{challenge.xp_reward} XP</span>
                    <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-cyan-400" /> {challenge.category}</span>
                  </div>

                  {!completed ? (
                    <div>
                      {!showReflection ? (
                        <button
                          onClick={() => setShowReflection(true)}
                          className="gradient-btn !rounded-xl flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Complete Challenge</span>
                        </button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-3"
                        >
                          <textarea
                            value={reflection}
                            onChange={(e) => setReflection(e.target.value)}
                            placeholder="How did it go? How did you feel? (optional)"
                            rows={3}
                            className="w-full p-3 rounded-xl text-sm outline-none resize-none focus:ring-2 focus:ring-purple-500/30"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)", color: "var(--text-primary)" }}
                          />
                          <div className="flex gap-3">
                            <button
                              onClick={handleComplete}
                              disabled={completing}
                              className="gradient-btn !rounded-xl flex items-center gap-2 disabled:opacity-50"
                            >
                              {completing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                              <span>{completing ? "Saving..." : "Submit & Earn XP"}</span>
                            </button>
                            <button
                              onClick={() => setShowReflection(false)}
                              className="px-4 py-2 rounded-xl text-sm"
                              style={{ color: "var(--text-muted)", border: "1px solid var(--glass-border)" }}
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 p-4 rounded-xl"
                      style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)" }}
                    >
                      <PartyPopper className="w-6 h-6 text-emerald-400" />
                      <div>
                        <p className="font-semibold text-emerald-300">Challenge Completed! 🎉</p>
                        <p className="text-xs text-emerald-400/70">+{challenge.xp_reward} XP earned</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <p style={{ color: "var(--text-muted)" }}>No challenges available right now.</p>
              )}
            </motion.div>

            {/* Social Energy Meter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Battery className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold">Social Energy</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="progress-track" style={{ height: "12px" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: user.social_energy > 60
                          ? "linear-gradient(90deg, #10b981, #06b6d4)"
                          : user.social_energy > 30
                            ? "linear-gradient(90deg, #f59e0b, #eab308)"
                            : "linear-gradient(90deg, #ef4444, #f59e0b)",
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${Math.min(100, user.social_energy)}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <span className="text-lg font-bold" style={{ color: "var(--text-secondary)" }}>{Math.round(user.social_energy)}%</span>
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                {user.social_energy > 60 ? "You're feeling energized! Great time for a challenge 💪" :
                  user.social_energy > 30 ? "Moderate energy. Take it easy today 🌿" :
                    "Low energy. Rest and recharge — that's okay! 🫂"}
              </p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Motivational Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6"
            >
              <Quote className="w-8 h-8 text-purple-400/40 mb-3" />
              <p className="text-sm italic leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                &ldquo;{quote.text}&rdquo;
              </p>
              <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>— {quote.author}</p>
            </motion.div>

            {/* Rank Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-6 text-center glow-blue"
            >
              <div className="text-4xl mb-3">
                {user.rank === "Silent Starter" ? "🌱" :
                  user.rank === "Shy Whisperer" ? "🌸" :
                    user.rank === "Brave Speaker" ? "🗣️" :
                      user.rank === "Social Explorer" ? "🧭" :
                        user.rank === "Conversation Crafter" ? "✨" :
                          user.rank === "Connection Builder" ? "🌉" :
                            user.rank === "Charisma Champion" ? "🏆" :
                              user.rank === "Conversation Master" ? "👑" : "🦋"}
              </div>
              <h3 className="font-bold text-lg">{user.rank}</h3>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Current Social Rank</p>
            </motion.div>

            {/* Conversation Starters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-sm">Conversation Starters</h3>
              </div>
              <div className="space-y-2">
                {conversationStarters.map((starter, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl text-xs cursor-pointer transition-all"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(139,92,246,0.08)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}
                  >
                    <p style={{ color: "var(--text-secondary)" }}>&ldquo;{starter}&rdquo;</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
