import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './button';
import Input from './input';

function ProductCards({ product }) {
  const { id, name, price, urlImage } = product;
  const [quantitys, setQuantitys] = useState(0);

  const addProduct = () => {
    setQuantitys(+quantitys + 1);
  };

  const removeProduct = () => {
    if (quantitys >= 0) setQuantitys(+quantitys - 1);
  };

  return (
    <div>
      <span data-testid={ `customer_products__element-card-title-${id}` }>
        {name}
      </span>

      <span data-testid={ `customer_products__element-card-price-${id}` }>
        {`R$ ${price.replace('.', ',')}`}
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
        onClick={ removeProduct }
        disabled={ false }
        name="-"
      />

      <Input
        type="number"
        dataTestId={ `customer_products__input-card-quantity-${id}` }
        onChange={ (e) => setQuantitys(e.target.value) }
        placeholder="Quantidade"
        id="quantity"
        name=""
        value={ quantitys }
      />

      <Button
        type="button"
        dataTestId={ `customer_products__button-card-add-item-${id}` }
        onClick={ addProduct }
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
