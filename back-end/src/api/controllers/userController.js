const userService = require('../services/userService');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.login({ email, password });

    res.status(200).json({ token });
  } catch (error) {
    res.status(404).json({ message: 'User Not Found' })
  }
}

module.exports = {
  login,
};
