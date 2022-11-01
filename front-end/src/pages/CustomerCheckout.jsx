import React, { useState } from 'react';

function CustomerCheckout() {
  const [sellerId, setSellerId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');

  return (
    <div>
      {/* <NavBar /> */}
      <h2>Finalizar Pedido</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody />
      </table>

      <section>
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <select
            name="seller"
            id="seller"
            data-testid="customer_checkout__select-seller"
            value={ sellerId }
            onChange={ ({ target }) => setSellerId(target.value) }
          >
            {/* { renderSellersOptions() } */}
          </select>
        </label>

        <label htmlFor="address">
          Endereço:
          <input
            data-testid="customer_checkout__input-address"
            type="text"
            id="address"
            value={ deliveryAddress }
            onChange={ ({ target }) => setDeliveryAddress(target.value) }
          />
        </label>

        <label htmlFor="addressNumber">
          Número:
          <input
            data-testid="customer_checkout__input-addressNumber"
            type="text"
            id="addressNumber"
            value={ deliveryNumber }
            onChange={ ({ target }) => setDeliveryNumber(target.value) }
          />
        </label>

        <button
          data-testid="customer_checkout__button-submit-order"
          type="submit"
          onClick={ (e) => handleSubmit(e) }
        >
          Finalizar Pedido
        </button>
      </section>

    </div>
  );
}

export default CustomerCheckout;
