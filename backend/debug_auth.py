from auth import register_user, UserCreate
from db import get_session
from sqlmodel import Session

# Create a test user
user_data = UserCreate(email="test@example.com", password="password", name="Test User")

# Get a session
session_gen = get_session()
with session_gen as session:
    try:
        result = register_user(user_data, session)
        print("Registration successful:", result)
    except Exception as e:
        print(f"Error during registration: {e}")
        import traceback
        traceback.print_exc()