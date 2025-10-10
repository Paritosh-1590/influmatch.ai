import os
from googleapiclient.discovery import build
from typing import List, Dict, Any

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

def find_influencers(query: str, max_results: int = 5) -> List[Dict[str, Any]]:
    """
    Search YouTube for channels matching query and return details.
    Returns list of dicts with id, name, avatarUrl, channelUrl, subscribers, description.
    """
    if not YOUTUBE_API_KEY:
        raise RuntimeError("YOUTUBE_API_KEY not configured")

    youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)

    # 1) search for channels
    search_response = youtube.search().list(
        q=query,
        part="snippet",
        type="channel",
        maxResults=max_results
    ).execute()

    channel_ids = []
    for item in search_response.get("items", []):
        # depending on response shape
        ch_id = None
        if "snippet" in item and "channelId" in item["snippet"]:
            ch_id = item["snippet"]["channelId"]
        elif "id" in item and item["id"].get("channelId"):
            ch_id = item["id"]["channelId"]
        if ch_id:
            channel_ids.append(ch_id)

    if not channel_ids:
        return []

    # 2) get stats for these channels
    channels_response = youtube.channels().list(
        id=",".join(channel_ids),
        part="snippet,statistics",
        maxResults=max_results
    ).execute()

    results = []
    for ch in channels_response.get("items", []):
        snippet = ch.get("snippet", {})
        stats = ch.get("statistics", {})
        thumbnails = snippet.get("thumbnails", {})
        avatar = thumbnails.get("high", thumbnails.get("default", {})).get("url")
        results.append({
            "id": ch.get("id"),
            "name": snippet.get("title"),
            "description": snippet.get("description"),
            "avatarUrl": avatar,
            "channelUrl": f"https://www.youtube.com/channel/{ch.get('id')}",
            "subscribers": int(stats.get("subscriberCount", 0)) if stats.get("subscriberCount") else None,
            "viewCount": int(stats.get("viewCount", 0)) if stats.get("viewCount") else None,
        })

    return results
