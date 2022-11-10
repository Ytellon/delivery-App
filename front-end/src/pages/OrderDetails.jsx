import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/button';
import ProductList from '../components/productList';
import { getRequest } from '../utils/requests';
import Header from '../components/header';
import getFormattedDate from '../utils/getFormattedDate';

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState();

  useEffect(() => {
    const getOrder = async () => {
      const response = await getRequest(`/orders/${id}`);

      setOrder(response);
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
          <div>
            { }
            <h3
              data-testid={ datatestId + itemId }
            >
              { order.id }
            </h3>
            <h3
              data-testid={ datatestId + sellerId }
            >
              {`${order.seller.name}`}
            </h3>
            <h3
              data-testid={ datatestId + dateId }
            >
              { getFormattedDate(order.saleDate) }
            </h3>
            <h3
              data-testid={ datatestId + statusId + order.id }
            >
              { order.status }
            </h3>
            <Button
              dataTestId={ datatestId + checkId }
              name="MARCAR COMO ENTREGUE"
              disabled={ order.status !== 'Em Trânsito' }
              onClick={ () => {} }
              type="button"
            />
            <h2
              data-testid={ datatestId + totalPriceId }
            >
              { order.totalPrice.replace('.', ',') }
            </h2>

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
