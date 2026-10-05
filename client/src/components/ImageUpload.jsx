import { useCallback, useEffect, useRef, useState } from 'react';

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
  const inputRef = useRef(null);
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

  const openPicker = () => inputRef.current?.click();

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-zinc-700">{label}</span>

      {preview ? (
        /* ── Selected state ────────────────────────────────────────── */
        <div className="relative rounded-xl border border-zinc-200 overflow-hidden bg-white">
          <img
            src={preview}
            alt={`${label} preview`}
            className="w-full aspect-[3/4] object-cover"
          />
          <div className="px-4 py-3 flex items-center justify-between border-t border-zinc-100">
            <span className="text-xs text-zinc-500 truncate max-w-[60%]">
              {file?.name}
            </span>
            <button
              type="button"
              onClick={openPicker}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              Replace
            </button>
          </div>
        </div>
      ) : (
        /* ── Empty state ───────────────────────────────────────────── */
        <button
          type="button"
          onClick={openPicker}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`upload-zone flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 bg-white aspect-[3/4] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
            dragging ? 'drag-over' : ''
          }`}
          aria-label={hint}
        >
          <span className="text-3xl leading-none text-zinc-400">+</span>
          <span className="text-sm text-zinc-500">{hint}</span>
          <span className="text-xs text-zinc-400">JPG, PNG or WebP</span>
          <span className="text-xs text-zinc-400">Up to 10 MB</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        onChange={handleChange}
        className="hidden"
        aria-label={`Upload ${label} image`}
      />
    </div>
  );
}
