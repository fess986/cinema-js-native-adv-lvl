const CACHE_PREFIX = `cinemaddict-cache`;
const CACHE_VER = `v4`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;


const cacheList = [
  `./`,
  `./index.html`,
  `./bundle.js`,
  `./css/main.css`,
  `./css/normalize.css`,
  `./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`,
  `./images/icons/icon-favorite.svg`,
  `./images/icons/icon-favorite-active.svg`,
  `./images/icons/icon-watched.svg`,
  `./images/icons/icon-watched-active.svg`,
  `./images/icons/icon-watchlist.svg`,
  `./images/icons/icon-watchlist-active.svg`,
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
  `./images/background.png`,
  `./images/bitmap.png`,
  `./images/bitmap@2x.png`,
  `./images/bitmap@3x.png`
];

const installHandler = (evt) => {
  evt.waitUntil(
      caches.open(CACHE_NAME) // открываем кэш
        .then((cache) => {
          return cache.addAll(cacheList); // добавляем в него статические данные
        })
  );
};

// активируем сервис воркер
const handleActivate = (evt) => {
  evt.waitUntil(
      caches.keys() // получаем ключи
        .then((keys) => Promise.all(
            keys.map((key) => {
              if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
                return caches.delete(key); // чистим кэш от наших старых данных
              }

              return null;
            })
            .filter((key) => key !== null)
        ))
  );
};

const handleFetch = (evt) => {
  const {request} = evt;

  evt.respondWith(
      caches.match(request) // проверяем, был ли уже такой запрос
        .then((cacheResponse) => {
          if (cacheResponse) { // если ответ такой уже был в кэше, мы его возвращаем его вместо ответа серверу
            return cacheResponse;
          }

          // Если в кэше не нашёлся ответ, повторно вызываем fetch
          // с тем же запросом (request), и возвращаем его
          return fetch(request)
            .then((response) => {
              // Если ответа нет, или ответ со статусом отличным от 200 OK,
              // или ответ небезопасного типа (не basic), тогда просто передаём
              // ответ дальше, никак не обрабатываем
              if (!response || response.status !== 200 || response.type !== `basic`) {
                return response;
              }

              // А если ответ удовлетворяет всем условиям, клонируем его
              const clonedResponse = response.clone();

              // Копию кладём в кэш
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(request, clonedResponse));

              // Оригинал передаём дальше
              return response;
            });
        })
  );
};

self.addEventListener(`install`, installHandler);
self.addEventListener(`activate`, handleActivate);
self.addEventListener(`fetch`, handleFetch);
