import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    orderId: { type: String, index: true },
    paymentId: { type: String },
    signature: { type: String },
    amount: { type: Number, required: true }, // in paise
    pointsPurchased: { type: Number, required: true },
    status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
    rawPayload: { type: Object },
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
