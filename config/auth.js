const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = (process.env.JWT_SECRET || 'Abcde@12345').trim();

module.exports = {
  JWT_SECRET,
};
