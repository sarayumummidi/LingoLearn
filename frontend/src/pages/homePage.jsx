import FeatureCard from '../components/FeatureCard'
import '../styles/home.css'

function HomePage() {
  return (
    <div className="home-page">
      <h1 className="page-title">Welcome to LingoLearn</h1>

      <p className="subtitle">
        A minimalist flashcard app to help you learn new languages efficiently.
        Create custom flashcard sets or study existing ones.
      </p>

      <div className="feature-cards">
        <FeatureCard
          icon="book-icon"
          title="My Flashcard Library"
          description="Browse and manage your personal collection of flashcard sets."
          to="/library"
          buttonText="View Library"
        />

        <FeatureCard
          icon="plus-icon"
          title="Create Flashcards"
          description="Create your own custom flashcard sets for any language."
          to="/create"
          buttonText="Create Set"
        />

        <FeatureCard
          icon="study-icon"
          title="Study Mode"
          description="Practice with your flashcards using our intuitive study interface."
          to="/study"
          buttonText="Start Studying"
        />
      </div>

      <div className="recent-activity">
        <h2 className="section-title">Recent Activity</h2>
        <p className="muted-text">
          You haven't studied any flashcards yet. Start by creating a set or
          browsing your library.
        </p>
      </div>
    </div>
  )
}

export default HomePage
