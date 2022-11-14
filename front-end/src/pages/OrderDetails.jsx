import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/button';
import ProductList from '../components/productList';
import Header from '../components/header';
import getOrderById from '../utils/getOrderById';
import getFormattedDate from '../utils/getFormattedDate';
import changeOrderStatus from '../utils/changeOrderStatus';
import './OrderDetails.css';

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState();

  useEffect(() => {
    const getOrder = async () => {
      setOrder(await getOrderById(id));
    };

    getOrder();
  }, [id]);

  const datatestId = 'customer_order_details';
  const itemId = '__element-order-details-label-order-id';
  const sellerId = '__element-order-details-label-seller-name';
  const dateId = '__element-order-details-label-order-date';
  const statusId = '__element-order-details-label-delivery-status';
  const checkId = '__button-delivery-check';
  const totalPriceId = '__element-order-total-price';

  return (
    <div>
      <Header />
      {
        order && (
          <div className="vertical-container">
            <h1 className="title">
              {'Pedido '}
              <span data-testid={ datatestId + itemId }>{ order.id }</span>
            </h1>
            <div className="vertical-container">
              <h3 className="order-details-item">
                { 'P. Vendedora: ' }
                <span
                  data-testid={ datatestId + sellerId }
                >
                  {`${order.seller.name}`}
                </span>
              </h3>
              <h3 className="order-details-item">
                {'Data: '}
                <span
                  data-testid={ datatestId + dateId }
                >
                  {getFormattedDate(order.saleDate)}
                </span>
              </h3>
              <h3 className="order-details-item">
                { 'Status: ' }
                <span
                  data-testid={ datatestId + statusId + order.id }
                >
                  {order.status}
                </span>
              </h3>
            </div>
            <h2 className="order-details-price">
              R$
              <span
                data-testid={ datatestId + totalPriceId }
              >
                {order.totalPrice.replace('.', ',')}
              </span>
            </h2>
            <Button
              classes="order-details-button"
              dataTestId={ datatestId + checkId }
              name="MARCAR COMO ENTREGUE"
              disabled={ order.status !== 'Em Trânsito' }
              onClick={ async () => {
                await changeOrderStatus(id, 'Entregue');
                setOrder(await getOrderById(id));
              } }
              type="button"
            />

            <ProductList
              datatestId={ datatestId }
              products={ order?.products }
            />
          </div>
        )
      }
    </div>
  );
}
