import imageCompression from 'browser-image-compression';

const API_BASE = '/api/try-on';

/**
 * Helper to compress an image file to < 1.3 MB
 * @param {File} file 
 * @returns {Promise<File>}
 */
export async function compressImage(file) {
  const options = {
    maxSizeMB: 1.25, // Target less than 1.3 MB
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.88,
    fileType: 'image/webp' // WebP offers better compression
  };
  try {
    const compressedFile = await imageCompression(file, options);
    console.log(`Compressed ${file.name} from ${(file.size / 1024 / 1024).toFixed(2)} MB to ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
    return compressedFile;
  } catch (error) {
    console.error(`Error compressing ${file.name}:`, error);
    return file; // Fallback to original file on error
  }
}

/**
 * Send try-on generation request to the backend.
 *
 * @param {{ personImage: File, dressImage: File, gender: string, clothingType: string }} params
 * @returns {Promise<{ success: boolean, data?: { image: string, mimeType: string, mock: boolean }, error?: string }>}
 */
export async function generateTryOn({ personImage, dressImage, gender, clothingType }) {
  let compressedPersonImage = personImage;
  let compressedDressImage = dressImage;

  try {
    compressedPersonImage = await compressImage(personImage);
    compressedDressImage = await compressImage(dressImage);
  } catch (err) {
    console.warn("Failed to compress images, proceeding with original files.", err);
  }

  const formData = new FormData();
  formData.append('personImage', compressedPersonImage);
  formData.append('dressImage', compressedDressImage);
  formData.append('gender', gender);
  formData.append('clothingType', clothingType);

  const res = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    body: formData,
  });

  let json;
  try {
    json = await res.json();
  } catch (err) {
    throw new Error('Server returned an invalid response. Ensure the backend is running.');
  }

  if (!res.ok || !json.success) {
    console.error('[Server Error Response]:', json.error || json);
    throw new Error(json.error || 'Something went wrong. Please try again.');
  }

  return json;
}
