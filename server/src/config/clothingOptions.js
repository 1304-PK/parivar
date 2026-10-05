/**
 * Clothing category options by gender.
 * Easy to update — just modify the arrays below.
 */

export const clothingOptions = {
  male: [
    'Shirt',
    'Pant',
    'Coat',
    'Sherwani',
  ],
  female: [
    'Saree',
    'Lehenga',
  ],
};

export const VALID_GENDERS = Object.keys(clothingOptions);

export function isValidClothingType(gender, clothingType) {
  const options = clothingOptions[gender];
  return options ? options.includes(clothingType) : false;
}
