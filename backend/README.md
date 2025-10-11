# ICY Backend (FastAPI) — Quick Start

## Prerequisites
- Python 3.11+ recommended
- Docker (optional: for MongoDB) or a running MongoDB instance
- API Keys: OpenAI, YouTube Data API, SendGrid

## Files
- Copy `.env.example` -> `.env` and fill keys
- Optionally run `docker-compose up -d` to start MongoDB.

## Setup
1. Create venv:
   linux/mac:
     python -m venv venv
     source venv/bin/activate
   windows:
     python -m venv venv
     venv\\Scripts\\activate

2. Install dependencies:
   pip install -r requirements.txt

3. Start the server:
   uvicorn main:app --reload --port 8000

4. Open http://127.0.0.1:8000/docs to use the API via interactive docs.

## Example requests (curl)

### YouTube search:
curl "http://127.0.0.1:8000/youtube/search?q=skincare&max_results=3"

### Brand fit:
curl -X POST "http://127.0.0.1:8000/brands/match" -H "Content-Type: application/json" \
-d '{"influencer_profile":"Emma: skincare videos about clean ingredients. 20k subs","brand_desc":"Eco face serum for sensitive skin."}'

### Send email:
curl -X POST "http://127.0.0.1:8000/outreach/send" -H "Content-Type: application/json" \
-d '{"to_email":"influencer@example.com","subject":"Collab?","message":"Hi! Loved your video..."}'
