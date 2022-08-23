import {AbstractComponent} from "./abstract-component";

const createFilmArticle = (filmArticle) => {

  const {title, rating, year, genre, img, description, comments, userDetails, id} = filmArticle;

  // const duration = `${Math.floor(runTime / 60)}h ${runTime % 60}m`;
  const releaseDate = new Date(Date.parse(filmArticle.releaseDate));

  return (
    `<article class="film-card" data-id = '${id}'>
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${releaseDate.getFullYear()}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src="${img}" alt="" class="film-card__poster">
        <p class="film-card__description">${description.length > 139 ? description.slice(1, 139) + `...` : description}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${userDetails.isWatchlistActive ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${userDetails.isWatchedtActive ? `film-card__controls-item--active` : ``}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${userDetails.isFavoriteActive ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
        </form>
      </article>`
  );
};

export class FilmArticleComponent extends AbstractComponent {

  constructor(filmArticle) {
    super();
    this._article = filmArticle;
  }

  getTemplate() {
    return createFilmArticle(this._article);
  }

}
