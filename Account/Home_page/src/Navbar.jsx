import './HHS.css'
import HHS from './HHS'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

  const [activeLink, setActiveLink] = useState('')
  
    useEffect(() => {
      setActiveLink(window.location.hash || '/Services/About-us.html')
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              const siblings = entry.target.parentElement.querySelectorAll('.fade-up')
              siblings.forEach((el, i) => {
                setTimeout(() => el.classList.add('visible'), i * 100)
              })
            }
          })
        },
        { threshold: 0.1 },
      )
      const elements = document.querySelectorAll('.fade-up')
          elements.forEach((el) => observer.observe(el))
      
          return () => {
            elements.forEach((el) => observer.unobserve(el))
            observer.disconnect()
          }
        }, [])

  const navLinks = [
    {
      href: 'about-us',
      label: 'About Us',
      icon: 'fas fa-info-circle',
    },
    { href: 'about-us', label: 'Our Services', icon: 'fas fa-layer-group' },
    { href: 'Companies', label: 'Companies', icon: 'fas fa-building' },
    { href: 'Candidates', label: 'Candidates', icon: 'fas fa-users' },
  ]

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar navbar-custom">
        <div className="nav-inner">
          <a className="navbar-brand navbar-brand-text" href="#">
            <Link to="/">Hire and Hired Stars</Link>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
            <ul className="navbar-nav">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.href}>
                  <a
                    className="nav-link nav-link-custom"
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.href)
                      setMenuOpen(false)
                    }}
                    style={activeLink === link.href ? { color: 'var(--gold)' } : undefined}
                  >
                    <i className={link.icon} /> {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="nav-actions">
              <a href="" className="btn btn-signin">
                <Link to={'/Create-Account'}>Sign In</Link>
              </a>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
