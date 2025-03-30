"use client"

function FlashcardInput({ id, front, back, canDelete, onUpdate, onRemove }) {
  return (
    <div className="card flashcard-input">
      <div className="card-content">
        <div className="flashcard-grid">
          <div className="form-group">
            <label htmlFor={`front-${id}`} className="form-label">
              Front (English)
            </label>
            <input
              type="text"
              id={`front-${id}`}
              className="form-input"
              value={front}
              onChange={(e) => onUpdate(id, "front", e.target.value)}
              placeholder="Word or phrase in English"
              required
            />
          </div>
          <div className="form-group with-action">
            <label htmlFor={`back-${id}`} className="form-label">
              Back (Translation)
            </label>
            <input
              type="text"
              id={`back-${id}`}
              className="form-input"
              value={back}
              onChange={(e) => onUpdate(id, "back", e.target.value)}
              placeholder="Translation in selected language"
              required
            />
            <button
              type="button"
              className="btn btn-icon remove-card"
              disabled={!canDelete}
              onClick={() => onRemove(id)}
            >
              <i className="icon trash-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlashcardInput