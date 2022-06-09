import { productsUrl } from "../api/url.js";
import { addAdmin } from "../ui/addAdmin.js";
import { getToken } from "../utils/storage.js";
import { deleteProduct } from "./deleteProduct.js";

addAdmin();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const editForm = document.querySelector(".edit-form");
const editMessage = document.querySelector(".edit-message");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featured = document.querySelector("#featured");
const image = document.querySelector("#img-url");
const idInput = document.querySelector("#id");

(async function () {
  try {
    const response = await fetch(productsUrl + "/" + id);
    const json = await response.json();

    title.value = json.title;
    price.value = json.price;
    description.value = json.description;
    featured.checked = json.featured;
    idInput.value = json.id;
    image.value = json.image_url;

    deleteProduct(json.id);
  } catch (error) {
    console.log(error);
  }
})();

editForm.addEventListener("submit", submit);

function submit(event) {
  event.preventDefault();

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const featuredValue = featured.checked;
  const idValue = idInput.value;
  const imageValue = image.value.trim();

  editProduct(
    titleValue,
    priceValue,
    descriptionValue,
    featuredValue,
    idValue,
    imageValue
  );
}

async function editProduct(title, price, description, featured, id, image) {
  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    featured: featured,
    image_url: image,
  });

  const token = getToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(productsUrl + "/" + id, options);
    const json = await response.json();

    if (json.updated_at) {
      editMessage.innerHTML = "Product updated";
    }

    if (json.error) {
      editMessage.innerHTML = `${json.message}`;
    }
  } catch (error) {
    console.log(error);
  }
}
