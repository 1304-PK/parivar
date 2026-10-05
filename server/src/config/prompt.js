/**
 * Placeholder prompt for virtual try-on.
 * The final production prompt will be provided later — replace ONLY this constant.
 */

export const TRY_ON_PROMPT = `
Create a realistic virtual try-on image.

Use the provided person image as the identity/reference image.
Use the provided clothing image as the clothing reference.

Gender: {gender}
Clothing type: {clothingType}

Generate a realistic image of the person wearing the provided clothing.

Preserve the person's identity, facial features, body proportions, and realistic appearance.
Make the clothing naturally fit the person with realistic fabric, folds, lighting, shadows, and texture.

This is a temporary placeholder prompt. The final production prompt will be provided later.
`.trim();

/**
 * Build the final prompt string with actual values.
 */
export function buildPrompt({ gender, clothingType }) {
  return TRY_ON_PROMPT
    .replace('{gender}', gender)
    .replace('{clothingType}', clothingType);
}
