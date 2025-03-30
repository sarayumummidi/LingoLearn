import { Link, useLocation } from 'react-router-dom'
import '../styles/navbar.css'

function Navbar() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo">
            LingoLearn
          </Link>

          <div className="nav-links desktop-nav">
            <NavLink to="/" active={pathname === '/'}>
              <i className="icon home-icon"></i>
              Home
            </NavLink>
            <NavLink to="/library" active={pathname === '/library'}>
              <i className="icon library-icon"></i>
              Library
            </NavLink>
            <NavLink to="/create" active={pathname === '/create'}>
              <i className="icon plus-icon"></i>
              Create
            </NavLink>
            <NavLink to="/study" active={pathname === '/study'}>
              <i className="icon book-icon"></i>
              Study
            </NavLink>
          </div>

          <div className="mobile-nav-toggle">
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, active, children }) {
  const [icon, text] = children
  return (
    <Link to={to} className={`nav-link ${active ? 'active' : ''}`}>
      {icon}
      <span>{text}</span>
    </Link>
  )
}

function MobileMenu() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <div className="mobile-nav">
      <MobileNavLink to="/" active={pathname === '/'}>
        <i className="icon home-icon"></i>
        <span>Home</span>
      </MobileNavLink>
      <MobileNavLink to="/library" active={pathname === '/library'}>
        <i className="icon library-icon"></i>
        <span>Library</span>
      </MobileNavLink>
      <MobileNavLink to="/create" active={pathname === '/create'}>
        <i className="icon plus-icon"></i>
        <span>Create</span>
      </MobileNavLink>
      <MobileNavLink to="/study" active={pathname === '/study'}>
        <i className="icon book-icon"></i>
        <span>Study</span>
      </MobileNavLink>
    </div>
  )
}

function MobileNavLink({ to, active, children }) {
  return (
    <Link to={to} className={`mobile-nav-link ${active ? 'active' : ''}`}>
      {children}
    </Link>
  )
}

export default Navbar
