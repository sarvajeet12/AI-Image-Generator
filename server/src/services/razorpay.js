import Razorpay from 'razorpay';
import crypto from 'crypto';

const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;

export const razorpay = new Razorpay({ key_id, key_secret });

// Pricing map in INR -> convert to paise for Razorpay
export const PRICING = {
  10: 50, // Rs 50
  25: 100, // Rs 100
};

export const getAmountPaise = (points) => {
  const inr = PRICING[points];
  if (!inr) return null;
  return inr * 100; // paise
};

export const createOrder = async ({ points, userId }) => {
  const amount = getAmountPaise(points);
  if (!amount) {
    const err = new Error('Invalid points pack');
    err.status = 400;
    throw err;
  }
  const order = await razorpay.orders.create({
    amount,
    currency: 'INR',
    notes: { userId: String(userId), points: String(points) },
    receipt: `rcpt_${userId}_${Date.now()}`,
  });
  return order;
};

export const verifySignature = ({ orderId, paymentId, signature }) => {
  const body = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac('sha256', key_secret).update(body).digest('hex');
  return expected === signature;
};
