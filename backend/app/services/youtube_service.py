import os
import httpx

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
BASE_URL = "https://www.googleapis.com/youtube/v3"

async def search_channels(query: str, max_results: int = 5):
    """Search YouTube channels by keyword."""
    try:
        async with httpx.AsyncClient() as client:
            url = f"{BASE_URL}/search?part=snippet&type=channel&maxResults={max_results}&q={query}&key={YOUTUBE_API_KEY}"
            response = await client.get(url)
            data = response.json()

        if "error" in data:
            raise Exception(data["error"]["message"])

        results = []
        for item in data.get("items", []):
            results.append({
                "channel_id": item["snippet"]["channelId"],
                "title": item["snippet"]["title"],
                "description": item["snippet"].get("description", ""),
                "thumbnail": item["snippet"]["thumbnails"]["high"]["url"],
            })
        return results
    except Exception as e:
        print("❌ YouTube Search Error:", e)
        raise


async def channel_stats(channel_id: str):
    """Fetch channel statistics and details."""
    try:
        async with httpx.AsyncClient() as client:
            url = f"{BASE_URL}/channels?part=snippet,statistics&id={channel_id}&key={YOUTUBE_API_KEY}"
            response = await client.get(url)
            data = response.json()

        if "error" in data:
            raise Exception(data["error"]["message"])
        if not data.get("items"):
            raise Exception("Channel not found")

        item = data["items"][0]
        return {
            "channel_id": channel_id,
            "title": item["snippet"]["title"],
            "description": item["snippet"].get("description", ""),
            "thumbnail": item["snippet"]["thumbnails"]["high"]["url"],
            "country": item["snippet"].get("country", "Unknown"),
            "subscriberCount": item["statistics"].get("subscriberCount", "0"),
            "videoCount": item["statistics"].get("videoCount", "0"),
            "viewCount": item["statistics"].get("viewCount", "0"),
        }
    except Exception as e:
        print("❌ YouTube Channel Stats Error:", e)
        raise
