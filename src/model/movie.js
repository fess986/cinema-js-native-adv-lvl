import {getFilteredFilms} from "../components/utils/filter";
import { FILM_FILTERS_NAMES } from "../const/const";

export class FilmsModel {
  constructor() {
    this._films = [];

    this._dataChangeHandlers = [];
    this._activeFilterType = FILM_FILTERS_NAMES.ALL;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
  }

  getFilms() {
    return getFilteredFilms(this._films, this._activeFilterType);
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

    return true;
  }
}
