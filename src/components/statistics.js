import {AbstractComponent} from "./abstract-component";

const createStatistics = () => {
  return (
    `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`
  );
};

export class StatisticsComponent extends AbstractComponent {

  getTemplate() {
    return createStatistics();
  }

}
