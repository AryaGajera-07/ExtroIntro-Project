// ─── User Types ──────────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  email: string;
  xp: number;
  streak: number;
  level: number;
  confidence_score: number;
  social_energy: number;
  rank: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// ─── Challenge Types ─────────────────────────────────────────
export interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  xp_reward: number;
  category: string;
  icon: string;
}

export interface ChallengeCompletion {
  message: string;
  xp_earned: number;
  total_xp: number;
  level: number;
  streak: number;
  rank: string;
  confidence_score: number;
}

// ─── Mood Types ──────────────────────────────────────────────
export interface MoodLog {
  id: number;
  mood_score: number;
  anxiety_score: number;
  confidence_score: number;
  social_energy: number;
  notes: string;
  created_at: string;
}

// ─── Reflection Types ────────────────────────────────────────
export interface Reflection {
  id: number;
  challenge_id: number;
  challenge_title: string;
  challenge_difficulty: string;
  reflection: string;
  completed_at: string | null;
}

// ─── Chat Types ──────────────────────────────────────────────
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── Stats Types ─────────────────────────────────────────────
export interface Achievement {
  name: string;
  icon: string;
  description: string;
}

export interface WeeklyCompletion {
  day: string;
  date: string;
  count: number;
}

export interface MoodHistory {
  date: string;
  mood: number;
  anxiety: number;
  confidence: number;
  energy: number;
}

export interface Stats {
  total_challenges: number;
  completed_challenges: number;
  current_streak: number;
  total_xp: number;
  level: number;
  rank: string;
  confidence_score: number;
  social_energy: number;
  mood_history: MoodHistory[];
  weekly_completions: WeeklyCompletion[];
  achievements: Achievement[];
}
