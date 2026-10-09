import { VALID_GENDERS, isValidClothingType } from '../config/clothingOptions.js';
import { ALLOWED_MIME_TYPES } from '../config/upload.js';
import { generateTryOnImage, generateMockImage } from '../services/googleAiService.js';

/**
 * POST /api/try-on/generate
 *
 * Expects multipart/form-data with:
 *   - personImage (file)
 *   - dressImage  (file)
 *   - gender      (text)
 *   - clothingType (text)
 */
export async function generate(req, res) {
  try {
    // --- Extract files --------------------------------------------------
    const personFile = req.files?.personImage?.[0];
    const dressFile = req.files?.dressImage?.[0];

    if (!personFile) {
      return res.status(400).json({ success: false, error: 'Person image is required.' });
    }
    if (!dressFile) {
      return res.status(400).json({ success: false, error: 'Dress image is required.' });
    }

    // --- Validate MIME types (defence-in-depth, multer also checks) -----
    if (!ALLOWED_MIME_TYPES.includes(personFile.mimetype)) {
      return res.status(400).json({ success: false, error: 'Person image must be JPG, PNG, or WebP.' });
    }
    if (!ALLOWED_MIME_TYPES.includes(dressFile.mimetype)) {
      return res.status(400).json({ success: false, error: 'Dress image must be JPG, PNG, or WebP.' });
    }

    // --- Validate text fields -------------------------------------------
    const { gender, clothingType } = req.body;

    if (!gender || !VALID_GENDERS.includes(gender)) {
      return res.status(400).json({ success: false, error: 'A valid gender selection is required.' });
    }
    if (!clothingType || !isValidClothingType(gender, clothingType)) {
      return res.status(400).json({ success: false, error: 'A valid clothing type is required.' });
    }

    // --- Call Google AI (Gemini) or mock ------------------------------------------
    const useMock = !process.env.GEMINI_API_KEY;
    const result = useMock
      ? await generateMockImage()
      : await generateTryOnImage({
          personImage: personFile.buffer,
          personMime: personFile.mimetype,
          dressImage: dressFile.buffer,
          dressMime: dressFile.mimetype,
          gender,
          clothingType,
        });

    return res.status(200).json({
      success: true,
      data: {
        image: result.image,
        mimeType: result.mimeType,
        mock: useMock,
      },
    });
  } catch (err) {
    console.error('[TryOnController] Generation error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Unable to generate the image. Please try again.',
    });
  }
}
