import {UserStatsComponent} from "../components/user-stats";
import {render} from "../components/utils/render";
import {StatsType} from "../const/const";
import {getUserRank} from "../components/utils/common";


export class UserStatsController {
  constructor(container, filmsModel) {

    this._filmsModel = filmsModel;
    this._container = container;
    this._statsType = StatsType.ALL;
    this._userStatsComponent = null;
    this.currentFilter = StatsType.ALL;
    this._data = null;
  }

  _getDatabyFilter(films, currentFilter) {

    const userRank = getUserRank(this._filmsModel.getAllFilms());

    let filmsWatched = [];

    switch (currentFilter) {
      case StatsType.ALL:
        filmsWatched = films
          .filter((film) => film.userDetails.isWatchedActive);
        break;

      case StatsType.TODAY:
        break;

      case StatsType.WEEK:
        break;

      case StatsType.MONTH:
        break;

      case StatsType.YEAR:
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

    let allFilmsGenres = new Map();

    // считаем жанры каждого вида
    allGenres.forEach((genre) => {
      if (!allFilmsGenres.has(genre)) {
        allFilmsGenres.set(genre, 1);
      } else {
        let count = allFilmsGenres.get(genre) + 1;
        allFilmsGenres.set(genre, count);
      }
    });

    allFilmsGenres = Array.from(allFilmsGenres).sort((a, b) => b[1] - a[1]);
    const topGenre = allFilmsGenres[0][0]

    return {
      watchedFilmsCount,
      totalDurationHours,
      totalDurationMinutes,
      userRank,
      topGenre,
      currentFilter,
    };
  }

  render() {
    this._data = this._getDatabyFilter(this._filmsModel.getAllFilms(), this.currentFilter);
    this._userStatsComponent = new UserStatsComponent(this._data);
    render(this._container, this._userStatsComponent);
  }

  show() {
    this._userStatsComponent._element.classList.remove(`hidden`);
  }

  hide() {
    this._userStatsComponent._element.classList.add(`hidden`);
  }
}
