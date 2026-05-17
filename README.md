# 🚀 ExtroIntro

> **Transforming introverts into socially confident individuals through AI-powered daily social challenges and gamified growth.**

ExtroIntro is a full-stack gamified self-improvement platform — like **Duolingo for social confidence**. It combines AI coaching, daily challenges, mood tracking, and gamification to help users build real-world social skills.

![Tech Stack](https://img.shields.io/badge/Next.js-15-black?style=flat-square) ![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square)

---

## ✨ Features

- 🎯 **Daily Social Challenges** — AI-curated tasks at beginner, intermediate, and advanced levels
- 🤖 **AI Confidence Coach** — Empathetic chat assistant for anxiety tips, conversation starters, and motivation
- 📊 **Analytics Dashboard** — Animated progress tracking with streaks, XP, levels, and confidence scores
- 📝 **Reflection Journal** — Document your growth after each challenge
- 💜 **Mood Tracking** — Track confidence, anxiety, social energy, and mood with visual charts
- 🏆 **Gamification** — XP, levels, streaks, achievement badges, and social ranks (Silent Starter → Extrovert Legend)
- 🎉 **Confetti Celebrations** — Achievement animations on streak milestones
- 🌙 **Dark Mode** — Beautiful glassmorphic dark UI with ambient glow effects
- 📱 **Fully Responsive** — Works perfectly on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **React** + **TypeScript**
- **Tailwind CSS** (custom design system)
- **Framer Motion** (animations)
- **Lucide Icons**

### Backend
- **FastAPI** (Python)
- **SQLAlchemy** ORM
- **JWT Authentication** (python-jose + passlib)
- **SQLite** (dev) / **PostgreSQL** (prod)

### AI
- **OpenAI API** or **Google Gemini** (configurable)
- Smart fallback responses when no API key is set

---

## 📦 Getting Started

### Prerequisites
- **Node.js** 18+
- **Python** 3.9+
- **npm** or **yarn**

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/extrointro.git
cd extrointro
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment variables
copy .env.example .env
# Edit .env with your settings

# Run the server
uvicorn main:app --reload --port 8000
```

The backend will auto-create the database and seed it with challenges on startup.

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create environment file
echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local

# Run the dev server
npm run dev
```

### 4. Open the app
Visit **http://localhost:3000** in your browser.

---

## 🔑 Environment Variables

### Backend (`.env`)
| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | Database connection string | `sqlite:///./extrointro.db` |
| `SECRET_KEY` | JWT secret key | (change in production!) |
| `AI_PROVIDER` | `openai` or `gemini` | `gemini` |
| `OPENAI_API_KEY` | OpenAI API key | - |
| `GEMINI_API_KEY` | Gemini API key | - |
| `FRONTEND_URL` | Frontend origin for CORS | `http://localhost:3000` |

### Frontend (`.env.local`)
| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |

---

## 🚀 Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import project in Vercel
3. Set root directory to `frontend`
4. Add `NEXT_PUBLIC_API_URL` env var pointing to your backend

### Backend → Render / Railway
1. Set root directory to `backend`
2. Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add all `.env` variables in the dashboard
5. Use PostgreSQL add-on and set `DATABASE_URL`

---

## 📁 Project Structure

```
ExtroIntro-Project/
├── frontend/               # Next.js 15 App
│   ├── src/
│   │   ├── app/            # Pages (App Router)
│   │   │   ├── page.tsx          # Landing page
│   │   │   ├── login/           # Login
│   │   │   ├── signup/          # Signup
│   │   │   ├── dashboard/       # Main dashboard
│   │   │   ├── coach/           # AI Coach chat
│   │   │   ├── journal/         # Journal & mood tracker
│   │   │   └── analytics/       # Stats & achievements
│   │   ├── components/     # Reusable components
│   │   └── lib/            # Utils, API client, types
│   └── .env.local
│
├── backend/                # FastAPI App
│   ├── main.py             # App entry point
│   ├── models.py           # SQLAlchemy models
│   ├── schemas.py          # Pydantic schemas
│   ├── auth.py             # JWT authentication
│   ├── config.py           # Settings
│   ├── database.py         # DB engine & session
│   ├── seed.py             # Challenge seeder
│   ├── routers/
│   │   ├── auth_router.py  # Auth endpoints
│   │   ├── challenges.py   # Challenge endpoints
│   │   ├── ai.py           # AI chat endpoint
│   │   ├── journal.py      # Reflection endpoints
│   │   └── analytics.py    # Stats & mood endpoints
│   ├── .env
│   └── requirements.txt
│
└── README.md
```

---

## 🎮 Social Ranks

| XP Required | Rank |
|---|---|
| 0 | 🌱 Silent Starter |
| 100 | 🌸 Shy Whisperer |
| 300 | 🗣️ Brave Speaker |
| 600 | 🧭 Social Explorer |
| 1,000 | ✨ Conversation Crafter |
| 1,500 | 🌉 Connection Builder |
| 2,500 | 🏆 Charisma Champion |
| 4,000 | 👑 Conversation Master |
| 6,000 | 🦋 Social Butterfly |
| 10,000 | 🌟 Extrovert Legend |

---

## 📄 License

MIT License — feel free to use, modify, and distribute.

---

Built with 💜 for introverts everywhere.
