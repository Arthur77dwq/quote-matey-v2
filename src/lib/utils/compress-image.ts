import imageCompression from 'browser-image-compression';

export async function compressImage(file: File) {
  const compressedFile = await imageCompression(file, {
    maxWidthOrHeight: 1024,
    initialQuality: 0.7,
    fileType: 'image/jpeg',
    useWebWorker: true,
  });

  return compressedFile;
}
