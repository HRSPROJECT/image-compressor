import { jsPDF } from 'jspdf';
import { PDFDocument } from 'pdf-lib';

export const countPdfPages = async (file) => {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  return doc.getPageCount();
};

export const mergePdfFiles = async (files) => {
  const output = await PDFDocument.create();

  for (const file of files) {
    const source = await PDFDocument.load(await file.arrayBuffer());
    const pages = await output.copyPages(source, source.getPageIndices());
    pages.forEach((page) => output.addPage(page));
  }

  const bytes = await output.save();
  return new Blob([bytes], { type: 'application/pdf' });
};

export const imagesToPdf = async (files, { pageSize, orientation, margin }) => {
  const firstFormat = pageSize === 'letter' ? 'letter' : 'a4';
  const pdf = new jsPDF({
    orientation,
    unit: 'pt',
    format: firstFormat,
    compress: true,
  });

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const dataUrl = await readAsDataUrl(file);
    const dimensions = await readImage(dataUrl);

    let pageWidth = pdf.internal.pageSize.getWidth();
    let pageHeight = pdf.internal.pageSize.getHeight();

    if (pageSize === 'fit') {
      pageWidth = dimensions.width + margin * 2;
      pageHeight = dimensions.height + margin * 2;
      if (index === 0) {
        pdf.deletePage(1);
      }
      pdf.addPage([pageWidth, pageHeight], dimensions.width > dimensions.height ? 'landscape' : 'portrait');
    } else if (index > 0) {
      pdf.addPage(firstFormat, orientation);
    }

    const availableWidth = Math.max(1, pageWidth - margin * 2);
    const availableHeight = Math.max(1, pageHeight - margin * 2);
    const ratio = Math.min(availableWidth / dimensions.width, availableHeight / dimensions.height);
    const width = dimensions.width * ratio;
    const height = dimensions.height * ratio;
    const x = (pageWidth - width) / 2;
    const y = (pageHeight - height) / 2;
    const format = file.type.includes('png') ? 'PNG' : file.type.includes('webp') ? 'WEBP' : 'JPEG';

    pdf.addImage(dataUrl, format, x, y, width, height);
  }

  return pdf.output('blob');
};

const readAsDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(new Error('Could not read the image.'));
  reader.readAsDataURL(file);
});

const readImage = (src) => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve({ width: image.naturalWidth || image.width, height: image.naturalHeight || image.height });
  image.onerror = () => reject(new Error('Could not load the image.'));
  image.src = src;
});
