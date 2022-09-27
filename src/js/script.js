import { showRecipe, recipeContainer } from "./showRecipe.js";
import { searchResults, results } from "./searchResults.js";
let searchResultsV = document.querySelector(".search-results");
let message = document.querySelector(".recipe");
let input = document.querySelector(".search__field");
export let bookmarksList = document.querySelector(".bookmarks__list");

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
  if (input.value === "") {
  } else {
    searchResults(input.value);
    input.value = "";
  }
}
document.querySelector(".search__btn").addEventListener("click", showInputs);
//don't sure about using it or not
window.addEventListener("hashchange", showRecipe);
window.addEventListener("load", () => {
  window.location.hash = "";
});
let init = function () {
  let storage = localStorage.getItem("list");

  if (storage) {
    bookmarksList.innerHTML = storage;
  }
};
init();
