import {FILM_FILTERS_NAMES} from "../const/const";
import {FilterAndStatisticsComponent} from "../components/filter-and-statistics";
import {render, replace} from "../components/utils/render";

export class FilterController {
  constructor(container, filmsModel) {
    this._filmsModel = filmsModel;
    this._container = container;
    this._filterComponent = null;

    this._activeFilterType = FILM_FILTERS_NAMES.ALL;
  }

  render() {
    console.log(`rendering filters`);

    const films = this._filmsModel.getAllFilms();
    const filters = Object.values(FILM_FILTERS_NAMES).map((item) => {
      return {
        name: item,
        count: 10,
        checked: false,
      };
    });
    console.log(filters);
    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterAndStatisticsComponent(filters);

    if (oldComponent) {
      replace(oldComponent, this._filterComponent);
    } else {
      render(this._container, this._filterComponent);
    }
  }
}
