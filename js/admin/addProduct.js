import { getToken } from "../utils/storage.js";
import { productsUrl } from "../api/url.js";
import { addAdmin } from "../ui/addAdmin.js";

addAdmin();

const addForm = document.querySelector(".add-form");
const addMessage = document.querySelector(".add-message");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featured = document.querySelector("#featured");
const image = document.querySelector("#img-url");

addForm.addEventListener("submit", submit);

function submit(event) {
  event.preventDefault();

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const featuredValue = featured.checked;
  const imageValue = image.value.trim();

  addProduct(
    titleValue,
    priceValue,
    descriptionValue,
    featuredValue,
    imageValue
  );
}

async function addProduct(title, price, description, featured, image) {
  const url = productsUrl;

  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    featured: featured,
    image_url: image,
  });

  const token = getToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      addMessage.innerHTML = "Product added";
      addForm.reset();
    }

    if (json.error) {
      addMessage.innerHTML = json.message;
    }
  } catch (error) {
    console.log(error);
  }
}
