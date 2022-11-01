import { useEffect, useState } from 'react';
import CardOrder from '../components/cardOrder';
import Header from '../components/header';
import { getRequest } from '../utils/requests';

export default function Order() {
  const [orders, setOrders] = useState([]);

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
