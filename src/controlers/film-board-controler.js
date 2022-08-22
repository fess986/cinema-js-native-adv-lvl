import {ShowMoreButtonComponent} from "../components/show-more-button";
import {filmsBoard} from "../main";
import {renderPopup} from "../main";
import {render} from "../components/utils/render";
import {FilmArticleComponent} from "../components/film-article";
import {TOTAL_FILMS} from "../main";
import {remove} from "../components/utils/render";
import {mainContainer} from "../main";
import {films} from "../main";

const ADD_FILMS = 5;
const SHOWN_FILMS = 5;
let prevFilms = SHOWN_FILMS;

const renderBoard = (container) => {
  const articleFilmsContainer = container.querySelector(`.films-list__container`);

  filmsBoard.setClickHandler((evt) => {
    if (event.defaultPrevented) {
      return;
    }
    if (evt.target.className === (`film-card__poster` || `film-card__comments`)) {
      const thisFilm = evt.target.parentElement.dataset.id;
      const targetFilm = films.find((item) => item.id.toString() === thisFilm);
      renderPopup(targetFilm);
    }
  });

  const renderFilms = () => {
    films.slice(0, SHOWN_FILMS).forEach((item) => {
      render(articleFilmsContainer, new FilmArticleComponent(item));
    });
  };

  // добавляем кнопку "показать больше фильмов"
  const moreButton = new ShowMoreButtonComponent();
  render(articleFilmsContainer, moreButton, `afterend`);

  moreButton.setClickHandler(() => {
    let currentFilms = prevFilms + ADD_FILMS;
    films.slice(prevFilms, currentFilms).forEach((item) => {
      render(articleFilmsContainer, new FilmArticleComponent(item));
    });
    prevFilms = currentFilms;
    if (currentFilms >= TOTAL_FILMS) {
      remove(moreButton);
    }
  });

  // добавляем контейнер непосредственно для карточек фильмов
  render(mainContainer, filmsBoard);

  renderFilms();

};

export class FilmBoardController {

  constructor(container) {
    this._container = container;
  }

  render() {
    renderBoard(this._container);
  }

}
