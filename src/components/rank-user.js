// создаем шаблон элемента "Звание пользователя"
import {createNewElement} from '../utils';

const createRankUser = () => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export class RankUserComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createRankUser();
  }

  getElement() {
    if (!this._element) {
      this._element = createNewElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
