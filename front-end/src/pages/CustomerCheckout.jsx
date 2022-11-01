import React, { useState } from 'react';
// import NavBar from '../components/navBar';
// import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
// import axios from 'axios';

function CustomerCheckout() {
  const [sellerId, setSellerId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');

  // const totalPriceCheckout = () => {
  //   const cart = JSON.parse(localStorage.getItem('carrinho'));

  //   let total = 0;
  //   Object.values(cart).forEach(({ quantity, price }) => {
  //     total += quantity * price;
  //   });

  //   setTotalPrice(total);
  //   setLocalStorage('totalPrice', total);
  // };

  // const renderOrders = () => (
  //   orders.map((order, i) => (
  //     <tr key={ i }>
  //       <td
  //         data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
  //       >
  //         {i + 1}
  //       </td>
  //       <td
  //         data-testid={ `customer_checkout__element-order-table-name-${i}` }
  //       >
  //         {order[0]}
  //       </td>
  //       <td
  //         data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
  //       >
  //         {order[1].quantity}
  //       </td>
  //       <td
  //         data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
  //       >
  //         {Number(order[1].price).toFixed(2).replace('.', ',')}
  //       </td>
  //       <td
  //         data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
  //       >
  //         {Number(order[1].price * order[1].quantity).toFixed(2).replace('.', ',')}
  //       </td>
  //       <td>
  //         <button
  //           data-testid={ `customer_checkout__element-order-table-remove-${i}` }
  //           type="button"
  //           onClick={ () => removeItem(i, order[0]) }
  //         >
  //           X
  //         </button>
  //       </td>
  //     </tr>
  //   ))
  // );

  // const renderSellersOptions = () => (
  //   sellers.map(({ name, id }) => (
  //     <option key={ id } value={ id }>{name}</option>))
  // );

  // const createSale = async () => {
  //   const response = await axios({
  //     method: 'post',
  //     // url: 'http://localhost:3001/orders',
  //     headers: { authorization: token },
  //     data: {
  //       userId,
  //       sellerId,
  //       totalPrice,
  //       deliveryAddress,
  //       deliveryNumber,
  //       saleDate: Date.now(),
  //       status: 'Pendente',
  //       cart: getLocalStorage('carrinho'),
  //     },
  //   });
  //   return response.data;
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = await createSale();
  //   setLocalStorage('orderInfo', data);
  //   navigate(`/customer/orders/${data.id}`);
  // };

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
        <tbody>
          {/* {renderOrders()} */}
        </tbody>
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
