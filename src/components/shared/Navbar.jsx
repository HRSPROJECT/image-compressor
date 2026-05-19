import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

function Logo() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span>F</span>
    </span>
  )
}

function GithubIcon() {
  return (
    <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5a5.4 5.4 0 0 0-1-3.5c.3-1.2.3-2.4 0-3.5 0 0-1 0-3 1.5a12.4 12.4 0 0 0-8 0C6 2 5 2 5 2c-.3 1.1-.3 2.3 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.5.6-.8 1.4-.9 2.2" />
      <path d="M9 18c-4.5 2-5-2-7-2" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const isHome = location.pathname === '/'
  const toolsHref = isHome ? '#tools' : '/#tools'

  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary navigation">
        <Link to="/" className="brand" onClick={close}>
          <Logo />
          <span>Fileora</span>
        </Link>

        <div className="nav-links">
          <a className={isHome ? 'nav-link active' : 'nav-link'} href={toolsHref}>
            All Tools
          </a>
          <a
            className="nav-link"
            href="https://github.com/HRSPROJECT/image-compressor"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
            Open Source
          </a>
          <NavLink className="nav-pill" to="/compress">
            Compress
          </NavLink>
        </div>

        <button
          className="icon-button"
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{ background: 'transparent', color: 'var(--text-primary)', marginLeft: 'auto', marginRight: '0.5rem', padding: '0.5rem' }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button
          className="icon-button mobile-menu-button"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="mobile-drawer">
          <a href={toolsHref} onClick={close}>All Tools</a>
          <NavLink to="/compress" onClick={close}>Image Compressor</NavLink>
          <NavLink to="/resize" onClick={close}>Image Resizer</NavLink>
          <NavLink to="/convert" onClick={close}>Image Converter</NavLink>
          <NavLink to="/image-to-pdf" onClick={close}>Image to PDF</NavLink>
          <NavLink to="/merge-pdf" onClick={close}>Merge PDF</NavLink>
          <a href="https://github.com/HRSPROJECT/image-compressor" target="_blank" rel="noreferrer" onClick={close}>
            GitHub / Open Source
          </a>
        </div>
      )}
    </header>
  )
}
