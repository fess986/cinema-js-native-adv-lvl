// пока что получился пустым, после переноса функций рендеринга. Удалять? Dick knows..
import moment from "moment";

export const getYear = (date) => moment(date).format(`YYYY`);
export const getLongDate = (date) => moment(date).format(`DD dddd YYYY`);
export const getDuration = (runTime) => {
  return `${Math.floor(runTime / 60)}h ${runTime % 60}m`;
};

