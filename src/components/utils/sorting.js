import {SortTypes} from "../../mock/sorting-mock";

export const getSortListByType = (films, type) => {

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
};
