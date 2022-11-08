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

    delete user.dataValues.password;

    user.dataValues.token = token;

    return user.dataValues;
  },

  createUser: async ({ name, email, password, role }) => {
    const user = await User.findOne({ where: { email } });

    if (user) {
      throw new AppError(409, 'Conflict');
    }

    await User.create({ name, email, password: md5(password), role });

    const newUser = userService.login({ email, password });

    return newUser;
  },

  deleteUser: async ({ id }) => {
    await User.destroy({ where: { id } });
  },

  getAllUsers: async () => {
    const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role'] });

    return users;
  },

  getAllSellers: async () => {
    const sellers = await User.findAll({ where: { role: 'seller' } })
    console.log('passei aqui')
    return sellers;
  }
};

module.exports = userService;
