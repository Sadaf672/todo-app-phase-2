import sys
import os
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
from dotenv import load_dotenv  # Load environment variables

# Load environment variables from .env file
load_dotenv()

# Routers
import auth  # Explicitly import the auth.py file
from auth import router as auth_router
from api.routes.tasks import router as tasks_router

# DB & Models
from db import get_session_dependency
from models import Task
from init_db import create_tables

app = FastAPI(title="Hackathon II Todo App API", version="1.0.0")


# Global exception handlers
@app.exception_handler(StarletteHTTPException)
async def custom_http_exception_handler(request, exc):
    """
    Global handler for HTTP exceptions
    """
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "detail": exc.detail,
            "error_code": exc.status_code
        }
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    """
    Global handler for request validation errors
    """
    return JSONResponse(
        status_code=422,
        content={
            "detail": "Validation error",
            "errors": [
                {
                    "loc": error["loc"],
                    "msg": error["msg"],
                    "type": error["type"]
                }
                for error in exc.errors()
            ]
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """
    Global handler for general exceptions
    """
    # Log the error (in a real app, use proper logging)
    print(f"Unhandled exception: {exc}")

    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error",
            "error_code": 500
        }
    )

# CORS configuration - allow requests from frontend
# Allow all origins for development (should be restricted in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    """Initialize database tables when the app starts"""
    import asyncio
    from db_init_with_retry import create_tables_with_retry
    # Add a small delay to ensure DB connection is ready
    await asyncio.sleep(1)
    create_tables_with_retry()

# Include routers
app.include_router(tasks_router, prefix="/api", tags=["tasks"])
app.include_router(auth_router, prefix="/api", tags=["auth"])  # auth endpoints under /api/auth

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)