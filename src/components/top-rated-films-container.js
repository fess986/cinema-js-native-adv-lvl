import {AbstractComponent} from "./abstract-component";
import {render} from "./utils/render";
import {filmsBoard} from "../main";
import {mainContainer} from "../main";
import {films} from "../main";
import {renderFilm} from "../controlers/film-board-controler";

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

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  render() {
    render(filmsBoard.getElement(), this);

    for (let i = 0; i < 2; i++) {
      renderFilm(mainContainer.querySelectorAll(`.films-list__container`)[1], films[i]);
    }
  }

}
