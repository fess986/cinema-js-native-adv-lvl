import {FILM_FILTERS_NAMES} from "../../const/const";

const filterByWatchlist = (films) => {
  return films.slice().filter((item) => item.userDetails.isWatchListActive);
};

const filterByWatched = (films) => {
  return films.slice().filter((item) => item.userDetails.isWatchedActive);
};

const filterByFovorites = (films) => {
  return films.slice().filter((item) => item.userDetails.isFavoriteActive);
};

export const getFilteredFilms = (films, filterType) => {
  let filterdFilms = [];
  switch (filterType) {
    case FILM_FILTERS_NAMES.ALL:
      filterdFilms = films;
      break;
    case FILM_FILTERS_NAMES.WATCHLIST:
      filterdFilms = filterByWatchlist(films);
      break;
    case FILM_FILTERS_NAMES.HISTORY:
      filterdFilms = films;
      filterdFilms = filterByWatched(films);
      break;
    case FILM_FILTERS_NAMES.FAVORITES:
      filterdFilms = films;
      filterdFilms = filterByFovorites(films);
      break;
  }
  return filterdFilms;
};
