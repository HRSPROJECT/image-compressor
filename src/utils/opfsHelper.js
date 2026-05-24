/**
 * Origin Private File System (OPFS) Storage Helper
 * Provides high-speed, client-side sandbox disk storage to prevent browser memory (RAM) exhaustion
 * when processing large file streams like videos (100MB - 1GB+).
 */

export const isOpfsSupported = () => {
  return typeof navigator !== 'undefined' && 'storage' in navigator && typeof navigator.storage.getDirectory === 'function';
};

/**
 * Saves a File or Blob directly to the browser's sandbox disk space
 * @param {string} fileName 
 * @param {Blob|File} blobOrFile 
 * @returns {Promise<FileSystemFileHandle>}
 */
export const saveToOPFS = async (fileName, blobOrFile) => {
  if (!isOpfsSupported()) {
    throw new Error('OPFS storage is not supported in this browser.');
  }
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(blobOrFile);
  await writable.close();
  return fileHandle;
};

/**
 * Retrieves a File object from the sandboxed disk space
 * @param {string} fileName 
 * @returns {Promise<File>}
 */
export const getFromOPFS = async (fileName) => {
  if (!isOpfsSupported()) {
    throw new Error('OPFS storage is not supported in this browser.');
  }
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle(fileName);
  return await fileHandle.getFile();
};

/**
 * Deletes a specific file from the sandboxed disk space
 * @param {string} fileName 
 * @returns {Promise<void>}
 */
export const deleteFromOPFS = async (fileName) => {
  if (!isOpfsSupported()) return;
  try {
    const root = await navigator.storage.getDirectory();
    await root.removeEntry(fileName);
  } catch (err) {
    console.warn(`OPFS: Failed to delete file ${fileName}:`, err);
  }
};

/**
 * Clears the entire Origin Private File System directory for this app session
 * @returns {Promise<void>}
 */
export const clearOPFSSandbox = async () => {
  if (!isOpfsSupported()) return;
  try {
    const root = await navigator.storage.getDirectory();
    for await (const name of root.keys()) {
      await root.removeEntry(name);
    }
    console.log('OPFS sandbox cleared successfully.');
  } catch (err) {
    console.error('OPFS: Failed to clear storage sandbox:', err);
  }
};
