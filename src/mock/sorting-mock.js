export const SortTypes = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const sortDataMock = [{
  value: `Sort by default`,
  dataSet: SortTypes.DEFAULT
},
{
  value: `Sort by date`,
  dataSet: SortTypes.DATE
},
{
  value: `Sort by rating`,
  dataSet: SortTypes.RATING
}];

export {sortDataMock};
