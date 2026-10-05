import { clothingOptions } from '../data/clothingOptions';

/**
 * Dropdown selector for clothing category.
 *
 * Props:
 *   gender   – current gender selection
 *   value    – currently selected clothing type
 *   onChange – (type: string) => void
 */
export default function ClothingSelector({ gender, value, onChange }) {
  const options = clothingOptions[gender] || [];

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="clothing-select" className="text-sm font-medium text-brown">
        Clothing
      </label>

      <select
        id="clothing-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-xs appearance-none rounded-lg border border-beige bg-white-warm px-4 py-2.5 text-sm text-brown shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 cursor-pointer"
      >
        <option value="" disabled>
          Select clothing type
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
