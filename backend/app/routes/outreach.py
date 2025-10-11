# app/routes/outreach.py
from fastapi import APIRouter, BackgroundTasks, HTTPException
from pydantic import BaseModel, EmailStr
from app.services.email_service import send_influencer_email
from app.db import get_database  # ✅ use getter instead of static import

router = APIRouter(prefix="/outreach", tags=["Outreach"])


class EmailPayload(BaseModel):
    to_email: EmailStr
    subject: str
    message: str
    influencer_name: str | None = None
    save_record: bool = True


def send_email_task(to_email: str, subject: str, message: str):
    """Send email via SendGrid in background"""
    send_influencer_email(to_email, subject, message)


@router.post("/send")
async def send_outreach(payload: EmailPayload, background: BackgroundTasks):
    """
    API to send outreach email to influencer (used by chatbot or dashboard)
    """
    try:
        db = get_database()  # ✅ get active Mongo connection

        # Run async email in background
        background.add_task(send_email_task, payload.to_email, payload.subject, payload.message)

        # ✅ Explicitly check if db is not None
        if payload.save_record:
            if db is not None:
                await db["outreach"].insert_one({
                    "to": payload.to_email,
                    "subject": payload.subject,
                    "message": payload.message,
                    "influencer_name": payload.influencer_name,
                    "status": "queued"
                })
            else:
                print("⚠️ MongoDB not connected — skipping record save")

        return {"status": "queued", "message": f"Email queued for {payload.to_email}"}

    except Exception as e:
        print("❌ Outreach Error:", e)
        raise HTTPException(status_code=500, detail=f"Error sending email: {e}")
