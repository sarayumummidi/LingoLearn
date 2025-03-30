'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/create.css'

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

function CreateSetPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [language, setLanguage] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Create a new set with basic info
    const newSet = {
      id: Date.now().toString(),
      title,
      language,
      description,
      cards: [],
      createdAt: new Date().toISOString(),
    }

    // Get existing sets or initialize empty array
    const existingSets = JSON.parse(
      localStorage.getItem('flashcardSets') || '[]'
    )
    existingSets.push(newSet)
    localStorage.setItem('flashcardSets', JSON.stringify(existingSets))

    // Redirect to add cards page
    navigate(`/add-cards/${newSet.id}`)
  }

  return (
    <div className="create-page">
      <h1 className="page-title">Create New Flashcard Set</h1>

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label htmlFor="title">Set Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Basic Spanish Vocabulary"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          >
            <option value="">Select a language</option>
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description for your flashcard set"
            rows="4"
          />
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
            Create Set
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateSetPage
