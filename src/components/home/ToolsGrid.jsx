import { FileArchive, FileImage, FilePlus2, ImageIcon, Maximize2, Repeat2, FileDown, Scissors, FileLock, Scale, Crop, FileText, ArrowLeftRight, FileSpreadsheet, Contact } from 'lucide-react'
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
    href: '/png-to-pdf',
    icon: <ImageIcon size={25} />,
    title: 'PNG to PDF',
    description: 'Convert PNG images to PDF online for free in your browser.',
    badge: 'Live',
    formats: 'PNG',
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
    href: '/compress-pdf',
    icon: <FileDown size={25} />,
    title: 'PDF Compressor',
    description: 'Reduce PDF file size to 100KB, 200KB or 500KB in your browser.',
    badge: 'Live',
    formats: 'PDF',
  },
  {
    href: '/split-pdf',
    icon: <Scissors size={25} />,
    title: 'Split PDF',
    description: 'Split PDF pages by range, extract specific pages, or remove pages.',
    badge: 'Live',
    formats: 'PDF',
  },
  {
    href: '/unlock-pdf',
    icon: <FileLock size={25} />,
    title: 'Unlock PDF',
    description: 'Remove password and protection from your PDF files online.',
    badge: 'Live',
    formats: 'PDF',
  },
  {
    href: '/resize-pdf',
    icon: <Scale size={25} />,
    title: 'Resize PDF',
    description: 'Change PDF page size to A4, Letter, A3 and more instantly.',
    badge: 'Live',
    formats: 'PDF',
  },
  {
    href: '/crop-pdf',
    icon: <Crop size={25} />,
    title: 'Crop PDF',
    description: 'Crop margins and define custom boundaries on PDF pages.',
    badge: 'Live',
    formats: 'PDF',
  },
  {
    href: '/pdf-to-word',
    icon: <FileText size={25} />,
    title: 'PDF to Word',
    description: 'Convert PDF files to editable Word documents.',
    badge: 'Coming Soon',
    formats: 'PDF → DOCX',
  },
  {
    href: '/word-to-pdf',
    icon: <FileText size={25} />,
    title: 'Word to PDF',
    description: 'Convert Word DOCX files to clean PDF files.',
    badge: 'Coming Soon',
    formats: 'DOCX → PDF',
  },
  {
    href: '/excel-to-pdf',
    icon: <FileSpreadsheet size={25} />,
    title: 'Excel to PDF',
    description: 'Convert Excel spreadsheets directly to print-ready PDF.',
    badge: 'Coming Soon',
    formats: 'XLSX → PDF',
  },
  {
    href: '/pdf-to-jpg',
    icon: <ArrowLeftRight size={25} />,
    title: 'PDF to JPG',
    description: 'Extract pages or images from PDF as JPEG formats.',
    badge: 'Coming Soon',
    formats: 'PDF → JPG',
  },
  {
    href: '/passport-photo',
    icon: <Contact size={25} />,
    title: 'Passport Photo',
    description: 'Crop and scale photos to standard passport size templates.',
    badge: 'Coming Soon',
    formats: 'JPG · PNG',
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

