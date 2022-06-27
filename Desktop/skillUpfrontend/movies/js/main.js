let moviesList = null;
let inputSearch = null;
let triggerMode = false;

//constructor elementov
const createElement = ({
  type, 
  attrs, 
  container = null, 
  evt = null, 
  handler = null, 
  pos = 'append'
}) => {
  const el = document.createElement(type);
  Object.keys(attrs).forEach(key =>{
    if (key !== 'innerText') el.setAttribute(key, attrs[key]);
    else el.innerHTML = attrs[key];
  });
  if (evt && handler && typeof handler === 'function') el.addEventListener(evt, handler);
  if (container && pos === 'append') container.append(el);
  if (container && pos === 'prepend') container.prepend(el);
  return el;
}

//стили в js
const createStyle = () => {
  createElement({
    type: 'style',
    attrs: { 
    innerText: `
  * {
  box-sizing: border-box;
  }
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  }
  .container {
  padding: 20px;
  max-width:1280px;
  margin:0 auto;
  }
  .movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  }
  .movie {
  display: flex;
  align-content: center;
  justify-content: center;
  }
  .movie__image {
  width: 100%;
  object-fit: cover;
  }
  .search {
    margin-bottom:40px;
  }
  .search__label-input {
    display:block;
    margin-bottom:0.5em;
  }
  .search__input {
    display:block;
    padding: 0.75em 1em;
    max-width:400px;
    width:100%;
    border-radius:4px;
    border:1px solid lightgray;
    margin-bottom:0.75em;
  }
  .search__label-checkbox {
    font-size:0.75em;
    display:block;
    margin-top:2px;
  }
  .search__group--checkbox {
    display:flex;
    gap:0.5em;
    align-items:center;
  }`
  }, 
  container: document.head
});
};

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
//container for block movies

const createMarkup = () => {
  const container = createElement({
    type: 'div',
    attrs: { class: 'container'},
    container: document.body,
    pos: 'prepend'
  });

    createElement({
    type:'h1', 
    attrs: { innerText: 'Приложение для поисков фильмов'},
    container 
  });
  const searchBox = createElement({
    type: 'div', 
    attrs: { class: 'search'},
    container 
  });
  const inputBox = createElement({
    type: 'div', 
    attrs: { class: 'search__group search__group--input'},
    container: searchBox
  });
  const checkBox = createElement({
    type: 'div', 
    attrs: { class: 'search__group search__group--checkbox'}, 
    container: searchBox
  });
  createElement({
    type: 'label',
    attrs: {
    for:'search',
    innerText:'Поиск фильмов',
    class:'search__label-input'
    }, 
    container: inputBox
  });
  inputSearch = createElement({
    type: 'input', 
    attrs: {
    type:'search',
    id:'search',
    placeholder: 'Начните вводить текст...',
    class:'search__input'
    }, 
    container: inputBox
  });
  createElement({
    type:'input', 
    attrs: {
    type:'checkbox',
    id:'checkbox',
    class:'search__checkbox'
    }, 
    container: checkBox,
    evt: 'click', 
    handler: () => triggerMode = !triggerMode
  });
  createElement({
    type:'label', 
    attrs: {
    for:'checkbox',
    innerText:'Добавить фильмы к существующим спискам',
    class:'search__label-checkbox'
    }, 
    container: checkBox
  });
  moviesList = createElement({
    type: 'div', 
    attrs: {class: 'movies'},
    container
  });
  // inputSearch = document.querySelector('#search');
  // !to do
  // moviesList = document.querySelector('.movies');
};

  //помещяем один див в другой
  // container.setAttribute('class', 'container');//добавляе класс для дива
  // movies.setAttribute('class', 'movies');//добавляе класс для дива
  // container.append(movies);//помещаем container in to movies
  // document.body.prepend(container);//апендим перед закрывающим в боди
//block movie
const addMovieToList = (movie) => {
  const item = createElement({
    type: 'div', 
    attrs: {class: 'movie'},
    container: moviesList
  });
  createElement({
    type:'img', 
    attrs: {
    class: 'movie__image',
    src: /^(http|https):\/\//.test(movie.Poster) ? movie.Poster : 'img/no-image.png',
    alt: movie.Title,
    title: movie.Title
    }, 
    container: item
  });
  // item.classList.add('movie');
  // img.classList.add('movie__image');
  // img.src = /^(http|https):\/\//.test(movie.Poster) ? movie.Poster : 'img/no-image.png';
  // img.alt = movie.Title;
  // img.title = movie.Title;
  // item.append(img);
  // moviesList.append(item);
};

//задержка тротлинг debounce
const debounce = (() => {
  let timer = null;
  return (cb, ms) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(cb, ms)
  };
})();

const clearMoviesMarkup = () => moviesList && (moviesList.innerHTML = '');

createStyle();
createMarkup();

const getData = (url) => fetch (url)
.then((res) => res.json())
.then((json) => {
  if (!json || !json.Search) throw Error('Сервер вернул не правельный обьект');
  return json.Search;
});

const search = 'Iron Man';
let searchLast = ' ';

const inputSearchHandler = (e) => {
  debounce (() => {
    const searchString = e.target.value.trim();
    if (searchString && searchString.length > 3 && searchString !== searchLast) {
      if (!triggerMode) clearMoviesMarkup();
      getData(`https://www.omdbapi.com/?apikey=e0a69dd2&s=${searchString}`)
        .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
        .catch((error) => console.error(error));
    }
    searchLast = searchString;
  }, 2000);
};

inputSearch.addEventListener('keyup', inputSearchHandler);
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
