import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'

// Eagerly load Home and Compress (most visited pages)
import Home from './pages/Home'
import Compress from './pages/Compress'

// Lazily load PDF/image tools to improve page load speed
const Resize = React.lazy(() => import('./pages/Resize'))
const Convert = React.lazy(() => import('./pages/Convert'))
const ImageToPdf = React.lazy(() => import('./pages/ImageToPdf'))
const MergePdf = React.lazy(() => import('./pages/MergePdf'))
const CompressPdf = React.lazy(() => import('./pages/CompressPdf'))
const SplitPdf = React.lazy(() => import('./pages/SplitPdf'))
const UnlockPdf = React.lazy(() => import('./pages/UnlockPdf'))
const ResizePdf = React.lazy(() => import('./pages/ResizePdf'))
const CropPdf = React.lazy(() => import('./pages/CropPdf'))
const PngToPdf = React.lazy(() => import('./pages/PngToPdf'))

const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'var(--bg-primary, #0B0F19)',
    color: 'var(--text-primary, #F3F4F6)',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    gap: '16px'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(110, 231, 183, 0.1)',
      borderTopColor: '#6EE7B7',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
    <span style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.05em', opacity: 0.8 }}>LOADING FILEORA TOOL...</span>
  </div>
)

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/compress" element={<Compress />} />
              <Route path="/resize" element={<Resize />} />
              <Route path="/convert" element={<Convert />} />
              <Route path="/image-to-pdf" element={<ImageToPdf />} />
              <Route path="/merge-pdf" element={<MergePdf />} />
              <Route path="/compress-pdf" element={<CompressPdf />} />
              <Route path="/split-pdf" element={<SplitPdf />} />
              <Route path="/unlock-pdf" element={<UnlockPdf />} />
              <Route path="/resize-pdf" element={<ResizePdf />} />
              <Route path="/crop-pdf" element={<CropPdf />} />
              <Route path="/png-to-pdf" element={<PngToPdf />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  )
}

