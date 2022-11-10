import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/button';
import ProductList from '../components/productList';
import { getRequest, putRequest } from '../utils/requests';
import Header from '../components/header';
import getFormattedDate from '../utils/getFormattedDate';
import { getLocalStorage } from '../utils/localStorage';

export default function SellerOrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState();

  useEffect(() => {
    const getOrder = async () => {
      const response = await getRequest(`/orders/${id}`);

      setOrder(response);
    };

    getOrder();
  }, [id]);

  const changeOrderStatus = async (status) => {
    try {
      const user = getLocalStorage('user');

      const config = {
        headers: {
          authorization: user.token,
        },
      };

      const body = {
        status,
      };

      await putRequest(`/orders/${id}`, body, config);
    } catch (error) {
      console.log(error);
    }
  };

  const datatestId = 'seller_order_details';
  const itemId = '__element-order-details-label-order-id';
  const sellerId = '__element-order-details-label-seller-name';
  const dateId = '__element-order-details-label-order-date';
  const statusId = '__element-order-details-label-delivery-status';
  const totalPriceId = '__element-order-total-price';
  const preparingCheckId = '__button-preparing-check';
  const dispatchCheckId = '__button-dispatch-check';

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
              dataTestId={ datatestId + preparingCheckId }
              name="PREPARAR PEDIDO"
              disabled={ order.status !== 'Pendente' }
              onClick={ () => changeOrderStatus('Preparando') }
              type="button"
            />
            <Button
              dataTestId={ datatestId + dispatchCheckId }
              name="SAIU PARA ENTREGA"
              disabled={ order.status !== 'Preparando' }
              onClick={ () => changeOrderStatus('Em Trânsito') }
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
