import { useEffect, useState } from 'react';
import CardOrder from '../components/cardOrder';
import Header from '../components/header';
import { getRequest } from '../utils/requests';
import './Order.css';

export default function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const data = await getRequest('/orders', {
        headers: { Authorization: user.token },
      });
      console.log(data);
      setOrders(data);
    };
    getOrders();
  }, []);

  return (
    <div>
      <Header />
      <div className="horizontal-container orders">
        {orders?.map((order, index) => (
          <CardOrder key={ index } order={ order } roll="customer" />
        ))}
      </div>
    </div>
  );
}
