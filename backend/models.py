from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class User(SQLModel, table=True):
    """
    User model for authentication.
    """
    id: Optional[str] = Field(default=None, primary_key=True)  # Using string ID
    email: str = Field(unique=True, index=True)
    hashed_password: str
    name: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class TaskBase(BaseModel):
    """
    Base model for Task with common fields.
    """
    title: str
    description: Optional[str] = None
    completed: bool = False


class Task(TaskBase, SQLModel, table=True):
    """
    Task model representing a user's todo item.
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str  # Using string ID from JWT token
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class TaskCreate(TaskBase):
    """
    Model for creating new tasks.
    """
    pass


class TaskUpdate(BaseModel):
    """
    Model for updating existing tasks.
    """
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None


class TaskPublic(TaskBase):
    """
    Public model for tasks with ID and timestamps.
    """
    id: int
    user_id: str
    created_at: datetime
    updated_at: datetime = Field(default_factory=datetime.utcnow)