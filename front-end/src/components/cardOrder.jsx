import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function CardOrder({ order, roll }) {
  // https://momentjs.com/

  const routeId = roll === 'customer' ? '/customer/orders/' : '/seller/orders/';

  const dataId = roll === 'customer' ? 'customer_order' : 'seller_order';

  return (
    <div>
      <Link to={ `${routeId}${order.id}` }>
        <p
          data-testid={ `${dataId}__element-order-id-${order.id}` }
        >
          {`Pedido ${order.id}`}
        </p>
        <p data-testid={ `${dataId}__element-delivery-status-${order.id}` }>
          {order.status}
        </p>
        <div data-testid={ `${dataId}__element-order-date-${order.id}` }>
          {moment(order.sale_date).format('DD/MM/YYYY')}
        </div>
        <p data-testid={ `${dataId}__element-card-price-${order.id}` }>
          {`R$ ${order.total_price.replace('.', ',')}`}
        </p>
      </Link>
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

  roll: propTypes.string.isRequired,
};
