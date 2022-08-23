// создаем полноценный ДОМ-элемент из строки
export const createNewElement = (templateString) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = templateString;
  return newElement.firstChild;
};

// функция рендеринга элементов в ДОМ-элемент container
export const render = (container, component, place = `beforeend`) => {
  switch (place) {
    case `beforeend`:
      container.append(component.getElement());
      break;
    case `afterbegin`:
      container.prepend(component.getElement());
      break;
    case `afterend`:
      container.after(component.getElement());
      break;
  }
};

// export const remove = (element) => {
//   element.remove();
// };

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
