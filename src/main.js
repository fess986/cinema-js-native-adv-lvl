import {render, remove} from './components/utils/render';
import {FilmBoardController} from './controlers/film-board-controler';
import {RankUserComponent} from './components/rank-user';
import {FilterAndStatisticsComponent} from './components/filter-and-statistics';
import {FilmsContainerComponent} from './components/films-container';
import {TopFilmsContainerComponent} from './components/top-rated-films-container';
import {MostCommendedFilmsContainerComponent} from './components/most-commended-films';
import {StatisticsComponent} from './components/statistics';
import {filtersDataMock} from './mock/filter-and-statistics-mok';
import {generateFilms} from './mock/film-articles-mock';
import {UserStatsComponent} from './components/user-stats';
import {popupOpenHandlerParams} from './components/popup/popup';

// константы
export const TOTAL_FILMS = 20;

// генерируем массив фильмов количеством TOTAL_FILMS
export const films = generateFilms(TOTAL_FILMS);

// основные элементы для вставки контента
const rankUserContainer = document.querySelector(`.header`);
export const mainContainer = document.querySelector(`.main`);
export const footerContainer = document.querySelector(`.footer`);
const filterAndStatistics = new FilterAndStatisticsComponent(filtersDataMock());

// рендерим фильтры и статистику
render(rankUserContainer, new RankUserComponent());
render(mainContainer, filterAndStatistics);

// статистика
const userStats = new UserStatsComponent(); // инициализация компонента
filterAndStatistics.setClickHandler(() => { // листнер на кнопку статистики
  remove(filmsBoard);
  render(mainContainer, userStats);
});

// секция "фильмы"
export const filmsBoard = new FilmsContainerComponent();
const boardController = new FilmBoardController(filmsBoard.getElement());
boardController.render(films);

// добавляем топ-рейтинг фильмы
const topFilms = new TopFilmsContainerComponent();
topFilms.render();
topFilms.setClickHandler(popupOpenHandlerParams(false));

// добавляем самые комментируемые фильмы
const mostRecomendedFilms = new MostCommendedFilmsContainerComponent();
mostRecomendedFilms.render();
mostRecomendedFilms.setClickHandler(popupOpenHandlerParams(false));

// добавление статистики
render(footerContainer, new StatisticsComponent());
