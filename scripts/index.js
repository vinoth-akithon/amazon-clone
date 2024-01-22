import {cart} from "../data/cart.js"
import {products} from "../data/products.js"


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
        <div class="item-price">$${(product.priceInCents / 100).toFixed(
          2
        )}</div>
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

document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  let addedMessageTimeoutId;
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    let alreadyPresentInCart;

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
    addedMessageTimeoutId = timeoutId;

    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        alreadyPresentInCart = cartItem;
      }
    });

    const quantityElement = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const quantity = Number(quantityElement.value);

    if (alreadyPresentInCart) {
      alreadyPresentInCart.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity,
      });
    }

    let totalCartQuantity = 0;
    cart.forEach((cartItem) => {
      totalCartQuantity += cartItem.quantity;
    });
    const totalCartQuantityElement = document.querySelector(".cart-count");
    totalCartQuantityElement.innerHTML = totalCartQuantity;
  });
});
