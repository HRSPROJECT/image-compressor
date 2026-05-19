import DropZone from '../shared/DropZone'

export default function ImageToPdfLanding({ onFiles, error }) {
  return (
    <section className="tool-upload-card">
      <DropZone
        accept="image/jpeg,image/png,image/webp"
        multiple
        maxSizeLabel="50MB per image"
        helpText="Upload multiple images and combine them into one PDF."
        onFiles={onFiles}
        error={error}
      />
    </section>
  )
}
