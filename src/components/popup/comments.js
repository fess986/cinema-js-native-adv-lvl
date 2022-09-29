import {SmartComponent} from "../smart-abstract-component";

// создаем шаблон для комментов
const createComment = (comment) => {
  const watchingDate = new Date(Date.parse(comment.date));
  const fullWatchingDate = `${watchingDate.getFullYear()}/${
    watchingDate.getMonth() + 1
  }/${watchingDate.getDate()} ${watchingDate.getHours()}:${watchingDate.getMinutes()}`;

  return `<li class="film-details__comment ">
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
        <button data-commentId = '${comment.id}' class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

export const createComments = (comments) => {

  if (!comments) {
    return ``;
  }

  const commentData = comments
    .map((item) => {
      return createComment(item);
    })
    .join(`\n`);

  return commentData;
};

const commentsCount = (film) => {
  return film.comments ? film.comments.length : `0`;
};

const createTemplate = (film) => {
  return `<section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${
  commentsCount(film)}</span></h3>

          <ul class="film-details__comments-list">
            ${createComments(film.comments)}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">

            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" id="smile" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" id="sleeping" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" id="puke" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" id="angry" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>`;
};

export class CommentComponent extends SmartComponent {

  constructor(film) {
    super();
    this._comments = film.comments;
    this._film = film;
    this._deleteHandler = null;
    this._setCommentSendHandler = null;

    this._subscribeOnEvents(); // подписываемся на первоначальные события
    this.rerender = this.rerender.bind(this);
  }

  rerender() {
    console.log(`rerender from Smart component`);
    super.rerender();
  }

  recoveryListeners() {
    console.log(`recovery comments Listeners`);

    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    this._subscribeOnEmojiEvents();
    this.setDeleteClickHandler(this._deleteHandler);
    this.setCommentSendHandler(this._setCommentSendHandler);
  }

  getTemplate() {
    return createTemplate(this._film);
  }

  setDeleteClickHandler(handler) {
    const commentsCollection = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    const arrayCommentsCollection = Array.from(commentsCollection);
    arrayCommentsCollection.forEach((element) => {
      element.addEventListener(`click`, handler);
    });

    // важно сохранять хэндлер, если мы ререндерим компонент внутри другого компонента, иначе он исчезнет!
    this._deleteHandler = handler;
  }

  setCommentSendHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, handler);

    this._setCommentSendHandler = handler;
  }

  _subscribeOnEmojiEvents() {
    const element = this.getElement();
    const emojyContainer = element.querySelector(
        `.film-details__add-emoji-label`
    );

    element.querySelector(`#smile`).addEventListener(`click`, () => {
      emojyContainer.innerHTML = `<img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">`;

      // this.rerender();
    });

    element.querySelector(`#sleeping`).addEventListener(`click`, () => {
      emojyContainer.innerHTML = `<img src="images/emoji/sleeping.png" width="55" height="55" alt="emoji-smile">`;
    });

    element.querySelector(`#puke`).addEventListener(`click`, () => {
      emojyContainer.innerHTML = `<img src="images/emoji/puke.png" width="55" height="55" alt="emoji-smile">`;
    });

    element.querySelector(`#angry`).addEventListener(`click`, () => {
      emojyContainer.innerHTML = `<img src="images/emoji/angry.png" width="55" height="55" alt="emoji-smile">`;
    });
  }


}
