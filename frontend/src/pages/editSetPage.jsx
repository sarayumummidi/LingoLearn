'use client'

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/editset.css'
import setEndpoints from '../services/api'

const languages = [
  { id: 'spanish', name: 'Spanish', flag: '🇪🇸' },
  { id: 'french', name: 'French', flag: '🇫🇷' },
  { id: 'german', name: 'German', flag: '🇩🇪' },
  { id: 'italian', name: 'Italian', flag: '🇮🇹' },
  { id: 'japanese', name: 'Japanese', flag: '🇯🇵' },
  { id: 'korean', name: 'Korean', flag: '🇰🇷' },
  { id: 'chinese', name: 'Chinese', flag: '🇨🇳' },
  { id: 'portuguese', name: 'Portuguese', flag: '🇵🇹' },
]

function EditSetPage() {
  const { setId } = useParams()
  const navigate = useNavigate()
  const [set, setSet] = useState(null)
  const [title, setTitle] = useState('')
  const [language, setLanguage] = useState('')
  const [description, setDescription] = useState('')
  const [cards, setCards] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSet = async () => {
      try {
        const response = await setEndpoints.getSet(setId)
        if (response.data) {
          setSet(response.data)
          setTitle(response.data.title)
          setLanguage(response.data.language)
          setDescription(response.data.description || '')
          setCards(response.data.flashcards || [])
        } else {
          navigate('/library')
        }
      } catch (error) {
        console.error('Error loading set:', error)
        setError('Failed to load set. Please try again.')
        navigate('/library')
      } finally {
        setLoading(false)
      }
    }
    loadSet()
  }, [setId, navigate])

  const updateCard = (id, field, value) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    )
  }

  const deleteCard = (id) => {
    if (cards.length <= 1) {
      alert('A set must have at least one card')
      return
    }

    setCards(cards.filter((card) => card.id !== id))
  }

  const addNewCard = () => {
    const newCard = {
      front: '',
      back: '',
      isNew: true,
    }
    setCards([...cards, newCard])
  }

  const saveChanges = async () => {
    // Validate
    if (!title.trim()) {
      alert('Please enter a title for your set')
      return
    }

    if (!language) {
      alert('Please select a language')
      return
    }

    if (cards.length === 0) {
      alert('Please add at least one card')
      return
    }

    // Check for empty cards
    const emptyCards = cards.filter(
      (card) => !card.front.trim() || !card.back.trim()
    )
    if (emptyCards.length > 0) {
      alert('Please fill in both sides of all cards')
      return
    }

    try {
      // First update the set details
      const setData = {
        title: title.trim(),
        language,
        description: description.trim(),
      }

      const setResponse = await setEndpoints.updateSet(setId, setData)
      if (!setResponse.data) {
        throw new Error('Failed to update set')
      }

      // Then update each flashcard
      for (const card of cards) {
        if (card.isNew) {
          // Create new card
          await setEndpoints.createFlashcard({
            front: card.front.trim(),
            back: card.back.trim(),
            set_id: setId,
          })
        } else if (card.id) {
          // Update existing card
          await setEndpoints.updateFlashcard(card.id, {
            front: card.front.trim(),
            back: card.back.trim(),
          })
        }
      }

      navigate('/library')
    } catch (error) {
      console.error('Error updating set:', error)
      alert('Failed to update set. Please try again.')
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="edit-set-page">
      <h1 className="page-title handwritten">Edit Flashcard Set</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="edit-form">
        <div className="form-section">
          <h2 className="section-title handwritten">Set Details</h2>

          <div className="form-group">
            <label className="form-label handwritten">Set Title</label>
            <input
              type="text"
              className="form-input handwritten-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label handwritten">Language</label>
            <select
              className="form-select handwritten-input"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a language
              </option>
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label handwritten">Description</label>
            <textarea
              className="form-textarea handwritten-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional"
            ></textarea>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title handwritten">Flashcards</h2>
            <button
              type="button"
              className="btn btn-secondary handwritten"
              onClick={addNewCard}
            >
              Add Card
            </button>
          </div>

          <div className="cards-list">
            {cards.map((card, index) => (
              <div key={card.id} className="card-edit-item">
                <div className="card-number handwritten">Card {index + 1}</div>
                <div className="card-edit-content">
                  <div className="form-group">
                    <label className="form-label handwritten">Front</label>
                    <input
                      type="text"
                      className="form-input handwritten-input"
                      value={card.front}
                      onChange={(e) =>
                        updateCard(card.id, 'front', e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label handwritten">Back</label>
                    <input
                      type="text"
                      className="form-input handwritten-input"
                      value={card.back}
                      onChange={(e) =>
                        updateCard(card.id, 'back', e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-icon delete-card"
                  onClick={() => deleteCard(card.id)}
                  disabled={cards.length <= 1}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-outline handwritten"
          onClick={() => navigate('/library')}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary handwritten"
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default EditSetPage
