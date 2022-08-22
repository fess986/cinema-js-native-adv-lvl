import {render, remove} from './components/utils/render';
import {FilmBoardController} from './controlers/film-board-controler';
import {RankUserComponent} from './components/rank-user';
import {FilterAndStatisticsComponent} from './components/filter-and-statistics';
import {SortingComponent} from './components/sorting';
import {FilmsContainerComponent} from './components/films-container';
import {FilmArticleComponent} from './components/film-article';
// import {ShowMoreButtonComponent} from './components/show-more-button';
import {TopFilmsContainerComponent} from './components/top-rated-films-container';
import {MostCommendedFilmsContainerComponent} from './components/most-commended-films';
import {StatisticsComponent} from './components/statistics';
import {filtersDataMock} from './mock/filter-and-statistics-mok';
import {sortDataMock} from './mock/sorting-mock';
import {generateFilms} from './mock/film-articles-mock';
// import {UserStatsComponent} from './components/user-stats';
import {PopupComponent} from './components/popup/popup';
import {CommentComponent} from './components/popup/comments';
import {popupOpenHandlerParams} from './components/popup/popup';

// основные элементы для вставки контента
const rankUserContainer = document.querySelector(`.header`);
export const mainContainer = document.querySelector(`.main`);
const footerContainer = document.querySelector(`.footer`);

render(rankUserContainer, new RankUserComponent());
render(mainContainer, new FilterAndStatisticsComponent(filtersDataMock()));
render(mainContainer, new SortingComponent(sortDataMock));

// константы
export const TOTAL_FILMS = 20;

// генерируем массив фильмов количеством TOTAL_FILMS
export const films = generateFilms(TOTAL_FILMS);

// секция "фильмы"
export const filmsBoard = new FilmsContainerComponent();
const boardController = new FilmBoardController(filmsBoard.getElement());

boardController.render(films);

// добавляем топ-рейтинг фильмы
const topFilms = new TopFilmsContainerComponent();
render(filmsBoard.getElement(), topFilms);
const topFilmsContainer = mainContainer.querySelectorAll(`.films-list__container`)[1]; // лучше через айдишник - тут чисто для разминки

for (let i = 0; i < 2; i++) {
  render(topFilmsContainer, new FilmArticleComponent(films[i]));
}


topFilms.setClickHandler(popupOpenHandlerParams(false));

// добавляем самые комментируемые фильмы
const mostRecomendedFilms = new MostCommendedFilmsContainerComponent();
render(filmsBoard.getElement(), mostRecomendedFilms);
const mostCommentedFilmsContainer = document.querySelector(`#mostCommentedFilmsContainer`);

for (let i = 0; i < 2; i++) {
  render(mostCommentedFilmsContainer, new FilmArticleComponent(films[i]));
}

mostRecomendedFilms.setClickHandler(popupOpenHandlerParams(false));

// добавление статистики пользователя по необходимости
// render(mainContainer, new UserStatsComponent().getElement());

render(footerContainer, new StatisticsComponent());

// добавление попапа по необходимости
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

  // popupComponent.getElement().hidden = true;

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

