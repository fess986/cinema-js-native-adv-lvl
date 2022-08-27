import {AbstractComponent} from "./abstract-component";

const createTopFilmsContainer = () => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>

    <div class="films-list__container" id="top-films__container">
    </div>
    </section>`
  );
};

export class TopFilmsComponent extends AbstractComponent {

  getTemplate() {
    return createTopFilmsContainer();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  getFilmsContainer() {
    return this.getElement().querySelector(`#top-films__container`);
  }

}
