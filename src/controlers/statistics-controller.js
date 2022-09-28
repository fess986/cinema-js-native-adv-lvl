import moment from "moment";
import {UserStatsComponent} from "../components/user-stats";
import {render, replace} from "../components/utils/render";
import {StatsType} from "../const/const";
import {getUserRank} from "../components/utils/common";


export class UserStatsController {
  constructor(container, filmsModel) {

    this._filmsModel = filmsModel;
    this._container = container;
    this._userStatsComponent = null;
    this._currentFilter = StatsType.YEAR;

    this._data = null;
  }

  _getDatabyFilter(films, currentFilter) {

    const userRank = getUserRank(this._filmsModel.getAllFilms());

    let filmsWatched = [];

    const currentDate = new Date();
    const yearAgo = moment().subtract(1, `year`).toDate();
    const monthAgo = moment().subtract(1, `month`).toDate();
    const weekAgo = moment().subtract(7, `days`).toDate();

    switch (currentFilter) {
      case StatsType.ALL:
        filmsWatched = films
          .filter((film) => film.userDetails.isWatchedActive);
        break;
      case StatsType.TODAY:
        filmsWatched = films
        .filter((film) => film.userDetails.isWatchedActive && moment(film.userDetails.watchingDate).isSame(currentDate, `day`));
        break;

      case StatsType.WEEK:
        filmsWatched = films
        .filter((film) => film.userDetails.isWatchedActive && moment(film.userDetails.watchingDate).isBetween(weekAgo, currentDate));
        break;

      case StatsType.MONTH:
        filmsWatched = films
        .filter((film) => film.userDetails.isWatchedActive && moment(film.userDetails.watchingDate).isBetween(monthAgo, currentDate));
        break;

      case StatsType.YEAR:
        filmsWatched = films
        .filter((film) => film.userDetails.isWatchedActive && moment(film.userDetails.watchingDate).isBetween(yearAgo, currentDate));
        break;
    }

    const watchedFilmsCount = filmsWatched.length;
    const totalDuration = filmsWatched.reduce((count, film) => count + film.runTime, 0);
    const totalDurationHours = Math.floor(totalDuration / 60);
    const totalDurationMinutes = totalDuration % 60;

    // создаем список из всех вхождений жанров
    const allGenres = filmsWatched.reduce((genres, film) => {
      genres.push(...film.genre);
      return genres;
    }, []);

    // считаем жанры каждого вида
    let allFilmsGenres = new Map();
    allGenres.forEach((genre) => {
      if (!allFilmsGenres.has(genre)) {
        allFilmsGenres.set(genre, 1);
      } else {
        let count = allFilmsGenres.get(genre) + 1;
        allFilmsGenres.set(genre, count);
      }
    });

    // сортируем жанры по количеству
    allFilmsGenres = Array.from(allFilmsGenres).sort((a, b) => b[1] - a[1]);

    const topGenre = allFilmsGenres.length === 0 ? `No Films` : allFilmsGenres[0][0];

    return {
      watchedFilmsCount,
      totalDurationHours,
      totalDurationMinutes,
      allFilmsGenres,
      userRank,
      topGenre,
      currentFilter,
    };
  }

  render() {
    const oldComponent = this._userStatsComponent;

    this._data = this._getDatabyFilter(this._filmsModel.getAllFilms(), this._currentFilter);
    this._userStatsComponent = new UserStatsComponent(this._data);

    this._userStatsComponent.setFilterItemsChangeHandler((value) => {
      this._currentFilter = value;
      this.render();
    });

    if (oldComponent) {
      replace(oldComponent, this._userStatsComponent);
      oldComponent._setChart();
    } else {
      render(this._container, this._userStatsComponent);
      this._userStatsComponent._setChart();
    }
  }

  show() {
    this._userStatsComponent._element.classList.remove(`hidden`);
  }

  hide() {
    this._userStatsComponent._element.classList.add(`hidden`);
  }
}
