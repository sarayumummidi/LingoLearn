'use client'

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Flashcard from '../components/flashcard'
import '../styles/study.css'
import setEndpoints from '../services/api'

function StudyPage() {
  const { setId } = useParams()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [set, setSet] = useState(null)
  const [cards, setCards] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  // load the set
  useEffect(() => {
    const loadSet = async () => {
      try {
        let setData
        if (setId) {
          const response = await setEndpoints.getSet(setId)
          setData = response.data
        } else {
          const response = await setEndpoints.getSets()
          if (response.data && response.data.length > 0) {
            const sortedSets = response.data.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            )
            setData = sortedSets[0]
          }
        }

        if (setData) {
          setSet(setData)
          setCards(setData.flashcards || [])
          setCurrentIndex(0)
          setFlipped(false)
        }
      } catch (error) {
        console.error('Error loading set:', error)
        setError('Failed to load set. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    loadSet()
  }, [setId])

  // next card in the set
  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setFlipped(false)
    }
  }

  // previous card in the set
  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setFlipped(false)
    }
  }

  // flip the card
  const flipCard = () => {
    setFlipped(!flipped)
  }

  // reset the cards
  const resetCards = () => {
    setCurrentIndex(0)
    setFlipped(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  // if there are no flashcards in the set, you can create a new set
  if (!set || !cards.length) {
    return (
      <div className="empty-state">
        <h1 className="page-title">No flashcards available</h1>
        <p className="subtitle">There are no flashcards in this set yet.</p>
        <Link to="/create" className="btn btn-primary">
          Create Flashcard Set
        </Link>
      </div>
    )
  }

  const currentCard = cards[currentIndex]

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

  return (
    <div className="study-page">
      <div className="study-header">
        <h1 className="page-title">
          Studying {set.title} ({languageNames[set.language]})
        </h1>
        <div className="card-counter">
          Card {currentIndex + 1} of {cards.length}
        </div>
      </div>

      <Flashcard
        front={currentCard.front}
        back={currentCard.back}
        flipped={flipped}
        onFlip={flipCard}
      />

      <div className="study-controls">
        <button
          className="btn btn-outline"
          onClick={prevCard}
          disabled={currentIndex === 0}
        >
          <i className="icon arrow-left-icon"></i>
          Previous
        </button>

        <button className="btn btn-ghost" onClick={resetCards}>
          <i className="icon refresh-icon"></i>
          Reset
        </button>

        <button
          className="btn btn-primary"
          onClick={nextCard}
          disabled={currentIndex === cards.length - 1}
        >
          Next
          <i className="icon arrow-right-icon"></i>
        </button>
      </div>
    </div>
  )
}

export default StudyPage
