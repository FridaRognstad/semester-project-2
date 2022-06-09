export function createTitle(details) {
  const productTitle = document.querySelector(".product-title");
  const breadcrumbTitle = document.querySelector(".breadcrumb-title");

  productTitle.innerHTML = `Wears | ${details.title}`;
  breadcrumbTitle.innerHTML = `${details.title}`;
}
