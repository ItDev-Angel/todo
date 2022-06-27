import {
  addMovieToList,
  clearMoviesMarkup,
  createMarkup,
  createStyle,
  inputSearch,
  moviesList,
  triggerMode
} from './dom.js';

let siteUrl = null;
let searchLast = null;

// const triggerModeHandler = () => triggerMode = !triggerMode;
// const createSearchBox = (container) => {
//   // const checkbox = document.querySelector('#checkbox');
//   // checkbox.addEventListener('click', triggerModeHandler);
// }
  // const h1 = document.createElement('h1');
  // h1.innerHTML = 'Приложение для поисков фильмов';
  // container.append(h1);
  // const searchBox = document.createElement('div');
  // searchBox.setAttribute('class', 'search');
  // container.append(searchBox);
  // const input = document.createElement( "input" );
  // input.setAttribute();
  // container.append(input);
  //помещяем один див в другой
  // container.setAttribute('class', 'container');//добавляе класс для дива
  // movies.setAttribute('class', 'movies');//добавляе класс для дива
  // container.append(movies);//помещаем container in to movies
  // document.body.prepend(container);//апендим перед закрывающим в боди
//задержка тротлинг debounce
const debounce = (() => {
  let timer = null;
  return (cb, ms) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(cb, ms);
  };
})();

const getData = (url) => fetch (url)
.then((res) => res.json())
.then((json) => {
  if (!json || !json.Search) throw Error('Сервер вернул не правельный обьект');
  return json.Search;
});

const inputSearchHandler = (e) => {
  debounce (() => {
    const searchString = e.target.value.trim();
    if (searchString && searchString.length > 3 && searchString !== searchLast) {
      if (!triggerMode) clearMoviesMarkup();

      getData(`${siteUrl}?apikey=e0a69dd2&s=${searchString}`)
        .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
        .catch((error) => console.error(error));
    }
    searchLast = searchString;
  }, 2000);
};
//точка входа
export const appInit = (url) => {
  createStyle();
  createMarkup();
  siteUrl = url || 'https://www.omdbapi.com/';
  inputSearch.addEventListener('keyup', inputSearchHandler);
};
// getData(`https://www.omdbapi.com/?apikey=e0a69dd2&s=${search}`)
// .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
// .catch((error) => console.error(error));
// const delay = (() => {
//   let timer = 0;
//   return (callback, ms) => {
//     clearTimeout(timer);
//     timer = setTimeout(callback, ms)
//   };
// })();
// xhr.open('GET', url, true);// метод опен позволяет инициализировать запрос
// xhr.send();//метод отправляет запрос
// xhr.onload = () => { console.log(xhr)};//позволяет обработать запрос когда успешный запрос от сервера
// xhr.onerror = (err) => console.errore(errore);//позволяет обработать запрос когда не успешный запрос от сервера
//   xhr.onload = () => { 
//  if (xhr.status === 200) console.log(xhr.response);
//  else console.log(err);
// }; get json нужно распарсить
// Нам нужен Promise const getData = (url) => new Promise((resolve, reject) => {
// вместо консольлог resolve & reject
//es5
// const getData = (url) => new Promise((resolve, reject) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.send();
//   xhr.onload = () => { 
//     if (xhr.status === 200){
//       const json = JSON.parse(xhr.response);
//       resolve(json.Search);
//     } 
//     else reject(xhr.statusText, xhr.status);
//   };
//   xhr.onerror = (err) => reject(error);
// });
//es6
// const getData = (url) => fetch (url)
// .then((res) => res.json())
// .then((json) => json.Search);
// const search = 'iron man'
// getData(`https://www.omdbapi.com/?apikey=e0a69dd2&s=${search}`)
// .then((res) => console.log(res))
// .catch((err) => console.error(err));  
// const ironMan =  getData(`https://www.omdbapi.com/?apikey=e0a69dd2&s=Iron%20Man`);
// const superMan =  getData(`https://www.omdbapi.com/?apikey=e0a69dd2&s=Super%20Man`);
// const batMan =  getData(`https://www.omdbapi.com/?apikey=e0a69dd2&s=Bat%20Man`);
// ironMan.then((movies) => console.log(movies));
// superMan.then((movies) => console.log(movies));
// batMan.then((movies) => console.log(movies));

// Promise.all([ironMan, superMan, batMan])
// .then((res) => res
// .forEach((movies) => movies
// .forEach((movie) => console.log(movie))));

// Promise.race([ironMan, superMan, batMan])
// .then((res) => console.log(res));