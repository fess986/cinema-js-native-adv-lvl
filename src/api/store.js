export class Store {

  constructor(storage, keyFilms, keyComments) {
    this._store = storage;
    this._storeFilmsKey = keyFilms;
    this._storeCommentsKey = keyComments;
  }

  // получаем список всех фильмов, если отвалится интернет
  getFilms() {
    try {
      return JSON.parse(this._store.getItem(this._storeFilmsKey));
    } catch (err) {
      return {};
    }
  }

  // получаем все комменты
  getComments() {
    try {
      return JSON.parse(this._store.getItem(this._storeCommentsKey));
    } catch (err) {
      return {};
    }
  }

  // получаем комменты для конкретного фильма
  getFilmComments(filmId) {
    const allComments = this.getComments();
    return allComments[filmId] ? allComments[filmId] : [];
  }

  // запишем в хранилище один фильм по ключу this._storeFilmsKey
  setFilm(id, film) {
    const store = this.getFilms(); // сначала скачаем все фильмы в объект, а потом в него добавим устанавливаемый

    this._store.setItem(this._storeFilmsKey,
        JSON.stringify(Object.assign({}, store, {[id]: film})));
  }

  // запишем в хранилище все комменты для фильма filmId
  setComments(filmId, filmComments) {
    const store = this.getComments();

    this._store.setItem(this._storeCommentsKey,
        JSON.stringify(Object.assign({}, store, {[filmId]: filmComments})));
  }

  // запишем в хранилище один коммент для фильма filmId
  setComment(filmId, filmComment) {
    const store = this.getComments();
    const comments = this.getFilmComments(filmId);

    comments.push(filmComment);

    this._store.setItem(this._storeCommentsKey,
        JSON.stringify(Object.assign({}, store, {[filmId]: comments})));
  }

  // удалим коммент из хранилища
  removeComment(commentId, filmId) {
    // так как у нас комменты хранятся в объекте с объектами
    const store = this.getComments();
    let comments = this.getFilmComments(filmId);

    comments = comments.filter((elem) => elem.id !== commentId);

    this._store.setItem(this._storeCommentsKey,
        JSON.stringify(Object.assign({}, store, {[filmId]: comments})));

  }


  // прикладные функции
  setSomething(key, value) {
    this._store.setItem(key, value);
  }

  getItem(key) {
    return this._store.getItem(key);
  }

  removeSomething(key) {
    this._store.removeItem(key);
  }

  clearStorage() {
    this._store.clear();
  }

}
