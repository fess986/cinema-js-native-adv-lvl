import {AbstractComponent} from './abstract-component';

const createShowMoreButton = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export class ShowMoreButtonComponent extends AbstractComponent {

  getTemplate() {
    return createShowMoreButton();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

}
