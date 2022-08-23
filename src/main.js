import {render, remove} from './components/utils/render';
import {FilmBoardController} from './controlers/film-board-controler';
import {RankUserComponent} from './components/rank-user';
import {FilterAndStatisticsComponent} from './components/filter-and-statistics';
import {SortingComponent} from './components/sorting';
import {FilmsContainerComponent} from './components/films-container';
import {TopFilmsContainerComponent} from './components/top-rated-films-container';
import {MostCommendedFilmsContainerComponent} from './components/most-commended-films';
import {StatisticsComponent} from './components/statistics';
import {filtersDataMock} from './mock/filter-and-statistics-mok';
import {sortDataMock} from './mock/sorting-mock';
import {generateFilms} from './mock/film-articles-mock';
import {UserStatsComponent} from './components/user-stats';
import {PopupComponent} from './components/popup/popup';
import {CommentComponent} from './components/popup/comments';
import {popupOpenHandlerParams} from './components/popup/popup';

// константы
export const TOTAL_FILMS = 20;

// генерируем массив фильмов количеством TOTAL_FILMS
export const films = generateFilms(TOTAL_FILMS);

// основные элементы для вставки контента
const rankUserContainer = document.querySelector(`.header`);
export const mainContainer = document.querySelector(`.main`);
const footerContainer = document.querySelector(`.footer`);

const filterAndStatistics = new FilterAndStatisticsComponent(filtersDataMock());
render(rankUserContainer, new RankUserComponent());
render(mainContainer, filterAndStatistics);
render(mainContainer, new SortingComponent(sortDataMock));


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

// рендер комментариев
const renderComments = (commentsContainer, comments) => {
  let renderComment;
  for (let i = 0; i < comments.length; i++) {
    renderComment = new CommentComponent(comments[i]);
    render(commentsContainer, renderComment);
  }
};

export const renderPopup = (film) => {
  document.body.style.overflow = `hidden`; // убираем прокрутку основного документа

  const unRenderPopup = () => {
    remove(popupComponent);
  };

  const popupComponent = new PopupComponent(film);
  render(footerContainer, popupComponent, `afterend`);

  const commentsContainer = popupComponent.getElement().querySelector(`.film-details__comments-list`);
  renderComments(commentsContainer, film.comments);

  const closePopup = popupComponent.getElement().querySelector(`.film-details__close-btn`);

  closePopup.addEventListener(`click`, () => {
    document.body.style.overflowY = `auto`; // возвращаем прокрутку
    unRenderPopup();
  });

  const closePopupWidthKeybord = (evt) => {
    if (evt.code === `Escape`) {
      document.body.style.overflowY = `auto`; // возвращаем прокрутку
      unRenderPopup();
      document.removeEventListener(`keydown`, closePopupWidthKeybord);
    }
  };

  document.addEventListener(`keydown`, closePopupWidthKeybord);
};

