import React, { useEffect, useState } from 'react';
import Button from '../components/button';
import ProductList from '../components/productList';
import { getRequest } from '../utils/requests';

export default function OrderDetails() {
  const [order, setOrder] = useState();

  const getOrder = async () => {
    const response = await getRequest(`/orders/${1}`);

    setOrder(response);
  };

  useEffect(() => {
    getOrder();
  }, []);

  const datatestId = 'customer_order_details';
  const itemId = '__element-order-details-label-order-id';
  const sellerId = '__element-order-details-label-seller-name';
  const dateId = '__element-order-details-label-order-date';
  const statusId = '__element-order-details-label-delivery-status';
  const checkId = '__button-delivery-check';
  const totalPriceId = '__element-order-total-price';

  return (
    <div>
      {
        order && (
          <div>
            <h3
              data-testid={ datatestId + itemId }
            >
              {`PEDIDO ${order.id}`}
            </h3>
            <h3
              data-testid={ datatestId + sellerId }
            >
              {`P. Vend: ${order.seller.name}`}
            </h3>
            <h3
              data-testid={ datatestId + dateId }
            >
              {order.saleDate}
            </h3>
            <h3
              data-testid={ datatestId + statusId + order.id }
            >
              {order.status}
            </h3>
            <Button
              dataTestId={ datatestId + checkId }
              name="MARCAR COMO ENTREGUE"
            />
            <h2
              data-testid={ datatestId + totalPriceId }
            >
              {`TOTAL R$${order.totalPrice}`}
            </h2>

            <ProductList
              datatestId={ datatestId }
              products={ order.products }
            />
          </div>
        )
      }
    </div>
  );
}
