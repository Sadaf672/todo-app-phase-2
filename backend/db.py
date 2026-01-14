from sqlmodel import create_engine
from typing import Generator
from contextlib import contextmanager
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL")

# If URL not found, throw error
if not DATABASE_URL:
    raise ValueError("DATABASE_URL not found in environment variables! Check .env file.")

# Print DATABASE_URL for debugging (remove in production)
print(f"DATABASE_URL: {DATABASE_URL}")

# Create the engine
engine = create_engine(DATABASE_URL, echo=True)


@contextmanager
def get_session() -> Generator:
    """
    Context manager for database sessions.
    Ensures proper cleanup of database connections.
    """
    from sqlmodel import Session
    with Session(engine) as session:
        try:
            yield session
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()


def get_session_dependency() -> Generator:
    """
    FastAPI dependency for database sessions.
    """
    with get_session() as session:
        yield session