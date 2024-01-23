import { currencyFormater } from "../utils/currency.js";
import { getProduct } from "../../data/products.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import {
  getDeliveryOption,
  deliveryOptions,
  calculateDeliveryDate,
} from "../../data/deliveryOptions.js";
import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";

export function renderOrderSummary() {
  let orderItemSection = "";

  cart.forEach((cartItem) => {
    const matchedProduct = getProduct(cartItem.productId);

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    orderItemSection += `
      <div class="order-item-container order-item-container-${
        matchedProduct.id
      }">
        <div class="order-item-delivery-date">
          Delivery date: ${calculateDeliveryDate(deliveryOption.deliveryDays)}
        </div>
        <div class="order-item-grid">
          <div class="product-details-container">
              <img
              class="product-image"
              src="${matchedProduct.image}"
              alt=""
              />
              <div class="product-details">
              <div class="product-name">
                  ${matchedProduct.name}
              </div>
              <div class="product-price">$${currencyFormater(
                matchedProduct.priceInCents
              )}</div>
              <div class="product-quantity">
                  <div>Quantity: <span class="quantity-label-${
                    matchedProduct.id
                  } quantity-label">${cartItem.quantity}</span></div>
                  <button data-product-id="${
                    matchedProduct.id
                  }" class="update-quantity-btn">Update</button>
                  <input min="1" max="999" 
                    data-product-id="${matchedProduct.id}"
                    value="${cartItem.quantity}" 
                    class="update-quantity-input update-quantity-input-${
                      matchedProduct.id
                    }" type="number">
                  <button class="update-quantity-save-btn" data-product-id="${
                    matchedProduct.id
                  }">Save</button>
                  <button data-product-id="${
                    matchedProduct.id
                  }" class="delete-quantity-btn">Delete</button>
              </div>
              </div>
          </div>
          <div class="delivery-option-container">
            <div class="delivery-option-description">
              Choose a delivery option:
            </div>
            <div class="delivery-options">
              ${deliveryOptionsHTML(matchedProduct, deliveryOption)}
            </div>
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(matchedProduct, deliveryOption) {
    let html = "";
    deliveryOptions.forEach((option) => {
      const { id: optionId, deliveryDays, priceInCents } = option;
      const dateString = calculateDeliveryDate(deliveryDays);
      const priceString = priceInCents
        ? `$${currencyFormater(priceInCents)} -`
        : "FREE";

      html += `<div class="delivery-option">
                <input class="delivery-option-btn" ${
                  deliveryOption.id === optionId && "checked"
                } 
                  data-product-id="${matchedProduct.id}"
                  data-option-id="${optionId}"
                  type="radio" name="${matchedProduct.id}" id="${
        matchedProduct.id
      }-${optionId}" />
                <label for="${matchedProduct.id}-${optionId}">
                  <div class="delivery-option-date">${dateString}</div>
                  <div class="delivery-option-desc">${priceString} Shipping</div>
                </label>
              </div>`;
    });
    return html;
  }

  const orederItemSectionElement = document.querySelector(
    ".order-summery-section"
  );
  orederItemSectionElement.innerHTML = orderItemSection;

  const deleteBtnElements = document.querySelectorAll(".delete-quantity-btn");
  deleteBtnElements.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const { productId } = deleteBtn.dataset;

      removeFromCart(productId);

      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  const updateBtnElements = document.querySelectorAll(".update-quantity-btn");
  updateBtnElements.forEach((updateBtn) => {
    updateBtn.addEventListener("click", () => {
      const { productId } = updateBtn.dataset;

      const itemContainer = document.querySelector(
        `.order-item-container-${productId}`
      );
      itemContainer.classList.add("is-editing-quantity");
    });
  });

  function saveQuantity(productId) {
    const inputQuantityElement = document.querySelector(
      `.update-quantity-input-${productId}`
    );
    const quantity = Number(inputQuantityElement.value);
    if (quantity < 1 || quantity >= 1000) {
      alert("quantity must be atleast 1 and less than 1000");
      return;
    }

    updateQuantity(productId, quantity);

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  }

  const saveBtnElement = document.querySelectorAll(".update-quantity-save-btn");
  saveBtnElement.forEach((saveBtn) => {
    saveBtn.addEventListener("click", () => {
      const { productId } = saveBtn.dataset;

      saveQuantity(productId);
    });
  });

  const quantityInputElements = document.querySelectorAll(
    ".update-quantity-input"
  );
  quantityInputElements.forEach((quantityInput) => {
    quantityInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const { productId } = quantityInput.dataset;
        saveQuantity(productId);
      }
    });
  });

  const deliveryOptionElements = document.querySelectorAll(
    ".delivery-option-btn"
  );
  deliveryOptionElements.forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, optionId } = element.dataset;
      updateDeliveryOption(productId, optionId);

      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
