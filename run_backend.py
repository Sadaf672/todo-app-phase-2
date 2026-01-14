import sys
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_dir))

# Change to the backend directory
import os
os.chdir(backend_dir)

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

print("Starting backend server...")

try:
    import main
    print("Main module imported successfully")
    
    # Try to run the app
    import uvicorn
    print("About to run uvicorn")
    uvicorn.run(main.app, host="0.0.0.0", port=8000)
    
except Exception as e:
    print(f"Error starting server: {e}")
    import traceback
    traceback.print_exc()