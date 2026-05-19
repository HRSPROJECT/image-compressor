import DropZone from '../shared/DropZone'

export default function LandingPage({ onFileSelect, error }) {
  return (
    <section className="tool-upload-card">
      <DropZone
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple
        maxSizeLabel="50MB per image"
        helpText="Compress JPEG, PNG, WebP and AVIF images locally."
        onFiles={onFileSelect}
        error={error}
      />
    </section>
  )
}
