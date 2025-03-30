import { Link } from "react-router-dom"

function FeatureCard({ icon, title, description, to, buttonText }) {
  return (
    <div className="card feature-card">
      <div className="card-content">
        <div className="feature-icon">
          <i className={`icon ${icon}`}></i>
        </div>
        <h2 className="feature-title">{title}</h2>
        <p className="feature-description">{description}</p>
        <Link to={to} className="btn btn-primary btn-full">
          {buttonText}
        </Link>
      </div>
    </div>
  )
}

export default FeatureCard