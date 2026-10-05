/**
 * Final high-fidelity prompt for virtual try-on.
 */

export const TRY_ON_PROMPT = `You are performing a **high-fidelity image editing task**, not generating a new person or a new scene.

You have two input images:

- **IMAGE 1 — PERSON:** A photograph of the person who must remain unchanged.
- **IMAGE 2 — RAW FABRIC:** A plain rectangular piece of fabric that must be used as the exact material for the new garment.

The selected gender is:

**[GENDER: {gender}]**

The selected garment is:

**[GARMENT: {clothingType}]**

Your task is to edit IMAGE 1 so that the **exact same person** is wearing the selected garment, constructed from the raw fabric shown in IMAGE 2.

---

# HIGHEST PRIORITY: PRESERVE THE ORIGINAL PHOTO

IMAGE 1 is the immutable photographic foundation.

**Do not regenerate the person.**

**Do not create a similar-looking person.**

**Do not create a new photograph.**

**Edit the existing photograph.**

Preserve the following from IMAGE 1 exactly and change only what is necessary to add the selected garment:

- identity
- face
- facial features
- facial proportions
- skin tone
- hairstyle
- hair
- beard and moustache
- facial expression
- eyes and gaze
- head position
- body structure
- body proportions
- height
- shoulders
- chest
- waist
- arms
- hands
- legs
- pose
- posture
- position of the person
- camera angle
- camera perspective
- focal perspective
- framing
- crop
- composition
- background
- scenery
- environment
- objects
- lighting
- shadows
- reflections
- color balance
- depth of field
- photographic characteristics

The final image should look as though **the original photograph was captured with the person already wearing the selected garment**.

---

# PERSON AND BODY ARE LOCKED

Treat the person's existing anatomy as completely fixed.

The garment must conform to the existing body.

**Never modify the body to make the garment fit.**

Do not:

- make the person taller
- make the person shorter
- make the person thinner
- make the person heavier
- change shoulder width
- change chest size
- change waist size
- change hip size
- change arm size
- change leg size
- change body proportions
- change posture
- change pose
- reposition limbs
- modify hands
- modify the face
- beautify the person
- make the person more muscular
- make the person slimmer
- make the person look like a model

The existing body geometry is the authoritative geometry.

**Construct the clothing around the existing body, not the body around the clothing.**

---

# BACKGROUND AND SCENE ARE LOCKED

Do not modify the environment in any way.

Preserve exactly:

- background
- scenery
- architecture
- furniture
- objects
- landscape
- walls
- floor
- background people
- environmental shadows
- reflections
- perspective
- depth
- atmosphere

Do not replace, regenerate, extend, enhance, blur, crop, or redesign the background.

Do not change the camera position.

Do not change the camera perspective.

Do not change the composition.

The only meaningful modification should be the selected garment.

---

# RAW FABRIC — IMAGE 2

IMAGE 2 is the **raw material source**.

It is a plain rectangular piece of fabric, NOT a finished garment.

Use the fabric from IMAGE 2 to construct the selected garment.

Preserve the exact:

- color
- hue
- pattern
- texture
- weave
- surface
- material appearance
- finish
- visual characteristics

Do not substitute another material.

Do not invent another fabric.

Do not change the fabric color.

Do not add an unrelated pattern.

Do not use a generic clothing texture.

The rectangular shape itself should disappear naturally because the material is being cut, shaped, stitched, and tailored into the selected garment.

The final garment should look like it was **physically manufactured from the exact fabric shown in IMAGE 2**.

---

# GARMENT SELECTION

Generate ONLY the garment corresponding to the selected option.

There are six possible garment options.

---

## MALE GARMENTS

Available male options:

1. **Shirt**
2. **Pant**
3. **Coat**
4. **Sherwani**

If:

**GENDER = Male**

then generate the garment specified by:

**GARMENT = Shirt / Pant / Coat / Sherwani**

Do not generate female garments.

---

## FEMALE GARMENTS

Available female options:

1. **Saree**
2. **Lehenga**

If:

**GENDER = Female**

then generate the garment specified by:

**GARMENT = Saree / Lehenga**

Do not generate male garments.

---

# MALE — SHIRT

If the selected garment is **Shirt**:

Create a realistic, professionally tailored shirt using the exact fabric from IMAGE 2.

Construct:

- shirt collar
- neckline
- shoulder seams
- front panels
- button placket
- realistic buttons
- sleeves
- cuffs
- side seams
- bottom hem
- natural fabric folds
- realistic stitching

The shirt must follow the person's existing torso, shoulders, arms, and pose.

Do not change the person's body.

The fabric must naturally drape and fold according to the existing body and pose.

The shirt should look physically manufactured rather than digitally painted onto the body.

---

# MALE — PANT

If the selected garment is **Pant**:

Create realistic, professionally tailored trousers using the exact fabric from IMAGE 2.

Construct:

- waistband
- belt loops where appropriate
- front panels
- pockets
- seams
- zipper/front closure where appropriate
- trouser legs
- hems
- natural folds
- realistic creases

The trousers must follow the person's existing waist, hips, legs, and pose.

Do not modify the person's leg or body proportions.

The fabric must naturally fold and compress according to the existing posture.

---

# MALE — COAT

If the selected garment is **Coat**:

Create a realistic, professionally tailored coat using the exact fabric from IMAGE 2.

Construct:

- structured but anatomically appropriate shoulders
- collar
- lapels where appropriate
- front panels
- buttons
- sleeves
- cuffs
- pockets
- seams
- hem
- realistic folds
- natural draping

The coat must conform to the existing body.

Do not make the shoulders larger or change the person's body shape.

The garment must look like a real professionally constructed coat.

---

# MALE — SHERWANI

If the selected garment is **Sherwani**:

Create a realistic, traditionally structured **Sherwani** using the exact fabric from IMAGE 2.

The Sherwani should have:

- long structured silhouette
- appropriate neckline/collar
- realistic front closure
- buttons appropriate to a Sherwani
- long sleeves
- cuffs
- side seams
- natural hem
- realistic tailoring
- natural folds
- believable fabric draping

Keep the design elegant and realistic.

Do not add excessive embroidery, patterns, ornaments, or decorative elements unless they are naturally present in IMAGE 2.

If IMAGE 2 is plain fabric, the Sherwani should remain visually consistent with that plain fabric.

The Sherwani must conform to the person's existing body and pose without changing either.

---

# FEMALE — SAREE

If the selected garment is **Saree**:

Create a realistic, traditionally draped **saree** using the exact fabric from IMAGE 2.

The saree must be constructed from the provided fabric and realistically draped around the woman's existing body.

Preserve the exact body, pose, and anatomy.

Create realistic:

- saree draping
- pleats
- folds
- fabric overlap
- waist wrapping
- pallu
- natural fabric tension
- realistic fabric weight
- realistic draping behavior

The saree should follow the person's existing pose.

Do not change the woman's body to accommodate the saree.

Do not invent an unrelated blouse color or fabric.

If a blouse is necessary for the selected appearance, use the same provided fabric or a visually consistent portion of the provided material.

The saree should look physically worn rather than digitally pasted onto the body.

---

# FEMALE — LEHENGA

If the selected garment is **Lehenga**:

Create a realistic traditional **lehenga outfit** using the exact fabric from IMAGE 2.

Construct a believable:

- lehenga skirt
- blouse/choli
- dupatta where appropriate

Use the provided fabric consistently across the outfit.

Create realistic:

- waistband
- skirt volume
- pleats
- folds
- seams
- blouse construction
- sleeves where appropriate
- neckline
- dupatta draping
- natural fabric movement

Do not change the woman's body proportions.

Do not make the skirt artificially change her body shape.

The outfit must conform to the existing anatomy and pose.

If IMAGE 2 is plain fabric, keep the outfit visually plain and do not invent elaborate embroidery or patterns.

---

# FABRIC PHYSICS

The selected garment must behave like real physical fabric.

Generate realistic:

- folds
- creases
- draping
- tension
- compression
- stretching
- seams
- stitching
- thickness
- overlap
- wrinkles
- contact shadows

Fabric behavior must respond to the person's existing:

- shoulders
- chest
- torso
- waist
- hips
- arms
- elbows
- legs
- knees
- posture
- pose

**Do not change the person's pose to make the clothing look better.**

Instead, make the clothing adapt to the existing pose.

---

# LIGHTING MUST MATCH IMAGE 1

Analyze the lighting in IMAGE 1 and apply exactly the same lighting conditions to the newly created garment.

Preserve:

- light direction
- light intensity
- color temperature
- highlights
- shadows
- ambient light
- reflected light
- contrast

The garment must look like it was physically present when IMAGE 1 was photographed.

Do not introduce studio lighting.

Do not alter the scene's lighting.

Only the newly created clothing should respond to the existing lighting.

---

# REALISTIC SHADOWS

Create physically believable shadows on the new garment.

The garment should naturally:

- receive light
- cast shadows
- create contact shadows
- overlap itself
- interact with the person's body

Maintain consistency with the existing environment.

Do not create:

- halos
- glowing edges
- artificial outlines
- cutout effects

---

# IDENTITY PRESERVATION

The person's face is immutable.

Do not regenerate or redraw the face.

Do not modify:

- eyes
- eyebrows
- nose
- mouth
- ears
- jaw
- cheeks
- forehead
- facial hair
- skin texture
- facial expression
- gaze

Do not beautify.

Do not retouch.

Do not change age.

Do not change ethnicity or appearance.

The person must remain unmistakably the same person from IMAGE 1.

---

# PHOTOGRAPHIC REALISM

The final image must look like an authentic photograph.

The new garment must have:

- realistic material response
- realistic fabric texture
- realistic folds
- realistic stitching
- realistic shadows
- realistic depth
- realistic occlusion
- realistic interaction with light

Avoid:

- plastic-looking fabric
- painted-on clothing
- flat texture overlays
- CGI appearance
- cartoon appearance
- artificial outlines
- excessive sharpness
- fake fabric
- distorted anatomy
- AI-looking facial features

Preserve the original photographic quality of IMAGE 1.

---

# STRICT NEGATIVE INSTRUCTIONS

Do NOT:

- generate a new person
- generate a similar person
- change identity
- change face
- change body
- change body proportions
- change pose
- change posture
- change hands
- change limbs
- change skin
- change hair
- change facial expression
- change background
- change scenery
- change environment
- change camera angle
- change perspective
- change framing
- change crop
- change composition
- change scene lighting
- add unrelated objects
- remove existing objects
- create a different fabric
- change the fabric color
- invent a new fabric pattern
- use generic clothing material
- paste the rectangular fabric directly onto the person
- leave the fabric as a rectangle
- make the clothing look like a flat overlay
- modify anything unrelated to the selected garment

---

# FINAL QUALITY CHECK

Before returning the final image, compare the result against IMAGE 1.

Verify:

1. Same person.
2. Same face.
3. Same identity.
4. Same body.
5. Same body proportions.
6. Same pose.
7. Same posture.
8. Same hands and limbs.
9. Same camera perspective.
10. Same framing.
11. Same background.
12. Same scenery.
13. Same lighting.
14. Same composition.
15. Fabric matches IMAGE 2.
16. Selected garment is correctly constructed from IMAGE 2.
17. Clothing fits the existing body naturally.
18. Fabric folds and shadows are physically realistic.
19. No unrelated part of the original image has changed.
20. The final image looks like an authentic photograph.

If any unrelated element has changed, correct it before returning the final result.

---

# FINAL OBJECTIVE

The final output must be:

**THE ORIGINAL PHOTOGRAPH + ONLY THE SELECTED GARMENT**

The person's photograph is the foundation.

The raw rectangular fabric is the material source.

The selected garment is the only newly constructed element.

The result must look like the **exact same person, in the exact same location, with the exact same body, face, pose, camera, background, scenery, lighting, and composition — but naturally wearing the selected garment made from the exact fabric provided in IMAGE 2.**

**Do not regenerate the person. Do not regenerate the scene. Do not modify the body. Construct only the selected garment around the existing person.**`.trim();

/**
 * Build the final prompt string with actual values.
 */
export function buildPrompt({ gender, clothingType }) {
  return TRY_ON_PROMPT
    .replace('{gender}', gender)
    .replace('{clothingType}', clothingType);
}
