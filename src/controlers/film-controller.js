import {FilmArticleComponent} from "../components/film-article";
import {render} from "../components/utils/render";

export class FilmController {
  constructor(container) {
    this._container = container;
    this._filmComponent = null;
    this._film = null;
  }

  render(film) {
    this._film = film;
    this._filmComponent = new FilmArticleComponent(this._film);
    render(this._container, this._filmComponent);
  }
}
