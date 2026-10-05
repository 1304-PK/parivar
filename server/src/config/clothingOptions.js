/**
 * Clothing category options by gender.
 * Easy to update — just modify the arrays below.
 */

export const clothingOptions = {
  male: [
    'T-Shirt',
    'Shirt',
    'Jacket',
    'Hoodie',
    'Formal Wear',
  ],
  female: [
    'Dress',
    'Top',
    'Jacket',
    'Saree',
    'Kurti',
    'Formal Wear',
  ],
};

export const VALID_GENDERS = Object.keys(clothingOptions);

export function isValidClothingType(gender, clothingType) {
  const options = clothingOptions[gender];
  return options ? options.includes(clothingType) : false;
}
