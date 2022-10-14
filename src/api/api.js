import {FilmsAPI} from "../model/api-movies";

const RequestMethod = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  static checkStatus(response) {
    if (response.status >= 200 && response.status <= 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static toJSON(response) {
    return response.json();
  }

  // сделаем универсальный метод для загрузки из сети.
  _loadData({url, method = RequestMethod.GET, body = null, headers = new Headers()}) {

    // добавляем начальную авторизацию
    headers.append(`Authorization`, this._authorization);

    // метод возвращает промис из феча. При этом делает необходимые начальные обработки
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
    .then(API.checkStatus);
  }

  sync(data) {
    return this._loadData({
      url: `movies/sync`,
      method: RequestMethod.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(API.toJSON);
  }

  getFilms() {
    return this._loadData({url: `movies`})
    .then(API.toJSON);
  }

  getComments(id) {
    return this._loadData({url: `comments/${id}`})
    .then(API.toJSON);
  }

  deleteComment(id) {
    return this._loadData({
      url: `comments/${id}`,
      method: RequestMethod.DELETE,
    });
  }

  addComment(comment, filmId) {
    const body = JSON.stringify(FilmsAPI.transformCommentToServer(comment));

    return this._loadData({
      url: `comments/${filmId}`,
      method: RequestMethod.POST,
      body,
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(API.toJSON);
  }

  updateFilm(id, data) {
    const body = JSON.stringify(FilmsAPI.transformDataToServer(data));

    return this._loadData({url: `movies/${id}`, method: RequestMethod.PUT, body, headers: new Headers({"Content-Type": `application/json`})})
    .then(API.toJSON)
    .then(FilmsAPI.transformDataFromServer);
  }

  sendFilm(id, film) {
    return this._loadData({url: `movies/${id}`, method: RequestMethod.PUT, body: JSON.stringify(film), headers: new Headers({"Content-Type": `application/json`})})
    .then(API.toJSON);
  }
}
