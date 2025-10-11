# app/services/email_service.py
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@influmatch.ai")


def send_influencer_email(to_email: str, subject: str, message: str):
    """
    Send outreach email using SendGrid API.
    Includes HTML formatting and error safety.
    """
    try:
        if not SENDGRID_API_KEY:
            raise ValueError("SENDGRID_API_KEY not found in environment variables.")

        if not FROM_EMAIL:
            raise ValueError("FROM_EMAIL not set in environment variables.")

        sg = SendGridAPIClient(SENDGRID_API_KEY)

        # Nicely formatted HTML email
        email = Mail(
            from_email=FROM_EMAIL,
            to_emails=to_email,
            subject=subject,
            html_content=f"""
            <html>
              <body style="font-family: Arial, sans-serif; color: #333;">
                <h2>{subject}</h2>
                <p>{message}</p>
                <br>
                <p style="color: gray; font-size: 12px;">
                  — Sent via <strong>Influmatch AI</strong> 💌
                </p>
              </body>
            </html>
            """,
        )

        response = sg.send(email)
        print(f"✅ Email sent to {to_email} (Status: {response.status_code})")

        return {
            "status": "success" if response.status_code in [200, 202] else "warning",
            "code": response.status_code,
            "to": to_email,
        }

    except Exception as e:
        print(f"❌ Error sending email to {to_email}: {e}")
        return {"status": "error", "detail": str(e), "to": to_email}
