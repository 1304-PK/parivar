import multer from 'multer';
import { MAX_FILE_SIZE, ALLOWED_MIME_TYPES } from '../config/upload.js';

/**
 * Multer configured with memory storage so files stay in RAM as buffers.
 * No temp files to clean up.
 */
const storage = multer.memoryStorage();

function fileFilter(_req, file, cb) {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type: ${file.mimetype}. Allowed: JPG, PNG, WebP.`), false);
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});
