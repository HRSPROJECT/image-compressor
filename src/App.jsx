import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import Compress from './pages/Compress'
import Resize from './pages/Resize'
import Convert from './pages/Convert'
import ImageToPdf from './pages/ImageToPdf'
import MergePdf from './pages/MergePdf'

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compress" element={<Compress />} />
            <Route path="/resize" element={<Resize />} />
            <Route path="/convert" element={<Convert />} />
            <Route path="/image-to-pdf" element={<ImageToPdf />} />
            <Route path="/merge-pdf" element={<MergePdf />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  )
}
