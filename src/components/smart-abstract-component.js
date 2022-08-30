import {AbstractComponent} from "./abstract-component";

export class SmartComponent extends AbstractComponent {
  constructor() {
    super();

    if (new.target === SmartComponent) {
      throw new Error(`dont try to create new component from abstract component`);
    }
  }

  recoveryListeners() {
    throw new Error(`dont try to use method of abstract component`);
  }

  rerender() {
    // сохраняем старый элемент и его предка
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    // удаляем старый элемент при помощи метода класса
    this.removeElement();

    // создаем новый элемент
    const newElement = this.getElement();

    // меняем старый на новый
    parent.replaceChild(newElement, oldElement);

    // восстанавливаем листнеры
    this.recoveryListeners();

    console.log(this);
  }

}
