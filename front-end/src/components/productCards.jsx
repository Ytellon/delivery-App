import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './button';
import Input from './input';
import convertNumber from '../utils/convertNumber';

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
    <div>
      <span data-testid={ `customer_products__element-card-title-${id}` }>
        {name}
      </span>

      <span data-testid={ `customer_products__element-card-price-${id}` }>
        {convertNumber(price)}
      </span>

      <img
        style={ { width: '70px', height: '70px' } }
        src={ urlImage }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />

      <Button
        type="button"
        dataTestId={ `customer_products__button-card-rm-item-${id}` }
        onClick={ () => selectQuantity(quantitys - 1) }
        disabled={ false }
        name="-"
      />

      <Input
        type="number"
        dataTestId={ `customer_products__input-card-quantity-${id}` }
        onChange={ (e) => selectQuantity(Number(e.target.value)) }
        placeholder="Quantidade"
        id="quantity"
        name=""
        value={ quantitys }
      />

      <Button
        type="button"
        dataTestId={ `customer_products__button-card-add-item-${id}` }
        onClick={ () => selectQuantity(quantitys + 1) }
        name="+"
        disabled={ false }
      />
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
