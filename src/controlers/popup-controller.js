import {PopupComponent} from "../components/popup/popup";
import {render, remove} from "../components/utils/render";
import {mainContainer} from "../main";

export class PopupController {
  constructor(film, onDataChange) {
    this._film = film;
    this._commentComponent = null;
    this._popupComponent = null;
    this.unRenderPopup = this.unRenderPopup.bind(this);
    this._closePopupWidthKeybord = this._closePopupWidthKeybord.bind(this);
    this._onDataChange = onDataChange;
    this._popupController = null;

  }

  unRenderPopup() {
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._closePopupWidthKeybord);
  }

  _closePopupWidthKeybord(evt) {
    if (evt.code === `Escape`) {
      document.body.style.overflowY = `auto`; // возвращаем прокрутку
      this.unRenderPopup();
      document.removeEventListener(`keydown`, this._closePopupWidthKeybord);
    }
  }

  render() {
    this._popupComponent = new PopupComponent(this._film);

    document.body.style.overflow = `hidden`; // убираем прокрутку основного документа
    // document.scrollIntoView(false);

    render(mainContainer, this._popupComponent, `afterend`);

    this._popupComponent.setCloseHandler(() => {
      document.body.style.overflowY = `auto`; // возвращаем прокрутку
      this.unRenderPopup();
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

    this._popupComponent._subscribeOnEmojiEvents();
  }
}

