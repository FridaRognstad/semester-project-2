import { createProductCard } from "./createProductsCard.js";

export function filterProducts(products) {
  const filter = document.querySelector("#filter");

  filter.onkeyup = function (event) {
    const filterValue = event.target.value.trim().toLowerCase();

    const filterProducts = products.filter(function (product) {
      if (
        product.title.toLowerCase().includes(filterValue) ||
        product.description.toLowerCase().includes(filterValue)
      ) {
        return true;
      }
    });
    createProductCard(filterProducts);
  };
}
