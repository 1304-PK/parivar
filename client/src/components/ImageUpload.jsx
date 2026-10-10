import { useCallback, useEffect, useRef, useState } from 'react';
import ZoomableImage from './ZoomableImage';

const ACCEPTED = '.jpg,.jpeg,.png,.webp';
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

/**
 * Reusable drag-and-drop image upload card.
 *
 * Props:
 *   label      – "Person" or "Dress"
 *   hint       – e.g. "Upload person image"
 *   file       – currently selected File (or null)
 *   onSelect   – (file: File) => void
 *   onError    – (message: string) => void
 */
export default function ImageUpload({ label, hint, file, onSelect, onError }) {
  const galleryRef = useRef(null);
  const cameraRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);

  // Create / revoke object URL for preview
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const validate = useCallback(
    (f) => {
      const allowed = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowed.includes(f.type)) {
        onError?.('Only JPG, PNG, or WebP images are allowed.');
        return false;
      }
      if (f.size > MAX_SIZE) {
        onError?.('Image must be under 10 MB.');
        return false;
      }
      return true;
    },
    [onError],
  );

  const handleFile = useCallback(
    (f) => {
      if (f && validate(f)) onSelect(f);
    },
    [onSelect, validate],
  );

  const handleChange = (e) => {
    handleFile(e.target.files?.[0]);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const openGallery = () => galleryRef.current?.click();
  const openCamera = () => cameraRef.current?.click();

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-brown">{label}</span>

      {preview ? (
        /* ── Selected state ────────────────────────────────────────── */
        <div className="relative rounded-2xl border border-beige overflow-hidden bg-white-warm shadow-sm">
          <ZoomableImage
            src={preview}
            alt={`${label} preview`}
            className="w-full aspect-[4/5] object-cover"
          />
          <div className="px-4 py-3 flex items-center justify-between border-t border-beige bg-white-warm/80 backdrop-blur-sm">
            <span className="text-xs text-soft-brown truncate max-w-[60%] font-medium">
              {file?.name}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={openCamera}
                className="text-xs font-medium text-caramel hover:text-brown transition-colors cursor-pointer"
              >
                Camera
              </button>
              <button
                type="button"
                onClick={openGallery}
                className="text-xs font-medium text-caramel hover:text-brown transition-colors cursor-pointer"
              >
                Replace
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ── Empty state ───────────────────────────────────────────── */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`upload-zone flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-beige bg-white-warm aspect-[4/5] transition-all duration-200 ${
            dragging ? 'drag-over' : 'hover:border-caramel hover:bg-cream'
          }`}
        >
          <span className="text-3xl leading-none text-soft-brown opacity-50">+</span>
          <span className="text-sm text-soft-brown font-medium">{hint}</span>
          <span className="text-xs text-soft-brown opacity-75">JPG, PNG or WebP · Up to 10 MB</span>

          {/* Action buttons */}
          <div className="flex gap-2 mt-1">
            <button
              type="button"
              onClick={openGallery}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white-warm border border-beige text-brown hover:border-caramel hover:text-caramel transition-colors cursor-pointer shadow-sm"
            >
              {/* Gallery icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              Gallery
            </button>
            <button
              type="button"
              onClick={openCamera}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white-warm border border-beige text-brown hover:border-caramel hover:text-caramel transition-colors cursor-pointer shadow-sm"
            >
              {/* Camera icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Camera
            </button>
          </div>
        </div>
      )}

      {/* Gallery file picker */}
      <input
        ref={galleryRef}
        type="file"
        accept={ACCEPTED}
        onChange={handleChange}
        className="hidden"
        aria-label={`Upload ${label} image from gallery`}
      />

      {/* Camera capture — opens device camera directly */}
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleChange}
        className="hidden"
        aria-label={`Capture ${label} image with camera`}
      />
    </div>
  );
}
