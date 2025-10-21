import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String },
    avatar: { type: String },
    loginType: { type: String, enum: ['google', 'email'], default: 'google' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    providerId: { type: String }, // google id
    freeUsed: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
