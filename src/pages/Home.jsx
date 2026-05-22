import { Helmet } from 'react-helmet-async'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import HeroSection from '../components/home/HeroSection'
import TrustBar from '../components/home/TrustBar'
import ToolsGrid from '../components/home/ToolsGrid'
import HowItWorks from '../components/home/HowItWorks'
import FaqSection from '../components/home/FaqSection'

const faqs = [
  { q: 'Are my files safe on Fileora?', a: 'Yes. All processing happens in your browser. Files never leave your device.' },
  { q: 'Is Fileora completely free?', a: 'Yes. No signup, no subscription, no hidden limits. All tools are free forever.' },
  { q: 'Does Fileora work on mobile?', a: 'Yes. Fileora is fully optimised for mobile browsers on Android and iOS.' },
  { q: 'Do I need to install anything?', a: 'No. Everything runs in your browser. No software to install.' },
  { q: 'What file formats does Fileora support?', a: 'JPEG, PNG, WebP, AVIF for images. PDF for document tools. More formats coming soon.' },
]

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fileora',
  url: 'https://fileora.tech',
  logo: 'https://fileora.tech/favicon.svg',
  description: 'Privacy-first, 100% offline browser-based document and image converter utilities suite.',
  knowsAbout: [
    'PDF compression',
    'image optimization',
    'document scanning',
    'privacy-first utilities'
  ]
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Fileora',
  url: 'https://fileora.tech',
  description: 'Free browser-based file tools. Privacy-first, no signup.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://fileora.tech/compress?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Fileora',
  url: 'https://fileora.tech',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '127'
  }
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default function Home() {
  return (
    <div className="app-shell">
      <Helmet>
        <title>Fileora — Free Online File Tools</title>
        <meta name="description" content="Free browser-based file tools. Compress images, resize photos, convert formats, merge PDFs. No signup, files never leave your device." />
        <link rel="canonical" href="https://fileora.tech" />
        <meta property="og:title" content="Fileora — Free Online File Tools" />
        <meta property="og:description" content="Free browser-based file tools. Privacy-first, no signup, no limits." />
        <meta property="og:url" content="https://fileora.tech" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://fileora.tech/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <ToolsGrid id="tools" />
        <HowItWorks />
        <FaqSection faqs={faqs} />
      </main>
      <Footer />
    </div>
  )
}
