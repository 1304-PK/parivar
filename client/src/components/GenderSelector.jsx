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
      <span className="text-sm font-medium text-zinc-700">Gender</span>

      <div
        className="inline-flex rounded-lg border border-zinc-200 bg-zinc-100 p-1 self-start"
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
              className={`px-5 py-2 text-sm font-medium rounded-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                selected
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-700'
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
