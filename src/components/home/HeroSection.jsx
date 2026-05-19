import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container hero-inner">
        <p className="eyebrow">Fileora for file work that stays yours</p>
        <h1>Your privacy-first file toolkit</h1>
        <p className="hero-copy">
          Professional-grade tools that run entirely in your browser. No signup, no uploads, no limits.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/compress">
            Compress Image <ArrowRight size={18} />
          </Link>
          <a className="btn btn-secondary" href="#tools">
            View All Tools <ChevronDown size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
