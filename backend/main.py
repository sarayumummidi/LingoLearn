from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import engine, get_db
from sqlalchemy.orm import Session
import models, schemas, routes

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#return a python dictionary that indicates the home endpoint
@app.get("/flashcard/{id}", response_model=schemas.Flashcard)
def get_flashcard(id: int, db: Session = Depends(get_db)):
    flashcard = routes.get_flashcard(db = db, item_id=id)
    if flashcard is None:
        raise HTTPException(status_code=404, detail="Flashcard not found.")
    return flashcard

@app.get("/flashcards", response_model=list[schemas.Flashcard])
def get_flashcards(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    flashcards = routes.get_flashcards(db = db, skip = skip, limit = limit)
    return flashcards

@app.post("/create_flashcard", response_model=schemas.Flashcard)
def create_flashcard(*, db: Session = Depends(get_db), item: schemas.FlashcardCreate):
    return routes.create_flashcard(db = db, item = item)

@app.put("/update_flashcard/{id}", response_model=schemas.Flashcard)
def update_flashcard(id: int, item: schemas.FlashcardCreate, db: Session = Depends(get_db)):
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

@app.get("/set/{id}", response_model=schemas.Set)
def get_set(id: int, db: Session = Depends(get_db)):
     set = routes.get_set(db = db, set_id=id)
     if set is None:
        raise HTTPException(status_code=404, detail="Flashcard not found.")
     return set

@app.get("/sets", response_model=list[schemas.Set])
def get_sets(db: Session = Depends(get_db)):
    sets = routes.get_sets(db = db)
    return sets

@app.post("/create_set", response_model = schemas.Set)
def create_set(item: schemas.SetCreate, db: Session = Depends(get_db)):
    return routes.create_set(db = db, item= item)

@app.put("/update_set/{id}", response_model= schemas.Set)
def update_set(item: schemas.SetCreate, id: int, db: Session = Depends(get_db)):
    set = routes.update_set(item_id= id, db = db, item = item)
    if not set:
        raise HTTPException(status_code= 404, detail= "Flashcard not found.")
    return set

@app.delete("/delete_set/{id}")
def delete_set(id: int, db: Session = Depends(get_db)):
    result = routes.delete_set(item_id=id, db=db)
    if not result:
        raise HTTPException(status_code=404, detail="Set not found.")
    return {"success": True, "message": "Set deleted successfully"}
    
