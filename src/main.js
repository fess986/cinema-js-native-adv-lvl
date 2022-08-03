import {addElement} from './add-elements';
import {createRankUser} from './components/rank-user';
import {createFilterAndStatistics} from './components/filter-and-statistics';
import {createSorting} from './components/sorting';
import {createFilmArticle} from './components/film-article';
import {createShowMoreButton} from './components/show-more-button';


// основные элементы для вставки контента
const rankUserContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
// const footerContainer = document.querySelector(`.footer`);

addElement(rankUserContainer, createRankUser());
addElement(mainContainer, createFilterAndStatistics(), `afterbegin`);
addElement(mainContainer, createSorting());

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


// добавляем карточки фильмов
for (let i = 0; i < 5; i++) {
  addElement(articleFilmsContainer, createFilmArticle());
}

// добавляем кнопку "показать больше фильмов"
addElement(articleFilmsContainer, createShowMoreButton());

// добавляем топ-рейтинг фильмы
const topRatedFilms = document.createElement(`section`);
topRatedFilms.className = `films-list--extra`;
topRatedFilms.innerHTML = `<h2 class="films-list__title">Top rated</h2>
<div class="films-list__container"> </div>`;

filmsContainer.append(topRatedFilms);
const topListFilmsArticles = topRatedFilms.querySelector(`.films-list__container`);

for (let i = 0; i < 2; i++) {
  addElement(topListFilmsArticles, createFilmArticle());
}

// добавляем рейтинг самых просматриваемых фильмов
const mostCommendedFilms = document.createElement(`section`);
mostCommendedFilms.className = `films-list--extra`;
mostCommendedFilms.innerHTML = `<h2 class="films-list__title">Most commented</h2>
<div class="films-list__container"> </div>`;

filmsContainer.append(mostCommendedFilms);
const mostCommendedFilmsArticles = mostCommendedFilms.querySelector(`.films-list__container`);

for (let i = 0; i < 2; i++) {
  addElement(mostCommendedFilmsArticles, createFilmArticle());
}
