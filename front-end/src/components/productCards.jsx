import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './button';
import Input from './input';

function ProductCards({ ProductName, ProductPrice, ProductImg, ProductId }) {
  const [quantitys, setQuantitys] = useState(0);

  const addProduct = () => {
    setQuantitys(+quantitys + 1);
  };

  const removeProduct = () => {
    if (quantitys >= 0) setQuantitys(+quantitys - 1);
  };

  return (
    <div>
      <span data-testid={ `customer_products__element-card-title-${ProductId}` }>
        {ProductName}
      </span>

      <span data-testid={ `customer_products__element-card-price-${ProductId}` }>
        {`R$ ${ProductPrice.replace('.', ',')}`}
      </span>

      <img
        src={ ProductImg }
        alt={ ProductName }
        data-testid={ `customer_products__img-card-bg-image-${ProductId}` }
      />

      <Button
        type="button"
        dataTestId={ `customer_products__button-card-add-item-${ProductId}` }
        onChange={ addProduct }
        name="+"
      />

      <Button
        type="button"
        dataTestId={ `customer_products__button-card-rm-item-${ProductId}` }
        onChange={ removeProduct }
        name="-"
      />

      <Input
        type="number"
        value={ quantitys }
        dataTestId={ `customer_products__input-card-quantity-${ProductId}` }
        onChange={ (e) => setQuantitys(e.target.value) }
      />
    </div>
  );
}

ProductCards.propTypes = {
  ProductName: PropTypes.string,
  ProductPrice: PropTypes.number,
  ProductImg: PropTypes.string,
  ProductId: PropTypes.number,
}.isRequired;

export default ProductCards;
