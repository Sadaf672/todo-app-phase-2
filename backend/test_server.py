import requests
import time

# Wait a moment for the server to be fully ready
time.sleep(2)

try:
    # Test the health endpoint
    response = requests.get('http://127.0.0.1:8000/health')
    print(f"Health check status: {response.status_code}")
    print(f"Health check response: {response.json()}")
    
    # Test the docs endpoint
    response = requests.get('http://127.0.0.1:8000/docs')
    print(f"Docs endpoint status: {response.status_code}")
    
    print("Server is running correctly!")
    
except requests.exceptions.ConnectionError:
    print("Could not connect to server. It may still be starting up.")
except Exception as e:
    print(f"Error testing server: {e}")