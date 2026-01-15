from models import Task, User
from db import engine
from sqlmodel import SQLModel
from sqlalchemy.exc import ProgrammingError
import logging

def create_tables():
    """
    Create database tables with proper error handling for Neon PostgreSQL compatibility.
    """
    try:
        # Create all tables defined in the models
        SQLModel.metadata.create_all(engine)
        print("Tables created successfully!")
    except ProgrammingError as e:
        # Handle specific PostgreSQL/Neon errors
        print(f"Database error during table creation: {e}")
        if "relation" in str(e) and "does not exist" in str(e):
            print("Table may already exist or schema issue detected.")
        raise e
    except Exception as e:
        print(f"Unexpected error during table creation: {e}")
        raise e

if __name__ == "__main__":
    create_tables()
    print("Tables created successfully!")