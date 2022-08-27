import {CommentComponent} from "../components/popup/comments";
import {PopupComponent} from "../components/popup/popup";
import {render, remove} from "../components/utils/render";
import {footerContainer} from "../main";
import {renderComments} from "../components/popup/comments";

export class PopupController {
  constructor() {
    // this._film = film;
    this._commentComponent = null;
    this._popupComponent = null;
    this._unRenderPopup = this._unRenderPopup.bind(this);
    this._closePopupWidthKeybord = this._closePopupWidthKeybord.bind(this);
    this._popupOpenHandlerParams = this._popupOpenHandlerParams.bind(this);

  }

  _unRenderPopup() {
    remove(this._popupComponent);
    console.log('render from controller');
  }

  _closePopupWidthKeybord(evt) {
    if (evt.code === `Escape`) {
      document.body.style.overflowY = `auto`; // возвращаем прокрутку
      this._unRenderPopup();
      document.removeEventListener(`keydown`, this._closePopupWidthKeybord);
      console.log('render from controller');
    }
  }

  _popupOpenHandlerParams(isMainFilmsContainer, films) {
    return ((evt) => {
      if (isMainFilmsContainer) {
        if (event.defaultPrevented) {
          return;
        }
      } else {
        evt.preventDefault();
      }

      if (evt.target.className === `film-card__poster` || `film-card__comments`) {
        const thisFilm = evt.target.parentElement.dataset.id;
        const targetFilm = films.find((item) => item.id.toString() === thisFilm);
        if (targetFilm) {
          this.render(targetFilm);
          console.log('render from controller');
        }
      }
    });
  }

  _renderComments(commentsContainer, comments) {
    let renderComment;
    for (let i = 0; i < comments.length; i++) {
      renderComment = new CommentComponent(comments[i]);
      render(commentsContainer, renderComment);
      console.log('render from controller');
    }
  }

  render(targetFilm) {

    this._popupComponent = new PopupComponent(targetFilm);

    document.body.style.overflow = `hidden`; // убираем прокрутку основного документа

    render(footerContainer, this._popupComponent, `afterend`);

    // рендерим комменты
    const commentsContainer = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);
    this._renderComments(commentsContainer, targetFilm.comments);
    // renderComments(commentsContainer, targetFilm.comments);


    this._popupComponent.setCloseHandler(() => {
      document.body.style.overflowY = `auto`; // возвращаем прокрутку
      this._unRenderPopup();
    });

    document.addEventListener(`keydown`, this._closePopupWidthKeybord);
  }
}

