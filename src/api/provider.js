import {FilmsAPI} from "../model/api-movies";

const isOnline = () => {
  return window.navigator.onLine;
};

export class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
      .then((films) => {
        films.forEach((film) => {
          this._store.setFilm(film.id, film);
        });

        return films;
      });
    }

    // тут реализуем логику getFilms() в оффлайн режиме. Так как мы записывали в хранилище объект с фильмами, а изначально  должны получить массив фильмов - обращаемся в значениям этих фильмов
    const filmsArray = Object.values(this._store.getFilms());
    return Promise.resolve(filmsArray);
  }

  getComments(filmId) {
    if (isOnline()) {
      return this._api.getComments(filmId)
      .then((comments) => {
        this._store.setComments(filmId, comments);

        return comments;
      });
    }

    let comments = this._store.getFilmComments(filmId);
    this._store.setComments(filmId, comments);

    // тут реализуем логику getComments() в оффлайн режиме
    return Promise.resolve(comments);
  }

  deleteComment(id, filmid) {
    if (isOnline()) {
      this._store.removeComment(id, filmid);

      return this._api.deleteComment(id, filmid);
    }

    this._store.removeComment(id, filmid);
    return Promise.resolve();
  }

  addComment(comment, filmId) {
    if (isOnline()) {
      return this._api.addComment(comment, filmId)
      .then((data) => {
        this._store.setComment(filmId, data.comments.at(-1));

        return data;
      });
    }

    // тут реализуем логику addComment() в оффлайн режиме. Для того чтобы возвращать приложению ожидаемые им данные, нужно поместить новый комментарий сначала в массив, а потом этот массив в объект с полем comments
    this._store.setComment(filmId, comment);

    const commentsArray = new Array(comment);
    const newObj = {};
    newObj.comments = commentsArray;

    return Promise.resolve(newObj);
  }

  updateFilm(id, film) {
    if (isOnline()) {
      return this._api.updateFilm(id, film)
      .then((newFilm) => {
        this._store.setFilm(newFilm.id, FilmsAPI.transformDataToServer(newFilm));

        return newFilm;
      });

    }

    this._store.setFilm(id, FilmsAPI.transformDataToServer(film));

    // тут реализуем логику updateFilm() в оффлайн режиме
    return Promise.resolve(film);
  }
}
