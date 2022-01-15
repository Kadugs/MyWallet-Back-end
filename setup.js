import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env.dev';

if (process.env.NODE_ENV === 'production') {
  dotenv.config();
} else {
  dotenv.config({
    path: envFile,
  });
}
