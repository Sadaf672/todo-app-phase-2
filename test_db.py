import sys
import os
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_dir))

# Load environment variables
from dotenv import load_dotenv
load_dotenv(dotenv_path=backend_dir / ".env")

print("Environment loaded")

# Test importing the modules
try:
    print("Attempting to import models...")
    from models import User, Task
    print("Models imported successfully")

    print("Attempting to import db...")
    from db import engine
    print("Database engine created successfully")

    from sqlmodel import select
    from sqlalchemy.exc import SQLAlchemyError

    # Try to connect to the database
    print("Attempting database connection...")
    with engine.connect() as conn:
        print("Database connection successful")

    # Test creating a user
    from sqlmodel import SQLModel, Session
    print("Attempting to import auth...")
    from auth import get_password_hash
    print("Auth module imported successfully")

    # Create tables
    print("Creating tables...")
    SQLModel.metadata.create_all(engine)
    print("Tables created successfully")

    # Create a test user
    print("Creating test user...")
    with Session(engine) as session:
        # Check if user already exists
        existing_user = session.query(User).filter(User.email == "test@example.com").first()
        if not existing_user:
            hashed_password = get_password_hash("password")
            test_user = User(
                email="test@example.com",
                hashed_password=hashed_password,
                name="Test User"
            )
            session.add(test_user)
            session.commit()
            print("Test user created successfully")
        else:
            print("Test user already exists")

except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()