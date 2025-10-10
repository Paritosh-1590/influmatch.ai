import os
import httpx
import json
from typing import Dict, Any

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")

OPENAI_URL = "https://api.openai.com/v1/chat/completions"

async def _openai_chat(messages, temperature=0.7, max_tokens=400):
    if not OPENAI_API_KEY:
        raise RuntimeError("OPENAI_API_KEY not configured")
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": OPENAI_MODEL,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
    }
    async with httpx.AsyncClient(timeout=30.0) as client:
        r = await client.post(OPENAI_URL, json=payload, headers=headers)
        r.raise_for_status()
        return r.json()

async def analyze_company(description: str, target_audience: str) -> Dict[str, Any]:
    """
    Ask OpenAI for: 5 short search keywords and the company's outreach tone.
    Return dict e.g. {"keywords": ["food", "healthy snacks"], "tone": "friendly, data-driven"}
    """
    system = {
        "role": "system",
        "content": "You are an assistant that extracts short search keywords and a tone from company profiles. Answer in strict JSON with keys: keywords (list of strings) and tone (string). No extra text."
    }
    user_prompt = (
        f"Company description: {description}\n"
        f"Target audience: {target_audience}\n\n"
        "Return JSON: {\"keywords\": [..], \"tone\": \"..\"}. "
        "Produce 5 concise keywords/phrases suitable to search for content creators / channels."
    )
    messages = [system, {"role": "user", "content": user_prompt}]
    resp = await _openai_chat(messages, temperature=0.2, max_tokens=200)
    text = resp["choices"][0]["message"]["content"].strip()
    # robust JSON extraction:
    try:
        return json.loads(text)
    except Exception:
        # fallback: try to extract first {...}
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1:
            sub = text[start:end+1]
            try:
                return json.loads(sub)
            except Exception:
                pass
    # if all fails, return safe defaults
    return {"keywords": (target_audience or description).split()[:5], "tone": "professional"}

async def generate_outreach_message(company: dict, influencer: dict) -> str:
    """
    Use OpenAI to craft a personalized outreach message for a single influencer.
    company: {name, description, target_audience}
    influencer: {name, channelUrl, subscribers, description}
    """
    system = {"role": "system", "content": "You are an expert outreach copywriter. Keep messages polite, concise, and persuasive."}
    user_prompt = (
        "Create a friendly and personalized outreach message for the influencer below. "
        "Use the company's tone and mention something relevant from the influencer profile. "
        "Output only the message body (no JSON). Keep it around 100-180 words.\n\n"
        f"Company: {company.get('name')}\n"
        f"Company description: {company.get('description')}\n"
        f"Target audience: {company.get('target_audience')}\n\n"
        f"Influencer name: {influencer.get('name')}\n"
        f"Influencer description: {influencer.get('description')}\n"
        f"Influencer channel: {influencer.get('channelUrl')}\n"
        f"Influencer subscribers: {influencer.get('subscribers')}\n"
    )
    messages = [system, {"role": "user", "content": user_prompt}]
    resp = await _openai_chat(messages, temperature=0.7, max_tokens=400)
    text = resp["choices"][0]["message"]["content"].strip()
    return text
