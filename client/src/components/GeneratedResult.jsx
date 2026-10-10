import OverlayImage from './OverlayImage';

/**
 * Displays the AI-generated result image(s).
 *
 * Props:
 *   images   - array of { image, mimeType, styleName }
 *   mock     – boolean (true if this was a mock result)
 */
export default function GeneratedResult({ images, mock }) {
  if (!images || images.length === 0) return null;

  return (
    <section className="flex flex-col items-center gap-4 fade-in pb-8">
      <h2 className="text-2xl font-serif text-brown">Generated Result{images.length > 1 ? 's' : ''}</h2>

      {mock && (
        <p className="text-xs text-amber-800 bg-amber-100/50 border border-amber-200 rounded-lg px-3 py-1.5">
          Mock mode — no API key configured. This is a placeholder image.
        </p>
      )}

      <div className={`grid grid-cols-1 ${images.length > 1 ? 'md:grid-cols-2' : ''} gap-6 w-full max-w-4xl`}>
        {images.map((item, index) => {
          const src = `data:${item.mimeType || 'image/png'};base64,${item.image}`;
          return (
            <div key={index} className="flex flex-col items-center gap-2">
              {item.styleName && (
                <h3 className="text-lg font-medium text-soft-brown">{item.styleName}</h3>
              )}
              <div className="w-full rounded-2xl overflow-hidden border border-beige shadow-sm bg-white-warm p-2">
                <OverlayImage
                  baseSrc={src}
                  alt={`AI-generated virtual try-on result ${item.styleName || ''}`}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
