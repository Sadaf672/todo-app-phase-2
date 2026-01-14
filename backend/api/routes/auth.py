from fastapi import APIRouter, HTTPException, status, Depends
from typing import Optional
from pydantic import BaseModel
from ..auth.dependencies import CurrentUser

router = APIRouter()


class User(BaseModel):
    id: str
    email: str
    name: Optional[str] = None


class SignUpRequest(BaseModel):
    email: str
    password: str
    name: Optional[str] = None


class SignInRequest(BaseModel):
    email: str
    password: str


class AuthResponse(BaseModel):
    user: User
    token: str


@router.post("/auth/signup", response_model=AuthResponse)
def signup(signup_request: SignUpRequest):
    """
    Register a new user.
    NOTE: In a real implementation, this would connect to Better Auth.
    For now, returning a mock response.
    """
    # Mock implementation - in real app, this would call Better Auth
    user = User(id="mock_user_id", email=signup_request.email, name=signup_request.name)
    token = "mock_jwt_token"  # In real app, this would be a real JWT from Better Auth
    return AuthResponse(user=user, token=token)


@router.post("/auth/signin", response_model=AuthResponse)
def signin(signin_request: SignInRequest):
    """
    Authenticate an existing user.
    NOTE: In a real implementation, this would connect to Better Auth.
    For now, returning a mock response.
    """
    # Mock implementation - in real app, this would call Better Auth
    user = User(id="mock_user_id", email=signin_request.email)
    token = "mock_jwt_token"  # In real app, this would be a real JWT from Better Auth
    return AuthResponse(user=user, token=token)


@router.post("/auth/logout")
def logout(current_user: str = Depends(CurrentUser)):
    """
    Log out the current user.
    NOTE: In a real implementation, this would connect to Better Auth.
    """
    # Mock implementation - in real app, this would call Better Auth
    return {"message": "Logged out successfully"}