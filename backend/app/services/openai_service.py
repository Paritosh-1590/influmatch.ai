import os
import json
import requests

# 🔑 Load OpenRouter API key
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

# -----------------------------
# ✅ Utility function to safely parse JSON
# -----------------------------
def parse_json_or_fallback(text: str):
    """Safely extract JSON from AI responses."""
    try:
        return json.loads(text)
    except Exception:
        start, end = text.find("{"), text.rfind("}")
        if start != -1 and end != -1:
            try:
                return json.loads(text[start:end + 1])
            except Exception:
                pass
    # Fallback if parsing fails
    return {
        "score": 0,
        "reasons": ["Failed to parse model output"],
        "tone": "neutral",
        "analysis": "Could not extract valid JSON.",
        "suggestions": [],
    }


# -----------------------------
# ✅ Brand fit analysis (for /api/brands/match)
# -----------------------------
async def brand_fit_score(influencer_profile: str, brand_desc: str):
    try:
        prompt = f"""
You are an AI that evaluates influencer-brand compatibility.

Brand Description:
{brand_desc}

Influencer Profile:
{influencer_profile}

Respond ONLY with valid JSON in this format:
{{
  "score": <0-100>,
  "reasons": ["Reason 1", "Reason 2"],
  "tone": "<one-word tone descriptor>"
}}
"""

        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        }

        payload = {
            "model": "gpt-4o-mini",  # ✅ Recommended fast + accurate model
            "messages": [
                {"role": "system", "content": "You are a professional AI marketing strategist."},
                {"role": "user", "content": prompt},
            ],
        }

        # 🔥 Make request to OpenRouter
        response = requests.post(OPENROUTER_URL, headers=headers, json=payload, timeout=60)
        response.raise_for_status()

        data = response.json()
        text = data["choices"][0]["message"]["content"].strip()

        print("🧠 Brand Fit Raw Output:", text)
        return parse_json_or_fallback(text)

    except Exception as e:
        print("❌ Brand Fit Error:", e)
        return {"score": 0, "reasons": [str(e)], "tone": "neutral"}


# -----------------------------
# ✅ Influencer suggestions (for /api/influencers/suggest_influencers)
# -----------------------------
async def suggest_influencers(name: str, description: str, target_audience: str):
    try:
        prompt = f"""
You are an expert influencer marketing AI.

Suggest 3-5 influencer names that best fit this brand.

Brand Name: {name}
Description: {description}
Target Audience: {target_audience}

Respond ONLY with valid JSON:
{{
  "analysis": "Short explanation of why these influencers fit.",
  "suggestions": ["Influencer 1", "Influencer 2", "Influencer 3"]
}}
"""

        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        }

        payload = {
            "model": "gpt-4o-mini",  # ⚡ Fast and reliable model
            "messages": [
                {"role": "system", "content": "You are a skilled AI assistant specializing in influencer marketing."},
                {"role": "user", "content": prompt},
            ],
        }

        response = requests.post(OPENROUTER_URL, headers=headers, json=payload, timeout=60)
        response.raise_for_status()

        data = response.json()
        text = data["choices"][0]["message"]["content"].strip()

        print("✨ Influencer Suggestion Raw Output:", text)
        return parse_json_or_fallback(text)

    except Exception as e:
        print("❌ Influencer Suggestion Error:", e)
        return {"analysis": f"Error: {e}", "suggestions": []}
