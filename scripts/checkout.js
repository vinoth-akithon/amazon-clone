import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { currencyFormater } from "./utils/currency.js";


populateHTML();


function populateHTML() {
  let orderItemSection = "";

  cart.forEach((cartItem) => {
    const matchedProduct = products.find(
      (product) => product.id === cartItem.productId
    );

    orderItemSection += `
          <div class="order-item-container">
              <div class="order-item-delivery-date">
              Delivery date: Tuesday, June 21
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
                      <div>Quantity: ${cartItem.quantity}</div>
                      <button class="update-quantity-btn">Update</button>
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
                  <div class="delivery-option">
                  <input type="radio" checked name="${matchedProduct.id}" id="${
      matchedProduct.id
    }-free" />
                  <label for="${matchedProduct.id}-free">
                      <div class="delivery-option-date">Tuesday, June 21</div>
                      <div class="delivery-option-desc">FREE Shipping</div>
                  </label>
                  </div>
                  <div class="delivery-option">
                  <input type="radio" name="${matchedProduct.id}" id="${
      matchedProduct.id
    }-4.99" />
                  <label for="${matchedProduct.id}-4.99">
                      <div class="delivery-option-date">Wednesday, June 15</div>
                      <div class="delivery-option-desc">$4.99 Shipping</div>
                  </label>
                  </div>
                  <div class="delivery-option">
                  <input type="radio" name="${matchedProduct.id}" id="${
      matchedProduct.id
    }-9.99" />
                  <label for="${matchedProduct.id}-9.99">
                      <div class="delivery-option-date">Monday, June 13</div>
                      <div class="delivery-option-desc">$9.99 Shipping</div>
                  </label>
                  </div>
              </div>
              </div>
          </div>
          `;
  });

  const orederItemSectionElement = document.querySelector(
    ".order-summery-section"
  );
  orederItemSectionElement.innerHTML = orderItemSection;
  
  const deleteBtnElements = document.querySelectorAll(".delete-quantity-btn");
  deleteBtnElements.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const { productId } = deleteBtn.dataset;
      removeFromCart(productId);
      populateHTML();
    });
  });
}

