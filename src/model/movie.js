import {getFilteredFilms} from "../components/utils/filter";
import {FILM_FILTERS_NAMES} from "../const/const";

export class FilmsModel {
  constructor() {
    this._films = [];

    this._activeFilterType = FILM_FILTERS_NAMES.ALL;

    this._dataChangeHandlers = []; // хендлеры для смены данных пользователя
    this._filterChangeHandlers = []; // хендлеры для смены фильтров
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers); // вызываем ререндеринг фильтров при смене фильтра
    this._callHandlers(this._dataChangeHandlers); // // вызываем ререндеринг карточек фильмов
  }

  getFilms() {
    return getFilteredFilms(this._films, this._activeFilterType);
  }

  getAllFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._filterChangeHandlers);
  }

  updateFilm(id, updatedFilm) {

    const index = this._films.findIndex((item) => item.id === updatedFilm.id);

    // проверяем нашли ли что то, если нет, то ничего не делаем
    if (index === -1) {
      return false;
    }

    // переписываем наш массив фильмов
    this._films = [].concat(this._films.slice(0, index), updatedFilm, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  // вызываем все хендлеры из массива обсервера
  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
