import { baseUrl } from "./api/url.js";
import { productsUrl } from "./api/url.js";
import { renderCart } from "./ui/renderCart.js";
import { getCart } from "./utils/getCart.js";
import { addAdmin } from "./ui/addAdmin.js";
import { createTitle } from "./utils/getTitle.js";
import { reload } from "./utils/reload.js";
addAdmin();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const productUrl = productsUrl + "/" + id;

const detailsContainer = document.querySelector(".product-container");

async function fetchDetails() {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();
    detailsContainer.innerHTML = "";
    createTitle(details);
    const cart = getCart();
    let cssClass = "unclicked";
    let cartBtn = "Add to cart";

    const doesObjectExists = cart.find(function (cart) {
      return parseInt(cart.id) === details.id;
    });

    if (doesObjectExists) {
      cssClass = "clicked";
      cartBtn = "Remove from cart";
    }

    detailsContainer.innerHTML += `  <div class="card details-card mb-3">
                                      <div class="row">
                                     <div class="col-md-5 col-xxl-6">
                                     <div class="product-image image-details" style="background-image: url('${baseUrl}${details.image.formats.small.url}');"></div>
                                    </div>
                                    <div class="col-md-6">
                                    <div class="card-body">
                                    <h1 class="card-title text-uppercase">${details.title}</h1>
                                    <h4>${details.price},-<h4>
                                    <button class="btn btn-primary ${cssClass} cart-button" data-id="${details.id}" data-title="${details.title}" data-image="${details.image.formats.small.url}" data-price="${details.price}">${cartBtn}</button>
                                    </div>
                                    </div>
                                   </div>
                                  </div>
                                  <h3>Description</h3>
                                  <p>${details.description}</p>`;

    renderCart();

    const cartButton = document.querySelector(".cart-button");

    cartButton.addEventListener("click", reload);
  } catch (error) {
    console.log(error);
  }
}

fetchDetails();
