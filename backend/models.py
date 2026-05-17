from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    xp = Column(Integer, default=0)
    streak = Column(Integer, default=0)
    level = Column(Integer, default=1)
    confidence_score = Column(Float, default=0.0)
    social_energy = Column(Float, default=50.0)
    rank = Column(String(50), default="Silent Starter")
    last_active = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)

    challenges = relationship("UserChallenge", back_populates="user")
    mood_logs = relationship("MoodLog", back_populates="user")


class Challenge(Base):
    __tablename__ = "challenges"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, default="")
    difficulty = Column(String(20), nullable=False)  # beginner, intermediate, advanced
    xp_reward = Column(Integer, default=10)
    category = Column(String(50), default="social")
    icon = Column(String(50), default="smile")

    user_challenges = relationship("UserChallenge", back_populates="challenge")


class UserChallenge(Base):
    __tablename__ = "user_challenges"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    challenge_id = Column(Integer, ForeignKey("challenges.id"), nullable=False)
    completed = Column(Boolean, default=False)
    reflection = Column(Text, default="")
    assigned_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="challenges")
    challenge = relationship("Challenge", back_populates="user_challenges")


class MoodLog(Base):
    __tablename__ = "mood_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    mood_score = Column(Float, default=5.0)
    anxiety_score = Column(Float, default=5.0)
    confidence_score = Column(Float, default=5.0)
    social_energy = Column(Float, default=5.0)
    notes = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="mood_logs")
