import {AbstractComponent} from './abstract-component';
import {filmsBoard} from '../main';
import {render} from './utils/render';
import {films} from '../main';
import {renderFilm} from '../controlers/film-board-controler';

export const createMostCommendedFilmsContainer = () => {
  return (
    `<section class="films-list--extra">
    <h2 id="ass1" class="films-list__title" >Most commented</h2>

    <div class="films-list__container" id='mostCommentedFilmsContainer' >
    </div>
    </section>`

  );
};

export class MostCommendedFilmsContainerComponent extends AbstractComponent {

  getTemplate() {
    return createMostCommendedFilmsContainer();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  render() {
    render(filmsBoard.getElement(), this);

    for (let i = 0; i < 2; i++) {
      renderFilm(document.querySelector(`#mostCommentedFilmsContainer`), films[i]);
    }
  }

}
