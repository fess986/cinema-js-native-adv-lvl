const filterNames = [`All movies`, `Watchlist`, `History`, `Favorites`];

const filtersDataMock = () => {
  return filterNames.map((item) => {
    return {
      name: item,
      count: Math.floor(Math.random() * 100)
    };
  });
};

export {filtersDataMock};
