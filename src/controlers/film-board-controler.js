import {ShowMoreButtonComponent} from "../components/show-more-button";
import {filmsBoard} from "../main";
import {render} from "../components/utils/render";
import {FilmArticleComponent} from "../components/film-article";
import {TOTAL_FILMS} from "../main";
import {remove} from "../components/utils/render";
import {mainContainer} from "../main";
import {films} from "../main";
import {SortingComponent} from "../components/sorting";
import {sortDataMock} from "../mock/sorting-mock";
import {FilmController} from "./film-controller";
import {PopupController} from "./popup-controller";
import {TopFilmsComponent} from "../components/top-rated-films-container";

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
    this._articleFilmsContainer = this._container.querySelector(`.films-list__container`);
    this._moreButtonComponent = new ShowMoreButtonComponent();
    this._sortingComponent = new SortingComponent(sortDataMock);

    this._filmController = null; // хранилище для фильмконтроллеров
    this._newFilmsControllers = [];
    this._showedFilmControllers = []; // все показываемые контроллеры фильмов
    this._topFilmsComponent = new TopFilmsComponent();

    this._sortType = `default`;
    this._renderFilms = this._renderFilms.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._moreButtonHandler = this._moreButtonHandler.bind(this);
  }

  // рендер фильмов через их контроллеры и сохранение этих контроллеров в массиве
  _renderFilms(container, films, from, to) {
    return films.slice(from, to).map((item) => {
      this._filmController = new FilmController(container);
      this._filmController.render(item);
      return this._filmController;
    });
  }

  // действия при смене сортировки
  _onSortChange(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    let sortedFilms = [];

    // сортировка происходит при условии, что нажата другая кнопка. Иначе игнорируем
    if (this._sortType === this._sortingComponent.getSortType(evt)) {
      return;
    } else {
      this._sortingComponent.getElement().querySelector(`[data-sorting = '${this._sortType}']`).classList.remove(`sort__button--active`);
      this._sortType = this._sortingComponent.getSortType(evt);
      this._sortingComponent.getElement().querySelector(`[data-sorting = '${this._sortType}']`).classList.add(`sort__button--active`);
    }

    this._articleFilmsContainer.innerHTML = ``;
    sortedFilms = this._sortingComponent.getSortListByType(films, this._sortType);
    this._newFilmsControllers = this._renderFilms(this._articleFilmsContainer, sortedFilms, 0, SHOWN_FILMS);
    this._showedFilmControllers = this._newFilmsControllers;
  }

  _moreButtonHandler() {
    let currentFilms = prevFilms + ADD_FILMS;

    this._newFilmsControllers = this._renderFilms(this._articleFilmsContainer, films, prevFilms, currentFilms);
    this._showedFilmControllers = this._showedFilmControllers.concat(this._newFilmsControllers);

    prevFilms = currentFilms;
    if (currentFilms >= TOTAL_FILMS) {
      remove(this._moreButtonComponent);
    }
  }

  render() {
    // рендерим сортировку
    render(mainContainer, this._sortingComponent);

    // добавляем кнопку "показать больше фильмов"
    render(this._articleFilmsContainer, this._moreButtonComponent, `afterend`);
    this._moreButtonComponent.setClickHandler(this._moreButtonHandler);

    // добавляем контейнер непосредственно для карточек фильмов
    render(mainContainer, filmsBoard);

    // подключаем контроллер попапа
    const popup = new PopupController();

    // рендерим начальные фильмы и добавляем их в _showedFilmControllers
    this._newFilmsControllers = this._renderFilms(this._articleFilmsContainer, films, 0, SHOWN_FILMS);
    this._showedFilmControllers = this._showedFilmControllers.concat(this._newFilmsControllers);

    // рендерим топ фильмы
    render(filmsBoard.getElement(), this._topFilmsComponent);
    this._renderFilms(this._topFilmsComponent.getFilmsContainer(), films, 0, 2);

    // сортировка
    this._sortingComponent.setClickHandler(this._onSortChange);

    // вешаем прослушку контейнер для попапа
    filmsBoard.setClickHandler(popup._popupOpenHandlerParams(true, films));

  }
}
