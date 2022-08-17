// создаем полноценный ДОМ-элемент из строки
export const createNewElement = (templateString) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = templateString;
  return newElement.firstChild;
};

export const render = (container, element, place = `beforeend`) => {
  switch (place) {
    case `beforeend`:
      container.append(element);
      break;
    case `afterbegin`:
      container.prepend(element);
      break;
    case `afterend`:
      container.after(element);
      break;
  }
};
