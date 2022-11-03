import { useEffect, useState } from 'react';
import CardOrder from '../components/cardOrder';
import Header from '../components/header';
import { getRequest } from '../utils/requests';

export default function Order() {
  const [orders, setOrders] = useState([]);

  // const mockOrders = [
  //   {
  //     id: 1,
  //     status: 'Entregue',
  //     sale_date: '2021-07-01T00:00:00.000Z',
  //     total_price: '100.00',
  //     delivery_address: 'Rua das Flores',
  //     delivery_number: '123',
  //   },
  //   {
  //     id: 2,
  //     status: 'Pendente',
  //     sale_date: '2021-07-02T00:00:00.000Z',
  //     total_price: '200.00',
  //     delivery_address: 'Rua das Flores',
  //     delivery_number: '123',
  //   },
  // ];

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await getRequest('/orders');
      setOrders(data);
    };
    getOrders();
  }, []);

  return (
    <div>
      <Header />
      { orders.map((order, index) => (
        <CardOrder
          key={ index }
          order={ order }
        />
      ))}
    </div>
  );
}
