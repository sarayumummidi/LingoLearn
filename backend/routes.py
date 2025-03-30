from sqlalchemy.orm import Session
import models, schemas

def get_set(db: Session, set_id: int):
    return db.query(models.Set).filter(models.Set.id == set_id).first()

def get_sets(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Set).offset(skip).limit(limit).all()

def create_set(db: Session, item: schemas.SetCreate):
    set = models.Set(title = item.title, language = item.language, description = item.description)
    db.add(set)
    db.commit()
    db.refresh(set)  # Get the set ID
    
    # Create flashcards if provided
    if item.flashcards:
        for flashcard in item.flashcards:
            db_flashcard = models.Flashcard(
                front=flashcard.front,
                back=flashcard.back,
                set_id=set.id  # Use the set's ID
            )
            db.add(db_flashcard)
        db.commit()
        db.refresh(set)  # Refresh to get the flashcards
    
    return set

def update_set(db: Session, item_id: int, item: schemas.SetCreate):
    set = db.query(models.Set).filter(models.Set.id == item_id).first()
    if not set:
        return None
    db.query(models.Set).filter(models.Set.id == item_id).update({"title": item.title, "language": item.language, "description": item.description})
    db.commit()
    return set

def delete_set(db: Session, item_id: int):
    set = db.query(models.Set).filter(models.Set.id == item_id).first()
    if set:
        db.delete(set)
        db.commit()
    return set

def get_flashcard(db: Session, item_id: int):
    return db.query(models.Flashcard).filter(models.Flashcard.id == item_id).first()

def get_flashcards(db:Session, skip: int = 0, limit: int = 10):
    return db.query(models.Flashcard).offset(skip).limit(limit).all()

def create_flashcard(db: Session, item: schemas.FlashcardCreate):
    flashcard = models.Flashcard(front = item.front, back = item.back, set_id =item.set_id)
    db.add(flashcard)
    db.commit()
    db.refresh(flashcard)
    return flashcard


def update_flashcard(db:Session, item_id: int, item: schemas.FlashcardCreate):
    flashcard = db.query(models.Flashcard).filter(models.Flashcard.id == item_id).first()
    if not flashcard:
        return None
    
    # Update flashcard fields
    setattr(flashcard, 'front', item.front)
    setattr(flashcard, 'back', item.back)
    
    db.commit()
    db.refresh(flashcard)
    return flashcard
    
def delete_flashcard(db:Session, item_id: int):
    flashcard = db.query(models.Flashcard).filter(models.Flashcard.id == item_id).first()
    if flashcard:
        db.delete(flashcard)
        db.commit()
    return flashcard

