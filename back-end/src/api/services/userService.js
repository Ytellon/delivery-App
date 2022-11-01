const md5 = require('md5');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const { User } = require('../../database/models/index');
const AppError = require('../../error/AppError');

const userService = {

  login: async (loginData) => {
    const { email, password } = loginData;

    const user = await User.findOne({ where: { email } });

    if (!user || md5(password) !== user.password) {
      throw new AppError(404, 'Not Found');
    }

    const { id, role } = user;

    const jwtSecret = fs
      .readFileSync(path.join(__dirname, '/../../../jwt.evaluation.key'), { encoding: 'utf-8' });
    
    const token = jwt.sign({ id, role }, jwtSecret, { expiresIn: '7d' });

    return token;
  },

  createUser: async ({ name, email, password }) => {

    const user = await User.findOne({ where: { email } });

    if (user) {
      throw new AppError(409, 'Conflict');
    }

    const newUser = await User.create({ name, email, password: md5(password), role: 'customer' });

    return newUser;
  },

};

export default userService;
