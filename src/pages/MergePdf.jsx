import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import HowItWorks from '../components/home/HowItWorks'
import FaqSection from '../components/home/FaqSection'
import MergePdfLanding from '../components/merge-pdf/MergePdfLanding'
import MergePdfWorkspace from '../components/merge-pdf/MergePdfWorkspace'

const faqs = [
  { q: 'How many PDFs can I merge at once?', a: 'No hard limit. Merge as many PDFs as you need.' },
  { q: 'Does merging PDFs reduce quality?', a: 'No. Pages are copied exactly as-is with no quality loss.' },
  { q: 'Can I reorder files before merging?', a: 'Yes. Drag and drop files to set the order.' },
  { q: 'Is there a file size limit?', a: 'Up to 100MB total across all files.' },
  { q: 'Are my PDFs uploaded to a server?', a: 'Never. All merging happens in your browser using pdf-lib.' },
]

export default function MergePdf() {
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) }
  const appSchema = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Fileora PDF Merger', url: 'https://fileora.tech/merge-pdf', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

  return (
    <div className="app-shell">
      <Navbar />
      <Helmet>
        <title>Free PDF Merger Online — Combine PDFs | Fileora</title>
        <meta name="description" content="Merge multiple PDF files into one free. Drag to reorder. Files never leave your browser. No signup." />
        <link rel="canonical" href="https://fileora.tech/merge-pdf" data-rh="true" />
        <meta property="og:title" content="Free PDF Merger Online — Combine PDFs | Fileora" />
        <meta property="og:description" content="Merge multiple PDF files into one free. Drag to reorder. Files never leave your browser. No signup." />
        <meta property="og:url" content="https://fileora.tech/merge-pdf" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://fileora.tech/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <main className="tool-main">
        <section className="tool-hero container">
          <h1>Free PDF Merger — Combine PDFs Online</h1>
          <p>Merge multiple PDF files in your chosen order without uploads or quality loss. Enjoy 100% private, instantaneous client-side stitching.</p>
        </section>
        {files.length ? <MergePdfWorkspace files={files} setFiles={setFiles} onReset={() => setFiles([])} /> : <MergePdfLanding error={error} onFiles={(nextFiles) => {
          const total = nextFiles.reduce((sum, item) => sum + item.size, 0)
          const accepted = nextFiles.filter((next) => next.type === 'application/pdf')
          if (accepted.length < 2 || total > 100 * 1024 * 1024) {
            setError('Please choose at least two PDF files with a combined size up to 100MB.')
            return
          }
          setError('')
          setFiles(accepted)
        }} />}

        <section className="container" style={{ margin: '48px auto', maxWidth: '800px', lineHeight: '1.6' }}>
          <h2>Free PDF Merger — Combine PDF Files Online</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Stitch chapters, receipts, tax logs, and separate PDF files into a single, clean document. 
            Unlike traditional web utilities, Fileora performs direct page-copy streams. It does not compress 
            vector text or degrade embedded high-res assets, so your combined output stays completely sharp.
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            ✓ Exact document copying without data leakage · ✓ Adjust the exact sequence order · ✓ Safe for sensitive documents.
          </p>
        </section>

        <HowItWorks steps={[['Upload PDFs', 'Add two or more PDF files from your device.'], ['Arrange order', 'Move files up or down before merging.'], ['Download merged PDF', 'Save one combined PDF generated locally.']]} />
        <FaqSection faqs={faqs} />

        <section className="related-tools container" style={{ marginTop: '48px', borderTop: '1px solid var(--border-color)', paddingTop: '32px', textAlign: 'center', paddingBottom: '48px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', color: 'var(--text-primary)' }}>Related Tools</h3>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/split-pdf" className="btn btn-secondary" style={{ fontSize: '13px', padding: '8px 16px' }}>Split PDF</a>
            <a href="/compress-pdf" className="btn btn-secondary" style={{ fontSize: '13px', padding: '8px 16px' }}>PDF Compressor</a>
            <a href="/image-to-pdf" className="btn btn-secondary" style={{ fontSize: '13px', padding: '8px 16px' }}>Image to PDF</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
