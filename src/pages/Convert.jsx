import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import HowItWorks from '../components/home/HowItWorks'
import FaqSection from '../components/home/FaqSection'
import ConvertLanding from '../components/convert/ConvertLanding'
import ConvertWorkspace from '../components/convert/ConvertWorkspace'

const faqs = [
  { q: 'Which formats can I convert between?', a: 'JPG, PNG, WebP, and AVIF. All combinations supported.' },
  { q: 'Will converting to WebP reduce quality?', a: 'WebP provides similar quality at 25-35% smaller file size than JPG.' },
  { q: 'Can I convert PNG to JPG without background?', a: 'Converting PNG with transparency to JPG will add a white background.' },
  { q: 'Is WebP supported everywhere?', a: 'WebP is supported by all modern browsers including Chrome, Firefox, Safari and Edge.' },
  { q: 'Can I convert multiple images at once?', a: 'Batch conversion is coming soon.' },
]

export default function Convert() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) }
  const appSchema = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Fileora Image Converter', url: 'https://fileora.tech/convert', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

  return (
    <div className="app-shell">
      <Navbar />
      <Helmet>
        <title>Free Image Converter — JPG to PNG WebP AVIF | Fileora</title>
        <meta name="description" content="Convert images between JPG, PNG, WebP and AVIF online for free. Instant browser-based conversion. No signup." />
        <link rel="canonical" href="https://fileora.tech/convert" />
        <meta property="og:title" content="Free Image Converter — JPG to PNG WebP AVIF | Fileora" />
        <meta property="og:description" content="Convert images between JPG, PNG, WebP and AVIF online for free. Instant browser-based conversion. No signup." />
        <meta property="og:url" content="https://fileora.tech/convert" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://fileora.tech/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <main className="tool-main">
        <section className="tool-hero container">
          <h1>Free Image Format Converter Online</h1>
          <p>Convert images between JPG, PNG, WebP and AVIF in seconds with local canvas processing. All file operations happen in your browser.</p>
        </section>
        {file ? <ConvertWorkspace file={file} onReset={() => setFile(null)} /> : <ConvertLanding error={error} onFiles={(files) => {
          const next = files[0]
          const supported = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
          if (!next || !supported.includes(next.type) || next.size > 50 * 1024 * 1024) {
            setError('Please choose a JPG, PNG, WebP, AVIF or GIF image up to 50MB.')
            return
          }
          setError('')
          setFile(next)
        }} />}

        <section className="container" style={{ margin: '48px auto', maxWidth: '800px', lineHeight: '1.6' }}>
          <h2>Supported Formats & Image Conversion Options</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Convert JPG to PNG, PNG to WebP, WebP to AVIF, and other combinations effortlessly. 
            Because this tool utilizes HTML5 canvas rendering directly on your browser, nothing is uploaded to a remote server. 
            Your privacy is fully protected, and conversions take milliseconds instead of minutes.
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            ✓ Zero quality loss when translating lossless formats · ✓ Realtime output adjustments · ✓ Instant local download.
          </p>
        </section>

        <HowItWorks steps={[['Upload an image', 'Choose JPG, PNG, WebP, AVIF or GIF.'], ['Choose output format', 'Set JPG, PNG, WebP or AVIF and adjust quality.'], ['Download converted file', 'Save the converted image with the right extension.']]} />
        <FaqSection faqs={faqs} />

        <section className="related-tools container" style={{ marginTop: '48px', borderTop: '1px solid var(--border-color)', paddingTop: '32px', textAlign: 'center', paddingBottom: '48px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', color: 'var(--text-primary)' }}>Related Tools</h3>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/compress" className="btn btn-secondary" style={{ fontSize: '13px', padding: '8px 16px' }}>Image Compressor</a>
            <a href="/resize" className="btn btn-secondary" style={{ fontSize: '13px', padding: '8px 16px' }}>Image Resizer</a>
            <a href="/image-to-pdf" className="btn btn-secondary" style={{ fontSize: '13px', padding: '8px 16px' }}>Image to PDF</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
