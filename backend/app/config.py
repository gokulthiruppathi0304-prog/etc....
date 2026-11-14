import os
from typing import Optional
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables from .env file if available
load_dotenv()

class Settings(BaseModel):
    app_name: str = "SkillPath AI 2.0"
    tagline: str = "Discover your potential. Bridge your skill gaps. Engineer your future."
    version: str = "2.0.0"
    host: str = os.getenv("HOST", "0.0.0.0")
    port: int = int(os.getenv("PORT", "8000"))
    environment: str = os.getenv("ENVIRONMENT", "development")
    
    # LLM Settings
    openai_api_key: Optional[str] = os.getenv("OPENAI_API_KEY") or None
    gemini_api_key: Optional[str] = os.getenv("GEMINI_API_KEY") or None
    
    # Supabase / Database Settings
    supabase_url: Optional[str] = os.getenv("SUPABASE_URL") or None
    supabase_key: Optional[str] = os.getenv("SUPABASE_KEY") or None

    @property
    def has_llm_credentials(self) -> bool:
        """Returns True if any supported LLM API key is configured."""
        return bool(self.openai_api_key or self.gemini_api_key)

    @property
    def active_database_mode(self) -> str:
        """Determines whether to use Supabase or Temporary Local Datastore."""
        if self.supabase_url and self.supabase_key:
            return "supabase"
        return "temporary_in_memory"

    @property
    def storage_limitation_notice(self) -> str:
        """Human-readable explanation of temporary storage mode."""
        if self.active_database_mode == "temporary_in_memory":
            return (
                "Running on Temporary Development Data Store. "
                "Data is held in-memory and will reset if the backend server restarts. "
                "To persist data permanently, configure SUPABASE_URL and SUPABASE_KEY in .env."
            )
        return "Connected to persistent Supabase cloud database."

settings = Settings()
