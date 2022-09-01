export class FilmsModel {
  constructor() {
    this._films = [];

    this._dataChangeHandlers = [];
  }

  getFilms() {
    return this._films;
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
