import express from 'express';
import multer from 'multer';
import { verifyJWT } from '../middleware/auth.js';
import { createResume, listResumes, parseResume } from '../controllers/resumeController.js';

const router = express.Router();
const upload = multer();

router.use(verifyJWT);
router.get('/', listResumes);
router.post('/', createResume);
router.post('/parse', upload.single('file'), parseResume);

export default router;