import {createNewElement} from "../utils";

const createStatistics = () => {
  return (
    `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`
  );
};

export class StatisticsComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createStatistics();
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
