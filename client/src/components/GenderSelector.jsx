/**
 * Segmented control for gender selection.
 *
 * Props:
 *   value    – "male" | "female"
 *   onChange – (gender: string) => void
 */
const options = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export default function GenderSelector({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-brown">Gender</span>

      <div
        className="inline-flex rounded-lg border border-beige bg-cream p-1 self-start"
        role="radiogroup"
        aria-label="Gender"
      >
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.value)}
              className={`px-5 py-2 text-sm font-medium rounded-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel ${
                selected
                  ? 'bg-white-warm text-brown shadow-sm'
                  : 'text-soft-brown hover:text-brown'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
