import {PopupComponent} from "../components/popup/popup";
import {render, remove} from "../components/utils/render";
import {mainContainer} from "../main";
import {CommentComponent} from "../components/popup/comments";
import {shake} from "../components/utils/render";

export class PopupController {
  constructor(film, onDataChange, api) {
    this._film = film;
    this._api = api;
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
    this._commentComponent = new CommentComponent(this._film);

    document.body.style.overflow = `hidden`; // убираем прокрутку основного документа
    // document.scrollIntoView(false);

    render(mainContainer, this._popupComponent, `afterend`);

    render(this._popupComponent.getCommentsContainer(), this._commentComponent, `beforeend`);

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

    this._commentComponent.setDeleteClickHandler((evt) => {
      evt.preventDefault();

      const newFilm = this._film;
      newFilm.comments = newFilm.comments.filter((item) => item.id != evt.target.dataset.commentid);

      let delitingElement = evt.target;
      delitingElement.innerText = `Deliting...`;
      delitingElement.disabled = `true`;

      setTimeout(() => {
        this._api.deleteComment(evt.target.dataset.commentid, this._film.id)
        .catch(() => {
          shake(this._popupComponent._element);
          delitingElement.innerText = `Delete`;
          delitingElement.disabled = `false`;
        }
        );

        this._onDataChange(this._film, newFilm);

        this._commentComponent.rerender();
      }, 500);


    });


    this._commentComponent.setCommentSendHandler((evt) => {

      if ((evt.code === `Enter`) && (event.ctrlKey || event.metaKey)) {

        // добавляем в массив комментариев новый, который мы спарсили из формы
        const newComment = this._popupComponent.getComment();

        if (!newComment) {

          shake(this._popupComponent._element);

          return;
        }

        this._api.addComment(newComment, this._film.id)
        .then((data) => {

          let newFilm = this._film;
          newFilm.comments.push(data.comments.at(-1));

          this._onDataChange(this._film, newFilm);

          this._commentComponent.rerender();
        });

      }
    });

  }
}

