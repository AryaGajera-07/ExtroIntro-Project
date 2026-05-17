from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db
from models import User, UserChallenge, MoodLog, Challenge
from schemas import MoodLogCreate, MoodLogResponse, StatsResponse
from auth import get_current_user
from datetime import datetime, timedelta

router = APIRouter(tags=["Analytics"])


@router.post("/mood")
def log_mood(
    data: MoodLogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    mood_log = MoodLog(
        user_id=current_user.id,
        mood_score=data.mood_score,
        anxiety_score=data.anxiety_score,
        confidence_score=data.confidence_score,
        social_energy=data.social_energy,
        notes=data.notes or "",
    )
    db.add(mood_log)

    # Update user's current scores
    current_user.confidence_score = data.confidence_score * 10
    current_user.social_energy = data.social_energy * 10

    db.commit()
    return {"message": "Mood logged successfully 🌟"}


@router.get("/mood-history")
def get_mood_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    logs = db.query(MoodLog).filter(
        MoodLog.user_id == current_user.id
    ).order_by(MoodLog.created_at.desc()).limit(30).all()

    return [
        {
            "id": log.id,
            "mood_score": log.mood_score,
            "anxiety_score": log.anxiety_score,
            "confidence_score": log.confidence_score,
            "social_energy": log.social_energy,
            "notes": log.notes,
            "created_at": log.created_at.isoformat(),
        }
        for log in reversed(logs)
    ]


@router.get("/stats")
def get_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    total = db.query(UserChallenge).filter(UserChallenge.user_id == current_user.id).count()
    completed = db.query(UserChallenge).filter(
        UserChallenge.user_id == current_user.id,
        UserChallenge.completed == True
    ).count()

    # Mood history for charts
    mood_logs = db.query(MoodLog).filter(
        MoodLog.user_id == current_user.id
    ).order_by(MoodLog.created_at.desc()).limit(14).all()

    mood_history = [
        {
            "date": log.created_at.strftime("%b %d"),
            "mood": log.mood_score,
            "anxiety": log.anxiety_score,
            "confidence": log.confidence_score,
            "energy": log.social_energy,
        }
        for log in reversed(mood_logs)
    ]

    # Weekly completions
    weekly = []
    for i in range(6, -1, -1):
        day = datetime.utcnow() - timedelta(days=i)
        day_start = day.replace(hour=0, minute=0, second=0, microsecond=0)
        day_end = day_start + timedelta(days=1)
        count = db.query(UserChallenge).filter(
            UserChallenge.user_id == current_user.id,
            UserChallenge.completed == True,
            UserChallenge.completed_at >= day_start,
            UserChallenge.completed_at < day_end
        ).count()
        weekly.append({
            "day": day.strftime("%a"),
            "date": day.strftime("%b %d"),
            "count": count
        })

    # Achievements
    achievements = []
    if completed >= 1:
        achievements.append({"name": "First Step", "icon": "🌱", "description": "Complete your first challenge"})
    if completed >= 5:
        achievements.append({"name": "Getting Started", "icon": "🚀", "description": "Complete 5 challenges"})
    if completed >= 10:
        achievements.append({"name": "Dedicated", "icon": "⭐", "description": "Complete 10 challenges"})
    if completed >= 25:
        achievements.append({"name": "Social Warrior", "icon": "⚔️", "description": "Complete 25 challenges"})
    if completed >= 50:
        achievements.append({"name": "Unstoppable", "icon": "🔥", "description": "Complete 50 challenges"})
    if current_user.streak >= 3:
        achievements.append({"name": "Hat Trick", "icon": "🎩", "description": "3-day streak"})
    if current_user.streak >= 7:
        achievements.append({"name": "Weekly Warrior", "icon": "💪", "description": "7-day streak"})
    if current_user.streak >= 30:
        achievements.append({"name": "Monthly Master", "icon": "👑", "description": "30-day streak"})
    if current_user.xp >= 1000:
        achievements.append({"name": "XP Hunter", "icon": "💎", "description": "Earn 1000 XP"})

    return {
        "total_challenges": total,
        "completed_challenges": completed,
        "current_streak": current_user.streak,
        "total_xp": current_user.xp,
        "level": current_user.level,
        "rank": current_user.rank,
        "confidence_score": current_user.confidence_score,
        "social_energy": current_user.social_energy,
        "mood_history": mood_history,
        "weekly_completions": weekly,
        "achievements": achievements,
    }
