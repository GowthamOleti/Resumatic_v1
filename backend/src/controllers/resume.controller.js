import Resume from '../models/Resume.js';
import { parseFile } from '../utils/parser.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createResume = asyncHandler(async (req, res) => {
  const resume = await Resume.create({ userId: req.user._id, ...req.body });
  res.status(201).json(new ApiResponse(201, resume, "Resume created"));
});

export const listResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
  res.json(new ApiResponse(200, resumes, "Resumes fetched"));
});

export const parseResume = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "File required");
  const { text, structured } = await parseFile(req.file.buffer, req.file.originalname, req.file.mimetype);
  res.json(new ApiResponse(200, { text, structured }, "Resume parsed successfully"));
});