import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config();
} else {
  const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env.dev';
  dotenv.config({
    path: envFile,
  });
}
