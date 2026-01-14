from models import Task, User
from db import engine
from sqlmodel import SQLModel

def create_tables():
    SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    create_tables()
    print("Tables created successfully!")