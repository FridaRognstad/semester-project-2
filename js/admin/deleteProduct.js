import { productsUrl } from "../api/url.js";
import { getToken } from "../utils/storage.js";

export function deleteProduct(id) {
  const deleteBtn = document.querySelector(".delete-btn");

  deleteBtn.onclick = async function () {
    const warning = confirm("Do you want to delete this product?");

    if (warning) {
      const url = productsUrl + "/" + id;
      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);
        location.href = "./editProducts.html";
      } catch (error) {
        console.log(error);
      }
    }
  };
}
