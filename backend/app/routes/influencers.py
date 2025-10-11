# app/routes/influencers.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd
from app.services.youtube_service import search_channels  # ✅ use YouTube API
import os

router = APIRouter(prefix="/influencers", tags=["Influencers"])

CSV_PATH = os.path.join(os.getcwd(), "influencers_dataset.csv")  # ✅ adjust if needed


class InfluencerRequest(BaseModel):
    name: str
    description: str
    target_audience: str


@router.post("/suggest_influencers")
async def suggest_influencers_api(req: InfluencerRequest):
    try:
        print(f"🟢 Searching influencers for: {req.description}")

        # ✅ Load CSV
        if not os.path.exists(CSV_PATH):
            raise HTTPException(status_code=404, detail="CSV file not found.")
        df = pd.read_csv(CSV_PATH)

        if "Influencer Name" not in df.columns or "Description of Instagram" not in df.columns:
            raise HTTPException(status_code=500, detail="CSV missing required columns.")

        # --- 1️⃣ CSV Matching ---
        filtered = df[
            df["Description of Instagram"]
            .fillna("")
            .str.contains(req.description, case=False, na=False)
        ]

        # --- 2️⃣ If no local results, search YouTube ---
        if filtered.empty:
            print("⚠️ No CSV match — searching YouTube...")
            youtube_results = await search_channels(req.description)
            if youtube_results:
                return {
                    "analysis": f"No local match found. Found {len(youtube_results)} creators on YouTube.",
                    "suggestions": [
                        f"{ch['title']} ({ch['channel_id']})"
                        for ch in youtube_results
                    ],
                }
            else:
                return {"analysis": "No influencers found for this topic.", "suggestions": []}

        # --- 3️⃣ Format CSV Results ---
        suggestions = filtered.head(5).to_dict(orient="records")
        return {
            "analysis": f"Found {len(suggestions)} influencers matching '{req.description}'.",
            "suggestions": suggestions,
        }

    except Exception as e:
        print("❌ Influencer Suggestion Error:", e)
        raise HTTPException(status_code=500, detail=str(e))
