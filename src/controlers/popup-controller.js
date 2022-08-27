import {CommentComponent} from "../components/popup/comments";
import {PopupComponent} from "../components/popup/popup";
import {render, remove} from "../components/utils/render";
import {footerContainer} from "../main";
import {renderComments} from "../components/popup/comments";

export class PopupController {
  constructor(film) {
    this._film = film;
    this._commentComponent = null;
    this._popupComponent = null;
    this._unRenderPopup = this._unRenderPopup.bind(this);
    this._closePopupWidthKeybord = this._closePopupWidthKeybord.bind(this);
    this._popupOpenHandlerParams = this._popupOpenHandlerParams.bind(this);

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
        }
      }
    });
  }

  render() {

    this._popupComponent = new PopupComponent(this._film);

    document.body.style.overflow = `hidden`; // убираем прокрутку основного документа

    render(footerContainer, this._popupComponent, `afterend`);

    // рендерим комменты
    const commentsContainer = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);
    renderComments(commentsContainer, this._film.comments);


    this._popupComponent.setCloseHandler(() => {
      document.body.style.overflowY = `auto`; // возвращаем прокрутку
      this._unRenderPopup();
    });

    document.addEventListener(`keydown`, this._closePopupWidthKeybord);
  }
}

