from db import engine
from sqlmodel import text

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        print("Database connection successful:", result.fetchone())
except Exception as e:
    print(f"Database connection failed: {e}")
    import traceback
    traceback.print_exc()