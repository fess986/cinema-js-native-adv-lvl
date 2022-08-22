import {createNewElement} from "../utils";

export class AbstractComponent {

  constructor() {
    // проверка того, чтобы не было возможности создавать из абстрактного класса инстансы
    if (new.target === AbstractComponent) {
      throw new Error(`You can't use abstract class as constructor`);
    }

    this._element = null;
  }

  // проверка того, чтобы не было возможности пользоваться методами прототипа абстрактного класса
  getTemplate() {
    throw new Error(`You can't use this method of abstract class!`);
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

// const newElem = new AbstractComponent();  // Ошибка
// AbstractComponent.prototype.getTemplate(); // Ошибка
