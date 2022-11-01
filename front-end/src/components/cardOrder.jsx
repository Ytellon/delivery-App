import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

export default function CardOrder({ order }) {
  const mySQLDate = '2015-04-29 10:29:08';
  const date = moment(mySQLDate).format('DD/MM/YYYY');
  // https://momentjs.com/

  return (
    <div>
      <p
        data-testid={ `customer_orders__element-order-id-${order.id}` }
      >
        {`Pedido ${order.id}`}
      </p>
      <p data-testid={ `customer_orders__element-delivery-status-${order.id}` }>
        {order.status}
      </p>
      <div data-testid={ `customer_orders__element-order-date-${order.id}` }>
        {date}
      </div>
      <p data-testid={ `customer_orders__element-card-price-${order.id}` }>
        {`R$ ${order.total_price.replace('.', ',')}`}
      </p>
    </div>
  );
}

CardOrder.propTypes = {
  order: propTypes.shape({
    id: propTypes.number.isRequired,
    status: propTypes.string.isRequired,
    sale_date: propTypes.string.isRequired,
    total_price: propTypes.number.isRequired,
    delivery_address: propTypes.string.isRequired,
    delivery_number: propTypes.string.isRequired,
  }).isRequired,
};
