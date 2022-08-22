import {render} from './utils';
import {RankUserComponent} from './components/rank-user';
import {FilterAndStatisticsComponent} from './components/filter-and-statistics';
import {SortingComponent} from './components/sorting';
import {FilmsContainerComponent} from './components/films-container';
import {FilmArticleComponent} from './components/film-article';
import {ShowMoreButtonComponent} from './components/show-more-button';
import {TopFilmsContainerComponent} from './components/top-reated-films-container';
import {MostCommendedFilmsContainerComponent} from './components/most-commended-films';
import {StatisticsComponent} from './components/statistics';
import {filtersDataMock} from './mock/filter-and-statistics-mok';
import {sortDataMock} from './mock/sorting-mock';
import {generateFilms} from './mock/film-articles-mock';
// import {UserStatsComponent} from './components/user-stats';
import {PopupComponent} from './components/popup/popup';
import {CommentComponent} from './components/popup/comments';

// основные элементы для вставки контента
const rankUserContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const footerContainer = document.querySelector(`.footer`);

render(rankUserContainer, new RankUserComponent().getElement());
// addElement(mainContainer, createFilterAndStatistics(filtersDataMock()), `afterbegin`);
render(mainContainer, new FilterAndStatisticsComponent(filtersDataMock()).getElement());
render(mainContainer, new SortingComponent(sortDataMock).getElement());

// константы
const TOTAL_FILMS = 20;
const SHOWN_FILMS = 5;
const ADD_FILMS = 5;
const films = generateFilms(TOTAL_FILMS);
let prevFilms = SHOWN_FILMS;

// контейнер для секции "фильмы"
const filmsBoard = new FilmsContainerComponent();
const articleFilmsContainer = filmsBoard.getElement().querySelector(`.films-list__container`);
const filmsContainer = filmsBoard.getElement();

articleFilmsContainer.addEventListener(`click`, (evt) => {
  if (evt.target.className === `film-card__poster` || `film-card__comments`) {
    const thisFilm = evt.target.parentElement.dataset.id;
    const targetFilm = films.find((item) => item.id.toString() === thisFilm);
    renderPopup(targetFilm);
  }
});

const renderFilms = () => {
  films.slice(0, SHOWN_FILMS).forEach((item) => {
    render(articleFilmsContainer, new FilmArticleComponent(item).getElement());
  });
};

const renderBoard = (board) => {
  render(mainContainer, board.getElement());
  // добавляем контейнер непосредственно для карточек фильмов
  renderFilms();
};

renderBoard(filmsBoard);

// добавляем кнопку "показать больше фильмов"
const moreButton = new ShowMoreButtonComponent().getElement();
render(articleFilmsContainer, moreButton, `afterend`);

// логика добавления фильмов на доску

moreButton.addEventListener(`click`, () => {
  let currentFilms = prevFilms + ADD_FILMS;
  films.slice(prevFilms, currentFilms).forEach((item) => {
    render(articleFilmsContainer, new FilmArticleComponent(item).getElement());
  });
  prevFilms = currentFilms;
  if (currentFilms >= TOTAL_FILMS) {
    moreButton.remove();
  }
});

// добавляем топ-рейтинг фильмы
render(filmsContainer, new TopFilmsContainerComponent().getElement());
const topFilmsContainer = mainContainer.querySelectorAll(`.films-list__container`)[1]; // лучше через айдишник - тут чисто для разминки

for (let i = 0; i < 2; i++) {
  render(topFilmsContainer, new FilmArticleComponent(films[i]).getElement());
}

topFilmsContainer.addEventListener(`click`, (evt) => {
  if (evt.target.className === `film-card__poster` || `film-card__comments`) {
    const thisFilm = evt.target.parentElement.dataset.id;
    const targetFilm = films.find((item) => item.id.toString() === thisFilm);
    renderPopup(targetFilm);
  }
});

// добавляем самые комментируемые фильмы
render(filmsContainer, new MostCommendedFilmsContainerComponent().getElement());
const mostCommentedFilmsContainer = document.querySelector(`#mostCommentedFilmsContainer`);

for (let i = 0; i < 2; i++) {
  render(mostCommentedFilmsContainer, new FilmArticleComponent(films[i]).getElement());
}

mostCommentedFilmsContainer.addEventListener(`click`, (evt) => {
  if (evt.target.className === `film-card__poster` || `film-card__comments`) {
    const thisFilm = evt.target.parentElement.dataset.id;
    const targetFilm = films.find((item) => item.id.toString() === thisFilm);
    renderPopup(targetFilm);
  }
});

// добавление статистики пользователя по необходимости
// render(mainContainer, new UserStatsComponent().getElement());

render(footerContainer, new StatisticsComponent().getElement());

// добавление попапа по необходимости
// рендер комментариев
const renderComments = (commentsContainer, comments) => {
  let renderComment;
  for (let i = 0; i < comments.length; i++) {
    renderComment = new CommentComponent(comments[i]).getElement();
    render(commentsContainer, renderComment);
  }
};


const renderPopup = (film) => {

  document.body.style.overflow = `hidden`; // убираем прокрутку основного документа

  const unRenderPopup = () => {
    popupComponent.getElement().remove();
    popupComponent.removeElement();
  };

  const popupComponent = new PopupComponent(film);
  render(footerContainer, popupComponent.getElement(), `afterend`);

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

