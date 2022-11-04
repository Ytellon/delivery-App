import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import ProductCards from '../components/productCards';
import { getProducts } from '../utils/requests';

export default function CustomerProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
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

    console.log(products);
    fetchProducts();
  }, [navigate]);

  return (
    <div>
      <Header />
      {
        products?.map((product, index) => (
          <ProductCards
            key={ index }
            product={ product }
          />
        ))
      }
    </div>
  );
}
