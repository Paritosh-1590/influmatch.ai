from fastapi import APIRouter, HTTPException
from schemas import CompanyProfile, Influencer
from services.openai_service import analyze_company, generate_outreach_message
from services.youtube_service import find_influencers
from services.sender_service import send_message_to_influencer
from typing import List
import asyncio

router = APIRouter()

@router.post("/suggest_influencers")
async def suggest_influencers(profile: CompanyProfile):
    """
    1. Ask OpenAI to extract search keywords and tone from company profile.
    2. Use YouTube Data API to find influencers.
    """
    # 1) analyze
    analysis = await analyze_company(profile.description, profile.target_audience)
    keywords = analysis.get("keywords", [])
    tone = analysis.get("tone", "professional")

    # Build a search query (join keywords)
    query = " ".join(keywords) if keywords else (profile.name + " influencer")

    # 2) find influencers (blocking google client is run in thread)
    influencers = await asyncio.to_thread(find_influencers, query, 8)

    return {
        "analysis": analysis,
        "query": query,
        "influencers": influencers,
    }

@router.post("/generate_message")
async def generate_message(payload: dict):
    """
    payload: { company: {...}, influencer: {...} }
    """
    company = payload.get("company")
    influencer = payload.get("influencer")
    if not company or not influencer:
        raise HTTPException(status_code=400, detail="company and influencer required")

    message = await generate_outreach_message(company, influencer)
    return {"message": message}

@router.post("/send_message")
async def send_message(payload: dict):
    """
    payload: { to_contact: {email/phone/username}, subject, body }
    """
    result = await send_message_to_influencer(payload)
    return {"result": result}
