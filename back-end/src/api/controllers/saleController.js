const saleService = require('../services/saleService');

const saleController = {
  createSale: async (req, res) => {
    try {
      const sale = req.body;

      const newSale = await saleService.createSale(sale);

      res.status(201).json(newSale);
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  },

  getAllSales: async (_req, res) => {
    try {
      const sales = await saleService.getAllSales();

      res.status(200).json(sales);
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  },

  getSaleById: async (req, res) => {
    try {
      const { id } = req.params;

      const sale = await saleService.getSaleById(id);

      res.status(200).json(sale);
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  },
};

module.exports = saleController;