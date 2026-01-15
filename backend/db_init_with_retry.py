from models import Task, User
from db import engine
from sqlmodel import SQLModel
from sqlalchemy.exc import ProgrammingError, OperationalError
from sqlalchemy import text
import time
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_tables_with_retry(max_retries=5, delay=2):
    """
    Create database tables with retry mechanism for Neon PostgreSQL compatibility.
    """
    for attempt in range(max_retries):
        try:
            logger.info(f"Attempt {attempt + 1} to create tables...")
            
            # Test the connection first
            with engine.connect() as conn:
                result = conn.execute(text("SELECT 1"))
                logger.info("Database connection successful")
            
            # Create all tables defined in the models
            SQLModel.metadata.create_all(engine)
            logger.info("Tables created successfully!")
            return True
            
        except OperationalError as e:
            logger.error(f"Operational error during table creation (attempt {attempt + 1}): {e}")
            if attempt < max_retries - 1:
                logger.info(f"Retrying in {delay} seconds...")
                time.sleep(delay)
            else:
                logger.error("Max retries reached. Failed to create tables.")
                raise e
                
        except ProgrammingError as e:
            logger.error(f"Programming error during table creation: {e}")
            # Check if it's a schema-related error
            if "relation" in str(e) and "does not exist" in str(e):
                logger.info("Table may already exist or schema issue detected.")
            raise e
            
        except Exception as e:
            logger.error(f"Unexpected error during table creation (attempt {attempt + 1}): {e}")
            if attempt < max_retries - 1:
                logger.info(f"Retrying in {delay} seconds...")
                time.sleep(delay)
            else:
                logger.error("Max retries reached. Failed to create tables.")
                raise e
    
    return False

if __name__ == "__main__":
    success = create_tables_with_retry()
    if success:
        print("Tables created successfully!")
    else:
        print("Failed to create tables after all retries.")