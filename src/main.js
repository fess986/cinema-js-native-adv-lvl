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
// const filterAndStatistics = new FilterAndStatisticsComponent(filtersDataMock());

// рендерим фильтры и статистику
render(rankUserContainer, new RankUserComponent());

const filterController = new FilterController(mainContainer, filmsModel);
filterController.render();

// статистика
const userStats = new UserStatsComponent(); // инициализация компонента

// filterAndStatistics.setCalendarClickHandler(() => {});

// секция "фильмы"
export const filmsBoard = new FilmsContainerComponent();
const boardController = new FilmBoardController(filmsBoard.getElement(), filmsModel);
boardController.render(films);

// добавление статистики
render(footerContainer, new StatisticsComponent());
