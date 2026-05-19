import { Link } from 'react-router-dom'

export default function Footer() {
  const links = [
    ['Home', '/'],
    ['All Tools', '/#tools'],
    ['Image Compressor', '/compress'],
    ['Image Resizer', '/resize'],
    ['Image Converter', '/convert'],
    ['Image to PDF', '/image-to-pdf'],
    ['Merge PDF', '/merge-pdf'],
  ]

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link to="/" className="footer-brand">Fileora</Link>
        <nav className="footer-links" aria-label="Footer navigation">
          {links.map(([label, href]) => (
            href.startsWith('/#') ? <a key={href} href={href}>{label}</a> : <Link key={href} to={href}>{label}</Link>
          ))}
        </nav>
        <p>Privacy-first. Files never leave your device.</p>
        <p className="footer-copy">© 2025 Fileora</p>
      </div>
    </footer>
  )
}
