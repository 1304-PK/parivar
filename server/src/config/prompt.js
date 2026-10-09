/**
 * Garment-specific specification blocks for male garments.
 */
const MALE_SPECS = {
  Shirt: `A tailored full-sleeve shirt with a structured collar, shoulder seams, button placket closed up to the second button from the top (the top button open only if a plain white undershirt shows at the neck), cuffs buttoned at the wrists, a curved hem. Worn UNTUCKED unless IMAGE 1 clearly shows a belted tuck-in style, with the hem falling at hip level over the waistband. Sleeves cover the arms down to the wrists. Chest fully covered. Buttons are consistent, evenly spaced and aligned with the placket.`,

  Pant: `Tailored trousers with a waistband, belt loops, a front fly, slant front pockets, a center crease and clean hems. They follow the person's real hip and leg shape with natural fabric breaks at the knees and a slight break over the shoes. The person's existing top and footwear stay unchanged. If the top is tucked, keep it tucked; if it is untucked, its hem stays over the waistband. Do not alter leg length or proportions.`,

  Coat: `A tailored single-breasted coat/blazer with notch lapels lying flat, a structured collar, two to three buttons with the front buttoned at the center, flap pockets, a chest pocket, and back vents. Worn over a plain white dress shirt with a closed collar, with the shirt visible only as a narrow V at the neck and at the cuffs (a hint of shirt cuff beyond the coat sleeves). The shirt covers the entire chest under the coat. Coat shoulders match the person's real shoulder width, with no padded exaggeration. Hem at mid-hip, covering the waistband and belt. Sleeves end at the wrist bone.`,

  Kurta: `A straight-cut kurta with a mandarin (band) collar, a short buttoned placket closed up to the top button, full sleeves ending at the wrists, side slits, and a straight hem. Worn UNTUCKED over the person's existing trousers or legwear. Hem falls mid-thigh to just above the knee, fully covering the waistband and any belt. Never tucked in. Chest fully covered, no open neck. Keep it plain unless IMAGE 2 has a pattern.`,

  Sherwani: `A knee-length structured sherwani with a mandarin collar, a full front closure with buttons closed up to the neck, full sleeves with fitted cuffs, side slits, and a clean hem at the knee. Worn UNTUCKED over the person's existing trousers or churidar. Tailored through the torso in a straight line, with no flaring beyond the person's real width. Chest fully covered. No ornament, embroidery, brooch or border unless IMAGE 2 has it.`,
};

/**
 * Build the final prompt string with gender and clothing type substituted in.
 *
 * @param {{ gender: string, clothingType: string }} params
 * @returns {string}
 */
export function buildPrompt({ gender, clothingType }) {
  // Resolve garment spec — currently only male specs defined
  const spec =
    gender === 'male'
      ? (MALE_SPECS[clothingType] ?? `A standard ${clothingType} appropriate for a ${gender}.`)
      : `A standard ${clothingType} appropriate for a ${gender}.`;

  return `
TASK
This is a photo edit, not a new image. Edit IMAGE 1 so the same ${gender} person is wearing a ${clothingType} sewn from the fabric in IMAGE 2. The result must look like the original photograph was taken with the person already wearing it.

SELECTION
GENDER: ${gender}
GARMENT: ${clothingType}
Generate only this garment, for this gender.

INPUTS
- IMAGE 1: the person photo. This is the base image to edit.
- IMAGE 2: a flat rectangle of raw fabric. It is the material source only, not a finished garment.

KEEP IDENTICAL TO IMAGE 1
Face, facial features, expression, gaze, age, skin tone, hair, facial hair, head position, body shape and proportions, height, pose, posture, hands, fingers, footwear, camera angle, perspective, framing, crop, composition, background, objects, people in the background, lighting, shadows, reflections, color grading, depth of field and photo grain. Do not extend, re-crop or reframe the image. Draw only the parts of the garment that are visible in the photo. If a body part is out of frame, do not invent it.

REPLACE EXISTING CLOTHING
The person's current clothing in the area the new garment covers is fully removed and replaced by the new garment. No part of the old clothing, open collar, neckline or hem may show through. The garment is fitted to the existing body and pose; the body is never reshaped to suit it. Shoulder width, chest, waist and limb size stay exactly as in IMAGE 1. Anything in front of the garment in IMAGE 1 (hair, beard, hands, jewelry, bag straps) stays in front of it.

FABRIC (IMAGE 2)
Reproduce its exact color, shade, weave, texture, sheen and pattern. Scale any pattern realistically to the garment's size, with the pattern running naturally and aligned at seams. Plain fabric stays plain. The rectangular shape must not appear anywhere. Do not add embroidery, borders, trims, prints or ornaments that IMAGE 2 does not have. Only unavoidable inner layers named in the garment spec (e.g. a plain white undershirt) may use another material.

COVERAGE RULE
The garment and its specified inner layer fully cover the chest, stomach and torso. No bare chest, no exposed sternum, no deep V, no open front. Skin appears only at the neck, face, hands, and any lower arms or legs the garment does not cover.

GARMENT SPECIFICATION (${gender} / ${clothingType})
${spec}

REALISM
Real tailored construction: visible seams, stitching, buttons, collar structure, thickness and hem. Folds, creases and tension follow the person's existing pose (bent elbows, shoulders, sitting or standing). Light direction, intensity, color temperature, highlights and shadows match IMAGE 1 exactly, with no added studio lighting. Add soft contact shadows where fabric meets the body and where layers overlap. The fabric should look natural and matte or sheen-accurate to IMAGE 2, with clean edges where it meets skin, hair and background. No halos, glow, outlines, cutout edges, plastic look, flat texture overlay, CGI or painted-on look.

FINAL RESULT
The original photograph with only the new garment added. Same person, same place, same camera, same light.
`.trim();
}
