from pydantic import BaseModel
from typing import List, Optional

# flashcard schema
class FlashcardBase(BaseModel):
    front: str
    back: str

class FlashcardCreate(FlashcardBase):
    set_id: Optional[int] = None 

class Flashcard(FlashcardBase):
    id: int
    set_id: int

    class Config:
        from_attributes = True 

#set schema
class SetBase(BaseModel):
    title: str
    language: str
    description: Optional[str] = None

class SetCreate(SetBase):
    flashcards: Optional[List[FlashcardCreate]] = None

class Set(SetBase):
    id: int
    flashcards: List[Flashcard] = []
    class Config:
        from_attributes = True