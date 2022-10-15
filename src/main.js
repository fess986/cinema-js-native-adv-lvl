import {render, remove} from './components/utils/render';
import {FilmBoardController} from './controlers/film-board-controler';
import {RankUserComponent} from './components/rank-user';
import {FilmsContainerComponent} from './components/films-container';
import {StatisticsComponent} from './components/statistics';
import {FilmsModel} from './model/movie';
import {FilterController} from './controlers/filter-controller';
import {UserStatsController} from './controlers/statistics-controller';
import {AUTHORIZATION, END_POINT} from './const/const';
import {API} from './api/api';
import {FilmsAPI} from './model/api-movies';
import {Loading} from './components/loading';
import {Store} from './api/store';
import {Provider} from './api/provider';

const STORE_FILMS_PREFIX = `kinomaster-localstorage-films`;
const STORE_FILMS_VERSION = `V1`;
const STORE_FILMS_NAME = `${STORE_FILMS_PREFIX}-${STORE_FILMS_VERSION}`;

const STORE_COMMENTS_PREFIX = `kinomaster-localstorage-comments`;
const STORE_COMMENTS_VERSION = `V1`;
const STORE_COMMENTS_NAME = `${STORE_COMMENTS_PREFIX}-${STORE_COMMENTS_VERSION}`;

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(window.localStorage, STORE_FILMS_NAME, STORE_COMMENTS_NAME);
const provider = new Provider(api, store);

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  provider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});

// window.addEventListener(`load`, () => {
//   navigator.serviceWorker.register(`./sw.js`);
// });

// основные элементы для вставки контента
const rankUserContainer = document.querySelector(`.header`);
export const mainContainer = document.querySelector(`.main`);
export const footerContainer = document.querySelector(`.footer`);
export const filmsBoard = new FilmsContainerComponent();

// загрузочный экран
const loading = new Loading();
render(mainContainer, loading, `afterbegin`);

provider.getFilms() // получаем список фильмов с сервера
.then(FilmsAPI.transformAllDataFromServer) // преобразуем их в наш формат
.then((films) => {

  // добавляем каждому фильму комменты по их айдишникам, чтобы к каждому фильму присваивались его комменты в полном объеме, как реализовано в проекте
  films = films.map((film) => {
    provider.getComments(film.id).then((data) => {
      film.comments = data;
    });

    return film;
  });

  const filmsModel = new FilmsModel();
  filmsModel.setFilms(films);

  const changeVision = (mode) => {
    if (mode === `statistics`) {
      boardController.hide();
      userStatsController.show();
    } else {
      userStatsController.hide();
      boardController.show();
    }
  };

  const filterController = new FilterController(mainContainer, filmsModel, changeVision);
  const boardController = new FilmBoardController(filmsBoard.getElement(), filmsModel, provider);
  const userStatsController = new UserStatsController(mainContainer, filmsModel);

  // убираем загрузочный экран после загрузки фильмов
  remove(loading);

  // рендерим фильтры, доску и статистику
  render(rankUserContainer, new RankUserComponent());
  filterController.render();
  boardController.renderBoard(films);
  userStatsController.render();
  userStatsController.hide();

  // добавление статистики
  render(footerContainer, new StatisticsComponent(filmsModel.getAllFilms()));


});

