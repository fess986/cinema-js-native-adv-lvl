import {FilmArticleComponent} from "../components/film-article";
import {render} from "../components/utils/render";

export class FilmController {
  constructor(container, onDataChange) {
    this._container = container;
    this._filmComponent = null;
    this._film = null;
    this._onDataChange = onDataChange;
  }

  render(film) {
    this._film = film;
    this._filmComponent = new FilmArticleComponent(this._film);

    this._filmComponent.setWatchListClickHandle((evt) => {
      evt.preventDefault();

      // переписываем поле, которое содержит информацию о поле WatchList
      const newFilm = Object.assign({}, this._film);
      newFilm.userDetails.isWatchListActive = !newFilm.userDetails.isWatchListActive;

      // запускаем метод, который изменит информацию в объекте карточки фильма и перерендерит нам сам фильм
      this._onDataChange(this._film, newFilm);

    });

    this._filmComponent.setWatchedClickHandle((evt) => {
      evt.preventDefault();

      const newFilm = Object.assign({}, this._film);
      newFilm.userDetails.isWatchedActive = !newFilm.userDetails.isWatchedActive;

      this._onDataChange(this._film, newFilm);
    });

    this._filmComponent.setFavoriteClickHandle((evt) => {
      evt.preventDefault();

      const newFilm = Object.assign({}, this._film);
      newFilm.userDetails.isFavoriteActive = !newFilm.userDetails.isFavoriteActive;

      this._onDataChange(this._film, newFilm);
    });

    render(this._container, this._filmComponent);
  }
}
