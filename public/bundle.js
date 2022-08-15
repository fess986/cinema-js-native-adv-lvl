/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/add-elements.js":
/*!*****************************!*\
  !*** ./src/add-elements.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addElement": () => (/* binding */ addElement)
/* harmony export */ });
// универсальная функция по добавлению элементов в вёрстку
const addElement = function (container, element, where = `beforeend`) {
  container.insertAdjacentHTML(where, element);
};




/***/ }),

/***/ "./src/components/film-article.js":
/*!****************************************!*\
  !*** ./src/components/film-article.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFilmArticle": () => (/* binding */ createFilmArticle)
/* harmony export */ });
const createFilmArticle = (filmArticle) => {

  const {title, rating, year, runTime, genre, img, description, comments, userDetails} = filmArticle;

  const duration = `${Math.floor(runTime / 60)}h ${runTime % 60}m`;
  const releaseDate = new Date(Date.parse(filmArticle.releaseDate));

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${releaseDate.getFullYear()}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src="${img}" alt="" class="film-card__poster">
        <p class="film-card__description">${description.length > 139 ? description.slice(1, 139) + `...` : description}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${userDetails.isWatchlistActive ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${userDetails.isWatchedtActive ? `film-card__controls-item--active` : ``}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${userDetails.isFavoriteActive ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
        </form>
      </article>`
  );
};


/***/ }),

/***/ "./src/components/filter-and-statistics.js":
/*!*************************************************!*\
  !*** ./src/components/filter-and-statistics.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFilterAndStatistics": () => (/* binding */ createFilterAndStatistics)
/* harmony export */ });

const filterItem = (filter, isActive) => {
  const {name, count} = filter;
  return (
    `<a href="#watchlist" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${name} ${count !== 0 ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`
  );
};
// создаем шаблон элемента "Меню (фильтры и статистика)"


const createFilterAndStatistics = (filters) => {
  const textData = filters.map((item, index) => {
    return filterItem(item, index === 0);
  }).join(`\n`);

  return (
    `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${textData}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>

      </nav>`
  );
};



/***/ }),

/***/ "./src/components/rank-user.js":
/*!*************************************!*\
  !*** ./src/components/rank-user.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createRankUser": () => (/* binding */ createRankUser)
/* harmony export */ });
// создаем шаблон элемента "Звание пользователя"
const createRankUser = () => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};


/***/ }),

/***/ "./src/components/show-more-button.js":
/*!********************************************!*\
  !*** ./src/components/show-more-button.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShowMoreButton": () => (/* binding */ createShowMoreButton)
/* harmony export */ });
const createShowMoreButton = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};


/***/ }),

/***/ "./src/components/sorting.js":
/*!***********************************!*\
  !*** ./src/components/sorting.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSorting": () => (/* binding */ createSorting)
/* harmony export */ });
const sortItem = (name, isActive) => {
  return (
    `<li><a href="#" class="sort__button ${isActive ? `sort__button--active` : ``}">${name}</a></li>
    `
  );
};

const createSorting = (data) => {
  const dataSort = data.map((item, index) => {
    return sortItem(item, index === 0);
  }).join(`\n`);

  return (
    `<ul class="sort">
        ${dataSort}
      </ul>`
  );
};


/***/ }),

/***/ "./src/components/statistics.js":
/*!**************************************!*\
  !*** ./src/components/statistics.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createStatistics": () => (/* binding */ createStatistics)
/* harmony export */ });
const createStatistics = () => {
  return (
    `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`
  );
};


/***/ }),

/***/ "./src/const/const.js":
/*!****************************!*\
  !*** ./src/const/const.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FILM_ARTICLES": () => (/* binding */ FILM_ARTICLES),
/* harmony export */   "FILM_COMMENTS": () => (/* binding */ FILM_COMMENTS),
/* harmony export */   "MONTH": () => (/* binding */ MONTH)
/* harmony export */ });
const FILM_ARTICLES = {
  title: [`one`, `two`, `three`, `four`, `five`, `six`],
  img: [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`],
  description: `Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Cras aliquet  varius magna, non porta ligula feugiat
  eget. Fusce tristique felis at fermentum  pharetra. Aliquam id orci ut lectus varius  viverra. Nullam nunc ex, convallis sed
  finibus eget, sollicitudin eget ante.  Phasellus eros mauris, condimentum sed
  nibh vitae, sodales efficitur ipsum. Sed  blandit, eros vel aliquam faucibus, purus  ex euismod diam, eu luctus nunc ante ut  dui. Sed sed nisi sed augue convallis  suscipit in sed felis. Aliquam erat  volutpat. Nunc fermentum tortor ac porta  dapibus. In rutrum ac purus sit amet tempus.`,
  genre: [`comedy`, `fighting`, `horror`, `drama`, `musical`],
  writers: [`Din Kuntz`, `Pehov`, `Joe Abercrombi`, `Patrik Ruffus`, `Erixon`],
  actors: [`Lui De Fines`, `Charli Chaplin`, `Janifer Aniston`, `Big Ban`],
  country: [`Russia`, `USA`, `India`],

};

const FILM_COMMENTS = {
  arthor: [`Max`, `Illia`, `John Snow`, `Lady Gaga`, `Brad Pitt`, `Ass Hole`],
  comment: [`good Film!`, `Amazing Film!`, `Not good film`, `Boooooooriiiing!!!`, `it's terrible! I have pised my shorts!`, `It's very funny!`, `its very dramatic!`],
  emotion: [`smile`, `sleeping`, `puke`, `angry`],
  date: `2019-05-11T16:12:32.554Z`,
};

const MONTH = [`January`, `February`, `Marth`, `April`, `May`, `June`, `July`, `August`, `September`, `November`, `December`];


/***/ }),

