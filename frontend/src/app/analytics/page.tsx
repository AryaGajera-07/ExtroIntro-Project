"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { Stats } from "@/lib/types";
import Navbar from "@/components/Navbar";
import {
  BarChart3, Loader2, Trophy, Target, Flame, Zap,
  TrendingUp, Award, Calendar, Star, Shield
} from "lucide-react";

export default function AnalyticsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      api.getStats()
        .then(setStats)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]);

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="gradient-text">Analytics</span> & Insights
          </h1>
          <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
            Track your confidence growth journey
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton h-32 w-full" />
            ))}
          </div>
        ) : stats ? (
          <>
            {/* Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Challenges Done", value: stats.completed_challenges, total: stats.total_challenges, icon: Target, color: "#8b5cf6" },
                { label: "Current Streak", value: `${stats.current_streak} days`, icon: Flame, color: "#f59e0b" },
                { label: "Total XP", value: stats.total_xp.toLocaleString(), icon: Zap, color: "#3b82f6" },
                { label: "Level", value: stats.level, icon: Award, color: "#06b6d4" },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card p-5"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}>
                    <card.icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>
                  <div className="text-2xl font-bold stat-number">{card.value}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{card.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Weekly Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2 glass-card p-6"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-bold">Weekly Activity</h2>
                </div>

                <div className="flex items-end justify-between gap-2 h-40">
                  {stats.weekly_completions.map((day, i) => {
                    const maxCount = Math.max(...stats.weekly_completions.map(d => d.count), 1);
                    const height = day.count > 0 ? Math.max(20, (day.count / maxCount) * 100) : 8;
                    return (
                      <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                          {day.count > 0 ? day.count : ""}
                        </span>
                        <motion.div
                          className="w-full rounded-xl"
                          style={{
                            background: day.count > 0
                              ? "var(--gradient-button)"
                              : "rgba(255,255,255,0.04)",
                            minHeight: "8px"
                          }}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                        />
                        <span className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
                          {day.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Rank & Confidence */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                {/* Rank */}
                <div className="glass-card p-6 text-center glow-purple">
                  <div className="text-4xl mb-2">
                    {stats.rank === "Silent Starter" ? "🌱" :
                      stats.rank === "Shy Whisperer" ? "🌸" :
                        stats.rank === "Brave Speaker" ? "🗣️" :
                          stats.rank === "Social Explorer" ? "🧭" :
                            stats.rank === "Conversation Crafter" ? "✨" : "🏆"}
                  </div>
                  <h3 className="font-bold">{stats.rank}</h3>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Social Rank</p>
                </div>

                {/* Confidence Score */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-bold text-sm">Confidence</h3>
                  </div>
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                      <motion.circle
                        cx="50" cy="50" r="42" fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 42}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - stats.confidence_score / 100) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="50%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold">{Math.round(stats.confidence_score)}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mood Chart */}
            {stats.mood_history.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6 mb-8"
              >
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-lg font-bold">Mood Trends</h2>
                </div>

                <div className="h-48 flex items-end gap-1">
                  {stats.mood_history.map((entry, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col gap-0.5" style={{ height: "160px" }}>
                        {[
                          { value: entry.mood, color: "#8b5cf6", label: "Mood" },
                          { value: entry.confidence, color: "#06b6d4", label: "Conf" },
                        ].map((metric) => (
                          <motion.div
                            key={metric.label}
                            className="w-full rounded-sm"
                            style={{ background: metric.color }}
                            initial={{ height: 0 }}
                            animate={{ height: `${(metric.value / 10) * 50}%` }}
                            transition={{ duration: 0.8, delay: i * 0.05 }}
                          />
                        ))}
                      </div>
                      <span className="text-[8px]" style={{ color: "var(--text-muted)" }}>{entry.date}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-4 justify-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ background: "#8b5cf6" }} />
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>Mood</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ background: "#06b6d4" }} />
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>Confidence</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold">Achievements</h2>
              </div>

              {stats.achievements.length === 0 ? (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Complete challenges to unlock achievements!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {stats.achievements.map((achievement, i) => (
                    <motion.div
                      key={achievement.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className="p-4 rounded-xl text-center"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <h4 className="text-xs font-bold mb-1">{achievement.name}</h4>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{achievement.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        ) : (
          <div className="text-center py-12">
            <BarChart3 className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
            <p style={{ color: "var(--text-muted)" }}>Unable to load analytics. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}
