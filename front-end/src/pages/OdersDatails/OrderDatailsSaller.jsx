import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/header';
import Button from '../../components/button';
import OrderDatailsTable from './OrderDatailsTable';

function OrderDatailsSaller() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [prepareOrder, setPrepareOrder] = useState(true);
  const [deliveryOrder, setDeliveryOrder] = useState(true);

  const fetchSaleById = async (ids) => {
    const response = await fetch(`http://localhost:3001/sales/${ids}`);
    const result = await response.json();
    return result;
  };

  const fetchUserById = async (ids) => {
    const response = await fetch(`http://localhost:3001/users/${ids}`);
    const result = await response.json();
    return result;
  };

  const setSalesDate = async () => {
    const fetch = await fetchSaleById(id);
    const [date] = fetch.saleDate.split('T');
    const [year, month, day] = date.split('-');
    fetch.saleDate = `${day}/${month}/${year}`;
    const { name } = await fetchUserById(fetch.sallerId);
    fetch.saller = name;
    fetch.totalPrice = fetch.totalPrice.replace('.', ',');

    if (fetch.status === 'PENDENTE') {
      setPrepareOrder(false);
      setDeliveryOrder(true);
    }
    if (fetch.status === 'PREPARANDO') {
      setPrepareOrder(true);
      setDeliveryOrder(false);
    }
    if (fetch.status === 'EM TRÂNSITO' || fetch.status === 'ENTREGUE') {
      setPrepareOrder(true);
      setDeliveryOrder(true);
    }
    setOrders(fetch);
  };

  const orderStatus = async (status) => {
    await fetch('http://localhost:3001/sales', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: id,
        status,
      }),
    });
    setSalesDate();
  };

  useEffect(() => {
    setSalesDate();
  }, []);

  return (
    <div>
      <Navbar />
      <h2 data-testid="seller_order_details__element-order-details-label-order-id">
        Pedido
        {id}
      </h2>
      {orders
      && (
        <div>
          <span
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            {orders.saleDate}
          </span>

          <span
            data-testid={ 'seller_order_details__element-order-details-'
            + 'label-delivery-status' }
          >
            {orders.status}
          </span>
        </div>
      )}

      <Button
        type="button"
        data-testid="seller_order_details__button-preparing-check"
        name="PREPARAR PEDIDO"
        disabled={ prepareOrder }
        onClick={ () => orderStatus('PREPARANDO') }
      />

      <Button
        type="button"
        data-testid="seller_order_details__button-dispatch-check"
        name="SAIU PARA ENTREGA"
        disabled={ deliveryOrder }
        onClick={ () => orderStatus('EM TRÂNSITO') }
      />

      <OrderDatailsTable orderId={ Number(id) } />

      <span data-testid="seller_order_details__element-order-total-price">
        {`TOTAL: ${orders.totalPrice}`}
      </span>
    </div>
  );
}

export default OrderDatailsSaller;
