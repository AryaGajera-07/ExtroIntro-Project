"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowRight, Zap, Target, Brain, TrendingUp,
  Shield, MessageCircle, Star, Users, ChevronRight, Heart
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6 }
  }),
};

const features = [
  { icon: Target, title: "Daily Social Challenges", desc: "AI-generated tasks that gradually push your comfort zone — from smiling at strangers to leading discussions.", color: "#8b5cf6" },
  { icon: Brain, title: "AI Confidence Coach", desc: "A supportive AI companion that gives personalized advice, conversation starters, and anxiety management tips.", color: "#3b82f6" },
  { icon: TrendingUp, title: "Track Your Growth", desc: "Beautiful analytics showing your confidence scores, mood trends, streaks, and social energy over time.", color: "#06b6d4" },
  { icon: Zap, title: "Gamified Progress", desc: "Earn XP, unlock ranks, build streaks, and collect achievement badges as you level up your social skills.", color: "#f59e0b" },
  { icon: Shield, title: "Safe & Supportive", desc: "No judgment, no pressure. Go at your own pace with challenges matched to your current comfort level.", color: "#10b981" },
  { icon: MessageCircle, title: "Reflection Journal", desc: "Document your journey, process emotions, and watch your personal growth story unfold beautifully.", color: "#ec4899" },
];

const testimonials = [
  { name: "Priya S.", role: "College Student", text: "ExtroIntro changed my life. I went from dreading group projects to actually volunteering to present. The daily challenges made it feel like a game!", avatar: "🌸" },
  { name: "Alex K.", role: "Software Developer", text: "As a remote worker, my social skills were fading. The AI coach helped me prepare for networking events and now I actually enjoy them.", avatar: "🚀" },
  { name: "Mira R.", role: "Freelancer", text: "The streak system kept me accountable. 47 days in and I've gone from 'Silent Starter' to 'Social Explorer'. That rank up felt amazing!", avatar: "✨" },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50K+", label: "Challenges Done" },
  { value: "92%", label: "Feel More Confident" },
  { value: "4.9★", label: "User Rating" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* ─── Top Nav ──────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 glass" style={{ borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-button)" }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">ExtroIntro</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="px-4 py-2 text-sm font-medium rounded-xl transition-all hover:bg-white/5" style={{ color: "var(--text-secondary)" }}>
              Log in
            </Link>
            <Link href="/signup" className="gradient-btn !py-2 !px-5 !text-sm !rounded-xl">
              <span>Get Started</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: "rgba(139, 92, 246, 0.1)", border: "1px solid rgba(139, 92, 246, 0.2)" }}>
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">AI-Powered Social Confidence Builder</span>
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Transform From{" "}
            <span className="gradient-text">Introvert</span>{" "}
            to Socially{" "}
            <span className="gradient-text">Confident</span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10" style={{ color: "var(--text-secondary)" }}>
            Daily AI-powered challenges, gamified progress, and a supportive coach
            that helps you build real-world social skills — one small step at a time.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="gradient-btn !py-3.5 !px-8 !text-base !rounded-2xl flex items-center gap-2 group">
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="#features" className="px-8 py-3.5 rounded-2xl text-base font-medium transition-all border"
              style={{ color: "var(--text-secondary)", borderColor: "var(--glass-border)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
              See How It Works
            </Link>
          </motion.div>

          {/* Hero visual */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
            className="mt-16 relative max-w-3xl mx-auto">
            <div className="glass-card p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>Today&apos;s Challenge</p>
                  <h3 className="text-xl font-bold mt-1">Start a conversation with a colleague ✨</h3>
                </div>
                <div className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Intermediate
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-purple-400" /> +30 XP</span>
                <span className="flex items-center gap-1.5"><Target className="w-4 h-4 text-blue-400" /> Level 4</span>
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400" /> 12 Day Streak</span>
              </div>
              <div className="mt-6">
                <div className="progress-track">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: "0%" }}
                    animate={{ width: "68%" }}
                    transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                  />
                </div>
                <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>68% to Level 5</p>
              </div>
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -top-4 -right-4 glass-card px-4 py-2 flex items-center gap-2"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-2xl">🔥</span>
              <div>
                <p className="text-xs font-bold text-orange-400">12 Day Streak!</p>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Keep going!</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Bar ────────────────────────────────────── */}
      <section className="py-12 px-4" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid var(--glass-border)", borderBottom: "1px solid var(--glass-border)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}>
              <div className="text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────── */}
      <section id="features" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Level Up</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              A complete toolkit designed to help introverts build lasting social confidence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div key={feature.title}
                className="glass-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}30` }}>
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it Works ─────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How <span className="gradient-text">ExtroIntro</span> Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Get Your Challenge", desc: "Each day, receive an AI-curated social challenge matched to your comfort level.", icon: "🎯" },
              { step: "02", title: "Take Action", desc: "Complete the challenge in the real world. Start small — even a smile counts!", icon: "💪" },
              { step: "03", title: "Reflect & Grow", desc: "Write a reflection, earn XP, and watch your confidence score climb.", icon: "🌟" },
            ].map((item, i) => (
              <motion.div key={item.step} className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}>
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-xs font-bold mb-2 gradient-text">STEP {item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Thousands</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} className="glass-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ background: "rgba(139, 92, 246, 0.15)" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <motion.div className="max-w-3xl mx-auto text-center glass-card p-12 glow-purple"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Your <span className="gradient-text">Journey</span>?
          </h2>
          <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
            Join thousands of introverts who are building real social confidence, one challenge at a time.
          </p>
          <Link href="/signup" className="gradient-btn !py-4 !px-10 !text-base !rounded-2xl inline-flex items-center gap-2 group">
            <span>Begin For Free</span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            No credit card required. Start building confidence today.
          </p>
        </motion.div>
      </section>

      {/* ─── Footer ───────────────────────────────────────── */}
      <footer className="py-12 px-4 sm:px-6" style={{ borderTop: "1px solid var(--glass-border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="font-bold gradient-text">ExtroIntro</span>
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Made with <Heart className="w-3.5 h-3.5 inline text-rose-400 fill-rose-400" /> for introverts everywhere
          </p>
        </div>
      </footer>
    </div>
  );
}
