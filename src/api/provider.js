const isOnline = () => {
  return window.navigator.onLine;
};

export class Provider {
  constructor(api, store) {
    this.api = api;
    this.store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this.api.getFilms();
    }

    // тут реализуем логику getFilms() в оффлайн режиме
    return Promise.reject(`getFilms offline logic`);
  }

  getComments(id) {
    if (isOnline()) {
      return this.api.getComments(id);
    }

    // тут реализуем логику getFilms() в оффлайн режиме
    return Promise.reject(`getFilms offline logic`);
  }

  deleteComment(id) {
    if (isOnline()) {
      return this.api.deleteComment(id);
    }

    // тут реализуем логику getFilms() в оффлайн режиме
    return Promise.reject(`getFilms offline logic`);
  }

  addComment(comment, filmId) {
    if (isOnline()) {
      return this.api.addComment(comment, filmId);
    }

    // тут реализуем логику getFilms() в оффлайн режиме
    return Promise.reject(`getFilms offline logic`);
  }

  updateFilm(id, data) {
    if (isOnline()) {
      return this.api.updateFilm(id, data);
    }

    // тут реализуем логику getFilms() в оффлайн режиме
    return Promise.reject(`getFilms offline logic`);
  }
}
