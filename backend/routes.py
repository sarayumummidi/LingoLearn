from sqlalchemy.orm import Session, joinedload
import models, schemas

#set routes 
def get_set(db: Session, set_id: int):
    # Get the set and include its flashcards
    set = db.query(models.Set).filter(models.Set.id == set_id).first()
    if set:
        # Ensure flashcards are loaded
        set.flashcards = db.query(models.Flashcard).filter(models.Flashcard.set_id == set_id).all()
    return set

def get_sets(db: Session):
    sets = db.query(models.Set).options(joinedload(models.Set.flashcards)).all()
    for set in sets:
        set.flashcards = db.query(models.Flashcard).filter(models.Flashcard.set_id == set.id).all()
    return sets

def create_set(db: Session, item: schemas.SetCreate):
    set = models.Set(title = item.title, language = item.language, description = item.description)
    db.add(set)
    db.commit()
    db.refresh(set)
    if item.flashcards:
        for flashcard in item.flashcards:
            db_flashcard = models.Flashcard(
                front=flashcard.front,
                back=flashcard.back,
                set_id=set.id
            )
            db.add(db_flashcard)
        db.commit()
    db.refresh(set)
    set.flashcards = db.query(models.Flashcard).filter(models.Flashcard.set_id == set.id).all()
    return set

def update_set(db: Session, item_id: int, item: schemas.SetCreate):
    set = db.query(models.Set).filter(models.Set.id == item_id).first()
    if not set:
        return None
    for field, value in item.model_dump(exclude_unset=True).items():
        if field != 'flashcards': 
            setattr(set, field, value)
    db.commit()
    db.refresh(set)
    return set

def delete_set(db: Session, item_id: int):
    set = db.query(models.Set).filter(models.Set.id == item_id).first()
    if not set:
        return None
    db.query(models.Flashcard).filter(models.Flashcard.set_id == item_id).delete()
    db.delete(set)
    db.commit()
    return set

#flashcard routes
def get_flashcard(db: Session, item_id: int):
    return db.query(models.Flashcard).filter(models.Flashcard.id == item_id).first()

def get_flashcards(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Flashcard).offset(skip).limit(limit).all()

def create_flashcard(db: Session, item: schemas.FlashcardCreate):
    # Create a new flashcard
    flashcard = models.Flashcard(
        front=item.front,
        back=item.back,
        set_id=item.set_id
    )
    db.add(flashcard)
    db.commit()
    db.refresh(flashcard)
    return flashcard

def update_flashcard(db: Session, item_id: int, item: schemas.FlashcardCreate):
    flashcard = db.query(models.Flashcard).filter(models.Flashcard.id == item_id).first()
    if not flashcard:
        return None
    
    for field, value in item.model_dump(exclude_unset=True).items():
        setattr(flashcard, field, value)
    db.commit()
    db.refresh(flashcard)
    return flashcard

def delete_flashcard(db: Session, item_id: int):
    flashcard = db.query(models.Flashcard).filter(models.Flashcard.id == item_id).first()
    if flashcard:
        db.delete(flashcard)
        db.commit()
    return flashcard

