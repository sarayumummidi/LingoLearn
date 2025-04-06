'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/create.css'
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

function CreateSetPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [language, setLanguage] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // when you click create, you create the flashcard set - triggers the create set endpoint
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!title.trim()) {
        throw new Error('Title is required')
      }
      if (!language) {
        throw new Error('Language is required')
      }

      const setData = {
        title: title.trim(),
        language,
        description: description.trim(),
        flashcards: [],
      }

      // send the data to the backend
      console.log('Sending data to backend:', setData)
      const response = await setEndpoints.createSet(setData)

      // if the set is created successfully, you navigate to the add cards page
      if (response.data) {
        console.log('Set created successfully:', response.data)
        navigate(`/add-cards/${response.data.id}`)
      } else {
        throw new Error('No data received from server')
      }
    } catch (error) {
      // handle errors if the set is not created successfully
      console.error('Error creating set:', error)
      setError(
        error.response?.data?.detail ||
          error.message ||
          'Failed to create set. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  // return the create page
  return (
    <div className="create-page">
      <h1 className="page-title">Create New Flashcard Set</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="create-form">
        {/*set title input*/}
        <div className="form-group">
          <label htmlFor="title">Set Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Basic Spanish Vocabulary"
            required
            disabled={loading}
          />
        </div>

        {/*language dropdown*/}
        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">Select a language</option>
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/*description textarea*/}
        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description for your flashcard set"
            rows="4"
            disabled={loading}
          />
        </div>

        {/*cancel and create button*/}
        {/*if you click cancel, you go back to the library page*/}
        {/*if you click create, you create the flashcard set - triggers the create set endpoint*/}
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
            {loading ? 'Creating...' : 'Create Set'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateSetPage
