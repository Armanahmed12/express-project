import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || '5000',
  databaseUrl: process.env.DATABASE_URL as string,
};

if (!config.databaseUrl) {
  throw new Error('DATABASE_URL is not defined in .env');
}
