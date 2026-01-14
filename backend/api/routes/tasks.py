from fastapi import APIRouter, HTTPException, status, Depends, Query
from typing import List, Optional
from sqlmodel import Session, select
from datetime import datetime

# Import using absolute paths
import sys
from pathlib import Path
import os

# Add the backend directory to the path if not already present
backend_dir = Path(__file__).resolve().parent.parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from models import Task, TaskCreate, TaskUpdate, TaskPublic
from auth import get_current_user
from db import get_session_dependency


router = APIRouter(prefix="/tasks")


@router.get("/")
def list_tasks(
    current_user: str = Depends(get_current_user),
    status_param: Optional[str] = Query(None, alias="status", regex="^(all|pending|completed)$"),
    sort: Optional[str] = Query(None, regex="^(created|title)$"),
    session: Session = Depends(get_session_dependency)
):
    """
    Get all tasks for the authenticated user with optional filtering and sorting.
    """
    # Build query with user_id filter
    query = select(Task).where(Task.user_id == current_user)

    # Apply status filter
    if status_param and status_param != "all":
        if status_param == "pending":
            query = query.where(Task.completed == False)
        elif status_param == "completed":
            query = query.where(Task.completed == True)

    # Apply sorting
    if sort == "title":
        query = query.order_by(Task.title)
    else:  # Default to created date (newest first)
        query = query.order_by(Task.created_at.desc())

    tasks = session.exec(query).all()
    # Return tasks directly since they're already the right format
    return tasks


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_task(
    task_create: TaskCreate,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session_dependency)
):
    """
    Create a new task for the authenticated user.
    """
    # Validate title length (1-200 characters)
    if len(task_create.title) < 1 or len(task_create.title) > 200:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Title must be between 1 and 200 characters"
        )

    # Validate description length (max 1000 characters)
    if task_create.description and len(task_create.description) > 1000:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Description must be less than 1000 characters"
        )

    # Create task instance
    task = Task(
        title=task_create.title,
        description=task_create.description,
        completed=task_create.completed,
        user_id=current_user
    )
    task.created_at = datetime.utcnow()
    task.updated_at = datetime.utcnow()

    session.add(task)
    session.commit()
    session.refresh(task)
    return task


@router.get("/{task_id}")
def get_task(
    task_id: int,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session_dependency)
):
    """
    Get a specific task by ID for the authenticated user.
    """
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Check if the task belongs to the current user
    if task.user_id != current_user:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@router.put("/{task_id}")
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session_dependency)
):
    """
    Update an existing task for the authenticated user.
    """
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Check if the task belongs to the current user
    if task.user_id != current_user:
        raise HTTPException(status_code=404, detail="Task not found")

    # Validate title length if provided (1-200 characters)
    if task_update.title is not None:
        if len(task_update.title) < 1 or len(task_update.title) > 200:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Title must be between 1 and 200 characters"
            )
        task.title = task_update.title

    # Validate description length if provided (max 1000 characters)
    if task_update.description is not None and len(task_update.description) > 1000:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Description must be less than 1000 characters"
        )
    if task_update.description is not None:
        task.description = task_update.description

    # Update completed status if provided
    if task_update.completed is not None:
        task.completed = task_update.completed

    task.updated_at = datetime.utcnow()
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session_dependency)
):
    """
    Delete a specific task for the authenticated user.
    """
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Check if the task belongs to the current user
    if task.user_id != current_user:
        raise HTTPException(status_code=404, detail="Task not found")

    session.delete(task)
    session.commit()
    return


@router.patch("/{task_id}/complete")
def toggle_task_completion(
    task_id: int,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session_dependency)
):
    """
    Toggle the completion status of a specific task for the authenticated user.
    """
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Check if the task belongs to the current user
    if task.user_id != current_user:
        raise HTTPException(status_code=404, detail="Task not found")

    # Toggle the completion status
    task.completed = not task.completed
    task.updated_at = datetime.utcnow()
    session.add(task)
    session.commit()
    session.refresh(task)
    return task