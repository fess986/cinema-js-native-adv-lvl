const filterNames = [`All movies`, `Watchlist`, `History`, `Favorites`];

const filtersDataMock = () => {
  return filterNames.map((item, index) => {
    return {
      name: item,
      count: index === 0 ? 0 : Math.floor(Math.random() * 100)
    };
  });
};

export {filtersDataMock};
