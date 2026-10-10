import { GoogleGenAI } from '@google/genai';
import { buildPrompt } from '../config/prompt.js';

let ai = null;

function getClient() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables.');
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

/**
 * Generate a virtual try-on image via Google AI.
 *
 * @param {Object} params
 * @param {Buffer} params.personImage  - person photo buffer
 * @param {string} params.personMime   - MIME type of person image
 * @param {Buffer} params.dressImage   - clothing photo buffer
 * @param {string} params.dressMime    - MIME type of dress image
 * @param {string} params.gender
 * @param {string} params.clothingType
 * @param {string} [params.style]      - specific style, e.g. for Saree
 * @returns {Promise<{ image: string, mimeType: string }>}
 */
export async function generateTryOnImage({
  personImage,
  personMime,
  dressImage,
  dressMime,
  gender,
  clothingType,
  style,
}) {
  const client = getClient();
  const prompt = buildPrompt({ gender, clothingType, style });

  const personPart = {
    inlineData: {
      data: personImage.toString('base64'),
      mimeType: personMime,
    },
  };

  const dressPart = {
    inlineData: {
      data: dressImage.toString('base64'),
      mimeType: dressMime,
    },
  };

  const response = await client.models.generateContent({
    model: 'gemini-3.1-flash-image',
    contents: [
      {
        role: 'user',
        parts: [
          { text: prompt },
          personPart,
          dressPart,
        ],
      },
    ],
    config: {
      responseModalities: ['TEXT', 'IMAGE'],
    },
  });

  // Extract image from response
  const parts = response?.candidates?.[0]?.content?.parts;
  if (!parts || parts.length === 0) {
    throw new Error('No content returned from Google AI.');
  }

  const imagePart = parts.find((p) => p.inlineData);
  if (!imagePart) {
    throw new Error('No image returned from Google AI.');
  }

  return {
    image: imagePart.inlineData.data,
    mimeType: imagePart.inlineData.mimeType || 'image/png',
  };
}

/**
 * Mock generation for development when no API key is available.
 * Returns a 1×1 transparent PNG so the client can render something.
 */
export async function generateMockImage() {
  // Tiny 1×1 lavender PNG (placeholder)
  const tinyPng =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPk' +
    '+89QDwADvgGOSHzRgAAAAABJRU5ErkJggg==';

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    image: tinyPng,
    mimeType: 'image/png',
  };
}
