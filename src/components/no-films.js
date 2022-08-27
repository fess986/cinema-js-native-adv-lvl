import {AbstractComponent} from "./abstract-component";

const createNoFilms = () => {
  return (
    `<section class="films-list">
    <h2 class="films-list__title">There are no movies in our database</h2>
  </section>`
  );
};

export class NoFilms extends AbstractComponent {

  getTemplate() {
    return createNoFilms();
  }

}
