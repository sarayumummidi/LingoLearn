from sqlalchemy.orm import Session
from pydantic import BaseModel
import models, schemas


def get_flashcard(db: Session, item_id: int):
    return db.query(models.Flashcard).filter(models.Flashcard.id == item_id).first()

def get_flashcards(db:Session, skip: int = 0, limit: int = 10):
    return db.query(models.Flashcard).offset(skip).limit(limit).all()

def create_flashcard(db: Session, item: schemas.CreateFlashcard):
    flashcard = models.Flashcard(question = item.question, translation = item.translation, language = item.language)
    db.add(flashcard)
    db.commit()
    db.refresh(flashcard)
    return flashcard


def update_flashcard(db:Session, item_id: int, item: schemas.CreateFlashcard):
    flashcard = db.query(models.Flashcard).filter(models.Flashcard.id == item_id).first()
    if not flashcard:
        return None
    
    db.query(models.Flashcard).filter(models.Flashcard.id == item_id).update({"question": item.question, "translation": item.translation, "language": item.language})
    db.commit()

    updated_flashcard = db.query(models.Flashcard).filter(models.Flashcard.id == item_id).first()
    return updated_flashcard
    
def delete_flashcard(db:Session, item_id: int):
    flashcard = db.query(models.Flashcard).filter(models.Flashcard.id == item_id).first()
    if flashcard:
        db.delete(flashcard)
        db.commit()
    return flashcard

