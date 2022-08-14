import {addElement} from './add-elements';
import {createRankUser} from './components/rank-user';
import {createFilterAndStatistics} from './components/filter-and-statistics';
import {createSorting} from './components/sorting';
import {createFilmArticle} from './components/film-article';
import {createShowMoreButton} from './components/show-more-button';
import {createStatistics} from './components/statistics';
import {filtersDataMock} from './mock/filter-and-statistics-mok';
import {sortDataMock} from './mock/sorting-mock';
import {filmArticleDataMock, generateFilms} from './mock/film-articles-mock';
// import { createUserStats } from './components/user-stats';
// import {createPopup} from './components/popup/popup';

// console.log(filmArticleDataMock());
// console.log(generateFilms(5));

// основные элементы для вставки контента
const rankUserContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const footerContainer = document.querySelector(`.footer`);

addElement(rankUserContainer, createRankUser());
addElement(mainContainer, createFilterAndStatistics(filtersDataMock()), `afterbegin`);
addElement(mainContainer, createSorting(sortDataMock));

// контейнер для секции "фильмы"
const filmsContainer = document.createElement(`section`);
filmsContainer.className = `films`;
filmsContainer.innerHTML = `
<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>`;

mainContainer.append(filmsContainer);
const articleFilmsContainer = filmsContainer.querySelector(`.films-list__container`); // добавляем контейнер непосредственно для карточек фильмов

const TOTAL_FILMS = 20;
const SHOWN_FILMS = 5;
const ADD_FILMS = 5;

const films = generateFilms(TOTAL_FILMS);

films.slice(0, SHOWN_FILMS).forEach((item) => {
  addElement(articleFilmsContainer, createFilmArticle(item));
});

// добавляем кнопку "показать больше фильмов"
addElement(articleFilmsContainer, createShowMoreButton(), `afterEnd`);
const moreButton = mainContainer.querySelector(`.films-list__show-more`);
let prevFilms = SHOWN_FILMS;

moreButton.addEventListener(`click`, () => {
  let currentFilms = prevFilms + ADD_FILMS;
  films.slice(prevFilms, currentFilms).forEach((item) => {
    addElement(articleFilmsContainer, createFilmArticle(item));
  });
  prevFilms = currentFilms;
  if (currentFilms >= TOTAL_FILMS) {
    moreButton.remove();
  }
});

// добавляем топ-рейтинг фильмы
const topRatedFilms = document.createElement(`section`);
topRatedFilms.className = `films-list--extra`;
topRatedFilms.innerHTML = `<h2 class="films-list__title">Top rated</h2>
<div class="films-list__container"> </div>`;

filmsContainer.append(topRatedFilms);
const topListFilmsArticles = topRatedFilms.querySelector(`.films-list__container`);

for (let i = 0; i < 2; i++) {
  addElement(topListFilmsArticles, createFilmArticle(filmArticleDataMock()));
}

// добавляем рейтинг самых просматриваемых фильмов
const mostCommendedFilms = document.createElement(`section`);
mostCommendedFilms.className = `films-list--extra`;
mostCommendedFilms.innerHTML = `<h2 class="films-list__title">Most commented</h2>
<div class="films-list__container"> </div>`;

filmsContainer.append(mostCommendedFilms);
const mostCommendedFilmsArticles = mostCommendedFilms.querySelector(`.films-list__container`);

for (let i = 0; i < 2; i++) {
  addElement(mostCommendedFilmsArticles, createFilmArticle(filmArticleDataMock()));
}

// добавление статистики пользователя по необходимости
// addElement(mainContainer, createUserStats());

addElement(footerContainer, createStatistics());

// добавление попапа по необходимости
// addElement(footerContainer, createPopup(films[0]), `afterEnd`);
