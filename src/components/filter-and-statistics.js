
const filterItem = (filter, isActive) => {
  const {name, count} = filter;
  return (
    `<a href="#watchlist" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${name} ${count !== 0 ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`
  );
};
// создаем шаблон элемента "Меню (фильтры и статистика)"


export const createFilterAndStatistics = (filters) => {
  const textData = filters.map((item, index) => {
    return filterItem(item, index === 0);
  }).join(`\n`);

  return (
    `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${textData}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>

      </nav>`
  );
};

