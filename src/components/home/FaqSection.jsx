import { ChevronDown } from 'lucide-react'

export default function FaqSection({ faqs }) {
  return (
    <section className="section container faq-section">
      <div className="section-heading">
        <p className="eyebrow">FAQ</p>
        <h2>Questions people ask before trusting a tool</h2>
      </div>
      <div className="faq-list">
        {faqs.map((item) => (
          <details className="faq-item" key={item.q}>
            <summary>
              <span>{item.q}</span>
              <ChevronDown size={18} />
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
