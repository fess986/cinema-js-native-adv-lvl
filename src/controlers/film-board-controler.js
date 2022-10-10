import {ShowMoreButtonComponent} from "../components/show-more-button";
import {filmsBoard} from "../main";
import {render} from "../components/utils/render";
import {remove} from "../components/utils/render";
import {mainContainer} from "../main";
import {SortingComponent} from "../components/sorting";
import {sortDataMock} from "../mock/sorting-mock";
import {FilmController} from "./film-controller";
import {TopFilmsComponent} from "../components/top-rated-films-container";
import {MostCommendedFilmsComponent} from "../components/most-commended-films";
import {NoFilms} from "../components/no-films";
import {shake} from "../components/utils/render";

// import {Loading} from "../components/loading";  // пока будет заккоменчена

const ADD_FILMS = 5;
const SHOWN_FILMS = 5;
let prevFilms = SHOWN_FILMS;

export class FilmBoardController {

  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;

    this._films = null;
    this._sortType = `default`;
    this._boardMode = `films`; // или statistics  - определяет режим показа доски

    this._articleFilmsContainer = this._container.querySelector(`.films-list__container`);

    this._moreButtonComponent = new ShowMoreButtonComponent();
    this._sortingComponent = new SortingComponent(sortDataMock);
    this._topFilmsComponent = new TopFilmsComponent();
    this._mostCommendedComponent = new MostCommendedFilmsComponent();

