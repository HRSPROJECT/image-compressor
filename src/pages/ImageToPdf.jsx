import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import HowItWorks from '../components/home/HowItWorks'
import FaqSection from '../components/home/FaqSection'
import ImageToPdfLanding from '../components/image-to-pdf/ImageToPdfLanding'
import ImageToPdfWorkspace from '../components/image-to-pdf/ImageToPdfWorkspace'

const faqs = [
  { q: 'Can I combine multiple images into one PDF?', a: 'Yes. Upload multiple images and they will be combined into a single PDF in your chosen order.' },
  { q: 'What image formats can I convert to PDF?', a: 'JPG, JPEG, PNG, and WebP.' },
  { q: 'Can I choose the PDF page size?', a: 'Yes. Choose A4, Letter, or fit page to image size.' },
  { q: 'Is the PDF quality good?', a: 'Yes. Images are embedded at full resolution in the PDF.' },
  { q: 'Can I reorder images before converting?', a: 'Yes. Drag and drop to reorder before generating the PDF.' },
]

export default function ImageToPdf() {
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) }
  const appSchema = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Fileora Image to PDF Converter', url: 'https://fileora.tech/image-to-pdf', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

  return (
    <div className="app-shell">
      <Navbar />
      <Helmet>
        <title>Free Image to PDF Converter Online — JPG, PNG to PDF | Fileora</title>
        <meta name="description" content="Convert JPG, PNG and WebP images to PDF online for free. Multiple images to one PDF. Browser-based, no signup." />
        <link rel="canonical" href="https://fileora.tech/image-to-pdf" />
        <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <main className="tool-main">
        <section className="tool-hero container"><h1>Free Image to PDF Converter Online</h1><p>Turn JPG, PNG and WebP images into a single PDF with page size and margin controls.</p></section>
        {files.length ? <ImageToPdfWorkspace files={files} setFiles={setFiles} onReset={() => setFiles([])} /> : <ImageToPdfLanding error={error} onFiles={(nextFiles) => {
          const supported = ['image/jpeg', 'image/png', 'image/webp']
          const accepted = nextFiles.filter((next) => supported.includes(next.type) && next.size <= 50 * 1024 * 1024)
          if (!accepted.length) {
            setError('Please choose JPG, PNG or WebP images up to 50MB each.')
            return
          }
          setError('')
          setFiles(accepted)
        }} />}
        <HowItWorks steps={[['Upload images', 'Add one or more JPG, PNG or WebP files.'], ['Set PDF layout', 'Choose page size, orientation, margins and order.'], ['Generate PDF', 'Download one PDF created in your browser.']]} />
        <FaqSection faqs={faqs} />
      </main>
      <Footer />
    </div>
  )
}
