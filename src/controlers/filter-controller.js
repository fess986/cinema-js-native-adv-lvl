import {FILM_FILTERS_NAMES} from "../const/const";
import {FilterAndStatisticsComponent} from "../components/filter-and-statistics";
import {render, replace} from "../components/utils/render";
import {getFilteredFilms} from "../components/utils/filter";

export class FilterController {
  constructor(container, filmsModel) {
    this._filmsModel = filmsModel;
    this._container = container;
    this._filterComponent = null;
    this._allFilms = this._filmsModel.getAllFilms();

    this._activeFilterType = FILM_FILTERS_NAMES.ALL;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const filters = Object.values(FILM_FILTERS_NAMES).map((item) => {
      return {
        name: item,
        count: getFilteredFilms(this._filmsModel._films, item).length,
        checked: item === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterAndStatisticsComponent(filters);

    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(oldComponent, this._filterComponent);
    } else {
      render(this._container, this._filterComponent);
    }
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
    this._filmsModel.setFilter(filterType);
  }

  _onDataChange() {
    this.render();
  }


}
