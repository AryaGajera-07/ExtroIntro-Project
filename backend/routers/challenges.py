from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import random
from database import get_db
from models import User, Challenge, UserChallenge
from schemas import ChallengeResponse, CompleteChallenge, UserChallengeResponse
from auth import get_current_user

router = APIRouter(tags=["Challenges"])

RANK_THRESHOLDS = [
    (0, "Silent Starter"),
    (100, "Shy Whisperer"),
    (300, "Brave Speaker"),
    (600, "Social Explorer"),
    (1000, "Conversation Crafter"),
    (1500, "Connection Builder"),
    (2500, "Charisma Champion"),
    (4000, "Conversation Master"),
    (6000, "Social Butterfly"),
    (10000, "Extrovert Legend"),
]

def get_rank(xp: int) -> str:
    rank = "Silent Starter"
    for threshold, name in RANK_THRESHOLDS:
        if xp >= threshold:
            rank = name
    return rank

def get_level(xp: int) -> int:
    return max(1, xp // 100 + 1)

def get_difficulty_for_level(level: int) -> str:
    if level <= 3:
        return "beginner"
    elif level <= 7:
        return "intermediate"
    else:
        return "advanced"


@router.get("/daily-challenge", response_model=ChallengeResponse)
def get_daily_challenge(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    difficulty = get_difficulty_for_level(current_user.level)

    # Check if user already has a challenge assigned today
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    existing = db.query(UserChallenge).filter(
        UserChallenge.user_id == current_user.id,
        UserChallenge.assigned_at >= today_start,
        UserChallenge.completed == False
    ).first()

    if existing:
        return existing.challenge

    # Get challenges at user's difficulty level
    challenges = db.query(Challenge).filter(
        Challenge.difficulty == difficulty
    ).all()

    if not challenges:
        # Fallback to any challenge
        challenges = db.query(Challenge).all()

    if not challenges:
        raise HTTPException(status_code=404, detail="No challenges available")

    # Pick a random challenge
    challenge = random.choice(challenges)

    # Assign it
    user_challenge = UserChallenge(
        user_id=current_user.id,
        challenge_id=challenge.id,
    )
    db.add(user_challenge)
    db.commit()

    return challenge


@router.post("/complete-challenge")
def complete_challenge(
    data: CompleteChallenge,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user_challenge = db.query(UserChallenge).filter(
        UserChallenge.user_id == current_user.id,
        UserChallenge.challenge_id == data.challenge_id,
        UserChallenge.completed == False
    ).first()

    if not user_challenge:
        raise HTTPException(status_code=404, detail="Challenge not found or already completed")

    challenge = db.query(Challenge).filter(Challenge.id == data.challenge_id).first()

    # Mark completed
    user_challenge.completed = True
    user_challenge.completed_at = datetime.utcnow()
    user_challenge.reflection = data.reflection or ""

    # Update user stats
    current_user.xp += challenge.xp_reward
    current_user.level = get_level(current_user.xp)
    current_user.rank = get_rank(current_user.xp)
    current_user.confidence_score = min(100.0, current_user.confidence_score + random.uniform(0.5, 2.0))
    current_user.social_energy = min(100.0, current_user.social_energy + random.uniform(1.0, 5.0))

    # Update streak
    yesterday = datetime.utcnow() - timedelta(days=1)
    yesterday_start = yesterday.replace(hour=0, minute=0, second=0, microsecond=0)
    had_yesterday = db.query(UserChallenge).filter(
        UserChallenge.user_id == current_user.id,
        UserChallenge.completed == True,
        UserChallenge.completed_at >= yesterday_start,
        UserChallenge.completed_at < yesterday_start + timedelta(days=1)
    ).first()

    if had_yesterday or current_user.streak == 0:
        current_user.streak += 1
    else:
        current_user.streak = 1

    current_user.last_active = datetime.utcnow()

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Challenge completed! 🎉",
        "xp_earned": challenge.xp_reward,
        "total_xp": current_user.xp,
        "level": current_user.level,
        "streak": current_user.streak,
        "rank": current_user.rank,
        "confidence_score": current_user.confidence_score,
    }
