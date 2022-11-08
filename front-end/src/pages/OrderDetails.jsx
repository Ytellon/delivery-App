import React, { useEffect, useState } from 'react';
import Button from '../components/button';
import ProductList from '../components/productList';

export default function OrderDetails() {
  const [order, setOrder] = useState();

  const orderMock = {
    id: 3,
    seller: 'Fulana Pereira',
    saleDate: '07/04/2021',
    status: 'entregue',
    products: [
      {
        id: 7,
        name: 'Becks 330ml',
        price: 4.99,
        url_image: 'http://localhost:3001/images/becks_330ml.jpg',
        quantity: 2,
      },
      {
        id: 5,
        name: 'Skol 269ml',
        price: 2.19,
        url_image: 'http://localhost:3001/images/skol_269ml.jpg',
        quantity: 7,
      },
    ],
  };

  useEffect(() => {
    setOrder(orderMock);
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
              {`P. Vend: ${order.seller}`}
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
              {`TOTAL R$${(order.products
                .reduce((prev, curr) => prev + curr.price * curr.quantity, 0))
                .toFixed(2)}`}
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
