import DropZone from '../shared/DropZone'

export default function MergePdfLanding({ onFiles, error }) {
  return (
    <section className="tool-upload-card">
      <DropZone
        accept="application/pdf"
        multiple
        maxSizeLabel="100MB total"
        helpText="Upload multiple PDF files and set the merge order."
        onFiles={onFiles}
        error={error}
      />
    </section>
  )
}
