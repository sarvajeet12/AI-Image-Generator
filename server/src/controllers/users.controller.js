import User from '../models/User.js';

export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-__v');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      loginType: user.loginType,
      freeUsed: user.freeUsed,
      points: user.points,
      createdAt: user.createdAt,
    });
  } catch (err) {
    next(err);
  }
};
