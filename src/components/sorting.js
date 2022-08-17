import {createNewElement} from '../utils';

const sortItem = (name, isActive) => {
  return (
    `<li><a href="#" class="sort__button ${isActive ? `sort__button--active` : ``}">${name}</a></li>
    `
  );
};

const createSorting = (data) => {
  const dataSort = data.map((item, index) => {
    return sortItem(item, index === 0);
  }).join(`\n`);

  return (
    `<ul class="sort">
        ${dataSort}
      </ul>`
  );
};

export class SortingComponent {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return createSorting(this._data);
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
