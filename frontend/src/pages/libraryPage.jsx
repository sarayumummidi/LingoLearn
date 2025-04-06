'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/library.css'
import setEndpoints from '../services/api'

function LibraryPage() {
  const [sets, setSets] = useState([])
  const [languages, setLanguages] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  // load the sets
  useEffect(() => {
    const loadSets = async () => {
      try {
        // get the sets from the backend
        const response = await setEndpoints.getSets()
        if (response.data) {
          console.log('Loaded sets:', response.data) 
          setSets(response.data)
          const uniqueLanguages = [
            ...new Set(response.data.map((set) => set.language)),
          ]
          setLanguages(uniqueLanguages)
        }
      } catch (error) {
        console.error('Error loading sets:', error)
        setError('Failed to load sets. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    loadSets()
  }, [])

  // delete the set
  const deleteSet = async (id) => {
    if (!window.confirm('Are you sure you want to delete this set?')) {
      return
    }

    // delete the set
    try {
      console.log('Attempting to delete set:', id)
      // delete the set from the backend
      const response = await setEndpoints.deleteSet(id)
      console.log('Delete response:', response)
      setSets((prevSets) => prevSets.filter((set) => set.id !== id))
    } catch (error) {
      console.error('Error deleting set:', error)
      console.error('Error response:', error.response)
      // handle errors if the set is not deleted successfully
      if (error.response?.status === 422) {
        alert('Invalid request. Please try again.')
      } else {
        alert('Failed to delete set. Please try again.')
      }
    }
  }

  // filter the sets
  const filteredSets =
    selectedLanguage === 'all'
      ? sets
      : sets.filter((set) => set.language === selectedLanguage)

  const languageNames = {
    spanish: 'Spanish',
    french: 'French',
    german: 'German',
    italian: 'Italian',
    japanese: 'Japanese',
    korean: 'Korean',
    chinese: 'Chinese',
    portuguese: 'Portuguese',
  }

  const languageFlags = {
    spanish: '🇪🇸',
    french: '🇫🇷',
    german: '🇩🇪',
    italian: '🇮🇹',
    japanese: '🇯🇵',
    korean: '🇰🇷',
    chinese: '🇨🇳',
    portuguese: '🇵🇹',
  }

  if (loading) {
    return <div>Loading...</div>
  }

  // return the library page
  return (
    <div className="library-page">
      <div className="page-header">
        <h1 className="page-title handwritten">My Flashcard Library</h1>
        <Link to="/create" className="btn btn-primary handwritten">
          Create New Set
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      
      {sets.length === 0 ? (
        <div className="empty-library">
          <p>You don't have any flashcard sets yet.</p>
          <Link to="/create" className="btn btn-primary handwritten">
            Create Your First Set
          </Link>
        </div>
      ) : (
        // filter the sets
        <>
          <div className="filter-controls">
            <label className="handwritten">Filter by language:</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="form-select"
            >
              <option value="all">All Languages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {languageFlags[lang]} {languageNames[lang]}
                </option>
              ))}
            </select>
          </div>

          {/*flashcard sets*/}
          <div className="flashcard-sets">
            {filteredSets.map((set) => (
              <div key={set.id} className="set-card">
                <div className="set-info">
                  <h2 className="set-title handwritten">{set.title}</h2>
                  <div className="set-language">
                    {languageFlags[set.language]} {languageNames[set.language]}
                  </div>
                  <div className="set-stats">
                    {set.flashcards?.length || 0} card
                    {(set.flashcards?.length || 0) !== 1 ? 's' : ''}
                  </div>
                  {set.description && (
                    <p className="set-description">{set.description}</p>
                  )}
                </div>
                {/*study and edit buttons*/}
                {/*delete button*/}
                {/*set actions*/}
                <div className="set-actions">
                  <Link to={`/study/${set.id}`} className="btn btn-primary">
                    Study
                  </Link>
                  <Link to={`/edit/${set.id}`} className="btn btn-secondary">
                    Edit
                  </Link>
                  <button
                    className="btn btn-outline"
                    onClick={() => deleteSet(set.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default LibraryPage
