import sys
import os
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path.cwd() / "backend"
sys.path.insert(0, str(backend_dir))

# Change to the backend directory
os.chdir(backend_dir)

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

print("Environment loaded")

try:
    # Import the main app
    from main import app
    print("Main app imported successfully")
    
    # Try to initialize the database
    from init_db import create_tables
    print("Initializing database tables...")
    create_tables()
    print("Database initialized successfully")
    
    # Start the server
    import uvicorn
    print("Starting server on http://0.0.0.0:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
    input("Press Enter to exit...")