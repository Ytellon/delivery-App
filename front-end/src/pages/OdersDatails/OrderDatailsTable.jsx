import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import OrderDatailsItems from './OrderDatailsItems';

function OrderDatailsTable(props) {
  const [orders, setOrders] = useState([]);
  const { orderId } = props;
  const { users, setUsers } = useState('');
  const navigate = useNavigate();

  const fetchSallesProductById = async (id) => {
    const response = await fetch(`http://localhost:3001/sales/sp/${id}`);
    const result = await response.json();
    return result;
  };

  const fetchProductById = async (id) => {
    const response = await fetch(`http://localhost:3001/products/${id}`);
    const result = await response.json();
    return result;
  };
  const getSallers = async () => {
    const fetch = await fetchSallesProductById(orderId);
    await fetch.forEach(async (item) => {
      const fetchProduct = await fetchProductById(item.productId);
      fetchProduct.quantity = item.quantity;
      setOrders((prevState) => [...prevState, fetchProduct]);
    });
  };

  const getUser = () => {
    if (navigate.pathname.includes('customer')) {
      setUsers('customer');
    } else if (navigate.pathname.includes('seller')) {
      setUsers('seller');
    }
  };

  useEffect(() => {
    getSallers();
    getUser();
  }, []);

  return (
    <div>
      {orders && (
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-Total</th>
            </tr>
          </thead>

          {orders.map((product, index) => (
            <OrderDatailsItems
              key={ index }
              user={ users }
              i={ index }
              description={ product.name }
              quantitys={ product.quantity }
              prices={ Number(product.prices) }
            />
          ))}
        </table>
      )}
    </div>
  );
}

OrderDatailsTable.propTypes = {
  orderId: PropTypes.number,
}.isRequired;

export default OrderDatailsTable;
