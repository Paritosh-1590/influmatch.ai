# app/routes/youtube.py
from fastapi import APIRouter, HTTPException, Query
from app.services.youtube_service import search_channels, channel_stats

# ⚠️ IMPORTANT: no "/api" prefix here
router = APIRouter(prefix="/youtube", tags=["YouTube"])

@router.get("/search")
async def youtube_search(q: str = Query(..., min_length=1), max_results: int = 5):
    """
    🔍 Search YouTube channels based on query.
    Example: /api/youtube/search?q=fashion
    """
    try:
        items = await search_channels(q, max_results=max_results)
        return {"results": items}
    except Exception as e:
        print("❌ YouTube Search Error:", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/channel/{channel_id}")
async def get_channel(channel_id: str):
    """
    📊 Get details for a specific YouTube channel by ID.
    Example: /api/youtube/channel/UC123456789
    """
    try:
        stats = await channel_stats(channel_id)
        return {"channel": stats}
    except Exception as e:
        print("❌ YouTube Channel Stats Error:", e)
        raise HTTPException(status_code=500, detail=str(e))
