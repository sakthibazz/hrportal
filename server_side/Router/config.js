import { randomBytes } from 'crypto';

const secretToken = randomBytes(32).toString('hex');

export default {
  JWT_SECRET: process.env.JWT_SECRET || secretToken,
  MONGO_URL: "mongodb://127.0.0.1:27017/hrportal"
};

// EMAIL: "arohatechnologies0@gmail.com",
// PASSWORD: "vcyoqyedkredetzn",