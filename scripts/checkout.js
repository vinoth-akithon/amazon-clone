import {
  cart,
  removeFromCart,
  getTotalQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { currencyFormater } from "./utils/currency.js";

function updateCartQuantity() {
  document.querySelector(".total-quantity").innerHTML = getTotalQuantity();
}

updateCartQuantity();

let orderItemSection = "";

cart.forEach((cartItem) => {
  const matchedProduct = products.find(
    (product) => product.id === cartItem.productId
  );

  orderItemSection += `
        <div class="order-item-container order-item-container-${
          matchedProduct.id
        }">
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
                    <div>Quantity: <span class="quantity-label-${
                      matchedProduct.id
                    } quantity-label">${cartItem.quantity}</span></div>
                    <button data-product-id="${
                      matchedProduct.id
                    }" class="update-quantity-btn">Update</button>
                    <input min="1" max="999" value="${
                      cartItem.quantity
                    }" class="update-quantity-input update-quantity-input-${
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

    const itemContainer = document.querySelector(
      `.order-item-container-${productId}`
    );
    itemContainer.remove();

    removeFromCart(productId);

    updateCartQuantity();
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

const saveBtnElement = document.querySelectorAll(".update-quantity-save-btn");
saveBtnElement.forEach((saveBtn) => {
  saveBtn.addEventListener("click", () => {
    const { productId } = saveBtn.dataset;

    const inputQuantityElement = document.querySelector(
      `.update-quantity-input-${productId}`
    );
    const quantity = Number(inputQuantityElement.value);
    if (quantity < 1 || quantity >= 1000) {
      alert("quantity must be atleast 1 and less than 1000");
      return
    }

    const itemContainer = document.querySelector(
      `.order-item-container-${productId}`
    );
    itemContainer.classList.remove("is-editing-quantity");

    updateQuantity(productId, quantity);

    const itemQuantityCount = document.querySelector(
      `.quantity-label-${productId}`
    );
    itemQuantityCount.innerHTML = quantity;

    updateCartQuantity();
  });
});
