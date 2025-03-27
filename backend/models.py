from sqlalchemy import Column, Integer, String
from database import Base

class Flashcard(Base):
    __tablename__ = 'flashcards'
    id = Column(Integer, primary_key= True, index = True)
    question = Column(String, nullable= False)
    translation = Column(String, nullable= False)
    language = Column(String(256))

