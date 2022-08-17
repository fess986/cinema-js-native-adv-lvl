import {createNewElement} from '../utils';

// создаем шаблон одного пункта меню
const filterItem = (filter, isActive) => {
  const {name, count} = filter;
  return (
    `<a href="#watchlist" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${name} ${count !== 0 ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`
  );
};

// создаем шаблон элемента "Меню (фильтры и статистика)"
const createFilterAndStatistics = (filters) => {
  const textData = filters.map((item, index) => {
    return filterItem(item, index === 0);
  }).join(`\n`);

  return (
    `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${textData}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>

      </nav>`
  );
};

export class FilterAndStatisticsComponent {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterAndStatistics(this._filters);
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

