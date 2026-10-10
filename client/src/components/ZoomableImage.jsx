import { useState, useEffect } from 'react';

/**
 * A wrapper for an image that allows it to be clicked to zoom full-screen.
 */
export default function ZoomableImage({ src, alt, className }) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isZoomed) {
        setIsZoomed(false);
      }
    };
    if (isZoomed) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZoomed]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${className} cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]`}
        onClick={() => setIsZoomed(true)}
      />

      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8 backdrop-blur-sm cursor-zoom-out fade-in"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={src}
            alt={`Zoomed ${alt}`}
            className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-md"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing if they click the image itself, though maybe it's fine if clicking the image also closes it. Let's make clicking anywhere close it for convenience.
          />
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
            onClick={() => setIsZoomed(false)}
            aria-label="Close zoom"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
