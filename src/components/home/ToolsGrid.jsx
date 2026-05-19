import { FileArchive, FileImage, FilePlus2, ImageIcon, Maximize2, Repeat2 } from 'lucide-react'
import ToolCard from '../shared/ToolCard'

const tools = [
  {
    href: '/compress',
    icon: <FileArchive size={25} />,
    title: 'Image Compressor',
    description: 'Shrink JPEG, PNG, WebP and AVIF files with a live comparison view.',
    badge: 'Live',
    formats: 'JPEG · PNG · WebP · AVIF',
  },
  {
    href: '/resize',
    icon: <Maximize2 size={25} />,
    title: 'Image Resizer',
    description: 'Resize photos with presets for WhatsApp, Instagram, passport photos and more.',
    badge: 'Live',
    formats: 'JPG · PNG · WebP',
  },
  {
    href: '/convert',
    icon: <Repeat2 size={25} />,
    title: 'Image Converter',
    description: 'Convert images between JPG, PNG, WebP and AVIF directly in the browser.',
    badge: 'Live',
    formats: 'JPG · PNG · WebP · AVIF',
  },
  {
    href: '/image-to-pdf',
    icon: <FilePlus2 size={25} />,
    title: 'Image to PDF',
    description: 'Combine one or more images into a clean PDF with page and margin controls.',
    badge: 'Live',
    formats: 'JPG · PNG · WebP',
  },
  {
    href: '/merge-pdf',
    icon: <FileImage size={25} />,
    title: 'Merge PDF',
    description: 'Merge PDFs in your chosen order with exact page copying and no upload step.',
    badge: 'Live',
    formats: 'PDF',
  },
  {
    href: '/pdf',
    icon: <ImageIcon size={25} />,
    title: 'PDF Compressor',
    description: 'Reduce PDF file size while keeping readable text and sharp visuals.',
    badge: 'Coming Soon',
    formats: 'PDF',
  },
]

export default function ToolsGrid(props) {
  return (
    <section className="section container" {...props}>
      <div className="section-heading">
        <p className="eyebrow">All tools</p>
        <h2>Everything useful, nothing invasive</h2>
        <p>Each tool runs locally in your browser, so your private files stay on your device.</p>
      </div>
      <div className="tools-grid">
        {tools.map((tool) => <ToolCard key={tool.title} {...tool} />)}
      </div>
    </section>
  )
}
