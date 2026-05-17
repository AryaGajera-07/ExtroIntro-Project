from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from config import settings
from routers import auth_router, challenges, ai, journal, analytics
from seed import seed_challenges

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ExtroIntro API",
    description="AI-powered social confidence building platform",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router.router)
app.include_router(challenges.router)
app.include_router(ai.router)
app.include_router(journal.router)
app.include_router(analytics.router)


@app.on_event("startup")
def startup():
    seed_challenges()


@app.get("/")
def root():
    return {
        "message": "🚀 ExtroIntro API is running!",
        "docs": "/docs",
        "version": "1.0.0"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}
