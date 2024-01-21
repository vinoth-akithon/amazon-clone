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
        <select class="item-quantity" name="item-quantity" id="">
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
        <button data-product-id="${
          product.id
        }" class="add-to-cart-btn">Add to cart</button>
    </div>
    `;
});

const mainContainerElement = document.querySelector(".main");
mainContainerElement.innerHTML = generatedHTML;

document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset;
    let alreadyPresentProduct;

    cart.forEach((cartItem) => {
      if (cartItem.productId === product.productId) {
        alreadyPresentProduct = cartItem;
      }
    });

    if (alreadyPresentProduct) {
      alreadyPresentProduct.quantity++;
    } else {
      cart.push({
        productId: product.productId,
        quantity: 1,
      });
    }
    console.log(cart);
  });
});
