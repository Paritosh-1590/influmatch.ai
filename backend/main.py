# main.py
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()
print("Loaded SENDGRID_API_KEY:", os.getenv("SENDGRID_API_KEY"))
print("Loaded FROM_EMAIL:", os.getenv("FROM_EMAIL"))


from app.db import init_db, get_database
from app.routes import youtube, brands, outreach, influencers

app = FastAPI(title="Influmatch Backend API")

# --- CORS setup ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Startup event ---
@app.on_event("startup")
async def startup_event():
    """Initialize MongoDB connection at startup."""
    app.mongodb = await init_db()
    print("✅ MongoDB initialized and connected.")


# --- Routers ---
app.include_router(youtube.router, prefix="/api", tags=["YouTube"])
app.include_router(brands.router, prefix="/api", tags=["Brands"])
app.include_router(outreach.router, prefix="/api", tags=["Outreach"])
app.include_router(influencers.router, prefix="/api", tags=["Influencers"])


# --- Health check ---
@app.get("/")
async def root():
    return {"status": "ok", "message": "Influmatch backend running 🚀"}


# --- Database test endpoint ---
@app.get("/api/dbtest")
async def db_test():
    """Check if MongoDB is connected properly."""
    try:
        db = get_database()
        count = await db.brands.count_documents({})
        return {"connected": True, "brands_in_db": count}
    except Exception as e:
        print("❌ DB Test Error:", e)
        raise HTTPException(status_code=500, detail=str(e))
