# app/routes/brands.py
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from typing import Any
from app.services.openai_service import brand_fit_score

router = APIRouter(prefix="/brands", tags=["Brands"])

# --- Brand schema ---
class BrandIn(BaseModel):
    name: str
    description: str
    tone: str = "friendly"

# --- Match request schema ---
class MatchRequest(BaseModel):
    influencer_profile: str
    brand_desc: str

# --- Create a new brand ---
@router.post("/create")
async def create_brand(request: Request, brand: BrandIn):
    """
    Create a new brand document in MongoDB.
    """
    try:
        db = request.app.mongodb  # ✅ get DB from FastAPI app
        doc = brand.dict()
        res = await db.brands.insert_one(doc)
        doc["_id"] = str(res.inserted_id)
        return {"success": True, "brand": doc}
    except Exception as e:
        print("❌ Error inserting brand:", e)
        raise HTTPException(status_code=500, detail=str(e))

# --- Get all brands (for testing) ---
@router.get("/all")
async def get_all_brands(request: Request):
    """
    Fetch all brands from MongoDB (for debugging / verification).
    """
    try:
        db = request.app.mongodb
        brands = await db.brands.find().to_list(100)
        for b in brands:
            b["_id"] = str(b["_id"])
        return {"count": len(brands), "brands": brands}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Match influencer to brand using OpenAI ---
@router.post("/match")
async def match_influencer(req: MatchRequest):
    """
    Use OpenAI to evaluate how well an influencer matches a brand.
    """
    try:
        result = await brand_fit_score(req.influencer_profile, req.brand_desc)
        return {"match": result}
    except Exception as e:
        print("❌ OpenAI Error:", e)
        raise HTTPException(status_code=500, detail=str(e))
