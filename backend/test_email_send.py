import os
from dotenv import load_dotenv
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# ✅ Load environment variables from .env
load_dotenv()

# ✅ Get environment variables
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
FROM_EMAIL = os.getenv("FROM_EMAIL")

print("🔍 Checking environment variables...")
print("SENDGRID_API_KEY:", SENDGRID_API_KEY[:10] + "..." if SENDGRID_API_KEY else "❌ Not found")
print("FROM_EMAIL:", FROM_EMAIL or "❌ Not found")

# ✅ Verify environment loaded correctly
if not SENDGRID_API_KEY:
    print("❌ SENDGRID_API_KEY not found in environment variables.")
    exit(1)

if not FROM_EMAIL:
    print("❌ FROM_EMAIL not found in environment variables.")
    exit(1)

# ✅ Test recipient email (you can change this)
TO_EMAIL = "test@example.com"
SUBJECT = "🎯 Test Email from Influmatch Backend"
MESSAGE = """
<h2>Influmatch Email Test</h2>
<p>This is a test email sent via <b>SendGrid</b> from your FastAPI backend.</p>
<p>If you received this, your email integration works ✅</p>
"""

# ✅ Send test email
try:
    print("\n🚀 Sending email...")
    sg = SendGridAPIClient(SENDGRID_API_KEY)
    email = Mail(from_email=FROM_EMAIL, to_emails=TO_EMAIL, subject=SUBJECT, html_content=MESSAGE)
    response = sg.send(email)

    print(f"✅ Email sent to {TO_EMAIL}")
    print(f"📨 Status Code: {response.status_code}")
    print(f"📨 Headers: {response.headers}")

except Exception as e:
    print(f"❌ Error sending email to {TO_EMAIL}: {e}")
    print({
        "status": "error",
        "detail": str(e),
        "to": TO_EMAIL
    })
