// import moment from "moment";

// export class FilmsAPI2 {
//   constructor(data) {
//     this.id = data.id;
//     this.title = data.film_info.title;
//     this.rating = data.film_info.total_rating;
//     this.year = moment(data.film_info.release.date).format(`YYYY`);
//     this.releaseDate = data.film_info.release.date;
//     this.runTime = data.film_info.runtime;
//     this.genre = data.film_info.genre;
//     this.img = data.film_info.poster;
//     this.description = data.film_info.description;
//     this.comments = data.comments;
//     this.alternativeTitle = data.film_info.alternative_title;
//     this.ageRating = data.film_info.age_rating;
//     this.director = data.film_info.director;
//     this.writers = data.film_info.writers;
//     this.actors = data.film_info.actors;
//     this.country = data.film_info.release.release_country;
//     this.userDetails = {};
//     this.userDetails.isWatchListActive = data.user_details.watchlist;
//     this.userDetails.isWatchedActive = data.user_details.already_watched;
//     this.userDetails.isFavoriteActive = data.user_details.favorite;
//     this.userDetails.watchingDate = moment(data.user_details.watching_date).toDate();
//   }

//   static parseFilm(data) {
//     return new FilmsAPI(data);
//   }

//   static parseFilms(data) {
//     return data.map(FilmsAPI.parseFilm);
//   }

//  }
