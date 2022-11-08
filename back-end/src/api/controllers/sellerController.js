const userService = require('../services/userService');

const sellerController = {

  getAllSellers: async (_req, res) => {
    try {
      const sellers = await userService.getAllSellers();

      res.status(200).json(sellers);
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  },
};

module.exports = sellerController;
