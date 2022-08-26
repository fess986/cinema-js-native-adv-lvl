import {AbstractComponent} from './abstract-component';
import {SortTypes} from '../mock/sorting-mock';

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
  }

  getTemplate() {
    return createSorting(this._data);
  }

  getSortType(evt) {
    this._sortingType = evt.target.dataset.sorting;
    return this._sortingType;
  }

  getSortListByType(films, type) {
    let sortedFilms = [];
    switch (type) {
      case SortTypes.DEFAULT:
        sortedFilms = films.slice();
        break;
      case SortTypes.DATE:
        sortedFilms = films.slice().sort((a, b) => b.year - a.year);
        break;
      case SortTypes.RATING:
        sortedFilms = films.slice().sort((a, b) => b.rating - a.rating);
        break;

    }
    return sortedFilms;
  }

}
