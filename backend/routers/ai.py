from fastapi import APIRouter, Depends, HTTPException
from schemas import ChatMessage, ChatResponse
from auth import get_current_user
from models import User
from config import settings

router = APIRouter(tags=["AI Coach"])

SYSTEM_PROMPT = """You are ExtroIntro's AI Confidence Coach — a warm, empathetic, and encouraging guide who helps introverts build social confidence step by step.

Your personality:
- Calm, supportive, and understanding
- You celebrate small wins enthusiastically
- You normalize social anxiety and never shame the user
- You offer practical, actionable advice
- You speak like a kind friend, not a therapist
- You use encouraging emojis sparingly (✨, 🌟, 💪, 🎯)
- Keep responses concise (2-4 paragraphs max)

Your capabilities:
- Suggest conversation starters for different scenarios
- Help users prepare for social situations
- Provide breathing exercises for anxiety
- Celebrate completed challenges
- Give tips for body language and active listening
- Help reframe negative social experiences positively

Always be warm and human. Remember: every small step matters."""


async def get_ai_response(message: str) -> str:
    """Get response from configured AI provider."""
    try:
        if settings.AI_PROVIDER == "openai" and settings.OPENAI_API_KEY and settings.OPENAI_API_KEY != "sk-placeholder":
            from openai import OpenAI
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": message}
                ],
                max_tokens=500,
                temperature=0.8
            )
            return response.choices[0].message.content

        elif settings.AI_PROVIDER == "gemini" and settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "placeholder":
            import google.generativeai as genai
            genai.configure(api_key=settings.GEMINI_API_KEY)
            model = genai.GenerativeModel("gemini-pro")
            response = model.generate_content(f"{SYSTEM_PROMPT}\n\nUser: {message}")
            return response.text

        else:
            # Fallback responses when no API key is configured
            return get_fallback_response(message)

    except Exception as e:
        print(f"AI API error: {e}")
        return get_fallback_response(message)


def get_fallback_response(message: str) -> str:
    """Provide helpful responses without an AI API."""
    message_lower = message.lower()

    if any(word in message_lower for word in ["anxious", "nervous", "scared", "afraid", "worry"]):
        return ("It's completely normal to feel anxious about social situations — you're not alone in this! 💙\n\n"
                "Here's a quick grounding exercise: Take 3 deep breaths. With each exhale, let go of one worry. "
                "Remember, the person you're about to talk to is probably just as nervous as you are.\n\n"
                "Start small today. Even making eye contact and smiling counts as progress. You've got this! ✨")

    elif any(word in message_lower for word in ["conversation", "talk", "speak", "start"]):
        return ("Great question! Here are some easy conversation starters:\n\n"
                "🎯 **Comment on your environment**: 'This place has great coffee, don't you think?'\n"
                "🎯 **Ask for a recommendation**: 'Have you tried anything good here?'\n"
                "🎯 **Give a genuine compliment**: 'I love your style! Where did you get that?'\n\n"
                "The key is to be genuinely curious about the other person. People love talking about themselves! 🌟")

    elif any(word in message_lower for word in ["fail", "embarrass", "awkward", "bad"]):
        return ("Hey, I hear you. Social situations don't always go as planned — and that's perfectly okay! 🌟\n\n"
                "Here's the truth: most people are so focused on themselves that they barely remember your 'awkward' moments. "
                "What feels like a disaster to you probably didn't even register for them.\n\n"
                "Every social interaction, even the tricky ones, is building your confidence muscle. "
                "You showed up and tried — that takes real courage! 💪")

    elif any(word in message_lower for word in ["motivat", "inspire", "encourage", "help"]):
        return ("You're already doing something amazing by being here and working on yourself! 🌟\n\n"
                "Think about where you were a week ago versus now. Every challenge you complete, "
                "every conversation you start, every smile you share — it all adds up.\n\n"
                "You don't have to become an extrovert. The goal is to feel comfortable being YOU "
                "in social situations. And you're making incredible progress. Keep going! 💪✨")

    elif any(word in message_lower for word in ["hello", "hi", "hey", "morning"]):
        return ("Hey there! 👋 So glad you're here today!\n\n"
                "How are you feeling about your social challenges? Whether you need a conversation starter, "
                "some confidence tips, or just someone to talk to — I'm here for you.\n\n"
                "What's on your mind today? ✨")

    else:
        return ("That's a really thoughtful question! 🌟\n\n"
                "Building social confidence is a journey, not a destination. Here are some things to remember:\n\n"
                "1. **Start small** — even a smile or nod counts as progress\n"
                "2. **Be curious** — ask questions and genuinely listen\n"
                "3. **Be kind to yourself** — not every interaction has to be perfect\n"
                "4. **Celebrate wins** — you completed a challenge? That's amazing!\n\n"
                "What specific situation would you like help with? I'm all ears! 💙")


@router.post("/chat", response_model=ChatResponse)
async def chat_with_coach(
    data: ChatMessage,
    current_user: User = Depends(get_current_user)
):
    reply = await get_ai_response(data.message)
    return ChatResponse(reply=reply)
