const BASE_URL = "https://noirlab.edu/public/";
const COPYRIGHT_URL = BASE_URL + "copyright/";
const JSON_FEED = BASE_URL + "images/d2d/?order_by=-priority";
const XML_FEED = BASE_URL + "images/feed/top100/";
const LOGO_SRC = "img/noirlab-white.svg";
const logoLinkElement = document.querySelector("#logo-link");
const logoElement = document.querySelector("#logo");
const titleElement = document.querySelector("#title");
const creditElement = document.querySelector("#copyright");
const className = "imageTop100";

function initialize() {
  logoLinkElement.href = BASE_URL;
  logoElement.src = LOGO_SRC;
  creditElement.href = COPYRIGHT_URL;
  getImagesFromJSON();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createImageFromJSON(image) {
  const img = document.createElement("img");
  img.src = image.Assets[0].Resources[2].URL;
  img.alt = image.Title;
  img.className = className;
  titleElement.textContent = image.Title;
  titleElement.href = image.ReferenceURL;
  creditElement.textContent = image.Credit;
  return img;
}

function getImagesFromJSON() {
  const randomInt = getRandomInt(0, 99);
  fetch(JSON_FEED)
    .then((res) => res.json())
    .then((out) => {
      document.body.appendChild(
        createImageFromJSON(out.Collections[randomInt])
      );
    })
    .catch((err) => console.error(err));
}

initialize();
