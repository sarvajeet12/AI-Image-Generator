import Generation from '../models/Generation.js';
import User from '../models/User.js';
import { applyGenerationCost } from '../services/points.js';
import { generateImage } from '../services/clipdrop.js';

export const generateFromPrompt = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    // 1) Check eligibility WITHOUT deducting yet
    const eligible = user.freeUsed < 5 || (user.points && user.points > 0);
    if (!eligible) {
      return res.status(402).json({ message: 'Insufficient points. Please purchase credits.' });
    }

    // 2) Try generate image first
    let imageUrl;
    try {
      imageUrl = await generateImage(prompt);
    } catch (e) {
      const msg = e?.message || 'Failed to generate image';
      return res.status(e?.status || 500).json({ message: msg });
    }

    // 3) Deduct cost AFTER success
    const { costType } = await applyGenerationCost(user);

    // 4) Persist generation record
    const gen = await Generation.create({
      userId: user._id,
      prompt,
      imageUrl,
      model: 'clipdrop:text-to-image',
      costType,
    });

    return res.json({ imageUrl, generation: gen });
  } catch (err) {
    next(err);
  }
};

export const myGenerations = async (req, res, next) => {
  try {
    const items = await Generation.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ items });
  } catch (err) {
    next(err);
  }
};
