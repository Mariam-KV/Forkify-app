const recipeContainer = document.querySelector('.recipe');
let searchResultsV = document.querySelector('.search-results');
let message = document.querySelector('.message');
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
let input = document.querySelector('.search__field');
let results = document.querySelector('.results');
///////////////////////////////////////
let renderSpinner = function (parenEL) {
  let markup = `<div class="spinner">
          <svg>
            <use href="src/img/icons.svg#icon-loader"></use>
          </svg>
        </div> `;
  recipeContainer.innerHTML = '';
  parenEL.insertAdjacentHTML('afterbegin', markup);
};
let renderError = function () {
  let markup = `<div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>No recipes found for your query. Please try again!</p>
          </div>`;
  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin', markup);
};
let showRecipe = function () {
  //1 loading recipes
  let id = window.location.hash.slice(1);
  if (!id) return;
  renderSpinner(recipeContainer);
  fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      } else {
        return response.json();
      }
    })
    .then(data => {
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
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="src/img/icons.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="src/img/icons.svg#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${recipe.ingredients
              .map(el => {
                return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                el.quantity ? el.quantity : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${el.unit}</span>
                ${el.description}
              </div>
            </li>`;
              })
              .join('')}
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
      recipeContainer.innerHTML = '';

      recipeContainer.insertAdjacentHTML('beforeend', markup);
    })
    .catch(e => {
      recipeContainer.innerHTML = '';
      renderError();
    });

  //2 RENDERING RECIPES
};
['hashchange', 'load'].forEach(el => {
  window.addEventListener(el, showRecipe);
});
let searchResults = function (str) {
  renderSpinner(results);
  fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${str}`)
    .then(response => response.json())
    .then(data => {
      results.innerHTML = '';
      if (!data.results) {
        throw new Error();
      }
      console.log(data);

      data.data.recipes
        .map(el => {
          let markup = ` <li class="preview">
            <a class="preview__link preview__link--active" href="#23456">
              <figure class="preview__fig">
                <img src="${el.image_url}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${el.title}</h4>
                <p class="preview__publisher">${el.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
          results.innerHTML += markup;
        })
        .join('');

      console.log(markup);
    })
    .catch(e => {
      recipeContainer.innerHTML = '';
      renderError();
    });
};

function showInputs(e) {
  e.preventDefault();
  recipeContainer.innerHTML = '';
  console.log(input.value);
  searchResults(input.value);
  input.value = '';
}
let btnSearch = document
  .querySelector('.search__btn')
  .addEventListener('click', showInputs);
