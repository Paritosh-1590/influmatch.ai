from fastapi import APIRouter, HTTPException
import os, requests

router = APIRouter(prefix="/chat", tags=["Chat"])

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

@router.post("/talk")
async def general_conversation(payload: dict):
    try:
        user_message = payload.get("message", "")
        if not user_message:
            raise HTTPException(status_code=400, detail="No message provided")

        response = requests.post(
            OPENROUTER_URL,
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "gpt-4o-mini",
                "messages": [
                    {"role": "system", "content": "You are a friendly AI assistant for influencer marketing."},
                    {"role": "user", "content": user_message},
                ],
            },
        )
        data = response.json()
        text = data["choices"][0]["message"]["content"]
        return {"reply": text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
