import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

export const register = asyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) throw new ApiError(409, "Email already registered");

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ fullname, username, email, password: hash });

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
  res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax' });

  res.status(201).json(new ApiResponse(201, { accessToken, user }, "User registered successfully"));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid credentials");

  const valid = await user.isPasswordCorrect(password);
  if (!valid) throw new ApiError(401, "Invalid credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
  res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax' });

  res.json(new ApiResponse(200, { accessToken, user }, "Login successful"));
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;
  if (!token) throw new ApiError(401, "Missing refresh token");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await User.findById(decoded._1 || decoded._id || decoded.id);
  // some JWT libs may decode differently; prefer decoded._id
  const userId = decoded._id ?? decoded.id ?? decoded._1; // fallback
  const foundUser = await User.findById(userId);
  if (!foundUser || foundUser.refreshToken !== token)
    throw new ApiError(401, "Invalid refresh token");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(foundUser._id);
  res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax' });

  res.json(new ApiResponse(200, { accessToken }, "Token refreshed"));
});

export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  const user = await User.findOne({ refreshToken: token });
  if (user) {
    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });
  }
  res.clearCookie('refreshToken');
  res.json(new ApiResponse(200, null, "Logged out successfully"));
});