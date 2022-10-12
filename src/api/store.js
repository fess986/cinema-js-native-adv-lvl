export class Store {

  constructor(storage, keyFilms, keyComments) {
    this.store = storage;
    this.storeFilmsKey = keyFilms;
    this.storeCommentsKey = keyComments;
  }

  getFilms() {
    // получаем список всех фильмов, если отвалится интернет

  }

  getComments() {
    // получаем все комменты, если отвалится интернет

  }

  setFilm(key, value) {
    // запишем в хранилище один фильм


  }

  setComment(key, value) {
    // запишем в хранилище коммент

  }

  removeComment(key) {
    // удалим коммент их хранилища

  }


  // прикладные функции
  setSomething(key, value) {
    this.store.setItem(key, value);
  }

  getItem(key) {
    return this.store.getItem(key);
  }

  removeSomething(key) {
    this.store.removeItem(key);
  }

  clearStorage() {
    this.store.clear();
  }

}
