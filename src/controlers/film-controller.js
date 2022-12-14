import {FilmArticleComponent} from "../components/film-article";
import {render, replace, remove} from "../components/utils/render";
import {PopupController} from "./popup-controller";
import {FILM_FILTERS_NAMES} from "../const/const";


const object = require(`lodash/fp`);


export class FilmController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._filmComponent = null;
    this._popupController = null;
    this._film = null;
    this._films = [];
    this._api = api;

    this._activeFilterType = FILM_FILTERS_NAMES.ALL;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
  }

  render(film) {
    this._film = film;
    const oldComponent = this._filmComponent;
    this._filmComponent = new FilmArticleComponent(this._film);

    this._filmComponent.setWatchListClickHandle((evt) => {
      evt.preventDefault();

      // переписываем поле, которое содержит информацию о поле WatchList
      const newFilm = object.cloneDeep(this._film);
      newFilm.userDetails.isWatchListActive = !newFilm.userDetails.isWatchListActive;

      // запускаем метод, который изменит информацию в объекте карточки фильма и перерендерит нам сам фильм
      this._onDataChange(this._film, newFilm);
    });

    this._filmComponent.setWatchedClickHandle((evt) => {

      evt.preventDefault();

      // для того чтобы не мутировать изначальное значение делаем глубокий клон при помощи библиотеки Lodash
      const newFilm = object.cloneDeep(this._film);

      newFilm.userDetails.isWatchedActive = !newFilm.userDetails.isWatchedActive;

      this._onDataChange(this._film, newFilm);
    });

    this._filmComponent.setFavoriteClickHandle((evt) => {
      evt.preventDefault();

      const newFilm = object.cloneDeep(this._film);
      newFilm.userDetails.isFavoriteActive = !newFilm.userDetails.isFavoriteActive;

      this._onDataChange(this._film, newFilm);

    });

    this._filmComponent.setPopupOpenHandler(() => {
      // закрываем все открытые на данный момент попапы
      this._onViewChange();
      this._popupController = new PopupController(this._film, this._onDataChange, this._api);
      this._popupController.render();
    });

    if (oldComponent) {
      replace(oldComponent, this._filmComponent);
    } else {
      render(this._container, this._filmComponent);
    }
  }

  remove() {
    remove(this._filmComponent);
  }
}
