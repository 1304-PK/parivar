import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import tryOnRoutes from './routes/tryOnRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---------------------------------------------------------
app.use(cors());
app.use(express.json());

// --- Routes -------------------------------------------------------------
app.use('/api/try-on', tryOnRoutes);

// --- Health check -------------------------------------------------------
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// --- Global error handler -----------------------------------------------
app.use((err, _req, res, _next) => {
  // Multer-specific errors
  if (err.name === 'MulterError') {
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'File exceeds the 10 MB size limit.'
        : `Upload error: ${err.message}`;
    return res.status(400).json({ success: false, error: message });
  }

  if (err.message?.includes('Invalid file type')) {
    return res.status(400).json({ success: false, error: err.message });
  }

  console.error('[Server] Unhandled error:', err.message);
  return res.status(500).json({ success: false, error: 'An unexpected error occurred.' });
});

// --- Start / Export -------------------------------------------------------
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    if (!process.env.GEMINI_API_KEY) {
      console.log('⚠  GEMINI_API_KEY not set — running in mock mode.');
    }
  });
}

export default app;
