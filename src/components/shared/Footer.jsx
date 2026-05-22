import { Link } from 'react-router-dom'

export default function Footer() {
  const pdfLinks = [
    ['PDF Compressor', '/compress-pdf'],
    ['Merge PDF', '/merge-pdf'],
    ['Split PDF', '/split-pdf'],
    ['PDF to Word', '/pdf-to-word'],
    ['Word to PDF', '/word-to-pdf'],
    ['Resize PDF', '/resize-pdf'],
    ['Crop PDF', '/crop-pdf'],
    ['Rotate PDF', '/rotate-pdf'],
    ['Add Page Numbers', '/number-pdf'],
    ['Sign PDF', '/sign-pdf'],
    ['Protect PDF', '/protect-pdf'],
    ['Unlock PDF', '/unlock-pdf'],
    ['Watermark PDF', '/watermark-pdf'],
    ['PDF to JPG', '/pdf-to-jpg'],
  ]

  const imageLinks = [
    ['Image Compressor', '/compress'],
    ['Image Resizer', '/resize'],
    ['Image Converter', '/convert'],
    ['HEIC to JPG', '/heic-to-jpg'],
    ['JPG to PDF', '/jpg-to-pdf'],
    ['PNG to PDF', '/png-to-pdf'],
    ['Image to PDF', '/image-to-pdf'],
    ['Passport Photo', '/passport-photo'],
  ]

  const scannerLinks = [
    ['AI Document Scanner', '/scanner'],
  ]

  const alternativeLinks = [
    ['Fileora vs iLovePDF', '/alternative/ilovepdf'],
    ['Fileora vs Smallpdf', '/alternative/smallpdf'],
    ['Fileora vs CamScanner', '/alternative/camscanner'],
  ]

  return (
    <footer className="site-footer" style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary, #0B0F19)', padding: '4rem 0 2rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Links Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/" className="footer-brand" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', textDecoration: 'none' }}>Fileora</Link>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              State-of-the-art privacy-first browser tools. Compress, merge, scan, and convert documents locally without uploads.
            </p>
            <span style={{ fontSize: '0.8rem', color: '#6EE7B7', fontWeight: 600 }}>✓ 100% Client-Side Engine</span>
          </div>

          {/* PDF Column */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem' }}>PDF Utilities</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {pdfLinks.map(([label, href]) => (
                <Link key={href} to={href} className="footer-nav-link" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem' }}>Image Utilities</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {imageLinks.map(([label, href]) => (
                <Link key={href} to={href} className="footer-nav-link" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Scanner & Alternatives Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem' }}>Mobile Scanner</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {scannerLinks.map(([label, href]) => (
                  <Link key={href} to={href} className="footer-nav-link" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, color: '#6EE7B7', transition: 'color 0.2s' }}>{label}</Link>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem' }}>Alternatives</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {alternativeLinks.map(([label, href]) => (
                  <Link key={href} to={href} className="footer-nav-link" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>{label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-tertiary)'
        }}>
          <div>
            <span>© 2026 Fileora · All processing executes locally inside the browser.</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>Privacy Policy</Link>
            <span>·</span>
            <Link to="/" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
      <style>{`
        .footer-nav-link:hover {
          color: #6EE7B7 !important;
        }
      `}</style>
    </footer>
  )
}
