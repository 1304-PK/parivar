const API_BASE = '/api/try-on';

/**
 * Send try-on generation request to the backend.
 *
 * @param {{ personImage: File, dressImage: File, gender: string, clothingType: string }} params
 * @returns {Promise<{ success: boolean, data?: { image: string, mimeType: string, mock: boolean }, error?: string }>}
 */
export async function generateTryOn({ personImage, dressImage, gender, clothingType }) {
  const formData = new FormData();
  formData.append('personImage', personImage);
  formData.append('dressImage', dressImage);
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
    throw new Error(json.error || 'Something went wrong. Please try again.');
  }

  return json;
}
