import Navbar from '../components/header';
import Button from '../components/button';

function OrderDatailsSaller() {
  <div>
    <Navbar />
    <h2 data-testid="seller_order_details__element-order-details-label-order-id">
      Pedido
    </h2>

    <span data-testid="seller_order_details__element-order-details-label-order-date">
      11/11/1111
    </span>

    <span data-testid="seller_order_details__element-order-details-label-delivery-status">
      status pedido
    </span>

    <Button
      type="button"
      data-testid="seller_order_details__button-preparing-check"
      name="PREPARAR PEDIDO"
    />

    <Button
      type="button"
      data-testid="seller_order_details__button-dispatch-check"
      name="SAIU PARA ENTREGA"
    />

    <span data-testid="seller_order_details__element-order-table-item-number-<index>">
      número do pedido
    </span>

    <span data-testid="seller_order_details__element-order-table-name-<index>">
      nome do pedido
    </span>

    <span data-testid="seller_order_details__element-order-table-quantity-<index>">
      quantidade
    </span>

    <span data-testid="seller_order_details__element-order-table-unit-price-<index>">
      valor da unidade
    </span>

    <span data-testid="seller_order_details__element-order-table-sub-total-<index>">
      valor total de um pedido
    </span>

    <span data-testid="seller_order_details__element-order-total-price">
      TOTAL:
    </span>
  </div>;
}

export default OrderDatailsSaller;
