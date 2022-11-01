import React, { useState, useEffect } from 'react';

function NavBar() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div>
      <nav>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </button>

        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Pedidos
        </button>

        <span data-testid="customer_products__element-navbar-user-full-name">
          {user?.name}
        </span>

        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </button>

      </nav>
    </div>
  );
}

export default NavBar();
