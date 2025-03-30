'use client'

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/addCards.css'

function AddCardsPage() {
  const navigate = useNavigate()
  const { setId } = useParams()
  const [set, setSet] = useState(null)
  const [flashcards, setFlashcards] = useState([
    { front: '', back: '' },
    { front: '', back: '' },
  ])

  useEffect(() => {
    // Load the set from localStorage
    const existingSets = JSON.parse(
      localStorage.getItem('flashcardSets') || '[]'
    )
    const currentSet = existingSets.find((s) => s.id === setId)
    if (!currentSet) {
      navigate('/')
      return
    }
    setSet(currentSet)
  }, [setId, navigate])

  const handleAddCard = () => {
    setFlashcards([...flashcards, { front: '', back: '' }])
  }

  const handleDeleteCard = (index) => {
    if (flashcards.length <= 2) return
    const newFlashcards = flashcards.filter((_, i) => i !== index)
    setFlashcards(newFlashcards)
  }

  const handleFlashcardChange = (index, field, value) => {
    const newFlashcards = [...flashcards]
    newFlashcards[index][field] = value
    setFlashcards(newFlashcards)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Update the set with the flashcards
    const existingSets = JSON.parse(
      localStorage.getItem('flashcardSets') || '[]'
    )
    const updatedSets = existingSets.map((s) =>
      s.id === setId ? { ...s, cards: flashcards } : s
    )
    localStorage.setItem('flashcardSets', JSON.stringify(updatedSets))

    // Redirect to study page
    navigate(`/study/${setId}`)
  }

  if (!set) return null

  return (
    <div className="add-cards-page">
      <div className="page-header">
        <h1 className="page-title">Add Cards to "{set.title}"</h1>
        <p className="subtitle">Add at least 2 cards to your set</p>
      </div>

      <form onSubmit={handleSubmit} className="cards-form">
        <div className="cards-header">
          <h2>Flashcards</h2>
          <button
            type="button"
            className="add-card-button"
            onClick={handleAddCard}
          >
            + Add Card
          </button>
        </div>

        <div className="cards-container">
          {flashcards.map((card, index) => (
            <div key={index} className="flashcard-pair">
              <div className="flashcard-input">
                <label>Front (English)</label>
                <input
                  type="text"
                  value={card.front}
                  onChange={(e) =>
                    handleFlashcardChange(index, 'front', e.target.value)
                  }
                  placeholder="Word or phrase in English"
                  required
                />
              </div>

              <div className="flashcard-input">
                <label>Back (Translation)</label>
                <input
                  type="text"
                  value={card.back}
                  onChange={(e) =>
                    handleFlashcardChange(index, 'back', e.target.value)
                  }
                  placeholder="Translation in selected language"
                  required
                />
              </div>

              {flashcards.length > 2 && (
                <button
                  type="button"
                  className="delete-card-button"
                  onClick={() => handleDeleteCard(index)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <button type="submit" className="create-button">
            Create Flashcard Set
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCardsPage
