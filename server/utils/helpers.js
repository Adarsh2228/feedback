// src/utils/helpers.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const comparePasswords = async (plainTextPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};

const generateToken = (userId, payload = {}, expiresIn = '1h') => {
  try {
    const token = jwt.sign({ userId, ...payload }, process.env.JWT_SECRET, { expiresIn });
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};

module.exports = {
  comparePasswords,
  generateToken,
};
