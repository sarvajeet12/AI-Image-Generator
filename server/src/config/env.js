import dotenv from 'dotenv';
dotenv.config();

const required = ['CLIENT_URL', 'MONGO_URI', 'JWT_SECRET'];

for (const key of required) {
  if (!process.env[key]) {
    console.warn(`[env] Missing ${key}. Make sure to set it in .env`);
  }
}
