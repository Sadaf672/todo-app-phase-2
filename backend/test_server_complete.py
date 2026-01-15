import subprocess
import time
import requests
import sys
import threading

def start_server():
    # Start the server in a subprocess
    server_process = subprocess.Popen([
        sys.executable, "-c", 
        "from main import app; import uvicorn; uvicorn.run(app, host='127.0.0.1', port=8000, log_level='info')"
    ], cwd='.')
    return server_process

def test_server():
    # Give the server some time to start
    time.sleep(8)
    
    try:
        # Test the health endpoint
        response = requests.get('http://127.0.0.1:8000/health', timeout=10)
        print(f"Health check status: {response.status_code}")
        print(f"Health check response: {response.json()}")
        
        # Test the docs endpoint
        response = requests.get('http://127.0.0.1:8000/docs', timeout=10)
        print(f"Docs endpoint status: {response.status_code}")
        
        print("Server is running correctly!")
        return True
        
    except requests.exceptions.ConnectionError:
        print("Could not connect to server. It may still be starting up or failed to start.")
        return False
    except Exception as e:
        print(f"Error testing server: {e}")
        return False

if __name__ == "__main__":
    print("Starting server...")
    server = start_server()
    
    try:
        success = test_server()
        if success:
            print("\nThe server is working properly!")
        else:
            print("\nThere may be an issue with the server.")
    finally:
        # Terminate the server process
        server.terminate()
        server.wait()
        print("Server stopped.")