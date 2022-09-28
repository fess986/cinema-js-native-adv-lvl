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

  // сделаем универсальный метод для загрузки из сети.
  _loadData({url, method = RequestMethod.GET, body = null, headers = new Headers()}) {

    // добавляем начальную авторизацию
    headers.append(`Authorization`, this._authorization);

    // метод возвращает промис из феча. При этом делает необходимые начальные обработки
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
    .then((response) => response.json())
    // .then(console.log);
  }

  getFilms() {
    return this._loadData({url: `movies`});
  }

  getComments(id) {
    return this._loadData({url: `comments/${id}`});
  }
}
