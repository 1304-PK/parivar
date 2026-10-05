/**
 * Primary generate button with built-in disabled / loading states.
 *
 * Props:
 *   disabled  – boolean
 *   loading   – boolean
 *   onClick   – () => void
 */
export default function GenerateButton({ disabled, loading, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-zinc-900 cursor-pointer"
    >
      {loading && <span className="spinner shrink-0" />}
      {loading ? 'Generating…' : 'Generate'}
    </button>
  );
}