/***/ "./src/mock/film-articles-mock.js":
/*!****************************************!*\
  !*** ./src/mock/film-articles-mock.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filmArticleDataMock": () => (/* binding */ filmArticleDataMock),
/* harmony export */   "generateFilms": () => (/* binding */ generateFilms)
/* harmony export */ });
/* harmony import */ var _const_const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const/const */ "./src/const/const.js");



const generateTitle = () => {
  return _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_ARTICLES.title[Math.floor(Math.random() * _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_ARTICLES.title.length)];
};

const generateImg = () => {
  return _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_ARTICLES.img[Math.floor(Math.random() * _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_ARTICLES.img.length)];
};

// const arr = FILM_ARTICLES.description.split('.');
// console.log(FILM_ARTICLES.description.split(`.`));

const generateDescription = () => {
  const arr = _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_ARTICLES.description.split(`.`);
  const setArr = new Set();
  for (let i = 0; i < 5; i++) {
    setArr.add(arr[Math.floor(Math.random() * arr.length)]);
  }
  return Array.from(setArr).join(`. `);
};

const generateRating = () => {
  return (Math.random() * 10).toFixed(1);
};

const generateYear = () => {
  return 1972 + Math.floor(Math.random() * 50);
};

const generateGenre = () => {
  let numberGenres = Math.floor(Math.random() * _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_ARTICLES.genre.length) + 1;
  const genres = [];
  for (let i = 0; i < numberGenres; i++) {
    let addingGenre = _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_ARTICLES.genre[Math.floor(Math.random() * numberGenres)];
    if (!genres.includes(addingGenre)) {
      genres.push(addingGenre);
    }
  }
  return genres;
};

const generateWriters = () => {
  let numberWriters = Math.floor(Math.random() * _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_ARTICLES.writers.length) + 1;
  const writers = [];
  for (let i = 0; i < numberWriters; i++) {
    let addingWriters = _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_ARTICLES.writers[Math.floor(Math.random() * numberWriters)];
    if (!writers.includes(addingWriters)) {
      writers.push(addingWriters);
    }
  }
  return writers;
};

const generateActors = () => {
  let numberActors = Math.floor(Math.random() * _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_ARTICLES.actors.length) + 1;
  const actors = [];
  for (let i = 0; i < numberActors; i++) {
    let addingActors = _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_ARTICLES.actors[Math.floor(Math.random() * numberActors)];
    if (!actors.includes(addingActors)) {
      actors.push(addingActors);
    }
  }
  return actors;
};

