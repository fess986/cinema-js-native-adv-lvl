import { render } from './utils';
import {addElement} from './add-elements';
import {createRankUser} from './components/rank-user';
import {createFilterAndStatistics, FilterAndStatisticsComponent} from './components/filter-and-statistics';
import {createSorting} from './components/sorting';
import {createFilmsContainer} from './components/films-container';
import {createFilmArticle} from './components/film-article';
import {createShowMoreButton} from './components/show-more-button';
import {createTopFilmsContainer} from './components/top-reated-films-container';
import {createMostCommendedFilmsContainer} from './components/most-commended-films';
import {createStatistics} from './components/statistics';
import {filtersDataMock} from './mock/filter-and-statistics-mok';
import {sortDataMock} from './mock/sorting-mock';
import {filmArticleDataMock, generateFilms} from './mock/film-articles-mock';
// import { createUserStats } from './components/user-stats';
// import {createPopup} from './components/popup/popup';

// основные элементы для вставки контента
const rankUserContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const footerContainer = document.querySelector(`.footer`);

addElement(rankUserContainer, createRankUser());
// addElement(mainContainer, createFilterAndStatistics(filtersDataMock()), `afterbegin`);
render(mainContainer, new FilterAndStatisticsComponent(filtersDataMock()).getElement());
addElement(mainContainer, createSorting(sortDataMock));

// контейнер для секции "фильмы"
addElement(mainContainer, createFilmsContainer());

const filmsContainer = mainContainer.querySelector(`.films`);
const articleFilmsContainer = mainContainer.querySelector(`.films-list__container`); // добавляем контейнер непосредственно для карточек фильмов

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
addElement(filmsContainer, createTopFilmsContainer());
const topFilmsContainer = mainContainer.querySelectorAll(`.films-list__container`)[1];  // лучше через айдишник - тут чисто для разминки

for (let i = 0; i < 2; i++) {
  addElement(topFilmsContainer, createFilmArticle(filmArticleDataMock()));
}

// добавляем самые комментируемые фильмы
addElement(filmsContainer, createMostCommendedFilmsContainer());
const mostCommentedFilmsContainer = document.querySelector(`#mostCommentedFilmsContainer`);
console.log(mostCommentedFilmsContainer);

for (let i = 0; i < 2; i++) {
  addElement(mostCommentedFilmsContainer, createFilmArticle(filmArticleDataMock()));
}

// добавление статистики пользователя по необходимости
// addElement(mainContainer, createUserStats());

addElement(footerContainer, createStatistics());

// добавление попапа по необходимости
// addElement(footerContainer, createPopup(films[0]), `afterEnd`);

