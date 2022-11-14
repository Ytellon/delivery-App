import PropTypes from 'prop-types';

export default function ProductList({
  datatestId, products, hasRemoveButton, removeItem,
}) {
  const renderOrders = () => (
    products.map((product, i) => (
      <tr className={ (i < products.length - 1) && 'tr-border' } key={ i }>
        <td
          className="td-item"
          data-testid={ `${datatestId}${'__element-order-table-item-number-'}${i}` }
        >
          {i + 1}
        </td>
        <td
          data-testid={ `${datatestId}${'__element-order-table-name-'}${i}` }
        >
          {product.name}
        </td>
        <td
          data-testid={ `${datatestId}${'__element-order-table-quantity-'}${i}` }
        >
          {product.SaleProduct.quantity}
        </td>
        <td
          data-testid={ `${datatestId}${'__element-order-table-unit-price-'}${i}` }
        >
          {Number(product.price).toFixed(2).replace('.', ',')}
        </td>
        <td
          data-testid={ `${datatestId}${'__element-order-table-sub-total-'}${i}` }
        >
          {Number(product.price * product.SaleProduct.quantity)
            .toFixed(2).replace('.', ',')}
        </td>
        {hasRemoveButton && (
          <td>
            <button
              data-testid={ `customer_checkout__element-order-table-remove-${i}` }
              type="button"
              onClick={ () => removeItem(i, product) }
            >
              X
            </button>
          </td>
        )}

      </tr>
    ))
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          {
            (hasRemoveButton && (
              <th>Remover Item</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        { renderOrders() }
      </tbody>
    </table>
  );
}

ProductList.propTypes = {
  datatestId: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    SaleProduct: PropTypes.shape({
      quantity: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
  hasRemoveButton: PropTypes.bool,
  removeItem: PropTypes.func,
};

ProductList.defaultProps = {
  hasRemoveButton: false,
  removeItem: null,
};
