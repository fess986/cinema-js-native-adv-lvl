import {createNewElement} from "../utils";

const createFilmsContainer = () => {
  return (
    `<section class="films" >
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
      </div>
      </section>`
  );
};

export class FilmsContainerComponent {
  constructor() {
    this._containerTemplate = null;
    this._element = null;
  }

  getTemplate() {
    return createFilmsContainer();
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
