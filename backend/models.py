from sqlalchemy import Column, Integer, String, ForeignKey 
from sqlalchemy.orm import relationship
from database import Base

class Set(Base):
    __tablename__ = 'sets'
    id = Column(Integer, primary_key= True, index = True)
    title = Column(String, nullable= False)
    language = Column(String, nullable= False)
    description = Column(String, nullable= True)

    flashcards = relationship("Flashcard", back_populates="set", cascade="all, delete", lazy="dynamic")

class Flashcard(Base):
    __tablename__ = 'flashcards'
    id = Column(Integer, primary_key= True, index = True)
    front = Column(String, nullable= False)
    back = Column(String, nullable= False)
    set_id = Column(Integer, ForeignKey('sets.id', ondelete="CASCADE"), nullable= False)
    
    set = relationship("Set", back_populates="flashcards")
    