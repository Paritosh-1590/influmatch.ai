import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from typing import Dict, Any

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
FROM_EMAIL = os.getenv("FROM_EMAIL", "no-reply@influmatch.ai")

async def send_message_to_influencer(payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    payload expected:
      {
        "to_contact": "influencer@example.com",
        "subject": "Collaboration Opportunity",
        "body": "Your personalized outreach message..."
      }
    """
    if not SENDGRID_API_KEY:
        return {"status": "mock_sent", "detail": "SENDGRID_API_KEY not configured."}

    to_email = payload.get("to_contact")
    subject = payload.get("subject", "Message from InfluMatch.ai")
    body = payload.get("body", "")

    if not to_email:
        return {"status": "error", "detail": "Missing recipient email."}

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        message = Mail(
            from_email=FROM_EMAIL,
            to_emails=to_email,
            subject=subject,
            html_content=f"<p>{body}</p>",
        )
        response = sg.send(message)
        return {
            "status": "sent",
            "code": response.status_code,
            "body": response.body.decode() if response.body else "",
        }
    except Exception as e:
        return {"status": "error", "detail": str(e)}
