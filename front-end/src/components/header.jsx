import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './button';

export default function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    setUser(userStorage);
  }, []);

  return (
    <header>
      <nav>
        <Button
          type="button"
          name="Produtos"
          dataTestId="customer_products__element-navbar-link-products"
          onClick={ () => navigate('/customer/products') }
          disabled={ false }
        />
        <Button
          type="button"
          name="Meus pedidos"
          dataTestId="customer_products__element-navbar-link-orders"
          onClick={ () => navigate('/customer/checkout') }
          disabled={ false }
        />
      </nav>
      <nav>
        <h3
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {user?.name}

        </h3>
        <Button
          type="button"
          name="Sair"
          dataTestId="customer_products__element-navbar-link-logout"
          onClick={ () => {
            navigate('/login');
            localStorage.removeItem('user');
          } }
          disabled={ false }
        />
      </nav>
    </header>
  );
}
