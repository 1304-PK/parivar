import { useCallback, useState } from 'react';
import { clothingOptions } from '../data/clothingOptions';
import { generateTryOn } from '../services/api';

import ImageUpload from '../components/ImageUpload';
import GenderSelector from '../components/GenderSelector';
import ClothingSelector from '../components/ClothingSelector';
import GenerateButton from '../components/GenerateButton';
import GeneratedResult from '../components/GeneratedResult';
import Loader from '../components/Loader';

export default function TryOnPage() {
  // ── State ──────────────────────────────────────────────────────────
  const [personImage, setPersonImage] = useState(null);
  const [dressImage, setDressImage] = useState(null);
  const [gender, setGender] = useState('male');
  const [clothingType, setClothingType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  // ── Handlers ───────────────────────────────────────────────────────
  const handleGenderChange = useCallback(
    (g) => {
      setGender(g);
      // Reset clothing if current selection is invalid for the new gender
      setClothingType((prev) => {
        const valid = clothingOptions[g] || [];
        return valid.includes(prev) ? prev : '';
      });
    },
    [],
  );

  const handleGenerate = useCallback(async () => {
    setError('');

    // Client-side guard (button should already be disabled)
    if (!personImage || !dressImage || !gender || !clothingType) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await generateTryOn({
        personImage,
        dressImage,
        gender,
        clothingType,
      });
      setResult(res.data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [personImage, dressImage, gender, clothingType]);

  const isReady = personImage && dressImage && gender && clothingType;

  // ── Render ─────────────────────────────────────────────────────────
  return (
    <main className="min-h-[100svh] bg-warm-cream font-sans">
      <div className="mx-auto max-w-2xl px-6 py-12 sm:py-20 flex flex-col gap-10">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-brown">
            See yourself in any outfit.
          </h1>
          <p className="mt-2 text-lg text-soft-brown">
            Create your virtual try-on image
          </p>
        </header>

        {/* Upload cards — side-by-side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ImageUpload
            label="Person"
            hint="Upload person image"
            file={personImage}
            onSelect={setPersonImage}
            onError={setError}
          />
          <ImageUpload
            label="Dress"
            hint="Upload dress image"
            file={dressImage}
            onSelect={setDressImage}
            onError={setError}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6">
          <GenderSelector value={gender} onChange={handleGenderChange} />
          <ClothingSelector
            gender={gender}
            value={clothingType}
            onChange={setClothingType}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-800 bg-red-100/50 border border-red-200 rounded-lg px-4 py-2.5 text-center">
            {error}
          </p>
        )}

        {/* Generate */}
        <div className="flex justify-center">
          <GenerateButton
            disabled={!isReady}
            loading={loading}
            onClick={handleGenerate}
          />
        </div>

        {/* Loading */}
        {loading && <Loader />}

        {/* Result */}
        {result && (
          <GeneratedResult
            image={result.image}
            mimeType={result.mimeType}
            mock={result.mock}
          />
        )}
      </div>
    </main>
  );
}
