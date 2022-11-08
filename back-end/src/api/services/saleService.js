const Sequelize = require('sequelize');
const config = require('../../database/config/config');
// const AppError = require('../error/AppError');
const { SaleModel, SaleProduct } = require('../../database/models');

const sequelize = new Sequelize(config.developement);

const createSale = async (sale) => {
  const transaction = await sequelize.transaction();
  const {
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleProducts,
  } = sale;

  const newSale = await SaleModel.create({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status: 'Pendente',
}, { transaction });

  const createSaleProducts = saleProducts.map((saleProduct) => ({
    saleId: newSale.id, productId: saleProduct.productId, quantity: saleProduct.quantity,
  }));

  await SaleProduct.bulkCreate(createSaleProducts, { transaction });
  await transaction.commit();
  return newSale;
};

const getAllSales = async () => {
  const sales = await SaleModel.findAll({
    include: { model: SaleProduct, as: 'products' },
  });
  return sales;
};

module.exports = {
  createSale,
  getAllSales,
};