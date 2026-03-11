import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import "../css/styles.css"

const API_KEY = "54877624-db5c35cc993578690bbd7a10b";

const btn = document.querySelector("#submit");
const input = document.querySelector("input");
const loader = document.querySelector(".loader");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");


let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

let page = 1;
let query = "";


async function getImages(query, page) {
  const response = await axios.get("https://pixabay.com/api/", {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page: page,
      per_page: 20,
    },
  });

  return response.data;
}

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  loader.hidden = false;
  gallery.innerHTML = "";
    loadMoreBtn.hidden = true;
    page = 1;
    const q = input.value.trim();
    query = q;
  
  try {
    const data = await getImages(q, page);

    if (data.totalHits === 0) {
      throw new Error("No images found!");
    }
    
      loadMoreBtn.hidden = false;
    const markup = data.hits
      .map((image) => {
        return `
                    <li class="card">
                    <a href="${image.largeImageURL}">
                      <div class="image-wrapper">
                        <img src="${image.webformatURL}" alt="${image.tags}" width="360" height="200" />
                      </div>
                    </a>
                        <ul class="info">
                            <li><span>Likes</span> <br> ${image.likes}</li>
                            <li><span>Views</span> <br> ${image.views}</li>
                            <li><span>Comments</span> <br> ${image.comments}</li>
                            <li><span>Downloads</span> <br> ${image.downloads}</li>
                        </ul>
                    </li>
                    `;
      })
      .join("");

    gallery.innerHTML = markup;

    lightbox.refresh();
    
  } catch (error) {
    iziToast.error({
      message:
        "Sorry, there are no images matching your search query. Please try again!",
      position: "topRight",
    });
  } finally {
    loader.hidden = true;
  }
});


loadMoreBtn.addEventListener("click", async () => {

  page += 1;

  try {

    const data = await getImages(query, page);

    const markup = data.hits
      .map((image) => {
        return `
                    <li class="card">
                    <a href="${image.largeImageURL}">
                      <div class="image-wrapper">
                        <img src="${image.webformatURL}" alt="${image.tags}" width="360" height="200" />
                      </div>
                    </a>
                        <ul class="info">
                            <li><span>Likes</span> <br> ${image.likes}</li>
                            <li><span>Views</span> <br> ${image.views}</li>
                            <li><span>Comments</span> <br> ${image.comments}</li>
                            <li><span>Downloads</span> <br> ${image.downloads}</li>
                        </ul>
                    </li>
                    `;
      })
      .join("");

    gallery.insertAdjacentHTML("beforeend", markup);

      lightbox.refresh();
      
      const card = document.querySelector(".card");
      const cardHeight = card.getBoundingClientRect().height;

      window.scrollBy({
          top: cardHeight * 3,
          behavior: "smooth",
      });

    const totalPages = Math.ceil(data.totalHits / 20);

    if (page >= totalPages) {

      loadMoreBtn.hidden = true;

      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });

    }

  } catch (error) {

    iziToast.error({
      message: "Failed to load images",
      position: "topRight",
    });

  }

});