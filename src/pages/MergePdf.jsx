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
        <link rel="canonical" href="https://fileora.tech/merge-pdf" />
        <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <main className="tool-main">
        <section className="tool-hero container"><h1>Free PDF Merger — Combine PDFs Online</h1><p>Merge multiple PDF files in your chosen order without uploads or quality loss.</p></section>
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
        <HowItWorks steps={[['Upload PDFs', 'Add two or more PDF files from your device.'], ['Arrange order', 'Move files up or down before merging.'], ['Download merged PDF', 'Save one combined PDF generated locally.']]} />
        <FaqSection faqs={faqs} />
      </main>
      <Footer />
    </div>
  )
}
