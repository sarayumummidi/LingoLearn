from pydantic import BaseModel

class CreateFlashcard(BaseModel):
    question: str
    translation: str
    language: str

class ResponseFlashcard(CreateFlashcard):
    id: int

    class Config:
        orm_mode = True
