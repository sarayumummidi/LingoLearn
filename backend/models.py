from sqlalchemy import Column, Integer, String, ForeignKey 
from sqlalchemy.orm import relationship
from database import Base

#set model
#id: unique identifier for the set
#title: title of the set
#language: language of the set
#description: description of the set
#flashcards: list of flashcard objects

class Set(Base):
    __tablename__ = 'sets'
    id = Column(Integer, primary_key= True, index = True)
    title = Column(String, nullable= False)
    language = Column(String, nullable= False)
    description = Column(String, nullable= True)

    flashcards = relationship("Flashcard", back_populates="set", cascade="all, delete-orphan")

#flashcard model
#id: unique identifier for the flashcard
#front: front of the flashcard
#back: back of the flashcard
#set_id: id of the set that the flashcard belongs to

class Flashcard(Base):
    __tablename__ = 'flashcards'
    id = Column(Integer, primary_key= True, index = True)
    front = Column(String, nullable= False)
    back = Column(String, nullable= False)
    set_id = Column(Integer, ForeignKey('sets.id', ondelete="CASCADE"), nullable= False)
    
    set = relationship("Set", back_populates="flashcards")
    