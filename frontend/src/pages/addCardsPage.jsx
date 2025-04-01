'use client'

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/addCards.css'
import setEndpoints from '../services/api'

function AddCardsPage() {
  const navigate = useNavigate()
  const { setId } = useParams()
  const [set, setSet] = useState(null)
  const [flashcards, setFlashcards] = useState([{ front: '', back: '' }])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadSet = async () => {
      try {
        const response = await setEndpoints.getSet(setId)
        if (response.data) {
          setSet(response.data)
        }
      } catch (error) {
        console.error('Error loading set:', error)
        setError('Failed to load set. Please try again.')
        navigate('/')
      }
    }
    loadSet()
  }, [setId, navigate])

  const handleAddCard = () => {
    setFlashcards([...flashcards, { front: '', back: '' }])
  }

  const handleDeleteCard = (index) => {
    const newFlashcards = flashcards.filter((_, i) => i !== index)
    setFlashcards(newFlashcards)
  }

  const handleFlashcardChange = (index, field, value) => {
    const newFlashcards = [...flashcards]
    newFlashcards[index][field] = value
    setFlashcards(newFlashcards)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate flashcards
      const emptyCards = flashcards.filter(
        (card) => !card.front.trim() || !card.back.trim()
      )
      if (emptyCards.length > 0) {
        throw new Error('Please fill in both sides of all cards')
      }

      // Create each flashcard
      for (const card of flashcards) {
        await setEndpoints.createFlashcard({
          front: card.front.trim(),
          back: card.back.trim(),
          set_id: setId,
        })
      }

      // Redirect to library page
      navigate('/library')
    } catch (error) {
      console.error('Error adding flashcards:', error)
      setError(
        error.response?.data?.detail ||
          error.message ||
          'Failed to add flashcards. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (!set) {
    return <div>Loading...</div>
  }

  return (
    <div className="add-cards-page">
      <div className="page-header">
        <h1 className="page-title">Add Cards to "{set.title}"</h1>
        <p className="subtitle">Add at least 1 card to your set</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="cards-form">
        <div className="cards-header">
          <h2>Flashcards</h2>
          <button
            type="button"
            className="add-card-button"
            onClick={handleAddCard}
            disabled={loading}
          >
            + Add Card
          </button>
        </div>

        <div className="cards-container">
          {flashcards.map((card, index) => (
            <div key={index} className="flashcard-pair">
              <div className="flashcard-inputs">
                <div className="flashcard-input">
                  <label htmlFor={`front-${index}`}>Front (English)</label>
                  <input
                    type="text"
                    id={`front-${index}`}
                    name={`front-${index}`}
                    value={card.front}
                    onChange={(e) =>
                      handleFlashcardChange(index, 'front', e.target.value)
                    }
                    placeholder="Word or phrase in English"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="flashcard-input">
                  <label htmlFor={`back-${index}`}>Back (Translation)</label>
                  <input
                    type="text"
                    id={`back-${index}`}
                    name={`back-${index}`}
                    value={card.back}
                    onChange={(e) =>
                      handleFlashcardChange(index, 'back', e.target.value)
                    }
                    placeholder="Translation in selected language"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="button"
                className="delete-card-button"
                onClick={() => handleDeleteCard(index)}
                disabled={loading}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/')}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="create-button" disabled={loading}>
            {loading ? 'Creating...' : 'Create Flashcard Set'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCardsPage
