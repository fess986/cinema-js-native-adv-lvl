import {createNewElement} from "../utils";

const createTopFilmsContainer = () => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>

    <div class="films-list__container">
    </div>
    </section>`
  );
};

export class TopFilmsContainerComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTopFilmsContainer();
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
