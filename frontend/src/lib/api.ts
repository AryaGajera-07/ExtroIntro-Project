import { AuthResponse, Challenge, ChallengeCompletion, Stats, Reflection, MoodLog } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token");
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "An error occurred" }));
      throw new Error(error.detail || `API error: ${response.status}`);
    }

    return response.json();
  }

  // ─── Auth ────────────────────────────────────────────────
  async signup(name: string, email: string, password: string): Promise<AuthResponse> {
    const data = await this.request<AuthResponse>("/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    this.setToken(data.access_token);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = await this.request<AuthResponse>("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.access_token);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  }

  logout() {
    this.clearToken();
  }

  // ─── Challenges ──────────────────────────────────────────
  async getDailyChallenge(): Promise<Challenge> {
    return this.request<Challenge>("/daily-challenge");
  }

  async completeChallenge(challengeId: number, reflection: string = ""): Promise<ChallengeCompletion> {
    return this.request<ChallengeCompletion>("/complete-challenge", {
      method: "POST",
      body: JSON.stringify({ challenge_id: challengeId, reflection }),
    });
  }

  // ─── AI Chat ─────────────────────────────────────────────
  async chat(message: string): Promise<{ reply: string }> {
    return this.request<{ reply: string }>("/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  }

  // ─── Journal ─────────────────────────────────────────────
  async saveReflection(challengeId: number, reflection: string): Promise<{ message: string }> {
    return this.request<{ message: string }>("/reflection", {
      method: "POST",
      body: JSON.stringify({ challenge_id: challengeId, reflection }),
    });
  }

  async getReflections(): Promise<Reflection[]> {
    return this.request<Reflection[]>("/reflections");
  }

  // ─── Mood ────────────────────────────────────────────────
  async logMood(mood: number, anxiety: number, confidence: number, energy: number, notes: string = ""): Promise<{ message: string }> {
    return this.request<{ message: string }>("/mood", {
      method: "POST",
      body: JSON.stringify({
        mood_score: mood,
        anxiety_score: anxiety,
        confidence_score: confidence,
        social_energy: energy,
        notes,
      }),
    });
  }

  async getMoodHistory(): Promise<MoodLog[]> {
    return this.request<MoodLog[]>("/mood-history");
  }

  // ─── Analytics ───────────────────────────────────────────
  async getStats(): Promise<Stats> {
    return this.request<Stats>("/stats");
  }
}

export const api = new ApiClient();
