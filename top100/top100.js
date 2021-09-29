const BASE_URL = "https://noirlab.edu/public/";
const COPYRIGHT_URL = BASE_URL + "copyright/";
const JSON_FEED = BASE_URL + "images/archive/top100/json/";
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
  img.src = image.Resources[2].URL;
  img.alt = image.Title;
  img.className = className;
  titleElement.textContent = image.Title;
  titleElement.href = image.ReferenceURL;
  creditElement.textContent = image.Credit;
  return img;
}

function getImagesFromJSON() {
  fetch(JSON_FEED)
    .then((res) => res.json())
    .then((out) => {
      console.log(out[getRandomInt(0, 99)]);
      document.body.appendChild(createImageFromJSON(out[getRandomInt(0, 99)]));
    })
    .catch((err) => console.error(err));
}

function createImageTagFromXML(image) {
  const img = document.createElement("img");
  img.src = image.enclosure[0]._attr.url._value;
  img.alt = image.title[0]._text;
  img.className = className;
  titleElement.textContent = image.title[0]._text;
  titleElement.href = image.guid[0]._text;
  return img;
}

function getImagesFromXMLFile() {
  let request = (XMLFile = new XMLHttpRequest());
  request.open("GET", XML_FEED);
  request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      let rawdata = xmlToJSON.parseString(this.response);
      let images = rawdata.rss[0].channel[0].item;
      document.body.appendChild(
        createImageTagFromXML(images[getRandomInt(1, 99)])
      );
    }
  };
  request.send();
}

initialize();
