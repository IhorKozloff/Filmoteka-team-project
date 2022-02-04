import getRefs from '../js/get-refs';
import {
  onModalBtnWatchedLocalStorage,
  onModalBtnQueueLocalStorage,
} from './modal-btns-loca-storage';

import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/src/styles/main.scss';
// const instance = basicLightbox.create(`
//     <div class="modal">
//         <p>
//             Your first lightbox with just a few lines of code.
//             Yes, it's really that simple.
//         </p>
//     </div>
// `);
// instance.show();
const refs = getRefs();
let watched = localStorage.getItem('watched')
  ? [...JSON.parse(localStorage.getItem('watched'))]
  : [];
let queue = localStorage.getItem('queue') ? [...JSON.parse(localStorage.getItem('queue'))] : [];
let btnWatchedRender = '';
let btnQueueRender = '';

export default function movieDetailMarkUp(data) {
  const {
    genres,
    title,
    vote_average,
    vote_count,
    poster_path,
    popularity,
    original_title,
    overview,
  } = data;
  const allGenres = genres.map(genre => genre.name).join(', ');

  btnWatchedRender =
    watched.findIndex(obj => obj.id === data.id) !== -1
      ? '<button type="button" class="button-add btn-animated wathed  pressed">remove from Watched</button>'
      : '<button type="button" class="button-add wathed">add to Watched</button>';

  btnQueueRender =
    queue.findIndex(obj => obj.id === data.id) !== -1
      ? '<button type="button" class="button-add btn-animated queue pressed">remove from queue</button>'
      : '<button type="button" class="button-add queue">add to queue</button>';

  const instance = basicLightbox.create(
    `<div class="modal modal-container"> 
           <button type="button" class="btn-close">
           <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: absolute"><path d="m8 8 14 14M8 22 22 8" stroke="#000" stroke-width="2"/></svg>
           </button>
           <div class="modal-card">
        <div class="modal-image">
          <img src="${setPosters(poster_path)}" alt="movie-poster" class="movie-poster" />
          <button type="button" class="btn-open-trailer">

        </button>
        </div>
        <div class="modal-info">
          <h2 class="modal-info-title">${title}</h2>
           <table>
        <tr>
          <th class="info-table-td">Vote / Votes</td>
          <td> <span class="info-table-vote_average">${vote_average}</span>    /   <span class="info-table-vote_count"> ${vote_count} </span></td>
        </tr>
        <tr>
          <th class="info-table-td">Popularity</td>
          <td>${popularity}</td>
        </tr>
        <tr>
          <th class="info-table-td">Original Title</td>
          <td class="info-table-original_title" valign="bottom">${original_title}</td>
        </tr>
        <tr>
          <th class="info-table-td">Genre</td>
          <td>${allGenres}</td>
        </tr>
      </table>
            <h3 class="modal-about">ABOUT</h3>
            <p class="modal-info-about">${overview}</p>
      ${btnWatchedRender}
      ${btnQueueRender}
        </div>
      </div>
    </div>
  `,
    {
      onShow: instance => {
        instance.element().querySelector('.btn-close').onclick = instance.close;
      },
    },
  );
  instance.show();

  const btnAddWatched = document.querySelector('.wathed');
  const btnAddQueue = document.querySelector('.queue');

  onModalBtnWatchedLocalStorage(btnAddWatched, data, watched);
  onModalBtnQueueLocalStorage(btnAddQueue, data, queue);

  function setPosters(poster) {
    if (poster === null) {
      return 'https://wipfilms.net/wp-content/data/posters/tt0338683.jpg';
    }
    return `https://image.tmdb.org/t/p/w300${poster_path}`;
  }
  // <svg class="modal__button-icon" width="14px" height="14px">
  // <use href="../images/sprite.svg#icon-close"></use>
  // </svg>
  // <img src="../images/cross.svg" width="18" height="18" alt=""></img>
  // {/* <svg path="../images/sprite.svg#icon-close" width="14px" height="14px"></svg>; */}
  // return refs.gallery.insertAdjacentHTML('afterbegin', markUp);
}
