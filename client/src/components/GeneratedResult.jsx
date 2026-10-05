/**
 * Displays the AI-generated result image.
 *
 * Props:
 *   image    – base64 string
 *   mimeType – e.g. "image/png"
 *   mock     – boolean (true if this was a mock result)
 */
export default function GeneratedResult({ image, mimeType, mock }) {
  if (!image) return null;

  const src = `data:${mimeType};base64,${image}`;

  return (
    <section className="flex flex-col items-center gap-4 fade-in">
      <h2 className="text-lg font-semibold text-zinc-900">Generated Result</h2>

      {mock && (
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
          Mock mode — no API key configured. This is a placeholder image.
        </p>
      )}

      <div className="w-full max-w-md rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-white">
        <img
          src={src}
          alt="AI-generated virtual try-on result"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
