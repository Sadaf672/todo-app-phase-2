from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, HTTPException, status, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlmodel import Session
import os
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from models import User
from db import get_session_dependency

# Get the secret key from environment variable
SECRET_KEY = os.getenv("BETTER_AUTH_SECRET", "your-super-secret-jwt-key-here-must-be-at-least-32-characters-long")
ALGORITHM = "HS256"

import hashlib

# Password hashing - using a fallback approach due to bcrypt compatibility issues
def get_password_hash(password):
    # Validate password length (bcrypt limitation: max 72 bytes)
    if not password or len(password) > 72:
        raise ValueError("Password must be between 1 and 72 characters")
    # Using SHA256 with salt for demonstration purposes
    # NOTE: In production, use proper bcrypt or argon2
    salt = "static_salt_for_demo"  # This should be random in production
    return hashlib.sha256((password + salt).encode()).hexdigest()

def verify_password(plain_password, hashed_password):
    # Verify password using the same approach
    salt = "static_salt_for_demo"
    return hashlib.sha256((plain_password + salt).encode()).hexdigest() == hashed_password

security = HTTPBearer()

# Router for auth endpoints
router = APIRouter(prefix="/auth")

class Token(BaseModel):
    access_token: str
    token_type: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Note: verify_password and get_password_hash functions are now defined above

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_jwt_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Verify the JWT token and extract user_id
    """
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")  # Changed from "userId" to "sub" (standard JWT claim)
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

@router.post("/sign-in/email", response_model=Token)
def login_user(user_credentials: UserLogin, session: Session = Depends(get_session_dependency)):
    """
    Authenticate user and return JWT token
    """
    try:
        # Validate password length (bcrypt limitation: max 72 bytes)
        if len(user_credentials.password) > 72:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be less than 72 characters"
            )

        # Find user by email
        user = session.query(User).filter(User.email == user_credentials.email).first()
        if not user or not verify_password(user_credentials.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Create access token
        access_token_expires = timedelta(minutes=30)  # Token valid for 30 minutes
        access_token = create_access_token(
            data={"sub": user.id}, expires_delta=access_token_expires
        )

        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except ValueError as ve:
        # Handle value errors (like password validation)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve)
        )
    except Exception as e:
        # Log the error (in a real app, use proper logging)
        print(f"Unexpected error during login: {e}")
        # Raise a generic error to avoid exposing internal details
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during login"
        )

@router.post("/sign-up", response_model=Token)
def register_user(user_data: UserCreate, session: Session = Depends(get_session_dependency)):
    """
    Register a new user and return JWT token
    """
    try:
        # Check if user already exists
        existing_user = session.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        # Validate password length (bcrypt limitation: max 72 bytes)
        if len(user_data.password) > 72:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be less than 72 characters"
            )

        # Hash password
        hashed_password = get_password_hash(user_data.password)

        # Generate a unique ID for the user
        import uuid
        user_id = str(uuid.uuid4())

        # Create new user
        db_user = User(
            id=user_id,
            email=user_data.email,
            hashed_password=hashed_password,
            name=user_data.name
        )
        session.add(db_user)
        session.commit()
        session.refresh(db_user)

        # Create access token
        access_token_expires = timedelta(minutes=30)  # Token valid for 30 minutes
        access_token = create_access_token(
            data={"sub": str(db_user.id)}, expires_delta=access_token_expires
        )

        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except ValueError as ve:
        # Handle value errors (like password validation)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve)
        )
    except Exception as e:
        # Log the error (in a real app, use proper logging)
        print(f"Unexpected error during registration: {e}")
        # Raise a generic error to avoid exposing internal details
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during registration"
        )

@router.post("/sign-out")
def logout_user():
    """
    Logout user (client-side token removal is sufficient)
    """
    # For stateless JWT, logout is handled on the client side by removing the token
    # Here we just return a success response
    return {"message": "Logged out successfully"}