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

  return (
    <div>
      {
        order && (
          <div>
            <h3
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              {`PEDIDO ${order.id}`}
            </h3>
            <h3
              data-testid="customer_order_details
                __element-order-details-label-seller-name"
            >
              {`P. Vend: ${order.seller.name}`}
            </h3>
            <h3
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              {order.saleDate}
            </h3>
            <h3
              data-testid={
                `customer_order_details__element-order-details-label-delivery-status
                  ${order.id}`
              }
            >
              {order.status}
            </h3>
            <Button
              data-testid="customer_order_details__button-delivery-check"
              name="MARCAR COMO ENTREGUE"
            />
            <h2
              data-testid="customer_order_details__element-order-total-price"
            >
              {`TOTAL R$${order.totalPrice}`}
            </h2>

            <ProductList
              datatestId="customer_order_details"
              products={ order.products }
            />
          </div>
        )
      }
    </div>
  );
}
