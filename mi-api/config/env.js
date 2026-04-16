import 'dotenv/config';

export default {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI
};