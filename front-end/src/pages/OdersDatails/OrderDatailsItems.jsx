import PropTypes from 'prop-types';
import React from 'react';

function OrderDatailsItems({ user, i, description, quantitys, prices }) {
  return (
    <tr>
      <td
        data-testid={ `${user}_checkout__element-order-table-item-number-${i}` }
      >
        {i + 1}
      </td>

      <td
        data-testid={ `${user}_order_details__element-order-table-name-${i}` }
      >
        {description}
      </td>

      <td
        data-testid={ `${user}_order_details__element-order-table-quantity-${i}` }
      >
        {quantitys}
      </td>

      <td
        data-testid={ `${user}_order_details`
                + `__element-order-table-unit-price-${i}` }
      >
        {`R$ ${prices.toFixed(2)}`}
      </td>

      <td
        data-testid={ `${user}_order_details`
                + `__element-order-table-sub-total-${i}` }
      >
        {`R$ ${(quantitys * prices).toFixed(2)}`}
      </td>
    </tr>
  );
}

OrderDatailsItems.propTypes = {
  user: PropTypes.string,
  i: PropTypes.number,
  description: PropTypes.string,
  quantitys: PropTypes.string,
  prices: PropTypes.number,
}.isRequired;

export default OrderDatailsItems;
