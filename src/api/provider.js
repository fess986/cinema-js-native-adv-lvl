import { FilmsAPI } from "../model/api-movies";

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

    // тут реализуем логику getFilms() в оффлайн режиме
    return Promise.reject(`getFilms offline logic`);
  }

  getComments(id) {
    if (isOnline()) {
      return this._api.getComments(id)
      .then((comments) => {
        this._store.setComments(id, comments);

        return comments;
      });

    }

    // тут реализуем логику getFilms() в оффлайн режиме
    return Promise.reject(`getFilms offline logic`);
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
      return this._api.addComment(comment, filmId);
    }

    // тут реализуем логику getFilms() в оффлайн режиме
    return Promise.reject(`getFilms offline logic`);
  }

  updateFilm(id, data) {
    if (isOnline()) {
      return this._api.updateFilm(id, data);
    }

    // тут реализуем логику getFilms() в оффлайн режиме
    return Promise.reject(`getFilms offline logic`);
  }
}
