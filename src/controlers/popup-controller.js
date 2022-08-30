import {PopupComponent} from "../components/popup/popup";
import {render, remove} from "../components/utils/render";
import { mainContainer } from "../main";

export class PopupController {
  constructor(film, onDataChange) {
    this._film = film;
    this._commentComponent = null;
    this._popupComponent = null;
    this.unRenderPopup = this.unRenderPopup.bind(this);
    this._closePopupWidthKeybord = this._closePopupWidthKeybord.bind(this);
    this._onDataChange = onDataChange;
    this._popupController = null;
    this._popupIsOpen = false;

  }

  unRenderPopup() {
    remove(this._popupComponent);
    this._popupIsOpen = false;
  }

  _closePopupWidthKeybord(evt) {
    if (evt.code === `Escape`) {
      document.body.style.overflowY = `auto`; // возвращаем прокрутку
      this.unRenderPopup();
      document.removeEventListener(`keydown`, this._closePopupWidthKeybord);
    }
  }

  render() {
    // this._popupController = popupController;

    this._popupComponent = new PopupComponent(this._film);

    document.body.style.overflow = `hidden`; // убираем прокрутку основного документа
    // document.scrollIntoView(false);

    render(mainContainer, this._popupComponent, `afterend`);

    // прокрутим новый ререндеренный элемент до места вызова
    // this._popupComponent.getElement().scrollTo(0, 0);

    this._popupComponent.setCloseHandler(() => {
      document.body.style.overflowY = `auto`; // возвращаем прокрутку
      this.unRenderPopup();
    });

    document.addEventListener(`keydown`, this._closePopupWidthKeybord);

    this._popupComponent.setWatchListClickHandle(() => {
      //  тут пробуем делать через новый рендеринг элемента
      const newFilm = this._film;
      newFilm.userDetails.isWatchListActive = !newFilm.userDetails.isWatchListActive;

      this._onDataChange(this._film, newFilm);

      // на случай честного ререндеринга
      // console.log(this._popupController._popupComponent._element);
      // console.log(this._popupController._popupComponent._element.scrollTop);
      // this._popupComponent.rerender();
      // const scrollTop = this._popupController._popupComponent._element.scrollTop;
      // this._popupController.unRenderPopup();
      // this._popupController.render(this._popupController);

    });

    this._popupComponent.setWatchedClickHandle(() => {
      // тут через ререндер

      const newFilm = this._film;
      newFilm.userDetails.isWatchedActive = !newFilm.userDetails.isWatchedActive;

      this._onDataChange(this._film, newFilm);
      // this._popupComponent.rerender();

    });

    this._popupComponent.setFavoriteClickHandle(() => {
      const newFilm = this._film;
      newFilm.userDetails.isFavoriteActive = !newFilm.userDetails.isFavoriteActive;

      this._onDataChange(this._film, newFilm);
    });

    this._popupComponent._subscribeOnEmojiEvents();
  }
}

