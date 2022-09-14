import { showRecipe, recipeContainer } from "./showRecipe.js";
import { searchResults, results } from "./searchResults.js";
let searchResultsV = document.querySelector(".search-results");
let message = document.querySelector(".message");
let input = document.querySelector(".search__field");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export let renderSpinner = function (parenEL) {
  let markup = `<div class="spinner">
          <svg>
            <use href="src/img/icons.svg#icon-loader"></use>
          </svg>
        </div> `;
  recipeContainer.innerHTML = "";
  parenEL.insertAdjacentHTML("afterbegin", markup);
};
export let renderError = function () {
  let markup = `<div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>No recipes found for your query. Please try again!</p>
          </div>`;

  results.insertAdjacentHTML("afterbegin", markup);
};

function showInputs(e) {
  e.preventDefault();
  searchResults(input.value);
  input.value = "";
}
document.querySelector(".search__btn").addEventListener("click", showInputs);

["hashchange", "load"].forEach((el) => {
  window.addEventListener(el, showRecipe);
});
