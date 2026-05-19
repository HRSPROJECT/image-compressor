import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import HowItWorks from '../components/home/HowItWorks'
import FaqSection from '../components/home/FaqSection'
import LandingPage from '../components/compress/LandingPage'
import Workspace from '../components/compress/Workspace'

const faqs = [
  { q: 'How much can I compress an image?', a: 'Up to 90% size reduction depending on format and quality settings.' },
  { q: 'Will compression reduce image quality?', a: 'Our smart compression minimizes visible quality loss. Use the comparison slider to see the difference.' },
  { q: 'Can I compress images for WhatsApp?', a: 'Yes. Compress below 1MB for best WhatsApp quality.' },
  { q: 'What formats are supported?', a: 'JPEG, PNG, WebP, and AVIF up to 50MB.' },
  { q: 'Is there a limit on how many images I can compress?', a: 'No limits. Compress as many as you want, completely free.' },
]

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fileora Image Compressor',
  url: 'https://fileora.tech/compress',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
}

export default function Compress() {
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')

  const addFiles = (newFiles) => {
    const accepted = newFiles.filter((file) => file.type.startsWith('image/') && file.size <= 50 * 1024 * 1024)
    setError(accepted.length ? '' : 'Please choose JPEG, PNG, WebP or AVIF images up to 50MB each.')
    setFiles((current) => [...current, ...accepted])
  }

  return (
    <div className="app-shell">
      <Navbar />
      <Helmet>
        <title>Free Image Compressor Online — JPEG, PNG, WebP, AVIF | Fileora</title>
        <meta name="description" content="Compress images online for free. Reduce file size without losing quality. Supports JPEG, PNG, WebP, AVIF up to 50MB. Browser-based, no signup." />
        <link rel="canonical" href="https://fileora.tech/compress" />
        <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <main className="tool-main">
        <section className="tool-hero container">
          <h1>Free Image Compressor Online</h1>
          <p>Compress JPEG, PNG, WebP and AVIF images locally with quality controls and a before-after preview.</p>
        </section>
        {files.length > 0 ? <Workspace files={files} setFiles={setFiles} onReset={() => setFiles([])} /> : <LandingPage onFileSelect={addFiles} error={error} />}
        <HowItWorks steps={[
          ['Drop your images', 'Upload one image or a batch of images up to 50MB each.'],
          ['Tune quality and format', 'Choose WebP, JPEG or PNG and preview the result instantly.'],
          ['Download compressed files', 'Save each optimized image without anything leaving your device.'],
        ]} />
        <FaqSection faqs={faqs} />
      </main>
      <Footer />
    </div>
  )
}
