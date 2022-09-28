import {render} from './components/utils/render';
import {FilmBoardController} from './controlers/film-board-controler';
import {RankUserComponent} from './components/rank-user';
import {FilmsContainerComponent} from './components/films-container';
import {StatisticsComponent} from './components/statistics';
import {FilmsModel} from './model/movie';
import {FilterController} from './controlers/filter-controller';
import {UserStatsController} from './controlers/statistics-controller';
import {AUTHORIZATION, END_POINT} from './const/const';
import {API} from './api/api';
import {FilmsAPI} from './model/api-movies';

const api = new API(END_POINT, AUTHORIZATION);

// api.getFilms().then(FilmsAPI.parseFilms).then(console.log);
// api.getFilms().then((films) => console.log(films[0]));
// api.getComments(0).then(console.log);

// основные элементы для вставки контента
const rankUserContainer = document.querySelector(`.header`);
export const mainContainer = document.querySelector(`.main`);
export const footerContainer = document.querySelector(`.footer`);
export const filmsBoard = new FilmsContainerComponent();

api.getFilms()
.then(FilmsAPI.parseFilms)
.then((films) => {

  films = films.map((film) => {
    api.getComments(film.id).then((data) => {
      film.comments = data;
    });

    return film;
  });

  const filmsModel = new FilmsModel();
  filmsModel.setFilms(films);

  const changeVision = (mode) => {
    if (mode === `statistics`) {
      boardController.hide();
      userStatsController.show();
    } else {
      userStatsController.hide();
      boardController.show();
    }
  };

  const filterController = new FilterController(mainContainer, filmsModel, changeVision);
  const boardController = new FilmBoardController(filmsBoard.getElement(), filmsModel);
  const userStatsController = new UserStatsController(mainContainer, filmsModel);

  // рендерим фильтры, доску и статистику
  render(rankUserContainer, new RankUserComponent());
  filterController.render();
  boardController.renderBoard(films);
  userStatsController.render();
  userStatsController.hide();

  // добавление статистики
  render(footerContainer, new StatisticsComponent(filmsModel.getAllFilms()));
});

