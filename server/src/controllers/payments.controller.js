import crypto from 'crypto';
import User from '../models/User.js';
import Payment from '../models/Payment.js';

const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

const priceTable = {
  10: 50, // INR
  25: 100,
};

const basicAuth = () => 'Basic ' + Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString('base64');

export const createOrder = async (req, res, next) => {
  try {
    const { points } = req.body;
    if (!KEY_ID || !KEY_SECRET) return res.status(500).json({ message: 'Razorpay keys not configured' });
    if (!priceTable[points]) return res.status(400).json({ message: 'Invalid points pack' });

    const amountInPaise = priceTable[points] * 100;
    // Razorpay requires receipt length <= 40
   // Use short, unique receipt: timestamp base36 + 6 random chars
   const shortTs = Date.now().toString(36);    const rand6 = Math.random().toString(36).slice(2, 8);
   const receipt = `r_${shortTs}_${rand6}`; // typically ~ 2+8+1+6 = 17 chars


    const resp = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': basicAuth(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt,
        notes: { points: String(points), userId: String(req.user.id) },
      }),
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      return res.status(500).json({ message: `Failed to create order: ${text || resp.statusText}` });
    }

    const order = await resp.json();

    // Save a pending payment record (optional but useful)
    await Payment.create({
      userId: req.user.id,
      orderId: order.id,
      status: 'created',
      amount: order.amount, // paise
      pointsPurchased: points,
    });

    res.json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    next(err);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Invalid verification payload' });
    }

    const hmac = crypto.createHmac('sha256', KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const expectedSignature = hmac.digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Signature verification failed' });
    }

    // Fetch order to know amount & points from notes
    const orderResp = await fetch(`https://api.razorpay.com/v1/orders/${razorpay_order_id}`, {
      headers: { Authorization: basicAuth() },
    });
    if (!orderResp.ok) {
      const t = await orderResp.text().catch(() => '');
      return res.status(500).json({ message: `Failed to fetch order: ${t || orderResp.statusText}` });
    }
    const order = await orderResp.json();

    const points = parseInt(order.notes?.points || '0', 10) || 0;

    // Update payment record
    const paymentDoc = await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      { paymentId: razorpay_payment_id, status: 'paid', amount: order.amount, pointsPurchased: points },
      { new: true, upsert: true }
    );

    // Credit user points
    const user = await User.findById(order.notes?.userId || req.user.id);
    if (user) {
      user.points = (user.points || 0) + points;
      await user.save();
    }

    res.json({ success: true, payment: paymentDoc, newPoints: user?.points ?? null });
  } catch (err) {
    next(err);
  }
};
