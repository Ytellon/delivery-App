import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import ProductCards from '../components/productCards';
import { getProducts } from '../utils/requests';
import './CustomerProducts.css';

export default function CustomerProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState('0,00');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    }

    const fetchProducts = async () => {
      try {
        const apiProducts = await getProducts('/products', user.token);
        setProducts(apiProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleOrders = (id, quantity) => {
    const returnNumber = -1;
    const product = orders.findIndex((item) => item.id === id);
    if (product !== returnNumber) {
      orders[product].quantity = quantity;
      setOrders(orders);
    } else {
      const newOrder = products[id - 1];
      newOrder.quantity = quantity;
      orders.push(newOrder);
      setOrders(orders);
    }
    setTotalPrice(orders.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)
      .toFixed(2).replace('.', ','));
    localStorage.setItem('orders', JSON.stringify(orders));
  };

  return (
    <div>
      <Header />
      <div className="products">
        {
          products?.map((product, index) => (
            <ProductCards
              key={ index }
              product={ product }
              handleOrders={ handleOrders }
            />
          ))
        }
      </div>
      <button
        className={ `button-cart ${(totalPrice === '0,00') && 'hidden'}` }
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => navigate('/customer/checkout') }
        disabled={ totalPrice === '0,00' }
      >
        Finalizar Pedido - R$
        <span data-testid="customer_products__checkout-bottom-value">
          { totalPrice }
        </span>
      </button>
    </div>
  );
}
