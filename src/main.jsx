import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Clean up statically prerendered head tags to prevent React 19 client-side duplication
if (typeof document !== 'undefined') {
  const selectors = [
    'head title',
    'head link[rel="canonical"]',
    'head meta[name="description"]',
    'head meta[property^="og:"]',
    'head meta[name^="twitter:"]'
  ]
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.remove())
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
