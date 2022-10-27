const SaleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    totalPrice: {
      type: DataTypes.FLOAT(9, 2),
      allowNull: false,
      field: 'total_price',
    },
    deliveryAddress: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'delivery_address',
    },
    deliveryNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'delivery_number',
    },
    saleDate: {
      type: DataTypes.DATETIME,
      allowNull: false,
      field: 'sale_date',
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    tableName: 'sales',
    timestamps: false,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Sale.belongsTo(models.User, {
      foreignKey: 'seller_id',
      as: 'seller',
    });
  };

  return Sale;
};

module.exports = SaleModel;
