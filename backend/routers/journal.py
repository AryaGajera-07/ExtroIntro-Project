from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User, UserChallenge, Challenge
from schemas import ReflectionCreate, ReflectionResponse
from auth import get_current_user
from datetime import datetime

router = APIRouter(tags=["Journal"])


@router.post("/reflection")
def create_reflection(
    data: ReflectionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user_challenge = db.query(UserChallenge).filter(
        UserChallenge.user_id == current_user.id,
        UserChallenge.challenge_id == data.challenge_id,
    ).first()

    if not user_challenge:
        raise HTTPException(status_code=404, detail="Challenge not found for user")

    user_challenge.reflection = data.reflection
    if not user_challenge.completed_at:
        user_challenge.completed_at = datetime.utcnow()

    db.commit()
    db.refresh(user_challenge)

    return {"message": "Reflection saved successfully ✨", "reflection": data.reflection}


@router.get("/reflections")
def get_reflections(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user_challenges = db.query(UserChallenge).filter(
        UserChallenge.user_id == current_user.id,
        UserChallenge.reflection != "",
        UserChallenge.reflection != None
    ).order_by(UserChallenge.completed_at.desc()).limit(50).all()

    results = []
    for uc in user_challenges:
        challenge = db.query(Challenge).filter(Challenge.id == uc.challenge_id).first()
        results.append({
            "id": uc.id,
            "challenge_id": uc.challenge_id,
            "challenge_title": challenge.title if challenge else "Unknown",
            "challenge_difficulty": challenge.difficulty if challenge else "beginner",
            "reflection": uc.reflection,
            "completed_at": uc.completed_at.isoformat() if uc.completed_at else None,
        })

    return results
