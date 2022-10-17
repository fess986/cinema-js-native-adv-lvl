import {SmartComponent} from "./smart-abstract-component";
import {StatsType} from "../const/const";
import {Chart, registerables} from "chart.js";

Chart.register(...registerables); // пишем для регистрации всех вариантов чартов
Chart.defaults.font.size = 26;

const createFilterItemTemplate = (filter, currentFilter) => {
  const {type, name} = filter;

  const checkedFilter = type === currentFilter
    ? `checked`
    : ``;

  return `
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${type}" value="${type}" ${checkedFilter}>
      <label for="statistic-${type}" class="statistic__filters-label">${name}</label>
  `;
};

const createStatisticTemplate = (data, filters) => {
  const {
    watchedFilmsCount,
    userRank,
    totalDurationHours,
    totalDurationMinutes,
    topGenre,
    currentFilter
  } = data;

  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilter))
    .join(``);

  return (
    `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${userRank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${filterItemsTemplate}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilmsCount}<span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalDurationHours} <span class="statistic__item-description">h</span> ${totalDurationMinutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`);
};

export class UserStatsComponent extends SmartComponent {

  constructor(data) {
    super();
    this._data = data;
    this._canvas = null;
    this._handler = null;
    this._filters = this._getFilters();
    this._filter = null;
    this._chart = null;

    this._setChart();
  }

  getTemplate() {
    return createStatisticTemplate(this._data, this._filters);
  }

  _getFilters() {
    return [
      {
        type: StatsType.ALL,
        name: `All time`
      },
      {
        type: StatsType.TODAY,
        name: `Today`
      },
      {
        type: StatsType.WEEK,
        name: `Week`
      },
      {
        type: StatsType.MONTH,
        name: `Month`
      },
      {
        type: StatsType.YEAR,
        name: `Year`
      }
    ];
  }

  _renderChart(statisticCtx, labels, values) {
    return new Chart(statisticCtx, {
      type: `bar`,
      data: {
        // label: 'ass',
        labels: [...labels],
        datasets: [{
          label: 'film categories',
          data: [...values],
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`,
          barThickness: 48,
          fontSize: '30px'
        }]
      },
      options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,

      }
    });
  }

  _setChart() {
    if (this._chart !== null) {
      // уничтожаем предыдущий экземпляр статистики
      this._chart.destroy();
      this._chart = null;
    }

    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    const {allFilmsGenres} = this._data;
    const BAR_HEIGHT = 100;
    statisticCtx.height = BAR_HEIGHT * allFilmsGenres.length;
    let labels = [];
    let values = [];
    allFilmsGenres.forEach((item) => {
      labels.push(item[0]);
      values.push(item[1]);
    });

    this._chart = this._renderChart(statisticCtx, labels, values);
  }

  setFilterItemsChangeHandler(handler) {
    this._handler = handler;

    this.getElement()
      .querySelector(`.statistic__filters`)
      .addEventListener(`change`, (evt) => {
        this._filter = evt.target.value;
        handler(this._filter);
        // this._setChart();
      });
  }
}
