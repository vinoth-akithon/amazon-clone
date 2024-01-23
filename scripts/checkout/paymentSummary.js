import { cart, getTotalQuantity } from "../../data/cart.js";
import { getDeliveryOption, deliveryOptions } from "../../data/deliveryOptions.js";
import { products, getProduct } from "../../data/products.js";
import { currencyFormater } from "../utils/currency.js";

export function renderPaymentSummary() {
  let totalQuantity = 0;
  let totalPrice = 0;
  let shippingPrice = 0;

  cart.forEach((cartItem) => {
    const { productId, quantity, deliveryOptionId } = cartItem;
    totalQuantity += quantity;

    const { priceInCents } = getProduct(productId);
    totalPrice += quantity * priceInCents;

    const deliveryOption = getDeliveryOption(deliveryOptionId);
    shippingPrice += deliveryOption.priceInCents;
  });

  const totalPriceBeforeTax = totalPrice + shippingPrice;
  const estimatedTax = totalPriceBeforeTax / 10;
  const orderTotal = totalPriceBeforeTax + estimatedTax;

  const paymentSummaryElement = document.querySelector(
    ".payment-summary-container"
  );
  paymentSummaryElement.innerHTML = `
    <div class="heading">Order Summary</div>
    <div class="payment-summary-items payment-summary-flex">
        <div class="items-text">Items (${totalQuantity}):</div>
        <div class="items-price">$${currencyFormater(totalPrice)}</div>
    </div>
    <div class="payment-summary-shipping payment-summary-flex">
        <div class="shipping-text">Shipping & handling:</div>
        <div class="shipping-price">$${currencyFormater(shippingPrice)}</div>
    </div>
    <div class="payment-summary-before-tax payment-summary-flex">
        <div class="before-tax-text">Total before tax:</div>
        <div class="before-tax-price">$${currencyFormater(
          totalPriceBeforeTax
        )}</div>
    </div>
    <div class="payment-summary-estimated-tax payment-summary-flex">
        <div class="estimated-tax-text">Estimated tax (10%):</div>
        <div class="estimated-tax-price">$${currencyFormater(
          estimatedTax
        )}</div>
    </div>
    <div class="payment-summary-total payment-summary-flex">
        <div class="order-total-text">Order total:</div>
        <div class="order-total-price">$${currencyFormater(orderTotal)}</div>
    </div>
    <button class="place-order-btn">Place your order</button>
`;
}