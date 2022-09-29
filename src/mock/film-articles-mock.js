import moment from "moment";

export const FILM_COMMENTS = {
  arthor: [`Max`, `Illia`, `John Snow`, `Lady Gaga`, `Brad Pitt`, `Ass Hole`],
  comment: [`good Film!`, `Amazing Film!`, `Not good film`, `Boooooooriiiing!!!`, `it's terrible! I have pised my shorts!`, `It's very funny!`, `its very dramatic!`],
  emotion: [`smile`, `sleeping`, `puke`, `angry`],
  date: `2019-05-11T16:12:32.554Z`,
};

export const FILM_ARTICLES = {
  title: [`one`, `two`, `three`, `four`, `five`, `six`],
  img: [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`],
  description: `Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Cras aliquet  varius magna, non porta ligula feugiat
  eget. Fusce tristique felis at fermentum  pharetra. Aliquam id orci ut lectus varius  viverra. Nullam nunc ex, convallis sed
  finibus eget, sollicitudin eget ante.  Phasellus eros mauris, condimentum sed
  nibh vitae, sodales efficitur ipsum. Sed  blandit, eros vel aliquam faucibus, purus  ex euismod diam, eu luctus nunc ante ut  dui. Sed sed nisi sed augue convallis  suscipit in sed felis. Aliquam erat  volutpat. Nunc fermentum tortor ac porta  dapibus. In rutrum ac purus sit amet tempus.`,
  genre: [`comedy`, `fighting`, `horror`, `drama`, `musical`],
  writers: [`Din Kuntz`, `Pehov`, `Joe Abercrombi`, `Patrik Ruffus`, `Erixon`],
  actors: [`Lui De Fines`, `Charli Chaplin`, `Janifer Aniston`, `Big Ban`],
  country: [`Russia`, `USA`, `India`],

};

const generateTitle = () => {
  return FILM_ARTICLES.title[Math.floor(Math.random() * FILM_ARTICLES.title.length)];
};

const generateImg = () => {
  return FILM_ARTICLES.img[Math.floor(Math.random() * FILM_ARTICLES.img.length)];
};

// const arr = FILM_ARTICLES.description.split('.');
// console.log(FILM_ARTICLES.description.split(`.`));

const generateDescription = () => {
  const arr = FILM_ARTICLES.description.split(`.`);
  const setArr = new Set();
  for (let i = 0; i < 5; i++) {
    setArr.add(arr[Math.floor(Math.random() * arr.length)]);
  }
  return Array.from(setArr).join(`. `);
};

const generateRating = () => {
  return (Math.random() * 10).toFixed(1);
};

const generateYear = () => {
  return 1972 + Math.floor(Math.random() * 50);
};

const generateGenre = () => {
  let numberGenres = Math.floor(Math.random() * FILM_ARTICLES.genre.length) + 1;
  const genres = [];
  for (let i = 0; i < numberGenres; i++) {
    let addingGenre = FILM_ARTICLES.genre[Math.floor(Math.random() * numberGenres)];
    if (!genres.includes(addingGenre)) {
      genres.push(addingGenre);
    }
  }
  return genres;
};

const generateWriters = () => {
  let numberWriters = Math.floor(Math.random() * FILM_ARTICLES.writers.length) + 1;
  const writers = [];
  for (let i = 0; i < numberWriters; i++) {
    let addingWriters = FILM_ARTICLES.writers[Math.floor(Math.random() * numberWriters)];
    if (!writers.includes(addingWriters)) {
      writers.push(addingWriters);
    }
  }
  return writers;
};

const generateActors = () => {
  let numberActors = Math.floor(Math.random() * FILM_ARTICLES.actors.length) + 1;
  const actors = [];
  for (let i = 0; i < numberActors; i++) {
    let addingActors = FILM_ARTICLES.actors[Math.floor(Math.random() * numberActors)];
    if (!actors.includes(addingActors)) {
      actors.push(addingActors);
    }
  }
  return actors;
};

const filmArticleCommentMock = () => {
  return {
    'id': Math.floor(Math.random() * 500),
    'author': FILM_COMMENTS.arthor[Math.floor(Math.random() * FILM_COMMENTS.arthor.length)],
    "comment": FILM_COMMENTS.comment[Math.floor(Math.random() * FILM_COMMENTS.comment.length)],
    'date': `2019-05-11T16:12:32.554Z`,
    "emotion": FILM_COMMENTS.emotion[Math.floor(Math.random() * FILM_COMMENTS.emotion.length)],
  };
};

const generateComments = () => {
  return new Array(Math.floor(Math.random() * 5) + 1).fill(``).map(() => {
    return filmArticleCommentMock();
  });
};

const generateUserWathedDate = () => {
  let daysBefore = Math.floor(Math.random() * 100);
  return moment().subtract(daysBefore, `days`).toDate();
};

const filmArticleDataMock = () => {
  return {
    'id': Math.floor(Math.random() * 500),
    'title': generateTitle(),
    'rating': `${generateRating()}`,
    'year': generateYear(),
    'releaseDate': `2019-05-11T00:00:00.000Z`,
    'runTime': 135,
    'genre': generateGenre(),
    'img': `./images/posters/${generateImg()}`,
    'description': `${generateDescription()}`,
    'comments': generateComments(),
    "alternativeTitle": `alternative_title`,
    "ageRating": Math.floor(Math.random() * 17) + 1,
    "director": `James Cameron`,
    "writers": generateWriters(),
    "actors": generateActors(),
    "country": FILM_ARTICLES.country[Math.floor(Math.random() * FILM_ARTICLES.country.length)],
    "userDetails": {
      'isWatchListActive': Math.random() > 0.5,
      'isWatchedActive': Math.random() > 0.5,
      'isFavoriteActive': Math.random() > 0.5,
      'watchingDate': generateUserWathedDate()
    }

  };
};


const generateFilms = (count) => {
  return new Array(count).fill(``).map(() => {
    return filmArticleDataMock();
  });
};

export {filmArticleDataMock, generateFilms};
