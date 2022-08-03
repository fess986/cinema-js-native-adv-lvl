/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
// универсальная функция по добавлению элементов в вёрстку
const addElement = function(container, element, where = 'beforeend') {
    container.insertAdjacentHTML(where, element)
}

// основные элементы для вставки контента
const rankUserContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');

// создаем шаблон элемента "Звание пользователя"
const createRankUser = () => {
    return (
        `<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
    )
}

// создаем шаблон элемента "Меню (фильтры и статистика)"
const createFilterAndStatistics = () => {
    return (
        `<nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
          <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
          <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
          <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
    )
}

// создаем шаблон элемента "статистика"
const createSorting = () => {
    return (
        `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" class="sort__button">Sort by date</a></li>
        <li><a href="#" class="sort__button">Sort by rating</a></li>
      </ul>`
    )
}

const createfilmArticle = () => {
    return (
        `<article class="film-card">
        <h3 class="film-card__title">The Dance of Life</h3>
        <p class="film-card__rating">8.3</p>
        <p class="film-card__info">
          <span class="film-card__year">1929</span>
          <span class="film-card__duration">1h 55m</span>
          <span class="film-card__genre">Musical</span>
        </p>
        <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
        <a class="film-card__comments">5 comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>`
    )
}

const createShowMoreButton = () => {
    return (
        `<button class="films-list__show-more">Show more</button>`
    )
}

addElement(rankUserContainer, createRankUser());
addElement(mainContainer, createFilterAndStatistics(), 'afterbegin');
addElement(mainContainer, createSorting());

// контейнер для секции "фильмы"
const filmsContainer = document.createElement('section');
filmsContainer.className = 'films';
filmsContainer.innerHTML = `
<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
      </div>`

mainContainer.append(filmsContainer)
const articleFilmsContainer = filmsContainer.querySelector('.films-list__container')  // добавляем контейнер непосредственно для карточек фильмов


// добавляем карточки фильмов
for (let i = 0; i < 5; i++) {
    addElement(articleFilmsContainer, createfilmArticle());
}

addElement(articleFilmsContainer, createShowMoreButton());

// добавляем топ-рейтинг фильмы
const topRatedFilms = document.createElement('section');
topRatedFilms.className = 'films-list--extra';
topRatedFilms.innerHTML = `<h2 class="films-list__title">Top rated</h2>
<div class="films-list__container"> </div>`

filmsContainer.append(topRatedFilms)
const topListFilmsArticles = topRatedFilms.querySelector('.films-list__container');

for (let i = 0; i < 2; i++) {
    addElement(topListFilmsArticles, createfilmArticle());
}

// добавляем рейтинг самых просматриваемых фильмов
const mostCommendedFilms = document.createElement('section');
mostCommendedFilms.className = 'films-list--extra';
mostCommendedFilms.innerHTML = `<h2 class="films-list__title">Most commented</h2>
<div class="films-list__container"> </div>`

filmsContainer.append(mostCommendedFilms);
const mostCommendedFilmsArticles = mostCommendedFilms.querySelector('.films-list__container');

for (let i = 0; i < 2; i++) {
    addElement(mostCommendedFilmsArticles, createfilmArticle());
}







/******/ })()
;
//# sourceMappingURL=main.js.map