import './sass/main.scss';
import './js/authorization';
import getRefs from './js/get-refs';
import onLoadPage from './js/onStart';
import MoviesApi from './js/api-requests';
import './js/library-page';
import moviesMarkUp from './js/movies-grid';
import pageSwitcher from './js/page-switcher';
import teamModal from './js/team-modal';
import './js/range-of-search-film';

const movies = new MoviesApi();
const refs = getRefs();

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  refs.gallery.innerHTML = '';
  movies.query = searchQuery.value;
  movies.getSearchMovies().then(response => {
    moviesMarkUp(response.data.results);
  });
}

onLoadPage();




document.querySelector('.themetoggle').addEventListener('click', (event)=>{
  event.preventDefault();
  if (localStorage.getItem('theme') === 'dark'){
localStorage.removeItem('theme');
} else {
  localStorage.setItem('theme','dark')
}
addDarkClassToHTML();
});

function addDarkClassToHTML(){
   try {
  if (localStorage.getItem('theme') === 'dark'){
document.querySelector('html').classList.add('dark');
document.querySelector('.themetoggle span').textContent = 'nightlight_round';
} 
else {
  document.querySelector('html').classList.remove('dark');
  document.querySelector('.themetoggle span').textContent = 'wb_sunny';
}
   }
  catch (err) {}
};

addDarkClassToHTML();