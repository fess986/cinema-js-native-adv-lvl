import {AbstractComponent} from "./abstract-component";

const createTopFilmsContainer = () => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>

    <div class="films-list__container">
    </div>
    </section>`
  );
};

export class TopFilmsContainerComponent extends AbstractComponent {

  getTemplate() {
    return createTopFilmsContainer();
  }

}
