import mongoose from 'mongoose';

const generationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    prompt: { type: String, required: true },
    imageUrl: { type: String, required: true },
    model: { type: String, default: 'openai:gpt-image-1' },
    costType: { type: String, enum: ['free', 'points'], required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Generation', generationSchema);
