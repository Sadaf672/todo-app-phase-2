from pydantic import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    # Database settings
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./todo_app.db")

    # Authentication settings
    better_auth_secret: str = os.getenv("BETTER_AUTH_SECRET", "your-super-secret-jwt-key-here-must-be-at-least-32-characters-long")
    auth_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    # Frontend URL for CORS
    frontend_url: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

    class Config:
        env_file = ".env"


settings = Settings()