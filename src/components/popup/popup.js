import {MONTH} from "../../const/const";
import {SmartComponent} from "../smart-abstract-component";
import {AbstractComponent} from "../abstract-component";
import {createComments} from "./comments";

export const createPopup = (film) => {
  const {title, rating, runTime, genre, img, description, comments, userDetails, alternativeTitle, ageRating, director, writers, actors, country} = film;

  const releaseDate = new Date(Date.parse(film.releaseDate));
  const releaseFullDate = `${releaseDate.getDate()} ${MONTH[releaseDate.getMonth()]} ${releaseDate.getFullYear()}`;

  const duration = `${Math.floor(runTime / 60)}h ${runTime % 60}m`;

  const commentsData = createComments(comments);

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${img}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseFullDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${genre.join(` `)}</span>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${userDetails.isWatchListActive ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${userDetails.isWatchedActive ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${userDetails.isFavoriteActive ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsData}
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
        </section>
      </div>
    </form>
  </section>`
  );
};

export class PopupComponent extends SmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._closeHandler = null;
    this._watchListHandler = null;
    this._watchedHandler = null;
    this._favoriteHandler = null;

  }

  rerender() {
    console.log(`rerender from component`);
    super.rerender();
  }

  recoveryListeners() {
    console.log(`recoveryListeners`);

    this._subscribeOnEvents();

  }

  getTemplate() {
    return createPopup(this._film);
  }


  _subscribeOnEvents() {
    console.log(`subscribing on events`);
    this.setCloseHandler(this._closeHandler);
    this.setWatchListClickHandle(this._watchListHandler);
    this.setWatchedClickHandle(this._watchedHandler);
    this.setFavoriteClickHandle(this._favoriteHandler);
    this._subscribeOnEmojiEvents();

    // this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, () => {
    //   console.log(`discribing`);
    // });

  }

  setCloseHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._closeHandler = handler;
  }

  setWatchListClickHandle(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, handler);
    this._watchListHandler = handler;
  }

  setWatchedClickHandle(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, handler);
    this._watchedHandler = handler;
  }

  setFavoriteClickHandle(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, handler);
    this._favoriteHandler = handler;
  }

  _subscribeOnEmojiEvents() {
    const element = this.getElement();
    const emojyContainer = element.querySelector(`.film-details__add-emoji-label`);

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
