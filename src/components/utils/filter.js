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
  console.log(filterType, `- in utils`);
  let filterdFilms = [];
  switch (filterType) {
    case FILM_FILTERS_NAMES.ALL:
      filterdFilms = films;
      console.log(`filter type - all!`);
      break;
    case FILM_FILTERS_NAMES.WATCHLIST:
      filterdFilms = filterByWatchlist(films);
      console.log(`filter type - WATCHLIST!`);
      break;
    case FILM_FILTERS_NAMES.HISTORY:
      filterdFilms = films;
      filterdFilms = filterByWatched(films);
      console.log(`filter type - HISTORY!`);
      break;
    case FILM_FILTERS_NAMES.FAVORITES:
      filterdFilms = films;
      filterdFilms = filterByFovorites(films);
      console.log(`filter type - FAVORITES!`);
      break;

  }
  return filterdFilms;
};
