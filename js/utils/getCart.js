export function getCart() {
  const cart = localStorage.getItem("cart");

  if (cart === null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}
