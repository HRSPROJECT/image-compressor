export const getContainedImageSize = (sourceWidth, sourceHeight, maxWidth, maxHeight) => {
  const ratio = Math.min(maxWidth / sourceWidth, maxHeight / sourceHeight);
  return {
    width: sourceWidth * ratio,
    height: sourceHeight * ratio,
  };
};

export const readImageDimensions = (file) => new Promise((resolve, reject) => {
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    resolve({
      width: image.naturalWidth || image.width,
      height: image.naturalHeight || image.height,
      url,
    });
  };
  image.onerror = () => {
    URL.revokeObjectURL(url);
    reject(new Error('Could not read the image dimensions.'));
  };
  image.src = url;
});
