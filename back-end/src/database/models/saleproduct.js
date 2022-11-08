const { INTEGER } = require("sequelize");

const SaleProduct = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
      foreignKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'sale_id',
    },
    productId: {
      foreignKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_id',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'sales_products',
  });

  SaleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      through: SaleProduct,
      foreignKey: "productId",
      otherKey: "saleId",
      as: "sales",
    });
    models.Sale.belongsToMany(models.Product, {
      through: SaleProduct,
      foreignKey: "saleId",
      otherKey: "productId",
      as: "products",
    });
  };

  return SaleProduct;
};

module.exports = SaleProduct;
