"""Configuration management for the crypto trading bot."""

import os
from pathlib import Path
from typing import Optional
from dotenv import load_dotenv


# Load environment variables from .env file
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)


class Config:
    """Configuration class for the trading bot."""
    
    # API Configuration
    API_BASE_URL: str = os.getenv("API_BASE_URL", "https://api.example.com")
    API_KEY: Optional[str] = os.getenv("API_KEY")
    API_SECRET: Optional[str] = os.getenv("API_SECRET")
    
    # HTTP Configuration
    HTTP_TIMEOUT: int = int(os.getenv("HTTP_TIMEOUT", "30"))
    
    # Logging Configuration
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")


# Singleton config instance
config = Config()
