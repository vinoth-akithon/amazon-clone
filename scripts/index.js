import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { currencyFormater } from "./utils/currency.js";

let generatedHTML = "";
products.forEach((product) => {
  generatedHTML += `
    <div class="item-card">
        <div class="image-container">
          <img
            class="item-image"
            src="${product.image}"
            alt=""
          />
        </div>
        <div class="item-name">
          ${product.name}
        </div>
        <div class="item-ratings">
          <img class="stars" src="images/ratings/rating-${
            product.rating.stars * 10
          }.png" alt="" />
          <span class="count">${product.rating.count}</span>
        </div>
        <div class="item-price">$${currencyFormater(product.priceInCents)}</div>
        <select class="item-quantity js-quantity-selector-${
          product.id
        }" name="item-quantity" id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img class="checkmark" src="images/checkmark.png">
          <div class="checkmark-content">Added</div>
        </div>
        <button data-product-id="${
          product.id
        }" class="add-to-cart-btn">Add to cart</button>
    </div>
    `;
});

const mainContainerElement = document.querySelector(".main");
mainContainerElement.innerHTML = generatedHTML;
updateCartQuantity();

function enableConfirmation(addedMessageTimeoutId, productId) {
  const addedConfirmationElement = document.querySelector(
    `.js-added-to-cart-${productId}`
  );
  addedConfirmationElement.classList.add("added-to-cart-visible");

  if (addedMessageTimeoutId) {
    clearTimeout(addedMessageTimeoutId);
  }

  const timeoutId = setTimeout(() => {
    addedConfirmationElement.classList.remove("added-to-cart-visible");
  }, 2000);
  return timeoutId;
}

function getQuantityFromDropDown(productId) {
  const quantityElement = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  return Number(quantityElement.value);
}

function updateCartQuantity() {
  let totalCartQuantity = 0;
  cart.forEach((cartItem) => {
    totalCartQuantity += cartItem.quantity;
  });
  document.querySelector(".cart-count").innerHTML = totalCartQuantity;
}

document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  let addedMessageTimeoutId;
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    const quantity = getQuantityFromDropDown(productId);

    addToCart(productId, quantity);
    updateCartQuantity();
    addedMessageTimeoutId = enableConfirmation(
      addedMessageTimeoutId,
      productId
    );
  });
});