    this._userStatsController = null;

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
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
    this._sortingComponent.setClickHandler(this._onSortChange);

  }

  _onDataChange(oldData, newData) {
    // сначала при получении данных мы их обновляем на сервере, получаем с него эти же данные в случае успешного обновления и после этого ререндерим карточки в соответствующих категориях

    this._api.updateFilm(oldData.id, newData)
    .then((newApiData) => {

      // добавляем комменты для фильма
      this._api.getComments(newApiData.id).then((data) => {
        newApiData.comments = data;
      });

      // выполняем логику замены
      // действия при смене данных о фильма: Сначала меняем в базе саму карточку, и если всё прошло удачно, ререндим эту карточку на доске
      const isSucsess = this._filmsModel.updateFilm(oldData.id, newApiData);

      if (isSucsess) {
      // перерендим карточку фильма на главной доске
        this._showedFilmControllers.find((item) => item._film.id === oldData.id).render(newApiData);

        // перерендим топ филмс по необходимости
        if (this._topFilmsControllers.find((item) => item._film.id === oldData.id)) {
          this._topFilmsControllers.find((item) => item._film.id === oldData.id).render(newApiData);
        }

        // перерендим топ филмс по необходимости
        if (this._mostCommendedFilmsControllers.find((item) => item._film.id === oldData.id)) {
          this._mostCommendedFilmsControllers.find((item) => item._film.id === oldData.id).render(newApiData);
        }
      } else {
        throw new Error();
      }
    })
    .catch(() => {

      // добавляем эффект трясущейся головы, при ошибках, возникающих при изменении пользовательских данных в карточках фильма
      let errorElement = this._showedFilmControllers.find((item) => item._film.id === oldData.id)._filmComponent._element;
      if (errorElement) {
        shake(errorElement);
      }

      let errorTopFilmsElement = this._topFilmsControllers.find((item) => item._film.id === oldData.id)._filmComponent._element;
      if (errorTopFilmsElement) {
        shake(errorTopFilmsElement);
      }

      let errorMostComendedFilmsElement = this._mostCommendedFilmsControllers.find((item) => item._film.id === oldData.id)._filmComponent._element;
      if (errorMostComendedFilmsElement) {
        shake(errorMostComendedFilmsElement);
      }


    });
  }

  _onFilterChange() {
    // удаление показываемых фильмов
    this._showedFilmControllers.forEach((controller) => {
      controller.remove();
    });

    this._showedFilmControllers = [];

    // рендеринг новых с учетом гетфилмов
    this._newFilmsControllers = this._renderFilms(this._articleFilmsContainer, this._filmsModel.getSortedAndFilteredFilms(), 0, SHOWN_FILMS, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(this._newFilmsControllers);

    // рендер кнопки
    this._renderLoadmoreButton();
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
      this._filmController = new FilmController(container, onDataChange, onViewChange, this._api);
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
      // логика перекраски активного пункта
      this._sortingComponent.getElement().querySelector(`[data-sorting = '${this._sortType}']`).classList.remove(`sort__button--active`);
      this._sortType = this._sortingComponent.getSortType(evt);
      this._sortingComponent.getElement().querySelector(`[data-sorting = '${this._sortType}']`).classList.add(`sort__button--active`);
    }

    // сохраняем тип сортировки в модель
    this._filmsModel._activeSortingType = this._sortType;

    this._showedFilmControllers.forEach((controller) => controller.remove());

    sortedFilms = this._filmsModel.getSortedAndFilteredFilms();

    this._newFilmsControllers = this._renderFilms(this._articleFilmsContainer, sortedFilms, 0, SHOWN_FILMS, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._newFilmsControllers;

    this._renderLoadmoreButton();
  }

  _moreButtonHandler() {
    // пересчитываем количество показываемых фильмов на основании _showedFilmControllers
    prevFilms = this._showedFilmControllers.length;
    let currentFilms = prevFilms + ADD_FILMS;

    this._newFilmsControllers = this._renderFilms(this._articleFilmsContainer, this._filmsModel.getSortedAndFilteredFilms(), prevFilms, currentFilms, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(this._newFilmsControllers);

    if (currentFilms >= this._filmsModel.getFilms().length) {
      remove(this._moreButtonComponent);
    }
  }

  _renderLoadmoreButton() {
    // удаляем старые компоненты
    remove(this._moreButtonComponent);

    // проверяем кол-во показываемых фильмов, чтобы в случае чего не рендерить кнопку
    if (this._showedFilmControllers.length >= this._filmsModel.getFilms().length) {
      return;
    }

    render(this._articleFilmsContainer, this._moreButtonComponent, `afterend`);
    this._moreButtonComponent.setClickHandler(this._moreButtonHandler);
  }

  renderBoard() {
    // рендерим сортировку
    render(mainContainer, this._sortingComponent);
    this._films = this._filmsModel.getFilms();

    // если фильмы не загружены, ничего не рендерим кроме компонента NoFilms
    // this._films = null;  // проверка работоспособности
    if (!this._films) {
      const noFilms = new NoFilms();
      render(mainContainer, noFilms);
      return;
    }

    // загрузочный экран
    // const loading = new Loading();
    // render(mainContainer, loading);  // пока пусть будет заккоментирован, добавим, когда будет реальная загрузка данных

    // добавляем контейнер непосредственно для карточек фильмов
    render(mainContainer, filmsBoard);

    // рендерим начальные фильмы и добавляем их в _showedFilmControllers
    this._newFilmsControllers = this._renderFilms(this._articleFilmsContainer, this._filmsModel.getFilms(), 0, SHOWN_FILMS, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(this._newFilmsControllers);

    // добавляем кнопку "показать больше фильмов"
    this._renderLoadmoreButton();

    // рендерим топ фильмы
    render(filmsBoard.getElement(), this._topFilmsComponent);
    this._topFilmsControllers = this._renderFilms(this._topFilmsComponent.getFilmsContainer(), this._films, 0, 2, this._onDataChange, this._onViewChange);

    // рендерим самые комментируемые фильмы
    render(filmsBoard.getElement(), this._mostCommendedComponent);
    this._mostCommendedFilmsControllers = this._renderFilms(this._mostCommendedComponent.getFilmsContainer(), this._films, 0, 2, this._onDataChange, this._onViewChange);

  }

  show() {
    this._sortingComponent._element.classList.remove(`hidden`);
    filmsBoard._element.classList.remove(`hidden`);
  }

  hide() {
    this._sortingComponent._element.classList.add(`hidden`);
    filmsBoard._element.classList.add(`hidden`);
  }
}


