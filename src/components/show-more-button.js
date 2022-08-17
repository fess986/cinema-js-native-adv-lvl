import {createNewElement} from '../utils';

const createShowMoreButton = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export class ShowMoreButtonComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoreButton();
  }

  getElement() {
    if (!this._element) {
      this._element = createNewElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
