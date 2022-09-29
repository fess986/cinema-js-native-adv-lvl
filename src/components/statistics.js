import {AbstractComponent} from "./abstract-component";


const createStatistics = (films) => {
  return (
    `<section class="footer__statistics">
    <p>${films.length} movies inside</p>
  </section>`
  );
};

export class StatisticsComponent extends AbstractComponent {

  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createStatistics(this._films);
  }

}
