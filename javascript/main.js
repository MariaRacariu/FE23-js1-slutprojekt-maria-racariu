import { fetchMovies } from "./modules/movies.js";
import { search } from "./modules/search.js";


fetchMovies();

const searchButton = document.querySelector('#searchButton').addEventListener('click', search);
const searchForm = document.querySelector('#searchInput');

searchForm.addEventListener('keydown', (e) => {

  if (e.keyCode === 13) {
    e.preventDefault();
    search();
  }
});



// A small animation using the anime.js to animate the name of the page
anime({
  targets: '.title',
  keyframes: [
    { translateY: -40 },
    { translateY: 0 }
  ],
  easing: 'easeOutElastic(1, .8)',
})