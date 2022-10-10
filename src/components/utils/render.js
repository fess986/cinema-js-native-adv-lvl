import {ERROR_ANIMATION_TIME} from "../../const/const";

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

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const replace = (oldComponent, newComponent) => {
  const oldElement = oldComponent.getElement();
  const parentElement = oldElement.parentElement;
  const newElement = newComponent.getElement();

  const isExist = !!(oldElement && parentElement && newElement);

  if (isExist && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldComponent.getElement());
  }
};

// анимация трясущийся головы для элемента
export const shake = (element) => {

  element.classList.add(`shake`);
  setTimeout(() => {
    element.classList.remove(`shake`);
  }, ERROR_ANIMATION_TIME);

};
