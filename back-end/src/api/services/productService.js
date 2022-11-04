const { Product } = require('../../database/models/index');

const userService = {
  getAllProducts: async () => {
    const products = await Product.findAll();

    return products;
  },
};

module.exports = userService;
