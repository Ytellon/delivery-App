import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './button';
import Input from './input';
import convertNumber from '../utils/convertNumber';
import './productCards.css';

function ProductCards({ product, handleOrders }) {
  const { id, name, price, urlImage } = product;
  const [quantitys, setQuantitys] = useState(0);

  const selectQuantity = (quantity) => {
    if (quantity >= 0) {
      setQuantitys(quantity);
      handleOrders(id, quantity);
    }
  };

  return (
    <div className="product-card vertical-container">
      <img
        src={ urlImage }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />

      <span
        className="product-name"
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name}
      </span>

      <span
        className="product-price"
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {convertNumber(price)}
      </span>

      <div className="horizontal-container product-quantity">
        <Button
          classes="product-button product-button-left"
          type="button"
          dataTestId={ `customer_products__button-card-rm-item-${id}` }
          onClick={ () => selectQuantity(quantitys - 1) }
          disabled={ false }
          name="-"
        />

        <Input
          classes="product-input"
          type="number"
          dataTestId={ `customer_products__input-card-quantity-${id}` }
          onChange={ (e) => selectQuantity(Number(e.target.value)) }
          placeholder="Quantidade"
          id="quantity"
          name=""
          value={ quantitys }
        />

        <Button
          classes="product-button product-button-right"
          type="button"
          dataTestId={ `customer_products__button-card-add-item-${id}` }
          onClick={ () => selectQuantity(quantitys + 1) }
          name="+"
          disabled={ false }
        />
      </div>
    </div>
  );
}

ProductCards.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  urlImage: PropTypes.string,
  id: PropTypes.number,
}.isRequired;

export default ProductCards;
