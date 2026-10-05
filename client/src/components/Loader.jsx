/**
 * Centered loading indicator shown during generation.
 */
export default function Loader() {
  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <span className="spinner" />
      <p className="text-sm text-zinc-500">Generating your try-on…</p>
    </div>
  );
}