const filmArticleCommentMock = () => {
  return {
    'id': Math.floor(Math.random() * 500),
    'author': _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_COMMENTS.arthor[Math.floor(Math.random() * _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_COMMENTS.arthor.length)],
    "comment": _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_COMMENTS.comment[Math.floor(Math.random() * _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_COMMENTS.comment.length)],
    'date': `2019-05-11T16:12:32.554Z`,
    "emotion": _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_COMMENTS.emotion[Math.floor(Math.random() * _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_COMMENTS.emotion.length)],
  };
};

const generateComments = () => {
  return new Array(Math.floor(Math.random() * 5) + 1).fill(``).map(() => {
    return filmArticleCommentMock();
  });
};

const filmArticleDataMock = () => {
  return {
    'id': Math.floor(Math.random() * 500),
    'title': generateTitle(),
    'rating': `${generateRating()}`,
    'year': generateYear(),
    'releaseDate': `2019-05-11T00:00:00.000Z`,
    'runTime': 135,
    'genre': generateGenre(),
    'img': `./images/posters/${generateImg()}`,
    'description': `${generateDescription()}`,
    'comments': generateComments(),
    "alternativeTitle": `alternative_title`,
    "ageRating": Math.floor(Math.random() * 17) + 1,
    "director": `James Cameron`,
    "writers": generateWriters(),
    "actors": generateActors(),
    "country": _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_ARTICLES.country[Math.floor(Math.random() * _const_const__WEBPACK_IMPORTED_MODULE_0__.FILM_ARTICLES.country.length)],
    "userDetails": {
      'isWatchlistActive': Math.random() > 0.5,
      'isWatchedtActive': Math.random() > 0.5,
      'isFavoriteActive': Math.random() > 0.5,
      'watchingDate': `2019-04-12T16:12:32.554Z`
    }

  };
};


const generateFilms = (count) => {
  return new Array(count).fill(``).map(() => {
    return filmArticleDataMock();
  });
};




/***/ }),

/***/ "./src/mock/filter-and-statistics-mok.js":
/*!***********************************************!*\
  !*** ./src/mock/filter-and-statistics-mok.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filtersDataMock": () => (/* binding */ filtersDataMock)
/* harmony export */ });
const filterNames = [`All movies`, `Watchlist`, `History`, `Favorites`];

const filtersDataMock = () => {
  return filterNames.map((item, index) => {
    return {
      name: item,
      count: index === 0 ? 0 : Math.floor(Math.random() * 100)
    };
  });
};




/***/ }),

/***/ "./src/mock/sorting-mock.js":
/*!**********************************!*\
  !*** ./src/mock/sorting-mock.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sortDataMock": () => (/* binding */ sortDataMock)
/* harmony export */ });
const sortDataMock = [`Sort by default`, `
Sort by date`, `
Sort by rating`];




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _add_elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-elements */ "./src/add-elements.js");
/* harmony import */ var _components_rank_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/rank-user */ "./src/components/rank-user.js");
/* harmony import */ var _components_filter_and_statistics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/filter-and-statistics */ "./src/components/filter-and-statistics.js");
/* harmony import */ var _components_sorting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/sorting */ "./src/components/sorting.js");
/* harmony import */ var _components_film_article__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/film-article */ "./src/components/film-article.js");
/* harmony import */ var _components_show_more_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/show-more-button */ "./src/components/show-more-button.js");
/* harmony import */ var _components_statistics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/statistics */ "./src/components/statistics.js");
/* harmony import */ var _mock_filter_and_statistics_mok__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mock/filter-and-statistics-mok */ "./src/mock/filter-and-statistics-mok.js");
/* harmony import */ var _mock_sorting_mock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mock/sorting-mock */ "./src/mock/sorting-mock.js");
/* harmony import */ var _mock_film_articles_mock__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mock/film-articles-mock */ "./src/mock/film-articles-mock.js");










