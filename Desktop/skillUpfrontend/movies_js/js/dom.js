export let moviesList = null;
export let inputSearch = null;
export let triggerMode = false;
//constructor elementov он у нас приватный
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
export const createStyle = () => {
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
//container for block movies
export const createMarkup = () => {
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
//block movie
export const addMovieToList = (movie) => {
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
export const clearMoviesMarkup = () => moviesList && (moviesList.innerHTML = '');
