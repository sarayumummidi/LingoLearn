"use client"

function Flashcard({ front, back, flipped, onFlip }) {
  return (
    <div className="flashcard-container" onClick={onFlip}>
      <div className={`flashcard ${flipped ? "flipped" : ""}`}>
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <div className="flashcard-content">{front}</div>
            <div className="flashcard-hint">
              click to flip!
              <i className="icon refresh-icon"></i>
            </div>
          </div>
          <div className="flashcard-back">
            <div className="flashcard-content">{back}</div>
            <div className="flashcard-hint">
              click to flip
              <i className="icon refresh-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Flashcard