// import { createUserStats } from './components/user-stats';
// import {createPopup} from './components/popup/popup';

// console.log(filmArticleDataMock());
// console.log(generateFilms(5));

// основные элементы для вставки контента
const rankUserContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const footerContainer = document.querySelector(`.footer`);

(0,_add_elements__WEBPACK_IMPORTED_MODULE_0__.addElement)(rankUserContainer, (0,_components_rank_user__WEBPACK_IMPORTED_MODULE_1__.createRankUser)());
(0,_add_elements__WEBPACK_IMPORTED_MODULE_0__.addElement)(mainContainer, (0,_components_filter_and_statistics__WEBPACK_IMPORTED_MODULE_2__.createFilterAndStatistics)((0,_mock_filter_and_statistics_mok__WEBPACK_IMPORTED_MODULE_7__.filtersDataMock)()), `afterbegin`);
(0,_add_elements__WEBPACK_IMPORTED_MODULE_0__.addElement)(mainContainer, (0,_components_sorting__WEBPACK_IMPORTED_MODULE_3__.createSorting)(_mock_sorting_mock__WEBPACK_IMPORTED_MODULE_8__.sortDataMock));

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

const films = (0,_mock_film_articles_mock__WEBPACK_IMPORTED_MODULE_9__.generateFilms)(TOTAL_FILMS);

films.slice(0, SHOWN_FILMS).forEach((item) => {
  (0,_add_elements__WEBPACK_IMPORTED_MODULE_0__.addElement)(articleFilmsContainer, (0,_components_film_article__WEBPACK_IMPORTED_MODULE_4__.createFilmArticle)(item));
});

// добавляем кнопку "показать больше фильмов"
(0,_add_elements__WEBPACK_IMPORTED_MODULE_0__.addElement)(articleFilmsContainer, (0,_components_show_more_button__WEBPACK_IMPORTED_MODULE_5__.createShowMoreButton)(), `afterEnd`);
const moreButton = mainContainer.querySelector(`.films-list__show-more`);
let prevFilms = SHOWN_FILMS;

moreButton.addEventListener(`click`, () => {
  let currentFilms = prevFilms + ADD_FILMS;
  films.slice(prevFilms, currentFilms).forEach((item) => {
    (0,_add_elements__WEBPACK_IMPORTED_MODULE_0__.addElement)(articleFilmsContainer, (0,_components_film_article__WEBPACK_IMPORTED_MODULE_4__.createFilmArticle)(item));
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
  (0,_add_elements__WEBPACK_IMPORTED_MODULE_0__.addElement)(topListFilmsArticles, (0,_components_film_article__WEBPACK_IMPORTED_MODULE_4__.createFilmArticle)((0,_mock_film_articles_mock__WEBPACK_IMPORTED_MODULE_9__.filmArticleDataMock)()));
}

// добавляем рейтинг самых просматриваемых фильмов
const mostCommendedFilms = document.createElement(`section`);
mostCommendedFilms.className = `films-list--extra`;
mostCommendedFilms.innerHTML = `<h2 class="films-list__title">Most commented</h2>
<div class="films-list__container"> </div>`;

filmsContainer.append(mostCommendedFilms);
const mostCommendedFilmsArticles = mostCommendedFilms.querySelector(`.films-list__container`);

for (let i = 0; i < 2; i++) {
  (0,_add_elements__WEBPACK_IMPORTED_MODULE_0__.addElement)(mostCommendedFilmsArticles, (0,_components_film_article__WEBPACK_IMPORTED_MODULE_4__.createFilmArticle)((0,_mock_film_articles_mock__WEBPACK_IMPORTED_MODULE_9__.filmArticleDataMock)()));
}

// добавление статистики пользователя по необходимости
// addElement(mainContainer, createUserStats());

(0,_add_elements__WEBPACK_IMPORTED_MODULE_0__.addElement)(footerContainer, (0,_components_statistics__WEBPACK_IMPORTED_MODULE_6__.createStatistics)());

// добавление попапа по необходимости
// addElement(footerContainer, createPopup(films[0]), `afterEnd`);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map