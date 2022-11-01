const md5 = require('md5');
const jwt = require('jsonwebtoken');

const fs = require('fs');
var path = require('path');

const { User } = require('../../database/models/index');

const login = async (loginData) => {
  const { email, password } = loginData;

  const user = await User.findOne({ where: { email } });

  if (!user || md5(password) !== user.password) {
    throw new Error('User Not Found');
  }

  const { id, role } = user;

  const jwtSecret = fs
    .readFileSync(path.join(__dirname, '/../../../jwt.evaluation.key'), { encoding: 'utf-8' });
  
  const token = jwt.sign({ id, role }, jwtSecret, { expiresIn: '7d' });

  return token;
};

module.exports = {
  login,
};
