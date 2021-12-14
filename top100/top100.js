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

// Abstraction of storage to use chrome storage when installed as extension
// or local storage when deployed as a normal webpage
const storage = {
  getItem(key) {
    return new Promise((resolve, reject) => {
      try {
        // See: https://developer.chrome.com/docs/extensions/reference/storage/
        chrome.storage.local.get([key], function (result) {
          resolve(result[key]);
        });
      } catch {
        resolve(JSON.parse(localStorage.getItem(key)));
      }
    });
  },
  setItem(key, value) {
    try {
      const obj = {};
      obj[key] = value;
      chrome.storage.local.set(obj);
    } catch {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
};

// It's not possible to use the HTML templates because it would require the Vue version with the compiler
// The compiler version uses "eval" which is not allowed by the CSP of Chrome (See: https://developer.chrome.com/docs/extensions/mv3/sandboxingEval/)
// No even the chrome sandbox works becuase it means we won't be able to use chrome.storage
// That's the reason we manually wrote Vue's render function
Vue.createApp({
  render() {
    const h = Vue.h;
    return [
      this.loading &&
        h("div", { class: "loader-wrapper" }, h("div", { class: "loader" })),
      h("div", { class: "metadata-wrapper" }, [
        h(
          "div",
          { class: "logo-wrapper" },
          h(
            "a",
            { href: this.config.BASE_URL, target: "_blank" },
            h("img", { src: this.config.LOGO_SRC, class: "logo" })
          )
        ),
        this.image &&
          h("div", {}, [
            h(
              "a",
              {
                href: this.image.ReferenceURL,
                alt: this.image.Title,
                class: "title",
                target: "_blank",
              },
              this.sanitizeString(this.image.Title)
            ),
            h(
              "a",
              {
                href: this.config.COPYRIGHT_URL,
                target: "_blank",
              },
              this.sanitizeString(this.image.Credit)
            ),
          ]),
      ]),
      this.imageURL && h("img", { src: this.imageURL, class: "the-image" }),
    ];
  },
  data() {
    return {
      loading: false,
      loadedFromStorage: false,
      config: CONFIG,
      image: null,
    };
  },
  computed: {
    imageURL() {
      if (this.image) {
        try {
          return URLfromImage(this.image);
        } catch {
          console.error("Failed to get image URL");
        }
      }
      return null;
    },
  },
  // Async can be used since Chrome v55. See: https://caniuse.com/async-functions
  async mounted() {
    try {
      const storedImage = await storage.getItem(CONFIG.STORED_IMAGE_KEY);
      if (storedImage && storedImage.Title) {
        // Evaluate if at least it has the title to avoid empty objects
        this.image = storedImage;
        this.loadedFromStorage = true;
      } else {
        this.loading = true;
      }
    } catch (e) {
      console.log(e);
      // The normal process will load an image anyway
      console.error("Failed to load stored image");
      this.loading = true;
    }
    this.getImagesFromJSON();
  },
  methods: {
    getImagesFromJSON() {
      fetch(CONFIG.JSON_FEED)
        .then((res) => res.json())
        .then((out) => {
          this.onJSONloaded(out.Collections);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          this.loading = false;
        });
    },
    sanitizeString(str){
      str = str.replaceAll('&amp;', '&')
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&quot;', '"')
      .replaceAll('&apos;', "'")
      .replaceAll('&#039;', "'")
      return str.trim();
    },
    onJSONloaded(images) {
      if (!this.loadedFromStorage) {
        this.image = images[getRandomInt(0, images.length)];
      }
      this.preloadNextImage(images);
    },
    preloadNextImage(images) {
      const nextImg = images[getRandomInt(0, images.length)];
      storage.setItem(CONFIG.STORED_IMAGE_KEY, nextImg);
      const img = document.createElement("img");
      img.src = URLfromImage(nextImg);
    },
  },
}).mount("#app");
