import { baseUrl } from "../api/url.js";

export function createProductCard(products) {
  const productsContainer = document.querySelector(".products-container");
  productsContainer.innerHTML = "";

  products.forEach(function (product) {
    productsContainer.innerHTML += `<div class="col">
                                      <div class="card">
                                      <a href="product-details.html?id=${product.id}" tabindex="0" class="link-dark">
                                      <div class="product-image" style="background-image: url('${product.image_url}');"></div>
                                      <div class="card-body">
                                      <h5 class="card-title text-uppercase">${product.title}</h5>
                                      <p class="card-text">${product.price},-</p>
                                      </div>
                                      </a>
                                      </div>
                                      </div>`;
  });
}
