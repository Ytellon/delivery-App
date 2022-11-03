const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.status(401).json({ message: 'Invalid Email' });
  }
  if (!password || password.length < 6) {
    res.status(401).json({ message: 'Invalid Password' });
  }

  next();
};

module.exports = validateLogin;
