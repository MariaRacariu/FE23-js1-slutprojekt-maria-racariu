import {fetchMovies} from "./modules/movies.js";
import {search} from "./modules/search.js";


fetchMovies();

const searchButton = document.querySelector('#searchButton').addEventListener('click', search);

// A small animation using the anime.js to animate the name of the page
anime({
    targets: '.title',
    keyframes: [
        {translateY: -40},
        {translateY: 0}
      ],
    easing: 'easeOutElastic(1, .8)',
})