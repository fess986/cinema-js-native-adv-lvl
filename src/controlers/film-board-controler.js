import {ShowMoreButtonComponent} from "../components/show-more-button";
import {filmsBoard} from "../main";
import {render} from "../components/utils/render";
import {FilmArticleComponent} from "../components/film-article";
import {TOTAL_FILMS} from "../main";
import {remove} from "../components/utils/render";
import {mainContainer} from "../main";
import {films} from "../main";
import {popupOpenHandlerParams} from "../components/popup/popup";
import {SortingComponent} from "../components/sorting";
import {sortDataMock} from "../mock/sorting-mock";

const ADD_FILMS = 5;
const SHOWN_FILMS = 5;
let prevFilms = SHOWN_FILMS;


export const renderFilm = (container, film) => {
  const filmComponent = new FilmArticleComponent(film);
  render(container, filmComponent);
};


export class FilmBoardController {

  constructor(container) {
    this._container = container;
    this._moreButtonComponent = new ShowMoreButtonComponent();
    this._sortingComponent = new SortingComponent(sortDataMock);
  }

  render() {
    console.log(this._container);
    const articleFilmsContainer = this._container.querySelector(`.films-list__container`);

    const renderFilms = (films) => {
      films.slice(0, SHOWN_FILMS).forEach((item) => {
        renderFilm(articleFilmsContainer, item);
      });
    };

    let sortType = `default`;

    render(mainContainer, this._sortingComponent);

    this._sortingComponent.getElement().addEventListener(`click`, (evt) => {

      if (evt.target.tagName !== `A`) {
        return;
      }

      let sortedFilms = [];

      // сортировка происходит при условии, что нажата другая кнопка. Иначе игнорируем

      if (sortType === this._sortingComponent.getSortType(evt)) {
        return;
      } else {
        this._sortingComponent.getElement().querySelector(`[data-sorting = '${sortType}']`).classList.remove(`sort__button--active`);

        sortType = this._sortingComponent.getSortType(evt);

        this._sortingComponent.getElement().querySelector(`[data-sorting = '${sortType}']`).classList.add(`sort__button--active`);
      }

      articleFilmsContainer.innerHTML = ``;
      sortedFilms = this._sortingComponent.getSortListByType(films, sortType);

      renderFilms(sortedFilms);

    });

    // таймаут для того чтобы успела проинициализироваться ф-ция popupOpenHandlerParams
    setTimeout(() => {
      filmsBoard.setClickHandler(popupOpenHandlerParams(true));
    }, 0);

    // добавляем кнопку "показать больше фильмов"
    render(articleFilmsContainer, this._moreButtonComponent, `afterend`);

    this._moreButtonComponent.setClickHandler(() => {
      let currentFilms = prevFilms + ADD_FILMS;
      films.slice(prevFilms, currentFilms).forEach((item) => {
        renderFilm(articleFilmsContainer, item);
      });
      prevFilms = currentFilms;
      if (currentFilms >= TOTAL_FILMS) {
        remove(this._moreButtonComponent);
      }
    });

    // добавляем контейнер непосредственно для карточек фильмов
    render(mainContainer, filmsBoard);

    renderFilms(films);

  }
}
