import userService from "../services/userService";

const userController = {

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const token = await userService.login({ email, password });

      res.status(200).json({ token });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      await userService.createUser({ name, email, password });

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  }

};

module.exports = userController;
