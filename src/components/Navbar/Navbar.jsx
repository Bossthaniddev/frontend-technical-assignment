import { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { movieType } from '../../api/TmdbApi';

function Navbar() {

  const [showNavbar, setShowNavbar] = useState(false)
  const navbarRef = useRef(null);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setShowNavbar(false);
    }
  };

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-container">
        <img
          src="src/assets/images/logoboss.png"
          className="website-logo"
          alt="website logo"
        />
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul onClick={handleShowNavbar}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/movie" state={movieType.popular}>Movie</NavLink>
            </li>
            <li>
              <NavLink to="/favorites">Favorites</NavLink>
            </li>
          </ul>
        </div>
        {/* <input type="text" placeholder="Search" /> */}
        <img
          src="src/assets/images/hamburger.png"
          className="menu-icon"
          alt="website logo"
          onClick={handleShowNavbar}
        />
      </div>
    </nav>
  )
}

export default Navbar