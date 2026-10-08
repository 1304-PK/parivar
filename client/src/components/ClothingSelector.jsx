import { clothingOptions } from '../data/clothingOptions';

/**
 * Selector for clothing category.
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
      <label className="text-sm font-medium text-brown">
        Clothing
      </label>

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-4 py-2 text-sm rounded-lg border transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 ${
              value === opt
                ? 'bg-caramel text-white border-caramel'
                : 'bg-white-warm text-brown border-beige hover:bg-beige/20'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
