import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/button';
import Input from '../components/input';
import Header from '../components/header';
import convertNumber from '../utils/convertNumber';
import './CustomerCheckout.css';

function CustomerCheckout() {
  const navigate = useNavigate();
  const [sellerId, setSellerId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);

  const totalPriceCheckout = () => {
    const cart = JSON.parse(localStorage.getItem('orders'));
    setProducts(cart);
    const total = cart.reduce((acc, { price, quantity }) => acc + (price * quantity), 0);

    setTotalPrice(total);
  };

  const removeItem = (index) => {
    const itens = products.filter((order, i) => i !== index);
    setProducts(itens);

    localStorage.orders = JSON.stringify(itens);

    totalPriceCheckout();
  };

  const renderOrders = () => (
    products?.map((order, i) => (
      <tr className={ (i < products.length - 1) && 'tr-border' } key={ i }>
        <td
          className="td-item"
          data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
        >
          {i + 1}
        </td>
        <td
          data-testid={ `customer_checkout__element-order-table-name-${i}` }
        >
          {order.name}
        </td>
        <td
          data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
        >
          {order.quantity}
        </td>
        <td
          data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
        >
          {convertNumber(order.price)}
        </td>
        <td
          data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
        >
          {convertNumber(order.price * order.quantity)}
        </td>
        <td>
          <button
            data-testid={ `customer_checkout__element-order-table-remove-${i}` }
            type="button"
            onClick={ () => removeItem(i) }
          >
            X
          </button>
        </td>
      </tr>
    ))
  );

  const renderSellersOptions = () => (
    sellers.map(({ name, id }) => (
      <option key={ id } value={ id }>{name}</option>))
  );

  const getSellers = async () => {
    const response = await axios.get('http://localhost:3001/sellers');

    setSellerId(response.data[0].id);
    setSellers(response.data);
  };

  const createSale = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const productsToSale = products
      .map(({ id, quantity }) => ({ productId: id, quantity }));
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3001/orders',
      headers: { authorization: user.token },
      data: {
        userId: user.id,
        sellerId,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        saleProducts: productsToSale,
      },
    });
    console.log(response.data);
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await createSale();
    navigate(`/customer/orders/${data.id}`);
  };

  useEffect(() => {
    totalPriceCheckout();
    getSellers();
  }, []);

  return (
    <div>
      <Header />
      <div className="vertical-container checkout">
        <h1 className="title">Finalizar Pedido</h1>
        <table>
          <thead>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </thead>
          <tbody>
            {renderOrders()}
          </tbody>
        </table>
        <h1
          className="checkout-price"
          data-testid="customer_checkout__element-order-total-price"
        >
          {`Total: ${convertNumber(totalPrice)}`}
        </h1>
        <form className="horizontal-container">
          <label htmlFor="seller">
            <h4>P. Vendedora Responsável</h4>
            <select
              name="seller"
              id="seller"
              data-testid="customer_checkout__select-seller"
              value={ sellerId }
              onChange={ ({ target }) => setSellerId(target.value) }
            >
              { renderSellersOptions() }
            </select>
          </label>

          <Input
            classes="large-input"
            name="Endereço"
            type="text"
            dataTestId="customer_checkout__input-address"
            value={ deliveryAddress }
            onChange={ ({ target }) => setDeliveryAddress(target.value) }
            placeholder="Endereço"
            disabled={ false }
          />

          <Input
            name="Número"
            type="text"
            dataTestId="customer_checkout__input-address-number"
            value={ deliveryNumber }
            onChange={ ({ target }) => setDeliveryNumber(target.value) }
            placeholder="número"
            disabled={ false }
          />
        </form>
        <Button
          classes="checkout-button"
          name="FINALIZAR PEDIDO"
          type="submit"
          dataTestId="customer_checkout__button-submit-order"
          disabled={ false }
          onClick={ (e) => handleSubmit(e) }
        />
      </div>
    </div>
  );
}

export default CustomerCheckout;
