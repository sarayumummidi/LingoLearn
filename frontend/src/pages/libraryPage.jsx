"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/library.css" 

function LibraryPage() {
  const [sets, setSets] = useState([])
  const [languages, setLanguages] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState("all")

  useEffect(() => {
    // Load sets from localStorage
    const savedSets = JSON.parse(localStorage.getItem("flashcardSets") || "[]")
    setSets(savedSets)

    // Extract unique languages
    const uniqueLanguages = [...new Set(savedSets.map((set) => set.language))]
    setLanguages(uniqueLanguages)
  }, [])

  const deleteSet = (id) => {
    if (window.confirm("Are you sure you want to delete this set?")) {
      const updatedSets = sets.filter((set) => set.id !== id)
      setSets(updatedSets)
      localStorage.setItem("flashcardSets", JSON.stringify(updatedSets))
    }
  }

  const filteredSets = selectedLanguage === "all" ? sets : sets.filter((set) => set.language === selectedLanguage)

  const languageNames = {
    spanish: "Spanish",
    french: "French",
    german: "German",
    italian: "Italian",
    japanese: "Japanese",
    korean: "Korean",
    chinese: "Chinese",
    portuguese: "Portuguese",
  }

  const languageFlags = {
    spanish: "🇪🇸",
    french: "🇫🇷",
    german: "🇩🇪",
    italian: "🇮🇹",
    japanese: "🇯🇵",
    korean: "🇰🇷",
    chinese: "🇨🇳",
    portuguese: "🇵🇹",
  }

  return (
    <div className="library-page">
      <div className="page-header">
        <h1 className="page-title handwritten">My Flashcard Library</h1>
        <Link to="/create" className="btn btn-primary handwritten">
          Create New Set
        </Link>
      </div>

      {sets.length === 0 ? (
        <div className="empty-library">
          <p>You don't have any flashcard sets yet.</p>
          <Link to="/create" className="btn btn-primary handwritten">
            Create Your First Set
          </Link>
        </div>
      ) : (
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

          <div className="flashcard-sets">
            {filteredSets.map((set) => (
              <div key={set.id} className="set-card">
                <div className="set-info">
                  <h2 className="set-title handwritten">{set.title}</h2>
                  <div className="set-language">
                    {languageFlags[set.language]} {languageNames[set.language]}
                  </div>
                  <div className="set-stats">
                    {set.cards.length} card{set.cards.length !== 1 ? "s" : ""}
                  </div>
                  {set.description && <p className="set-description">{set.description}</p>}
                </div>
                <div className="set-actions">
                  <Link to={`/study/${set.id}`} className="btn btn-primary">
                    Study
                  </Link>
                  <Link to={`/edit/${set.id}`} className="btn btn-secondary">
                    Edit
                  </Link>
                  <button className="btn btn-outline" onClick={() => deleteSet(set.id)}>
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