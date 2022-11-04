const productService = require('../services/productService');

const userController = {

  getAllProducts: async (_req, res) => {
    try {
      const prodcuts = await productService.getAllProducts();

      res.status(200).json(prodcuts);
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  },
};

module.exports = userController;
