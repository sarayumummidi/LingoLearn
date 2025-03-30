import { Link } from "react-router-dom"

function LanguageCard({ id, name, flag, cards }) {
  return (
    <Link to={`/study?language=${id}`} className="card language-card">
      <div className="card-content">
        <div className="language-header">
          <span className="language-flag">{flag}</span>
          <h2 className="language-name">{name}</h2>
        </div>
        <p className="language-sets">{cards} flashcards available</p>
      </div>
    </Link>
  )
}

export default LanguageCard