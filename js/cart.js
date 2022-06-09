import { getCart } from "./utils/getCart.js";
import { baseUrl } from "./api/url.js";
import { addAdmin } from "./ui/addAdmin.js";

addAdmin();

const cart = getCart();

const cartContainer = document.querySelector(".cart-container");
const cartTotal = document.querySelector(".cart-total");

if (!cart.length) {
  cartContainer.innerHTML = `<h5>Your Cart is Empty</h5>
                            <a href="./products.html" class="btn btn-dark" role="button">Shop</a>`;
  cartContainer.style.textAlign = "center";
  cartTotal.style.display = "none";
}

cart.forEach((product) => {
  cartContainer.innerHTML += `<div class="card cart-card mb-3">
                              <a href="product-details.html?id=${product.id}" tabindex="0">
                              <div class="cart-image" style="background-image: url('${baseUrl}${product.image}');"></div>
                               </a>
                              <div class="card-body cart">
                              <p class="text-uppercase">${product.title}</p>
                              <p>${product.price},-</p>
                              </div>
                              </div>`;
});

let sum = 0;
let productLength = cart.length;
let total = 0;
let productIndex = "product";

if (productLength > 1) {
  productIndex = "products";
}

cart.forEach((product) => {
  sum += parseFloat(product.price);
  total = sum + 40;
  cartTotal.innerHTML = `<div class="col total-col">
                          <span>${productLength} ${productIndex}</span><span>${sum},-</span>
                          </div>
                          <div class="col total-col">
                          <span>Delevery</span><span>40,-</span>
                          </div>
                          <div class="col total-col">
                          <span class="cart-line"></span>
                          </div>
                          <div class="col total-col">
                          <span>Total</span><span>${total},-</span>
                          </div>
                          <div class="d-grid gap-2">
                          <a href="#" class="btn btn-dark disabled" tabindex="-1" role="button" aria-disabled="true">Checkout</a>
                          </div>`;
});
