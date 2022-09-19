import {getFilteredFilms} from "../components/utils/filter";
import {getSortListByType} from "../components/utils/sorting";
import {FILM_FILTERS_NAMES} from "../const/const";

export class FilmsModel {
  constructor() {
    this._films = [];

    this._activeFilterType = FILM_FILTERS_NAMES.ALL;
    this._activeSortingType = `default`;

    this._dataChangeHandlers = []; // хендлеры для смены данных пользователя
    this._filterChangeHandlers = []; // хендлеры для смены фильтров
  }

  getComments(film) {
    console.log(film.comments);
  }

  removeComment() {
    console.log(`removing comment`);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers); // вызываем ререндеринг карточек фильмов.
    this._callHandlers(this._dataChangeHandlers); // // вызываем ререндеринг фильтров при его смене. Хэндлер прописан в filter Controller и ререндерит фильтры на основе активного фильтра и количества фильмов в каждой категории
  }

  getFilms() {
    return getFilteredFilms(this._films, this._activeFilterType);
  }

  getSortedAndFilteredFilms() {
    const filteredFilms = getFilteredFilms(this._films, this._activeFilterType);
    return getSortListByType(filteredFilms, this._activeSortingType);
  }

  getAllFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
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
