import {ShowMoreButtonComponent} from "../components/show-more-button";
import {filmsBoard} from "../main";
import {render} from "../components/utils/render";
import {FilmArticleComponent} from "../components/film-article";
import {TOTAL_FILMS} from "../main";
import {remove} from "../components/utils/render";
import {mainContainer} from "../main";
import {films} from "../main";
import {popupOpenHandlerParams} from "../components/popup/popup";
import {SortingComponent} from "../components/sorting";
import {sortDataMock} from "../mock/sorting-mock";
import {FilmController} from "./film-controller";

const ADD_FILMS = 5;
const SHOWN_FILMS = 5;
let prevFilms = SHOWN_FILMS;

// оставляем пока, тк он используется еще в других местах, но конкретно тут уже использоваться не будет
export const renderFilm = (container, film) => {
  const filmComponent = new FilmArticleComponent(film);
  render(container, filmComponent);
};


export class FilmBoardController {

  constructor(container) {
    this._container = container;
    this._moreButtonComponent = new ShowMoreButtonComponent();
    this._sortingComponent = new SortingComponent(sortDataMock);
    this._filmController = null; // хранилище для фильмконтроллеров
    this._newFilmsControllers = [];
    this._showedFilmControllers = []; // все показываемые контроллеры фильмов
    this._renderFilms = this._renderFilms.bind(this);
  }

  // рендер фильмов через их контроллеры и сохранение этих контроллеров в массиве
  _renderFilms(container, films, from, to) {
    return films.slice(from, to).map((item) => {
      this._filmController = new FilmController(container);
      this._filmController.render(item);
      return this._filmController;
    });
  }

  render() {
    const articleFilmsContainer = this._container.querySelector(`.films-list__container`);
    let sortType = `default`;

    // рендерим сортировку
    render(mainContainer, this._sortingComponent);

    // добавляем кнопку "показать больше фильмов"
    render(articleFilmsContainer, this._moreButtonComponent, `afterend`);

    // добавляем контейнер непосредственно для карточек фильмов
    render(mainContainer, filmsBoard);

    this._newFilmsControllers = this._renderFilms(articleFilmsContainer, films, 0, SHOWN_FILMS);
    this._showedFilmControllers = this._showedFilmControllers.concat(this._newFilmsControllers);

    this._sortingComponent.getElement().addEventListener(`click`, (evt) => {

      if (evt.target.tagName !== `A`) {
        return;
      }

      let sortedFilms = [];

      // сортировка происходит при условии, что нажата другая кнопка. Иначе игнорируем
      if (sortType === this._sortingComponent.getSortType(evt)) {
        return;
      } else {
        this._sortingComponent.getElement().querySelector(`[data-sorting = '${sortType}']`).classList.remove(`sort__button--active`);
        sortType = this._sortingComponent.getSortType(evt);
        this._sortingComponent.getElement().querySelector(`[data-sorting = '${sortType}']`).classList.add(`sort__button--active`);
      }

      articleFilmsContainer.innerHTML = ``;
      sortedFilms = this._sortingComponent.getSortListByType(films, sortType);
      this._newFilmsControllers = this._renderFilms(articleFilmsContainer, sortedFilms, 0, SHOWN_FILMS);
      this._showedFilmControllers = this._newFilmsControllers;

    });

    // таймаут для того чтобы успела проинициализироваться ф-ция popupOpenHandlerParams
    setTimeout(() => {
      filmsBoard.setClickHandler(popupOpenHandlerParams(true));
    }, 0);

    this._moreButtonComponent.setClickHandler(() => {
      let currentFilms = prevFilms + ADD_FILMS;

      this._newFilmsControllers = this._renderFilms(articleFilmsContainer, films, prevFilms, currentFilms);
      this._showedFilmControllers = this._showedFilmControllers.concat(this._newFilmsControllers);

      prevFilms = currentFilms;
      if (currentFilms >= TOTAL_FILMS) {
        remove(this._moreButtonComponent);
      }
    });


  }
}
