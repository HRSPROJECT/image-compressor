import DropZone from '../shared/DropZone'

export default function ResizeLanding({ onFiles, error }) {
  return (
    <section className="tool-upload-card">
      <DropZone
        accept="image/jpeg,image/png,image/webp"
        maxSizeLabel="50MB"
        helpText="Upload JPG, PNG or WebP and choose exact dimensions."
        onFiles={onFiles}
        error={error}
      />
    </section>
  )
}
