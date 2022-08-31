import {ShowMoreButtonComponent} from "../components/show-more-button";
import {filmsBoard} from "../main";
import {render} from "../components/utils/render";
import {FilmArticleComponent} from "../components/film-article";
import {TOTAL_FILMS} from "../main";
import {remove} from "../components/utils/render";
import {mainContainer} from "../main";
// import {films} from "../main";
import {SortingComponent} from "../components/sorting";
import {sortDataMock} from "../mock/sorting-mock";
import {FilmController} from "./film-controller";
import {TopFilmsComponent} from "../components/top-rated-films-container";
import {MostCommendedFilmsComponent} from "../components/most-commended-films";
import {NoFilms} from "../components/no-films";
// import {Loading} from "../components/loading";  // пока будет заккоменчена

const ADD_FILMS = 5;
const SHOWN_FILMS = 5;
let prevFilms = SHOWN_FILMS;

// оставляем пока, тк он используется еще в других местах, но конкретно тут уже использоваться не будет
export const renderFilm = (container, film) => {
  const filmComponent = new FilmArticleComponent(film);
  render(container, filmComponent);
};

export class FilmBoardController {

  constructor(container, filmsModel) {
    this._container = container;
    // this._films = films;
    this._sortType = `default`;
    this._filmsModel = filmsModel;

    this._articleFilmsContainer = this._container.querySelector(`.films-list__container`);

    this._moreButtonComponent = new ShowMoreButtonComponent();
    this._sortingComponent = new SortingComponent(sortDataMock);
    this._topFilmsComponent = new TopFilmsComponent();
    this._mostCommendedComponent = new MostCommendedFilmsComponent();

    this._filmController = null; // хранилище для фильмконтроллеров
    this._newFilmsControllers = [];
    this._showedFilmControllers = []; // все показываемые контроллеры фильмов
    this._topFilmsControllers = [];
    this._mostCommendedFilmsControllers = [];

    // прибиваем методы к собственному контексту
    this._renderFilms = this._renderFilms.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._moreButtonHandler = this._moreButtonHandler.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _onDataChange(oldData, newData) {
    // ищем изменяемый фильм при помощи модели this._filmsModel по id фильма. На выходе функция сигнализирует о том, успешно ли прошла операция
    const isSucsess = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSucsess) {
      // перерендим карточку фильма на главной доске
      this._showedFilmControllers.find((item) => item._film.id === oldData.id).render(newData);

      // перерендим топ филмс по необходимости
      if (this._topFilmsControllers.find((item) => item._film.id === oldData.id)) {
        this._topFilmsControllers.find((item) => item._film.id === oldData.id).render(newData);
      }

      // перерендим топ филмс по необходимости
      if (this._mostCommendedFilmsControllers.find((item) => item._film.id === oldData.id)) {
        this._mostCommendedFilmsControllers.find((item) => item._film.id === oldData.id).render(newData);
      }
    }

  }

  _onViewChange() {
    // проходим по всем открытым контроллерам фильмов и если есть открытые, закрываем их
    this._showedFilmControllers.forEach((item) => {
      if (item._popupController) {
        item._popupController.unRenderPopup();
      }
    });
  }

  // рендер фильмов через их контроллеры и сохранение этих контроллеров в массиве
  _renderFilms(container, films, from, to, onDataChange, onViewChange) {
    return films.slice(from, to).map((item) => {
      this._filmController = new FilmController(container, onDataChange, onViewChange);
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
    sortedFilms = this._sortingComponent.getSortListByType(this._filmsModel.getFilms(), this._sortType);
    this._newFilmsControllers = this._renderFilms(this._articleFilmsContainer, sortedFilms, 0, SHOWN_FILMS, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._newFilmsControllers;
  }

  _moreButtonHandler() {

    let currentFilms = prevFilms + ADD_FILMS;

    this._newFilmsControllers = this._renderFilms(this._articleFilmsContainer, this._filmsModel.getFilms(), prevFilms, currentFilms, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(this._newFilmsControllers);

    prevFilms = currentFilms;
    if (currentFilms >= TOTAL_FILMS) {
      remove(this._moreButtonComponent);
    }
  }

  render() {
    // рендерим сортировку
    render(mainContainer, this._sortingComponent);

    const films = this._filmsModel.getFilms();

    // если фильмы не загружены, ничего не рендерим кроме компонента NoFilms
    // this._films = null;  // проверка работоспособности
    if (!films) {
      const noFilms = new NoFilms();
      render(mainContainer, noFilms);
      return;
    }

    // загрузочный экран
    // const loading = new Loading();
    // render(mainContainer, loading);  // пока пусть будет заккоментирован, добавим, когда будет реальная загрузка данных

    // добавляем кнопку "показать больше фильмов"
    render(this._articleFilmsContainer, this._moreButtonComponent, `afterend`);
    this._moreButtonComponent.setClickHandler(this._moreButtonHandler);

    // добавляем контейнер непосредственно для карточек фильмов
    render(mainContainer, filmsBoard);

    // рендерим начальные фильмы и добавляем их в _showedFilmControllers
    this._newFilmsControllers = this._renderFilms(this._articleFilmsContainer, films, 0, SHOWN_FILMS, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(this._newFilmsControllers);

    // рендерим топ фильмы
    render(filmsBoard.getElement(), this._topFilmsComponent);
    this._topFilmsControllers = this._renderFilms(this._topFilmsComponent.getFilmsContainer(), films, 0, 2, this._onDataChange, this._onViewChange);

    // рендерим самые комментируемые фильмы
    render(filmsBoard.getElement(), this._mostCommendedComponent);
    this._mostCommendedFilmsControllers = this._renderFilms(this._mostCommendedComponent.getFilmsContainer(), films, 0, 2, this._onDataChange, this._onViewChange);

    // сортировка
    this._sortingComponent.setClickHandler(this._onSortChange);

  }
}
