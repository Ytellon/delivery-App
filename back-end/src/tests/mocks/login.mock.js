const login = {
  email: 'adm@deliveryapp.com',
  password: '--adm2@21!!--',
};

const loginIncorrectEmail = {
  email: 'adm@wrong.com',
  password: '--adm2@21!!--',
};

const loginIncorrectPassword = {
  email: 'adm@deliveryapp.com',
  password: '12345678',
};

const loginInvalidEmail = {
  email: 'adm@deliveryapp',
  password: '--adm2@21!!--',
};

const loginInvalidPassword = {
  email: 'adm@deliveryapp.com',
  password: '--adm',
};

module.exports = {
  login,
  loginIncorrectEmail,
  loginIncorrectPassword,
  loginInvalidEmail,
  loginInvalidPassword,
};
