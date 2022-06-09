import { getCart } from "../utils/getCart.js";

export function renderCart() {
  const cartBtn = document.querySelectorAll(".cart-button");

  cartBtn.forEach((button) => {
    button.addEventListener("click", clicked);
  });

  function clicked() {
    this.classList.toggle("clicked");
    this.classList.toggle("unclicked");

    const id = this.dataset.id;
    const title = this.dataset.title;
    const price = this.dataset.price;
    const image = this.dataset.image;

    const currentCart = getCart();

    const productExists = currentCart.find(function (cart) {
      return cart.id === id;
    });

    if (productExists === undefined) {
      const product = { id: id, title: title, price: price, image: image };
      currentCart.push(product);
      saveCart(currentCart);
    } else {
      const newCart = currentCart.filter((cart) => cart.id !== id);
      saveCart(newCart);
    }
  }

  getCart();

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
