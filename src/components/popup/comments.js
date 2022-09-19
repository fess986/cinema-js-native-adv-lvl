import {AbstractComponent} from "../abstract-component";

// создаем шаблон для комментов
const createComment = (comment) => {
  const watchingDate = new Date(Date.parse(comment.date));
  const fullWatchingDate = `${watchingDate.getFullYear()}/${
    watchingDate.getMonth() + 1
  }/${watchingDate.getDate()} ${watchingDate.getHours()}:${watchingDate.getMinutes()}`;

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${
  comment.emotion
}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${
  Date.now() - watchingDate < 1000 * 60
    ? `One minute ago`
    : fullWatchingDate
}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

export const createComments = (comments) => {
  const commentData = comments
    .map((item) => {
      return createComment(item);
    })
    .join(`\n`);
  return commentData;
};

export class commentComponent extends AbstractComponent {
  #comment;
  constructor(comment) {
    super();
    this.#comment = comment;
  }

  getTemplate() {
    return createComment(this.#comment);
  }

  // setWatchListClickHandle(handler) {
  //   this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  // }
}
