"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { ChatMessage } from "@/lib/types";
import Navbar from "@/components/Navbar";
import { Send, Bot, User, Loader2, Sparkles, Heart, MessageCircle } from "lucide-react";

const quickPrompts = [
  "I'm feeling anxious about a social event",
  "Give me a conversation starter",
  "How do I handle awkward silences?",
  "I need motivation today",
  "Help me prepare for a meeting",
  "Tips for making eye contact",
];

export default function CoachPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hey there! 👋 I'm your AI Confidence Coach. I'm here to help you navigate social situations, overcome anxiety, and build genuine confidence.\n\nWhether you need a pep talk, conversation starters, or tips for a specific situation — I've got you. What's on your mind today? ✨",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", content: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const data = await api.chat(text.trim());
      const aiMsg: ChatMessage = { role: "assistant", content: data.reply, timestamp: new Date() };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errMsg: ChatMessage = {
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again in a moment. 💙",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI Confidence Coach</h1>
            <p className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              Always here for you
            </p>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2" style={{ maxHeight: "calc(100vh - 320px)" }}>
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1"
                    style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <div className={`text-[10px] mt-2 ${msg.role === "user" ? "text-white/50 text-right" : ""}`}
                    style={msg.role === "assistant" ? { color: "var(--text-muted)" } : {}}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>

                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid var(--glass-border)" }}>
                    <User className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="chat-bubble-ai px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="px-3 py-2 rounded-xl text-xs font-medium transition-all"
                style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)", color: "var(--text-secondary)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(139,92,246,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(139,92,246,0.08)"; }}
              >
                {prompt}
              </button>
            ))}
          </motion.div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your coach anything..."
            disabled={loading}
            className="flex-1 px-5 py-3.5 rounded-2xl text-sm outline-none transition-all focus:ring-2 focus:ring-purple-500/30"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)", color: "var(--text-primary)" }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="gradient-btn !rounded-2xl !px-5 flex items-center gap-2 disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
