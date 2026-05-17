import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MOTIVATIONAL_QUOTES = [
  { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { text: "You are braver than you believe, stronger than you seem.", author: "A.A. Milne" },
  { text: "Every expert was once a beginner.", author: "Helen Hayes" },
  { text: "Social skills are like any other skill — they improve with practice.", author: "ExtroIntro" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "The only way to have a friend is to be one.", author: "Ralph Waldo Emerson" },
  { text: "Confidence comes not from always being right, but from not fearing to be wrong.", author: "Peter T. McIntyre" },
  { text: "Small daily improvements are the key to long-term results.", author: "Unknown" },
  { text: "You don't have to be extroverted to be confident.", author: "ExtroIntro" },
  { text: "Connection is why we're here. It gives purpose and meaning to our lives.", author: "Brené Brown" },
];

export function getRandomQuote() {
  return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
}

export function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "beginner": return "text-emerald-400";
    case "intermediate": return "text-amber-400";
    case "advanced": return "text-rose-400";
    default: return "text-purple-400";
  }
}

export function getDifficultyBg(difficulty: string) {
  switch (difficulty) {
    case "beginner": return "bg-emerald-500/20 border-emerald-500/30";
    case "intermediate": return "bg-amber-500/20 border-amber-500/30";
    case "advanced": return "bg-rose-500/20 border-rose-500/30";
    default: return "bg-purple-500/20 border-purple-500/30";
  }
}
