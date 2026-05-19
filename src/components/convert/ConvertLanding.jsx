import DropZone from '../shared/DropZone'

export default function ConvertLanding({ onFiles, error }) {
  return (
    <section className="tool-upload-card">
      <DropZone
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        maxSizeLabel="50MB"
        helpText="Upload JPG, PNG, WebP, AVIF or GIF and export a new image format."
        onFiles={onFiles}
        error={error}
      />
    </section>
  )
}
