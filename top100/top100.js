const BASE_URL = "https://noirlab.edu/public/";
const CONFIG = {
  BASE_URL: BASE_URL,
  COPYRIGHT_URL: BASE_URL + "copyright/",
  JSON_FEED: BASE_URL + "images/d2d/?order_by=-priority",
  LOGO_SRC: "img/noirlab-white.svg",
  STORED_IMAGE_KEY: "stored_image",
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function URLfromImage(image) {
  return image.Assets[0].Resources[2].URL;
}

PetiteVue.createApp({
  loading: false,
  loadedFromStorage: false,
  config: CONFIG,
  image: null,
  get imageURL() {
    if (this.image) {
      try {
        return URLfromImage(this.image);
      } catch {
        console.error("Failed to get image URL");
      }
    }
    return null;
  },
  initialize() {
    if (localStorage.getItem(CONFIG.STORED_IMAGE_KEY)) {
      try {
        const preloadedImage = JSON.parse(
          localStorage.getItem(CONFIG.STORED_IMAGE_KEY)
        );
        this.image = preloadedImage;
        this.loadedFromStorage = true;
      } catch {
        // The normal process will load an image anyway
        console.error("Failed to load stored image");
      }
    }
    this.getImagesFromJSON();
  },
  getImagesFromJSON() {
    fetch(CONFIG.JSON_FEED)
      .then((res) => res.json())
      .then((out) => {
        this.onJSONloaded(out.Collections);
      })
      .catch((err) => console.error(err));
  },
  onJSONloaded(images) {
    if (!this.loadedFromStorage) {
      this.image = images[getRandomInt(0, images.length)];
    }
    this.preloadNextImage(images);
  },
  preloadNextImage(images) {
    const nextImg = images[getRandomInt(0, images.length)];
    localStorage.setItem(CONFIG.STORED_IMAGE_KEY, JSON.stringify(nextImg));
    const img = document.createElement("img");
    img.src = URLfromImage(nextImg);
  },
}).mount();
