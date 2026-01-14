# Simple runner for the backend application
import uvicorn
import sys
import os

# Add the current directory to the path to ensure imports work
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    # Import the app after setting up the path
    from main import app
    from init_db import create_tables

    # Initialize database tables
    create_tables()

    uvicorn.run(app, host="0.0.0.0", port=8000)