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
  }

  getTemplate() {
    return createSorting(this._data);
  }

  getSortType(evt) {
    return evt.target.dataset.sorting;
  }

  sortByType(type) {

  }

}
