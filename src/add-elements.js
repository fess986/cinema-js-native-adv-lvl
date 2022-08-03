// универсальная функция по добавлению элементов в вёрстку
export const addElement = function (container, element, where = `beforeend`) {
  container.insertAdjacentHTML(where, element);
};


