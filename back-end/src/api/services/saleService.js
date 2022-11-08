const Sequelize = require('sequelize');
const config = require('../../database/config/config');
// const AppError = require('../error/AppError');
const { Sale, SaleProduct } = require('../../database/models');

const sequelize = new Sequelize(config.development);

const createSale = async (sale) => {
  const transaction = await sequelize.transaction();

  const newSale = await Sale.create(
    {
      userId: sale.userId,
      sellerId: sale.sellerId,
      totalPrice: sale.totalPrice,
      deliveryAddress: sale.deliveryAddress,
      deliveryNumber: sale.deliveryNumber,
      status: 'Pendente',
      saleDate: new Date().toISOString(),
    }, { transaction },
  );

  const createSaleProducts = sale.saleProducts.map((saleProduct) => ({
    saleId: newSale.id, productId: saleProduct.productId, quantity: saleProduct.quantity,
  }));

  await SaleProduct.bulkCreate(createSaleProducts, { transaction });
  await transaction.commit();
  return newSale;
};

const getAllSales = async () => {
  const sales = await Sale.findAll({
    include: { model: SaleProduct, as: 'sales' },
  });
  return sales;
};

const getSaleById = async (id) => {
  const sale = await Sale.findOne({
    where: { id },
    include: { model: SaleProduct, as: 'sales' },
  });
  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
