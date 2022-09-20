import {AbstractComponent} from './abstract-component';

export const createMostCommendedFilmsContainer = () => {
  return (
    `<section class="films-list--extra">
    <h2 id="ass1" class="films-list__title" >Most commented</h2>

    <div class="films-list__container" id='mostCommentedFilmsContainer' >
    </div>
    </section>`

  );
};

export class MostCommendedFilmsComponent extends AbstractComponent {

  getTemplate() {
    return createMostCommendedFilmsContainer();
  }

  getFilmsContainer() {
    return this.getElement().querySelector(`#mostCommentedFilmsContainer`);
  }

}
