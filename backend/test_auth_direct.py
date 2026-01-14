import sys
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

from auth import register_user, UserCreate
from db import get_session
from sqlmodel import Session

print("Testing auth functions...")

# Create a test user
user_data = UserCreate(email="test@example.com", password="shortpass", name="Test User")

# Get a session
session_gen = get_session()

try:
    with session_gen as session:
        print("Calling register_user function...")
        result = register_user(user_data, session)
        print("Registration successful:", result)
except Exception as e:
    print(f"Error during registration: {e}")
    import traceback
    traceback.print_exc()