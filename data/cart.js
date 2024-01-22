export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
  },
  {
    productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    quantity: 2,
  },
];

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
    });
  }
}

export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
}
