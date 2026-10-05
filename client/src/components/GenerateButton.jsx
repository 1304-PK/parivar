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
      className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 rounded-full bg-caramel px-6 py-4 text-base font-semibold text-white-warm shadow-sm transition-all hover:bg-brown focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-caramel cursor-pointer"
    >
      {loading && <span className="spinner shrink-0" />}
      {loading ? 'Generating…' : 'Generate'}
    </button>
  );
}
