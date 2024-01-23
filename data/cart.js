export let cart = loadCartfromLocalStorage()

export function addToCart(productId, quantity) {
  let alreadyPresentedItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      alreadyPresentedItem = cartItem;
    }
  });

  if (alreadyPresentedItem) {
    alreadyPresentedItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: "1"
    });
  }

  saveCartToLocalStorage();
}

export function updateQuantity(productId, quantity) {
  const cartItem = cart.find((cartItem) => cartItem.productId === productId)
  cartItem.quantity = quantity;
  saveCartToLocalStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  saveCartToLocalStorage();
}


function saveCartToLocalStorage() {
  localStorage.setItem("amazon-cart", JSON.stringify(cart))
}

function loadCartfromLocalStorage() {
  return JSON.parse(localStorage.getItem("amazon-cart")) || []
}

export function getTotalQuantity() {
  let totalCartQuantity = 0;
  cart.forEach((cartItem) => {
    totalCartQuantity += cartItem.quantity;
  });
  return totalCartQuantity
}