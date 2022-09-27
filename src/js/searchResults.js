import { renderError, renderSpinner } from "./script.js";
import { recipeContainer } from "./showRecipe.js";
export let results = document.querySelector(".results");

export let searchResults = function (str) {
  renderSpinner(results);
  fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${str}`)
    .then((response) => response.json())

    .then((data) => {
      if (!data.data.recipes.length) {
        throw new Error();
      }
      results.innerHTML = "";

      data.data.recipes
        .map((el) => {
          let markup = ` <li class="preview" id="#${el.id}">
            <a class="preview__link preview__link--active" href="#${el.id}">
              <figure class="preview__fig">
                <img src="${el.image_url}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${el.title}</h4>
                <p class="preview__publisher">${el.publisher}</p>
              
              </div>
            </a>
          </li>`;
          results.innerHTML += markup;
        })
        .join("");
    })
    .catch((e) => {
      recipeContainer.innerHTML = "";
      results.innerHTML = "";
      renderError();
    });
};
