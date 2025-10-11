# app/config.py
from pydantic import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str
    YOUTUBE_API_KEY: str
    SENDGRID_API_KEY: str
    MONGO_URI: str
    FROM_EMAIL: str
    PORT: int = 8000

    class Config:
        env_file = ".env"

settings = Settings()
