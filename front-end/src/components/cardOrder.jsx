import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import convertNumber from '../utils/convertNumber';
import './cardOrder.css';

export default function CardOrder({ order, roll }) {
  // https://momentjs.com/

  const routeId = roll === 'customer' ? '/customer/orders/' : '/seller/orders/';

  const dataId = roll === 'customer' ? 'customer_orders' : 'seller_orders';

  return (
    <div className="order-card">
      <Link to={ `${routeId}${order.id}` }>
        <div className="order-title">
          <p
            data-testid={ `${dataId}__element-order-id-${order.id}` }
          >
            {`Pedido ${order.id}`}
          </p>
        </div>
        <div className="order-content horizontal-container">
          <div>
            <p className="order-description">Status: </p>
            <p className="order-description">Data: </p>
            <p className="order-description">Preço: </p>
          </div>
          <div>
            <p data-testid={ `${dataId}__element-delivery-status-${order.id}` }>
              {order.status}
            </p>
            <div data-testid={ `${dataId}__element-order-date-${order.id}` }>
              {moment(order.saleDate).format('DD/MM/YYYY')}
            </div>
            <p data-testid={ `${dataId}__element-card-price-${order.id}` }>
              {convertNumber(order.totalPrice)}
            </p>
            { roll === 'seller' && (
              <p data-testid={ `seller_orders__element-card-address-${order.id}` }>
                {
                  `${order.deliveryAddress}, ${order.deliveryNumber}`
                }
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

CardOrder.propTypes = {
  order: propTypes.shape({
    id: propTypes.number.isRequired,
    status: propTypes.string.isRequired,
    saleDate: propTypes.string.isRequired,
    totalPrice: propTypes.string.isRequired,
    deliveryAddress: propTypes.string.isRequired,
    deliveryNumber: propTypes.string.isRequired,
  }).isRequired,

  roll: propTypes.string.isRequired,
};
