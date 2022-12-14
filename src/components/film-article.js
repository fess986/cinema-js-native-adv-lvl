import {AbstractComponent} from "./abstract-component";
import {getYear, getDuration} from "./utils/common";

const createFilmArticle = (filmArticle) => {
  const {
    title,
    rating,
    genre,
    img,
    description,
    comments,
    userDetails,
    id,
    releaseDate,
    runTime,
  } = filmArticle;

  const isComments = (comment) => {
    if (!comment) {
      return 0;
    } else {
      return comment.length;
    }
  };


  const year = getYear(releaseDate);
  const duration = getDuration(runTime);

  // const duration = `${Math.floor(runTime / 60)}h ${runTime % 60}m`;
  // const releaseDate1 = new Date(Date.parse(filmArticle.releaseDate));

  return `<article class="film-card" data-id = '${id}'>
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src="${img}" alt="" class="film-card__poster">
        <p class="film-card__description">${
  description.length > 139
    ? description.slice(1, 139) + `...`
    : description
}</p>
        <a class="film-card__comments">${isComments(comments)} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${
  userDetails.isWatchListActive
    ? `film-card__controls-item--active`
    : ``
}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${
  userDetails.isWatchedActive
    ? `film-card__controls-item--active`
    : ``
}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${
  userDetails.isFavoriteActive
    ? `film-card__controls-item--active`
    : ``
}">Mark as favorite</button>
        </form>
      </article>`;
};

export class FilmArticleComponent extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmArticle(this._film);
  }

  setWatchListClickHandle(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedClickHandle(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteClickHandle(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }

  setPopupOpenHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
    this.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }
}
