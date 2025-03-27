from fastapi import FastAPI, HTTPException, Depends
from database import engine, get_db
from sqlalchemy.orm import Session
import models, schemas, routes

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

#return a python dictionary that indicates the home endpoint
@app.get("/flashcard/{id}", response_model=schemas.ResponseFlashcard)
def get_flashcard(id: int, db: Session = Depends(get_db)):
    flashcard = routes.get_flashcard(db = db, item_id=id)
    if flashcard is None:
        raise HTTPException(status_code=404, detail="Flashcard not found.")
    return flashcard

@app.get("/flashcards", response_model=list[schemas.ResponseFlashcard])
def get_flashcards(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    flashcards = routes.get_flashcards(db = db, skip = skip, limit = limit)
    return flashcards

@app.post("/create_flashcard", response_model=schemas.ResponseFlashcard)
def create_flashcard(*, db: Session = Depends(get_db), item: schemas.CreateFlashcard):
    return routes.create_flashcard(db = db, item = item)

@app.put("/update_flashcard/{id}", response_model=schemas.ResponseFlashcard)
def update_flashcard(id: int, item: schemas.CreateFlashcard, db: Session = Depends(get_db)):
    flashcard = routes.update_flashcard(db = db, item_id = id, item = item)
    if flashcard is None:
        raise HTTPException(status_code=404, detail="Flashcard not found.")
    return flashcard


@app.delete("/delete_flashcard/{id}")
def delete_flashcard(id: int, db: Session = Depends(get_db)):
    flashcard = routes.delete_flashcard(db = db, item_id = id)
    if flashcard is None:
        raise HTTPException(status_code=404, detail="Flashcard not found.")
    return {"message": "Flashcard deleted successfully."}