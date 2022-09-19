import {AbstractComponent} from './abstract-component';

const sortItem = (item, isActive) => {
  return (
    `<li><a href="#" class="sort__button ${isActive ? `sort__button--active` : ``}" data-sorting="${item.dataSet}">${item.value}</a></li>
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

export class SortingComponent extends AbstractComponent {
  constructor(data) {
    super();
    this._data = data;
    this._sortingType = `default`;
    // this._isFirstChange = true;
    // this._initialFilms = [];
  }

  getTemplate() {
    return createSorting(this._data);
  }

  getSortType(evt) {
    this._sortingType = evt.target.dataset.sorting;
    return this._sortingType;
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

}
