export const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const openCheckout = async ({ orderId, amount, email, onSuccess }) => {
  const ok = await loadRazorpay();
  if (!ok) throw new Error('Failed to load Razorpay');
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount,
    currency: 'INR',
    name: 'AI Image Generator',
    description: 'Points purchase',
    order_id: orderId,
    prefill: { email },
    handler: onSuccess,
  };
  return new window.Razorpay(options);
};
