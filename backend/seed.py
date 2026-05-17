from database import SessionLocal, engine, Base
from models import Challenge

def seed_challenges():
    """Seed the database with initial challenges."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if already seeded
    if db.query(Challenge).count() > 0:
        print("[SUCCESS] Challenges already seeded.")
        db.close()
        return

    challenges = [
        # ─── Beginner ─────────────────────────────────────────
        Challenge(title="Smile at 3 strangers today", description="A warm smile can brighten anyone's day — including yours! Make eye contact and smile genuinely at three people you don't know.", difficulty="beginner", xp_reward=15, category="warmth", icon="smile"),
        Challenge(title="Say 'Good morning' to someone new", description="Greet someone you wouldn't usually talk to. It could be a neighbor, barista, or colleague.", difficulty="beginner", xp_reward=15, category="greeting", icon="sun"),
        Challenge(title="Ask someone for the time", description="A simple interaction to break the ice. Approach someone politely and ask what time it is.", difficulty="beginner", xp_reward=10, category="icebreaker", icon="clock"),
        Challenge(title="Compliment a stranger", description="Give a genuine compliment to someone — about their outfit, smile, or anything you notice.", difficulty="beginner", xp_reward=20, category="warmth", icon="heart"),
        Challenge(title="Hold the door for someone and smile", description="A small act of kindness combined with a friendly smile. Notice how it feels.", difficulty="beginner", xp_reward=10, category="kindness", icon="door-open"),
        Challenge(title="Make eye contact during a conversation", description="Focus on maintaining comfortable eye contact when speaking with someone today.", difficulty="beginner", xp_reward=15, category="presence", icon="eye"),
        Challenge(title="Say 'thank you' with extra warmth", description="When thanking someone today, add a genuine smile and make it feel personal.", difficulty="beginner", xp_reward=10, category="gratitude", icon="sparkles"),
        Challenge(title="Wave at a neighbor", description="Give a friendly wave to a neighbor or someone in your building.", difficulty="beginner", xp_reward=10, category="greeting", icon="hand-metal"),

        # ─── Intermediate ────────────────────────────────────
        Challenge(title="Start a conversation with a colleague", description="Initiate a casual conversation with someone at work or school about their weekend or interests.", difficulty="intermediate", xp_reward=30, category="conversation", icon="message-circle"),
        Challenge(title="Join a group discussion", description="Find a group conversation and contribute at least one thought or opinion.", difficulty="intermediate", xp_reward=35, category="group", icon="users"),
        Challenge(title="Introduce yourself to someone new", description="Walk up to someone you don't know and introduce yourself. Share your name and one interesting thing.", difficulty="intermediate", xp_reward=35, category="introduction", icon="user-plus"),
        Challenge(title="Ask someone about their hobby", description="Show genuine interest by asking someone about what they enjoy doing in their free time.", difficulty="intermediate", xp_reward=25, category="curiosity", icon="palette"),
        Challenge(title="Eat lunch with someone new", description="Instead of eating alone, ask someone if you can join them or invite them to eat together.", difficulty="intermediate", xp_reward=40, category="bonding", icon="utensils"),
        Challenge(title="Share a personal story", description="In a conversation today, share a brief personal anecdote or experience.", difficulty="intermediate", xp_reward=30, category="vulnerability", icon="book-open"),
        Challenge(title="Give someone thoughtful feedback", description="Offer genuine, constructive feedback to a friend or colleague about something they did well.", difficulty="intermediate", xp_reward=30, category="connection", icon="message-square"),
        Challenge(title="Call a friend instead of texting", description="Pick up the phone and have a real voice conversation with someone you usually just text.", difficulty="intermediate", xp_reward=25, category="connection", icon="phone"),

        # ─── Advanced ────────────────────────────────────────
        Challenge(title="Speak up in a meeting or class", description="Share your opinion, ask a question, or present an idea in front of a group.", difficulty="advanced", xp_reward=50, category="leadership", icon="mic"),
        Challenge(title="Attend a networking event", description="Go to a professional or social event and have at least 3 conversations with new people.", difficulty="advanced", xp_reward=60, category="networking", icon="globe"),
        Challenge(title="Lead a group discussion", description="Take charge of a conversation or meeting. Guide the topic and make sure everyone gets heard.", difficulty="advanced", xp_reward=55, category="leadership", icon="crown"),
        Challenge(title="Give a short presentation", description="Present something to a group — could be a work update, a topic you're passionate about, or a skill.", difficulty="advanced", xp_reward=65, category="public-speaking", icon="presentation"),
        Challenge(title="Have a deep conversation", description="Go beyond small talk. Discuss dreams, fears, values, or life experiences with someone.", difficulty="advanced", xp_reward=45, category="depth", icon="heart-handshake"),
        Challenge(title="Organize a social gathering", description="Plan and host a small get-together with friends, colleagues, or neighbors.", difficulty="advanced", xp_reward=60, category="leadership", icon="party-popper"),
        Challenge(title="Mentor someone", description="Share your knowledge or experience to help someone who is learning something you know.", difficulty="advanced", xp_reward=50, category="giving", icon="graduation-cap"),
        Challenge(title="Handle a disagreement gracefully", description="When a disagreement arises, practice active listening and express your view calmly and respectfully.", difficulty="advanced", xp_reward=55, category="conflict", icon="shield"),
    ]

    db.add_all(challenges)
    db.commit()
    print(f"[SUCCESS] Seeded {len(challenges)} challenges successfully!")
    db.close()


if __name__ == "__main__":
    seed_challenges()
