const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY;

export const generateImage = async (prompt) => {
  if (!CLIPDROP_API_KEY) {
    const err = new Error('CLIPDROP_API_KEY is not set');
    err.status = 500;
    throw err;
  }

  const res = await fetch('https://clipdrop-api.co/text-to-image/v1', {
    method: 'POST',
    headers: {
      'x-api-key': CLIPDROP_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`Clipdrop error: ${res.status} ${text || res.statusText}`);
    err.status = res.status;
    throw err;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  const b64 = buf.toString('base64');
  const dataUrl = `data:image/png;base64,${b64}`;
  return dataUrl;
};
