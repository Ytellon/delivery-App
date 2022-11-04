import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './button';

function NavBar() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div>
      <nav>
        <Button
          type="button"
          dataTestId="customer_products__element-navbar-link-products"
          name="Produtos"
          onClick={ () => navigate('/customer/products') }
          disabled={ false }
        />

        <Button
          type="button"
          dataTestId="customer_products__element-navbar-link-orders"
          name="Pedidos"
          onClick={ () => navigate('/customer/checkout') }
          disabled={ false }
        />

        <span data-testid="customer_products__element-navbar-user-full-name">
          {user?.name}
        </span>

        <Button
          type="button"
          dataTestId="customer_products__element-navbar-link-logout"
          onClick={ () => navigate('/login') }
          disabled={ false }
        />

      </nav>
    </div>
  );
}

export default NavBar;
