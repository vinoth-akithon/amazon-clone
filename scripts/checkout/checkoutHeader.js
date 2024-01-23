import {getTotalQuantity} from "../../data/cart.js"

export function renderCheckoutHeader() {
  document.querySelector(".total-quantity").innerHTML = getTotalQuantity();
}
