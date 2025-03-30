import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import HomePage from './pages/homePage'
import LibraryPage from './pages/libraryPage'
import CreateSetPage from './pages/createPage'
import AddCardsPage from './pages/addCardsPage'
import StudyPage from './pages/studyPage'
import EditSetPage from './pages/editSetPage'
import './index.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/create" element={<CreateSetPage />} />
            <Route path="/add-cards/:setId" element={<AddCardsPage />} />
            <Route path="/study" element={<StudyPage />} />
            <Route path="/study/:setId" element={<StudyPage />} />
            <Route path="/edit/:setId" element={<EditSetPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
