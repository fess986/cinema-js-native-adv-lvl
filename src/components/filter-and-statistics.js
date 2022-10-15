import {AbstractComponent} from './abstract-component';
import flatpickr from 'flatpickr'; // создаем только в поле инпута
import 'flatpickr/dist/flatpickr.min.css';

// создаем шаблон одного пункта меню
const filterItem = (filter) => {
  const {name, count, checked} = filter;
  return (
    `<a id="${name}" href="#watchlist" class="main-navigation__item ${checked ? `main-navigation__item--active` : ``}">${name} ${count !== 0 ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`
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
        <input class = "calendar-input hidden" id="Calendar"></input>
        <a href="#" class="main-navigation__additional" id='calendarButton'>Calendar</a>
        <a href="#stats" class="main-navigation__additional" id="Stats">Stats</a>

      </nav>`
  );
};

export class FilterAndStatisticsComponent extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
    this._flatpickr = null;

    this._applyFlatpickr = this._applyFlatpickr.bind(this);

  }

  getTemplate() {
    return createFilterAndStatistics(this._filters);
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      // При своем создании `flatpickr` дополнительно создает вспомогательные DOM-элементы.
      // Что бы их удалять, нужно вызывать метод `destroy` у созданного инстанса `flatpickr`.
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const calendarElement = this.getElement().querySelector(`#Calendar`);
    calendarElement.classList.toggle(`hidden`);
    this._flatpickr = flatpickr(calendarElement, {
      altInput: true,
      allowInput: true,
      defaultDate: `today`,
    });
  }

  setStatsClickHandler(handler) {
    this.getElement().querySelector(`#Stats`).addEventListener(`click`, handler);
  }

  setCalendarClickHandler() {
    this.getElement().querySelector(`#calendarButton`).addEventListener(`click`, () => {
      this._applyFlatpickr();
    });
  }

  setFilterChangeHandler(handler) {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, (evt) => {
      if ((event.target.tagName !== `A`) && (event.target.tagName !== `SPAN`)) {
        return;
      }
      const active = event.target.tagName === `A` ? evt.target.id : event.target.parentElement.id;

      handler(active);
    });
  }
}

