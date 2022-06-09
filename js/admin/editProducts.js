import { productsUrl } from "../api/url.js";
import { baseUrl } from "../api/url.js";
import { addAdmin } from "../ui/addAdmin.js";

const productsContainer = document.querySelector(".products-container");

addAdmin();

async function fetchProducts() {
  try {
    const response = await fetch(productsUrl);
    const products = await response.json();

    productsContainer.innerHTML = "";

    products.forEach(function (product) {
      let featured = "Not featured";

      if (product.featured === true) {
        featured = "Featured";
      }

      productsContainer.innerHTML += `<div class="col">
        <div class="card">
        <a href="editForm.html?id=${product.id}" tabindex="0" class="link-dark">
        <div class="product-image" style="background-image: url('${product.image_url}');"></div>
        <div class="card-body">
        <h5 class="card-title text-uppercase">${product.title}</h5>
        <p class="card-text">${product.price},-</p>
        <p class="card-text">${featured}</p>
        <p class="card-text description">${product.description}</p>
        </div>
        </a>
        </div>
        </div>`;
    });
  } catch (error) {
    console.log(error);
  }
}

fetchProducts();
