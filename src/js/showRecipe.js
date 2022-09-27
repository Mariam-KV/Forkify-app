export const recipeContainer = document.querySelector(".recipe");
import { renderError, renderSpinner } from "./script.js";
let bookList = [];
import { bookmarksList } from "./script.js";

export let showRecipe = function () {
  //1 loading recipes
  let id = window.location.hash.slice(1);
  if (!id) return;
  renderSpinner(recipeContainer);
  fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
    .then((response) => response.json())

    .then((data) => {
      let { recipe } = data.data;

      let markup = ` <figure class="recipe__fig">
          <img src="${recipe.image_url}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cooking_time
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="src/img/icons.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--decrease-servings">
                <svg>
                  <use href="src/img/icons.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

         
          <button class="btn--round">
            <svg class="">
              <use class ="bookmark" href="src/img/icons.svg#icon-bookmark"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${recipe.ingredients
              .map((el) => {
                return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                el.quantity ? el.quantity : ""
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${el.unit}</span>
                ${el.description}
              </div>
            </li>`;
              })
              .join("")}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.source_url}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
      recipeContainer.innerHTML = "";
      recipeContainer.insertAdjacentHTML("beforeend", markup);
      let servings = document.querySelector(".recipe__info-data--people");
      let quantity = document.querySelectorAll(".recipe__quantity");
      let use = document.querySelector(".bookmark");
      let b = localStorage.getItem("book");
      if (b.includes(window.location.hash)) {
        console.log(use.getAttribute("href"));
        use.setAttribute("href", "src/img/icons.svg#icon-bookmark");
      }
      let h = document.getElementById(window.location.hash);
      let resultS = document.querySelector(".search-results");
      let cloneH = h.cloneNode(true);

      let copyH = document.getElementById("copyH").appendChild(cloneH);
      let messageB = document.getElementById("bMessage");
      let hash = window.location.hash;

      document.querySelector(".btn--round").addEventListener("click", () => {
        if (bookList.includes(window.location.hash)) {
          console.log(use.getAttribute("href"));
          use.setAttribute("href", "src/img/icons.svg#icon-bookmark");

          let m = bookList.indexOf(window.location.hash);

          bookList.splice(m, 1);
          bookmarksList.removeChild(cloneH);
          messageB.style.display = "none";

          persistBookmarks();

          if (bookmarksList.length == 0) {
            messageB.style.display = "flex";
            //bookmarksList.appendChild(messageB);
          }
        } else {
          use.setAttribute("href", "src/img/icons.svg#icon-bookmark-fill");
          if (!bookList.includes(cloneH)) {
            console.log(8);
            bookList.push(window.location.hash);
            bookmarksList.appendChild(cloneH);
            messageB.style.display = "none";
          }
          use.getAttribute("href") == "src/img/icons.svg#icon-bookmark-fill";

          persistBookmarks();
        }
      });

      let persistBookmarks = function () {
        localStorage.setItem("list", bookmarksList.innerHTML);
        localStorage.setItem("book", bookList);
      };

      document
        .querySelector(".btn--decrease-servings")
        .addEventListener("click", handlerServingsU);
      document
        .querySelector(".btn--increase-servings")
        .addEventListener("click", handlerServingsD);
      function quantityAll(newservings, old) {
        quantity.forEach((el) => {
          if (el.innerHTML != "") {
            el.innerHTML = (el.innerHTML * newservings) / old;
          }
        });
      }
      function handlerServingsD() {
        if (Number(servings.innerHTML) > 1) {
          let old = servings.innerHTML;
          servings.innerHTML -= 1;
          quantityAll(Number(servings.innerHTML), Number(old));
        }
      }
      function handlerServingsU() {
        let old = servings.innerHTML;
        servings.innerHTML = Number(servings.innerHTML) + 1;
        quantityAll(Number(servings.innerHTML), Number(old));
      }
    })
    .catch((e) => {
      recipeContainer.innerHTML = "";
      renderError();
    });
};
