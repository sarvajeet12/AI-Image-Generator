import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateImage = async (prompt) => {
  const res = await client.images.generate({
    model: 'gpt-image-1',
    prompt,
    size: '1024x1024',
  });
  const b64 = res.data[0].b64_json;
  const dataUrl = `data:image/png;base64,${b64}`;
  return dataUrl;
};
