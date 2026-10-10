import { useCallback, useState } from 'react';
import parivarImage from '../assets/parivar_image.png';
import { clothingOptions } from '../data/clothingOptions';
import { generateTryOn, compressImage } from '../services/api';

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
  const [compressing, setCompressing] = useState(false);
  const [compressedPreviews, setCompressedPreviews] = useState([]);

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

  const handleCompress = useCallback(async () => {
    if (!personImage && !dressImage) {
      setError('Please select at least one image to compress.');
      return;
    }
    setError('');
    setCompressing(true);
    setCompressedPreviews([]);

    try {
      const newPreviews = [];
      if (personImage) {
        const compressed = await compressImage(personImage);
        newPreviews.push({ url: URL.createObjectURL(compressed), name: 'Person (Compressed)', size: compressed.size });
      }
      if (dressImage) {
        const compressed = await compressImage(dressImage);
        newPreviews.push({ url: URL.createObjectURL(compressed), name: 'Dress (Compressed)', size: compressed.size });
      }
      setCompressedPreviews(newPreviews);
    } catch (err) {
      setError('Compression failed.');
    } finally {
      setCompressing(false);
    }
  }, [personImage, dressImage]);

  const isReady = personImage && dressImage && gender && clothingType;

  // ── Render ─────────────────────────────────────────────────────────
  return (
    <main className="min-h-[100svh] bg-warm-cream font-sans">
      <div className="mx-auto max-w-2xl px-6 py-12 sm:py-10 flex flex-col gap-10">
        {/* Header */}
        <header className="text-center">
          <img
            src={parivarImage}
            alt="Parivar"
            className="mx-auto h-30 sm:h-40 w-auto object-contain"
          />
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

        {/* Generate and Compress Buttons */}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={handleCompress}
            disabled={(!personImage && !dressImage) || compressing}
            className="rounded-full bg-soft-brown px-8 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-brown focus:ring-2 focus:ring-brown focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {compressing ? 'Compressing...' : 'Compress Image(s)'}
          </button>
          <GenerateButton
            disabled={!isReady}
            loading={loading}
            onClick={handleGenerate}
          />
        </div>

        {/* Compressed Previews */}
        {compressedPreviews.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-serif text-brown text-center">Compressed Previews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {compressedPreviews.map((preview, index) => (
                <div key={index} className="flex flex-col items-center gap-2 border border-beige p-2 rounded-2xl bg-white-warm shadow-sm">
                  <span className="text-sm font-medium text-soft-brown">{preview.name} - {(preview.size / 1024 / 1024).toFixed(2)} MB</span>
                  <img src={preview.url} alt={preview.name} className="w-full aspect-[4/5] object-cover rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        )}

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
