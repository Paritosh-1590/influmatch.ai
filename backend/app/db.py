# app/db.py
import os
import motor.motor_asyncio

client = None
db = None

async def init_db():
    """Initialize MongoDB connection"""
    global client, db
    uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")

    client = motor.motor_asyncio.AsyncIOMotorClient(uri)
    db = client["icy_db"]

    # ✅ Test connection
    await db.command("ping")
    print("✅ Connected to MongoDB at", uri)

    # (Optional) Create indexes
    await db.brands.create_index("name")
    await db.campaigns.create_index("brand_id")
    await db.influencers.create_index("channel_id", unique=False)

    return db


def get_database():
    """Return active MongoDB database connection"""
    global db
    if db is None:
        raise Exception("❌ Database not initialized. Did you forget to call init_db()?")
    return db
