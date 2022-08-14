const sortItem = (name, isActive) => {
  return (
    `<li><a href="#" class="sort__button ${isActive ? `sort__button--active` : ``}">${name}</a></li>
    `
  );
};

export const createSorting = (data) => {
  const dataSort = data.map((item, index) => {
    return sortItem(item, index === 0);
  }).join(`\n`);

  return (
    `<ul class="sort">
        ${dataSort}
      </ul>`
  );
};
