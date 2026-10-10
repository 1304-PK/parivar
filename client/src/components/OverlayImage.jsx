import { useEffect, useState } from 'react';
import ZoomableImage from './ZoomableImage';
import borderImageSrc from '../assets/parivar_border.png';

export default function OverlayImage({ baseSrc, alt, className }) {
  const [finalSrc, setFinalSrc] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function applyOverlay() {
      try {
        const baseImg = new Image();
        baseImg.crossOrigin = "anonymous";
        const borderImg = new Image();
        
        await Promise.all([
          new Promise((resolve, reject) => {
            baseImg.onload = resolve;
            baseImg.onerror = reject;
            baseImg.src = baseSrc;
          }),
          new Promise((resolve, reject) => {
            borderImg.onload = resolve;
            borderImg.onerror = reject;
            borderImg.src = borderImageSrc;
          })
        ]);

        if (!isMounted) return;

        const canvas = document.createElement('canvas');
        canvas.width = baseImg.width;
        canvas.height = baseImg.height;
        const ctx = canvas.getContext('2d');

        // Draw base image
        ctx.drawImage(baseImg, 0, 0);

        // Draw border image stretched/resized to match the target image dimensions
        ctx.drawImage(borderImg, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/png', 0.9);
        if (isMounted) {
          setFinalSrc(dataUrl);
        }
      } catch (err) {
        console.error("Failed to apply border overlay:", err);
        // Fallback to baseSrc
        if (isMounted) {
          setFinalSrc(baseSrc);
        }
      }
    }

    applyOverlay();

    return () => {
      isMounted = false;
    };
  }, [baseSrc]);

  if (!finalSrc) {
    // Return a skeleton/placeholder matching the aspect ratio roughly while processing
    return <div className={`animate-pulse bg-beige/30 aspect-[4/5] w-full h-full rounded-xl ${className || ''}`}></div>;
  }

  return (
    <ZoomableImage
      src={finalSrc}
      alt={alt}
      className={className}
    />
  );
}
