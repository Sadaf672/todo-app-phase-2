from datetime import datetime, timedelta
from typing import Optional
from fastapi import HTTPException, status, Depends, APIRouter
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlmodel import Session
import os
# auth/__init__.py
from db import get_session_dependency




# Get the secret key from environment variable
SECRET_KEY = os.getenv("BETTER_AUTH_SECRET", "your-super-secret-jwt-key-here-must-be-at-least-32-characters-long")
ALGORITHM = "HS256"

security = HTTPBearer()


def verify_jwt_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Verify the JWT token and extract user_id
    """
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("userId")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user_id
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user(user_id: str = Depends(verify_jwt_token)):
    """
    Get the current user from the JWT token
    """
    # In a real application, you would fetch user details from the database
    # Here we just return the user_id extracted from the token
    # This ensures user isolation as required by the spec
    return user_id


# Define the CurrentUser dependency directly
CurrentUser = Depends(get_current_user)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Create a new JWT access token
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Create auth router
router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
async def login(email: str, password: str):
    """
    Authenticate user and return JWT token
    """
    # In a real app, you would verify the credentials against a database
    # For this demo, we'll just create a token with a dummy user ID
    # In production, always hash passwords and verify securely

    # For demo purposes, accept any email/password combination
    # In production, verify credentials against your user database
    user_id = f"user_{abs(hash(email))}"  # Generate a consistent ID for the user

    access_token = create_access_token(data={"userId": user_id})

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register")
async def register(email: str, password: str, name: str = ""):
    """
    Register a new user and return JWT token
    """
    # In a real app, you would create a new user in the database
    # For this demo, we'll just create a token with a dummy user ID

    user_id = f"user_{abs(hash(email))}"  # Generate a consistent ID for the user

    access_token = create_access_token(data={"userId": user_id})

    return {"access_token": access_token, "token_type": "bearer"}