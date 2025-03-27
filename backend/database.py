from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

database_url = os.getenv('DATABASE_URL', 'postgresql://sarayumum:Davis123@localhost/flashcard')

try:
    engine = create_engine(database_url)
    # Test the connection
    engine.connect()
except Exception as e:
    print(f"Error connecting to the database: {e}")
    raise

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

