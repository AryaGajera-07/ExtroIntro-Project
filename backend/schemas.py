from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# ─── Auth Schemas ─────────────────────────────────────────────
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    xp: int
    streak: int
    level: int
    confidence_score: float
    social_energy: float
    rank: str
    created_at: datetime

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# ─── Challenge Schemas ────────────────────────────────────────
class ChallengeResponse(BaseModel):
    id: int
    title: str
    description: str
    difficulty: str
    xp_reward: int
    category: str
    icon: str

    class Config:
        from_attributes = True

class CompleteChallenge(BaseModel):
    challenge_id: int
    reflection: Optional[str] = ""

class UserChallengeResponse(BaseModel):
    id: int
    challenge_id: int
    completed: bool
    reflection: str
    assigned_at: datetime
    completed_at: Optional[datetime]
    challenge: ChallengeResponse

    class Config:
        from_attributes = True


# ─── Mood Schemas ─────────────────────────────────────────────
class MoodLogCreate(BaseModel):
    mood_score: float
    anxiety_score: float
    confidence_score: float
    social_energy: float
    notes: Optional[str] = ""

class MoodLogResponse(BaseModel):
    id: int
    mood_score: float
    anxiety_score: float
    confidence_score: float
    social_energy: float
    notes: str
    created_at: datetime

    class Config:
        from_attributes = True


# ─── AI Chat Schemas ──────────────────────────────────────────
class ChatMessage(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str


# ─── Reflection Schemas ──────────────────────────────────────
class ReflectionCreate(BaseModel):
    challenge_id: int
    reflection: str

class ReflectionResponse(BaseModel):
    id: int
    challenge_id: int
    reflection: str
    completed_at: Optional[datetime]
    challenge: ChallengeResponse

    class Config:
        from_attributes = True


# ─── Analytics Schemas ────────────────────────────────────────
class StatsResponse(BaseModel):
    total_challenges: int
    completed_challenges: int
    current_streak: int
    total_xp: int
    level: int
    rank: str
    confidence_score: float
    social_energy: float
    mood_history: list
    weekly_completions: list
    achievements: list
