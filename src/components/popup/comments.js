import {AbstractComponent} from "../abstract-component";

const createComment = (comments) => {
  const watchingDate = new Date(Date.parse(comments.date));
  const fullWatchingDate = `${watchingDate.getFullYear()}/${watchingDate.getMonth() + 1}/${watchingDate.getDate()} ${watchingDate.getHours()}:${watchingDate.getMinutes()}`;

  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comments.emotion}.png" width="55" height="55" alt="emoji-${comments.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comments.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comments.author}</span>
        <span class="film-details__comment-day">${(Date.now() - watchingDate < 1000 * 60) ? `One minute ago` : fullWatchingDate}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
  );
};

export class CommentComponent extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createComment(this._comment);
  }

}
