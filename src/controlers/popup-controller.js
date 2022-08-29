import {CommentComponent} from "../components/popup/comments";
import {PopupComponent} from "../components/popup/popup";
import {render, remove} from "../components/utils/render";
import {footerContainer} from "../main";

export class PopupController {
  constructor(film, onDataChange) {
    this._film = film;
    this._commentComponent = null;
    this._popupComponent = null;
    this._unRenderPopup = this._unRenderPopup.bind(this);
    this._closePopupWidthKeybord = this._closePopupWidthKeybord.bind(this);
    this._onDataChange = onDataChange;

  }

  _unRenderPopup() {
    remove(this._popupComponent);
  }

  _closePopupWidthKeybord(evt) {
    if (evt.code === `Escape`) {
      document.body.style.overflowY = `auto`; // возвращаем прокрутку
      this._unRenderPopup();
      document.removeEventListener(`keydown`, this._closePopupWidthKeybord);
    }
  }

  _renderComments(commentsContainer, comments) {
    let renderComment;
    for (let i = 0; i < comments.length; i++) {
      renderComment = new CommentComponent(comments[i]);
      render(commentsContainer, renderComment);
    }
  }

  render() {

    this._popupComponent = new PopupComponent(this._film);

    document.body.style.overflow = `hidden`; // убираем прокрутку основного документа

    render(footerContainer, this._popupComponent, `afterend`);

    // рендерим комменты
    const commentsContainer = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);
    this._renderComments(commentsContainer, this._film.comments);
    // renderComments(commentsContainer, targetFilm.comments);

    this._popupComponent.setCloseHandler(() => {
      document.body.style.overflowY = `auto`; // возвращаем прокрутку
      this._unRenderPopup();
    });

    document.addEventListener(`keydown`, this._closePopupWidthKeybord);

    this._popupComponent.setWatchListClickHandle(() => {
      const newFilm = this._film;
      newFilm.userDetails.isWatchListActive = !newFilm.userDetails.isWatchListActive;

      this._onDataChange(this._film, newFilm);
    });

    this._popupComponent.setWatchedClickHandle(() => {
      const newFilm = this._film;
      newFilm.userDetails.isWatchedActive = !newFilm.userDetails.isWatchedActive;

      this._onDataChange(this._film, newFilm);
    });

    this._popupComponent.setFavoriteClickHandle(() => {
      const newFilm = this._film;
      newFilm.userDetails.isFavoriteActive = !newFilm.userDetails.isFavoriteActive;

      this._onDataChange(this._film, newFilm);
    });
  }
}

