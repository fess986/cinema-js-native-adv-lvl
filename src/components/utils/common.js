import moment from "moment";
import {RankScore, RankTitle} from "../../const/const";

export const getYear = (date) => moment(date).format(`YYYY`);
export const getLongDate = (date) => moment(date).format(`DD dddd YYYY`);
export const getDuration = (runTime) => {
  return `${Math.floor(runTime / 60)}h ${runTime % 60}m`;
};

export const getUserRank = (films) => {
  const totalWatch = films.reduce((count, film) => count + Number(film.userDetails.isWatchedActive), 0);

  if (totalWatch >= RankScore.NOVICE.MIN && totalWatch <= RankScore.NOVICE.MAX) {
    return RankTitle.NOVICE;
  } else if (totalWatch >= RankScore.FAN.MIN && totalWatch <= RankScore.FAN.MAX) {
    return RankTitle.FAN;
  } else if (totalWatch > RankScore.FAN.MAX) {
    return RankTitle.MOVIE_BUFF;
  } else {
    return RankTitle.NONE;
  }
};

