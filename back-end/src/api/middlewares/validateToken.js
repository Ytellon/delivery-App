const jwt = require('jsonwebtoken');

const fs = require('fs');
const path = require('path');

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const jwtSecret = fs
      .readFileSync(path.join(__dirname, '/../../../jwt.evaluation.key'), { encoding: 'utf-8' });

    const decoded = jwt.verify(token, jwtSecret);

    req.userId = decoded.id;
    req.userRole = decoded.role;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = validateToken;
