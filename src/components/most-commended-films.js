import {createNewElement} from '../utils';

export const createMostCommendedFilmsContainer = () => {
  return (
    `<section class="films-list--extra">
    <h2 id="ass1" class="films-list__title" >Most commented</h2>

    <div class="films-list__container" id='mostCommentedFilmsContainer' >
    </div>
    </section>`

  );
};

export class MostCommendedFilmsContainerComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMostCommendedFilmsContainer();
  }

  getElement() {
    if (!this._element) {
      this._element = createNewElement(this.getTemplate());
    }
    return this._element
  }

  removeElement() {
    this._element = null;
  }
}
