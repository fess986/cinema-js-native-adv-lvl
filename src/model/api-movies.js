import moment from "moment";

export class FilmsAPI {
  constructor() {
    this.films = [];
  }

  static transformDataFromServer(data) {
    const transformedData = Object.assign(
        {},
        {
          id: data.id,
          title: data.film_info.title,
          rating: data.film_info.total_rating,
          year: moment(data.film_info.release.date).format(`YYYY`),
          releaseDate: data.film_info.release.date,
          runTime: data.film_info.runtime,
          genre: data.film_info.genre,
          img: data.film_info.poster,
          description: data.film_info.description,
          comments: data.comments,
          alternativeTitle: data.film_info.alternative_title,
          ageRating: data.film_info.age_rating,
          director: data.film_info.director,
          writers: data.film_info.writers,
          actors: data.film_info.actors,
          country: data.film_info.release.release_country,
          userDetails: {
            isWatchListActive: data.user_details.watchlist,
            isWatchedActive: data.user_details.already_watched,
            isFavoriteActive: data.user_details.favorite,
            watchingDate: moment(data.user_details.watching_date).toDate(),
          },
        }
    );

    return transformedData;
  }


  static transformDataToServer(film) {

    const comments = (filmList) => {
      if (!filmList.comments) {
        return [];
      } else {
        if (filmList.comments[0] instanceof Object) {
          return filmList.comments.map((comment) => comment.id);
        } else {
          return filmList.comments;
        }
      }
    };

    const transformedData = Object.assign(
        {},
        {
          'id': film.id,

          "film_info": {
            'id': film.id,
            'title': film.title,
            'alternative_title': film.alternativeTitle,
            'poster': film.img,
            'director': film.director,
            'description': film.description,
            'writers': film.writers,
            'actors': film.actors,
            'genre': film.genre,

            'release': {
              'date': film.releaseDate,
              'release_country': film.country,
            },

            'runtime': film.runTime,
            'total_rating': film.rating,
            'age_rating': film.ageRating,
          },

          'user_details': {
            'watchlist': film.userDetails.isWatchListActive,
            'already_watched': film.userDetails.isWatchedActive,
            'favorite': film.userDetails.isFavoriteActive,
            'watching_date': film.userDetails.watchingDate
          },

          'comments': comments(film),
        }
    );

    return transformedData;
  }

  static transformAllDataFromServer(data) {
    return data.map(FilmsAPI.transformDataFromServer);
  }

  static transformAllDataToServer(data) {
    return data.map(FilmsAPI.transformDataToServer);
  }
}

