import { baseUrl } from "./api/url.js";
import { productsUrl } from "./api/url.js";
import { addAdmin } from "./ui/addAdmin.js";
import logOut from "./admin/logout.js";

logOut();
addAdmin();

const featuredContainer = document.querySelector(".featured-container");
async function fetchFeatured() {
  try {
    const response = await fetch(productsUrl);
    const products = await response.json();

    createFeatured(products);
  } catch (error) {
    console.log(error);
  }
}

fetchFeatured();

function createFeatured(products) {
  featuredContainer.innerHTML = "";

  products.forEach(function (product) {
    if (product.featured === true) {
      featuredContainer.innerHTML += `<div class="col">
                                    <div class="card h-100">
                                    <a href="product-details.html?id=${product.id}" tabindex="0" class="link-dark">
                                    <div class="product-image" style="background-image: url('${product.image_url}');"></div>
                                    <div class="card-body">
                                    <h5 class="card-title text-uppercase">${product.title}</h5>
                                    <p class="card-text">${product.price},-</p>
                                    </div>
                                    </a>
                                    </div>
                                    </div>`;
    }
  });
}

const jumbotron = document.querySelector(".jumbotron-container");
const homeUrl = baseUrl + "/home";

async function fetchBanner() {
  try {
    const response = await fetch(homeUrl);
    const json = await response.json();

    jumbotron.innerHTML += `<div class="banner" style="background-image: url('http://localhost:1337${json.hero_banner.url}');">
                            `;
  } catch (error) {
    console.log(error);
  }
}

fetchBanner();
