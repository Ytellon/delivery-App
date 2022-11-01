const md5 = require('md5');
const jwt = require('jsonwebtoken');

const { User } = require('../../database/models/index');

const login = async (login) => {
  const { email, password } = login;

  const user = await User.findOne({ where: { email } });

  if (!user || md5(password) !== user.password) {
    throw new Error('User Not Found');
  }

  const { id, role } = user;

  const jwtSecret = require('fs').readFileSync(__dirname + '/../../../jwt.evaluation.key', { encoding: 'utf-8' });

  const token = jwt.sign({ id, role }, jwtSecret, { expiresIn: '7d' });

  return token;
}

module.exports = {
  login,
};
