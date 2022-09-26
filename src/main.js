import {
  render,
  remove
} from './components/utils/render';
import {
  FilmBoardController
} from './controlers/film-board-controler';
import {
  RankUserComponent
} from './components/rank-user';
import {
  FilterAndStatisticsComponent
} from './components/filter-and-statistics';
import {
  FilmsContainerComponent
} from './components/films-container';
import {
  StatisticsComponent
} from './components/statistics';
import {
  filtersDataMock
} from './mock/filter-and-statistics-mok';
import {
  generateFilms
} from './mock/film-articles-mock';
import {
  UserStatsComponent
} from './components/user-stats';
import {
  FilmsModel
} from './model/movie';
import {
  FilterController
} from './controlers/filter-controller';
import {UserStatsController} from './controlers/statistics-controller';

// константы
export const TOTAL_FILMS = 20;

// генерируем массив фильмов количеством TOTAL_FILMS
export let films = generateFilms(TOTAL_FILMS);
const filmsModel = new FilmsModel(films);
filmsModel.setFilms(films);

// основные элементы для вставки контента
const rankUserContainer = document.querySelector(`.header`);
export const mainContainer = document.querySelector(`.main`);
export const footerContainer = document.querySelector(`.footer`);
export const filmsBoard = new FilmsContainerComponent();

const changeVision = (mode) => {
  if (mode === `statistics`) {
    boardController.hide();
    userStatsController.show();
  } else {
    userStatsController.hide();
    boardController.show();
  }

};

// загружаем контроллеры
const filterController = new FilterController(mainContainer, filmsModel, changeVision);
const boardController = new FilmBoardController(filmsBoard.getElement(), filmsModel);
const userStatsController = new UserStatsController(mainContainer); // инициализация компонента


// рендерим фильтры, доску и статистику
render(rankUserContainer, new RankUserComponent());
filterController.render();
boardController.renderBoard(films);
userStatsController.render();

boardController.hide();
boardController.show();

userStatsController.hide();
// userStatsController.show();

// добавление статистики
render(footerContainer, new StatisticsComponent());
