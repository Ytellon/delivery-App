import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import CardOrder from '../components/cardOrder';
import { getProducts } from '../utils/requests';
import './Order.css';

export default function SellerOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const getOrders = async () => {
      const response = await getProducts('/orders', user.token);
      setOrders(response);
    };
    getOrders();
  }, []);
  return (
    <div>
      <Header />
      <div className="horizontal-container orders">
        {orders.map((order) => (
          <CardOrder
            key={ order.id }
            order={ order }
            roll="seller"
          />
        ))}
      </div>
    </div>
  );
}
