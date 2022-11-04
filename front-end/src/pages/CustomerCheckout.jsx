import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import Input from '../components/input';
import Header from '../components/header';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
// import axios from 'axios';

function CustomerCheckout() {
  const navigate = useNavigate();
  const [sellerId, setSellerId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [token, setToken] = useState('');
  // const [sellers, setSellers] = useState([]);

  const totalPriceCheckout = () => {
    const cart = JSON.parse(localStorage.getItem('carrinho'));

    let total = 0;
    Object.values(cart).forEach(({ quantity, price }) => {
      total += quantity * price;
    });

    setTotalPrice(total);
    setLocalStorage('totalPrice', total);
  };

  const removeItem = (index, name) => {
    const itens = orders.filter((order, i) => i !== index);
    setOrders(itens);

    const cart = getLocalStorage('carrinho');
    delete cart[name];
    setLocalStorage('carrinho', cart);

    totalPriceCheckout();
  };

  const renderOrders = () => (
    orders.map((order, i) => (
      <tr key={ i }>
        <td
          data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
        >
          {i + 1}
        </td>
        <td
          data-testid={ `customer_checkout__element-order-table-name-${i}` }
        >
          {order[0]}
        </td>
        <td
          data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
        >
          {order[1].quantity}
        </td>
        <td
          data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
        >
          {Number(order[1].price).toFixed(2).replace('.', ',')}
        </td>
        <td
          data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
        >
          {Number(order[1].price * order[1].quantity).toFixed(2).replace('.', ',')}
        </td>
        <td>
          <button
            data-testid={ `customer_checkout__element-order-table-remove-${i}` }
            type="button"
            onClick={ () => removeItem(i, order[0]) }
          >
            X
          </button>
        </td>
      </tr>
    ))
  );

  // const renderSellersOptions = () => (
  //   sellers.map(({ name, id }) => (
  //     <option key={ id } value={ id }>{name}</option>))
  // );

  // const initialState = () => {
  //   setTotalPrice(getLocalStorage('totalPrice'));
  //   setUserId(getLocalStorage('user').id);
  //   setToken(getLocalStorage('user').token);
  //   setOrders(Object.entries(getLocalStorage('carrinho')));
  // };

  // const getSellers = async () => {
  //   const response = await axios.get('http://localhost:3001/seller');

  //   setSellerId(response.data[0].id);
  //   setSellers(response.data);
  // };

  // const createSale = async () => {
  //   const response = await axios({
  //     method: 'post',
  //     url: 'http://localhost:3001/orders',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await createSale();
    setLocalStorage('orderInfo', data);
    navigate(`/customer/orders/${data.id}`);
  };

  // useEffect(() => {
  //   initialState();
  //   getSellers();
  // }, []);

  return (
    <div>
      <Header />
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
          {renderOrders()}
        </tbody>
      </table>
      <p
        data-testid="customer_checkout__element-order-total-price"
      >
        { Number(totalPrice).toFixed(2).replace('.', ',') }
      </p>
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

        <Input
          name="Endereço"
          type="text"
          data-testid="customer_checkout__input-address"
          dataTestId="address"
          value={ deliveryAddress }
          onChange={ ({ target }) => setDeliveryAddress(target.value) }
          placeholder="Endereço"
          disabled={ false }
        />

        <Input
          name="Número"
          type="text"
          data-testid="customer_checkout__input-address-number"
          dataTestId="addressNumber"
          value={ deliveryNumber }
          onChange={ ({ target }) => setDeliveryNumber(target.value) }
          placeholder="número"
          disabled={ false }
        />

        <Button
          name="FINALIZAR PEDIDO"
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          dataTestId="finishOrder"
          disabled={ false }
          onClick={ (e) => handleSubmit(e) }
        />
      </section>

    </div>
  );
}

export default CustomerCheckout;
