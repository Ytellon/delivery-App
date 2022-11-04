const userService = require('../services/userService');

const userController = {

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userService.login({ email, password });

      res.status(200).json(user);
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const result = await userService.createUser({ name, email, password });

      res.status(201).json(result);
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  },
};

module.exports = userController;
