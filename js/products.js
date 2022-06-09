import { productsUrl } from "./api/url.js";
import { createProductCard } from "./ui/createProductsCard.js";
import { filterProducts } from "./ui/filterProducts.js";
import { addAdmin } from "./ui/addAdmin.js";
import logOut from "./admin/logout.js";

addAdmin();

export async function fetchProducts() {
  try {
    const response = await fetch(productsUrl);
    const products = await response.json();

    createProductCard(products);
    filterProducts(products);
  } catch (error) {
    console.log(error);
  }
}

fetchProducts();
logOut();
