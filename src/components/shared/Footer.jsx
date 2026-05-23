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
    <footer className="site-footer footer-shell">
      <div className="container footer-inner-container">
        {/* Links Grid */}
        <div className="footer-links-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand footer-brand-title">Fileora</Link>
            <p className="footer-brand-desc">
              State-of-the-art privacy-first browser tools. Compress, merge, scan, and convert documents locally without uploads.
            </p>
            <span className="footer-brand-check">✓ 100% Client-Side Engine</span>
          </div>

          {/* PDF Column */}
          <div>
            <h4 className="footer-col-title">PDF Utilities</h4>
            <div className="footer-col-links">
              {pdfLinks.map(([label, href]) => (
                <Link key={href} to={href} className="footer-nav-link footer-nav-link-base">{label}</Link>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div>
            <h4 className="footer-col-title">Image Utilities</h4>
            <div className="footer-col-links">
              {imageLinks.map(([label, href]) => (
                <Link key={href} to={href} className="footer-nav-link footer-nav-link-base">{label}</Link>
              ))}
            </div>
          </div>

          {/* Scanner & Alternatives Column */}
          <div className="footer-col-scanner-alt">
            <div>
              <h4 className="footer-col-title">Mobile Scanner</h4>
              <div className="footer-col-links">
                {scannerLinks.map(([label, href]) => (
                  <Link key={href} to={href} className="footer-nav-link footer-nav-link-highlight">{label}</Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="footer-col-title">Alternatives</h4>
              <div className="footer-col-links">
                {alternativeLinks.map(([label, href]) => (
                  <Link key={href} to={href} className="footer-nav-link footer-nav-link-base">{label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            <span>© 2026 Fileora · All processing executes locally inside the browser.</span>
          </div>
          <div className="footer-bottom-links">
            <Link to="/" className="footer-bottom-link-item">Privacy Policy</Link>
            <span>·</span>
            <Link to="/" className="footer-bottom-link-item">Terms of Service</Link>
          </div>
        </div>
      </div>
      <style>{`
        .footer-shell {
          border-top: 1px solid var(--border-color);
          background: var(--bg-secondary, #0B0F19);
          padding: 4rem 0 2rem 0;
        }
        .footer-inner-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2.5rem;
          margin-bottom: 3rem;
        }
        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .footer-brand-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          text-decoration: none;
        }
        .footer-brand-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .footer-brand-check {
          font-size: 0.8rem;
          color: #6EE7B7;
          font-weight: 600;
        }
        .footer-col-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.2rem;
        }
        .footer-col-links {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer-nav-link-base {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-nav-link-highlight {
          font-size: 0.85rem;
          color: #6EE7B7 !important;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }
        .footer-col-scanner-alt {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .footer-bottom-bar {
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }
        .footer-bottom-links {
          display: flex;
          gap: 1rem;
        }
        .footer-bottom-link-item {
          color: var(--text-tertiary);
          text-decoration: none;
        }
        .footer-nav-link:hover {
          color: #6EE7B7 !important;
        }
      `}</style>
    </footer>
  )
}
